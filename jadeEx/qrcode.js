const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const qr = require('qrcode');
router.get('/', (req, res) =>{
    res.render('qrcode');
})


router.use(bodyParser.urlencoded({extended: false}));
router.post('/', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const qrBuffer = await qr.toBuffer(url);
        res.type('image/png');
        return res.send(qrBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating QR code');
    }
});

module.exports = router;
