export const isRequired = ({ content }: { content: string }) => {
  return !content;
};

export const changeTypeToNumber = ({ pageString, limitString }: { pageString: string; limitString: string }) => {
  const defaultPageNumer = 1;
  let page = !!pageString ? parseInt(pageString, 10) : defaultPageNumer;
  if (isNaN(page)) {
    page = defaultPageNumer;
  }
  const defaultLimitNumber = 20;
  let limit = !!limitString ? parseInt(limitString, 10) : defaultLimitNumber;
  if (isNaN(limit)) {
    limit = defaultLimitNumber;
  }
  return {
    page,
    limit,
  };
};

export const getOffset = ({ page, limit }: { page: number; limit: number }) => {
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  return offset;
};
