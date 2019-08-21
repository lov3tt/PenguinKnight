var db = require("../models")

module.exports = function(app){
    app.get("/api/hiScore", function(req,res) {
        console.log("score")
        var query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id;
        }
        db.newScore.findAll({where:query, include:[db.user]}).then(function(dbnewScore){
            res.json(dbnewScore)
        })
    });

    app.post("/api/hiScore", function(req,res) {
        console.log(req.body);
        db.newScore.create(req.body).then(function(dbnewScore) {
            res.json(dbnewScore);
        })
    })
}