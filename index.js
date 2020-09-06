const express = require("express");

const Insta = require("instamojo-nodejs");

const bodyParser = require("body-parser");

const API_KEY = "###yourapikey####";

const AUTH_KEY = "###yourauthtoken###";

Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/pay", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var amount = req.body.amount;
  console.log(name);
  console.log(email);
  console.log(amount);

  var data = new Insta.PaymentData();

  const REDIRECT_URL = "http://localhost:3000/success";

  data.setRedirectUrl(REDIRECT_URL);
  data.send_email = "True";
  data.purpose = "React.js Video Course"; // REQUIRED
  data.amount = amount;
  data.name = name;
  data.email = email; // REQUIRED

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response)
      res.send("Please check your email to make payment")
    }
  });
});

app.get('/success',(req,res) => {
    res.send("Payment was successful please check your email for invoice in pdf")
})

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
