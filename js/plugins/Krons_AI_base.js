//=============================================================================
// Krons_AI_base.js (version alpha 0.1)
//=============================================================================
/*:
 * @plugindesc Returns map distance between events/player/followers.
 *
 * @author Henning Strandin
 *
 * @help
 *
 * Provides three JavaScript functions:
 *
 *
 * Below, EVENT can be a regular event ID, 0 for
 * the current event, -1 for the player, and
 * -2, -3, ... for followers.
 *
 *
 * eventInSight(EVENT1, EVENT2, RANGE, [SLOPE])
 * --------------------------------------------
 * Returns true if EVENT2 is in the view cone of
 * EVENT1, within RANGE, and EVENT1 has a clear
 * line-of-sight to EVENT2. SLOPE is an optional
 * parameter that sets the narrowness of the view
 * cone. 1 means a 45 degree slope and is the
 * default.
 *
 * Line-of-sight works with region IDs. If there
 * is a square on the line from EVENT1 to EVENT2
 * that has a different region ID from the square
 * that EVENT1 is standing on when the test is
 * performed, then line-of-sight is broken
 * and the function returns false.
 *
 * Example: this.eventInSight(0, -1, 8)
 * -------
 * If put in the Script box of the condition of
 * a conditinal branch, will execute that branch
 * if the current event can see the player at a
 * maximum range of 8 map squares, and with the
 * slope of the view cone set to the default
 * 45 degrees.
 *
 *
 * this.eventInRange(EVENT1, EVENT2, RANGE)
 * ---------------------------------------
 * Returns true if EVENT2 is within RANGE of EVENT1.
 *
 *
 * eventDistance(EVENT1, EVENT2)
 * ----------------------------
 * Returns the distance in map squares between EVENT1 and EVENT2.
 * Use in the script box for setting a variable, for example.
 *
 *
 * TERMS OF USE
 * Free for all applications. Be nice and provide credit if you
 * distribute your thingy.
 *
 * COMPATIBILITY
 * Doesn't override anything so should be compatible with everything.
 * No dependencies.
 */


var Kron = Kron || {};
Kron.AI_base = Kron.AI_base || {};

(function(){


// FUNCTIONS ACCESSIBLE IN EVENT CODE

// eventDistance(EVENT1, EVENT2)
// -----------------------------
// Just returns the distance between EVENT1 and EVENT2.
//
Game_Interpreter.prototype.eventDistance = function(event1_id, event2_id){
	var e1_loc = Kron.AI_base.getXY(event1_id, this.eventId());
	var e2_loc = Kron.AI_base.getXY(event2_id, this.eventId());
	var e1e2_dist = Kron.AI_base.getDistance(e1_loc.X, e1_loc.Y, e2_loc.X, e2_loc.Y);

	return e1e2_dist;
}

// eventInRange(EVENT1, EVENT2, RANGE)
// -----------------------------------
// Checks if EVENT1 is within RANGE of EVENT2.
//
Game_Interpreter.prototype.eventInRange = function(event1_id, event2_id, range){
	var e1_loc = Kron.AI_base.getXY(event1_id, this.eventId());
	var e2_loc = Kron.AI_base.getXY(event2_id, this.eventId());
	var e1e2_dist = Kron.AI_base.getDistance(e1_loc.X, e1_loc.Y, e2_loc.X, e2_loc.Y);

	if (e1e2_dist > range){
		return false;
	}
	else {
		return true;
	}
}

// eventInSight(EVENT1, EVENT2, RANGE, [SLOPE])
// -----------------------------------
// Checks if EVENT1 can see EVENT2 within RANGE.
// (SLOPE is optional and sets how narrow the sight cone is.
// 1 means a 45 degree slope.)
//
Game_Interpreter.prototype.eventInSight = function(event1_id, event2_id, range, slope){

	// Wait a bit to not hog the system when run parallell. :^/
	this.wait(10)

	slope = slope || 1;
	var e1_xy = Kron.AI_base.getXY(event1_id, this.eventId());
	var e2_xy = Kron.AI_base.getXY(event2_id, this.eventId());
	var diff_x = e2_xy.X - e1_xy.X;
	var diff_y = e2_xy.Y - e1_xy.Y;

	// Return false if event2 not within range of event1.
	if (!this.eventInRange(event1_id, event2_id, range)){
		return false;
	}

	// Return false if event2 is not inside view cone of event1.
	// First check that event1 is facing event2, then check that
	// event2 isn't outside the cone with slope 'slope'.
	if (Kron.AI_base.getDirection(event1_id, this.eventId()) === 2 &&
		(!(e1_xy.Y < e2_xy.Y) || Math.abs(diff_x) > slope * Math.abs(diff_y))){
		return false;
	}
	if (Kron.AI_base.getDirection(event1_id, this.eventId()) === 4 &&
		(!(e1_xy.X > e2_xy.X) || Math.abs(diff_y) > slope * Math.abs(diff_x))){
		return false;
	}
	if (Kron.AI_base.getDirection(event1_id, this.eventId()) === 8 &&
		(!(e1_xy.Y > e2_xy.Y) || Math.abs(diff_x) > slope * Math.abs(diff_y))){
		return false;
	}
	if (Kron.AI_base.getDirection(event1_id, this.eventId()) === 6 &&
		(!(e1_xy.X < e2_xy.X) || Math.abs(diff_y) > slope * Math.abs(diff_x))){
		return false;
	}

	// Return false if there is not a line of sight from event1 to event2.
	// First fetch the region ID of event1's current square.
	var e1_region_id = $gameMap.regionId(e1_xy.X, e1_xy.Y);
	// DEBUG console.log("e1_xy: " + e1_xy.X + ", " + e1_xy.Y + "; e2_xy: " + e2_xy.X + ", " + e2_xy.Y + "\n");

	// Calculate line-of-sight steps and increments.
	var steps = Math.abs(diff_x) > Math.abs(diff_y) ? Math.abs(diff_x) : Math.abs(diff_y);
	var x_inc = diff_x / steps;
	var y_inc = diff_y / steps;

	// Check if some square on the line from event1 to event2 has a different region ID
	// from starting square, thus blocking line-of-sight.
	look_x = e1_xy.X;
	look_y = e1_xy.Y;
	for (let i = 0; i <= steps; i++){
		// DEBUG console.log("Step: " + i + "; XY: " + Math.round(look_x) + ", " + Math.round(look_y) +
		// "; Region: " + $gameMap.regionId(Math.round(look_x), Math.round(look_y)) + "\n\n");
		if ($gameMap.regionId(Math.round(look_x), Math.round(look_y)) != e1_region_id){
			return false;
		}
		look_x += x_inc;
		look_y += y_inc;
	}

	// If we've come this far, all checks are a pass.
	return true;
 }


// INTERNAL STUFF

// Fetches direction of event/player/follower.
Kron.AI_base.getDirection = function(event_id, calling_event){

	if (event_id === 0){
		var event_dir = $gameMap.event(calling_event).direction();
	}
	else if (event_id === -1){
		var event_dir = $gamePlayer.direction();
	}
	else if (event_id < -1){
		follower_idx = Math.abs(event_id) - 2;
		var event_dir = $gamePlayer._followers.follower(follower_idx).direction();
	}
	else {
		var event_dir = $gameMap.event(event_id).direction();
	}

	return event_dir;
}

// Fetches X and Y coordinates of event/player/follower.
Kron.AI_base.getXY = function(event_id, calling_event){

	if (event_id === 0){
		var event_x = $gameMap.event(calling_event).x;
		var event_y = $gameMap.event(calling_event).y;
	}
	else if (event_id === -1){
		var event_x = $gamePlayer.x;
		var event_y = $gamePlayer.y;
	}
	else if (event_id < -1){
		follower_idx = Math.abs(event_id) - 2;
		var event_x = $gamePlayer._followers.follower(follower_idx).x;
		var event_y = $gamePlayer._followers.follower(follower_idx).y;
	}
	else {
		var event_x = $gameMap.event(event_id).x;
		var event_y = $gameMap.event(event_id).y;
	}

	return {X: event_x, Y: event_y};
}

// Calculates the distance between events e1 and e2.
Kron.AI_base.getDistance = function(e1x, e1y, e2x, e2y){

	return Math.floor(Math.hypot(e1x - e2x, e1y - e2y));
}


})()
