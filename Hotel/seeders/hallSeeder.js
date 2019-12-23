const mongoose = require("mongoose");
const fs = require("fs");

const Hall = require('./HallForSeeder.js');

function exit() {
    mongoose.disconnect();
    console.log("Db updated");
};
(async function() {
    await mongoose.connect(
        `mongodb://localhost:27017/Hotel`, {
            useNewUrlParser: true
        },
        function(err) {
            if (err) throw err;
            console.log("Successfully connected");
        }
    );
     (function() {
         fs.readFile("halls.json", "utf8", function(err, data) {
            if (err) {
                console.log(err);
            }
            let halls = JSON.parse(data);
            for (let i = 0; i < users.length; i++) {
                let hall = new User(JSON.parse(halls[i]));
                console.log(user);
                hall.save();
            }
        });
        
    }());
}());