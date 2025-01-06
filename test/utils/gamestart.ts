import { NightwatchTestHook } from "nightwatch";

import {
  com, p,
  player1Window, player2Window,
  setPlayer1Window, setPlayer2Window,
} from "./util";

const genericJangoDeck = 'https://swudb.com/deck/nwETxCRed';
const maxRetries = 3;

export const beforeFunc: NightwatchTestHook = async (browser, done) => {
  await browser
    .url('http://localhost:8080/SWUOnline/MainMenu.php')
    .window.maximize().pause(p.WaitForEffect)
    .assert.titleEquals('Karabast')
  ;

  setPlayer1Window(await browser.window.getHandle());

  await browser
    .waitForElementPresent(com.DeckInput)
    .setValue(com.DeckInput, genericJangoDeck)
    .click(com.CreateGameButton).pause(p.ButtonPress);

  let inviteRetry = 0;

  while(!await browser.element.find(com.InviteLink).isPresent() && inviteRetry < maxRetries) {
    await browser
    .refresh().refresh().pause(p.WaitToBegin)
    inviteRetry++;
  }

  const inviteLink = await browser
    .waitForElementPresent(com.InviteLink)
    .getValue(com.InviteLink);
  ;

  setPlayer2Window(await browser.window.open('tab').window.getHandle());

  browser
    .url(inviteLink)
    .waitForElementPresent(com.DeckInput)
    .setValue(com.DeckInput, genericJangoDeck)
    .waitForElementPresent(com.JoinGameButton)
    .click(com.JoinGameButton).pause(p.ButtonPress)
    .pause(p.WaitToBegin)
  ;

  let joinGameRetry = 0;

  while((!await browser.element.find(com.LobbySetupContent).isPresent()
    || (await browser.getText(com.LobbySetupContent)).length === 0)
    && joinGameRetry < maxRetries) {
    await browser.navigateTo(inviteLink).pause(p.WaitToBegin)
    .refresh().refresh().pause(p.WaitToBegin)
    .waitForElementPresent(com.DeckInput)
    .setValue(com.DeckInput, genericJangoDeck)
    .waitForElementPresent(com.JoinGameButton)
    .click(com.JoinGameButton).pause(p.ButtonPress)
    .pause(p.WaitToBegin)
    joinGameRetry++;
  }

  if(await browser.element.find(com.GoFirstButton).isPresent()) {
    await browser.click(com.GoFirstButton)
    .waitForElementPresent(com.ReadyButton)
    .click(com.ReadyButton).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player1Window)
    .refresh().pause(p.WaitToBegin)
    .waitForElementPresent(com.StartButton)
    .click(com.StartButton).pause(p.ButtonPress)
    ;
  } else {
    await browser.window.switchTo(player1Window)
    .refresh().refresh().pause(p.WaitToBegin)
    .waitForElementPresent(com.GoFirstButton)
    .click(com.GoFirstButton).pause(p.ButtonPress)
    .waitForElementPresent(com.StartButton)
    .click(com.StartButton).pause(p.ButtonPress)
    ;

    await browser.window.switchTo(player2Window)
    .refresh().refresh().pause(p.WaitToBegin)
    .waitForElementPresent(com.ReadyButton)
    .click(com.ReadyButton).pause(p.ButtonPress)
    ;
  }

  await browser.window.switchTo(player1Window)
    .pause(p.WaitToBegin);

  done();
};