import { card } from '../utils/cards';
import { GameState, SubcardBuilder } from '../utils/gamestate';
import {
  com, src, p,
  LoadTestGameStateAsync,
  player1Window, player2Window,
  gameName
} from '../utils/util';

export const DamageCases = {
  'Overwhelming Barrage pings simultaneously': async function () {
    //arrange
    const gameState = new GameState(gameName);
    const threeXpTokens = new SubcardBuilder().AddExperience(1,3).Build();
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.TWI.LairOfGrievous)
      .AddLeader(1, card.SHD.BosskLeader)
      .AddBase(2, card.SOR.ECL)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddSameResourceTimes(1, card.SOR.BattlefieldMarine, 1, 5)
      .AddCardToHand(1, card.SOR.OverwhelmingBarrage)
      .AddUnit(1, card.SOR.DeathStarStormTrooper, 6, true, 0, threeXpTokens)
      .AddUnit(1, card.SOR.DeathStarStormTrooper, 7)
      .AddUnit(2, card.TWI.Malevolence, 8, true, 3)
      .AddUnit(2, card.SOR.SLT, 9)
      .AddUnit(2, card.TWI.WartimeTradeOfficial, 10)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.Checkbox(2)).pause(p.CheckBox)
      .click(com.Checkbox(3)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(4)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .assert.textEquals(com.TheirResources, '0/0')
      .assert.not.elementPresent(com.EnemyGroundUnit(1))
      //when defeated triggers after damage
      .click(com.ButtonInputChoice(5)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.PassButton).pause(p.ButtonPress)
    ;
    //assert
    await browser
      .assert.textEquals(com.TheirResources, '1/1')
      .assert.elementPresent(com.EnemyGroundUnit(1))
      .assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 1), '1')
      .assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 2), '1')
      .assert.not.elementPresent(com.EnemyGroundUnit(2))
      .assert.not.elementPresent(com.EnemySpaceUnit(1))
    ;
  }
}