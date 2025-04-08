import { emailQueue } from "../queues/emailQueue";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const templatePath = path.resolve(__dirname, "../templates/confirmation.html");
const source = fs.readFileSync(templatePath, "utf-8");
const compileTemplate = handlebars.compile(source);

emailQueue.process(async (job) => {
  try {
    const { to, subject, text, name } = job.data;

    const html = compileTemplate({ name });

    await transporter.sendMail({
      from: '"Patient Registration" <noreply@patients.com>',
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email", error);
  }
});
