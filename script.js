const rows = 24;
const cols = 48;

const initialize = () => {
  createTable();
};

function handleClick() {
  var classes = this.className;
  if (classes === "live") {
    this.className = "dead";
  } else {
    this.className = "live";
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

document.addEventListener("DOMContentLoaded", () => {
  createTable();
});
