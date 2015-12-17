/**
 * Created by svenc on 03/11/15.
 */
/**
 * Created by svenc on 03/07/15.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://davinci.cs.kuleuven.be:27017/p3no2015');


var db_connection = mongoose.connection;
db_connection.on('error', console.error.bind(console, 'connection error:'));
db_connection.once('open', function callback () {

    console.log("Connected to the database");
    //exports.countText([], {}, function(err, data){console.log("result is" + JSON.stringify(data) + err)});



});


var Schema = mongoose.Schema;

var penoSchema = new Schema({
    groupid: String,
    sessionid: String,
    data: Object,
    insertedate: Date,
},{collection:"data"});



var P3no = mongoose.model('P3no',penoSchema);


exports.P3no = P3no;


/***************** QUERY METHODS *********************/

//QUERY ALL DATA
exports.queryAll = function(cb) {

   P3no.find({},cb);
};

//QUERY ALL DATA OF GROUP
exports.queryByGroupId = function(groupid, cb)
{
    P3no.find({"groupid":groupid},cb);
};

//QUERY ALL DATA OF GROUP AND SESSION
exports.queryByGroupIdAndSessionId = function(groupid, sessionid, cb)
{
    P3no.find({"groupid":groupid, "sessionid":sessionid},cb);
};

//QUERY ALL DATA OF GROUP AND SESSION AND DATA: e.g. {"test":"1234"} pushed as data means
//field = test and value = 1234 to search for this specific entry
exports.queryByGroupIdAndSessionIdAndData = function(groupid, sessionid, field, value, cb)
{
    var query = {"groupid":groupid, "sessionid":sessionid};
    query["data." + field] = value;
        P3no.find(query,cb);
};

//PUSHES A NEW ENTRY TO THE DATABASE
exports.putData = function(groupid,sessionid,data,cb)
{
    var toPut = new P3no();
    toPut.groupid = groupid;
    toPut.sessionid = sessionid;
    toPut.data = data;
    toPut.save(cb);
}

//exports.putData("g2", "2", {test:"testi,le", id:"4321"}, function(err){console.log(err)});
//exports.queryByGroupIdAndSessionIdAndData("g2", "2" , "id", "4321", function(err,data){console.log(err, data);})

