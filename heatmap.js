document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded"); // Debug message

    const heatmap = document.getElementById("heatmap");
    if (!heatmap) {
        console.error("Heatmap entity not found!");
        return;
    }

    const wifiData = [
        { x: 0, y: 0, z: -2, strength: -50 },
        { x: 1, y: 0, z: -2, strength: -60 },
    ];

    wifiData.forEach(point => {
        const sphere = document.createElement("a-sphere");
        sphere.setAttribute("position", `${point.x} ${point.y} ${point.z}`);
        sphere.setAttribute("color", signalStrengthToColor(point.strength));
        sphere.setAttribute("radius", 0.2);
        heatmap.appendChild(sphere);
    });

    function signalStrengthToColor(strength) {
        const normalized = Math.min(Math.max(strength, -100), 0);
        const greenValue = Math.floor(((normalized + 100) / 100) * 255);
        const redValue = 255 - greenValue;
        return `rgb(${redValue}, ${greenValue}, 0)`;
    }
}); 
