var test = require('tape')
var API = require('./api')
var Client = require('./client')

var HOST = 'http://localhost:3333'
test('client api test',function(t){
  var client = null
  var user = {
    email:'testuser1@example.com',
    password:'testuserpassword',
  }
  t.test('signup',function(t){
    API.signup(HOST,user).then(function(result){
      t.ok(result)
      t.end()
    }).catch(function(err){
      //user probably exists
      t.ok(err)
      t.end()
    })
  })
  t.test('login',function(t){
    API.login(HOST,user).then(function(result){
      t.ok(result)
      user.token = result
      t.end()
    }).catch(t.end)
  })
  t.test('list',function(t){
    API.list(HOST).then(function(result){
      t.ok(result)
      t.ok(result.length)
      t.end()
    }).catch(t.end)
  })
  t.test('init client',function(t){
    client = Client(HOST,user.token)
    t.ok(client)
    t.end()
  })
  t.test('get my user',function(t){
    client.action('getMyUser').then(function(result){
      t.ok(result)
      t.end()
    }).catch(t.end)
  })
  t.test('logout',function(t){
    client.logout().then(function(result){
      t.end()
    }).catch(t.end)
  })
  t.test('login',function(t){
    client.login(user).then(function(token){
      t.ok(token)
      t.end()
    }).catch(t.end)
  })
  t.test('get my user',function(t){
    client.action('getMyUser').then(function(result){
      t.ok(result)
      t.end()
    }).catch(t.end)
  })
  t.test('help',function(t){
    client.help().then(function(result){
      t.ok(result.length)
      t.end()
    }).catch(t.end)
  })
  t.test('help/checkUsername',function(t){
    client.help('checkUsername').then(function(result){
      t.ok(result)
      t.end()
    }).catch(t.end)
  })
  // t.test('init client by username and password',function(t){
  //   Client().init({email:user.email,password:user.password}).then(function(result){
  //     console.log(client)
  //     t.ok(result)
  //     client = result
  //     t.end()
  //   }).catch(t.end)
  // })
  // t.test('init client by token',function(t){
  //   Client().init({token:user.token}).then(function(result){
  //     t.ok(result)
  //     client = result
  //     t.end()
  //   }).catch(t.end)
  // })
  // t.test('getMyUser',function(t){
  //   client.getMyUser().then(function(result){
  //     t.ok(result)
  //     t.ok(result.id)
  //     user.id = result.id
  //     t.end()
  //   }).catch(t.end)
  // })
})
