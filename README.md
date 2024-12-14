# TravelRoutesRN

A React Native application that displays travel routes between locations using Google Maps, with features like route visualization, distance calculation, and route markers.

## Features

- 🗺️ Interactive Google Maps integration
- 📍 Custom markers for origin and destination points
- 🛣️ Route visualization with MapViewDirections
- 📏 Real-time distance calculation
- 🎯 Distance marker overlay on route path
- 🔄 Automatic map fitting to show complete route

## Technologies

- React Native 0.76.5
- TypeScript
- react-native-maps
- react-native-maps-directions
- Google Maps API

## Prerequisites

1. Complete the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) for your development OS and target OS (iOS/Android)
2. [Node.js](https://nodejs.org/) >= 18
3. [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TravelRoutesRN.git
cd TravelRoutesRN
```

2. Install dependencies:
```bash
npm install
```

3. iOS specific setup:
```bash
cd ios
pod install
cd ..
```

4. Configure your Google Maps API Key:
   - For Android: Add your API key in `android/app/src/main/AndroidManifest.xml`
   - For iOS: Add your API key in `ios/TravelRoutesRN/AppDelegate.mm`
   - In `App.tsx`, replace the `GOOGLE_MAPS_API_KEY` constant with your API key

## Running the App

1. Start Metro Bundler:
```bash
npm start
```

2. Run on Android:
```bash
npm run android
```

3. Run on iOS:
```bash
npm run ios
```

## Project Structure

- `App.tsx` - Main application component with map implementation
- `android/` - Android specific configuration
- `ios/` - iOS specific configuration

## Features Implementation

The app demonstrates several key features:

- Uses Google Maps as the base map provider
- Displays custom markers for origin (Ampang) and destination (KL City Center)
- Shows a route path between the points using MapViewDirections
- Calculates and displays the distance at the midpoint of the route
- Automatically fits the map view to show the complete route with padding

## Troubleshooting

### Common Issues

1. Maps not displaying:
   - Ensure you've properly configured your Google Maps API key
   - Check that the API key has the necessary permissions enabled

2. Build errors:
   - Clean the build:
     ```bash
     cd android && ./gradlew clean (Android)
     cd ios && pod deintegrate && pod install (iOS)
     ```

3. Metro bundler issues:
   - Clear Metro cache:
     ```bash
     npm start -- --reset-cache
     ```

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [react-native-maps Documentation](https://github.com/react-native-maps/react-native-maps)
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
