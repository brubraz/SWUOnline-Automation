
import { cards } from '../utils/cards';
import { GameState, SubcardBuilder } from '../utils/gamestate';
import {
    com, p,
    player1Window, player2Window,
    gameName,
    src,
    cs
} from '../utils/util';

export const LeaderAbilityTWICases = {
  'Yoda draw and put card on top or bottom': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.TWI.YodaLeader)
      .AddBase(2, cards.SOR.EchoBase)
      .AddLeader(2, cards.SOR.SabineLeader)
      .AddCardToDeck(1, cards.SHD.SpareTheTarget)
      .AddCardToDeck(1, cards.SOR.Waylay)
      .AddCardToHand(1, cards.SOR.Vanquish)
      .AddCardToHand(1, cards.SOR.Vanquish)
      .SetClassStatePiece(1, cs.NumLeftPlay, "1")
      .FlushAsync(com.BeginTestCallback)
    ;
    //pre-assert
    await browser.assert.elementsCount(com.MyHandDivs, 2);
    //act
    await browser
      .waitForElementPresent(com.Leader(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.Leader(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonMultiChoice(1)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.InHandTopBottom(3, 2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementsCount(com.MyHandDivs, 2);
  }
}