import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import App from './App';
import { store, persistor } from 'store';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '../node_modules/@mui/material/index';
import { PersistGate } from 'redux-persist/integration/react';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
