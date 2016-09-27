var request = require('request-promise')
var assert = require('assert')
var Promise = require('bluebird')

var defaultVersion =  'v1'
var defaultHost = 'http://localhost:3333'
function authURL(url,command){
  return [url,command].join('/')
}
function actionURL(url,version,command){
  return [url,'actions',version,command].join('/')
}

function run(isAction,command,params,token,host,version){
  // console.log(arguments)
  version = version || defaultVersion
  host = host || defaultHost
  var url = isAction ? actionURL(host,version,command) : authURL(host,command)
  if(isAction){
    assert(token,'login or place API token in .TOKEN file')
  }

  var options = {
    method:'POST',
    uri:url,
    body:params,  
    json:true,
    headers:{
      Authorization: "Bearer " + token
    }
  }
  return request(options)
}

function help(command,host,version){
  version = version || defaultVersion
  host = host || defaultHost
  var url = actionURL(host,version,command)
  // console.log(url)

  var options = {
    method:'GET',
    uri:url,
    json:true
  }
  return request(options)
}

function list(host,version){
  version = version || defaultVersion
  host = host || defaultHost
  var options = {
    method:'GET',
    uri:[host,'actions',version].join('/'),
    json:true
  }
  return request(options)

}

function client(options){
  var version = options.version || defaultVersion
  var host = options.host || defaultHost
  var token = options.token || null
  var email = options.email || null
  var password = options.password || null

  var init = null
  if(token == null){
    assert(email,'Requires email or token')
    assert(password,'Requires password or token')
    init = run(false,'login',{email:email,password:password},null,host,version)
  }else{
    init = Promise.resolve({token:token})
  }

  return init.then(function(result){
    token = result.token
    return list(host,version).then(function(result){
      return result.reduce(function(result,action){
        result[action] = function(params){
          return run(true,action,params,token,host,version)
        }
        return result
      },{})
    })
  })
}

module.exports = {
  action:run.bind(null,true),
  auth:run.bind(null,false),
  help:help,
  list:list,
  client:client
}


