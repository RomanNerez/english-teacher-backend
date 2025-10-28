import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default class Mail {

    private _transporter;

    private _from: string = 'your-email@gmail.com';

    private _to?: string;

    private _subject?: string;

    private _text?: string;

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'localhost',
            port: 1025,
            secure: false,
            auth: undefined,
        } as SMTPTransport.Options);
    }
    
    to(email: string): this {
        this._to = email;

        return this;
    }

    from(email: string): this {
        this._from = email;

        return this;
    }

    subject(subject: string): this {
        this._subject = subject;

        return this;
    }

    text(text: string): this {
        this._text = text;

        return this;
    }

    send() {
        const mailOptions = {
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: this._text,
        };

        this._transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
        });
    }
}