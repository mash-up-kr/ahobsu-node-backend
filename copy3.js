const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const getHtml = async () => {
  try {
    return await axios.get(encodeURI(`https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)`));
  } catch (error) {
    console.error(error);
  }
};
export const get = async () => {
  const html = await getHtml();
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('tbody').children('tr');

  $bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find('td:nth-child(1)').text(),
      imageUrl: $(this).find('td:nth-child(2) a').attr('href'),
      price: $(this).find('td:nth-child(3)').text(),
    };

    const data = ulList.filter((n) => n.title);
    return data;
  });
  console.log(ulList);
  //return !!ulList[1] && ulList[1].title;
  return ulList;
};
get();
