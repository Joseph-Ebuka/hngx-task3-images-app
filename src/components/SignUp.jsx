import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password, displayName);
      navigate("/");
      console.log(res);
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="signUp">
      <div className="signUpPageContent">
        <nav>
          {" "}
          <span>Already have an account? </span>
          <p className="login-signup" onClick={() => navigate("/signin")}>
            Login
          </p>
        </nav>
        <form onSubmit={handleSubmit}>
          <div className="logo">
            <img src="" alt="" />
            <span>Unsplash</span>
          </div>
          <div className="gettingStarted">
            <p>Get started with Unsplash</p>
            <sub>Getting started is easy</sub>
          </div>
          <div className="inputs">
            <input type="text" required placeholder="Username" />
            <input type="email" placeholder="email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
           <p className="condition"> By creating an account you have agreed to our terms of use </p>
          </div>
          {err && <span
          style={{
            color:"red"
          }}
          >Something Went wrong</span>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
