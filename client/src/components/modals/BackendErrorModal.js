import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownUpAcrossLine } from "@fortawesome/free-solid-svg-icons";

const BackendErrorModal = () => {
  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header error">Error</div>
          <div className="modal-message">
            <div>
              <FontAwesomeIcon
                icon={faArrowDownUpAcrossLine}
                className="icon error-icon"
                fade
              />
            </div>
            <div>
              There is a problem with your connection. Check your internet and
              reload the page.
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default BackendErrorModal;
