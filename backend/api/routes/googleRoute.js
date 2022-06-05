'use strict';
module.exports = function (app) {
    var markerList = require('../controllers/googleController');
    var User = require('../models/userModel')
    // markerList Routes
    app.get('/marker', markerList.list_all_marker);
    app.post('/marker', requiresLogin, markerList.create_a_marker);
    app.route('/marker/:markerId')
        .get(markerList.read_a_marker)
        .put(requiresLogin, markerList.update_a_marker)
        .delete(requiresLogin, markerList.delete_a_marker);

    /*
    *   proof of concepet check
    *
     */
    function requiresLogin(req, res, next) {
        console.log(req.session);
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