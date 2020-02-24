export const isRequired = ({ name, birthday, gender }: { name: string; birthday: string; gender: string }) => {
  return !name || !birthday || !gender;
};
export const hasUserIdInRequest = (req: { user?: { id: number } }) => {
  if (!req.user || !req.user.id) {
    return 0;
  }
  return req.user.id;
};
