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

eval("document.addEventListener('DOMContentLoaded', () => {\r\n    const positionDisplay = document.getElementById('positionDisplay');\r\n    const scene = document.querySelector('a-scene');\r\n    let initialPosition = null;\r\n\r\n    // Function to calculate the distance between two GPS points\r\n    function calculateDistance(lat1, lon1, lat2, lon2) {\r\n        const toRad = (value) => (value * Math.PI) / 180;\r\n        const R = 6371000; // Radius of Earth in meters\r\n\r\n        const dLat = toRad(lat2 - lat1);\r\n        const dLon = toRad(lon2 - lon1);\r\n\r\n        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +\r\n                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *\r\n                  Math.sin(dLon / 2) * Math.sin(dLon / 2);\r\n\r\n        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));\r\n        return R * c; // Distance in meters\r\n    }\r\n\r\n    // Listen for position updates from the GPS camera\r\n    scene.addEventListener('gps-camera-update-position', (event) => {\r\n        const { latitude, longitude } = event.detail.position;\r\n\r\n        if (!initialPosition) {\r\n            // Set the initial GPS coordinates as the origin (0,0,0)\r\n            initialPosition = { latitude, longitude };\r\n            console.log('Initial position set:', initialPosition);\r\n        } else {\r\n            // Calculate displacement along x and z axes\r\n            const deltaX = calculateDistance(initialPosition.latitude, initialPosition.longitude, initialPosition.latitude, longitude);\r\n            const deltaZ = calculateDistance(initialPosition.latitude, initialPosition.longitude, latitude, initialPosition.longitude);\r\n\r\n            // Determine direction based on latitude and longitude change\r\n            const x = longitude > initialPosition.longitude ? deltaX : -deltaX;\r\n            const z = latitude > initialPosition.latitude ? -deltaZ : deltaZ;\r\n\r\n            // Assume y remains constant at 0 for a flat surface\r\n            const y = 0;\r\n\r\n            // Update position display\r\n            positionDisplay.textContent = `Position: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`;\r\n            console.log(`Position: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);\r\n        }\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

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