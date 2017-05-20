var assert = require('assert')
var argv = require('minimist')(process.argv.slice(2));
var api = require('./api')
var fs = require('fs')
var token = null


if(argv.h == null && argv._.length == 0){
  console.log('-h command -- help on actions or list all actions')
  console.log('-u hosturl -- set host url, default localhost:3333')
  console.log('-v version -- set actions version, default v1')
  console.log('-t authtoken -- set your user token (provided after login)')
  return
}

var command = null
var params = argv
var remove = ['h','u','v','t','_']
try{
  //clone args
  params = JSON.parse(JSON.stringify(argv))
  //remove extra data from params
  remove.forEach(function(prop){
    delete params[prop]
  })
}catch(e){ console.log('error parsing params:', e) }


if(argv.h){
  command = argv._[0] || argv.h 
  if(command === true){
    console.log('listing available actions:')
    api.list(argv.u,argv.v).then(function(result){
      result.forEach(function(action){
        console.log(action)
      })
    }).catch(function(e){
      console.log(e.toString())
    })        
  }else{
    api.help(argv.u,argv.v,command).then(function(result){
      console.log(result)
    }).catch(function(e){
      console.log(e.toString())
    }) 
  }
  return 
}

command = argv._[0]
if(argv._.length > 1){
 console.log('Too many remote commands, just provide 1. Parameters should be supplied with --paramName.')
 return
}

if(command == 'signup'){
  api.signup(argv.u, params).then(function(result){
    console.log(result)
  }).catch(function(e){
    console.log(e.toString())
  })
  return
}

if(command == 'login'){
  api.login(argv.u,params).then(function(result){
    console.log(result)
  }).catch(function(e){
    console.log(e.toString())
  }) 
  return
}

if(command == 'logout'){
  api.logout(argv.u,argv.t).then(function(result){
    console.log(result)
  }).catch(function(e){
    console.log(e.toString())
  }) 
  return
}

if(argv.t == null){
  console.log('Must provide auth token with -t my-auth-token. Get one by using the signup and login commands')
  return
}


// try{
//   token = fs.readFileSync('./.TOKEN')
// }catch(e){
//   console.log('No .TOKEN file found use signup and login commands to create a new user and login')
// }

api.action(argv.u,argv.v,argv.t,command,params).then(function(result){
  console.log(result)
}).catch(function(e){
  console.log(e.toString())
}) 
