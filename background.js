// Background script (background.js)

// Initialize the request counter
let requestCount = 0;

// Retrieve the stored request count from storage
browser.storage.local.get('requestCount', ({ requestCount: storedCount }) => {
  // Check if there is a stored count
  if (storedCount !== undefined) {
    requestCount = storedCount;
  }
});

function handleRequest(requestDetails) {
  if (requestDetails.method === 'POST') {
    // Increment the request count
    requestCount++;

    // Save the updated count to storage
    browser.storage.local.set({ requestCount });

    // Get the website's URL from the request
    const websiteUrl = requestDetails.originUrl || requestDetails.initiator || 'Unknown Website';

    // Get the webhook link from the request
    const webhookUrl = requestDetails.url;

    // Write the webhook link to the clipboard
    navigator.clipboard.writeText(webhookUrl)
      .then(() => {
        console.log('Webhook URL copied to clipboard.');
      })
      .catch(err => {
        console.error('Failed to write to clipboard: ', err);
      });

    // Customize the notification message with the website's URL
    const notificationOptions = {
      type: 'basic',
      iconUrl: browser.extension.getURL('icon48.webp'),
      title: 'Webhook Request',
      message: `The website ${websiteUrl} sent a request to a webhook. The webhook URL has been copied.`
    };

    // Show the notification
    browser.notifications.create(notificationOptions);
  }
}

// Register webRequest listener
browser.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { 
  urls: [
    'https://discord.com/api/webhooks/*',
    'https://hooks.slack.com/services/*',
    'https://media.guilded.gg/webhooks/*',
    'https://*.webhook.office.com/*',
    'https://api.flocl.com/hooks/*"
  ],
  []
);
