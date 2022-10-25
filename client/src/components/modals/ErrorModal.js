import "./modal.css";

const ErrorModal = (props) => {
  const { show, onClose } = props;

  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">Error</div>
          <div className="modal-message">{props.message}</div>
          <div className="modal-footer">
            <button onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
