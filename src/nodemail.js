import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Burada '*' herkese izin verir, güvenlik gereksinimlerinize göre ayarlayın.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// const html = `
//     <h1>mail ugurla gonderildi</h1>
//     <p>indi forma qosmaq qalib<p/>
//     `;



app.get('/send-email', async (req, res) => {

    const { to, htmltext } = req.query;
    if (!to) {
        return res.status(400).send('E-posta adresi eksik.');
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.hasimovtabriz.com.tr',
            port: 465,
            secure: true,
            auth: {
                user: 'admin@hasimovtabriz.com.tr',
                pass: '3865606rt.'
            }
        });
        const info = await transporter.sendMail({
            from: 'Edumy <<admin@hasimovtabriz.com.tr>',
            to: to,
            subject: 'Edumy university',
            html: htmltext,
        });
        console.log("mesage sent: " + info.messageId);
        res.send('E-posta gönderildi.');
    } catch (error) {
        console.error(error);
        res.status(500).send('E-posta gönderilemedi.');
    }
});

const PORT = 3001; // Farklı bir port da kullanabilirsiniz.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
