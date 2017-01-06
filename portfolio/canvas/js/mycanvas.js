/* jshint esversion: 6 */

var MyCanvas = ( function( context ){
  var ctx = context;
  var ctxWidth = ctx.canvas.clientWidth;
  var ctxHeight = ctx.canvas.clientHeight;

  ctx.translate( 0.5*ctxWidth, 0.5*ctxHeight);

  var flipY = 1;

  var defaultStyles = {
    stroke: "#000",
    fill: "transparent",
    axes: "#666",
    circle: {
      stroke: "#F00",
      fill: "transparent"
    },
    line: {
      width: 1,
      stroke: "#000"
    }
  };

  var styleProperties ={
    stroke: "strokeStyle",
    fill: "fillStyle",
    width: "lineWidth"
  };

  var accepted = ["stroke", "fill", "width"];

  /* Instead of separated request them as an object
  #
  # @param styles: object with styles like
  #                - stroke
  #                - fill
  #                - linewidth
  #
  # @return: void, styling is applied inside the function
  #
  # Remark: call clearStyling after ending the drawing function
  */
  var setProp = function ( prop, val ){
    ctx[prop] = val;
  };

  var setStyling = function( styles  ){

    if( typeof styles === 'undefined' )
      return;

    var styleNames = Object.getOwnPropertyNames(styles);

    styleNames = styleNames.filter( function(el){
        return (accepted.indexOf(el) > -1);
    });

    styleNames.forEach( (name) => setProp(styleProperties[name], styles[name]) );

  };

  /* Restore styling to default */
  var clearStyling = function( ){
      ctx.restore();
  };

  /* Flip Y-direction */
  var setYdirection = function ( flip ){
    if( flip >= 1 ){
        flipY = -1;
        console.log(flipY);
    }else if( flip < 1){
        flipY = 1;
        console.log(flipY);
      }
  };

  /* Simple functions */

  var drawLine = function( x1, y1, x2, y2, styles){

    setStyling( styles );

    ctx.moveTo( x1, flipY*y1 );
    ctx.lineTo( x2, flipY*y2);
    ctx.stroke();

    clearStyling();
  };

  /* Draw a circle */
  var drawCircle = function ( cx, cy, r, styles){

    setStyling( styles );

    ctx.beginPath();
    ctx.arc(cx,flipY*cy,r,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    clearStyling();
  };

  /* HIGH LEVEL WRAPPERS FOR COMBINED DRAWINGS */
  /* Draw axes */
  var drawAxes = function ( styles ){
    styles = styles || {stroke: defaultStyles.axes};

    drawLine( 0, -0.5*ctxHeight, 0, 0.5*ctxHeight, styles);
    drawLine( -0.5*ctxWidth, 0, 0.5*ctxWidth, 0, styles);
  };

  return {
    drawCircle: drawCircle,
    drawAxes: drawAxes,
    'flipY': setYdirection
  };

})(document.getElementById("draw").getContext("2d"));
