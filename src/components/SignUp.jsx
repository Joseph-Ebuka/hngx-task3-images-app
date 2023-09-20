import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'



const SignUp = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = createUserWithEmailAndPassword(auth, email, password);
      
      console.log(res);
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="signUp">
      <div className="signUpPageContent">
        <form onSubmit={handleSubmit}>
          <i class="fi fi-br-arrow-left back" onClick={() => navigate("/")}></i>
          <div className="logo">
            <img src="" alt="" />
            <span>Unsplash</span>
          </div>
          <p>Login</p>
          <div className="inputs">
            <input type="text" required placeholder="Username" />
            <input type="email" placeholder="email" required />
            <input type="password" placeholder="Password" required />
            <button>Sign Up</button>
            {err && <span>Something Went wrong</span>}
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "13px",
            }}
          >
            Already have an account?{" "}
            <p
              className="login-signup"
              onClick={() => navigate("/signin")}
              style={{ color: "", textDecoration: "underline" }}
            >
              Login
            </p>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
