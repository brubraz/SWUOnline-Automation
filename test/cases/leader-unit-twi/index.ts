
import {
    com, p,
    LoadTestGameStateAsync,
    player1Window, player2Window
} from '../../utils/util';

export const LeaderUnitTWICases = {
    'Leader Unit: Nala Se TWI Ignore Aspect': async function () {
      await LoadTestGameStateAsync('leader-unit-twi/nalase-ignore-aspect');
      await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .pause(p.WaitForEffect)
      ;

      await browser.assert.textEquals(com.MyResources, '3/5');
    },
}