import { cards } from '../utils/cards';
import { GameState } from '../utils/gamestate';
import {
    com, p,
    LoadTestGameStateAsync,
    player1Window, player2Window,
    gameName
} from '../utils/util';

export const WhenPlayedCases = {
    'When Played: U-Wing Many Played': async function () {
        //arrange
        const gameState = new GameState(gameName);
        await gameState.LoadGameStateLinesAsync();
        await gameState.ResetGameStateLines()
          .AddBase(1, cards.SOR.EchoBase)
          .AddLeader(1, cards.SOR.SabineLeader)
          .AddBase(2, cards.SOR.EchoBase)
          .AddLeader(2, cards.SOR.SabineLeader)
          .FillResources(1, cards.SOR.BFMarine, 7)
          .AddCardToHand(1, cards.SOR.UWing)
          .AddCardToDeck(1, cards.SOR.BFMarine, 2)
          .AddCardToDeck(1, cards.SOR.MonMothma)
          .AddCardToDeck(1, cards.SOR.BFMarine)
          .AddCardToDeck(1, cards.SOR.ModdedCohort)
          .AddCardToDeck(1, cards.SOR.BFMarine, 2)
          .AddCardToDeck(1, cards.SOR.R2D2)
          .AddCardToDeck(1, cards.SOR.BFMarine, 3)
          .AddCardToDeck(1, cards.SOR.AdmiralAckbar)
          .AddUnit(2, cards.SHD.Kuiil)
          .AddUnit(2, cards.SOR.LukeSkywalker)
          .AddUnit(1, cards.SOR.R2D2)
          .AddUnit(1, cards.SOR.MonMothma)
          .FlushAsync(com.BeginTestCallback)
          ;

        await browser
        .waitForElementPresent(com.MyHand)
        .moveToElement(com.GameChat, 0, 0).pause(p.Move)
        .click(com.HandCard(1))
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        .click(com.Checkbox(3)).pause(p.CheckBox)
        .click(com.Checkbox(5)).pause(p.CheckBox)
        .click(com.Checkbox(8)).pause(p.CheckBox)
        .click(com.SubmitButton).pause(p.ButtonPress)
        .click(com.AllyGroundUnit(3))
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        .click(com.PassButton).pause(p.ButtonPress)
        .click(com.PassButton).pause(p.ButtonPress)
        .click(com.AllyGroundUnit(4))
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        .click(com.PassButton).pause(p.ButtonPress)
        .click(com.TopBottomButton(1, 2)).pause(p.ButtonPress)
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        .click(com.YesNoButton("YES")).pause(p.ButtonPress)
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
        .click(com.EnemyGroundUnit(1))
        .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        .click(com.Checkbox(1)).pause(p.CheckBox)
        .click(com.SubmitButton).pause(p.ButtonPress)
        .moveToElement(com.GameChat, 0, 0).pause(p.Move)
        ;

        await browser.assert.not.elementPresent(com.EnemyGroundUnit(2));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(3), 3), '2');
        await browser.assert.attributeEquals(com.HandCardImg(1), 'alt', 'Admiral Ackbar');
    },
    'When Played: Darth Vader multi then draw': async function () {
        //arrange
        const gameState = new GameState(gameName);
        await gameState.LoadGameStateLinesAsync();
        await gameState.ResetGameStateLines()
          .AddBase(1, cards.SOR.EchoBase)
          .AddLeader(1, cards.SOR.MoffTarkinLeader)
          .AddBase(2, cards.SOR.TarkinTown)
          .AddLeader(2, cards.SOR.MoffTarkinLeader)
          .FillResources(1, cards.SOR.BFMarine, 10)
          .AddCardToHand(1, cards.SOR.DarthVader)
          .AddCardToHand(1, cards.SHD.NoBargain)
          .AddCardToDeck(1, cards.SOR.FLSnowTrooper)
          .AddCardToDeck(1, cards.SOR.GideonHask, 7)
          .AddCardToDeck(1, cards.SOR.DSStormTrooper)
          .AddCardToDeck(1, cards.SOR.BFMarine)
          .AddCardToDeck(1, cards.SHD.PhaseIIIDarkTrooper)
          .AddUnit(2, cards.SOR.DSStormTrooper)
          .AddUnit(2, cards.SOR.DSStormTrooper)
          .FlushAsync(com.BeginTestCallback)
        ;

        await browser.waitForElementPresent(com.MyHand)
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.HandCard(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
          .click(com.PassButton).pause(p.ButtonPress)
          .click(com.Checkbox(1)).pause(p.CheckBox)
          .click(com.Checkbox(9)).pause(p.CheckBox)
          .click(com.SubmitButton).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
          .click(com.YesNoButton("YES")).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;

        await browser.window.switchTo(player2Window).refresh()
          .waitForElementPresent(com.ClaimButton)
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.ClaimButton).pause(p.ButtonPress)
        ;

        await browser.window.switchTo(player1Window).refresh()
          .waitForElementPresent(com.MyHand)
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.HandCard(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;

        await browser.assert.not.elementPresent(com.EnemyGroundUnit(2));
        await browser.assert.elementPresent(com.AllyGroundUnit(2));
        await browser.assert.elementPresent(com.AllyGroundUnit(3));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '3');
        await browser.assert.attributeEquals(com.HandCardImg(1), 'alt', 'Phase-III Dark Trooper');
    }
}
