import AWS from 'aws-sdk';
import formidable from 'formidable';
import fs from 'fs';
import { RequestResponseNext } from '../routes';

const imageUploaderLiveName: RequestResponseNext = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const file = await new Promise(function(resolve, reject) {
    form.parse(req, async (err, fields, files) => {
      try {
        req.body = fields;
        const { file } = files;
        if (!file) {
          return resolve(null);
        }
        await AWS.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
        });
        const s3 = new AWS.S3();
        const key = file.name;
        s3.upload(
          {
            Bucket: process.env.buket as string,
            Key: key,
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
          },
          (error: any, result: any) => {
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
  req.body = { ...req.body, file };
  next();
};

export default imageUploaderLiveName;
