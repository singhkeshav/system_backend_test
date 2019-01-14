
var bcrypt = require('bcryptjs');
var User = require('../test_model/Users');
var config = require('../config/index');
var validation = require("../core/helper");
var http_handler = require("../core/http.handler");
const jwt = require('jsonwebtoken');
var md5 = require('md5');
//Simple version, without validation or sanitation
exports.login = function (req, res) {

  let requireObj =['email','password','user_type'];
  validation.isRequire(req.body,requireObj,(status,validation)=>{
    if(status){
      email(req.body.email,function(error,result){
        if(error){
          res.json(http_handler.serverError("Invalid ?",error))
        } else{
          if(result.length>0){
            var hashedPassword =md5(req.body.password);

            console.error(hashedPassword)
            if(hashedPassword == result[0]['password']){
                  // create a token
                  var token = jwt.sign({ id: result[0]._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var obj =  result[0].toObject();
                obj['access_token'] = "Bearer "+token;
                obj['login_type'] = req.body.user_type;
                delete obj.password;
                delete obj.__v;
                res.json(http_handler.response([obj],'user login successfully.'));
            } else {
              res.json(http_handler.notFound([],'password is invalid..'));
            }
          } else {
            res.json(http_handler.notFound([],'Email id not exists,please try to another one.'));
          }
        }
        
      });
    } else{
      res.json(http_handler.serverError("Invalid ?",validation))
    }
  });
};




//Simple version, without validation or sanitation 004dde3f831b96b24615edbc3f4d0f10
exports.signup = function (req, res) {
  let requireObj =['email','password','user_type'];
  validation.isRequire(req.body,requireObj,(status,result)=>{
    if(status){
      // If Check User Already Exits...
      isEmailExists(req.body.email,function(isExists){
         // If Not Exists User then Create New ser 
         if(!isExists){
           // If Mobile No is Already Exists then ...
           isMobileExists(req.body.email,function(isMobileExists){
             if(!isMobileExists){
              var hashedPassword =md5(req.body.password);
              User.create({
                  user_name : req.body.user_name,
                  email : req.body.email,
                  password : hashedPassword,
                  user_type:req.body.user_type,
                  mobile_no: req.body.mobile_no
                },
                function (err, user) {
                  if (err) {
                    console.error(err);
                    res.json(http_handler.serverError("Internel server error ?","There was a problem registering the user"));
                } else{
                    // create a token
                    var token = jwt.sign({ id: user._id }, config.secret, {
                       expiresIn: 86400 // expires in 24 hours
                    });
                    var obj = user.toObject();
                    obj['access_token'] = "Bearer "+token;
                    delete obj.password;
                    delete obj.__v;
                    res.json(http_handler.response([obj],'user created successfully.'));
                  }   
                }); 
             } else{
              res.json(http_handler.exists([],'User mobile no is already exists.'));
             }

           });
          
         } else{
          res.json(http_handler.exists([],'User email is already exists.'));
         }
      });
     
    } else{
      res.json(http_handler.serverError("Invalid ?",result))
    }  
  })  
 
};


/**
 * 
 * @param {*} key_name 
 * @param {*} key_value 
 * @param {*} cb 
 */
function isEmailExists(key_value,cb){
  User.find({'email':key_value },function(error,result){
    if(error){
      cb(true);
    } else{
      if(result.length>0){
        cb(true);
      } else{
        cb(false);
      }
    }
   
  });
}


/**
 * 
 * @param {*} key_name 
 * @param {*} key_value 
 * @param {*} cb 
 */
function email(key_value,cb){
  User.find({'email':key_value },function(error,result){
    if(error){
      cb(error,null);
    } else{
      if(result.length>0){
        cb(null,result);
      } else{
        cb(null,[]);
      }
    }
   
  });
}



/**
 * 
 * @param {*} key_name 
 * @param {*} key_value 
 * @param {*} cb 
 */
function isMobileExists(key_value,cb){
  User.find({'mobile_no':key_value },function(error,result){
    if(error){
      cb(true);
    } else{
      if(result.length>0){
        cb(true);
      } else{
        cb(false);
      }
    }
   
  });
}


/**
 * 
 * @param {*} message 
 */

function md5(message){
  return md5(message)
}


