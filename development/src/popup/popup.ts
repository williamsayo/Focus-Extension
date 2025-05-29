import "../../assets/css/popup.css";
import { formatNumber, historyType } from "../background/background";
import {
    DEFAULT_DURATION,
    GET_STATE,
    MAX_TIME,
    MIN_TIME,
    PAUSE_TIMER,
    PLAY_TIMER,
    START_TIMER,
    STOP_TIMER,
    UPDATE_FOCUS_DURATION,
    UPDATE_TIMER,
} from "../utils/utils";

const closure = () => {
    let prev: boolean;

    return (newState: boolean) => {
        if (newState === prev) return false;
        prev = newState;
        return true;
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const pauseAndPlayBtn = document.createElement(
        "button"
    ) as HTMLButtonElement;
    pauseAndPlayBtn?.classList.add("pause-play");
    const focusBtn = document.getElementById("focusBtn") as HTMLButtonElement;
    const minutesDisplay = document.getElementById(
        "minutes"
    ) as HTMLSpanElement;
    const secondsDisplay = document.getElementById(
        "seconds"
    ) as HTMLSpanElement;
    const addMin = document.getElementById("add") as HTMLButtonElement;
    const substractMin = document.getElementById(
        "substract"
    ) as HTMLButtonElement;
    const timer = document.getElementById("timer") as HTMLInputElement;
    const totalFocusTime = document.getElementById(
        "totalFocusTime"
    ) as HTMLParagraphElement;
    const sessionsCompleted = document.getElementById(
        "sessionsCompleted"
    ) as HTMLParagraphElement;
    const avgSessionLength = document.getElementById(
        "avgSessionLength"
    ) as HTMLParagraphElement;
    const historyDiv = document.getElementById("history") as HTMLDivElement;
    const blockedSites = document.getElementById(
        "blockedSites"
    ) as HTMLButtonElement;
    const onFocusUpdate = closure();
    const onBreakUpdate = closure();

    blockedSites.addEventListener("click", async () => {
        await chrome.action.setPopup({
            popup: "../templates/blockedSites.html",
        });
        window.location.assign("../templates/blockedSites.html");
    });

    historyDiv.addEventListener("click", () => {
        const contentDiv = document.getElementById("historyContent");
        const icon = document
            .querySelector(".dropdown-icon")
            ?.classList.toggle("-rotate-90");
        contentDiv?.classList.toggle("grid");
        contentDiv?.classList.toggle("hidden");
    });

    focusBtn?.addEventListener("click", () => {
        const isFocus = focusBtn.innerText.toLowerCase() === "focus";
        chrome.runtime.sendMessage(
            { action: isFocus ? START_TIMER : STOP_TIMER },
            async (response) => {
                updateStates(response);
            }
        );
    });

    pauseAndPlayBtn?.addEventListener("click", () => {
        const playTimer = pauseAndPlayBtn.id === "play";

        chrome.runtime.sendMessage(
            {
                action: playTimer ? PLAY_TIMER : PAUSE_TIMER,
            },
            (response) => {
                const { onBreak, focusMode, pauseTimerDuration } = response;
                setPausePlayElement(onBreak, focusMode, pauseTimerDuration);
            }
        );
    });

    timer.addEventListener("change", async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const time = parseInt(target.value);
        await updateFocusDuration(time);
    });

    addMin?.addEventListener("click", async () => {
        const newValue = parseInt(timer.value) + 5;
        if (!addMin.disabled) await updateFocusDuration(newValue);
    });

    substractMin?.addEventListener("click", async () => {
        const newValue = parseInt(timer.value) - 5;
        if (!substractMin.disabled) await updateFocusDuration(newValue);
    });

    chrome.runtime.sendMessage({ action: GET_STATE }, async (response) => {
        updateStates(response);
        updateSessionsHistory(response.history);
    });

    chrome.runtime.onMessage.addListener((message) => {
        const { action, data } = message;
        switch (action) {
            case UPDATE_TIMER:
                updateStates(data);
                break;
            default:
                break;
        }
    });

    const updateStates = (request: any) => {
        const {
            currentTime,
            focusDuration,
            focusMode,
            onBreak,
            pauseTimerDuration,
        } = request;

        timer.value = focusDuration;
        addMin.disabled = focusMode || focusDuration >= MAX_TIME;
        substractMin.disabled = focusMode || focusDuration <= MIN_TIME;
        timer.disabled = focusMode;

        // convert time to minutes and seconds
        const minutes = formatNumber(Math.floor(currentTime / 60));
        const seconds = formatNumber(currentTime % 60);

        // check if half of the focus time has passed
        const remainingTime = currentTime / 60;
        const halfDuration = focusDuration / 2;

        minutesDisplay.textContent = minutes;
        secondsDisplay.textContent = seconds;
        // focusBtn.disabled = focusMode && remainingTime > halfDuration;

        // display focus or stop button
        if (onFocusUpdate(focusMode))
            focusBtn.innerText = focusMode ? "stop" : "focus";

        // pause and play icon display
        setPausePlayElement(onBreak, focusMode, pauseTimerDuration);
    };

    const setPausePlayElement = (
        onBreak: boolean,
        focusMode: boolean,
        pauseTimerDuration: number
    ) => {
        const container = document.querySelector(
            ".focus-container"
        ) as HTMLDivElement;

        console.log(pauseTimerDuration)

        console.log(onBreak);

        if (focusMode && onBreakUpdate(onBreak)) {
            pauseAndPlayBtn.id = onBreak ? "play" : "pause";
            pauseAndPlayBtn.innerHTML = onBreak
                ? '<svg class="w-5 h-5 font-black text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8.48216V15.518L15.0307 12.0001L9 8.48216ZM7.75194 5.43872L18.2596 11.5682C18.4981 11.7073 18.5787 12.0135 18.4396 12.252C18.3961 12.3265 18.3341 12.3885 18.2596 12.432L7.75194 18.5615C7.51341 18.7006 7.20725 18.62 7.06811 18.3815C7.0235 18.305 7 18.2181 7 18.1296V5.87061C7 5.59446 7.22386 5.37061 7.5 5.37061C7.58853 5.37061 7.67547 5.39411 7.75194 5.43872Z"></path></svg>'
                : '<svg class="w-5 h-5 font-black text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" ><path d="M15 7C15 6.44772 15.4477 6 16 6C16.5523 6 17 6.44772 17 7V17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17V7ZM7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7V17C9 17.5523 8.55228 18 8 18C7.44772 18 7 17.5523 7 17V7Z"></path></svg>';
            container.appendChild(pauseAndPlayBtn);
            pauseAndPlayBtn.disabled = pauseTimerDuration <= 0;
        }

        container?.contains(pauseAndPlayBtn) &&
            !focusMode &&
            container?.removeChild(pauseAndPlayBtn);
    };

    const updateSessionsHistory = (response: historyType) => {
        totalFocusTime.innerText = response.totalFocusMins.toString();
        sessionsCompleted.innerText = response.sessionsCompleted.toString();
        avgSessionLength.innerText = response.avgSessionLength.toString();
    };

    const updateFocusDuration = async (time: number) => {
        const response = await chrome.runtime.sendMessage({
            action: UPDATE_FOCUS_DURATION,
            data: time,
        });

        if (response) {
            minutesDisplay.textContent = formatNumber(response.focusDuration);
            timer.value = response.focusDuration;
        }

        substractMin.disabled = time <= MIN_TIME;
        addMin.disabled = time >= MAX_TIME;
    };
});
