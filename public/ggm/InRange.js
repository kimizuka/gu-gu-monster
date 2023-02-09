(() => {
  class InRange {
    id;
    width;
    height;
    video;
    matList;
    onChangeRatio;
    fps;
    srcCtx;
    srcMat;
    distMat;
    ratio;

    constructor({
      video = document.createElement('video'),
      matList = [],
      onChangeRatio = function() {},
      fps = 8
    } = {
      video: document.createElement('video'),
      matList: [],
      onChangeRatio: function() {},
      fps: 8
    }) {
      const elm = document.createElement('div');
      const distCanvas = document.createElement('canvas');
      const srcCanvas = document.createElement('canvas');

      this.id = `c${ performance.now() }`;
      this.width = video.clientWidth;
      this.height = video.clientHeight;
      this.video = video;
      this.onChangeRatio = onChangeRatio;
      this.fps = fps;
      this.srcCtx = srcCanvas.getContext('2d');
      this.srcMat = new cv.Mat(this.height, this.width, cv.CV_8UC4);
      this.distMat = new cv.Mat();
      this.ratio = 0;

      distCanvas.id = this.id;

      elm.appendChild(distCanvas);

      elm.style.cssText = `
        position: fixed;
        transform-origin: left top;
      `;

      document.body.appendChild(elm);

      srcCanvas.width = this.width;
      srcCanvas.height = this.height;

      this.setMatList(matList);
      this.tick();
    }

    setMatList(matList) {
      this.matList = matList;
    }

    tick() {
      const begin = Date.now();

      this.srcCtx.drawImage(this.video, 0, 0, this.width, this.height);
      this.srcMat.data.set(this.srcCtx.getImageData(0, 0, this.width, this.height).data);
      this.ratio = 0;

      this.matList.forEach(({
        minMat,
        maxMat
      }) => {
        cv.cvtColor(this.srcMat, this.distMat, cv.COLOR_RGB2HSV_FULL);
        cv.inRange(this.distMat, minMat, maxMat, this.distMat);
        cv.medianBlur(this.distMat, this.distMat, 3);
        cv.imshow(this.id, this.distMat);  

        this.ratio += cv.countNonZero(this.distMat) / (this.distMat.cols * this.distMat.rows);
      });

      this.onChangeRatio(this.ratio);

      const delay = 1000 / this.fps - (Date.now() - begin);

      setTimeout(() => this.tick(), delay);
    }
  }

  window.ggm.InRange = InRange;
})();