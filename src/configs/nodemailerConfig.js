import { createTransport } from "nodemailer";
import { SERVER_EMAIL_PASS, SERVER_EMAIL_USER } from "./envConfig";

export const sendEmail = async (email, subject, text) => {
  let transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SERVER_EMAIL_USER,
      pass: SERVER_EMAIL_PASS,
    },
  });
  let mailOptions = {
    from: SERVER_EMAIL_USER,
    to: email,
    subject,
    text,
  };
  await transport.sendMail(mailOptions);
};
