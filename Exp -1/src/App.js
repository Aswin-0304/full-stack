import React, { useState } from "react";
import "./App.css";

function App() {
  const platforms = {
    Twitter: 280,
    Facebook: 63206,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const [selectedPlatform, setSelectedPlatform] = useState("Twitter");
  const [post, setPost] = useState("");
  
  // New States for Draft Management
  const [drafts, setDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const maxChars = platforms[selectedPlatform];
  const remaining = maxChars - post.length;
  
  // Validation for disabled states
  const isPostEmpty = post.trim().length === 0;
  const isPostInvalid = remaining < 0 || isPostEmpty;

  // ✅ Save or Update a Draft
  const handleSaveDraft = () => {
    if (isPostEmpty) return;

    if (editingId) {
      // Update the existing draft
      setDrafts(drafts.map(draft => 
        draft.id === editingId ? { ...draft, text: post, platform: selectedPlatform } : draft
      ));
    } else {
      // Create a new draft
      const newDraft = {
        id: Date.now(), // Use current timestamp as a unique ID
        platform: selectedPlatform,
        text: post,
      };
      setDrafts([...drafts, newDraft]);
    }
    
    // Reset composer state after saving
    setPost("");
    setEditingId(null);
  };

  // ✅ Edit a draft
  const handleEditDraft = (draft) => {
    setPost(draft.text);
    setSelectedPlatform(draft.platform);
    setEditingId(draft.id);
  };

  // ✅ Delete a draft
  const handleDeleteDraft = (id) => {
    setDrafts(drafts.filter(draft => draft.id !== id));
    
    // If the user deletes the draft they are currently editing, clear the composer
    if (editingId === id) {
      setPost("");
      setEditingId(null);
    }
  };

  return (
    <div className="container">
      <h1>Dynamic Post Composer</h1>

      <label>Select Platform:</label>
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
      >
        {Object.keys(platforms).map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>

      <textarea
        placeholder={`Write your ${selectedPlatform} post here...`}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div className="counter">
        Characters: {post.length} / {maxChars}
      </div>

      {remaining < 0 ? (
        <p className="error">
          ❌ Character limit exceeded by {-remaining} characters.
        </p>
      ) : remaining <= 20 ? (
        <p className="warning">
          ⚠ Only {remaining} characters remaining.
        </p>
      ) : (
        <p className="success">✅ Post is valid.</p>
      )}

      {/* Action Buttons */}
      <div className="button-group">
        <button 
          className="save-btn" 
          onClick={handleSaveDraft} 
          disabled={isPostEmpty}
        >
          {editingId ? "Update Draft" : "Save as Draft"}
        </button>
        
        {/* ✅ Publish button remains available */}
        <button 
          className="publish-btn" 
          disabled={isPostInvalid}
        >
          Publish
        </button>
      </div>

      {/* ✅ Display all saved drafts */}
      {drafts.length > 0 && (
        <div className="drafts-section">
          <h2>Saved Drafts ({drafts.length})</h2>
          {drafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <div className="draft-header">
                <span className="draft-platform">{draft.platform}</span>
              </div>
              <p className="draft-text">{draft.text}</p>
              
              <div className="draft-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => handleEditDraft(draft)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDeleteDraft(draft.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;