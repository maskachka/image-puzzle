import React, { Component } from 'react';
import bakfiets from './bakfiets.jpg';
import './App.css';

/**
 *
 * What's left:
 * 1. Implement helper functions to get a solvable puzzle
 * 2. Convert numeric tiles into images.
 * 3. Message when the game is won
 * 4. Refactor and modularize code. Are the single file components in React?
 */

function Tile(props) {
  return (
    <div className={'tile ' + (props.isBlank ? 'blank' : '')} onClick={props.onClick}>
      <span className="order">{props.tileIndex}</span>
      {!props.isBlank ? props.tileNumber : ""}
    </div>
  );
}

class Board extends Component {
  renderTile(tile, index) {
    return (
        <Tile key={index} tileIndex={index} tileNumber={tile.val} isBlank={tile.isBlank} onClick={() => this.props.onClick(index, tile)} />
    );
  }

  render() {
    return (
      <div className="board">
        {this.props.tiles.map((tile, index) => { return this.renderTile(tile, index); })}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    let initialTiles = this.getRandomTiles();

    this.state = {
      history: [{
        tiles: initialTiles
      }],
      tiles: initialTiles
    }
  }

  render() {
    return (
      <div className="App">
          <Board tiles={this.state.tiles} onClick={(index, value) => this.handleClick(index, value)} />
      </div>
    );
  }

  handleClick(arrayPos, tile) {
    if (tile.val === 0) {
      return;
    }

    //calculate row / col from arrayPos
    const row = Math.floor(arrayPos / 4) + 1;
    const col = (arrayPos % 4) + 1;

    let neighborTiles = [
      this.getTileAt(row - 1, col),
      this.getTileAt(row + 1, col),
      this.getTileAt(row, col - 1),
      this.getTileAt(row, col + 1)
    ];

    neighborTiles = neighborTiles.filter((tile, index) => tile && tile.isBlank);


    if (neighborTiles.length) {
      let targetIndex = this.state.tiles.findIndex((item, i) => item === neighborTiles[0]);
      this.swapTiles(targetIndex, arrayPos);
    }
  }

  swapTiles(src, target) {
    let tiles = this.state.tiles.slice();
    const srcTile = tiles[src];

    tiles[src] = tiles[target];
    tiles[target] = srcTile;

    this.setState({tiles: tiles});
  }

  getTileAt(row, col) {
    var tile = this.state.tiles.find((el, index) => (Math.floor(index / 4) + 1) === row && ((index % 4) + 1) === col);

    return tile || null;
  }

  getIsSolvable(tiles) {
    const blank = 0;
    const numInversions = this.getNumberOfInversions(tiles, blank);
    const isBlankInEvenRow = this.getIsBlankInEvenRow(tiles, blank);


    /*
     * the blank is on an even row counting from the bottom and number of inversions is odd.
     *
     * the blank is on an odd row counting from the bottom  and number of inversions is even.
     */
  }

  getIsBlankInEvenRow(tiles, blank) {
    //TODO: which row is the blank on
  }

  getNumberOfInversions(tiles, blank) {
    let inversionCnt = 0;

    for (let i = 0; i < tiles.length; i++) {
      if (i < tiles.length &&
          tiles[i] !== blank &&
          tiles[i+1] !== blank && 
          tiles[i] > tiles[i+1]
      ) {
          inversionCnt++;
      }
    }
    return inversionCnt;
  }

  getRandomTiles() {
    let arr = [...new Array(16).keys()];
    let currIndex = arr.length;
    let tempVal;
    let randomIndex;

    while (0 !== currIndex) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;

      tempVal = arr[currIndex];
      arr[currIndex] = arr[randomIndex];
      arr[randomIndex] = tempVal;
    }

    arr.forEach(function (el, i) {
      arr[i] = {
        val: el,
        isBlank: el === 0
      };
    });

    return arr;
  }
}

export default App;
