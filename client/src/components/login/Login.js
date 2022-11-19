import { useRef, useContext } from "react";
import bcrypt from "bcryptjs";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { loginContext } from "../../contexts/LoginContext";

function Login() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  //const [backendData, setBackendData] = useState([]);

  function login(e) {
    e.preventDefault();
    const registerUsername = username.current.value;
    const registerEmail = email.current.value;
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
              // error modal
              console.log("password does not match");
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
      .catch((error) => console.log("ERROR"));
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
                  <td>Email</td>
                  <td>
                    <input id="email" type="email" ref={email} />
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
            <button type="submit" onClick={login}>
              Submit
            </button>
            <p>
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
