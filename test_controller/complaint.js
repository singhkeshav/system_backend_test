
var bcrypt = require('bcryptjs');
var User = require('../test_model/Users');
var config = require('../config/index');
var validation = require("../core/helper");
var http_handler = require("../core/http.handler");
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const  _ = require('lodash');
let response = [];
var complaintModel = require("../test_model/complaint");
//Simple version, without validation or sanitation
/**
 * 
 */
exports.complaintList = function (req, res) {
 let whereBody ={};
 if(req.body.user_type =='user' || req.body.user_type =='both'){
     whereBody = {
         "user_id" : req.body.user_id 
     }  
  }
  console.error(whereBody,'whereBody')
  complaintModel.find(whereBody,function(error,result){
   if(error){
    res.json(http_handler.serverError("Internel server error ?","There was a problem geting the complaint"));
   } else{
 // iomaplinet
    recursionObj(result,result.length,req,res)
   }
  })
 
};


function recursionObj(result,length,req,res){
  if (length <= 0) {
    let customObj = response;
    response =[]
    res.json(http_handler.response(customObj,'complaint list'));
 }else{
  User.findOne({_id:result[length-1]['user_id']},(error,userResponse)=>{
    let customResponse ={
        id: result[length-1]['_id'],
        heading : result[length-1]['heading'],
        description : result[length-1]['description'],
        status : result[length-1]['status'],
        createAt: result[length-1]['createdAt'],
        updateAt: result[length-1]['updatedAt'],
        email: userResponse['email'],
        mobile_no : userResponse['mobile_no']
    };
   response.push(customResponse);
   
   return length * recursionObj(result,length-1,req,res);
 });
 }



}
/**
 * 
 */
exports.create_complaint = function (req, res) {
    let requireObj =['heading','user_id'];
    validation.isRequire(req.body,requireObj,(status,validation)=>{
      if(status){
        // If Check User Already Exits...
        complaintModel.create({
            user_id : req.body.user_id,
            heading : req.body.heading,
            description : req.body.description,
            status: false
          },
          function (err, complaint) {
            if (err) {
              console.error(err);
              res.json(http_handler.serverError("Internel server error ?","There was a problem registering the complaint"));
          } else{
            res.json(http_handler.response([complaint],'complaint added successfully.'));
          }
        })
       
      } else{
        res.json(http_handler.serverError("Invalid ?",validation))
      }  
    })  
  }
 
    /**
 * 
 */
exports.update_status = function (req, res) {
  let requireObj =['active_status','complaint_id'];
  validation.isRequire(req.body,requireObj,(status,validation)=>{
    if(status){
      // If Check User Already Exits...
      
        // If Check User Already Exits...
      var update = {$set: {updatedAt : new Date(),status:req.body.active_status }};
      var options ={ multi : true };
      complaintModel.update({
        "_id": req.body.complaint_id
      }, update, options, function(err, data) {
        if (err) {
          console.error(err);
          res.json(http_handler.serverError("Internel server error ?","There was a problem registering the complaint"));
      } else{
        res.json(http_handler.response([],'complaint added successfully.'));
      }
        
      });
     
    } else{
      res.json(http_handler.serverError("Invalid ?",validation))
    }  
  })  
  };
  






