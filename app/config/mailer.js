// Establish the connection to SparkPost
import SparkPost from 'sparkpost';
import Boom from 'boom';

export const client = new SparkPost(process.env.SPARK_POST_API_KEY);

export const sendEmail = email => {
  client.transmissions.send(email, (err, res) =>{
    if (err) Promise.reject(Boom.create(400, 'Error sending email', err));
    Promise.resolve(res.body);
  });
}
