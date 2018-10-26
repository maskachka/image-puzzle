import React from 'react';

function Example(props) {
  return (
    <div className="example">
      <img src={props.exampleSrc} width={props.tileSize * props.puzzleSize} height={props.tileSize * props.puzzleSize} alt="" />
    </div>
  );
}

export default Example;
