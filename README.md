# Forkable Expo Project

This repository is designed to make it as easy as possible for you to get your Expo-based React Native app off the ground!

## Getting started

### System dependencies
**Node 8+/NPM 5+**
<br/>
If you don't already have this installed, for Mac: `brew install n && n@8.9.1` should do the trick.
<br/>
**Xcode**
<br/>
If you don't have this already, install it from the Apple App store.
### Getting started
Pull the project down from GitHub, navigate into it, and run `npm i` to install all of the dependencies.
<br/>
<br/>
Run `npm run ios` to start the app up in the Xcode simulator.
## Adding a new component
Run `npm run gen:component` and a prompt will come up asking you to name your component.
<br/>
<br/>
Fill in the render function and styles, and import the new component into the Home Screen using `import { MyComponent } from '@components';`
<br/>
<br/>
Your component should show up on the Home Screen now.
## Other Generators
Other generators available are:
<br/>
`npm run gen:container` - Generate a smart container
<br/>
`npm run gen:reducer` - Generate a Redux reducer
<br/>
`npm run gen:action` - Generate an async Redux action
<br/>
`npm run gen:action-sync` - Generate a synchronous Redux action
<br/>