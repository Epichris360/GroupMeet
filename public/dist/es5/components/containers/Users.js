"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions"));




/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	This container serves primarily as an example of how to execute basic
	user tasks like login, logout, etc. Feel free to re-purpose this componenet 
	for your own project or create your own components using the functions 
	from here as a guide.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var Users = (function (Component) {
	function Users() {
		_classCallCheck(this, Users);

		_get(Object.getPrototypeOf(Users.prototype), "constructor", this).call(this);
		this.state = {
			error: null,
			user: {
				username: ""
			}
		};
	}

	_inherits(Users, Component);

	_prototypeProperties(Users, null, {
		componentDidMount: {

			// On mount, we fetch all current users on the backend (this.props.fetchUsers) then
			// check if there is a currently logged-in user (this.props.currentUser)
			value: function componentDidMount() {
				var _this = this;
				this.props.fetchUsers({}).then(function (response) {
					return _this.props.currentUser() // get the logged-in user, if any
					;
				}).then(function (response) {})["catch"](function (err) {
					console.log("ERROR: " + err.message);
				});
			},
			writable: true,
			configurable: true
		},
		updateUser: {

			// This function updates a user:
			value: function updateUser(field, event) {
				if (event) event.preventDefault();

				var updated = Object.assign({}, this.state.user);
				updated[field] = event.target.value;
				this.setState({
					user: updated
				});
			},
			writable: true,
			configurable: true
		},
		submitUser: {

			// This function creates a new user and adds it to the Turbo backend:
			value: function submitUser(event) {
				if (event) event.preventDefault();

				if (this.state.user.username.length == 0) {
					alert("Please Enter a Username");
					return;
				}

				this.props.addUser(this.state.user).then(function (response) {})["catch"](function (err) {
					alert(err.message);
				});
			},
			writable: true,
			configurable: true
		},
		loginUser: {

			// This function logs in the user on the Turbo backend:
			value: function loginUser(event) {
				if (event) event.preventDefault();

				if (this.state.user.username.length == 0) {
					alert("Please Enter a Username");
					return;
				}

				if (this.state.user.password == null) {
					alert("Please Enter a Password");
					return;
				}

				this.props.loginUser(this.state.user).then(function (response) {
					console.log("LOGIN: " + JSON.stringify(response));
				})["catch"](function (err) {
					alert(err.message);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var usersList = this.props.users.all || [];

				var joinTurbo = React.createElement(
					"div",
					null,
					React.createElement(
						"a",
						{ target: "_blank", href: "https://www.velocity360.io/turbo" },
						"Join Turbo!"
					)
				);

				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"h3",
								{ className: "topmargin-sm nobottommargin" },
								"Add User"
							),
							React.createElement("input", { className: "form-control", onChange: this.updateUser.bind(this, "username"), type: "text", placeholder: "username" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", onChange: this.updateUser.bind(this, "password"), type: "password", placeholder: "password" }),
							React.createElement("br", null),
							React.createElement(
								"button",
								{ className: "btn btn-info", onClick: this.submitUser.bind(this) },
								"Submit"
							)
						),
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"h4",
								{ className: "topmargin-sm nobottommargin" },
								"Current Users"
							),
							React.createElement(
								"ol",
								{ style: { paddingLeft: 16 } },
								usersList.map(function (user, i) {
									return React.createElement(
										"li",
										{ key: user.id },
										user.username
									);
								})
							)
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"h3",
								{ className: "topmargin-sm nobottommargin" },
								"Login User"
							),
							React.createElement("input", { className: "form-control", onChange: this.updateUser.bind(this, "username"), type: "text", placeholder: "username" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", onChange: this.updateUser.bind(this, "password"), type: "password", placeholder: "password" }),
							React.createElement("br", null),
							React.createElement(
								"button",
								{ className: "btn btn-info", onClick: this.loginUser.bind(this) },
								"Log In"
							)
						),
						this.props.users.currentUser == null ? null : React.createElement(
							"div",
							{ className: "col-md-6" },
							React.createElement(
								"h4",
								{ className: "topmargin-sm" },
								"Currently Logged In As: ",
								this.props.users.currentUser.username
							),
							React.createElement(
								"button",
								{ className: "btn btn-info" },
								"Log Out"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Users;
})(Component);

var stateToProps = function (state) {
	return {
		users: state.user
	};
};

var dispatchToProps = function (dispatch) {
	return {
		fetchUsers: function (params) {
			return dispatch(actions.fetchUsers(params));
		},
		addUser: function (params) {
			return dispatch(actions.addUser(params));
		},
		loginUser: function (credentials) {
			return dispatch(actions.loginUser(credentials));
		},
		currentUser: function () {
			return dispatch(actions.currentUser());
		}
	};
};

module.exports = connect(stateToProps, dispatchToProps)(Users);