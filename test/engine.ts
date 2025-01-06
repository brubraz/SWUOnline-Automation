import { NightwatchTests } from "nightwatch";

import { beforeFunc } from "./utils/gamestart";
import { com, p,
    player1Window, player2Window,
    LoadTestGameStateAsync,
} from "./utils/util";

const engine: NightwatchTests = {
    before: beforeFunc,
    'Disconnect: Claim Victory': async () => {
        await LoadTestGameStateAsync('ambush/sabine-ping-shield');
        await browser.window.switchTo(player2Window).refresh();
        await browser.window.close();
        await browser.window.switchTo(player1Window).refresh().pause(20_000);
        await browser.assert.not.elementPresent(com.ClaimVictoryButton);
        await browser.pause(20_000);
        let lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
        await browser.assert.equal(lastLog, 'Player 2, are you still there? Your opponent will be allowed to claim victory in 30 seconds if no activity is detected.');
        await browser.pause(10_000);
        lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
        await browser.assert.equal(lastLog, '5 seconds left, Player 2...');
        await browser.pause(5_000);
        lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
        await browser.assert.equal(lastLog, 'Player 2 has disconnected.');
        await browser.assert.elementPresent(com.ClaimVictoryButton);
    },
}

export default engine;