import amqp from 'amqplib';
import EXPORT_PLAYLIST_QUEUE
  from '../../consumer/presentation/export/playlist/index.js';

class Channel {
  constructor(connection) {
    this.connection = connection;
    this.name = '';
    this.listener = () => {};
  }

  setName(name) {
    this.name = name;
  }

  setListener(listener) {
    this.listener = listener;
  }

  async consume() {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(this.name, {durable: true});

    channel.consume(this.name, this.listener, {noAck: true});
  }
}

class Broker {
  constructor({host}) {
    this.host = host;
    this.connection = undefined;
    this.channels = [];
  }

  async connect() {
    this.connection = await amqp.connect(this.host);
  }

  async register(queues) {
    for (let i = 0; i < queues.length; ++i) {
      const channel = new Channel(this.connection);
      channel.setName(queues[i].queue.name);
      queues[i].queue.register(channel, queues[i].options);

      this.channels.push(channel);
    }
  }

  async start() {
    this.channels.forEach((channel) => channel.consume());
  }
}

const createBroker = async (database, mailer) => {
  const broker = new Broker({
    host: process.env.RABBITMQ_SERVER,
  });

  await broker.connect();

  await broker.register([
    {
      queue: EXPORT_PLAYLIST_QUEUE,
      options: {database, mailer},
    },
  ]);

  return broker;
};

export default createBroker;
