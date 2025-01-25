import {
  com, src, p,
  LoadTestGameStateAsync,
  player1Window, player2Window
} from '../../utils/util';

export const DamageCases = {
  'Overwhelming Barrage pings simultaneously': async function () {
    await LoadTestGameStateAsync('damage/overwhelming-barrage1');

    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.Checkbox(2)).pause(p.CheckBox)
      .click(com.Checkbox(3)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(4)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .assert.textEquals(com.TheirResources, '6/6')
      .assert.not.elementPresent(com.EnemyGroundUnit(1))
      //when defeated triggers after damage
      .click(com.ButtonInputChoice(5)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.PassButton).pause(p.ButtonPress)
      .assert.textEquals(com.TheirResources, '7/7')
      .assert.elementPresent(com.EnemyGroundUnit(1))
      .assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 1), '1')
      .assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 2), '1')
      .assert.not.elementPresent(com.EnemyGroundUnit(2))
      .assert.not.elementPresent(com.EnemySpaceUnit(1))
    ;
  }
}