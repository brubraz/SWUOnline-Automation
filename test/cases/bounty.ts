import { cards } from '../utils/cards';
import { GameState } from '../utils/gamestate';
import {
    com, p,
    player1Window, player2Window,
    gameName
} from '../utils/util';

export const BountyCases = {
  'Bounty: The Client heal': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("12 10")
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.DagobahSwamp)
      .AddLeader(2, cards.SOR.SabineLeader)
      .AddUnit(1, cards.SOR.DSStormTrooper)
      .AddUnit(1, cards.SHD.TheClient)
      .AddUnit(2, cards.SOR.DSStormTrooper)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(1)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.PassButton)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player1Window).refresh()
      .waitForElementPresent(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.MyBaseDamage, '7');
    await browser.assert.textEquals(com.TheirBaseDamage, '10')
  },
  'Bounty: The Client edge case': process.env.FULL_REGRESSION !== "true" ? '' : async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("12 10")
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.DagobahSwamp)
      .AddLeader(2, cards.SOR.SabineLeader)
      .AddUnit(1, cards.SOR.DSStormTrooper)
      .AddUnit(1, cards.SHD.TheClient)
      .AddUnit(2, cards.SOR.DSStormTrooper)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(1)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.TheirBaseDamage, '12')
    await browser.assert.textEquals(com.MyBaseDamage, '5');
  }
}