# HelpMeOut Chrome Extension

The HelpMeOut Chrome Extension allows users to easily record and share help videos. This README provides an overview of the project, installation instructions, and usage guidelines.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Contributing](#contributing)

## Features

- Record your screen and audio.
- Choose between recording the entire screen or the current tab.
- Simple and intuitive user interface.
- Seamless integration with a backend server for storing and managing recorded videos.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Sn0wF1re/chrome-extension-api.git

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable Developer Mode by clicking the toggle switch in the upper-right corner.

4. Click on the "Load unpacked" button and select the `extension` folder from the cloned repository.

5. The HelpMeOut extension will now be added to your Chrome browser.

## Usage

1. Click on the HelpMeOut extension icon in your Chrome toolbar to open the popup.

2. Choose your recording options:
   - Full Screen: Record the entire screen.
   - Current Tab: Record the current active tab.

3. Grant the necessary permissions for camera and microphone access.

4. Click the "Start Recording" button to begin your screen recording.

5. When you're finished recording, click the "Stop Recording" button.

6. The recorded video will be saved and can be accessed through the extension's popup.

## Backend Setup

The HelpMeOut Chrome Extension requires a backend server to store and manage recorded videos. You can set up your own backend server or use an existing one. Here's a basic outline of the backend setup:

1. Create a MongoDB database for storing video session information.

2. Set up a Node.js server to handle API requests from the extension.

3. Implement the API endpoints required for initializing recording, streaming video chunks, and stopping recording.

4. Make sure the backend server is running and accessible.

5. Update the `content.js` script with the appropriate backend API endpoints and server details.

## Contributing

Contributions to the HelpMeOut Chrome Extension are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your changes to your fork:

   ```bash
   git push origin feature/new-feature
   ```

5. Create a pull request to the main repository.

6. Your contribution will be reviewed, and once approved, it will be merged.