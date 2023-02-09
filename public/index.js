const Module = {
  onRuntimeInitialized() {
    const medias = {
      audio: false,
      video: {
        facingMode: 'user'
      }
    };
    const promise = navigator.mediaDevices.getUserMedia(medias);

    promise.then(successCallback).catch(errorCallback);
  }
};

function successCallback(stream) {
  const socket = io.connect();
  const video = document.getElementById('video');
  const colors = ['notBlack', 'red', 'blue', 'green', 'yellow'];
  const fps = 16;
  const ok = new Howl({
    src: ['/mp3/ok.mp3'],
    volume: 2,
    onend: () => setTimeout(() => selectColor(), 1000)
  });
  const orderVoice = {
    red: new Howl({
      src: ['/mp3/red.mp3'],
      volume: 2
    }),
    blue: new Howl({
      src: ['/mp3/blue.mp3'],
      volume: 2,
    }),
    green: new Howl({
      src: ['/mp3/green.mp3'],
      volume: 2,
    }),
    yellow: new Howl({
      src: ['/mp3/yellow.mp3'],
      volume: 2,
    })
  };
  let inRange = null;
  let isMove = false;
  let currentColorIndex = 0;
  let ratio = 0;

  video.oncanplay = () => {
    const button = document.querySelector('button');

    button.addEventListener('click', () => {
      inRange = new ggm.InRange({
        video,
        matList: ggm.getColorMats(colors[currentColorIndex]),
        onChangeRatio,
        fps
      });

      new ggm.MotionDetection({
        video,
        onMove,
        onStop,
        fps
      });

      button.style.display = 'none';
      setTimeout(() => selectColor(), 2000);
    }, false);

    button.style.display = 'block';
  };

  setInterval(() => {
    const canvasList = document.querySelectorAll('canvas') || [];

    socket.emit('video', {
      dataURL: {
        src: canvasList[1] && canvasList[1].toDataURL('jpg', .1),
        dist: canvasList[0] && canvasList[0].toDataURL('jpg', .1)
      },
      isMove,
      ratio
    });
  }, 1000 / fps);

  video.srcObject = stream;

  function onMove() {
    isMove = true;
  }

  function onStop() {
    isMove = false;
  }

  function onChangeRatio(newRatio) {
    ratio = newRatio;

    if (currentColorIndex) {
      if (isMove && ggm.getColorMats(colors[currentColorIndex])[0].limitRatio < ratio) {
        if (!ok.playing()) {
          ok.play();
        }
      }
    }
  }

  function selectColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;

    if (!currentColorIndex) {
      currentColorIndex = 1;
    }

    inRange.setMatList(ggm.getColorMats(colors[currentColorIndex]));
    orderVoice[colors[currentColorIndex]].play();
  }
}

function errorCallback(err) {
  alert(err);
};