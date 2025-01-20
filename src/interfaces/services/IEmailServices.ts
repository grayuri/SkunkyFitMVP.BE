import { Transporter } from "nodemailer";

export interface IEmailServices {
  to: string
  firstName: string
  url: string
  from: string
  newTransport(): Transporter
  send(templateName: string, subject: string): void
}