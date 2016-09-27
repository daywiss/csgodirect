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
    api.help(command,argv.u,argv.v).then(function(result){
      console.log(result)
    }).catch(function(e){
      console.log(e.toString())
    }) 
  }
  return 
}

command = argv._[0]
if(argv._.length > 1){
 console.log('Too many remote commands, just provide 1')
 return
}
if(command == 'signup'){
  api.auth(command,argv,null,argv.u,argv.v).then(function(result){
    console.log(result)
  }).catch(function(e){
    console.log(e.toString())
  })
  return
}

if(command == 'login'){
  console.log(command)
  api.auth(command,argv,null,argv.u,argv.v).then(function(result){
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

api.action(process.env,command,argv,argv.t).then(function(result){
  console.log(result)
}).catch(function(e){
  console.log(e.toString())
}) 
