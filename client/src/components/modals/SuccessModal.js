import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const SuccessModal = (props) => {
  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content-success">
          <div className="modal-header">Success</div>
          <div className="modal-message">
            <div>
              <FontAwesomeIcon icon={faCircleCheck} className="fontawesome" />
            </div>
            <div>{props.message}</div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
