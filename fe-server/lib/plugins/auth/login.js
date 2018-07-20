const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const request = require('request');


let credentials;

// router.get('/verifytoken', (req, res)=>{

//   console.log('INSIDE VERIFYTOKEN')
//   // var token = req.headers['x-auth-token'];
//   const token = req.headers['cookie'];
//   // console.log(req);
//   console.log(token);

//   if(!token){
//     console.log('NO TOKEN');
//     return res.json({
//       auth: false,
//       message: "No Token"
//     });
//   }

//   jwt.verify(token, "your_jwt_secret", (err, decoded)=>{
//     if(err){ 
//       console.log('ERR_DECODING_TOKEN');
//       return res.status(500).send({
//         auth: false,
//         message: "Err Decoding Token"
//       })
//     }
//     console.log('Decoded');
//     console.log(decoded);
   
//     credentials = {
//       username: decoded.user.username,
//       password: decoded.user.password,
//       check:false
//     };
    
//     request.post('http://localhost:3000/api/default/login/login', { json: credentials }, (err, res, body) => {
//     if(err){
//       console.log(err);
//     }
//     if(res.statusCode == 200){
//       console.log("INSIDE POST SUCCESS");
//       console.log(body);
//     }
//   }).pipe(res);

//   });
// });

 
router.get('/google',
 passport.authenticate('google', { scope: ['profile'] }));

router.get('/googlecb', (req, res)=>{

  console.log('INSIDE GOOGLE CALLBACK');
  console.log(req.query);
  passport.authenticate('google', (err, user, info)=> {
    if (err) { 
      res.status(404).json(err);
      return;
    }
    if (!user) { 
      return res.status(401).json({
      success: false,
      message: info?info.message:'Login Failed' 
      });
     }
    console.log(user);
    credentials = {
                  username: user.username,
                  password: user.password,
                  check:false
                }
                
    request.post('http://localhost:3000/api/default/login/login', { json: credentials }, (err, res, body) => {
    if(err){
      console.log(err);
    }
    if(res.statusCode == 200){
      console.log("INSIDE POST SUCCESS");
      console.log(body);
    }
  }).pipe(res);
}
)(req, res);
});


router.get('/saml',
  passport.authenticate('saml', (err, profile)=>{
    console.log("Profile: ", profile);
  }),
);

router.post('/samlcb',
    (req, res, next)=>{
      passport.authenticate("saml", (err, user, info) => {
        if(err){
          throw err;
        }
        if(!user){
          return res.json({
            success:false,
            message:info?info.message:"Login Failed"
          })
        }
        console.log(user);
        // req.user = user;
        credentials = {
                      username:user.username,
                      password:user.password
                    }
        request.post('http://localhost:3000/api/default/login/login', { json: credentials }, (err, res, body) => {
          if(err){
              console.log(err);
            }
          if(res.statusCode == 200){
              console.log("INSIDE POST SUCCESS");
              console.log(body);
            }
        }).pipe(res);
        
    })(req, res, next);
    }
);


// router.post('/ldap',
//   passport.authenticate('ldapauth', (err, user, info) => {
//     if(user){
//       console.log(user);
//     }
//   })
// );

router.post('/ldap',
(req, res, next) => {
  passport.authenticate("ldapauth", (err, user, info) => {
    if(err){
      throw err;
    }
    if(!user){
      return res.json({
        success:false,
        message:info?info.message:"Login Failed"
      })
    }
    console.log(user);
    
})(req, res, next);
} 
);


router.get('/finger', (req, res)=>{
 res.render('fingregis'); 
})

router.post('/fing', (req, res)=>{
  console.log(req.body);
  res.send(req.body);
})

router.post('/login', (req, res, next)=> {

  if(credentials){
    console.log('token');
    req.body = credentials;
    console.log(req.body);
  }

  if(req.cookies.user_sid && req.session.username){
    return res.status(401).json({
      success:"False",
      message:'Already Logged in'
    })
  }

  console.log("POST LOGIN");
  console.log(req.body);
  passport.authenticate('local', (err, user, info)=> {

    console.log("PASSPORT AUTHENTICATE");
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    
    if (err) { 
      res.status(404).json(err);
      return;
    }
    if (!user) { 
      console.log(req.get('Authorization'));
      return res.status(401).json({
      success: false,
      message: info?info.message:'Login Failed' 
      });
     }

    req.login(user, (err)=> {
      if (err) { 
        return next(err); 
      }
      console.log("INSIDE LOGIN");
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      console.log(`req.body: ${JSON.stringify(req.body)}`);
      req.session.username = req.body.username;
      console.log(`req.session: ${JSON.stringify(req.session)}`);
      const token = jwt.sign({user: user}, 'your_jwt_secret', { expiresIn: '60m' });
      const data = {
        success: true,
        message: 'Login Successful',
        token
      }
      if(req.body.check){
      res.cookie('token', token);        
      }
      res.redirect('/fe/formBuilder');    
    });

    credentials='';
  })(req, res, next);
});


router.get('/isloggedin', (req, res)=>{

  console.log(`ISLOGGEDIN req.session: ${JSON.stringify(req.session)}`);
  return res.json({
      status: !!req.session.username
    });
});


// logging out user removing username from session
router.get('/logout', (req, res) => {
  req.session.username = undefined;
  return res.json({
   success: req.session.username
 });
});


module.exports = router;
