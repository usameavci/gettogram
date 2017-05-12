const Unirest = require('unirest');
const Mime = require('mime');
const Path = require('path');
const Fs = require('fs');
const Https = require('https');

const Config = require('../config');
const UtilityService = require('../services/UtilityService');

const ImageService = {};

ImageService.getShortenUrls = (urls) => {
  urls = UtilityService.cleanEmpty(urls);

  let promiseList = [];

  urls.map(url => {
    promiseList.push(new Promise((resolve, reject) => {
      Unirest.post('http://www.igeturl.com/get.php')
        .send({ url: url })
        .end(response => {
          const parsedBody = JSON.parse(response.body);
          return resolve(parsedBody.message);
        });
    }));
  });

  return Promise.all(promiseList);
};

ImageService.getAbsoluteUrls = (urls) => {
  urls = UtilityService.cleanEmpty(urls);

  let promiseList = [];

  urls.map(url => {
    promiseList.push(new Promise((resolve, reject) => {
      Unirest
        .get(Config.bitly.expandEndpoint)
        .query({
          access_token: Config.bitly.access_token,
          shortUrl: url
        })
        .end(response => {
          return resolve(response.body.data.expand[0].long_url);
        });
    }));
  });

  return Promise.all(promiseList);
};

ImageService.save = (fileUrl) => {
  const mimetype = Mime.lookup(fileUrl);
  const extension = Path.extname(fileUrl);
  const fileName = UtilityService.randomString() + extension;
  const filePath = Config.paths.image + fileName;

  return new Promise((resolve, reject) => {

    Https.get(fileUrl, function (response) {
      var imagedata = '';
      response.setEncoding('binary');

      response.on('data', function (chunk) {
        imagedata += chunk;
      });

      response.on('end', function () {
        if (!Fs.existsSync(Config.paths.image)) {
          Fs.mkdirSync(Config.paths.image);
        }

        Fs.writeFile(filePath, imagedata, 'binary', function (err) {
          if (err) throw err;

          resolve({ path: filePath, name: fileName });
        });
      });
    });
  });
};

ImageService.remove = (filePath) => {
  Fs.unlink(filePath);
};

module.exports = ImageService;
