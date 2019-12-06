const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const router = express.Router();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3> Contact Details</h3>
    <ul>
    <li> Name: ${req.body.name}</li>
     <li> Email: ${req.body.email}</li> 
     </ul>
    <h3>Messaage</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      post: 587,
      auth: {
        user: "darion.rutherford@ethereal.email",
        pass: "1N2NY478rBhvz8vDa2"
      }
    });
    let mailOptions = {
      from: "test@testaccount.com",
      to: "darion.rutherford@ethereal.email",
      replyTo: "test@testaccount.com",
      subject: "New Message",
      text: req.body.message,
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Message Sent: %s", info.message);
      console.log("Message URL: %s", nodemailer.getTestMessageUrl(info));
    });
  });
});

app.use("/ingredients", require("./routes/api/ingredients"));
app.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`);
});
