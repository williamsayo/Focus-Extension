import "../../assets/css/content.css";

const checkBlockedSites = () => {
    const currentUrl = window.location.hostname;

    chrome.storage.sync.get(
        ["blockedSites", "focusMode", "onBreak"],
        (result) => {
            const { blockedSites = [], focusMode, onBreak } = result;
            if (focusMode && !onBreak) {
                const isBlocked = blockedSites.some((site: string) =>
                    currentUrl.includes(site)
                );

                if (!isBlocked) return;

                const body = document.body;
                body.classList.add("bg-white");
                const div = document.createElement("div");
                div.classList.add("parentclass");
                div.innerHTML = `
          <div class="flex flex-col w-full justify-center items-center min-h-screen">
          <h1 class="text-2xl font-bold">Site Blocked</h1>
          <p class="text-xl font-bold">This site is blocked during your focus session.</p>
          <p class="flex gap-2 items-center text-lg">Keep the flow going by focusing <svg class="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4H4V2H20V4H18V6C18 7.61543 17.1838 8.91468 16.1561 9.97667C15.4532 10.703 14.598 11.372 13.7309 12C14.598 12.628 15.4532 13.297 16.1561 14.0233C17.1838 15.0853 18 16.3846 18 18V20H20V22H4V20H6V18C6 16.3846 6.81616 15.0853 7.8439 14.0233C8.54682 13.297 9.40202 12.628 10.2691 12C9.40202 11.372 8.54682 10.703 7.8439 9.97667C6.81616 8.91468 6 7.61543 6 6V4ZM8 4V6C8 6.68514 8.26026 7.33499 8.77131 8H15.2287C15.7397 7.33499 16 6.68514 16 6V4H8ZM12 13.2219C10.9548 13.9602 10.008 14.663 9.2811 15.4142C9.09008 15.6116 8.92007 15.8064 8.77131 16H15.2287C15.0799 15.8064 14.9099 15.6116 14.7189 15.4142C13.992 14.663 13.0452 13.9602 12 13.2219Z"></path></svg>
          </p>
          </div>
      `;
                body.replaceChildren(div);
            }
        }
    );
};

chrome.storage.onChanged.addListener((changes, areaName) => {
    const { focusMode, onBreak } = changes;

    console.log(changes);
    if (focusMode) {
        checkBlockedSites();
    }

    if (onBreak) {
        window.location.reload();
    }
});

checkBlockedSites();
