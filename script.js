let numRows = 16;
let numCols = 16;
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function createRow() {
  let rowContainer = document.createElement("div");
  rowContainer.classList.add("grid-item");
  rowContainer.addEventListener("mouseover", (e) => {
    let passes = e.target.getAttribute("data-passes");
    let currentColor = e.target.style.backgroundColor;
    if (currentColor == "") {
      e.target.style.backgroundColor = `rgba(${getRandomInt(
        256
      )}, ${getRandomInt(256)}, ${getRandomInt(256)}, 0.1)`;
      e.target.setAttribute("data-passes", `${++passes}`);
    } else {
      if (passes < 10) {
        currentColor = currentColor.slice(0, currentColor.length - 4);
        e.target.style.backgroundColor = currentColor + `${passes / 10})`;
        e.target.setAttribute("data-passes", `${++passes}`);
      }
    }
  });
  return rowContainer;
}

function createCol() {
  let colContainer = document.createElement("div");
  colContainer.classList.add("grid-col");
  for (let i = 0; i < numRows; i++) {
    colContainer.appendChild(createRow());
  }
  return colContainer;
}

function createGrid() {
  const gridDiv = document.getElementById("grid");
  gridDiv.textContent = "";
  for (let i = 0; i < numCols; i++) {
    gridDiv.appendChild(createCol());
  }
}

function resizeCanvas() {
  let rowCount = window.prompt("How many squares per row?");
  let colCount = 0;
  if (!parseInt(rowCount) || parseInt(rowCount) > 100) {
    window.alert("Please Input a whole number under 100.");
  } else {
    colCount = window.prompt("How many squares per column?");
    if (!parseInt(colCount) || parseInt(colCount) > 100) {
      window.alert("Please Input a whole number under 100.");
    } else {
      console.log(`resizing with ${rowCount} rows & ${colCount} cols`);
      numRows = parseInt(rowCount);
      numCols = parseInt(colCount);
      createGrid();
    }
  }
}

document
  .getElementById("resizeBtn")
  .addEventListener("click", () => resizeCanvas());

createGrid();
