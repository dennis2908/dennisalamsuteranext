import { createStore } from 'redux'

const ls = require('local-storage');

if(!ls.get('nextJS')){
	console.log(3131132)
	let arry = {};
	arry['authLogin'] = ""
	arry['authUserName'] = ""
	arry['authName'] = ""
	arry['authRoleName'] = ""
	arry['authRoleAssign'] = []
	ls.set('nextJS', arry)
}

const ThenextJS = ls.get('nextJS')
	
	
const initialState = {
  authLogin : ThenextJS['authLogin'],
  authUserName : ThenextJS['authUserName'],
  authName : ThenextJS['authUserName'],
  authRoleName : ThenextJS['authRoleName'],
  authUserName : ThenextJS['authUserName'],
  authRoleAssign : ThenextJS['authRoleAssign']
}

const reducer = (state = initialState, action) => {
	if(action.type==="CHANGE_STATE"){
		let nextJS = ThenextJS
		if(action.payload.authLogin){
			nextJS['authLogin'] = action.payload.authLogin
			ls.set('nextJS', nextJS);
			state.authLogin = action.payload.authLogin;
		}
		else if(action.payload.authLogin===""){
			nextJS['authLogin'] = ""
			ls.set('nextJS', nextJS);
			state.authLogin = ""
		}
		
		if(action.payload.authUserName){
			nextJS['authUserName'] = action.payload.authUserName
			ls.set('nextJS', nextJS);
			state.authUserName = action.payload.authUserName;
		}
		else if(action.payload.authUserName===""){
			nextJS['authUserName'] = ""
			ls.set('nextJS', nextJS);
			state.authUserName = ""
		}
		
		if(action.payload.authName){
			nextJS['authName'] = action.payload.authName
			ls.set('nextJS', nextJS);
			state.authName = action.payload.authName;
		}
		else if(action.payload.authName===""){
			nextJS['authName'] = ""
			ls.set('nextJS', nextJS);
			state.authName = ""
		}

		if(action.payload.authRoleAssign){
			let authRoleAssign = action.payload.authRoleAssign.split(',')
			nextJS['authRoleAssign'] = authRoleAssign
			ls.set('nextJS', nextJS);
			state.authRoleAssign = authRoleAssign
		}
		else if(action.payload.authRoleAssign===""){
			nextJS['authRoleAssign'] = []
			ls.set('nextJS', nextJS);
			state.authRoleAssign = ""
		}

		if(action.payload.authRoleName){
			nextJS['authRoleName'] = action.payload.authRoleName
			ls.set('nextJS', nextJS);
			state.authRoleName = action.payload.authRoleName
		}
		else if(action.payload.authRoleName===""){
			nextJS['authRoleName'] = ""
			ls.set('nextJS', nextJS);
			state.authRoleName = ""
		}	
	}
	
    return state
}

const storeLogin = createStore(reducer)


export  {storeLogin}