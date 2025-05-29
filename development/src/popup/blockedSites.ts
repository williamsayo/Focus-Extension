import "../../assets/css/popup.css";
import {
    ADD_TAG,
    GET_BLOCKED_SITES,
    REMOVE_TAG,
    UPDATE_BLOCKED_SITES,
    UPDATE_SETTINGS,
} from "../utils/utils";

const createListElement = () => {
    const ul = document.createElement("ul");
    ul.classList.add("blocked-list");
    return ul;
};

document.addEventListener("DOMContentLoaded", () => {
    const dashBoard = document.getElementById("dashBoard") as HTMLButtonElement;
    const blockInput = document.getElementById(
        "blockedSiteInput"
    ) as HTMLInputElement;
    const addBtn = document.getElementById("addSiteBtn") as HTMLButtonElement;
    const siteList = document.getElementById("blockedSiteList") as HTMLElement;
    const ul = createListElement();

    dashBoard.addEventListener("click", async () => {
        await chrome.action.setPopup({
            popup: "../templates/popup.html",
        });
        window.location.assign("../templates/popup.html");
    });

    const addToblockedSite = () => {
        const siteToBlock = blockInput.value;
        if (siteToBlock) {
            chrome.runtime.sendMessage(
                {
                    action: UPDATE_BLOCKED_SITES,
                    tag: ADD_TAG,
                    data: siteToBlock,
                },
                () => {
                    const listItem = createListItemElement(siteToBlock);
                    ul.prepend(listItem);
                    siteList.appendChild(ul);
                }
            );
        }
    };

    const showBlockedSites = ({ blockedSites }: { blockedSites: string[] }) => {
        if (!blockedSites) return;

        blockedSites.map((site: string) =>
            ul.appendChild(createListItemElement(site))
        );

        siteList.appendChild(ul);
    };

    const createListItemElement = (id: string) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
            "flex",
            "justify-between",
            "items-center",
            "bg-[#f5f5f5]",
            "px-2",
            "my-1"
        );
        listItem.id = id;
        const removeButton = document.createElement("button");
        removeButton.id = "remove";
        removeButton.innerText = "Remove";
        removeButton.classList.add(
            "bg-red-500",
            "px-2",
            "py-1",
            "text-white",
            "rounded-sm",
            "cursor-pointer",
            "hover:bg-danger-hover"
        );
        listItem.innerText = `${id}.com`;
        listItem.appendChild(removeButton);

        return listItem;
    };

    siteList.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.id === "remove") {
            const site = target.parentElement?.id;
            const listItem = target.parentElement as HTMLLIElement;
            chrome.runtime.sendMessage(
                {
                    action: UPDATE_BLOCKED_SITES,
                    tag: REMOVE_TAG,
                    data: site,
                },
                () => {
                    ul.removeChild(listItem);
                }
            );
        }
    });

    addBtn.addEventListener("click", addToblockedSite);

    blockInput.addEventListener("change", addToblockedSite);

    chrome.runtime.sendMessage({ action: GET_BLOCKED_SITES }, (response) => {
        showBlockedSites(response);
    });
});
