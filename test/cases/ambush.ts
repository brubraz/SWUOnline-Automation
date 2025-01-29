import { card } from '../utils/cards';
import { GameState, SubcardBuilder } from '../utils/gamestate';
import {
  com, p,
  LoadTestGameStateAsync,
  player1Window, player2Window,
  gameName
} from '../utils/util';

export const AmbushCases = {
  'Ambush: ECL Sabine Ping Shield': async function () {
  //arrange
  const gameState = new GameState(gameName);
  const craftySmugglerShield = new SubcardBuilder().AddShield(2).Build();
  await gameState.LoadGameStateLinesAsync();
  await gameState.ResetGameStateLines()
    .AddBase(1, card.SOR.ECL)
    .AddLeader(1, card.SOR.SabineLeader)
    .AddBase(2, card.SOR.ECL)
    .AddLeader(2, card.SOR.SabineLeader)
    .AddSameResourceTimes(1, card.SOR.BattlefieldMarine, 1, 2)
    .AddCardToHand(1, card.SOR.SabineUnit)
    .AddUnit(1, card.SOR.SabineUnit, 3, false)
    .AddUnit(2, card.SOR.CraftySmuggler, 4, true, 0, craftySmugglerShield)
    .FlushAsync(com.BeginTestCallback)
  ;
  //act
  await browser
    .waitForElementPresent(com.MyHand)
    .moveToElement(com.GameChat, 0, 0).pause(p.Move)
    .click(com.Base(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
    .click(com.HandCard(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    .click(com.AllyGroundUnit(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    .click(com.YesNoButton("YES")).pause(p.ButtonPress)
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
    .click(com.EnemyGroundUnit(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
  ;
  //assert
  await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
  await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '2');
  },
  'Ambush: Rukh into Krayt Dragon with ECL': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ECL)
      .AddLeader(1, card.SOR.MoffTarkinLeader)
      .AddBase(2, card.SOR.KestroCity)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddSameResourceTimes(1, card.SOR.BattlefieldMarine, 1, 5)
      .AddCardToHand(1, card.SOR.Rukh)
      .AddUnit(2, card.SHD.KraytDragon, 6)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.TriggerLayerButton(1)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.TriggerLayerButton(3)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .click(com.YesNoButton("YES")).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.AllyGroundUnit(1));
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 3), '5');
  },
  'Ambush: Rukh into Krayt Dragon with TI': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ECL)
      .AddLeader(1, card.SOR.MoffTarkinLeader)
      .AddBase(2, card.SOR.KestroCity)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddSameResourceTimes(1, card.SOR.BattlefieldMarine, 1, 6)
      .AddCardToHand(1, card.SOR.Rukh)
      .AddCardToHand(1, card.SHD.TimelyIntervention)
      .AddUnit(2, card.SHD.KraytDragon, 7)
      .FlushAsync(com.BeginTestCallback)

    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.TriggerLayerButton(3)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.TriggerLayerButton(2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.TriggerLayerButton(4)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.TriggerLayerButton(3)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .click(com.YesNoButton("YES")).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.PassButton).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.assert.not.elementPresent(com.AllyGroundUnit(1));
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
  },
}