const DeletePopup = ({ onConfirm, onCancel }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-delete">
          <h2>Are you sure want to delete this note?</h2>
          <div style={{display: 'flex', gap: 20, justifyContent: 'center'}}>
            <button onClick={onCancel} className='cancel'>Cancel</button>
            <button onClick={onConfirm} className='delete'>Delete</button>
          </div>
        </div>
      </div>
    );
  };
  export default DeletePopup;