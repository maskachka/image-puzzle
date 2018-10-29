import React from 'react';
import './Tile.scss';

function Tile(props) {
  return (
    <div
      className={'tile' + (props.isBlank ? '--blank' : '')}
      onClick={props.onClick}
      style={!props.isBlank ? {
        backgroundImage: "url(" + props.bgImg + ")",
        backgroundPosition: props.bgPos,
        backgroundSize: (props.tileSize * props.puzzleSize) + 'px '
      } : {}}
    >
      <span className="tile__number">{!props.isBlank ? (props.tileNumber + 1) : ""}</span>
    </div>
  );
}

export default Tile;
