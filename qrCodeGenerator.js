
const axios = require('axios');
const qr = require('qrcode');

async function generateQRCode(userSchema) {
  try {
    const response = await axios.get('https://api.qrserver.com/v1/create-qr-code/', {
      params: {
        size: '200x200',
        data: JSON.stringify(userSchema),
      },
    });

    // Generate the QR code locally and save it to a file or display it
    qr.toFile('passenger_qr_code.png', response.request.res.responseUrl, (err) => {
      if (err) throw err;
      console.log('QR code generated and saved as passenger_qr_code.png');
    });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
  }
}

module.exports = generateQRCode;