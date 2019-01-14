/**
 * 
 * @param {*} response 
 * @param {*} message 
 * @requires for the reposne method is set custom response
 */
let response =(response =[],message='')=>{
    let resObj ={
        status : 200,
        success: true,
        metadata:{version:'v1',api_url:''},
        message: message,
        response:response,
        error: []
    }
    return resObj;
}


/**
 * 
 * @param {*} response 
 * @param {*} message 
 * @requires for the reposne method is set custom response
 */
let exists =(response =[],message='')=>{
    let resObj ={
        status : 308,
        success: true,
        metadata:{version:'v1',api_url:''},
        message: message,
        response:response,
        error: []
    }
    return resObj;
}
/**
 * 404
 * @param {*} error 
 * @param {*} message 
 * @requires for the reposne method is not found
 */
let notFound =(error =[],message='')=>{
    let resObj ={
        status : 404,
        success: false,
        metadata:{version:'v1',api_url:''},
        message: message,
        response:[],
        error: error
    }
    return resObj;
}
/**
 * 500
 * @param {*} error 
 * @param {*} message 
 * @requires for the reposne method is not found
 */
let serverError =(error =[],message='')=>{
    let resObj ={
        status : 500,
        success: false,
        metadata:{version:'v1',api_url:''},
        message: message,
        response:[],
        error: error
    }
    return resObj;
}



module.exports = {notFound,response,serverError,exists};