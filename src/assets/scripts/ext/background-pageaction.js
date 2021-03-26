chrome.pageAction.onClicked.addListener(function(tab) {
    console.log(tab)
	chrome.tabs.create({
		url: "index.html",
		selected: true
  	});
});

chrome.tabs.onActivated.addListener(function(info) {
	// console.log(info.tabId);
	chrome.tabs.get(info.tabId, (tab) => {
		if(tab.url.includes("twitch.tv")) {
			chrome.pageAction.show(info.tabId);
		} else {
			chrome.pageAction.hide(info.tabId);
		}
	});

});