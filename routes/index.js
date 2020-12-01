// requires
const express = require('express');
const router = express.Router();
const parseData = require('../handlers');
const nodeMailer = require('nodemailer');
const domains = process.env.DOMAINS.split(',');

// routes
router.get('/', async (req, res, next) => {
	try {
		res.send('Monti Mailer');
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
});

router.post('/', parseData, async (req, res, next) => {
	try {
		if (domains.includes(req.headers.referer)) {
			const data = req.body;
			const mail = await mailer(
				data.from,
				data.sender,
				data.name,
				data.phone,
				data.recipient,
				data.subject,
				data.message
			);
			res.status(200).json(mail);
		} else {
			res.status(401).json({ error: 'Unauthorized' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
});

module.exports = router;

/**
 * mailer
 *
 * This function takes a contact form and mails it.
 * @param {String} _from same as recipient because of server security requirements
 * @param {String} _sender the email address of the sender of the contact form
 * @param {String} _name name of the sender
 * @param {String} _phone phone number of the sender
 * @param {String} _recipient the email of the recipient of the contact form
 * @param {String} _subject the subject of the email
 * @param {String} _mensaje the message of the email
 */
async function mailer(_from, _sender, _name = '', _phone = '', _recipient, _subject, _mensaje) {
	const transporter = nodeMailer.createTransport({
		host: 'smtp.dreamhost.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const info = await transporter.sendMail({
		from: _from,
		to: _recipient,
		subject: _subject,
		html: `Nombre: ${_name} <br/> Tel.: ${_phone} <br/> Mensaje: ${_mensaje}`,
		date: Date.now()
	});
	return info;
}
