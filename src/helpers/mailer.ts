import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST!,
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER!,
                pass: process.env.EMAIL_PASS!,
            }
        });

        const emailHTML = emailType === "VERIFY" ? 
        `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
        to verify your email or copy and paste the link below in your browser: <br> <br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>` : 
        `<p>Click <a href="${process.env.DOMAIN}/updatepassword?token=${hashedToken}">here</a>
        to reset your password or copy and paste the link below in your browser: <br> <br>
        ${process.env.DOMAIN}/updatepassword?token=${hashedToken}</p>`

        const mailOptions = {
            from: process.env.EMAIL_SERVER!,
            to: email,
            subject: emailType === "VERIFY" ? 'VERIFY YOUR EMAIL' : "RESET YOUR PASSWORD",
            html: emailHTML
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);

    }
}