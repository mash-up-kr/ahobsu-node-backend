const axios = require('axios');
const cheerio = require('cheerio');

export const getHtml = async (page) => {
  try {
    return await axios.get(`https://nookpedia.com/designs?page=${page}&type=Pattern`);
  } catch (error) {
    console.error(error);
  }
};
export const get = async (page) => {
  const html = await getHtml(page);
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('.has-text-centered').children('.is-half-tablet');

  $bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find('h2.is-4').text(),
      code: $(this).find('h3.is-5').text(),
      imageUrl: $(this).find('a').attr('href'),
      type: 'Pattern',
    };

    const data = ulList.filter((n) => n.title);
    return data;
  });
  return ulList;
};
