(function() {
  if (typeof atOptions === 'undefined') return;

  var ad = atOptions;
  var iframe = document.createElement('iframe');
  iframe.width = ad.width || 320;
  iframe.height = ad.height || 50;
  iframe.style.border = "0";
  iframe.scrolling = "no";
  iframe.frameBorder = "0";
  iframe.marginWidth = "0";
  iframe.marginHeight = "0";

  document.currentScript.parentNode.insertBefore(iframe, document.currentScript);
  var doc = iframe.contentWindow.document;

  function loadData() {
    return new Promise(function(resolve) {
      var data = {
        "4e49cd04045c53ff886d75d75714e99a": {
          "BD": {
            "images": [
              "https://i.ibb.co.com/mC7dHrKR/falcon-cast-banner-psd.png",
              "https://i.ibb.co.com/W4v11SpR/falcon-cast-banner-bangla.png"
            ],
            "link": "https://www.effectivegatecpm.com/tqva3m7mbq?key=f024250e2898bc96504aade83c158577"
          },
          "IN": {
            "images": [
              "https://i.postimg.cc/nM8yY3jD/falcon-high-in-banner-1.png",
              "https://i.ibb.co.com/mC7dHrKR/falcon-cast-banner-psd.png"
            ],
            "link": "https://www.effectivegatecpm.com/tqva3m7mbq?key=f024250e2898bc96504aade83c158577"
          },
          "default": {
            "images": ["https://i.ibb.co.com/mC7dHrKR/falcon-cast-banner-psd.png"],
            "link": "https://www.effectivegatecpm.com/tqva3m7mbq?key=f024250e2898bc96504aade83c158577"
          }
        }
      };
      resolve(data);
    });
  }

  function getCountry() {
    return new Promise(function(resolve) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        try {
          resolve(JSON.parse(xhr.responseText).country_code || 'default');
        } catch (e) {
          resolve('default');
        }
      };
      xhr.onerror = function() { resolve('default'); };
      xhr.open('GET', 'https://ipwhois.app/json/', true);
      xhr.send();
    });
  }

  function renderAd(adData, country) {
    var config = adData[ad.key];
    if (!config) {
      doc.write('<div style="font-size:12px;text-align:center;padding:10px;color:#666;">Ad not found</div>');
      return;
    }

    var countryConfig = config[country] || config.default;
    if (!countryConfig || !countryConfig.images || countryConfig.images.length === 0) {
      doc.write('<div style="font-size:12px;text-align:center;padding:10px;color:#666;">No ads available</div>');
      return;
    }

    var currentIndex = 0;
    function showImage() {
      var img = countryConfig.images[currentIndex];
      doc.open();
      doc.write('<a href="' + countryConfig.link + '" target="_blank" style="display:block;text-decoration:none;">' +
                '<img src="' + img + '" style="width:100%;height:100%;border:0;display:block;" alt="Ad">' +
                '</a>');
      doc.close();
    }

    showImage();
    
    if (countryConfig.images.length > 1) {
      setInterval(function() {
        currentIndex = (currentIndex + 1) % countryConfig.images.length;
        showImage();
      }, 3000);
    }
  }

  Promise.all([loadData(), getCountry()]).then(function(results) {
    var adData = results[0];
    var country = results[1];
    
    if (adData && ad.key) {
      renderAd(adData, country);
    } else {
      doc.write('<div style="font-size:12px;text-align:center;padding:10px;color:#666;">Error loading ad</div>');
    }
  });
})();
