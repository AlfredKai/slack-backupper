const urlResources = [];
const DDH = { count: 0, error: [], lastUrl: '' };

// put urls into urlResources variable
(async function (urlResources, DDH) {
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  for (const fileUrl of urlResources) {
    try {
      DDH.count++;
      DDH.lastUrl = fileUrl;
      console.log(`${DDH.count} download url: ${DDH.lastUrl}`);

      const res = await fetch(fileUrl);
      const blob = await res.blob();
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      var filename = new URL(fileUrl).pathname.replace('/', '%_%');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);

      await delay(500);
    } catch (e) {
      console.log(e);
      const msg = `failed url: ${fileUrl}`;
      console.log(msg);
      DDH.error.push(msg);
    }
  }
  console.log('complete', DDH.count);
})(urlResources, DDH);
