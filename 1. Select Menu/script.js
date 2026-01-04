    const dropdown = document.getElementById("dropdown");
    const arrow = document.getElementById("arrow");
    const output = document.getElementById("output");

    function toggleMenu() {
        dropdown.classList.toggle("active");
        arrow.classList.toggle("rotate");
    }

    function selectPlatform(name) {
        output.textContent = "Selected: " + name;
        console.log("User selected:", name);
        dropdown.classList.remove("active");
        arrow.classList.remove("rotate");
    }