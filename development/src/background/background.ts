import {
    ADD_TAG,
    DEFAULT_DURATION,
    DEFAULT_HISTORY,
    GET_BLOCKED_SITES,
    GET_HISTORY,
    GET_STATE,
    PAUSE_TIMER,
    PLAY_TIMER,
    REMOVE_TAG,
    START_TIMER,
    STOP_TIMER,
    UPDATE_BLOCKED_SITES,
    UPDATE_FOCUS_DURATION,
    UPDATE_SETTINGS,
    UPDATE_TIMER,
} from "../utils/utils";

export type historyType = {
    totalFocusMins: number;
    avgSessionLength: number;
    sessions: number;
    sessionsCompleted: number;
};

let timerInterval: NodeJS.Timeout;
let pauseTimerInterval: NodeJS.Timeout;
let focusDuration: number = DEFAULT_DURATION;
let focusMode: boolean;
let onBreak: boolean = false;
let currentTime: number = focusDuration;
let blockedSites: string[];
let history: historyType;
let pauseTimerDuration: number = 10 * 60;

export const formatNumber = (value: number) => {
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

const pauseTimer = (time: number = pauseTimerDuration) => {
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

chrome.storage.sync.get(
    ["focusMode", "focusDuration", "blockedSites", "history"],
    (result) => {
        focusDuration = result.focusDuration || DEFAULT_DURATION;
        currentTime = focusDuration * 60;
        focusMode = result.focusMode;
        blockedSites = result.blockedSites || [];
        history = result.history || DEFAULT_HISTORY;
    }
);

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    const { action, data } = message;
    switch (action) {
        case START_TIMER:
            focusMode = true;
            startTimer();
            break;
        case STOP_TIMER:
            stopTimer();
            break;
        case PAUSE_TIMER:
            pauseTimer();
            break;
        case PLAY_TIMER:
            playTimer();
        case GET_STATE:
            break;
        case UPDATE_FOCUS_DURATION:
            focusDuration = data;
            currentTime = focusDuration * 60;
            break;
        case GET_BLOCKED_SITES:
            break;
        case UPDATE_BLOCKED_SITES:
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
});

const updateBlockedSites = (siteInput: string, tag: string) => {
    if (tag === REMOVE_TAG && blockedSites.includes(siteInput)) {
        blockedSites = blockedSites.filter((site) => site !== siteInput);
    } else if (tag === ADD_TAG && !blockedSites.includes(siteInput)) {
        blockedSites = [...blockedSites, siteInput];
    }
    chrome.storage.sync.set({
        blockedSites,
    });
};

const updateStorage = (history?: historyType) => {
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

const broadcastUpdate = async () => {
    try {
        await chrome.runtime.sendMessage({
            action: UPDATE_TIMER,
            data: {
                currentTime,
                focusDuration,
                focusMode,
                onBreak,
                pauseTimerDuration,
            },
        });
    } catch (error: any) {
        if (!error.message.includes("Receiving end does not exist")) {
            console.error("Error broadcasting state:", error);
        }
    }
};

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
