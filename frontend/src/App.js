import React from 'react';
import './main.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, Route } from "react-router-dom";
import BookingHeader from './components/BookingHeader'
import HallForm from './components/HallForm'
import HallList from './components/HallsList'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <BookingHeader />
          <div>
            {/* <HallForm /> */}
            <Switch>
              <Route
                exact={true}
                path='/'
                component={HallList}
              />
              <Route
                exact={true}
                path='/hall-form'
                component={HallForm}
              />
              <Route
                exact={true}
                path='/hall-list'
                component={HallList}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
