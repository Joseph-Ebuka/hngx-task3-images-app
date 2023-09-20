import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const SignIn = () => {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div>
      <div className="signUp">
        {err && <span>Please check your details</span>}
        <div className="signUpPageContent">
          <form onSubmit={handleSubmit}>
            <div className="logo">
              <img src="" alt="" />
              <span>Unsplash</span>
            </div>
            <p>Register</p>
            <div className="inputs">
              <input type="email" placeholder="email" required />
              <input type="password" placeholder="Password" required />
              <button>Sign In</button>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "18px",
              }}
            >
              Don't have an Account?{" "}
              <p
                className="login-signup"
                style={{ color: "", textDecoration: "underline" }}
              >
                Sign Up
              </p>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
