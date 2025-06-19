import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiLogOut } from 'react-icons/fi';
import '../styles/Dashboard.css'

const Dashboard = () => {
  // Get user data from localStorage
//  const user = JSON.parse(localStorage.getItem('user') || {
//    name: 'Guest',
//    email: 'guest@example.com'
//  };

  const [notes, setNotes] = useState<Array<{id: string, content: string}>>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleCreateNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now().toString(),
      content: newNote
    };
    
    setNotes([...notes, note]);
    setNewNote('');
    setIsCreating(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut /> Sign Out
        </button>
      </header>

      {/* User Info */}
      <div className="user-info">
        <h2>Welcome, kuldeep</h2>
        <p>kuldeep@gmail.com</p>
      </div>

      {/* Create Note Button */}
      {!isCreating && (
        <button 
          onClick={() => setIsCreating(true)}
          className="create-note-btn"
        >
          <FiPlus /> Create Note
        </button>
      )}

      {/* Note Creation Form */}
      {isCreating && (
        <div className="note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
          />
          <div className="form-actions">
            <button onClick={() => setIsCreating(false)} className="cancel-btn">
              Cancel
            </button>
            <button onClick={handleCreateNote} className="save-btn">
              Add Note
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-notes">No notes yet. Create your first note!</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-card">
              <p>{note.content}</p>
              <button 
                onClick={() => handleDeleteNote(note.id)}
                className="delete-btn"
              >
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