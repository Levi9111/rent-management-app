"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
const sendEmail = async (to, attachments) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config_1.default.app_email,
            pass: config_1.default.app_pass,
        },
    });
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
    await transporter.sendMail({
        from: config_1.default.app_email,
        to,
        subject: `Rent receipt for the month of ${currentMonth}`,
        html,
        attachments: attachments,
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map