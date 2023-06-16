// Background script (background.js)

// Initialize the request counter
let requestCount = 0;

// Retrieve the stored request count from storage
browser.storage.local.get('requestCount', ({ requestCount: storedCount }) => {
  // Check if there is a stored count
  if (storedCount !== undefined) {
    requestCount = storedCount;
  }

  // Show a notification with the request count
  showStartNotification(requestCount);
});

// Function to handle incoming requests
function handleRequest(requestDetails) {
  if (requestDetails.method === 'POST') {
    // Increment the request count
    requestCount++;

    // Save the updated count to storage
    browser.storage.local.set({ requestCount });

    // Get the website's URL from the request
    const websiteUrl = requestDetails.originUrl || requestDetails.initiator || 'Unknown Website';

    // Customize the notification message with the website's URL
    const notificationOptions = {
      type: 'basic',
      iconUrl: browser.extension.getURL('icon48.webp'),
      title: 'Discord Webhook Request',
      message: `The website ${websiteUrl} sent a request to a Discord webhook.`
    };

    // Show the notification
    browser.notifications.create(notificationOptions);
  }
}

// Register webRequest listener
browser.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { urls: ['https://discord.com/api/webhooks/*'] },
  []
);

// Function to show a notification with the request count when the extension starts
function showStartNotification(count) {
  const startNotificationOptions = {
    type: 'basic',
    iconUrl: browser.extension.getURL('icon48.webp'),
    title: 'Antihook Extension',
    message: `Congratulations! You have detected ${count} webhook requests!`
  };

  // Show the start notification
  browser.notifications.create(startNotificationOptions);
}
