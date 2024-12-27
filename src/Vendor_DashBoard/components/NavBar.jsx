import React from 'react';
import "../../App.css";

const NavBar = ({ showLoginHandler, showRegisterHandler, showLogOut,logOutHandler}) => {
  const name="Resturant Name:"
  return (
    <div className='navSection'>
      <div className='company'>Dilse</div>
      <h2>{name+localStorage.getItem("firm_name")}</h2>
      <div className='userAuth'>
        {!showLogOut ? (
           <>
           <span onClick={showLoginHandler} style={{ cursor: "pointer" }}>
             Login/
           </span>
           <span onClick={showRegisterHandler} style={{ cursor: "pointer" }}>
             Register
           </span>
         </>
        ) : (
          <span onClick={logOutHandler} style={{ cursor: "pointer" }}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default NavBar;

