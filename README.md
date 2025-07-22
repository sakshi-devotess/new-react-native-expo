# BoilerPlate Frontend - React Native

This is a starter boilerplate for building scalable, production-ready React Native apps using Expo, Context API, Authentication, and customizable UI components.

## 🔧 Features

- 🚀 Expo-based project (with support for EAS builds)
- 🔐 Authentication flow (Login, Register, MPIN Verification)
- 📦 Global State Management using Context API
- 🧱 Modular architecture
- 🎨 Reusable UI components (buttons, inputs, modals, etc.)
- 🧭 React Navigation (Stack + Tab support)
- ✅ TypeScript configured

## System requirement

- Node `LTS 20.3.1`
- Expo CLI: >= 7.x
- EAS CLI: >= 3.0.0 (for builds)
- Yarn or NPM

## Set env

Rename `.evn.example` to `.env` and update environment variables

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npx expo start
```

## Build the app

You can build your app using EAS Build, which supports native builds in the cloud for both Android and iOS.

Make sure you have:

- An Expo account
- Installed eas-cli:

```bash
$ npm install -g eas-cli
```

### Build Profiles

Build profiles are defined in the eas.json file. Example:

```bash
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "simulator": false
      },
      "env": {
        "ENV": "production"
      }
    }
  }
```

## Building for Different Environments

### Development (for Expo Dev Client)

- Use this when testing local features with live reload.

```bash
eas build --profile development --platform android
# or
eas build --profile development --platform ios
```

Output: APK (Android) or iOS simulator build.

### Preview / Testing

- Used to share builds with testers (via Expo or OTA links).

```bash
eas build --profile preview --platform android
# or
eas build --profile preview --platform ios
```

Output: Internal distribution (can be uploaded to Expo or shared via QR code).

### Production Build

- Use this to create the final app to submit to the Play Store or App Store.

```bash
eas build --profile production --platform android
# or
eas build --profile production --platform ios
```

Output: .aab (Android App Bundle) or .ipa (iOS archive).

## Cloning BoilerPlate and Pushing to a New Repository

Clone Boiler-Plate Repo and Perform Below Steps :

```bash
# Create a new branch in the old repo
$ git checkout --orphan new-branch

# Add all files to the new branch
$ git add .
$ git commit -m "Initial commit in new repository"

# Verify the commit
$ git log
```

Push to the New Remote Repository

```bash
# Add the new remote URL
$ git remote add new-origin new-repo-url

# Push the new branch to the new remote
$ git push new-origin new-branch

# Set the new remote as the default
$ git remote remove origin

#  Note : After Pushing new branch to new repo Delete the existing cloned boiler-plate repo
```
