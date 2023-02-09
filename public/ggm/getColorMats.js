(() => {
  function getColorMats(color = 'notBlack') {
    const maximumMats = ggm.getMaximumMats();

    return {
      notBlack : [{
        minMat: maximumMats.notBlackMinMat,
        maxMat: maximumMats.notBlackMaxMat,
        limitRatio: 1
      }],
      red: [{
        minMat: maximumMats.red2MinMat,
        maxMat: maximumMats.red2MaxMat,
        limitRatio: .02
      }, {
        minMat: maximumMats.red1MinMat,
        maxMat: maximumMats.red1MaxMat,
        limitRatio: .02
      }],
      blue: [{
        minMat: maximumMats.blueMinMat,
        maxMat: maximumMats.blueMaxMat,
        limitRatio: .02
      }],
      green: [{
        minMat: maximumMats.greenMinMat,
        maxMat: maximumMats.greenMaxMat,
        limitRatio: .15
      }],
      yellow: [{
        minMat: maximumMats.yellowMinMat,
        maxMat: maximumMats.yellowMaxMat,
        limitRatio: .1
      }],
    }[color];
  }

  window.ggm.getColorMats = getColorMats;
})();