/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/fasttravel/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Allows you to fast travel between locations in your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.4.4
 * ----------------------------------------------------------------------------
 * Description: Allows you to fast travel between different locations in your
 * game. It can handle as many fast travel points as you want, and it also
 * allows you to set gold or item costs to use the travel (optional). You can
 * also show/hide fast travel locations via plugin command.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------------Required Setup---------------------------------
 * Before using this plugin, please set up at least one fast travel point.
 * ------------------------------Point Names-----------------------------------
 * Fast Travel Point names must be unique, as they are used as an ID to refer
 * to the fast travel point. This means you cannot have 2 fast travel points
 * with the same name.
 * ------------------------------Categories------------------------------------
 * If using categories, the category parameter in the Fast Travel point and
 * the category in the Call Scene command must match exactly. For example, if
 * a fast travel point has the category "Ice Land" then to include this point
 * in the scene, the Call Scene command must either be empty or have the
 * category "Ice Land" listed.
 * ------------------------------Saved Games-----------------------------------
 * This plugin partially supports saved games. You can add new fast travel
 * points to saved games with no issues. Removing and editing fast travel
 * points is not supported (outside of plugin commands).
 * ----------------------------Plugin Commands---------------------------------
 * Reinitialize - Reset all fast travel points to defaults
 * 
 * Call Scene - Opens the Fast Travel Scene. Optionally, provide categories
 *              so the scene only displays specific categories of fast travel
 *              points
 *
 * Discover Fast Travel Point - Changes the discovery status of the fast travel
 *                              point
 *
 * Change Map - Changes the map (and x, y) coordinates of the fast travel point
 *
 * Change Category - Changes the category of the fast travel point
 * ----------------------------Version History---------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command Reinitialize
 * @desc Reinitializes all fast travel data. Use this to debug saved games, not meant for use in released games.
 *
 * @command Call Scene
 * @desc Calls the Fast Travel scene
 *
 * @arg categories
 * @type text[]
 * @default []
 * @desc The categories to include in the scene, leave blank if not using categories.
 *
 * @command discover
 * @text Discover Fast Travel Point
 * @desc Discovers a fast travel point (or undiscovers)
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to discover/undiscover
 *
 * @arg discover
 * @type boolean
 * @desc Discovers the fast travel if true. Undiscovers the fast travel if false.
 * @default true
 *
 * @command Change Map
 * @desc Change which map the fast travel point goes to
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to change
 *
 * @arg map
 * @type number
 * @min 0
 * @desc New Map ID to use when fast travelling to this point
 *
 * @arg x
 * @type number
 * @default 0
 * @min 0
 * @desc New x coordinate to use when fast travelling to this point
 *
 * @arg y
 * @type number
 * @default 0
 * @min 0
 * @desc New y coordinate to use when fast travelling to this point
 *
 * @arg direction
 * @type number
 * @default 2
 * @min 0
 * @desc The direction to face after transfer. 2 = down, 4 = left, 6 = right, 8 = up
 *
 * @command Change Category
 * @desc Change which category of a fast travel point
 *
 * @arg name
 * @text Fast Travel Point Name
 * @desc The name of the fast travel point to change
 *
 * @arg category
 * @desc New category to assign to the fast travel point
 *
 * @param Fast Travel Points
 * @type struct<FastTravelPoint>[]
 * @default []
 * @desc Set up different fast travel points here
 *
 * @param Window Options
 *
 * @param Show Categories
 * @parent Window Options
 * @type boolean
 * @desc Whether to show a category window or not
 * @default false
 *
 * @param Use Costs
 * @parent Window Options
 * @type boolean
 * @desc Determine if there will ever be costs associated with fast travel
 * @default true
 *
 * @param Cost Text
 * @parent Window Options
 * @desc Text to show at the top of the cost window
 * @default \c[1]Costs:\c[0]
 *
 * @param Free Text
 * @parent Window Options
 * @desc Text to show for costs if the location has no cost
 * @default None
 *
 * @param Cost Window Lines
 * @parent Window Options
 * @type number
 * @min 2
 * @desc The number of lines of text to show in the cost window if using costs.
 * @default 3
 *
 * @param List Alignment
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The text alignment of the list window
 * @default left
 *
 * @param Other CGMZ Plugin Options
 *
 * @param Show Discover Toast
 * @parent Other CGMZ Plugin Options
 * @type boolean
 * @default true
 * @desc Show a toast window when a new fast travel point is discovered? (requires CGMZ ToastManager)
 *
 * @param Toast Text
 * @parent Other CGMZ Plugin Options
 * @default \c[1]Fast Travel Unlocked:\c[0]
 * @desc Text to describe a new fast travel point in the toast window (requires CGMZ ToastManager)
*/
/*~struct~FastTravelPoint:
 * @param Name
 * @type text
 * @desc The name of the fast travel point.
 * 
 * @param Discovered
 * @type boolean
 * @default true
 * @desc Determine whether the fast travel point is discovered at the start of the game.
 * 
 * @param Description
 * @desc Fast Travel description
 * 
 * @param Category
 * @desc The category this fast travel point belongs to (if using categories).
 *
 * @param Image
 * @type file
 * @dir img
 * @desc The image to show for the fast travel point.
 *
 * @param Map
 * @type number
 * @default 0
 * @desc The map to transfer to
 *
 * @param X
 * @type number
 * @min 0
 * @default 0
 * @desc The x-coordinate to transfer to on the map
 *
 * @param Y
 * @type number
 * @min 0
 * @default 0
 * @desc The y-coordinate to transfer to on the map
 *
 * @param Direction
 * @type number
 * @min 0
 * @default 2
 * @desc The direction to face after transfer. 2 = down, 4 = left, 6 = right, 8 = up
 *
 * @param Gold Cost
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of currency using this travel point costs.
 *
 * @param Item Cost Item
 * @type item
 * @min 0
 * @default 0
 * @desc The item id that is consumed upon using this travel point.
 *
 * @param Item Cost Amount
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of the given item using this travel point costs.
 *
 * @param Travel Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when fast travelling here
 *
 * @param Toast Sound Effect
 * @type file
 * @dir audio/se
 * @desc The sound effect to play when displaying a toast window for this fast travel point. Requires CGMZ ToastManager
 */
var Imported = Imported || {};
Imported.CGMZ_FastTravel = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Fast Travel"] = "1.0.0";
CGMZ.FastTravel = CGMZ.FastTravel || {};
CGMZ.FastTravel.parameters = PluginManager.parameters('CGMZ_FastTravel');
CGMZ.FastTravel.Points = JSON.parse(CGMZ.FastTravel.parameters["Fast Travel Points"]);
CGMZ.FastTravel.UseCosts = (CGMZ.FastTravel.parameters["Use Costs"] === "true");
CGMZ.FastTravel.ShowDiscoverToast = (CGMZ.FastTravel.parameters["Show Discover Toast"] === "true");
CGMZ.FastTravel.UseCategories = (CGMZ.FastTravel.parameters["Show Categories"] === "true");
CGMZ.FastTravel.CostText = CGMZ.FastTravel.parameters["Cost Text"];
CGMZ.FastTravel.FreeText = CGMZ.FastTravel.parameters["Free Text"];
CGMZ.FastTravel.CostWindowLines = Number(CGMZ.FastTravel.parameters["Cost Window Lines"]);
CGMZ.FastTravel.ToastText = CGMZ.FastTravel.parameters["Toast Text"];
CGMZ.FastTravel.ListAlignment = CGMZ.FastTravel.parameters["List Alignment"];
//=============================================================================
// CGMZ_FastTravelPoint
//-----------------------------------------------------------------------------
// Store and manage fast travel point data
//=============================================================================
function CGMZ_FastTravelPoint() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize fast travel point
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.initialize = function(point) {
	this._name = point.Name;
	this._discovered = (point.Discovered === "true");
	this._description = point.Description;
	this._image = point.Image;
	this._mapId = Number(point.Map);
	this._x = Number(point.X);
	this._y = Number(point.Y);
	this._dir = Number(point.Direction);
	this._category = point.Category;
	this.setupCosts(point);
	this._travelSe = point["Travel Sound Effect"];
	this._toastSe = point["Toast Sound Effect"];
};
//-----------------------------------------------------------------------------
// Initialize fast travel point costs
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.setupCosts = function(point) {
	this._goldCost = Number(point["Gold Cost"]);
	this._itemCostAmount = Number(point["Item Cost Amount"]);
	this._itemCostId = Number(point["Item Cost Item"]);
	this._hasCosts = (this._goldCost > 0 || this._itemCostAmount > 0);
};
//-----------------------------------------------------------------------------
// Determine if the fast travel point has costs
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.hasCosts = function(point) {
	return this._hasCosts;
};
//-----------------------------------------------------------------------------
// Subtract the costs from the player inventory
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.takeCosts = function() {
	$gameParty.loseGold(this._goldCost);
	$gameParty.loseItem($dataItems[this._itemCostId], this._itemCostAmount, false);
};
//-----------------------------------------------------------------------------
// Discover/undiscover the fast travel point
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.discover = function(discovered) {
	this._discovered = discovered
	if(discovered && Imported.CGMZ_ToastManager && CGMZ.FastTravel.ShowDiscoverToast) {
		this.setupDiscoverToast();
	}
};
//-----------------------------------------------------------------------------
// Set up the toast for if a point is discovered
//-----------------------------------------------------------------------------
CGMZ_FastTravelPoint.prototype.setupDiscoverToast = function() {
	const toast = {};
	toast.CGMZFastTravelToast = true;
	toast.name = this._name;
	if(this._toastSe !== "") toast.SE = {name: this._toastSe, pan: 0, pitch: 100, volume: 100};
	$cgmzTemp.createNewToast(toast);
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage fast travel data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize fast travel data
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_FastTravel_createPluginData.call(this);
	this.initializeFastTravelData(false);
};
//-----------------------------------------------------------------------------
// Initialize fast travel data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeFastTravelData = function(reinitialize) {
	if(!this._fastTravelPoints || reinitialize) {
		this.setupFastTravelVariables();
	}
	for(const pointData of CGMZ.FastTravel.Points) {
		const point = new CGMZ_FastTravelPoint(JSON.parse(pointData));
		if(!this.getFastTravelPoint(point._name)) this._fastTravelPoints.push(point);
	}
};
//-----------------------------------------------------------------------------
// Initialize fast travel variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupFastTravelVariables = function() {
	this._fastTravelPoints = [];
};
//-----------------------------------------------------------------------------
// Load new fast travel data after load
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_FastTravel_CGMZCore_onAfterLoad.call(this);
	this.initializeFastTravelData(false);
};
//-----------------------------------------------------------------------------
// Returns array of all fast travel points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllFastTravelPoints = function() {
	return this._fastTravelPoints;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered fast travel points
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredFastTravelPoints = function() {
	return this._fastTravelPoints.filter(point => point._discovered);
};
//-----------------------------------------------------------------------------
// Get fast travel point by name. Returns null if unsuccessful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFastTravelPoint = function(name) {
	return this._fastTravelPoints.find(point => point._name === name);
};
//-----------------------------------------------------------------------------
// Get fast travel point categories
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getFastTravelPointCategories = function() {
	const categories = [];
	for(const point of this._fastTravelPoints) {
		if(point._discovered && !categories.includes(point._category)) categories.push(point._category);
	}
	return categories;
};
//-----------------------------------------------------------------------------
// Returns array of all discovered fast travel points from a specific category
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllDiscoveredFastTravelPointsFromCategory = function(category) {
	return (category === "all") ? this.getAllDiscoveredFastTravelPoints() : this._fastTravelPoints.filter(point => point._category === category && point._discovered);
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverFastTravelPoint = function(name, discovered) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point.discover(discovered);
	}
};
//-----------------------------------------------------------------------------
// Alters the map settings of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeFastTravelPointMap = function(name, mapId, x, y, dir) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point._mapId = mapId;
		point._x = x;
		point._y = y;
		point._dir = dir;
	}
};
//-----------------------------------------------------------------------------
// Alters the map settings of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeFastTravelPointCategory = function(name, category) {
	const point = this.getFastTravelPoint(name);
	if(point) {
		point._category = category;
	}
};
//-----------------------------------------------------------------------------
// Get the number of fast travel locations discovered
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getTotalFastTravelPointsDiscovered = function() {
	return this.getAllDiscoveredFastTravelPoints().length;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and handling for plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_FastTravel_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_FastTravel_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_FastTravel", "Call Scene", this.pluginCommandFastTravelCallScene);
	PluginManager.registerCommand("CGMZ_FastTravel", "Reinitialize", this.pluginCommandFastTravelReinitialize);
	PluginManager.registerCommand("CGMZ_FastTravel", "discover", this.pluginCommandFastTravelDiscover);
	PluginManager.registerCommand("CGMZ_FastTravel", "Change Map", this.pluginCommandFastTravelChangeMap);
	PluginManager.registerCommand("CGMZ_FastTravel", "Change Category", this.pluginCommandFastTravelChangeCategory);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call fast travel scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelCallScene = function(args) {
	const categories = JSON.parse(args.categories);
	SceneManager.push(CGMZ_Scene_FastTravel);
	if(categories.length > 0) {
		SceneManager.prepareNextScene(categories);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - Reinitialize the fast travel data (for saved games)
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelReinitialize = function() {
	$cgmz.initializeFastTravelData(true);
};
//-----------------------------------------------------------------------------
// Plugin Command - Set the discover status of a fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelDiscover = function(args) {
	$cgmz.discoverFastTravelPoint(args.name, (args.discover === 'true'));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change map settings of fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelChangeMap = function(args) {
	$cgmz.changeFastTravelPointMap(args.name, Number(args.map), Number(args.x), Number(args.y), Number(args.direction));
};
//-----------------------------------------------------------------------------
// Plugin Command - Change category of fast travel point
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandFastTravelChangeCategory = function(args) {
	$cgmz.changeFastTravelPointCategory(args.name, args.category);
};
//=============================================================================
// CGMZ_Scene_FastTravel
//-----------------------------------------------------------------------------
// Handle the fast travel scene
//=============================================================================
function CGMZ_Scene_FastTravel() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_FastTravel.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_FastTravel.prototype.constructor = CGMZ_Scene_FastTravel;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.initialize = function(categories = null) {
	this._categories = (categories) ? categories : $cgmz.getFastTravelPointCategories();
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Prepare
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.prepare = function(categories = null) {
	this._categories = (categories) ? categories : $cgmz.getFastTravelPointCategories();
};
//-----------------------------------------------------------------------------
// Create fast travel windows
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	if(CGMZ.FastTravel.UseCategories) {
		this.createCategoryWindow();
	}
	this.createListWindow();
	if(CGMZ.FastTravel.UseCosts) {
		this.createCostWindow();
	}
	this.createDescriptionWindow();
	this.createImageWindow();
};
//-----------------------------------------------------------------------------
// Create category window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
    this._categoryWindow = new CGMZ_Window_FastTravelCategory(rect, this._categories);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_FastTravelList(rect);
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	if(CGMZ.FastTravel.UseCategories) {
		this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
		this._categoryWindow.setListWindow(this._listWindow);
	} else {
		this._listWindow.setHandler('cancel', this.popScene.bind(this));
		this._listWindow.activate();
		this._listWindow.select(0);
	}
	this._listWindow.refresh();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.listWindowRect = function() {
	const x = 0;
	const y = (CGMZ.FastTravel.UseCategories) ? this._categoryWindow.y + this._categoryWindow.height : this.mainAreaTop();
	const width = Graphics.boxWidth / 3;
	let height = Graphics.boxHeight - y;
	if(CGMZ.FastTravel.UseCosts) {
		height -= this.calcWindowHeight(CGMZ.FastTravel.CostWindowLines, false);
	}
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create cost window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createCostWindow = function() {
	const rect = this.costWindowRect();
    this._costWindow = new CGMZ_Window_FastTravelCost(rect);
	this._costWindow.refresh();
	this._listWindow.setCostWindow(this._costWindow);
    this.addWindow(this._costWindow);
};
//-----------------------------------------------------------------------------
// Get cost window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.costWindowRect = function() {
	const x = 0;
	const y = this._listWindow.height + this._listWindow.y;
	const width = this._listWindow.width;
	const height = this.calcWindowHeight(CGMZ.FastTravel.CostWindowLines, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createDescriptionWindow = function() {
	const rect = this.descriptionWindowRect()
    this._descriptionWindow = new CGMZ_Window_FastTravelDescription(rect);
	this._descriptionWindow.refresh();
	this._listWindow.setDescriptionWindow(this._descriptionWindow);
    this.addWindow(this._descriptionWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.descriptionWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth * 2 / 3;
	const height = this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.createImageWindow = function() {
	const rect = this.imageWindowRect()
    this._imageWindow = new CGMZ_Window_FastTravelImage(rect);
	this._imageWindow.refresh();
	this._listWindow.setImageWindow(this._imageWindow);
    this.addWindow(this._imageWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.imageWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._descriptionWindow.height + this._descriptionWindow.y;
	const width = this._descriptionWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On Category Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onCategoryOk = function() {
	this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onListCancel = function() {
	this._listWindow.select(0);
	this._listWindow.ensureCursorVisible();
	this._listWindow.deselect();
	this._listWindow.deactivate();
	this._categoryWindow.activate();
	this._descriptionWindow.contents.clear();
	this._imageWindow.contents.clear();
	this._imageWindow._sprite.hide();
	if(CGMZ.FastTravel.UseCosts) {
		this._costWindow.contents.clear();
	}
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_FastTravel.prototype.onListOk = function() {
	const fastTravel = this._listWindow.item();
	if(fastTravel._travelSe) {
		const se = {name: fastTravel._travelSe, pan: 0, pitch: 100, volume: 100};
		AudioManager.playSe(se);
	}
	fastTravel.takeCosts();
	$gamePlayer.reserveTransfer(fastTravel._mapId, fastTravel._x, fastTravel._y, fastTravel._dir, 0);
	SceneManager.goto(Scene_Map);
};
//=============================================================================
// CGMZ_Window_FastTravelCost
//-----------------------------------------------------------------------------
// Shows cost of the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelCost(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelCost.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelCost.prototype.constructor = CGMZ_Window_FastTravelCost;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.refresh();
	this._item = null;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawCost();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.drawCost = function() {
	this.CGMZ_drawTextLine(CGMZ.FastTravel.CostText, 0, 0, this.contents.width, 'center');
	let y = this.lineHeight();
	if(!this._item.hasCosts()) {
		this.CGMZ_drawTextLine(CGMZ.FastTravel.FreeText, 0, y, this.contents.width, 'center');
	}
	if(this._item._goldCost > 0) {
		this.drawText(this._item._goldCost + TextManager.currencyUnit, 0, y, this.contents.width, 'center');
		y += this.lineHeight();
	}
	if(this._item._itemCostAmount > 0) {
		const item = $dataItems[this._item._itemCostId];
		let widthNeeded = this.textWidth(this._item._itemCostAmount + "x ");
		widthNeeded += ImageManager.iconWidth + 4;
		widthNeeded += this.textWidth(item.name);
		let x = ((this.contents.width - widthNeeded) / 2).clamp(0, this.contents.width);
		this.drawText(this._item._itemCostAmount + "x", x, y, this.contents.width, 'left');
		x += this.textWidth(this._item._itemCostAmount + "x ");
		this.drawItemName(item, x, y, this.contents.width-x);
	}
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCost.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelDescription
//-----------------------------------------------------------------------------
// Shows description of the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelDescription(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelDescription.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelDescription.prototype.constructor = CGMZ_Window_FastTravelDescription;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this._item = null;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawItemDescription();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.drawItemDescription = function() {
	this.CGMZ_drawText(this._item._description, 0, 0, 0, this.contents.width);
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelDescription.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelImage
//-----------------------------------------------------------------------------
// Shows image for the fast travel location
//=============================================================================
function CGMZ_Window_FastTravelImage(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelImage.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_FastTravelImage.prototype.constructor = CGMZ_Window_FastTravelImage;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this._item = null;
	this._sprite = new Sprite();
	this.addInnerChild(this._sprite);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.refresh = function() {
	this.contents.clear();
	if(this._item) {
		this.drawItemImage();
	}
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.drawItemImage = function() {
	this._sprite.hide();
	const imageData = $cgmzTemp.getImageData(this._item._image);
	this._sprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
	this._sprite.bitmap.addLoadListener(this.drawImage.bind(this));
};
//-----------------------------------------------------------------------------
// Draw the item description
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.drawImage = function() {
	let scaleX = 1;
	let scaleY = 1;
	if(this._sprite.width > this.contents.width) {
		scaleX = this.contents.width/this._sprite.width;
	}
	if(this._sprite.height > this.contents.height) {
		scaleY = this.contents.height/this._sprite.height;
	}
	this._sprite.scale.x = scaleX;
	this._sprite.scale.y = scaleY;
	this._sprite.x = (this.contents.width - this._sprite.width * scaleX) / 2;
	this._sprite.y = (this.contents.height - this._sprite.height * scaleY) / 2;
	this._sprite.show();
};
//-----------------------------------------------------------------------------
// Set item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelImage.prototype.setItem = function(item) {
	if(this._item === item) return;
	this._item = item;
	this.refresh();
};
//=============================================================================
// CGMZ_Window_FastTravelList
//-----------------------------------------------------------------------------
// Selectable window for choosing a fast travel point in a list.
//=============================================================================
function CGMZ_Window_FastTravelList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_FastTravelList.prototype.constructor = CGMZ_Window_FastTravelList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._category = {name: "all"};
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setItem = function(category) {
    if(category === this._category) return;
	this._category = category;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if current item enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};
//-----------------------------------------------------------------------------
// Determine if point is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.isEnabled = function(point) {
    return (point && this.meetsCosts(point));
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.meetsCosts = function(point) {
    if(point.hasCosts()) {
		if(point._goldCost > $gameParty.gold()) {
			return false;
		}
		if(point._itemCostAmount > 0) {
			const numItems = $gameParty.numItems($dataItems[point._itemCostId]);
			return (numItems >= point._itemCostAmount);
		}
	}
	return true;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.makeItemList = function() {
	if(this._category) {
		this._data = $cgmz.getAllDiscoveredFastTravelPointsFromCategory(this._category.name);
	} else {
		this._data = [];
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.changePaintOpacity(this.isEnabled(item));
    this.drawText(item._name, rect.x, rect.y, rect.width, CGMZ.FastTravel.ListAlignment);
};
//-----------------------------------------------------------------------------
// Set description window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setDescriptionWindow = function(descriptionWindow) {
    this._descriptionWindow = descriptionWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set image window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setImageWindow = function(imageWindow) {
    this._imageWindow = imageWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set cost window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.setCostWindow = function(costWindow) {
    this._costWindow = costWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update description window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelList.prototype.callUpdateHelp = function() {
    if(this._descriptionWindow) {
		this._descriptionWindow.setItem(this.item());
	}
	if(this._imageWindow) {
		this._imageWindow.setItem(this.item());
	}
	if(this._costWindow) {
		this._costWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_FastTravelCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the fast travel scene
//=============================================================================
function CGMZ_Window_FastTravelCategory(rect, categories) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_FastTravelCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_FastTravelCategory.prototype.constructor = CGMZ_Window_FastTravelCategory;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.initialize = function(rect, categories) {
	this._categories = categories;
    Window_HorzCommand.prototype.initialize.call(this, rect);
	this.refresh();
	this.activate();
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.makeCommandList = function() {
	for(const category of this._categories) {
		const name = category;
		const symbol = category;
		this.addCommand(name, symbol, true);
	}
};
//-----------------------------------------------------------------------------
// Draw the item with text codes
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.drawItem = function(index) {
	const rect = this.itemLineRect(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawText(this.commandName(index), rect.x, rect.y, rect.width, this.itemTextAlign());
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_FastTravelCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Fast Travel Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Processing for custom toasts. Alias
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_FastTravel_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_FastTravel_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZFastTravelToast')) {
		this.CGMZ_drawTextLine(CGMZ.FastTravel.ToastText, 0, 0, this.contents.width, 'center');
		this.CGMZ_drawTextLine(toastObject.name, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}