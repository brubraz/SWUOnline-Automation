import { cards } from "../utils/cards";
import { GameAssert } from "../utils/gameAssert";
import { Gameplay } from "../utils/gameplay";
import { GameState, SubcardBuilder } from "../utils/gamestate";
import { com, gameName } from "../utils/util";

export const OnAttackCases = {
  "On Attack: Generals Blade to play C-3PO and draw": async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState
      .ResetGameStateLines()
      .AddBase(1, cards.SOR.ECL)
      .AddLeader(1, cards.TWI.YodaLeader)
      .AddBase(2, cards.SOR.ECL)
      .AddLeader(2, cards.SOR.SabineLeader)
      .FillResources(1, 5, 4)
      .FillResources(2, 5)
      .AddCardToDeck(1, cards.TWI.GeneralsBlade)
      .AddCardToDeck(1, cards.SOR.EchoBase)
      .AddCardToHand(1, cards.SOR.YMOH)
      .AddCardToHand(1, cards.SOR.C3PO)
      .AddCardToHand(2, cards.SOR.SabineUnit)
      .AddUnit(1, cards.SOR.Yoda, true, 0, new SubcardBuilder().AddUpgrade(cards.TWI.GeneralsBlade, 1).Build())
      .AddUnit(2, cards.SOR.SabineUnit)
      .FlushAsync(com.BeginTestCallback);

    //act
    await Gameplay.Start()
      .AttackWithGround(1, 1)
      .WithPlayer(2)
      .Claim()
      .WithPlayer(1)
      .ActivateLeader()
      .ChooseTop(3)
      .PlayFromHand(2)
      .ChooseMultiChoice(4)
      .ChooseYes()
      .Debug()
      .End();

    //assert
    // await GameAssert.Assert();
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
    // await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), "2");
  },
};
