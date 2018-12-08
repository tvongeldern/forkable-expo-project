# Forkable Expo Project

This repository is designed to make it as easy as possible for you to get your Expo-based React Native app off the ground!

## Design patterns/principles

Understanding these principles will help you understand the reasoning behind the structure of this project, which in turn will help you receive the maximum benefit from using it. If you are not familiar with any of these patterns/principles this quick reading should get you up to speed.

 - [Functional Programming](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
 - [Smart containers/ dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

## Key dependencies

If you are not already familiar with these projects, these links will help bring you up to speed.

- [React Native](https://facebook.github.io/react-native/) - React JS that runs on mobile devices, designed to work cross-platform (iOS, Android).
- [Expo](https://expo.io/) - React Native SDK that offers helpful native packages and streamlines deployments
- [Redux JS](https://redux.js.org/) - Functional state management
- [Yeoman](https://yeoman.io/) - Template generators
- [Jest](https://jestjs.io/) - Unit testing for React (and React Native)


## Getting started

### System dependencies

**Node 8+/NPM 5+**

If you don't already have this installed, for Mac: `brew install n && n 8.9.1` should do the trick.

**Expo**

Expo is the SDK that this project is built on. First, you need to set up a free Expo account: [https://expo.io/signup](https://expo.io/signup).

Once you've set up an Expo account, install the CLI: `npm i -g expo-cli`.

Once you have Expo CLI installed, authenticate: `expo login`.

**Xcode**

This will allow you to run the app locally on iOS. If you don't have this already, install it from the Apple App store.

**Android Studio Emulator**

This will allow you to run the app locally on Anroid. Follow this guide to get it set up: [https://docs.expo.io/versions/latest/workflow/android-studio-emulator](https://docs.expo.io/versions/latest/workflow/android-studio-emulator).

### Initiating the Project
Pull the project down from GitHub, navigate into the project, and run `npm i` to install all of the dependencies.

Run `npm run ios` to start the iOS app up in the Xcode simulator, or `npm run android` to start it up in Android.

The initial app will have two screens, which are designed to show you a lot of the project's core functionality. Hopefully, after a quick look at the existing code, you will be able to get up and running fairly easily.


## Development

### Using generators
You should almost never have to manually add new files to this project. Rather, you should use the generators come built-in with this project.

Using the generators will bring consistency to your code, enforce design patterns, and spare you from having to type in a lot of boilerplate code.

The generators in this project not only create the new files for you, but they also make sure that the files are exported properly so that they are immediately available via `import` statement wherever they may be needed.

The generator commands, documented below, are:

`npm run gen:container`<br />
`npm run gen:component`<br />
`npm run gen:action`<br />
`npm run gen:form`<br />
`npm run gen:reducer`<br />
`npm run gen:action-sync`<br />

The script that runs the generators is housed in the `scripts` directory, and it uses yeoman generators defined in the [generator-tvg-react-templates](https://github.com/tvongeldern/generator-tvg-react-templates) repository
. If you want to change the generators, you can fork (or make a pull request to) that repository.

### Generating a new screen
To generate a new screen, run `npm run gen:container`.

A dialogue will appear in the command line, asking you what you would like the name of the screen to be.

The generator will create a new directory in the `screens` directory with two files in it:
`index.js` - This is the React code, where import components and define how the screen is rendered
`connectors.js` - This is where you define how the container will be connected to Redux.

When you are ready to add your screen into the navigation flow, it will be accessible for import using a simple statement: `import { MyScreen } from '@containers';`

### Generating a new React component
To generate a new component, run `npm run gen:component`.

A dialogue will appear in the command line, asking you what you would like the name of the component to be.

The generator will create a new directory in the `components` directory with two files in it:
`index.js` - This is the React component where you define how the component is rendered
`styles.js` - This is where you define the component's styling.

When you are ready to add your component into a container, it will be accessible for import using a simple statement: `import { MyComponent } from '@components';`

### Generating a new Redux reducer
To generate a new reducer, run `npm run gen:reducer`.

A dialogue will appear in the command line, asking you what you would like the name of the reducer to be.

The generator will create a new directory in the `state/reducers` directory with two children:
`index.js` - This is where all the action creators are imported and combined into a single reducer function.
`actions` - This is the directory where the action creators will go.

At creation, your new reducer will be aggregated into the app's central redux store. When connecting to containers, its values will be accessible in `state.myReducer`.

### Generating a new Redux action creator
To generate a new async action creator, run `npm run gen:action`.

A dialogue will appear in the command line, asking you what you would like the name of the action creator to be, and which reducer the action should be dispatched to.

The generator will create a new file inside of the parent directory of the reducer that you selected.

Simply fill in the action creator and the reducer functions, no need to worry about importing/exporting the values- they will already be imported into the main reducer.

**NOTE**: If your action is synchronous, you can use `npm run gen:action-sync`.

### Generating a new connected form
To generate a new component, run `npm run gen:form`.

A dialogue will appear in the command line, asking you what you would like the name of the form to be.

The generator will create a new file in the `forms` directory, the form will already be connected to redux; you only need to add the fields, validation, etc.

When you are ready to implement your form in a screen, it will be accessible for import using a simple statement: `import { MyForm } from '@forms';`

## Redux middleware

This project's Redux middleware has two important roles: handling promises, and bringing data from outside of the app into the redux store.

An asynchronous redux action (aka a promise), will have 3 types, defined as an array of 3 strings, called `types`, in the action creator.

The first type in the array will be dispatched when the promise initiates. The second will be dispatched when/if the promise resolves, and the resolved value will be held in `action.response`. The third will be dispatched when/if the promise rejects, and the error value will be held in `action.error`.

There are two API's that are already wired into the middleware: `fetch` (for making AJAX calls) and `storage` (for accessing local storage).

**fetch API**<br />
`get = (uri)`<br />
`post = (uri, { body })`<br />
`put = (uri, { body })`<br />
`delete = (uri)`<br />

**storage API**<br />
`set: (key, value)`<br />
`get: (key)`<br />
`remove: (key)`<br />

The `promise` attribute of the created action is where the promise is initiated. The `promise` method is provided with the fetch and storage API's.

Example async action creator function:
```
export const actionCreator = (searchValue) => ({
	types: ['start', 'success', 'fail'],
    promise: ({ storage, fetch }) => fetch.get(`https://api.google.com?q=${searchValue}`,
});
```

## Publishing/deploying
Expo makes publishing and deploying changes extremely easy! Here's some documentation on how it works in Expo: [https://docs.expo.io/versions/v31.0.0/workflow/publishing](https://docs.expo.io/versions/v31.0.0/workflow/publishing).

Once you're familiar with how it works, you can use the Expo CLI to actually publish: [https://docs.expo.io/versions/latest/workflow/expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli).