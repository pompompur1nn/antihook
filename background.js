// Function to handle incoming requests
function handleRequest(requestDetails) {
  if (requestDetails.method === 'POST') {
    // Get the website's URL from the request
    const websiteUrl = requestDetails.originUrl || requestDetails.initiator || 'Unknown Website';

    // Display a notification when a request is detected
    const notificationOptions = {
      type: 'basic',
      iconUrl: browser.extension.getURL('icon48.webp'),
      title: 'Discord Webhook Request',
      message: `The website ${websiteUrl} sent a request to a Discord webhook.`
    };

    browser.notifications.create(notificationOptions);
  }
}

// Register webRequest listener
browser.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { urls: ['https://discord.com/api/webhooks/*'] },
  []
);
