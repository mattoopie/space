import {getSpace} from "../index";

export function setupSettingsHandlers() {
    const settings = document.getElementById("settings");
    if (settings) {
        document.body.onclick = () => {
            settings.hidden = !settings.hidden;
            loadSettings();
        };
        settings.onclick = (event) => event.stopImmediatePropagation();
        const settingsForm = document.getElementById("settingsForm");
        if (settingsForm) {
            settingsForm.onsubmit = (event) => {
                event.preventDefault();
                saveSettings();
                settings.hidden = !settings.hidden;
            }
        }
    }
}

function loadSettings() {
    loadMeteorColorInput();
    loadNumberOfMeteorsInput();
    loadMeteorSpeedInput();
    loadSpaceColorInput();
}

function loadMeteorColorInput() {
    const meteorColorInput = <HTMLInputElement>document.getElementById("meteorcolor");
    if (meteorColorInput) {
        let color = getSpace().getSettings().meteorColor.toString(16);
        if (color.charAt(0) !== '#') {
            color = '#' + color;
        }
        if (color.length !== 7) {
            color = '#FFFFFF'
        }
        meteorColorInput.value = color;
    }
}

function loadNumberOfMeteorsInput() {
    const numberOfMeteorsInput = <HTMLInputElement>document.getElementById("numberofmeteors");
    if (numberOfMeteorsInput) {
        numberOfMeteorsInput.value = getSpace().getSettings().numberOfMeteors.toString();
    }
}

function loadMeteorSpeedInput() {
    const meteorSpeedInput = <HTMLInputElement>document.getElementById("meteorspeed");
    if (meteorSpeedInput) {
        meteorSpeedInput.value = getSpace().getSettings().meteorSpeed.toString();
    }
}

function loadSpaceColorInput() {
    const spaceColorInput = <HTMLInputElement>document.getElementById("spacecolor");
    if (spaceColorInput) {
        let color = getSpace().getSettings().spaceColor.toString(16);
        if (color.charAt(0) !== '#') {
            color = '#' + color;
        }
        if (color.length !== 7) {
            color = '#000000'
        }
        spaceColorInput.value = color;
    }
}

function saveSettings() {
    const settings = new SpaceSettings(
        getMeteorColor(),
        getNumberOfMeteors(),
        getMeteorSpeed(),
        getSpaceColor()
    );
    const space = getSpace();
    space.useSettings(settings);
}

function getMeteorColor(): number {
    const meteorColorInput = <HTMLInputElement>document.getElementById("meteorcolor");
    if (meteorColorInput) {
        return <number><unknown>meteorColorInput.value;
    }
    return 0xffffff;
}

function getNumberOfMeteors(): number {
    const numberOfMeteorsInput = <HTMLInputElement>document.getElementById("numberofmeteors");
    if (numberOfMeteorsInput) {
        return parseInt(numberOfMeteorsInput.value);
    }
    return 100;
}

function getMeteorSpeed(): number {
    const meteorSpeedInput = <HTMLInputElement>document.getElementById("meteorspeed");
    if (meteorSpeedInput) {
        return parseInt(meteorSpeedInput.value);
    }
    return 10;
}

function getSpaceColor(): number {
    const spaceColorInput = <HTMLInputElement>document.getElementById("spacecolor");
    if (spaceColorInput) {
        return <number><unknown>spaceColorInput.value;
    }
    return 0x000000;
}

export class SpaceSettings {
    constructor(public meteorColor: number,
                public numberOfMeteors: number,
                public meteorSpeed: number,
                public spaceColor: number) {
    }
}