import React from 'react'

export default (props) => {


	return (
		<div className="row">

			<div className="col-md-6 col-md-offset-3" style={{textAlign:'center', marginBottom:48}}>
				<h1>Welcome to Turbo</h1>
				<hr />
				<div style={{background:'#f9f9f9', border:'1px solid #ddd', borderRadius:3,padding:12}}>
					You are currently looking at the <strong style={{color:'red'}}>Intro.js</strong> file 
					in the '/src/components/presentation' directory of your project. This template 
					is rendered with the Mustache templating engine.
				</div>

				<h3 style={{marginTop:48}}>Routes</h3>
				<hr />

				<p>
					The routes are stored in the 'routes' directory. This scaffold comes with two sample 
					routes out of the box: index and api. To test each route, click the following links:
				</p>

				<div className="row">
					<div className="col-md-6 col-md-offset-0">
						<div style={localStyle.grayBox}>
							<h4>Index Route</h4>
							<ul style={{paddingLeft:16}}>
								<li><a href="/json">JSON Response</a></li>
								<li><a href="/send">Text Response</a></li>
								<li><a href="/redirect">Redirect</a></li>
							</ul>
						</div>
					</div>

					<div className="col-md-6">
						<div style={localStyle.grayBox}>
							<h4>API Route</h4>
							<ul style={{paddingLeft:16}}>
								<li><a href="/api/profile">Resource Request</a></li>
								<li><a href="/api/profile?team=cavaliers">With Query Params</a></li>
								<li><a href="/api/profile/lebron_james">With ID</a></li>
							</ul>
						</div>
					</div>
				</div>

				<h3 style={{marginTop:48}}>Static Assets</h3>
				<hr />
				<p>
					Static assets (images, js, css, etc) are located in the "public" directory. The image below 
					is rendered from the 'images' directory of the public folder:
					<br /><br />
					<img src="/images/turbo.png" />
					<br /><br />
					When deployed on Turbo Vertex, static assets are <em>automatically</em> distributed to a 
					global CDN so there is no need to set that up. If you decide to eject and deploy this 
					project on your own architecture, you will have to configure a CDN distribution (or at 
						least you should).
				</p>

				<h3 style={{marginTop:48}}>Deployment</h3>
				<hr />
				<p>
					To deploy, connect the project to a Turbo 360 project using the APP_ID (from root directory):
					<pre style={localStyle.pre}>
						<code>$ turbo app APP_ID</code>
					</pre>

					Then deploy by simply entering the deploy command:
					<pre style={localStyle.pre}>
						<code>$ turbo deploy</code>
					</pre>

					When deployment is complete, you will see a live link where you can access the project on the internet!
				</p>

			</div>
		</div>

	)
}

const localStyle = {
	grayBox: {
		textAlign:'left',
		background:'#f9f9f9',
		border:'1px solid #ddd',
		borderRadius:3,
		padding:12
	},
	pre: {
		textAlign:'left',
		marginTop:8,
		background:'#333',
		color:'#fff'
	}
}

