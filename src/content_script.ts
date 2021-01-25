chrome.runtime.onMessage.addListener(function (
  msg: OptionsPageData,
  sender,
  sendResponse
) {
  if (msg.tab) {
    alert(`Current tab id: ${msg.tab.id}`);
    sendResponse("Received.");
  } else {
    sendResponse("Tab is null.");
  }
});
