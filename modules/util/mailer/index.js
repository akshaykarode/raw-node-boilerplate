const mailConfig = require('./../../configs/mail-config');
const swig = require('swig');
const path = require('path');
const nodemailer = require('nodemailer');
const moment = require('moment');

const smtpConfig = {
  pool: true,
  secure: true,
  service: 'SES-US-EAST-1',
  // host: mailConfig.host,
  // port: mailConfig.port,
  auth: {
    user: mailConfig.smtp_username,
    pass: mailConfig.smtp_password,
  },
};
const mailOptions = {
  from: '"Sender Name" <no-reply@abc.com>', // sender address
  to: '', // list of receivers
  subject: '', // Subject line
  replyTo: '',
  html: '', // html body
};
const transporter = nodemailer.createTransport(smtpConfig);

module.exports = {

  sendMail: function(mailOptions) {
    console.log('sendMail...');
    transporter.sendMail(mailOptions, function(err, success) {
      if (err) console.log('err', err);
      if (!err) console.log('success', success);
    });
  },

};
