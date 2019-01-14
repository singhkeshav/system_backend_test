const validator = require('validator');
const  _ = require('lodash');



module.exports ={
    /**
     * 
     * @param {*} fields 
     * @param {*} requireArray 
     */
    isRequire(fields,requireArray,cb){
        var requiredStr ='';
        var isInvalid = false;
        var indexObj =0;
        if(!_.isEmpty(requireArray) && _.isObject(fields)){
            _.each(requireArray,(validRow,indexNo)=>{
              if(!_.has(fields, validRow) || _.isNaN(fields[validRow]) || _.isUndefined(fields[validRow]) || fields[validRow]==''){
                isInvalid = true; 
                requiredStr+=validRow+",";
              }
              if(indexNo ==requireArray.length-1){
                  if(isInvalid){
                    var newStr = requiredStr.substr(0, requiredStr.length-1);
                    cb(false,newStr+ " is required.")   
                  } else{
                    cb(true,null)            
                  }
              }
              
             })
        } else {
            cb(true,null)    
        }
      
    },
    /**
     * @isValidMobile
     * @param {*} mobileNumber 
     */
    isValidMobile(mobileNumber ,isLang ='en-IN'){
        console.error(mobileNumber,'mobileNumber')
        if (!validator.isMobilePhone(mobileNumber, isLang)) {
            throw new Error("Invalid mobile number!");
        } else{
            return true;
        }
    },
    /**
     * 
     * @param {*} str 
     * @param {*} keyName 
     * @param {*} minLength 
     * @param {*} maxLength 
     */
    minLength(str,keyName , minLength = 4,maxLength=undefined){
        if (!validator.isLength(str, {min: minLength, max: maxLength})) {
            throw new Error(
            {
                status: 401,
                message:'Your '+keyName+" should be greater then " +minLength + " characters!"
            });
        } else{
            return true;
        }
    },

  /**
   * 
   * @param {*} email 
   */
    isEmail(email){
        if(!validator.isEmail(email)){
            throw new Error({
                status: 401,
                message:'Invalid email id!'
            });
        }  else{
            return true;
        }
    },



    
}
