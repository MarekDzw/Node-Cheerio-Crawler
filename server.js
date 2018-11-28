const cheerio = require('cheerio');
const request = require('request');

request(
  'https://www.otodom.pl/sprzedaz/mieszkanie/kielce/?search%5Bdist%5D=0&search%5Bsubregion_id%5D=450&search%5Bcity_id%5D=181',
  function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('h3').each(function(i, element) {
        var a = $(this);
        var url = a.children('a').attr('href');
        if (url == undefined) {
          return;
        }
        console.log(url);
        getSingle(url);
      });
    }
  }
);

function getSingle(url) {
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      var title = $('.section-offer-title h1').text();
      var description = $('.text-contents')
        .children('div')
        .children('p')
        .text();
      var price = $('.param_price span strong').text();
      var size = $('.param_m span strong').text();
      var floor = $('.param_floor_no span strong').text();
      var img = $('.section-offer-gallery img').attr('src');
      var id = $('.col-md-offer-content')
        .children('.text-details')
        .children('.left')
        .children('p')
        .first()
        .text()
        .substr(20, 8);
      var offer = {
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
