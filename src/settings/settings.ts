import {Space} from "../space/space";

export class SpaceSettings {
    constructor(public meteorColor: number,
                public numberOfMeteors: number,
                public meteorSpeed: number,
                public spaceColor: number) {
    }
}

export class SettingsHandler {
    constructor(private space: Space, private settings: SpaceSettings) {
    }

    setupSettingsHandlers() {
        const settings = document.getElementById("settings");
        if (settings) {
            document.body.onclick = () => {
                settings.hidden = !settings.hidden;
                this.loadSettings();
            };
            settings.onclick = (event) => event.stopImmediatePropagation();
            const settingsForm = document.getElementById("settingsForm");
            if (settingsForm) {
                settingsForm.onsubmit = (event) => {
                    event.preventDefault();
                    this.saveSettings();
                    // settings.hidden = true;
                }
            }
        }
    }

    saveSettings() {
        this.settings.meteorColor = this.getColorValue(SettingInputs.METEORCOLOR, 0xffffff);
        this.settings.numberOfMeteors = this.getNumericValue(SettingInputs.NUMBEROFMETEORS, 100);
        this.settings.meteorSpeed = this.getNumericValue(SettingInputs.METEORSPEED, 10);
        this.settings.spaceColor = this.getColorValue(SettingInputs.SPACECOLOR, 0x000000);
        this.space.reloadSettings();
    }

    private getColorValue(inputType: SettingInputs, defaultValue: number): number {
        const input = <HTMLInputElement>document.getElementById(inputType);
        if (input) {
            return <number><unknown>input.value;
        }
        return defaultValue;
    }

    private getNumericValue(inputType: SettingInputs, defaultValue: number): number {
        const input = <HTMLInputElement>document.getElementById(inputType);
        if (input) {
            return parseInt(input.value);
        }
        return defaultValue;
    }

    private loadSettings() {
        this.loadColorValue(SettingInputs.METEORCOLOR, this.space.getSettings().meteorColor, "#FFFFFF");
        this.loadNumericValue(SettingInputs.NUMBEROFMETEORS, this.space.getSettings().numberOfMeteors);
        this.loadNumericValue(SettingInputs.METEORSPEED, this.space.getSettings().meteorSpeed);
        this.loadColorValue(SettingInputs.SPACECOLOR, this.space.getSettings().spaceColor, "#000000");
    }

    private loadColorValue(inputType: SettingInputs, value: number, defaultValue: string) {
        const input = <HTMLInputElement>document.getElementById(inputType);
        if (input) {
            let color = value.toString(16);
            if (color.charAt(0) !== '#') {
                color = '#' + color;
            }
            if (color.length !== 7) {
                color = defaultValue;
            }
            input.value = color;
        }
    }

    private loadNumericValue(inputType: SettingInputs, value: number) {
        const input = <HTMLInputElement>document.getElementById(inputType);
        if (input) {
            input.value = value.toString();
        }
    }
}

enum SettingInputs {
    METEORCOLOR = "meteorcolor",
    NUMBEROFMETEORS = "numberofmeteors",
    METEORSPEED = "meteorspeed",
    SPACECOLOR = "spacecolor"
}