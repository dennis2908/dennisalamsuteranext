import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React,{ useEffect } from 'react';

//import { useHistory } from 'react-router-dom'

import {storeLogin} from 'components/redux/storeLogin';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';

import { useRouter } from 'next/router';

export default function Signin() {

  const router = useRouter();	 
  
  //const history = useHistory()
  useEffect(async() => {
      await localStorage.removeItem("nextJS");
      await storeLogin.dispatch({ type: 'CHANGE_STATE', payload: { authLogin:"",authUserName:"",authName:"",authRoleName:"",authRoleAssign:"" } })
    }, []);

  const SubmitForm = async(e) => {
	  e.preventDefault();	
	  let authLogin = storeLogin.getState().authLogin
	  let formData = {};
		formData.username = e.target.username.value
    formData.password = e.target.password.value
    console.log(formData)
	
	 
    await fetch("http://127.0.0.1:8441/api/user/login", {
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
						            storeLogin.dispatch({ type: 'CHANGE_STATE', payload: { authLogin:result.token,authUserName:e.target.username.value,authName:result.result.name,authRoleName:result.result.role_name,authRoleAssign:result.result.role_assign } })
                       location.href="/dashboard"	
                      
                    }	
                  
                });
			
				
	
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
