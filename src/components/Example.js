import React from 'react';

function Example(props) {
  return (
    <div
      className="example"
      style={{
        backgroundImage: "url(" + props.exampleSrc + ")",
        backgroundSize: (props.tileSize * props.puzzleSize * .5) + 'px',
        height: (props.tileSize * props.puzzleSize * .5) + 'px',
        width: (props.tileSize * props.puzzleSize * .5) + 'px'
      }}
    >
    </div>
  );
}

export default Example;
