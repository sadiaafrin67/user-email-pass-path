import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("cbsdcbhdfbhsd");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

     // rest error/success
     setRegisterError('')
     setSuccess('')

    // add validation
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
          setSuccess("User Logged In Successfully");
        }
        else{
          alert("Please verify your email")
        }


      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value
    if(!email){
      console.log("please inter reset email", emailRef.current.value);
      return
    }
    else if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("please inter valid email");
      return
    }

    // send validation email
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!")
    })
    .catch(error => {
      console.error(error);
    })


  }


  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="text"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a onClick={handleForgetPass} href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              {
                registerError && <p className="text-red-600">{registerError}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
            <p>New to this website? please <Link to="/register">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
