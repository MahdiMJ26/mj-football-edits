```javascript
// اطلاعات بازیکن‌ها
const players = {
    "messi.html": {
        name: "EDIT MESSI",
        description: "EDIT MESSI"
    },
    "ronaldo.html": {
        name: "EDIT RONALDO",
        description: "EDIT RONALDO"
    },
    "mbappe.html": {
        name: "EDIT MBAPPE",
        description: "EDIT MBAPPE"
    },
    "neymar.html": {
        name: "EDIT NEYMAR",
        description: "EDIT NEYMAR"
    },
    "haaland.html": {
        name: "EDIT HAALAND",
        description: "EDIT HAALAND"
    },
    "bellingham.html": {
        name: "EDIT BELLINGHAM",
        description: "EDIT BELLINGHAM"
    }
};

// تشخیص صفحه‌ی فعلی
const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

const player = players[currentFile];

// نمایش اطلاعات بازیکن
if (player) {
    document.title = player.name + " | MJ FOOTBALL EDITS";

    const playerName = document.getElementById("player-name");
    const playerDescription = document.getElementById("player-description");

    if (playerName) {
        playerName.textContent = player.name;
    }

    if (playerDescription) {
        playerDescription.textContent = player.description;
    }
}

// لودینگ صفحه‌ی اصلی
document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("intro");

    if (intro) {
        setTimeout(function () {
            intro.classList.add("hide");
        }, 5000);
    }
});
```