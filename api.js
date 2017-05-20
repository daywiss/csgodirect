require('isomorphic-fetch');
var assert = require('assert')
var urljoin = require('url-join')

var defaultVersion =  'v1'
var defaultHost = 'https://api.csgodirect.com'

function actionURL(version,command){
  return urljoin('actions',version,command)
}

function call(host,action,params,token,method){
  var url = urljoin(host,action)
  // console.log('calling',url,params,'with token:',token,method)
  var options = {
    method:method || 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    timeout:60000,
    credentials:'include',
    mode:'cors'
  }
  if(token){
    options.headers.Authorization = "Bearer " + token
  }
  if(params && options.method == 'POST'){
    options.body = JSON.stringify(params) 
  }
  return fetch(url,options).then(function(res){
    return Promise.all([res.ok,res.text()])
  }).then(function(body){
    var result = null
    var ok = body[0]
    var text = body[1]
    try{
      result = JSON.parse(text)
    }catch(e){
      result = text
    }
    if(ok){
      return result
    }else{
      throw new Error(result)
    }
  })
}

function login(host,params){
  params = params || {}
  host = host || defaultHost
  return call(host,'login',params)
}

function logout(host,token){
  host = host || defaultHost
  return call(host,'logout',{},token)
}

function signup(host,params){
  params = params || {}
  host = host || defaultHost
  return call(host,'signup',params)
}

function action(host,version,token,command,params){
  assert(token,'action requires valid token')
  assert(command,'action requires command name')
  version = version || defaultVersion
  host = host || defaultHost
  params = params || {}
  var url = actionURL(version,command)
  return call(host,url,params,token)
}

function help(host,version,command){
  version = version || defaultVersion
  host = host || defaultHost
  var url = actionURL(version,command)
  return call(host,url,{},null,'GET')
}

function list(host,version){
  version = version || defaultVersion
  host = host || defaultHost
  var url = actionURL(version)
  return call(host,url,{},null,'GET')

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


