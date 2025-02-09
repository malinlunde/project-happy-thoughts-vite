import React, { useState, useEffect } from "react";
import { NewThought } from "./components/NewThought";
import ThoughtsList from "./components/ThoughtsList";
import SingleThought from "./components/SingleThought";
import { fetchThoughts, postThought, likeThought} from "./components/apiService";
import './index.css';


export const App = () => {
  const [loading, setLoading] = useState(true);
  const [thoughts, setThoughts] = useState([]);
  const [apiThoughts, setApiThoughts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchThoughts();
        console.log('Thoughts in App component:', data);
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thoughts', error);
        setErrorMessage('Failed to fetch thoughts');
      } finally {
        setLoading(false);
      }
    };
  
  fetchData();
  }, []);

  const handleThoughtSubmit = async (newThought) => {
    console.log('New Thought Data:', newThought);
    try {
      const createdThought = await postThought(newThought);
      setThoughts((previousThoughts) => [createdThought, ...previousThoughts]);
    } catch (error) {
      console.error('Error posting thought:', error);
      setErrorMessage('Failed to post thought');
    }
  };

  const handleLike = async (thought) => {
    try {
      const updatedThought = await likeThought(thought);
      setThoughts((previousThoughts) => 
        previousThoughts.map((thought) =>
          thought._id === updatedThought._id ? updatedThought : thought
        )
      );
    } catch (error) {
      console.error('Error liking thought:', error);
      setErrorMessage('Failed to like the thought');
    }
  };
    
    return (
      <div className="App">
        <h1>Project Happy Thoughts</h1>
        <h2>Malins Project</h2>
      <NewThought onThoughtSubmit={handleThoughtSubmit} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ThoughtsList thoughts={thoughts} onLike={handleLike}/>
    </div>
  );
};