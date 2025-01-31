import { NightwatchTests } from "nightwatch";

import { init } from "./utils/gamestart";
import { com, p,
  player1Window, player2Window,
  gameName,
} from "./utils/util";
import { GameState } from "./utils/gamestate";
import { cards } from "./utils/cards";

const engine: NightwatchTests = {
  before: init,
  'Disconnect: Claim Victory': async () => {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SOR.ECL)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.SabineLeader)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.window.switchTo(player2Window).refresh();
    await browser.window.close();
    await browser.window.switchTo(player1Window).refresh().pause(10e3);
    await browser.assert.not.elementPresent(com.ClaimVictoryButton);
    await browser.moveToElement(com.GameChat, 0, 0).pause(25e3)
    let lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Karabot: Player 2, are you still there? Your opponent will be allowed to claim victory in 30 seconds if no activity is detected.');
    await browser.moveToElement(com.GameChat, 0, 0).pause(p.Move).click(com.PassButton);
    await browser.pause(25e3);
    lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Karabot: 5 seconds left, Player 2...');
    await browser.moveToElement(com.GameChat, 0, 0).pause(p.Move);
    await browser.pause(5e3);
    lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Player 2 has disconnected.');
    await browser.assert.elementPresent(com.ClaimVictoryButton);
  },
}

export default engine;