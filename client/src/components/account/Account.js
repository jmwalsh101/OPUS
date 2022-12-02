import { useEffect, useState, useRef, useContext } from "react";
import _ from "lodash";
import TextBadge from "../../images/badges/typewriter.svg";
import DocBadge from "../../images/badges/doc.jpg";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

import ConfirmModal from "../modals/ConfirmModal";
import BackendErrorModal from "../modals/BackendErrorModal";

import { registrationSchema } from "../../validations/Registration";

import { loginContext } from "../../contexts/LoginContext";

function Account() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  const accountName = JSON.parse(
    sessionStorage.getItem("username")
  ).registerUsername;
  const [userCreatedTexts, setUserCreatedTexts] = useState();
  const [userTextsUpdated, setUserTextsUpdated] = useState();
  const [userCreatedDocs, setUserCreatedDocs] = useState();
  const [userDocsUpdated, setUserDocsUpdated] = useState();
  const [accountDetails, setAccountDetails] = useState({});

  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [backendErrorModal, setBackendErrorModal] = useState(false);

  function handleCancel(e) {
    e.preventDefault();
    setDeleteAccountModal(false);
  }

  function handleDelete(e) {
    e.preventDefault();
    setDeleteAccountModal(true);
  }

  function handleAccountDelete(e) {
    e.preventDefault();
    setDeleteAccountModal(false);

    fetch("/account-delete", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ parcel: accountName }),
    })
      .then((response) => {
        response.json();
        sessionStorage.clear();
        setLoggedIn();
        navigate("/");
      })
      .catch((error) => {
        setTimeout(() => setBackendErrorModal(true), 3000);
      });
  }

  function updateAccount(e) {
    e.preventDefault();
    const registerUsername = accountName;
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

    console.log("ran to schema");
    registrationSchema
      .isValid(formData)
      .then(function (valid, err) {
        if (valid) {
          fetch("/account-update", {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ parcel: accountDetails }),
          });
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
  }

  useEffect(() => {
    fetch("/component-load")
      .then((response) => response.json())
      .then((data) => {
        setUserCreatedTexts(
          _.filter(data, {
            author: accountName,
          })
        );
        setUserTextsUpdated(
          _.filter(data, {
            updater: accountName,
          })
        );
      });
  }, [accountName]);

  useEffect(() => {
    fetch("/documents-load")
      .then((response) => response.json())
      .then((data) => {
        setUserCreatedDocs(
          _.filter(data, {
            author: accountName,
          })
        );
        setUserDocsUpdated(
          _.filter(data, {
            updater: accountName,
          })
        );
      });
  }, []);

  useEffect(() => {
    fetch("/account-login")
      .then((response) => response.json())
      .then((data) => {
        const accounts = data;

        const searchResult = _.find(accounts, {
          username: accountName,
        });
        setAccountDetails(searchResult);
      });
  }, [accountName]);

  return (
    <div className="main-container">
      <div className="account-container">
        <div className="header">
          <h2>{accountName}'s' Account</h2>
        </div>
        <div className="account-details">
          <h3>Details</h3>
          <div className="account-details-container">
            <div className="existing-account details">
              <table>
                <tr>
                  <td>Username:</td>
                  <td>{accountName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{accountDetails.email}</td>
                </tr>
              </table>
              <button onClick={handleDelete}>Delete Account</button>
            </div>
            <div className="change-account details">
              <table>
                <tr>
                  <td>Username:</td>
                  <td>{accountName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input type="text" ref={email} />
                  </td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <input type="text" ref={password} />
                </tr>
                <tr>
                  <td>Confirm Password:</td>
                  <td>
                    <input type="text" ref={confirmPassword} />
                  </td>
                </tr>
              </table>
              <button onClick={updateAccount}>Change Details</button>
            </div>
          </div>
        </div>

        <div className="account-facts">
          <h3>Statistics</h3>
          <div className="account-details-container">
            <table>
              <tr>
                <td>Texts Created:</td>
                <td>{userCreatedTexts ? userCreatedTexts.length : "0"}</td>
              </tr>
              <tr>
                <td>Texts Updated:</td>
                <td>{userTextsUpdated ? userTextsUpdated.length : "0"}</td>
              </tr>
            </table>
            <table>
              <tr>
                <td>Documents Created:</td>
                <td>{userCreatedDocs ? userCreatedDocs.length : "0"}</td>
              </tr>
              <tr>
                <td>Documents Updated:</td>
                <td>{userDocsUpdated ? userDocsUpdated.length : "0"}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="badges">
          <h3>Badges</h3>
          <div className="badges-container">
            <span className="badge">
              {userCreatedTexts ? (
                <>
                  <img src={TextBadge} /> <p>You created a text!</p>
                </>
              ) : null}
            </span>
            <span className="badge">
              {userCreatedDocs ? (
                <>
                  <img src={DocBadge} /> <p>You created a document!</p>
                </>
              ) : null}
            </span>
          </div>
        </div>
      </div>
      {deleteAccountModal ? (
        <>
          <ConfirmModal
            onClose={handleAccountDelete}
            cancel={handleCancel}
            confirmButton="Delete"
            message={
              <>
                <p>
                  This action will permanently delete {accountName}. You will
                  not be able to recover the account.
                </p>
              </>
            }
          />
        </>
      ) : null}
      {backendErrorModal ? <BackendErrorModal /> : null}
    </div>
  );
}

export default Account;
