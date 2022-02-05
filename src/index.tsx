import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'
import './styles/index.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import LocationDetails from "./components/LocationDetails";
import ErrorPage from "./components/404";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<App />}>
                          <Route path="/login" element={<Login />} />
                      </Route>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="dashboard/:userId" element={<UserDetails />} />
                      <Route path="dashboard/:userId/:locationId" element={<LocationDetails />} />
                      <Route path="*" element={<ErrorPage />}/>
                  </Routes>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
