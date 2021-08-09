/**
 *
 */
var express = require("express");
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')

const hbs = require("nodemailer-handlebars");

var app = express();

app.use(bodyParser.urlencoded({extended: true}))

// sending email route
app.get("/sendMail/:email", (req, res) => {
	// get submit data
    var client_email = req.params.email

	var client_name = client_email.split("@")[0];

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			// user: "YOUR_EMAIL",
			// pass: "YOUR_EMAIL_PASSWORD",

            user: "sueh.qt.ueh@gmail.com",
            pass: "suehquyettam"
		},
	});

	transporter.use(
		"compile",
		hbs({
			viewEngine: {
				defaultLayout: false,
				extName: "express-handlebars",
			},
			viewPath: __dirname,
		})
	);

	let mailOptionsClient = {
		from: "sueh.qt.ueh@gmail.com",
		to: client_email,
		subject: "💓 FoodSo xin chân thành cảm ơn💓",
		template: "mail_template",
		context: {
			name: client_name,
		}, // send extra values to template
	};

	transporter.sendMail(mailOptionsClient, (err, data) => {
		var msg = undefined;
		if (err) {
			console.log(err);
			msg =
				"We are facing some technical difficulties here, come back later 😥";
			return res.send(msg);
		}
		msg = "OK";
		res.send(msg);
	});
});

// Handmade 404 page
app.use((req, res) => {
	res.status(404);
	res.send("Đường dẫn hoặc phương thức không hợp lệ");
});

var server = app.listen(process.env.PORT || 3000, () => {
	console.log("The server is now running at http://localhost:3000/sendMail");
});
