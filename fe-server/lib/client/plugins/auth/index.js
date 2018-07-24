const path = FE.require('path');
const jwt = FE.require('jsonwebtoken');
const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');
const loginRouter = require('./login.js');
const request = FE.require('request');

class AuthPlugin extends BasePlugin {
	constructor(_appObj) {
		super(_appObj);
		this._appObj = _appObj;
		this._configs = this._appObj.configs.plugins.auth;
		this._props = {};
		this._passport = FE.require('passport');
		this.users = [{
				id: '1',
				googleId: '105589192699370577629',
				samlId: 'tempIdp',
				username: "foo",
				password: "bar",
				email: 'sahil.mansoori@flexiele.com'
			},
			{
				id: '2',
				username: "user1",
				password: "pass1"
			},
			{
				id: '3',
				username: "user2",
				password: "pass2"
			},
			{
				id: '4',
				username: "user3",
				password: "pass3"
			},
			{
				id: '5',
				ldapId: 'X0986',
				username: "Flexiele 1",
				password: "abcd@123"
			},
			{
				id: '6',
				ldapId: 'X0987',
				username: "Flexiele 2",
				password: "abcd@123"
			}

		];
	}

	initialize() {
		this._appObj.app.use(this._passport.initialize());
		this.loadStrategies();
		this.serialize();
		this.deserialize();
		this._appObj.app.use('/fe/api/login/', loginRouter);
		this._appObj.app.use(this._passport.session());
			this.redirectUser();
		console.log('auth plugin initialized');
	}

	redirectUser() {
		var thisObj = this;
		/**
		 * Checks if token is saved in cookies 
		 * true: validate and login
		 */
		this._appObj.app.use((req, res, next) => {
			if (!req.session.username && !req.cookies.token) {
				res.render('default/views/login/index');
			}
			next();
		});
		this._appObj.app.use((req, res, next) => {
			console.log('in FE');
			if (req.cookies.token && !req.session.username) {

				console.log(req.cookies.token);
				const token = req.cookies.token;

				console.log(token);
				// jwt.verify(token, thisObj._configs.jwtSecretKey, thisObj.jwtVerificationCB.bind(thisObj, [res]));
				jwt.verify(token, thisObj._configs.jwtSecretKey, (err, decoded) => {

					if (err) {
						console.log('ERR_DECODING_TOKEN');
						return res.status(500).send({
							auth: false,
							message: "Err Decoding Token"
						})
					}

					console.log('Decoded');
					console.log(decoded);

					let credentials = {
						username: decoded.user.username,
						password: decoded.user.password,
						check: false
					};

					request.post('http://fe.localhost:3000/fe/api/login/login', {
						json: credentials
					}, (err, res, body) => {

						if (err) {
							console.log(err);
						}
						if (res.statusCode === 200) {
							console.log("INSIDE POST SUCCESS");
							console.log(body);
							// next();
						}
					}).pipe(res);
				});
			}
			next();
			console.log("USER " + req.session.username);

		});


		this._appObj.app.get('/', (req, res)=>{
			// console.log('before 1')
			// //this._dynamicStatic.setPath(path.join(FE.APP_PATH, "dist", "fe"));
			// console.log('after 1')
			
		  // if(req.session.username){
		    return res.sendFile(path.join(FE.APP_PATH, "dist", "fe", "index.html"));  
		    // res.send("LOGGED IN")
		  // }
		});
	}

	// jwtVerificationCB(response, err, decoded) {
	// 	if (err) {
	// 		console.log('ERR_DECODING_TOKEN');
	// 		return res.status(500).send({
	// 			auth: false,
	// 			message: "Err Decoding Token"
	// 		})
	// 	}

	// 	console.log('Decoded');
	// 	console.log(decoded);

	// 	let credentials = {
	// 		username: decoded.user.username,
	// 		password: decoded.user.password,
	// 		check: false
	// 	};

	// 	request.post('http://localhost:3000/api/default/login/login', {
	// 		json: credentials
	// 	}, (err, res, body) => {

	// 		if (err) {
	// 			console.log(err);
	//     }
	// 		if (res.statusCode === 200) {
	// 			console.log("INSIDE POST SUCCESS");
	// 			console.log(body);
	// 		}
	//   }).pipe(response);
	// }

	serialize() {
		/**
		 * Serialize User
		 */
		this._passport.serializeUser((user, done) => {
			console.log('SERIALIZE USER')
			console.log(user);
			done(null, user.id);
		});
	}

	deserialize() {
		/**
		 * Deserialize User
		 */
		this._passport.deserializeUser((id, done) => {
			console.log('Inside deserializeUser callback')
			console.log(`The user id passport saved in the session file store is: ${id}`)
			//find user by id
			const index = this.users.findIndex(user => user.id === id)
			done(null, this.users[index]);
		});
	}

	loadStrategies() {
		var strategies = this._configs.strategies;
		if (strategies.local == true) {
			this.loadLocalStrategy();
		}

		if (strategies.google == true) {
			this.loadGoogleStrategy();
		}

		if (strategies.saml == true) {
			this.loadSamlStrategy();
		}

		if (strategies.ldap == true) {
			this.loadLdapStrategy();
		}
	}

	loadLocalStrategy() {
		let thisObj = this;
		console.log("LOCALSTRATEGY ");
		const LocalStrategy = FE.require('passport-local').Strategy;
		/**
		 * Passport Local Strategy 
		 */

		this._passport.use(new LocalStrategy((username, password, done) => {
			console.log("INSIDE LOCAL")
			const index = thisObj.users.findIndex(user => user.username === username);
			const user = thisObj.users[index];
			console.log(user)
			//Check if user exists
			if (index === -1) {
				return done(null, false, {
					message: 'Incorrect Username'
				});
			}
			//validPassword method
			else if (password !== user.password) {
				return done(null, false, {
					message: 'Incorrect Password'
				});
			}
			console.log("BEFORE SERIALIZE");
			return done(null, user);
		}));
	}

	loadGoogleStrategy() {
		let thisObj = this;
		const GoogleStrategy = FE.require('passport-google-oauth20').Strategy;
		/**
		 * Passport Google Strategy
		 */
		this._passport.use(new GoogleStrategy({
				clientID: this._configs.google.clientId,
				clientSecret: this._configs.google.clientSecret,
				callbackURL: this._configs.google.callbackUrl
			},
			(accessToken, refreshToken, profile, done) => {
				console.log('GOOGLE CALLBACK FIRED');
				console.log(profile.id);
				const index = thisObj.users.findIndex(user => user.googleId === profile.id);
				if (index === -1) {
					return done(null, false, {
						message: 'No user found'
					});
				}
				return done(null, thisObj.users[index]);
			}
		));
	}

	loadSamlStrategy() {
		let thisObj = this;
		const SamlStrategy = FE.require('passport-saml').Strategy;
		/**
		 * Passport SAML Strategy
		 * Login Credentials (SSO_CIRCLE)->
		 *                  username: tempIdp
		 *                  password: rfx5dmail
		 */
		this._passport.use(new SamlStrategy({
				path: this._configs.saml.path,
				entryPoint: this._configs.saml.entryPoint,
				issuer: this._configs.saml.issuer
			},
			(profile, done) => {
				console.log("SAML CALLBACK FIRED");
				console.log(profile.UserID);
				// find the User from db
				const index = thisObj.users.findIndex(user => user.samlId === profile.UserID);
				if (index === -1) {
					return done(null, false, {
						message: 'No user found'
					});
				}
				return done(null, thisObj.users[index]);
			}
		));
	}

	loadLdapStrategy() {
		let thisObj = this;
		const LdapStrategy = FE.require('passport-ldapauth').Strategy;

		this._passport.use(new LdapStrategy({
				server: {
					url: this._configs.ldap.url,
					bindDN: this._configs.ldap.bindDN,
					bindCredentials: this._configs.ldap.bindCredentials,
					searchBase: this._configs.ldap.searchBase,
					searchFilter: this._configs.ldap.searchFilter
				}
			},
			(profile, done) => {
				console.log("LDAP");
				console.log(profile);
				// find the User from db
				const index = thisObj.users.findIndex(user => user.ldapId === profile.ID);
				return done(null, thisObj.users[index]);
			}
		));
	}
}

module.exports = AuthPlugin;
