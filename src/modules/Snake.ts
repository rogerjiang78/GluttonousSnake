export default class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  snakeElement: HTMLElement;

  constructor() {
    this.snakeElement = document.getElementById('snake')!;
    this.head = document.querySelector('#snake>div') as HTMLElement;
    this.bodies = this.snakeElement.getElementsByTagName('div');
  }

  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  set X(x) {
    if (this.X === x) {
      return;
    }
    if (x < 0 || x > 290) {
      throw new Error('snake hit the Wall!');
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === x) {
      if (x > this.X) {
         x = this.X - 10
      } else {
        x = this.X + 10
      }
    }
    this.moveBody();
    this.head.style.left = x + 'px';
    this.checkHead();
  }

  set Y(y) {
    if (this.Y === y) {
      return;
    }
    if (y < 0 || y > 290) {
      throw new Error('Snake hit the Wall!');
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === y) {
      if (y > this.Y) {
         y = this.Y - 10
      } else {
        y = this.Y + 10
      }
    }
    this.moveBody();
    this.head.style.top = y + 'px';
    this.checkHead();
  }

  addBody() {
    // this.snakeElement.insertAdjacentHTML('beforeend', '<div></div>');
    const elem = document.createElement('div');
    this.snakeElement.appendChild(elem);
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkHead() {
    for(let i=1; i<this.bodies.length; i++) {
      if (this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y === (this.bodies[i] as HTMLElement).offsetTop) {
        throw new Error('Hit the body!')
      }
    }
  }
}
