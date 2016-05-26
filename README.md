# Morning Routine iOS

  - [Steven Tran] (https://github.com/steventran06)

## Table of Contents

1. [Who is This For?](#who-is-this-for)
1. [Up and Running](#up-and-running)
1. [Requirements](#requirements)
1. [Unstacking the Stack](#unstacking-the-stack)
1. [API's](#api's)

## Who is This For?

A daily morning routine tracker and commute manager to help anyone take control of your mornings.

## Screenshots
#### Login
<img src="https://github.com/steventran06/ios-morning-routine/blob/master/README_IMGS/MorningRoutine.png" width="450">

## Up and running
- Install dependencies
- Run iOS simulator

```sh
npm install
react-native run-ios
```

## Requirements

- React Native
- Firebase DB

## Unstacking the stack

_**Morning Routine iOS is a iOS application built with:**_
- React Native
- Firebase DB

### React Native
- Views are created using reusable components built in React/JSX that translate to native iOS components
- React Native components implement one-way reactive data flow to immediately rerender views upon changes.

### Firebase DB
- User data table and user's schedules are stored in Firebase DB, which has quick read and write access.

## API's

###### [Sunrise Sunset API](http://sunrise-sunset.org/api) _External API_
- Morning Routine iOS utilizes the **Sunrise Sunset API** to change the background color and styling based on how close to sunrise you wake up. It gathers this information by utilizing the user's coordinates from geolocation to get that timezone's sunrise time.

###### [Google Maps Distance Matrix](https://developers.google.com/maps/documentation/distance-matrix/) _External API_
- **Google Distance Matrix** - Used to calculate the distance from the user's home and destination every morning, and the estimated travel time.