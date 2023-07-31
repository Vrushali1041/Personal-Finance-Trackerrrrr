import React from 'react';
import Header from "../Components/Header"
import SingupSignin from '../Components/SignupSignin';

const Signup = () => {

  return (
    <div>
      <Header />
      <div className='wrapper' style={{display: "flex", justifyContent: "center",
       alignItems: "center", width: "100vw", height: "90vh"}}>
        <SingupSignin />
      </div>

    </div>
  )
}

export default Signup;
