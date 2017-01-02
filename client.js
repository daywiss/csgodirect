var api = require('./api')
var Promise = require('bluebird')
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

  methods.action = Promise.method(function(action,params,tokenid){
    return api.action(url,version,tokenid || token,action,params)
  })

  methods.help = Promise.method(function(command){
    return api.help(url,version,command)
  })
  
  methods.buildActionURL= function(action){
    return api.actionURL(url,version,action) 
  }
  return methods
}

// module.exports = function(options){
//   options = options || {}
//   var version = options.version || api.defaultVersion
//   var host = options.host || api.defaultHost
//   var token = options.token || null
//   var email = options.email || null
//   var password = options.password || null

//   var methods = {}
//   methods.login = api.login.bind(null,host)
//   methods.signup = api.signup.bind(null,host)
//   methods.action = api.action.bind(null,host,version,token)
//   methods.list = api.list.bind(null,host,version,token)
//   methods.help = api.help.bind(null,host,version,token)
//   methods.user = null

//   function init(params){
//     var promise = null

//     if(params.token == null) {
//       promise = methods.login(params).then(function(result){
//         methods.user = result
//         return result.token
//       })
//     }else{
//       promise = Promise.resolve(params.token)
//     }

//     return promise.then(function(tok){
//       token = tok
//       return methods.list().then(function(result){
//         return result.reduce(function(result,action){
//           result[action] = api.action.bind(null,host,version,token,action)
//           return result
//         },methods)
//       })
//     })
//   }

//   methods.init = init

//   return methods
// }
