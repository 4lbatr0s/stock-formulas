const restrictionConfig  = {
    headless: "new",
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    defaultViewport: null, // Set your custom viewport dimensions if needed
    args: [
      "--no-sandbox", // Add more args as needed
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ],
};

export {restrictionConfig};