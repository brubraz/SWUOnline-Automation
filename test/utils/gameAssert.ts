import { Assert, NightwatchAPI } from "nightwatch";
import { com } from "./util";

export class GameAssert {

  private asyncAssert: Assert<NightwatchAPI>;

  private constructor() {
  }

  public static Init() {
    return new GameAssert();
  }

  public HasNotUnit(index: number) {
    this.asyncAssert.not.elementPresent(com.EnemyGroundUnit(index));
    return this;
  }
}