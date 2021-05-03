const passport = require('passport');
const bcrypt = require('bcrypt');
module.exports = function (app, myDataBase) {
    const ensureAuthenticated = (req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }

  app.route(["/","page-login"]).get((req, res) => {
    res.render("page-login", {
      title: "Connected to Database",
      message: "Please login",
    });
  });
  app.route("/page-register").get((req,res)=>{
      res.render("page-register")
  })

  app.route('/login').post(passport.authenticate('local',{failureRedirect:'/'},),(req,res)=>{
      console.log("i am here");
      res.redirect('/page-profile');
  })
  app.route('/page-profile').get(ensureAuthenticated,(req,res)=>{
      console.log("I am here yaay redirecting to page profile");
      res.render("page-profile",{
          fullname:req.user.fullname,
          phone: req.user.phone,
      });
  });
  app.route('/register')
  .post((req,res,next)=>{

const hash = bcrypt.hashSync(req.body.password,12);
      myDataBase.findOne({phone:req.body.phone},(err,user)=>{
          if(err)next(err);
          else if(user) res.redirect('/');
          else{
              myDataBase.insertOne({
                  phone: req.body.phone,
                  fullname:req.body.fullname,
                  password:hash
              },(err,doc)=>{
                  if(err) res.redirect('/');
                  else next(null,doc.ops[0])
              })
          }
      })
  },passport.authenticate('local',{failureRedirect:'/'}),(req,res,next)=>{
      res.redirect('/page-profile');
  });
  app.route('/logout').get((req,res)=>{
      req.logout();
      res.redirect('/');
  });


}