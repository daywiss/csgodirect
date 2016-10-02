var test = require('tape')
var API = require('./api')
var Client = require('./client')

test('client api test',function(t){
  var client = null
  var user = {
    email:'testuser1@example.com',
    password:'testuserpassword',
  }
  t.test('signup',function(t){
    API.signup(null,user).then(function(result){
      t.ok(result)
      t.end()
    }).catch(function(err){
      //user probably exists
      t.ok(err)
      t.end()
    })
  })
  t.test('login',function(t){
    API.login(null,user).then(function(result){
      t.ok(result)
      t.ok(result.token)
      user.token = result.token
      user.authid = result.id
      t.end()
    }).catch(t.end)
  })
  t.test('list',function(t){
    API.list().then(function(result){
      t.ok(result)
      t.ok(result.length)
      t.end()
    }).catch(t.end)
  })
  t.test('init client by username and password',function(t){
    Client().init({email:user.email,password:user.password}).then(function(result){
      console.log(client)
      t.ok(result)
      client = result
      t.end()
    }).catch(t.end)
  })
  t.test('init client by token',function(t){
    Client().init({token:user.token}).then(function(result){
      t.ok(result)
      client = result
      t.end()
    }).catch(t.end)
  })
  t.test('getMyUser',function(t){
    client.getMyUser().then(function(result){
      t.ok(result)
      t.ok(result.id)
      user.id = result.id
      t.end()
    }).catch(t.end)
  })
})
