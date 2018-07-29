let controller = require('./../controllers/controller');
module.exports = app => {
	app.post('/api/login', controller.login);
	app.post('/api/register', controller.register);
	app.get('/api/logout', controller.logout);
	app.get('/current', controller.current);
}