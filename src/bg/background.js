// //example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   sendResponse();
// });
chrome.browserAction.setPopup({ popup: "" });

chrome.browserAction.onClicked.addListener(function(tab) {
  // for the current tab, inject the "inject.js" file & execute it
  chrome.brow;
  chrome.tabs.executeScript(tab.ib, {
    file: "./src/inject/inject.js"
  });
});
