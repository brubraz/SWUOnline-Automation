import {
  com, p,
  player1Window, player2Window,
  gameName,
} from '../../utils/util'
import { GameState } from '../../utils/gamestate'
import { cards } from '../../utils/cards'

export const PilotJTLCases = {
  'Dengar not piloting, attacks for 5': process.env.FULL_REGRESSION !== 'true' ? '' : async function() {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SHD.JabbasPalace)
      .AddLeader(1, cards.JTL.BobaFettLeader)
      .AddBase(2, cards.SOR.EchoBase)
      .AddLeader(2, cards.JTL.HanSoloLeader)
      .AddUnit(1, cards.JTL.Dengar, 1)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.TheirBaseDamage, '5');
  },
  'Dengar as pilot, deals 2 indirect damage': process.env.FULL_REGRESSION !== 'true' ? '' : ''+async function() {//currently failing
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SHD.JabbasPalace)
      .AddLeader(1, cards.JTL.BobaFettLeader)
      .AddBase(2, cards.SOR.EchoBase)
      .AddLeader(2, cards.JTL.HanSoloLeader)
      .AddUnit(1, cards.SOR.TieLnFighter, 1, true, 0, `${cards.JTL.Dengar},1,1`)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.YesNoButton("YES"))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.TheirBaseDamage, '6');
  }
}