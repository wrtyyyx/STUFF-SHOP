import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import './reset.css';
import './main.scss';
import AppRouter from './router/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
