import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly EMPTY = 'empty';
  readonly PLAYER_ONE = 'red';
  readonly PLAYER_TWO = 'yellow';

  // game board
  board = [];
  rows = 6;
  columns = 7;

  currentPlayer = '';
  userMsg = '';
  totalFilledSlots = 0;
  winningSlots = [];
  /**
   * class constructor method,
   * used to initialize board with value "empty" for each slot
   */
  constructor() {
    this.startOrReset();
  }
  /**
   * to initialize or reset the game board and props
   */
  startOrReset() {
    this.currentPlayer = this.PLAYER_ONE;
    this.totalFilledSlots = 0;
    this.winningSlots = [];
    this.userMsg = '';
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
    // console.log('slot: ', row, col);
    if (this.winningSlots.length > 0 || this.checkForDraw()) return;
    this.userMsg = '';

    const available = this.getLastAvailableSlot(row, col);
    // console.log('available', available);
    if (available === null) {
      this.userMsg = 'No more slots available!';
      return;
    }
    this.fillSlot(available, col);
    if (
      this.totalFilledSlots >= 7 &&
      (this.checkHorizontalStreak() ||
        this.checkVerticalStreak() ||
        this.checkDiagonalStreaks())
    ) {
      this.userMsg = `🥇 Winner is ${this.currentPlayer.toUpperCase()} 🥇`;
      console.log(this.winningSlots);
      return;
    }
    if (this.checkForDraw()) {
      this.userMsg = `That's a DRAW!!!`;
      return;
    }
    this.currentPlayer =
      this.currentPlayer === this.PLAYER_ONE
        ? this.PLAYER_TWO
        : this.PLAYER_ONE;
  }
  /**
   * fill the slot with color
   * @param row row index
   * @param col column index
   */
  private fillSlot(row, col) {
    this.board[row][col] = this.currentPlayer;
    this.totalFilledSlots += 1;
  }

  /**
   * finds most bottom available slot for fill,
   * if not available returns null
   * @param row row index
   * @param col column index
   */
  private getLastAvailableSlot(row, col) {
    for (let i = this.rows - 1; i >= 0; i--) {
      if (this.board[i][col] === this.EMPTY) {
        return i;
      }
    }
    return null;
  }
  /**
   * checks four values are same or not and checks if it is not empty
   * @param first first slot value
   * @param second second slot value
   * @param third third slot value
   * @param fourth fourth slot value
   */
  private checkAdjacentColors(first, second, third, fourth) {
    return (
      first !== this.EMPTY &&
      first === second &&
      first === third &&
      first === fourth
    );
  }
  /**
   * Checks the horizontal four adjacent slots
   * if they have same colors, non empty values then returns true
   * else false
   */
  private checkHorizontalStreak() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          this.checkAdjacentColors(
            this.board[row][col],
            this.board[row][col + 1],
            this.board[row][col + 2],
            this.board[row][col + 3]
          )
        ) {
          this.winningSlots = [
            `${row},${col}`,
            `${row},${col + 1}`,
            `${row},${col + 2}`,
            `${row},${col + 3}`,
          ];
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Checks the vertical four adjacent slots
   * if they have same colors, non empty values then returns true
   * else false
   */
  private checkVerticalStreak() {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          this.checkAdjacentColors(
            this.board[row][col],
            this.board[row + 1][col],
            this.board[row + 2][col],
            this.board[row + 3][col]
          )
        ) {
          this.winningSlots = [
            `${row},${col}`,
            `${row + 1},${col}`,
            `${row + 2},${col}`,
            `${row + 3},${col}`,
          ];
          return true;
        }
      }
    }
    return false;
  }
  /**
   * to check whether all the slots are filled or not and
   * winningSlots list is empty or not
   */
  private checkForDraw() {
    return (
      this.totalFilledSlots === this.rows * this.columns &&
      this.winningSlots.length === 0
    );
  }
  /**
   * to check all the combinations of diagonal streaks
   * there are two different ways to check diagonal slot match
   */
  private checkDiagonalStreaks() {
    for (let row = this.rows - 1; row >= 3; row--) {
      /**
       *   | 0 1 2 3 4 5 6
       * --|---------------
       * 0 | # # # # 0 0 0
       * 1 | # # # # # 0 0
       * 2 | # # # # # # 0
       * 3 | 0 # # # # # #
       * 4 | 0 0 # # # # #
       * 5 | 0 0 0 # # # #
       */
      for (let col = this.columns - 1; col >= 3; col--) {
        if (
          this.checkAdjacentColors(
            this.board[row][col],
            this.board[row - 1][col - 1],
            this.board[row - 2][col - 2],
            this.board[row - 3][col - 3]
          )
        ) {
          this.winningSlots = [
            `${row},${col}`,
            `${row - 1},${col - 1}`,
            `${row - 2},${col - 2}`,
            `${row - 3},${col - 3}`,
          ];
          return true;
        }
      }
      /**
       *   | 0 1 2 3 4 5 6
       * --|---------------
       * 0 | 0 0 0 # # # #
       * 1 | 0 0 # # # # #
       * 2 | 0 # # # # # #
       * 3 | # # # # # # 0
       * 4 | # # # # # 0 0
       * 5 | # # # # 0 0 0
       */
      for (let col = 0; col < this.columns - 3; col++) {
        if (
          this.checkAdjacentColors(
            this.board[row][col],
            this.board[row - 1][col + 1],
            this.board[row - 2][col + 2],
            this.board[row - 3][col + 3]
          )
        ) {
          this.winningSlots = [
            `${row},${col}`,
            `${row - 1},${col + 1}`,
            `${row - 2},${col + 2}`,
            `${row - 3},${col + 3}`,
          ];
          return true;
        }
      }
    }
    return false;
  }
}
