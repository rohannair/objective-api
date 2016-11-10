'use strict';
import chalk from 'chalk';
const debug = require('debug')('app:debug');

import { sendEmail } from '../../config/mailer';

const emailControllers = () => ({
  inviteUser: async (email) => {
    const template = {
      content: {
        from: {
          name: 'Quartermaster',
          email: 'noreply@qrtrmstr.com'
        },
        subject: 'You have been invited to Quartermaster!'
      },
      recipients: [
        { address: email }
      ]
    }
  },

});

module.exports = userControllers(User);
