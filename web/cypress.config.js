const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            '--user-data-dir=C:\\cypress-chrome-profile',
            "--profile-directory=Default"
          );
        }
        return launchOptions;
      });

      return config;
    },
    // defaultCommandTimeout: 10000
    experimentalStudio: true
  },
});
