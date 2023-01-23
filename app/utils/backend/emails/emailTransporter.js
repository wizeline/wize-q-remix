require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const instantiateTransporter = () => {
  const {
    EMAIL_HOST, EMAIL_PORT, EMAIL_AUTH_USER, EMAIL_AUTH_PASSWORD,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_AUTH_USER || !EMAIL_AUTH_PASSWORD) {
    return undefined;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_AUTH_USER,
      pass: EMAIL_AUTH_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: path.resolve(__dirname, 'templates/layouts/'),
      defaultLayout: 'default',
      partialsDir: path.resolve(__dirname, 'templates/partials/'),
    },
    viewPath: path.resolve(__dirname, 'templates/views/'),
    extName: '.hbs',
  };

  transporter.use('compile', hbs(handlebarOptions));

  return transporter;
};

module.exports = {
  instantiateTransporter,
};
