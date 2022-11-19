const SuccessModal = (props) => {
  const { show, onClose } = props;

  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header confirm">Confirm</div>
          <div className="modal-message">{props.message}</div>
          <div className="modal-footer">
            <button onClick={props.cancel}>Cancel</button>
            <button id="modal-confirm" onClick={onClose}>
              {props.confirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
