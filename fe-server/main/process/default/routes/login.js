const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


router.post('/login', (req, res, next)=> {

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

     const token = jwt.sign({user:user}, 'your_jwt_secret',{ expiresIn: '60m' });
      return res.json({
        success:true,
        message: 'Login Successful',
       token
      });
    });
  })(req, res, next);
});


router.get('/isloggedin', (req, res)=>{
  // return false; 
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
