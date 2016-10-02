var api = require('./api')
var Promise = require('bluebird')

module.exports = function(options){
  options = options || {}
  var version = options.version || api.defaultVersion
  var host = options.host || api.defaultHost
  var token = options.token || null
  var email = options.email || null
  var password = options.password || null

  var methods = {}
  methods.login = api.login.bind(null,host)
  methods.signup = api.signup.bind(null,host)
  methods.action = api.action.bind(null,host,version,token)
  methods.list = api.list.bind(null,host,version,token)
  methods.help = api.help.bind(null,host,version,token)

  function init(params){
    var promise = null

    if(params.token == null) {
      promise = methods.login(params).then(function(result){
        return result.token
      })
    }else{
      promise = Promise.resolve(params.token)
    }

    return promise.then(function(tok){
      token = tok
      return methods.list().then(function(result){
        return result.reduce(function(result,action){
          result[action] = api.action.bind(null,host,version,token,action)
          return result
        },methods)
      })
    })
  }

  methods.init = init

  return methods
}
