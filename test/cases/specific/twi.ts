import { card } from '../../utils/cards';
import { GameState, SubcardBuilder } from '../../utils/gamestate';
import {
    com, p,
    player1Window, player2Window,
    customAsserts,
    src,
    gameName
} from '../../utils/util';

const GreedoUpgrades = (owner: number) =>
  new SubcardBuilder().AddExperience(1).AddUpgrade(card.TWI.ShadowedIntentions, owner).Build();

const ShadowedIntentionsGameStateAsync = async () =>{
  const gameState = new GameState(gameName);
  await gameState.LoadGameStateLinesAsync();
  await gameState.ResetGameStateLines()
    .AddBase(1, card.SOR.ChopperBase)
    .AddLeader(1, card.SOR.MoffTarkinLeader)
    .AddBase(2, card.SOR.ChopperBase)
    .AddLeader(2, card.SOR.SabineLeader)
    .FillResources(1, card.SOR.CraftySmuggler, 1, 3)
    .FillResources(2, card.SOR.CraftySmuggler, 4, 3)
    .AddCardToHand(1, card.TWI.SanctioneerShuttle)
    .AddCardToHand(1, card.TWI.EliteP)
    .AddCardToHand(1, card.TWI.MercilessContest)
    .AddCardToHand(1, card.SOR.Waylay)
    .AddUnit(1, card.SOR.Greedo, 7, true, 0, GreedoUpgrades(1))
    .AddUnit(1, card.SHD.LurkingTie, 8)
    .AddUnit(2, card.SOR.Greedo, 9, true, 0, GreedoUpgrades(2))
    .AddUnit(2, card.SHD.LurkingTie, 10)
    .FlushAsync(com.BeginTestCallback)
}

export const SpecificTWICases = {
  'Exploit: Red Dooku TWI and triggers': process.env.FULL_REGRESSION !== "true" ? '' : async function() {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.KestroCity)
      .AddLeader(1, card.TWI.CountDookuLeader)
      .AddBase(2, card.SOR.KestroCity)
      .AddLeader(2, card.SHD.CadBaneLeader)
      .FillResources(1, card.SOR.CraftySmuggler, 1, 4)
      .FillResources(2, card.SOR.CraftySmuggler, 5, 4)
      .AddCardToHand(1, card.TWI.DookuFallenJedi)
      .AddCardToDeck(1, card.SOR.OB)
      .AddCardToHand(2, card.SOR.ISBAgent)
      .AddCardToHand(2, card.SHD.DaringRaid)
      .AddCardToDeck(2, card.SOR.Waylay)
      .AddUnit(1, card.TWI.EliteP, 9)
      .AddUnit(1, card.SOR.Greedo, 10)
      .AddUnit(2, card.TWI.EliteP, 11)
      .AddUnit(2, card.SOR.Greedo, 12)
      .FlushAsync(com.BeginTestCallback)
    ;

    await browser
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.Checkbox(2)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemySpaceUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.PassButton).pause(p.ButtonPress)
      .click(com.PassButton).pause(p.ButtonPress)
      .click(com.YesNoButton('NO')).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.YesNoButton('YES')).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToBegin)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.window.switchTo(player1Window).refresh()
      .waitForElementPresent(com.ClaimButton)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.ClaimButton).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;

    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
  },
  'On Attack: Darth Maul TWI': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ChopperBase)
      .AddLeader(1, card.SOR.SabineLeader)
      .AddBase(2, card.SOR.DagobahSwamp)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddUnit(1, card.TWI.DarthMaul, 1)
      .AddUnit(2, card.TWI.WTTradeOfficial, 2)
      .AddUnit(2, card.TWI.WTTradeOfficial, 3)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.Checkbox(2)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .click(com.PassButton).pause(p.ButtonPress)
    ;
    //assert
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '2');
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(3));
    await customAsserts.EnemyGroundUnitIsBattleDroid(browser, 1);
    await customAsserts.EnemyGroundUnitIsBattleDroid(browser, 2);
  },
  'On Attack: Darth Maul TWI single target available': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ChopperBase)
      .AddLeader(1, card.SOR.SabineLeader)
      .AddBase(2, card.SOR.DagobahSwamp)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddUnit(1, card.TWI.DarthMaul, 1)
      .AddUnit(2, card.SOR.DSStormTrooper, 2)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '3');
  },
  'On Attack: Darth Maul TWI single target choice': process.env.FULL_REGRESSION !== "true" ? '' : async function () {
   //arrange
   const gameState = new GameState(gameName);
   await gameState.LoadGameStateLinesAsync();
   await gameState.ResetGameStateLines()
     .AddBase(1, card.SOR.ChopperBase)
     .AddLeader(1, card.SOR.SabineLeader)
     .AddBase(2, card.SOR.DagobahSwamp)
     .AddLeader(2, card.SOR.SabineLeader)
     .AddUnit(1, card.TWI.DarthMaul, 1)
     .AddUnit(2, card.SOR.DSStormTrooper, 2)
     .AddUnit(2, card.SOR.DSStormTrooper, 3)
     .FlushAsync(com.BeginTestCallback)
   ;
   //act
    await browser.waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.ButtonInputChoice(2)).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(2));
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '3');
  },
  'On Attack: Darth Maul TWI sentinels': process.env.FULL_REGRESSION !== "true" ? '' : async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ChopperBase)
      .AddLeader(1, card.SOR.SabineLeader)
      .AddBase(2, card.SOR.DagobahSwamp)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddUnit(1, card.TWI.DarthMaul, 1)
      .AddUnit(2, card.SHD.PhaseIIIDarkTrooper, 2)
      .AddUnit(2, card.SHD.PhaseIIIDarkTrooper, 3)
      .AddUnit(2, card.TWI.WTTradeOfficial, 4)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
      .click(com.Checkbox(1)).pause(p.CheckBox)
      .click(com.Checkbox(2)).pause(p.CheckBox)
      .click(com.SubmitButton).pause(p.ButtonPress)
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.AllyGroundUnit(1));
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
  },
  'On Attack: Darth Maul TWI single sentinel': async function () {
    //arrange
    const gameState = new GameState(gameName);
    await gameState.LoadGameStateLinesAsync();
    await gameState.ResetGameStateLines()
      .AddBase(1, card.SOR.ChopperBase)
      .AddLeader(1, card.SOR.SabineLeader)
      .AddBase(2, card.SOR.DagobahSwamp)
      .AddLeader(2, card.SOR.SabineLeader)
      .AddUnit(1, card.TWI.DarthMaul, 1)
      .AddUnit(2, card.SHD.PhaseIIIDarkTrooper, 2)
      .AddUnit(2, card.TWI.WTTradeOfficial, 3)
      .FlushAsync(com.BeginTestCallback)
    ;
    //act
    await browser.waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.EnemyGroundUnit(2));
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 3), '3');
  },
  'Shadowed Intentions: avoids enemy capture': async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementPresent(com.EnemySpaceUnit(1));
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Greedo Slow on the Draw avoided capture.');
  },
  'Shadowed Intentions: enemy damage': async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.UnitDivPiece(com.EnemyGroundUnit(1), 5), '1');
  },
  'Shadowed Intentions: defeats (merciless contest)': async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(3))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.window.switchTo(player2Window).refresh()
      .waitForElementPresent(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
    ;

    await browser.window.switchTo(player1Window).refresh();

    await browser.assert.not.elementPresent(com.AllyGroundUnit(1));
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Greedo Slow on the Draw cannot be defeated by enemy card effects.');
  },
  'Shadowed Intentions: damaged by self': process.env.FULL_REGRESSION !== "true" ? '' : async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(2))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.textEquals(com.UnitDivPiece(com.AllyGroundUnit(1), 5), '1');
  },
  'Shadowed Intentions: bounced by enemy': async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(4))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.EnemyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.elementPresent(com.EnemyGroundUnit(1));
    await browser.assert.textEquals(com.TheirHand, '');
    const lastLog = (await browser.getText(com.GameLog)).split('\n').slice(-1)[0];
    await browser.assert.equal(lastLog, 'Greedo Slow on the Draw avoided bounce.');
  },
  'Shadowed Intentions: bounced by self': process.env.FULL_REGRESSION !== "true" ? '' : async function() {
    //arrange
    await ShadowedIntentionsGameStateAsync();
    //act
    await browser.waitForElementPresent(com.MyHand)
      .moveToElement(com.GameChat, 0, 0).pause(p.Move)
      .click(com.HandCard(4))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitToChooseTarget)
      .click(com.AllyGroundUnit(1))
      .moveToElement(com.GameChat, 0, 0).pause(p.WaitForEffect)
    ;
    //assert
    await browser.assert.not.elementPresent(com.AllyGroundUnit(1));
    await browser.assert.elementsCount(com.MyHandDivs, 4);
  },
}