export const isRequired = ({ name, birthday, gender }: { name: string; birthday: string; gender: string }) => {
  return !name || !birthday || !gender;
};
