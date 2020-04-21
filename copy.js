const axios = require('axios');
const cheerio = require('cheerio');

export const getHtml = async (page, type) => {
  try {
    return await axios.get(encodeURI(`https://nookpedia.com/designs?page=${page}&type=${type}`));
  } catch (error) {
    console.error(error);
  }
};
export const get = async (page, type) => {
  const html = await getHtml(page, type);
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('.has-text-centered').children('.is-half-tablet');

  $bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find('h3.is-4').text(),
      code: $(this).find('h3.is-5').text(),
      imageUrl: $(this).find('img').attr('src'),
      type,
    };

    const data = ulList.filter((n) => n.title);
    return data;
  });
  return ulList;
};
