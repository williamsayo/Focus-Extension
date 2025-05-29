/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatNumber: () => (/* binding */ formatNumber)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let timerInterval;
let pauseTimerInterval;
let focusDuration = _utils_utils__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DURATION;
let focusMode;
let onBreak = false;
let currentTime = focusDuration;
let blockedSites;
let history;
let pauseTimerDuration = 10 * 60;
const formatNumber = (value) => {
    let formattedValue;
    formattedValue = value.toString();
    if (value < 10) {
        formattedValue = `0${value}`;
    }
    return formattedValue;
};
const startTimer = () => {
    timerInterval = setInterval(() => {
        if (currentTime <= 0) {
            stopTimer();
        }
        broadcastUpdate();
        updateBadge();
        currentTime--;
    }, 1000);
    updateStorage();
};
const stopTimer = () => {
    if (focusMode) {
        clearInterval(timerInterval);
        removeBadge();
        reset();
        updateStorage(history);
        broadcastUpdate();
    }
};
const pauseTimer = (time = pauseTimerDuration) => {
    onBreak = true;
    clearInterval(timerInterval);
    pauseTimerInterval = setInterval(() => {
        if (pauseTimerDuration <= 0) {
            playTimer();
        }
        pauseTimerDuration--;
    }, 1000);
    updateStorage();
};
const playTimer = () => {
    onBreak = false;
    clearInterval(pauseTimerInterval);
    startTimer();
};
chrome.storage.sync.get(["focusMode", "focusDuration", "blockedSites", "history"], (result) => {
    focusDuration = result.focusDuration || _utils_utils__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DURATION;
    currentTime = focusDuration * 60;
    focusMode = result.focusMode;
    blockedSites = result.blockedSites || [];
    history = result.history || _utils_utils__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_HISTORY;
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    const { action, data } = message;
    switch (action) {
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.START_TIMER:
            focusMode = true;
            startTimer();
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.STOP_TIMER:
            stopTimer();
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.PAUSE_TIMER:
            pauseTimer();
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.PLAY_TIMER:
            playTimer();
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.GET_STATE:
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.UPDATE_FOCUS_DURATION:
            focusDuration = data;
            currentTime = focusDuration * 60;
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.GET_BLOCKED_SITES:
            break;
        case _utils_utils__WEBPACK_IMPORTED_MODULE_0__.UPDATE_BLOCKED_SITES:
            updateBlockedSites(data, message.tag);
            break;
        default:
            break;
    }
    sendResponse({
        focusDuration,
        currentTime,
        focusMode,
        history,
        onBreak,
        blockedSites,
        pauseTimerDuration,
    });
}));
const updateBlockedSites = (siteInput, tag) => {
    if (tag === _utils_utils__WEBPACK_IMPORTED_MODULE_0__.REMOVE_TAG && blockedSites.includes(siteInput)) {
        blockedSites = blockedSites.filter((site) => site !== siteInput);
    }
    else if (tag === _utils_utils__WEBPACK_IMPORTED_MODULE_0__.ADD_TAG && !blockedSites.includes(siteInput)) {
        blockedSites = [...blockedSites, siteInput];
    }
    chrome.storage.sync.set({
        blockedSites,
    });
};
const updateStorage = (history) => {
    chrome.storage.sync.set({
        focusMode,
        focusDuration,
        onBreak,
        history,
    });
};
const reset = () => {
    focusMode = false;
    currentTime = focusDuration * 60;
    pauseTimerDuration = 0;
    updateHistory();
};
const broadcastUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chrome.runtime.sendMessage({
            action: _utils_utils__WEBPACK_IMPORTED_MODULE_0__.UPDATE_TIMER,
            data: {
                currentTime,
                focusDuration,
                focusMode,
                onBreak,
                pauseTimerDuration,
            },
        });
    }
    catch (error) {
        if (!error.message.includes("Receiving end does not exist")) {
            console.error("Error broadcasting state:", error);
        }
    }
});
const updateBadge = () => {
    const minutes = formatNumber(Math.floor(currentTime / 60));
    const seconds = formatNumber(currentTime % 60);
    chrome.action.setBadgeBackgroundColor({ color: "#636AE8" });
    chrome.action.setBadgeText({
        text: `${minutes}:${seconds}`,
    });
};
const removeBadge = () => {
    chrome.action.setBadgeText({ text: "" });
};
const updateHistory = () => {
    const timeElapsed = focusDuration - Math.floor(currentTime / 60);
    const completed = currentTime <= 0;
    const avgFocusTime = history.totalFocusMins / history.sessions;
    history.totalFocusMins += timeElapsed;
    history.sessionsCompleted += completed ? 1 : 0;
    history.sessions += 1;
    history.avgSessionLength = Math.floor(avgFocusTime);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztJQUN0QixPQUFPLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mb2N1c2Zsb3cvLi9zcmMvdXRpbHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vZm9jdXNmbG93L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZvY3VzZmxvdy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZm9jdXNmbG93L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZm9jdXNmbG93L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZm9jdXNmbG93Ly4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU1RBUlRfVElNRVIgPSBcIlNUQVJUX1RJTUVSXCI7XHJcbmV4cG9ydCBjb25zdCBTVE9QX1RJTUVSID0gXCJTVE9QX1RJTUVSXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZX1RJTUVSID0gXCJQTEFZX1RJTUVSXCI7XHJcbmV4cG9ydCBjb25zdCBQQVVTRV9USU1FUiA9IFwiUEFVU0VfVElNRVJcIjtcclxuZXhwb3J0IGNvbnN0IFVQREFURV9USU1FUiA9IFwiVVBEQVRFX1RJTUVSXCI7XHJcbmV4cG9ydCBjb25zdCBVUERBVEVfU0VUVElOR1MgPSBcIlVQREFURV9TRVRUSU5HU1wiO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZPQ1VTX0RVUkFUSU9OID0gXCJVUERBVEVfRk9DVVNfRFVSQVRJT05cIjtcclxuZXhwb3J0IGNvbnN0IEdFVF9TVEFURSA9IFwiR0VUX1NUQVRFXCI7XHJcbmV4cG9ydCBjb25zdCBHRVRfQkxPQ0tFRF9TSVRFUyA9IFwiR0VUX0JMT0NLRURfU0lURVNcIjtcclxuZXhwb3J0IGNvbnN0IFVQREFURV9CTE9DS0VEX1NJVEVTID0gXCJVUERBVEVfQkxPQ0tFRF9TSVRFU1wiO1xyXG5leHBvcnQgY29uc3QgUkVNT1ZFX0JMT0NLRURfU0lURVMgPSBcIlJFTU9WRV9CTE9DS0VEX1NJVEVcIjtcclxuZXhwb3J0IGNvbnN0IEFERF9UQUcgPSBcIkFERF9UQUdcIjtcclxuZXhwb3J0IGNvbnN0IFJFTU9WRV9UQUcgPSBcIlJFTU9WRV9UQUdcIjtcclxuZXhwb3J0IGNvbnN0IEdFVF9ISVNUT1JZID0gXCJHRVRfSElTVE9SWVwiO1xyXG5leHBvcnQgY29uc3QgTUFYX1RJTUUgPSA3MjA7XHJcbmV4cG9ydCBjb25zdCBNSU5fVElNRSA9IDU7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0RVUkFUSU9OID0gNDU7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0hJU1RPUlkgPSB7XHJcbiAgICB0b3RhbEZvY3VzTWluczogMCxcclxuICAgIGF2Z1Nlc3Npb25MZW5ndGg6IDAsXHJcbiAgICBzZXNzaW9uczogMCxcclxuICAgIHNlc3Npb25zQ29tcGxldGVkOiAwLFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XHJcbiAgICBBRERfVEFHLFxyXG4gICAgREVGQVVMVF9EVVJBVElPTixcclxuICAgIERFRkFVTFRfSElTVE9SWSxcclxuICAgIEdFVF9CTE9DS0VEX1NJVEVTLFxyXG4gICAgR0VUX0hJU1RPUlksXHJcbiAgICBHRVRfU1RBVEUsXHJcbiAgICBQQVVTRV9USU1FUixcclxuICAgIFBMQVlfVElNRVIsXHJcbiAgICBSRU1PVkVfVEFHLFxyXG4gICAgU1RBUlRfVElNRVIsXHJcbiAgICBTVE9QX1RJTUVSLFxyXG4gICAgVVBEQVRFX0JMT0NLRURfU0lURVMsXHJcbiAgICBVUERBVEVfRk9DVVNfRFVSQVRJT04sXHJcbiAgICBVUERBVEVfU0VUVElOR1MsXHJcbiAgICBVUERBVEVfVElNRVIsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBoaXN0b3J5VHlwZSA9IHtcclxuICAgIHRvdGFsRm9jdXNNaW5zOiBudW1iZXI7XHJcbiAgICBhdmdTZXNzaW9uTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBzZXNzaW9uczogbnVtYmVyO1xyXG4gICAgc2Vzc2lvbnNDb21wbGV0ZWQ6IG51bWJlcjtcclxufTtcclxuXHJcbmxldCB0aW1lckludGVydmFsOiBOb2RlSlMuVGltZW91dDtcclxubGV0IHBhdXNlVGltZXJJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQ7XHJcbmxldCBmb2N1c0R1cmF0aW9uOiBudW1iZXIgPSBERUZBVUxUX0RVUkFUSU9OO1xyXG5sZXQgZm9jdXNNb2RlOiBib29sZWFuO1xyXG5sZXQgb25CcmVhazogYm9vbGVhbiA9IGZhbHNlO1xyXG5sZXQgY3VycmVudFRpbWU6IG51bWJlciA9IGZvY3VzRHVyYXRpb247XHJcbmxldCBibG9ja2VkU2l0ZXM6IHN0cmluZ1tdO1xyXG5sZXQgaGlzdG9yeTogaGlzdG9yeVR5cGU7XHJcbmxldCBwYXVzZVRpbWVyRHVyYXRpb246IG51bWJlciA9IDEwICogNjA7XHJcblxyXG5leHBvcnQgY29uc3QgZm9ybWF0TnVtYmVyID0gKHZhbHVlOiBudW1iZXIpID0+IHtcclxuICAgIGxldCBmb3JtYXR0ZWRWYWx1ZTtcclxuICAgIGZvcm1hdHRlZFZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuXHJcbiAgICBpZiAodmFsdWUgPCAxMCkge1xyXG4gICAgICAgIGZvcm1hdHRlZFZhbHVlID0gYDAke3ZhbHVlfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1hdHRlZFZhbHVlO1xyXG59O1xyXG5cclxuY29uc3Qgc3RhcnRUaW1lciA9ICgpID0+IHtcclxuICAgIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyb2FkY2FzdFVwZGF0ZSgpO1xyXG4gICAgICAgIHVwZGF0ZUJhZGdlKCk7XHJcbiAgICAgICAgY3VycmVudFRpbWUtLTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHVwZGF0ZVN0b3JhZ2UoKTtcclxufTtcclxuXHJcbmNvbnN0IHN0b3BUaW1lciA9ICgpID0+IHtcclxuICAgIGlmIChmb2N1c01vZGUpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIHJlbW92ZUJhZGdlKCk7XHJcbiAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICB1cGRhdGVTdG9yYWdlKGhpc3RvcnkpO1xyXG4gICAgICAgIGJyb2FkY2FzdFVwZGF0ZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgcGF1c2VUaW1lciA9ICh0aW1lOiBudW1iZXIgPSBwYXVzZVRpbWVyRHVyYXRpb24pID0+IHtcclxuICAgIG9uQnJlYWsgPSB0cnVlO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgIHBhdXNlVGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAocGF1c2VUaW1lckR1cmF0aW9uIDw9IDApIHtcclxuICAgICAgICAgICAgcGxheVRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhdXNlVGltZXJEdXJhdGlvbi0tO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgICB1cGRhdGVTdG9yYWdlKCk7XHJcbn07XHJcblxyXG5jb25zdCBwbGF5VGltZXIgPSAoKSA9PiB7XHJcbiAgICBvbkJyZWFrID0gZmFsc2U7XHJcbiAgICBjbGVhckludGVydmFsKHBhdXNlVGltZXJJbnRlcnZhbCk7XHJcbiAgICBzdGFydFRpbWVyKCk7XHJcbn07XHJcblxyXG5jaHJvbWUuc3RvcmFnZS5zeW5jLmdldChcclxuICAgIFtcImZvY3VzTW9kZVwiLCBcImZvY3VzRHVyYXRpb25cIiwgXCJibG9ja2VkU2l0ZXNcIiwgXCJoaXN0b3J5XCJdLFxyXG4gICAgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGZvY3VzRHVyYXRpb24gPSByZXN1bHQuZm9jdXNEdXJhdGlvbiB8fCBERUZBVUxUX0RVUkFUSU9OO1xyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gZm9jdXNEdXJhdGlvbiAqIDYwO1xyXG4gICAgICAgIGZvY3VzTW9kZSA9IHJlc3VsdC5mb2N1c01vZGU7XHJcbiAgICAgICAgYmxvY2tlZFNpdGVzID0gcmVzdWx0LmJsb2NrZWRTaXRlcyB8fCBbXTtcclxuICAgICAgICBoaXN0b3J5ID0gcmVzdWx0Lmhpc3RvcnkgfHwgREVGQVVMVF9ISVNUT1JZO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGFzeW5jIChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IG1lc3NhZ2U7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgU1RBUlRfVElNRVI6XHJcbiAgICAgICAgICAgIGZvY3VzTW9kZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBTVE9QX1RJTUVSOlxyXG4gICAgICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBQQVVTRV9USU1FUjpcclxuICAgICAgICAgICAgcGF1c2VUaW1lcigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFBMQVlfVElNRVI6XHJcbiAgICAgICAgICAgIHBsYXlUaW1lcigpO1xyXG4gICAgICAgIGNhc2UgR0VUX1NUQVRFOlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFVQREFURV9GT0NVU19EVVJBVElPTjpcclxuICAgICAgICAgICAgZm9jdXNEdXJhdGlvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lID0gZm9jdXNEdXJhdGlvbiAqIDYwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEdFVF9CTE9DS0VEX1NJVEVTOlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFVQREFURV9CTE9DS0VEX1NJVEVTOlxyXG4gICAgICAgICAgICB1cGRhdGVCbG9ja2VkU2l0ZXMoZGF0YSwgbWVzc2FnZS50YWcpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBzZW5kUmVzcG9uc2Uoe1xyXG4gICAgICAgIGZvY3VzRHVyYXRpb24sXHJcbiAgICAgICAgY3VycmVudFRpbWUsXHJcbiAgICAgICAgZm9jdXNNb2RlLFxyXG4gICAgICAgIGhpc3RvcnksXHJcbiAgICAgICAgb25CcmVhayxcclxuICAgICAgICBibG9ja2VkU2l0ZXMsXHJcbiAgICAgICAgcGF1c2VUaW1lckR1cmF0aW9uLFxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgdXBkYXRlQmxvY2tlZFNpdGVzID0gKHNpdGVJbnB1dDogc3RyaW5nLCB0YWc6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKHRhZyA9PT0gUkVNT1ZFX1RBRyAmJiBibG9ja2VkU2l0ZXMuaW5jbHVkZXMoc2l0ZUlucHV0KSkge1xyXG4gICAgICAgIGJsb2NrZWRTaXRlcyA9IGJsb2NrZWRTaXRlcy5maWx0ZXIoKHNpdGUpID0+IHNpdGUgIT09IHNpdGVJbnB1dCk7XHJcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gQUREX1RBRyAmJiAhYmxvY2tlZFNpdGVzLmluY2x1ZGVzKHNpdGVJbnB1dCkpIHtcclxuICAgICAgICBibG9ja2VkU2l0ZXMgPSBbLi4uYmxvY2tlZFNpdGVzLCBzaXRlSW5wdXRdO1xyXG4gICAgfVxyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG4gICAgICAgIGJsb2NrZWRTaXRlcyxcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlU3RvcmFnZSA9IChoaXN0b3J5PzogaGlzdG9yeVR5cGUpID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcclxuICAgICAgICBmb2N1c01vZGUsXHJcbiAgICAgICAgZm9jdXNEdXJhdGlvbixcclxuICAgICAgICBvbkJyZWFrLFxyXG4gICAgICAgIGhpc3RvcnksXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlc2V0ID0gKCkgPT4ge1xyXG4gICAgZm9jdXNNb2RlID0gZmFsc2U7XHJcbiAgICBjdXJyZW50VGltZSA9IGZvY3VzRHVyYXRpb24gKiA2MDtcclxuICAgIHBhdXNlVGltZXJEdXJhdGlvbiA9IDA7XHJcbiAgICB1cGRhdGVIaXN0b3J5KCk7XHJcbn07XHJcblxyXG5jb25zdCBicm9hZGNhc3RVcGRhdGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgICAgICAgYWN0aW9uOiBVUERBVEVfVElNRVIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9jdXNEdXJhdGlvbixcclxuICAgICAgICAgICAgICAgIGZvY3VzTW9kZSxcclxuICAgICAgICAgICAgICAgIG9uQnJlYWssXHJcbiAgICAgICAgICAgICAgICBwYXVzZVRpbWVyRHVyYXRpb24sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgaWYgKCFlcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiUmVjZWl2aW5nIGVuZCBkb2VzIG5vdCBleGlzdFwiKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYnJvYWRjYXN0aW5nIHN0YXRlOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlQmFkZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtaW51dGVzID0gZm9ybWF0TnVtYmVyKE1hdGguZmxvb3IoY3VycmVudFRpbWUgLyA2MCkpO1xyXG4gICAgY29uc3Qgc2Vjb25kcyA9IGZvcm1hdE51bWJlcihjdXJyZW50VGltZSAlIDYwKTtcclxuICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjNjM2QUU4XCIgfSk7XHJcbiAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7XHJcbiAgICAgICAgdGV4dDogYCR7bWludXRlc306JHtzZWNvbmRzfWAsXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUJhZGdlID0gKCkgPT4ge1xyXG4gICAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBcIlwiIH0pO1xyXG59O1xyXG5cclxuY29uc3QgdXBkYXRlSGlzdG9yeSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRpbWVFbGFwc2VkID0gZm9jdXNEdXJhdGlvbiAtIE1hdGguZmxvb3IoY3VycmVudFRpbWUgLyA2MCk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWQgPSBjdXJyZW50VGltZSA8PSAwO1xyXG4gICAgY29uc3QgYXZnRm9jdXNUaW1lID0gaGlzdG9yeS50b3RhbEZvY3VzTWlucyAvIGhpc3Rvcnkuc2Vzc2lvbnM7XHJcblxyXG4gICAgaGlzdG9yeS50b3RhbEZvY3VzTWlucyArPSB0aW1lRWxhcHNlZDtcclxuICAgIGhpc3Rvcnkuc2Vzc2lvbnNDb21wbGV0ZWQgKz0gY29tcGxldGVkID8gMSA6IDA7XHJcbiAgICBoaXN0b3J5LnNlc3Npb25zICs9IDE7XHJcbiAgICBoaXN0b3J5LmF2Z1Nlc3Npb25MZW5ndGggPSBNYXRoLmZsb29yKGF2Z0ZvY3VzVGltZSk7XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==