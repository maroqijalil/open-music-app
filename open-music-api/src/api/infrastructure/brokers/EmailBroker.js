import {connect} from 'amqplib';

class EmailBroker {
  async send(queue, message) {
    const connection = await connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {durable: true});
    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  }
}

export default EmailBroker;
