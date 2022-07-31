const express = require("express");
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https")
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                fname: fname,
                lname: lname
            }
        }]
    }
    const JSONdata = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "janhavi:c39c9fa0ce6a863c29a7f9b157942a16-us10"
    }
    const url = "https://us10.api.mailchimp.com/3.0/lists/d2bb9793b3";
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            response.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(JSONdata);
    request.end();
})
app.post("/failure.html", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT  || 3000, function () {
    console.log("server started ");
})
//api c39c9fa0ce6a863c29a7f9b157942a16-us10
//id=d2bb9793b3