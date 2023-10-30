const gnomePanel = document.querySelector(".gnome-panel");
const stadiums = document.querySelectorAll(".stadium");

gnomePanel.addEventListener("click", (e) => {
  const stadium = e.target.closest(".stadium");
  if (!stadium || stadium.classList.contains("active")) {
    return;
  }

  const activeStadium = document.querySelector(".active");
  activeStadium.classList.replace("active", "inactive");
  stadium.classList.replace("inactive", "active");
});

gnomePanel.addEventListener("wheel", (e) => {
  e.preventDefault();
  const activeStadium = document.querySelector(".active");
  if (!activeStadium) return;

  activeStadium.classList.replace("active", "inactive");
  const nextStadium = activeStadium.nextElementSibling || stadiums[0];
  nextStadium.classList.replace("inactive", "active");
});

let isTerminalOpen = false;

function openTerminalWindow() {
  isTerminalOpen = !isTerminalOpen;
  const customTerminal = document.getElementById("draggable-custom-terminal");
  customTerminal.style.display = isTerminalOpen ? "block" : "none";
  toggleTerminal();
}

function closeTerminalWindow() {
  const customTerminal = document.getElementById("draggable-custom-terminal");
  customTerminal.style.display = "none";
}

let offsetX,
  offsetY,
  isDragging = false;

function dragWindow(e) {
  if (e.target.classList.contains("terminal-header")) {
    isDragging = true;
    const customTerminal = document.getElementById("draggable-custom-terminal");
    offsetX = e.clientX - customTerminal.getBoundingClientRect().left;
    offsetY = e.clientY - customTerminal.getBoundingClientRect().top;
  }
}

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const customTerminal = document.getElementById("draggable-custom-terminal");
    customTerminal.style.left = e.clientX - offsetX + "px";
    customTerminal.style.top = e.clientY - offsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

const currentDate = new Date();
const clock = document.querySelector(".gnome-panel-clock");
const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    };



const locale = navigator.language;
const formattedDate = new Intl.DateTimeFormat(locale, options).format(currentDate);
clock.innerHTML = formattedDate;
