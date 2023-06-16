// stats.js

// Send a message to the background script to retrieve the request count
browser.runtime.sendMessage({ getStats: true }, response => {
  // Check if the response contains the request count
  if (response && response.requestCount !== undefined) {
    // Update the paragraph element with the request count
    const webhookCount = document.getElementById('webhookCount');
    webhookCount.textContent = `Total webhooks detected: ${response.requestCount}`;
  }
});
