
import { cards } from '../utils/cards';
import { GameState } from '../utils/gamestate';
import {
  com, p,
  player1Window, player2Window,
  gameName,
  customAsserts
} from '../utils/util';

export const WhenDefeatCases = {
  'When Defeat: Inferno Four top bottom': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.JTL.AsajjLeader)
      .AddBase(2, cards.SOR.EchoBase)
      .AddLeader(2, cards.SOR.SabineLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 3)
      .AddCardToHand(1, cards.TWI.MercilessContest)
      .AddCardToDeck(1, cards.SHD.TopTarget)
      .AddCardToDeck(1, cards.SOR.Waylay)
      .AddCardToDeck(1, cards.SOR.Vanquish, 3)
      .AddCardToDeck(1, cards.SOR.Avenger, 3)
      .AddUnit(1, cards.SOR.InfernoFour)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ChooseButton(2, 2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.ChooseButton(1, 1)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    const secondLastLog = (await browser.getText(com.GameLog)).split('\n').slice(-2)[0];
    await browser.assert.equal(secondLastLog, 'Player 1 put a card on the bottom of the deck.');
    await browser.assert.equal(lastLog, 'Player 1 put a card on top of the deck.');
  },
  'When Defeat: SLT w Clone Cohort Pinged by Dengar': process.env.FULL_REGRESSION !== "true" ? '' : async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, cards.SHD.JabbasPalace)
      .AddLeader(1, cards.SHD.BosskLeader)
      .AddBase(2, cards.SOR.EchoBase)
      .AddLeader(2, cards.SOR.MoffTarkinLeader)
      .FillResources(1, cards.SOR.CraftySmuggler, 2)
      .AddCardToHand(1, cards.TWI.CloneCohort)
      .AddUnit(1, cards.SOR.SLT)
      .AddUnit(1, cards.SHD.Dengar)
      .FlushAsync(com.BeginTestCallback)
    ;
    await browser
    .waitForElementPresent(com.MyHand)
    .moveToElement(com.GameChat, 0, 0).pause(p.Move)
    .click(com.HandCard(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
    .click(com.AllyGroundUnit(1))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    .click(com.YesNoButton('YES'))
    .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.assert.not.elementPresent(com.AllyGroundUnit(3));
    await customAsserts.AllyGroundUnitIsCloneTrooper(browser, 2);
    await browser.assert.textEquals(com.MyResources, '1/3');
  },
}