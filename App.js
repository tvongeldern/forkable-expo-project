import React from 'react';
import { Provider } from 'react-redux';
import store from 'state/store';
import AppNavigator from 'navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}