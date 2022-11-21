const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp551n7mg',
    api_key: '922816229329522',
    api_secret: 'SHY3yg9-rDKDibMHIwJoNOAAtzo',
    secure: true
});

module.exports = cloudinary;