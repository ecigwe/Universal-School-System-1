const nodemailer = require('nodemailer');

module.exports = class sendEmail {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = process.env.COMPANY_EMAIL_ADDRESS
    }

    transporter(){
        if(process.env.NODE_ENV === 'production'){
            return nodemailer.createTransport({

            });
        }

        return nodemailer.createTransport({

        });
    }
}