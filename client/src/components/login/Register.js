import { useRef } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

import { registrationSchema } from "../../validations/registration";

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
    console.log(hashedPassword);

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

    registrationSchema.isValid(formData).then(function (valid) {
      if (valid) {
        console.log("works");
        fetch("/account-register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ parcel: accountDetails }),
        });

        navigate("/login");
      } else {
        // error modal
        console.log("invalid credentials");
      }
    });
  }

  return (
    <>
      Name <input type="text" ref={username} />
      Email <input type="email" ref={email} />
      Pasword <input type="password" ref={password} />
      Confirm Password <input type="password" ref={confirmPassword} />
      <button type="submit" onClick={register}>
        Submit
      </button>
    </>
  );
}
export default Register;
