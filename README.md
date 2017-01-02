#CSGO Direct Client API
Send commands through the command line, or include it in your node app to easily connect to CSGO Direct.
Requires a registered user account which you can get at [www.csgodirect.com](www.csgodirect.com).

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
  csgodirect login --login youremail@example.com --password yourpassword 

```
This returns to you a token string, store it for future requests. 

`8bc17f11-d594-4a06-89c2-03d42c75cd10`

##Logout
Logout invalidates your token.

```
  csgodirect logout -t 8bc17f11-d594-4a06-89c2-03d42c75cd10

```
Returns true

##Commands (Actions)
CSGO Direct calls the api calls "actions", each action from the CLI follows the same pattern:

`csgodirect -t 8bc17f11-d594-4a06-89c2-03d42c75cd10 actionName --parameter parameter `

The `-t ` allows you to specify your login token. The action name is the action you want to execute followed by 
named parameters in the form `--param1 param1 --param2 param2`

#Module Usage
The underlying api calls use request-promise, so calls will return a promise. 

Include the library in your project:
```js
  var Direct = require('csgodirect')

  //default options
  //optionally set the csgodirect host url
  var csgoDirectHost = 'https://api.csgodirect.com'
  //optionally set your user token, or use login to set it
  var token = null
  //optionally set api version number
  var version = 'v1'

  var direct = Direct(csgoDirectHost,token,version)


  //login to your user, get a token
  direct.login({ login:'myusername',password:'mypassword' }).then(function(token){
    //the client will store your token internally on successful login
    //but you can also store it yourself
  })

  //calling an action
  var parameters = {
    param1:param1
  }

  //token is optional after you've logged in because the client will store it
  direct.action('someAction',params,optionalToken).then(function(result){
    console.log(result)
  })
```

#Module API
##Construction
Initialize a client instance
```js
  var Direct = require('csgodirect')
  direct = Direct(host,token,version)
```
###Parameters
- host(optional)(default: https://api.csgodirect.com) - specify host url if you are not using the default url
- token(optional)(default: null) - store your user api token for future commands
- version(optional)(default: 'v1') - specify version of actions to use.

###Returns
A csgodirect client object used to interact with the API

##Login
Get your token, cache it in the client for future commands
```js
  direct.login({
    login:'your login name',
    password:'your password',
  }).then(function(token){
    //returns a token string
  })
```
###Parameters
- login(required) - your csgodirect login
- password(required) - your password

###Returns
A promise which returns a string representing your user token. 

##Signup
Create a new user.

```js
  direct.signup({
    login:'your login name',
    password:'your password',
  }).then(function(user){
    //returns the new user
  })
```
###Parameters
- login(required) - your csgodirect login
- password(required) - your password

###Returns
A promise which returns a user object

##Logout
Logout and invalidate your token. Also clears your token cache. 

```js
  direct.logout().then(function(){
    //returns on successful logout
  })
```
###Returns
A promise which resolves on successful logout

##Actions
This is a majority of your interactions with CSGO Direct. Use this function to 
call all actions. All actions are defined in camel case and take in a parameter
object.

```js
  direct.action('actionName',{parameter1:'parameter1'},'optionalToken').then(function(result){
    //returns action result
  }).catch(function(err){
    //or error if something went wrong
  })
```
###Parameters
- actionName(required) - Name of action you are calling
- params(sometimes optional) - Not all actions require parameters, but you specify them as a single object with parameters named as key value pairs
- token(optional) - Optionally use a token on this call, will override the cached token, or use cachhed token if not defined 

###Returns
A promise with the result of the action. See documentation on action specifics.

##Help
Return a list of actions, or get JSON documentation on a specific action

```js
  direct.help().then(function(actions){
    //returns list of possible actions
  })

  direct.help('getMyUser').then(function(doc){
    //returns json object representing documentation on that action
  })
```

###Parameters
- action(optional)(default: null) - Specify action to get more detailed documentation on usage

###Returns
A promise which resolves a list of actions, or an object with documentation on specific action.


##Set Token
Manually set a token to use for all future calls to the client

```js
  //just echoes back the token, but stores it in memory for future calls
  var token = direct.setToken('my token string')
```

###Parameters
- token(optional)(default: null) - The token to save for future calls. NULL will clear the token.

###Returns
Returns whatever you pass into it. 

