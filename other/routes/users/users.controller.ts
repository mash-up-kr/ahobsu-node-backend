// import { RequestResponseNext } from '..';
// import response from '../../../lib/response';
// import { deleteUser, getUserById, getUsers, resetRefeshDateById, updateUser } from './users.repository';

// const users: RequestResponseNext = async (req, res, next) => {
//   try {
//     const users = await getUsers();
//     res.json(response({ data: users }));
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// const my: RequestResponseNext = async (req, res) => {
//   try {
//     const userId = req.user!.id;
//     const user = await getUserById(userId);
//     delete user.dataValues.mission;
//     res.json(response({ data: user }));
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// const user: RequestResponseNext = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await getUserById(parseInt(id, 10));
//     res.json(response({ data: user }));
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// const update: RequestResponseNext = async (req, res) => {
//   try {
//     const userId = req.user!.id;
//     await updateUser(userId, req.body);
//     const user = await getUserById(userId);
//     res.json(response({ data: user }));
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// const refresh: RequestResponseNext = async (req, res) => {
//   try {
//     const userId = req.user!.id;
//     await resetRefeshDateById(userId);
//     const user = await getUserById(userId);
//     res.json(response({ data: user }));
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// const destroy: RequestResponseNext = async (req, res, next) => {
//   try {
//     const userId = req.user!.id;
//     await deleteUser(userId);
//     res.json(response({ message: '유저를 삭제 했습니다.' }));
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// export default {
//   users,
//   my,
//   user,
//   update,
//   refresh,
//   destroy,
// };
