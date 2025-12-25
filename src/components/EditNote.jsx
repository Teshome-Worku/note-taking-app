import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UpdatePopup from "./UpdatePopup";
import previous from '../assets/previous.png';
const EditNote = () => {
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [date,setDate]=useState(""); 
    const [updatePopup,setUpdatePopup]=useState(false);     
    const {id}=useParams();
    
    const notes=JSON.parse(localStorage.getItem("notes"))||[];
    const note=notes.find((n)=>n.id===id);
    
    if(!note){
        return <div className="edit-note">
            <h2>Note not found</h2>
        </div>
    }
    useEffect(()=>{
        setTitle(note.title);
        setContent(note.content);
        setDate(note.date);
    },[]);
    const closePopup=()=>{
        setUpdatePopup(false);
        navigate("/");
    }
    
    const handleEdit=(e)=>{
            e.preventDefault();
            const updatedNotes=notes.map((n)=>n.id===id?{...n,title,content,date}:n);
            localStorage.setItem("notes",JSON.stringify(updatedNotes));
            setUpdatePopup(true);
    }
    return(
        <div className="edit-note">
            <h2>Edit Note</h2>
            <form autoComplete="off"  onSubmit={handleEdit}>
                <p>Title</p>
                <input type="text"
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)}
                    minLength={3}
                    maxLength={20}
                    required/>
                    
                <p>Content</p>
                <textarea 
                    value={content} 
                    required
                    rows={5}
                    cols={50}
                    onChange={(e)=>setContent(e.target.value)}/>

                <p>Date</p>

                <input type="date" 
                    value={date} 
                    required
                    onChange={(e)=>setDate(e.target.value)}/>
                <button className="save-btn" type="submit">Save Changes</button>
            </form>
            <div className="back">
                <img src={previous} alt="previous" className="previous-icon" 
                onClick={()=>navigate("/")}/>
            </div>
            {updatePopup && <UpdatePopup onClose={closePopup}/>}
           
        </div>
    )
}
export default EditNote;
 