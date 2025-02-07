import React, { useState, useEffect } from 'react';
import { likeThought } from "./apiService";
import ThoughtsList from './ThoughtsList';
import '../index.css';

const SingleThought = ({ thought, onLike }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [numLikes, setNumLikes] = useState(thought.hearts);

  const handleLikeClick = async () => {
    if (!isLiking) {
      setIsLiking(true);
      try {
        const updatedThought = await likeThought(thought);
        onLike(updatedThought);
        
        setNumLikes(updatedThought.hearts);
      } catch (error) {
        console.error('Error liking thought:', error);
      } finally {
      setIsLiking(false);
    }
   }
  };
    return (
    <div className="thought-item">
        <p>{thought.message}</p>
        <div className="likes">
        <button onClick={handleLikeClick} disabled={isLiking} title={thought.message}>
        ❤️
        </button>
        <span>x {numLikes}</span>
        </div>
    </div>
  );
};


export default SingleThought;