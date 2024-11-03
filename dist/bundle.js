/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_addons_webxr_ARButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/addons/webxr/ARButton.js */ \"./node_modules/three/examples/jsm/webxr/ARButton.js\");\n\r\n\r\n\r\nlet container;\r\nlet camera, scene, renderer;\r\nlet controller;\r\n\r\nlet reticle;\r\n\r\nlet hitTestSource = null;\r\nlet hitTestSourceRequested = false;\r\n\r\ninit();\r\n\r\nfunction init() {\r\n\r\n    container = document.createElement( 'div' );\r\n\tdocument.body.appendChild( container );\r\n\r\n\tscene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\n\r\n\tcamera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );\r\n\r\n\tconst light = new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight( 0xffffff, 0xbbbbff, 3 );\r\n\tlight.position.set( 0.5, 1, 0.25 );\r\n\tscene.add( light );\r\n\r\n\t\t\t\t//\r\n\r\n\trenderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer( { antialias: true, alpha: true } );\r\n\trenderer.setPixelRatio( window.devicePixelRatio );\r\n\trenderer.setSize( window.innerWidth, window.innerHeight );\r\n\trenderer.setAnimationLoop( animate );\r\n\trenderer.xr.enabled = true;\r\n\tcontainer.appendChild( renderer.domElement );\r\n\r\n\t\t\t\t//\r\n\r\n\tdocument.body.appendChild( three_addons_webxr_ARButton_js__WEBPACK_IMPORTED_MODULE_1__.ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );\r\n\r\n\t\t\t\t//\r\n\r\n\tconst geometry = new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );\r\n\r\n\t\t\t\tfunction onSelect() {\r\n\r\n\t\t\t\t\tif ( reticle.visible ) {\r\n\r\n\t\t\t\t\t\tconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial( { color: 0xffffff * Math.random() } );\r\n\t\t\t\t\t\tconst mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( geometry, material );\r\n\t\t\t\t\t\treticle.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );\r\n\t\t\t\t\t\tmesh.scale.y = Math.random() * 2 + 1;\r\n\t\t\t\t\t\tscene.add( mesh );\r\n\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t}\r\n\r\n\t\t\t\tcontroller = renderer.xr.getController( 0 );\r\n\t\t\t\tcontroller.addEventListener( 'select', onSelect );\r\n\t\t\t\tscene.add( controller );\r\n\r\n\t\t\t\treticle = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(\r\n\t\t\t\t\tnew three__WEBPACK_IMPORTED_MODULE_0__.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),\r\n\t\t\t\t\tnew three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial()\r\n\t\t\t\t);\r\n\t\t\t\treticle.matrixAutoUpdate = false;\r\n\t\t\t\treticle.visible = false;\r\n\t\t\t\tscene.add( reticle );\r\n\r\n\t\t\t\t//\r\n\r\n\t\t\t\twindow.addEventListener( 'resize', onWindowResize );\r\n\r\n\t\t\t}\r\n\r\n\t\t\tfunction onWindowResize() {\r\n\r\n\t\t\t\tcamera.aspect = window.innerWidth / window.innerHeight;\r\n\t\t\t\tcamera.updateProjectionMatrix();\r\n\r\n\t\t\t\trenderer.setSize( window.innerWidth, window.innerHeight );\r\n\r\n\t\t\t}\r\n\r\n\t\t\t//\r\n\r\n\t\t\tfunction animate( timestamp, frame ) {\r\n\r\n\t\t\t\tif ( frame ) {\r\n\r\n\t\t\t\t\tconst referenceSpace = renderer.xr.getReferenceSpace();\r\n\t\t\t\t\tconst session = renderer.xr.getSession();\r\n\r\n\t\t\t\t\tif ( hitTestSourceRequested === false ) {\r\n\r\n\t\t\t\t\t\tsession.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {\r\n\r\n\t\t\t\t\t\t\tsession.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {\r\n\r\n\t\t\t\t\t\t\t\thitTestSource = source;\r\n\r\n\t\t\t\t\t\t\t} );\r\n\r\n\t\t\t\t\t\t} );\r\n\r\n\t\t\t\t\t\tsession.addEventListener( 'end', function () {\r\n\r\n\t\t\t\t\t\t\thitTestSourceRequested = false;\r\n\t\t\t\t\t\t\thitTestSource = null;\r\n\r\n\t\t\t\t\t\t} );\r\n\r\n\t\t\t\t\t\thitTestSourceRequested = true;\r\n\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\tif ( hitTestSource ) {\r\n\r\n\t\t\t\t\t\tconst hitTestResults = frame.getHitTestResults( hitTestSource );\r\n\r\n\t\t\t\t\t\tif ( hitTestResults.length ) {\r\n\r\n\t\t\t\t\t\t\tconst hit = hitTestResults[ 0 ];\r\n\r\n\t\t\t\t\t\t\treticle.visible = true;\r\n\t\t\t\t\t\t\treticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );\r\n\r\n\t\t\t\t\t\t} else {\r\n\r\n\t\t\t\t\t\t\treticle.visible = false;\r\n\r\n\t\t\t\t\t\t}\r\n\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t}\r\n\r\n\t\t\t\trenderer.render( scene, camera );\r\n\r\n\t\t\t}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./node_modules/three/examples/jsm/webxr/ARButton.js":
/*!***********************************************************!*\
  !*** ./node_modules/three/examples/jsm/webxr/ARButton.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ARButton: () => (/* binding */ ARButton)\n/* harmony export */ });\nclass ARButton {\n\n\tstatic createButton( renderer, sessionInit = {} ) {\n\n\t\tconst button = document.createElement( 'button' );\n\n\t\tfunction showStartAR( /*device*/ ) {\n\n\t\t\tif ( sessionInit.domOverlay === undefined ) {\n\n\t\t\t\tconst overlay = document.createElement( 'div' );\n\t\t\t\toverlay.style.display = 'none';\n\t\t\t\tdocument.body.appendChild( overlay );\n\n\t\t\t\tconst svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );\n\t\t\t\tsvg.setAttribute( 'width', 38 );\n\t\t\t\tsvg.setAttribute( 'height', 38 );\n\t\t\t\tsvg.style.position = 'absolute';\n\t\t\t\tsvg.style.right = '20px';\n\t\t\t\tsvg.style.top = '20px';\n\t\t\t\tsvg.addEventListener( 'click', function () {\n\n\t\t\t\t\tcurrentSession.end();\n\n\t\t\t\t} );\n\t\t\t\toverlay.appendChild( svg );\n\n\t\t\t\tconst path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );\n\t\t\t\tpath.setAttribute( 'd', 'M 12,12 L 28,28 M 28,12 12,28' );\n\t\t\t\tpath.setAttribute( 'stroke', '#fff' );\n\t\t\t\tpath.setAttribute( 'stroke-width', 2 );\n\t\t\t\tsvg.appendChild( path );\n\n\t\t\t\tif ( sessionInit.optionalFeatures === undefined ) {\n\n\t\t\t\t\tsessionInit.optionalFeatures = [];\n\n\t\t\t\t}\n\n\t\t\t\tsessionInit.optionalFeatures.push( 'dom-overlay' );\n\t\t\t\tsessionInit.domOverlay = { root: overlay };\n\n\t\t\t}\n\n\t\t\t//\n\n\t\t\tlet currentSession = null;\n\n\t\t\tasync function onSessionStarted( session ) {\n\n\t\t\t\tsession.addEventListener( 'end', onSessionEnded );\n\n\t\t\t\trenderer.xr.setReferenceSpaceType( 'local' );\n\n\t\t\t\tawait renderer.xr.setSession( session );\n\n\t\t\t\tbutton.textContent = 'STOP AR';\n\t\t\t\tsessionInit.domOverlay.root.style.display = '';\n\n\t\t\t\tcurrentSession = session;\n\n\t\t\t}\n\n\t\t\tfunction onSessionEnded( /*event*/ ) {\n\n\t\t\t\tcurrentSession.removeEventListener( 'end', onSessionEnded );\n\n\t\t\t\tbutton.textContent = 'START AR';\n\t\t\t\tsessionInit.domOverlay.root.style.display = 'none';\n\n\t\t\t\tcurrentSession = null;\n\n\t\t\t}\n\n\t\t\t//\n\n\t\t\tbutton.style.display = '';\n\n\t\t\tbutton.style.cursor = 'pointer';\n\t\t\tbutton.style.left = 'calc(50% - 50px)';\n\t\t\tbutton.style.width = '100px';\n\n\t\t\tbutton.textContent = 'START AR';\n\n\t\t\tbutton.onmouseenter = function () {\n\n\t\t\t\tbutton.style.opacity = '1.0';\n\n\t\t\t};\n\n\t\t\tbutton.onmouseleave = function () {\n\n\t\t\t\tbutton.style.opacity = '0.5';\n\n\t\t\t};\n\n\t\t\tbutton.onclick = function () {\n\n\t\t\t\tif ( currentSession === null ) {\n\n\t\t\t\t\tnavigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );\n\n\t\t\t\t} else {\n\n\t\t\t\t\tcurrentSession.end();\n\n\t\t\t\t\tif ( navigator.xr.offerSession !== undefined ) {\n\n\t\t\t\t\t\tnavigator.xr.offerSession( 'immersive-ar', sessionInit )\n\t\t\t\t\t\t\t.then( onSessionStarted )\n\t\t\t\t\t\t\t.catch( ( err ) => {\n\n\t\t\t\t\t\t\t\tconsole.warn( err );\n\n\t\t\t\t\t\t\t} );\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tif ( navigator.xr.offerSession !== undefined ) {\n\n\t\t\t\tnavigator.xr.offerSession( 'immersive-ar', sessionInit )\n\t\t\t\t\t.then( onSessionStarted )\n\t\t\t\t\t.catch( ( err ) => {\n\n\t\t\t\t\t\tconsole.warn( err );\n\n\t\t\t\t\t} );\n\n\t\t\t}\n\n\t\t}\n\n\t\tfunction disableButton() {\n\n\t\t\tbutton.style.display = '';\n\n\t\t\tbutton.style.cursor = 'auto';\n\t\t\tbutton.style.left = 'calc(50% - 75px)';\n\t\t\tbutton.style.width = '150px';\n\n\t\t\tbutton.onmouseenter = null;\n\t\t\tbutton.onmouseleave = null;\n\n\t\t\tbutton.onclick = null;\n\n\t\t}\n\n\t\tfunction showARNotSupported() {\n\n\t\t\tdisableButton();\n\n\t\t\tbutton.textContent = 'AR NOT SUPPORTED';\n\n\t\t}\n\n\t\tfunction showARNotAllowed( exception ) {\n\n\t\t\tdisableButton();\n\n\t\t\tconsole.warn( 'Exception when trying to call xr.isSessionSupported', exception );\n\n\t\t\tbutton.textContent = 'AR NOT ALLOWED';\n\n\t\t}\n\n\t\tfunction stylizeElement( element ) {\n\n\t\t\telement.style.position = 'absolute';\n\t\t\telement.style.bottom = '20px';\n\t\t\telement.style.padding = '12px 6px';\n\t\t\telement.style.border = '1px solid #fff';\n\t\t\telement.style.borderRadius = '4px';\n\t\t\telement.style.background = 'rgba(0,0,0,0.1)';\n\t\t\telement.style.color = '#fff';\n\t\t\telement.style.font = 'normal 13px sans-serif';\n\t\t\telement.style.textAlign = 'center';\n\t\t\telement.style.opacity = '0.5';\n\t\t\telement.style.outline = 'none';\n\t\t\telement.style.zIndex = '999';\n\n\t\t}\n\n\t\tif ( 'xr' in navigator ) {\n\n\t\t\tbutton.id = 'ARButton';\n\t\t\tbutton.style.display = 'none';\n\n\t\t\tstylizeElement( button );\n\n\t\t\tnavigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {\n\n\t\t\t\tsupported ? showStartAR() : showARNotSupported();\n\n\t\t\t} ).catch( showARNotAllowed );\n\n\t\t\treturn button;\n\n\t\t} else {\n\n\t\t\tconst message = document.createElement( 'a' );\n\n\t\t\tif ( window.isSecureContext === false ) {\n\n\t\t\t\tmessage.href = document.location.href.replace( /^http:/, 'https:' );\n\t\t\t\tmessage.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message\n\n\t\t\t} else {\n\n\t\t\t\tmessage.href = 'https://immersiveweb.dev/';\n\t\t\t\tmessage.innerHTML = 'WEBXR NOT AVAILABLE';\n\n\t\t\t}\n\n\t\t\tmessage.style.left = 'calc(50% - 90px)';\n\t\t\tmessage.style.width = '180px';\n\t\t\tmessage.style.textDecoration = 'none';\n\n\t\t\tstylizeElement( message );\n\n\t\t\treturn message;\n\n\t\t}\n\n\t}\n\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/three/examples/jsm/webxr/ARButton.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;