import React from 'react';
import store from './redux/store'
import { Provider } from 'react-redux'
import Booking from './components/Booking'
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './main.css'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Booking />
      </div>
    </Provider>
  );
}

export default App;
