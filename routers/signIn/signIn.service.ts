import jwt from 'jsonwebtoken';

export const isRequired = ({ snsType }: { snsType: string }) => {
  return !snsType;
};

export const createToken = async ({ id, snsId, snsType }: { id: number; snsId: string; snsType: string }) => {
  const accessToken = await jwt.sign(
    {
      user: {
        id,
      },
    },
    process.env.privateKey as string,
    { expiresIn: 7 * 24 * 60 * 60 },
  );
  const refreshToken = await jwt.sign(
    {
      snsId,
      snsType,
    },
    process.env.privateKey as string,
    { expiresIn: 30 * 24 * 60 * 60 },
  );
  return { accessToken, refreshToken };
};

export const isSignUp = ({
  name,
  birthday,
  email,
  gender,
}: {
  name: string;
  birthday: string;
  email: string;
  gender: string;
}) => {
  return !!name && !!birthday && !!email && !!gender;
};
