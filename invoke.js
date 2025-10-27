(function() { 
  if (typeof atOptions === 'undefined') { 
    console.error('Ad configuration not found'); 
    return; 
  } 

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

  var ads = { 
    "4e49cd04045c53ff886d75d75714e99a": { 
      image: "https://i.ibb.co.com/mC7dHrKR/falcon-cast-banner-psd.png", 
      link: "https://www.effectivegatecpm.com/tqva3m7mbq?key=f024250e2898bc96504aade83c158577" 
    } 
  }; 

  var doc = iframe.contentWindow.document; 
  var selected = ads[ad.key]; 

  if (selected) { 
    doc.open(); 
    doc.write(`
      <a href="${selected.link}" target="_blank" rel="noopener">
        <img src="${selected.image}" width="${ad.width}" height="${ad.height}" style="display:block;border:0;">
      </a>
    `); 
    doc.close(); 
  } else { 
    doc.open(); 
    doc.write("<div style='font-size:12px;text-align:center;padding:10px;'>No ad found for key</div>"); 
    doc.close(); 
  } 
})();
