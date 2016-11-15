'use strict';
import chalk from 'chalk';
import Boom from 'boom';
const debug = require('debug')('app:debug');

import { sendEmail } from '../../config/mailer';

const emailControllers = () => ({
  inviteUser: async ({email, admin, domain, signupToken}) => {

    let link = `https://${domain}.objectiveiq.io/auth/signup?id=${email}&token=${signupToken}`;

    const template = {
      content: {
        from: {
          name: 'objectiveIQ Admin',
          email: 'noreply@objectiveIQ.com'
        },
        subject: `${admin.name} has invited you to join ${domain}.objectiveiq.com`,
        html: `<html>
          <body style="background-color:#EBEFFE; width:100%;height:100%">
            <div style="width:640px;margin:0 auto;padding:40px; text-align:center">
              <img src="https://s3.amazonaws.com/objectiveiq/objectiveiqlogo-blue.png" alt="objectiveIQ" />
            </div>
            <div style="background-color:#FFFFFF;width:640px;margin:0 auto 30px;padding:30px;">
              <h2 style="color:#344055;text-align:left">Join ${domain} on objectiveIQ</h2>
              <p style="color:#393E47;font-size:16px;margin-bottom:20px;text-align:left">${admin.name} (${admin.email}) is using objectiveIQ. Use the invite link below to join them and the rest of your team.</p>
              <p style="font-size:16px;color:#393E47;text-align:center;margin:40px 0;">
                <a style="height:60px;line-height:60px;background-color:#3861F4;color:#FFFFFF;font-weight:bold;padding:10px 15px;text-decoration:none;border-radius:3px;font-size:22px;" href="${link}">Join Team</a><br />
                <small style="color:#777;">You may copy/paste the link into your browser: <a href="${link}">${link}</a></small>
              </p>
              <p style="color:#393E47;font-size:16px;margin-bottom:20px;text-align:left">Have a question or need help? Please contact <a href="mailto:support@objectiveiq.com">support@objectiveiq.com</a></p>
              <p style="color:#393E47;font-size:16px;margin-bottom:20px;text-align:left">Cheers, <br />The objectiveIQ team</p>
            </div>
          </body>
        </html>`
      },
      recipients: [
        { address: email }
      ]
    };

    const data = await sendEmail(template);
    return data;
  },

  forgotPassword: async (user) => {

  }
});

module.exports = emailControllers();
