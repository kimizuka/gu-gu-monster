(() => {
  const elm = document.createElement('div');
  const distCanvas = document.createElement('canvas');

  distCanvas.id = `c${ performance.now() }`;

  elm.appendChild(distCanvas);

  elm.style.cssText = `
    position: fixed;
    transform-origin: left top;
  `;

  document.body.appendChild(elm);

  function isInRange({
    video = document.createElement('video'),
    matList = [],
    onChangeRatio = function() {}
  } = {
    video: document.createElement('video'),
    matList: [],
    onChangeRatio: function() {}
  }) {
    const width = video.clientWidth;
    const height = video.clientHeight;
    const srcCanvas = document.createElement('canvas');
    const srcCtx = srcCanvas.getContext('2d');
    const srcMat = new cv.Mat(height, width, cv.CV_8UC4);
    const distMat = new cv.Mat();
    let ratio = 0;

    srcCanvas.width = width;
    srcCanvas.height = height;

    srcCtx.drawImage(video, 0, 0, width, height);
    srcMat.data.set(srcCtx.getImageData(0, 0, width, height).data);

    matList.forEach(({
      minMat,
      maxMat
    }) => {
      cv.cvtColor(srcMat, distMat, cv.COLOR_RGB2HSV_FULL);
      cv.inRange(distMat, minMat, maxMat, distMat);
      cv.medianBlur(distMat, distMat, 3);
      cv.imshow(distCanvas.id, distMat);  

      ratio += cv.countNonZero(distMat) / (distMat.cols * distMat.rows);
    });

    onChangeRatio(ratio);
  }

  window.ggm.isInRange = isInRange;
})();