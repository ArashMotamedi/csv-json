let tabs = {};

chrome.browserAction.onClicked.addListener(async function (tab) { //Fired when User Clicks ICON
    const windowId = tab.windowId;
    let existingTab = undefined;
    if (tabs[windowId]) {
        existingTab = await new Promise(r => chrome.tabs.get(tabs[windowId].id, (tab) => {
            if (chrome.runtime.lastError) r(undefined)
            else if (tab && !tab.discarded) r(tab);
            else r(undefined);
        }));
    }
    if (existingTab) {
        chrome.tabs.update(existingTab.id, { active: true });
    } else
        chrome.tabs.create({ url: "index.html", active: true }, (newTab) => {
            tabs[windowId] = newTab;
        });
});
