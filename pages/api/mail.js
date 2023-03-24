const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Subject: ${body.subject}\r\n
    Message: ${body.message}\r\n
  `;

  const data = {
    to: "btsartain@yahoo.com",
    from: "btsartain@gmail.com",
    subject: "New message from Hill City Church contact form",
    text: message,
    html: message.replace(/\r\n/g, "<br/>"),
  };

  mail.send(data);

  return res.status(200).json({ status: "ok" });
}

export default sendEmail;
