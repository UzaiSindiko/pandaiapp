import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './store/reducers';
import codePush from 'react-native-code-push';

// Navigation
import Navigation from './Navigation';

function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
}

export default codePush({
  CheckFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
