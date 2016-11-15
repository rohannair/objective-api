// Establish the connection to SparkPost
import SparkPost from 'sparkpost';
import Boom from 'boom';

export const client = new SparkPost('4ba3403ef72e7b760482475fcd6bf8841798c825');

export const sendEmail = email => client.transmissions.send(email);
