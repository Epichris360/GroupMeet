import turbo from 'turbo360'
import pkg from '../../package.json'
const APP_ID = pkg.app || ''

const postRequest = (resource, params, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).create(resource, params)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})
}

const getRequest = (resource, params, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).fetch(resource, params)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					params: params, // can be null
					data: data
				})
			}
			
			return data
		})
		.catch(err => {
			throw err
		})
}

const putRequest = (resource, entity, params, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).update(resource, entity, params)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})
}

const deleteRequest = (resource, entity, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).remove(resource, entity)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})
}

const createUser = (credentials, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).createUser(credentials)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})
}

const login = (credentials, actionType) => {
	return dispatch => turbo({site_id:APP_ID}).login(credentials)
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})

}

const currentUser = (actionType) => {
	return dispatch => turbo({site_id:APP_ID}).currentUser()
		.then(data => {
			if (actionType != null){
				dispatch({
					type: actionType,
					data: data
				})
			}

			return data
		})
		.catch(err => {
			throw err
		})
}

const uploadFile = (file) => {
	return turbo({site_id:APP_ID}).uploadFile(file) // returns a Promise
}


export default {

	getRequest: getRequest,
	postRequest: postRequest,
	putRequest: putRequest,
	deleteRequest: deleteRequest,
	createUser: createUser,
	login: login,
	currentUser: currentUser,
	uploadFile: uploadFile

}
