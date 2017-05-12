const UtilityService = {};

UtilityService.getImageName = function (url) {
  let splitted = url.split('/');
  return splitted[splitted.length - 1];
};

UtilityService.parseUrls = function (arr) {
  arr = arr
    .replace(/\r/gi, '')
    .split('\n');

  return this.cleanEmpty(arr);
};

UtilityService.cleanEmpty = function (arr) {
  return arr.filter(url => {
    return (url !== undefined && url !== '');
  });
};

UtilityService.randomString = function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

module.exports = UtilityService;
