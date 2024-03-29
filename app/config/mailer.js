// Establish the connection to SparkPost
import SparkPost from 'sparkpost'

export const client = new SparkPost(process.env.SPARK_POST_API_KEY)

export const sendEmail = email => client.transmissions.send(email)
