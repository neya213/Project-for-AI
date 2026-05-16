# 🔍 Two-Brain Forensic Interface - Bimodal Deepfake Detection

A React Native mobile application built with Expo for the frontend interface of a Bimodal Deepfake Detection System. This app handles local video ingestion, permission workflows, and provides simulated real-time forensic reports.

---

## 🛠️ Prerequisites

Before installing the project dependencies, ensure you have the following installed on your machine:

1. **Node.js** (v18.x or v20.x recommended) -> [Download here](https://nodejs.org/)
2. **Git** -> [Download here](https://git-scm.com/)
3. **Expo Go App** installed on your physical Android or iOS device (available on the Google Play Store and Apple App Store).

---

## 🚀 Setup & Installation Instructions

Follow these steps carefully in your terminal to get the project cloned, installed, and running locally.

### 1. Clone the Repository
```bash
git clone <PASTE_YOUR_REPOSITORY_URL_HERE>
cd Project-for-AI
2. Install Project Dependencies
Run this command in the project root to install all core React Native packages along with the required Expo assets (icons and image pickers):

Bash
npm install
3. Ensure Expo Packages are Synchronized
To verify that all native plugins (like the video picker) match your current Expo SDK version, run the automated installation sync:

Bash
npx expo install expo-image-picker @expo/vector-icons expo-status-bar
📱 How to Run the App Locally (Development Mode)
Instead of compiling an APK immediately, you can run the app in development mode using Expo Go to test UI changes instantly.

Connect your computer and your phone to the same Wi-Fi network.

Open your terminal in the project directory and run:

Bash
npx expo start
A QR Code will display directly inside your terminal workspace.

To Open on Device:

Android: Open the Expo Go app, tap Scan QR Code, and point your camera at the terminal screen.

iOS: Open your native iPhone Camera app, scan the code, and tap the prompt to launch it via Expo Go.

🏗️ How to Generate standalone APK/iOS Installers (Production Build)
This project uses EAS (Expo Application Services) to compile binary files (.apk for Android or .tar.gz for iOS simulators) in the cloud.

1. Install EAS CLI globally
Bash
npm install -g eas-cli
2. Authentication
Log into your cloud developer profile (register a free account at expo.dev if you don't have one):

Bash
eas login
3. Run Build
Compile the native binary package using the pre-configured distribution settings:

For Android APK: eas build --platform android --profile preview

For iOS Simulator: eas build --platform ios --profile preview

For Both Platforms: eas build --platform all --profile preview

Once completed (roughly 5-10 minutes), scan the final output terminal QR code to download your standalone build file.