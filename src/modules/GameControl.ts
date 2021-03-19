import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

export default class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = 'Right';

  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    // console.log(event.key);
    this.direction = event.key;
  }

  eatFood(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }

  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10;
        break;
    }

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (error) {
      alert(error.message + ' GAME OVER.');
      this.isLive = false;
    }

    this.eatFood(X, Y);

    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

}
