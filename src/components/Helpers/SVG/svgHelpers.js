const SVGHelpers = {};

SVGHelpers.convertScreenToSVGCoords = function(svgEl, x, y) {
  let pt = svgEl.createSVGPoint();

  console.log(x, y);

  pt.x = x;
  pt.y = y;

  console.log(pt);

  return pt.matrixTransform(svgEl.getScreenCTM().inverse());
};

module.exports = SVGHelpers;
