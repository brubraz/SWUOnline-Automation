import { cards } from '../utils/cards';
import { GameState } from '../utils/gamestate';
import {
  com, p,
  player1Window, player2Window,
  gameName
} from '../utils/util';

export const BounceCases = {
  'Bounce: Waylay Tokens': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.DagobahSwamp)
      .AddLeader(2, cards.SOR.SabineLeader)
      .FillResources(1, cards.SOR.Waylay, 6)
      .AddCardToHand(1, cards.SOR.Waylay)
      .AddCardToHand(1, cards.SOR.Waylay)
      .AddUnit(2, cards.TWI.BattleDroid)
      .AddUnit(2, cards.TWI.CloneTrooper)
      .FlushAsync(com.BeginTestCallback)
    ;

    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.ClaimButton)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.ClaimButton)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player1Window).refresh()
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.assert.elementPresent(com.TheirDiscardEmpty);
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.not.elementPresent(com.TheirHandDivs);
  },
}