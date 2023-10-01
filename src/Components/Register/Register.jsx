import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] = useState(false)


    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked
        console.log(name, email, password, accepted);
        


        // rest error/success
        setRegisterError('')
        setSuccess('')


        if(password.length < 6){
            setRegisterError('Password must be at least 6 characters or longer')
            return
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Password must contain at least one uppercase letter')
            return
        }
        else if(!accepted){
            setRegisterError('You must accept the terms and conditions')
            return
        }
        // else if(!/[a-z]/.test(password)){
        //     setRegisterError('Password must contain at least one lowercase letter')
        //     return
        // }
        // else if(!/[0-9]/.test(password)){
        //     setRegisterError('Password must contain at least one number')
        //     return
        // }
        // else if(!/[!@#$%^&*]/.test(password)){
        //     setRegisterError('Password must contain at least one special character')
        //     return
        // }
        

        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setSuccess('User Created Successfully')

            // update profile
            updateProfile(result.user, {
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"

            })
            .then(() => {
                console.log('Updated profile')
            })
            .catch(error => {
                
            })


            // send verification email
            sendEmailVerification(result.user)
            .then(() => {
                alert('Check Your Email Verification Sent')
            })
        })

        .catch(error => {
            console.error(error);
            setRegisterError(error.message)


        })
        

    }


    return (
        <div className=" text-center">
            <div className="mx-auto md:w-1/2">
            <h3 className="text-3xl mb-4">Please Register</h3>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full px-4 py-2" type="text" name="name" id="" placeholder="Your Name" required />
                <br />
                <input className="mb-4 w-full px-4 py-2" type="email" name="email" id="" placeholder="Email Address" required />
                <br />
              <div className="relative mb-4 border">

              <input className=" w-full px-4 py-2" type={showPass ? "text" : "password"} name="password" id="" placeholder="Password" required />

                <span className="absolute top-3 right-2 " onClick={() => setShowPass(!showPass)}>
                {
                    showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                }
                </span>

              </div>
              <br />
              <div className="text-left">
              <input className="  mr-2" type="checkbox" name="terms" id="terms" />
              
              <label  htmlFor="terms">Accept our <a href="">terms and conditions</a></label>
              </div>
             
                <br />
                <input className="mb-4 w-full btn btn-secondary" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-600">{registerError}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }

            <p>Already have an account? please <Link to="/login">Login</Link></p>

            </div>
        </div>
    );
};

export default Register;