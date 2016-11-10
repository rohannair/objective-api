'use strict';
import chalk from 'chalk';
const debug = require('debug')('app:debug');

import { sendEmail } from '../../config/mailer';

const emailControllers = () => ({
  inviteUser: async (email) => {
    const email = {
      content: {
        from: {
          name: 'Quartermaster',
          email: 'noreply@qrtrmstr.com'
        },
        subject: 'You have been invited to Quartermaster!'
        html: `<html><p>Hi there, you have been invited to Quartermaster by someone on your team!</p><p>You can sign up here: <a href="https://qrtrmstr.io/signup?token=${token}&email=${email}">https://qrtrmstr.io/signup</a></p></html>`
      },
      recipients: [
        { address: email }
      ]
    }
  },

});

module.exports = userControllers(User);
