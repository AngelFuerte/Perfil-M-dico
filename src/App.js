import React from 'react';
import { Provider } from 'react-redux';
import { Header } from './components/Header';
import configureStore from './configureStore';
import { Content } from './components/Content';

const store = configureStore();

export const App = ({ children }) => (
  <Provider store={store}>
    <div className="App">
      <Header title="Deipi" />
      <Content body={children} />
    </div>
  </Provider>
);
