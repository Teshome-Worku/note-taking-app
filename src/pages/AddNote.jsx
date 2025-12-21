import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SavePopup from "../components/SavePopup";
const AddNote=()=>{
    const [title,setTitle]=useState("");
    const[content,setContent]=useState("");
    const [date,setDate]=useState("");
    const [savePopup,setSavePopup]=useState(false);
    const navigate=useNavigate();

    const addNote=(e)=>{
        e.preventDefault();
        const arr=JSON.parse(localStorage.getItem("notes") || '[]');
        const obj={
            id:crypto.randomUUID(),
            title:title,
            content:content,
            date:date,
            pinned:false,
        }
        arr.push(obj);
        localStorage.setItem("notes",JSON.stringify(arr));
        setSavePopup(true)
    }
    const closePopup=()=>{
        setSavePopup(false)
        navigate("/");
    }
    const keyPressed=(e)=>{
        if(e.key==="Enter"){
            addNote();
        }
    }
    return(
        <div className="add-note">
            
            <h1>Add New Note</h1>
            <div className="input-field">
                <form onSubmit={addNote} onKeyDown={keyPressed}>
                    <p>Title</p>
                    <input type="text" 
                    value={title}
                    required
                    placeholder="type your note title here..."
                    minLength={3}
                    maxLength={20}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                    <p>Content</p>
                    <textarea
                    value={content}
                    placeholder="write your note content here..."
                    rows={5}
                    cols={50}
                    required
                    onChange={(e)=>setContent(e.target.value)}
                    />
                    <p>Date</p>
                    <input type="date" 
                    required
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    />
                    <button type="submit">Save</button>
                </form>

            </div>
            {savePopup&&<SavePopup onClose={closePopup}/>}

        </div>
    )
}
export default AddNote;