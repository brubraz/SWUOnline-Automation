import { card } from '../utils/cards';
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
      .AddBase(1, card.SOR.ChopperBase)
      .AddLeader(1, card.SOR.SabineLeader)
      .AddBase(2, card.SOR.DagobahSwamp)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddSameResourceTimes(1, card.SOR.Waylay, 1, 6)
      .AddCardToHand(1, card.SOR.Waylay)
      .AddCardToHand(1, card.SOR.Waylay)
      .AddUnit(2, card.TWI.BattleDroid, 7)
      .AddUnit(2, card.TWI.CloneTrooper, 8)
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