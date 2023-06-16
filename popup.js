document.addEventListener('DOMContentLoaded', function () {
  // Display a notification when the popup is loaded
  const notificationOptions = {
    type: 'basic',
    iconUrl: browser.extension.getURL('icon48.png'),
    title: 'Antihook Popup',
    message: 'The Antihook extension is active.'
  };
  
  browser.notifications.create(notificationOptions);
});
