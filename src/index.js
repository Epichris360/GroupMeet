import React, { Component } from 'react'
import ReactDOM 			from 'react-dom'
import store 				from './stores'
import { Provider } 		from 'react-redux'
import { Search } 			from './components/containers'

const app = (
	<Provider store={store.configure(null)}>
		<Search />
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app with Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
