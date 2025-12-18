import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavbarStyle from './NavbarStyle'

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`hamburger ${open ? "is-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? "✕" : "☰"}
      </button>
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2>My Note</h2>
        <NavLink to="/" onClick={() => setOpen(false)} style={NavbarStyle}>🏠 Home</NavLink>
        <NavLink to="/add" onClick={() => setOpen(false)}  style={NavbarStyle}>➕ Add Note</NavLink>
       
      </div>
      <div className={open ? 'overlay active' : 'overlay'} onClick={() => setOpen(false)} />
    </>
  );
};

export default Sidebar;
