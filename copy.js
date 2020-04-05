const axios = require('axios');
const cheerio = require('cheerio');

export const getHtml = async (page) => {
  try {
    return await axios.get(`https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)`);
  } catch (error) {
    console.error(error);
  }
};
export const get = async (page) => {
  const html = await getHtml(page);
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('tbody').children('tr');

  $bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find('td:nth-child(1)').text(),
      imageUrl: $(this).find('.image-thumbnail').attr('href'),
      type: 'Brimmed hat',
    };

    const data = ulList.filter((n) => n.title);
    return data;
  });
  return ulList;
};
