var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Portfolio' });
});

module.exports = router;

function main(from, subject, text) {
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
    text: "From: " + from + "\nMessage: \n" + text,
  });
}

router.post("/", function (req, res, next) {
  main(req.body.from, req.body.subject, req.body.text);
  res.render('index', { title: 'Portfolio' });
})