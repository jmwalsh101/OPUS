import "./master.css";

const LoadingModal = (props) => {
  const { show, onClose } = props;

  return (
    <div className="modal-screen">
      <div className="modal">
        <div className="modal-content-loading">
          <div className="modal-header">Loading</div>
          <div className="modal-message">Loading...</div>
          <div className="modal-footer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;