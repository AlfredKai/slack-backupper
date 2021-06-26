// put urls into urlResources variable
(async function (urlResources) {
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  let count = 0;
  for (const fileUrl of urlResources) {
    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      var filename = new URL(fileUrl).pathname.replace('/', '%_%');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      count++;
      await delay(500);
    } catch (e) {
      console.log(e);
      console.log('file', fileUrl);
    }
  }
  console.log('complete', count);
})(urlResources);

// create an api at `http://127.0.0.1:56789/getNext` to pull url
(async function () {
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
  let count = 0;
  while (true) {
    let data = await fetch('http://127.0.0.1:56789/getNext');
    let fileUrl = await data.text();
    if (!fileUrl) break;
    try {
      console.log('download url:', fileUrl);
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(blob);
      var filename = new URL(fileUrl).pathname.replace('/', '%_%');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      count++;
      console.log('count:', count);
      await delay(500);
    } catch (e) {
      console.log(e);
      console.log('file', fileUrl);
    }
  }
  console.log('complete', count);
})();
