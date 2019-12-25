import React from 'react';
import './main.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import { Switch, BrowserRouter, Route } from "react-router-dom";
import BookingHeader from './components/BookingHeader'
import HallsList from './components/HallsList';
import HallBook from './components/HallBook'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <BookingHeader />
          <div>
            <Switch>
              <Route
                exact={true}
                path='/'
                render={routerProps => <HallsList routerProps={routerProps} />}
              />
              <Route
                exact={true}
                path='/halls/:hallId'
                render={routerProps => <HallBook routerProps={routerProps} />}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
