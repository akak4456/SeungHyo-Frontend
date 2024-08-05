const { createProxyMiddleware } = require('http-proxy-middleware');

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

module.exports = function (app) {
	console.log(API_ENDPOINT);
	app.use(
		'/api',
		createProxyMiddleware({
			target: `${API_ENDPOINT}/api`,
			changeOrigin: true,
		})
	);
};
