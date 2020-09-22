import React, { Component } from 'react';
import './App.css';

import Main from './components/Main';
import {configStore} from './redux/createStore';
import {HashRouter} from 'react-router-dom'
import { Provider } from 'react-redux';

class App extends Component {
  render(){
    const store= configStore();
    return (
      <Provider store={store}>
      <HashRouter>
            <div >
              <Main/>
              </div>
            </HashRouter>

      </Provider>
      
     );
  }

}

export default App;
