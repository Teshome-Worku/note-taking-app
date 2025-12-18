import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import DeletePopup from "../components/Deletepopup";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const nav = () => {
    navigate("/add");
  };
  const Cancel = () => {
    setDeletePopup(false);
  }

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    const updatedNotes = notes.filter(note => note.id !== selectedId);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setDeletePopup(false);
  };

  return (
    <div className="home-page">
      <h2>My Note </h2>

      <div className="card">
        {notes.length === 0 ? (
          <p>No notes added yet</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note.id}>
              <h4>{note.title}</h4>
              <p>{note.content }<strong>.</strong></p>
              <small>{note.date}</small>
              <div className="btn">
                <button className="edit" onClick={() => navigate(`/edit/${note.id}`)}>
                  Edit
                </button>
                <button className="delete" onClick={() => {
                  handleDelete(note.id);
                 
                }}>
                  Delete
                </button>
                
              </div>

            </div>
          ))
        )}
      </div>
      <button className="sticky-footer" onClick={nav}>Add Note</button>
      
      {deletePopup&& (
          <DeletePopup
            onConfirm={confirmDelete}
            onCancel={Cancel}
          />
        )}

    </div>
  );
};

export default Home;