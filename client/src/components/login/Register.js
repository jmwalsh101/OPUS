import { useRef } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import { registrationSchema } from "../../validations/Registration";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    const registerUsername = username.current.value;
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;

    const hashedPassword = bcrypt.hashSync(registerPassword, 10);

    const formData = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    const accountDetails = [
      {
        username: registerUsername,
        password: hashedPassword,
        email: registerEmail,
      },
    ];

    // test to get errors -- CODE WORKS
    /*
    let answer = [];
    registrationSchema
      .validate(formData)
      .then(function (valid) {
        if (valid) {
          answer = "works";
        }
      })
      .catch(function (err) {
        answer = { ...err }.errors;
        console.log("answer", answer);
      });
      */

    // end of test
    fetch("/account-login")
      .then((response) => response.json())
      .then((data) => {
        const accounts = data;
        console.log("accounts", data);
        let searchResult = null;
        searchResult = _.find(accounts, {
          username: registerUsername,
        });

        console.log(searchResult);
        if (searchResult === undefined) {
          console.log("tested false");
          registrationSchema
            .isValid(formData)
            .then(function (valid, err) {
              if (valid) {
                console.log("got to validation");
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
      Name <input type="text" ref={username} />
      Email <input type="email" ref={email} />
      Pasword <input type="password" ref={password} />
      Confirm Password{" "}
      <input type="password" ref={confirmPassword} placeholder="Password1%" />
      <button type="submit" onClick={register}>
        Submit
      </button>
    </>
  );
}
export default Register;
