const AWS = require('aws-sdk');

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports = async (req, res, next) => {
  AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });
  const s3 = new AWS.S3();
  let fileName = '';
  for (let i = 0; i < 8; i += 1) fileName += possible.charAt(Math.floor(Math.random() * possible.length));
  const form = new formidable.IncomingForm();
  const file = await new Promise(function(resolve, reject) {
    form.parse(req, async (err, fields, files) => {
      try {
        const { missionId, content } = fields;
        const checkMission = await db.missions.findOne({ where: { id: missionId } });
        if (!checkMission) {
          return res.json(response({ status: 412, message: '존재하지않는 missionId.' }));
        }
        const date = moment().format('YYYY-MM-DD');
        const beforeAnswer = await db.answers.findOne({
          where: {
            userId,
            date,
          },
        });
        let cardFile = await db.files.findOne({ where: { date } });
        if (!cardFile) {
          const id = moment().day() === 0 ? 7 : moment().day();
          cardFile = await db.files.findOne({ where: { id } });
        }
        const { cardUrl } = cardFile;
        if (!!beforeAnswer) {
          return res.json(response({ status: 400, message: '해당날짜에 답변이 존재합니다.' }));
        }
        const image = files.file;
        if (!image && !content) {
          return res.json(response({ status: 412, message: '필수 파라미터가 부족합니다.' }));
        }
        if (!image) {
          const answer = await db.answers.create({
            userId,
            missionId,
            cardUrl,
            content,
            date,
          });
          return res.json(response({ data: answer }));
        }
        const { file } = files;
        const defaultPath = fileName;
        const file2 = defaultPath + path.parse(file.name).ext;
        s3.upload(
          {
            Bucket: process.env.buket,
            Key: file2,
            ACL: 'public-read',
            Body: fs.createReadStream(file.path),
          },
          (error, result) => {
            if (error) console.log(error);
            else console.log(result);
          },
        );
        const baseUrl = 'https://yuchocopie.s3.ap-northeast-2.amazonaws.com/';
        const imageUrl = baseUrl + file2;

        const newAnswer = await db.answers.create({
          userId: userId,
          missionId: missionId,
          imageUrl,
          cardUrl,
          content: fields.content,
          date,
        });
        const answer = await db.answers.findOne({
          where: { id: newAnswer.id },
          include: [
            {
              model: db.missions,
            },
          ],
        });
        // unlink tmp files
        fs.unlinkSync(file.path);
        res.json(response({ status: 201, data: answer }));
      } catch (e) {
        console.log(e);
        return res.json(response({ status: 500, message: e.message }));
      }
    });
  });
};
