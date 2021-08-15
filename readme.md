# React Native MovieBrowser App!

This is a React Native mobile app that serves Movies/Tv Shows and People content, all the data is pulled from https://www.themoviedb.org/ api.

## How to run

To run this App is necessary to get an ApiKey from MovieDb. You need to sign up for the service first.
According to their [site](https://www.themoviedb.org/documentation/api):

How do I apply for an API key?
You can apply for an API key by clicking the "API" link from the left hand sidebar within your account settings page. You need to have a legitimate business name, address, phone number and description to apply for an API key.

First rename [example.env](https://github.com/olman21/react-native-movies/blob/master/example.env) file to .env and replace the ApiKey with the value got from MovieDb.

```
API_KEY=<YOUR API KEY>
API_BASE_URL=https://api.themoviedb.org/3
API_MEDIA_URL=https://image.tmdb.org/t/p
FAV_STORAGE_KEY=MY_FAVORITES
```

Install all the dependencies.

```bash
npm i
```

Install pods for iOS.

```bash
cd ios && pod install
```

## Run

iOS
```bash
npx react-native run-ios
```
Android
```bash
npx react-native run-android
```

## Screenshots

<img src="https://github.com/olman21/react-native-movies/raw/master/screenshots/Screenshot1.png" width="100" height="100">