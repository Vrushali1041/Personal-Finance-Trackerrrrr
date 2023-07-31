import React, { useEffect } from 'react';
import "./styles.css"
import { auth } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg";


function Header() {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }

  }, [user, loading])


  function logoutFuc() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged out successfully!");
          navigate("/")
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      {user && (
        <div style={{display: "flex", alignItem: "center", gap:
         "0.75rem" }}>

          <img src={user.photoURL ? user.photoURL : userImg} 
          style={{ height:"1.7rem", width: "1.5rem", borderRadius: "50%"}}
          />

          <p className='logo link' onClick={logoutFuc}>Logout</p>
        </div>
      )}

    </div>

  )
}

export default Header;




