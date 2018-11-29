const cheerio = require('cheerio');
const request = require('request');

request(
  'https://www.otodom.pl/sprzedaz/mieszkanie/kielce/?search%5Bdist%5D=0&search%5Bsubregion_id%5D=450&search%5Bcity_id%5D=181',
  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      $('h3').each(function(i, element) {
        let a = $(this);
        let url = a.children('a').attr('href');
        if (url == undefined) {
          return;
        }
        getSingle(url);
      });
    }
  }
);

function getSingle(url) {
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);

      let title = $('.section-offer-title h1').text();
      let description = $('.text-contents')
        .children('div')
        .children('p')
        .text();
      let price = $('.param_price span strong').text();
      let size = $('.param_m span strong').text();
      let floor = $('.param_floor_no span strong').text();
      let img = $('.section-offer-gallery img').attr('src');
      let id = $('.col-md-offer-content')
        .children('.text-details')
        .children('.left')
        .children('p')
        .first()
        .text()
        .substr(20, 8);
      let offer = {
        title: title,
        description: description,
        price: price,
        size: size,
        floor: floor,
        img: img,
        id: id
      };
      console.log(offer);
    }
  });
}
