export const isRequired = ({ cardUrl, part }: { cardUrl: string; part: number }) => {
  return !cardUrl || !part;
};
