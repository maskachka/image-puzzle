import React from 'react';
import ReactDOM from 'react-dom';
import ImagePuzzle from './components/ImagePuzzle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImagePuzzle />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('count inversions', () => {
  const div = document.createElement('div');

  const ref = ReactDOM.render(<ImagePuzzle />, div);

  test('reports 3 inversions when there are 3 inversions in the tiles', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 13, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getNumberOfInversions(tiles)).toBe(3);
  });

  test('reports 1 inversion when there\'s 1 inversion in the tiles', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 2, isBlank: false },
      { val: 1, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getNumberOfInversions(tiles)).toBe(1);
  });

  test('reports 0 inversions when there are 0 inversions in the tiles', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getNumberOfInversions(tiles)).toBe(0);
  });

  test('reports correct inversions when there\'s a blank tile in between the inversion', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 8, isBlank: false },
      { val: 15, isBlank: true },
      { val: 7, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false }
    ];
    expect(ref.getNumberOfInversions(tiles)).toBe(1);
  });

  ReactDOM.unmountComponentAtNode(div);
});

describe('is blank tile in even row', () => {
  const div = document.createElement('div');
  const ref = ReactDOM.render(<ImagePuzzle />, div);

  test('blank tile in odd row from the bottom', () => {
    const tiles = [
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 8, isBlank: false },
      { val: 7, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true },
      { val: 0, isBlank: false }
    ];
    expect(ref.getIsBlankInEvenRow(tiles)).toBe(false);
  });
  test('blank tile in even row from the bottom', () => {
    const tiles = [
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 8, isBlank: false },
      { val: 7, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 15, isBlank: true },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 0, isBlank: false }
    ];
    expect(ref.getIsBlankInEvenRow(tiles)).toBe(true);
  });

  ReactDOM.unmountComponentAtNode(div);
});

describe('is puzzle solvable', () => {
  const div = document.createElement('div');
  const ref = ReactDOM.render(<ImagePuzzle />, div);

  test('puzzle should be solvable (blank in even row, num inversions is odd)', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 3, isBlank: false },
      { val: 4, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 8, isBlank: false },
      { val: 7, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 15, isBlank: true },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false }
    ];
    expect(ref.getIsSolvable(tiles)).toBe(true);
  });
  test('puzzle should be solvable (blank in odd row, num inversions is even)', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 2, isBlank: false },
      { val: 1, isBlank: false },
      { val: 4, isBlank: false },
      { val: 3, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getIsSolvable(tiles)).toBe(true);
  });
  test('puzzle should not be solvable (blank in odd row, num inversions is odd)', () => {
    const tiles = [
      { val: 0, isBlank: false },
      { val: 1, isBlank: false },
      { val: 2, isBlank: false },
      { val: 4, isBlank: false },
      { val: 3, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getIsSolvable(tiles)).toBe(false);
  });
  test('puzzle should not be solvable (blank in even row, num inversions is even)', () => {
    const tiles = [
      { val: 2, isBlank: false },
      { val: 1, isBlank: false },
      { val: 4, isBlank: false },
      { val: 3, isBlank: false },
      { val: 5, isBlank: false },
      { val: 6, isBlank: false },
      { val: 7, isBlank: false },
      { val: 8, isBlank: false },
      { val: 9, isBlank: false },
      { val: 10, isBlank: false },
      { val: 11, isBlank: false },
      { val: 0, isBlank: false },
      { val: 12, isBlank: false },
      { val: 13, isBlank: false },
      { val: 14, isBlank: false },
      { val: 15, isBlank: true }
    ];
    expect(ref.getIsSolvable(tiles)).toBe(false);
  });

  test('solvable #1', () => {
    const tiles = [{"val":9,"isBlank":false},{"val":2,"isBlank":false},{"val":12,"isBlank":false},{"val":7,"isBlank":false},{"val":10,"isBlank":false},{"val":6,"isBlank":false},{"val":8,"isBlank":false},{"val":5,"isBlank":false},{"val":14,"isBlank":false},{"val":11,"isBlank":false},{"val":4,"isBlank":false},{"val":3,"isBlank":false},{"val":13,"isBlank":false},{"val":1,"isBlank":false},{"val":0,"isBlank":false},{"val":15,"isBlank":true}]
    expect(ref.getIsSolvable(tiles)).toBe(true);
  });

  test('solvable?', () => {
    const tiles = [{"val":11,"isBlank":false},{"val":13,"isBlank":false},{"val":10,"isBlank":false},{"val":0,"isBlank":false},{"val":1,"isBlank":false},{"val":2,"isBlank":false},{"val":12,"isBlank":false},{"val":14,"isBlank":false},{"val":9,"isBlank":false},{"val":15,"isBlank":true},{"val":4,"isBlank":false},{"val":8,"isBlank":false},{"val":7,"isBlank":false},{"val":3,"isBlank":false},{"val":6,"isBlank":false},{"val":5,"isBlank":false}];
    expect(ref.getIsSolvable(tiles)).toBe(false);
  })

  ReactDOM.unmountComponentAtNode(div);
});
