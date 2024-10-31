/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Wait for the DOM to load before placing objects in the scene\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const scene = document.querySelector('a-scene');\r\n\r\n    // Create an A-Frame entity for the 3D object (e.g., a red box)\r\n    const box = document.createElement('a-box');\r\n    box.setAttribute('color', 'red');\r\n    box.setAttribute('depth', '1');\r\n    box.setAttribute('height', '1');\r\n    box.setAttribute('width', '1');\r\n\r\n    // Set the position using GPS coordinates for AR placement\r\n    // Replace latitude and longitude with a real location for testing\r\n    box.setAttribute('gps-entity-place', 'latitude: 51.051; longitude: -0.72');\r\n    \r\n    // Add the box to the scene\r\n    scene.appendChild(box);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;