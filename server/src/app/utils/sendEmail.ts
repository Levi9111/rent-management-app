import nodemailer from 'nodemailer';
import config from '../config';

const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });

export const sendEmail = async (to: string, text: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.google.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.app_email,
      pass: config.app_pass,
    },
  });

  await transporter.sendMail({
    from: config.app_email,
    to,
    subject: `Rent receipt for the month of ${currentMonth}`,
    text,
    html,
  });
};
