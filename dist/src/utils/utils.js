/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_TAG: () => (/* binding */ ADD_TAG),
/* harmony export */   DEFAULT_DURATION: () => (/* binding */ DEFAULT_DURATION),
/* harmony export */   DEFAULT_HISTORY: () => (/* binding */ DEFAULT_HISTORY),
/* harmony export */   GET_BLOCKED_SITES: () => (/* binding */ GET_BLOCKED_SITES),
/* harmony export */   GET_HISTORY: () => (/* binding */ GET_HISTORY),
/* harmony export */   GET_STATE: () => (/* binding */ GET_STATE),
/* harmony export */   MAX_TIME: () => (/* binding */ MAX_TIME),
/* harmony export */   MIN_TIME: () => (/* binding */ MIN_TIME),
/* harmony export */   PAUSE_TIMER: () => (/* binding */ PAUSE_TIMER),
/* harmony export */   PLAY_TIMER: () => (/* binding */ PLAY_TIMER),
/* harmony export */   REMOVE_BLOCKED_SITES: () => (/* binding */ REMOVE_BLOCKED_SITES),
/* harmony export */   REMOVE_TAG: () => (/* binding */ REMOVE_TAG),
/* harmony export */   START_TIMER: () => (/* binding */ START_TIMER),
/* harmony export */   STOP_TIMER: () => (/* binding */ STOP_TIMER),
/* harmony export */   UPDATE_BLOCKED_SITES: () => (/* binding */ UPDATE_BLOCKED_SITES),
/* harmony export */   UPDATE_FOCUS_DURATION: () => (/* binding */ UPDATE_FOCUS_DURATION),
/* harmony export */   UPDATE_SETTINGS: () => (/* binding */ UPDATE_SETTINGS),
/* harmony export */   UPDATE_TIMER: () => (/* binding */ UPDATE_TIMER)
/* harmony export */ });
const START_TIMER = "START_TIMER";
const STOP_TIMER = "STOP_TIMER";
const PLAY_TIMER = "PLAY_TIMER";
const PAUSE_TIMER = "PAUSE_TIMER";
const UPDATE_TIMER = "UPDATE_TIMER";
const UPDATE_SETTINGS = "UPDATE_SETTINGS";
const UPDATE_FOCUS_DURATION = "UPDATE_FOCUS_DURATION";
const GET_STATE = "GET_STATE";
const GET_BLOCKED_SITES = "GET_BLOCKED_SITES";
const UPDATE_BLOCKED_SITES = "UPDATE_BLOCKED_SITES";
const REMOVE_BLOCKED_SITES = "REMOVE_BLOCKED_SITE";
const ADD_TAG = "ADD_TAG";
const REMOVE_TAG = "REMOVE_TAG";
const GET_HISTORY = "GET_HISTORY";
const MAX_TIME = 720;
const MIN_TIME = 5;
const DEFAULT_DURATION = 45;
const DEFAULT_HISTORY = {
    totalFocusMins: 0,
    avgSessionLength: 0,
    sessions: 0,
    sessionsCompleted: 0,
};

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL3V0aWxzL3V0aWxzLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDbEMsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBQ2hDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQztBQUNoQyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDbEMsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDO0FBQzFDLE1BQU0scUJBQXFCLEdBQUcsdUJBQXVCLENBQUM7QUFDdEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBQzlCLE1BQU0saUJBQWlCLEdBQUcsbUJBQW1CLENBQUM7QUFDOUMsTUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNwRCxNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDO0FBQ25ELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUMxQixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUM7QUFDaEMsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQ2xDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUNyQixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxlQUFlLEdBQUc7SUFDM0IsY0FBYyxFQUFFLENBQUM7SUFDakIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQztJQUNYLGlCQUFpQixFQUFFLENBQUM7Q0FDdkIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvY3VzZmxvdy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mb2N1c2Zsb3cvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZvY3VzZmxvdy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZvY3VzZmxvdy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZvY3VzZmxvdy8uL3NyYy91dGlscy91dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBjb25zdCBTVEFSVF9USU1FUiA9IFwiU1RBUlRfVElNRVJcIjtcclxuZXhwb3J0IGNvbnN0IFNUT1BfVElNRVIgPSBcIlNUT1BfVElNRVJcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlfVElNRVIgPSBcIlBMQVlfVElNRVJcIjtcclxuZXhwb3J0IGNvbnN0IFBBVVNFX1RJTUVSID0gXCJQQVVTRV9USU1FUlwiO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX1RJTUVSID0gXCJVUERBVEVfVElNRVJcIjtcclxuZXhwb3J0IGNvbnN0IFVQREFURV9TRVRUSU5HUyA9IFwiVVBEQVRFX1NFVFRJTkdTXCI7XHJcbmV4cG9ydCBjb25zdCBVUERBVEVfRk9DVVNfRFVSQVRJT04gPSBcIlVQREFURV9GT0NVU19EVVJBVElPTlwiO1xyXG5leHBvcnQgY29uc3QgR0VUX1NUQVRFID0gXCJHRVRfU1RBVEVcIjtcclxuZXhwb3J0IGNvbnN0IEdFVF9CTE9DS0VEX1NJVEVTID0gXCJHRVRfQkxPQ0tFRF9TSVRFU1wiO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX0JMT0NLRURfU0lURVMgPSBcIlVQREFURV9CTE9DS0VEX1NJVEVTXCI7XHJcbmV4cG9ydCBjb25zdCBSRU1PVkVfQkxPQ0tFRF9TSVRFUyA9IFwiUkVNT1ZFX0JMT0NLRURfU0lURVwiO1xyXG5leHBvcnQgY29uc3QgQUREX1RBRyA9IFwiQUREX1RBR1wiO1xyXG5leHBvcnQgY29uc3QgUkVNT1ZFX1RBRyA9IFwiUkVNT1ZFX1RBR1wiO1xyXG5leHBvcnQgY29uc3QgR0VUX0hJU1RPUlkgPSBcIkdFVF9ISVNUT1JZXCI7XHJcbmV4cG9ydCBjb25zdCBNQVhfVElNRSA9IDcyMDtcclxuZXhwb3J0IGNvbnN0IE1JTl9USU1FID0gNTtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRFVSQVRJT04gPSA0NTtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfSElTVE9SWSA9IHtcclxuICAgIHRvdGFsRm9jdXNNaW5zOiAwLFxyXG4gICAgYXZnU2Vzc2lvbkxlbmd0aDogMCxcclxuICAgIHNlc3Npb25zOiAwLFxyXG4gICAgc2Vzc2lvbnNDb21wbGV0ZWQ6IDAsXHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==