var request = require('request-promise')
var assert = require('assert')
var Promise = require('bluebird')
var urljoin = require('url-join')

var defaultVersion =  'v1'
var defaultHost = 'https://api.csgodirect.com'

function actionURL(url,version,command){
  return [url,'actions',version,command].join('/')
}

function login(host,params){
  params = params || {}
  host = host || defaultHost
  var options = {
    method:'POST',
    uri:host + '/login',
    body:params,  
    json:true,
  }
  return request(options)
}

function logout(host,token){
  host = host || defaultHost
  var options = {
    method:'POST',
    uri:host + '/logout',
    headers:{
      Authorization: "Bearer " + token
    },
    json:true,
  }
  return request(options)
}

function signup(host,params){
  params = params || {}
  host = host || defaultHost
  var options = {
    method:'POST',
    uri:host + '/signup',
    body:params,  
    json:true,
  }
  return request(options)
}

function action(host,version,token,command,params){
  assert(token,'action requires valid token')
  assert(command,'action requires command name')
  version = version || defaultVersion
  host = host || defaultHost
  params = params || {}
  var url = actionURL(host,version,command)
  var options = {
    method:'POST',
    uri:url,
    body:params,  
    json:true,
    timeout:60000, //1 minute timeout on all requests
    headers:{
      Authorization: "Bearer " + token
    }
  }
  return request(options)
}

function help(host,version,command){
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

module.exports = {
  list:list,
  help:help,
  action:action,
  login:login,
  logout:logout,
  signup:signup,
  defaultVersion:defaultVersion,
  defaultHost:defaultHost,
  actionURL:actionURL
}


