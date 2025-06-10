import React, { useState, useEffect } from "react";


const Home = () => {
  const phrases = [
    "Welcome to Our Car Space",
    "Explore the best cars in the world",
    "Find the best car",
    "Drive safe and enjoy your journey",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % phrases.length;
        setCurrentPhrase(phrases[nextIndex]);
        return nextIndex;
      });
    }, 2000); 

    
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="landing-page">
     
      <div className="landing-content">
        <div className="content-left">
          <h1>{currentPhrase}</h1>
          <p>
            Explore the best cars in the world, find the best car. Drive safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
