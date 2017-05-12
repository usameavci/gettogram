$(function () {

  function createZip(zipFile, imageUrls, itemIndex, callback) {
    var index = itemIndex || 0;

    if (index < imageUrls.length) {
      var image = imageUrls[index];
      JSZipUtils.getBinaryContent(image.url, function (err, data) {
        if (err) { reject(err); }

        zipFile.file(image.name, data, { binary: true });

        createZip(zipFile, imageUrls, index + 1, callback);
      });
    } else {
      if (callback instanceof Function) {
        callback(zipFile);
      }
    }
  }

  function createFullUrl(url) {
    return location.protocol + '//' + location.host + url;
  }

  $('.download-all').click(function () {

    var imageUrls = [];
    $(this).parents('.card').find('.table tbody tr').each(function (index, item) {
      var iurl = $(item).find('a.btn').attr('href');
      var iname = $(item).find('a.btn').attr('title');
      imageUrls.push({ url: createFullUrl(iurl), name: iname });
    });

    var zipFile = new JSZip();
    var a = createZip(zipFile, imageUrls, 0, function (zip) {
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          saveAs(content, Math.random().toString().substr(2) + ".zip");
        });
    });

  });
});
