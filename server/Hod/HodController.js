const hodModel = require("./HodModel");
const userModel = require("../User/UserModel");
const bcrypt = require("bcryptjs");

// Add HOD
 addHod = async (req, res) => {
  let validation = [];
  if (!req.body.name) {
    validation.push("Name is required!");
  }
  if (!req.body.email) {
    validation.push("Email is required!");
  }
  if (!req.body.password){ 
    validation.push("Password is required!");
  }
  if (!req.body.departmentId){ 
    validation.push("Department ID is required!");
  }
  if (!req.body.image) {
    validation.push("Image is required!");

  }

  if (validation.length > 0) {
    return res.status(422).json({
      success: false,
      status: 422,
      message: validation,
    });
  } else {
    userModel
      .findOne({ email: req.body.email })
      .then((userData) => {
        if (!userData) {
          let userObj = new userModel();
          userObj.name = req.body.name;
          userObj.email = req.body.email;
          userObj.password = bcrypt.hashSync(req.body.password, 10);
          userObj.userType = 2;

          userObj
            .save()
            .then((newUser) => {
              let hodObj = new hodModel();
              hodObj.departmentId = req.body.departmentId;
              hodObj.image =req.body.image
              hodObj.userId = newUser._id;

              hodObj
                .save()
                .then((hodData) => {
                  res.json({
                    status: 200,
                    success: true,
                    message: "HOD added successfully",
                    userData: newUser,
                    hodData: hodData,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Failed to save HOD",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                success: false,
                message: "Failed to save user",
                error: err,
              });
            });
        } else {
          res.status(200).json({
            success: false,
            status: 200,
            message: "HOD already exists!",
            data: userData,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          success: false,
          message: "Internal server error!",
          error: err,
        });
      });
  }
};

// Get All HODs
 allHod = async(req, res) => {
  let limit=req.body.limit
  let currentPage=req.body.currentPage-1
  delete req.body.limit
  delete req.body.cuurentPage
  let total=await hodModel.countDocuments().exec()

  hodModel
    .find()
    .populate("userId")
    .sort({createdAt:-1})
    .limit(limit)
    .skip(currentPage * limit)
    .populate("departmentId")
    .then((hodData) => {
      if (hodData.length > 0) {
        res.json({
          success: true,
          status: 200,
          message: "HODs loaded successfully",
          data: hodData,
          total:total
        });

      } else {
        res.json({
          success: false,
          status: 200,
          message: "No data found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Internal server error",
        error: err,
      });
    });
};
//pagination

// Get Single HOD
 getSingleHod = (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json({
      status: 422,
      success: false,
      message: "User ID is required",
    });
  }
  hodModel
    .findOne({ userId: req.body.userId })
    .populate("userId")
    .populate("departmentId")
    .then((hodData) => {
      if (!hodData) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "HOD not found",
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "HOD found",
          data: hodData,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    });
};

// Update HOD
 updateHod = (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json({
      status: 422,
      success: false,
      message: "User ID is required",
    });
  }

  hodModel
    .findOne({ userId: req.body.userId })
    
    .then((hodData) => {
      if (!hodData) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "HOD does not exist",
        });
      }

      if (!!req.body.departmentId)
         hodData.departmentId = req.body.departmentId;
      if (!!req.file)
         hodData.image = "hodImage/" + req.file.filename;

      hodData
        .save()
        .then(() => {
          userModel
            .findOne(hodData.userId)
            .then((userData) => {
              if (!!req.body.name) 
                userData.name = req.body.name;

              userData.save()
                .then(() => {
                  res.json({
                    status: 200,
                    success: true,
                    message: "HOD updated successfully",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Failed to update user data",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                success: false,
                message: "User data not found",
                error: err,
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update HOD data",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    });
};

// Change Status of HOD
 changeStatusHod = (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json({
      status: 422,
      success: false,
      message: "User ID is required",
    });
  }

  hodModel
    .findOne({ userId: req.body.userId })
    .then((hodData) => {
      if (!hodData) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "HOD not found",
        });
      }

      if (req.body.status) hodData.status = req.body.status;

      hodData
        .save()
        .then((updatedHod) => {
          res.json({
            success: true,
            status: 200,
            message: "HOD status updated successfully",
            data: updatedHod,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update status",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    });
};

module.exports = { addHod, allHod, getSingleHod, updateHod, changeStatusHod};
