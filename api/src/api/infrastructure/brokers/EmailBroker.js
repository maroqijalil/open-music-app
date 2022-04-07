class EmailBroker {
  constructor(broker) {
    this.broker = broker;
  }

  async send(queue, message) {
    const channel = await this.broker.createChannel();
    await channel.assertQueue(queue, {durable: true});
    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      this.broker.close();
    }, 1000);
  }
}

export default EmailBroker;
