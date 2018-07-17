const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// const passportJWT = require("passport-jwt");
// const JWTStrategy   = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

const Users = [
    
    {   
        id:'1',
        username:"foo",
        password:"bar"
    },
    {   
        id:'2',
        username:"user1",
        password:"pass1"
    },
    {
        id:'3',
        username:"user2",
        password:"pass2"
    },
    {
        id:'4',
        username:"user3",
        password:"pass3"
    }
]

passport.serializeUser((user, done)=> {
    console.log('SERIALIZE USER')
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(`The user id passport saved in the session file store is: ${id}`)
    const user = Users[0].id === id ? Users[0] : false; 
    done(null, user);
  });

passport.use(new LocalStrategy((username, password, done)=> {
        const user = Users[0];
        //Check if user exists
        if(username !== user.username){
            return done(null, false, { message: 'Incorrect Username.'});
        }
        //validPassword method
        if(password !== user.password){
            return done(null, false, { message: ' Incorrect Password '});
        }
        return done(null, user);
    }
));

module.exports = passport.initialize();



