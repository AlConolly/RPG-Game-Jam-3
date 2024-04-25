//=============================================================================
// Krons_AI_base.js (version alpha 0.1)
//=============================================================================
/*:
 * @plugindesc changes animation speed
 *
 * @author MapleWtig
 *
 * @help
 *changes animation speed
 */
 Game_CharacterBase.prototype.animationWait = function() {
	return (9 - this.realMoveSpeed()) * 2;
  };
