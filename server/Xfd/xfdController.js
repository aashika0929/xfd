'use strict';
const logger = require('./../../systemAppLogger');
const loggers = require('./../../applogger');
var nodemailer = require('nodemailer');

var notify = (req, res) => {
  console.log('sms');
  const accountSid = 'AC3fa3da63c038b6140dc9564ac024f91f';
  const authToken = '4e8b7fef7b48482c3247803486ce255d';
  const client = require('twilio')(accountSid, authToken);
  client.messages.create({
    to: '+919766668470',
    from: '+14158914560',
    body: 'You Broke the Build',
  })
  .then((message) => console.log("message",message.sid))
  .catch((err) => console.log("error",err));

  console.log('voice call');
  client.calls.create({
    to: '+919766668470',
    from: '+14158914560',
    url: "http://demo.twilio.com/docs/voice.xml"
  })
  .then((call) => console.log("call",call.sid))
  .catch((err) => console.log("error",err));
  console.log('email');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'wiprodigital.adapt@gmail.com',
    pass: 'indian@123'
  }
});
var mailOptions = {
  from: 'wiprodigital.adapt@gmail.com',
  to: 'madhumadhanan@gmail.com',
  subject: 'Sending Email from XFD',
  text: 'You broke the build'
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log('error in sending mail', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
console.log('slack');
var Slack = require('slack-node');
var webhookUri = 'https://hooks.slack.com/services/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';
var slack = new Slack();
slack.setWebhook(webhookUri);
slack.webhook({
channel: "#general",
username: "Devops",
text: "Xfd-You broke the build"
}, function(err, response) {
if (err) {
  console.log('error', err);
} else {
  console.log('res', response);
}
});
};
// var sendtoslack = (req, res) => {
//   console.log('slack route');
//   var Slack = require('slack-node');
//
// var webhookUri = 'https://hooks.slack.com/services/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';
//
// var slack = new Slack();
// slack.setWebhook(webhookUri);
// console.log('------');
// slack.webhook({
//   channel: "#general",
//   username: "Devops",
//   text: "This is posted to #general and comes from a bot named webhookbot."
// }, function(err, response) {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('res', response);
//   }
//
// });
// }


// var makecall = (req, res) => {
//   console.log('router makecall');
//   const accountSid = 'AC3fa3da63c038b6140dc9564ac024f91f';
//   const authToken = '4e8b7fef7b48482c3247803486ce255d';
//   const client = require('twilio')(accountSid, authToken);
//   client.calls.create({
//     to: '+918971257921',
//     from: '+14158914560',
//     url: "http://demo.twilio.com/docs/voice.xml"
//   })
//   .then((call) => console.log("call",call.sid))
//   .catch((err) => console.log("error",err));
// };
// var sendmail = (req, res) => {
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     user: 'itzaashika@gmail.com',
//     pass: 'Saaju@29'
//   }
// });
//
// var mailOptions = {
//   from: 'itzaashika@gmail.com',
//   to: 'itzaashika@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log('error in sending mail', error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
// }



module.exports = {
  notify
  // sendtoslack
  // makecall,
  // sendmail

};
