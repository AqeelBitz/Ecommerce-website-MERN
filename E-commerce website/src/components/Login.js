import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import signup_img from '../images/signup.jpg';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/')
    }
  })

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [err, setError] = useState(false)
  function Validation() {
    const validateField = (field, minLength, regex, errorMessage) => {
      if (!user[field]) {
        setError(true);
        result = false;
        toast.warning(`Please enter ${field.charAt(0).toUpperCase() + field.slice(1)}.`, {
          position: 'top-right'
        });
      } else if ((minLength && user[field].length < minLength) || (regex && !regex.test(user[field]))) {
        setError(true);
        result = false;
        if (errorMessage) {
          toast.warning(errorMessage, {
            position: 'top-right'
          });
        }
      }
    };

    let result = true;
    validateField('email', null, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address.');
    validateField('password', null, null, 'Password is required.');

    return result;
  }

  const PostData = async () => {
    if (Validation()) {


      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })
      // Implement your logic for posting data
      const data = await result.json();
      if (data) {
        navigate('/')
        localStorage.setItem("user", JSON.stringify(data));
      }
      console.log('Posting data:', data);
    }
  };

  return (
    <div className="signup-container">
      <div className='container-item'>

        <h3 className="mb-4">Login</h3>

        <div className="mb-3">
          <input
            value={user.email}
            onChange={handleInput}
            name="email"
            type="email"
            className="form-control rounded"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3">
          <input
            value={user.password}
            onChange={handleInput}
            name="password"
            type="password"
            className="form-control rounded"
            placeholder="Enter password"
          />
        </div>

        <div className="d-grid mt-4">
          <button type="button" className="btn btn-primary" onClick={PostData}>
            Login
          </button>
        </div>
      </div>
      <div className='container-item2'>

        <div className="col-md-6 col-lg-7 col-xl-8 order-md-first img_container">
          <img
            src={signup_img}
            className="img-fluid"
            alt="Sample image"
            style={{ height: '80vh', objectFit: 'cover' }}
          />
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
