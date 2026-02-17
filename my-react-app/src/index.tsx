import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductList from './ProductList';
//import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductModal from './ProductModal';

const reactRootElement = document.getElementById('mvc-react-root');

if (reactRootElement) {
    const root = ReactDOM.createRoot(reactRootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );


} else {
    console.error('Reactのルート要素が見つかりませんでした。ID:mvc-react-root');
}

const pryvacyRootElement = document.getElementById('react-root-privacy');

if (pryvacyRootElement) {
    const root = ReactDOM.createRoot(pryvacyRootElement);
    root.render(
        <React.StrictMode>
            <ProductList />
        </React.StrictMode>
    )
} else {
    console.error('Reactのルート要素が見つかりませんでした。ID:mvc-react-root');
}

const btnroot = document.getElementById('react-modal-btn');

if (btnroot) {
    const root = ReactDOM.createRoot(btnroot);
    root.render(
        <React.StrictMode>
            <ProductModal />
        </React.StrictMode>
    )
}

//reportWebVitals();
