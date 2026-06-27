const QRCode = require('qrcode');

QRCode.toFile('public/live-qr.png', 'https://mckisolutions.com/live', {
  color: {
    dark: '#0A1628',  // navy-500
    light: '#FFFFFF'
  }
}, function (err) {
  if (err) throw err;
  console.log('QR code generated successfully!');
});
