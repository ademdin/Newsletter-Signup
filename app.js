const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const eAddress = req.body.emailAddress;

  const data = {
    members: [
      {
        email_address: eAddress,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/a46b017bb8";
  const options = {
    method: "POST",
    auth: "ademdin:1b5296752957abca6f47673c2dd6afb7-us7"
  }

  const requestIt = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  requestIt.write(jsonData);
  requestIt.end();



});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is runing on port 3000");
});


// Api key
// 1b5296752957abca6f47673c2dd6afb7-us7

// List id
// a46b017bb8
