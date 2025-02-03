
import { cards } from '../utils/cards';
import { GameState } from '../utils/gamestate';
import {
    com, p,
    player1Window, player2Window,
    gameName
} from '../utils/util';

export const LeaderUnitTWICases = {
    'Leader Unit: Nala Se TWI Ignore Aspect': async function () {
      //arrange
      const gameState = new GameState(gameName);
      await gameState.LoadGameStateLinesAsync();
      await gameState.ResetGameStateLines()
        .AddBase(1, cards.SOR.ECL)
        .AddLeader(1, cards.TWI.NalaSeLeader)
        .AddBase(2, cards.SOR.EchoBase)
        .AddLeader(2, cards.SOR.MoffTarkinLeader)
        .FillResources(1, cards.TWI.EliteP, 2)
        .AddCardToHand(1, cards.TWI.PhaseIStormTrooper)
        .FlushAsync(com.BeginTestCallback)
      ;

      await browser
        .waitForElementPresent(com.MyHand)
        .moveToElement(com.GameChat, 0, 0).pause(p.Move)
        .click(com.HandCard(1))
        .pause(p.WaitForEffect)
      ;

      await browser.assert.textEquals(com.MyResources, '0/2');
    },
}