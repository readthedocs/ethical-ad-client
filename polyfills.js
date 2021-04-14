/*  Polyfills for the ad client
 *
 *  For browser support, we aim for IE11,
 *   and the last 1 year's releases of Edge, FireFox, Chrome, and Safari
 */

/*
 * Object.entries polyfill
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 */
if (!Object.entries) {
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}
