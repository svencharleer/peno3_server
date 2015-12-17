var express = require('express');
var router = express.Router();
var db = require("../classes/db.js");
/*
REST GET CALL: get all data of group
 */
router.get('/:groupid', function(req, res, next) {
    var groupid = req.params.groupid;
    db.queryByGroupId(groupid, function(err,data){
        res.json({err:err, data:data});
    })

});

/*
 REST GET CALL: get all data of group for session
 */
router.get('/:groupid/:sessionid', function(req, res, next) {

    var groupid = req.params.groupid;
    var sessionid = req.params.sessionid;
    db.queryByGroupIdAndSessionId(groupid, sessionid, function(err,data){
        res.json({err:err, data:data});
    })
});

/*
 REST GET CALL: get all data of group for session with DATA search
 */
router.get('/:groupid/:sessionid/:field/:value', function(req, res, next) {

    var groupid = req.params.groupid;
    var sessionid = req.params.sessionid;
    var field = req.params.field;
    var value = req.params.value;
    db.queryByGroupIdAndSessionIdAndData(groupid, sessionid, field, value, function(err,data){
        res.json({err:err, data:data});
    })
});

/*
 REST PUT CALL: push a new data object of group for session
 to test this:
 */
router.put('/:groupid/:sessionid', function(req, res, next) {
    var groupid = req.params.groupid;
    var sessionid = req.params.sessionid;
    var data = req.body;
    db.putData(groupid, sessionid, data, function(err){
        if(err != null)
            res.json({"error":err});
        else
            res.json({response:"OK"});
    })

});

module.exports = router;
