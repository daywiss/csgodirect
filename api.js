var request = require('request-promise')
var assert = require('assert')

var defaultVersion =  'v1'
var defaultHost = 'http://localhost:3333'
function authURL(url,command){
  return [url,command].join('/')
}
function actionURL(url,version,command){
  return [url,'actions',version,command].join('/')
}

function run(isAction,command,params,token,host,version){
  version = version || defaultVersion
  host = host || defaultHost
  var url = isAction ? actionURL(host,version) : authURL(host,command)
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
  console.log(url)

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

module.exports = {
  action:run.bind(null,true),
  auth:run.bind(null,false),
  help:help,
  list:list
}


