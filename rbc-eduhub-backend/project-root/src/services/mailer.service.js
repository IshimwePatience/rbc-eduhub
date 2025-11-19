
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');


let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  transporter = nodemailer.createTransport({
    host: host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  return transporter;
}

function renderTemplate(templateName, data) {
  const templatePath = path.join(__dirname, '../email-templates', `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  return template(data);
}


async function sendMail({ to, subject, text, html, template, templateData }) {
  const t = getTransporter();
  if (!t) throw new Error('SMTP not configured');
  const from = process.env.SMTP_FROM || `no-reply@${process.env.FRONTEND_ORIGIN || 'example.com'}`;
  let finalHtml = html;
  if (template) {
    finalHtml = renderTemplate(template, templateData || {});
  }
  const info = await t.sendMail({ from, to, subject, text, html: finalHtml });
  return info;
}

module.exports = { sendMail };
