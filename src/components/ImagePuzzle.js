import React, { Component } from 'react';
import './ImagePuzzle.scss';
import bakfiets from './bakfiets.jpg';
import Board from './Board';
import Example from './Example';
//import Unsplash from 'unsplash-js';
import Axios from 'axios';

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

    //TODO maybe refactor, call instead this.getRandomSolvableTiles()
    let initialTiles = this.getRandomTiles();
    let numAttempts = 0;

    while (numAttempts < 25) {
      if (this.getIsSolvable(initialTiles)) {
        break;
      }

      initialTiles = this.getRandomTiles();
      numAttempts++;
    }

    this.state = {
      initialTiles: initialTiles,
      tiles: initialTiles
    }
    this.tileSize = 150;
    this.puzzleSize = 4;

    //bind 'this'
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.swapTiles = this.swapTiles.bind(this);
  }

  componentDidMount() {
    /**
      const unsplash = new Unsplash({
        applicationId: "d440697ad673817d642a5af99230e6c9950f53f1b32b95b106e5a33ea6fafab8",
        secret: "5d0cfeb4675b39445e268834f1dbc0cbc8e94cf94e8d6d39486b0b883e929bd5",
        callbackUrl: ""
      });
      unsplash.photos.getRandomPhoto({
        width: 600,
        height: 600
      })
      .then(json => {
        console.log(json);
        this.setState({
          image: json.url
        });
      });
    */

    Axios.get('https://api.unsplash.com/photos/random?w=600&h=600&client_id='+Config['unsplash api key']).then((data) => {
      if (data.data.urls) {
        this.setState({
          image: data.data.urls.small
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
          <Board puzzleImg={bakfiets} tiles={this.state.tiles} onClick={(index, value) => this.handleClick(index, value)} tileSize={this.tileSize} puzzleSize={this.puzzleSize} />
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

    neighborTiles = neighborTiles.filter((tile, index) => tile && tile.isBlank);


    if (neighborTiles.length) {
      let targetIndex = this.state.tiles.findIndex((item, i) => item === neighborTiles[0]);
      this.swapTiles(targetIndex, arrayPos);
    }
  }

  /**
   * @method swapTiles swaps src tile with the target tile in the tiles array
   * @param <Tile> src
   * @param <Tile> target
   */
  swapTiles(src, target) {
    let tiles = this.state.tiles.slice();
    const srcTile = tiles[src];

    tiles[src] = tiles[target];
    tiles[target] = srcTile;

    this.setState({tiles: tiles});
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
   * @method getRandomTiles returns an array of 16 object literals of type
   * { val: <Number>, isBlank: <Boolean> }. The objects are randomly ordered by
   * val.
   */
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
        isBlank: el === arr.length - 1
      };
    });

    return arr;
  }
}

export default ImagePuzzle;
