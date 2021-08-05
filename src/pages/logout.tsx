import React,{ useEffect }  from 'react';
import {storeLogin} from 'components/redux/storeLogin';
import { useRouter } from 'next/router';
export default function Logout() {

   const router = useRouter();	
  	
	
	useEffect(() => {
		
	const Dologout = async () => {
	  console.log(233213132123);
	  await storeLogin.dispatch({ type: 'CHANGE_STATE', payload: { authLogin:"" } })
	 // console.log(storeLogin.getState());
	  router.push('/auth/signin');
	
		
  }
    Dologout();
  }, []);
  
  return (
    ""
  )
}
