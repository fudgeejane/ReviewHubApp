# 📱 React Native App Setup

> 🎥 **Watch this first**: [YouTube Tutorial](https://www.youtube.com/watch?v=sdrqDQAC3Gw&t=1164s)
> 
> 👁️ **View this link as well**: https://reactnative.dev/docs/environment-setup

---

## 📦 Install Dependencies

Run the following command to install all required packages:

```bash
npm install @expo/vector-icons @react-navigation/bottom-tabs @react-navigation/elements @react-navigation/native expo expo-blur expo-constants expo-font expo-haptics expo-image expo-linear-gradient expo-linking expo-router expo-splash-screen expo-status-bar expo-symbols expo-system-ui expo-web-browser react react-dom react-native react-native-gesture-handler react-native-material-menu react-native-reanimated react-native-responsive-screen react-native-safe-area-context react-native-screens react-native-web react-native-webview
```

---

## 🖥️ Run Natively on PC

### ▶️ Android Emulator

1. Start Metro bundler:
   ```bash
   npx expo start
   ```

2. Then run the Android build:
   ```bash
   npx expo run:android
   ```

> ✅ Make sure Android Studio is installed and an emulator is running.

---

### 🍏 iOS Simulator (macOS only)

1. Start Metro bundler:
   ```bash
   npx expo start
   ```

2. Then run the iOS build:
   ```bash
   npx expo run:ios
   ```

> ⚠️ Xcode is required to run iOS builds locally.

---

## 📱 Run on Phone Using Expo

1. Install the **Expo Go** app from the App Store or Google Play.
2. In your terminal, run:
   ```bash
   npx expo start
   ```
3. Scan the QR code using the Expo Go app on your phone.

> 📡 Ensure your phone and PC are connected to the same Wi-Fi network.

---

Happy coding! 🎉
