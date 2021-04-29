(async function () {
  function delay(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  let data = ['aaa', 'bbb', 'ccc'];
  let count = 0;
  for (const fileUrl of data) {
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
})();
