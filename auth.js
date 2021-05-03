const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const ObjectID = require('mongodb').ObjectID;

require('dotenv').config();
module.exports = function (app, myDataBase) {

  // Serialization and deserialization here...
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  // strategy 
  passport.use(new LocalStrategy({
      usernameField:'phone',
      passwordField:'password'
  },
      (phone,password,done)=>{
          myDataBase.findOne({phone:phone},(err,user)=>{
              console.log("user "+user.phone+" attempted to log in");

              if(err){return done(err);}
              if(!user){return done(null,false);}
              if(!bcrypt.compareSync(password,user.password)){return done(null,false);}
              
              return done(null,user);
  // strategy 
          })
      }
  ));
}