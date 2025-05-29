import "../../assets/css/popup.css";

document.addEventListener("DOMContentLoaded", () => {
    const dashBoard = document.getElementById("dashBoard") as HTMLButtonElement;
    const blockedSites = document.getElementById(
        "blockedSites"
    ) as HTMLButtonElement;

    blockedSites.addEventListener("click", async () => {
        await chrome.action.setPopup({
            popup: "../templates/blockedSites.html",
        });
        window.location.assign("../templates/blockedSites.html");
    });

    dashBoard.addEventListener("click", async () => {
        await chrome.action.setPopup({
            popup: "../templates/popup.html",
        });
        window.location.assign("../templates/popup.html");
    });
});
