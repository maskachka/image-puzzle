import React, { Component } from 'react';
import './Board.scss';
import Tile from './Tile';

class Board extends Component {
  renderTile(tile, index) {
    const col = Math.floor(tile.val / this.props.puzzleSize) + 1;
    const row = (tile.val % this.props.puzzleSize) + 1;
    const bgX = -(row - 1) * this.props.tileSize;
    const bgY = -(col - 1) * this.props.tileSize;

    return (
        <Tile
          key={index}
          tileIndex={index}
          tileNumber={tile.val}
          isBlank={tile.isBlank}
          bgImg={this.props.puzzleImg}
          bgPos={bgX + "px " + bgY + "px"}
          tileSize={this.props.tileSize}
          puzzleSize={this.props.puzzleSize}
          onClick={() => this.props.onClick(index, tile)}
        />
    );
  }

  render() {
    return (
      <div
        className="board"
        style={{
          height: (this.props.tileSize * this.props.puzzleSize) + 'px',
          width: (this.props.tileSize * this.props.puzzleSize) + 'px'
        }}
      >
        {this.props.tiles.map((tile, index) => { return this.renderTile(tile, index); })}
      </div>
    );
  }
}

export default Board;
