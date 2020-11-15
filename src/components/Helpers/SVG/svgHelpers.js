const SVGHelpers = {};

SVGHelpers.convertScreenToSVGCoords = function(svgEl, x, y) {
  console.log(svgEl);
  let pt = svgEl.createSVGPoint();

  pt.x = x;
  pt.y = y;

  return pt.matrixTransform(svgEl.getScreenCTM().inverse());
};

module.exports = SVGHelpers;
