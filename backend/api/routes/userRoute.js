'use strict';
var User = require('../models/userModel');
module.exports = function (app) {
    var userList = require('../controllers/userController');
    // userList Routes
    app.get('/listUser', requiresLogin, userList.list_all_user);
    app.get('/user/logout',function(req, res, next){
            if (req.session) {
                // delete session object
                req.session.destroy(function (err) {
                    if (err) {
                        return next(err);
                    } else {
                        return res.redirect('/');
                    }
                });
            }
        });
    app.post('/user', function (req, res) {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
        }

        if (req.body.email &&
            req.body.username &&
            req.body.password &&
            req.body.passwordConf) {

            //create new user
            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }
            User.create(userData, function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/user/example');
                }
            });

        } else if (req.body.logemail && req.body.logpassword) {
            //login into user
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
                if (error || !user) {
                    return res.send("No user found!");
                } else {
                    req.session.userId = user._id;
                    req.session.test = "test";
                    return res.redirect('/user/example');
                }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    });
    /*
*   proof of concepet
*
 */
    app.route('/user/example').get(function (req, res, next) {
        console.log(req.session.userId);
        User.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        return res.send('Not authorized! Go back!');
                    } else {
                        return res.sendFile('./form.html', {root: './static/'});//res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/user/logout">Logout</a>')
                    }
                }
            });
    });
    function requiresLogin(req, res, next) {
        console.log(req.session.userId);
        User.findById(req.session.userId)
            .exec(function (error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        if (user === null) {
                            return res.send('Not authorized! Go back!');
                        } else {
                            next();
                        }
                    }
                }
            )
    };
}