
import React from 'react';
import '@styles/BlockLoader.css';

export default function BlockLoader() {
  return (
    <div className="loader-container">
      <div className="bar-wrapper">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
      <p className="loading-text">Loading amazing news...</p>
    </div>
  );
}
