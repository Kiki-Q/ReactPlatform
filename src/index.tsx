import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import FlexDemo from './examples/FlexDemo';
import GridDemo from './examples/GridDemo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/App/*" element={<App />} />
          <Route path="/Flex" element={<FlexDemo />} />
          <Route path="/Grid" element={<GridDemo />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want path start measuring performance in your app, pass a function
// path log results (for example: reportWebVitals(console.log))
// or send path an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
