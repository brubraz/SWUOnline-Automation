import {
    com, p, src,
    LoadTestGameStateAsync,
    player1Window, player2Window
} from '../../utils/util';

export const LeaderUnitSORCases = {
    'Blue and Green Leader Units': async function () {
        await LoadTestGameStateAsync('leader-unit-sor/leaders-mass-test1');

        await browser.waitForElementPresent(com.Leader(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.Leader(1)).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Iden Version deploys shielded
        await browser.assert.elementPresent(com.AllyGroundUnit(5));
        await browser.assert.attributeContains(com.UnitDivPiece(com.AllyGroundUnit(5), 3), 'style', src.ShieldToken);

        await browser.window.switchTo(player2Window)
          .waitForElementPresent(com.Leader(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.Leader(2)).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemySpaceUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Emperor Palpatine deploys and takes control of enemy unit
        await browser.assert.elementPresent(com.AllyGroundUnit(4));
        await browser.assert.elementPresent(com.AllySpaceUnit(1));
        await browser.assert.not.elementPresent(com.EnemySpaceUnit(1));

        await browser.window.switchTo(player1Window)
          .waitForElementPresent(com.AllyGroundUnit(4))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(4))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(4))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        //Luke Skywalker gives shield to any unit
        await browser.assert.attributeContains(com.UnitDivPiece(com.AllyGroundUnit(1), 3), 'style', src.ShieldToken);

        await browser.window.switchTo(player2Window)
          .waitForElementPresent(com.AllyGroundUnit(3))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(3))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Leia Chained attacks, Hera XP, and Chewie Sentinel plus Grit, Iden Versio heals 1 from base when enemy defeated
        await browser.assert.not.elementPresent(com.AllyGroundUnit(4));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(2), 3), '2');
        await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(2), 3), '8');
        await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(2), 1), '11');
        await browser.assert.attributeContains(com.UnitDivPiece(com.EnemyGroundUnit(2), 4), 'style', src.SentinelToken);
        await browser.assert.textEquals(com.TheirBaseDamage, '5');

        await browser.window.switchTo(player1Window)
          .waitForElementPresent(com.AllyGroundUnit(5))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(5))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Iden Versio heals 1 from base when enemy defeated
        await browser.assert.not.elementPresent(com.EnemyGroundUnit(3));
        await browser.assert.textEquals(com.MyBaseDamage, '4');
        await browser.assert.attributeEquals(com.UnitDivPiece(com.AllyGroundUnit(5), 3), 'class', 'overlay');

        await browser.window.switchTo(player2Window)
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Grand Moff Tarkin gives XP to Imperial unit and Idem Versio heals 1 from base when enemy defeated
        await browser.assert.not.elementPresent(com.AllyGroundUnit(2));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 1), 'EXPERIENCE');
        await browser.assert.textEquals(com.TheirBaseDamage, '3');

        await browser.window.switchTo(player1Window)
          .waitForElementPresent(com.AllyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(2))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Chirrut Imwe not defeated due to 0 HP and Krennic buffs damaged units
        await browser.assert.elementPresent(com.AllyGroundUnit(4));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(2), 1), '4');
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(2), 2), '5');

        await browser.window.switchTo(player2Window)
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.AllySpaceUnit(1))
          .pause(p.WaitForEffect)
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Emperor Palpatine destroys ally unit to ping enemy unit, Iden Versio heals 1 from base when enemy defeated, Luke's shield is pinged
        await browser.assert.not.elementPresent(com.AllySpaceUnit(1));
        await browser.assert.not.elementPresent(com.EnemySpaceUnit(1));
        await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 4), '9');
        await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 1), '3');
        await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 2), '7');
        await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 3), '5');
        await browser.assert.attributeEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 4), 'class', 'overlay');
        await browser.assert.textEquals(com.TheirBaseDamage, '2');
        await browser.assert.textEquals(com.MyBaseDamage, '9');

        await browser.window.switchTo(player1Window)
          .waitForElementPresent(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.Move)
          .click(com.AllyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
          .click(com.EnemyGroundUnit(1))
          .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
        ;
        //Krennic restores 2 health on attack
        await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
        await browser.assert.not.elementPresent(com.AllyGroundUnit(4));
        await browser.assert.textEquals(com.MyBaseDamage, '0');
        await browser.assert.textEquals(com.TheirBaseDamage, '9');
    }
}