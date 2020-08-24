const rows = 160;
const cols = 350;
let playing = false;

let state = new Array(rows);
let nextState = new Array(rows);

let timer;
let delayTime = 100;

const initializeState = () => {
  for (let i = 0; i < rows; i++) {
    state[i] = new Array(cols);
    nextState[i] = new Array(cols);
  }
  resetState();
};

const resetState = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      state[i][j] = 0;
      nextState[i][j] = 0;
    }
  }
};

const countNeighbors = (row, col) => {
  let count = 0;
  if (row - 1 >= 0) {
    if (state[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (state[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (state[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (state[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (state[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (state[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (state[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (state[row + 1][col + 1] == 1) count++;
  }

  return count;
};

const applyRules = (row, col) => {
  const numNeighbors = countNeighbors(row, col);
  if (state[row][col] == 1) {
    if (numNeighbors < 2) {
      nextState[row][col] = 0;
    } else if (numNeighbors <= 3) {
      nextState[row][col] = 1;
    } else {
      nextState[row][col] = 0;
    }
  } else if (numNeighbors == 3) {
    nextState[row][col] = 1;
  }
};

const updateState = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      state[i][j] = nextState[i][j];
      nextState[i][j] = 0;
    }
  }
};
const updateView = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(i + "_" + j);
      if (state[i][j] == 1) cell.className = "live";
      else cell.className = "dead";
    }
  }
};
const computeNextState = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  updateState();
  updateView();
};

function handleClick() {
  let classes = this.className;
  const [row, col] = this.id.split("_");
  if (classes === "live") {
    this.className = "dead";
    state[row][col] = 0;
  } else {
    this.className = "live";
    state[row][col] = 1;
  }
}

const createTable = () => {
  const table_container = document.querySelector("#table-container");

  const table = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.id = i + "_" + j;
      cell.className = "dead dsgg";
      cell.onclick = handleClick;
      tr.append(cell);
    }
    table.append(tr);
  }

  table_container.append(table);
};

const play = () => {
  computeNextState();

  if (playing) {
    timer = setTimeout(play, delayTime);
  }
};

const gun = () => {
  if (playing) {
    return;
  }
  clear();
  const ij = [
    { x: 5, y: 1 },
    { x: 5, y: 2 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },

    { x: 3, y: 35 },
    { x: 4, y: 35 },
    { x: 3, y: 36 },
    { x: 4, y: 36 },

    { x: 3, y: 21 },
    { x: 4, y: 21 },
    { x: 5, y: 21 },

    { x: 3, y: 22 },
    { x: 4, y: 22 },
    { x: 5, y: 22 },

    { x: 2, y: 23 },

    { x: 1, y: 25 },
    { x: 2, y: 25 },

    { x: 6, y: 23 },

    { x: 6, y: 25 },
    { x: 7, y: 25 },

    { x: 3, y: 14 },
    { x: 3, y: 13 },
    { x: 4, y: 12 },

    { x: 5, y: 11 },
    { x: 6, y: 11 },
    { x: 7, y: 11 },

    { x: 8, y: 12 },
    { x: 9, y: 13 },
    { x: 9, y: 14 },

    { x: 6, y: 15 },

    { x: 4, y: 16 },
    { x: 8, y: 16 },

    { x: 5, y: 17 },
    { x: 6, y: 17 },
    { x: 7, y: 17 },

    { x: 6, y: 18 },
  ];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 37; j++) {
      const cell = document.getElementById(i + "_" + j);
      ij.forEach((xy) => {
        if (xy.x == i && xy.y == j) {
          cell.className = "live";
          state[i][j] = 1;
        }
      });
    }
  }
  console.log(state);
};
const setup = () => {
  const startButton = document.querySelector("#start");
  startButton.onclick = start;
  const clearButton = document.querySelector("#clear");
  clearButton.onclick = clear;
  const randomButton = document.querySelector("#random");
  randomButton.onclick = random;
  const gunButton = document.querySelector("#gun");
  gunButton.onclick = gun;
};
function start() {
  if (playing) {
    playing = false;
    this.innerHTML = "continue";
    clearTimeout(timer);
  } else {
    playing = true;
    this.innerHTML = "pause";
    play();
  }
}
const clear = () => {
  playing = false;
  const startButton = document.querySelector("#start");
  startButton.innerHTML = "start";

  clearTimeout(timer);

  const cellsList = document.querySelectorAll(".live");
  cellsList.forEach((cell) => {
    cell.className = "dead";
  });

  resetState();
};
const random = () => {
  if (playing) return;
  clear();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(i + "_" + j);
      const liveOrDead = Math.random().toFixed();
      if (liveOrDead == 1) {
        cell.className = "live";
        state[i][j] = 1;
      }
    }
  }
};
document.addEventListener("DOMContentLoaded", () => {
  createTable();
  setup();
  initializeState();
});
