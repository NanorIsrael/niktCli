import React, { Component } from 'react';
import './App.css';

import Main from './components/Main';
import {configStore} from './redux/createStore';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';

class App extends Component {
  render(){
    const store= configStore();
    return (
      <Provider store={store}>
      <BrowserRouter>
            <div >
              <Main/>
              </div>
            </BrowserRouter>

      </Provider>
      
     );
  }

}

export default App;
