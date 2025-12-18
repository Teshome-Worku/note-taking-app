const UpdatePopup=({onClose})=>{
    return(
        <div className="popup-overlay">
        <div className="update-popup">
            <h3>Note Updated Successfully!</h3>
            <button onClick={onClose} className="update-btn">Close</button>  
        </div>
    </div>
    )
}
export default UpdatePopup;