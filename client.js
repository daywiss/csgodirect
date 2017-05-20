var api = require('./api')
var urljoin = require('url-join')
var assert = require('assert')


module.exports = function(url,token,version){
  var url = url || 'https://api.csgodirect.com'
  version = version || 'v1'

  var methods = {}
  methods.setToken = function(tokenid){
    token = tokenid
    return token
  }

  methods.login = function(params){
    return api.login(url,params).then(function(result){
      return methods.setToken(result)
    })
  }

  methods.logout = function(){
    return api.logout(url,token).then(function(result){
      methods.setToken()
      return result
    })
  }

  methods.signup = api.signup

  methods.action = function(action,params,tokenid){
    return api.action(url,version,tokenid || token,action,params)
  }

  methods.help = function(command){
    return api.help(url,version,command)
  }
  
  methods.buildActionURL= function(action){
    return api.actionURL(url,version,action) 
  }
  return methods
}

