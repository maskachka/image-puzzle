import React, { Component } from 'react';
import './ImagePuzzle.scss';
import bakfiets from './bakfiets.jpg';
import Board from './Board';
import Example from './Example';
//import Unsplash from 'unsplash-js';
import Axios from 'axios';

//get api key 
let Config = require('Config');

/**
 *
 * What's left:
 * 3. Message when the game is won
 * 4. Refactor and modularize code. Are the single file components in React?
 * 5. Looks like components need to move into their own individual files under src/components
 * 6. What are containers vs components?
 * 8. store unsplash api keys in a separate config file, don't commit to github
 * https://stackoverflow.com/questions/44342276/how-to-push-code-to-github-hiding-the-api-keys
 */

class ImagePuzzle extends Component {

  constructor(props) {
    super(props);

    this.tileSize = 150;
    this.puzzleSize = 4;

    //TODO maybe refactor, call instead this.getRandomSolvableTiles()
    let initialTiles = this.getRandomTiles(this.puzzleSize);
    let numAttempts = 0;

    while (numAttempts < 25) {
      if (this.getIsSolvable(initialTiles)) {
        break;
      }

      initialTiles = this.getRandomTiles(this.puzzleSize);
      numAttempts++;
    }

    this.state = {
      orderedTiles: this.getTileArray(this.puzzleSize * this.puzzleSize),
      tiles: initialTiles,
      isSolved: false
    }

    //bind 'this' - 
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swapTiles = this.swapTiles.bind(this);
  }

  /**
   * @method componentDidMount gets a random image from Unsplash and use it for
   * the puzzle background.
   */
  componentDidMount() {
    /**
     * TODO: got response type CORS when fetching photos via unsplash-js in local env. 
     * 1. Figure out if possible to use unsplash-js in local env.
     * 2. Figure out the whole 'downloading' of image for the purpose of unsplash
     * view counter incrementation.
    */

    Axios.get('https://api.unsplash.com/photos/random?orientation=squarish&w=600&h=600&client_id='+Config['unsplash api key'])
      .then((data) => {
        if (data.data.urls) {
          this.setState({
            image: data.data.urls.regular
          });
        }
      })
      .catch((err) => {
        //default placeholder image
        this.setState({
          image: bakfiets
        });
      });
  }

  render() {
    return (
      <div className="App">
          <p className="App__status">Puzzle status: {this.state.isSolved ? "solved" : "in progress"}</p>
          <Board puzzleImg={this.state.image} tiles={this.state.tiles} onClick={(index, value) => this.handleClick(index, value)} tileSize={this.tileSize} puzzleSize={this.puzzleSize} />
          <Example exampleSrc={this.state.image} tileSize={this.tileSize} puzzleSize={this.puzzleSize} />
      </div>
    );
  }

  handleClick(arrayPos, tile) {
    if (tile.isBlank) {
      return;
    }

    //calculate row / col from arrayPos
    const row = Math.floor(arrayPos / this.puzzleSize) + 1;
    const col = (arrayPos % this.puzzleSize) + 1;

    let neighborTiles = [
      this.getTileAt(row - 1, col),
      this.getTileAt(row + 1, col),
      this.getTileAt(row, col - 1),
      this.getTileAt(row, col + 1)
    ];

    //filter out invalid tiles and the blank tile.
    neighborTiles = neighborTiles.filter((tile, index) => tile && tile.isBlank);


    if (neighborTiles.length) {
      const targetIndex = this.state.tiles.findIndex((item, i) => item === neighborTiles[0]);
      const swappedTiles = this.swapTiles(this.state.tiles.slice(), targetIndex, arrayPos);
      const isPuzzleSolved = this.getIsPuzzleSolved(this.state.orderedTiles, swappedTiles);

      this.setState({
        tiles: swappedTiles,
        isSolved: isPuzzleSolved
      })
    }
  }

  /**
   * @method getIsPuzzleSolved compares ordered array of tiles with current position,
   * returns true if they match (puzzle solved)
   * @return <Boolean>
   */
  getIsPuzzleSolved(initial, current) {
    console.log(initial, current);
    for (let i = 0; i < initial.length; i++) {
      console.log(initial[i].val + " === " + current[i].val);
      if (initial[i].val !== current[i].val) {
        console.log("\tnot equal");
        return false;
      }
    }
    console.log("all equal");
    return true;
  }

  /**
   * @method swapTiles swaps src tile with the target tile in the tiles array
   * @param <Tile> srcIndex
   * @param <Tile> targetIndex
   */
  swapTiles(arr, srcIndex, targetIndex) {
    const srcTile = arr[srcIndex];

    arr[srcIndex] = arr[targetIndex];
    arr[targetIndex] = srcTile;

    return arr;
  }

  /**
   * @method getTileAt returns the tile object located in the specified row,col
   * of the this.puzzleSize x this.puzzleSize board.
   * @param <Number> row
   * @param <Number> col
   * @return <Tile|null>
   */
  getTileAt(row, col) {
    var tile = this.state.tiles.find((el, index) => (Math.floor(index / this.puzzleSize) + 1) === row && ((index % this.puzzleSize) + 1) === col);

    return tile || null;
  }

  /**
   * @method getIsSolvable returns true if the blank tile is in the even row counting
   * from the bottom and number of inversions is odd, or the blank tile is in the
   * odd row counting from the bottom and the number of inversions is even.
   * @param <Array> tiles of tile objects
   * @return <Boolean>
   */
  getIsSolvable(tiles) {
    const numInversions = this.getNumberOfInversions(tiles);
    const isBlankInEvenRow = this.getIsBlankInEvenRow(tiles);

    if (isBlankInEvenRow) {
      if (numInversions % 2 !== 0) {
        return true;
      }
    } else {
      if (numInversions % 2 === 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * @method getIsBlankInEvenRow checks if the blank tile is in the even row of a
   * this.puzzleSize x this.puzzleSize board, counting from the bottom.
   * @return <Boolean>
   */
  getIsBlankInEvenRow(tiles) {
    const blankIndex = tiles.findIndex((item, index) => item.isBlank);
    const blankRow = Math.floor(blankIndex / this.puzzleSize) + 1;

    //counting even/odd rows from the bottom reverses result
    return !(blankRow % 2 === 0);
  }

  /**
   * @method getNumberOfInversions calculates number of tile pairs out of order
   */
  getNumberOfInversions(tiles) {
    let inversionCnt = 0;

    for (let i = 0; i < this.puzzleSize * this.puzzleSize - 1; i++) {
      for (let j = i + 1; j < this.puzzleSize * this.puzzleSize; j++) {
        if (!tiles[j].isBlank && !tiles[i].isBlank && tiles[i].val > tiles[j].val) {
          inversionCnt++;
        }
      }
    }
    return inversionCnt;
  }

  /**
   * @method getTileArray returns an array of game tile objects. Helper function.
   */
  getTileArray(arrLen) {
    return Array.from([...new Array(arrLen).keys()], x => ({ val: x, isBlank: x === arrLen - 1 }));
  }

  /**
   * @method getRandomTiles returns an array of 16 object literals of type
   * { val: <Number>, isBlank: <Boolean> }. The objects are randomly ordered by
   * val.
   */
  getRandomTiles(puzzleSize) {
    const arrLen = puzzleSize * puzzleSize;
    let arr = this.getTileArray(arrLen);
    let currIndex = arrLen;
    let tempVal;
    let randomIndex;

    //randomize order of tiles
    while (0 !== currIndex) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex -= 1;

      tempVal = arr[currIndex];
      arr[currIndex] = arr[randomIndex];
      arr[randomIndex] = tempVal;
    }

    return arr;
  }
}

export default ImagePuzzle;
