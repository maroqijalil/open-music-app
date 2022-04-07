import amqplib from 'amqplib';

class Broker {
  constructor({host}) {
    this.host = host;
    this.connection = undefined;
  }

  async connect() {
    this.connection = await amqplib.connect(this.host);
  }

  async createChannel() {
    await this.connect();
    return await this.connection.createChannel();
  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
  }
}

const initBroker = () => {
  return new Broker({
    host: process.env.RABBITMQ_SERVER,
  });
};

export default initBroker;
