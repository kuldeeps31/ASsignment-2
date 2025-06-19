import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiLogOut } from 'react-icons/fi';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface Note {
  _id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
  iat: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [userName, setUserName] = useState('Guest');
  const [userEmail, setUserEmail] = useState('guest@example.com');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
      } catch (err) {
        console.error('Invalid token');
      }
    }
    fetchNotes();
  }, []);

  // ✅ GET notes
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:9000/api/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // ✅ CREATE note
  const handleCreateNote = async () => {
  if (!newNote.trim()) return;
  try {
    const token = localStorage.getItem('token');

    const res = await axios.post(
      'http://localhost:9000/api/notes',
      { text: newNote },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes([res.data, ...notes]);
    setNewNote('');
    setIsCreating(false);
  } catch (error) {
    console.error('Error creating note:', error);
  }
};


  // ✅ DELETE note
  const handleDeleteNote = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut /> Sign Out
        </button>
      </header>

      <div className="user-info">
        <h2>Welcome, {userName}</h2>
        <p>{userEmail}</p>
      </div>

      {!isCreating && (
        <button onClick={() => setIsCreating(true)} className="create-note-btn">
          <FiPlus /> Create Note
        </button>
      )}

      {isCreating && (
        <div className="note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
          />
          <div className="form-actions">
            <button onClick={() => setIsCreating(false)} className="cancel-btn">Cancel</button>
            <button onClick={handleCreateNote} className="save-btn">Add Note</button>
          </div>
        </div>
      )}

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-notes">No notes yet. Create your first note!</p>
        ) : (
          notes.map(note => (
            <div key={note._id} className="note-card">
              <p>{note.text}</p>
              <button onClick={() => handleDeleteNote(note._id)} className="delete-btn">
                <FiTrash2 /> Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
