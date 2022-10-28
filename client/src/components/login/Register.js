import { useRef } from "react";
import bcrypt from "bcryptjs";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  function register(e) {
    e.preventDefault();
    const registerUsername = username.current.value;
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;

    const hashedPassword = bcrypt.hashSync(registerPassword, 10);
    console.log(hashedPassword);

    const accountDetails = [
      {
        username: registerUsername,
        password: hashedPassword,
        email: registerEmail,
      },
    ];

    fetch("/account-register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: accountDetails }),
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
