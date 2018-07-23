function configLoader(appObj) {
	let config = {
		sessionKey: 'fe_session_id',
		storeType: 'mongo',
		mongo: {
			url: 'mongodb://guest:guest1@ds133597.mlab.com:33597/fe-erp',
			ttl: 2 * 60 * 60,
		},
		clientSecret: 'QEQWE@#4234234ASDASDCZXC__+++2123123',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 2,
			expires: 1000 * 60 * 2,
		}
	};
	return config;
}
module.exports = configLoader;
