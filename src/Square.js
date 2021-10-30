import React from 'react';

export default function Square( { pos, display, sendToParent } ){

  return (
    <button
      className="square"
      onClick={() => sendToParent(pos)}
    >
      {display}
    </button>
  );
}