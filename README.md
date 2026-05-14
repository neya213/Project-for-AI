# Project-for-AI
Baseline of our model in thesis
Installing Flutter can feel like a bit of a marathon, but it's mostly just downloading the right parts and telling your computer where they are.

Here is the most streamlined path to get up and running in 2026.

Phase 1: The Core SDK Setup
The Flutter SDK is the "engine" that builds your apps.

Download the SDK: Go to the official Flutter download page and grab the stable zip file for your OS (Windows, macOS, or Linux).

Extract it: Create a folder like C:\src\flutter (Windows) or ~/development/flutter (macOS).

Tip: Avoid folders like Program Files that require admin permissions; it can cause headaches later.

Update your PATH: This tells your computer that the flutter command exists.

Windows: Search for "Edit the system environment variables" > Environment Variables > Select Path under User variables > Edit > New > Add the path to your flutter\bin folder.

macOS/Linux: Add export PATH="$PATH:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin" to your .bashrc or .zshrc file.

Phase 2: The "Doctor" Checkup
Flutter has a built-in tool that tells you exactly what’s missing.

Open your terminal (Command Prompt, PowerShell, or Terminal).  

Type: flutter doctor

Don't panic: You will likely see several red [X] marks. This is normal! It usually asks for:

Android Studio: (Required for Android apps).  

Xcode: (Required for iOS apps, macOS only).

Visual Studio Code: (The most popular editor for Flutter).  

Phase 3: Setting Up Your Editor
While you can use Android Studio, most developers prefer VS Code because it's fast.

Install Visual Studio Code.

Open VS Code and click the Extensions icon (the square blocks on the left).  

Search for "Flutter" and click Install. (This will automatically install the Dart extension too).

Restart VS Code.

Phase 4: Finalizing Android/iOS (The Heavy Lifting)
To actually run your app on a phone, you need the platform tools.

For Android:

Install Android Studio.

Open it, go to SDK Manager, and ensure you have "Android SDK Command-line Tools" checked and installed.

Run flutter doctor --android-licenses in your terminal and type y for everything.

For iOS (Mac only):

Install Xcode from the App Store.

Run: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer followed by sudo xcodebuild -runFirstLaunch.
