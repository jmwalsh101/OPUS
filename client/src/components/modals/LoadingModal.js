import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const LoadingModal = () => {
  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header loading">Loading</div>
          <div className="modal-message">
            <div>
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="icon loading-icon"
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
