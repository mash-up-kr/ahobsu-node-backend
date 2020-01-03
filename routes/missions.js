const express = require('express');
const sequelize = require('sequelize');

const db = require('../models');
const checkToken = require('../lib/checkToken');

const router = express.Router();

/* GET users listing. */
router.get('/', checkToken, async (req, res, next) => {
  console.log(req.user.email);
  const sql = 'SELECT * from chocopie.missions ORDER BY RAND() LIMIT 3';
  const result = await db.sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  res.json({ result });
});

router.post('/', async (req, res, next) => {
  const { title, isContent, isImage } = req.body;
  const missions = await db.missions.create({ title, isContent, isImage });
  res.json({ missions });
});

router.put('/:id', async (req, res, next) => {
  const { title, isContent, isImage } = req.body;
  const id = parseInt(req.params.id, 10);
  const mission = await db.missions.findOne({ where: { id } });
  console.log(111, mission);
  if (!!mission) {
    await db.missions.update(
      { title: title, isContent: isContent, isImage: isImage },
      {
        where: {
          id,
        },
      },
    );
    const newMission = await db.missions.findOne({ where: { id } });
    return res.json({ mission: newMission });
  }
  res.json({ message: '유효하지 않은 mission id 입니다.' });
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const mission = await db.missions.findOne({
    where: {
      id,
    },
  });
  if (!!mission) {
    const missions = await db.missions.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: '문제를 삭제 했습니다.' });
  }
  res.json({ message: '유효하지 않은 mission id 입니다.' });
});

module.exports = router;
