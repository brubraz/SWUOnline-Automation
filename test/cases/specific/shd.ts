import { card } from '../../utils/cards';
import { GameState, SubcardBuilder } from '../../utils/gamestate';
import {
    com, p,
    LoadTestGameStateAsync,
    player1Window, player2Window,
    customAsserts,
    gameName
} from '../../utils/util';

const LurkingTieGameStateAsync = async function() {
  const gameState = new GameState(gameName);
  await gameState.LoadGameStateLinesAsync();
  await gameState.ResetGameStateLines()
    .AddBase(1, card.SOR.ChopperBase)
    .AddLeader(1, card.SOR.MoffTarkinLeader)
    .AddBase(2, card.SOR.ECL)
    .AddLeader(2, card.SOR.SabineLeader)
    .FillResources(1, card.SOR.CraftySmuggler, 1,3)
    .AddCardToHand(1, card.TWI.SanctioneerShuttle)
    .AddCardToHand(1, card.TWI.EliteP)
    .AddCardToHand(1, card.TWI.MercilessContest)
    .AddCardToHand(1, card.SOR.Waylay)
    .AddCardToHand(2, card.SOR.Waylay)
    .AddUnit(1, card.SHD.LurkingTie, 4)
    .AddUnit(1, card.SHD.LurkingTie, 5)
    .AddUnit(2, card.SHD.LurkingTie, 6)
    .AddUnit(2, card.SOR.Greedo, 7)
    .FlushAsync(com.BeginTestCallback)
  ;
}

export const SpecificSHDCases = process.env.FULL_REGRESSION !== "true" ? {} :{
  'Lurking TIE: avoids enemy capture': async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementPresent(com.EnemySpaceUnit(1));
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Lurking TIE Phantom avoided capture.');
  },
  'Lurking TIE: avoids enemy damage': async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await customAsserts.EnemyUnitDivPieceIsOverlay(browser, 'SPACE', 1, 3);
  },
  'Lurking TIE: defeats (merciless contest)': async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(3))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllySpaceUnit(1))
    ;

    await browser.window.switchTo(player1Window).refresh();
    //assert
    await browser.assert.not.elementPresent(com.AllySpaceUnit(2));
    await browser.assert.elementPresent(com.EnemySpaceUnit(1));
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Lurking TIE Phantom cannot be defeated by enemy card effects.');
  },
  'Lurking TIE: damaged by self': process.env.FULL_REGRESSION !== "true" ? '' : async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.UnitDivPiece(com.AllySpaceUnit(1), 3), '1');
  },
  'Lurking TIE: bounced by enemy': async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(4))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.EnemySpaceUnit(1));
    await browser.assert.elementsCount(com.TheirHandDivs, 2);
  },
  'Lurking TIE: bounced by self': process.env.FULL_REGRESSION !== "true" ? '' : async function() {
    //arrange
    await LurkingTieGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(4))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.AllySpaceUnit(2));
    await browser.assert.elementsCount(com.MyHandDivs, 4);
  },
  'Snoke wipes non-leaders and token units': async function() {
    //arrange
    const gameState = new GameState(gameName);
    const asajjLeaderPilot = new SubcardBuilder().AddUpgrade(card.JTL.AsajjLeaderUnit, 2, true).Build();
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SHD.RemnantScienceFacility)
      .AddLeader(1, card.SHD.CadBaneLeader)
      .AddBase(2, card.SHD.RemnantScienceFacility)
      .AddLeader(2, card.SOR.SabineLeader, true)
      .FillResources(1, card.SOR.CraftySmuggler, 1, 8)
      .AddCardToHand(1, card.SHD.Snoke)
      .AddUnit(2, card.SOR.TieLnFighter, 9, true, 3, asajjLeaderPilot)
      .AddUnit(2, card.TWI.CloneTrooper, 10)
      .AddUnit(2, card.TWI.BattleDroid, 11)
      .AddUnit(2, card.SOR.SabineLeaderUnit, 12, true, 3)
      .AddUnit(2, card.TWI.WTTradeOfficial, 13, true, 1)
      .FlushAsync(com.BeginTestCallback)
    ;
    //pre-assert
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemySpaceUnit(1), 1), 'ASAJJ VENTRESS I WORK ALONE');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemySpaceUnit(1), 4), '3');
    await customAsserts.EnemyUnitDivPieceIsOverlay(browser, 'GROUND', 1, 3);
    await customAsserts.EnemyUnitDivPieceIsOverlay(browser, 'GROUND', 2, 3);
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(3), 3), '3');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(4), 3), '1');
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementPresent(com.EnemySpaceUnit(1));
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(2));
  }
}