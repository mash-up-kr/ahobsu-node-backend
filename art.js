const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async () => {
  try {
    return await axios.get(encodeURI(`https://gamewith.net/animal-crossing-new-horizons/article/show/18091`));
  } catch (error) {
    console.error(error);
  }
};
export const get = async () => {
  const html = await getHtml();
  let ulList = [];
  const $ = cheerio.load(html.data);
  for (let i = 0; i < 43; i++) {
    const name = Array.from($('h3'))[i].attribs.id;
    console.log(i, name);
    const realImageUrl = Array.from($('.acnh_center'))[i].children[0].children[0].children[1].children[0].children[0]
      .attribs.href;
    const fakeImageUrl =
      (Array.from($('.acnh_center'))[i].children[0].children[0].children[1].children[1].children[0].attribs &&
        Array.from($('.acnh_center'))[i].children[0].children[0].children[1].children[1].children[0].attribs.href) ||
      null;
    const realComment = Array.from($('.acnh_center'))[i].children[0].children[0].children[5].children[0].children[2]
      .data;
    const fakeComment =
      (Array.from($('.acnh_center'))[i].children[0].children[0].children[5].children[0].children[6] &&
        Array.from($('.acnh_center'))[i].children[0].children[0].children[5].children[0].children[6].data) ||
      null;
    ulList.push({ name, realImageUrl, fakeImageUrl, realComment, fakeComment });
  }

  console.log(ulList);
  return ulList;
};

get();
