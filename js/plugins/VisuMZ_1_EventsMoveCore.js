//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.57;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.57] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 * 
 * <Map Load Common Event: x>
 * <Map Load Common Events: x, x, x>
 * 
 * - Used for: Map Notetags
 * - When this map is loaded, run the specified Common Events once available.
 *   - Does NOT trigger if you transfer to a different part of the same map.
 * - Replace 'x' with a number representing the ID of the Common Event you wish
 *   to reserve and run once ready.
 * 
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Circle: x>
 * <Activation Delta: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Encounter Half Square: x>
 * <Encounter Half Circle: x>
 * <Encounter Half Delta: x>
 * <Encounter Half Row: x>
 * <Encounter Half Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be halved.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterHalf(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate halving effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Encounter None Square: x>
 * <Encounter None Circle: x>
 * <Encounter None Delta: x>
 * <Encounter None Row: x>
 * <Encounter None Column: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If the player is within the 'x' area effect of this event, the random
 *   encounter rate will be suppressed completely.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Circle: A circle-shaped range with the event at the center.
 *   - Delta: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * Script Call Check:
 * 
 *   $isTileEncounterNone(x, y)
 * 
 * - This can be used to check if a certain map tile (x, y) has an encounter
 *   rate suppression effect on it.
 * - Returns a boolean (true or false) when used.
 * 
 * ---
 * 
 * <Erase if Encounter Half>
 * <Erase if Encounter None>
 * 
 * - Used for: Event Notetags ONLY
 * - Automatically erase this event if the player's party has an encounter half
 *   or encounter none effect, or if the event has spawned in an encounter half
 *   or encounter none area.
 * - This check only occurs in two situations: when the map is first loaded
 *   after being teleported into or when the player leaves a menu and returns
 *   back to the map.
 * - Events that have been erased due to this effect will NOT return even if
 *   the encounter half/none effect is removed while the player is still on the
 *   map. The event will return if the player exits the map and comes back.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *   - If text codes are used, avoid text codes that use < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *   - You can use text codes with < and > wrappers.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Label Hue Shift: +x>
 * <Label Hue Shift: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the hue of the event label by +x or -x every frame.
 *   - Keep in mind that since this is changing hue, this will appear to have
 *     no effect if you are using black and white labels.
 *   - Use labels with text codes that add color to them like '\C[4]text'
 * - This only works with the sprite version of event labels and does not work
 *   with the legacy version.
 * 
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Scale: x%>
 * 
 * <Scale X: x%>
 * <Scale Y: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the scale of the sprite to the designated size.
 * - For <Scale: x%> variant: replace 'x' with a number representing the
 *   scaling overall percentage to be used.
 * - For <Scale X: x%> variant, replace 'x' with a number representing the x
 *   factor for the horizontal scaling percentage to be used.
 * - For <Scale Y: y%> variant, replace 'y' with a number representing the y
 *   factor for the vertical scaling percentage to be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Read
 * - Runs the page of a different event remotely.
 * - This will run the page of the target event on the CURRENT event.
 * - This means that any "This Event" commands will be applied to the event
 *   using this Plugin Command and NOT the target event that page data is being
 *   retrieved from.
 * - Think of it as the current event using the target called event as a
 *   Common Event ala how RPG Maker 2003 works (for those familiar with it).
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change (Temporary)
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 * - This will remain deleted and invisible for events.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Popup Plugin Commands ===
 * 
 * ---
 * 
 * Event Popup: Player
 * - Makes a centered event popup on the player sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Follower
 * - Makes a centered event popup on target follower sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Follower Index:
 *   - Which follower index to play popup?
 *   - Index starts at 0.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second.
 *   - You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Event
 * - Makes a centered event popup on target event sprite.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Event ID:
 *   - The ID of the event to play popup on.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Event Popup: Target Tile
 * - Makes a centered event popup on target tile.
 * - Requires VisuMZ_1_MessageCore!
 * - Cannot be used in battle!
 * 
 *   Map Tile X:
 *   Map Tile Y:
 *   - The x/y coordinate of the map tile.
 *   - You may use JavaScript code.
 * 
 *   Message Text:
 *   - Insert the text to be displayed.
 *   - Text codes can be used.
 * 
 *   Message Duration:
 *   - What is the frame duration of the event popup?
 *   - 60 frames = 1 second. You may use code.
 * 
 *   Popup Settings:
 *   - These settings let you adjust how the popup animates.
 *   - See "Popup Settings" section below.
 * 
 * ---
 * 
 * Popup Settings
 * 
 *   Fade Settings:
 * 
 *     Fade In Duration:
 *     - How many frames does it take to fade in?
 *     - 60 frames = 1 second.
 * 
 *     Fade Out Duration:
 *     - How many frames does it take to fade out?
 *     - 60 frames = 1 second.
 * 
 *   Offset Settings:
 * 
 *     Starting Offset X:
 *     - Offsets the starting x position.
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Starting Offset Y:
 *     - Offsets the starting y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *     Ending Offset X:
 *     - Offsets the ending x position. 
 *     - Negative: left. Positive: right.
 *     - You may use code.
 * 
 *     Ending Offset Y:
 *     - Offsets the ending y position. 
 *     - Negative: up. Positive: down.
 *     - You may use code.
 * 
 *   Scaling Settings:
 * 
 *     Starting Scale X:
 *     - What is the starting scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Starting Scale Y:
 *     - What is the starting scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale X:
 *     - What is the ending scale x?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *     Ending Scale Y:
 *     - What is the ending scale y?
 *     - 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 *     - You may use code.
 * 
 *   Angle Settings:
 * 
 *     Starting Offset Angle:
 *     - What is the starting angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *     Ending Offset Angle:
 *     - What is the ending angle offset?
 *     - Use numbers between 0 and 360.
 *     - You may use code.
 * 
 *   Misc Settings:
 * 
 *     Arc Peak:
 *     - This is the height of the popup's trajectory arc in pixels.
 *     - Positive: up. Negative: down.
 *     - You may use code.
 * 
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Mobile-Enabled?:
 *   - Enable event labels for mobile devices?
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Path Finding
 * 
 *   Mobile-Enabled?:
 *   - Enable diagonal pathfinding for mobile devices?
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.57: March 14, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Plugin Command: "Event Icon: Delete" will now keep an event icon cleared
 *    until the newly added Plugin Command: "Event Icon: Restore" is used.
 *    Update made by Arisu.
 * ** Plugin Command: "Event Icon: Change" is now renamed to have "(Temporary)"
 *    after its name in order to clarify the temporary changes made to it.
 * * New Features!
 * ** New Plugin Command added by Arisu:
 * *** Event Icon: Event Icon: Change (Forced)
 * **** Change the icon that appears on an event.
 * **** This change is forced and needs to be restored.
 * *** Event Icon: Restore
 * **** Restores a deleted or forced icon that appears on an event.
 * 
 * Version 1.56: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added fail safes for activation proximity notetags when loaded from past
 *    save files without Events and Movement Core installed. Added by Arisu.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Encounter Half Square: x>
 * *** <Encounter Half Circle: x>
 * *** <Encounter Half Delta: x>
 * *** <Encounter Half Row: x>
 * *** <Encounter Half Column: x>
 * *** <Encounter None Square: x>
 * *** <Encounter None Circle: x>
 * *** <Encounter None Delta: x>
 * *** <Encounter None Row: x>
 * *** <Encounter None Column: x>
 * **** If the player is within the 'x' area effect of this event, the random
 *      encounter rate will be halved or suppressed completely depending on the
 *      notetag used.
 * **** These include script call checks.
 * *** <Erase if Encounter Half>
 * *** <Erase if Encounter None>
 * **** Automatically erase this event if the player's party has an encounter
 *      half or encounter none effect, or if the event has spawned in an
 *      encounter half or encounter none area.
 * **** This check only occurs in two situations: when the map is first loaded
 *      after being teleported into or when the player leaves a menu and
 *      returns back to the map.
 * **** Events that have been erased due to this effect will NOT return even if
 *      the encounter half/none effect is removed while the player is still on
 *      the map. The event will return if the player exits the map and comes
 *      back.
 * 
 * Version 1.55: December 14, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Event Popup: Player
 * *** Event Popup: Follower
 * *** Event Popup: Event
 * *** Event Popup: Target Tile
 * **** Makes a centered event popup on the player sprite, target follower
 *      sprite, target event sprite, or target tile.
 * **** All of these new Plugin Commands require VisuMZ_1_MessageCore and
 *      cannot be used in battle.
 * 
 * Version 1.54: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated to reduce confusion:
 * *** Call Event: Remote Read
 * **** This will run the page of the target event on the current event.
 * **** This means that any "This Event" commands will be applied to the event
 *      using this Plugin Command and NOT the target event that page data is
 *      being retrieved from.
 * **** Think of it as the current event using the target called event as a
 *      Common Event ala how RPG Maker 2003 works (for those familiar with it).
 * * Feature Update!
 * ** Renamed "Call Event: Remote Activation" to "Call Event: Remote Read" to
 *    reduce confusion.
 * * Feature Update!
 * ** <Activation Radius: x> notetag is now defined as <Activation Delta: x>
 * *** 'Radius' variant will still work and function as 'Delta' but will no
 *     longer be listed in the help file as 'Radius'
 * *** This is changed to avoid confusion with the new notetag.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by AndyL:
 * *** <Activation Circle: x>
 * **** A circle-shaped range with the event at the center.
 * **** 'x' represents the distance from the center.
 * 
 * Version 1.53: August 17, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** <Map Load Common Event: x>
 * ** <Map Load Common Events: x, x, x>
 * *** When this map is loaded, run the specified Common Events once available.
 * **** Does NOT trigger if you transfer to a different part of the same map.
 * 
 * Version 1.52: July 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated help file for <Label: text> notetags:
 * *** If text codes are used, avoid text codes that use < and > wrappers.
 * ** Updated help file for <Label> sandwich notetags:
 * *** You can use text codes with < and > wrappers.
 * * Feature Update!
 * ** Event labels now work properly with scaling sprites.
 * * New Features!
 * ** New notetag added by Arisu and sponsored by Anon:
 * *** <Label Hue Shift: +x>
 * *** <Label Hue Shift: -x>
 * **** Changes the hue of the event label by +x or -x every frame.
 * **** Keep in mind that since this is changing hue, this will appear to have
 *      no effect if you are using black and white labels.
 * **** Use labels with text codes that add color to them like '\C[4]text'
 * **** This only works with the sprite version of event labels and does not
 *      work with the legacy version.
 * 
 * Version 1.51: June 15, 2023
 * * Bug Fixes!
 * ** Provided a fail safe for plugins using the scaling options from this
 *    plugin but do not have scaling parameters identified. The scaling ratio
 *    should now default to 1.0. Fix made by Olivia.
 * * Feature Update!
 * ** Diagonal pathfinding is now improved as to not get stuck on tight corners
 *    on the map. Feature update made by Arisu.
 * 
 * Version 1.50: April 13, 2023
 * * Bug Fixes!
 * ** <Icon: x> should now update correctly when changing pages through self
 *    switches or other event conditions. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Event Labels > Mobile-Enabled?
 * *** Plugin Parameters > Movement > Pathfinding > Mobile-Enabled?
 * **** These settings allow you to enable or disable certain features when
 *      played on mobile devices for better performance.
 * 
 * Version 1.49: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Event Notetag and Comment Tags added by Arisu:
 * *** <Scale: x%>
 * *** <Scale X: x%>
 * *** <Scale Y: y%>
 * **** Changes the scale of the sprite to the designated size.
 * 
 * Version 1.48: January 20, 2023
 * * Feature Update!
 * ** <Move Synch> for certain types will also copy facing directions even if
 *    there are no tile movements (ie changing directions when pressed up
 *    against and obstacle). Update made by Arisu.
 * 
 * Version 1.47: November 10, 2022
 * * Feature Update!
 * ** If "Follower: Set Global Chase" is set to false, followers will no longer
 *    jump towards the player location when the player jumps. This does NOT
 *    apply to gather or location changing players. Followers will still have
 *    to synchronize their positions there regardless in order to maintain
 *    consistency. Update made by Olivia.
 * 
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
 * 
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Read
 * @desc Runs the page of a different event remotely. This will run
 * the page of the target event on the CURRENT event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change (Temporary)
 * @desc Change the icon that appears on an event.
 * This change is temporary and resets upon new events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChangeForced
 * @text Event Icon: Change (Forced)
 * @desc Change the icon that appears on an event.
 * This change is forced and needs to be restored.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 * This will remain deleted and invisible for events.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconRestore
 * @text Event Icon: Restore
 * @desc Restores a deleted or forced icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupPlayer
 * @text Event Popup: Player
 * @desc Makes a centered event popup on the player sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "+\\LastGainObjQuantity\\LastGainObj"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupFollower
 * @text Event Popup: Follower
 * @desc Makes a centered event popup on target follower sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @desc Which follower index to play popup?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[23]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupEvent
 * @text Event Popup: Event
 * @desc Makes a centered event popup on target event sprite.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to play popup on.
 * Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "Line1\nLine2"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MsgPopupTargetTile
 * @text Event Popup: Target Tile
 * @desc Makes a centered event popup on target tile.
 * Requires VisuMZ_1_MessageCore! Cannot be used in battle!
 *
 * @arg TileX:eval
 * @text Map Tile X
 * @desc The x coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.width() / 2
 *
 * @arg TileY:eval
 * @text Map Tile Y
 * @desc The y coordinate of the map tile.
 * You may use JavaScript code.
 * @default $gameMap.height() / 2
 *
 * @arg MessageText:json
 * @text Message Text
 * @type note
 * @desc Insert the text to be displayed.
 * Text codes can be used.
 * @default "\\I[87]"
 * 
 * @arg MsgDuration:eval
 * @text Message Duration
 * @parent MessageText:json
 * @desc What is the frame duration of the event popup?
 * 60 frames = 1 second. You may use code.
 * @default 60
 *
 * @arg PopupExtra:struct
 * @text Popup Settings
 * @type struct<PopupExtra>
 * @desc These settings let you adjust how the popup animates.
 * @default {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param MobileEnabled:eval
 * @text Mobile-Enabled?
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable event labels for mobile devices?
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param PathFind
 * @text Path Finding
 *
 * @param PathfindMobileEnabled:eval
 * @text Mobile-Enabled?
 * @parent PathFind
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Enable diagonal pathfinding for mobile devices?
 * @default false
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Popup Extra Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PopupExtra:
 *
 * @param Fade
 * @text Fade Settings
 *
 * @param fadeInDuration:eval
 * @text Fade In Duration
 * @parent Fade
 * @desc How many frames does it take to fade in?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param fadeOutDuration:eval
 * @text Fade Out Duration
 * @parent Fade
 * @desc How many frames does it take to fade out?
 * 60 frames = 1 second.
 * @default 8
 *
 * @param Offset
 * @text Offset Settings
 *
 * @param startOffsetX:eval
 * @text Starting Offset X
 * @parent Offset
 * @desc Offsets the starting x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param startOffsetY:eval
 * @text Starting Offset Y
 * @parent Offset
 * @desc Offsets the starting y position. You may use code.
 * Negative: up. Positive: down.
 * @default -48
 *
 * @param endOffsetX:eval
 * @text Ending Offset X
 * @parent Offset
 * @desc Offsets the ending x position. You may use code.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param endOffsetY:eval
 * @text Ending Offset Y
 * @parent Offset
 * @desc Offsets the ending y position. You may use code.
 * Negative: up. Positive: down.
 * @default -96
 *
 * @param Scale
 * @text Scaling Settings
 *
 * @param startScaleX:eval
 * @text Starting Scale X
 * @parent Scale
 * @desc What is the starting scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param startScaleY:eval
 * @text Starting Scale Y
 * @parent Scale
 * @desc What is the starting scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleX:eval
 * @text Ending Scale X
 * @parent Scale
 * @desc What is the ending scale x? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param endScaleY:eval
 * @text Ending Scale Y
 * @parent Scale
 * @desc What is the ending scale y? You may use code.
 * 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
 * @default 0.8
 *
 * @param Angle
 * @text Angle Settings
 *
 * @param startAngle:eval
 * @text Starting Offset Angle
 * @parent Angle
 * @desc What is the starting angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 *
 * @param endAngle:eval
 * @text Ending Offset Angle
 * @parent Angle
 * @desc What is the ending angle offset?
 * Use numbers between 0 and 360. You may use code.
 * @default +0
 * 
 * @param Misc
 * @text Misc Settings
 * 
 * @param Arc:eval
 * @text Arc Peak
 * @parent Misc
 * @desc This is the height of the popup's trajectory arc
 * in pixels. Positive: up. Negative: down. Code allowed.
 * @default +0
 *
 */
//=============================================================================

function _0x5888(){const _0x490e23=['Map%1.json','turnTowardCharacter','getSavedEventLocation','gjzAH','updateText','trigger','_offsetX','setDestination','ofLbp','BoatSpeed','endScale','updateShadow','keys','CarryPose','nsASJ','roundYWithDirection','JXVLU','TiltVert','SlowerSpeed','isPlaytest','Map\x20%1\x20Switch\x20%2','setupChild','isRegionAllowPass','setMapValue','_eventIcon','opacity','sllTN','registerSelfEvent','getInputDir8','naZim','disable','SILENCE','setupCopyEvent','Region','_startY','setupSaveEventLocations','PPIfA','PosY','metCPC','match','jIIbV','AcPKR','_periodicRefreshTimer','_callEventMap','mirror\x20horz','setupRegionRestrictions','update','setNumberInput','isMobileDevice','HEART','checkAdvancedSwitchVariablePresent','EventIconChange','PageId','MWGnJ','Game_Follower_initialize','_event','morphInto','SelfSwitchABCD','isMapSwitch','AeVBh','PostSpawnJS','UHjlY','SpawnEventDespawnRegions','gBpbW','SelfVariables','_commonEvents','setOpacity','FaceSynchAllSynchTargets','eRBDG','isShadowShrink','vpUQz','isLongPressed','DmThI','rDpuv','setItemChoice','CyYzo','FollowerSetTargetChase','setTileBitmap','_comments','startMapCommonEventOnOK','_saveEventLocation','command108','Game_Player_increaseSteps','_spawnPreserved','getDiagonalDestination','cZJyl','contentsOpacity','forceMoveRoute','startOffsetY','roundX','boxWidth','_filename','Game_Player_executeMove','qwGOX','ovsPi','eventsXyNt','KcYWM','setPlayerDiagonalSetting','Passability','checkSmartEventCollision','round','EventLabelVisible','ANGER','USER-DEFINED\x203','drawIcon','checkEventsMoveCoreStringTags','bReLH','isRegionDockable','advancedFunc','OcjzF','_type','zfctv','bwpEw','Game_Event_event','updateBitmapSmoothing','DIAGONAL_PATHFINDING_EVENT_LIMIT','startCallEvent','Visible','MUSIC\x20NOTE','deleteEventLocation','GegbT','setPose','updateSpritePosition','PreloadedMaps','PostMorphJS','unlock','DEFAULT_SHIFT_Y','setAllowEventAutoMovement','attachPictureMaxSize','startsWith','setupSpawnedEvents','vSjXH','tileWidth','screenX','BfxfE','_lastAttachPictureScale','mimic','chaseCharacter','FollowerIndex','STR','xigSr','fadeOut','_selfTargetItemChoice','Self\x20Variable\x20%1','startEncounterEffect','VisuMZ_Setup_Preload_Map','switch2Valid','setFrames','Game_Event_updateParallel','initEventsMoveCoreSettings','USER-DEFINED\x201','regionList','createContents','COLLAPSE','_forceHideFollower','needsAttachPictureUpdate','executeMove','Game_Timer_stop','filename','_shadowSprite','VisuMZ_0_CoreEngine','VvXkY','Step2Preserve','Scene_Map_onMapLoadedEncErase','fKueP','ZIfpd','Map%1-Event%2','list','correctFacingDirection','innerWidth','pluginCommandCallEvent','processMoveRouteBalloon','mnGgD','mirror\x20vert','getSelfTarget','timerText','isSelfSwitch','_diagonalSupport','initMembersEventsMoveCore','EBrPb','Game_Event_isCollidedWithPlayerCharacters','characterIndex','SelfSwitches','setDiagonalDirection','jLuly','mapId','SPIN\x20CCW','Seconds','_visiblePlayerX','isDashingEnabled','clearSpriteOffsets','processMoveRouteJumpForward','Boat','OvIBV','parameters','UsaeO','_visiblePlayerY','IrcBB','_eventLabelOffsetX','maxSize','FALSE','onChange','player','prototype','max','characterPatternYVS8','_activationProximityAutoTriggerBypass','RQtoV','processMoveRouteTeleportTo','bufferY','string','createLabelWindowForTarget','tjGdT','canPassDiagonally','Window_EventItem_onOk','Step1EventId','Lklql','EventTimerFramesSet','nPjAB','pageIndex','_activationProximity','setValue','front','sXlFV','htBSm','setStopFollowerChasing','increaseSteps','getEventIconData','ITEM','isBattleTest','uwkCM','canStartLocalEvents','Sprite_Character_setCharacterBitmap','GUxhl','DpdKZ','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UYDzV','checkExistingEntitiesAt','Game_Player_getInputDirection','tileCoordinates','itemPadding','_attachPictureSprite','Game_CharacterBase_realMoveSpeed','Frames','_moveRoute','PlayerForbid','setupSpawnTest','executeCommandCommonEvent','erase','_active','isEventTest','_callEventData','FgzjT','setPattern','updateAttachPictureSprite','TbgIA','dSSbV','FCmNf','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isMoving','createIconSprite','of\x20Preloaded\x20Maps.\x0a\x0a','lRBXS','Game_Event_initialize','setFrame','_trigger','_spriteset','ZMNTV','_hidden','pages','shadowFilename','cHzjs','_pattern','_visibleEventY','loadPicture','_randomHomeX','rNwxu','mpsBq','_characterName','RyzFN','AMybO','ULGyo','Window_EventItem_onCancel','_randomMoveWeight','fadeIn','_customZ','$callEventMap','processMoveSynchCustom','isTriggerIn','Game_Map_events','pPgiS','cxhpk','charAt','isShadowVisible','attachPictureScale','_startX','checkEventTriggerThere','create','_regionRules','_moveRouteIndex','Jddxc','MessageCore','drawText','USER-DEFINED\x204','getAttachPictureBitmapHeight','_offsetY','AirshipSpeed','Game_Interpreter_updateWaitMode','_starting','FcaMQ','DashEnableToggle','PreMorphJS','VariableGetSelfVariableID','MzFqq','_eventOverloadThreshold','processMoveSynchMirrorVert','moveRouteIndex','hasMoveOnlyRegions','log','Name','_actuallyMoving','isAnyEventStarting','_labelWindow','fyGXT','fontFace','return\x20%1','hOepG','QbAJA','initFollowerController','IefTo','screenY','Game_CommonEvent_isActive','QBmgp','removeChild','reverse\x20copy','processMoveRouteTeleportToCharacter','Game_SelfSwitches_setValue','setSelfValue','processMoveRouteSetIndex','down','_seconds','WalkForbid','isAdvancedVariable','isTransparent','_moveSpeed','encounterProximityDistance','posEventsMoveCore','initialize','deleteIconsOnEventsDataKey','_scaleY','RegionTouch','executeCommand','HURT','deletePreservedMorphEventDataKey','tCHqd','processMoveRouteJumpTo','refreshBushDepth','CPC','updateEventIconSprite','originalText','EVAL','frontX','outlineColor','ZeDQE','MapSwitches','fQxyH','_duration','LEFT','_needsRefresh','ylxkZ','DiagonalSpeedMultiplier','ARRAYEVAL','deltaXFrom','EnableTurnInPlace','OSZog','Label','spawnPreserved','jump','isEventClickTriggered','24QPRzTx','absDistance','processSaveEventLocation','Game_CharacterBase_screenY','Game_Event_updateSelfMovement','processMoveRoutePatternLock','selfValue','kVrHm','frontY','MPFzq','WGYAF','isSceneMap','code','_needsPeriodicRefresh','Game_Troop_meetsConditionsCPC','meetActivationRegionConditions','NJGoG','onDatabaseLoaded','activationProximityDistance','NxNUA','Game_Switches_setValue','setupPageSettings','Game_Interpreter_PluginCommand','BufferX','processMoveRouteMoveTo','oMgQE','forceDashing','SLEEP','setDirection','_PlayerDiagonalSetting','BalloonOffsetX','height','event','SPIN\x20CW','GetMoveSynchTarget','Game_CharacterBase_setDirection','sqrt','needsUpdate','adjustDir8MovementSpeed','activationProximityType','setBackgroundType','updateMoveSynchDirection','isNormalPriority','Self\x20Switch\x20%1','LuyOG','_encounterHalfProximity','Map\x20%1\x20Variable\x20%2','ADDITIVE','LIGHTBULB','updateTextAngle','isDiagonalDirection','useCarryPoseForIcons','setup','EhMaK','KbcAA','jjgZV','clearPageSettings','switch2Id','Game_Player_isMapPassable','kAHml','reverse','_eventErased','Game_Event_findProperPageIndex','resetFontSettings','createDummyWindow','IconBufferY','NYlkh','NORMAL','add','value','iDMec','XGPku','boat','FollowerID','processMoveRouteStepFrom','setEventIconData','updateTilt','updateWaitMode','_settings','XJyMM','requestRefresh','Game_Variables_setValue','updatePatternEventsMoveCore','canMove','isJumping','offsetY','Game_CharacterBase_bushDepth','smooth','Game_Player_checkEventTriggerThere','_paused','_encounterEffectDuration','ifDsX','VS8','updateScaleBase','Game_Event_setupPageSettings','concat','attachPictureFilename','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','IrCgg','tileHeight','AutoMoveEvents','%1%2','_DisablePlayerControl','IconSet','findTargetSprite','mainFontSize','Disable','vertical\x20mirror','ccwX','DGaCz','DashModifier','activationRegionList','processEraseEncounterEvents','ARRAYSTRUCT','IconSize','_opacity','MBcsY','JHimG','updateFadeOut','getEventIconIndex','getPosingCharacterDirection','isStopFollowerChasing','6235024dgTKSe','EventTimerFramesGain','Direction','NDLIE','startMapCommonEventOnTouch','_clickTrigger','_lastAttachPictureFilename','EMexh','processMoveSynchMirrorHorz','PostCopyJS','createTextSprite','LOWER\x20LEFT','updateHueShift','eventLabelsVisible','horizontal\x20mirror','_scaleBaseY','bushDepth','iconWidth','name','type','RFQxO','TwMOB','isBusy','checkEventProximity','changeSpeed','switch1Valid','checkRegionEventTrigger','attachPictureOffsetX','fssEe','getAttachPictureBitmapWidth','cAcUf','_erased','setupDiagonalSupport','getMapSpawnedEventData','_lastAttachPictureMaxSize','right','region','_waitMode','inBattle','eGHrC','EventsMoveCore','_CPCs','hideShadows','KKgUH','_followerControlID','MVKRz','EventIconChangeForced','UYGww','CommonEventID','createEventsMoveCoreMessagePopup','PYGxq','Game_CharacterBase_isDashing','moveSynchType','replace','rmOcJ','status','EventAutoMovement','return\x200','FastForwardKey','getPosingCharacterIndex','Game_Interpreter_character','Game_Map_update','xRlAb','updateVisibility','_reflection','createShadows','AdvancedVariables','initEventsMoveCoreEffects','createDisplayObjects','Game_Player_isDashing','checkEventTriggerAuto','707638YPauqr','eventsXy','Game_CharacterBase_initMembers','NOTE','VGVfG','MUSIC','clearCarrying','EventID','Region%1','_realX','meetActivationProximityConditions','FRUSTRATION','xTuPC','DefaultShadow','deltaY','_shadowGraphic','labelWindowRange','_forceShowPlayer','VehicleForbid','_targetAngle','includes','_characterIndex','IconIndex','UNTITLED','startOffsetX','createSpawnedEventWithData','_pageIndex','377076fFJHCP','Step1MapId','rSONW','removeTemporaryMapSpawnedEvents','opacityDelta','FavorHorz','visibleRange','updatePose','jGyEw','RandomMoveWeight','isEventRunning','Game_CharacterBase_opacity','isPlayerForceHidden','wZNAv','isAutoBufferIcon','isAllowEventAutoMovement','setupEventsMoveCoreEffects','labelWindowText','lastSpawnedEvent','iconSize','description','destroy','WalkAllow','Game_Party_hasEncounterNone','UrWMI','Game_Map_unlockEvent','EventTimerExpireClear','MorphEventRemove','createLowerLayer','refreshIfNeeded','drawTextEx','MLbLK','Game_Map_parallelCommonEvents','forced','_EventIcons','wdRTw','%1Dock','foNre','_scene','defaultFontSize','Spriteset_Map_createShadow','updateFadeIn','PopupExtra','updateTextScale','processDrawIcon','wRMxE','end','onMapLoaded','refreshEventLabels','opacitySpeed','updateEventCustomZ','EventTimerResume','Yjpef','isPassableByAnyDirection','PlayerIconChange','ySIeR','resetSelfSwitchesForEvent','LOWER\x20RIGHT','angle','floor','startScaleY','call','PreCopyJS','processMoveSynch','TWtHM','setupMorphEvent','createShadow','xLbJl','rotation','adjustX','Game_CharacterBase_screenX','despawnRegions','despawnTerrainTags','setBalloonPose','processMoveCommandEventsMoveCore','ConvertParams','LNDfS','_cacheSystemVisible','isBigCharacter','turnRight90','endOffsetX','FollowerSetGlobalChase','_PreservedEventMorphData','constructor','ShowShadows','setMoveRoute','ApplyPopupExtraSettings','initMembers','EventAllow','LIGHT-BULB','_textSprite','variables','oEWkp','setPosition','LOVE','Game_System_initialize','MapId','Button','reverseDir','Game_Event_meetsConditions','RemovePreserve','UglUM','bufferX','CallEvent','%1DockRegionOnly','_followerChaseOff','restoreIconsOnEventsDataKey','spriteId','LineHeight','isPlayerControlDisabled','qVYvr','setHue','jmVRW','Sprite_Balloon_updatePosition','bmOgz','isEventsMoveCoreInvisible','fittingHeight','ZZZ','registerSelfTarget','execute','AutoBalloon','lock','\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!','RRpeq','zHVQa','unlockEvent','moveTowardCharacter','Movement','_startAngle','DBsNx','iconHeight','TemplateName','QUESTION','_eventLabelOffsetY','fontSize','KNEEL','gTLdR','SpawnEventDespawnEventID','locate','_data','yZAXs','IWfPO','StopAutoMoveMessages','ZJBcZ','eraseEvent','processEraseEncounterSpawn','shadowX','isPassable','moveTowardPoint','startScaleX','attachPictureOffsetY','map','hyNsb','setupAttachPictureBitmap','pos','_targetScaleX','enable','_selfTarget','isSpriteVS8dir','deleteIconsOnEventsData','General','copy','CustomPageConditions','morphIntoTemplate','_eventScreenX','LAHgd','QMETS','EventIconDelete','updateMove','directionOnLadderSpriteVS8dir','Game_CharacterBase_direction','RegionOkTarget','FollowerSetControl','_characterSprites','_forceShowFollower','lxwdM','_working','startMapCommonEventOnOKTarget','characterIndexVS8','_MapSpawnedEventData','PlayerIconDelete','Game_Variables_value','isLabelVisible','TerrainTags','Forbid','isCollidedWithEvents','_spawnData','_target','dir8','endAngle','juAIa','parallelCommonEvents','hasCPCs','_cpc','setupEventsMoveCoreNotetags','checkValidEventerMap','_eventCache','processMoveRouteMoveUntilStop','Game_CharacterBase_increaseSteps','Scene_Load_onLoadSuccess','Player','_startScaleX','moveAwayFromCharacter','_hue','%1Forbid','Settings','SpawnEventDespawnTerrainTags','shadowY','padZero','EventLocationCreate','Game_Timer_initialize','Sprite_Character_setTileBitmap','isSpawnedEvent','fadeInDuration','isSmartEventCollisionOn','parse','teqRu','drawing','setLastPluginCommandInterpreter','convertSelfVariableValuesInScriptCall','Ewaqf','offsetX','SelfDataResetAll','AllAllow','MULTIPLY','Game_Event_clearPageSettings','tuRNY','createSpawnedEvent','createSaveEventLocationData','setupPlayerVisibilityOverrides','JQrjC','follower','Game_Follower_chaseCharacter','uilrZ','switchId','deleteSavedEventLocationKey','_alwaysUpdateMove','mirror\x20vertical','contents','setCommonEvent','RIGHT','vehicle','isLandOk','clearEventCache','SpawnEventAtTerrainTag','processMoveCommand','_checkEncounterRaw','VehicleDock','slice','lastMovedDirection','isMapPassable','SpriteBased','toUpperCase','deltaX','processMoveRouteJumpToCharacter','DashingEnable','hasStepAnime','KOrGR','ROUTE_SCRIPT','updateScale','Step2EventId','VisuMZ_2_DragonbonesUnion','terrainTag','Ship','EventTemplates','$preloadedMap_%1','_fadeInDuration','endScaleX','addChild','text','mxtaa','_text','Walk','VICTORY','zYaDu','ARRAYSTR','despawnEventId','setupEvents','width','_fadeOutDuration','_spawnedEvents','BufferY','createBitmap','setCharacterBitmap','PYMPf','split','parent','template','advancedValue','lineHeight','tmJRV','visible','iconIndex','MUSIC-NOTE','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','processMoveRouteStepTo','moveTypeRandom','Letter','BitmapSmoothing','Chase','Rquef','SpawnEventAtRegion','Scene_Map_createDisplayObjects','fpezE','Game_Event_locate','dmhbC','MOBILE_EVENT_LABELS','tubVN','OpacitySpeed','resizeWindow','Toggle','windowPadding','saveEventLocation','_moveOnlyRegions','dnqcD','anchor','_fadeOutStart','updateAttachPictureBitmap','oLyMO','updateSelfMovement','Spriteset_Map_createLowerLayer','switch1Id','zVWPL','indexOf','Collision','onLoadAttachPicture','_eventPageIndex','FNAZI','Kwzsq','vRJLF','UnAOK','updateEventLabelText','All','deltaYFrom','createCharacterShadow','Game_Followers_isVisible','svopQ','USER-DEFINED\x205','addLoadListener','BsFjg','vhNQu','backX','onClickTrigger','getInputDirection','turnAwayFromCharacter','requestMapLoadCommonEvents','isInstanceOfSceneMap','YjZhk','gOSoE','utkJJ','isTurnInPlace','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','lNMZP','SwitchGetSelfSwitchABCD','refresh','Game_Event_meetsConditionsCPC','SPIN\x20COUNTERCLOCKWISE','Scene_Boot_onDatabaseLoaded','posNt','eXXzb','despawnEverything','Window_NumberInput_processOk','some','_pose','checkEventTriggerEventsMoveCore','EKuzp','Stop','Speed','FontSize','_frames','isVisible','format','note','isAirshipPassable','%1Allow','meetsCPC','mapValue','_randomHomeY','page','fiAGV','Window_ScrollText_startMessage','Game_CharacterBase_update','MiDGT','EventLocationSave','jhOUF','_moveSynch','_direction','eWVLv','events','JsbyW','_dummyWindow','jumpAll','LFtzf','realMoveSpeed','MsgDuration','determineCommonEventsWithCPC','hasEncounterNone','Game_SelfSwitches_value','updateEventMirrorSprite','Etcjx','vert\x20mirror','exit','_eventSpawnData','wXmGB','isActive','Game_CharacterBase_hasStepAnime','WVmjh','Game_Vehicle_initMoveSpeed','SHjiG','LgIWP','atEtE','getDirectionToPoint','isCollidedWithPlayerCharacters','setEventIconDataKey','_screenZoomScale','startMessage','trim','prepareSpawnedEventAtRegion','_eventIconSprite','_attachPicture','clearSelfTarget','SDoam','TOGGLE','setMoveSpeed','BWVXj','TileX','getPreservedMorphEventData','Game_Switches_value','onExpire','direction','isNearTheScreen','regionId','Game_Message_setNumberInput','ZLbEj','Game_Character_processMoveCommand','Value','_forceDashing','loadSystem','characterName','978215jBWVje','_interpreter','VisuMZ_1_MessageCore','onOk','EventTimerExpireEvent','FXtxr','autoEventIconBuffer','isRegionForbidPass','processOk','_poseDuration','_character','canPass','setupFollowerVisibilityOverrides','XBJnG','SPIN\x20ANTICLOCKWISE','ShipSpeed','tSpSh','scale','_proxyWindow','ship','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','AQSXP','bitmap','PreSpawnJS','_selfEvent','_patternLocked','EventLocationDelete','zkFHP','UBQUI','circle','isMapVariable','_scaleBaseX','_inputTime','moveSynchTarget','_stepPattern','isDashingAndMoving','Game_CharacterBase_moveStraight','TTAPr','MapVariables','isInVehicle','_labelWindows','clamp','isSpawnHitboxCollisionOk','%1:%2','process_VisuMZ_EventsMoveCore_Switches_Variables','executeMoveDir8','move','away','setImage','prepareSpawnedEventAtTerrainTag','Game_Vehicle_isLandOk','MorphEventTo','TurnInPlaceDelay','Minutes','_shadowOpacity','VariableId','setControlledFollowerID','COBWEB','Game_CharacterBase_pattern','zddMg','standing','Game_Interpreter_executeCommand','PathfindMobileEnabled','delta','Game_Message_setItemChoice','_mapId','areFollowersForceHidden','3704187Qmjgww','isTargetEventValidForLabelWindow','areFollowersForceShown','scrolledY','Window_NumberInput_start','_moveAllowPlayerCollision','endOffset','_forceHidePlayer','toLowerCase','moveForward','_eventMorphData','_startScaleY','MgeIt','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','turnAwayFromPoint','EXCLAMATION','updatePosition','_mirrorSprite','pattern','MessageText','timer','LIGHT\x20BULB','AdvancedSwitches','Game_Character_setMoveRoute','forceCarrying','isMovementSucceeded','updatePeriodicRefresh','EJjPt','radius','AllForbid','_wholeDuration','isMoveOnlyRegionPassable','Game_Event_start','CPCsMet','_isObjectCharacter','followers','Template','PlayerMovementDiagonal','KWMti','Ndzgp','firstSpawnedEvent','USER-DEFINED\x202','findDiagonalDirectionTo','UMuYm','_eventCopyData','THzKg','dashSpeedModifier','duration','isSelfVariable','turn180','createLabelWindows','startScale','vZMic','nZPMw','getPose','28276656FGCUFj','HADyX','Game_Map_refresh','Game_CharacterBase_moveDiagonally','processMoveRouteMoveToCharacter','checkCollisionKeywords','_dragonbones','Allow','executeCommonEvent','RIGHT\x20TO\x20LEFT','_expireCommonEvent','isSupportDiagonalMovement','_cacheVisibility','isObjectCharacter','CBPpq','checkNeedForPeriodicRefresh','_targetX','resume','distance','Game_Timer_onExpire','cwX','_eventId','aKSEy','splice','ccwY','roundXWithDirection','referEvent','EDhYb','moveAwayFromPoint','isPlayerForceShown','YoJmZ','YCKdz','SwitchGetSelfSwitchID','updateOpacity','Sprite_Character_update','grbVE','characterPatternY','PlRPx','FQOls','StopAutoMoveEvents','AnlGi','reserveCommonEvent','_eventScreenY','push','_spriteOffsetX','STRUCT','_addedHitbox','isRunning','variableId','Dsjka','checkActivationProximity','autosaveEventLocation','processMoveRouteHugWall','row','updateEventsMoveCoreTagChanges','_encounterNoneProximity','isOnLadder','isPosing','Enable','moveStraight','switches','isWorking','PosX','approach','fadeDuration','DbwBw','turnLeft90','FPxiK','updateMoveSynch','savePreservedMorphEventDataKey','Game_CharacterBase_canPass','DDiUY','tDcHC','TargetVariableId','hasAdvancedSwitchVariable','aCBit','Sprite_Balloon_setup','updateShadowChanges','createAttachPictureSprite','processMoveRouteFadeOut','isPreventSelfMovement','_commonEventId','requestBalloon','Game_Event_moveTypeRandom','clJpW','tVwXx','Step2MapId','Vehicle','AWCeH','shift','FUNC','EnableDashTilt','findDirectionTo','OFF','MOBILE_DIAGONAL_PATHFINDING','start','processMoveRouteMoveRepeat','wZtdI','bind','processMoveRouteFadeIn','turnTowardPoint','remove','_lastPluginCommandInterpreter','_lastMovedDirection','ShiftY','processMoveRouteStepToCharacter','gainFrames','clearPose','_realY','min','painc','ARRAYFUNC','ANNOYED','isAdvancedSwitch','processMoveRouteSelfSwitch','Game_CharacterBase_isTransparent','Rope','attachPictureSettings','updateParallel','Game_Event_update','AutoBuffer','xlvuJ','processMoveSynchMimic','Game_Followers_jumpAll','MoveAllSynchTargets','clearStepPattern','isDashing','updateEventsAndMovementCore','abs','dfjmU','moveBackToRandomHome','LIVkD','4779165SFPYnw','drznv','WiJCd','pause','ufsIK','conditions','IconBufferX','_targetScaleY','resetIconsOnEventsDataKey','BIQDt','KDMos','isDashDisabled','attachPictureBlendMode','clear','setMovementSuccess','TargetSwitchId','canUpdate','resetIconsOnEventsData','Game_Event_checkEventTriggerAuto','Game_Map_setupEvents','hueShift','_spriteOffsetY','isValid','ITPMB','target','SwitchId','_targetY','UPPER\x20LEFT','resetSelfSwitchesForMap','SelfVariableID','ALLOW_LADDER_DASH','meetsSwitchCondition','filter','processMoveSynchRandom','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','updateDuration','onLoadSuccess','getPlayerDiagonalSetting','Window_Message_startMessage','isPressed','_chaseOff','VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20','reverse\x20mimic','EventId','makeDeepCopy','setDashingEnabled','random','setupEventsMoveCoreCommentTags','TBPRK','updateTextPosition','nNjtR','BlendMode','VNUSu','uoEhY','XgKTC','Hours','smqiY','startOffset','deleteSavedEventLocation','_counter','apply','_arcPeak','clearDashing','SWEAT','registerCommand','Game_Map_isDashDisabled','aCiaX','_scaleX','_speed','_forceCarrying','initMoveSpeed','randomInt','Scene_Map_startEncounterEffect','isPlayerWithinEncounterNoneEvents','character','_requestSaveEventLocation','_advancedSwitchVariable','despawnAtXY','Arc','zqkfP','nILIC','SNbIl','MFZPU','findProperPageIndex','EventForbid','XcGlm','Game_Map_setup','_currentArc','Preserve','stop','pow','UxPiD','_tilemap','isAllowCharacterTilt','moveDiagonally','SPIN\x20CLOCKWISE','agqkJ','clearAttachPictureSettings','HMPH','padding','Operation','MapID','SpawnEventDespawnEverything','Icon','_SavedEventLocations','left','ABEFc','processMoveRouteSelfVariable','TeKMn','_eventOverload','processMoveSynchApproach','destinationY','Setting','OWzGR','convertVariableValuesInScriptCall','none','createEventsMoveCoreTileMessagePopup','Airship','hasEncounterHalf','qmOjQ','zoomScale','gAiWG','_EventsMoveCoreSettings','MsgPopupTargetTile','SPIN\x20ACW','characterPatternYBasic','isSaveEventLocation','loadCPC','VeLON','updateRoutineMove','removeMorph','EventTimerSpeed','setEventLabelsVisible','meetsConditions','AQAYX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','VisibleEventLabels','initEventsMoveCore','encounterProximityType','onCancel','hasDragonbones','BHBfe','BalloonOffsetY','hasClickTrigger','Game_Map_event','IconBlendMode','updatePattern','version','_selfTargetNumberInput','eventId','checkEventTriggerHere','wLUzP','delay','BULB','processMoveRouteAnimation','SCREEN','Game_Timer_start','isShip','custom','restoreSavedEventPosition','getLastPluginCommandInterpreter','length','_visibleEventX','yTtQF','_saveEventLocations','isPlayerWithinEncounterHalfEvents','blendMode','JSON','UXRbP','Game_Character_forceMoveRoute','getDirectionFromPoint','setChaseOff','updateVS8BalloonOffsets','getControlledFollowerID','Game_Message_add','_stopCount','horz\x20mirror','QwFAG','textSizeEx'];_0x5888=function(){return _0x490e23;};return _0x5888();}const _0x4f6648=_0x4468;(function(_0x3810c5,_0x21fcf2){const _0x360059=_0x4468,_0x3a6789=_0x3810c5();while(!![]){try{const _0x509770=-parseInt(_0x360059(0x314))/0x1+-parseInt(_0x360059(0x32f))/0x2+parseInt(_0x360059(0x529))/0x3+-parseInt(_0x360059(0x2cd))/0x4+-parseInt(_0x360059(0x5e4))/0x5+parseInt(_0x360059(0x253))/0x6*(-parseInt(_0x360059(0x4e6))/0x7)+parseInt(_0x360059(0x560))/0x8;if(_0x509770===_0x21fcf2)break;else _0x3a6789['push'](_0x3a6789['shift']());}catch(_0x18a9b8){_0x3a6789['push'](_0x3a6789['shift']());}}}(_0x5888,0xc334e));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4f6648(0x604)](function(_0xca0efc){const _0x272f50=_0x4f6648;return _0xca0efc[_0x272f50(0x304)]&&_0xca0efc[_0x272f50(0x343)][_0x272f50(0x328)]('['+label+']');})[0x0];VisuMZ[label][_0x4f6648(0x3fc)]=VisuMZ[label][_0x4f6648(0x3fc)]||{},VisuMZ[_0x4f6648(0x37a)]=function(_0x2c29cc,_0x510ad8){const _0x5abbef=_0x4f6648;for(const _0x50029a in _0x510ad8){if(_0x50029a[_0x5abbef(0x6be)](/(.*):(.*)/i)){const _0x1e8f3f=String(RegExp['$1']),_0x7d8785=String(RegExp['$2'])[_0x5abbef(0x42b)]()[_0x5abbef(0x4cf)]();let _0x20e4a8,_0x52bef3,_0x3e212c;switch(_0x7d8785){case'NUM':_0x20e4a8=_0x510ad8[_0x50029a]!==''?Number(_0x510ad8[_0x50029a]):0x0;break;case'ARRAYNUM':_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON['parse'](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3[_0x5abbef(0x3c6)](_0x5916c2=>Number(_0x5916c2));break;case _0x5abbef(0x240):_0x20e4a8=_0x510ad8[_0x50029a]!==''?eval(_0x510ad8[_0x50029a]):null;break;case _0x5abbef(0x24b):_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3['map'](_0x5c1561=>eval(_0x5c1561));break;case _0x5abbef(0x68b):_0x20e4a8=_0x510ad8[_0x50029a]!==''?JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a]):'';break;case'ARRAYJSON':_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3['map'](_0x38da51=>JSON['parse'](_0x38da51));break;case _0x5abbef(0x5ba):_0x20e4a8=_0x510ad8[_0x50029a]!==''?new Function(JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a])):new Function(_0x5abbef(0x306));break;case _0x5abbef(0x5cf):_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3[_0x5abbef(0x3c6)](_0x3dd910=>new Function(JSON[_0x5abbef(0x406)](_0x3dd910)));break;case _0x5abbef(0x722):_0x20e4a8=_0x510ad8[_0x50029a]!==''?String(_0x510ad8[_0x50029a]):'';break;case _0x5abbef(0x442):_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON[_0x5abbef(0x406)](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3['map'](_0x28589e=>String(_0x28589e));break;case _0x5abbef(0x58d):_0x3e212c=_0x510ad8[_0x50029a]!==''?JSON['parse'](_0x510ad8[_0x50029a]):{},_0x2c29cc[_0x1e8f3f]={},VisuMZ[_0x5abbef(0x37a)](_0x2c29cc[_0x1e8f3f],_0x3e212c);continue;case _0x5abbef(0x2c4):_0x52bef3=_0x510ad8[_0x50029a]!==''?JSON['parse'](_0x510ad8[_0x50029a]):[],_0x20e4a8=_0x52bef3[_0x5abbef(0x3c6)](_0x347f85=>VisuMZ[_0x5abbef(0x37a)]({},JSON[_0x5abbef(0x406)](_0x347f85)));break;default:continue;}_0x2c29cc[_0x1e8f3f]=_0x20e4a8;}}return _0x2c29cc;},(_0x2eff47=>{const _0x52457e=_0x4f6648,_0x264f80=_0x2eff47['name'];for(const _0x496cd0 of dependencies){if(!Imported[_0x496cd0]){alert(_0x52457e(0x1c3)[_0x52457e(0x4a2)](_0x264f80,_0x496cd0)),SceneManager[_0x52457e(0x4c0)]();break;}}const _0x57c54f=_0x2eff47[_0x52457e(0x343)];if(_0x57c54f[_0x52457e(0x6be)](/\[Version[ ](.*?)\]/i)){const _0x500d06=Number(RegExp['$1']);if(_0x500d06!==VisuMZ[label][_0x52457e(0x677)]){if(_0x52457e(0x347)!=='UrWMI'){const _0x1d37f3=_0x4b08e9['getSavedEventLocation'](this);if(!_0x1d37f3)return;this[_0x52457e(0x38c)](_0x1d37f3['x'],_0x1d37f3['y']),this[_0x52457e(0x23c)](),this['setDirection'](_0x1d37f3[_0x52457e(0x4dc)]),this['_pageIndex']===_0x1d37f3[_0x52457e(0x1b3)]&&(this['_moveRouteIndex']=_0x1d37f3[_0x52457e(0x214)]);}else alert(_0x52457e(0x66b)[_0x52457e(0x4a2)](_0x264f80,_0x500d06)),SceneManager[_0x52457e(0x4c0)]();}}if(_0x57c54f[_0x52457e(0x6be)](/\[Tier[ ](\d+)\]/i)){if(_0x52457e(0x35c)!=='vyZZG'){const _0x2ab77e=Number(RegExp['$1']);if(_0x2ab77e<tier){if(_0x52457e(0x70f)===_0x52457e(0x70f))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x264f80,_0x2ab77e,tier)),SceneManager[_0x52457e(0x4c0)]();else{if(_0x3a37d8['_moveAllowPlayerCollision'])return![];return _0x4a5b99[_0x52457e(0x2f5)][_0x52457e(0x18c)]['call'](this,_0x30a181,_0x40e0a6);}}else _0x52457e(0x1be)!==_0x52457e(0x2a2)?tier=Math['max'](_0x2ab77e,tier):_0x1e7297['morphInto'](_0x24ec55[_0x52457e(0x5b6)],_0x538ab0[_0x52457e(0x433)]||_0x121ada[_0x52457e(0x679)]());}else{_0x47db2c['ConvertParams'](_0x4d2f29,_0x1cc908);const _0x239336=!_0x1a2570[_0x52457e(0x45a)];_0x57310c[_0x52457e(0x1b9)](_0x239336);}}VisuMZ[_0x52457e(0x37a)](VisuMZ[label][_0x52457e(0x3fc)],_0x2eff47[_0x52457e(0x19a)]);})(pluginData),VisuMZ['OperateValues']=function(_0x207298,_0x328f12,_0x15000d){switch(_0x15000d){case'=':return _0x328f12;break;case'+':return _0x207298+_0x328f12;break;case'-':return _0x207298-_0x328f12;break;case'*':return _0x207298*_0x328f12;break;case'/':return _0x207298/_0x328f12;break;case'%':return _0x207298%_0x328f12;break;}return _0x207298;},PluginManager['registerCommand'](pluginData['name'],_0x4f6648(0x2b7),_0x15eeaa=>{const _0x3d3437=_0x4f6648;VisuMZ[_0x3d3437(0x37a)](_0x15eeaa,_0x15eeaa);switch(_0x15eeaa[_0x3d3437(0x4e2)]){case _0x3d3437(0x567):$gameSystem[_0x3d3437(0x716)](!![]);break;case _0x3d3437(0x49d):$gameSystem[_0x3d3437(0x716)](![]);break;case'Toggle':$gameSystem[_0x3d3437(0x716)](!$gameSystem[_0x3d3437(0x33e)]());break;}}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x396),_0x41b5d4=>{const _0x8c0dab=_0x4f6648;VisuMZ[_0x8c0dab(0x37a)](_0x41b5d4,_0x41b5d4);const _0x25d0f9=$gameTemp[_0x8c0dab(0x684)](),_0x516d41={'mapId':_0x41b5d4[_0x8c0dab(0x38f)],'eventId':_0x41b5d4['EventId']||_0x25d0f9[_0x8c0dab(0x679)](),'pageId':_0x41b5d4[_0x8c0dab(0x6cb)]};if(_0x516d41['mapId']<=0x0)_0x516d41[_0x8c0dab(0x191)]=$gameMap?$gameMap[_0x8c0dab(0x191)]():0x1;$gameTemp[_0x8c0dab(0x684)]()['pluginCommandCallEvent'](_0x516d41);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x20e),_0x36b649=>{const _0x3780f5=_0x4f6648;VisuMZ[_0x3780f5(0x37a)](_0x36b649,_0x36b649);switch(_0x36b649['Value']){case'Enable':$gameSystem[_0x3780f5(0x611)](!![]);break;case _0x3780f5(0x2bd):$gameSystem[_0x3780f5(0x611)](![]);break;case _0x3780f5(0x465):$gameSystem['setDashingEnabled'](!$gameSystem[_0x3780f5(0x195)]());break;}}),PluginManager[_0x4f6648(0x624)](pluginData['name'],_0x4f6648(0x6ca),_0x2029e8=>{const _0x525285=_0x4f6648;VisuMZ[_0x525285(0x37a)](_0x2029e8,_0x2029e8);const _0x260ce1=$gameTemp['getLastPluginCommandInterpreter']();_0x2029e8['MapId']=_0x2029e8['MapId']||$gameMap['mapId'](),$gameSystem[_0x525285(0x4cc)](_0x2029e8['MapId'],_0x2029e8['EventId']||_0x260ce1[_0x525285(0x679)](),_0x2029e8[_0x525285(0x32a)],_0x2029e8['IconBufferX'],_0x2029e8[_0x525285(0x294)],_0x2029e8['IconBlendMode'],![]);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x2fb),_0x106e67=>{const _0x3cd856=_0x4f6648;VisuMZ['ConvertParams'](_0x106e67,_0x106e67);const _0x5e824e=$gameTemp[_0x3cd856(0x684)]();_0x106e67['MapId']=_0x106e67[_0x3cd856(0x38f)]||$gameMap[_0x3cd856(0x191)](),$gameSystem[_0x3cd856(0x4cc)](_0x106e67['MapId'],_0x106e67[_0x3cd856(0x60f)]||_0x5e824e[_0x3cd856(0x679)](),_0x106e67['IconIndex'],_0x106e67['IconBufferX'],_0x106e67[_0x3cd856(0x294)],_0x106e67[_0x3cd856(0x675)],!![]);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x3d6),_0x35f956=>{const _0x4404d8=_0x4f6648;VisuMZ[_0x4404d8(0x37a)](_0x35f956,_0x35f956);const _0x4256d2=$gameTemp[_0x4404d8(0x684)]();_0x35f956[_0x4404d8(0x38f)]=_0x35f956['MapId']||$gameMap[_0x4404d8(0x191)](),$gameSystem[_0x4404d8(0x234)](_0x35f956['MapId'],_0x35f956['EventId']||_0x4256d2[_0x4404d8(0x679)]());}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'EventIconRestore',_0x52f906=>{const _0x126b65=_0x4f6648;VisuMZ[_0x126b65(0x37a)](_0x52f906,_0x52f906);const _0x4ad6f3=$gameTemp[_0x126b65(0x684)]();_0x52f906[_0x126b65(0x38f)]=_0x52f906[_0x126b65(0x38f)]||$gameMap[_0x126b65(0x191)](),$gameSystem[_0x126b65(0x399)](_0x52f906[_0x126b65(0x38f)],_0x52f906[_0x126b65(0x60f)]||_0x4ad6f3[_0x126b65(0x679)]());}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'EventLabelRefresh',_0x1f31ea=>{const _0x743f49=_0x4f6648;if($gameMap)for(const _0x5e129c of $gameMap[_0x743f49(0x4b3)]()){'EVApQ'==='EVApQ'?(_0x5e129c[_0x743f49(0x491)](),_0x5e129c[_0x743f49(0x47a)]()):_0x5bfc69[0x2]=_0x518fba(_0x178fb7)['charAt'](0x0)[_0x743f49(0x42b)]()['trim']();}if(SceneManager[_0x743f49(0x25e)]()){const _0x32f3f1=SceneManager['_scene'][_0x743f49(0x1e2)];if(_0x32f3f1)_0x32f3f1[_0x743f49(0x35f)]();}}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x6fc),_0x3153ce=>{const _0x218ea4=_0x4f6648;VisuMZ['ConvertParams'](_0x3153ce,_0x3153ce);switch(_0x3153ce['Visibility']){case _0x218ea4(0x70c):$gameSystem[_0x218ea4(0x668)](!![]);break;case'Hidden':$gameSystem[_0x218ea4(0x668)](![]);break;case _0x218ea4(0x465):$gameSystem['setEventLabelsVisible'](!$gameSystem[_0x218ea4(0x2da)]());break;}}),PluginManager[_0x4f6648(0x624)](pluginData['name'],_0x4f6648(0x4ae),_0xd6e7bb=>{const _0x72462b=_0x4f6648;VisuMZ['ConvertParams'](_0xd6e7bb,_0xd6e7bb);const _0x14c217=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x2aa660=$gameMap[_0x72462b(0x273)](_0xd6e7bb[_0x72462b(0x60f)]||_0x14c217[_0x72462b(0x679)]());if(_0x2aa660)_0x2aa660[_0x72462b(0x467)]();}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x400),_0x33aa77=>{const _0x421b7f=_0x4f6648;VisuMZ[_0x421b7f(0x37a)](_0x33aa77,_0x33aa77);const _0x35a290=$gameTemp['getLastPluginCommandInterpreter'](),_0x199a80=_0x33aa77[_0x421b7f(0x38f)]||$gameMap[_0x421b7f(0x191)](),_0x3ca3a8=_0x33aa77[_0x421b7f(0x60f)]||_0x35a290[_0x421b7f(0x679)](),_0x138f60=_0x33aa77[_0x421b7f(0x59e)]||0x0,_0x6f6cfd=_0x33aa77[_0x421b7f(0x6bc)]||0x0,_0x36637a=_0x33aa77[_0x421b7f(0x2cf)]||0x2,_0x2901e0=((_0x33aa77['PageId']||0x1)-0x1)['clamp'](0x0,0x13),_0x47e3fa=_0x33aa77['MoveRouteIndex']||0x0;$gameSystem[_0x421b7f(0x413)](_0x199a80,_0x3ca3a8,_0x138f60,_0x6f6cfd,_0x36637a,_0x2901e0,_0x47e3fa);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x500),_0x4e2c0c=>{const _0x5b6928=_0x4f6648;VisuMZ[_0x5b6928(0x37a)](_0x4e2c0c,_0x4e2c0c);const _0x3b62bf=$gameTemp[_0x5b6928(0x684)](),_0x2795b5=_0x4e2c0c[_0x5b6928(0x38f)]||$gameMap[_0x5b6928(0x191)](),_0x3e6b1d=_0x4e2c0c[_0x5b6928(0x60f)]||_0x3b62bf[_0x5b6928(0x679)]();$gameSystem[_0x5b6928(0x41a)](_0x2795b5,_0x3e6b1d);}),VisuMZ['EventsMoveCore']['ApplyPopupExtraSettings']=function(_0x439331,_0x7c5e51){const _0x1acc45=_0x4f6648;_0x7c5e51=_0x7c5e51||{},_0x439331['fadeDuration']={'fadeIn':_0x7c5e51[_0x1acc45(0x404)]||0x0,'fadeOut':_0x7c5e51['fadeOutDuration']||0x0},_0x439331[_0x1acc45(0x61d)]={'x':_0x7c5e51[_0x1acc45(0x32c)]||0x0,'y':_0x7c5e51[_0x1acc45(0x6ef)]||0x0},_0x439331[_0x1acc45(0x52f)]={'x':_0x7c5e51[_0x1acc45(0x37f)]||0x0,'y':_0x7c5e51['endOffsetY']||0x0},_0x439331[_0x1acc45(0x6a1)]={'x':_0x7c5e51[_0x1acc45(0x43a)]||0x0,'y':_0x7c5e51['endScaleY']||0x0},_0x439331[_0x1acc45(0x55c)]={'x':_0x7c5e51[_0x1acc45(0x3c4)]||0x0,'y':_0x7c5e51[_0x1acc45(0x36b)]||0x0},_0x439331[_0x1acc45(0x369)]={'start':_0x7c5e51['startAngle']||0x0,'end':_0x7c5e51[_0x1acc45(0x3ec)]||0x0},_0x439331['misc']={'arc':_0x7c5e51[_0x1acc45(0x632)]||0x0};},PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],'MsgPopupPlayer',_0xa14e4e=>{const _0xa6c43c=_0x4f6648;if(!SceneManager[_0xa6c43c(0x489)]())return;if(!Imported[_0xa6c43c(0x4e8)]){if('fYWcY'==='CDoJL'){const _0x1d56a2=_0xa6c43c(0x3fb)[_0xa6c43c(0x4a2)](_0x1de6e9[_0xa6c43c(0x1fc)](0x0)['toUpperCase']()+_0x1ee54e[_0xa6c43c(0x427)](0x1));if(_0x537b4a[_0x1d56a2])return _0x3045de[_0x1d56a2][_0xa6c43c(0x328)](_0x1c127d);}else{$gameTemp[_0xa6c43c(0x6aa)]()&&alert(_0xa6c43c(0x60d)+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}}VisuMZ['ConvertParams'](_0xa14e4e,_0xa14e4e);const _0x5d8424={'text':_0xa14e4e[_0xa6c43c(0x53c)]||'','duration':Math[_0xa6c43c(0x1a4)](_0xa14e4e['MsgDuration']||0x3c,0xc)},_0x34733d=_0xa14e4e[_0xa6c43c(0x359)]||{};VisuMZ['EventsMoveCore'][_0xa6c43c(0x385)](_0x5d8424,_0x34733d);const _0x19fe9d=SceneManager['_scene'][_0xa6c43c(0x1e2)];if(_0x19fe9d){if(_0xa6c43c(0x5ab)!==_0xa6c43c(0x28a)){const _0xf9524c=$gamePlayer;_0x19fe9d[_0xa6c43c(0x2fe)](_0xf9524c,_0x5d8424);}else this[_0xa6c43c(0x3d2)](_0x25b5ee,!![]);}}),PluginManager[_0x4f6648(0x624)](pluginData['name'],'MsgPopupFollower',_0x380e01=>{const _0x52919f=_0x4f6648;if(!SceneManager[_0x52919f(0x489)]())return;if(!Imported[_0x52919f(0x4e8)]){$gameTemp['isPlaytest']()&&alert(_0x52919f(0x60d)+_0x52919f(0x3a9));return;}VisuMZ[_0x52919f(0x37a)](_0x380e01,_0x380e01);const _0x40cf20=_0x380e01['FollowerIndex']||0x0,_0x48b855={'text':_0x380e01[_0x52919f(0x53c)]||'','duration':Math[_0x52919f(0x1a4)](_0x380e01[_0x52919f(0x4b9)]||0x3c,0xc)},_0x24da93=_0x380e01[_0x52919f(0x359)]||{};VisuMZ[_0x52919f(0x2f5)][_0x52919f(0x385)](_0x48b855,_0x24da93);const _0x2c5f1b=SceneManager[_0x52919f(0x355)][_0x52919f(0x1e2)];if(_0x2c5f1b){const _0x217696=$gamePlayer[_0x52919f(0x54c)]()['follower'](_0x40cf20);_0x2c5f1b[_0x52919f(0x2fe)](_0x217696,_0x48b855);}}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'MsgPopupEvent',_0xc45eb1=>{const _0x50560c=_0x4f6648;if(!SceneManager[_0x50560c(0x489)]())return;if(!Imported[_0x50560c(0x4e8)]){if(_0x50560c(0x1de)!==_0x50560c(0x1de))this[_0x50560c(0x58c)]=_0x4ba4c6(_0x46e2cf['$1']),this['_spriteOffsetY']=_0x467178(_0x395d94['$2']);else{$gameTemp[_0x50560c(0x6aa)]()&&alert('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+_0x50560c(0x3a9));return;}}VisuMZ[_0x50560c(0x37a)](_0xc45eb1,_0xc45eb1);const _0x37de3b=$gameTemp[_0x50560c(0x684)](),_0x1ae195=_0xc45eb1[_0x50560c(0x60f)]||(_0x37de3b?_0x37de3b[_0x50560c(0x679)]():0x1),_0x456e2b={'text':_0xc45eb1['MessageText']||'','duration':Math[_0x50560c(0x1a4)](_0xc45eb1['MsgDuration']||0x3c,0xc)},_0x188eac=_0xc45eb1[_0x50560c(0x359)]||{};VisuMZ[_0x50560c(0x2f5)][_0x50560c(0x385)](_0x456e2b,_0x188eac);const _0x43af62=SceneManager[_0x50560c(0x355)][_0x50560c(0x1e2)];if(_0x43af62){if(_0x50560c(0x3de)==='lxwdM'){const _0x443c1d=$gameMap['event'](_0x1ae195);_0x43af62[_0x50560c(0x2fe)](_0x443c1d,_0x456e2b);}else{const _0x4809d4=_0x336a34[_0x50560c(0x275)](this[_0x50560c(0x507)]());if(_0x4809d4)return _0x4809d4[_0x50560c(0x4b8)]();}}}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x65f),_0x4d3632=>{const _0x14087d=_0x4f6648;if(!SceneManager['isInstanceOfSceneMap']())return;if(!Imported['VisuMZ_1_MessageCore']){$gameTemp['isPlaytest']()&&alert(_0x14087d(0x60d)+_0x14087d(0x3a9));return;}VisuMZ[_0x14087d(0x37a)](_0x4d3632,_0x4d3632);const _0x4e6e60={'text':_0x4d3632[_0x14087d(0x53c)]||'','duration':Math['max'](_0x4d3632['MsgDuration']||0x3c,0xc),'tileCoordinates':{'x':Math['round'](_0x4d3632[_0x14087d(0x4d8)]||0x0),'y':Math[_0x14087d(0x6fb)](_0x4d3632['TileY']||0x0)}},_0x54f189=_0x4d3632['PopupExtra']||{};VisuMZ[_0x14087d(0x2f5)][_0x14087d(0x385)](_0x4e6e60,_0x54f189);const _0x581eb1=SceneManager[_0x14087d(0x355)][_0x14087d(0x1e2)];if(_0x581eb1){if(_0x14087d(0x337)!==_0x14087d(0x337)){let _0x3814b9=_0x103eb6[_0x14087d(0x19a)][0x0];_0x3814b9=this[_0x14087d(0x656)](_0x3814b9),_0x3814b9=this['convertSelfVariableValuesInScriptCall'](_0x3814b9),this[_0x14087d(0x379)](_0x39e15a,_0x3814b9);}else _0x581eb1[_0x14087d(0x658)](_0x4e6e60);}}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x4ea),_0x5c4ab3=>{const _0x4e88c7=_0x4f6648;VisuMZ[_0x4e88c7(0x37a)](_0x5c4ab3,_0x5c4ab3);const _0x1131f4=_0x5c4ab3[_0x4e88c7(0x2fd)];$gameTimer[_0x4e88c7(0x41e)](_0x1131f4);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x349),_0x40cf22=>{const _0x36dffc=_0x4f6648;$gameTimer[_0x36dffc(0x41e)](0x0);}),PluginManager[_0x4f6648(0x624)](pluginData['name'],_0x4f6648(0x2ce),_0x6b9698=>{const _0x43fe7b=_0x4f6648;if(!$gameTimer[_0x43fe7b(0x59d)]())return;VisuMZ[_0x43fe7b(0x37a)](_0x6b9698,_0x6b9698);let _0x11be24=0x0;_0x11be24+=_0x6b9698[_0x43fe7b(0x1cb)],_0x11be24+=_0x6b9698[_0x43fe7b(0x193)]*0x3c,_0x11be24+=_0x6b9698['Minutes']*0x3c*0x3c,_0x11be24+=_0x6b9698[_0x43fe7b(0x61b)]*0x3c*0x3c*0x3c,$gameTimer[_0x43fe7b(0x5ca)](_0x11be24);}),PluginManager[_0x4f6648(0x624)](pluginData['name'],_0x4f6648(0x1b1),_0x32b128=>{const _0xe39b42=_0x4f6648;if(!$gameTimer[_0xe39b42(0x59d)]())return;VisuMZ['ConvertParams'](_0x32b128,_0x32b128);let _0xc14e2e=0x0;_0xc14e2e+=_0x32b128['Frames'],_0xc14e2e+=_0x32b128['Seconds']*0x3c,_0xc14e2e+=_0x32b128[_0xe39b42(0x51b)]*0x3c*0x3c,_0xc14e2e+=_0x32b128[_0xe39b42(0x61b)]*0x3c*0x3c*0x3c,$gameTimer[_0xe39b42(0x16b)](_0xc14e2e);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'EventTimerPause',_0x36ba91=>{const _0x44acc1=_0x4f6648;if(!$gameTimer[_0x44acc1(0x59d)]())return;$gameTimer[_0x44acc1(0x5e7)]();}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x362),_0x164070=>{const _0x424754=_0x4f6648;if(!$gameTimer[_0x424754(0x59d)]())return;$gameTimer[_0x424754(0x571)]();}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x667),_0x317db6=>{const _0x541743=_0x4f6648;VisuMZ['ConvertParams'](_0x317db6,_0x317db6);const _0x358c8f=_0x317db6[_0x541743(0x49e)]||0x0;$gameTimer[_0x541743(0x2e5)](_0x358c8f);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x380),_0x211a6d=>{const _0x2a648a=_0x4f6648;VisuMZ[_0x2a648a(0x37a)](_0x211a6d,_0x211a6d);const _0x5d9ffb=!_0x211a6d['Chase'];$gameSystem[_0x2a648a(0x1b9)](_0x5d9ffb);}),PluginManager['registerCommand'](pluginData['name'],_0x4f6648(0x6e3),_0x17af41=>{const _0x3bf6ab=_0x4f6648;VisuMZ[_0x3bf6ab(0x37a)](_0x17af41,_0x17af41);const _0x4f32ff=(_0x17af41[_0x3bf6ab(0x29c)]||0x0)-0x1,_0x289bf0=!_0x17af41[_0x3bf6ab(0x45a)],_0x281755=$gamePlayer[_0x3bf6ab(0x54c)]()['follower'](_0x4f32ff);if(_0x281755)_0x281755[_0x3bf6ab(0x68f)](_0x289bf0);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x3db),_0x455e30=>{const _0x369f50=_0x4f6648;VisuMZ[_0x369f50(0x37a)](_0x455e30,_0x455e30);const _0x13d51b=_0x455e30['FollowerID'];$gameSystem[_0x369f50(0x51e)](_0x13d51b);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],'FollowerReset',_0x15afbc=>{const _0x30208a=_0x4f6648;VisuMZ[_0x30208a(0x37a)](_0x15afbc,_0x15afbc),$gameSystem[_0x30208a(0x51e)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x54385b of $gamePlayer[_0x30208a(0x54c)]()[_0x30208a(0x3ba)]){if(_0x54385b)_0x54385b[_0x30208a(0x68f)](![]);}}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x490),_0x72d39a=>{const _0x549d64=_0x4f6648;VisuMZ['ConvertParams'](_0x72d39a,_0x72d39a);const _0x407cec=$gameTemp[_0x549d64(0x684)]();_0x72d39a[_0x549d64(0x38f)]=_0x72d39a[_0x549d64(0x38f)]||$gameMap[_0x549d64(0x191)]();const _0x5844bc=[_0x72d39a['MapId'],_0x72d39a[_0x549d64(0x60f)]||_0x407cec[_0x549d64(0x679)](),_0x72d39a[_0x549d64(0x458)]],_0x5acc10=_0x72d39a[_0x549d64(0x5f3)],_0x1e1753=$gameSelfSwitches['value'](_0x5844bc)||![];$gameSwitches[_0x549d64(0x1b5)](_0x5acc10,_0x1e1753);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x580),_0x23e393=>{const _0x140775=_0x4f6648;VisuMZ[_0x140775(0x37a)](_0x23e393,_0x23e393);const _0x5317ac=$gameTemp[_0x140775(0x684)]();_0x23e393[_0x140775(0x38f)]=_0x23e393[_0x140775(0x38f)]||$gameMap[_0x140775(0x191)]();const _0x5c6244=[_0x23e393[_0x140775(0x38f)],_0x23e393[_0x140775(0x60f)]||_0x5317ac['eventId'](),_0x140775(0x27e)[_0x140775(0x4a2)](_0x23e393['SwitchId'])],_0xd8101d=_0x23e393[_0x140775(0x5f3)],_0x9b029f=$gameSelfSwitches[_0x140775(0x298)](_0x5c6244)||![];$gameSwitches[_0x140775(0x1b5)](_0xd8101d,_0x9b029f);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x210),_0x445b0a=>{const _0x21d767=_0x4f6648;VisuMZ[_0x21d767(0x37a)](_0x445b0a,_0x445b0a);const _0x293ba6=$gameTemp[_0x21d767(0x684)]();_0x445b0a[_0x21d767(0x38f)]=_0x445b0a[_0x21d767(0x38f)]||$gameMap[_0x21d767(0x191)]();const _0x15cb61=[_0x445b0a[_0x21d767(0x38f)],_0x445b0a[_0x21d767(0x60f)]||_0x293ba6['eventId'](),_0x21d767(0x167)[_0x21d767(0x4a2)](_0x445b0a[_0x21d767(0x51d)])],_0x3d5c5b=_0x445b0a['TargetVariableId'],_0x2723dd=$gameSelfSwitches[_0x21d767(0x298)](_0x15cb61)||![];$gameVariables[_0x21d767(0x1b5)](_0x3d5c5b,_0x2723dd);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x519),_0x2d6eb2=>{const _0x1640cb=_0x4f6648;VisuMZ['ConvertParams'](_0x2d6eb2,_0x2d6eb2);if(!$gameMap)return;const _0x51e04e=$gameTemp[_0x1640cb(0x684)](),_0x10e13d=_0x2d6eb2[_0x1640cb(0x17a)];_0x2d6eb2[_0x1640cb(0x330)]=_0x2d6eb2[_0x1640cb(0x330)]||$gameMap[_0x1640cb(0x191)](),_0x2d6eb2['Step2MapId']=_0x2d6eb2[_0x1640cb(0x5b6)]||$gameMap[_0x1640cb(0x191)](),_0x2d6eb2['TemplateName']=_0x2d6eb2[_0x1640cb(0x3b2)][_0x1640cb(0x42b)]()[_0x1640cb(0x4cf)]();if(!_0x10e13d&&_0x2d6eb2[_0x1640cb(0x330)]!==$gameMap[_0x1640cb(0x191)]())return;if($gameMap[_0x1640cb(0x191)]()===_0x2d6eb2[_0x1640cb(0x330)]){if(_0x1640cb(0x71d)===_0x1640cb(0x71d)){const _0x13087e=$gameMap['event'](_0x2d6eb2[_0x1640cb(0x1af)]||_0x51e04e[_0x1640cb(0x679)]());if(!_0x13087e)return;_0x2d6eb2[_0x1640cb(0x3b2)]!==_0x1640cb(0x32b)?_0x13087e['morphIntoTemplate'](_0x2d6eb2[_0x1640cb(0x3b2)]):_0x13087e[_0x1640cb(0x6cf)](_0x2d6eb2[_0x1640cb(0x5b6)],_0x2d6eb2[_0x1640cb(0x433)]||_0x51e04e['eventId']());}else{const _0x2d9987=/\$gameVariables\.value\((\d+)\)/gi,_0x4de04a=/\\V\[(\d+)\]/gi;while(_0x5eb3ca[_0x1640cb(0x6be)](_0x2d9987)){_0x3f9883=_0x456f1d[_0x1640cb(0x302)](_0x2d9987,(_0x22ae93,_0x11d93a)=>_0x3d750d['value'](_0x415033(_0x11d93a)));}while(_0x2c0d53[_0x1640cb(0x6be)](_0x4de04a)){_0x164025=_0x701e47['replace'](_0x4de04a,(_0x47a444,_0xe5b647)=>_0xc6a3aa[_0x1640cb(0x298)](_0x48128e(_0xe5b647)));}return _0x2bd3f7;}}if(_0x10e13d){if(_0x1640cb(0x45e)===_0x1640cb(0x45e))$gameSystem[_0x1640cb(0x5a5)](_0x2d6eb2[_0x1640cb(0x330)],_0x2d6eb2[_0x1640cb(0x1af)],_0x2d6eb2[_0x1640cb(0x3b2)],_0x2d6eb2[_0x1640cb(0x5b6)],_0x2d6eb2[_0x1640cb(0x433)]);else{const _0x3c60f4=this[_0x1640cb(0x533)]['mapId'],_0x3f58b6=this['_eventMorphData']['eventId'];return _0x4551e4['referEvent'](_0x3c60f4,_0x3f58b6);}}}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x34a),_0x2ef821=>{const _0xbfafa4=_0x4f6648;VisuMZ['ConvertParams'](_0x2ef821,_0x2ef821);if(!$gameMap)return;const _0x55c948=$gameTemp[_0xbfafa4(0x684)]();_0x2ef821[_0xbfafa4(0x38f)]=_0x2ef821[_0xbfafa4(0x38f)]||$gameMap[_0xbfafa4(0x191)]();if($gameMap[_0xbfafa4(0x191)]()===_0x2ef821[_0xbfafa4(0x38f)]){const _0x2a757f=$gameMap[_0xbfafa4(0x273)](_0x2ef821[_0xbfafa4(0x60f)]||_0x55c948[_0xbfafa4(0x679)]());_0x2a757f[_0xbfafa4(0x666)]();}_0x2ef821[_0xbfafa4(0x393)]&&$gameSystem[_0xbfafa4(0x239)](_0x2ef821[_0xbfafa4(0x38f)],_0x2ef821[_0xbfafa4(0x60f)]||_0x55c948[_0xbfafa4(0x679)]());}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x365),_0x68c10a=>{const _0x16fb9d=_0x4f6648;VisuMZ[_0x16fb9d(0x37a)](_0x68c10a,_0x68c10a),$gameSystem[_0x16fb9d(0x29e)]($gamePlayer,_0x68c10a[_0x16fb9d(0x32a)],_0x68c10a[_0x16fb9d(0x5ea)],_0x68c10a['IconBufferY'],_0x68c10a[_0x16fb9d(0x675)]);}),PluginManager[_0x4f6648(0x624)](pluginData['name'],_0x4f6648(0x3e3),_0x1b4c32=>{const _0x56eda8=_0x4f6648;VisuMZ[_0x56eda8(0x37a)](_0x1b4c32,_0x1b4c32),$gameSystem[_0x56eda8(0x3ce)]($gamePlayer);}),PluginManager['registerCommand'](pluginData['name'],'PlayerMovementChange',_0x2610a6=>{const _0x179a18=_0x4f6648;VisuMZ['ConvertParams'](_0x2610a6,_0x2610a6),$gameSystem['setPlayerControlDisable'](!_0x2610a6[_0x179a18(0x59a)]);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x54e),_0x2230cc=>{const _0x51b116=_0x4f6648;VisuMZ[_0x51b116(0x37a)](_0x2230cc,_0x2230cc),$gameSystem[_0x51b116(0x6f8)](_0x2230cc[_0x51b116(0x654)]);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x40d),_0x554fe2=>{const _0xb383ad=_0x4f6648;VisuMZ[_0xb383ad(0x37a)](_0x554fe2,_0x554fe2);const _0x381513=_0x554fe2[_0xb383ad(0x38f)]||$gameMap[_0xb383ad(0x191)]();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x381513);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x6d0),_0x16ea12=>{const _0x3432e1=_0x4f6648;VisuMZ[_0x3432e1(0x37a)](_0x16ea12,_0x16ea12);const _0x302872=$gameTemp[_0x3432e1(0x684)]();_0x16ea12[_0x3432e1(0x38f)]=_0x16ea12[_0x3432e1(0x38f)]||$gameMap['mapId']();const _0x3b27c7=[_0x16ea12[_0x3432e1(0x38f)],_0x16ea12[_0x3432e1(0x60f)]||_0x302872[_0x3432e1(0x679)](),_0x16ea12[_0x3432e1(0x458)]];switch(_0x16ea12[_0x3432e1(0x4e2)]){case'ON':$gameSelfSwitches['setValue'](_0x3b27c7,!![]);break;case _0x3432e1(0x5bd):$gameSelfSwitches['setValue'](_0x3b27c7,![]);break;case'Toggle':$gameSelfSwitches[_0x3432e1(0x1b5)](_0x3b27c7,!$gameSelfSwitches['value'](_0x3b27c7));break;}}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],'SelfSwitchID',_0x3d6b74=>{const _0x603168=_0x4f6648;VisuMZ[_0x603168(0x37a)](_0x3d6b74,_0x3d6b74);const _0x5642d9=$gameTemp['getLastPluginCommandInterpreter']();_0x3d6b74[_0x603168(0x38f)]=_0x3d6b74[_0x603168(0x38f)]||$gameMap[_0x603168(0x191)]();const _0x38f08e=[_0x3d6b74['MapId'],_0x3d6b74['EventId']||_0x5642d9[_0x603168(0x679)](),_0x603168(0x27e)['format'](_0x3d6b74[_0x603168(0x5fd)])];switch(_0x3d6b74[_0x603168(0x4e2)]){case'ON':$gameSelfSwitches[_0x603168(0x1b5)](_0x38f08e,!![]);break;case _0x603168(0x5bd):$gameSelfSwitches[_0x603168(0x1b5)](_0x38f08e,![]);break;case _0x603168(0x465):$gameSelfSwitches[_0x603168(0x1b5)](_0x38f08e,!$gameSelfSwitches['value'](_0x38f08e));break;}}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x601),_0x381c42=>{const _0x27fe75=_0x4f6648;VisuMZ[_0x27fe75(0x37a)](_0x381c42,_0x381c42);const _0x7d73e=$gameTemp[_0x27fe75(0x684)]();_0x381c42[_0x27fe75(0x38f)]=_0x381c42['MapId']||$gameMap['mapId']();const _0x128652=[_0x381c42['MapId'],_0x381c42['EventId']||_0x7d73e['eventId'](),_0x27fe75(0x167)[_0x27fe75(0x4a2)](_0x381c42[_0x27fe75(0x51d)])],_0x372c89=VisuMZ['OperateValues']($gameSelfSwitches[_0x27fe75(0x298)](_0x128652),_0x381c42[_0x27fe75(0x4e2)],_0x381c42[_0x27fe75(0x648)]);$gameSelfSwitches[_0x27fe75(0x1b5)](_0x128652,_0x372c89);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'SpawnEventAtXY',_0x1b879c=>{const _0x25faa2=_0x4f6648;VisuMZ[_0x25faa2(0x37a)](_0x1b879c,_0x1b879c);const _0x1ed745=$gameTemp['getLastPluginCommandInterpreter'](),_0x3e79d9={'template':_0x1b879c['TemplateName'],'mapId':_0x1b879c[_0x25faa2(0x38f)]||$gameMap[_0x25faa2(0x191)](),'eventId':_0x1b879c['EventId']||_0x1ed745[_0x25faa2(0x679)](),'x':_0x1b879c['PosX'],'y':_0x1b879c[_0x25faa2(0x6bc)],'spawnPreserved':_0x1b879c[_0x25faa2(0x63c)],'spawnEventId':$gameMap['_spawnedEvents']['length']+0x3e8},_0x291fc2=_0x1b879c['SuccessSwitchId']||0x0;if(!VisuMZ[_0x25faa2(0x712)][_0x3e79d9[_0x25faa2(0x191)]]&&_0x3e79d9[_0x25faa2(0x191)]!==$gameMap['mapId']()){let _0xfb90a3=_0x25faa2(0x4fa)[_0x25faa2(0x4a2)](_0x3e79d9['mapId']);_0xfb90a3+=_0x25faa2(0x1dd),_0xfb90a3+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0xfb90a3+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0xfb90a3+=_0x25faa2(0x48e)[_0x25faa2(0x4a2)](_0x3e79d9[_0x25faa2(0x191)]),alert(_0xfb90a3);return;}const _0x3e2f84=$gameMap['prepareSpawnedEventAtXY'](_0x3e79d9,_0x1b879c[_0x25faa2(0x473)],_0x1b879c['Passability']);_0x291fc2&&$gameSwitches[_0x25faa2(0x1b5)](_0x291fc2,!!_0x3e2f84);}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x45c),_0x49c670=>{const _0x92fbd3=_0x4f6648;VisuMZ[_0x92fbd3(0x37a)](_0x49c670,_0x49c670);const _0x44b033=$gameTemp[_0x92fbd3(0x684)](),_0x421287={'template':_0x49c670[_0x92fbd3(0x3b2)],'mapId':_0x49c670['MapId']||$gameMap[_0x92fbd3(0x191)](),'eventId':_0x49c670[_0x92fbd3(0x60f)]||_0x44b033[_0x92fbd3(0x679)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x49c670['Preserve'],'spawnEventId':$gameMap[_0x92fbd3(0x447)][_0x92fbd3(0x685)]+0x3e8},_0x36e06a=_0x49c670['SuccessSwitchId']||0x0;if(!VisuMZ[_0x92fbd3(0x712)][_0x421287[_0x92fbd3(0x191)]]&&_0x421287['mapId']!==$gameMap[_0x92fbd3(0x191)]()){if(_0x92fbd3(0x352)!==_0x92fbd3(0x352)){if(_0x1ec4ef)for(const _0x29d12a of _0x4e6d2b[_0x92fbd3(0x4b3)]()){_0x29d12a['refresh'](),_0x29d12a[_0x92fbd3(0x47a)]();}if(_0x123341[_0x92fbd3(0x25e)]()){const _0x2a346f=_0x16a35e[_0x92fbd3(0x355)]['_spriteset'];if(_0x2a346f)_0x2a346f[_0x92fbd3(0x35f)]();}}else{let _0x2aacba=_0x92fbd3(0x4fa)[_0x92fbd3(0x4a2)](_0x421287[_0x92fbd3(0x191)]);_0x2aacba+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2aacba+=_0x92fbd3(0x2b4),_0x2aacba+=_0x92fbd3(0x606),_0x2aacba+=_0x92fbd3(0x48e)[_0x92fbd3(0x4a2)](_0x421287[_0x92fbd3(0x191)]),alert(_0x2aacba);return;}}const _0x10f278=$gameMap[_0x92fbd3(0x4d0)](_0x421287,_0x49c670[_0x92fbd3(0x6b8)],_0x49c670[_0x92fbd3(0x473)],_0x49c670[_0x92fbd3(0x6f9)]);_0x36e06a&&$gameSwitches[_0x92fbd3(0x1b5)](_0x36e06a,!!_0x10f278);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x423),_0x4c6e0f=>{const _0x4b7e0a=_0x4f6648;VisuMZ[_0x4b7e0a(0x37a)](_0x4c6e0f,_0x4c6e0f);const _0x3d1d5d=$gameTemp[_0x4b7e0a(0x684)](),_0x465ada={'template':_0x4c6e0f[_0x4b7e0a(0x3b2)],'mapId':_0x4c6e0f[_0x4b7e0a(0x38f)]||$gameMap['mapId'](),'eventId':_0x4c6e0f['EventId']||_0x3d1d5d[_0x4b7e0a(0x679)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4c6e0f['Preserve'],'spawnEventId':$gameMap[_0x4b7e0a(0x447)][_0x4b7e0a(0x685)]+0x3e8},_0x1cc957=_0x4c6e0f['SuccessSwitchId']||0x0;if(!VisuMZ['PreloadedMaps'][_0x465ada['mapId']]&&_0x465ada[_0x4b7e0a(0x191)]!==$gameMap[_0x4b7e0a(0x191)]()){if(_0x4b7e0a(0x5ce)==='painc'){let _0x2f8073='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x4b7e0a(0x4a2)](_0x465ada[_0x4b7e0a(0x191)]);_0x2f8073+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x2f8073+=_0x4b7e0a(0x2b4),_0x2f8073+=_0x4b7e0a(0x606),_0x2f8073+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x465ada[_0x4b7e0a(0x191)]),alert(_0x2f8073);return;}else{const _0x52fce4=this['getDirectionToPoint'](_0x30e246,_0x434fe4,!![]);if(_0x52fce4)this[_0x4b7e0a(0x513)](_0x52fce4);}}const _0x42c1d7=$gameMap[_0x4b7e0a(0x517)](_0x465ada,_0x4c6e0f[_0x4b7e0a(0x3e6)],_0x4c6e0f[_0x4b7e0a(0x473)],_0x4c6e0f[_0x4b7e0a(0x6f9)]);if(_0x1cc957){if('TTAPr'!==_0x4b7e0a(0x50b)){_0x9c029f[_0x4b7e0a(0x37a)](_0x3b8391,_0x1df392);const _0xe6ac1e=_0x4c76eb[_0x4b7e0a(0x684)]();_0xfd5595[_0x4b7e0a(0x38f)]=_0x3f0166[_0x4b7e0a(0x38f)]||_0x49eabd[_0x4b7e0a(0x191)]();const _0x5b3050=[_0x39aa4c['MapId'],_0x53aa02['EventId']||_0xe6ac1e[_0x4b7e0a(0x679)](),_0x4b7e0a(0x167)[_0x4b7e0a(0x4a2)](_0x36d2bb['VariableId'])],_0x208762=_0x4b5ce0[_0x4b7e0a(0x5a9)],_0x409452=_0xecce8f[_0x4b7e0a(0x298)](_0x5b3050)||![];_0xd8fc9f[_0x4b7e0a(0x1b5)](_0x208762,_0x409452);}else $gameSwitches[_0x4b7e0a(0x1b5)](_0x1cc957,!!_0x42c1d7);}}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x3b8),_0x1415cd=>{const _0xe152dc=_0x4f6648;VisuMZ[_0xe152dc(0x37a)](_0x1415cd,_0x1415cd);const _0x136267=$gameTemp[_0xe152dc(0x684)]();$gameMap[_0xe152dc(0x443)](_0x1415cd[_0xe152dc(0x31b)]||_0x136267['eventId']());}),PluginManager[_0x4f6648(0x624)](pluginData[_0x4f6648(0x2df)],'SpawnEventDespawnAtXY',_0x167164=>{const _0x455cd4=_0x4f6648;VisuMZ[_0x455cd4(0x37a)](_0x167164,_0x167164);const _0xa40326=_0x167164[_0x455cd4(0x59e)],_0xb1e1c5=_0x167164[_0x455cd4(0x6bc)];$gameMap[_0x455cd4(0x631)](_0xa40326,_0xb1e1c5);}),PluginManager['registerCommand'](pluginData['name'],_0x4f6648(0x6d5),_0x57fe31=>{const _0x3c7aef=_0x4f6648;VisuMZ[_0x3c7aef(0x37a)](_0x57fe31,_0x57fe31),$gameMap[_0x3c7aef(0x376)](_0x57fe31[_0x3c7aef(0x6b8)]);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x3fd),_0x1fe023=>{const _0x1459c1=_0x4f6648;VisuMZ[_0x1459c1(0x37a)](_0x1fe023,_0x1fe023),$gameMap[_0x1459c1(0x377)](_0x1fe023[_0x1459c1(0x3e6)]);}),PluginManager['registerCommand'](pluginData[_0x4f6648(0x2df)],_0x4f6648(0x64a),_0x1ab08a=>{const _0x27396d=_0x4f6648;VisuMZ[_0x27396d(0x37a)](_0x1ab08a,_0x1ab08a),$gameMap[_0x27396d(0x497)]();}),VisuMZ['EventsMoveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x4f6648(0x1a3)][_0x4f6648(0x264)],Scene_Boot[_0x4f6648(0x1a3)][_0x4f6648(0x264)]=function(){const _0x35e690=_0x4f6648;VisuMZ[_0x35e690(0x2f5)][_0x35e690(0x494)][_0x35e690(0x36c)](this),this[_0x35e690(0x536)](),this[_0x35e690(0x512)]();if(VisuMZ[_0x35e690(0x2f5)][_0x35e690(0x3d1)])VisuMZ['EventsMoveCore'][_0x35e690(0x3d1)]['initialize']();},VisuMZ[_0x4f6648(0x712)]=[],VisuMZ[_0x4f6648(0x437)]={},Scene_Boot[_0x4f6648(0x1a3)][_0x4f6648(0x536)]=function(){const _0x1203cc=_0x4f6648;if(DataManager[_0x1203cc(0x1bd)]()||DataManager[_0x1203cc(0x1d2)]())return;const _0x188bbb=VisuMZ[_0x1203cc(0x2f5)][_0x1203cc(0x3fc)]['Template'],_0x5b750d=_0x188bbb['PreloadMaps'][_0x1203cc(0x427)](0x0);for(const _0x472695 of _0x188bbb['List']){_0x472695[_0x1203cc(0x217)]=_0x472695[_0x1203cc(0x217)][_0x1203cc(0x42b)]()['trim'](),VisuMZ[_0x1203cc(0x437)][_0x472695[_0x1203cc(0x217)]]=_0x472695;if(!_0x5b750d[_0x1203cc(0x328)](_0x472695['MapID']))_0x5b750d[_0x1203cc(0x58b)](_0x472695[_0x1203cc(0x649)]);}for(const _0x5eef1 of _0x5b750d){if(VisuMZ[_0x1203cc(0x712)][_0x5eef1])continue;const _0x2aeb14='Map%1.json'[_0x1203cc(0x4a2)](_0x5eef1[_0x1203cc(0x3ff)](0x3)),_0xf9d5d6=_0x1203cc(0x438)['format'](_0x5eef1);DataManager['loadDataFile'](_0xf9d5d6,_0x2aeb14),setTimeout(this[_0x1203cc(0x169)]['bind'](this,_0x5eef1,_0xf9d5d6),0x64);}},Scene_Boot[_0x4f6648(0x1a3)][_0x4f6648(0x169)]=function(_0x2e097a,_0x207198){const _0x172d35=_0x4f6648;window[_0x207198]?'UsaeO'!==_0x172d35(0x19b)?_0x5f458a=this[_0x172d35(0x553)](_0x4eeee7,_0x5b128e):(VisuMZ['PreloadedMaps'][_0x2e097a]=window[_0x207198],window[_0x207198]=undefined):setTimeout(this[_0x172d35(0x169)][_0x172d35(0x5c2)](this,_0x2e097a,_0x207198),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x4f6648(0x18e)]=[],VisuMZ[_0x4f6648(0x244)]=[],VisuMZ[_0x4f6648(0x30f)]=[],VisuMZ[_0x4f6648(0x6d7)]=[],VisuMZ[_0x4f6648(0x50c)]=[],Scene_Boot[_0x4f6648(0x1a3)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x4762b5=_0x4f6648;for(let _0x4cff40=0x1;_0x4cff40<$dataSystem[_0x4762b5(0x59c)][_0x4762b5(0x685)];_0x4cff40++){if($dataSystem[_0x4762b5(0x59c)][_0x4cff40][_0x4762b5(0x6be)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x4762b5(0x53f)][_0x4762b5(0x58b)](_0x4cff40);if($dataSystem[_0x4762b5(0x59c)][_0x4cff40][_0x4762b5(0x6be)](/<SELF>/i))VisuMZ[_0x4762b5(0x18e)][_0x4762b5(0x58b)](_0x4cff40);if($dataSystem[_0x4762b5(0x59c)][_0x4cff40][_0x4762b5(0x6be)](/<MAP>/i))VisuMZ[_0x4762b5(0x244)][_0x4762b5(0x58b)](_0x4cff40);}for(let _0x65b13e=0x1;_0x65b13e<$dataSystem[_0x4762b5(0x38a)][_0x4762b5(0x685)];_0x65b13e++){if($dataSystem[_0x4762b5(0x38a)][_0x65b13e][_0x4762b5(0x6be)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x4762b5(0x58b)](_0x65b13e);if($dataSystem['variables'][_0x65b13e]['match'](/<SELF>/i))VisuMZ['SelfVariables'][_0x4762b5(0x58b)](_0x65b13e);if($dataSystem[_0x4762b5(0x38a)][_0x65b13e][_0x4762b5(0x6be)](/<MAP>/i))VisuMZ[_0x4762b5(0x50c)]['push'](_0x65b13e);}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3d1)]={},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3d1)][_0x4f6648(0x233)]=function(){const _0x166151=_0x4f6648;this[_0x166151(0x4e7)]=new Game_CPCInterpreter(),this[_0x166151(0x4ba)]();},VisuMZ[_0x4f6648(0x2f5)]['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x53c57a=_0x4f6648;this[_0x53c57a(0x6d8)]=[];for(const _0x1f6e8c of $dataCommonEvents){if(!_0x1f6e8c)continue;VisuMZ[_0x53c57a(0x2f5)][_0x53c57a(0x3d1)][_0x53c57a(0x663)](_0x1f6e8c);if(_0x1f6e8c['CPC'][_0x53c57a(0x685)]>0x0)this[_0x53c57a(0x6d8)][_0x53c57a(0x58b)](_0x1f6e8c['id']);}},VisuMZ['EventsMoveCore'][_0x4f6648(0x3d1)][_0x4f6648(0x6bd)]=function(_0x2f790b,_0x2f8969,_0xaa5759){const _0x473478=_0x4f6648;return this[_0x473478(0x4e7)][_0x473478(0x287)](_0x2f790b,_0x2f8969),_0xaa5759?this[_0x473478(0x4e7)][_0x473478(0x568)](_0xaa5759):_0x473478(0x5e5)!==_0x473478(0x289)?this[_0x473478(0x4e7)][_0x473478(0x3a6)]():(this[_0x473478(0x43e)]=this[_0x473478(0x6ce)]['labelWindowText'](),this[_0x473478(0x491)]()),this['_interpreter'][_0x473478(0x3f0)];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3d1)]['loadCPC']=function(_0x54a290){const _0x36295a=_0x4f6648;let _0x556644=![];_0x54a290[_0x36295a(0x23d)]=[];for(const _0x1e8e7c of _0x54a290[_0x36295a(0x17f)]){if([0x6c,0x198][_0x36295a(0x328)](_0x1e8e7c[_0x36295a(0x25f)])){const _0x157c40=_0x1e8e7c['parameters'][0x0];if(_0x157c40['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x556644=!![];else _0x157c40[_0x36295a(0x6be)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x556644=![]);}if(_0x556644){if('snhfX'!==_0x36295a(0x1d7))_0x54a290['CPC'][_0x36295a(0x58b)](_0x1e8e7c);else return 0x2;}}},getSelfSwitchValue=function(_0x49c28f,_0x12d311,_0x3928c3){const _0x5f23f6=_0x4f6648;let _0x4d3f26=[_0x49c28f,_0x12d311,_0x5f23f6(0x27e)[_0x5f23f6(0x4a2)](_0x3928c3)];return typeof _0x3928c3===_0x5f23f6(0x1aa)&&(_0x4d3f26=[_0x49c28f,_0x12d311,_0x3928c3['toUpperCase']()['trim']()]),$gameSelfSwitches[_0x5f23f6(0x298)](_0x4d3f26);},getMapSwitchValue=function(_0x2b0ac7,_0x58b937){const _0x37dbae=_0x4f6648;let _0x216420=[0x0,0x0,_0x37dbae(0x6ab)[_0x37dbae(0x4a2)](_0x2b0ac7,_0x58b937)];return $gameSelfSwitches[_0x37dbae(0x298)](_0x216420);},getMapVariableValue=function(_0x4e90a6,_0x3bbdc5){const _0x4eba37=_0x4f6648;let _0x407a93=[0x0,0x0,_0x4eba37(0x281)[_0x4eba37(0x4a2)](_0x4e90a6,_0x3bbdc5)];return $gameSelfSwitches['value'](_0x407a93);},getSelfVariableValue=function(_0x307887,_0x430d4f,_0x536b47){const _0x12d994=_0x4f6648,_0x247c42=[_0x307887,_0x430d4f,_0x12d994(0x167)[_0x12d994(0x4a2)](_0x536b47)];return $gameSelfSwitches[_0x12d994(0x298)](_0x247c42);},setSelfSwitchValue=function(_0x462795,_0x98ec3b,_0x3fcf5f,_0x3d2fc1){const _0x5de473=_0x4f6648;let _0x25ef22=[_0x462795,_0x98ec3b,_0x5de473(0x27e)[_0x5de473(0x4a2)](_0x3fcf5f)];typeof _0x3fcf5f===_0x5de473(0x1aa)&&(_0x25ef22=[_0x462795,_0x98ec3b,_0x3fcf5f[_0x5de473(0x42b)]()[_0x5de473(0x4cf)]()]),$gameSelfSwitches['setValue'](_0x25ef22,_0x3d2fc1);},setSelfVariableValue=function(_0xabb20d,_0x3ff4f2,_0x158201,_0x3ad3d9){const _0x1b396c=_0x4f6648,_0x5a84cf=[_0xabb20d,_0x3ff4f2,_0x1b396c(0x167)['format'](_0x158201)];$gameSelfSwitches['setValue'](_0x5a84cf,_0x3ad3d9);},setMapSwitchValue=function(_0x5efaf2,_0x171ef0,_0x1d3a16){const _0x57d63b=_0x4f6648;let _0x3de1f2=[0x0,0x0,_0x57d63b(0x6ab)[_0x57d63b(0x4a2)](_0x5efaf2,_0x171ef0)];$gameSelfSwitches[_0x57d63b(0x1b5)](_0x3de1f2,_0x1d3a16);},setMapVariableValue=function(_0xa4bf48,_0x18657d,_0x15c454){const _0x3bade=_0x4f6648;let _0x33b8c7=[0x0,0x0,_0x3bade(0x281)['format'](_0xa4bf48,_0x18657d)];$gameSelfSwitches[_0x3bade(0x1b5)](_0x33b8c7,_0x15c454);},DataManager[_0x4f6648(0x5d1)]=function(_0x3d20fe){const _0x12eee2=_0x4f6648;if(SceneManager[_0x12eee2(0x355)][_0x12eee2(0x382)]===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x12eee2(0x328)](_0x3d20fe);},DataManager['isAdvancedVariable']=function(_0x511f50){const _0x3315e6=_0x4f6648;if(SceneManager[_0x3315e6(0x355)][_0x3315e6(0x382)]===Scene_Debug)return![];return VisuMZ[_0x3315e6(0x30f)][_0x3315e6(0x328)](_0x511f50);},DataManager[_0x4f6648(0x188)]=function(_0x13a980){const _0x566be8=_0x4f6648;if(SceneManager[_0x566be8(0x355)][_0x566be8(0x382)]===Scene_Debug)return![];return VisuMZ[_0x566be8(0x18e)]['includes'](_0x13a980);},DataManager['isSelfVariable']=function(_0x15433b){const _0x31b53f=_0x4f6648;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ[_0x31b53f(0x6d7)][_0x31b53f(0x328)](_0x15433b);},DataManager['isMapSwitch']=function(_0x23d67a){const _0xc59361=_0x4f6648;if(BattleManager[_0xc59361(0x1bd)]())return![];return VisuMZ[_0xc59361(0x244)][_0xc59361(0x328)](_0x23d67a);},DataManager['isMapVariable']=function(_0x3194be){const _0x78c725=_0x4f6648;if(BattleManager[_0x78c725(0x1bd)]())return![];return VisuMZ['MapVariables'][_0x78c725(0x328)](_0x3194be);},SceneManager[_0x4f6648(0x25e)]=function(){const _0x537a57=_0x4f6648;return this[_0x537a57(0x355)]&&this[_0x537a57(0x355)][_0x537a57(0x382)]===Scene_Map;},SceneManager[_0x4f6648(0x489)]=function(){const _0x2baae0=_0x4f6648;return this['_scene']&&this[_0x2baae0(0x355)]instanceof Scene_Map;},VisuMZ['EventsMoveCore']['Game_Temp_setDestination']=Game_Temp[_0x4f6648(0x1a3)][_0x4f6648(0x69e)],Game_Temp[_0x4f6648(0x1a3)]['setDestination']=function(_0x1713c2,_0x34d81e){const _0x50d6ea=_0x4f6648;if(this[_0x50d6ea(0x252)](_0x1713c2,_0x34d81e))return;VisuMZ[_0x50d6ea(0x2f5)]['Game_Temp_setDestination'][_0x50d6ea(0x36c)](this,_0x1713c2,_0x34d81e);},Game_Temp[_0x4f6648(0x1a3)][_0x4f6648(0x252)]=function(_0x17d58d,_0x5a72c3){const _0x189631=_0x4f6648,_0x3b6a50=$gameMap['eventsXy'](_0x17d58d,_0x5a72c3);for(const _0x57bad7 of _0x3b6a50){if(_0x189631(0x5ee)!=='vOPuE'){if(_0x57bad7&&_0x57bad7[_0x189631(0x673)]())return _0x57bad7[_0x189631(0x485)](),!![];}else this[_0x189631(0x234)](_0x5d8a9f['_mapId'],_0x24caa8[_0x189631(0x575)]);}return TouchInput[_0x189631(0x6de)]()&&_0x3b6a50[_0x189631(0x685)]>0x0&&TouchInput[_0x189631(0x5f1)](),![];},Game_Temp[_0x4f6648(0x1a3)][_0x4f6648(0x409)]=function(_0x14e2e6){this['_lastPluginCommandInterpreter']=_0x14e2e6;},Game_Temp[_0x4f6648(0x1a3)][_0x4f6648(0x684)]=function(){const _0x2126ea=_0x4f6648;return this[_0x2126ea(0x5c6)];},Game_Temp[_0x4f6648(0x1a3)][_0x4f6648(0x3a5)]=function(_0x5ea0c8){const _0x436a0c=_0x4f6648;this[_0x436a0c(0x3cc)]=_0x5ea0c8;},Game_Temp['prototype'][_0x4f6648(0x4d3)]=function(){const _0x560f84=_0x4f6648;this[_0x560f84(0x3cc)]=undefined;},Game_Temp['prototype'][_0x4f6648(0x186)]=function(){return this['_selfTarget'];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x38e)]=Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x233)],Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x233)]=function(){const _0x15c5ad=_0x4f6648;VisuMZ[_0x15c5ad(0x2f5)][_0x15c5ad(0x38e)][_0x15c5ad(0x36c)](this),this['initEventsMoveCore'](),this['initFollowerController']();},Game_System[_0x4f6648(0x1a3)]['initEventsMoveCore']=function(){const _0x258835=_0x4f6648;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x258835(0x351)]={},this[_0x258835(0x3e2)]=[],this[_0x258835(0x381)]={},this['_SavedEventLocations']={},this[_0x258835(0x2b9)]=![],this['_PlayerDiagonalSetting']='default';},Game_System[_0x4f6648(0x1a3)]['isDashingEnabled']=function(){const _0x1c4abf=_0x4f6648;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x1c4abf(0x42e)]===undefined)this[_0x1c4abf(0x66d)]();return this[_0x1c4abf(0x65e)]['DashingEnable'];},Game_System['prototype'][_0x4f6648(0x611)]=function(_0x537a7d){const _0x19a9aa=_0x4f6648;if(this[_0x19a9aa(0x65e)]===undefined)this['initEventsMoveCore']();if(this[_0x19a9aa(0x65e)][_0x19a9aa(0x42e)]===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x19a9aa(0x42e)]=_0x537a7d;},Game_System['prototype'][_0x4f6648(0x33e)]=function(){const _0x40294e=_0x4f6648;if(this[_0x40294e(0x65e)]===undefined)this[_0x40294e(0x66d)]();if(this[_0x40294e(0x65e)]['EventAutoMovement']===undefined)this[_0x40294e(0x66d)]();return this[_0x40294e(0x65e)][_0x40294e(0x305)];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x716)]=function(_0x171c80){const _0x54cd87=_0x4f6648;if(this[_0x54cd87(0x65e)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings']['EventAutoMovement']===undefined)this[_0x54cd87(0x66d)]();this[_0x54cd87(0x65e)]['EventAutoMovement']=_0x171c80;},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x2da)]=function(){const _0x3b9477=_0x4f6648;if(this[_0x3b9477(0x65e)]===undefined)this[_0x3b9477(0x66d)]();if(this[_0x3b9477(0x65e)]['VisibleEventLabels']===undefined)this[_0x3b9477(0x66d)]();return this['_EventsMoveCoreSettings'][_0x3b9477(0x66c)];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x668)]=function(_0x3f7041){const _0x370831=_0x4f6648;if(this[_0x370831(0x65e)]===undefined)this['initEventsMoveCore']();if(this[_0x370831(0x65e)]['VisibleEventLabels']===undefined)this[_0x370831(0x66d)]();this[_0x370831(0x65e)]['VisibleEventLabels']=_0x3f7041;},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x39c)]=function(){const _0xc4b32=_0x4f6648;return this[_0xc4b32(0x2b9)]===undefined&&('UxjpC'==='UxjpC'?this['_DisablePlayerControl']=![]:(this[_0xc4b32(0x246)]=this['_settings'][_0xc4b32(0x558)],this[_0xc4b32(0x547)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x558)],this['z']=0x6,this[_0xc4b32(0x439)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x5a0)][_0xc4b32(0x1f4)],this[_0xc4b32(0x439)]>0x0&&this[_0xc4b32(0x439)]>=_0x1fa0fb[_0xc4b32(0x36a)](this['_duration']*0.48)&&(this['_fadeInDuration']=_0x426be0[_0xc4b32(0x36a)](this[_0xc4b32(0x246)]*0.48)),this[_0xc4b32(0x6b0)]=this[_0xc4b32(0x439)]>0x0?0x0:0xff,this[_0xc4b32(0x446)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x5a0)][_0xc4b32(0x724)],this[_0xc4b32(0x446)]>0x0&&this[_0xc4b32(0x446)]>=_0x195b70[_0xc4b32(0x36a)](this['_duration']*0.48)&&(this['_fadeOutDuration']=_0x59d464['floor'](this[_0xc4b32(0x246)]*0.48)),this['_fadeOutStart']=this[_0xc4b32(0x446)],this[_0xc4b32(0x1ff)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x61d)]['x'],this[_0xc4b32(0x6b9)]=this['_settings'][_0xc4b32(0x61d)]['y'],this['_targetX']=this[_0xc4b32(0x2a1)][_0xc4b32(0x52f)]['x'],this[_0xc4b32(0x5fe)]=this['_settings'][_0xc4b32(0x52f)]['y'],this[_0xc4b32(0x69d)]=this[_0xc4b32(0x1ff)],this['_offsetY']=this[_0xc4b32(0x6b9)],this[_0xc4b32(0x3f8)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x55c)]['x'],this['_startScaleY']=this[_0xc4b32(0x2a1)]['startScale']['y'],this[_0xc4b32(0x3ca)]=this[_0xc4b32(0x2a1)][_0xc4b32(0x6a1)]['x'],this[_0xc4b32(0x5eb)]=this[_0xc4b32(0x2a1)]['endScale']['y'],this[_0xc4b32(0x3af)]=-this[_0xc4b32(0x2a1)]['angle'][_0xc4b32(0x5bf)],this[_0xc4b32(0x327)]=-this['_settings'][_0xc4b32(0x369)][_0xc4b32(0x35d)],this[_0xc4b32(0x621)]=-this[_0xc4b32(0x2a1)]['misc']['arc'],this[_0xc4b32(0x63b)]=0x0)),this[_0xc4b32(0x2b9)];},Game_System[_0x4f6648(0x1a3)]['setPlayerControlDisable']=function(_0x2681ae){this['_DisablePlayerControl']=_0x2681ae;},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x609)]=function(){const _0x507326=_0x4f6648;return this[_0x507326(0x270)];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x6f8)]=function(_0x16bfad){const _0x50ea9=_0x4f6648;this['_PlayerDiagonalSetting']=String(_0x16bfad)[_0x50ea9(0x531)]()[_0x50ea9(0x4cf)]();},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x1bb)]=function(_0x59458b){const _0xd87587=_0x4f6648;if(this[_0xd87587(0x351)]===undefined)this[_0xd87587(0x66d)]();if(!_0x59458b)return null;if(_0x59458b===$gamePlayer)return this['_EventIcons'][_0xd87587(0x3f7)];else{if(_0xd87587(0x5e6)===_0xd87587(0x5e6)){const _0x2a830a=VisuMZ['EventsMoveCore'][_0xd87587(0x3fc)],_0xfb5544=_0xd87587(0x17e)[_0xd87587(0x4a2)](_0x59458b[_0xd87587(0x527)],_0x59458b[_0xd87587(0x575)]);return this[_0xd87587(0x351)][_0xfb5544]=this[_0xd87587(0x351)][_0xfb5544]||{'iconIndex':0x0,'bufferX':_0x2a830a['Icon'][_0xd87587(0x26a)],'bufferY':_0x2a830a[_0xd87587(0x64b)][_0xd87587(0x448)],'blendMode':_0x2a830a[_0xd87587(0x64b)][_0xd87587(0x617)]},this[_0xd87587(0x351)][_0xfb5544];}else{if(_0x4e4a33===0x0||_0x1b46bd===0x0)return![];if(_0x55ad4e===_0x1f3cae[_0xd87587(0x191)]())return!![];if(!_0x3affd2[_0xd87587(0x712)][_0x207d20]&&_0x1aba7c!==_0x32151e['mapId']())return _0x1c38e1[_0xd87587(0x6aa)]()&&_0x2e962e[_0xd87587(0x216)](_0xd87587(0x455)[_0xd87587(0x4a2)](_0x4d1758)),![];return!![];}}},Game_System['prototype'][_0x4f6648(0x29e)]=function(_0x1be206,_0x4b8998,_0x5dd451,_0x2a54ed,_0x4c4917){const _0x957ef7=_0x4f6648;if(this[_0x957ef7(0x351)]===undefined)this[_0x957ef7(0x66d)]();const _0x46765c=_0x1be206===$gamePlayer?_0x957ef7(0x3f7):_0x957ef7(0x17e)['format'](_0x1be206[_0x957ef7(0x527)],_0x1be206['_eventId']);this['_EventIcons'][_0x46765c]={'iconIndex':_0x4b8998,'bufferX':_0x5dd451,'bufferY':_0x2a54ed,'blendMode':_0x4c4917};},Game_System['prototype'][_0x4f6648(0x4cc)]=function(_0x416639,_0x2d9159,_0x47273f,_0x1b406e,_0x3c64bd,_0x330a9a,_0x13a93b){const _0x28cc86=_0x4f6648;if(this['_EventIcons']===undefined)this[_0x28cc86(0x66d)]();const _0x499484=_0x28cc86(0x17e)[_0x28cc86(0x4a2)](_0x416639,_0x2d9159);this[_0x28cc86(0x351)][_0x499484]={'iconIndex':_0x47273f,'forced':_0x13a93b,'bufferX':_0x1b406e,'bufferY':_0x3c64bd,'blendMode':_0x330a9a};},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x3ce)]=function(_0x246bd7){const _0x3b6125=_0x4f6648;if(this[_0x3b6125(0x351)]===undefined)this[_0x3b6125(0x66d)]();if(!_0x246bd7)return null;_0x246bd7===$gamePlayer?delete this['_EventIcons'][_0x3b6125(0x3f7)]:this[_0x3b6125(0x234)](_0x246bd7[_0x3b6125(0x527)],_0x246bd7[_0x3b6125(0x575)]);},Game_System['prototype'][_0x4f6648(0x234)]=function(_0x288145,_0x2bf636){const _0x59161f=_0x4f6648;if(this[_0x59161f(0x351)]===undefined)this['initEventsMoveCore']();this['setEventIconDataKey'](_0x288145,_0x2bf636,-0x1,0x0,0x0,0x0,![]);},Game_System[_0x4f6648(0x1a3)]['resetIconsOnEventsData']=function(_0x25740e){const _0x7b1d35=_0x4f6648;if(this[_0x7b1d35(0x351)]===undefined)this['initEventsMoveCore']();if(!_0x25740e)return null;_0x25740e===$gamePlayer?delete this['_EventIcons'][_0x7b1d35(0x3f7)]:this[_0x7b1d35(0x5ec)](_0x25740e[_0x7b1d35(0x527)],_0x25740e[_0x7b1d35(0x575)]);},Game_System['prototype']['resetIconsOnEventsDataKey']=function(_0x5a8d53,_0x441b27){const _0x49b420=_0x4f6648;if(this[_0x49b420(0x351)]===undefined)this['initEventsMoveCore']();const _0x45b1ac=_0x49b420(0x17e)[_0x49b420(0x4a2)](_0x5a8d53,_0x441b27);if(this[_0x49b420(0x351)][_0x45b1ac]){if(_0x49b420(0x626)===_0x49b420(0x1d8)){if(_0x3584c0[_0x49b420(0x339)]())return;if(_0x976b9d[_0x49b420(0x219)]())return;let _0xc0a97a=_0x3a24d8['EventsMoveCore']['Settings']['RegionTouch'];const _0x1c2af2=_0x49b420(0x31c)[_0x49b420(0x4a2)](this['regionId']());_0xc0a97a[_0x1c2af2]&&_0x42d587[_0x49b420(0x589)](_0xc0a97a[_0x1c2af2]);}else{if(this['_EventIcons'][_0x45b1ac]['iconIndex']<0x0)return;if(this['_EventIcons'][_0x45b1ac][_0x49b420(0x350)])return;}}delete this[_0x49b420(0x351)][_0x45b1ac];},Game_System[_0x4f6648(0x1a3)]['restoreIconsOnEventsDataKey']=function(_0x12682c,_0x4651a7){const _0x5e8bb2=_0x4f6648;if(this['_EventIcons']===undefined)this[_0x5e8bb2(0x66d)]();const _0x3ae666='Map%1-Event%2'[_0x5e8bb2(0x4a2)](_0x12682c,_0x4651a7);delete this[_0x5e8bb2(0x351)][_0x3ae666];if(_0x12682c!==$gameMap[_0x5e8bb2(0x191)]())return;const _0x2ebdf5=$gameMap[_0x5e8bb2(0x273)](_0x4651a7);if(!_0x2ebdf5)return;_0x2ebdf5['setupPageSettings']();},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x699)]=function(_0x168374){const _0x156990=_0x4f6648;if(this[_0x156990(0x64c)]===undefined)this[_0x156990(0x66d)]();if(!_0x168374)return null;const _0x39d06d='Map%1-Event%2'[_0x156990(0x4a2)](_0x168374['_mapId'],_0x168374[_0x156990(0x575)]);return this[_0x156990(0x64c)][_0x39d06d];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x467)]=function(_0x47d9b8){const _0x53b9f4=_0x4f6648;if(this[_0x53b9f4(0x64c)]===undefined)this[_0x53b9f4(0x66d)]();if(!_0x47d9b8)return;const _0x11e964=_0x53b9f4(0x17e)[_0x53b9f4(0x4a2)](_0x47d9b8['_mapId'],_0x47d9b8['_eventId']);this[_0x53b9f4(0x64c)][_0x11e964]={'direction':_0x47d9b8[_0x53b9f4(0x4dc)](),'x':Math[_0x53b9f4(0x6fb)](_0x47d9b8['x']),'y':Math[_0x53b9f4(0x6fb)](_0x47d9b8['y']),'pageIndex':_0x47d9b8[_0x53b9f4(0x32e)],'moveRouteIndex':_0x47d9b8[_0x53b9f4(0x203)]};},Game_System['prototype'][_0x4f6648(0x61e)]=function(_0x56e72d){const _0x577cb3=_0x4f6648;if(this['_SavedEventLocations']===undefined)this[_0x577cb3(0x66d)]();if(!_0x56e72d)return;this[_0x577cb3(0x41a)](_0x56e72d['_mapId'],_0x56e72d[_0x577cb3(0x575)]);},Game_System['prototype'][_0x4f6648(0x41a)]=function(_0x4ab0cf,_0x41a70d){const _0x2a4f82=_0x4f6648;if(this[_0x2a4f82(0x64c)]===undefined)this['initEventsMoveCore']();const _0x1d441c=_0x2a4f82(0x17e)[_0x2a4f82(0x4a2)](_0x4ab0cf,_0x41a70d);delete this[_0x2a4f82(0x64c)][_0x1d441c];},Game_System[_0x4f6648(0x1a3)]['createSaveEventLocationData']=function(_0x2fef70,_0x55854a,_0x2380ed,_0x526d51,_0x4619ca,_0x41e856,_0x4b28d8){const _0x19821a=_0x4f6648;if(this[_0x19821a(0x64c)]===undefined)this[_0x19821a(0x66d)]();const _0x5b3c30=_0x19821a(0x17e)[_0x19821a(0x4a2)](_0x2fef70,_0x55854a);this[_0x19821a(0x64c)][_0x5b3c30]={'direction':_0x4619ca,'x':Math[_0x19821a(0x6fb)](_0x2380ed),'y':Math[_0x19821a(0x6fb)](_0x526d51),'pageIndex':_0x41e856,'moveRouteIndex':_0x4b28d8};},Game_System['prototype'][_0x4f6648(0x4d9)]=function(_0x1bbe5c){const _0xc039f3=_0x4f6648;if(this['_PreservedEventMorphData']===undefined)this[_0xc039f3(0x66d)]();if(!_0x1bbe5c)return;const _0x84e91b=_0xc039f3(0x17e)[_0xc039f3(0x4a2)](_0x1bbe5c['_mapId'],_0x1bbe5c['_eventId']);return this[_0xc039f3(0x381)][_0x84e91b];},Game_System[_0x4f6648(0x1a3)]['savePreservedMorphEventDataKey']=function(_0x36ded3,_0x2deeec,_0x420c92,_0x1edf62,_0x22f241){const _0x2b83fa=_0x4f6648;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0xfdc73a=_0x2b83fa(0x17e)[_0x2b83fa(0x4a2)](_0x36ded3,_0x2deeec);this['_PreservedEventMorphData'][_0xfdc73a]={'template':_0x420c92,'mapId':_0x1edf62,'eventId':_0x22f241};},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x239)]=function(_0x549b4d,_0x2660be){const _0x1b61b1=_0x4f6648;if(this[_0x1b61b1(0x381)]===undefined)this[_0x1b61b1(0x66d)]();const _0x1636c2=_0x1b61b1(0x17e)[_0x1b61b1(0x4a2)](_0x549b4d,_0x2660be);delete this[_0x1b61b1(0x381)][_0x1636c2];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x2ee)]=function(_0x735e75){const _0x454633=_0x4f6648;if(this[_0x454633(0x3e2)]===undefined)this[_0x454633(0x66d)]();return this[_0x454633(0x3e2)][_0x735e75]=this[_0x454633(0x3e2)][_0x735e75]||[],this['_MapSpawnedEventData'][_0x735e75];},Game_System[_0x4f6648(0x1a3)]['removeTemporaryMapSpawnedEvents']=function(_0xcf17f4){const _0x471e83=_0x4f6648,_0x27e646=this[_0x471e83(0x2ee)](_0xcf17f4);for(const _0x4b8c66 of _0x27e646){if(!_0x4b8c66)continue;if(_0x4b8c66[_0x471e83(0x6ea)])continue;const _0x560238=_0x27e646[_0x471e83(0x472)](_0x4b8c66);_0x27e646[_0x560238]=null;}},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x220)]=function(){const _0x33ac5a=_0x4f6648;this[_0x33ac5a(0x2f9)]=0x0,this[_0x33ac5a(0x398)]=![];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x691)]=function(){const _0x563548=_0x4f6648;if(this['_followerControlID']===undefined)this[_0x563548(0x220)]();return this[_0x563548(0x2f9)];},Game_System[_0x4f6648(0x1a3)][_0x4f6648(0x51e)]=function(_0x1151fb){const _0x3819f4=_0x4f6648;if(this['_followerControlID']===undefined)this[_0x3819f4(0x220)]();this[_0x3819f4(0x2f9)]=_0x1151fb;;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x309)]=Game_Interpreter['prototype'][_0x4f6648(0x62e)],Game_Interpreter[_0x4f6648(0x1a3)][_0x4f6648(0x62e)]=function(_0x114c4e){const _0x224b5f=_0x4f6648;if(!$gameParty[_0x224b5f(0x2f3)]()&&_0x114c4e<0x0){if(_0x224b5f(0x65d)!==_0x224b5f(0x65d))this[_0x224b5f(0x1f5)]=_0x5ddb4c(_0x25b594['$1'])||0x0;else{let _0x5a3a92=$gameSystem[_0x224b5f(0x691)]();if(_0x5a3a92>0x0)return _0x224b5f(0x5e8)!==_0x224b5f(0x636)?$gamePlayer[_0x224b5f(0x54c)]()[_0x224b5f(0x416)](_0x5a3a92-0x1):0x6;}}return VisuMZ[_0x224b5f(0x2f5)][_0x224b5f(0x309)]['call'](this,_0x114c4e);},Game_System['prototype'][_0x4f6648(0x2cc)]=function(){const _0xbcd719=_0x4f6648;if(this[_0xbcd719(0x398)]===undefined)this['initFollowerController']();return this['_followerChaseOff'];},Game_System[_0x4f6648(0x1a3)]['setStopFollowerChasing']=function(_0x403a70){const _0x4c81ff=_0x4f6648;if(this[_0x4c81ff(0x398)]===undefined)this[_0x4c81ff(0x220)]();this[_0x4c81ff(0x398)]=_0x403a70;;},VisuMZ[_0x4f6648(0x2f5)]['Game_Followers_jumpAll']=Game_Followers['prototype'][_0x4f6648(0x4b6)],Game_Followers['prototype']['jumpAll']=function(){const _0xf9a0ba=_0x4f6648;if($gameSystem[_0xf9a0ba(0x2cc)]())return;VisuMZ[_0xf9a0ba(0x2f5)][_0xf9a0ba(0x5db)]['call'](this);},VisuMZ[_0x4f6648(0x2f5)]['Game_Timer_initialize']=Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x233)],Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x233)]=function(){const _0x3e9f88=_0x4f6648;VisuMZ[_0x3e9f88(0x2f5)][_0x3e9f88(0x401)][_0x3e9f88(0x36c)](this),this[_0x3e9f88(0x66d)]();},Game_Timer['prototype']['initEventsMoveCore']=function(){const _0x2a52e3=_0x4f6648;this[_0x2a52e3(0x2ac)]=![],this[_0x2a52e3(0x628)]=-0x1,this[_0x2a52e3(0x56a)]=0x0;},Game_Timer['prototype'][_0x4f6648(0x6c5)]=function(_0x5e0c2f){const _0x15c65c=_0x4f6648;if(!_0x5e0c2f)return;if(!this[_0x15c65c(0x3df)])return;if(this['_paused'])return;if(this[_0x15c65c(0x4a0)]<=0x0)return;if(this[_0x15c65c(0x628)]===undefined)this[_0x15c65c(0x66d)]();this['_frames']+=this[_0x15c65c(0x628)],this[_0x15c65c(0x4a0)]<=0x0&&(_0x15c65c(0x5a8)!==_0x15c65c(0x554)?this[_0x15c65c(0x4db)]():this[_0x15c65c(0x6af)][_0x15c65c(0x1a9)]=_0x258290(_0x17e49b['$1']));},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x680)]=Game_Timer[_0x4f6648(0x1a3)]['start'],Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x5bf)]=function(_0x145820){const _0x1bd746=_0x4f6648;VisuMZ[_0x1bd746(0x2f5)][_0x1bd746(0x680)][_0x1bd746(0x36c)](this,_0x145820);if(this[_0x1bd746(0x2ac)]===undefined)this['initEventsMoveCore']();this[_0x1bd746(0x2ac)]=![];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x175)]=Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x63d)],Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x63d)]=function(){const _0x5dbe6f=_0x4f6648;VisuMZ['EventsMoveCore']['Game_Timer_stop']['call'](this);if(this['_paused']===undefined)this['initEventsMoveCore']();this[_0x5dbe6f(0x2ac)]=![];},Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x5e7)]=function(){const _0x5de7de=_0x4f6648;if(this[_0x5de7de(0x4a0)]<=0x0)return;this[_0x5de7de(0x2ac)]=!![],this[_0x5de7de(0x3df)]=!![];},Game_Timer['prototype'][_0x4f6648(0x571)]=function(){const _0x546440=_0x4f6648;if(this[_0x546440(0x4a0)]<=0x0)return;this[_0x546440(0x2ac)]=![],this[_0x546440(0x3df)]=!![];},Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x5ca)]=function(_0x13ec62){const _0x3c50cd=_0x4f6648;this[_0x3c50cd(0x4a0)]=this['_frames']||0x0,this[_0x3c50cd(0x4a0)]+=_0x13ec62,this[_0x3c50cd(0x3df)]=!![],this[_0x3c50cd(0x4a0)]=Math[_0x3c50cd(0x1a4)](0x1,this['_frames']);},Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x16b)]=function(_0x184719){const _0x4fa6ed=_0x4f6648;this['_frames']=this[_0x4fa6ed(0x4a0)]||0x0,this[_0x4fa6ed(0x4a0)]=_0x184719,this[_0x4fa6ed(0x3df)]=!![],this[_0x4fa6ed(0x4a0)]=Math[_0x4fa6ed(0x1a4)](0x1,this[_0x4fa6ed(0x4a0)]);},Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x2e5)]=function(_0x43f26b){const _0x1369d4=_0x4f6648;this[_0x1369d4(0x628)]=_0x43f26b,this[_0x1369d4(0x3df)]=!![];if(_0x43f26b>0x0){if(_0x1369d4(0x1b7)!==_0x1369d4(0x4b4))this[_0x1369d4(0x4a0)]=Math[_0x1369d4(0x1a4)](this[_0x1369d4(0x4a0)],0x1);else{const _0x4f61ba=_0x50d17a[_0x1369d4(0x6f6)](_0x48c8b4,_0x25c48b)['filter'](_0x3f499a=>_0x3f499a!==this&&_0x3f499a[_0x1369d4(0x27d)]());return _0x4f61ba[_0x1369d4(0x685)]>0x0;}}},Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x41e)]=function(_0x30eaf1){const _0x1dec9c=_0x4f6648;if(this[_0x1dec9c(0x56a)]===undefined)this['initEventsMoveCore']();this['_expireCommonEvent']=_0x30eaf1;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x573)]=Game_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x4db)],Game_Timer['prototype'][_0x4f6648(0x4db)]=function(){const _0x160432=_0x4f6648;if(this[_0x160432(0x56a)]===undefined)this[_0x160432(0x66d)]();if(this[_0x160432(0x56a)])$gameTemp[_0x160432(0x589)](this['_expireCommonEvent']);else{if(_0x160432(0x588)!=='ucxRz')VisuMZ[_0x160432(0x2f5)][_0x160432(0x573)]['call'](this);else return this[_0x160432(0x4b0)][_0x160432(0x2e0)];}},VisuMZ[_0x4f6648(0x2f5)]['Game_Message_add']=Game_Message['prototype'][_0x4f6648(0x297)],Game_Message[_0x4f6648(0x1a3)][_0x4f6648(0x297)]=function(_0x59a602){const _0x4daa79=_0x4f6648;VisuMZ[_0x4daa79(0x2f5)][_0x4daa79(0x692)][_0x4daa79(0x36c)](this,_0x59a602),this['_selfEvent']=$gameTemp[_0x4daa79(0x186)]();},Game_Message['prototype'][_0x4f6648(0x6b2)]=function(){const _0x4944ba=_0x4f6648;$gameTemp[_0x4944ba(0x3a5)](this[_0x4944ba(0x4fe)]);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4da)]=Game_Switches['prototype']['value'],Game_Switches['prototype'][_0x4f6648(0x298)]=function(_0xaf3ce5){const _0x58f04c=_0x4f6648;if(DataManager[_0x58f04c(0x5d1)](_0xaf3ce5)){if('RfLsG'!=='RfLsG')this[_0x58f04c(0x2f9)]=0x0,this[_0x58f04c(0x398)]=![];else return!!this[_0x58f04c(0x44f)](_0xaf3ce5);}else{if(DataManager[_0x58f04c(0x188)](_0xaf3ce5))return!!this['selfValue'](_0xaf3ce5);else{if(DataManager[_0x58f04c(0x6d1)](_0xaf3ce5)){if(_0x58f04c(0x664)!==_0x58f04c(0x372))return!!this[_0x58f04c(0x4a7)](_0xaf3ce5);else{if(_0x1a7a9d['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x5ed02d=_0x2b057a(_0x22e36d['$1'])[_0x58f04c(0x531)]()[_0x58f04c(0x4cf)](),_0x12e663=_0xb79174(_0x56c7a5['$2']);this[_0x58f04c(0x58e)][_0x5ed02d]=_0x12e663;}}}else{if(_0x58f04c(0x57b)==='iVflu'){if(!_0x69ee8[_0x58f04c(0x489)]())return;if(!_0x1f1dff[_0x58f04c(0x4e8)]){_0x365fd2[_0x58f04c(0x6aa)]()&&_0x2576e2(_0x58f04c(0x60d)+_0x58f04c(0x3a9));return;}_0x26badc['ConvertParams'](_0x4580c0,_0x1a61e9);const _0x386986=_0x8533f6[_0x58f04c(0x721)]||0x0,_0x151041={'text':_0x109d51[_0x58f04c(0x53c)]||'','duration':_0x3971d1[_0x58f04c(0x1a4)](_0x186719['MsgDuration']||0x3c,0xc)},_0x32a271=_0x472355['PopupExtra']||{};_0x1ed613['EventsMoveCore'][_0x58f04c(0x385)](_0x151041,_0x32a271);const _0x4ee569=_0x54b76a[_0x58f04c(0x355)][_0x58f04c(0x1e2)];if(_0x4ee569){const _0x48a05b=_0x279423[_0x58f04c(0x54c)]()[_0x58f04c(0x416)](_0x386986);_0x4ee569['createEventsMoveCoreMessagePopup'](_0x48a05b,_0x151041);}}else return VisuMZ[_0x58f04c(0x2f5)][_0x58f04c(0x4da)][_0x58f04c(0x36c)](this,_0xaf3ce5);}}}},Game_Switches[_0x4f6648(0x703)]={},Game_Switches[_0x4f6648(0x1a3)][_0x4f6648(0x44f)]=function(_0x302fab){const _0x3c1f0e=_0x4f6648;if(!Game_Switches[_0x3c1f0e(0x703)][_0x302fab]){if('miZCN'===_0x3c1f0e(0x655))_0x2d585c=_0x7e87fd['makeDeepCopy'](_0x9f9e6b),_0x41f167[_0x3c1f0e(0x2f5)]['Game_Character_setMoveRoute'][_0x3c1f0e(0x36c)](this,_0x2efaaf);else{$dataSystem['switches'][_0x302fab][_0x3c1f0e(0x6be)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5cc93b=_0x3c1f0e(0x21d)[_0x3c1f0e(0x4a2)](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x302fab]=new Function(_0x3c1f0e(0x419),_0x5cc93b);}}const _0x22384d=$gameTemp[_0x3c1f0e(0x186)]()||this;return Game_Switches[_0x3c1f0e(0x703)][_0x302fab][_0x3c1f0e(0x36c)](_0x22384d,_0x302fab);},Game_Switches[_0x4f6648(0x1a3)][_0x4f6648(0x259)]=function(_0x116796){const _0x3dfc0f=_0x4f6648,_0x2a0410=$gameTemp[_0x3dfc0f(0x186)]()||this;if(_0x2a0410['constructor']!==Game_Event){if(_0x3dfc0f(0x55d)===_0x3dfc0f(0x55d))return VisuMZ[_0x3dfc0f(0x2f5)][_0x3dfc0f(0x4da)]['call'](this,_0x116796);else _0x46d684=![];}else{const _0x178806=[_0x2a0410['_mapId'],_0x2a0410[_0x3dfc0f(0x575)],_0x3dfc0f(0x27e)[_0x3dfc0f(0x4a2)](_0x116796)];return $gameSelfSwitches['value'](_0x178806);}},Game_Switches[_0x4f6648(0x1a3)][_0x4f6648(0x4a7)]=function(_0x51d524){const _0x1901d0=_0x4f6648,_0x3d60be=$gameMap?$gameMap[_0x1901d0(0x191)]():0x0,_0x3ea7cc=[0x0,0x0,_0x1901d0(0x6ab)['format'](_0x3d60be,_0x51d524)];return $gameSelfSwitches['value'](_0x3ea7cc);},VisuMZ['EventsMoveCore']['Game_Switches_setValue']=Game_Switches[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)],Game_Switches[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)]=function(_0x283d04,_0xa3dae){const _0x39266a=_0x4f6648;if(DataManager[_0x39266a(0x188)](_0x283d04)){if(_0x39266a(0x67b)!==_0x39266a(0x67b)){const _0x2137b1=_0x51094e[_0x39266a(0x6f6)](_0x239398,_0x183741)['filter'](_0x1cccf5=>_0x1cccf5!==this);return _0x2137b1[_0x39266a(0x685)]>0x0;}else this[_0x39266a(0x229)](_0x283d04,_0xa3dae);}else DataManager[_0x39266a(0x6d1)](_0x283d04)?this[_0x39266a(0x6ae)](_0x283d04,_0xa3dae):VisuMZ['EventsMoveCore'][_0x39266a(0x267)][_0x39266a(0x36c)](this,_0x283d04,_0xa3dae);},Game_Switches['prototype']['setSelfValue']=function(_0x533ff0,_0x42478c){const _0x1ded4e=_0x4f6648,_0x2ba67a=$gameTemp[_0x1ded4e(0x186)]()||this;if(_0x2ba67a['constructor']!==Game_Event)VisuMZ[_0x1ded4e(0x2f5)][_0x1ded4e(0x267)][_0x1ded4e(0x36c)](this,_0x533ff0,_0x42478c);else{const _0x188fbb=[_0x2ba67a[_0x1ded4e(0x527)],_0x2ba67a[_0x1ded4e(0x575)],_0x1ded4e(0x27e)[_0x1ded4e(0x4a2)](_0x533ff0)];$gameSelfSwitches['setValue'](_0x188fbb,_0x42478c);}},Game_Switches['prototype']['setMapValue']=function(_0x440414,_0x509568){const _0x1a42d7=_0x4f6648,_0x48e471=$gameMap?$gameMap[_0x1a42d7(0x191)]():0x0,_0x5b6bd4=[0x0,0x0,_0x1a42d7(0x6ab)['format'](_0x48e471,_0x440414)];return $gameSelfSwitches[_0x1a42d7(0x1b5)](_0x5b6bd4,_0x509568);},VisuMZ['EventsMoveCore'][_0x4f6648(0x3e4)]=Game_Variables[_0x4f6648(0x1a3)]['value'],Game_Variables['prototype'][_0x4f6648(0x298)]=function(_0x553962){const _0x52fb15=_0x4f6648;if(DataManager['isAdvancedVariable'](_0x553962))return this[_0x52fb15(0x44f)](_0x553962);else{if(DataManager[_0x52fb15(0x559)](_0x553962)){if('IrCgg'!==_0x52fb15(0x2b5)){const _0x2baf92=_0x1dc0da[_0x52fb15(0x5b9)]();delete this[_0x52fb15(0x3ba)][_0x2baf92];}else return this['selfValue'](_0x553962);}else{if(DataManager[_0x52fb15(0x504)](_0x553962)){if(_0x52fb15(0x243)===_0x52fb15(0x243))return this[_0x52fb15(0x4a7)](_0x553962);else{if(_0x2bfa79['isSelfSwitch'](_0x2e3e69))this[_0x52fb15(0x229)](_0x504836,_0x2e52a7);else _0x151205[_0x52fb15(0x6d1)](_0xb34384)?this['setMapValue'](_0x1ed457,_0x1d3c37):_0x4153cc['EventsMoveCore'][_0x52fb15(0x267)][_0x52fb15(0x36c)](this,_0x344f88,_0x19a3e0);}}else{if('UuHiz'!==_0x52fb15(0x561))return VisuMZ[_0x52fb15(0x2f5)]['Game_Variables_value']['call'](this,_0x553962);else{if(!_0x437d5b['eventLabelsVisible']())return![];if(this[_0x52fb15(0x6ce)]?.[_0x52fb15(0x2ec)])return![];if(this[_0x52fb15(0x6ce)]&&this[_0x52fb15(0x6ce)][_0x52fb15(0x32e)]<0x0)return![];if(_0x4b292a[_0x52fb15(0x355)][_0x52fb15(0x2ad)]>0x0)return![];const _0x531528=_0x5c372d['x'],_0xe2db06=_0x4699bf['y'],_0x349a3a=this[_0x52fb15(0x6ce)]['x'],_0x145b8=this[_0x52fb15(0x6ce)]['y'];if(this[_0x52fb15(0x194)]===_0x531528&&this[_0x52fb15(0x19c)]===_0xe2db06&&this[_0x52fb15(0x686)]===_0x349a3a&&this['_visibleEventY']===_0x145b8)return this[_0x52fb15(0x56c)];this[_0x52fb15(0x194)]=_0x404cc7['x'],this[_0x52fb15(0x19c)]=_0x479acc['y'],this[_0x52fb15(0x686)]=this[_0x52fb15(0x6ce)]['x'],this[_0x52fb15(0x1e9)]=this[_0x52fb15(0x6ce)]['y'];if(_0x5e32a8[_0x52fb15(0x254)](_0x531528,_0xe2db06,_0x349a3a,_0x145b8)>this[_0x52fb15(0x6ce)][_0x52fb15(0x324)]())return this['_cacheVisibility']=![],![];return this['_cacheVisibility']=!![],!![];}}}}},Game_Variables['advancedFunc']={},Game_Variables['prototype'][_0x4f6648(0x44f)]=function(_0x578f18){const _0xe5ad24=_0x4f6648;if(!Game_Variables['advancedFunc'][_0x578f18]){$dataSystem[_0xe5ad24(0x38a)][_0x578f18][_0xe5ad24(0x6be)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1d8ee6=_0xe5ad24(0x21d)['format'](String(RegExp['$1']));Game_Variables[_0xe5ad24(0x703)][_0x578f18]=new Function('variableId',_0x1d8ee6);}const _0x188351=$gameTemp[_0xe5ad24(0x186)]()||this;return Game_Variables[_0xe5ad24(0x703)][_0x578f18][_0xe5ad24(0x36c)](_0x188351,_0x578f18);},Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x259)]=function(_0x1eff4d){const _0x498f38=_0x4f6648,_0x46ce0e=$gameTemp[_0x498f38(0x186)]()||this;if(_0x46ce0e['constructor']!==Game_Event)return VisuMZ[_0x498f38(0x2f5)]['Game_Variables_value'][_0x498f38(0x36c)](this,_0x1eff4d);else{if(_0x498f38(0x687)===_0x498f38(0x2e1))return this[_0x498f38(0x58e)]?this[_0x498f38(0x232)](_0x3c4c8a,_0x597937):_0x355402[_0x498f38(0x1a3)][_0x498f38(0x3c9)][_0x498f38(0x36c)](this,_0x533061,_0x1d554e);else{const _0x6705f9=[_0x46ce0e[_0x498f38(0x527)],_0x46ce0e[_0x498f38(0x575)],_0x498f38(0x167)[_0x498f38(0x4a2)](_0x1eff4d)];return $gameSelfSwitches[_0x498f38(0x298)](_0x6705f9);}}},Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x4a7)]=function(_0x414a6b){const _0x3f10e3=_0x4f6648,_0x37e381=$gameMap?$gameMap['mapId']():0x0,_0x21c6b3=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x3f10e3(0x4a2)](_0x37e381,_0x414a6b)];return $gameSelfSwitches[_0x3f10e3(0x298)](_0x21c6b3)||0x0;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x2a4)]=Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)],Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)]=function(_0x1efe6f,_0x5d6eb2){const _0x5b3726=_0x4f6648;if(DataManager['isSelfVariable'](_0x1efe6f))this[_0x5b3726(0x229)](_0x1efe6f,_0x5d6eb2);else{if(DataManager[_0x5b3726(0x504)](_0x1efe6f)){if(_0x5b3726(0x471)===_0x5b3726(0x211)){if(!this[_0x5b3726(0x4a9)]())return;const _0x2d1eb9=this[_0x5b3726(0x17f)]();let _0x173c05='';for(const _0x946898 of _0x2d1eb9){if([0x6c,0x198][_0x5b3726(0x328)](_0x946898['code'])){if(_0x173c05!=='')_0x173c05+='\x0a';_0x173c05+=_0x946898['parameters'][0x0];}}this['checkEventsMoveCoreStringTags'](_0x173c05);}else this['setMapValue'](_0x1efe6f,_0x5d6eb2);}else VisuMZ[_0x5b3726(0x2f5)][_0x5b3726(0x2a4)][_0x5b3726(0x36c)](this,_0x1efe6f,_0x5d6eb2);}},Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x229)]=function(_0x230c65,_0x5df0a6){const _0x24caa9=_0x4f6648,_0x54d6f7=$gameTemp[_0x24caa9(0x186)]()||this;if(_0x54d6f7[_0x24caa9(0x382)]!==Game_Event)VisuMZ[_0x24caa9(0x2f5)][_0x24caa9(0x2a4)][_0x24caa9(0x36c)](this,_0x230c65,_0x5df0a6);else{const _0x515e5f=[_0x54d6f7[_0x24caa9(0x527)],_0x54d6f7['_eventId'],_0x24caa9(0x167)[_0x24caa9(0x4a2)](_0x230c65)];$gameSelfSwitches[_0x24caa9(0x1b5)](_0x515e5f,_0x5df0a6);}},Game_Variables[_0x4f6648(0x1a3)][_0x4f6648(0x6ae)]=function(_0x48fa03,_0xda657b){const _0x56ae37=_0x4f6648,_0x437493=$gameMap?$gameMap['mapId']():0x0,_0x30ca5f=[0x0,0x0,_0x56ae37(0x281)[_0x56ae37(0x4a2)](_0x437493,_0x48fa03)];$gameSelfSwitches[_0x56ae37(0x1b5)](_0x30ca5f,_0xda657b);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4bc)]=Game_SelfSwitches['prototype'][_0x4f6648(0x298)],Game_SelfSwitches[_0x4f6648(0x1a3)][_0x4f6648(0x298)]=function(_0xa936){const _0x1fb456=_0x4f6648;if(_0xa936[0x2]['match'](/(?:SELF|MAP)/i)){if(_0x1fb456(0x29a)!==_0x1fb456(0x619))return this[_0x1fb456(0x259)](_0xa936);else{if(!this['needsAttachPictureUpdate']())return;const _0xc0fe3=this['_character'][_0x1fb456(0x5d5)]();this['_lastAttachPictureFilename']=_0xc0fe3[_0x1fb456(0x176)],this[_0x1fb456(0x2ef)]=_0xc0fe3[_0x1fb456(0x19f)],this['_lastAttachPictureScale']=_0xc0fe3[_0x1fb456(0x4f7)];if(_0xc0fe3[_0x1fb456(0x176)]!==''){const _0x5808b2=_0x3d2111[_0x1fb456(0x1ea)](_0xc0fe3['filename']);_0x5808b2[_0x1fb456(0x481)](this[_0x1fb456(0x474)][_0x1fb456(0x5c2)](this,_0x5808b2));}else this[_0x1fb456(0x1c9)][_0x1fb456(0x4fc)]=new _0x3f65ee(0x1,0x1);}}else{return VisuMZ[_0x1fb456(0x2f5)][_0x1fb456(0x4bc)][_0x1fb456(0x36c)](this,_0xa936);;}},Game_SelfSwitches[_0x4f6648(0x1a3)]['selfValue']=function(_0x4112a7){const _0x458b7b=_0x4f6648;return _0x4112a7[0x2][_0x458b7b(0x6be)](/VAR/i)?this[_0x458b7b(0x3ba)][_0x4112a7]||0x0:!!this[_0x458b7b(0x3ba)][_0x4112a7];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x228)]=Game_SelfSwitches[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)],Game_SelfSwitches[_0x4f6648(0x1a3)][_0x4f6648(0x1b5)]=function(_0x476144,_0x57a300){const _0x994ee3=_0x4f6648;if(_0x476144[0x2][_0x994ee3(0x6be)](/(?:SELF|MAP)/i)){if(_0x994ee3(0x2fa)===_0x994ee3(0x2fa))this['setSelfValue'](_0x476144,_0x57a300);else{if(this[_0x994ee3(0x599)]()&&this[_0x994ee3(0x55f)]()===_0x994ee3(0x3a4))return!![];return _0x1dc669[_0x994ee3(0x2f5)][_0x994ee3(0x4c4)][_0x994ee3(0x36c)](this);}}else VisuMZ[_0x994ee3(0x2f5)][_0x994ee3(0x228)]['call'](this,_0x476144,_0x57a300);},Game_SelfSwitches['prototype']['setSelfValue']=function(_0x11c6a3,_0x50b841){const _0x13ced4=_0x4f6648;this[_0x13ced4(0x3ba)][_0x11c6a3]=_0x11c6a3[0x2]['match'](/VAR/i)?_0x50b841:!!_0x50b841,this[_0x13ced4(0x1a1)]();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x45d)]=Scene_Map[_0x4f6648(0x1a3)][_0x4f6648(0x311)],Scene_Map['prototype']['createDisplayObjects']=function(){const _0x34040b=_0x4f6648;$gameMap['resetExitSelfSwitches'](),VisuMZ[_0x34040b(0x2f5)][_0x34040b(0x45d)]['call'](this);},Game_Map['prototype']['resetExitSelfSwitches']=function(){const _0x5901d2=_0x4f6648;this['_lastMapId']=this[_0x5901d2(0x191)](),this[_0x5901d2(0x3f3)]=undefined;const _0x2fba92=this[_0x5901d2(0x4b3)]();for(const _0x2c550a of _0x2fba92){if(_0x2c550a)$gameSelfSwitches[_0x5901d2(0x367)](_0x2c550a);}},Game_SelfSwitches['prototype'][_0x4f6648(0x367)]=function(_0x51e1d2){const _0x48de16=_0x4f6648;if(!_0x51e1d2)return;if(!_0x51e1d2[_0x48de16(0x273)]())return;const _0x4b942d=_0x51e1d2[_0x48de16(0x273)]()['note']||'';if(_0x4b942d[_0x48de16(0x6be)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){if(_0x48de16(0x723)!=='XICHS'){const _0x576822='%1,%2,'[_0x48de16(0x4a2)]($gameMap['_mapId'],_0x51e1d2[_0x48de16(0x575)]),_0x5b4a3a=Object[_0x48de16(0x6a3)](this[_0x48de16(0x3ba)])['filter'](_0x3a4e2f=>_0x3a4e2f[_0x48de16(0x718)](_0x576822));while(_0x5b4a3a[_0x48de16(0x685)]>0x0){if('GRntW'!=='GRntW'){if(this[_0x48de16(0x64c)]===_0x328ea3)this[_0x48de16(0x66d)]();if(!_0x58c0cd)return null;const _0x4f7d01='Map%1-Event%2'[_0x48de16(0x4a2)](_0x43a036[_0x48de16(0x527)],_0x26a5de[_0x48de16(0x575)]);return this['_SavedEventLocations'][_0x4f7d01];}else{const _0x2f3877=_0x5b4a3a[_0x48de16(0x5b9)]();delete this[_0x48de16(0x3ba)][_0x2f3877];}}}else delete this[_0x48de16(0x351)]['Player'];}},Game_SelfSwitches[_0x4f6648(0x1a3)][_0x4f6648(0x600)]=function(_0x770111){const _0x2b985d=_0x4f6648,_0x46e8a5='%1,'[_0x2b985d(0x4a2)]($gameMap[_0x2b985d(0x527)]),_0x3e47cf=Object['keys'](this['_data'])['filter'](_0x44fc60=>_0x44fc60['startsWith'](_0x46e8a5));while(_0x3e47cf['length']>0x0){const _0x33900c=_0x3e47cf[_0x2b985d(0x5b9)]();delete this['_data'][_0x33900c];}if(_0x770111===$gameMap[_0x2b985d(0x191)]()){if('DDiUY'===_0x2b985d(0x5a7))$gameMap[_0x2b985d(0x2a3)]();else{const _0x4c9185=_0x70624e(_0x234cfb['$1']);_0x4c9185!==_0x3e44e0[_0x284867][_0x2b985d(0x677)]&&(_0x55006c(_0x2b985d(0x66b)[_0x2b985d(0x4a2)](_0x33275c,_0x4c9185)),_0x2243b2[_0x2b985d(0x4c0)]());}}},VisuMZ[_0x4f6648(0x2f5)]['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype'][_0x4f6648(0x603)],Game_Enemy[_0x4f6648(0x1a3)][_0x4f6648(0x603)]=function(_0x22ed3b){const _0x34f8a1=_0x4f6648;$gameTemp['registerSelfTarget'](this);const _0x24692c=VisuMZ[_0x34f8a1(0x2f5)]['Game_Enemy_meetsSwitchCondition'][_0x34f8a1(0x36c)](this,_0x22ed3b);return $gameTemp[_0x34f8a1(0x4d3)](),_0x24692c;},VisuMZ[_0x4f6648(0x2f5)]['Game_Party_hasEncounterHalf']=Game_Party[_0x4f6648(0x1a3)][_0x4f6648(0x65a)],Game_Party[_0x4f6648(0x1a3)][_0x4f6648(0x65a)]=function(){const _0x1403ba=_0x4f6648;if(this['isPlayerWithinEncounterHalfEvents']()){if(_0x1403ba(0x2fc)!==_0x1403ba(0x2fc)){if(!_0x48ed38['advancedFunc'][_0x26651a]){_0x59183a[_0x1403ba(0x59c)][_0x2530f8][_0x1403ba(0x6be)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x59783e=_0x1403ba(0x21d)['format'](_0x3fe4cb(_0x4a1d0d['$1']));_0x5050d9['advancedFunc'][_0xbac01]=new _0x15f518('switchId',_0x59783e);}const _0x34e799=_0x1f3e9c[_0x1403ba(0x186)]()||this;return _0x338df7[_0x1403ba(0x703)][_0x4f4a9a]['call'](_0x34e799,_0x1a2fe5);}else return!![];}return VisuMZ[_0x1403ba(0x2f5)]['Game_Party_hasEncounterHalf'][_0x1403ba(0x36c)](this);},Game_Party[_0x4f6648(0x1a3)][_0x4f6648(0x689)]=function(){const _0x4816ba=_0x4f6648;if(this[_0x4816ba(0x425)])return![];return $isTileEncounterHalf($gamePlayer['x'],$gamePlayer['y']);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x346)]=Game_Party[_0x4f6648(0x1a3)][_0x4f6648(0x4bb)],Game_Party['prototype'][_0x4f6648(0x4bb)]=function(){const _0x30675e=_0x4f6648;if(this['isPlayerWithinEncounterNoneEvents']())return!![];return VisuMZ['EventsMoveCore'][_0x30675e(0x346)]['call'](this);},Game_Party[_0x4f6648(0x1a3)][_0x4f6648(0x62d)]=function(){const _0x928ac5=_0x4f6648;if(this[_0x928ac5(0x425)])return![];return $isTileEncounterNone($gamePlayer['x'],$gamePlayer['y']);};var $isTileEncounterHalf=function(_0x348483,_0x361574){const _0x573eec=_0x4f6648;if(!$gameMap)return![];_0x348483=Math[_0x573eec(0x6fb)](_0x348483||0x0),_0x361574=Math[_0x573eec(0x6fb)](_0x361574||0x0);const _0x56d063=$gameMap['events']();for(const _0x5ded44 of _0x56d063){if(!_0x5ded44)continue;if(_0x5ded44[_0x573eec(0x2ec)])continue;const _0x3636f2=_0x5ded44[_0x573eec(0x66e)](!![]),_0x1a43db=_0x5ded44[_0x573eec(0x231)](!![]);if($gameMap[_0x573eec(0x2e4)](_0x348483,_0x361574,_0x5ded44,_0x3636f2,_0x1a43db))return!![];}return![];},$isTileEncounterNone=function(_0x56dc1e,_0x5b8296){const _0x33a1ef=_0x4f6648;if(!$gameMap)return![];_0x56dc1e=Math[_0x33a1ef(0x6fb)](_0x56dc1e||0x0),_0x5b8296=Math[_0x33a1ef(0x6fb)](_0x5b8296||0x0);const _0x559fca=$gameMap[_0x33a1ef(0x4b3)]();for(const _0x1cd2d0 of _0x559fca){if(!_0x1cd2d0)continue;if(_0x1cd2d0[_0x33a1ef(0x2ec)])continue;const _0x25b44a=_0x1cd2d0['encounterProximityType'](![]),_0x501d58=_0x1cd2d0[_0x33a1ef(0x231)](![]);if($gameMap[_0x33a1ef(0x2e4)](_0x56dc1e,_0x5b8296,_0x1cd2d0,_0x25b44a,_0x501d58))return!![];}return![];};VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop[_0x4f6648(0x1a3)]['meetsConditions'],Game_Troop['prototype'][_0x4f6648(0x669)]=function(_0x3f06a9){const _0x12d1cf=_0x4f6648;$gameTemp[_0x12d1cf(0x3a5)](this);const _0xbc5752=VisuMZ[_0x12d1cf(0x2f5)]['Game_Troop_meetsConditions'][_0x12d1cf(0x36c)](this,_0x3f06a9);return $gameTemp['clearSelfTarget'](),_0xbc5752;},VisuMZ[_0x4f6648(0x2f5)]['Game_Map_setup']=Game_Map[_0x4f6648(0x1a3)]['setup'],Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x287)]=function(_0x2c3ba5){const _0x494fbb=_0x4f6648;this['removeTemporaryMapSpawnedEvents'](_0x2c3ba5),this[_0x494fbb(0x422)](),VisuMZ[_0x494fbb(0x2f5)][_0x494fbb(0x63a)]['call'](this,_0x2c3ba5),this[_0x494fbb(0x422)](),this['setupDiagonalSupport'](),this['setupRegionRestrictions'](),this[_0x494fbb(0x6ba)](),this[_0x494fbb(0x719)](),this['setupPlayerVisibilityOverrides'](),this[_0x494fbb(0x4f2)](),this['processEraseEncounterEvents'](),this[_0x494fbb(0x488)](),this[_0x494fbb(0x422)]();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x5f7)]=Game_Map['prototype'][_0x4f6648(0x444)],Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x444)]=function(){const _0x166320=_0x4f6648;VisuMZ[_0x166320(0x2f5)][_0x166320(0x5f7)][_0x166320(0x36c)](this),this[_0x166320(0x34c)]();},Game_Map[_0x4f6648(0x212)]=0xc8,Game_Map[_0x4f6648(0x1a3)]['determineEventOverload']=function(){const _0x16d333=_0x4f6648,_0x548861=Game_Map[_0x16d333(0x212)];this[_0x16d333(0x651)]=this[_0x16d333(0x4b3)]()[_0x16d333(0x685)]>_0x548861;if(this[_0x16d333(0x651)]&&$gameTemp[_0x16d333(0x6aa)]()){}},Game_Map[_0x4f6648(0x1a3)]['isEventOverloaded']=function(){const _0x549edf=_0x4f6648;return this[_0x549edf(0x651)];},Game_Map['prototype'][_0x4f6648(0x422)]=function(){const _0xf9df0f=_0x4f6648;this[_0xf9df0f(0x3f3)]=undefined;},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x2ed)]=function(){const _0xb600c=_0x4f6648;this[_0xb600c(0x189)]=VisuMZ[_0xb600c(0x2f5)][_0xb600c(0x3fc)]['Movement']['EnableDir8'];const _0x3a2e70=$dataMap[_0xb600c(0x4a3)]||'';if(_0x3a2e70[_0xb600c(0x6be)](/<DIAGONAL MOVEMENT: ON>/i))this[_0xb600c(0x189)]=!![];else{if(_0x3a2e70['match'](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0xb600c(0x366)!=='ySIeR'){this['_moveSynch'][_0xb600c(0x53d)]=this[_0xb600c(0x4b0)][_0xb600c(0x53d)]||0x0,this[_0xb600c(0x4b0)][_0xb600c(0x53d)]--;if(this[_0xb600c(0x4b0)][_0xb600c(0x53d)]>0x0)return;this['_moveSynch'][_0xb600c(0x53d)]=this[_0xb600c(0x4b0)][_0xb600c(0x67c)],this[_0xb600c(0x36e)]();}else this[_0xb600c(0x189)]=![];}}},Game_Map['MOBILE_DIAGONAL_PATHFINDING']=VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3fc)]['Movement'][_0x4f6648(0x524)]??![],Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x56b)]=function(){const _0xb53c11=_0x4f6648;if(Utils['isMobileDevice']()){if(!Game_Map[_0xb53c11(0x5be)])return![];}const _0x5ef2e5=$gameSystem['getPlayerDiagonalSetting']();if(_0x5ef2e5===_0xb53c11(0x3cb))return!![];if(_0x5ef2e5===_0xb53c11(0x6b5))return![];if(this[_0xb53c11(0x189)]===undefined)this[_0xb53c11(0x2ed)]();return this['_diagonalSupport'];},Game_Map['prototype'][_0x4f6648(0x579)]=function(_0x5c43e6,_0x2b916a){const _0x18ca48=_0x4f6648;if([0x1,0x4,0x7][_0x18ca48(0x328)](_0x2b916a))_0x5c43e6-=0x1;if([0x3,0x6,0x9][_0x18ca48(0x328)](_0x2b916a))_0x5c43e6+=0x1;return this[_0x18ca48(0x6f0)](_0x5c43e6);},Game_Map['prototype'][_0x4f6648(0x6a6)]=function(_0x26b0c1,_0x35ffb9){const _0x164d06=_0x4f6648;if([0x1,0x2,0x3]['includes'](_0x35ffb9))_0x26b0c1+=0x1;if([0x7,0x8,0x9][_0x164d06(0x328)](_0x35ffb9))_0x26b0c1-=0x1;return this['roundY'](_0x26b0c1);},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x254)]=function(_0x102fca,_0x342516,_0x4e6d14,_0x3a8be8){const _0x362cdd=_0x4f6648;return Math[_0x362cdd(0x1a4)](Math[_0x362cdd(0x5e0)](this[_0x362cdd(0x42c)](_0x102fca,_0x4e6d14)),Math['abs'](this[_0x362cdd(0x322)](_0x342516,_0x3a8be8)));},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x6c4)]=function(){const _0x5ea504=_0x4f6648,_0x4dd16d=VisuMZ[_0x5ea504(0x2f5)][_0x5ea504(0x3fc)][_0x5ea504(0x6b8)],_0x510c0d={},_0x311b6a=['Allow',_0x5ea504(0x3e7),'Dock'],_0x5c3751=[_0x5ea504(0x47b),_0x5ea504(0x43f),_0x5ea504(0x3f7),'Event',_0x5ea504(0x5b7),_0x5ea504(0x198),_0x5ea504(0x436),_0x5ea504(0x659)];for(const _0x2067a2 of _0x311b6a){for(const _0x55ed0d of _0x5c3751){const _0x44aa05='%1%2'[_0x5ea504(0x4a2)](_0x55ed0d,_0x2067a2);_0x4dd16d[_0x44aa05]&&(_0x510c0d[_0x44aa05]=_0x4dd16d[_0x44aa05][_0x5ea504(0x427)](0x0));}}const _0xb0390c=$dataMap[_0x5ea504(0x4a3)]||'',_0x60d778=_0xb0390c[_0x5ea504(0x6be)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x60d778){if(_0x5ea504(0x5b5)===_0x5ea504(0x5b5))for(const _0x5cca6a of _0x60d778){_0x5cca6a['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x4caf3a=String(RegExp['$1'])[_0x5ea504(0x531)]()['trim'](),_0x57065b=String(RegExp['$2'])[_0x5ea504(0x531)]()['trim']();const _0x32dd6d=JSON[_0x5ea504(0x406)]('['+RegExp['$3'][_0x5ea504(0x6be)](/\d+/g)+']');_0x4caf3a=_0x4caf3a['charAt'](0x0)[_0x5ea504(0x42b)]()+_0x4caf3a[_0x5ea504(0x427)](0x1),_0x57065b=_0x57065b['charAt'](0x0)[_0x5ea504(0x42b)]()+_0x57065b[_0x5ea504(0x427)](0x1);const _0x876d4f=_0x5ea504(0x2b8)[_0x5ea504(0x4a2)](_0x4caf3a,_0x57065b);if(_0x510c0d[_0x876d4f])_0x510c0d[_0x876d4f]=_0x510c0d[_0x876d4f]['concat'](_0x32dd6d);}else return _0x39aa90>0x0?0x8:0x2;}this[_0x5ea504(0x202)]=_0x510c0d;},Game_Map[_0x4f6648(0x1a3)]['isRegionAllowPass']=function(_0x5b28c8,_0x5ceae1,_0x6dcb6f,_0x5f26ff){const _0x37c4a6=_0x4f6648,_0x5b96a9=this[_0x37c4a6(0x579)](_0x5b28c8,_0x6dcb6f),_0x2760dc=this[_0x37c4a6(0x6a6)](_0x5ceae1,_0x6dcb6f),_0x2ae95b=this['regionId'](_0x5b96a9,_0x2760dc),_0x4e5b2b=this['_regionRules'];if(_0x4e5b2b[_0x37c4a6(0x40e)][_0x37c4a6(0x328)](_0x2ae95b)){if('AeVBh'===_0x37c4a6(0x6d2))return!![];else _0x24ae19['registerSelfTarget'](_0x2ca4d5[_0x37c4a6(0x725)]),_0x171632['EventsMoveCore'][_0x37c4a6(0x1f2)]['call'](this),_0x372dc7[_0x37c4a6(0x4d3)](),_0x5164f3[_0x37c4a6(0x725)]=_0x44d3dd;}else{if(_0x5f26ff===_0x37c4a6(0x1a2)){if('xRlAb'===_0x37c4a6(0x30b))return _0x4e5b2b['PlayerAllow'][_0x37c4a6(0x328)](_0x2ae95b)||_0x4e5b2b[_0x37c4a6(0x345)][_0x37c4a6(0x328)](_0x2ae95b);else{if(this[_0x37c4a6(0x1c5)](_0x37d5b8,_0x177ac4))return![];}}else{if(_0x5f26ff===_0x37c4a6(0x273))return _0x4e5b2b[_0x37c4a6(0x387)]['includes'](_0x2ae95b)||_0x4e5b2b['WalkAllow'][_0x37c4a6(0x328)](_0x2ae95b);else{if(_0x4e5b2b['VehicleAllow'][_0x37c4a6(0x328)](_0x2ae95b)){if(_0x37c4a6(0x17d)!==_0x37c4a6(0x17d)){_0x128d07['prototype'][_0x37c4a6(0x1ba)][_0x37c4a6(0x36c)](this);if([_0x37c4a6(0x657),_0x37c4a6(0x2f1)][_0x37c4a6(0x328)](this[_0x37c4a6(0x27a)]()))return;_0x3d6d07[_0x37c4a6(0x49b)]([0x2]);}else return!![];}else{const _0x761d29=_0x37c4a6(0x4a5)[_0x37c4a6(0x4a2)](_0x5f26ff[_0x37c4a6(0x1fc)](0x0)['toUpperCase']()+_0x5f26ff[_0x37c4a6(0x427)](0x1));if(_0x4e5b2b[_0x761d29])return _0x4e5b2b[_0x761d29][_0x37c4a6(0x328)](_0x2ae95b);}}}}return![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x4ed)]=function(_0x36d5d7,_0x426297,_0x38fd4a,_0x52acc5){const _0x3f8ba1=_0x4f6648,_0x123d3c=this[_0x3f8ba1(0x579)](_0x36d5d7,_0x38fd4a),_0x317149=this[_0x3f8ba1(0x6a6)](_0x426297,_0x38fd4a),_0x21466a=this['regionId'](_0x123d3c,_0x317149),_0xccf08c=this[_0x3f8ba1(0x202)];if(_0xccf08c[_0x3f8ba1(0x546)]['includes'](_0x21466a)){if(_0x3f8ba1(0x6ec)==='DdaUr'){if(this['_character'][_0x3f8ba1(0x2b3)]()!=='')return![];}else return!![];}else{if(_0x52acc5===_0x3f8ba1(0x1a2))return _0xccf08c[_0x3f8ba1(0x1cd)][_0x3f8ba1(0x328)](_0x21466a)||_0xccf08c[_0x3f8ba1(0x22d)][_0x3f8ba1(0x328)](_0x21466a);else{if(_0x52acc5===_0x3f8ba1(0x273))return _0xccf08c[_0x3f8ba1(0x638)]['includes'](_0x21466a)||_0xccf08c[_0x3f8ba1(0x22d)]['includes'](_0x21466a);else{if(_0xccf08c[_0x3f8ba1(0x326)][_0x3f8ba1(0x328)](_0x21466a))return!![];else{const _0x5ed675=_0x3f8ba1(0x3fb)[_0x3f8ba1(0x4a2)](_0x52acc5['charAt'](0x0)['toUpperCase']()+_0x52acc5[_0x3f8ba1(0x427)](0x1));if(_0xccf08c[_0x5ed675])return _0xccf08c[_0x5ed675]['includes'](_0x21466a);}}}}return![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x702)]=function(_0x434b85,_0x5ef285,_0x1a05a4,_0x5b4689){const _0x3db362=_0x4f6648;_0x1a05a4=_0x5b4689==='airship'?0x5:_0x1a05a4;const _0x2548dc=this[_0x3db362(0x579)](_0x434b85,_0x1a05a4),_0x4b4779=this[_0x3db362(0x6a6)](_0x5ef285,_0x1a05a4),_0x3aee2b=this[_0x3db362(0x4de)](_0x2548dc,_0x4b4779),_0x4bb16b=this[_0x3db362(0x202)];if(_0x4bb16b[_0x3db362(0x426)][_0x3db362(0x328)](_0x3aee2b))return!![];else{if(_0x3db362(0x1b8)!==_0x3db362(0x1b8))_0x420fc5['EventsMoveCore'][_0x3db362(0x4e1)][_0x3db362(0x36c)](this,_0x365a8f);else{const _0x4e0edc=_0x3db362(0x353)[_0x3db362(0x4a2)](_0x5b4689[_0x3db362(0x1fc)](0x0)['toUpperCase']()+_0x5b4689[_0x3db362(0x427)](0x1));if(_0x4bb16b[_0x4e0edc])return _0x4bb16b[_0x4e0edc]['includes'](_0x3aee2b);}}return![];},VisuMZ['EventsMoveCore']['Game_Map_refresh']=Game_Map[_0x4f6648(0x1a3)]['refresh'],Game_Map['prototype'][_0x4f6648(0x491)]=function(){const _0x1188a0=_0x4f6648;VisuMZ[_0x1188a0(0x2f5)][_0x1188a0(0x562)][_0x1188a0(0x36c)](this),this[_0x1188a0(0x56f)]();},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x56f)]=function(){const _0x273223=_0x4f6648;this[_0x273223(0x260)]=![];if(this['events']()[_0x273223(0x499)](_0x3dc5f2=>_0x3dc5f2[_0x273223(0x5aa)]())){this[_0x273223(0x260)]=!![];return;}if(this[_0x273223(0x4b3)]()[_0x273223(0x499)](_0x1fac12=>_0x1fac12[_0x273223(0x3ef)]())){this[_0x273223(0x260)]=!![];return;}if(this[_0x273223(0x6d8)][_0x273223(0x499)](_0x34b0c7=>_0x34b0c7[_0x273223(0x5aa)]())){this[_0x273223(0x260)]=!![];return;}if(this[_0x273223(0x6d8)][_0x273223(0x499)](_0x318fa5=>_0x318fa5[_0x273223(0x3ef)]())){if(_0x273223(0x616)===_0x273223(0x616)){this['_needsPeriodicRefresh']=!![];return;}else{const _0x2418dd=this['_character'][_0x273223(0x4dc)]();let _0x2f39da=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x273223(0x4f0)][_0x273223(0x53a)]&&(_0x2f39da=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x2f39da[_0x2418dd]-0x2)/0x2;}}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x30a)]=Game_Map[_0x4f6648(0x1a3)]['update'],Game_Map['prototype'][_0x4f6648(0x6c5)]=function(_0x2d390b){const _0x5ad2f6=_0x4f6648;this[_0x5ad2f6(0x543)](),VisuMZ[_0x5ad2f6(0x2f5)][_0x5ad2f6(0x30a)][_0x5ad2f6(0x36c)](this,_0x2d390b);},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x543)]=function(){const _0x1b6496=_0x4f6648;if(!this[_0x1b6496(0x260)])return;this['_periodicRefreshTimer']=this[_0x1b6496(0x6c1)]||0x3c,this[_0x1b6496(0x6c1)]--,this[_0x1b6496(0x6c1)]<=0x0&&(this[_0x1b6496(0x2a3)](),this[_0x1b6496(0x6c1)]=0x3c);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x625)]=Game_Map['prototype'][_0x4f6648(0x5ef)],Game_Map[_0x4f6648(0x1a3)]['isDashDisabled']=function(){const _0x93f353=_0x4f6648;if(!$gameSystem[_0x93f353(0x195)]())return!![];return VisuMZ[_0x93f353(0x2f5)][_0x93f353(0x625)][_0x93f353(0x36c)](this);},Game_Map['prototype']['setupSaveEventLocations']=function(){const _0x380704=_0x4f6648;this[_0x380704(0x688)]=![];const _0x230069=$dataMap[_0x380704(0x4a3)]||'';_0x230069['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x380704(0x688)]=!![]);},Game_Map[_0x4f6648(0x1a3)]['isSaveEventLocations']=function(){const _0x2f4f1a=_0x4f6648;if(this[_0x2f4f1a(0x688)]===undefined)this[_0x2f4f1a(0x6ba)]();return this[_0x2f4f1a(0x688)];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x332)]=function(_0x12cb95){const _0x2799c0=_0x4f6648;_0x12cb95!==this[_0x2799c0(0x191)]()&&$gamePlayer&&$gameSystem[_0x2799c0(0x332)](this[_0x2799c0(0x191)]());},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x719)]=function(){const _0x1f3cd5=_0x4f6648;this[_0x1f3cd5(0x447)]=$gameSystem[_0x1f3cd5(0x2ee)](this[_0x1f3cd5(0x191)]()),this[_0x1f3cd5(0x248)]=!![];},VisuMZ['EventsMoveCore'][_0x4f6648(0x1f9)]=Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x4b3)],Game_Map[_0x4f6648(0x1a3)]['events']=function(){const _0x50934d=_0x4f6648;if(this[_0x50934d(0x3f3)])return this[_0x50934d(0x3f3)];const _0x2d9314=VisuMZ[_0x50934d(0x2f5)]['Game_Map_events'][_0x50934d(0x36c)](this),_0x52e7ac=_0x2d9314[_0x50934d(0x2b2)](this['_spawnedEvents']||[]);return this[_0x50934d(0x3f3)]=_0x52e7ac[_0x50934d(0x604)](_0x444ec9=>!!_0x444ec9),this[_0x50934d(0x3f3)];},VisuMZ[_0x4f6648(0x2f5)]['Game_Map_event']=Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x273)],Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x273)]=function(_0x5ba6bc){const _0x2f64a5=_0x4f6648;if(_0x5ba6bc>=0x3e8)return _0x2f64a5(0x64e)==='ABEFc'?(_0x5ba6bc-=0x3e8,this[_0x2f64a5(0x447)][_0x5ba6bc]):this['isInVehicle']()&&this[_0x2f64a5(0x420)]()?this['vehicle']()[_0x2f64a5(0x429)](_0x2629b3,_0x1bf239,_0x25f1ef):!![];else{if('bKrVx'!==_0x2f64a5(0x1b0))return VisuMZ['EventsMoveCore'][_0x2f64a5(0x674)]['call'](this,_0x5ba6bc);else _0x2d447[_0x2f64a5(0x589)](_0x3a2f63[_0x47b9e7]);}},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x3bf)]=function(_0x2780f0){const _0x306def=_0x4f6648,_0x3e8012=this[_0x306def(0x273)](_0x2780f0);if(_0x3e8012)_0x3e8012['erase']();},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x1ce)]=function(){const _0x2c4517=_0x4f6648,_0x14bbd6={'template':_0x2c4517(0x390),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x2c4517(0x447)][_0x2c4517(0x685)]+0x3e8};this[_0x2c4517(0x32d)](_0x14bbd6);},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x1c5)]=function(_0x539a55,_0xf73ba5){const _0x13d37a=_0x4f6648;if(this[_0x13d37a(0x315)](_0x539a55,_0xf73ba5)['length']>0x0)return!![];if($gamePlayer['x']===_0x539a55&&$gamePlayer['y']===_0xf73ba5)return!![];if(this[_0x13d37a(0x29b)]()[_0x13d37a(0x495)](_0x539a55,_0xf73ba5))return!![];if(this[_0x13d37a(0x4f9)]()[_0x13d37a(0x495)](_0x539a55,_0xf73ba5))return!![];return![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x510)]=function(_0x5b3a3f,_0x288cfb,_0x481519){const _0x1ea68a=_0x4f6648;$gameTemp[_0x1ea68a(0x3e9)]=_0x5b3a3f;const _0x4327b3=new Game_Event(_0x5b3a3f['mapId'],_0x5b3a3f[_0x1ea68a(0x679)]);$gameTemp[_0x1ea68a(0x3e9)]=undefined,_0x4327b3['refresh']();let _0xdbd29d=_0x288cfb-_0x4327b3[_0x1ea68a(0x58e)][_0x1ea68a(0x64d)],_0x17720b=_0x288cfb+_0x4327b3['_addedHitbox']['right'],_0x1e7750=_0x481519-_0x4327b3[_0x1ea68a(0x58e)]['up'],_0x52598e=_0x481519+_0x4327b3[_0x1ea68a(0x58e)]['down'];for(let _0x93117f=_0xdbd29d;_0x93117f<=_0x17720b;_0x93117f++){for(let _0x2b3337=_0x1e7750;_0x2b3337<=_0x52598e;_0x2b3337++){if(this['checkExistingEntitiesAt'](_0x93117f,_0x2b3337))return![];}}return!![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x32d)]=function(_0xd1fd83){const _0x152f4c=_0x4f6648;$gameTemp['_spawnData']=_0xd1fd83;const _0x48faf0=new Game_Event(_0xd1fd83[_0x152f4c(0x191)],_0xd1fd83[_0x152f4c(0x679)]);$gameTemp['_spawnData']=undefined,this['_spawnedEvents']['push'](_0x48faf0),_0x48faf0['setupSpawn'](_0xd1fd83),this[_0x152f4c(0x422)]();},Game_Map[_0x4f6648(0x1a3)]['prepareSpawnedEventAtXY']=function(_0x1df007,_0x2f60c5,_0x49991f){const _0x4f3ef2=_0x4f6648,_0x4f0225=_0x1df007['template'][_0x4f3ef2(0x42b)]()[_0x4f3ef2(0x4cf)]();if(_0x4f0225!==_0x4f3ef2(0x32b)){if(_0x4f3ef2(0x21b)!==_0x4f3ef2(0x21b))this[_0x4f3ef2(0x1a6)]=!![],_0x3d4155[_0x4f3ef2(0x2f5)][_0x4f3ef2(0x2b1)][_0x4f3ef2(0x36c)](this),this[_0x4f3ef2(0x33f)](),this['autosaveEventLocation'](),this['_activationProximityAutoTriggerBypass']=![];else{const _0xb5650b=VisuMZ[_0x4f3ef2(0x437)][_0x4f0225];if(_0xb5650b){if(_0x4f3ef2(0x4c5)===_0x4f3ef2(0x4c5))_0x1df007[_0x4f3ef2(0x191)]=_0xb5650b[_0x4f3ef2(0x649)],_0x1df007[_0x4f3ef2(0x679)]=_0xb5650b['EventID'];else return _0x45c665['EventsMoveCore'][_0x4f3ef2(0x518)][_0x4f3ef2(0x36c)](this,_0x1e4342,_0x3763b6,_0x218c4f);}}}const _0x3ff861=_0x1df007['x'],_0x55c899=_0x1df007['y'];if(!this[_0x4f3ef2(0x5fa)](_0x3ff861,_0x55c899))return![];if(_0x2f60c5){if(this['checkExistingEntitiesAt'](_0x3ff861,_0x55c899))return![];if(!this['isSpawnHitboxCollisionOk'](_0x1df007,_0x3ff861,_0x55c899))return![];}if(_0x49991f){if(!this[_0x4f3ef2(0x364)](_0x3ff861,_0x55c899))return![];}return this[_0x4f3ef2(0x32d)](_0x1df007),!![];},Game_Map['prototype'][_0x4f6648(0x4d0)]=function(_0x1eb5c5,_0x21965e,_0x4ec093,_0x5f2ba7){const _0x553749=_0x4f6648,_0x50a49b=_0x1eb5c5[_0x553749(0x44e)][_0x553749(0x42b)]()['trim']();if(_0x50a49b!==_0x553749(0x32b)){if(_0x553749(0x430)==='KOrGR'){const _0x4e77e0=VisuMZ[_0x553749(0x437)][_0x50a49b];_0x4e77e0&&('tYStZ'==='pIIcF'?this['_advancedSwitchVariable']=!![]:(_0x1eb5c5[_0x553749(0x191)]=_0x4e77e0[_0x553749(0x649)],_0x1eb5c5[_0x553749(0x679)]=_0x4e77e0['EventID']));}else{const _0x96bf51=this[_0x553749(0x1eb)],_0x35f8a2=this[_0x553749(0x4a8)];return this[_0x553749(0x456)](_0x96bf51,_0x35f8a2);}}const _0xe92a5c=[],_0x1667cd=this['width'](),_0x1d258b=this[_0x553749(0x272)]();for(let _0x1aa35f=0x0;_0x1aa35f<_0x1667cd;_0x1aa35f++){if(_0x553749(0x245)!==_0x553749(0x245)){_0x2f7714[_0x553749(0x37a)](_0x1fe2ed,_0x1bf817);const _0x38b2ba=_0x515bc9['getLastPluginCommandInterpreter'](),_0x20b60b={'mapId':_0x35eced['MapId'],'eventId':_0x268755[_0x553749(0x60f)]||_0x38b2ba['eventId'](),'pageId':_0x3ccf2f[_0x553749(0x6cb)]};if(_0x20b60b[_0x553749(0x191)]<=0x0)_0x20b60b[_0x553749(0x191)]=_0x3b82df?_0x2ae1d3[_0x553749(0x191)]():0x1;_0x265a6b[_0x553749(0x684)]()[_0x553749(0x182)](_0x20b60b);}else for(let _0x201e68=0x0;_0x201e68<_0x1d258b;_0x201e68++){if(_0x553749(0x1d4)===_0x553749(0x585)){if(this['_eventCache'])return this[_0x553749(0x3f3)];const _0x1e4b8c=_0x183b3f[_0x553749(0x2f5)][_0x553749(0x1f9)][_0x553749(0x36c)](this),_0x31c38c=_0x1e4b8c[_0x553749(0x2b2)](this[_0x553749(0x447)]||[]);return this['_eventCache']=_0x31c38c[_0x553749(0x604)](_0x53f27a=>!!_0x53f27a),this[_0x553749(0x3f3)];}else{if(!_0x21965e[_0x553749(0x328)](this[_0x553749(0x4de)](_0x1aa35f,_0x201e68)))continue;if(!this[_0x553749(0x5fa)](_0x1aa35f,_0x201e68))continue;if(_0x4ec093){if(this[_0x553749(0x1c5)](_0x1aa35f,_0x201e68))continue;if(!this[_0x553749(0x510)](_0x1eb5c5,_0x1aa35f,_0x201e68))continue;}if(_0x5f2ba7){if(!this[_0x553749(0x364)](_0x1aa35f,_0x201e68))continue;}_0xe92a5c[_0x553749(0x58b)]([_0x1aa35f,_0x201e68]);}}}if(_0xe92a5c[_0x553749(0x685)]>0x0){const _0x4bc2b4=_0xe92a5c[Math[_0x553749(0x62b)](_0xe92a5c[_0x553749(0x685)])];return _0x1eb5c5['x']=_0x4bc2b4[0x0],_0x1eb5c5['y']=_0x4bc2b4[0x1],this[_0x553749(0x32d)](_0x1eb5c5),!![];}return![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x517)]=function(_0x348fa0,_0x367400,_0x502a31,_0x55fd51){const _0xf5b395=_0x4f6648,_0x219985=_0x348fa0[_0xf5b395(0x44e)][_0xf5b395(0x42b)]()['trim']();if(_0x219985!==_0xf5b395(0x32b)){const _0x17b6fa=VisuMZ[_0xf5b395(0x437)][_0x219985];_0x17b6fa&&(_0x348fa0[_0xf5b395(0x191)]=_0x17b6fa[_0xf5b395(0x649)],_0x348fa0['eventId']=_0x17b6fa[_0xf5b395(0x31b)]);}const _0x187676=[],_0x3f0b8a=this[_0xf5b395(0x445)](),_0x5503b3=this[_0xf5b395(0x272)]();for(let _0x52a92a=0x0;_0x52a92a<_0x3f0b8a;_0x52a92a++){for(let _0x12b519=0x0;_0x12b519<_0x5503b3;_0x12b519++){if(!_0x367400[_0xf5b395(0x328)](this['terrainTag'](_0x52a92a,_0x12b519)))continue;if(!this[_0xf5b395(0x5fa)](_0x52a92a,_0x12b519))continue;if(_0x502a31){if(this[_0xf5b395(0x1c5)](_0x52a92a,_0x12b519))continue;if(!this[_0xf5b395(0x510)](_0x348fa0,_0x52a92a,_0x12b519))continue;}if(_0x55fd51){if(_0xf5b395(0x199)!=='OvIBV')_0x235a16[_0xf5b395(0x589)](_0x2fa167[_0x446b08]);else{if(!this['isPassableByAnyDirection'](_0x52a92a,_0x12b519))continue;}}_0x187676[_0xf5b395(0x58b)]([_0x52a92a,_0x12b519]);}}if(_0x187676[_0xf5b395(0x685)]>0x0){if(_0xf5b395(0x4be)==='HZeGI')return this['_lastPluginCommandInterpreter'];else{const _0x529910=_0x187676[Math[_0xf5b395(0x62b)](_0x187676[_0xf5b395(0x685)])];return _0x348fa0['x']=_0x529910[0x0],_0x348fa0['y']=_0x529910[0x1],this['createSpawnedEventWithData'](_0x348fa0),!![];}}return![];},Game_Map['prototype'][_0x4f6648(0x364)]=function(_0x27ab5d,_0x3df9c3){const _0x587948=_0x4f6648;if(this['isPassable'](_0x27ab5d,_0x3df9c3,0x2))return!![];if(this['isPassable'](_0x27ab5d,_0x3df9c3,0x4))return!![];if(this[_0x587948(0x3c2)](_0x27ab5d,_0x3df9c3,0x6))return!![];if(this[_0x587948(0x3c2)](_0x27ab5d,_0x3df9c3,0x8))return!![];return![];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x443)]=function(_0x12a373){const _0x4655e3=_0x4f6648;if(_0x12a373<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x30e6e5=this[_0x4655e3(0x273)](_0x12a373);_0x30e6e5[_0x4655e3(0x3b9)](-0x1,-0x1),_0x30e6e5[_0x4655e3(0x1d0)](),this[_0x4655e3(0x447)][_0x12a373-0x3e8]=null,this[_0x4655e3(0x422)]();},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x551)]=function(){for(const _0x326485 of this['_spawnedEvents']){if(_0x326485)return _0x326485;}return null;},Game_Map[_0x4f6648(0x1a3)]['firstSpawnedEventID']=function(){const _0x4a6775=_0x4f6648,_0xb2854b=this['firstSpawnedEvent']();return _0xb2854b?_0xb2854b[_0x4a6775(0x575)]:0x0;},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x341)]=function(){const _0x5c12d7=_0x4f6648,_0x4ea6c0=this[_0x5c12d7(0x447)][_0x5c12d7(0x427)](0x0)[_0x5c12d7(0x28f)]();for(const _0x6be24c of _0x4ea6c0){if(_0x6be24c)return _0x6be24c;}return null;},Game_Map['prototype']['lastSpawnedEventID']=function(){const _0x47e8f5=_0x4f6648,_0x44e143=this[_0x47e8f5(0x341)]();return _0x44e143?_0x44e143[_0x47e8f5(0x575)]:0x0;},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x631)]=function(_0x24ffe5,_0x2120be){const _0x2a06f9=_0x4f6648,_0x18fe9a=this[_0x2a06f9(0x315)](_0x24ffe5,_0x2120be);for(const _0x45be11 of _0x18fe9a){if(!_0x45be11)continue;if(_0x45be11['isSpawnedEvent']())this[_0x2a06f9(0x443)](_0x45be11[_0x2a06f9(0x575)]);}},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x376)]=function(_0x48ca6e){const _0x36e0cb=_0x4f6648;for(const _0x38e58b of this[_0x36e0cb(0x447)]){if(!_0x38e58b)continue;if(_0x48ca6e['includes'](_0x38e58b[_0x36e0cb(0x4de)]())){if(_0x36e0cb(0x48f)!==_0x36e0cb(0x221))this[_0x36e0cb(0x443)](_0x38e58b[_0x36e0cb(0x575)]);else return _0x58c8a5[_0x36e0cb(0x2f5)][_0x36e0cb(0x3d1)][_0x36e0cb(0x6bd)](_0x3e34b9[_0x36e0cb(0x23d)],0x0);}}},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x377)]=function(_0x540fc0){const _0x5da653=_0x4f6648;for(const _0x50494c of this[_0x5da653(0x447)]){if(_0x5da653(0x2d4)===_0x5da653(0x331)){if(this[_0x5da653(0x4d2)]===_0x227bff)this[_0x5da653(0x645)]();return this[_0x5da653(0x4d2)];}else{if(!_0x50494c)continue;if(_0x540fc0[_0x5da653(0x328)](_0x50494c[_0x5da653(0x435)]())){if(_0x5da653(0x184)!==_0x5da653(0x184))return _0x1c903c[_0x5da653(0x1a3)][_0x5da653(0x1bb)]['call'](this);else this[_0x5da653(0x443)](_0x50494c[_0x5da653(0x575)]);}}}},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x497)]=function(){const _0x5df209=_0x4f6648;for(const _0x26d143 of this[_0x5df209(0x447)]){if(!_0x26d143)continue;this[_0x5df209(0x443)](_0x26d143[_0x5df209(0x575)]);}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x348)]=Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x3ac)],Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x3ac)]=function(_0x4c27b3){const _0x3cffc5=_0x4f6648;VisuMZ[_0x3cffc5(0x2f5)][_0x3cffc5(0x348)][_0x3cffc5(0x36c)](this,_0x4c27b3);if(_0x4c27b3>=0x3e8){const _0x588dd5=this[_0x3cffc5(0x273)](_0x4c27b3);if(_0x588dd5)_0x588dd5[_0x3cffc5(0x714)]();}},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x414)]=function(){const _0x1f7562=_0x4f6648;this['_forceShowPlayer']=![],this[_0x1f7562(0x530)]=![];if(!$dataMap)return;const _0x2fd9a9=$dataMap[_0x1f7562(0x4a3)]||'';if(_0x2fd9a9[_0x1f7562(0x6be)](/<HIDE PLAYER>/i))_0x1f7562(0x2ff)===_0x1f7562(0x2e9)?(_0x25a35c[_0x1f7562(0x37a)](_0x25e8e2,_0x9d354b),_0x290171[_0x1f7562(0x6f8)](_0x1dfa3b[_0x1f7562(0x654)])):(this[_0x1f7562(0x325)]=![],this[_0x1f7562(0x530)]=!![]);else _0x2fd9a9[_0x1f7562(0x6be)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this['_forceHidePlayer']=![]);},Game_Map['prototype'][_0x4f6648(0x57d)]=function(){const _0x572fda=_0x4f6648;return this[_0x572fda(0x325)]===undefined&&('EAVoU'==='PKzKK'?_0x12a414(_0x572fda(0x60d)+_0x572fda(0x3a9)):this['setupPlayerVisibilityOverrides']()),this[_0x572fda(0x325)];},Game_Map['prototype'][_0x4f6648(0x33b)]=function(){const _0x4c4bc9=_0x4f6648;return this[_0x4c4bc9(0x530)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x4c4bc9(0x530)];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x5d3)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase['prototype'][_0x4f6648(0x22f)]=function(){const _0x2b3e95=_0x4f6648;if(this===$gamePlayer){if($gameMap[_0x2b3e95(0x57d)]())return![];if($gameMap['isPlayerForceHidden']())return!![];}return VisuMZ[_0x2b3e95(0x2f5)][_0x2b3e95(0x5d3)][_0x2b3e95(0x36c)](this);},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x4f2)]=function(){const _0x55b698=_0x4f6648;this[_0x55b698(0x3dd)]=![],this['_forceHideFollower']=![];if(!$dataMap)return;const _0x5a34f1=$dataMap[_0x55b698(0x4a3)]||'';if(_0x5a34f1[_0x55b698(0x6be)](/<HIDE FOLLOWERS>/i))this[_0x55b698(0x3dd)]=![],this['_forceHideFollower']=!![];else{if(_0x5a34f1[_0x55b698(0x6be)](/<SHOW FOLLOWERS>/i)){if('ygVxH'==='ygVxH')this[_0x55b698(0x3dd)]=!![],this[_0x55b698(0x172)]=![];else{if(_0x5d098b)this[_0x55b698(0x57c)](_0x58c491['x'],_0x118854['y']);}}}},Game_Map['prototype']['areFollowersForceShown']=function(){const _0x67cd13=_0x4f6648;return this[_0x67cd13(0x3dd)]===undefined&&this[_0x67cd13(0x4f2)](),this[_0x67cd13(0x3dd)];},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x528)]=function(){const _0x431932=_0x4f6648;return this[_0x431932(0x172)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0x431932(0x172)];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x47e)]=Game_Followers[_0x4f6648(0x1a3)]['isVisible'],Game_Followers[_0x4f6648(0x1a3)][_0x4f6648(0x4a1)]=function(){const _0x36b17e=_0x4f6648;if($gameMap[_0x36b17e(0x52b)]())return!![];if($gameMap[_0x36b17e(0x528)]())return![];return VisuMZ[_0x36b17e(0x2f5)]['Game_Followers_isVisible'][_0x36b17e(0x36c)](this);},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x2c3)]=function(){const _0x19d36a=_0x4f6648,_0x403236=this['events'](),_0x16be94=[];$gameParty['_checkEncounterRaw']=!![];for(const _0x458e5d of _0x403236){if(_0x19d36a(0x6a5)===_0x19d36a(0x6a5)){if(!_0x458e5d)continue;if(_0x458e5d[_0x19d36a(0x2ec)])continue;_0x458e5d[_0x19d36a(0x3c0)]()&&_0x16be94[_0x19d36a(0x58b)](_0x458e5d);}else{_0x54f992[_0x19d36a(0x6aa)]()&&_0x2c7327('VisuMZ_1_MessageCore\x20is\x20required\x20to\x20run\x20'+'\x22Event\x20Popup:\x20Player\x22\x20plugin\x20command!');return;}}$gameParty['_checkEncounterRaw']=undefined;for(const _0x9d592 of _0x16be94){if('kpVWL'!==_0x19d36a(0x69f)){if(!_0x9d592)continue;if(_0x9d592[_0x19d36a(0x2ec)])continue;this[_0x19d36a(0x3bf)](_0x9d592[_0x19d36a(0x679)]());}else _0x187b1e===_0x19d36a(0x64d)?this[_0x19d36a(0x37e)]():this[_0x19d36a(0x5a2)]();}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3c0)]=function(){const _0x1f97ce=_0x4f6648,_0x2c481b=this[_0x1f97ce(0x273)]()['note']||'';if(_0x2c481b[_0x1f97ce(0x6be)](/<ERASE IF ENC(?:|OUNTER) HALF>/i)){if($gameParty[_0x1f97ce(0x65a)]())return!![];if($isTileEncounterHalf(this['x'],this['y']))return!![];}if(_0x2c481b[_0x1f97ce(0x6be)](/<ERASE IF ENC(?:|OUNTER) NONE>/i)){if($gameParty[_0x1f97ce(0x4bb)]())return!![];if($isTileEncounterNone(this['x'],this['y']))return!![];}return![];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x17b)]=Scene_Map[_0x4f6648(0x1a3)][_0x4f6648(0x35e)],Scene_Map['prototype'][_0x4f6648(0x35e)]=function(){const _0x4f719a=_0x4f6648;VisuMZ[_0x4f719a(0x2f5)][_0x4f719a(0x17b)][_0x4f719a(0x36c)](this),$gameMap[_0x4f719a(0x2c3)]();},Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x488)]=function(){const _0x2e02e8=_0x4f6648;if(!$dataMap)return;if(!$dataMap[_0x2e02e8(0x4a3)])return;const _0x51bb4e=$dataMap[_0x2e02e8(0x4a3)];if(_0x51bb4e['match'](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x4f3901=String(RegExp['$1'])['split'](',')[_0x2e02e8(0x3c6)](_0x14188d=>Number(_0x14188d));for(const _0x102f5e of _0x4f3901){if(_0x2e02e8(0x1c2)===_0x2e02e8(0x1c2))$gameTemp[_0x2e02e8(0x589)](_0x102f5e);else{const _0x2c69f1=[_0x5b414b['_mapId'],_0x27e2e1[_0x2e02e8(0x575)],'Self\x20Variable\x20%1'[_0x2e02e8(0x4a2)](_0x12697f)];_0x339c77['setValue'](_0x2c69f1,_0x5eb2e6);}}}},Game_CommonEvent[_0x4f6648(0x1a3)]['hasAdvancedSwitchVariable']=function(){const _0x3f6de6=_0x4f6648,_0x478b11=this[_0x3f6de6(0x273)]();return this[_0x3f6de6(0x4c3)]()&&_0x478b11[_0x3f6de6(0x69c)]>=0x1&&DataManager[_0x3f6de6(0x5d1)](_0x478b11[_0x3f6de6(0x419)]);},Game_CommonEvent[_0x4f6648(0x1a3)][_0x4f6648(0x3ef)]=function(){const _0x182315=_0x4f6648;return VisuMZ[_0x182315(0x2f5)][_0x182315(0x3d1)][_0x182315(0x6d8)][_0x182315(0x328)](this[_0x182315(0x5b1)]);},VisuMZ['EventsMoveCore'][_0x4f6648(0x223)]=Game_CommonEvent[_0x4f6648(0x1a3)][_0x4f6648(0x4c3)],Game_CommonEvent[_0x4f6648(0x1a3)][_0x4f6648(0x4c3)]=function(){const _0x4b1538=_0x4f6648;if(VisuMZ[_0x4b1538(0x2f5)]['Game_CommonEvent_isActive'][_0x4b1538(0x36c)](this)){if(_0x4b1538(0x550)===_0x4b1538(0x550))return!![];else this[_0x4b1538(0x58c)]=_0x3e8817(_0x538d71['$1']);}else{const _0x8aa53e=this[_0x4b1538(0x273)]();return VisuMZ[_0x4b1538(0x2f5)]['CustomPageConditions'][_0x4b1538(0x6bd)](this[_0x4b1538(0x273)]()[_0x4b1538(0x23d)],this[_0x4b1538(0x5b1)],_0x8aa53e);}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x34f)]=Game_Map[_0x4f6648(0x1a3)][_0x4f6648(0x3ee)],Game_Map['prototype'][_0x4f6648(0x3ee)]=function(){const _0x37a976=_0x4f6648,_0x53569c=VisuMZ[_0x37a976(0x2f5)][_0x37a976(0x34f)][_0x37a976(0x36c)](this),_0x373198=VisuMZ['EventsMoveCore'][_0x37a976(0x3d1)]['_commonEvents'][_0x37a976(0x3c6)](_0x38c237=>$dataCommonEvents[_0x38c237]);return _0x53569c[_0x37a976(0x2b2)](_0x373198)[_0x37a976(0x604)]((_0x59cdb2,_0x600898,_0x4805ee)=>_0x4805ee[_0x37a976(0x472)](_0x59cdb2)===_0x600898);},Game_CharacterBase['ALLOW_LADDER_DASH']=VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3fc)]['Movement']['DashOnLadder']??![],VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x316)]=Game_CharacterBase['prototype']['initMembers'],Game_CharacterBase[_0x4f6648(0x1a3)]['initMembers']=function(){const _0x43b0b5=_0x4f6648;VisuMZ[_0x43b0b5(0x2f5)][_0x43b0b5(0x316)][_0x43b0b5(0x36c)](this),this[_0x43b0b5(0x16d)]();},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x16d)]=function(){const _0x229bab=_0x4f6648;this['_scaleBaseX']=0x1,this[_0x229bab(0x2dc)]=0x1,this[_0x229bab(0x4ff)]=![],this['clearPose'](),this[_0x229bab(0x622)](),this[_0x229bab(0x196)](),this[_0x229bab(0x5dd)]();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x33a)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x6b0)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x6b0)]=function(){const _0x205944=_0x4f6648;let _0x565136=VisuMZ[_0x205944(0x2f5)][_0x205944(0x33a)]['call'](this);return _0x565136=this['adjustMoveSynchOpacityDelta'](_0x565136),_0x565136;},Game_CharacterBase[_0x4f6648(0x1a3)]['adjustMoveSynchOpacityDelta']=function(_0x5a89a7){return _0x5a89a7;},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x3cd)]=function(){const _0x4988a1=_0x4f6648;if(this['constructor']===Game_Player&&this[_0x4988a1(0x50d)]()){if(_0x4988a1(0x1b2)===_0x4988a1(0x483)){if(!this[_0x4988a1(0x364)](_0x293bde,_0x56d266))return![];}else return this[_0x4988a1(0x420)]()[_0x4988a1(0x4e5)]()['match'](/\[VS8\]/i);}else{if(Imported[_0x4988a1(0x434)]&&this[_0x4988a1(0x670)]()){if(_0x4988a1(0x46d)==='oLyMO')return!![];else _0x18b1d8[_0x4988a1(0x1a3)][_0x4988a1(0x292)][_0x4988a1(0x36c)](this),this['contents']['fontSize']=this[_0x4988a1(0x356)]();}else{if(_0x4988a1(0x1fa)!==_0x4988a1(0x4d7))return this[_0x4988a1(0x4e5)]()[_0x4988a1(0x6be)](/\[VS8\]/i);else this['autoEventIconBuffer'](_0x2ab325);}}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3d9)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x4dc)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x4dc)]=function(){const _0x15fbf6=_0x4f6648;if(!$dataMap)return this[_0x15fbf6(0x4b1)]||0x2;if(this[_0x15fbf6(0x598)]()&&!this[_0x15fbf6(0x2a7)]()&&this[_0x15fbf6(0x3cd)]())return this[_0x15fbf6(0x3d8)]();else{if(this[_0x15fbf6(0x598)]()&&!this[_0x15fbf6(0x2a7)]()){if(_0x15fbf6(0x57e)!=='AfmQe')return 0x8;else this[_0x15fbf6(0x4d2)][_0x15fbf6(0x176)]=_0x3106a5(_0x28b003['$1']);}else return this[_0x15fbf6(0x599)]()&&this[_0x15fbf6(0x3cd)]()?this[_0x15fbf6(0x2cb)]():VisuMZ[_0x15fbf6(0x2f5)][_0x15fbf6(0x3d9)][_0x15fbf6(0x36c)](this);}},VisuMZ['EventsMoveCore'][_0x4f6648(0x276)]=Game_CharacterBase[_0x4f6648(0x1a3)]['setDirection'],Game_CharacterBase[_0x4f6648(0x1a3)]['setDirection']=function(_0xef7cc3){const _0xdba4c7=_0x4f6648;if(!this[_0xdba4c7(0x3cd)]())_0xef7cc3=this['correctFacingDirection'](_0xef7cc3);VisuMZ[_0xdba4c7(0x2f5)]['Game_CharacterBase_setDirection'][_0xdba4c7(0x36c)](this,_0xef7cc3),this['updateMoveSynchDirection']();},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x180)]=function(_0x5d4680){const _0x112cd1=_0x4f6648;if(_0x5d4680===0x1)return this[_0x112cd1(0x4f1)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x5d4680===0x3)return this[_0x112cd1(0x4f1)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x5d4680===0x7)return this[_0x112cd1(0x4f1)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x5d4680===0x9)return this[_0x112cd1(0x4f1)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x5d4680;},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x285)]=function(_0x259a0c){const _0x19b651=_0x4f6648;return[0x1,0x3,0x5,0x7,0x9][_0x19b651(0x328)](_0x259a0c);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x428)]=function(){const _0x532548=_0x4f6648;return this[_0x532548(0x5c7)]||0x0;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x50a)]=Game_CharacterBase[_0x4f6648(0x1a3)]['moveStraight'],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x59b)]=function(_0x4937ef){const _0x2ab1fa=_0x4f6648;this[_0x2ab1fa(0x5c7)]=_0x4937ef,VisuMZ[_0x2ab1fa(0x2f5)][_0x2ab1fa(0x50a)][_0x2ab1fa(0x36c)](this,_0x4937ef);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x513)]=function(_0x56f140){const _0x3a236b=_0x4f6648;if(!this[_0x3a236b(0x285)](_0x56f140))return this[_0x3a236b(0x59b)](_0x56f140);let _0x9d9d78=0x0,_0x399708=0x0;switch(_0x56f140){case 0x1:_0x9d9d78=0x4,_0x399708=0x2;break;case 0x3:_0x9d9d78=0x6,_0x399708=0x2;break;case 0x7:_0x9d9d78=0x4,_0x399708=0x8;break;case 0x9:_0x9d9d78=0x6,_0x399708=0x8;break;}if(VisuMZ[_0x3a236b(0x2f5)][_0x3a236b(0x3fc)]['Movement']['StrictCollision']){if(!this['canPass'](this['_x'],this['_y'],_0x9d9d78))return this[_0x3a236b(0x59b)](_0x399708);if(!this[_0x3a236b(0x4f1)](this['_x'],this['_y'],_0x399708)){if(_0x3a236b(0x5ed)===_0x3a236b(0x4c9)){if(this[_0x3a236b(0x2f9)]===_0x50d988)this[_0x3a236b(0x220)]();this['_followerControlID']=_0x1523ef;;}else return this[_0x3a236b(0x59b)](_0x9d9d78);}if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x9d9d78,_0x399708)){if(_0x3a236b(0x4af)!==_0x3a236b(0x1ec)){let _0x53ffb6=VisuMZ[_0x3a236b(0x2f5)][_0x3a236b(0x3fc)][_0x3a236b(0x3ae)]['FavorHorz']?_0x9d9d78:_0x399708;return this[_0x3a236b(0x59b)](_0x53ffb6);}else return this['vehicle']()[_0x3a236b(0x429)](_0x43cabd,_0x516cb2,_0x5748bb);}}this[_0x3a236b(0x5c7)]=_0x56f140,this[_0x3a236b(0x642)](_0x9d9d78,_0x399708);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x1ca)]=Game_CharacterBase[_0x4f6648(0x1a3)]['realMoveSpeed'],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x4b8)]=function(){const _0x4e2d3d=_0x4f6648;let _0x30842a=this[_0x4e2d3d(0x230)];return this[_0x4e2d3d(0x5de)]()&&('vdqMW'===_0x4e2d3d(0x6e0)?_0x4e9fcb[_0x4e2d3d(0x2f5)]['CustomPageConditions']['loadCPC'](_0x4c7ea9):_0x30842a+=this[_0x4e2d3d(0x557)]()),this[_0x4e2d3d(0x279)](_0x30842a);},Game_CharacterBase['prototype'][_0x4f6648(0x557)]=function(){const _0x2eab46=_0x4f6648,_0xd35368=VisuMZ[_0x2eab46(0x2f5)][_0x2eab46(0x3fc)][_0x2eab46(0x3ae)];return _0xd35368[_0x2eab46(0x2c1)]!==undefined?_0xd35368[_0x2eab46(0x2c1)]:VisuMZ[_0x2eab46(0x2f5)][_0x2eab46(0x1ca)]['call'](this)-this[_0x2eab46(0x230)];},Game_CharacterBase[_0x4f6648(0x1a3)]['adjustDir8MovementSpeed']=function(_0x5cdd8e){const _0x30af4f=_0x4f6648,_0x578fea=VisuMZ[_0x30af4f(0x2f5)][_0x30af4f(0x3fc)][_0x30af4f(0x3ae)];if(!_0x578fea[_0x30af4f(0x6a9)])return _0x5cdd8e;return[0x1,0x3,0x7,0x9][_0x30af4f(0x328)](this[_0x30af4f(0x5c7)])&&(_0x5cdd8e*=_0x578fea[_0x30af4f(0x24a)]||0.01),_0x5cdd8e;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x300)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x5de)],Game_CharacterBase['prototype'][_0x4f6648(0x5de)]=function(){const _0x50a2b5=_0x4f6648;if(!Game_CharacterBase[_0x50a2b5(0x602)]&&this[_0x50a2b5(0x598)]())return![];if(this[_0x50a2b5(0x4e3)])return!![];return VisuMZ[_0x50a2b5(0x2f5)][_0x50a2b5(0x300)][_0x50a2b5(0x36c)](this);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x509)]=function(){return this['isDashing']()&&this['_stopCount']===0x0;},VisuMZ[_0x4f6648(0x2f5)]['Game_CharacterBase_pattern']=Game_CharacterBase['prototype'][_0x4f6648(0x53b)],Game_CharacterBase['prototype'][_0x4f6648(0x53b)]=function(){const _0xeb710e=_0x4f6648;return this[_0xeb710e(0x599)]()?this['getPosingCharacterPattern']():VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern'][_0xeb710e(0x36c)](this);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3f5)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x1ba)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x1ba)]=function(){const _0x396758=_0x4f6648;VisuMZ['EventsMoveCore']['Game_CharacterBase_increaseSteps'][_0x396758(0x36c)](this),this[_0x396758(0x5cb)]();},VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x4f6648(0x1a3)]['characterIndex'],Game_CharacterBase['prototype'][_0x4f6648(0x18d)]=function(){const _0x53ca71=_0x4f6648;if(this[_0x53ca71(0x3cd)]())return this[_0x53ca71(0x3e1)]();return VisuMZ[_0x53ca71(0x2f5)]['Game_CharacterBase_characterIndex'][_0x53ca71(0x36c)](this);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x3e1)]=function(){const _0x157e33=_0x4f6648,_0x36f7a9=this['direction']();if(this[_0x157e33(0x2a7)]()){if([0x2,0x4,0x6,0x8][_0x157e33(0x328)](_0x36f7a9))return 0x4;if([0x1,0x3,0x7,0x9][_0x157e33(0x328)](_0x36f7a9))return 0x5;}else{if(this[_0x157e33(0x598)]())return 0x6;else{if(this[_0x157e33(0x599)]())return this['getPosingCharacterIndex']();else{if(this[_0x157e33(0x629)]){if([0x2,0x4,0x6,0x8][_0x157e33(0x328)](_0x36f7a9))return 0x4;if([0x1,0x3,0x7,0x9][_0x157e33(0x328)](_0x36f7a9))return 0x5;}else{if(this['hasEventIcon']()&&this[_0x157e33(0x286)]()){if(_0x157e33(0x1f1)!=='VdPdP'){if([0x2,0x4,0x6,0x8][_0x157e33(0x328)](_0x36f7a9))return 0x4;if([0x1,0x3,0x7,0x9][_0x157e33(0x328)](_0x36f7a9))return 0x5;}else return _0x1ffa8a['onClickTrigger'](),!![];}else{if(this[_0x157e33(0x509)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x36f7a9))return 0x2;if([0x1,0x3,0x7,0x9][_0x157e33(0x328)](_0x36f7a9))return 0x3;}else{if(_0x157e33(0x5fb)===_0x157e33(0x5fb)){if([0x2,0x4,0x6,0x8][_0x157e33(0x328)](_0x36f7a9))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x36f7a9))return 0x1;}else this[_0x157e33(0x43e)]=this[_0x157e33(0x6ce)][_0x157e33(0x340)](),this[_0x157e33(0x491)]();}}}}}}},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x286)]=function(){const _0x42aeea=_0x4f6648;return VisuMZ['EventsMoveCore']['Settings'][_0x42aeea(0x2af)][_0x42aeea(0x6a4)];},Game_CharacterBase[_0x4f6648(0x1a3)]['isOnRope']=function(){const _0xd61e6c=_0x4f6648;return this[_0xd61e6c(0x598)]()&&this['terrainTag']()===VisuMZ[_0xd61e6c(0x2f5)][_0xd61e6c(0x3fc)]['TerrainTag'][_0xd61e6c(0x5d4)];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x3d8)]=function(){return this['isOnRope']()?0x4:0x2;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4ac)]=Game_CharacterBase[_0x4f6648(0x1a3)]['update'],Game_CharacterBase[_0x4f6648(0x1a3)]['update']=function(){const _0x3dc625=_0x4f6648;this['updateScaleBase'](),VisuMZ[_0x3dc625(0x2f5)][_0x3dc625(0x4ac)][_0x3dc625(0x36c)](this),this['updatePose']();},Game_CharacterBase['prototype'][_0x4f6648(0x2b0)]=function(){const _0x1fde00=_0x4f6648;this[_0x1fde00(0x627)]=this[_0x1fde00(0x505)]??0x1,this[_0x1fde00(0x235)]=this[_0x1fde00(0x2dc)]??0x1;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x2a9)]=Game_CharacterBase[_0x4f6648(0x1a3)]['bushDepth'],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x2dd)]=function(){const _0x4f345b=_0x4f6648;let _0x519067=VisuMZ[_0x4f345b(0x2f5)][_0x4f345b(0x2a9)][_0x4f345b(0x36c)](this);if(this[_0x4f345b(0x235)]!==undefined){if(_0x4f345b(0x706)===_0x4f345b(0x706))_0x519067/=Math[_0x4f345b(0x1a4)](this['_scaleY'],0.00001);else{if(_0x44d508['isRegionAllowPass'](_0x5bfdd0,_0x2ed3c8,_0x39c12c,this['_type']))return!![];if(_0x31e2ae[_0x4f345b(0x4ed)](_0x32c865,_0x3ee021,_0x4b48cb,this['_type']))return![];return _0x419ddf['EventsMoveCore'][_0x4f345b(0x5a6)][_0x4f345b(0x36c)](_0x165c23,_0x14c8ab,_0x48dc01,_0x557f95);}}return Math[_0x4f345b(0x36a)](_0x519067);},Game_CharacterBase['prototype']['updatePose']=function(){const _0x35486a=_0x4f6648;this['_poseDuration']=this['_poseDuration']||0x0;if(this[_0x35486a(0x4ef)]>0x0){this['_poseDuration']--;if(this[_0x35486a(0x4ef)]<=0x0&&this[_0x35486a(0x49a)]!=='ZZZ')this[_0x35486a(0x5cb)]();}},VisuMZ['EventsMoveCore'][_0x4f6648(0x563)]=Game_CharacterBase['prototype'][_0x4f6648(0x642)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x642)]=function(_0x5caaed,_0x5f1255){const _0x5c7458=_0x4f6648;VisuMZ[_0x5c7458(0x2f5)][_0x5c7458(0x563)][_0x5c7458(0x36c)](this,_0x5caaed,_0x5f1255);if(this[_0x5c7458(0x3cd)]())this['setDiagonalDirection'](_0x5caaed,_0x5f1255);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x18f)]=function(_0x46dab0,_0x5b9acf){const _0x2cedc8=_0x4f6648;if(_0x46dab0===0x4&&_0x5b9acf===0x2)this['setDirection'](0x1);if(_0x46dab0===0x6&&_0x5b9acf===0x2)this['setDirection'](0x3);if(_0x46dab0===0x4&&_0x5b9acf===0x8)this[_0x2cedc8(0x26f)](0x7);if(_0x46dab0===0x6&&_0x5b9acf===0x8)this['setDirection'](0x9);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4c4)]=Game_CharacterBase[_0x4f6648(0x1a3)]['hasStepAnime'],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x42f)]=function(){const _0x4cecc9=_0x4f6648;if(this[_0x4cecc9(0x599)]()&&this[_0x4cecc9(0x55f)]()===_0x4cecc9(0x3a4))return!![];return VisuMZ['EventsMoveCore'][_0x4cecc9(0x4c4)][_0x4cecc9(0x36c)](this);},Game_CharacterBase[_0x4f6648(0x1a3)]['setPose']=function(_0x4ac783,_0x1d5562){const _0x45486f=_0x4f6648;if(_0x4ac783[_0x45486f(0x6be)](/Z/i))_0x4ac783=_0x45486f(0x3a4);if(_0x4ac783[_0x45486f(0x6be)](/SLEEP/i))_0x4ac783='ZZZ';if(this[_0x45486f(0x3cd)]()){if(_0x45486f(0x418)!==_0x45486f(0x418)){if(!this[_0x45486f(0x4f0)])return 0x0;if(this[_0x45486f(0x4f0)]['_erased'])return 0x0;const _0x2a22b5=this[_0x45486f(0x4f0)][_0x45486f(0x1bb)]();return _0x2a22b5?_0x2a22b5[_0x45486f(0x453)]||0x0:0x0;}else this[_0x45486f(0x49a)]=_0x4ac783[_0x45486f(0x42b)]()[_0x45486f(0x4cf)](),this['_poseDuration']=_0x1d5562||Infinity;}},Game_CharacterBase['prototype'][_0x4f6648(0x55f)]=function(){const _0x15b2a5=_0x4f6648;return this[_0x15b2a5(0x3cd)]()?(this[_0x15b2a5(0x49a)]||'')[_0x15b2a5(0x42b)]()['trim']():''['toUpperCase']()[_0x15b2a5(0x4cf)]();},Game_CharacterBase[_0x4f6648(0x1a3)]['setBalloonPose']=function(_0x536395,_0x1324c3){const _0xce2259=_0x4f6648;if(this[_0xce2259(0x3cd)]()){const _0x519ac3=['','EXCLAMATION','QUESTION',_0xce2259(0x70d),_0xce2259(0x6c8),_0xce2259(0x6fd),_0xce2259(0x623),'COBWEB','SILENCE',_0xce2259(0x53e),_0xce2259(0x3a4),'','','','',''][_0x536395];this[_0xce2259(0x710)](_0x519ac3,_0x1324c3);}},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x5cb)]=function(){const _0x2fba8d=_0x4f6648;this['_pose']='',this[_0x2fba8d(0x4ef)]=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x29b2a0=_0x4f6648;return this['isSpriteVS8dir']()&&!!this[_0x29b2a0(0x49a)];},Game_CharacterBase['prototype'][_0x4f6648(0x308)]=function(){const _0x3d5624=_0x4f6648,_0x5aae86=this[_0x3d5624(0x49a)][_0x3d5624(0x42b)]();switch(this['_pose'][_0x3d5624(0x42b)]()['trim']()){case'ITEM':case _0x3d5624(0x646):case _0x3d5624(0x440):case'HURT':case _0x3d5624(0x3b6):case _0x3d5624(0x171):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x2cb)]=function(){const _0x3978f2=_0x4f6648;switch(this['_pose'][_0x3978f2(0x42b)]()){case _0x3978f2(0x538):case'QUESTION':case _0x3978f2(0x70d):case'!':case'?':return 0x2;break;case'HEART':case _0x3978f2(0x6fd):case'SWEAT':return 0x4;break;case _0x3978f2(0x1bc):case _0x3978f2(0x646):case _0x3978f2(0x440):case _0x3978f2(0x51f):case'SILENCE':case _0x3978f2(0x53e):return 0x6;break;case _0x3978f2(0x238):case _0x3978f2(0x3b6):case _0x3978f2(0x171):case _0x3978f2(0x3a4):case _0x3978f2(0x26e):return 0x8;break;default:return VisuMZ[_0x3978f2(0x2f5)]['Game_CharacterBase_setDirection'][_0x3978f2(0x36c)](this);break;}},Game_CharacterBase[_0x4f6648(0x1a3)]['getPosingCharacterPattern']=function(){const _0x44362c=_0x4f6648;switch(this[_0x44362c(0x49a)][_0x44362c(0x42b)]()){case _0x44362c(0x1bc):case _0x44362c(0x238):case'EXCLAMATION':case'!':case'HEART':case _0x44362c(0x51f):return 0x0;break;case _0x44362c(0x646):case _0x44362c(0x3b6):case _0x44362c(0x3b3):case'?':case'ANGER':case'SILENCE':return 0x1;break;case _0x44362c(0x440):case'COLLAPSE':case _0x44362c(0x70d):case _0x44362c(0x623):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x44362c(0x2f5)][_0x44362c(0x520)][_0x44362c(0x36c)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x442d66=_0x4f6648;this[_0x442d66(0x629)]=!![];},Game_CharacterBase['prototype'][_0x4f6648(0x31a)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x26d)]=function(){const _0x28f9f8=_0x4f6648;this[_0x28f9f8(0x4e3)]=!![];},Game_CharacterBase['prototype'][_0x4f6648(0x622)]=function(){const _0x8c1dd8=_0x4f6648;this[_0x8c1dd8(0x4e3)]=![];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x1fd)]=function(){const _0x48a782=_0x4f6648;if(this['isTile']())return![];if(this[_0x48a782(0x54b)])return![];if(this['_characterName']==='')return![];if(this[_0x48a782(0x382)]===Game_Vehicle)return![];if(this[_0x48a782(0x22f)]())return![];return!![];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x6dc)]=function(){const _0x5653e5=_0x4f6648;if(this[_0x5653e5(0x598)]())return!![];if(this[_0x5653e5(0x382)]===Game_Player&&this[_0x5653e5(0x50d)]())return!![];return![];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x1e6)]=function(){const _0x41f321=_0x4f6648;return VisuMZ[_0x41f321(0x2f5)]['Settings'][_0x41f321(0x3ae)][_0x41f321(0x321)];},Game_CharacterBase['prototype'][_0x4f6648(0x3c1)]=function(){const _0x1119df=_0x4f6648;return this[_0x1119df(0x71c)]();},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x3fe)]=function(){const _0x56139b=_0x4f6648,_0x51c9d0=$gameMap[_0x56139b(0x2b6)]();return Math[_0x56139b(0x36a)](this[_0x56139b(0x52c)]()*_0x51c9d0+_0x51c9d0);},Game_CharacterBase[_0x4f6648(0x70a)]=0x64,Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x6eb)]=function(_0x2461b2,_0x10d81c){const _0x2546e3=_0x4f6648;if(TouchInput[_0x2546e3(0x60b)]())return![];if(!$gameMap[_0x2546e3(0x56b)]())return![];if($gameMap[_0x2546e3(0x6f6)](_0x2461b2,_0x10d81c)['length']>0x0)return![];if(!$gameMap[_0x2546e3(0x364)](_0x2461b2,_0x10d81c))return![];const _0x4b668d=$gameMap['_events']['length'];if(_0x4b668d>=Game_CharacterBase[_0x2546e3(0x70a)]){if(_0x2546e3(0x25d)===_0x2546e3(0x25d))return![];else this[_0x2546e3(0x446)]=_0x80b289[_0x2546e3(0x36a)](this[_0x2546e3(0x246)]*0.48);}return!![];},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x553)]=function(_0x45ec7e,_0x397343){const _0x2b37c6=_0x4f6648;let _0x14e3f5=this[_0x2b37c6(0x5bc)](_0x45ec7e,_0x397343);if(!this['getDiagonalDestination'](_0x45ec7e,_0x397343))return _0x14e3f5;if(this[_0x2b37c6(0x3e8)](_0x45ec7e,_0x397343))return _0x14e3f5;const _0x2530f5=_0x14e3f5;if(_0x14e3f5===0x2){if(_0x45ec7e>this['x']&&this['canPass'](this['x'],this['y'],0x6))_0x14e3f5=0x3;if(_0x45ec7e<this['x']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x4))_0x14e3f5=0x1;}else{if(_0x14e3f5===0x4){if('bZsog'!=='bZsog'){if(this[_0x2b37c6(0x64c)]===_0x1a5513)this[_0x2b37c6(0x66d)]();const _0x46ecb1=_0x2b37c6(0x17e)[_0x2b37c6(0x4a2)](_0x4a59af,_0xaa29c2);this[_0x2b37c6(0x64c)][_0x46ecb1]={'direction':_0x28ddd1,'x':_0x45d6c5['round'](_0x5efcb5),'y':_0x4e9e1d[_0x2b37c6(0x6fb)](_0x58287c),'pageIndex':_0x352718,'moveRouteIndex':_0x3d590c};}else{if(_0x397343>this['y']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x4))_0x14e3f5=0x1;if(_0x397343<this['y']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x6))_0x14e3f5=0x7;}}else{if(_0x14e3f5===0x6){if('ioNBi'==='RXtjj')return _0x458e9e['events'][_0x5debed];else{if(_0x397343>this['y']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x4))_0x14e3f5=0x3;if(_0x397343<this['y']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x6))_0x14e3f5=0x9;}}else{if(_0x14e3f5===0x8){if(_0x2b37c6(0x45b)!=='Rquef'){const _0x469771=_0x58a903[_0x2b37c6(0x4d9)](this);if(!_0x469771)return;const _0x3f22fa=_0x469771[_0x2b37c6(0x44e)]['toUpperCase']()['trim']();_0x3f22fa!==_0x2b37c6(0x32b)?this['morphIntoTemplate'](_0x3f22fa,!![]):this[_0x2b37c6(0x6cf)](_0x469771[_0x2b37c6(0x191)],_0x469771['eventId'],!![]);}else{if(_0x45ec7e>this['x']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x6))_0x14e3f5=0x9;if(_0x45ec7e<this['x']&&this[_0x2b37c6(0x4f1)](this['x'],this['y'],0x4))_0x14e3f5=0x7;}}}}}if(!this['canPass'](this['x'],this['y'],_0x14e3f5))return _0x2530f5;const _0x36fdf9=$gameMap[_0x2b37c6(0x579)](this['x'],_0x14e3f5),_0x2e90e5=$gameMap[_0x2b37c6(0x6a6)](this['y'],_0x14e3f5);if(this[_0x2b37c6(0x3e8)](_0x36fdf9,_0x2e90e5))_0x14e3f5=_0x2530f5;return _0x14e3f5;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x5a6)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x4f1)],Game_CharacterBase['prototype']['canPass']=function(_0x2775c1,_0x2d9fe1,_0x4f9520){const _0x4cb79e=_0x4f6648;return this['_vehicleType']==='airship'?this[_0x4cb79e(0x420)]()[_0x4cb79e(0x4a4)](_0x2775c1,_0x2d9fe1,_0x4f9520):_0x4cb79e(0x6d4)!==_0x4cb79e(0x5a3)?VisuMZ[_0x4cb79e(0x2f5)][_0x4cb79e(0x5a6)]['call'](this,_0x2775c1,_0x2d9fe1,_0x4f9520):this['_eventOverload'];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x196)]=function(){const _0x3da681=_0x4f6648;this[_0x3da681(0x58c)]=0x0,this[_0x3da681(0x5f9)]=0x0;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x375)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x71c)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x71c)]=function(){const _0x32e04b=_0x4f6648;return VisuMZ[_0x32e04b(0x2f5)][_0x32e04b(0x375)][_0x32e04b(0x36c)](this)+(this[_0x32e04b(0x58c)]||0x0);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x256)]=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x222)],Game_CharacterBase[_0x4f6648(0x1a3)]['screenY']=function(){const _0xe44f26=_0x4f6648;return VisuMZ['EventsMoveCore'][_0xe44f26(0x256)][_0xe44f26(0x36c)](this)+(this[_0xe44f26(0x5f9)]||0x0);},Game_CharacterBase[_0x4f6648(0x715)]=VisuMZ[_0x4f6648(0x2f5)]['Settings'][_0x4f6648(0x3ae)][_0x4f6648(0x5c8)]??-0x6,Game_CharacterBase[_0x4f6648(0x1a3)]['shiftY']=function(){const _0x57f9de=_0x4f6648;let _0x3c6ca7=this[_0x57f9de(0x56d)]()?0x0:-Game_CharacterBase[_0x57f9de(0x715)];if(this['_scaleY']){if(_0x57f9de(0x544)!==_0x57f9de(0x469))_0x3c6ca7*=this[_0x57f9de(0x235)];else{if(!_0x4a8dc2['isWorking']())return;_0x4857bb['resume']();}}return Math['round'](_0x3c6ca7);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x5dd)]=function(){const _0x640578=_0x4f6648;this[_0x640578(0x508)]='';},VisuMZ[_0x4f6648(0x2f5)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x676)],Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x676)]=function(){const _0x1a9e4e=_0x4f6648;if(this[_0x1a9e4e(0x4ff)])return;if(this[_0x1a9e4e(0x2a5)]())return;VisuMZ[_0x1a9e4e(0x2f5)]['Game_CharacterBase_updatePattern'][_0x1a9e4e(0x36c)](this);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x2a5)]=function(){const _0x508592=_0x4f6648;if(!this[_0x508592(0x42f)]()&&this[_0x508592(0x693)]>0x0)return![];switch(String(this['_stepPattern'])[_0x508592(0x42b)]()['trim']()){case'LEFT\x20TO\x20RIGHT':this[_0x508592(0x1e8)]+=0x1;if(this['_pattern']>0x2)this[_0x508592(0x1d5)](0x0);break;case _0x508592(0x569):this[_0x508592(0x1e8)]-=0x1;if(this['_pattern']<0x0)this[_0x508592(0x1d5)](0x2);break;case _0x508592(0x643):case _0x508592(0x274):this[_0x508592(0x37e)]();break;case _0x508592(0x493):case _0x508592(0x192):case _0x508592(0x4f4):case _0x508592(0x660):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x1bb)]=function(){const _0x423392=_0x4f6648;return $gameSystem[_0x423392(0x1bb)](this);},Game_CharacterBase[_0x4f6648(0x1a3)]['hasEventIcon']=function(){const _0x869335=_0x4f6648,_0x178ce8=this[_0x869335(0x1bb)]();if(!_0x178ce8)return![];return _0x178ce8['iconIndex']>0x0;},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x241)]=function(){const _0x4f9342=_0x4f6648,_0x58facd=this[_0x4f9342(0x4dc)]();return $gameMap[_0x4f9342(0x579)](this['x'],_0x58facd);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x25b)]=function(){const _0x42b6df=_0x4f6648,_0xa8f47c=this[_0x42b6df(0x4dc)]();return $gameMap[_0x42b6df(0x6a6)](this['y'],_0xa8f47c);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x484)]=function(){const _0x3ff3b2=_0x4f6648,_0x538906=this[_0x3ff3b2(0x391)](this[_0x3ff3b2(0x4dc)]());return $gameMap['roundXWithDirection'](this['x'],_0x538906);},Game_CharacterBase[_0x4f6648(0x1a3)]['backY']=function(){const _0x4dba8a=_0x4f6648,_0x48aaa3=this[_0x4dba8a(0x391)](this[_0x4dba8a(0x4dc)]());return $gameMap[_0x4dba8a(0x6a6)](this['y'],_0x48aaa3);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x2bf)]=function(){const _0x1454d8=_0x4f6648,_0xaa536d=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x1454d8(0x579)](this['x'],_0xaa536d);},Game_CharacterBase['prototype'][_0x4f6648(0x578)]=function(){const _0x516608=_0x4f6648,_0x5a212a=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x516608(0x4dc)]()];return $gameMap[_0x516608(0x6a6)](this['y'],_0x5a212a);},Game_CharacterBase['prototype'][_0x4f6648(0x574)]=function(){const _0x52d910=_0x4f6648,_0x355eef=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x52d910(0x4dc)]()];return $gameMap[_0x52d910(0x579)](this['x'],_0x355eef);},Game_CharacterBase[_0x4f6648(0x1a3)]['cwY']=function(){const _0x47e01f=_0x4f6648,_0x547077=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x47e01f(0x4dc)]()];return $gameMap['roundYWithDirection'](this['y'],_0x547077);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x540)]=Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x384)],Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x384)]=function(_0x3697a2){const _0x2bde0d=_0x4f6648;route=JsonEx['makeDeepCopy'](_0x3697a2),VisuMZ[_0x2bde0d(0x2f5)]['Game_Character_setMoveRoute']['call'](this,route);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x68d)]=Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x6ee)],Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x6ee)]=function(_0xc8192e){const _0x2bd32d=_0x4f6648;route=JsonEx[_0x2bd32d(0x610)](_0xc8192e),VisuMZ['EventsMoveCore'][_0x2bd32d(0x68d)]['call'](this,route);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4e1)]=Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x424)],Game_Character['prototype'][_0x4f6648(0x424)]=function(_0xa6f9f3){const _0xaa15b6=_0x4f6648,_0x597987=Game_Character,_0x213a61=_0xa6f9f3[_0xaa15b6(0x19a)];if(_0xa6f9f3['code']===_0x597987[_0xaa15b6(0x431)]){if('aSQVm'===_0xaa15b6(0x40b)){if(_0x12c95e&&!_0x5c0d21[_0xaa15b6(0x2ec)]){this[_0xaa15b6(0x26b)](_0x49ee5d['x'],_0x117695['y'],_0x113b03);if(_0x255613['isNormalPriority']()&&this[_0xaa15b6(0x27d)]()){const _0x1ad053=_0x88e4dc[_0xaa15b6(0x572)](this['x'],this['y'],_0x8906fc['x'],_0x56f5ce['y']);if(_0x1ad053<=0x1)this['_moveRouteIndex']++;}}}else{let _0x52bcb7=_0xa6f9f3[_0xaa15b6(0x19a)][0x0];_0x52bcb7=this[_0xaa15b6(0x656)](_0x52bcb7),_0x52bcb7=this[_0xaa15b6(0x40a)](_0x52bcb7),this['processMoveCommandEventsMoveCore'](_0xa6f9f3,_0x52bcb7);}}else VisuMZ[_0xaa15b6(0x2f5)][_0xaa15b6(0x4e1)][_0xaa15b6(0x36c)](this,_0xa6f9f3);},Game_Character[_0x4f6648(0x1a3)]['convertVariableValuesInScriptCall']=function(_0x44990a){const _0x11c8e3=_0x4f6648,_0x644fe4=/\$gameVariables\.value\((\d+)\)/gi,_0x2fe99e=/\\V\[(\d+)\]/gi;while(_0x44990a[_0x11c8e3(0x6be)](_0x644fe4)){_0x44990a=_0x44990a['replace'](_0x644fe4,(_0x47dd9a,_0x4c2123)=>$gameVariables[_0x11c8e3(0x298)](parseInt(_0x4c2123)));}while(_0x44990a['match'](_0x2fe99e)){'cSDsO'==='cSDsO'?_0x44990a=_0x44990a[_0x11c8e3(0x302)](_0x2fe99e,(_0x2fb065,_0x2858f4)=>$gameVariables[_0x11c8e3(0x298)](parseInt(_0x2858f4))):_0x1fb77f[_0x11c8e3(0x2f5)][_0x11c8e3(0x3d1)][_0x11c8e3(0x663)](_0x36dccf);}return _0x44990a;},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x40a)]=function(_0x16a145){const _0x233d22=_0x4f6648,_0x3e1bd0=/\\SELFVAR\[(\d+)\]/gi;while(_0x16a145[_0x233d22(0x6be)](_0x3e1bd0)){if('ukPsW'===_0x233d22(0x56e)){this['_needsPeriodicRefresh']=!![];return;}else _0x16a145=_0x16a145[_0x233d22(0x302)](_0x3e1bd0,(_0x4c8c63,_0x3c00ee)=>getSelfVariableValue(this[_0x233d22(0x527)],this[_0x233d22(0x575)],parseInt(_0x3c00ee)));}return _0x16a145;},Game_Character['prototype']['processMoveCommandEventsMoveCore']=function(_0x10f88c,_0x44beb2){const _0x31ef15=_0x4f6648;if(_0x44beb2[_0x31ef15(0x6be)](/ANIMATION:[ ](\d+)/i)){if(_0x31ef15(0x68c)!==_0x31ef15(0x68c)){const _0x16c32a=_0x3b3970[_0x31ef15(0x2de)],_0x28b28f=_0x301a7d[_0x31ef15(0x3b1)],_0x16a59e=_0x2e4894%0x10*_0x16c32a,_0x2bcd3d=_0x355b16[_0x31ef15(0x36a)](_0x17dd77/0x10)*_0x28b28f;_0x184dab[_0x31ef15(0x1e0)](_0x16a59e,_0x2bcd3d,_0x16c32a,_0x28b28f),this[_0x31ef15(0x452)]=!![];}else return this[_0x31ef15(0x67e)](Number(RegExp['$1']));}if(_0x44beb2[_0x31ef15(0x6be)](/BALLOON:[ ](.*)/i))return this[_0x31ef15(0x183)](String(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/FADE IN:[ ](\d+)/i))return this[_0x31ef15(0x5c3)](Number(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/FADE OUT:[ ](\d+)/i))return this[_0x31ef15(0x5af)](Number(RegExp['$1']));if(_0x44beb2['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x31ef15(0x541)]();if(_0x44beb2[_0x31ef15(0x6be)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x31ef15(0x31a)]();if(_0x44beb2[_0x31ef15(0x6be)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if('upnWs'===_0x31ef15(0x4b2)){if(this[_0x31ef15(0x351)]===_0x27a7ce)this['initEventsMoveCore']();this[_0x31ef15(0x4cc)](_0x4368b0,_0x5d5982,-0x1,0x0,0x0,0x0,![]);}else return this[_0x31ef15(0x26d)]();}if(_0x44beb2[_0x31ef15(0x6be)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x44beb2['match'](/HUG:[ ]LEFT/i)){if(_0x31ef15(0x363)===_0x31ef15(0x363))return this['processMoveRouteHugWall'](_0x31ef15(0x64d));else _0x13912d[_0x31ef15(0x177)][_0x31ef15(0x6f2)]=this[_0x31ef15(0x1e6)](),_0x5abfa4[_0x31ef15(0x177)]['bitmap']=_0x1c7874[_0x31ef15(0x4e4)](_0x566ece[_0x31ef15(0x177)][_0x31ef15(0x6f2)]);}if(_0x44beb2['match'](/HUG:[ ]RIGHT/i)){if('GUxhl'===_0x31ef15(0x1c1))return this['processMoveRouteHugWall']('right');else this[_0x31ef15(0x2ac)]=![],this['_speed']=-0x1,this[_0x31ef15(0x56a)]=0x0;}if(_0x44beb2[_0x31ef15(0x6be)](/INDEX:[ ](\d+)/i))return this[_0x31ef15(0x22a)](Number(RegExp['$1']));if(_0x44beb2['match'](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x31ef15(0x3bb)===_0x31ef15(0x4b7)){_0x13aa44=this[_0x31ef15(0x2c6)]-_0x574af9,this[_0x31ef15(0x6d9)](_0x5af751[_0x31ef15(0x50f)](0x0,0xff));if(this[_0x31ef15(0x2c6)]>0x0)this[_0x31ef15(0x203)]--;}else{const _0x1aa735=this[_0x31ef15(0x329)]+Number(RegExp['$1']);return this[_0x31ef15(0x22a)](_0x1aa735);}}if(_0x44beb2[_0x31ef15(0x6be)](/JUMP FORWARD:[ ](\d+)/i)){if('bmOgz'===_0x31ef15(0x3a1))return this[_0x31ef15(0x197)](Number(RegExp['$1']));else _0x30c4c3[_0x31ef15(0x5dc)](this[_0x31ef15(0x575)]);}if(_0x44beb2[_0x31ef15(0x6be)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x44beb2[_0x31ef15(0x6be)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x533e60=$gameMap[_0x31ef15(0x273)](Number(RegExp['$1']));return this[_0x31ef15(0x42d)](_0x533e60);}if(_0x44beb2['match'](/JUMP TO PLAYER/i))return this[_0x31ef15(0x42d)]($gamePlayer);if(_0x44beb2[_0x31ef15(0x6be)](/JUMP TO HOME/i)&&this[_0x31ef15(0x679)]){const _0x3cf1df=this['_randomHomeX'],_0x317fb2=this[_0x31ef15(0x4a8)];return this[_0x31ef15(0x23b)](_0x3cf1df,_0x317fb2);}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x31ef15(0x23a)===_0x31ef15(0x23a)){const _0x5d676a=String(RegExp['$1']),_0x2f0b15=this['checkCollisionKeywords'](_0x44beb2);return this[_0x31ef15(0x3f4)](_0x5d676a,_0x2f0b15);}else{const _0x2fda9a=this['_hue']+(this['_event']['_labelWindow']['hueShift']||0x0);this[_0x31ef15(0x39e)](_0x2fda9a);}}if(_0x44beb2['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x31ef15(0x33c)!==_0x31ef15(0x33c))this[_0x31ef15(0x62f)]&&this[_0x31ef15(0x255)]();else{const _0x3c9dcc=Number(RegExp['$1']),_0x152181=Number(RegExp['$2']),_0x1345b2=this[_0x31ef15(0x565)](_0x44beb2);return this['processMoveRouteMoveTo'](_0x3c9dcc,_0x152181,_0x1345b2);}}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x1578a7=$gameMap[_0x31ef15(0x273)](Number(RegExp['$1'])),_0x43cb96=this[_0x31ef15(0x565)](_0x44beb2);return this[_0x31ef15(0x564)](_0x1578a7,_0x43cb96);}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE TO PLAYER/i)){const _0x944425=this[_0x31ef15(0x565)](_0x44beb2);return this[_0x31ef15(0x564)]($gamePlayer,_0x944425);}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE TO HOME/i)&&this[_0x31ef15(0x679)]){const _0x4db797=this[_0x31ef15(0x1eb)],_0x365f15=this[_0x31ef15(0x4a8)],_0x3dcf6d=this[_0x31ef15(0x565)](_0x44beb2);return this[_0x31ef15(0x26b)](_0x4db797,_0x365f15,_0x3dcf6d);}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE LOWER LEFT:[ ](\d+)/i)){if(_0x31ef15(0x2ae)!=='qHaJn')return this[_0x31ef15(0x5c0)](0x1,Number(RegExp['$1']));else{if(this[_0x31ef15(0x3e2)]===_0x5eefc5)this[_0x31ef15(0x66d)]();return this['_MapSpawnedEventData'][_0x2f111d]=this['_MapSpawnedEventData'][_0x5596d1]||[],this[_0x31ef15(0x3e2)][_0x5116e9];}}if(_0x44beb2[_0x31ef15(0x6be)](/MOVE DOWN:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x31ef15(0x5c0)](0x3,Number(RegExp['$1']));if(_0x44beb2['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x31ef15(0x5c0)](0x4,Number(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x31ef15(0x5c0)](0x6,Number(RegExp['$1']));if(_0x44beb2['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/MOVE UP:[ ](\d+)/i))return this[_0x31ef15(0x5c0)](0x8,Number(RegExp['$1']));if(_0x44beb2[_0x31ef15(0x6be)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if(_0x31ef15(0x55e)===_0x31ef15(0x3ab)){if(_0x45c2bb[_0x31ef15(0x38a)][_0x2298b2]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x2fa423[_0x31ef15(0x30f)][_0x31ef15(0x58b)](_0xff335c);if(_0x463d6c['variables'][_0x31c157][_0x31ef15(0x6be)](/<SELF>/i))_0x53b371[_0x31ef15(0x6d7)][_0x31ef15(0x58b)](_0xcf7011);if(_0x38805d[_0x31ef15(0x38a)][_0x10daee][_0x31ef15(0x6be)](/<MAP>/i))_0x56e776[_0x31ef15(0x50c)][_0x31ef15(0x58b)](_0x2e95da);}else return this[_0x31ef15(0x5c0)](0x9,Number(RegExp['$1']));}if(_0x44beb2[_0x31ef15(0x6be)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x31ef15(0x4aa)!==_0x31ef15(0x6f5)){const _0x47e95d=Math[_0x31ef15(0x6fb)](Number(RegExp['$1'])/0x64*0xff);return this[_0x31ef15(0x6d9)](_0x47e95d[_0x31ef15(0x50f)](0x0,0xff));}else this[_0x31ef15(0x5a2)]();}if(_0x44beb2[_0x31ef15(0x6be)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x1ad5fb=this['_opacity']+Math[_0x31ef15(0x6fb)](Number(RegExp['$1'])/0x64*0xff);return this[_0x31ef15(0x6d9)](_0x1ad5fb[_0x31ef15(0x50f)](0x0,0xff));}if(_0x44beb2[_0x31ef15(0x6be)](/OPACITY:[ ]([\+\-]\d+)/i)){if('fKueP'===_0x31ef15(0x17c)){const _0x4a60b8=this[_0x31ef15(0x2c6)]+Number(RegExp['$1']);return this[_0x31ef15(0x6d9)](_0x4a60b8[_0x31ef15(0x50f)](0x0,0xff));}else return this[_0x31ef15(0x2b9)]===_0x65cfb6&&(this[_0x31ef15(0x2b9)]=![]),this[_0x31ef15(0x2b9)];}if(_0x44beb2[_0x31ef15(0x6be)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x31ef15(0x258)](Number(RegExp['$1']));if(_0x44beb2['match'](/PATTERN UNLOCK/i))return this[_0x31ef15(0x4ff)]=![];if(_0x44beb2['match'](/POSE:[ ](.*)/i)){const _0x16ea46=String(RegExp['$1'])[_0x31ef15(0x42b)]()[_0x31ef15(0x4cf)]();return this['setPose'](_0x16ea46);}if(_0x44beb2[_0x31ef15(0x6be)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x31ef15(0x5b4)===_0x31ef15(0x462))return this[_0x31ef15(0x5d5)]()[_0x31ef15(0x40c)]??0x0;else{const _0xc32954=Number(RegExp['$1']),_0x4ba575=Number(RegExp['$2']);return this[_0x31ef15(0x456)](_0xc32954,_0x4ba575);}}if(_0x44beb2['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x1f3b2e=$gameMap[_0x31ef15(0x273)](Number(RegExp['$1']));return this[_0x31ef15(0x5c9)](_0x1f3b2e);}if(_0x44beb2[_0x31ef15(0x6be)](/STEP TOWARD PLAYER/i)){if(_0x31ef15(0x66a)===_0x31ef15(0x2f8)){if(_0xb76322<0x3e8)return;if(!this[_0x31ef15(0x447)])return;const _0x94cb3f=this['event'](_0x1d3e1b);_0x94cb3f[_0x31ef15(0x3b9)](-0x1,-0x1),_0x94cb3f[_0x31ef15(0x1d0)](),this[_0x31ef15(0x447)][_0x476b3a-0x3e8]=null,this[_0x31ef15(0x422)]();}else return this[_0x31ef15(0x5c9)]($gamePlayer);}if(_0x44beb2[_0x31ef15(0x6be)](/STEP TOWARD HOME/i)&&this[_0x31ef15(0x679)]){if(_0x31ef15(0x2c7)==='MBcsY'){const _0xaaba93=this[_0x31ef15(0x1eb)],_0x52d1ef=this[_0x31ef15(0x4a8)];return this['processMoveRouteStepTo'](_0xaaba93,_0x52d1ef);}else{if(this[_0x31ef15(0x56a)]===_0x37b17f)this['initEventsMoveCore']();this[_0x31ef15(0x56a)]=_0x565523;}}if(_0x44beb2[_0x31ef15(0x6be)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x31ef15(0x57c)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x44beb2['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x4a6233=$gameMap['event'](Number(RegExp['$1']));return this[_0x31ef15(0x3f9)](_0x4a6233);}if(_0x44beb2[_0x31ef15(0x6be)](/STEP AWAY FROM PLAYER/i)){if(_0x31ef15(0x54f)==='KWMti')return this['moveAwayFromCharacter']($gamePlayer);else this['_spawnedEvents']=_0x4b12f3[_0x31ef15(0x2ee)](this[_0x31ef15(0x191)]()),this['_needsRefresh']=!![];}if(_0x44beb2[_0x31ef15(0x6be)](/STEP AWAY FROM HOME/i)&&this['eventId']){const _0x339b64=this[_0x31ef15(0x1eb)],_0x31a781=this[_0x31ef15(0x4a8)];return this[_0x31ef15(0x57c)](_0x339b64,_0x31a781);}if(_0x44beb2['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x31ef15(0x48b)===_0x31ef15(0x63f))for(const _0x142292 of _0x4861cf[_0x31ef15(0x4b3)]()){_0x142292['refresh'](),_0x142292['updateEventLabelText']();}else return this[_0x31ef15(0x3c3)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x44beb2[_0x31ef15(0x6be)](/TURN TO EVENT:[ ](\d+)/i)){if('jmVRW'===_0x31ef15(0x39f)){const _0x5d2cb7=$gameMap[_0x31ef15(0x273)](Number(RegExp['$1']));return this[_0x31ef15(0x698)](_0x5d2cb7);}else{let _0x5e3964=_0x44279e[_0x31ef15(0x2f5)][_0x31ef15(0x2a9)][_0x31ef15(0x36c)](this);return this[_0x31ef15(0x235)]!==_0x5df989&&(_0x5e3964/=_0x5609fc[_0x31ef15(0x1a4)](this['_scaleY'],0.00001)),_0x36bad['floor'](_0x5e3964);}}if(_0x44beb2[_0x31ef15(0x6be)](/TURN TO PLAYER/i))return this[_0x31ef15(0x698)]($gamePlayer);if(_0x44beb2[_0x31ef15(0x6be)](/TURN TO HOME/i)&&this['eventId']){const _0x336a12=this[_0x31ef15(0x1eb)],_0x5c2d40=this[_0x31ef15(0x4a8)];return this[_0x31ef15(0x5c4)](_0x336a12,_0x5c2d40);}if(_0x44beb2[_0x31ef15(0x6be)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x44beb2[_0x31ef15(0x6be)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0xbf0697=$gameMap['event'](Number(RegExp['$1']));return this[_0x31ef15(0x487)](_0xbf0697);}if(_0x44beb2[_0x31ef15(0x6be)](/TURN AWAY FROM PLAYER/i)){if(_0x31ef15(0x4c7)==='SHjiG')return this[_0x31ef15(0x487)]($gamePlayer);else _0x4be4cb[_0x31ef15(0x2f5)][_0x31ef15(0x4e1)][_0x31ef15(0x36c)](this,_0x4d18ce);}if(_0x44beb2[_0x31ef15(0x6be)](/TURN AWAY FROM HOME/i)&&this[_0x31ef15(0x679)]){const _0x8f05fb=this['_randomHomeX'],_0x5aa44e=this[_0x31ef15(0x4a8)];return this['turnAwayFromPoint'](_0x8f05fb,_0x5aa44e);}if(_0x44beb2[_0x31ef15(0x6be)](/TURN LOWER LEFT/i))return this[_0x31ef15(0x26f)](0x1);if(_0x44beb2['match'](/TURN LOWER RIGHT/i))return this[_0x31ef15(0x26f)](0x3);if(_0x44beb2['match'](/TURN UPPER LEFT/i))return this['setDirection'](0x7);if(_0x44beb2[_0x31ef15(0x6be)](/TURN UPPER RIGHT/i)){if(_0x31ef15(0x19d)==='BCrUQ'){if(_0x320279===0x0)return _0x287d4d;return _0x20b87a['event'](_0x3106a2);}else return this[_0x31ef15(0x26f)](0x9);}if(_0x44beb2['match'](/Self Switch[ ](.*):[ ](.*)/i)){if('tmJRV'===_0x31ef15(0x451))return this[_0x31ef15(0x5d2)](RegExp['$1'],RegExp['$2']);else _0x4f8efd[_0x31ef15(0x2f5)][_0x31ef15(0x267)][_0x31ef15(0x36c)](this,_0x4317a2,_0x12fd35);}if(_0x44beb2['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x31ef15(0x64f)](RegExp['$1'],RegExp['$2']);if(_0x44beb2['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x31ef15(0x1a8)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x44beb2[_0x31ef15(0x6be)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x18966d=$gameMap['event'](Number(RegExp['$1']));return this[_0x31ef15(0x227)](_0x18966d);}if(_0x44beb2['match'](/TELEPORT TO PLAYER/i)){if(_0x31ef15(0x644)==='aebWm')this[_0x31ef15(0x229)](_0x306830,_0x29f43a);else return this[_0x31ef15(0x227)]($gamePlayer);}if(_0x44beb2['match'](/TELEPORT TO HOME/i)&&this[_0x31ef15(0x679)]){const _0x3bf046=this[_0x31ef15(0x1eb)],_0x3384ee=this[_0x31ef15(0x4a8)];return this[_0x31ef15(0x1a8)](_0x3bf046,_0x3384ee);}try{if('tSpSh'!==_0x31ef15(0x4f6))return this[_0x31ef15(0x5d5)]()[_0x31ef15(0x68a)]??0x0;else VisuMZ[_0x31ef15(0x2f5)]['Game_Character_processMoveCommand'][_0x31ef15(0x36c)](this,_0x10f88c);}catch(_0x29675d){if($gameTemp[_0x31ef15(0x6aa)]())console[_0x31ef15(0x216)](_0x29675d);}},Game_Character[_0x4f6648(0x1a3)]['processMoveRouteAnimation']=function(_0x9018b1){$gameTemp['requestAnimation']([this],_0x9018b1);},Game_Character['prototype']['processMoveRouteBalloon']=function(_0x419c01){const _0x1b9d7a=_0x4f6648;let _0x12909d=0x0;switch(_0x419c01[_0x1b9d7a(0x42b)]()[_0x1b9d7a(0x4cf)]()){case'!':case'EXCLAMATION':_0x12909d=0x1;break;case'?':case _0x1b9d7a(0x3b3):_0x12909d=0x2;break;case _0x1b9d7a(0x319):case _0x1b9d7a(0x317):case _0x1b9d7a(0x70d):case _0x1b9d7a(0x454):case'MUSICNOTE':_0x12909d=0x3;break;case _0x1b9d7a(0x6c8):case _0x1b9d7a(0x38d):_0x12909d=0x4;break;case _0x1b9d7a(0x6fd):_0x12909d=0x5;break;case _0x1b9d7a(0x623):_0x12909d=0x6;break;case _0x1b9d7a(0x51f):case _0x1b9d7a(0x5d0):case _0x1b9d7a(0x31f):_0x12909d=0x7;break;case _0x1b9d7a(0x6b6):case'...':_0x12909d=0x8;break;case'LIGHT':case _0x1b9d7a(0x67d):case _0x1b9d7a(0x53e):case _0x1b9d7a(0x388):case _0x1b9d7a(0x283):_0x12909d=0x9;break;case'Z':case'ZZ':case _0x1b9d7a(0x3a4):case _0x1b9d7a(0x26e):_0x12909d=0xa;break;case _0x1b9d7a(0x16e):_0x12909d=0xb;break;case _0x1b9d7a(0x552):_0x12909d=0xc;break;case _0x1b9d7a(0x6fe):_0x12909d=0xd;break;case _0x1b9d7a(0x207):_0x12909d=0xe;break;case _0x1b9d7a(0x480):_0x12909d=0xf;break;}$gameTemp[_0x1b9d7a(0x5b2)](this,_0x12909d);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5c3)]=function(_0xd907dc){const _0x4c06a5=_0x4f6648;_0xd907dc+=this['_opacity'],this[_0x4c06a5(0x6d9)](_0xd907dc[_0x4c06a5(0x50f)](0x0,0xff));if(this[_0x4c06a5(0x2c6)]<0xff)this[_0x4c06a5(0x203)]--;},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5af)]=function(_0x5b6e05){const _0x19762f=_0x4f6648;_0x5b6e05=this[_0x19762f(0x2c6)]-_0x5b6e05,this[_0x19762f(0x6d9)](_0x5b6e05['clamp'](0x0,0xff));if(this[_0x19762f(0x2c6)]>0x0)this['_moveRouteIndex']--;},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x594)]=function(_0x1d2eed){const _0x20d817=_0x4f6648,_0x36a87a=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x5c8fe2=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x4faedc=this['direction'](),_0x32879=(_0x1d2eed===_0x20d817(0x64d)?_0x36a87a:_0x5c8fe2)[_0x4faedc],_0x349996=(_0x1d2eed===_0x20d817(0x64d)?_0x5c8fe2:_0x36a87a)[_0x4faedc];if(this[_0x20d817(0x4f1)](this['x'],this['y'],_0x32879)){if(_0x1d2eed==='left')'iLJJj'==='iLJJj'?this[_0x20d817(0x5a2)]():this[_0x20d817(0x233)][_0x20d817(0x620)](this,arguments);else{if(_0x20d817(0x69a)!==_0x20d817(0x69a)){let _0x2a9cdf=this[_0x20d817(0x4f0)]['direction']();if(this[_0x20d817(0x4f0)][_0x20d817(0x53a)]){if(_0x2a9cdf===0x4)_0x2a9cdf=0x6;else _0x2a9cdf===0x6&&(_0x2a9cdf=0x4);}return(_0x2a9cdf-0x2)/0x2;}else this[_0x20d817(0x37e)]();}}else{if(!this['canPass'](this['x'],this['y'],this[_0x20d817(0x4dc)]())){if(this['canPass'](this['x'],this['y'],_0x349996)){if(_0x1d2eed===_0x20d817(0x64d))this[_0x20d817(0x37e)]();else{if(_0x20d817(0x614)==='TBPRK')this[_0x20d817(0x5a2)]();else{if(this['_EventIcons']===_0x3a4087)this[_0x20d817(0x66d)]();const _0x52bcc1=_0x20d817(0x17e)[_0x20d817(0x4a2)](_0x22c036,_0x3d816d);if(this[_0x20d817(0x351)][_0x52bcc1]){if(this[_0x20d817(0x351)][_0x52bcc1][_0x20d817(0x453)]<0x0)return;if(this[_0x20d817(0x351)][_0x52bcc1][_0x20d817(0x350)])return;}delete this[_0x20d817(0x351)][_0x52bcc1];}}}else _0x20d817(0x6df)!==_0x20d817(0x6df)?(_0xf7f906(_0x20d817(0x1da)[_0x20d817(0x4a2)](_0x35850f,_0xa28f71,_0x103ce2)),_0x379469[_0x20d817(0x4c0)]()):this[_0x20d817(0x55a)]();}}this['canPass'](this['x'],this['y'],this[_0x20d817(0x4dc)]())&&(_0x20d817(0x318)!==_0x20d817(0x318)?(_0x443981[_0x20d817(0x1a3)][_0x20d817(0x5f1)][_0x20d817(0x36c)](this),this[_0x20d817(0x3f0)]=![]):this[_0x20d817(0x532)]());},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x22a)]=function(_0x2a1c8f){const _0x5865f4=_0x4f6648;if(ImageManager[_0x5865f4(0x37d)](this[_0x5865f4(0x1ee)]))return;_0x2a1c8f=_0x2a1c8f[_0x5865f4(0x50f)](0x0,0x7),this[_0x5865f4(0x516)](this[_0x5865f4(0x1ee)],_0x2a1c8f);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x197)]=function(_0x72c09a){const _0x12a9c0=_0x4f6648;switch(this[_0x12a9c0(0x4dc)]()){case 0x1:this[_0x12a9c0(0x251)](-_0x72c09a,_0x72c09a);break;case 0x2:this['jump'](0x0,_0x72c09a);break;case 0x3:this[_0x12a9c0(0x251)](_0x72c09a,_0x72c09a);break;case 0x4:this[_0x12a9c0(0x251)](-_0x72c09a,0x0);break;case 0x6:this[_0x12a9c0(0x251)](_0x72c09a,0x0);break;case 0x7:this[_0x12a9c0(0x251)](-_0x72c09a,-_0x72c09a);break;case 0x8:this['jump'](0x0,-_0x72c09a);break;case 0x9:this['jump'](_0x72c09a,-_0x72c09a);break;}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x23b)]=function(_0x40be30,_0x5b2b7c){const _0x5231d5=_0x4f6648,_0x1fcc81=Math[_0x5231d5(0x6fb)](_0x40be30-this['x']),_0x1f1883=Math[_0x5231d5(0x6fb)](_0x5b2b7c-this['y']);this[_0x5231d5(0x251)](_0x1fcc81,_0x1f1883);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x42d)]=function(_0x4ca699){if(_0x4ca699)this['processMoveRouteJumpTo'](_0x4ca699['x'],_0x4ca699['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x456)]=function(_0x1eea26,_0x2dfd10,_0x1e0090){const _0x5e26b2=_0x4f6648;let _0x10ff95=0x0;if(_0x1e0090)$gameTemp[_0x5e26b2(0x52e)]=!![];$gameMap[_0x5e26b2(0x56b)]()?_0x10ff95=this[_0x5e26b2(0x553)](_0x1eea26,_0x2dfd10):_0x10ff95=this[_0x5e26b2(0x5bc)](_0x1eea26,_0x2dfd10);if(_0x1e0090)$gameTemp[_0x5e26b2(0x52e)]=![];this['executeMoveDir8'](_0x10ff95),this[_0x5e26b2(0x5f2)](!![]);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5c9)]=function(_0x17687e){const _0x3b2ef8=_0x4f6648;if(_0x17687e)this[_0x3b2ef8(0x456)](_0x17687e['x'],_0x17687e['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x29d)]=function(_0x5c726b,_0x37f3c0){const _0x23c511=_0x4f6648,_0xa5ea04=this[_0x23c511(0x24c)](_0x5c726b),_0xb36525=this[_0x23c511(0x47c)](_0x37f3c0);},Game_Character[_0x4f6648(0x1a3)]['checkCollisionKeywords']=function(_0x1e7982){const _0xa80e4b=_0x4f6648;if(_0x1e7982[_0xa80e4b(0x6be)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x1e7982[_0xa80e4b(0x6be)](/(?:AVOID|EVADE|DODGE)/i))return![];else{if('pwvoq'!==_0xa80e4b(0x5c1))return![];else this[_0xa80e4b(0x20c)]=!![],this[_0xa80e4b(0x1f8)]([0x0,0x1,0x2])&&this[_0xa80e4b(0x3a8)]();}}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x18c)]=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x4cb)],Game_Event[_0x4f6648(0x1a3)]['isCollidedWithPlayerCharacters']=function(_0x2f1b95,_0x15f038){const _0x36d108=_0x4f6648;if($gameTemp[_0x36d108(0x52e)])return![];return VisuMZ[_0x36d108(0x2f5)][_0x36d108(0x18c)][_0x36d108(0x36c)](this,_0x2f1b95,_0x15f038);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3f4)]=function(_0xffe010,_0x3fb33c){const _0x564195=_0x4f6648,_0x1984bb=['',_0x564195(0x2d8),'DOWN',_0x564195(0x368),_0x564195(0x247),'',_0x564195(0x41f),_0x564195(0x5ff),'UP','UPPER\x20RIGHT'],_0x558e68=_0x1984bb[_0x564195(0x472)](_0xffe010[_0x564195(0x42b)]()[_0x564195(0x4cf)]());if(_0x558e68<=0x0)return;if(_0x3fb33c)$gameTemp[_0x564195(0x52e)]=!![];if(this[_0x564195(0x4f1)](this['x'],this['y'],_0x558e68)){if(_0x3fb33c)$gameTemp[_0x564195(0x52e)]=![];this[_0x564195(0x513)](_0x558e68),this[_0x564195(0x203)]-=0x1;}if(_0x3fb33c)$gameTemp[_0x564195(0x52e)]=![];},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x26b)]=function(_0x4c3021,_0x5771fe,_0x3e4d5c){const _0xf120de=_0x4f6648;this['processMoveRouteStepTo'](_0x4c3021,_0x5771fe,_0x3e4d5c);if(this['x']!==_0x4c3021||this['y']!==_0x5771fe)this[_0xf120de(0x203)]--;},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x564)]=function(_0x2cf2d6,_0x42799d){const _0x565213=_0x4f6648;if(_0x2cf2d6&&!_0x2cf2d6[_0x565213(0x2ec)]){if(_0x565213(0x1ac)===_0x565213(0x43d)){const _0x2c7d53=_0x1bcc30?_0x28a336[_0x565213(0x191)]():0x0,_0xb102c4=[0x0,0x0,_0x565213(0x281)[_0x565213(0x4a2)](_0x2c7d53,_0x112af2)];return _0x1c51e5[_0x565213(0x298)](_0xb102c4)||0x0;}else{this[_0x565213(0x26b)](_0x2cf2d6['x'],_0x2cf2d6['y'],_0x42799d);if(_0x2cf2d6[_0x565213(0x27d)]()&&this[_0x565213(0x27d)]()){const _0x5d728f=$gameMap[_0x565213(0x572)](this['x'],this['y'],_0x2cf2d6['x'],_0x2cf2d6['y']);if(_0x5d728f<=0x1)this[_0x565213(0x203)]++;}}}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5c0)]=function(_0x1dd1a7,_0x4b4a72){const _0x3df6cf=_0x4f6648;_0x4b4a72=_0x4b4a72||0x0;const _0x3eb0d5={'code':0x1,'indent':null,'parameters':[]};_0x3eb0d5[_0x3df6cf(0x25f)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x1dd1a7],this[_0x3df6cf(0x1cc)]['list'][this['_moveRouteIndex']][_0x3df6cf(0x19a)][0x0]='';while(_0x4b4a72--){if(_0x3df6cf(0x1fb)===_0x3df6cf(0x1fb))this[_0x3df6cf(0x1cc)][_0x3df6cf(0x17f)][_0x3df6cf(0x577)](this[_0x3df6cf(0x203)]+0x1,0x0,_0x3eb0d5);else{if(!this['_activationProximity'])return _0x3df6cf(0x657);return this['_activationProximity']['type']||'none';}}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x258)]=function(_0x1257ad){const _0x20ff39=_0x4f6648;this[_0x20ff39(0x4ff)]=!![],this['setPattern'](_0x1257ad);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5d2)]=function(_0x39c0cc,_0x58f1ad){const _0xb68c22=_0x4f6648;if(this===$gamePlayer)return;const _0x31fe77=[this[_0xb68c22(0x527)],this[_0xb68c22(0x575)],'A'];if(_0x39c0cc[_0xb68c22(0x6be)](/\b[ABCD]\b/i))_0x31fe77[0x2]=String(_0x39c0cc)['charAt'](0x0)['toUpperCase']()['trim']();else{if('foCRE'!=='foCRE'){const _0x2fa9b6=this[_0xb68c22(0x2c6)]+_0x24dbfe(_0x4459d8['$1']);return this[_0xb68c22(0x6d9)](_0x2fa9b6[_0xb68c22(0x50f)](0x0,0xff));}else _0x31fe77[0x2]=_0xb68c22(0x27e)[_0xb68c22(0x4a2)](_0x39c0cc);}switch(_0x58f1ad[_0xb68c22(0x42b)]()[_0xb68c22(0x4cf)]()){case'ON':case'TRUE':$gameSelfSwitches[_0xb68c22(0x1b5)](_0x31fe77,!![]);break;case _0xb68c22(0x5bd):case _0xb68c22(0x1a0):$gameSelfSwitches[_0xb68c22(0x1b5)](_0x31fe77,![]);break;case _0xb68c22(0x4d5):$gameSelfSwitches['setValue'](_0x31fe77,!$gameSelfSwitches[_0xb68c22(0x298)](_0x31fe77));break;}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x64f)]=function(_0x5512b3,_0x1b71a7){const _0x360bdd=_0x4f6648;if(this===$gamePlayer)return;const _0x2a984f=[this[_0x360bdd(0x527)],this[_0x360bdd(0x575)],_0x360bdd(0x167)[_0x360bdd(0x4a2)](_0x5512b3)];$gameSelfSwitches['setValue'](_0x2a984f,Number(_0x1b71a7));},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x1a8)]=function(_0x4b0359,_0xceeb7){const _0x4d8015=_0x4f6648;this[_0x4d8015(0x3b9)](_0x4b0359,_0xceeb7);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x227)]=function(_0x4de15e){const _0x13af96=_0x4f6648;if(_0x4de15e)this[_0x13af96(0x1a8)](_0x4de15e['x'],_0x4de15e['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x37e)]=function(){const _0x4ccde6=_0x4f6648;switch(this['direction']()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0x4ccde6(0x26f)](0x4);break;case 0x3:this[_0x4ccde6(0x26f)](0x1);break;case 0x4:this[_0x4ccde6(0x26f)](0x8);break;case 0x6:this[_0x4ccde6(0x26f)](0x2);break;case 0x7:this[_0x4ccde6(0x26f)](0x9);break;case 0x8:this[_0x4ccde6(0x26f)](0x6);break;case 0x9:this[_0x4ccde6(0x26f)](0x3);break;}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5a2)]=function(){const _0x25a2a7=_0x4f6648;switch(this[_0x25a2a7(0x4dc)]()){case 0x1:this[_0x25a2a7(0x26f)](0x3);break;case 0x2:this[_0x25a2a7(0x26f)](0x6);break;case 0x3:this[_0x25a2a7(0x26f)](0x9);break;case 0x4:this[_0x25a2a7(0x26f)](0x2);break;case 0x6:this[_0x25a2a7(0x26f)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x25a2a7(0x26f)](0x4);break;case 0x9:this['setDirection'](0x7);break;}},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x4ca)]=function(_0x12b061,_0x5a163a,_0x29333a){const _0x26380e=_0x4f6648,_0x13ddfd=this[_0x26380e(0x24c)](_0x12b061),_0x1be57c=this['deltaYFrom'](_0x5a163a);if($gameMap[_0x26380e(0x56b)]()){if(_0x29333a||this[_0x26380e(0x3cd)]()){if(_0x26380e(0x3be)!==_0x26380e(0x521)){if(_0x13ddfd>0x0&&_0x1be57c<0x0)return 0x1;if(_0x13ddfd<0x0&&_0x1be57c<0x0)return 0x3;if(_0x13ddfd>0x0&&_0x1be57c>0x0)return 0x7;if(_0x13ddfd<0x0&&_0x1be57c>0x0)return 0x9;}else{const _0x5ad8a7=_0x15a010[_0x26380e(0x5b9)]();delete this['_data'][_0x5ad8a7];}}}if(Math['abs'](_0x13ddfd)>Math[_0x26380e(0x5e0)](_0x1be57c))return _0x13ddfd>0x0?0x4:0x6;else{if(_0x1be57c!==0x0)return _0x1be57c>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x68e)]=function(_0x2e90ff,_0x24c060,_0x2c16b4){const _0x5935a6=_0x4f6648,_0x853c3c=this[_0x5935a6(0x24c)](_0x2e90ff),_0x2bb78d=this[_0x5935a6(0x47c)](_0x24c060);if($gameMap['isSupportDiagonalMovement']()){if(_0x2c16b4||this[_0x5935a6(0x3cd)]()){if(_0x853c3c>0x0&&_0x2bb78d<0x0)return 0x9;if(_0x853c3c<0x0&&_0x2bb78d<0x0)return 0x7;if(_0x853c3c>0x0&&_0x2bb78d>0x0)return 0x3;if(_0x853c3c<0x0&&_0x2bb78d>0x0)return 0x1;}}if(Math[_0x5935a6(0x5e0)](_0x853c3c)>Math[_0x5935a6(0x5e0)](_0x2bb78d)){if('bReLH'===_0x5935a6(0x701))return _0x853c3c>0x0?0x6:0x4;else{this['_needsPeriodicRefresh']=!![];return;}}else{if(_0x2bb78d!==0x0)return _0x2bb78d>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x4f6648(0x3c3)]=function(_0x5eebbe,_0x308289){const _0x2da17d=_0x4f6648,_0x2d83a5=this[_0x2da17d(0x4ca)](_0x5eebbe,_0x308289,!![]);if(_0x2d83a5)this[_0x2da17d(0x513)](_0x2d83a5);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x57c)]=function(_0x24b1fd,_0x57d16e){const _0x4d10ef=_0x4f6648,_0x76ba86=this['getDirectionFromPoint'](_0x24b1fd,_0x57d16e,!![]);if(_0x76ba86)this[_0x4d10ef(0x513)](_0x76ba86);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5c4)]=function(_0x24e2c0,_0x49724e){const _0x3baf31=_0x4f6648,_0x5dc378=this[_0x3baf31(0x4ca)](_0x24e2c0,_0x49724e,![]);if(_0x5dc378)this['setDirection'](_0x5dc378);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x537)]=function(_0x144100,_0x267c95){const _0x5a6cd7=_0x4f6648,_0x54398c=this[_0x5a6cd7(0x68e)](_0x144100,_0x267c95,![]);if(_0x54398c)this[_0x5a6cd7(0x26f)](_0x54398c);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3ad)]=function(_0x464c35){const _0x2f756e=_0x4f6648;if(_0x464c35)this[_0x2f756e(0x3c3)](_0x464c35['x'],_0x464c35['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3f9)]=function(_0x2dd3d1){const _0xd7388=_0x4f6648;if(_0x2dd3d1)this[_0xd7388(0x57c)](_0x2dd3d1['x'],_0x2dd3d1['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x698)]=function(_0xf290b6){const _0x45dbf7=_0x4f6648;if(_0xf290b6)this[_0x45dbf7(0x5c4)](_0xf290b6['x'],_0xf290b6['y']);},Game_Character[_0x4f6648(0x1a3)][_0x4f6648(0x487)]=function(_0x376a43){if(_0x376a43)this['turnAwayFromPoint'](_0x376a43['x'],_0x376a43['y']);},VisuMZ['EventsMoveCore'][_0x4f6648(0x312)]=Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x5de)],Game_Player[_0x4f6648(0x1a3)]['isDashing']=function(){const _0x6e2ed2=_0x4f6648;if(!Game_CharacterBase[_0x6e2ed2(0x602)]&&this[_0x6e2ed2(0x598)]())return![];if(this[_0x6e2ed2(0x4e3)])return!![];return VisuMZ['EventsMoveCore']['Game_Player_isDashing'][_0x6e2ed2(0x36c)](this);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x1c6)]=Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x486)],Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x486)]=function(){const _0x42c517=_0x4f6648;if($gameMap['isSupportDiagonalMovement']())return this[_0x42c517(0x6b3)]();else{if(_0x42c517(0x49c)===_0x42c517(0x49c))return VisuMZ[_0x42c517(0x2f5)][_0x42c517(0x1c6)][_0x42c517(0x36c)](this);else{_0x4636ff['ConvertParams'](_0x5224ef,_0x51f6b6);const _0x5510f4=_0x3d98c2[_0x42c517(0x684)](),_0x251b72=_0x4bddfc[_0x42c517(0x38f)]||_0x259be6[_0x42c517(0x191)](),_0x4f15d9=_0x46d94b[_0x42c517(0x60f)]||_0x5510f4[_0x42c517(0x679)]();_0x153192[_0x42c517(0x41a)](_0x251b72,_0x4f15d9);}}},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x6b3)]=function(){const _0x4510af=_0x4f6648;return Input[_0x4510af(0x3eb)];},Game_Player[_0x4f6648(0x1a3)]['moveByInput']=function(){const _0x53b183=_0x4f6648;if($gameSystem[_0x53b183(0x39c)]())return 0x0;if(!this[_0x53b183(0x1db)]()&&this[_0x53b183(0x2a6)]()){if(_0x53b183(0x4ad)!=='MiDGT')return _0x2c0407[_0x53b183(0x4b8)]();else{let _0x17181b=this[_0x53b183(0x486)]();if(_0x17181b>0x0)$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){if('nkGaZ'==='nkGaZ'){const _0x41bf80=$gameTemp['destinationX'](),_0x3d8ba6=$gameTemp[_0x53b183(0x653)]();if(this[_0x53b183(0x6eb)](_0x41bf80,_0x3d8ba6)){if('ZdNMR'===_0x53b183(0x3b7)){if(_0xbe873e[this[_0x53b183(0x6c2)]])this[_0x53b183(0x2f2)]='',this['startCallEvent']();else return!![];}else _0x17181b=this[_0x53b183(0x553)](_0x41bf80,_0x3d8ba6);}else{if(_0x53b183(0x501)===_0x53b183(0x501))_0x17181b=this[_0x53b183(0x5bc)](_0x41bf80,_0x3d8ba6);else{const _0x6c757f=_0x301f73[_0x53b183(0x212)];this[_0x53b183(0x651)]=this['events']()[_0x53b183(0x685)]>_0x6c757f;if(this[_0x53b183(0x651)]&&_0x50793d[_0x53b183(0x6aa)]()){}}}}else return this[_0x53b183(0x323)]['filename'];}}_0x17181b>0x0?(this[_0x53b183(0x506)]=this['_inputTime']||0x0,this[_0x53b183(0x48d)]()?_0x53b183(0x1a7)==='RQtoV'?this[_0x53b183(0x26f)](_0x17181b):this[_0x53b183(0x2dc)]=_0x4afa91(_0x3cf674['$1'])*0.01:this['executeMove'](_0x17181b),this[_0x53b183(0x506)]++):_0x53b183(0x6e2)!=='CyYzo'?this['_textSprite'][_0x53b183(0x4fc)]['destroy']():this[_0x53b183(0x506)]=0x0;}}},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x48d)]=function(){const _0x4457ed=_0x4f6648,_0x204897=VisuMZ[_0x4457ed(0x2f5)][_0x4457ed(0x3fc)][_0x4457ed(0x3ae)];if(!_0x204897[_0x4457ed(0x24d)])return![];if($gameTemp['isDestinationValid']())return![];if(this['isDashing']()||this['isMoving']()||this['isOnLadder']())return![];return this[_0x4457ed(0x506)]<_0x204897[_0x4457ed(0x51a)];},VisuMZ['EventsMoveCore'][_0x4f6648(0x6f3)]=Game_Player[_0x4f6648(0x1a3)]['executeMove'],Game_Player['prototype'][_0x4f6648(0x174)]=function(_0x72db16){const _0x42dfb6=_0x4f6648;$gameMap[_0x42dfb6(0x56b)]()?this['executeMoveDir8'](_0x72db16):VisuMZ[_0x42dfb6(0x2f5)]['Game_Player_executeMove'][_0x42dfb6(0x36c)](this,_0x72db16);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x28d)]=Game_Player[_0x4f6648(0x1a3)]['isMapPassable'],Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x429)]=function(_0x1d3627,_0x1e2ef2,_0x18a4a3){const _0x375d1a=_0x4f6648;if($gameMap[_0x375d1a(0x6ad)](_0x1d3627,_0x1e2ef2,_0x18a4a3,_0x375d1a(0x1a2))){if(_0x375d1a(0x1c4)===_0x375d1a(0x1c4)){if(this[_0x375d1a(0x50d)]()&&this[_0x375d1a(0x420)]())return _0x375d1a(0x634)!==_0x375d1a(0x3d5)?this['vehicle']()[_0x375d1a(0x429)](_0x1d3627,_0x1e2ef2,_0x18a4a3):_0x3e356e[_0x375d1a(0x2f5)]['Settings']['Label'][_0x375d1a(0x463)];else{if(_0x375d1a(0x21e)!==_0x375d1a(0x21e)){const _0x2bc3e9=_0x2e76c5[_0x375d1a(0x6fb)](_0xc4f930-this['x']),_0x4af74c=_0x5010e9[_0x375d1a(0x6fb)](_0x5afd40-this['y']);this[_0x375d1a(0x251)](_0x2bc3e9,_0x4af74c);}else return!![];}}else this[_0x375d1a(0x6af)]['iconIndex']=_0x5ea79f(_0x6c9742['$1']);}if($gameMap[_0x375d1a(0x4ed)](_0x1d3627,_0x1e2ef2,_0x18a4a3,'player'))return![];return VisuMZ[_0x375d1a(0x2f5)][_0x375d1a(0x28d)][_0x375d1a(0x36c)](this,_0x1d3627,_0x1e2ef2,_0x18a4a3);},VisuMZ[_0x4f6648(0x2f5)]['Game_Player_checkEventTriggerHere']=Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x67a)],Game_Player[_0x4f6648(0x1a3)]['checkEventTriggerHere']=function(_0xc5f72f){const _0x203524=_0x4f6648;VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere'][_0x203524(0x36c)](this,_0xc5f72f);if(this[_0x203524(0x1bf)]()){this[_0x203524(0x49b)](_0xc5f72f);if(_0xc5f72f[_0x203524(0x328)](0x0)&&this[_0x203524(0x3e0)]()===_0x203524(0x522)){if('cfYzp'==='cfYzp')this['startMapCommonEventOnOK'](this['x'],this['y']);else return _0x2556fc>=0x3e8?(_0x56974-=0x3e8,this[_0x203524(0x447)][_0x3b40e8]):_0x63eb2f[_0x203524(0x2f5)][_0x203524(0x674)][_0x203524(0x36c)](this,_0x19a182);}else{if(_0xc5f72f[_0x203524(0x328)](0x1)||_0xc5f72f['includes'](0x2)){if(_0x203524(0x249)===_0x203524(0x249))this[_0x203524(0x2d1)]();else{if(this['_EventIcons']===_0x3c1f9a)this[_0x203524(0x66d)]();if(!_0x18a911)return null;_0x55fad9===_0xd7a8d?delete this[_0x203524(0x351)][_0x203524(0x3f7)]:this[_0x203524(0x5ec)](_0x21d031[_0x203524(0x527)],_0xc3d8ea[_0x203524(0x575)]);}}}}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x200)],Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x200)]=function(_0x638f7d){const _0x3c8c65=_0x4f6648;VisuMZ['EventsMoveCore'][_0x3c8c65(0x2ab)]['call'](this,_0x638f7d);if(this[_0x3c8c65(0x1bf)]()&&_0x638f7d[_0x3c8c65(0x328)](0x0)&&this[_0x3c8c65(0x3e0)]()==='front'){const _0x2782d7=this['direction'](),_0x3da9f7=$gameMap[_0x3c8c65(0x579)](this['x'],_0x2782d7),_0x2872e5=$gameMap[_0x3c8c65(0x6a6)](this['y'],_0x2782d7);this['startMapCommonEventOnOK'](_0x3da9f7,_0x2872e5);}},Game_Player['prototype'][_0x4f6648(0x49b)]=function(_0xcbd49a){const _0x4cd4b9=_0x4f6648;if($gameMap['isEventRunning']())return;if($gameMap[_0x4cd4b9(0x219)]())return;const _0x23c2dd=$gameMap[_0x4cd4b9(0x4b3)]();for(const _0x3999c5 of _0x23c2dd){if(_0x4cd4b9(0x3b0)===_0x4cd4b9(0x3b0)){if(!_0x3999c5)continue;if(!_0x3999c5[_0x4cd4b9(0x1f8)](_0xcbd49a))continue;if(this[_0x4cd4b9(0x262)](_0x3999c5))return _0x3999c5[_0x4cd4b9(0x5bf)]();if(this['meetActivationProximityConditions'](_0x3999c5))return _0x3999c5[_0x4cd4b9(0x5bf)]();}else{let _0x449af8=this[_0x4cd4b9(0x230)];return this['isDashing']()&&(_0x449af8+=this['dashSpeedModifier']()),this[_0x4cd4b9(0x279)](_0x449af8);}}},Game_Player['prototype']['meetActivationRegionConditions']=function(_0x493fe5){const _0x4edd60=_0x4f6648;if($gameMap['isEventRunning']())return![];if($gameMap[_0x4edd60(0x219)]())return![];return _0x493fe5[_0x4edd60(0x2c2)]()[_0x4edd60(0x328)](this[_0x4edd60(0x4de)]());},Game_Player['prototype'][_0x4f6648(0x31e)]=function(_0x4ffb5e){const _0x4efe0c=_0x4f6648;if($gameMap[_0x4efe0c(0x339)]())return![];if($gameMap[_0x4efe0c(0x219)]())return![];if([_0x4efe0c(0x657),_0x4efe0c(0x2f1)]['includes'](_0x4ffb5e[_0x4efe0c(0x27a)]()))return![];const _0x1da404=_0x4ffb5e[_0x4efe0c(0x27a)](),_0x279101=_0x4ffb5e[_0x4efe0c(0x265)]();return this[_0x4efe0c(0x2e4)](_0x4ffb5e,_0x1da404,_0x279101);},Game_Map['prototype'][_0x4f6648(0x2e4)]=function(_0x2a0ea5,_0x225983,_0x7f8d3f,_0x3e29bc,_0x521432){const _0x54bffd=_0x4f6648;switch(_0x3e29bc){case'square':return _0x521432>=Math[_0x54bffd(0x5e0)](_0x7f8d3f['deltaXFrom'](_0x2a0ea5))&&_0x521432>=Math[_0x54bffd(0x5e0)](_0x7f8d3f[_0x54bffd(0x47c)](_0x225983));break;case _0x54bffd(0x503):const _0x37155b=Math[_0x54bffd(0x63e)](_0x7f8d3f['x']-_0x2a0ea5,0x2),_0x3fd180=Math[_0x54bffd(0x63e)](_0x7f8d3f['y']-_0x225983,0x2);return _0x521432>=Math['round'](Math[_0x54bffd(0x277)](_0x37155b+_0x3fd180));break;case _0x54bffd(0x545):case _0x54bffd(0x525):const _0x4b301e=$gameMap[_0x54bffd(0x572)](_0x2a0ea5,_0x225983,_0x7f8d3f['x'],_0x7f8d3f['y']);return _0x7f8d3f[_0x54bffd(0x265)]()>=_0x4b301e;break;case _0x54bffd(0x595):return _0x521432>=Math['abs'](_0x7f8d3f[_0x54bffd(0x47c)](_0x225983));break;case'column':return _0x521432>=Math[_0x54bffd(0x5e0)](_0x7f8d3f[_0x54bffd(0x24c)](_0x2a0ea5));break;}return![];},Game_Player['prototype']['checkEventProximity']=function(_0x150001,_0x193bf6,_0x443e6c){const _0x4743d4=_0x4f6648,_0x413bb0=this['x'],_0x424949=this['y'];return $gameMap[_0x4743d4(0x2e4)](_0x413bb0,_0x424949,_0x150001,_0x193bf6,_0x443e6c);},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x6e6)]=function(_0xf1bfbe,_0x59ac3f){const _0x7725d0=_0x4f6648;if($gameMap[_0x7725d0(0x339)]())return;if($gameMap[_0x7725d0(0x219)]())return;let _0x332dfe=VisuMZ['EventsMoveCore'][_0x7725d0(0x3fc)]['RegionOk'],_0x19dc69=$gameMap[_0x7725d0(0x4de)](_0xf1bfbe,_0x59ac3f);const _0x3ff4e3='Region%1'[_0x7725d0(0x4a2)](_0x19dc69);_0x332dfe[_0x3ff4e3]&&$gameTemp['reserveCommonEvent'](_0x332dfe[_0x3ff4e3]);},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x3e0)]=function(){const _0x940185=_0x4f6648;return VisuMZ['EventsMoveCore'][_0x940185(0x3fc)][_0x940185(0x3da)];},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x2d1)]=function(){const _0x13d5b2=_0x4f6648;if($gameMap['isEventRunning']())return;if($gameMap[_0x13d5b2(0x219)]())return;let _0x3d6ee0=VisuMZ['EventsMoveCore'][_0x13d5b2(0x3fc)][_0x13d5b2(0x236)];const _0x1f1c49=_0x13d5b2(0x31c)[_0x13d5b2(0x4a2)](this[_0x13d5b2(0x4de)]());_0x3d6ee0[_0x1f1c49]&&$gameTemp[_0x13d5b2(0x589)](_0x3d6ee0[_0x1f1c49]);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x6e9)]=Game_Player['prototype'][_0x4f6648(0x1ba)],Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x1ba)]=function(){const _0x16e099=_0x4f6648;VisuMZ[_0x16e099(0x2f5)][_0x16e099(0x6e9)][_0x16e099(0x36c)](this),VisuMZ[_0x16e099(0x5dc)](0x0);},Game_Player[_0x4f6648(0x1a3)][_0x4f6648(0x27c)]=function(){VisuMZ['FaceSynchAllSynchTargets'](0x0);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x6cd)]=Game_Follower['prototype'][_0x4f6648(0x233)],Game_Follower[_0x4f6648(0x1a3)][_0x4f6648(0x233)]=function(_0xcb7038){const _0x3f420f=_0x4f6648;VisuMZ[_0x3f420f(0x2f5)]['Game_Follower_initialize'][_0x3f420f(0x36c)](this,_0xcb7038),this[_0x3f420f(0x60c)]=![];},Game_Follower[_0x4f6648(0x1a3)][_0x4f6648(0x5de)]=function(){const _0xf2ae56=_0x4f6648;if(this[_0xf2ae56(0x60c)])return Game_Character[_0xf2ae56(0x1a3)]['isDashing'][_0xf2ae56(0x36c)](this);return $gamePlayer[_0xf2ae56(0x5de)]();},Game_Follower['prototype']['isDashingAndMoving']=function(){const _0x32b867=_0x4f6648;if(this[_0x32b867(0x60c)])return Game_Character[_0x32b867(0x1a3)][_0x32b867(0x509)][_0x32b867(0x36c)](this);return $gamePlayer[_0x32b867(0x509)]()&&this['_actuallyMoving'];},Game_Follower[_0x4f6648(0x1a3)]['realMoveSpeed']=function(){const _0xb12f8=_0x4f6648;return $gamePlayer[_0xb12f8(0x4b8)]();},Game_Follower[_0x4f6648(0x1a3)]['updateStop']=function(){const _0x5f417b=_0x4f6648;Game_Character[_0x5f417b(0x1a3)]['updateStop'][_0x5f417b(0x36c)](this),this[_0x5f417b(0x693)]>0x0&&(this[_0x5f417b(0x218)]=![]);},Game_Follower[_0x4f6648(0x1a3)][_0x4f6648(0x68f)]=function(_0xd3987){this['_chaseOff']=_0xd3987;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x417)]=Game_Follower[_0x4f6648(0x1a3)]['chaseCharacter'],Game_Follower['prototype'][_0x4f6648(0x720)]=function(_0x3110f8){const _0x44d7e9=_0x4f6648;if(this['_chaseOff'])return;if($gameSystem[_0x44d7e9(0x2cc)]())return;VisuMZ['EventsMoveCore']['Game_Follower_chaseCharacter']['call'](this,_0x3110f8),this[_0x44d7e9(0x218)]=!![];},VisuMZ[_0x4f6648(0x2f5)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x4f6648(0x1a3)][_0x4f6648(0x429)],Game_Vehicle[_0x4f6648(0x1a3)][_0x4f6648(0x429)]=function(_0x3f3bdc,_0x55e70d,_0x4c3440){const _0x3025b1=_0x4f6648;if($gameMap['isRegionAllowPass'](_0x3f3bdc,_0x55e70d,_0x4c3440,this[_0x3025b1(0x705)]))return!![];if($gameMap[_0x3025b1(0x4ed)](_0x3f3bdc,_0x55e70d,_0x4c3440,this[_0x3025b1(0x705)]))return![];return VisuMZ[_0x3025b1(0x2f5)]['Game_Vehicle_isMapPassable'][_0x3025b1(0x36c)](this,_0x3f3bdc,_0x55e70d,_0x4c3440);},Game_Vehicle['prototype']['isAirshipPassable']=function(_0x57cab2,_0x403633,_0x282670){const _0x38a32c=_0x4f6648;if($gameMap[_0x38a32c(0x6ad)](_0x57cab2,_0x403633,_0x282670,this[_0x38a32c(0x705)]))return!![];if($gameMap[_0x38a32c(0x4ed)](_0x57cab2,_0x403633,_0x282670,this[_0x38a32c(0x705)]))return![];return VisuMZ[_0x38a32c(0x2f5)]['Game_CharacterBase_canPass']['call']($gamePlayer,_0x57cab2,_0x403633,_0x282670);},VisuMZ['EventsMoveCore'][_0x4f6648(0x518)]=Game_Vehicle[_0x4f6648(0x1a3)][_0x4f6648(0x421)],Game_Vehicle[_0x4f6648(0x1a3)][_0x4f6648(0x421)]=function(_0x2364f8,_0x538837,_0x42bd5e){const _0x418a2a=_0x4f6648;if($gameMap[_0x418a2a(0x702)](_0x2364f8,_0x538837,_0x42bd5e,this[_0x418a2a(0x705)]))return!![];const _0x305440=this[_0x418a2a(0x705)][_0x418a2a(0x1fc)](0x0)['toUpperCase']()+this[_0x418a2a(0x705)][_0x418a2a(0x427)](0x1),_0x145f36=_0x418a2a(0x397)[_0x418a2a(0x4a2)](_0x305440);return VisuMZ['EventsMoveCore'][_0x418a2a(0x3fc)]['Region'][_0x145f36]?![]:VisuMZ[_0x418a2a(0x2f5)][_0x418a2a(0x518)][_0x418a2a(0x36c)](this,_0x2364f8,_0x538837,_0x42bd5e);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4c6)]=Game_Vehicle['prototype'][_0x4f6648(0x62a)],Game_Vehicle[_0x4f6648(0x1a3)][_0x4f6648(0x62a)]=function(){const _0x56fb8b=_0x4f6648;VisuMZ[_0x56fb8b(0x2f5)][_0x56fb8b(0x4c6)][_0x56fb8b(0x36c)](this);const _0x53a87e=VisuMZ[_0x56fb8b(0x2f5)][_0x56fb8b(0x3fc)][_0x56fb8b(0x3ae)];if(this['isBoat']()){if(_0x53a87e[_0x56fb8b(0x6a0)])this[_0x56fb8b(0x4d6)](_0x53a87e[_0x56fb8b(0x6a0)]);}else{if(this[_0x56fb8b(0x681)]()){if(_0x53a87e[_0x56fb8b(0x4f5)])this[_0x56fb8b(0x4d6)](_0x53a87e[_0x56fb8b(0x4f5)]);}else{if(this['isAirship']()){if(_0x56fb8b(0x4c8)==='PzAdF')_0x4a3e88[0x2][_0x56fb8b(0x6be)](/(?:SELF|MAP)/i)?this['setSelfValue'](_0x20dda3,_0x39d6d2):_0x301e22[_0x56fb8b(0x2f5)][_0x56fb8b(0x228)][_0x56fb8b(0x36c)](this,_0x1bc115,_0x51ef46);else{if(_0x53a87e[_0x56fb8b(0x20a)])this[_0x56fb8b(0x4d6)](_0x53a87e[_0x56fb8b(0x20a)]);}}}}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x1df)]=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x233)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x233)]=function(_0x41d14e,_0x377f5a){const _0x425c8c=_0x4f6648;VisuMZ[_0x425c8c(0x2f5)][_0x425c8c(0x1df)][_0x425c8c(0x36c)](this,_0x41d14e,_0x377f5a),this['setupCopyEvent'](),this[_0x425c8c(0x370)](),this[_0x425c8c(0x683)]();},Game_Map[_0x4f6648(0x1a3)]['referEvent']=function(_0x2d1892,_0x24880c){const _0x1a8315=_0x4f6648;return _0x2d1892===$gameMap['mapId']()?$dataMap['events'][_0x24880c]:VisuMZ[_0x1a8315(0x712)][_0x2d1892][_0x1a8315(0x4b3)][_0x24880c];},VisuMZ['EventsMoveCore']['Game_Event_event']=Game_Event['prototype']['event'],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x273)]=function(){const _0x3aec29=_0x4f6648;if(this['_eventMorphData']!==undefined){if(_0x3aec29(0x583)===_0x3aec29(0x583)){const _0x3c7571=this[_0x3aec29(0x533)][_0x3aec29(0x191)],_0x42b2ed=this[_0x3aec29(0x533)][_0x3aec29(0x679)];return $gameMap[_0x3aec29(0x57a)](_0x3c7571,_0x42b2ed);}else return _0xabafaa[_0x3aec29(0x2f5)]['Game_CharacterBase_realMoveSpeed'][_0x3aec29(0x36c)](this)-this['_moveSpeed'];}if(this[_0x3aec29(0x555)]!==undefined){const _0x57a375=this[_0x3aec29(0x555)]['mapId'],_0x964427=this[_0x3aec29(0x555)][_0x3aec29(0x679)];return $gameMap[_0x3aec29(0x57a)](_0x57a375,_0x964427);}if(this['_eventSpawnData']!==undefined){if('vpUQz'!==_0x3aec29(0x6dd)){_0x241473['ConvertParams'](_0x4b7edd,_0x1bc1f4);const _0x7baa87=_0x14a3e7['MapId']||_0x30c7c4[_0x3aec29(0x191)]();_0x56612e[_0x3aec29(0x600)](_0x7baa87);}else{const _0x115928=this[_0x3aec29(0x4c1)][_0x3aec29(0x191)],_0xfacf49=this[_0x3aec29(0x4c1)][_0x3aec29(0x679)];return $gameMap[_0x3aec29(0x57a)](_0x115928,_0xfacf49);}}if($gameTemp[_0x3aec29(0x3e9)]!==undefined){const _0x11584f=$gameTemp[_0x3aec29(0x3e9)][_0x3aec29(0x191)],_0x5851cb=$gameTemp['_spawnData']['eventId'];return $gameMap[_0x3aec29(0x57a)](_0x11584f,_0x5851cb);}return VisuMZ['EventsMoveCore'][_0x3aec29(0x708)][_0x3aec29(0x36c)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3f2)]=function(_0x33af1b,_0x58d993){const _0x4bffee=_0x4f6648;if(_0x33af1b===0x0||_0x58d993===0x0)return![];if(_0x33af1b===$gameMap['mapId']())return!![];if(!VisuMZ[_0x4bffee(0x712)][_0x33af1b]&&_0x33af1b!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&('RyNCh'===_0x4bffee(0x6a7)?_0x2ed4f8[_0x4bffee(0x1b5)](_0x216048,!!_0x1292fc):console[_0x4bffee(0x216)](_0x4bffee(0x455)[_0x4bffee(0x4a2)](_0x33af1b))),![];return!![];},VisuMZ[_0x4f6648(0x2f5)]['Game_Event_start']=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x5bf)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x5bf)]=function(){const _0x1f118e=_0x4f6648;VisuMZ[_0x1f118e(0x2f5)][_0x1f118e(0x549)][_0x1f118e(0x36c)](this),Imported[_0x1f118e(0x4e8)]&&Input[_0x1f118e(0x60b)](VisuMZ[_0x1f118e(0x205)][_0x1f118e(0x3fc)][_0x1f118e(0x3cf)][_0x1f118e(0x307)])&&Input['clear']();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x6b7)]=function(){const _0x564402=_0x4f6648,_0x17800b=this[_0x564402(0x273)]()['note'];if(_0x17800b==='')return;if(DataManager['isBattleTest']()||DataManager['isEventTest']())return;const _0x3e9227=VisuMZ[_0x564402(0x2f5)]['Settings']['Template'];let _0x26d29c=null,_0x3a0c4b=0x0,_0x407321=0x0;if(_0x17800b[_0x564402(0x6be)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x3a0c4b=Number(RegExp['$1']),_0x407321=Number(RegExp['$2']);if(_0x3a0c4b===0x0)_0x3a0c4b=$gameMap[_0x564402(0x191)]();}else{if(_0x17800b['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x3a0c4b=Number(RegExp['$1']),_0x407321=Number(RegExp['$2']);if(_0x3a0c4b===0x0)_0x3a0c4b=$gameMap[_0x564402(0x191)]();}else{if(_0x17800b[_0x564402(0x6be)](/<COPY EVENT:[ ](.*?)>/i)){const _0x227bb7=String(RegExp['$1'])['toUpperCase']()[_0x564402(0x4cf)]();_0x26d29c=VisuMZ[_0x564402(0x437)][_0x227bb7];if(!_0x26d29c)return;_0x3a0c4b=_0x26d29c[_0x564402(0x649)],_0x407321=_0x26d29c[_0x564402(0x31b)];}}}if(!this[_0x564402(0x3f2)](_0x3a0c4b,_0x407321))return;_0x3e9227[_0x564402(0x36d)][_0x564402(0x36c)](this,_0x3a0c4b,_0x407321,this);if(_0x26d29c)_0x26d29c[_0x564402(0x36d)][_0x564402(0x36c)](this,_0x3a0c4b,_0x407321,this);this[_0x564402(0x555)]={'mapId':_0x3a0c4b,'eventId':_0x407321},this['_pageIndex']=-0x2,this['refresh'](),_0x3e9227[_0x564402(0x2d6)][_0x564402(0x36c)](this,_0x3a0c4b,_0x407321,this);if(_0x26d29c)_0x26d29c[_0x564402(0x2d6)][_0x564402(0x36c)](this,_0x3a0c4b,_0x407321,this);$gameMap[_0x564402(0x422)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x370)]=function(){const _0x13da57=_0x4f6648,_0x163708=$gameSystem[_0x13da57(0x4d9)](this);if(!_0x163708)return;const _0x18f5dd=_0x163708[_0x13da57(0x44e)][_0x13da57(0x42b)]()[_0x13da57(0x4cf)]();_0x18f5dd!==_0x13da57(0x32b)?this[_0x13da57(0x3d2)](_0x18f5dd,!![]):this[_0x13da57(0x6cf)](_0x163708['mapId'],_0x163708['eventId'],!![]);},Game_Event[_0x4f6648(0x1a3)]['morphInto']=function(_0x211faf,_0x28c8fc,_0x4b37ac){const _0x9e4dc9=_0x4f6648;if(!this[_0x9e4dc9(0x3f2)](_0x211faf,_0x28c8fc))return;const _0x17c927=VisuMZ[_0x9e4dc9(0x2f5)][_0x9e4dc9(0x3fc)][_0x9e4dc9(0x54d)];if(!_0x4b37ac)_0x17c927[_0x9e4dc9(0x20f)][_0x9e4dc9(0x36c)](this,_0x211faf,_0x28c8fc,this);this['_eventMorphData']={'mapId':_0x211faf,'eventId':_0x28c8fc},this[_0x9e4dc9(0x32e)]=-0x2,this[_0x9e4dc9(0x491)]();if(!_0x4b37ac)_0x17c927[_0x9e4dc9(0x713)]['call'](this,_0x211faf,_0x28c8fc,this);$gameMap[_0x9e4dc9(0x422)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3d2)]=function(_0x18ffe2,_0x2bc5e9){const _0x4758a7=_0x4f6648;_0x18ffe2=_0x18ffe2[_0x4758a7(0x42b)]()[_0x4758a7(0x4cf)]();const _0x470de3=VisuMZ[_0x4758a7(0x437)][_0x18ffe2];if(!_0x470de3)return;const _0x44f5b9=_0x470de3[_0x4758a7(0x649)],_0xf6759b=_0x470de3[_0x4758a7(0x31b)];if(!this[_0x4758a7(0x3f2)](_0x44f5b9,_0xf6759b))return;if(!_0x2bc5e9)_0x470de3['PreMorphJS']['call'](this,_0x44f5b9,_0xf6759b,this);this['morphInto'](_0x44f5b9,_0xf6759b,_0x2bc5e9);if(!_0x2bc5e9)_0x470de3[_0x4758a7(0x713)][_0x4758a7(0x36c)](this,_0x44f5b9,_0xf6759b,this);if($gameMap)$gameMap[_0x4758a7(0x422)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x666)]=function(){const _0x40d266=_0x4f6648;this[_0x40d266(0x533)]=undefined,this[_0x40d266(0x32e)]=-0x2,this[_0x40d266(0x491)]();},Game_Event[_0x4f6648(0x1a3)]['setupSpawn']=function(_0x838f55){const _0x112d55=_0x4f6648,_0x4b5f51=VisuMZ[_0x112d55(0x2f5)][_0x112d55(0x3fc)][_0x112d55(0x54d)],_0x58fa21=_0x838f55['template'][_0x112d55(0x42b)]()[_0x112d55(0x4cf)](),_0x17ecb6=!['',_0x112d55(0x32b)]['includes'](_0x58fa21);let _0x1bb2bd=0x0,_0x411684=0x0;if(_0x17ecb6){if('XcGlm'!==_0x112d55(0x639)){const _0x14dc00=_0x271989[_0x112d55(0x71b)](),_0x172d41=_0x1b047e['tileCoordinates']['x'],_0x3c69b3=_0x2ecc0b[_0x112d55(0x374)](_0x172d41);this['x']=_0x55b74f[_0x112d55(0x36a)](_0x3c69b3*_0x14dc00+_0x14dc00/0x2);}else{const _0x1c030e=VisuMZ[_0x112d55(0x437)][_0x58fa21];if(!_0x1c030e)return;_0x1bb2bd=_0x1c030e[_0x112d55(0x649)],_0x411684=_0x1c030e[_0x112d55(0x31b)];}}else{if(_0x112d55(0x4e0)!==_0x112d55(0x38b))_0x1bb2bd=_0x838f55['mapId'],_0x411684=_0x838f55[_0x112d55(0x679)];else{if(!_0x58a21f['ALLOW_LADDER_DASH']&&this[_0x112d55(0x598)]())return![];if(this[_0x112d55(0x4e3)])return!![];return _0x2c282e[_0x112d55(0x2f5)][_0x112d55(0x300)]['call'](this);}}if(!this['checkValidEventerMap'](_0x1bb2bd,_0x411684))return;if(_0x17ecb6){if('fiqDN'===_0x112d55(0x478))_0x2d3bc3[_0x112d55(0x37a)](_0x50d974,_0x48c255),_0x3e9a74[_0x112d55(0x377)](_0x386425[_0x112d55(0x3e6)]);else{const _0x17c036=VisuMZ[_0x112d55(0x437)][_0x58fa21];_0x17c036[_0x112d55(0x4fd)][_0x112d55(0x36c)](this,_0x1bb2bd,_0x411684,this);}}_0x4b5f51[_0x112d55(0x4fd)][_0x112d55(0x36c)](this,_0x1bb2bd,_0x411684,this),this[_0x112d55(0x4c1)]=_0x838f55,this['_pageIndex']=-0x2,this[_0x112d55(0x527)]=$gameMap[_0x112d55(0x191)](),this[_0x112d55(0x575)]=_0x838f55['spawnEventId'],this[_0x112d55(0x6ea)]=_0x838f55[_0x112d55(0x250)],this[_0x112d55(0x3b9)](_0x838f55['x'],_0x838f55['y']),this['setDirection'](_0x838f55[_0x112d55(0x4dc)]),this[_0x112d55(0x491)]();if(_0x17ecb6){const _0x1f7ca9=VisuMZ[_0x112d55(0x437)][_0x58fa21];if(!_0x1f7ca9)return;_0x1f7ca9[_0x112d55(0x6d3)][_0x112d55(0x36c)](this,_0x1bb2bd,_0x411684,this);}_0x4b5f51[_0x112d55(0x6d3)]['call'](this,_0x1bb2bd,_0x411684,this);const _0x47821c=SceneManager[_0x112d55(0x355)];if(_0x47821c&&_0x47821c[_0x112d55(0x1e2)])_0x47821c[_0x112d55(0x1e2)]['createSpawnedEvent'](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x403)]=function(){const _0x5718b1=_0x4f6648;return!!this[_0x5718b1(0x4c1)];},Game_Event[_0x4f6648(0x1a3)]['start']=function(){const _0x41537f=_0x4f6648;if(!this[_0x41537f(0x17f)]())return;const _0x5f3de9=this[_0x41537f(0x17f)]()['filter'](_0x4e9706=>_0x4e9706[_0x41537f(0x25f)]!==0x6c&&_0x4e9706[_0x41537f(0x25f)]!==0x198);if(_0x5f3de9[_0x41537f(0x685)]>0x1){if('PmJbe'!==_0x41537f(0x320))this[_0x41537f(0x20c)]=!![],this[_0x41537f(0x1f8)]([0x0,0x1,0x2])&&(_0x41537f(0x6bf)===_0x41537f(0x6bf)?this['lock']():(this[_0x41537f(0x290)]=![],this[_0x41537f(0x4cd)]=_0x41bf9b[_0x41537f(0x65c)](),this[_0x41537f(0x3d3)]=this[_0x41537f(0x6ce)]['screenX'](),this[_0x41537f(0x58a)]=this[_0x41537f(0x6ce)]['screenY'](),this[_0x41537f(0x19e)]=this['_event'][_0x41537f(0x21a)][_0x41537f(0x40c)],this[_0x41537f(0x3b4)]=this[_0x41537f(0x6ce)][_0x41537f(0x21a)][_0x41537f(0x2a8)],this[_0x41537f(0x475)]=this['_event'][_0x41537f(0x32e)],this[_0x41537f(0x56c)]=this[_0x41537f(0x3e5)](),this['_cacheSystemVisible']=_0x2752b1['eventLabelsVisible'](),this[_0x41537f(0x194)]=_0x4b84bc['x'],this['_visiblePlayerY']=_0x2481f3['y'],this['_visibleEventX']=this['_event']['x'],this['_visibleEventY']=this['_event']['y']));else{if(!_0x25ba1a[_0x41537f(0x355)])return;if(!_0x50738b[_0x41537f(0x355)][_0x41537f(0x1e2)])return;const _0x26c4c6=_0x73e7d7['_scene']['_spriteset'][_0x41537f(0x2bb)](this[_0x41537f(0x6ce)]);if(!_0x26c4c6)return;this['x']=_0x3e90fd[_0x41537f(0x6fb)](this['_event'][_0x41537f(0x71c)]()-_0x1ee539[_0x41537f(0x36a)](this[_0x41537f(0x445)]*this[_0x41537f(0x4f7)]['x']/0x2)),this['x']+=this[_0x41537f(0x6ce)][_0x41537f(0x21a)][_0x41537f(0x40c)],this['y']=this[_0x41537f(0x6ce)][_0x41537f(0x222)]()-_0x26c4c6[_0x41537f(0x272)],this['y']+=_0x446be9[_0x41537f(0x6fb)](_0x24ad9f['windowPadding']()*0.5),this['y']-=_0x4dc971[_0x41537f(0x6fb)](this[_0x41537f(0x272)]*this[_0x41537f(0x4f7)]['y']),this['y']+=this[_0x41537f(0x6ce)][_0x41537f(0x21a)][_0x41537f(0x2a8)],this['_eventErased']=this['_event']['_erased'],this[_0x41537f(0x3d3)]=this[_0x41537f(0x6ce)][_0x41537f(0x71c)](),this[_0x41537f(0x58a)]=this[_0x41537f(0x6ce)][_0x41537f(0x222)](),this[_0x41537f(0x19e)]=this[_0x41537f(0x6ce)][_0x41537f(0x21a)][_0x41537f(0x40c)],this[_0x41537f(0x3b4)]=this['_event'][_0x41537f(0x21a)][_0x41537f(0x2a8)],this[_0x41537f(0x475)]=this[_0x41537f(0x6ce)][_0x41537f(0x32e)],this[_0x41537f(0x290)]&&(this[_0x41537f(0x6ed)]=0x0);}}},VisuMZ['EventsMoveCore'][_0x4f6648(0x410)]=Game_Event['prototype']['clearPageSettings'],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x28b)]=function(){const _0x45f008=_0x4f6648;VisuMZ['EventsMoveCore']['Game_Event_clearPageSettings']['call'](this),this[_0x45f008(0x310)](),this[_0x45f008(0x593)]();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x2b1)]=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x268)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x268)]=function(){const _0x1493a1=_0x4f6648;this[_0x1493a1(0x1a6)]=!![],VisuMZ[_0x1493a1(0x2f5)]['Game_Event_setupPageSettings'][_0x1493a1(0x36c)](this),this[_0x1493a1(0x33f)](),this['autosaveEventLocation'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x33f)]=function(){const _0x54178a=_0x4f6648;if(!this[_0x54178a(0x273)]())return;this[_0x54178a(0x310)](),this['setupEventsMoveCoreNotetags'](),this[_0x54178a(0x613)](),this[_0x54178a(0x596)]();},Game_Event['prototype'][_0x4f6648(0x3f1)]=function(){const _0x520ac8=_0x4f6648,_0x354a56=this[_0x520ac8(0x273)]()['note'];if(_0x354a56==='')return;this[_0x520ac8(0x700)](_0x354a56);},Game_Event[_0x4f6648(0x1a3)]['setupEventsMoveCoreCommentTags']=function(){const _0x56814b=_0x4f6648;if(!this[_0x56814b(0x4a9)]())return;const _0x1af301=this[_0x56814b(0x17f)]();let _0x621cfc='';for(const _0x3091d7 of _0x1af301){if([0x6c,0x198][_0x56814b(0x328)](_0x3091d7[_0x56814b(0x25f)])){if(_0x56814b(0x6d6)===_0x56814b(0x48c)){const _0x391ff5=_0x107a43[_0x56814b(0x186)]()||this;if(_0x391ff5[_0x56814b(0x382)]!==_0x1d2d36)return _0x14bc69['EventsMoveCore'][_0x56814b(0x3e4)][_0x56814b(0x36c)](this,_0x46c21f);else{const _0x481e71=[_0x391ff5[_0x56814b(0x527)],_0x391ff5['_eventId'],_0x56814b(0x167)[_0x56814b(0x4a2)](_0x12c93c)];return _0x41aa99['value'](_0x481e71);}}else{if(_0x621cfc!=='')_0x621cfc+='\x0a';_0x621cfc+=_0x3091d7[_0x56814b(0x19a)][0x0];}}}this[_0x56814b(0x700)](_0x621cfc);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x310)]=function(){const _0xe3d77e=_0x4f6648,_0x48d7fc=VisuMZ[_0xe3d77e(0x2f5)]['Settings'];this[_0xe3d77e(0x1b4)]={'type':_0xe3d77e(0x657),'distance':0x0,'regionList':[]},this[_0xe3d77e(0x41b)]=![],this['clearAttachPictureSettings'](),this[_0xe3d77e(0x2d2)]=![],this[_0xe3d77e(0x1f5)]=![],this[_0xe3d77e(0x58e)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0xe3d77e(0x280)]={'type':'none','distance':0x0},this[_0xe3d77e(0x597)]={'type':_0xe3d77e(0x657),'distance':0x0},$gameSystem[_0xe3d77e(0x5f5)](this),this[_0xe3d77e(0x6af)]=$gameSystem[_0xe3d77e(0x1bb)](this),this[_0xe3d77e(0x21a)]={'originalText':'','text':'','visibleRange':_0x48d7fc[_0xe3d77e(0x24f)]['VisibleRange'],'offsetX':_0x48d7fc[_0xe3d77e(0x24f)]['OffsetX'],'offsetY':_0x48d7fc[_0xe3d77e(0x24f)]['OffsetY'],'hueShift':0x0},this[_0xe3d77e(0x53a)]=![],this[_0xe3d77e(0x468)]=[],this[_0xe3d77e(0x4b0)]={'target':-0x1,'type':_0xe3d77e(0x612),'delay':0x1,'opacityDelta':0x0},this[_0xe3d77e(0x1f3)]=_0x48d7fc[_0xe3d77e(0x3ae)][_0xe3d77e(0x338)]??0x0,this['_saveEventLocation']=![],this[_0xe3d77e(0x505)]=0x1,this['_scaleBaseY']=0x1,this['_shadowGraphic']={'visible':!![],'filename':_0x48d7fc[_0xe3d77e(0x3ae)][_0xe3d77e(0x321)]},this['clearSpriteOffsets'](),this[_0xe3d77e(0x5dd)]();},Game_Event[_0x4f6648(0x1a3)]['checkEventsMoveCoreStringTags']=function(_0x450cce){const _0x52b5a6=_0x4f6648;if(_0x450cce[_0x52b5a6(0x6be)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x52b5a6(0x1b4)][_0x52b5a6(0x16f)]=JSON['parse']('['+RegExp['$1'][_0x52b5a6(0x6be)](/\d+/g)+']'),this[_0x52b5a6(0x1b4)]['type']='region';else{if(_0x450cce['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x52b5a6(0x288)!=='xGPBs')type=String(RegExp['$1'])[_0x52b5a6(0x531)]()[_0x52b5a6(0x4cf)](),this['_activationProximity'][_0x52b5a6(0x2e0)]=type,this[_0x52b5a6(0x1b4)][_0x52b5a6(0x572)]=Number(RegExp['$2']);else{if(this['_EventIcons']===_0x1ffaa7)this[_0x52b5a6(0x66d)]();if(!_0x5d506b)return null;if(_0x2592d9===_0x4221f0)return this[_0x52b5a6(0x351)][_0x52b5a6(0x3f7)];else{const _0x23c8b0=_0x5a2490[_0x52b5a6(0x2f5)][_0x52b5a6(0x3fc)],_0x2ea9da=_0x52b5a6(0x17e)[_0x52b5a6(0x4a2)](_0xec73ab['_mapId'],_0x2fe5bb[_0x52b5a6(0x575)]);return this['_EventIcons'][_0x2ea9da]=this[_0x52b5a6(0x351)][_0x2ea9da]||{'iconIndex':0x0,'bufferX':_0x23c8b0[_0x52b5a6(0x64b)]['BufferX'],'bufferY':_0x23c8b0[_0x52b5a6(0x64b)][_0x52b5a6(0x448)],'blendMode':_0x23c8b0[_0x52b5a6(0x64b)][_0x52b5a6(0x617)]},this['_EventIcons'][_0x2ea9da];}}}}_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x52b5a6(0x4d2)][_0x52b5a6(0x176)]=String(RegExp['$1']));if(_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if(_0x52b5a6(0x263)===_0x52b5a6(0x263)){const _0x2cea50=String(RegExp['$1'])[_0x52b5a6(0x42b)]()[_0x52b5a6(0x4cf)](),_0x2701b8=[_0x52b5a6(0x296),_0x52b5a6(0x282),_0x52b5a6(0x40f),_0x52b5a6(0x67f)];this['_attachPicture'][_0x52b5a6(0x68a)]=_0x2701b8[_0x52b5a6(0x472)](_0x2cea50)[_0x52b5a6(0x50f)](0x0,0x3);}else this['opacity']=0xff;}_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x52b5a6(0x4d2)][_0x52b5a6(0x19f)]=Number(RegExp['$1']));if(_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x52b5a6(0x5a1)===_0x52b5a6(0x4d4)){if(this[_0x52b5a6(0x65e)]===_0xfe93cf)this[_0x52b5a6(0x66d)]();if(this[_0x52b5a6(0x65e)]['EventAutoMovement']===_0x4e703f)this['initEventsMoveCore']();return this[_0x52b5a6(0x65e)][_0x52b5a6(0x305)];}else this[_0x52b5a6(0x4d2)][_0x52b5a6(0x40c)]=Number(RegExp['$1']);}if(_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if('JQrjC'===_0x52b5a6(0x415))this['_attachPicture'][_0x52b5a6(0x2a8)]=Number(RegExp['$1']);else return _0x410f0f['EventsMoveCore'][_0x52b5a6(0x20b)][_0x52b5a6(0x36c)](this);}_0x450cce['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x52b5a6(0x4d2)]['offsetX']=Number(RegExp['$1']),this['_attachPicture'][_0x52b5a6(0x2a8)]=Number(RegExp['$2']));if(_0x450cce[_0x52b5a6(0x6be)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)){if(_0x52b5a6(0x591)!=='Dsjka'){const _0x111a0a=this[_0x52b5a6(0x2a1)],_0x241a54=new _0x56e30c(0x0,0x0,_0x11298a[_0x52b5a6(0x445)],_0x3984e9['height']);this[_0x52b5a6(0x4b5)]=new _0x373f2e(_0x241a54);const _0x36b3a9=this[_0x52b5a6(0x4b5)][_0x52b5a6(0x696)](_0x111a0a[_0x52b5a6(0x43c)]),_0x5c94d8=_0x36b3a9[_0x52b5a6(0x445)],_0x3e27f6=_0x36b3a9['height'],_0x2d4ad6=_0x5c94d8+_0x2220b5['windowPadding']()*0x2,_0x567b69=_0x3e27f6+_0x13fd21[_0x52b5a6(0x466)]()*0x2;this[_0x52b5a6(0x4b5)][_0x52b5a6(0x514)](0x0,0x0,_0x2d4ad6,_0x567b69),this[_0x52b5a6(0x4b5)][_0x52b5a6(0x170)](),this[_0x52b5a6(0x4b5)]['drawTextEx'](_0x111a0a['text'],0x0,0x0);}else this[_0x52b5a6(0x4d2)]['scale']=Number(RegExp['$1'])*0.01;}if(_0x450cce['match'](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x52b5a6(0x3aa)!=='RRpeq')return this[_0x52b5a6(0x31a)]();else this[_0x52b5a6(0x41b)]=!![];}_0x450cce[_0x52b5a6(0x6be)](/<CLICK TRIGGER>/i)&&(_0x52b5a6(0x576)==='wmWCy'?_0x75a126[_0x42bd4c]?(_0x529aad[_0x52b5a6(0x712)][_0x304cc1]=_0x537bae[_0x5db15c],_0x3398ca[_0x4f7335]=_0x5de19d):_0x49b41b(this[_0x52b5a6(0x169)][_0x52b5a6(0x5c2)](this,_0x3a141b,_0x535aee),0x64):this['_clickTrigger']=!![]);_0x450cce[_0x52b5a6(0x6be)](/<CUSTOM Z:[ ](.*?)>/i)&&(this['_customZ']=Number(RegExp['$1'])||0x0);if(_0x450cce['match'](/<ENC(?:|OUNTER) HALF[ ](.*?):[ ](\d+)>/i)){if(_0x52b5a6(0x5e3)==='LIVkD')type=String(RegExp['$1'])[_0x52b5a6(0x531)]()[_0x52b5a6(0x4cf)](),this[_0x52b5a6(0x280)][_0x52b5a6(0x2e0)]=type,this[_0x52b5a6(0x280)][_0x52b5a6(0x572)]=Number(RegExp['$2']);else{if(_0x4a89b3[_0x52b5a6(0x57d)]())return![];if(_0x593ed0[_0x52b5a6(0x33b)]())return!![];}}if(_0x450cce['match'](/<ENC(?:|OUNTER) NONE[ ](.*?):[ ](\d+)>/i)){if(_0x52b5a6(0x27f)==='ZaqHd'){if([0x2,0x4,0x6,0x8][_0x52b5a6(0x328)](_0x5f3201))return 0x2;if([0x1,0x3,0x7,0x9][_0x52b5a6(0x328)](_0xc7168d))return 0x3;}else type=String(RegExp['$1'])['toLowerCase']()['trim'](),this[_0x52b5a6(0x597)]['type']=type,this[_0x52b5a6(0x597)][_0x52b5a6(0x572)]=Number(RegExp['$2']);}const _0x4a91e5=_0x450cce[_0x52b5a6(0x6be)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x4a91e5)for(const _0x47be36 of _0x4a91e5){if(_0x52b5a6(0x61c)!=='mpPbn'){if(_0x47be36['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if('qmOjQ'!==_0x52b5a6(0x65b)){let _0x41a5e1=_0x52b5a6(0x4fa)[_0x52b5a6(0x4a2)](_0x583644['mapId']);_0x41a5e1+=_0x52b5a6(0x1dd),_0x41a5e1+=_0x52b5a6(0x2b4),_0x41a5e1+=_0x52b5a6(0x606),_0x41a5e1+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x3126a9[_0x52b5a6(0x191)]),_0x44b72f(_0x41a5e1);return;}else{const _0xb340a7=String(RegExp['$1'])['toLowerCase']()[_0x52b5a6(0x4cf)](),_0x1530b0=Number(RegExp['$2']);this[_0x52b5a6(0x58e)][_0xb340a7]=_0x1530b0;}}}else{_0x5aca5a[_0x52b5a6(0x2f5)][_0x52b5a6(0x680)]['call'](this,_0x45a0f5);if(this[_0x52b5a6(0x2ac)]===_0x5b7a7f)this['initEventsMoveCore']();this['_paused']=![];}}if(this[_0x52b5a6(0x6af)][_0x52b5a6(0x453)]>=0x0&&!this[_0x52b5a6(0x6af)][_0x52b5a6(0x350)]){_0x450cce[_0x52b5a6(0x6be)](/<ICON:[ ](\d+)>/i)&&(this[_0x52b5a6(0x6af)][_0x52b5a6(0x453)]=Number(RegExp['$1']));_0x450cce['match'](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x52b5a6(0x6af)][_0x52b5a6(0x395)]=Number(RegExp['$1']));_0x450cce[_0x52b5a6(0x6be)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x52b5a6(0x6af)][_0x52b5a6(0x1a9)]=Number(RegExp['$1']));_0x450cce[_0x52b5a6(0x6be)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x52b5a6(0x6f4)===_0x52b5a6(0x6f4)?(this[_0x52b5a6(0x6af)]['bufferX']=Number(RegExp['$1']),this[_0x52b5a6(0x6af)][_0x52b5a6(0x1a9)]=Number(RegExp['$2'])):(_0x46ee38[_0x52b5a6(0x2f5)][_0x52b5a6(0x5f7)][_0x52b5a6(0x36c)](this),this[_0x52b5a6(0x34c)]()));if(_0x450cce[_0x52b5a6(0x6be)](/<ICON BLEND MODE:[ ](.*?)>/i)){if(_0x52b5a6(0x411)===_0x52b5a6(0x476))this[_0x52b5a6(0x532)]();else{const _0x5e0c86=String(RegExp['$1'])['toUpperCase']()[_0x52b5a6(0x4cf)](),_0x4bf52a=[_0x52b5a6(0x296),_0x52b5a6(0x282),_0x52b5a6(0x40f),_0x52b5a6(0x67f)];this['_eventIcon'][_0x52b5a6(0x68a)]=_0x4bf52a['indexOf'](_0x5e0c86)[_0x52b5a6(0x50f)](0x0,0x3);}}$gameSystem[_0x52b5a6(0x29e)](this,this[_0x52b5a6(0x6af)][_0x52b5a6(0x453)],this['_eventIcon'][_0x52b5a6(0x395)],this[_0x52b5a6(0x6af)][_0x52b5a6(0x1a9)],this[_0x52b5a6(0x6af)][_0x52b5a6(0x68a)]);}if(_0x450cce[_0x52b5a6(0x6be)](/<LABEL:[ ](.*?)>/i)){let _0x10c1de=String(RegExp['$1'])[_0x52b5a6(0x4cf)]();this[_0x52b5a6(0x21a)]['text']=_0x10c1de,this[_0x52b5a6(0x21a)][_0x52b5a6(0x23f)]=_0x10c1de;}if(_0x450cce[_0x52b5a6(0x6be)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x7a897d=String(RegExp['$1'])[_0x52b5a6(0x4cf)]();this[_0x52b5a6(0x21a)][_0x52b5a6(0x43c)]=_0x7a897d,this['_labelWindow'][_0x52b5a6(0x23f)]=_0x7a897d;}if(_0x450cce[_0x52b5a6(0x6be)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x52b5a6(0x704)===_0x52b5a6(0x704))this[_0x52b5a6(0x21a)][_0x52b5a6(0x40c)]=Number(RegExp['$1']);else{const _0xe649c6=_0x5a5b6e['round'](_0x58bade(_0x106049['$1'])/0x64*0xff);return this['setOpacity'](_0xe649c6[_0x52b5a6(0x50f)](0x0,0xff));}}if(_0x450cce[_0x52b5a6(0x6be)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if('FCmNf'===_0x52b5a6(0x1d9))this[_0x52b5a6(0x21a)][_0x52b5a6(0x2a8)]=Number(RegExp['$1']);else{const _0xa0e41e=_0x4438a8[_0x52b5a6(0x2f5)]['Settings'][_0x52b5a6(0x3ae)];return _0xa0e41e[_0x52b5a6(0x2c1)]!==_0x5397df?_0xa0e41e[_0x52b5a6(0x2c1)]:_0xdaafed[_0x52b5a6(0x2f5)][_0x52b5a6(0x1ca)]['call'](this)-this[_0x52b5a6(0x230)];}}_0x450cce['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x52b5a6(0x21a)][_0x52b5a6(0x40c)]=Number(RegExp['$1']),this[_0x52b5a6(0x21a)][_0x52b5a6(0x2a8)]=Number(RegExp['$2']));_0x450cce[_0x52b5a6(0x6be)](/<LABEL HUE SHIFT:[ ](.*?)>/i)&&(this[_0x52b5a6(0x21a)][_0x52b5a6(0x5f8)]=Number(RegExp['$1']));this[_0x52b5a6(0x47a)]();_0x450cce[_0x52b5a6(0x6be)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x52b5a6(0x21a)]['visibleRange']=Number(RegExp['$1']));if(_0x450cce[_0x52b5a6(0x6be)](/<MIRROR SPRITE>/i)){if('THzKg'===_0x52b5a6(0x556))this['_mirrorSprite']=!![];else return this[_0x52b5a6(0x4e7)][_0x52b5a6(0x287)](_0xaa6183,_0x526e28),_0x11cd20?this[_0x52b5a6(0x4e7)][_0x52b5a6(0x568)](_0xbcd4bb):this[_0x52b5a6(0x4e7)][_0x52b5a6(0x3a6)](),this[_0x52b5a6(0x4e7)][_0x52b5a6(0x3f0)];}if(_0x450cce[_0x52b5a6(0x6be)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x108248=JSON['parse']('['+RegExp['$1'][_0x52b5a6(0x6be)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x52b5a6(0x468)][_0x52b5a6(0x2b2)](_0x108248),this[_0x52b5a6(0x468)][_0x52b5a6(0x5c5)](0x0);}if(_0x450cce['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x433ded=String(RegExp['$1']);if(_0x433ded[_0x52b5a6(0x6be)](/PLAYER/i))this[_0x52b5a6(0x4b0)][_0x52b5a6(0x5fc)]=0x0;else _0x433ded[_0x52b5a6(0x6be)](/EVENT[ ](\d+)/i)&&(this[_0x52b5a6(0x4b0)][_0x52b5a6(0x5fc)]=Number(RegExp['$1']));}if(_0x450cce[_0x52b5a6(0x6be)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if('wguhp'!==_0x52b5a6(0x6cc))this['_moveSynch'][_0x52b5a6(0x2e0)]=String(RegExp['$1'])[_0x52b5a6(0x531)]()['trim']();else return this[_0x52b5a6(0x26d)]();}_0x450cce[_0x52b5a6(0x6be)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x52b5a6(0x4b0)][_0x52b5a6(0x67c)]=Number(RegExp['$1']));if(_0x450cce[_0x52b5a6(0x6be)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)){if('yvVem'===_0x52b5a6(0x460)){if(!_0x85818a['_scene'])return;if(!_0x1125fb[_0x52b5a6(0x355)]['_spriteset'])return;const _0x4c1591=_0x4506cf[_0x52b5a6(0x355)][_0x52b5a6(0x1e2)][_0x52b5a6(0x2bb)](this[_0x52b5a6(0x6ce)]);if(!_0x4c1591)return;this['x']=this['_event'][_0x52b5a6(0x71c)](),this['x']+=this[_0x52b5a6(0x6ce)][_0x52b5a6(0x21a)][_0x52b5a6(0x40c)],this['y']=this[_0x52b5a6(0x6ce)][_0x52b5a6(0x222)]()-_0x4c1591[_0x52b5a6(0x272)]*_0x4c1591[_0x52b5a6(0x4f7)]['y'],this['y']+=_0x59c6ec['windowPadding']()*-0.5,this['y']+=this[_0x52b5a6(0x6ce)][_0x52b5a6(0x21a)][_0x52b5a6(0x2a8)];}else this[_0x52b5a6(0x4b0)][_0x52b5a6(0x333)]=Number(RegExp['$1']);}if(_0x450cce[_0x52b5a6(0x6be)](/<TRUE RANDOM MOVE>/i)){if('ldwLq'!==_0x52b5a6(0x394))this[_0x52b5a6(0x1f3)]=0x0;else{const _0x22b9a0=this[_0x52b5a6(0x4f8)][_0x52b5a6(0x1c8)]();this[_0x52b5a6(0x4f8)]['drawTextEx'](this['_text'],_0x22b9a0,0x0);}}else _0x450cce[_0x52b5a6(0x6be)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x52b5a6(0x1f3)]=Number(RegExp['$1'])||0x0);_0x450cce[_0x52b5a6(0x6be)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x52b5a6(0x6e7)]=!![]);_0x450cce['match'](/<SCALE X:[ ](\d+)([%％])>/i)&&(this[_0x52b5a6(0x505)]=Number(RegExp['$1'])*0.01);_0x450cce['match'](/<SCALE Y:[ ](\d+)([%％])>/i)&&(this[_0x52b5a6(0x2dc)]=Number(RegExp['$1'])*0.01);if(_0x450cce['match'](/<SCALE:[ ](\d+)([%％])>/i)){const _0x57271b=Number(RegExp['$1'])*0.01;this[_0x52b5a6(0x505)]=_0x57271b,this[_0x52b5a6(0x2dc)]=_0x57271b;}_0x450cce['match'](/<HIDE SHADOW>/i)&&(this[_0x52b5a6(0x323)]['visible']=![]);if(_0x450cce[_0x52b5a6(0x6be)](/<SHADOW FILENAME:[ ](.*?)>/i)){if('DGaCz'!==_0x52b5a6(0x2c0))return this[_0x52b5a6(0x3cd)]()&&_0x37f7cf['EventsMoveCore'][_0x52b5a6(0x3fc)][_0x52b5a6(0x2af)][_0x52b5a6(0x5d8)];else this[_0x52b5a6(0x323)]['filename']=String(RegExp['$1']);}_0x450cce['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x52b5a6(0x4eb)==='DucGm'?this[_0x52b5a6(0x59b)](_0x26f466>0x0?0x8:0x2):this[_0x52b5a6(0x58c)]=Number(RegExp['$1'])),_0x450cce['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&('UBQUI'!==_0x52b5a6(0x502)?this[_0x52b5a6(0x189)]=!![]:this['_spriteOffsetY']=Number(RegExp['$1'])),_0x450cce[_0x52b5a6(0x6be)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x52b5a6(0x25c)!==_0x52b5a6(0x482)?(this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x52b5a6(0x5f9)]=Number(RegExp['$2'])):_0x4aa9c9[_0x52b5a6(0x56b)]()?this[_0x52b5a6(0x513)](_0x3c66ef):_0x8fd07e['EventsMoveCore'][_0x52b5a6(0x6f3)][_0x52b5a6(0x36c)](this,_0x23a38f)),_0x450cce['match'](/<STEP PATTERN:[ ](.*)>/i)&&(_0x52b5a6(0x5d9)!==_0x52b5a6(0x71a)?this[_0x52b5a6(0x508)]=String(RegExp['$1'])['toUpperCase']()['trim']():this['_attachPicture'][_0x52b5a6(0x19f)]=_0x242ec1(_0x514a80['$1']));},Game_Event['prototype']['updateEventLabelText']=function(){const _0x465d72=_0x4f6648;$gameTemp[_0x465d72(0x3a5)](this),this[_0x465d72(0x21a)][_0x465d72(0x43c)]=this[_0x465d72(0x21a)]['originalText'];for(;;){if(this[_0x465d72(0x21a)]['text'][_0x465d72(0x6be)](/\\V\[(\d+)\]/gi))this[_0x465d72(0x21a)][_0x465d72(0x43c)]=this[_0x465d72(0x21a)][_0x465d72(0x23f)][_0x465d72(0x302)](/\\V\[(\d+)\]/gi,(_0x58eee5,_0xf9a45b)=>$gameVariables[_0x465d72(0x298)](parseInt(_0xf9a45b)));else break;}$gameTemp[_0x465d72(0x4d3)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x596)]=function(){const _0x224a3d=_0x4f6648;this[_0x224a3d(0x5ad)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x4dd)]=function(){const _0xd42d14=_0x4f6648;if(this[_0xd42d14(0x41b)])return!![];return Game_Character[_0xd42d14(0x1a3)][_0xd42d14(0x4dd)]['call'](this);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x257)]=Game_Event['prototype'][_0x4f6648(0x46e)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x46e)]=function(){const _0x2e1a63=_0x4f6648;if(this['isPreventSelfMovement']())return;VisuMZ[_0x2e1a63(0x2f5)][_0x2e1a63(0x257)]['call'](this),this[_0x2e1a63(0x1db)]()&&VisuMZ[_0x2e1a63(0x5dc)](this[_0x2e1a63(0x575)]);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x5b0)]=function(){const _0x35b340=_0x4f6648,_0xce3308=VisuMZ[_0x35b340(0x2f5)][_0x35b340(0x3fc)][_0x35b340(0x3ae)];if($gameMap[_0x35b340(0x339)]()&&_0xce3308[_0x35b340(0x587)])return!![];if($gameMessage[_0x35b340(0x2e3)]()&&_0xce3308[_0x35b340(0x3bd)])return!![];if(!$gameSystem[_0x35b340(0x33e)]())return!![];if(this[_0x35b340(0x507)]()>=0x0)return!![];if(!SceneManager[_0x35b340(0x355)][_0x35b340(0x1d1)])return!![];return![];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x5ad)]=function(){const _0x8a8e10=_0x4f6648,_0x4aa1e3=SceneManager[_0x8a8e10(0x355)]['_spriteset'];if(_0x4aa1e3){const _0x264928=_0x4aa1e3['findTargetSprite'](this);_0x264928&&_0x264928[_0x8a8e10(0x177)]&&_0x264928[_0x8a8e10(0x177)][_0x8a8e10(0x6f2)]!==this[_0x8a8e10(0x1e6)]()&&(_0x264928[_0x8a8e10(0x177)]['_filename']=this[_0x8a8e10(0x1e6)](),_0x264928[_0x8a8e10(0x177)][_0x8a8e10(0x4fc)]=ImageManager[_0x8a8e10(0x4e4)](_0x264928['_shadowSprite'][_0x8a8e10(0x6f2)]));}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x1e6)]=function(){const _0x1745b0=_0x4f6648;return this['_shadowGraphic'][_0x1745b0(0x176)];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x1fd)]=function(){const _0x27b263=_0x4f6648;if(!this[_0x27b263(0x323)][_0x27b263(0x452)])return![];return Game_CharacterBase[_0x27b263(0x1a3)][_0x27b263(0x1fd)][_0x27b263(0x36c)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x340)]=function(){const _0x507219=_0x4f6648;return this[_0x507219(0x21a)][_0x507219(0x43c)];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x324)]=function(){const _0xcafa3d=_0x4f6648;return this[_0xcafa3d(0x21a)][_0xcafa3d(0x335)];},Game_Event[_0x4f6648(0x1a3)]['isMapPassable']=function(_0x36a769,_0x4b58d1,_0x193cfc){const _0x34b8d=_0x4f6648;if(this[_0x34b8d(0x215)]())return this[_0x34b8d(0x548)](_0x36a769,_0x4b58d1,_0x193cfc);if($gameMap[_0x34b8d(0x6ad)](_0x36a769,_0x4b58d1,_0x193cfc,_0x34b8d(0x273)))return!![];if($gameMap[_0x34b8d(0x4ed)](_0x36a769,_0x4b58d1,_0x193cfc,'event'))return![];return Game_Character[_0x34b8d(0x1a3)][_0x34b8d(0x429)]['call'](this,_0x36a769,_0x4b58d1,_0x193cfc);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x215)]=function(){const _0x34b8f5=_0x4f6648;if(this[_0x34b8f5(0x468)]===undefined)this[_0x34b8f5(0x310)]();return this[_0x34b8f5(0x468)][_0x34b8f5(0x685)]>0x0;},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x548)]=function(_0x2ef142,_0x434cf2,_0x592c1a){const _0x9961dd=_0x4f6648,_0x49720d=$gameMap[_0x9961dd(0x579)](_0x2ef142,_0x592c1a),_0x12a1e1=$gameMap[_0x9961dd(0x6a6)](_0x434cf2,_0x592c1a),_0x19ed1e=$gameMap[_0x9961dd(0x4de)](_0x49720d,_0x12a1e1);return this['_moveOnlyRegions'][_0x9961dd(0x328)](_0x19ed1e);},VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex']=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x637)],Game_Event['prototype'][_0x4f6648(0x637)]=function(){const _0x40ebe1=_0x4f6648;if(this[_0x40ebe1(0x273)]()&&!$gameTemp[_0x40ebe1(0x6aa)]()){if(this[_0x40ebe1(0x273)]()[_0x40ebe1(0x4a3)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x40ebe1(0x630)]=![],this[_0x40ebe1(0x2f6)]=![],this[_0x40ebe1(0x273)]()?VisuMZ[_0x40ebe1(0x2f5)][_0x40ebe1(0x291)]['call'](this):-0x1;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x392)]=Game_Event[_0x4f6648(0x1a3)]['meetsConditions'],Game_Event[_0x4f6648(0x1a3)]['meetsConditions']=function(_0x1ae575){const _0x21e330=_0x4f6648;this['checkAdvancedSwitchVariablePresent'](_0x1ae575),$gameTemp['registerSelfTarget'](this);const _0x46f2f3=VisuMZ['EventsMoveCore']['Game_Event_meetsConditions'][_0x21e330(0x36c)](this,_0x1ae575);return $gameTemp['clearSelfTarget'](),_0x46f2f3;},Game_Event['prototype'][_0x4f6648(0x5aa)]=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x6c9)]=function(_0x30ff22){const _0x112010=_0x4f6648,_0xd10b17=_0x30ff22[_0x112010(0x5e9)];if(_0xd10b17[_0x112010(0x2e6)]&&DataManager[_0x112010(0x5d1)](_0xd10b17[_0x112010(0x470)]))_0x112010(0x266)===_0x112010(0x266)?this[_0x112010(0x630)]=!![]:(this[_0x112010(0x4a0)]=this['_frames']||0x0,this[_0x112010(0x4a0)]+=_0xde507b,this[_0x112010(0x3df)]=!![],this[_0x112010(0x4a0)]=_0x551730['max'](0x1,this[_0x112010(0x4a0)]));else{if(_0xd10b17[_0x112010(0x16a)]&&DataManager[_0x112010(0x5d1)](_0xd10b17[_0x112010(0x28c)]))this['_advancedSwitchVariable']=!![];else _0xd10b17['variableValid']&&DataManager[_0x112010(0x22e)](_0xd10b17[_0x112010(0x590)])&&(this[_0x112010(0x630)]=!![]);}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x673)]=function(){const _0x15afd5=_0x4f6648;if(this[_0x15afd5(0x2ec)])return![];return this['_clickTrigger'];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x485)]=function(){const _0x56f836=_0x4f6648;$gameTemp['clearDestination'](),this[_0x56f836(0x5bf)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3c9)]=function(_0x2e43f6,_0x3055df){const _0x104b39=_0x4f6648;if(this[_0x104b39(0x58e)]){if(_0x104b39(0x4f3)===_0x104b39(0x635)){if(this[_0x104b39(0x246)]<=0x0)return;this[_0x104b39(0x246)]--;if(this[_0x104b39(0x246)]<=0x0){if(this[_0x104b39(0x44d)])this['parent'][_0x104b39(0x225)](this);this[_0x104b39(0x389)]['bitmap']&&this[_0x104b39(0x389)][_0x104b39(0x4fc)][_0x104b39(0x344)]();}}else return this[_0x104b39(0x232)](_0x2e43f6,_0x3055df);}else{if('FcaMQ'!==_0x104b39(0x20d)){if(!this[_0x104b39(0x4f1)](this['_x'],this['_y'],_0x5ee1da))return this['moveStraight'](_0x245150);if(!this['canPass'](this['_x'],this['_y'],_0x10c455))return this[_0x104b39(0x59b)](_0x314b12);if(!this[_0x104b39(0x1ad)](this['_x'],this['_y'],_0x4b7030,_0x403a3c)){let _0x48690b=_0x4b096d[_0x104b39(0x2f5)][_0x104b39(0x3fc)][_0x104b39(0x3ae)][_0x104b39(0x334)]?_0x29c321:_0x40219c;return this[_0x104b39(0x59b)](_0x48690b);}}else return Game_Character[_0x104b39(0x1a3)][_0x104b39(0x3c9)][_0x104b39(0x36c)](this,_0x2e43f6,_0x3055df);}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x232)]=function(_0x2df4ee,_0x352d5c){const _0x2cf4d7=_0x4f6648;var _0x2d3111=this['x']-this[_0x2cf4d7(0x58e)][_0x2cf4d7(0x64d)],_0x35c627=this['x']+this[_0x2cf4d7(0x58e)][_0x2cf4d7(0x2f0)],_0x166c89=this['y']-this[_0x2cf4d7(0x58e)]['up'],_0x534e43=this['y']+this[_0x2cf4d7(0x58e)][_0x2cf4d7(0x22b)];return _0x2d3111<=_0x2df4ee&&_0x2df4ee<=_0x35c627&&_0x166c89<=_0x352d5c&&_0x352d5c<=_0x534e43;},Game_Event['prototype']['canPass']=function(_0x5e7d80,_0x257a7c,_0x2802f7){const _0x575e17=_0x4f6648;for(let _0x1175aa=-this[_0x575e17(0x58e)]['left'];_0x1175aa<=this[_0x575e17(0x58e)]['right'];_0x1175aa++){for(let _0x48e559=-this['_addedHitbox']['up'];_0x48e559<=this[_0x575e17(0x58e)][_0x575e17(0x22b)];_0x48e559++){if(!Game_Character['prototype'][_0x575e17(0x4f1)]['call'](this,_0x5e7d80+_0x1175aa,_0x257a7c+_0x48e559,_0x2802f7))return![];}}return!![];},Game_Event['prototype']['isCollidedWithEvents']=function(_0x12a1b8,_0x2bc541){const _0x1ff12a=_0x4f6648;if(Imported[_0x1ff12a(0x178)]&&this[_0x1ff12a(0x405)]())return this['checkSmartEventCollision'](_0x12a1b8,_0x2bc541);else{const _0x5e7b45=$gameMap[_0x1ff12a(0x6f6)](_0x12a1b8,_0x2bc541)[_0x1ff12a(0x604)](_0x5326b9=>_0x5326b9!==this);return _0x5e7b45['length']>0x0;}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x6fa)]=function(_0x518c70,_0x25ac8e){const _0x1e2c50=_0x4f6648;if(!this[_0x1e2c50(0x27d)]()){if('jhFRM'!==_0x1e2c50(0x36f))return![];else{var _0x51cae6=this['x']-this[_0x1e2c50(0x58e)]['left'],_0x10cc58=this['x']+this['_addedHitbox'][_0x1e2c50(0x2f0)],_0x2add47=this['y']-this['_addedHitbox']['up'],_0x10f59b=this['y']+this[_0x1e2c50(0x58e)]['down'];return _0x51cae6<=_0x3961b5&&_0x4bf112<=_0x10cc58&&_0x2add47<=_0x323c43&&_0x4c1c5e<=_0x10f59b;}}else{if('yFQoV'!=='yFQoV'){_0x3bcb72[_0x1e2c50(0x59c)][_0x69c9cc]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0xff70e8=_0x1e2c50(0x21d)[_0x1e2c50(0x4a2)](_0x1f4ea4(_0x946e2b['$1']));_0x38fe40['advancedFunc'][_0x1cc157]=new _0x1d2816('switchId',_0xff70e8);}else{const _0x47d270=$gameMap[_0x1e2c50(0x6f6)](_0x518c70,_0x25ac8e)[_0x1e2c50(0x604)](_0x4a84af=>_0x4a84af!==this&&_0x4a84af['isNormalPriority']());return _0x47d270[_0x1e2c50(0x685)]>0x0;}}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x27a)]=function(){const _0x468947=_0x4f6648;if(!this[_0x468947(0x1b4)])return _0x468947(0x657);return this[_0x468947(0x1b4)]['type']||_0x468947(0x657);},Game_Event['prototype'][_0x4f6648(0x265)]=function(){const _0x347651=_0x4f6648;if(!this[_0x347651(0x1b4)])return 0x0;return this[_0x347651(0x1b4)][_0x347651(0x572)]||0x0;},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x2c2)]=function(){const _0x1d1187=_0x4f6648;if(!this[_0x1d1187(0x1b4)])return[];return this['_activationProximity'][_0x1d1187(0x16f)]||[];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x1ba)]=function(){const _0x226e80=_0x4f6648;Game_Character['prototype']['increaseSteps'][_0x226e80(0x36c)](this);if(['none',_0x226e80(0x2f1)][_0x226e80(0x328)](this[_0x226e80(0x27a)]()))return;$gamePlayer[_0x226e80(0x49b)]([0x2]);},VisuMZ['EventsMoveCore'][_0x4f6648(0x5f6)]=Game_Event['prototype']['checkEventTriggerAuto'],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x313)]=function(){const _0x133101=_0x4f6648;if(this[_0x133101(0x1e1)]!==0x3)return;if(this[_0x133101(0x1a6)])return;if(!this[_0x133101(0x2e7)](![]))return;if(!this[_0x133101(0x592)](![]))return;VisuMZ[_0x133101(0x2f5)]['Game_Event_checkEventTriggerAuto'][_0x133101(0x36c)](this);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x16c)]=Game_Event['prototype'][_0x4f6648(0x5d6)],Game_Event['prototype']['updateParallel']=function(){const _0x17b8a6=_0x4f6648;if(!this['_interpreter'])return;if(!this[_0x17b8a6(0x2e7)](!![]))return;if(!this[_0x17b8a6(0x592)](!![]))return;VisuMZ[_0x17b8a6(0x2f5)][_0x17b8a6(0x16c)][_0x17b8a6(0x36c)](this);},Game_Event['prototype'][_0x4f6648(0x2e7)]=function(_0x3368a1){const _0x2428e7=_0x4f6648;if(!_0x3368a1&&$gameMap[_0x2428e7(0x339)]())return![];if(!_0x3368a1&&$gameMap[_0x2428e7(0x219)]())return![];if(this[_0x2428e7(0x2c2)]()<=0x0)return!![];return $gamePlayer[_0x2428e7(0x262)](this);},Game_Event[_0x4f6648(0x1a3)]['checkActivationProximity']=function(_0xa69d91){const _0x56ab65=_0x4f6648;if(!_0xa69d91&&$gameMap[_0x56ab65(0x339)]())return![];if(!_0xa69d91&&$gameMap[_0x56ab65(0x219)]())return![];if([_0x56ab65(0x657),_0x56ab65(0x2f1)]['includes'](this[_0x56ab65(0x27a)]()))return!![];return $gamePlayer[_0x56ab65(0x31e)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x66e)]=function(_0x57ca17){const _0x231ccc=_0x4f6648,_0x363461=_0x57ca17?this[_0x231ccc(0x280)]:this[_0x231ccc(0x597)];return _0x363461?_0x363461[_0x231ccc(0x2e0)]:'none';},Game_Event[_0x4f6648(0x1a3)]['encounterProximityDistance']=function(_0x18549c){const _0x2a3524=_0x4f6648,_0x55fd15=_0x18549c?this[_0x2a3524(0x280)]:this[_0x2a3524(0x597)];return _0x55fd15?_0x55fd15[_0x2a3524(0x572)]:0x0;},VisuMZ['MoveAllSynchTargets']=function(_0x3c3194){const _0x1ac3d8=_0x4f6648;for(const _0x2b6bea of $gameMap[_0x1ac3d8(0x4b3)]()){if(_0x1ac3d8(0x21f)!=='QbAJA')return this[_0x1ac3d8(0x5c0)](0x2,_0x4122b4(_0x5ed669['$1']));else{if(!_0x2b6bea)continue;if(_0x2b6bea['moveSynchTarget']()===_0x3c3194){if('lzFvE'===_0x1ac3d8(0x61a)){const _0x4caab1=this['_randomHomeX'],_0xa58ad2=this[_0x1ac3d8(0x4a8)];return this[_0x1ac3d8(0x57c)](_0x4caab1,_0xa58ad2);}else _0x2b6bea['updateMoveSynch']();}}}},VisuMZ['GetMoveSynchTarget']=function(_0x1419f0){const _0x46ecc5=_0x4f6648;if(_0x1419f0===0x0)return $gamePlayer;return $gameMap[_0x46ecc5(0x273)](_0x1419f0);},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x27c)]=function(){},Game_Event['prototype'][_0x4f6648(0x27c)]=function(){const _0x4a8874=_0x4f6648;VisuMZ[_0x4a8874(0x6da)](this[_0x4a8874(0x575)]);},VisuMZ[_0x4f6648(0x6da)]=function(_0xbfdbcf){const _0x2d4774=_0x4f6648;for(const _0x420591 of $gameMap[_0x2d4774(0x4b3)]()){if(!_0x420591)continue;_0x420591[_0x2d4774(0x507)]()===_0xbfdbcf&&_0x420591['processMoveSynchDirection']();}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x507)]=function(){const _0x43dc25=_0x4f6648;return this[_0x43dc25(0x4b0)]['target'];},Game_Event[_0x4f6648(0x1a3)]['moveSynchType']=function(){const _0x5eed0a=_0x4f6648;return this[_0x5eed0a(0x4b0)]['type'];},Game_Event[_0x4f6648(0x1a3)]['realMoveSpeed']=function(){const _0x3a43a2=_0x4f6648;if(this[_0x3a43a2(0x507)]()>=0x0){if(_0x3a43a2(0x24e)===_0x3a43a2(0x24e)){const _0x32cf16=VisuMZ[_0x3a43a2(0x275)](this[_0x3a43a2(0x507)]());if(_0x32cf16)return _0x32cf16['realMoveSpeed']();}else{_0x8069a9[_0x3a43a2(0x37a)](_0xdb5bfc,_0x28f3ec);const _0x3d2e0c=_0x59d369[_0x3a43a2(0x49e)]||0x0;_0x482ee4[_0x3a43a2(0x2e5)](_0x3d2e0c);}}return Game_Character[_0x3a43a2(0x1a3)][_0x3a43a2(0x4b8)][_0x3a43a2(0x36c)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x5a4)]=function(){const _0x799625=_0x4f6648;this[_0x799625(0x4b0)][_0x799625(0x53d)]=this['_moveSynch']['timer']||0x0,this['_moveSynch'][_0x799625(0x53d)]--;if(this['_moveSynch']['timer']>0x0)return;this[_0x799625(0x4b0)][_0x799625(0x53d)]=this[_0x799625(0x4b0)]['delay'],this['processMoveSynch']();},Game_Event[_0x4f6648(0x1a3)]['adjustMoveSynchOpacityDelta']=function(_0x2f55b7){const _0x161e1d=_0x4f6648;if(this[_0x161e1d(0x507)]()>=0x0){if(_0x161e1d(0x3ed)==='Tlcuf')_0x5be4fc=_0x4352da['replace'](_0x2ef11b,(_0x3f7cc9,_0x1c3902)=>_0x4b02b9(this['_mapId'],this[_0x161e1d(0x575)],_0xb0af8f(_0x1c3902)));else{const _0x59f429=VisuMZ['GetMoveSynchTarget'](this[_0x161e1d(0x507)]());if(_0x59f429){const _0x492b85=$gameMap['distance'](this[_0x161e1d(0x31d)],this[_0x161e1d(0x5cc)],_0x59f429['_realX'],_0x59f429[_0x161e1d(0x5cc)])-0x1,_0x589377=Math[_0x161e1d(0x5cd)]($gameMap[_0x161e1d(0x71b)](),$gameMap[_0x161e1d(0x2b6)]()),_0x30f2d0=this['_moveSynch'][_0x161e1d(0x333)]||0x0;_0x2f55b7-=Math['max'](0x0,_0x492b85)*_0x589377*_0x30f2d0;}}}return _0x2f55b7;},Game_Event['prototype']['processMoveSynch']=function(){const _0x461349=_0x4f6648;switch(this[_0x461349(0x301)]()){case'random':this['processMoveSynchRandom']();break;case _0x461349(0x59f):this[_0x461349(0x652)]();break;case _0x461349(0x515):this['processMoveSynchAway']();break;case _0x461349(0x682):this['processMoveSynchCustom']();break;case _0x461349(0x71f):case'copy':this[_0x461349(0x5da)]();break;case _0x461349(0x60e):case'reverse\x20copy':this['processMoveSynchReverseMimic']();break;case'mirror\x20horizontal':case _0x461349(0x2db):case'mirror\x20horz':case'horz\x20mirror':this[_0x461349(0x2d5)]();break;case _0x461349(0x41c):case _0x461349(0x2be):case _0x461349(0x185):case _0x461349(0x4bf):this[_0x461349(0x213)]();break;default:this[_0x461349(0x605)]();break;}this[_0x461349(0x6c5)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x605)]=function(){const _0x23732d=_0x4f6648,_0x63d7bc=[0x2,0x4,0x6,0x8];$gameMap[_0x23732d(0x56b)]()&&_0x63d7bc[_0x23732d(0x58b)](0x1,0x3,0x7,0x9);const _0x386ad8=[];for(const _0x128e0d of _0x63d7bc){if(this[_0x23732d(0x4f1)](this['x'],this['y'],_0x128e0d))_0x386ad8[_0x23732d(0x58b)](_0x128e0d);}if(_0x386ad8['length']>0x0){const _0x2c7552=_0x386ad8[Math[_0x23732d(0x62b)](_0x386ad8['length'])];this[_0x23732d(0x513)](_0x2c7552);}},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x652)]=function(){const _0x5a8de2=_0x4f6648,_0x4b3675=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x5a8de2(0x3ad)](_0x4b3675);},Game_Event['prototype']['processMoveSynchAway']=function(){const _0x307b02=_0x4f6648,_0x180f07=VisuMZ[_0x307b02(0x275)](this[_0x307b02(0x507)]());this['moveAwayFromCharacter'](_0x180f07);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x1f7)]=function(){const _0x18a049=_0x4f6648;this[_0x18a049(0x665)]();},Game_Event['prototype'][_0x4f6648(0x5da)]=function(){const _0x573bf3=_0x4f6648,_0x2050eb=VisuMZ[_0x573bf3(0x275)](this[_0x573bf3(0x507)]());this[_0x573bf3(0x513)](_0x2050eb[_0x573bf3(0x428)]());},Game_Event['prototype']['processMoveSynchReverseMimic']=function(){const _0xbf78b5=_0x4f6648,_0x35c0b2=VisuMZ['GetMoveSynchTarget'](this[_0xbf78b5(0x507)]());this[_0xbf78b5(0x513)](this['reverseDir'](_0x35c0b2[_0xbf78b5(0x428)]()));},Game_Event[_0x4f6648(0x1a3)]['processMoveSynchMirrorHorz']=function(){const _0x114305=_0x4f6648,_0x44dca2=VisuMZ[_0x114305(0x275)](this[_0x114305(0x507)]()),_0x7c0a8a=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x44dca2[_0x114305(0x428)]()];this[_0x114305(0x513)](_0x7c0a8a);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x213)]=function(){const _0x1fd05b=_0x4f6648,_0x108f6=VisuMZ[_0x1fd05b(0x275)](this[_0x1fd05b(0x507)]()),_0x4a1347=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x108f6[_0x1fd05b(0x428)]()];this[_0x1fd05b(0x513)](_0x4a1347);},Game_Event[_0x4f6648(0x1a3)]['processMoveSynchDirection']=function(){const _0x192bb6=_0x4f6648,_0x2f5265=VisuMZ[_0x192bb6(0x275)](this[_0x192bb6(0x507)]()),_0x9c462b=_0x2f5265[_0x192bb6(0x4dc)]();switch(this['moveSynchType']()){case'mimic':case _0x192bb6(0x3d0):this['setDirection'](_0x9c462b);break;case'reverse\x20mimic':case _0x192bb6(0x226):this[_0x192bb6(0x26f)](this['reverseDir'](_0x9c462b));break;case'mirror\x20horizontal':case _0x192bb6(0x2db):case _0x192bb6(0x6c3):case _0x192bb6(0x694):this[_0x192bb6(0x26f)]([0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x9c462b]);break;case'mirror\x20vertical':case _0x192bb6(0x2be):case _0x192bb6(0x185):case'vert\x20mirror':this[_0x192bb6(0x26f)]([0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x9c462b]);break;default:return;}this[_0x192bb6(0x6c5)]();},Game_Event['prototype']['restoreSavedEventPosition']=function(){const _0x260b47=_0x4f6648,_0x2d6eeb=$gameSystem[_0x260b47(0x699)](this);if(!_0x2d6eeb)return;this[_0x260b47(0x38c)](_0x2d6eeb['x'],_0x2d6eeb['y']),this[_0x260b47(0x23c)](),this[_0x260b47(0x26f)](_0x2d6eeb[_0x260b47(0x4dc)]),this[_0x260b47(0x32e)]===_0x2d6eeb['pageIndex']&&(this[_0x260b47(0x203)]=_0x2d6eeb[_0x260b47(0x214)]);},VisuMZ['EventsMoveCore'][_0x4f6648(0x5d7)]=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x6c5)],Game_Event['prototype']['update']=function(){const _0x396e3d=_0x4f6648;VisuMZ[_0x396e3d(0x2f5)][_0x396e3d(0x5d7)][_0x396e3d(0x36c)](this),!Utils[_0x396e3d(0x6c7)]()&&this['updateSaveEventLocation']();},Game_Event['prototype'][_0x4f6648(0x3d7)]=function(){const _0x4effb3=_0x4f6648;Game_Character[_0x4effb3(0x1a3)][_0x4effb3(0x3d7)][_0x4effb3(0x36c)](this),this[_0x4effb3(0x593)]();},Game_Event['prototype'][_0x4f6648(0x662)]=function(){const _0x114c0c=_0x4f6648;if($gameMap['isSaveEventLocations']())return!![];return this[_0x114c0c(0x6e7)];},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x593)]=function(){const _0x82519=_0x4f6648;if(!this[_0x82519(0x662)]())return;this[_0x82519(0x467)]();},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x467)]=function(){this['_requestSaveEventLocation']=!![];},Game_Event[_0x4f6648(0x1a3)]['updateSaveEventLocation']=function(){const _0x3cf504=_0x4f6648;this[_0x3cf504(0x62f)]&&(_0x3cf504(0x190)!==_0x3cf504(0x190)?this[_0x3cf504(0x6e6)](this['x'],this['y']):this['processSaveEventLocation']());},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x255)]=function(){const _0x37a664=_0x4f6648;this['_requestSaveEventLocation']=![],$gameSystem[_0x37a664(0x467)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x70e)]=function(){const _0x360ae9=_0x4f6648;$gameSystem[_0x360ae9(0x61e)](this);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x1bb)]=function(){const _0x4748b6=_0x4f6648;if($gameSystem['getEventIconData'](this)){if(_0x4748b6(0x44b)!=='PYMPf'){if(this[_0x4748b6(0x2ec)])return![];return this['_clickTrigger'];}else return Game_Character[_0x4748b6(0x1a3)]['getEventIconData'][_0x4748b6(0x36c)](this);}else return{'iconIndex':0x0,'bufferX':settings[_0x4748b6(0x64b)][_0x4748b6(0x26a)],'bufferY':settings['Icon'][_0x4748b6(0x448)],'blendMode':settings['Icon'][_0x4748b6(0x617)]};},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3ef)]=function(){const _0x3b2582=_0x4f6648;return this[_0x3b2582(0x2f6)];},VisuMZ['EventsMoveCore'][_0x4f6648(0x492)]=Game_Event['prototype'][_0x4f6648(0x669)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x669)]=function(_0x5a38f3){const _0x324bb6=_0x4f6648,_0x26e368=VisuMZ['EventsMoveCore'][_0x324bb6(0x492)][_0x324bb6(0x36c)](this,_0x5a38f3);if(!_0x26e368)return![];return this[_0x324bb6(0x4a6)](_0x5a38f3);},Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x4a6)]=function(_0x2f0626){const _0x21f218=_0x4f6648;VisuMZ[_0x21f218(0x2f5)][_0x21f218(0x3d1)]['loadCPC'](_0x2f0626),this[_0x21f218(0x2f6)]=_0x2f0626['CPC'][_0x21f218(0x685)]>0x0;_0x2f0626[_0x21f218(0x23d)]===undefined&&('hSJaj'==='hSJaj'?VisuMZ[_0x21f218(0x2f5)][_0x21f218(0x3d1)][_0x21f218(0x663)](_0x2f0626):this[_0x21f218(0x5a2)]());if(_0x2f0626[_0x21f218(0x23d)][_0x21f218(0x685)]>0x0){if(_0x21f218(0x303)===_0x21f218(0x5e1)){if(this[_0x21f218(0x381)]===_0x573134)this[_0x21f218(0x66d)]();if(!_0x47ab2f)return;const _0x16e3b9='Map%1-Event%2'[_0x21f218(0x4a2)](_0x5de97c['_mapId'],_0x740d08[_0x21f218(0x575)]);return this[_0x21f218(0x381)][_0x16e3b9];}else return $gameMap['event'](this[_0x21f218(0x575)])&&VisuMZ[_0x21f218(0x2f5)][_0x21f218(0x3d1)]['metCPC'](_0x2f0626['CPC'],this['_eventId']);}return!![];},VisuMZ['EventsMoveCore'][_0x4f6648(0x261)]=Game_Troop[_0x4f6648(0x1a3)][_0x4f6648(0x669)],Game_Troop['prototype'][_0x4f6648(0x669)]=function(_0x8b5401){const _0x13739d=_0x4f6648;var _0x2fba38=VisuMZ[_0x13739d(0x2f5)][_0x13739d(0x261)]['call'](this,_0x8b5401);return _0x2fba38&&this[_0x13739d(0x54a)](_0x8b5401);},Game_Troop[_0x4f6648(0x1a3)][_0x4f6648(0x54a)]=function(_0x4d3683){const _0x651d12=_0x4f6648;if(_0x4d3683[_0x651d12(0x23d)]===undefined){if(_0x651d12(0x441)!==_0x651d12(0x6b4))VisuMZ[_0x651d12(0x2f5)][_0x651d12(0x3d1)][_0x651d12(0x663)](_0x4d3683);else return _0x1e6639['EventsMoveCore'][_0x651d12(0x375)][_0x651d12(0x36c)](this)+(this['_spriteOffsetX']||0x0);}if(_0x4d3683[_0x651d12(0x23d)][_0x651d12(0x685)]>0x0)return VisuMZ['EventsMoveCore'][_0x651d12(0x3d1)][_0x651d12(0x6bd)](_0x4d3683[_0x651d12(0x23d)],0x0);return!![];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x45f)]=Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x3b9)],Game_Event[_0x4f6648(0x1a3)]['locate']=function(_0x48a652,_0x45956f){const _0x7abf0e=_0x4f6648;VisuMZ[_0x7abf0e(0x2f5)][_0x7abf0e(0x45f)][_0x7abf0e(0x36c)](this,_0x48a652,_0x45956f),this[_0x7abf0e(0x1eb)]=_0x48a652,this[_0x7abf0e(0x4a8)]=_0x45956f,this['autosaveEventLocation']();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x5b3)]=Game_Event['prototype'][_0x4f6648(0x457)],Game_Event[_0x4f6648(0x1a3)][_0x4f6648(0x457)]=function(){const _0x5d88c5=_0x4f6648,_0x2949a2=$gameMap['distance'](this['x'],this['y'],this[_0x5d88c5(0x1eb)],this[_0x5d88c5(0x4a8)]),_0x5a08c7=_0x2949a2*(this[_0x5d88c5(0x1f3)]||0x0);Math['random']()>=_0x5a08c7?_0x5d88c5(0x204)!==_0x5d88c5(0x204)?(_0x2f9693['PreloadedMaps'][_0x43cecf]=_0x91ad61[_0x483392],_0x464d29[_0x457a8e]=_0x17953b):VisuMZ['EventsMoveCore'][_0x5d88c5(0x5b3)][_0x5d88c5(0x36c)](this):this[_0x5d88c5(0x5e2)]();},Game_Event['prototype'][_0x4f6648(0x5e2)]=function(){const _0x17ac54=_0x4f6648,_0x5424da=this[_0x17ac54(0x24c)](this[_0x17ac54(0x1eb)]),_0x10bbdf=this[_0x17ac54(0x47c)](this['_randomHomeY']);if(Math[_0x17ac54(0x5e0)](_0x5424da)>Math[_0x17ac54(0x5e0)](_0x10bbdf)){this[_0x17ac54(0x59b)](_0x5424da>0x0?0x4:0x6);if(!this[_0x17ac54(0x542)]()&&_0x10bbdf!==0x0){if(_0x17ac54(0x6b1)===_0x17ac54(0x496))return this['_labelWindow']['visibleRange'];else this[_0x17ac54(0x59b)](_0x10bbdf>0x0?0x8:0x2);}}else _0x10bbdf!==0x0&&('WDIZX'!==_0x17ac54(0x47f)?(this[_0x17ac54(0x59b)](_0x10bbdf>0x0?0x8:0x2),!this[_0x17ac54(0x542)]()&&_0x5424da!==0x0&&this['moveStraight'](_0x5424da>0x0?0x4:0x6)):(_0x17db0c['EventsMoveCore']['Scene_Map_startEncounterEffect']['call'](this),this[_0x17ac54(0x1e2)][_0x17ac54(0x2f7)]()));},Game_CharacterBase[_0x4f6648(0x1a3)]['clearAttachPictureSettings']=function(){const _0x125561=_0x4f6648;this[_0x125561(0x4d2)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x4f6648(0x1a3)]['attachPictureSettings']=function(){const _0x3f9276=_0x4f6648;if(this['_attachPicture']===undefined)this[_0x3f9276(0x645)]();return this[_0x3f9276(0x4d2)];},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x2b3)]=function(){const _0x29ac97=_0x4f6648;return this[_0x29ac97(0x5d5)]()[_0x29ac97(0x176)]??'';},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x5f0)]=function(){const _0x512d95=_0x4f6648;return this[_0x512d95(0x5d5)]()[_0x512d95(0x68a)]??0x0;},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x717)]=function(){const _0xe53eee=_0x4f6648;return this['attachPictureSettings']()[_0xe53eee(0x19f)]??0x0;},Game_CharacterBase[_0x4f6648(0x1a3)]['attachPictureOffsetX']=function(){const _0x58296a=_0x4f6648;return this[_0x58296a(0x5d5)]()[_0x58296a(0x40c)]??0x0;},Game_CharacterBase[_0x4f6648(0x1a3)][_0x4f6648(0x3c5)]=function(){const _0x38edbc=_0x4f6648;return this['attachPictureSettings']()[_0x38edbc(0x2a8)]??0x0;},Game_CharacterBase['prototype'][_0x4f6648(0x1fe)]=function(){const _0x55759c=_0x4f6648;return this[_0x55759c(0x5d5)]()[_0x55759c(0x4f7)]??0x1;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x20b)]=Game_Interpreter[_0x4f6648(0x1a3)]['updateWaitMode'],Game_Interpreter['prototype'][_0x4f6648(0x2a0)]=function(){const _0x4abd18=_0x4f6648;if(this[_0x4abd18(0x2f2)]===_0x4abd18(0x396)){if(_0x4abd18(0x1e3)==='ZMNTV'){if(window[this[_0x4abd18(0x6c2)]])this['_waitMode']='',this[_0x4abd18(0x70b)]();else return!![];}else this['opacity']-=this[_0x4abd18(0x360)]();}else{if('qhayr'===_0x4abd18(0x39d))this['despawnEventId'](_0x17223e[_0x4abd18(0x575)]);else return VisuMZ[_0x4abd18(0x2f5)]['Game_Interpreter_updateWaitMode'][_0x4abd18(0x36c)](this);}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x523)]=Game_Interpreter[_0x4f6648(0x1a3)]['executeCommand'],Game_Interpreter[_0x4f6648(0x1a3)][_0x4f6648(0x237)]=function(){const _0xe3ab4e=_0x4f6648,_0x41479d=$gameMap&&this[_0xe3ab4e(0x575)]?$gameMap['event'](this[_0xe3ab4e(0x575)]):null;$gameTemp[_0xe3ab4e(0x3a5)](_0x41479d);const _0x32da66=VisuMZ[_0xe3ab4e(0x2f5)][_0xe3ab4e(0x523)][_0xe3ab4e(0x36c)](this);return $gameTemp[_0xe3ab4e(0x4d3)](),_0x32da66;},VisuMZ['EventsMoveCore'][_0x4f6648(0x269)]=Game_Interpreter[_0x4f6648(0x1a3)]['command357'],Game_Interpreter[_0x4f6648(0x1a3)]['command357']=function(_0x32ad75){const _0xe3812d=_0x4f6648;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0xe3812d(0x2f5)][_0xe3812d(0x269)]['call'](this,_0x32ad75);},Game_Interpreter[_0x4f6648(0x1a3)][_0x4f6648(0x182)]=function(_0x2f8be4){const _0x95f1ac=_0x4f6648;this[_0x95f1ac(0x1d3)]=_0x2f8be4;const _0x4b6952=_0x95f1ac(0x697)[_0x95f1ac(0x4a2)](_0x2f8be4[_0x95f1ac(0x191)][_0x95f1ac(0x3ff)](0x3));this[_0x95f1ac(0x6c2)]=_0x95f1ac(0x1f6)+Graphics['frameCount']+'_'+this[_0x95f1ac(0x679)](),DataManager['loadDataFile'](this[_0x95f1ac(0x6c2)],_0x4b6952);if(window[this['_callEventMap']]){if(_0x95f1ac(0x535)!==_0x95f1ac(0x650))this['startCallEvent']();else{_0x19c491[_0x95f1ac(0x37a)](_0x180c1f,_0x32a88a);const _0x5119c8=_0x3470ab[_0x95f1ac(0x59e)],_0x2c4cc1=_0x396e49[_0x95f1ac(0x6bc)];_0x1f8b1a['despawnAtXY'](_0x5119c8,_0x2c4cc1);}}else this['setWaitMode'](_0x95f1ac(0x396));},Game_Interpreter[_0x4f6648(0x1a3)][_0x4f6648(0x70b)]=function(){const _0x695821=_0x4f6648,_0x5c75dc=this[_0x695821(0x1d3)],_0x1e3e5c=window[this['_callEventMap']],_0x53c81b=_0x1e3e5c['events'][_0x5c75dc['eventId']];if(_0x53c81b&&_0x53c81b['pages'][_0x5c75dc['pageId']-0x1]){const _0x4c79d7=_0x53c81b[_0x695821(0x1e5)][_0x5c75dc['pageId']-0x1][_0x695821(0x17f)];this[_0x695821(0x6ac)](_0x4c79d7,this['eventId']());}window[this[_0x695821(0x6c2)]]=undefined,this[_0x695821(0x6c2)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x1ca7ab=_0x4f6648;this[_0x1ca7ab(0x233)]['apply'](this,arguments);};function _0x4468(_0x1057bc,_0x4b62b6){const _0x588853=_0x5888();return _0x4468=function(_0x44682e,_0x34ee87){_0x44682e=_0x44682e-0x167;let _0x191d0f=_0x588853[_0x44682e];return _0x191d0f;},_0x4468(_0x1057bc,_0x4b62b6);}Game_CPCInterpreter[_0x4f6648(0x1a3)]=Object[_0x4f6648(0x201)](Game_Interpreter[_0x4f6648(0x1a3)]),Game_CPCInterpreter[_0x4f6648(0x1a3)][_0x4f6648(0x382)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x4f6648(0x1a3)][_0x4f6648(0x5f1)]=function(){const _0x3f85f4=_0x4f6648;Game_Interpreter[_0x3f85f4(0x1a3)]['clear'][_0x3f85f4(0x36c)](this),this[_0x3f85f4(0x3f0)]=![];},Game_CPCInterpreter[_0x4f6648(0x1a3)][_0x4f6648(0x3a6)]=function(){const _0x15a06c=_0x4f6648;while(this[_0x15a06c(0x58f)]()){this[_0x15a06c(0x237)]();}},Game_CPCInterpreter[_0x4f6648(0x1a3)]['executeCommonEvent']=function(_0x1923fe){const _0x2d5799=_0x4f6648;while(this[_0x2d5799(0x58f)]()){_0x2d5799(0x37b)!==_0x2d5799(0x37b)?(this[_0x2d5799(0x2b0)](),_0x19ba03['EventsMoveCore'][_0x2d5799(0x4ac)]['call'](this),this[_0x2d5799(0x336)]()):this['executeCommandCommonEvent'](_0x1923fe);}},Game_CPCInterpreter[_0x4f6648(0x1a3)][_0x4f6648(0x1cf)]=function(_0x3a77b2){const _0x3408a5=_0x4f6648,_0x1d5b94=_0x3a77b2;$gameTemp[_0x3408a5(0x3a5)](_0x1d5b94);const _0x55d986=VisuMZ['EventsMoveCore'][_0x3408a5(0x523)][_0x3408a5(0x36c)](this);return $gameTemp[_0x3408a5(0x4d3)](),_0x55d986;},Game_CPCInterpreter[_0x4f6648(0x1a3)][_0x4f6648(0x6e8)]=function(_0x477be6){const _0x211937=_0x4f6648;return Game_Interpreter[_0x211937(0x1a3)][_0x211937(0x6e8)][_0x211937(0x36c)](this,_0x477be6),this[_0x211937(0x6e5)][_0x211937(0x499)](_0x12f23a=>_0x12f23a['match'](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x211937(0x3f0)]=!![]),!![];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x62c)]=Scene_Map[_0x4f6648(0x1a3)][_0x4f6648(0x168)],Scene_Map[_0x4f6648(0x1a3)][_0x4f6648(0x168)]=function(){const _0x1eadc1=_0x4f6648;VisuMZ[_0x1eadc1(0x2f5)][_0x1eadc1(0x62c)]['call'](this),this[_0x1eadc1(0x1e2)]['hideShadows']();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3f6)]=Scene_Load[_0x4f6648(0x1a3)][_0x4f6648(0x608)],Scene_Load['prototype'][_0x4f6648(0x608)]=function(){const _0x20986b=_0x4f6648;if($gameMap)$gameMap[_0x20986b(0x422)]();VisuMZ['EventsMoveCore'][_0x20986b(0x3f6)][_0x20986b(0x36c)](this);},VisuMZ[_0x4f6648(0x2f5)]['Sprite_Character_initMembers']=Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x386)],Sprite_Character['prototype'][_0x4f6648(0x386)]=function(){const _0x4bb7a8=_0x4f6648;VisuMZ[_0x4bb7a8(0x2f5)]['Sprite_Character_initMembers'][_0x4bb7a8(0x36c)](this),this[_0x4bb7a8(0x18a)](),this[_0x4bb7a8(0x5ae)](),this[_0x4bb7a8(0x1dc)]();},Sprite_Character[_0x4f6648(0x1a3)]['initMembersEventsMoveCore']=function(){const _0x535f78=_0x4f6648;this[_0x535f78(0x51c)]=0xff;},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5ae)]=function(){const _0x39c74c=_0x4f6648;this['_attachPictureSprite']=new Sprite(),this[_0x39c74c(0x1c9)][_0x39c74c(0x46a)]['x']=0.5,this[_0x39c74c(0x1c9)][_0x39c74c(0x46a)]['y']=0x1,this[_0x39c74c(0x43b)](this[_0x39c74c(0x1c9)]),this[_0x39c74c(0x1d6)]();},Sprite_Character[_0x4f6648(0x1a3)]['createIconSprite']=function(){const _0x167c78=_0x4f6648;this['_eventIconSprite']=new Sprite(),this[_0x167c78(0x4d1)]['bitmap']=ImageManager[_0x167c78(0x4e4)](_0x167c78(0x2ba)),this[_0x167c78(0x4d1)][_0x167c78(0x4fc)][_0x167c78(0x2aa)]=![],this[_0x167c78(0x4d1)]['setFrame'](0x0,0x0,0x0,0x0),this[_0x167c78(0x4d1)]['anchor']['x']=0.5,this['_eventIconSprite'][_0x167c78(0x46a)]['y']=0x1,this[_0x167c78(0x43b)](this[_0x167c78(0x4d1)]);},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3cd)]=function(){const _0x586f05=_0x4f6648;return this[_0x586f05(0x1ee)]&&this[_0x586f05(0x1ee)][_0x586f05(0x6be)](/\[VS8\]/i);},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x33d)]=function(){const _0x1edc15=_0x4f6648;return this[_0x1edc15(0x3cd)]()&&VisuMZ[_0x1edc15(0x2f5)][_0x1edc15(0x3fc)][_0x1edc15(0x2af)]['AutoBuffer'];},VisuMZ[_0x4f6648(0x2f5)]['Sprite_Character_update']=Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x6c5)],Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x6c5)]=function(){const _0x4c1bfc=_0x4f6648;VisuMZ['EventsMoveCore'][_0x4c1bfc(0x582)][_0x4c1bfc(0x36c)](this),this[_0x4c1bfc(0x5df)]();},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x30c)]=function(){const _0x2af418=_0x4f6648;Sprite['prototype'][_0x2af418(0x30c)][_0x2af418(0x36c)](this),this[_0x2af418(0x3a2)]()&&(this['visible']=![]);},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3a2)]=function(){const _0x5adf5e=_0x4f6648;if(this[_0x5adf5e(0x2ca)]()>0x0)return![];if(this[_0x5adf5e(0x4f0)]){if(this[_0x5adf5e(0x4f0)][_0x5adf5e(0x2b3)]()!=='')return![];}return this['isEmptyCharacter']()||this[_0x5adf5e(0x4f0)]&&this[_0x5adf5e(0x4f0)][_0x5adf5e(0x22f)]();},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x5df)]=function(){const _0x32a46a=_0x4f6648;this['updateScaleBase'](),this[_0x32a46a(0x29f)](),this[_0x32a46a(0x6a2)](),this['updateEventIconSprite'](),this[_0x32a46a(0x361)](),this[_0x32a46a(0x4bd)](),this['updateAttachPictureSprite']();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x402)]=Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x6e4)],Sprite_Character[_0x4f6648(0x1a3)]['setTileBitmap']=function(){const _0x3bf1fc=_0x4f6648;VisuMZ['EventsMoveCore'][_0x3bf1fc(0x402)][_0x3bf1fc(0x36c)](this),this[_0x3bf1fc(0x4fc)][_0x3bf1fc(0x481)](this[_0x3bf1fc(0x709)][_0x3bf1fc(0x5c2)](this));},VisuMZ['EventsMoveCore'][_0x4f6648(0x1c0)]=Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x44a)],Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x44a)]=function(){const _0x47b912=_0x4f6648;VisuMZ['EventsMoveCore'][_0x47b912(0x1c0)][_0x47b912(0x36c)](this),this[_0x47b912(0x4fc)][_0x47b912(0x481)](this[_0x47b912(0x709)][_0x47b912(0x5c2)](this));},Sprite_Character[_0x4f6648(0x1a3)]['updateBitmapSmoothing']=function(){const _0x2b62a8=_0x4f6648;if(!this[_0x2b62a8(0x4fc)])return;this['bitmap'][_0x2b62a8(0x2aa)]=!!VisuMZ[_0x2b62a8(0x2f5)][_0x2b62a8(0x3fc)][_0x2b62a8(0x3ae)][_0x2b62a8(0x459)];},VisuMZ[_0x4f6648(0x2f5)]['Sprite_Character_characterPatternY']=Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x584)],Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x584)]=function(){const _0x36c370=_0x4f6648;if(this['isSpriteVS8dir']()){if('XEraA'!==_0x36c370(0x2c8))return this[_0x36c370(0x1a5)]();else this[_0x36c370(0x6cf)](_0x45ca72[_0x36c370(0x191)],_0x233240[_0x36c370(0x679)],!![]);}else return this[_0x36c370(0x661)]();},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x1a5)]=function(){const _0x4ed637=_0x4f6648,_0x33bca4=this[_0x4ed637(0x4f0)][_0x4ed637(0x4dc)]();let _0x21fbe9=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this['_character'][_0x4ed637(0x53a)]){if(_0x4ed637(0x18b)===_0x4ed637(0x57f)){const _0x13ec91=_0x457a75[_0x4ed637(0x273)](_0x552fb3(_0x19ee5e['$1']));return this[_0x4ed637(0x698)](_0x13ec91);}else _0x21fbe9=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}return(_0x21fbe9[_0x33bca4]-0x2)/0x2;},Sprite_Character['prototype'][_0x4f6648(0x661)]=function(){const _0x42e969=_0x4f6648;let _0x4e3c90=this['_character']['direction']();if(this['_character'][_0x42e969(0x53a)]){if(_0x4e3c90===0x4)'YJtSV'!=='EOmjc'?_0x4e3c90=0x6:this[_0x42e969(0x3ea)]['_character'][_0x42e969(0x378)](_0x52e64a,this[_0x42e969(0x246)]);else _0x4e3c90===0x6&&(_0x42e969(0x586)===_0x42e969(0x2f4)?this['_moveSynch'][_0x42e969(0x333)]=_0x5ae223(_0x43c1d2['$1']):_0x4e3c90=0x4);}return(_0x4e3c90-0x2)/0x2;},Sprite_Character['prototype'][_0x4f6648(0x2b0)]=function(){const _0x45a0fc=_0x4f6648;this[_0x45a0fc(0x4f7)]['x']=this[_0x45a0fc(0x4f0)]['_scaleX']??0x1,this[_0x45a0fc(0x4f7)]['y']=this[_0x45a0fc(0x4f0)][_0x45a0fc(0x235)]??0x1;},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x29f)]=function(){const _0x2b1af1=_0x4f6648;if(!VisuMZ['EventsMoveCore'][_0x2b1af1(0x3fc)][_0x2b1af1(0x3ae)][_0x2b1af1(0x5bb)])return;this[_0x2b1af1(0x373)]=0x0;if(this[_0x2b1af1(0x641)]()){const _0x26e3a4=VisuMZ[_0x2b1af1(0x2f5)]['Settings'][_0x2b1af1(0x3ae)],_0xf138ae=this[_0x2b1af1(0x4f0)][_0x2b1af1(0x4dc)]();let _0x47dba2=0x0;if([0x1,0x4,0x7][_0x2b1af1(0x328)](_0xf138ae))_0x47dba2=_0x26e3a4['TiltLeft'];if([0x3,0x6,0x9][_0x2b1af1(0x328)](_0xf138ae))_0x47dba2=_0x26e3a4['TiltRight'];[0x2,0x8][_0x2b1af1(0x328)](_0xf138ae)&&(_0x47dba2=[-_0x26e3a4[_0x2b1af1(0x6a8)],0x0,_0x26e3a4[_0x2b1af1(0x6a8)]][this[_0x2b1af1(0x4f0)]['pattern']()]);if(this[_0x2b1af1(0x30d)])_0x47dba2*=-0x1;this[_0x2b1af1(0x373)]=_0x47dba2;}},Sprite_Character[_0x4f6648(0x1a3)]['isAllowCharacterTilt']=function(){const _0x5b60df=_0x4f6648;if(this[_0x5b60df(0x566)])return![];return this[_0x5b60df(0x4f0)][_0x5b60df(0x509)]()&&!this[_0x5b60df(0x4f0)][_0x5b60df(0x598)]()&&!this[_0x5b60df(0x4f0)][_0x5b60df(0x599)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character['prototype'][_0x4f6648(0x6a2)]=function(){const _0x5700f8=_0x4f6648;if(!this['_shadowSprite'])return;this[_0x5700f8(0x177)]['x']=this[_0x5700f8(0x4f0)][_0x5700f8(0x3c1)](),this[_0x5700f8(0x177)]['y']=this['_character']['shadowY'](),this['_shadowSprite']['opacity']=this[_0x5700f8(0x6b0)],this[_0x5700f8(0x177)][_0x5700f8(0x452)]=this[_0x5700f8(0x4f0)][_0x5700f8(0x1fd)](),this[_0x5700f8(0x177)]['_hidden']=this[_0x5700f8(0x1e4)];if(this[_0x5700f8(0x4f0)][_0x5700f8(0x6dc)]())this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']=Math[_0x5700f8(0x1a4)](0x0,this['_shadowSprite'][_0x5700f8(0x4f7)]['x']-0.1),this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']=Math[_0x5700f8(0x1a4)](0x0,this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']-0.1);else{if('joaQo'!=='joaQo')return this[_0x5700f8(0x308)]();else{if(this['_shadowSprite']['scale']['x']!==this[_0x5700f8(0x4f7)]['x']){if(this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']>this['scale']['x'])this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']=Math[_0x5700f8(0x5cd)](this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']+0.1,this[_0x5700f8(0x4f7)]['x']);if(this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']<this['scale']['x'])this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']=Math[_0x5700f8(0x1a4)](this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['x']-0.1,this[_0x5700f8(0x4f7)]['x']);}if(this['_shadowSprite'][_0x5700f8(0x4f7)]['y']!==this[_0x5700f8(0x4f7)]['y']){if(this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']>this[_0x5700f8(0x4f7)]['y'])this['_shadowSprite'][_0x5700f8(0x4f7)]['y']=Math[_0x5700f8(0x5cd)](this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']+0.1,this[_0x5700f8(0x4f7)]['y']);if(this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']<this[_0x5700f8(0x4f7)]['y'])this[_0x5700f8(0x177)][_0x5700f8(0x4f7)]['y']=Math[_0x5700f8(0x1a4)](this['_shadowSprite'][_0x5700f8(0x4f7)]['y']-0.1,this['scale']['y']);}}}},Sprite_Character['prototype'][_0x4f6648(0x23e)]=function(){const _0x2e2774=_0x4f6648;if(!this[_0x2e2774(0x4d1)])return;const _0x29154d=this[_0x2e2774(0x4d1)],_0x3d87f1=this[_0x2e2774(0x2ca)]();if(_0x3d87f1<=0x0)return'uwcpV'!==_0x2e2774(0x671)?_0x29154d['setFrame'](0x0,0x0,0x0,0x0):!![];else{const _0x3f5f50=ImageManager['iconWidth'],_0x4baa0c=ImageManager['iconHeight'],_0x1d2cad=_0x3d87f1%0x10*_0x3f5f50,_0x3439a8=Math['floor'](_0x3d87f1/0x10)*_0x4baa0c;_0x29154d['setFrame'](_0x1d2cad,_0x3439a8,_0x3f5f50,_0x4baa0c),this[_0x2e2774(0x452)]=!![];}const _0x5c495c=this['_character'][_0x2e2774(0x1bb)]();if(this[_0x2e2774(0x33d)]())_0x2e2774(0x25a)!==_0x2e2774(0x25a)?this[_0x2e2774(0x3ea)][_0x2e2774(0x4f0)]['isSpriteVS8dir']()&&(this['x']+=_0x3a5e4d[_0x2e2774(0x2f5)][_0x2e2774(0x3fc)][_0x2e2774(0x2af)]['BalloonOffsetX'],this['y']+=_0x32757b['EventsMoveCore'][_0x2e2774(0x3fc)][_0x2e2774(0x2af)][_0x2e2774(0x672)]):this[_0x2e2774(0x4ec)](_0x29154d);else{if(_0x2e2774(0x2e2)===_0x2e2774(0x6db)){const _0x17b9cd=new _0x83957f(0x0,0x0,0x1,0x1);this['_proxyWindow']=new _0x13b527(_0x17b9cd),this['_proxyWindow'][_0x2e2774(0x647)]=0x0,this[_0x2e2774(0x6b0)]=this[_0x2e2774(0x3e5)]()?0xff:0x0;}else _0x29154d['x']=_0x5c495c?_0x5c495c['bufferX']:0x0,_0x29154d['y']=_0x5c495c?-this[_0x2e2774(0x272)]+_0x5c495c[_0x2e2774(0x1a9)]:0x0;}_0x29154d['blendMode']=_0x5c495c?_0x5c495c[_0x2e2774(0x68a)]:0x0,this['removeChild'](_0x29154d),this[_0x2e2774(0x43b)](_0x29154d),_0x29154d[_0x2e2774(0x373)]=-this['rotation'];},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x361)]=function(){const _0x9f95a9=_0x4f6648;if(!this[_0x9f95a9(0x4f0)])return;if(this[_0x9f95a9(0x4f0)][_0x9f95a9(0x1f5)]===undefined)return;if(this[_0x9f95a9(0x4f0)][_0x9f95a9(0x1f5)]===![])return;this['z']=this[_0x9f95a9(0x4f0)][_0x9f95a9(0x1f5)];if(this[_0x9f95a9(0x177)]){if(_0x9f95a9(0x224)!==_0x9f95a9(0x707)){if(this['z']<0x0){if(_0x9f95a9(0x295)!==_0x9f95a9(0x2eb))this[_0x9f95a9(0x177)]['z']=this['z']-0x1;else{const _0xf3d5dd=this[_0x9f95a9(0x4f8)][_0x9f95a9(0x696)](this[_0x9f95a9(0x43e)]),_0x1702d7=this[_0x9f95a9(0x4f8)][_0x9f95a9(0x1c8)](),_0x5b6c5e=_0xf3d5dd[_0x9f95a9(0x445)]+_0x1702d7*0x2,_0x315c4e=_0xf3d5dd['height'];this[_0x9f95a9(0x4f8)]['move'](0x0,0x0,_0x5b6c5e,_0x315c4e),this[_0x9f95a9(0x4f8)][_0x9f95a9(0x170)](),this[_0x9f95a9(0x4fc)]=this[_0x9f95a9(0x4f8)]['contents'];}}else{if('PAlio'===_0x9f95a9(0x4c2)){if(_0xfb611d[_0x9f95a9(0x6aa)]())_0x5d26aa[_0x9f95a9(0x216)](_0x38be57);}else this[_0x9f95a9(0x177)]['z']=0x0;}}else this[_0x9f95a9(0x1ab)](_0x1f644e);}},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x4bd)]=function(){const _0x4dd47e=_0x4f6648;if(!this[_0x4dd47e(0x4f0)])return;let _0x5872c2=!!this[_0x4dd47e(0x4f0)][_0x4dd47e(0x53a)];this[_0x4dd47e(0x4f7)]['x']=Math[_0x4dd47e(0x5e0)](this['scale']['x'])*(_0x5872c2?-0x1:0x1);},Sprite_Character['prototype'][_0x4f6648(0x4ec)]=function(_0x28c72e){const _0x2b71b3=_0x4f6648;_0x28c72e['x']=0x0,_0x28c72e['y']=-this['height']+this[_0x2b71b3(0x272)]*0x2/0x5;if(this[_0x2b71b3(0x4f0)][_0x2b71b3(0x53b)]()!==0x1){if(_0x2b71b3(0x633)===_0x2b71b3(0x633))_0x28c72e['y']+=0x1;else return this[_0x2b71b3(0x42d)](_0x540e6f);}},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x2ca)]=function(){const _0x4dc18b=_0x4f6648;if(!this[_0x4dc18b(0x4f0)])return 0x0;if(this[_0x4dc18b(0x4f0)]['_erased'])return 0x0;const _0x4f508e=this[_0x4dc18b(0x4f0)][_0x4dc18b(0x1bb)]();return _0x4f508e?_0x4f508e[_0x4dc18b(0x453)]||0x0:0x0;},Sprite_Character[_0x4f6648(0x1a3)]['updateAttachPictureSprite']=function(){const _0x4453d2=_0x4f6648;if(!this[_0x4453d2(0x1c9)])return;if(!this[_0x4453d2(0x4f0)])return;this['setupAttachPictureBitmap'](),this[_0x4453d2(0x46c)]();},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x3c8)]=function(){const _0x34eb71=_0x4f6648;if(!this[_0x34eb71(0x173)]())return;const _0x28c778=this[_0x34eb71(0x4f0)][_0x34eb71(0x5d5)]();this['_lastAttachPictureFilename']=_0x28c778[_0x34eb71(0x176)],this[_0x34eb71(0x2ef)]=_0x28c778['maxSize'],this['_lastAttachPictureScale']=_0x28c778[_0x34eb71(0x4f7)];if(_0x28c778['filename']!==''){if(_0x34eb71(0x6f7)!==_0x34eb71(0x6bb)){const _0x3c0a67=ImageManager[_0x34eb71(0x1ea)](_0x28c778[_0x34eb71(0x176)]);_0x3c0a67[_0x34eb71(0x481)](this['onLoadAttachPicture'][_0x34eb71(0x5c2)](this,_0x3c0a67));}else{if(!this[_0x34eb71(0x640)])return;const _0x1fa24b=new _0x24ad93(_0x520140);this[_0x34eb71(0x640)][_0x34eb71(0x43b)](_0x1fa24b);}}else this['_attachPictureSprite']['bitmap']=new Bitmap(0x1,0x1);},Sprite_Character['prototype'][_0x4f6648(0x46c)]=function(){const _0x4f5ee7=_0x4f6648,_0x14d353=this[_0x4f5ee7(0x1c9)];_0x14d353['x']=this[_0x4f5ee7(0x4f0)][_0x4f5ee7(0x2e8)](),_0x14d353['y']=this['_character'][_0x4f5ee7(0x3c5)](),_0x14d353[_0x4f5ee7(0x68a)]=this[_0x4f5ee7(0x4f0)][_0x4f5ee7(0x5f0)]();},Sprite_Character['prototype'][_0x4f6648(0x173)]=function(){const _0x48c50a=_0x4f6648,_0x1eb02a=this[_0x48c50a(0x4f0)][_0x48c50a(0x5d5)]();if(_0x1eb02a){if(_0x48c50a(0x26c)!==_0x48c50a(0x26c)){const _0x4bfc65=[_0x3d9f84['_mapId'],_0x3c1dc5[_0x48c50a(0x575)],_0x48c50a(0x27e)['format'](_0x14bf09)];return _0x4ed356['value'](_0x4bfc65);}else{if(this[_0x48c50a(0x2d3)]!==_0x1eb02a[_0x48c50a(0x176)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x1eb02a[_0x48c50a(0x19f)])return!![];if(this[_0x48c50a(0x71e)]!==_0x1eb02a[_0x48c50a(0x4f7)])return!![];}}return![];},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x474)]=function(_0x334e17){const _0x3b66a0=_0x4f6648,_0x5782a6=this[_0x3b66a0(0x1c9)];_0x5782a6[_0x3b66a0(0x4fc)]=_0x334e17;const _0xca3dd3=this[_0x3b66a0(0x4f0)][_0x3b66a0(0x5d5)](),_0x33cbd9=_0xca3dd3[_0x3b66a0(0x19f)],_0x582e66=_0xca3dd3['scale'];let _0x3f5057=0x1;if(_0x33cbd9>0x0){let _0x1cd0d3=this[_0x3b66a0(0x2ea)]()||0x1,_0x202b44=this[_0x3b66a0(0x208)]()||0x1;const _0x402d47=Math[_0x3b66a0(0x1a4)](0x1,_0x1cd0d3,_0x202b44);_0x3f5057=_0x33cbd9/_0x402d47;}_0x3f5057*=_0x582e66;if(_0x3f5057!==0x1){if(_0x3b66a0(0x299)===_0x3b66a0(0x4fb)){const _0x1fe168=this['firstSpawnedEvent']();return _0x1fe168?_0x1fe168[_0x3b66a0(0x575)]:0x0;}else this[_0x3b66a0(0x1c9)][_0x3b66a0(0x4fc)][_0x3b66a0(0x2aa)]=!![];}_0x5782a6[_0x3b66a0(0x4f7)]['x']=_0x3f5057,_0x5782a6['scale']['y']=_0x3f5057,this[_0x3b66a0(0x452)]=!![],this[_0x3b66a0(0x46c)]();},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x2ea)]=function(){const _0x2bc5a4=_0x4f6648,_0x2891d0=this[_0x2bc5a4(0x1c9)];if(!_0x2891d0)return 0x0;return _0x2891d0[_0x2bc5a4(0x4fc)][_0x2bc5a4(0x445)];},Sprite_Character[_0x4f6648(0x1a3)][_0x4f6648(0x208)]=function(){const _0x5eb585=_0x4f6648,_0x5d03a2=this[_0x5eb585(0x1c9)];if(!_0x5d03a2)return 0x0;return _0x5d03a2['bitmap'][_0x5eb585(0x272)];},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x5ac)]=Sprite_Balloon[_0x4f6648(0x1a3)][_0x4f6648(0x287)],Sprite_Balloon[_0x4f6648(0x1a3)][_0x4f6648(0x287)]=function(_0x53170c,_0x4042dc){const _0x2b3d16=_0x4f6648;VisuMZ[_0x2b3d16(0x2f5)][_0x2b3d16(0x5ac)][_0x2b3d16(0x36c)](this,_0x53170c,_0x4042dc);if(VisuMZ[_0x2b3d16(0x2f5)][_0x2b3d16(0x3fc)][_0x2b3d16(0x2af)][_0x2b3d16(0x3a7)]){if(_0x2b3d16(0x48a)!==_0x2b3d16(0x695))this['_target'][_0x2b3d16(0x4f0)][_0x2b3d16(0x378)](_0x4042dc,this[_0x2b3d16(0x246)]);else return this['_vehicleType']==='airship'?this['vehicle']()[_0x2b3d16(0x4a4)](_0x2ecb07,_0x2427bb,_0xfaf71d):_0x1d9406[_0x2b3d16(0x2f5)][_0x2b3d16(0x5a6)][_0x2b3d16(0x36c)](this,_0x1ce2a6,_0x3120c8,_0x2e144b);}},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3a0)]=Sprite_Balloon['prototype'][_0x4f6648(0x539)],Sprite_Balloon[_0x4f6648(0x1a3)][_0x4f6648(0x539)]=function(){const _0x3fd21b=_0x4f6648;VisuMZ['EventsMoveCore'][_0x3fd21b(0x3a0)][_0x3fd21b(0x36c)](this),this[_0x3fd21b(0x690)]();},Sprite_Balloon['prototype']['updateVS8BalloonOffsets']=function(){const _0xa3ce3e=_0x4f6648;this[_0xa3ce3e(0x3ea)]['_character']['isSpriteVS8dir']()&&(_0xa3ce3e(0x3c7)==='OLJyL'?this[_0xa3ce3e(0x1c9)][_0xa3ce3e(0x4fc)][_0xa3ce3e(0x2aa)]=!![]:(this['x']+=VisuMZ[_0xa3ce3e(0x2f5)][_0xa3ce3e(0x3fc)][_0xa3ce3e(0x2af)][_0xa3ce3e(0x271)],this['y']+=VisuMZ[_0xa3ce3e(0x2f5)]['Settings'][_0xa3ce3e(0x2af)][_0xa3ce3e(0x672)]));},Sprite_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x449)]=function(){const _0x11160b=_0x4f6648;this[_0x11160b(0x4fc)]=new Bitmap(Math[_0x11160b(0x6fb)](Graphics['boxWidth']/0x2),0x30),this[_0x11160b(0x4fc)]['fontFace']=this[_0x11160b(0x21c)](),this[_0x11160b(0x4fc)]['fontSize']=this[_0x11160b(0x3b5)](),this[_0x11160b(0x4fc)]['outlineColor']=ColorManager[_0x11160b(0x242)]();},Sprite_Timer[_0x4f6648(0x1a3)][_0x4f6648(0x187)]=function(){const _0x23149d=_0x4f6648,_0x20d456=Math[_0x23149d(0x36a)](this['_seconds']/0x3c/0x3c),_0x24c810=Math['floor'](this[_0x23149d(0x22c)]/0x3c)%0x3c,_0x5c8e79=this['_seconds']%0x3c;let _0x3fce30=_0x24c810[_0x23149d(0x3ff)](0x2)+':'+_0x5c8e79[_0x23149d(0x3ff)](0x2);if(_0x20d456>0x0)_0x3fce30=_0x23149d(0x511)[_0x23149d(0x4a2)](_0x20d456,_0x3fce30);return _0x3fce30;};function Sprite_EventLabel(){this['initialize'](...arguments);}Sprite_EventLabel[_0x4f6648(0x1a3)]=Object[_0x4f6648(0x201)](Sprite[_0x4f6648(0x1a3)]),Sprite_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x382)]=Sprite_EventLabel,Sprite_EventLabel[_0x4f6648(0x1a3)]['initialize']=function(_0x5ed8f2){const _0x12546c=_0x4f6648;this[_0x12546c(0x6ce)]=_0x5ed8f2,Sprite[_0x12546c(0x1a3)][_0x12546c(0x233)][_0x12546c(0x36c)](this),this[_0x12546c(0x386)](),this['createProxyWindow']();},Sprite_EventLabel[_0x4f6648(0x1a3)]['initMembers']=function(){const _0x461a0c=_0x4f6648;this[_0x461a0c(0x46a)]['x']=0.5,this[_0x461a0c(0x46a)]['y']=0x1;},Sprite_EventLabel['prototype']['createProxyWindow']=function(){const _0x4f2be3=_0x4f6648,_0x30548f=new Rectangle(0x0,0x0,0x1,0x1);this[_0x4f2be3(0x4f8)]=new Window_Base(_0x30548f),this[_0x4f2be3(0x4f8)]['padding']=0x0,this[_0x4f2be3(0x6b0)]=this[_0x4f2be3(0x3e5)]()?0xff:0x0;},Sprite_EventLabel['prototype']['update']=function(){const _0x710be4=_0x4f6648;Sprite[_0x710be4(0x1a3)][_0x710be4(0x6c5)][_0x710be4(0x36c)](this),this[_0x710be4(0x69b)](),this['updateScale'](),this['updatePosition'](),this[_0x710be4(0x581)](),this[_0x710be4(0x2d9)]();},Sprite_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x69b)]=function(){const _0x52349c=_0x4f6648;this['_event']['labelWindowText']()!==this[_0x52349c(0x43e)]&&(this[_0x52349c(0x43e)]=this[_0x52349c(0x6ce)]['labelWindowText'](),this[_0x52349c(0x491)]());},Sprite_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x491)]=function(){const _0x288c0e=_0x4f6648;if(!this[_0x288c0e(0x4f8)])return;this['resizeWindow'](),this[_0x288c0e(0x206)]();},Sprite_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x464)]=function(){const _0x3a8b8c=_0x4f6648,_0x684805=this['_proxyWindow']['textSizeEx'](this[_0x3a8b8c(0x43e)]),_0x5812e7=this[_0x3a8b8c(0x4f8)][_0x3a8b8c(0x1c8)](),_0x40e833=_0x684805[_0x3a8b8c(0x445)]+_0x5812e7*0x2,_0x11476e=_0x684805[_0x3a8b8c(0x272)];this[_0x3a8b8c(0x4f8)]['move'](0x0,0x0,_0x40e833,_0x11476e),this[_0x3a8b8c(0x4f8)]['createContents'](),this[_0x3a8b8c(0x4fc)]=this[_0x3a8b8c(0x4f8)][_0x3a8b8c(0x41d)];},Sprite_EventLabel[_0x4f6648(0x1a3)]['drawText']=function(){const _0x4df86b=_0x4f6648,_0x846f2f=this[_0x4df86b(0x4f8)][_0x4df86b(0x1c8)]();this[_0x4df86b(0x4f8)][_0x4df86b(0x34d)](this[_0x4df86b(0x43e)],_0x846f2f,0x0);},Sprite_EventLabel['prototype']['updateScale']=function(){const _0x59739b=_0x4f6648,_0x3bdfba=VisuMZ[_0x59739b(0x2f5)][_0x59739b(0x3fc)][_0x59739b(0x24f)][_0x59739b(0x49f)],_0x3ecd28=$gameSystem[_0x59739b(0x2bc)]()||0x1;this[_0x59739b(0x4f7)]['x']=this[_0x59739b(0x4f7)]['y']=_0x3bdfba/_0x3ecd28;},Sprite_EventLabel[_0x4f6648(0x1a3)]['updatePosition']=function(){const _0x52000e=_0x4f6648;if(!SceneManager[_0x52000e(0x355)])return;if(!SceneManager[_0x52000e(0x355)][_0x52000e(0x1e2)])return;const _0x416864=SceneManager[_0x52000e(0x355)][_0x52000e(0x1e2)][_0x52000e(0x2bb)](this['_event']);if(!_0x416864)return;this['x']=this[_0x52000e(0x6ce)][_0x52000e(0x71c)](),this['x']+=this['_event'][_0x52000e(0x21a)][_0x52000e(0x40c)],this['y']=this[_0x52000e(0x6ce)]['screenY']()-_0x416864[_0x52000e(0x272)]*_0x416864[_0x52000e(0x4f7)]['y'],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this['_event'][_0x52000e(0x21a)][_0x52000e(0x2a8)];},Sprite_EventLabel['prototype']['updateOpacity']=function(){const _0x3acbc3=_0x4f6648;if(this['isLabelVisible']()){if(_0x3acbc3(0x6c0)!==_0x3acbc3(0x1e7))this[_0x3acbc3(0x6b0)]+=this[_0x3acbc3(0x360)]();else{const _0x321c93=_0x1996fa['event'](_0x509527[_0x3acbc3(0x60f)]||_0x229b1d['eventId']());_0x321c93[_0x3acbc3(0x666)]();}}else SceneManager[_0x3acbc3(0x355)][_0x3acbc3(0x2ad)]>0x0?this[_0x3acbc3(0x6b0)]=0x0:this['opacity']-=this['opacitySpeed']();},Sprite_EventLabel['prototype'][_0x4f6648(0x2d9)]=function(){const _0x304fb5=_0x4f6648;if(this[_0x304fb5(0x3e5)]()&&this[_0x304fb5(0x6ce)]&&this['_event'][_0x304fb5(0x21a)]['hueShift']){const _0x3f3545=this[_0x304fb5(0x3fa)]+(this[_0x304fb5(0x6ce)][_0x304fb5(0x21a)][_0x304fb5(0x5f8)]||0x0);this[_0x304fb5(0x39e)](_0x3f3545);}},Sprite_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x3e5)]=function(){const _0x517d01=_0x4f6648;if(!$gameSystem[_0x517d01(0x2da)]())return![];if(this[_0x517d01(0x6ce)]?.[_0x517d01(0x2ec)])return![];if(this['_event']&&this[_0x517d01(0x6ce)]['_pageIndex']<0x0)return![];if(SceneManager[_0x517d01(0x355)][_0x517d01(0x2ad)]>0x0)return![];const _0x5ef7bd=$gamePlayer['x'],_0x73e8bd=$gamePlayer['y'],_0x1ade6f=this[_0x517d01(0x6ce)]['x'],_0x11b2d6=this[_0x517d01(0x6ce)]['y'];if(this[_0x517d01(0x194)]===_0x5ef7bd&&this['_visiblePlayerY']===_0x73e8bd&&this[_0x517d01(0x686)]===_0x1ade6f&&this[_0x517d01(0x1e9)]===_0x11b2d6)return this[_0x517d01(0x56c)];this[_0x517d01(0x194)]=$gamePlayer['x'],this[_0x517d01(0x19c)]=$gamePlayer['y'],this[_0x517d01(0x686)]=this[_0x517d01(0x6ce)]['x'],this['_visibleEventY']=this[_0x517d01(0x6ce)]['y'];if($gameMap[_0x517d01(0x254)](_0x5ef7bd,_0x73e8bd,_0x1ade6f,_0x11b2d6)>this[_0x517d01(0x6ce)][_0x517d01(0x324)]()){if(_0x517d01(0x5b8)===_0x517d01(0x354))_0xdb2be2[_0x517d01(0x58b)](0x1,0x3,0x7,0x9);else return this[_0x517d01(0x56c)]=![],![];}return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel['prototype'][_0x4f6648(0x360)]=function(){const _0x1de8e6=_0x4f6648;return VisuMZ[_0x1de8e6(0x2f5)][_0x1de8e6(0x3fc)][_0x1de8e6(0x24f)]['OpacitySpeed'];};function Sprite_VisuMz_MessagePopup(){const _0x1a5deb=_0x4f6648;this[_0x1a5deb(0x233)](...arguments);}Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)]=Object['create'](Sprite[_0x4f6648(0x1a3)]),Sprite_VisuMz_MessagePopup['prototype'][_0x4f6648(0x382)]=Sprite_VisuMz_MessagePopup,Sprite_VisuMz_MessagePopup['prototype'][_0x4f6648(0x233)]=function(_0x123fce){const _0x114d3e=_0x4f6648;this[_0x114d3e(0x2a1)]=_0x123fce,Sprite[_0x114d3e(0x1a3)]['initialize']['call'](this),this[_0x114d3e(0x386)](),this['createDummyWindow'](),this[_0x114d3e(0x2d7)](),this[_0x114d3e(0x6c5)]();},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x386)]=function(){const _0x11200c=_0x4f6648;this[_0x11200c(0x246)]=this[_0x11200c(0x2a1)]['duration'],this[_0x11200c(0x547)]=this[_0x11200c(0x2a1)]['duration'],this['z']=0x6,this[_0x11200c(0x439)]=this[_0x11200c(0x2a1)][_0x11200c(0x5a0)][_0x11200c(0x1f4)],this['_fadeInDuration']>0x0&&this[_0x11200c(0x439)]>=Math[_0x11200c(0x36a)](this[_0x11200c(0x246)]*0.48)&&(this['_fadeInDuration']=Math[_0x11200c(0x36a)](this[_0x11200c(0x246)]*0.48)),this[_0x11200c(0x6b0)]=this[_0x11200c(0x439)]>0x0?0x0:0xff,this[_0x11200c(0x446)]=this['_settings'][_0x11200c(0x5a0)]['fadeOut'],this[_0x11200c(0x446)]>0x0&&this[_0x11200c(0x446)]>=Math['floor'](this[_0x11200c(0x246)]*0.48)&&(this[_0x11200c(0x446)]=Math[_0x11200c(0x36a)](this[_0x11200c(0x246)]*0.48)),this[_0x11200c(0x46b)]=this[_0x11200c(0x446)],this[_0x11200c(0x1ff)]=this[_0x11200c(0x2a1)][_0x11200c(0x61d)]['x'],this['_startY']=this[_0x11200c(0x2a1)][_0x11200c(0x61d)]['y'],this[_0x11200c(0x570)]=this['_settings'][_0x11200c(0x52f)]['x'],this[_0x11200c(0x5fe)]=this[_0x11200c(0x2a1)][_0x11200c(0x52f)]['y'],this[_0x11200c(0x69d)]=this['_startX'],this[_0x11200c(0x209)]=this[_0x11200c(0x6b9)],this[_0x11200c(0x3f8)]=this[_0x11200c(0x2a1)][_0x11200c(0x55c)]['x'],this['_startScaleY']=this[_0x11200c(0x2a1)][_0x11200c(0x55c)]['y'],this[_0x11200c(0x3ca)]=this[_0x11200c(0x2a1)][_0x11200c(0x6a1)]['x'],this[_0x11200c(0x5eb)]=this[_0x11200c(0x2a1)][_0x11200c(0x6a1)]['y'],this[_0x11200c(0x3af)]=-this[_0x11200c(0x2a1)][_0x11200c(0x369)][_0x11200c(0x5bf)],this[_0x11200c(0x327)]=-this[_0x11200c(0x2a1)][_0x11200c(0x369)][_0x11200c(0x35d)],this[_0x11200c(0x621)]=-this[_0x11200c(0x2a1)]['misc']['arc'],this['_currentArc']=0x0;},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x293)]=function(){const _0x2c45b7=_0x4f6648,_0x1c5f4f=this['_settings'],_0x4df4e2=new Rectangle(0x0,0x0,Graphics['width'],Graphics[_0x2c45b7(0x272)]);this[_0x2c45b7(0x4b5)]=new Window_Base(_0x4df4e2);const _0x2f96db=this[_0x2c45b7(0x4b5)][_0x2c45b7(0x696)](_0x1c5f4f['text']),_0x2a695c=_0x2f96db[_0x2c45b7(0x445)],_0xf5e61d=_0x2f96db[_0x2c45b7(0x272)],_0xacd1b1=_0x2a695c+$gameSystem[_0x2c45b7(0x466)]()*0x2,_0x5322a2=_0xf5e61d+$gameSystem[_0x2c45b7(0x466)]()*0x2;this['_dummyWindow'][_0x2c45b7(0x514)](0x0,0x0,_0xacd1b1,_0x5322a2),this[_0x2c45b7(0x4b5)]['createContents'](),this[_0x2c45b7(0x4b5)][_0x2c45b7(0x34d)](_0x1c5f4f[_0x2c45b7(0x43c)],0x0,0x0);},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)]['createTextSprite']=function(){const _0x2416f7=_0x4f6648;this['_textSprite']=new Sprite(),this[_0x2416f7(0x389)][_0x2416f7(0x4fc)]=this[_0x2416f7(0x4b5)][_0x2416f7(0x41d)],this[_0x2416f7(0x389)][_0x2416f7(0x46a)]['x']=0.5,this[_0x2416f7(0x389)][_0x2416f7(0x46a)]['y']=0.5,this[_0x2416f7(0x389)]['x']=this['_startX'],this[_0x2416f7(0x389)]['y']=this[_0x2416f7(0x6b9)],this[_0x2416f7(0x389)][_0x2416f7(0x4f7)]['x']=this['_startScaleX'],this[_0x2416f7(0x389)][_0x2416f7(0x4f7)]['y']=this[_0x2416f7(0x534)],this['_textSprite'][_0x2416f7(0x369)]=this['_startAngle'],this['addChild'](this[_0x2416f7(0x389)]);},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)]['update']=function(){const _0x5040bd=_0x4f6648;Sprite[_0x5040bd(0x1a3)]['update']['call'](this);if(!this[_0x5040bd(0x5f4)]())return;this['updateSpritePosition'](),this[_0x5040bd(0x615)](),this[_0x5040bd(0x35a)](),this[_0x5040bd(0x284)](),this['updateOpacity'](),this['updateDuration']();},Sprite_VisuMz_MessagePopup['prototype'][_0x4f6648(0x5f4)]=function(){const _0x4ef28c=_0x4f6648;return!!this[_0x4ef28c(0x389)];},Sprite_VisuMz_MessagePopup['prototype'][_0x4f6648(0x711)]=function(){const _0x506803=_0x4f6648,_0x2a07ae=this[_0x506803(0x2a1)];{if(_0x506803(0x479)!==_0x506803(0x477)){const _0x548c35=$gameMap[_0x506803(0x71b)](),_0x19007c=_0x2a07ae['tileCoordinates']['x'],_0x4156f6=$gameMap[_0x506803(0x374)](_0x19007c);this['x']=Math[_0x506803(0x36a)](_0x4156f6*_0x548c35+_0x548c35/0x2);}else{if(_0xcdb015[_0x506803(0x355)][_0x506803(0x382)]===_0x37e846)return![];return _0x130c32[_0x506803(0x30f)][_0x506803(0x328)](_0x1027d1);}}{const _0x38ab1b=$gameMap['tileHeight'](),_0x4d155=_0x2a07ae[_0x506803(0x1c7)]['y'],_0x753c36=$gameMap['adjustY'](_0x4d155);this['y']=Math[_0x506803(0x36a)](_0x753c36*_0x38ab1b+_0x38ab1b);}},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x615)]=function(){const _0x41c505=_0x4f6648;if(this[_0x41c505(0x246)]<=0x0)return;const _0x38b760=this['_duration'],_0x3b78b7=this['_wholeDuration'];{_0x41c505(0x3d4)==='LAHgd'?(this['_offsetX']=(this[_0x41c505(0x69d)]*(_0x38b760-0x1)+this[_0x41c505(0x570)])/_0x38b760,this[_0x41c505(0x209)]=(this[_0x41c505(0x209)]*(_0x38b760-0x1)+this[_0x41c505(0x5fe)])/_0x38b760):this[_0x41c505(0x665)]();}{if(_0x41c505(0x1f0)!==_0x41c505(0x1ed)){const _0x15c786=_0x3b78b7-_0x38b760,_0x4778be=_0x3b78b7/0x2,_0x8e44ac=this['_arcPeak'],_0x39f922=-_0x8e44ac/Math[_0x41c505(0x63e)](_0x4778be,0x2);this[_0x41c505(0x63b)]=_0x39f922*Math['pow'](_0x15c786-_0x4778be,0x2)+_0x8e44ac;}else _0x5bd356[_0x41c505(0x1b5)](_0x46c930,!!_0x2d82b9);}this[_0x41c505(0x389)]['x']=this[_0x41c505(0x69d)],this[_0x41c505(0x389)]['y']=this['_offsetY']+this[_0x41c505(0x63b)];},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x35a)]=function(){const _0x824ad2=_0x4f6648;if(this[_0x824ad2(0x246)]<=0x0)return;const _0x38940a=this[_0x824ad2(0x246)];this['_textSprite'][_0x824ad2(0x4f7)]['x']=(this[_0x824ad2(0x389)]['scale']['x']*(_0x38940a-0x1)+this[_0x824ad2(0x3ca)])/_0x38940a,this[_0x824ad2(0x389)][_0x824ad2(0x4f7)]['y']=(this['_textSprite'][_0x824ad2(0x4f7)]['y']*(_0x38940a-0x1)+this['_targetScaleY'])/_0x38940a;},Sprite_VisuMz_MessagePopup['prototype'][_0x4f6648(0x284)]=function(){const _0x58d5e2=_0x4f6648;if(this['_duration']<=0x0)return;const _0x961f20=this[_0x58d5e2(0x246)];this[_0x58d5e2(0x389)][_0x58d5e2(0x369)]=(this[_0x58d5e2(0x389)]['angle']*(_0x961f20-0x1)+this[_0x58d5e2(0x327)])/_0x961f20;},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x581)]=function(){const _0x55220b=_0x4f6648;this[_0x55220b(0x358)](),this[_0x55220b(0x2c9)]();},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)]['updateFadeIn']=function(){const _0x187917=_0x4f6648;if(this['_fadeInDuration']<=0x0)return;const _0x1c87ae=this[_0x187917(0x439)];this[_0x187917(0x6b0)]=(this[_0x187917(0x6b0)]*(_0x1c87ae-0x1)+0xff)/_0x1c87ae,this[_0x187917(0x439)]--;if(this['_fadeInDuration']<=0x0){if('xaObq'===_0x187917(0x2d0)){const _0x4081a3=this[_0x187917(0x696)](_0x76189b),_0x27254e=_0x271daa[_0x187917(0x36a)]((this['innerWidth']-_0x4081a3['width'])/0x2);this[_0x187917(0x34d)](_0x331f5d,_0x27254e,_0x200450),_0x5cef36+=_0x4081a3[_0x187917(0x272)];}else this['opacity']=0xff;}},Sprite_VisuMz_MessagePopup['prototype']['updateFadeOut']=function(){const _0x5f31b6=_0x4f6648;if(this[_0x5f31b6(0x446)]<=0x0)return;if(this[_0x5f31b6(0x246)]>this[_0x5f31b6(0x46b)])return;const _0x3a5a2e=this[_0x5f31b6(0x446)];this[_0x5f31b6(0x6b0)]=(this[_0x5f31b6(0x6b0)]*(_0x3a5a2e-0x1)+0x0)/_0x3a5a2e,this[_0x5f31b6(0x446)]--,this[_0x5f31b6(0x446)]<=0x0&&(this[_0x5f31b6(0x6b0)]=0x0);},Sprite_VisuMz_MessagePopup[_0x4f6648(0x1a3)][_0x4f6648(0x607)]=function(){const _0x3830a5=_0x4f6648;if(this[_0x3830a5(0x246)]<=0x0)return;this[_0x3830a5(0x246)]--;if(this[_0x3830a5(0x246)]<=0x0){if(this[_0x3830a5(0x44d)])this['parent'][_0x3830a5(0x225)](this);this[_0x3830a5(0x389)][_0x3830a5(0x4fc)]&&this[_0x3830a5(0x389)][_0x3830a5(0x4fc)][_0x3830a5(0x344)]();}},VisuMZ[_0x4f6648(0x2f5)]['Spriteset_Map_createLowerLayer']=Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x34b)],Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x34b)]=function(){const _0x329f87=_0x4f6648;VisuMZ[_0x329f87(0x2f5)][_0x329f87(0x46f)][_0x329f87(0x36c)](this),this[_0x329f87(0x55b)]();},VisuMZ['EventsMoveCore'][_0x4f6648(0x357)]=Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x371)],Spriteset_Map['prototype'][_0x4f6648(0x371)]=function(){const _0x337db4=_0x4f6648;VisuMZ[_0x337db4(0x2f5)][_0x337db4(0x357)][_0x337db4(0x36c)](this),this[_0x337db4(0x30e)]();},Spriteset_Map[_0x4f6648(0x1a3)]['createShadows']=function(){const _0x11e353=_0x4f6648;if(!VisuMZ[_0x11e353(0x2f5)][_0x11e353(0x3fc)]['Movement'][_0x11e353(0x383)])return;for(const _0x1918a3 of this[_0x11e353(0x3dc)]){this[_0x11e353(0x47d)](_0x1918a3);}},Spriteset_Map[_0x4f6648(0x1a3)]['createCharacterShadow']=function(_0x46d8b6){const _0xff92f4=_0x4f6648;_0x46d8b6['_shadowSprite']=new Sprite(),_0x46d8b6['_shadowSprite'][_0xff92f4(0x6f2)]=_0x46d8b6['_character'][_0xff92f4(0x1e6)](),_0x46d8b6['_shadowSprite'][_0xff92f4(0x4fc)]=ImageManager[_0xff92f4(0x4e4)](_0x46d8b6[_0xff92f4(0x177)]['_filename']),_0x46d8b6[_0xff92f4(0x177)]['anchor']['x']=0.5,_0x46d8b6['_shadowSprite']['anchor']['y']=0x1,_0x46d8b6['_shadowSprite']['z']=0x0,this[_0xff92f4(0x640)][_0xff92f4(0x43b)](_0x46d8b6[_0xff92f4(0x177)]);},Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x2f7)]=function(){const _0x695cab=_0x4f6648;if(!VisuMZ['EventsMoveCore'][_0x695cab(0x3fc)][_0x695cab(0x3ae)]['ShowShadows'])return;for(const _0x43404a of this[_0x695cab(0x3dc)]){if(_0x695cab(0x28e)!==_0x695cab(0x28e)){_0x3148b8[_0x695cab(0x2f5)][_0x695cab(0x2ab)][_0x695cab(0x36c)](this,_0x1a3dc0);if(this[_0x695cab(0x1bf)]()&&_0x37dab3[_0x695cab(0x328)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x695cab(0x1b6)){const _0x4df3dc=this[_0x695cab(0x4dc)](),_0x366c57=_0x4eebc6[_0x695cab(0x579)](this['x'],_0x4df3dc),_0x2ba4d3=_0x5c14aa[_0x695cab(0x6a6)](this['y'],_0x4df3dc);this[_0x695cab(0x6e6)](_0x366c57,_0x2ba4d3);}}else this[_0x695cab(0x640)][_0x695cab(0x225)](_0x43404a[_0x695cab(0x177)]);}},Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x55b)]=function(){const _0x257256=_0x4f6648;this[_0x257256(0x50e)]=[];for(const _0x48e2d5 of $gameMap[_0x257256(0x4b3)]()){this[_0x257256(0x1ab)](_0x48e2d5);}},Spriteset_Map[_0x4f6648(0x461)]=VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x3fc)][_0x4f6648(0x24f)]['MobileEnabled']??!![],Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x1ab)]=function(_0x33ac4e){const _0x20acb3=_0x4f6648;if(!this['isTargetEventValidForLabelWindow'](_0x33ac4e))return;if(Utils[_0x20acb3(0x6c7)]()){if(!Spriteset_Map['MOBILE_EVENT_LABELS'])return;}let _0x374aba;const _0x4ac079=VisuMZ['EventsMoveCore'][_0x20acb3(0x3fc)]['Label'][_0x20acb3(0x42a)]??!![];_0x374aba=_0x4ac079?new Sprite_EventLabel(_0x33ac4e):new Window_EventLabel(_0x33ac4e),_0x374aba['z']=0x8,_0x374aba[_0x20acb3(0x39a)]=Sprite[_0x20acb3(0x61f)]++,this[_0x20acb3(0x640)][_0x20acb3(0x43b)](_0x374aba),this[_0x20acb3(0x50e)][_0x20acb3(0x58b)](_0x374aba);},Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x52a)]=function(_0x2098b5){const _0x23ab00=_0x4f6648,_0x1289a7=_0x2098b5[_0x23ab00(0x273)]();if(_0x1289a7[_0x23ab00(0x4a3)][_0x23ab00(0x6be)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1289a7[_0x23ab00(0x4a3)][_0x23ab00(0x6be)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x31def8 of _0x1289a7[_0x23ab00(0x1e5)]){let _0x5cbe3c='';for(const _0x54e4dc of _0x31def8['list']){if(_0x23ab00(0x1ef)===_0x23ab00(0x1ef)){if([0x6c,0x198]['includes'](_0x54e4dc[_0x23ab00(0x25f)])){if(_0x23ab00(0x34e)!==_0x23ab00(0x34e)){const _0x5b87b4=[_0x3813d7[_0x23ab00(0x527)],_0x173ff3[_0x23ab00(0x575)],'Self\x20Variable\x20%1'['format'](_0x1caeea)];return _0x4b50c5[_0x23ab00(0x298)](_0x5b87b4);}else _0x5cbe3c+=_0x54e4dc['parameters'][0x0];}}else{if(this['_EventsMoveCoreSettings']===_0x1d0ea7)this[_0x23ab00(0x66d)]();if(this[_0x23ab00(0x65e)]['DashingEnable']===_0x1b10da)this[_0x23ab00(0x66d)]();return this[_0x23ab00(0x65e)][_0x23ab00(0x42e)];}}if(_0x5cbe3c[_0x23ab00(0x6be)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5cbe3c[_0x23ab00(0x6be)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map['prototype'][_0x4f6648(0x412)]=function(_0x1bf41b){const _0xc87d6d=_0x4f6648;this[_0xc87d6d(0x3dc)]=this[_0xc87d6d(0x3dc)]||[];const _0x7c487e=new Sprite_Character(_0x1bf41b);this[_0xc87d6d(0x3dc)][_0xc87d6d(0x58b)](_0x7c487e),this[_0xc87d6d(0x640)][_0xc87d6d(0x43b)](_0x7c487e),this[_0xc87d6d(0x47d)](_0x7c487e),this[_0xc87d6d(0x1ab)](_0x1bf41b),_0x7c487e[_0xc87d6d(0x6c5)]();},Spriteset_Map[_0x4f6648(0x1a3)][_0x4f6648(0x35f)]=function(){const _0x4cbdac=_0x4f6648;if(!this['_labelWindows'])return;for(const _0x281a9e of this['_labelWindows']){if(_0x281a9e){if('teqRu'===_0x4cbdac(0x407))_0x281a9e[_0x4cbdac(0x194)]=undefined,_0x281a9e[_0x4cbdac(0x491)]();else return _0x51ba53[_0x4cbdac(0x1a4)](_0x5ecdae[_0x4cbdac(0x5e0)](this[_0x4cbdac(0x42c)](_0x114f8a,_0x2b9863)),_0x46da19[_0x4cbdac(0x5e0)](this[_0x4cbdac(0x322)](_0x56a844,_0x4ea2f4)));}}},Spriteset_Map['prototype']['createEventsMoveCoreMessagePopup']=function(_0x3aec31,_0x41a5ba){const _0x4b074c=_0x4f6648;if(!_0x3aec31)return;_0x41a5ba[_0x4b074c(0x1c7)]={'x':_0x3aec31['x'],'y':_0x3aec31['y']},this[_0x4b074c(0x658)](_0x41a5ba);},Spriteset_Map[_0x4f6648(0x1a3)]['createEventsMoveCoreTileMessagePopup']=function(_0x34bba4){const _0x555315=_0x4f6648;if(!this[_0x555315(0x640)])return;const _0x5c53d1=new Sprite_VisuMz_MessagePopup(_0x34bba4);this[_0x555315(0x640)][_0x555315(0x43b)](_0x5c53d1);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x4df)]=Game_Message['prototype'][_0x4f6648(0x6c6)],Game_Message[_0x4f6648(0x1a3)][_0x4f6648(0x6c6)]=function(_0x24178e,_0x445e27){const _0x226306=_0x4f6648;this[_0x226306(0x678)]=$gameTemp[_0x226306(0x186)](),VisuMZ[_0x226306(0x2f5)][_0x226306(0x4df)][_0x226306(0x36c)](this,_0x24178e,_0x445e27);},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x52d)]=Window_NumberInput[_0x4f6648(0x1a3)][_0x4f6648(0x5bf)],Window_NumberInput[_0x4f6648(0x1a3)][_0x4f6648(0x5bf)]=function(){const _0x148601=_0x4f6648;$gameTemp[_0x148601(0x3a5)]($gameMessage[_0x148601(0x678)]),VisuMZ[_0x148601(0x2f5)][_0x148601(0x52d)]['call'](this),$gameTemp[_0x148601(0x4d3)]();},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x498)]=Window_NumberInput['prototype'][_0x4f6648(0x4ee)],Window_NumberInput[_0x4f6648(0x1a3)]['processOk']=function(){const _0x3ddd9e=_0x4f6648;$gameTemp[_0x3ddd9e(0x3a5)]($gameMessage[_0x3ddd9e(0x678)]),VisuMZ[_0x3ddd9e(0x2f5)][_0x3ddd9e(0x498)][_0x3ddd9e(0x36c)](this),$gameTemp[_0x3ddd9e(0x4d3)](),$gameMessage[_0x3ddd9e(0x678)]=undefined;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x526)]=Game_Message['prototype']['setItemChoice'],Game_Message['prototype'][_0x4f6648(0x6e1)]=function(_0x2317d4,_0x1185b0){const _0x50b636=_0x4f6648;this[_0x50b636(0x725)]=$gameTemp[_0x50b636(0x186)](),VisuMZ['EventsMoveCore']['Game_Message_setItemChoice'][_0x50b636(0x36c)](this,_0x2317d4,_0x1185b0);},VisuMZ[_0x4f6648(0x2f5)]['Window_EventItem_onOk']=Window_EventItem['prototype']['onOk'],Window_EventItem[_0x4f6648(0x1a3)][_0x4f6648(0x4e9)]=function(){const _0x4c7416=_0x4f6648;$gameTemp[_0x4c7416(0x3a5)]($gameMessage[_0x4c7416(0x725)]),VisuMZ[_0x4c7416(0x2f5)][_0x4c7416(0x1ae)][_0x4c7416(0x36c)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x4c7416(0x725)]=undefined;},VisuMZ[_0x4f6648(0x2f5)][_0x4f6648(0x1f2)]=Window_EventItem['prototype'][_0x4f6648(0x66f)],Window_EventItem[_0x4f6648(0x1a3)][_0x4f6648(0x66f)]=function(){const _0x3ebcf3=_0x4f6648;$gameTemp[_0x3ebcf3(0x3a5)]($gameMessage['_selfTargetItemChoice']),VisuMZ[_0x3ebcf3(0x2f5)][_0x3ebcf3(0x1f2)][_0x3ebcf3(0x36c)](this),$gameTemp[_0x3ebcf3(0x4d3)](),$gameMessage[_0x3ebcf3(0x725)]=undefined;},VisuMZ['EventsMoveCore'][_0x4f6648(0x60a)]=Window_Message[_0x4f6648(0x1a3)]['startMessage'],Window_Message[_0x4f6648(0x1a3)][_0x4f6648(0x4ce)]=function(){const _0x3781b8=_0x4f6648;$gameMessage[_0x3781b8(0x6b2)](),VisuMZ[_0x3781b8(0x2f5)][_0x3781b8(0x60a)]['call'](this),$gameTemp[_0x3781b8(0x4d3)]();},VisuMZ['EventsMoveCore'][_0x4f6648(0x4ab)]=Window_ScrollText[_0x4f6648(0x1a3)][_0x4f6648(0x4ce)],Window_ScrollText[_0x4f6648(0x1a3)]['startMessage']=function(){const _0x240d4c=_0x4f6648;$gameMessage[_0x240d4c(0x6b2)](),VisuMZ[_0x240d4c(0x2f5)][_0x240d4c(0x4ab)][_0x240d4c(0x36c)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0xe6a425=_0x4f6648;this[_0xe6a425(0x233)](...arguments);}Window_EventLabel[_0x4f6648(0x1a3)]=Object[_0x4f6648(0x201)](Window_Base[_0x4f6648(0x1a3)]),Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x382)]=Window_EventLabel,Window_EventLabel[_0x4f6648(0x1a3)]['initialize']=function(_0x5f3013){const _0x8d6172=_0x4f6648;this['_event']=_0x5f3013;const _0x45ee76=new Rectangle(0x0,0x0,Graphics[_0x8d6172(0x6f1)]/0x4,this[_0x8d6172(0x3a3)](0x1));this[_0x8d6172(0x386)](),Window_Base['prototype'][_0x8d6172(0x233)]['call'](this,_0x45ee76),this[_0x8d6172(0x6ed)]=0x0,this[_0x8d6172(0x27b)](0x2),this[_0x8d6172(0x43e)]='';},Window_EventLabel['prototype']['initMembers']=function(){const _0xf1c94e=_0x4f6648;this[_0xf1c94e(0x290)]=![],this[_0xf1c94e(0x4cd)]=$gameScreen[_0xf1c94e(0x65c)](),this[_0xf1c94e(0x3d3)]=this['_event'][_0xf1c94e(0x71c)](),this[_0xf1c94e(0x58a)]=this['_event']['screenY'](),this['_eventLabelOffsetX']=this[_0xf1c94e(0x6ce)]['_labelWindow']['offsetX'],this['_eventLabelOffsetY']=this[_0xf1c94e(0x6ce)][_0xf1c94e(0x21a)][_0xf1c94e(0x2a8)],this['_eventPageIndex']=this[_0xf1c94e(0x6ce)]['_pageIndex'],this[_0xf1c94e(0x56c)]=this[_0xf1c94e(0x3e5)](),this[_0xf1c94e(0x37c)]=$gameSystem[_0xf1c94e(0x2da)](),this[_0xf1c94e(0x194)]=$gamePlayer['x'],this[_0xf1c94e(0x19c)]=$gamePlayer['y'],this[_0xf1c94e(0x686)]=this[_0xf1c94e(0x6ce)]['x'],this['_visibleEventY']=this[_0xf1c94e(0x6ce)]['y'];},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x6c5)]=function(){const _0x2ed70d=_0x4f6648;Window_Base['prototype'][_0x2ed70d(0x6c5)][_0x2ed70d(0x36c)](this);if(!this[_0x2ed70d(0x278)]())return;this['updateText'](),this[_0x2ed70d(0x432)](),this[_0x2ed70d(0x539)](),this[_0x2ed70d(0x581)]();},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x278)]=function(){const _0x16a11a=_0x4f6648;if(!this[_0x16a11a(0x6ce)])return![];if(!this['_event'][_0x16a11a(0x21a)])return![];if(this[_0x16a11a(0x475)]!==this[_0x16a11a(0x6ce)][_0x16a11a(0x32e)])return!![];if(this['_event'][_0x16a11a(0x2ec)]&&!this['_eventErased'])return!![];if(this[_0x16a11a(0x6ce)][_0x16a11a(0x21a)][_0x16a11a(0x43c)]==='')return![];if(this[_0x16a11a(0x4cd)]!==$gameScreen[_0x16a11a(0x65c)]())return!![];if(this[_0x16a11a(0x3d3)]!==this[_0x16a11a(0x6ce)][_0x16a11a(0x71c)]())return!![];if(this[_0x16a11a(0x58a)]!==this[_0x16a11a(0x6ce)]['screenY']())return!![];if(this['_eventLabelOffsetX']!==this[_0x16a11a(0x6ce)]['_labelWindow'][_0x16a11a(0x40c)])return!![];if(this[_0x16a11a(0x3b4)]!==this[_0x16a11a(0x6ce)][_0x16a11a(0x21a)][_0x16a11a(0x2a8)])return!![];if(this[_0x16a11a(0x194)]!==$gamePlayer['x'])return!![];if(this[_0x16a11a(0x19c)]!==$gamePlayer['y'])return!![];if(this[_0x16a11a(0x686)]!==this[_0x16a11a(0x6ce)]['x'])return!![];if(this[_0x16a11a(0x1e9)]!==this[_0x16a11a(0x6ce)]['y'])return!![];if(this[_0x16a11a(0x37c)]!==$gameSystem['eventLabelsVisible']())return!![];if(this[_0x16a11a(0x56c)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x16a11a(0x56c)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager['_scene'][_0x16a11a(0x2ad)]>0x0)return!![];return![];},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x69b)]=function(){const _0x143825=_0x4f6648;if(this['_event'][_0x143825(0x340)]()!==this[_0x143825(0x43e)]){if(_0x143825(0x618)===_0x143825(0x618))this['_text']=this[_0x143825(0x6ce)][_0x143825(0x340)](),this['refresh']();else{if(!_0x4e9a0a&&_0x1a4ea9[_0x143825(0x339)]())return![];if(!_0xae4a77&&_0xc8f809['isAnyEventStarting']())return![];if(this[_0x143825(0x2c2)]()<=0x0)return!![];return _0x29ecce[_0x143825(0x262)](this);}}},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x432)]=function(){const _0x3e3d7d=_0x4f6648;this[_0x3e3d7d(0x4f7)]['x']=0x1/$gameScreen['zoomScale'](),this[_0x3e3d7d(0x4f7)]['y']=0x1/$gameScreen[_0x3e3d7d(0x65c)](),this[_0x3e3d7d(0x4cd)]=$gameScreen[_0x3e3d7d(0x65c)]();},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x539)]=function(){const _0x3e3490=_0x4f6648;if(!SceneManager[_0x3e3490(0x355)])return;if(!SceneManager[_0x3e3490(0x355)][_0x3e3490(0x1e2)])return;const _0x266b8e=SceneManager[_0x3e3490(0x355)][_0x3e3490(0x1e2)][_0x3e3490(0x2bb)](this['_event']);if(!_0x266b8e)return;this['x']=Math[_0x3e3490(0x6fb)](this[_0x3e3490(0x6ce)][_0x3e3490(0x71c)]()-Math['floor'](this['width']*this[_0x3e3490(0x4f7)]['x']/0x2)),this['x']+=this['_event'][_0x3e3490(0x21a)][_0x3e3490(0x40c)],this['y']=this[_0x3e3490(0x6ce)][_0x3e3490(0x222)]()-_0x266b8e[_0x3e3490(0x272)],this['y']+=Math['round']($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x3e3490(0x6fb)](this[_0x3e3490(0x272)]*this[_0x3e3490(0x4f7)]['y']),this['y']+=this[_0x3e3490(0x6ce)]['_labelWindow']['offsetY'],this[_0x3e3490(0x290)]=this['_event'][_0x3e3490(0x2ec)],this['_eventScreenX']=this['_event']['screenX'](),this[_0x3e3490(0x58a)]=this[_0x3e3490(0x6ce)][_0x3e3490(0x222)](),this[_0x3e3490(0x19e)]=this['_event'][_0x3e3490(0x21a)][_0x3e3490(0x40c)],this['_eventLabelOffsetY']=this[_0x3e3490(0x6ce)][_0x3e3490(0x21a)]['offsetY'],this[_0x3e3490(0x475)]=this[_0x3e3490(0x6ce)][_0x3e3490(0x32e)];if(this[_0x3e3490(0x290)]){if('EtYiG'!==_0x3e3490(0x179))this[_0x3e3490(0x6ed)]=0x0;else{if(!_0x203c8a)return;if(!_0x4c77d8[_0x3e3490(0x4a3)])return;const _0x3b5c47=_0x3c7a64[_0x3e3490(0x4a3)];if(_0x3b5c47['match'](/<MAP LOAD COMMON EVENT(?:|S):[ ](.*)>/i)){const _0x2b172a=_0xd8bfa9(_0x1c9205['$1'])[_0x3e3490(0x44c)](',')[_0x3e3490(0x3c6)](_0x157f3d=>_0x57ed73(_0x157f3d));for(const _0x57a6ce of _0x2b172a){_0x112d95[_0x3e3490(0x589)](_0x57a6ce);}}}}},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x581)]=function(){const _0x3c65fd=_0x4f6648;if(this[_0x3c65fd(0x3e5)]())_0x3c65fd(0x3bc)==='KiBnn'?_0x41afcb['createEventsMoveCoreTileMessagePopup'](_0x5837e0):this[_0x3c65fd(0x6ed)]+=this['opacitySpeed']();else SceneManager[_0x3c65fd(0x355)][_0x3c65fd(0x2ad)]>0x0?this[_0x3c65fd(0x6ed)]=0x0:this['contentsOpacity']-=this[_0x3c65fd(0x360)]();},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x3e5)]=function(){const _0x45a4a7=_0x4f6648;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x45a4a7(0x6ce)]?.[_0x45a4a7(0x2ec)])return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x281097=$gamePlayer['x'],_0x471b29=$gamePlayer['y'],_0x147bd7=this[_0x45a4a7(0x6ce)]['x'],_0x2cf17a=this[_0x45a4a7(0x6ce)]['y'];if(this[_0x45a4a7(0x194)]===_0x281097&&this[_0x45a4a7(0x19c)]===_0x471b29&&this[_0x45a4a7(0x686)]===_0x147bd7&&this[_0x45a4a7(0x1e9)]===_0x2cf17a)return this['_cacheVisibility'];this[_0x45a4a7(0x194)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x45a4a7(0x686)]=this[_0x45a4a7(0x6ce)]['x'],this['_visibleEventY']=this[_0x45a4a7(0x6ce)]['y'];if($gameMap[_0x45a4a7(0x254)](_0x281097,_0x471b29,_0x147bd7,_0x2cf17a)>this[_0x45a4a7(0x6ce)]['labelWindowRange']())return this[_0x45a4a7(0x56c)]=![],![];return this[_0x45a4a7(0x56c)]=!![],!![];},Window_EventLabel[_0x4f6648(0x1a3)]['opacitySpeed']=function(){const _0x315d2f=_0x4f6648;return VisuMZ[_0x315d2f(0x2f5)][_0x315d2f(0x3fc)][_0x315d2f(0x24f)][_0x315d2f(0x463)];},Window_EventLabel['prototype']['resizeWindow']=function(){const _0x1accef=_0x4f6648,_0x34d366=this[_0x1accef(0x696)](this[_0x1accef(0x43e)]);this[_0x1accef(0x445)]=_0x34d366[_0x1accef(0x445)]+($gameSystem[_0x1accef(0x466)]()+this[_0x1accef(0x1c8)]())*0x2,this['height']=Math['max'](this[_0x1accef(0x450)](),_0x34d366[_0x1accef(0x272)])+$gameSystem[_0x1accef(0x466)]()*0x2,this['createContents']();},Window_EventLabel['prototype'][_0x4f6648(0x450)]=function(){const _0x372ef6=_0x4f6648;return VisuMZ['EventsMoveCore'][_0x372ef6(0x3fc)][_0x372ef6(0x24f)][_0x372ef6(0x39b)];},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x292)]=function(){const _0x582031=_0x4f6648;Window_Base[_0x582031(0x1a3)][_0x582031(0x292)]['call'](this),this[_0x582031(0x41d)][_0x582031(0x3b5)]=this[_0x582031(0x356)]();},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x356)]=function(){const _0x478d82=_0x4f6648;return VisuMZ[_0x478d82(0x2f5)][_0x478d82(0x3fc)]['Label'][_0x478d82(0x49f)];},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x491)]=function(){const _0x121454=_0x4f6648;this[_0x121454(0x464)](),this[_0x121454(0x41d)][_0x121454(0x5f1)]();const _0x5e0c00=this[_0x121454(0x43e)][_0x121454(0x44c)](/[\r\n]+/);let _0x2e45b0=0x0;for(const _0x25a17b of _0x5e0c00){const _0x2f1c3b=this[_0x121454(0x696)](_0x25a17b),_0x77c1e1=Math['floor']((this[_0x121454(0x181)]-_0x2f1c3b[_0x121454(0x445)])/0x2);this['drawTextEx'](_0x25a17b,_0x77c1e1,_0x2e45b0),_0x2e45b0+=_0x2f1c3b[_0x121454(0x272)];}},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x35b)]=function(_0x156358,_0x54af34){const _0x3ed501=_0x4f6648;_0x54af34[_0x3ed501(0x408)]&&this['drawIcon'](_0x156358,_0x54af34['x']+0x2,_0x54af34['y']),_0x54af34['x']+=Math[_0x3ed501(0x5cd)](this[_0x3ed501(0x342)](),ImageManager[_0x3ed501(0x2de)])+0x4;},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x6ff)]=function(_0x4f8c35,_0x34a358,_0x36f494){const _0x391517=_0x4f6648,_0x57933f=ImageManager[_0x391517(0x4e4)](_0x391517(0x2ba)),_0x33e3e2=ImageManager[_0x391517(0x2de)],_0x5ab1bc=ImageManager[_0x391517(0x3b1)],_0x3417a3=_0x4f8c35%0x10*_0x33e3e2,_0x593b2d=Math[_0x391517(0x36a)](_0x4f8c35/0x10)*_0x5ab1bc,_0x33b699=Math[_0x391517(0x5cd)](this[_0x391517(0x342)]()),_0x224d89=Math[_0x391517(0x5cd)](this[_0x391517(0x342)]());this[_0x391517(0x41d)]['blt'](_0x57933f,_0x3417a3,_0x593b2d,_0x33e3e2,_0x5ab1bc,_0x34a358,_0x36f494,_0x33b699,_0x224d89);},Window_EventLabel[_0x4f6648(0x1a3)][_0x4f6648(0x342)]=function(){const _0x43c1e4=_0x4f6648;return VisuMZ[_0x43c1e4(0x2f5)][_0x43c1e4(0x3fc)][_0x43c1e4(0x24f)][_0x43c1e4(0x2c5)];};