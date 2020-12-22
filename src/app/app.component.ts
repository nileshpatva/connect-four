import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'connect-four';
  // game board
  board = [];
  rows = 6;
  columns = 7;

  readonly EMPTY = 'empty';
  readonly PLAYER_ONE = 'red';
  readonly PLAYER_TWO = 'yellow';
  /**
   * class constructor method,
   * used to initialize board with value "empty" for each slot
   */
  constructor() {
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
    this.fillSlot(row, col);
  }
  /**
   * fill the slot with color
   * @param row row index
   * @param col column index
   */
  private fillSlot(row, col) {
    this.board[row][col] = this.PLAYER_ONE;
  }

  ngOnInit() {
    console.log(this.board);
  }
}
