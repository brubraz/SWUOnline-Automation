import { cards } from "../../utils/cards";
import { GameState } from "../../utils/gamestate";
import { com, p, LoadTestGameStateAsync, player1Window, player2Window, gameName } from "../../utils/util";

export const WhenDefeatCases = {
  "When Defeat: SLT w Clone Cohort Pinged by Dengar":
    process.env.FULL_REGRESSION !== "true"
      ? ""
      : async function () {
          //arrange
          const gameState = new GameState(gameName);
          await gameState.LoadGameStateLinesAsync();
          await gameState
            .ResetGameStateLines()
            .AddBase(1, cards.SOR.ECL)
            .AddLeader(1, cards.SHD.BosskLeader)
            .AddBase(2, cards.SOR.ECL)
            .AddLeader(2, cards.SOR.SabineLeader)
            .FillResources(1, 7)
            .FillResources(2, 7)
            .AddCardToDeck(1, cards.TWI.GeneralsBlade)
            .AddCardToDeck(1, cards.SOR.EchoBase)
            .AddCardToHand(1, cards.SOR.YMOH)
            .AddCardToHand(1, cards.SOR.C3PO)
            .AddCardToHand(2, cards.SOR.SabineUnit)
            .AddUnit(1, cards.SOR.Yoda, true, 0, new SubcardBuilder().AddUpgrade(cards.TWI.GeneralsBlade, 1).Build())
            .AddUnit(2, cards.SOR.SabineUnit)
            .FlushAsync(com.BeginTestCallback);

        //   await LoadTestGameStateAsync("when-defeat/slt-clone-cohort");
          const player1SLT = com.UniqueIdSelector(77);
          await browser
            .waitForElementPresent(com.MyHand)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.Move)
            .click(com.HandCard(2))
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitToChooseTarget)
            .click(player1SLT)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitForEffect)
            .click(com.YesNoButton("YES"))
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitForEffect)
            .pause(p.Debug);

          await browser.assert.not.elementPresent(player1SLT);
          await browser.assert.attributeEquals(
            com.AllyGroundUnit(2) + " img",
            "src",
            "http://localhost:8080/SWUOnline/concat/3941784506.webp",
          );
          await browser.assert.textEquals(com.MyResources, "5/7");
        },
  "When Defeat: Gar Saxon Upgrade Bounce":
    process.env.FULL_REGRESSION !== "true"
      ? ""
      : async function () {
          await LoadTestGameStateAsync("when-defeat/garsaxon-bounce");

          const player2FollowerOfTheWay = com.UniqueIdSelector(6);
          const player2MandalorianWarrior = com.UniqueIdSelector(38);
          const player2GarSaxonLeaderUnit = com.UniqueIdSelector(53);
          const player1Hevy = com.UniqueIdSelector(23);

          await browser.window
            .switchTo(player2Window)
            .refresh()
            .waitForElementPresent(com.MyHand)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.Move)
            .click(player2FollowerOfTheWay)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitToChooseTarget)
            .click(player1Hevy)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitForEffect)
            .click(com.PassButton)
            .pause(p.ButtonPress);

          await browser.window
            .switchTo(player1Window)
            .refresh()
            .waitForElementPresent(com.MyHand)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.Move)
            .click(com.YesNoButton("YES"))
            .pause(p.ButtonPress)
            .click(com.YesNoButton("YES"))
            .pause(p.ButtonPress);

          await browser.window
            .switchTo(player2Window)
            .refresh()
            .waitForElementPresent(com.MyHand)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.Move)
            .click(com.ChooseButton(1, 1))
            .pause(p.ButtonPress)
            .moveToElement(com.GameChat, 0, 0)
            .pause(p.WaitForEffect);

          await browser.assert.elementsCount(com.TheirHand + " span", 5);
          await browser.assert.attributeEquals(com.HandCard(5) + " img", "alt", "Foundling");
          await browser.assert.textEquals(com.TheirBaseDamage, "1");
          await browser.assert.textEquals(com.UnitDivPiece(player2MandalorianWarrior, 4), "1");
          await browser.assert.textEquals(com.UnitDivPiece(player2GarSaxonLeaderUnit, 3), "1");
        },
};
