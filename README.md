#CSGO Direct Client API
Send commands through the command line, or include it in your node app to easily connect to CSGO Direct.
Requires a registered user account which you can get at (www.csgodirect.com)[www.csgodirect.com].

#Installing
`npm install -g csgodirect` to install system wide.

#Command Line Usage
If installed globally, use as a command line tool to query the CSGO Direct API server. 

##Help
Type csgodirect in your command line to access help documentation

```
  csgodirect
```

You can also list all available commands:

```
  csgodirect -h
```
##Login
If you have an API key already, you can skip login, otherwise login to retreive a new key.

```
  csgodirect login --email youremail@example.com --password yourpassword 

```
This returns to you a token object, store the string for future requests. 

`{ token: '8bc17f11-d594-4a06-89c2-03d42c75cd10' }`


##Commands (Actions)
CSGO Direct calls the api calls "actions", each action from the CLI follows the same pattern:

`csgodirect -t 8bc17f11-d594-4a06-89c2-03d42c75cd10 actionName --parameter parameter `

The `-t ` allows you to specify your login token. The action name is the action you want to execute followed by 
named parameters in the form `--param1 param1 --param2 param2`

#Module Usage
The underlying api calls use request-promise, so calls will return a promise. 

Include the library in your project:
```
  var Direct = require('csgodirect')

  var options = {
    token:'your login token',
    version:'direct api version, defaults to 'v1'
    email:'your email, if you dont have a token',
    password:'your password if you dont have a token',
  }

  var direct = Direct(options)


  //calling an action
  var parameters = {
    param1:param1
  }
  direct.action('someAction',params).then(function(result){
    console.log(result)
  })
```
