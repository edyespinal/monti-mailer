# monti-mailer

Monti mailer is a simple web application that allows you to submit contact forms from static websites using only Javascript.

## How to use it

1. The form submitted from the form should include the following fields:

- from: usually set to be the same as the recipient.
- sender: the email address of the person submitting the form.
- name (optional): name of the sender.
- phone (optional): phone number of the sender.
- to: the email of the recipient of the contact form.
- subject: the subject of the email.
- message: the content of the email.

2. If the email is succesfully sent, you will receive a JSON response with a 200 status code and the information of the email sent. If it fails, it will respond with a 500 status code.
