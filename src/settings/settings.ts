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
    const meteorColorInput = <HTMLInputElement>document.getElementById("meteorcolor");
    const numberOfMeteorsInput = <HTMLInputElement>document.getElementById("numberofmeteors");
    if (meteorColorInput && numberOfMeteorsInput) {
        let color = getSpace().getSettings().meteorColor.toString(16);
        if (color.charAt(0) !== '#') {
            color = '#' + color;
        }
        meteorColorInput.value = color;
        numberOfMeteorsInput.value = getSpace().getSettings().numberOfMeteors.toString();
    }
}

function saveSettings() {
    const meteorColorInput = <HTMLInputElement>document.getElementById("meteorcolor");
    const numberOfMeteorsInput = <HTMLInputElement>document.getElementById("numberofmeteors");
    if (meteorColorInput && numberOfMeteorsInput) {
        const settings = new SpaceSettings(<number><unknown>numberOfMeteorsInput.value, <number><unknown>meteorColorInput.value);
        const space = getSpace();
        space.useSettings(settings);
    }
}

export class SpaceSettings {
    constructor(public numberOfMeteors: number,
                public meteorColor: number) {
    }
}