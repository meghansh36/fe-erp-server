let authConfig = {
	strategies: {
		local: true,
		google: true,
		saml: true,
		ldap: true,
	},
	google: {
		clientId: '210388964297-poii0qg87ocquekma1jojutgqoigusi1.apps.googleusercontent.com',
		clientSecret: 'dXrgtPT1oRoJNdU1NnMAbl0A',
		callbackUrl: '/api/default/login/googlecb'
	},
	ldap: {
		url: "ldap://182.74.171.42:389",
		bindDN: "uid=Flexiele 1, cn=Users, dc=w, dc=net",
		bindCredentials: 'abcd@123',
		searchBase: "cn=Users, dc=w, dc=net",
		searchFilter: "(uid={{username}})"
	},
	saml: {
		entryPoint: 'https://idp.ssocircle.com/sso/idpssoinit?metaAlias=/ssocircle&spEntityID=tempIdp',
		issuer: 'passport-saml',
		path: '/api/default/login/samlcb'
	},
	jwtSecretKey: "ASDASDSADQWE16235laskjhdlkasdlAASDASDAS34534534"
}
module.exports = authConfig;
