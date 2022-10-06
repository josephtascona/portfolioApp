var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

module.exports = router;

function main(email, subject, message) {
  // nodemailer transporter
  var transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    secure: true,
  });

  transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: subject,
    text: "From: " + email + "\nMessage: \n" + message,
  });
}

router.post("/", function (req, res, next) {
  main(req.body.email, req.body.subject, req.body.message);
  res.render('index', { title: 'Portfolio' });
})