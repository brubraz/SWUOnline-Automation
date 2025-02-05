import { cards } from "../utils/cards";
import { GameState, SubcardBuilder } from "../utils/gamestate";
import { com, p, player1Window, player2Window, gameName } from "../utils/util";

export const BounceCases = {
  "Bounce: Waylay Tokens": async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState
      .ResetGameStateLines()
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.DagobahSwamp)
      .AddLeader(2, cards.SOR.SabineLeader)
      .FillResources(1, 6)
      .AddCardToHand(1, cards.SOR.Waylay)
      .AddCardToHand(1, cards.SOR.Waylay)
      .AddUnit(2, cards.TWI.BattleDroid)
      .AddUnit(2, cards.TWI.CloneTrooper)
      .FlushAsync(com.BeginTestCallback);

    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.WaitForEffect);

    await browser.window
      .switchTo(player2Window)
      .refresh()
      .waitForElementPresent(com.ClaimButton)
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.Move)
      .click(com.ClaimButton)
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.WaitForEffect);

    await browser.window
      .switchTo(player1Window)
      .refresh()
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.WaitForEffect);

    await browser.assert.elementPresent(com.TheirDiscardEmpty);
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.not.elementPresent(com.TheirHandDivs);
  },
  "Bounce: Evacuate unique captives and ignore leaders": async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState
      .ResetGameStateLines()
      .AddBase(1, cards.SOR.ChopperBase)
      .AddLeader(1, cards.SOR.SabineLeader)
      .AddBase(2, cards.SOR.DagobahSwamp)
      .AddLeader(2, cards.SOR.SabineLeader, true)
      .FillResources(1, 6)
      .AddCardToHand(1, cards.SHD.Evacuate)
      .AddUnit(2, cards.SOR.SabineLeaderUnit)
      .AddUnit(2, cards.TWI.BattleDroid, false, 0, new SubcardBuilder().AddCaptive(cards.SOR.LukeSkywalker, 1).Build())
      .AddUnit(2, cards.TWI.BattleDroid, false, 0, new SubcardBuilder().AddCaptive(cards.SOR.LukeSkywalker, 1).Build())
      .AddUnit(
        2,
        cards.SOR.TieLnFighter,
        false,
        0,
        new SubcardBuilder().AddUpgrade(cards.JTL.AsajjLeaderUnit, 2, true).Build(),
      )
      .FlushAsync(com.BeginTestCallback);
    //act
    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0)
      .pause(p.WaitForEffect);
    //assert
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.elementPresent(com.EnemySpaceUnit(1));
    await browser.assert.textEquals(com.PlayerPickSpan, "You have two of this unique unit; choose one to destroy ");
  },
};
