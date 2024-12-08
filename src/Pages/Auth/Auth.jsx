import React, { useState,useContext } from "react";
import classes from './signUp.module.css';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebse';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";


function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState({
    signIn:false,
    signUp:false
  })

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate()

  const navStateData = useLocation()

console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();

console.log(e.target.name);

//firebase auth
    if (e.target.name === "signin") {
    setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
       

          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,
          });
          setLoading({...loading,signIn:false});
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({...loading,signIn:false})
        
        });
    } else {
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
  
       
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,
          })
          setLoading({...loading,signUp:false})
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({...loading,signUp:false})
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
          alt="Amazon Logo" 
        />
      </Link>

      <div className={classes.login_container}>
        {/* Form */}
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && (<small style={{padding:"5px",textAlign:"center", color:"red",fontWeight:"bold"

          }}>
            {navStateData?.state?.msg}</small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              id="email" 
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="password" 
            />
          </div>
          <button 
  type="submit" 
  name="signin"
  onClick={authHandler}
  className={classes.login_signinbutton}
>


  {loading.signIn ? (
    <ClipLoader color="#000" size={15} />
  ) : (
    "Sign In"
  )}
</button>
        </form>

        {error && <p className={classes.error}>{error}</p>}

        <p>
          By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
        </p>

        {/* Create Account Button */}
        <button 
          type="submit" 
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
         {loading.signUp ? (
    <ClipLoader color="#000" size={15} />
  ) : (
    "Create your Amazon Account"
  )}
        </button>
        {error && <small style={{paddingTop:"5px",color:"red"}}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;




