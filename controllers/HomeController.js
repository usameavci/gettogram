const UtilityService = require('../services/UtilityService');
const ImageService = require('../services/ImageService');

const HomeController = {};

HomeController.index = (req, res) => {
  res.render('index');
};

HomeController.store = (req, res) => {
  const urlList = UtilityService.parseUrls(req.body.urls);

  ImageService.getShortenUrls(urlList)
    .then((shortenUrls) => {
      ImageService.getAbsoluteUrls(shortenUrls)
        .then(absoluteUrls => {
          let images = [];
          absoluteUrls.map(url => images.push({ url: url, name: UtilityService.getImageName(url) }));

          res.render('index', { images: images });

        });
    });
};

HomeController.download = (req, res) => {

  if (!req.query.url) {
    res.end('Error!');
  }

  ImageService.save(req.query.url)
    .then(response => {
      res.download(response.path, response.name, () => {
        ImageService.remove(response.path);
      });
    });
};

module.exports = HomeController;
