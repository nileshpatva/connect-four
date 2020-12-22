import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly EMPTY = 'empty';
  readonly PLAYER_ONE = 'red';
  readonly PLAYER_TWO = 'yellow';

  // game board
  board = [];
  rows = 6;
  columns = 7;

  currentPlayer = '';

  /**
   * class constructor method,
   * used to initialize board with value "empty" for each slot
   */
  constructor() {
    this.currentPlayer = this.PLAYER_ONE;

    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        this.board[i][j] = this.EMPTY;
      }
    }
  }
  /**
   * individual slot click event handler
   * @param row row index
   * @param col column index
   */
  slotClicked(row, col) {
    console.log('slot: ', row, col);

    const available = this.getLastAvailableSlot(row, col);
    console.log('available', available);

    this.fillSlot(available, col);
  }
  /**
   * fill the slot with color
   * @param row row index
   * @param col column index
   */
  private fillSlot(row, col) {
    this.board[row][col] = this.currentPlayer;
    this.currentPlayer =
      this.currentPlayer === this.PLAYER_ONE
        ? this.PLAYER_TWO
        : this.PLAYER_ONE;
  }

  /**
   * finds most bottom available slot for fill,
   * if not available returns null
   * @param row row index
   * @param col column index
   */
  getLastAvailableSlot(row, col) {
    for (let i = this.rows - 1; i >= 0; i--) {
      if (this.board[i][col] === this.EMPTY) {
        return i;
      }
    }
    return null;
  }

  ngOnInit() {
    console.log(this.board);
  }
}
