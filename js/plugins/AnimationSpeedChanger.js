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
 Sprite_Actor.MOTIONS.dead.loop = false;
 Sprite_Actor.MOTIONS.thrust.loop = false;
 Game_CharacterBase.prototype.animationWait = function() {
	return (9 - this.realMoveSpeed()) * 2;
  };