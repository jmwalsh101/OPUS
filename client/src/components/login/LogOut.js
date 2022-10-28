import { loginContext } from "../../contexts/LoginContext";
import { useContext } from "react";

function LogOut() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  function logout() {
    setLoggedIn(false);
    sessionStorage.clear();
  }
  return (
    <button type="submit" onClick={logout}>
      Log Out
    </button>
  );
}

export default LogOut;
