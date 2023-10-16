const gnomePanel = document.querySelector('.gnome-panel');
const stadiums = document.querySelectorAll('.stadium');

gnomePanel.addEventListener('click', (e) => {
  const stadium = e.target.closest('.stadium');
  if (!stadium || stadium.classList.contains('active')) {
    return;
  }

  const activeStadium = document.querySelector('.active');
  activeStadium.classList.replace('active', 'inactive');
  stadium.classList.replace('inactive', 'active');
});

gnomePanel.addEventListener('wheel', (e) => {
  e.preventDefault();
  const activeStadium = document.querySelector('.active');
  if (!activeStadium) return;

  activeStadium.classList.replace('active', 'inactive');
  const nextStadium = activeStadium.nextElementSibling || stadiums[0];
  nextStadium.classList.replace('inactive', 'active');
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



const getIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP address:", error);
      return null;
    }
  };
  
//   // Call the function to get the IP address
// getIpAddress()
// .then((ipAddress) => {
// if (ipAddress) {
//     // Use the retrieved IP address to make the API request
//     const apiUrl = `http://worldtimeapi.org/api/ip/${ipAddress}`;
//     fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//         const datetime = data.datetime;
//         const parsedDate = new Date(datetime);

//         const options = {
//         month: "short",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//         };

//         const formattedDate = parsedDate.toLocaleString("en-US", options);
//         // remove , after the day and add a space
//         const formattedDateWithoutComma = formattedDate.replace(",", "");

//         // Update the content of the gnome-panel-clock element
//         const gnomePanelClock = document.querySelector(".gnome-panel-clock");
//         if (gnomePanelClock) {
//         gnomePanelClock.textContent = formattedDateWithoutComma;
//         }
//     })
//     .catch((error) => {
//         console.error("Error fetching data:", error);
//     });
// } else {
//     console.error("No IP address retrieved.");
// }
// });

