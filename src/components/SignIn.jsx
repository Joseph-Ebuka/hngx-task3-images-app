import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
      console.log("Error", error?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="signUp">
        <div className="signUpPageContent">
          <nav>
          <span>
              Don't have an Account?{" "}
            </span>
              <p className="login-signup" onClick={() => navigate("/signup")}>
                Sign Up
              </p>
          </nav>
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <img src="" alt="" />
              <span>Unsplash</span>
            </div>
            <div className="gettingStarted">
            <p>Welcome Back</p>
            <sub>Log into your account</sub>
            </div>
            <div className="inputs">
              <input type="email" placeholder="email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign In</button>
            </div>
           
          </form>
          {err && <span
            style={{
              color:"red"
            }}>Please check your details</span>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
