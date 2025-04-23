const bcrypt = require("bcryptjs");
const userModel = require("../server/User/UserModel");
// const hodModel=require(".../server/Hod/HodModel");

// Create Admin User
userModel.findOne({ email: "admin@gmail.com" })
    .then((userData) => {
        if (!userData) {
            let userObj = new userModel();
            userObj.name = "admin";
            userObj.email = "admin@gmail.com";
            userObj.password = bcrypt.hashSync("123", 10);
            userObj.userType = 1;

            userObj.save()
                .then(() => {
                    console.log("Admin created successfully");
                })
                .catch(() => {
                    console.log("Error while registering admin");
                });
        } else {
            console.log("Admin already exists");
        }
    })
    .catch(() => {
        console.log("Error while finding admin user");
    });

// Create Student User
userModel.findOne({ email: "" })
    .then((userData) => {
        if (!userData) {
            let userObj = new userModel();
            userObj.name = "student";
            userObj.email = "";
            userObj.password = bcrypt.hashSync("", 10);
            userObj.userType = 3;

            userObj.save()
                .then(() => {
                    console.log("Student created successfully");
                })
                .catch(() => {
                    console.log("Error while registering student");
                });
        } else {
            console.log("Student already exists");
        }
    })
    .catch(() => {
        console.log("Error while finding student user");
    });
//hod user
userModel.findOne({ email: "" })
    .then((userData) => {
        if (!userData) {
            let userObj = new userModel();
            userObj.name = "hod";
            userObj.email = "";
            userObj.password = bcrypt.hashSync("", 10);
            userObj.userType = 2;

            userObj.save()
                .then(() => {
                    console.log("hod created successfully");
                })
                .catch(() => {
                    console.log("Error while registering hod");
                });
        } else {
            console.log("hod already exists");
        }
    })
    .catch(() => {
        console.log("Error while finding hod user");
    });


    