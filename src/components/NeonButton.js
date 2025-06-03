import React from 'react';
import '../styles/main.css';
import '../styles/buttons.css';

export default function NeonButton({ text }) {
  return (
    <button className="neon-button">
      {text}
    </button>
  );
}