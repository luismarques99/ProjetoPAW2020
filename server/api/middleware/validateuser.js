// private route
app.use('/testes', validateUser, testes);

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (
		err,
		decoded
	) {
		if (err) {
			res.json({ status: 'error', message: err.message, data: null });
		} else {
			console.log(req.body);
			// add user id to request
			req.body.userId = decoded.id;

			next();
		}
	});
}
