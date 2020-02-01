const AWS = require('aws-sdk');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const file = await new Promise(function(resolve, reject) {
    form.parse(req, async (err, fields, files) => {
      try {
        req.body = fields;
        const { file } = files;
        if (!file) {
          resolve(null);
        }
        AWS.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
        });
        const s3 = new AWS.S3();
        let fileName = '';
        for (let i = 0; i < 8; i += 1) fileName += possible.charAt(Math.floor(Math.random() * possible.length));
        const key = fileName + path.parse(file.name).ext;
        s3.upload(
          {
            Bucket: process.env.buket,
            Key: key,
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
          },
          (error, result) => {
            if (error) {
              console.log(error);
              reject(error);
            }
          },
        );

        // unlink tmp files
        fs.unlinkSync(file.path);
        const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
        const imageUrl = baseUrl + key;
        resolve(imageUrl);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
  req.file = file;
  next();
};
