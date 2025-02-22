import nodemailer from "nodemailer";
import {
    NODEMAILER_HOST,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_PORT,
    NODEMAILER_SECURE,
    EMAIL_FROM,
} from "./constants";


const transporter = nodemailer.createTransport({
    host: NODEMAILER_HOST,
    port: NODEMAILER_PORT,  // Port for SSL
    secure: NODEMAILER_SECURE, // Set to true for SSL and false for TLS.
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    },
    debug: false
});

export interface EmailParams {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: Array<{
        filename: string;
        path?: string;
        content?: Buffer | string;
        contentType?: string;
    }>;
}

export const sendEmail = async ({
    from = EMAIL_FROM,
    to,
    subject,
    text,
    html,
    attachments,
}: EmailParams): Promise<void> => {
    try {
        const mailOptions = {
            from,
            to,
            subject,
            text,
            html,
            attachments, // Attachments are added here
        };

        // Send email using Nodemailer
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};