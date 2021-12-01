function updateDisplay() {
    gl.uniform2fv(uniformLights, lights);
    gl.uniform3fv(uniformLightsColor, lightsColor);
    gl.uniform1fv(uniformLightsIntensity, lightsIntensity);
    gl.uniform1i(uniformLightsLength, lights.length / 2);

    gl.uniform4fv(uniformWalls, walls);
    gl.uniform1i(uniformWallsLength, walls.length / 4);
}

function initGUI() {
    const gui = new dat.GUI({ width: 600, enam: 'Propriétés' });

    // dynamically add all scenarios
    var scenarios = {}
    for (let i = 0; i < configs.length; ++i) {
        scenarios['Scénario ' + (i+1)] = i
    }

    let config = gui.add(configuration, 'value', scenarios);

    config.__onChange = changeConfig;

    gui.add(fading, "value", 1, 1000).name("Vitesse d'estompement");

    let folder = gui.addFolder('Propriété prochaine lumière');
    folder.add(lightIntensity, "value", 0, 1000).name("Intensité de la lumière");
    folder.addColor(color, 'value');
    folder.open();

    return gui;
}