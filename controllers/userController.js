const User = require('../models/User')




exports.verifiedUser = function(req,res){
    //if(randomNo == this.data.otp) {
        res.render('page-login')
    //}
}

exports.register = function(req,res){
    let user = new User(req.body)
    user.register()
    if(user.errors.length){
        res.send(user.errors)
    } else{
        res.render('page-sms-verification')
    }
}



exports.login = function(req,res){
    let user = new User(req.body)
    user.login()
    if(user.errors.length){
        res.send(user.errors)
    } else{
        res.render('page-profile')
    }
}

exports.home = function(req,res){
    res.render('page-login')
}