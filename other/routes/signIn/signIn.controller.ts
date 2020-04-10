// import jwt from 'jsonwebtoken';
// import { RequestResponseNext } from '..';
// import response from '../../../lib/response';
// import { createUser, getUserBySnsIdAndSnsType } from '../users/users.repository';
// import { isRequired, createToken, isSignUp } from './signIn.service';

// const refresh: RequestResponseNext = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     const result = jwt.verify(token!, process.env.privateKey as string) as { snsId: string; snsType: string };
//     if (isRequired(result)) {
//       return res.status(400).json(response({ status: 1100, message: '올바르지 못한 토큰 입니다.' }));
//     }
//     const user = await getUserBySnsIdAndSnsType(result);
//     if (!user) {
//       return res.status(404).json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
//     }
//     const { accessToken, refreshToken } = await createToken(user);
//     const signUp = isSignUp(user);
//     res.status(201).json(response({ status: 201, data: { accessToken, refreshToken, signUp } }));
//   } catch (e) {
//     console.log(e);
//     return res.status(400).json(response({ status: 400, message: '올바르지 못한 토큰 입니다.' }));
//   }
// };
// const create: RequestResponseNext = async (req, res) => {
//   try {
//     const { snsType } = req.body;
//     const token = req.headers.authorization;

//     const snsData =
//       process.env.NODE_ENV === 'test'
//         ? {
//             iss: 'https://appleid.apple.com',
//             aud: 'com.mashup.ahobsu.Ahobsu',
//             exp: 1581254790,
//             iat: 1581254190,
//             sub: '001813.71f97bef48324fb29451a33e05d2cf5d.0908',
//             c_hash: 'KB0W75zvIFEcY9zW-79uxQ',
//             email: 'j5vvd9xtrb@privaterelay.appleid.com',
//             email_verified: 'true',
//             is_private_email: 'true',
//             auth_time: 1581254190,
//           }
//         : await jwt.decode(token!);
//     const { sub: snsId, email } = snsData as { sub: string; email: string };
//     if (!email || !snsId) {
//       return res.status(412).json(response({ status: 412, message: '토큰에 필수 정보가 없습니다.' }));
//     }
//     const user = await getUserBySnsIdAndSnsType({ snsId, snsType });
//     const signUp = user ? true : false;
//     const newUser = user ? user : await createUser({ snsId, snsType, email });
//     const { accessToken, refreshToken } = await createToken(newUser);
//     // const signUp = isSignUp(newUser);
//     res.status(201).json(response({ status: 201, data: { accessToken, refreshToken, signUp } }));
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json(response({ status: 500, message: e.message }));
//   }
// };
// export default {
//   refresh,
//   create,
// };
