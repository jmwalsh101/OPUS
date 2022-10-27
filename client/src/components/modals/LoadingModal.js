import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "./master.css";

const LoadingModal = () => {
  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content-loading">
          <div className="modal-header">Loading</div>
          <div className="modal-message">
            <div>
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="fontawesome"
                spin
              />
            </div>
            <div>Loading...</div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
