import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SavePopup from "../components/SavePopup";
const AddNote=()=>{
    const titleRef=useRef(null);
    const contentRef=useRef(null);

    const [title,setTitle]=useState("");
    const[content,setContent]=useState("");
    
    const [date,setDate]=useState("");
    const [savePopup,setSavePopup]=useState(false);
    const navigate=useNavigate();
    const [inCorrectTitle,setIncorrectTitle]=useState("");
    const [inCorrectContent,setIncorrectContent]=useState("");


    const addNote=(e)=>{
        e.preventDefault();
        if(!validate()) return;
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
    const validate=()=>{
        if(!title.trim()){
            setIncorrectTitle("Title cannot be empty.");
            titleRef.current.focus();
            setTimeout(()=>{
                setIncorrectTitle("");
            },3000)
            return false
        }
        else if(title.trim().length<3 || title.trim().length>20){
            setIncorrectTitle("Title must be between 3 and 20 characters.");
            titleRef.current.focus();
            setTimeout(()=>{
                setIncorrectTitle("");
            },3000)
            return false;
        }
        else if(!content.trim()){
            setIncorrectContent("Content cannot be empty.");
            contentRef.current.focus();
            setTimeout(()=>{
                setIncorrectContent("");
            },3000)
            return false;
        }
        else if(content.trim().length<5 || content.trim().length>500){
            setIncorrectContent("Content must be between 5 and 500 characters.");
            contentRef.current.focus();
            setTimeout(()=>{
                setIncorrectContent("");
            },3000)
            return false;
        }
        else if(!date){
            setIncorrectContent("Please select a date.");
            dateRef.current.focus();    
            setTimeout(()=>{
                setIncorrectContent("");
            },3000)
            return false;
        }
       
        else{
            setIncorrectTitle("");
            setIncorrectContent("");
            return true;
        }
       
    }
    const closePopup=()=>{
        setSavePopup(false)
        navigate("/");
    }
    
    return(
        <div className="add-note">
            
            <h1>Add New Note</h1>
            <div className="input-field">
                <form onSubmit={addNote} >
                    <p>Title</p>
                    <input type="text" 
                    value={title.trimStart()}
                    ref={titleRef}
                    required
                    placeholder="type your note title here..."
                   
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                    {inCorrectTitle && <span className="error">{inCorrectTitle}</span>}
                    <p>Content</p>
                    <textarea
                    value={content.trimStart()}
                    ref={contentRef}
                    placeholder="write your note content here..."
                    rows={5}
                    cols={50}
                    required
                    onChange={(e)=>setContent(e.target.value)}
                    />
                    {inCorrectContent && <span className="error">{inCorrectContent}</span>}
                    <p>Date</p>
                    <input type="date" 
                    required
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    />
                    <button type="submit" disabled={!title.trim() || !content.trim() } 
                    style={{opacity: !title.trim() || !content.trim() || !date ? 0.6 : 1} }
                    >Save</button>
                </form>
            </div>
            {savePopup&&<SavePopup onClose={closePopup}/>}

        </div>
    )
}
export default AddNote;