import {NightwatchTests} from 'nightwatch';

import { player1Window, player2Window } from './utils/util';
import { init } from './utils/gamestart';

import { WhenPlayedCases } from './cases/when-played';
import { WhenDefeatCases } from './cases/when-defeat';
import { OnAttackCases } from './cases/on-attack';
import { AmbushCases } from './cases/ambush';
import { BounceCases } from './cases/bounce';
import { DamageCases } from './cases/damage';
import { ReadyCases } from './cases/ready';
import { BoardWipeCases } from './cases/boardwipe';
import { ControlCases } from './cases/control';
import { LeaderAbilitySORCases } from './cases/leader-ability-sor';
import { LeaderUnitSORCases } from './cases/leader-unit-sor';
import { LeaderUnitSHDCases } from './cases/leader-unit-shd';
import { LeaderUnitTWICases } from './cases/leader-unit-twi';
import { SpecificSORCases } from './cases/specific/sor';
import { BountyCases } from './cases/bounty';
import { SpecificSHDCases } from './cases/specific/shd';
import { ExploitCases } from './cases/exploit';
import { SpecificTWICases } from './cases/specific/twi';
import { PilotJTLCases } from './cases/pilots/jtl';

import { LocalTestCase } from './cases/local';

const home: NightwatchTests = {
  before: init,
//regression suite
  ...(process.env.LOCAL_RUN ? LocalTestCase : {}),
  ...WhenPlayedCases,
  ...WhenDefeatCases,
  ...OnAttackCases,
  ...AmbushCases,
  ...BounceCases,
  ...DamageCases,
  ...ReadyCases,
  ...BoardWipeCases,
  ...ControlCases,
  ...LeaderAbilitySORCases,
  ...LeaderUnitSORCases,
  ...LeaderUnitSHDCases,
  ...LeaderUnitTWICases,
  ...SpecificSORCases,
  ...BountyCases,
  ...SpecificSHDCases,
  ...ExploitCases,
  ...SpecificTWICases,
  ...PilotJTLCases,
//end regression suite
  after: async (browser, done) => {
    await browser.window.switchTo(player2Window).window.close();
    await browser.window.switchTo(player1Window).window.close();

    done();
  }
};

export default home;