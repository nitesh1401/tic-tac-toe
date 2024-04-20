const boxes = document.querySelectorAll(".box");
const playBtn = document.querySelector("#play-btn");
const resetBtn = document.querySelector("#reset-btn");
const winMsgContainer = document.querySelector(".winner-msg-container");
const winner = document.querySelector("#win-msg");
const draw = document.querySelector(".draw");

let turnX = true;
let count = 0;
const winningPattern = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

function showWinner(winVal) {
  winner.innerText = "Congratulations, Winner is " + winVal;
  winMsgContainer.classList.remove('hide');
  disableBoxes();
}

function showDraw() {
  draw.classList.remove("hide");
}

function checkWinner() {
  for (let pattern of winningPattern) {
    const val1 = boxes[pattern[0]].innerText;
    const val2 = boxes[pattern[1]].innerText;
    const val3 = boxes[pattern[2]].innerText;

    if (val1 && val2 && val3) {
      if (val1 === val2 && val1 === val3) {
        showWinner(val1);
        return true;
      } else {
        if (count === 9)
          showDraw();
      }
    }
  }
}

boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (turnX) {
      box.innerText = 'X';
      box.style.color = "#F08A4B"
      turnX = false;
    } else {
      box.innerText = 'O';
      box.style.color = "#F3CA40"
      turnX = true;
    }
    box.disabled = true;
    count++;
    checkWinner();
  });
});

function disableBoxes() {
  for (const box of boxes) {
    box.disabled = true;
  }
}

function enableBoxes() {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

function resetGame() {
  turnX = true;
  count = 0;
  enableBoxes();
  winMsgContainer.classList.add("hide");
  draw.classList.add("hide");
}

playBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
