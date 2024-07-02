(function () {
  const SIZE = 40;
  let FPS = 0;
  let frameCount = 0;
  let score;
  let running = false;
  let stop = false;
  let board;
  let snake;
  let food;
  let interval = "";

  const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
  };

  const BLOCK_DIRECTION = {
    [DIRECTION.UP]: DIRECTION.DOWN,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
  };

  init = () => {
    document.querySelector(".game-over").style.display = "none";
    board.clear();
    snake = new Snake([
      [4, 4],
      [4, 5],
      [4, 6],
    ]);
    FPS = 10;
    score = new Score();
  };

  startInterval = () => {
    if (interval) resetInterval();
    interval = setInterval(run, 1000 / FPS);
  };

  resetInterval = () => {
    clearInterval(interval);
  };

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(DIRECTION.UP);
        break;
      case "ArrowRight":
        snake.changeDirection(DIRECTION.RIGHT);
        break;
      case "ArrowDown":
        snake.changeDirection(DIRECTION.DOWN);
        break;
      case "ArrowLeft":
        snake.changeDirection(DIRECTION.LEFT);
        break;
      case "s":
      case "S":
        if (!running) {
          init();
          startInterval();
          food = new Food();
          running = true;
        }
        break;
      case "p":
      case "P":
        stop = !stop;
        stop ? resetInterval() : startInterval();
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }

    setBgTableItem(x, y, color) {
      document.querySelector(
        `#board tr:nth-child(${y + 1}) td:nth-child(${x + 1})`
      ).style.backgroundColor = color;
    }

    clear() {
      for (let i = 0; i < SIZE; i++)
        for (let j = 0; j < SIZE; j++) this.setBgTableItem(i, j, board.color);
    }
  }

  class Score {
    constructor() {
      this.score = 0;
      this.scoreElement = document.querySelector(".score");
      this.updateScore(0);
    }

    updateScore(points) {
      this.score += points;
      this.scoreElement.innerText = `Score: ${this.score
        .toString()
        .padStart(5, "0")}`;
    }
  }

  class Food {
    constructor() {
      this.position = this.getRandomPosition();
      this.color = this.getRandomColor();
      board.setBgTableItem(this.position.x, this.position.y, this.color);
    }

    getRandomPosition() {
      return { x: this.random(), y: this.random() };
    }

    random() {
      return Math.floor(Math.random() * SIZE);
    }

    getRandomColor() {
      const blackProbability = 2 / 3;
      const rand = Math.random();
      return rand < blackProbability ? "black" : "red";
    }

    foodIsEaten() {
      const [y, x] = snake.body[snake.getLength()];
      return y === this.position.y && x === this.position.x;
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = DIRECTION.RIGHT;
      for (const [y, x] of this.body) board.setBgTableItem(x, y, this.color);
    }

    walk() {
      const [y, x] = this.body[this.getLength()];
      let head;
      switch (this.direction) {
        case DIRECTION.UP:
          head = { y: y - 1, x };
          break;
        case DIRECTION.RIGHT:
          head = { y, x: x + 1 };
          break;
        case DIRECTION.DOWN:
          head = { y: y + 1, x };
          break;
        case DIRECTION.LEFT:
          head = { y, x: x - 1 };
          break;
        default:
          break;
      }
      this.body.push(Object.values(head));
      const [oldY, oldX] = this.body.shift();
      board.setBgTableItem(head.x, head.y, this.color);
      board.setBgTableItem(oldX, oldY, board.color);
    }

    getLength() {
      return this.body.length - 1;
    }

    changeDirection(direction) {
      if (direction === BLOCK_DIRECTION[this.direction]) return;
      this.direction = direction;
    }

    growUp() {
      const [y, x] = this.body[0];
      this.body.unshift([y, x]);
    }

    bodyCollision() {
      const [y, x] = this.body[this.getLength()];
      for (let i = 0; i < this.getLength(); i++)
        if (y === this.body[i][0] && x === this.body[i][1]) return true;
      return false;
    }

    boardCollision = () => {
      const [y, x] = this.body[this.getLength()];
      return y < 0 || y >= SIZE || x < 0 || x >= SIZE;
    };
  }

  run = () => {
    if (snake.boardCollision() || snake.bodyCollision()) {
      collided();
      return;
    }
    if (food.foodIsEaten()) {
      snake.growUp();
      score.updateScore(food.color === "black" ? 1 : 2);
      food = new Food();
    }
    snake.walk();
    difficulty();
  };

  collided = () => {
    resetInterval();
    document.querySelector(".game-over").style.display = "block";
    running = false;
  };

  difficulty = () => {
    if (frameCount < 60) {
      frameCount++;
      return;
    }
    frameCount = 0;
    FPS++;
    startInterval();
  };

  board = new Board(SIZE);
  score = new Score();
  init();
})();
