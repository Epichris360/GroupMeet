"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

module.exports = function (props) {


	return React.createElement(
		"div",
		{ className: "row" },
		React.createElement(
			"div",
			{ className: "col-md-6 col-md-offset-3", style: { textAlign: "center", marginBottom: 48 } },
			React.createElement(
				"h1",
				null,
				"Welcome to Turbo"
			),
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ style: { background: "#f9f9f9", border: "1px solid #ddd", borderRadius: 3, padding: 12 } },
				"You are currently looking at the ",
				React.createElement(
					"strong",
					{ style: { color: "red" } },
					"Intro.js"
				),
				" file in the '/src/components/presentation' directory of your project. This template is rendered with the Mustache templating engine."
			),
			React.createElement(
				"h3",
				{ style: { marginTop: 48 } },
				"Routes"
			),
			React.createElement("hr", null),
			React.createElement(
				"p",
				null,
				"The routes are stored in the 'routes' directory. This scaffold comes with two sample routes out of the box: index and api. To test each route, click the following links:"
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "col-md-6 col-md-offset-0" },
					React.createElement(
						"div",
						{ style: localStyle.grayBox },
						React.createElement(
							"h4",
							null,
							"Index Route"
						),
						React.createElement(
							"ul",
							{ style: { paddingLeft: 16 } },
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/json" },
									"JSON Response"
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/send" },
									"Text Response"
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/redirect" },
									"Redirect"
								)
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "col-md-6" },
					React.createElement(
						"div",
						{ style: localStyle.grayBox },
						React.createElement(
							"h4",
							null,
							"API Route"
						),
						React.createElement(
							"ul",
							{ style: { paddingLeft: 16 } },
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/api/profile" },
									"Resource Request"
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/api/profile?team=cavaliers" },
									"With Query Params"
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "/api/profile/lebron_james" },
									"With ID"
								)
							)
						)
					)
				)
			),
			React.createElement(
				"h3",
				{ style: { marginTop: 48 } },
				"Static Assets"
			),
			React.createElement("hr", null),
			React.createElement(
				"p",
				null,
				"Static assets (images, js, css, etc) are located in the \"public\" directory. The image below is rendered from the 'images' directory of the public folder:",
				React.createElement("br", null),
				React.createElement("br", null),
				React.createElement("img", { src: "/images/turbo.png" }),
				React.createElement("br", null),
				React.createElement("br", null),
				"When deployed on Turbo Vertex, static assets are ",
				React.createElement(
					"em",
					null,
					"automatically"
				),
				" distributed to a global CDN so there is no need to set that up. If you decide to eject and deploy this project on your own architecture, you will have to configure a CDN distribution (or at least you should)."
			),
			React.createElement(
				"h3",
				{ style: { marginTop: 48 } },
				"Deployment"
			),
			React.createElement("hr", null),
			React.createElement(
				"p",
				null,
				"To deploy, connect the project to a Turbo 360 project using the APP_ID (from root directory):",
				React.createElement(
					"pre",
					{ style: localStyle.pre },
					React.createElement(
						"code",
						null,
						"$ turbo app APP_ID"
					)
				),
				"Then deploy by simply entering the deploy command:",
				React.createElement(
					"pre",
					{ style: localStyle.pre },
					React.createElement(
						"code",
						null,
						"$ turbo deploy"
					)
				),
				"When deployment is complete, you will see a live link where you can access the project on the internet!"
			)
		)
	);
};

var localStyle = {
	grayBox: {
		textAlign: "left",
		background: "#f9f9f9",
		border: "1px solid #ddd",
		borderRadius: 3,
		padding: 12
	},
	pre: {
		textAlign: "left",
		marginTop: 8,
		background: "#333",
		color: "#fff"
	}
};