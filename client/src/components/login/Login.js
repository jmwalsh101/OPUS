import { useRef, useContext, useState } from "react";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../modals/ErrorModal";

import { loginContext } from "../../contexts/LoginContext";

function Login() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);
  const [userNameError, setUserNameError] = useState(false);
  const handleUserClose = () => setUserNameError(false);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  //const [backendData, setBackendData] = useState([]);

  function login(e) {
    e.preventDefault();
    const registerUsername = username.current.value;
    const registerPassword = password.current.value;

    fetch("/account-login")
      .then((response) => response.json())
      .then((data) => {
        const accounts = data;

        const searchResult = _.find(accounts, {
          username: registerUsername,
        });

        bcrypt.compare(
          registerPassword,
          searchResult.password,
          function (err, isMatch) {
            if (err) {
              throw err;
            } else if (!isMatch) {
              setErrorModal(true);
            } else {
              setLoggedIn(true);
              sessionStorage.setItem(
                "username",
                JSON.stringify({ registerUsername })
              );
              navigate("/");
            }
          }
        );
      }) // fail error modal here
      .catch((error) => setUserNameError(true));
  }

  return (
    <>
      <div className="register-container">
        <div className="login-text"> </div>
        <div className="form form-login">
          <div className="form-contents">
            <h2>Login</h2>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input id="username" type="text" ref={username} />
                  </td>
                </tr>
                <tr>
                  <td>Pasword</td>
                  <td>
                    <input id="password" type="password" ref={password} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="form-submit">
              <button type="submit" onClick={login} className="form-submit">
                Submit
              </button>
            </div>
            <div className="form-submit">
              <p>
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
        {errorModal ? (
          <ErrorModal
            show={errorModal}
            onClose={handleClose}
            message="Your password is incorrect."
          />
        ) : null}
        {userNameError ? (
          <ErrorModal
            show={userNameError}
            onClose={handleUserClose}
            message="Your username is incorrect."
          />
        ) : null}
      </div>
    </>
  );
}
export default Login;
