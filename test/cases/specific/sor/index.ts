import {
    com, p,
    LoadTestGameStateAsync,
    player1Window, player2Window
} from '../../../utils/util';

export const SpecificSORCases = {
    'Gideon Hask: traded from enemy unit': async function () {
        await LoadTestGameStateAsync('specific/sor/gideon-hask');

        await browser.window.switchTo(player2Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;

        await browser.window.switchTo(player1Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
        ;

        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
    },
    'Gideon Hask: opponent pings self': process.env.SKIP_FULL_REGRESSION ? '' : async function () {
        await LoadTestGameStateAsync('specific/sor/gideon-hask');

        await browser.window.switchTo(player2Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.Base(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;

        await browser.window.switchTo(player1Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
        ;

        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
    },
    'Gideon Hask: pinged to death': process.env.SKIP_FULL_REGRESSION ? '' : async function () {
        await LoadTestGameStateAsync('specific/sor/gideon-hask');

        await browser.window.switchTo(player2Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.Base(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;

        await browser.window.switchTo(player1Window).refresh()
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .pause(p.WaitForEffect)
        ;

        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '2');
        await browser.assert.textEquals(com.MyBaseDamage, '6');
        await browser.assert.textEquals(com.TheirBaseDamage, '12');
    },
}