import nodemailer from 'nodemailer';
import config from '../config';

interface EmailAttachment {
  filename: string;
  path?: string;
  content?: Buffer;
  contentType?: string;
}

const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });

export const sendEmail = async (to: string, attachments: EmailAttachment[]) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.app_email,
      pass: config.app_pass,
    },
  });

  console.log('Sending Receipt 2');

  const html = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
    <p>Assalamu alaikum.</p>

    <p>Your rent receipt for the month of <strong>${currentMonth}</strong> is attached to this email as a PDF.</p>

    <p style="margin-bottom: 1em;">
      Please download and keep it for your records. Let us know if you have any questions.
    </p>

    <p>Best regards,<br />
    Patwari Villa,<br />
    01976-084208
    </p>
  </div>`;

  console.log('Sending Receipt 3');

  await transporter.sendMail({
    from: config.app_email,
    to,
    subject: `Rent receipt for the month of ${currentMonth}`,
    html,
    attachments: attachments,
  });

  console.log('Sending Receipt 4');
};
