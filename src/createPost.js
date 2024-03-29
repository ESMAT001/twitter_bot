const { Client } = require('twitter.js');
const config = require('../config.js');

const client = new Client();



module.exports = async (text) => {
  await client.login({
    consumerKey: config.consumer_key,
    consumerSecret: config.consumer_secret,
    accessToken: config.access_token_key,
    accessTokenSecret: config.access_token_secret,
    username: config.username,
    bearerToken: config.bearerToken,
  });
  return await client.tweets.create({
    text
  })
 
};