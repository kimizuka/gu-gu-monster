(() => {
  function getMaximumMats() {
    return {
      notBlackMinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          0,
          0,
          64
        ]
      ),
      notBlackMaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          255,
          255,
          255
        ]
      ),
      red1MinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          0,
          64,
          0
        ]
      ),
      red1MaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          21,
          255,
          255
        ]
      ),
      red2MinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          212,
          64,
          0
        ]
      ),
      red2MaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          255,
          255,
          255
        ]
      ),
      blueMinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          127,
          64,
          0
        ]
      ),
      blueMaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          213,
          255,
          255
        ]
      ),
      greenMinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          43,
          64,
          0
        ]
      ),
      greenMaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          127,
          255,
          255
        ]
      ),
      yellowMinMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          30,
          51,
          0
        ]
      ),
      yellowMaxMat: cv.matFromArray(
        1,
        3,
        cv.CV_8UC1,
        [
          43,
          255,
          255
        ]
      )
    }
  }

  window.ggm.getMaximumMats = getMaximumMats;
})();