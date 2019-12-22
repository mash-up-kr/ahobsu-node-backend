const express = require('express');
const db = require('../models');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await db.users.findAll();
  res.json({ users });
});

router.post('/', async (req, res, next) => {
  const { email, birthday } = req.body;
  const users = await db.users.create({ email, birthday });
  res.json({ users });
});

router.put('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await db.users.findOne({ where: { id } });
  console.log(111, user);
  if (!!user) {
    await db.users.update(
      { email: 'yuchoco3', birthday: '1997-01-01' },
      {
        where: {
          id,
        },
      },
    );
    const newUser = await db.users.findOne({ where: { id } });
    return res.json({ user: newUser });
  }
  res.json({ message: '유저가 없습니다.' });
});

router.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const user = await db.users.findOne({
    where: {
      id,
    },
  });
  if (!!user) {
    const users = await db.users.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: '유저를 삭제 했습니다.' });
  }
  res.json({ message: '유저가 없습니다.' });
});

module.exports = router;
