import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import DotenvConfig from "../config/env.config";
import { IMailOptions } from "../interfaces/mailOptions.interface";

class EmailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  private from: string;
  constructor() {
    this.from = DotenvConfig.MAIL_FROM!;
    this.transporter = nodemailer.createTransport({
      host: DotenvConfig.MAIL_HOST,
      port: DotenvConfig.MAIL_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: DotenvConfig.MAIL_USERNAME,
        pass: DotenvConfig.MAIL_PASSWORD,
      },
    });
  }

  async sendMail({ to, html, subject, text }: IMailOptions) {
    let mailOptions = {
      from: this.from,
      text,
      to,
      html,
      subject,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
