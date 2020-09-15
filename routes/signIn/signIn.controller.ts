import jwt from 'jsonwebtoken';
import { RequestResponseNext } from '..';
import response from '../../lib/response';
import { createUser, getUserBySnsIdAndSnsType } from '../users/users.repository';
import { isRequired, createToken, isSignUp } from './signIn.service';
import axios from 'axios';
import User from '../../models/user';
import {google} from 'googleapis';
import url  from 'url';


const googleCallback: RequestResponseNext = async (req, res) => {
  try {
    // const plus = google.plus('v1');
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.NODE_ENV === 'production' ? 'https://moti.company/api/v1/signin/google' : 'http://localhost:8000/api/v1/signin/google'
    );
    const qs = new url.URL(req.url, 'http://localhost:3000')
      .searchParams;
    // res.end('Authentication successful! Please return to the console.');
    // server.destroy();
    const code = qs.get('code');
    console.log('code', code)
    const {tokens: {access_token}} = await oauth2Client.getToken(code || '');
    // oauth2Client.credentials = tokens; // eslint-disable-line require-atomic-updates
    // resolve(oauth2Client);
    const result = await axios.post(`${process.env.NODE_ENV === 'production' ? 'https://moti.company' : 'http://localhost:8000'}/api/v1/signin`, {snsType: 'google'}, {
      headers: { Authorization: access_token },
    })
    console.log(result.data.data.accessToken);
    res.cookie('token', result.data.data.accessToken);
    res.redirect(302, 'http://localhost:8080/')
  } catch (e) {
    console.log(e);
    return res.status(400).json(response({ status: 400, message: '에러가 발생했습니다.' }));
  }
};

const refresh: RequestResponseNext = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const result = jwt.verify(token!, process.env.privateKey as string) as { snsId: string; snsType: string };
    if (isRequired(result)) {
      return res.status(400).json(response({ status: 1100, message: '올바르지 못한 토큰 입니다.' }));
    }
    const user = await getUserBySnsIdAndSnsType(result);
    if (!user) {
      return res.status(404).json(response({ status: 404, message: '유저가 존재하지 없습니다.' }));
    }
    const { accessToken, refreshToken } = await createToken(user);
    const signUp = isSignUp(user);
    res.status(201).json(response({ status: 201, data: { accessToken, refreshToken, signUp } }));
  } catch (e) {
    console.log(e);
    return res.status(400).json(response({ status: 400, message: '올바르지 못한 토큰 입니다.' }));
  }
};
const create: RequestResponseNext = async (req, res) => {
  try {
    const { snsType } = req.body;
    const token = req.headers.authorization;
    let snsId, email;
    if (snsType === 'apple') {
      const snsData =
        process.env.NODE_ENV === 'test'
          ? {
              iss: 'https://appleid.apple.com',
              aud: 'com.mashup.ahobsu.Ahobsu',
              exp: 1581254790,
              iat: 1581254190,
              sub: '001813.71f97bef48324fb29451a33e05d2cf5d.0908',
              c_hash: 'KB0W75zvIFEcY9zW-79uxQ',
              email: 'j5vvd9xtrb@privaterelay.appleid.com',
              email_verified: 'true',
              is_private_email: 'true',
              auth_time: 1581254190,
            }
          : ((await jwt.decode(token!)) as { sub: string; email: string });
      snsId = snsData.sub;
      email = snsData.email;
    } else if (snsType === 'google') {
      const { data: snsData } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
      snsId = snsData.id;
      email = snsData.email;
    } else {
      return res.status(400).json(response({ status: 400, message: 'snsType가 잘못 되었습니다.' }));
    }

    if (!email || !snsId) {
      return res.status(412).json(response({ status: 412, message: '토큰에 필수 정보가 없습니다.' }));
    }
    const user = await getUserBySnsIdAndSnsType({ snsId, snsType });
    const signUp = !user ?  false : !!(user as User).name ? true : false;
    const newUser = user ? user : await createUser({ snsId, snsType, email });
    const { accessToken, refreshToken } = await createToken(newUser);
    // const signUp = isSignUp(newUser);
    res.status(201).json(response({ status: 201, data: { accessToken, refreshToken, signUp } }));
  } catch (e) {
    console.log(e);
    return res.status(500).json(response({ status: 500, message: e.message }));
  }
};
export default {
  refresh,
  create,
  googleCallback,
};
