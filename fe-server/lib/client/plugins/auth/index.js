const path = FE.require('path');
const jwt = FE.require('jsonwebtoken');
const BasePlugin = FE.requireLib('/client/pluginBaseClass.js');
const loginRouter = require('./login.js');
const request = FE.require('request');
const express = FE.require('express');


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
		this._appObj.app.use('/api/default/login', loginRouter);
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
			/**
			 * checks token avl and login status
			 */
			if (req.cookies.token && !req.session.username) {

				console.log(req.cookies.token);
				const token = req.cookies.token;

				console.log(token);
				/**
				 * Validate token and return decoded form/error
				 */
				jwt.verify(token, thisObj._configs.jwtSecretKey, (err, decoded) => {

					if (err) {
						console.log('ERR_DECODING_TOKEN');
						return res.render('default/views/login/index', {
							message: "Token Error"
						});
					}

					console.log('Decoded');
					console.log(decoded);
					// const user = JSON.parse(decoded.user)[0]

					/**
					 * find user credentials from db
					 */

					// this._appObj.models.UserModel.findAll({
														// attributes: [FE.DBOBJECT.cast( FE.DBOBJECT.fn('AES_DECRYPT',"("+user.attribute4.data+")",'(hanuabhi)'), 'char(50)')],
														// attributes: [FE.DBOBJECT.fn('AES_DECRYPT',FE.DBOBJECT.cast(FE.DBOBJECT.col('attribute4')),'(hanuabhi)'),"password"],
					// 									attributes: [FE.DBOBJECT.cast( FE.DBOBJECT.fn('AES_DECRYPT',FE.DBOBJECT.col('attribute4'),'(hanuabhi)'), 'char(50)')],	
					// 									where:{
					// 										attribute1:user.attribute1
					// 									}
					// 								},
					// 							).then(pass =>{
					// 								console.log(JSON.stringify(pass));
					// 							}).catch(err=>{
					// 								console.log(err);
					// 							})


					/**
					 * set credentials and fire localLogin()
					 * set check: false for not saving token again in cookies
					 */
					let credentials = {
						username: decoded.user.username,
						password: decoded.user.password,
						// username: user.attribute3
						// password: FE.DBOBJECT.query("SELECT	cast(aes_decrypt(attribute4,'(hanuabhi)') as char(40)) FROM fe_adm_user_t where attribute1=414811"),
						// password: FE.DBOBJECT.cast(FE.DBOBJECT.fn('AES_DECRYPT',user.attribute4,'(hanuabhi)'),'char(50)'),
						check: false   
					};
					
					if (credentials) {
						console.log('token');
						req.body = credentials;
						console.log(req.body);
					}
					/**
					 * Check whether user is already logged in
					 */
					if (req.cookies.fe_session_id && req.session.username) {
						return res.status(401).json({
							success: "False",
							message: 'Already Logged in'
						})
					}
				
					console.log("POST LOGIN");
					console.log(req.body);
					this._passport.authenticate('local', (err, user, info) => {
				
						console.log("PASSPORT AUTHENTICATE");
						console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
						console.log(`req.user: ${JSON.stringify(req.user)}`);
				
						if (err) {
							res.status(404).json(err);
							return;
						}
						if (!user) {
							console.log(req.get('Authorization'));
							return res.render('default/views/login/index', {
								message: info ? info.message : 'Login Failed'
							});
							
						}
						req.login(user, (err) => {
							if (err) {
								return next(err);
							}
							console.log("INSIDE LOGIN");
							console.log(`req.user: ${JSON.stringify(req.user)}`);
							console.log(`req.body: ${JSON.stringify(req.body)}`);
							req.session.username = req.body.username;
							console.log(`req.session: ${JSON.stringify(req.session)}`);
							const token = jwt.sign({
								user: user
							}, 'ASDASDSADQWE16235laskjhdlkasdlAASDASDAS34534534', {
								expiresIn: '60m'
							});
							const data = {
								success: true,
								message: 'Login Successful',
								token
							}
							if (req.body.check) {
								res.cookie('token', token);
							}
							console.log("BEF_RED");
							// res.send('LOGIN_SUCCES')
							res.redirect('/');
								
						});
						credentials = '';
					})(req, res, next);

				});
			}
			else {
				next();
			}
			console.log("USER " + req.session.username);

		});

		/** 
		 * for serving angular app 
		 * static files
		 */
		this._appObj.app.use((express.static(global.projectFolderPath + "/dist/fe")));

		this._appObj.app.get(/^\/(?!api\/)(.*)$/, (req, res)=>{
			console.log("HHHKJKJ");
		    return res.sendFile(path.join(FE.APP_PATH, "dist", "fe", "index.html"));  
		});
	}


	serialize() {
		/**
		 * Serialize User
		 */
		this._passport.serializeUser((user, done) => {
			console.log('SERIALIZE USER')
			console.log(JSON.parse(user)[0].attribute1);
			done(null, JSON.parse(user)[0].attribute1);
			// console.log(user);
			// done(null, user.id);
		});
	}

	deserialize() {
		/**
		 * Deserialize User
		 */
		this._passport.deserializeUser((id, done) => {
			console.log('Inside deserializeUser callback')
			console.log(`The user id passport saved in the session file store is: ${id}`)
			/**
			 * Find User from db using id/attr send by serialize func
			 * 
			 */
			// console.log("DESERIALIZE");
			// const index = this.users.findIndex(user => user.id === id)
			// done(null, this.users[index]);
			this._appObj.models.UserModel.findAll({
				where: {
					attribute1 : id,
				}
			}).then(users => {
				console.log(JSON.stringify(users));
				done(null, users);
			}).catch(err=>{
				console.log(err);
			});


		});
	}
	/**
	 * load all strategies here
	 */
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
			
			// const index = thisObj.users.findIndex(user => user.username === username);
			
			/**
			 * Find User from db
			 *  
			 */

			thisObj._appObj.models.UserModel.findAll({
				where: {
					attribute3 : username,
					attribute4 : FE.DBOBJECT.fn('AES_ENCRYPT', password, '(hanuabhi)'),
					attribute11 : 'Y',
					attribute46 :2,
					attribute47 :3	
				}
			}).then(user => {
				console.log(JSON.stringify(user));
				if(user.length==0){
					return done(null, false, {
								message: 'Incorrect Username/Password'
							});
				}
				return done(null, JSON.stringify(user));
			}).catch(err=>{
				console.log(err);
			});
			// const user = thisObj.users[index];

			// console.log(user)
			// // Check if user exists
			// if (index === -1) {
			// 	return done(null, false, {
			// 		message: 'Incorrect Username'
			// 	});
			// }
			// //validPassword method
			// else if (password !== user.password) {
			// 	return done(null, false, {
			// 		message: 'Incorrect Password'
			// 	});
			// }
			// console.log("BEFORE SERIALIZE");
			// return done(null, user);
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
				console.log(profile);
				// find the User from db
				const index = thisObj.users.findIndex(user => user.samlId === profile.nameID);
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
