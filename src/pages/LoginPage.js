import React, { useState } from 'react';
import logo1 from '../assets/images/background/earthco_logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const nevigate = useNavigate();

    // const apiUrl = 'https://earthcoapi.yehtohoga.com/api/Usermanagement/Users';

    // // Replace 'YOUR_BEARER_TOKEN' with the actual Bearer token you want to use for authorization.
    // const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5OTVmM2QwYS1hZTAyLTRmZjQtOTZmYy03ZTRkMDk1NTExNmEiLCJ1c2VyaWQiOiJ1c2VySWQiLCJleHAiOjE2OTcxODYxNjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdC8ifQ.rutnsl__zmbcxniuV0QnUCdGYLE5-_DpZrWpd9iZ0vE';
    
    // // Define your request headers with the Authorization Bearer token.
    // const headers = {
    //   'Authorization': `Bearer ${bearerToken}`,
    // };
    
    // // Make the GET request using Axios with the specified headers.
    // axios.get(apiUrl, { headers })
    //   .then(response => {
    //     // Handle the API response here
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     // Handle any errors here
    //     console.error('Error:', error);
    //   });


    // // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // // .then(response => response.json())
    // // .then(json => console.log(json))

    // // axios.get('https://jsonplaceholder.typicode.com/todos/1',{
    // //     headers: {
    // //         'Content-Type': 'application/json ; charset=utf-64',
    // //         'Accept': 'application/json',
    // //     },
    // //     crossorigin: false,
    // // }).then(res => {
    // //     console.log(res)
        
    // // })
    // // .catch(e => {
    // //     alert(e.message)
    // // })

   

    //   let params = {
    //     Email: email,
    //     Password: password,
    // }
    // // params = JSON.stringify({
    // //     Body: params,
    // // })
    // console.log(params)
    //   axios.post('https://earthcoapi.yehtohoga.com/api/Account/Login', params,
    //     {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         console.log(res)
            
    //     })
    //    .catch(error => {
    //       // Handle errors here
    //       if (error.response) {
    //         // The request was made, but the server responded with an error status code
    //         console.error('Response Error:', error.response.data);
    //       } else if (error.request) {
    //         // The request was made, but no response was received
    //         console.error('No Response:', error.request);
    //       } else {
    //         // Something else went wrong
    //         console.error('Error:', error.message);
    //       }
    //     });
    try {
      const response = await axios.post(
        'https://earthcoapi.yehtohoga.com/api/Account/Login',
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Login successful, you can redirect the user to the dashboard
        setError('');
  
        // Add navigation to the dashboard here
        navigate('/Dashboard'); // Make sure to import 'navigate' from 'react-router-dom'
  
        console.log('Login successful');
      } else {
        // Login failed, display an error message
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.log('Error logging in:', error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-white"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <div className="login-form style-2" style={{ maxWidth: '500px' }}>
            <div className="card-body">
              <div className="logo-header">
                <img
                  src={logo1}
                  alt=""
                  className="width-230 light-logo"
                  style={{ width: '35%', marginLeft: '30%' }}
                />
                <img
                  src={logo1}
                  alt=""
                  className="width-230 dark-logo"
                  style={{ width: '35%', marginLeft: '30%' }}
                />
              </div>

              <nav>
                <div
                  className="nav nav-tabs border-bottom-0"
                  id="nav-tab"
                  role="tablist"
                >
                  <div className="tab-content w-100" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-personal"
                      role="tabpanel"
                      aria-labelledby="nav-personal-tab"
                    >
                      <form onSubmit={handleSubmitLogin} action="" className="dz-form pb-3">
                        <h3 className="form-title m-t0">
                          Personal Information
                        </h3>
                        <div className="dz-separator-outer m-b5">
                          <div className="dz-separator bg-primary style-liner"></div>
                        </div>
                        <p>Enter your e-mail address and your password. </p>
                        <div className="form-group mb-3">
                          <input
                            type="email"
                            placeholder="E-mail..."
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <input
                            type="password"
                            placeholder="Password..."
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <h5 className="authError mb-2">{error}</h5>
                        <div className="form-group text-left mb-3 forget-main">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span className="form-check d-inline-block">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="check1"
                                name="example1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="check1"
                              >
                                Remember me
                              </label>
                            </span>
                            <button
                              style={{ padding: '0px' }}
                              className="nav-link btn tp-btn-light btn-primary forget-tab"
                              id="nav-forget-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-forget"
                              type="button"
                              role="tab"
                              aria-controls="nav-forget"
                              aria-selected="false"
                            >
                              Forget Password ?
                            </button>
                          </div>
                        </div>
                        <div className="text-center bottom">
                          <button className="btn btn-primary button-md btn-block" type="submit">
                            Sign Me In
                          </button>
                        </div>
                      </form>
                      <button
                        style={{ width: '100%' }}
                        className="text-center nav-link btn tp-btn-light btn-primary forget-tab"
                        id="nav-sign-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-sign"
                        type="button"
                        role="tab"
                        aria-controls="nav-sign"
                        aria-selected="false"
                      >
                        Create an account
                      </button>
                    </div>
                    {/* ... (rest of the component code remains the same) ... */}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
