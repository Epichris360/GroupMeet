"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var turbo = _interopRequire(require("turbo360"));

var pkg = _interopRequire(require("../../package.json"));

var APP_ID = pkg.app || "";

var postRequest = function (resource, params, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).create(resource, params).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var getRequest = function (resource, params, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).fetch(resource, params).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					params: params, // can be null
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var putRequest = function (resource, entity, params, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).update(resource, entity, params).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var deleteRequest = function (resource, entity, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).remove(resource, entity).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var createUser = function (credentials, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).createUser(credentials).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var login = function (credentials, actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).login(credentials).then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var currentUser = function (actionType) {
	return function (dispatch) {
		return turbo({ site_id: APP_ID }).currentUser().then(function (data) {
			if (actionType != null) {
				dispatch({
					type: actionType,
					data: data
				});
			}

			return data;
		})["catch"](function (err) {
			throw err;
		});
	};
};

var uploadFile = function (file) {
	return turbo({ site_id: APP_ID }).uploadFile(file) // returns a Promise
	;
};


module.exports = {

	getRequest: getRequest,
	postRequest: postRequest,
	putRequest: putRequest,
	deleteRequest: deleteRequest,
	createUser: createUser,
	login: login,
	currentUser: currentUser,
	uploadFile: uploadFile

};