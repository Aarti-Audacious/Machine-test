import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Signup = () => {
  const [formValues, setFormValues] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      passwoard:"",
      confirmPwd:""
    });
  const [cookies, setCookies] = useState(['users']);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);
  const Navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const {firstName, lastName, email, passwoard} = formValues;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues)
    if (Object.keys(errors).length){
      setFormErrors(errors)
      return
    }
    try{
      await axios.post(`http://localhost:4444/Machine-testing-user`,{firstName, lastName, email, passwoard})
      Cookies.set('users', JSON.stringify({ formValues }))
      Navigate("/Dashboard");

    } catch (error) {
      console.log("Something is Wrong");
    
    }
  };
  async function setApiData() {
    try {
      await axios.post(`http://localhost:4444/Machine-testing-user`, {firstName, lastName, email, passwoard})
      Cookies.set('users', JSON.stringify({ formValues }))
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
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setApiData()
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "firstname is required!";
    }
    if (!values.lastName) {
      errors.lastName = "lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 8) {
      errors.password = "Password cannot exceed more than 8 characters";
    }
    if (!values.confirmPwd) {
      errors.confirmPwd = "Confirm Password is required";
    } else if (values.confirmPwd != values.password) {
      errors.confirmPwd = "Password is not match";
    }
    return errors;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>sign up</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <input
              type="text"
              name="firstName"
              placeholder="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.firstName}</p>
          <div className="field">
            <input
              type="text"
              name="lastName"
              placeholder="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.lastName}</p>
          <div className="field">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <input
              type={password}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <i className={styles.fafalock}></i>
            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"} 
            ${styles.eyecheck}`
            }></i>
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <input
              type={password}
              name="confirmPwd"
              placeholder="confirm your Password"
              value={formValues.confirmPwd}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.confirmPwd}</p>
          <div className={styles.buttons}>
            <button type="submit">signup</button>
          </div>
          <p>aleready have an account <a href="/Login">Login</a></p>
        </div>
      </form>

    </div>
  )
}
export default Signup;