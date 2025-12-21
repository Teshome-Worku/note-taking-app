import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import DeletePopup from "../components/Deletepopup";
import pinned from '../assets/pinned.png';
import unpinned from '../assets/unpinned.png';
const Home = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortType,setSortType]=useState({key:"date",order:"desc"});

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  const filteredNotes = notes.filter((note) => {
    const q = searchText.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });
  const sortedNotes=[...filteredNotes].sort((a,b)=>{
    // Show pinned notes first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    if (sortType.key === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortType.order === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });
 

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
      <input
        type="text"
        className="search-bar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="🔍Search notes  by title or content..."
      />
      <select
        className="sort-select"
        value={`${sortType.key}-${sortType.order}`}
        onChange={(e)=>{
          const [key,order]=e.target.value.split("-");
          setSortType({key,order});
        }}
      >
        <option value="date-desc">Sort by Date: Newest First</option>
        <option value="date-asc">Sort by Date: Oldest First</option>
      </select>
      

      <div className="card">

        {notes.length === 0 ? (
          <p>You don’t have any notes yet. Click ‘Add Note’ to get started.</p>
        ) : (
          sortedNotes.length === 0 ? (
            <div className="empty">🔍No matching notes found.</div>
          ) : (
            sortedNotes.map((note) => (
              <div className="note-card" key={note.id}>
                      

                <h4>{note.title}</h4>
                <p>{note.content}<strong>.</strong></p>
                <small>📅{note.date}</small>
                <button className="pinned" 
                  onClick={()=>{
                    const updatedNotes=notes.map(n=>{
                      
                      if(n.id===note.id){
                        return{...n,pinned:!n.pinned};
                      } return n;
                    });
                    setNotes(updatedNotes);
                    localStorage.setItem("notes",JSON.stringify(updatedNotes));
                  }}>
                  <img src={note.pinned ? unpinned : pinned} alt="pinned" />
                  </button>
                <div className="btn">
                  <button className="edit" onClick={() => navigate(`/edit/${note.id}`)}>✏️
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(note.id)}>🗑️
                    Delete
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>
      <button className="sticky-footer" onClick={nav}>Add Note</button>
      {deletePopup && (
        <DeletePopup
          onConfirm={confirmDelete}
          onCancel={Cancel}
        />
      )}

    </div>
  );
};
export default Home;