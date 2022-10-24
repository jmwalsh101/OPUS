import "./modal.css";

const MyVerticallyCenteredModal = (props) => {
  const { show, onClose } = props;

  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">Hello</div>
          <div className="modal-message">Message</div>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVerticallyCenteredModal;
