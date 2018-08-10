import "babel-polyfill";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './index.css';
render(
	<Router>
		<AppRoutes />
	</Router>,
	document.getElementById('root')
);