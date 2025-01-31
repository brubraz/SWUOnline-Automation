import { cards } from '../utils/cards';
import { GameState, SubcardBuilder } from '../utils/gamestate';
import {
  com, p,
  player1Window, player2Window,
  gameName
} from '../utils/util';

export const BoardWipeCases = {
  'Iden Versio Leader Unit SLB': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 9")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.IdenLeader, true)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.KrennicLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 8)
      .AddCardToHand(1, cards.SOR.SLB)
      .AddUnit(1, cards.SOR.IdenLeaderUnit, 9)
      .AddUnit(2, cards.SOR.DSStormTrooper, 10)
      .AddUnit(2, cards.SOR.TieLnFighter, 11)
      .AddUnit(2, cards.SOR.DSStormTrooper, 12)
      .AddUnit(2, cards.SOR.TieLnFighter, 13)
      .AddUnit(2, cards.SOR.AdmiralAckbar, 14, true, 0, `${cards.SHD.TopTarget},1,0`)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.MyBaseDamage, '15');
    await browser.assert.textEquals(com.TheirBaseDamage, '9');
  },
  'Iden Versio Leader Unit SLB Two Idens': process.env.FULL_REGRESSION !== 'true' ? '' : async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 20")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.IdenLeader, true)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.IdenLeader, true)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 8)
      .AddCardToHand(1, cards.SOR.SLB)
      .AddUnit(1, cards.SOR.IdenLeaderUnit, 9)
      .AddUnit(1, cards.SOR.DSStormTrooper, 10)
      .AddUnit(2, cards.SOR.DSStormTrooper, 12)
      .AddUnit(2, cards.SOR.TieLnFighter, 13)
      .AddUnit(2, cards.SOR.IdenLeaderUnit, 14, true, 0, `${cards.SHD.TopTarget},1,0`)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.MyBaseDamage, '17');
    await browser.assert.textEquals(com.TheirBaseDamage, '18');
  },
  'Iden Versio Leader Unit Christophsis': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 9")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.IdenLeader, true)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.KrennicLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 15)
      .AddCardToHand(1, cards.TWI.Christophsis)
      .AddUnit(1, cards.SOR.IdenLeaderUnit, 16)
      .AddUnit(2, cards.SOR.DSStormTrooper, 17)
      .AddUnit(2, cards.SOR.TieLnFighter, 18)
      .AddUnit(2, cards.SOR.DSStormTrooper, 19)
      .AddUnit(2, cards.SOR.TieLnFighter, 20)
      .AddUnit(2, cards.SOR.AdmiralAckbar, 21, true, 0, `${cards.SHD.TopTarget},1,0`)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.MyBaseDamage, '15');
    await browser.assert.textEquals(com.TheirBaseDamage, '9');
  },
  'Iden Versio Leader Unit Christophsis Two Idens': process.env.FULL_REGRESSION !== 'true' ? '' : async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 20")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.IdenLeader, true)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.IdenLeader, true)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 15)
      .AddCardToHand(1, cards.TWI.Christophsis)
      .AddUnit(1, cards.SOR.IdenLeaderUnit, 16)
      .AddUnit(1, cards.SOR.DSStormTrooper, 17)
      .AddUnit(2, cards.SOR.DSStormTrooper, 18)
      .AddUnit(2, cards.SOR.TieLnFighter, 19)
      .AddUnit(2, cards.SOR.IdenLeaderUnit, 20, true, 0, `${cards.SHD.TopTarget},1,0`)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.MyBaseDamage, '17');
    await browser.assert.textEquals(com.TheirBaseDamage, '20');
  },
  'Gideon Hask gives XP to rescued captive': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 9")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.KrennicLeader)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.KrennicLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 8)
      .AddCardToHand(1, cards.SOR.SLB)
      .AddUnit(1, cards.SOR.DSStormTrooper, 9)
      .AddUnit(1, cards.SOR.GideonHask, 10)
      .AddUnit(2, cards.SOR.DSStormTrooper, 11)
      .AddUnit(2, cards.SOR.TieLnFighter, 12, true, 0,
        new SubcardBuilder().AddCaptive(cards.SOR.CraftySmuggler, 1).Build())
      .AddUnit(2, cards.SOR.AdmiralAckbar, 15, true, 0,
        new SubcardBuilder().AddUpgrade(cards.SHD.TopTarget, 1).Build())
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 2), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 4), '5');
  },
  'Two Gideon Hasks give XP to rescued captives': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .SetBasesDamage("26 9")
      .AddBase(1, cards.SOR.DagobahSwamp)
      .AddLeader(1, cards.SOR.KrennicLeader)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.KrennicLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 1, 8)
      .AddCardToHand(1, cards.SOR.SLB)
      .AddUnit(1, cards.SOR.DSStormTrooper, 9)
      .AddUnit(1, cards.SOR.GideonHask, 10)
      .AddUnit(1, cards.SOR.DarthVader, 11, true, 0,
        new SubcardBuilder().AddCaptive(cards.SOR.BFMarine, 2).Build())
      .AddUnit(2, cards.SOR.DSStormTrooper, 12)
      .AddUnit(2, cards.SOR.TieLnFighter, 13, true, 0,
        new SubcardBuilder().AddCaptive(cards.SOR.CraftySmuggler, 1).Build())
      .AddUnit(2, cards.SOR.AdmiralAckbar, 14, true, 0,
        new SubcardBuilder().AddUpgrade(cards.SHD.TopTarget, 1).Build())
      .AddUnit(2, cards.SOR.GideonHask, 15)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.PassButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.Base(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.TheirBaseDamage, '20');
    await browser.assert.textEquals(com.MyBaseDamage, '9');

    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 2), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 4), '6');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 1), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 2), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 3), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 4), 'EXPERIENCE');
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 5), '6');
  }
}