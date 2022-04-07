import nodemailer from 'nodemailer';

class Mailer {
  constructor({
    host,
    port,
    email,
    password,
  }) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user: email,
        pass: password,
      },
    });
  }

  send(email) {
    return this.transporter.sendMail(email);
  }
}

const initMailer = () => {
  return new Mailer({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    email: process.env.MAIL_ADDRESS,
    password: process.env.MAIL_PASSWORD,
  });
};

export default initMailer;
