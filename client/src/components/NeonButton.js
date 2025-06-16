import React from 'react';
import '../styles/buttons.css';

export default function NeonButton({
  children,
  text,
  onClick,
  fullWidth = false,
  danger = false,
  disabled = false,
  glowColor = "#ff073a",
  className = ""
}) {
  // Если передан children — игнорируем text
  const content = children ? children : text;

  const classes = [
    'neon-button',
    fullWidth ? 'fullWidth' : '',
    danger ? 'danger-button' : '',
    className
  ].filter(Boolean).join(' ');

  const buttonStyle = {
    borderColor: glowColor,
    color: glowColor,
  };

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {content}
    </button>
  );
}