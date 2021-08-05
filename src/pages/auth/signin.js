import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

//import { useHistory } from 'react-router-dom'

import {storeLogin} from 'components/redux/storeLogin';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';

import { useRouter } from 'next/router';

export default function Signin() {


  
  //const history = useHistory()
	  

  const SubmitForm = async(e) => {
	  e.preventDefault();	
	  let authLogin = storeLogin.getState().authLogin
	  let formData = {};
		formData.username = e.target.username.value
    formData.password = e.target.password.value
    console.log(formData)
	
	const router = useRouter();	  
    await fetch("https://dennisalamsutera.herokuapp.com/api/user/login", {
						  method: "POST",
						  headers: {
							  'Accept': 'application/json',
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Headers':'*'
							},
							body: JSON.stringify(formData)
								}).then(res => res.json())
							  .then(
                  (result) => {
                    if(result.result){
						localStorage.removeItem("nextJS");
						 
						 if(!authLogin)
                           storeLogin.dispatch({ type: 'CHANGE_STATE', payload: { authLogin:result.token,authUserName:e.target.username.value,authName:result.result.name,authRoleName:result.result.role_name,authRoleAssign:result.result.role_assign } })
                       //localStorage.setItem('username', username);
                      
                    }	
                    
                  
                });
			
			router.push("../")			
	
	   e.preventDefault();	
	 
  }
  
  return (
    <Layout title="Signin">
      <Auth title="Signin" subTitle="Hello! Signin with your credential">
        <form  
		onSubmit={(e) => {
                      SubmitForm(e);
				}}>
          <InputGroup fullWidth>
            <input type="text" placeholder="Enter Username" name="username" required/>
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Enter Password" name="password" required/>
          </InputGroup>
          <Group>
          </Group>
          <Button status="Success" type="submit" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
