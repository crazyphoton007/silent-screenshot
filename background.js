chrome.action.onClicked.addListener(async (tab) => {
  try {
    const dataUrl = await chrome.tabs.captureVisibleTab(
      tab.windowId,
      {
        format: "png"
      }
    );

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [dataUrl],
      func: async (dataUrl) => {
        try {
          const response = await fetch(dataUrl);
          const blob = await response.blob();

          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob
            })
          ]);
        } catch (err) {
          console.error("Clipboard write failed:", err);
        }
      }
    });

  } catch (error) {
    console.error("Screenshot failed:", error);
  }
});