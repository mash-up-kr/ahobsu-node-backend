// import db from '../../../models';

// export const getUserById = async (id: number) => {
//   return db.OtherUser.findOne({
//     where: {
//       id,
//     },
//   });
// };

// export const getUserBySnsIdAndSnsType = async ({ snsId, snsType }: { snsId: string; snsType: string }) => {
//   return db.OtherUser.findOne({ where: { snsId, snsType } });
// };

// export const createUser = async ({ snsId, snsType, email }: { snsId: string; snsType: string; email: string }) => {
//   return db.OtherUser.create({ snsId, snsType, email });
// };

// export const getUsers = async () => {
//   return db.OtherUser.findAll();
// };

// export const updateUser = async (
//   id: number,
//   { name, birthday, gender }: { name: string; birthday: string; gender: string },
// ) => {
//   return db.OtherUser.update(
//     { name, birthday, gender },
//     {
//       where: {
//         id,
//       },
//     },
//   );
// };

// export const resetRefeshDateById = async (id: number) => {
//   return db.OtherUser.update(
//     { refreshDate: null },
//     {
//       where: {
//         id,
//       },
//     },
//   );
// };

// export const deleteUser = async (id: number) => {
//   return db.OtherUser.destroy({
//     where: {
//       id,
//     },
//   });
// };
