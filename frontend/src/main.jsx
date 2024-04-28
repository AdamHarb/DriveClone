import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import {CookiesProvider} from "react-cookie";

const rootNode = document.getElementById('root');

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<React.StrictMode>
	<CookiesProvider>
	<App />
	</CookiesProvider>
</React.StrictMode>, rootNode);
