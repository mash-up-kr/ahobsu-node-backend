const axios = require('axios');
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const getHtml = async (type) => {
  try {
    return await axios.get(encodeURI(`https://animalcrossing.fandom.com/wiki/${type}`));
  } catch (error) {
    console.error(error);
  }
};
const get = async (type) => {
  const html = await getHtml(type);
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $('tbody').children('tr');

  $bodyList.each(function (i, elem) {
    ulList[i] = {
      title: $(this).find('.image-thumbnail img').attr('src'),
    };

    const data = ulList.filter((n) => n.title);
    return data;
  });
  // console.log(ulList);
  return !!ulList[1] && ulList[1].title;
};

const fetch = async () => {
  const arr = [
    'Agent K.K.',
    'Aloha K.K.',
    'Animal City',
    'Bubblegum K.K.',
    'Café K.K.',
    'Comrade K.K.',
    'DJ K.K.',
    "Drivin'",
    'Farewell',
    'Forest Life',
    'Go K.K. Rider',
    'Hypno K.K.',
    'I Love You',
    'Imperial K.K.',
    'K.K. Adventure',
    'K.K. Aria',
    'K.K. Ballad',
    'K.K. Bazaar',
    'K.K. Birthday',
    'K.K. Blues',
    'K.K. Bossa',
    'K.K. Calypso',
    'K.K. Casbah',
    'K.K. Chorale',
    'K.K. Condor',
    'K.K. Country',
    "K.K. Cruisin'",
    'K.K. D&B',
    'K.K. Dirge',
    'K.K. Disco',
    'K.K. Dixie',
    'K.K. Étude',
    'K.K. Faire',
    'K.K. Flamenco',
    'K.K. Folk',
    'K.K. Fusion',
    'K.K. Groove',
    'K.K. Gumbo',
    'K.K. House',
    'K.K. Island',
    'K.K. Jazz',
    'K.K. Jongara',
    'K.K. Lament',
    'K.K. Love Song',
    'K.K. Lullaby',
    'K.K. Mambo',
    'K.K. Marathon',
    'K.K. March',
    'K.K. Metal',
    'K.K. Milonga',
    'K.K. Moody',
    'K.K. Oasis',
    'K.K. Parade',
    'K.K. Ragtime',
    'K.K. Rally',
    'K.K. Reggae',
    'K.K. Rock',
    'K.K. Rockabilly',
    'K.K. Safari',
    'K.K. Salsa',
    'K.K. Samba',
    'K.K. Ska',
    'K.K. Sonata',
    'K.K. Song',
    'K.K. Soul',
    'K.K. Steppe',
    'K.K. Stroll',
    'K.K. Swing',
    'K.K. Synth',
    'K.K. Tango',
    'K.K. Technopop',
    'K.K. Waltz',
    'K.K. Western',
    'King K.K.',
    'Lucky K.K.',
    'Marine Song 2001',
    'Mountain Song',
    'Mr. K.K.',
    'My Place',
    'Neapolitan',
    'Only Me',
    'Pondering',
    "Rockin' K.K.",
    'Señor K.K.',
    'Soulful K.K.',
    'Space K.K.',
    'Spring Blossoms',
    'Stale Cupcakes',
    'Steep Hill',
    "Surfin' K.K.",
    'The K. Funk',
    'To the Edge',
    'Two Days Ago',
    'Wandering',
    'Welcome Horizons',
  ];
  arr.map(async (a) => {
    const url = await get(a);
    console.log(url);
    if (!url) {
      console.log(a);
      return;
    } else {
      // // 저장할 위치를 지정
      const savepath = './public/musics/images/' + a + '.png';
      // 출력 지정
      const outfile = fs.createWriteStream(savepath);
      // 비동기로 URL의 파일 다운로드
      https.get(url, function (res) {
        res.pipe(outfile);
        res.on('end', function () {
          outfile.close();
          console.log('ok');
        });
      });
    }
  });
  // const url = 'https://nooksisland.com' + d.imageUrl;
};

fetch();
