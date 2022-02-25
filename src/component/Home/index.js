import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [inputtext, setinputtext] = useState({
        email: "",
        password: ""
    });
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    const navigate = useNavigate()
    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        setinputtext((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        const errors = validate(inputtext)
    if (Object.keys(errors).length){
      setFormErrors(errors)
      return
    }
    try{
       await axios.post(`http://localhost:4444/Machine-testing-user`,inputtext)
      Cookies.set('users', JSON.stringify({ inputtext }))
      navigate("/Dashboard")
    } catch (error) {
      console.log("Something is Wrong");
    }
}

    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(inputtext);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        
        return errors;
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.text}>
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={submitForm}>
                        <div className="input-text">
                            <input type="text"
                                placeholder="Enter your email"
                                value={inputtext.email}
                                onChange={inputEvent}
                                name="email" />
                            <i className={`fa fa-enveloepe ${styles.envelope}`} ></i>
                        </div>
                        <p className={styles.err}>{formErrors.email}</p>
                        <div className={styles.inputtext}>
                            <input type={password}
                                placeholder="Enter your password"
                                value={inputtext.password}
                                onChange={inputEvent}
                                name="password" />
                            <i className={styles.fafalock}></i>
                            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"} ${styles.eyecheck}`
                            }></i>
                        </div>
                        <p className={styles.err}>{formErrors.password}</p>
                        <div className={styles.buttons}>
                            <button type="submit">Login</button>
                        </div>
                        <div className={styles.forgot}>
                            <p>Do want to regiter account? <a href="/">Signup</a></p>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
}
export default Login;