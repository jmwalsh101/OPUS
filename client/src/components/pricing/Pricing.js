import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pricing-main">
        <div className="pricing-text">
          <span className="pricing-title">Start Writing for Free</span>
          <p className="pricing-subtitle">
            Take as long as you need to get your documentation model set up. No
            trial, no fees, no risk. Only upgrade when you're ready to ship or
            when you need to get the whole team involved.
          </p>
        </div>
        <div className="pricing-container">
          <div className="box">
            <div className="box-header">
              <h2>Launch</h2>
              <p>
                Prepare and write cutting edge documentation for your business.
                Upgrade when you're ready to launch or expand the team.
              </p>
            </div>
            <div className="pricing-price">
              <span className="amount">$0</span>
              <span className="frequency"> p/m</span>
            </div>
            <div className="box-details">
              <h4>Launch includes</h4>
              <span class="box-byline">
                <p>All of these powerful features</p>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">
                  Create, edit, and manage plain text comonents
                </span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">
                  Build documents out of text components
                </span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">
                  Author and recent editor details for texts and documents
                </span>
              </span>
            </div>
            <div className="box-button">
              <button onClick={() => navigate("/register")}>Sign Up</button>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <h2>Business</h2>
              <p>
                Prepare and write cutting edge documentation for your business.
                Upgrade when you're ready to launch or expand the team.
              </p>
            </div>
            <div className="pricing-price">
              <span className="amount">$100</span>
              <span className="frequency"> p/m</span>
            </div>
            <div className="box-details">
              <h4>Business includes</h4>
              <span class="box-byline">
                <p>All of these powerful features</p>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">Everything in Lauch</span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">Up to 5 team members</span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">Version control</span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">Publish to the web </span>
              </span>
            </div>
            <div className="box-button">
              <button>Sign Up</button>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <h2>Enterprise</h2>
              <p>
                Prepare and write cutting edge documentation for your business.
                Upgrade when you're ready to launch or expand the team.
              </p>
            </div>
            <div className="pricing-price">
              <span className="amount">$250</span>
              <span className="frequency"> p/m</span>{" "}
            </div>
            <div className="box-details">
              <h4>Enterprise includes</h4>
              <span class="box-byline">
                <p>All of these powerful features</p>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">
                  Everything in Launch and Business
                </span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">Unlimited team members</span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">
                  Full RBAC permission control
                </span>
              </span>
              <span className="box-detail">
                <FontAwesomeIcon icon={faCheck} />
                <span className="box-detail-text">SAML and OAuth logins </span>
              </span>
            </div>
            <div className="box-button">
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  {
    /*
          <div className="pricing-text">
            <h2>Start Writing for Free</h2>
            <p>
              Take as long as you need to get your documentation model set up.
              No trial, no fees, no risk. Only upgrade when you're ready to ship
              or when you need to get the whole team involved.
            </p>
          </div>
          <div className="pricing-tables">
            <table>
              <tbody>
                <tr>
                  <th>Services</th>
                  <th>Individual</th>
                  <th>Business</th>
                  <th>Enterprise</th>
                </tr>
                <tr>
                  <td>Create and texts</td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Create and documents</td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Author and Editing Records</td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Publish to Web</td>
                  <td>
                    <FontAwesomeIcon icon={faXmark} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>Versioning Control</td>
                  <td>
                    <FontAwesomeIcon icon={faXmark} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>RBAC Permissions</td>
                  <td>
                    <FontAwesomeIcon icon={faXmark} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
                <tr>
                  <td>SAML/OAuth Logins</td>
                  <td>
                    <FontAwesomeIcon icon={faXmark} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faXmark} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faCheck} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  */
  }
}

export default Pricing;
