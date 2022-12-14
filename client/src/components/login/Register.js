import { useRef, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { registrationSchema } from "../../validations/Registration";
import ErrorModal from "../modals/ErrorModal";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const handleClose = () => setErrorModal(false);

  function register(e) {
    e.preventDefault();
    const registerUsername = username.current.value;
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;
    const registerConfirmPassword = confirmPassword.current.value;

    const hashedPassword = bcrypt.hashSync(registerPassword, 10);

    const formData = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: registerConfirmPassword,
    };

    const accountDetails = [
      {
        username: registerUsername,
        password: hashedPassword,
        email: registerEmail,
      },
    ];

    registrationSchema
      .validate(formData)
      .then()
      .catch(function (err) {
        let answer = [];
        answer = { ...err }.errors;
        setValidationError(answer);
        setErrorModal(true);
      });

    // end of test
    fetch("/account-login")
      .then((response) => response.json())
      .then((data) => {
        const accounts = data;
        let searchResult = null;
        searchResult = _.find(accounts, {
          username: registerUsername,
        });

        if (searchResult === undefined) {
          registrationSchema
            .isValid(formData)
            .then(function (valid, err) {
              if (valid) {
                fetch("/account-register", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ parcel: accountDetails }),
                });

                navigate("/login");
              } else {
                // error modal for bad results. This section needs to change - modal mapping results
                //console.log(err);
                console.log("validation error");
              }
            })
            .catch(function (err) {
              // the errors are caught here
              //console.log(err);
            });
        } else {
          console.log("matched username");
        }
      }) // fail error modal here
      .catch((error) => console.log("ERROR"));
  }

  return (
    <>
      <div className="register-container">
        <div className="register-text"> </div>
        <div className="form form-register">
          <div className="form-contents">
            <h2>Sign Up</h2>
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
                <tr>
                  <td>Confirm Password</td>
                  <td>
                    <input
                      id="confirm-password"
                      type="password"
                      ref={confirmPassword}
                      placeholder="Password1%"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="form-submit">
              <button type="submit" onClick={register}>
                Submit
              </button>
            </div>
            <div className="form-submit">
              <p>
                Already have an account? <a href="/login">Log In</a>
              </p>
            </div>
          </div>
        </div>
        {errorModal ? (
          <ErrorModal
            show={errorModal}
            onClose={handleClose}
            message={validationError}
          />
        ) : null}
      </div>
    </>
  );
}
export default Register;
