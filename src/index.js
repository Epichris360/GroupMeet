import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import Intro from './components/Intro'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app with Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/


const app = (
	<Provider store={store.configure(null)}>
		<Intro />
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))