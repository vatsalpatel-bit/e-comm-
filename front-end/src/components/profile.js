import React, { useState, useEffect } from "react";

const Profile = () => {
  const [username, setUsername] = useState("user");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayName = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      
      const response = await fetch(`http://localhost:5000/username?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsername(data.username || "Unknown User");
    } catch (error) {
      console.error("Error fetching username:", error);
      setError(`Failed to load username: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayName();
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!loading && !error && (
        <div>
          <p>Welcome, <strong>{username}</strong>!</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            disabled
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
