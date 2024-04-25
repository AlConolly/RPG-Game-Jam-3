//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.82;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.82] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.82: April 18, 2024
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * RPG Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x518efc=_0x3995;(function(_0x168f32,_0x45a39){const _0x5f5bad=_0x3995,_0x1ee4bf=_0x168f32();while(!![]){try{const _0x1ecdc1=parseInt(_0x5f5bad(0x90a))/0x1*(parseInt(_0x5f5bad(0x662))/0x2)+-parseInt(_0x5f5bad(0x5af))/0x3*(-parseInt(_0x5f5bad(0x456))/0x4)+parseInt(_0x5f5bad(0x9bc))/0x5+parseInt(_0x5f5bad(0x21f))/0x6*(-parseInt(_0x5f5bad(0x2f4))/0x7)+-parseInt(_0x5f5bad(0x5e6))/0x8+parseInt(_0x5f5bad(0x54f))/0x9+-parseInt(_0x5f5bad(0x831))/0xa*(-parseInt(_0x5f5bad(0x39c))/0xb);if(_0x1ecdc1===_0x45a39)break;else _0x1ee4bf['push'](_0x1ee4bf['shift']());}catch(_0x2531c0){_0x1ee4bf['push'](_0x1ee4bf['shift']());}}}(_0x3e86,0xe5bae));var label=_0x518efc(0x1c9),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x518efc(0x1cd)](function(_0x2fcc46){const _0x3f3167=_0x518efc;return _0x2fcc46[_0x3f3167(0x31a)]&&_0x2fcc46[_0x3f3167(0x613)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x518efc(0x54d)]=VisuMZ[label][_0x518efc(0x54d)]||{},VisuMZ['ConvertParams']=function(_0xd2f2f1,_0x46c646){const _0x4ebe0f=_0x518efc;for(const _0x58f0c0 in _0x46c646){if(_0x58f0c0[_0x4ebe0f(0x3a8)](/(.*):(.*)/i)){if(_0x4ebe0f(0x2dc)!=='ENOlo'){if(_0x49a9cc instanceof _0xe09a18)this['catchNormalError'](_0x32afec);else _0x12da6a instanceof _0x231de5&&_0x57006f[0x0]==='LoadError'?this[_0x4ebe0f(0xa33)](_0x88b44a):this[_0x4ebe0f(0x2d1)](_0x4efd8c);this[_0x4ebe0f(0x3d9)]();}else{const _0x2d22b4=String(RegExp['$1']),_0x2b1e04=String(RegExp['$2'])[_0x4ebe0f(0x1fa)]()['trim']();let _0x3b7891,_0x4fc0f8,_0x1930b0;switch(_0x2b1e04){case _0x4ebe0f(0x6e2):_0x3b7891=_0x46c646[_0x58f0c0]!==''?Number(_0x46c646[_0x58f0c0]):0x0;break;case _0x4ebe0f(0x413):_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8[_0x4ebe0f(0x52b)](_0x564421=>Number(_0x564421));break;case _0x4ebe0f(0x734):_0x3b7891=_0x46c646[_0x58f0c0]!==''?eval(_0x46c646[_0x58f0c0]):null;break;case'ARRAYEVAL':_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8[_0x4ebe0f(0x52b)](_0x5b297e=>eval(_0x5b297e));break;case _0x4ebe0f(0x380):_0x3b7891=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):'';break;case _0x4ebe0f(0x1a4):_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8[_0x4ebe0f(0x52b)](_0xab2b27=>JSON[_0x4ebe0f(0x4ed)](_0xab2b27));break;case _0x4ebe0f(0x153):_0x3b7891=_0x46c646[_0x58f0c0]!==''?new Function(JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0])):new Function('return\x200');break;case'ARRAYFUNC':_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8['map'](_0x5b6bda=>new Function(JSON[_0x4ebe0f(0x4ed)](_0x5b6bda)));break;case'STR':_0x3b7891=_0x46c646[_0x58f0c0]!==''?String(_0x46c646[_0x58f0c0]):'';break;case _0x4ebe0f(0x46b):_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8[_0x4ebe0f(0x52b)](_0x489f9a=>String(_0x489f9a));break;case _0x4ebe0f(0x2a2):_0x1930b0=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):{},_0xd2f2f1[_0x2d22b4]={},VisuMZ['ConvertParams'](_0xd2f2f1[_0x2d22b4],_0x1930b0);continue;case'ARRAYSTRUCT':_0x4fc0f8=_0x46c646[_0x58f0c0]!==''?JSON[_0x4ebe0f(0x4ed)](_0x46c646[_0x58f0c0]):[],_0x3b7891=_0x4fc0f8[_0x4ebe0f(0x52b)](_0x161e07=>VisuMZ['ConvertParams']({},JSON[_0x4ebe0f(0x4ed)](_0x161e07)));break;default:continue;}_0xd2f2f1[_0x2d22b4]=_0x3b7891;}}}return _0xd2f2f1;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x87f)]=SceneManager[_0x518efc(0x80f)],SceneManager[_0x518efc(0x80f)]=function(){const _0x418722=_0x518efc;VisuMZ[_0x418722(0x1c9)][_0x418722(0x87f)][_0x418722(0x30d)](this);if(Utils[_0x418722(0x636)]>=_0x418722(0x5bd)){if(_0x418722(0x875)===_0x418722(0x790))(_0x112666>=_0x2018b9||_0xb581d8&&_0x442b6c===0x1)&&this[_0x418722(0x3c1)]((_0x632296-_0x1a049a+_0x4359bf)%_0x59a405);else{if(typeof nw==='object')nw[_0x418722(0x4dd)][_0x418722(0x941)]();}}},(_0x34b41d=>{const _0x5768a9=_0x518efc,_0x5a2e0a=_0x34b41d[_0x5768a9(0x864)];for(const _0x153b49 of dependencies){if(_0x5768a9(0x1a2)===_0x5768a9(0x233))this['_dummyWindow'][_0x5768a9(0x19d)](_0x1650d9['layoutSettings'][_0x5768a9(0x78a)]);else{if(!Imported[_0x153b49]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x5a2e0a,_0x153b49)),SceneManager[_0x5768a9(0x80f)]();break;}}}const _0x392f2c=_0x34b41d['description'];if(_0x392f2c[_0x5768a9(0x3a8)](/\[Version[ ](.*?)\]/i)){if(_0x5768a9(0x19b)!==_0x5768a9(0xa2c)){const _0x11e9dd=Number(RegExp['$1']);if(_0x11e9dd!==VisuMZ[label][_0x5768a9(0x326)]){if('nISyt'!==_0x5768a9(0x7cf))alert(_0x5768a9(0xa1f)[_0x5768a9(0x67d)](_0x5a2e0a,_0x11e9dd)),SceneManager[_0x5768a9(0x80f)]();else{var _0x2b2d1=_0x3ae82a(_0x4cd225['$1']);_0x36035*=_0x2b2d1;}}}else this[_0x5768a9(0x8f8)]=_0xacd9c0[_0x5768a9(0x8cc)],_0x398509[_0x5768a9(0x1c9)][_0x5768a9(0x202)]['call'](this,_0x2a096a),this[_0x5768a9(0x938)](null);}if(_0x392f2c[_0x5768a9(0x3a8)](/\[Tier[ ](\d+)\]/i)){if(_0x5768a9(0x3be)!=='AhmtI'){const _0x4ae7f7=_0x155681[_0x5768a9(0x333)](_0x24e44c);_0x544927['setValue'](_0x25d97d,!_0x4ae7f7);}else{const _0x4bcfe5=Number(RegExp['$1']);_0x4bcfe5<tier?(alert(_0x5768a9(0x84a)[_0x5768a9(0x67d)](_0x5a2e0a,_0x4bcfe5,tier)),SceneManager[_0x5768a9(0x80f)]()):tier=Math[_0x5768a9(0x55c)](_0x4bcfe5,tier);}}VisuMZ[_0x5768a9(0x1da)](VisuMZ[label][_0x5768a9(0x54d)],_0x34b41d['parameters']);})(pluginData),((()=>{const _0x3715f0=_0x518efc;if(VisuMZ[_0x3715f0(0x1c9)][_0x3715f0(0x54d)][_0x3715f0(0x927)][_0x3715f0(0x1ea)]??!![])for(const _0x5bec57 in $plugins){const _0x5e5c63=$plugins[_0x5bec57];_0x5e5c63[_0x3715f0(0x864)][_0x3715f0(0x3a8)](/(.*)\/(.*)/i)&&(_0x5e5c63[_0x3715f0(0x864)]=String(RegExp['$2'][_0x3715f0(0x445)]()));}})()),PluginManager[_0x518efc(0x9b6)](pluginData['name'],_0x518efc(0x31c),_0x1cc8a0=>{const _0x38f6a8=_0x518efc;if(!SceneManager['_scene'])return;if(!SceneManager[_0x38f6a8(0x18c)]['_spriteset'])return;VisuMZ[_0x38f6a8(0x1da)](_0x1cc8a0,_0x1cc8a0);const _0x2c4fd6=Math[_0x38f6a8(0x38c)](_0x1cc8a0[_0x38f6a8(0x728)]),_0x3978ce=Math['round'](_0x1cc8a0['pointY']);$gameTemp[_0x38f6a8(0x4dc)](_0x2c4fd6,_0x3978ce,_0x1cc8a0[_0x38f6a8(0x21e)],_0x1cc8a0[_0x38f6a8(0x8dc)],_0x1cc8a0['Mute']);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],'AudioChangeBgmVolume',_0x56b60f=>{const _0x282002=_0x518efc;VisuMZ[_0x282002(0x1da)](_0x56b60f,_0x56b60f);const _0x2e6872=Math[_0x282002(0x38c)](_0x56b60f['volume'])[_0x282002(0x22e)](0x0,0x64),_0x236235=AudioManager[_0x282002(0x89e)];_0x236235&&(_0x236235[_0x282002(0x744)]=_0x2e6872,_0x236235[_0x282002(0x66a)]=AudioManager[_0x282002(0x408)][_0x282002(0x711)](),AudioManager[_0x282002(0x7d1)](_0x236235),AudioManager[_0x282002(0x7c0)](_0x236235,_0x236235['pos']),AudioManager['_bgmBuffer'][_0x282002(0x84e)](_0x236235['pos']));}),PluginManager['registerCommand'](pluginData['name'],_0x518efc(0x7b6),_0x2874af=>{const _0x1328f2=_0x518efc;VisuMZ[_0x1328f2(0x1da)](_0x2874af,_0x2874af);const _0x4dee64=Math[_0x1328f2(0x38c)](_0x2874af['pitch'])[_0x1328f2(0x22e)](0x32,0x96),_0x2080ec=AudioManager[_0x1328f2(0x89e)];if(_0x2080ec){if('lpKYT'===_0x1328f2(0x69b))_0x2080ec[_0x1328f2(0x19e)]=_0x4dee64,_0x2080ec['pos']=AudioManager[_0x1328f2(0x408)][_0x1328f2(0x711)](),AudioManager[_0x1328f2(0x7d1)](_0x2080ec),AudioManager['playBgm'](_0x2080ec,_0x2080ec[_0x1328f2(0x66a)]),AudioManager[_0x1328f2(0x408)][_0x1328f2(0x84e)](_0x2080ec[_0x1328f2(0x66a)]);else{var _0x35ddf4=_0x2e69e1(_0x5820e2['$1']);try{_0x4fe766*=_0x28c19f(_0x35ddf4);}catch(_0x5574e5){if(_0x265c94['isPlaytest']())_0x41b9c0[_0x1328f2(0x772)](_0x5574e5);}}}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x250),_0x8ec3e7=>{const _0x4b3b71=_0x518efc;VisuMZ[_0x4b3b71(0x1da)](_0x8ec3e7,_0x8ec3e7);const _0x3483d6=Math[_0x4b3b71(0x38c)](_0x8ec3e7[_0x4b3b71(0x97f)])['clamp'](-0x64,0x64),_0x50e82f=AudioManager[_0x4b3b71(0x89e)];_0x50e82f&&(_0x50e82f[_0x4b3b71(0x97f)]=_0x3483d6,_0x50e82f[_0x4b3b71(0x66a)]=AudioManager['_bgmBuffer'][_0x4b3b71(0x711)](),AudioManager[_0x4b3b71(0x7d1)](_0x50e82f),AudioManager[_0x4b3b71(0x7c0)](_0x50e82f,_0x50e82f['pos']),AudioManager['_bgmBuffer'][_0x4b3b71(0x84e)](_0x50e82f[_0x4b3b71(0x66a)]));}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x2f2),_0x16bb9c=>{const _0x1267fb=_0x518efc;VisuMZ[_0x1267fb(0x1da)](_0x16bb9c,_0x16bb9c);const _0x154485=Math[_0x1267fb(0x38c)](_0x16bb9c[_0x1267fb(0x744)])[_0x1267fb(0x22e)](0x0,0x64),_0x2c79b8=AudioManager[_0x1267fb(0x653)];_0x2c79b8&&(_0x2c79b8[_0x1267fb(0x744)]=_0x154485,_0x2c79b8[_0x1267fb(0x66a)]=AudioManager[_0x1267fb(0x341)][_0x1267fb(0x711)](),AudioManager[_0x1267fb(0xa4d)](_0x2c79b8),AudioManager[_0x1267fb(0x789)](_0x2c79b8,_0x2c79b8[_0x1267fb(0x66a)]),AudioManager[_0x1267fb(0x341)][_0x1267fb(0x84e)](_0x2c79b8[_0x1267fb(0x66a)]));}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x50c),_0x1a1f2c=>{const _0x53d7b7=_0x518efc;VisuMZ[_0x53d7b7(0x1da)](_0x1a1f2c,_0x1a1f2c);const _0x290d7c=Math[_0x53d7b7(0x38c)](_0x1a1f2c[_0x53d7b7(0x19e)])['clamp'](0x32,0x96),_0x3cf716=AudioManager[_0x53d7b7(0x653)];_0x3cf716&&(_0x3cf716[_0x53d7b7(0x19e)]=_0x290d7c,_0x3cf716[_0x53d7b7(0x66a)]=AudioManager[_0x53d7b7(0x341)][_0x53d7b7(0x711)](),AudioManager['updateBgsParameters'](_0x3cf716),AudioManager['playBgs'](_0x3cf716,_0x3cf716[_0x53d7b7(0x66a)]),AudioManager[_0x53d7b7(0x341)]['_startPlaying'](_0x3cf716[_0x53d7b7(0x66a)]));}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],'AudioChangeBgsPan',_0x476f40=>{const _0x565e8f=_0x518efc;VisuMZ['ConvertParams'](_0x476f40,_0x476f40);const _0x581989=Math[_0x565e8f(0x38c)](_0x476f40[_0x565e8f(0x97f)])[_0x565e8f(0x22e)](-0x64,0x64),_0x2ca48a=AudioManager[_0x565e8f(0x653)];_0x2ca48a&&('KyxdU'!==_0x565e8f(0x218)?(_0x2ca48a['pan']=_0x581989,_0x2ca48a[_0x565e8f(0x66a)]=AudioManager[_0x565e8f(0x341)]['seek'](),AudioManager[_0x565e8f(0xa4d)](_0x2ca48a),AudioManager[_0x565e8f(0x789)](_0x2ca48a,_0x2ca48a['pos']),AudioManager[_0x565e8f(0x341)]['_startPlaying'](_0x2ca48a[_0x565e8f(0x66a)])):_0x3553c6=0x0);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x36e),_0x1d3eda=>{const _0x2bae45=_0x518efc;if(!$gameTemp[_0x2bae45(0x7c5)]())return;const _0x4ff7f9=Input['getLastUsedGamepadType']();navigator[_0x2bae45(0x7df)]&&(_0x2bae45(0x887)!==_0x2bae45(0x887)?_0x437ea0[_0x2bae45(0x541)]&&(this[_0x2bae45(0x7da)]=_0x2bae45(0x4fc)):navigator[_0x2bae45(0x7df)][_0x2bae45(0x426)](_0x4ff7f9));}),PluginManager['registerCommand'](pluginData[_0x518efc(0x864)],_0x518efc(0x7cc),_0x5a96b1=>{const _0x396e3c=_0x518efc;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x396e3c(0x834)]())return;SceneManager[_0x396e3c(0x18c)][_0x396e3c(0x797)]=![],VisuMZ['CoreEngine'][_0x396e3c(0x94b)]();}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x1b5),_0x485b3f=>{const _0xea7b0b=_0x518efc;if(!$gameTemp[_0xea7b0b(0x7c5)]())return;if(!Utils[_0xea7b0b(0x834)]())return;SceneManager[_0xea7b0b(0x18c)][_0xea7b0b(0x797)]=![],VisuMZ[_0xea7b0b(0x1c9)][_0xea7b0b(0x93b)]();}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x3f0),_0x5c5204=>{const _0x49437b=_0x518efc;if(!$gameTemp[_0x49437b(0x7c5)]())return;if(!Utils[_0x49437b(0x834)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x49437b(0x1da)](_0x5c5204,_0x5c5204);const _0xfb668e='Map%1'[_0x49437b(0x67d)]($gameMap[_0x49437b(0x332)]()[_0x49437b(0x2ab)](0x3)),_0x471af6=VisuMZ[_0x49437b(0x1c9)]['ExtractStrFromMap']($gameMap[_0x49437b(0x332)]());VisuMZ[_0x49437b(0x1c9)]['ExportString'](_0x471af6,_0xfb668e,!![]);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x4be),_0x17536f=>{const _0x1a2945=_0x518efc;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x1a2945(0x834)]())return;if(!$gameParty[_0x1a2945(0x75b)]())return;VisuMZ[_0x1a2945(0x1da)](_0x17536f,_0x17536f);const _0x5375b4=_0x1a2945(0x48d)[_0x1a2945(0x67d)]($gameTroop[_0x1a2945(0x57c)][_0x1a2945(0x2ab)](0x4)),_0x303f06=VisuMZ[_0x1a2945(0x1c9)][_0x1a2945(0x8b5)]($gameTroop['_troopId']);VisuMZ[_0x1a2945(0x1c9)][_0x1a2945(0x6a0)](_0x303f06,_0x5375b4,!![]);}),VisuMZ['CoreEngine'][_0x518efc(0x6a0)]=function(_0x187ce0,_0x29f550,_0x9c60ac){const _0x37a713=_0x518efc,_0x4f9170=require('fs');let _0x3e262c=_0x37a713(0x231)['format'](_0x29f550||'0');_0x4f9170[_0x37a713(0xa18)](_0x3e262c,_0x187ce0,_0x27dab1=>{const _0xcb3b44=_0x37a713;if('ByyzV'!=='HDpMb'){if(_0x27dab1)throw err;else{if(_0x9c60ac){if(_0xcb3b44(0x5fc)===_0xcb3b44(0x1e8)){if(_0x4fc053)_0x3b9a6c[_0xcb3b44(0x4c0)](_0x35e063);}else alert(_0xcb3b44(0x54b)[_0xcb3b44(0x67d)](_0x3e262c));}}}else this[_0xcb3b44(0x8de)]=0xff;});},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x94b)]=function(){const _0x3b215d=_0x518efc,_0xd8cb66=[];for(const _0x1ed48a of $dataMapInfos){if(!_0x1ed48a)continue;_0xd8cb66[_0x3b215d(0x609)](_0x1ed48a['id']);}const _0x22a3bc=_0xd8cb66[_0x3b215d(0x18d)]*0x64+Math[_0x3b215d(0x4ab)](0x64);alert(_0x3b215d(0xa06)[_0x3b215d(0x67d)](_0x22a3bc)),this[_0x3b215d(0x771)]=[],this[_0x3b215d(0x4c7)]=$dataMap;for(const _0x8970be of _0xd8cb66){VisuMZ['CoreEngine']['loadMapData'](_0x8970be);}setTimeout(VisuMZ['CoreEngine']['exportAllMapStrings']['bind'](this),_0x22a3bc);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x2f7)]=function(_0x95171e){const _0x3b80b1=_0x518efc,_0x360ba8=_0x3b80b1(0x418)[_0x3b80b1(0x67d)](_0x95171e['padZero'](0x3)),_0x493419=new XMLHttpRequest(),_0x40ecc5=_0x3b80b1(0x266)+_0x360ba8;_0x493419[_0x3b80b1(0x67c)]('GET',_0x40ecc5),_0x493419[_0x3b80b1(0x34f)](_0x3b80b1(0x20e)),_0x493419['onload']=()=>this[_0x3b80b1(0x3ae)](_0x493419,_0x95171e,_0x360ba8,_0x40ecc5),_0x493419[_0x3b80b1(0x206)]=()=>DataManager[_0x3b80b1(0x2fd)](_0x3b80b1(0x9c8),_0x360ba8,_0x40ecc5),_0x493419['send']();},VisuMZ[_0x518efc(0x1c9)]['storeMapData']=function(_0x1d4219,_0x3415fd,_0x279f64,_0x41c3a7){const _0x4bc431=_0x518efc;$dataMap=JSON[_0x4bc431(0x4ed)](_0x1d4219[_0x4bc431(0xa25)]),DataManager['onLoad']($dataMap),this[_0x4bc431(0x771)][_0x3415fd]=VisuMZ['CoreEngine'][_0x4bc431(0x444)](_0x3415fd),$dataMap=this['_currentMap'];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x550)]=function(){const _0x48fd46=_0x518efc,_0x1f27c6=_0x48fd46(0x28c);this[_0x48fd46(0x771)][_0x48fd46(0x3ac)](undefined)[_0x48fd46(0x3ac)]('')[_0x48fd46(0x3ac)](null);const _0x220407=this[_0x48fd46(0x771)][_0x48fd46(0x681)](_0x48fd46(0x53f))[_0x48fd46(0x445)]();VisuMZ['CoreEngine'][_0x48fd46(0x6a0)](_0x220407,_0x1f27c6,!![]),SceneManager[_0x48fd46(0x18c)]['_active']=!![];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x444)]=function(_0x20a56f){const _0x5b3ff6=_0x518efc;if(!$dataMap)return'';let _0x329d75='█'[_0x5b3ff6(0x70d)](0x46)+'\x0a\x0a',_0x492e90='═'[_0x5b3ff6(0x70d)](0x46)+'\x0a\x0a',_0x5ec24c='';this[_0x5b3ff6(0x88e)]=0x0;for(const _0x4adf97 of $dataMap['events']){if(_0x5b3ff6(0x27b)!==_0x5b3ff6(0x27b)){const _0x38833c=_0x483611['iconWidth'],_0x346afe=_0x3b0513[_0x5b3ff6(0x1fd)],_0xa92719=this[_0x5b3ff6(0x58d)][_0x5b3ff6(0x3a8)](/SMOOTH/i);this['bitmap']=new _0x1ae72f(_0x38833c,_0x346afe);const _0xa24019=_0x140c21[_0x5b3ff6(0x336)](_0x5b3ff6(0x2b6)),_0x1ad490=_0x43bb90%0x10*_0x38833c,_0x50f43f=_0x4ac5ea['floor'](_0x566f2f/0x10)*_0x346afe;this[_0x5b3ff6(0x463)][_0x5b3ff6(0x33a)]=_0xa92719,this['bitmap'][_0x5b3ff6(0x9a2)](_0xa24019,_0x1ad490,_0x50f43f,_0x38833c,_0x346afe,0x0,0x0,_0x38833c,_0x346afe);}else{if(!_0x4adf97)continue;let _0x462ba4=_0x4adf97['id'],_0x885cd9=_0x4adf97[_0x5b3ff6(0x864)],_0x4be3d7=_0x4adf97[_0x5b3ff6(0x66b)];for(const _0x19d5c2 of _0x4be3d7){const _0x2d01c0=_0x4be3d7['indexOf'](_0x19d5c2)+0x1;let _0x3f75a4=_0x492e90+_0x5b3ff6(0x915),_0x13f70f=VisuMZ['CoreEngine'][_0x5b3ff6(0x2aa)](_0x19d5c2[_0x5b3ff6(0xa48)]);if(_0x13f70f[_0x5b3ff6(0x18d)]>0x0){if(_0x5ec24c[_0x5b3ff6(0x18d)]>0x0){if(_0x5b3ff6(0x8ea)!==_0x5b3ff6(0x8ea)){const _0x2b1a48=_0x55fe85[_0x5b3ff6(0x3e7)]((_0x1b2054-_0x2b6761)/_0x5d34cf,_0x75dc41||'Linear'),_0x428880=_0x549d97['ApplyEasing']((_0x35c3fa-_0x2fe82d+0x1)/_0x7deca3,_0x1fde3e||'Linear'),_0x5a0379=(_0x3d3cf7-_0x22929b*_0x2b1a48)/(0x1-_0x2b1a48);return _0x5a0379+(_0x5b9f07-_0x5a0379)*_0x428880;}else _0x5ec24c+=_0x492e90+_0x5b3ff6(0x53f);}else{if(_0x5b3ff6(0x6bc)===_0x5b3ff6(0x6bc)){const _0xc3791a=$dataMapInfos[_0x20a56f][_0x5b3ff6(0x864)];_0x5ec24c+=_0x329d75+_0x5b3ff6(0x6c9)['format'](_0x20a56f,_0xc3791a||_0x5b3ff6(0x809))+_0x329d75;}else{if(_0x170321)_0x29e3f6[_0x5b3ff6(0x5c9)](_0x4c5a83);}}_0x5ec24c+=_0x3f75a4['format'](_0x462ba4,_0x885cd9,_0x2d01c0,_0x13f70f);}}}}return _0x5ec24c[_0x5b3ff6(0x18d)]>0x0&&(_0x5ec24c+=_0x492e90),_0x5ec24c;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x93b)]=function(){const _0x18f1b7=_0x518efc,_0xd6a1e7=$dataTroops[_0x18f1b7(0x18d)]*0xa+Math[_0x18f1b7(0x4ab)](0xa);alert(_0x18f1b7(0x9c2)[_0x18f1b7(0x67d)](_0xd6a1e7));const _0x3b64ca=[];for(const _0x349dac of $dataTroops){if('kfJpx'===_0x18f1b7(0x2b5)){if(this[_0x18f1b7(0x1ad)]()||this[_0x18f1b7(0xa4b)]())return;if(this[_0x18f1b7(0x7d9)]<=0x0)return;this['_timeDuration']--,this['_timeDuration']<=0x0&&(this[_0x18f1b7(0x4fd)](),this['_text']='');}else{if(!_0x349dac)continue;const _0xc233bc=_0x349dac['id'];_0x3b64ca[_0xc233bc]=VisuMZ[_0x18f1b7(0x1c9)][_0x18f1b7(0x8b5)](_0xc233bc);}}setTimeout(VisuMZ['CoreEngine'][_0x18f1b7(0x4a5)]['bind'](this,_0x3b64ca),_0xd6a1e7);},VisuMZ['CoreEngine'][_0x518efc(0x8b5)]=function(_0x290e88){const _0x50fa1a=_0x518efc;if(!$dataTroops[_0x290e88])return'';let _0x150dfb='█'[_0x50fa1a(0x70d)](0x46)+'\x0a\x0a',_0x2b4396='═'[_0x50fa1a(0x70d)](0x46)+'\x0a\x0a',_0x194a3='';this['_commonEventLayers']=0x0;const _0x2ec18c=$dataTroops[_0x290e88];let _0x34e27a=_0x2ec18c[_0x50fa1a(0x66b)];for(const _0xbaccc2 of _0x34e27a){const _0x24361e=_0x34e27a[_0x50fa1a(0x98d)](_0xbaccc2)+0x1;let _0x13ca02=_0x2b4396+_0x50fa1a(0x667),_0x56767b=VisuMZ[_0x50fa1a(0x1c9)][_0x50fa1a(0x2aa)](_0xbaccc2[_0x50fa1a(0xa48)]);_0x56767b[_0x50fa1a(0x18d)]>0x0&&(_0x194a3[_0x50fa1a(0x18d)]>0x0?_0x50fa1a(0x672)===_0x50fa1a(0x672)?_0x194a3+=_0x2b4396+'\x0a\x0a\x0a\x0a\x0a':this['_coreEasingType']=_0xd3692f:_0x194a3+=_0x150dfb+_0x50fa1a(0x179)['format'](_0x290e88,_0x2ec18c[_0x50fa1a(0x864)]||'Unnamed')+_0x150dfb,_0x194a3+=_0x13ca02[_0x50fa1a(0x67d)](_0x24361e,_0x56767b));}if(_0x194a3[_0x50fa1a(0x18d)]>0x0){if('SrFOi'!==_0x50fa1a(0x892)){if(_0x225697[_0x50fa1a(0x1c9)][_0x50fa1a(0x54d)]['UI']['SideButtons']){const _0xb93050=_0xa7ecb5['width']-_0x4a66ed[_0x50fa1a(0x3cf)]-_0x5a508d[_0x50fa1a(0x1c9)]['Settings']['UI'][_0x50fa1a(0x888)]*0x2,_0x5f11f6=_0x42e6a4[_0x50fa1a(0xa41)][_0x50fa1a(0x993)][_0x50fa1a(0x30d)](this)*0x4;if(_0xb93050>=_0x5f11f6)_0x702bc9[_0x50fa1a(0x922)](!![]);}}else _0x194a3+=_0x2b4396;}return _0x194a3;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x4a5)]=function(_0x306d37){const _0x48b988=_0x518efc,_0x48adaa=_0x48b988(0x9ff);_0x306d37[_0x48b988(0x3ac)](undefined)[_0x48b988(0x3ac)]('')[_0x48b988(0x3ac)](null);const _0x8b40ce=_0x306d37[_0x48b988(0x681)](_0x48b988(0x53f))[_0x48b988(0x445)]();VisuMZ[_0x48b988(0x1c9)]['ExportString'](_0x8b40ce,_0x48adaa,!![]),SceneManager[_0x48b988(0x18c)][_0x48b988(0x797)]=!![];},VisuMZ[_0x518efc(0x1c9)]['ExtractStrFromList']=function(_0x76b5c0){const _0x8e3b59=_0x518efc;let _0x2b4276='\x0a'+'─'[_0x8e3b59(0x70d)](0x46)+'\x0a',_0x17cddc='\x0a'+'┄'['repeat'](0x46)+'\x0a',_0x4bcfbe='';for(const _0x54ffc1 of _0x76b5c0){if(!_0x54ffc1)continue;if(_0x54ffc1[_0x8e3b59(0x246)]===0x65)_0x4bcfbe+=_0x2b4276+'\x0a',_0x4bcfbe+='〘Show\x20Text〙\x0a',_0x54ffc1[_0x8e3b59(0x554)][0x4]!==''&&_0x54ffc1[_0x8e3b59(0x554)][0x4]!==undefined&&(_0x4bcfbe+='【%1】\x0a'[_0x8e3b59(0x67d)](_0x54ffc1[_0x8e3b59(0x554)][0x4]));else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x191)_0x4bcfbe+=_0x8e3b59(0x787)[_0x8e3b59(0x67d)](_0x54ffc1[_0x8e3b59(0x554)][0x0]);else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x192)_0x4bcfbe+=_0x2b4276,_0x4bcfbe+=_0x8e3b59(0x245)[_0x8e3b59(0x67d)](_0x17cddc,_0x54ffc1[_0x8e3b59(0x554)][0x0]+0x1,_0x54ffc1[_0x8e3b59(0x554)][0x1]);else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x193){if('lfymV'===_0x8e3b59(0x228))_0x4bcfbe+=_0x2b4276,_0x4bcfbe+=_0x8e3b59(0x842)[_0x8e3b59(0x67d)](_0x17cddc);else{const _0x35b96f=this[_0x8e3b59(0x9ea)](_0x213b7a,_0x4e3c69);_0x35b96f[_0x8e3b59(0x463)][_0x8e3b59(0x161)](_0x3046dc[_0x18510d],0x0,0x0,_0x502186,_0x464b77,_0x8e3b59(0x5dc)),_0x35b96f['x']=(_0x2aca9c-(_0xa710ce[_0x8e3b59(0x18d)]-0x1)/0x2)*_0x1354e3,_0x35b96f['dy']=-_0x5a5acf;}}else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x194)_0x4bcfbe+=_0x2b4276,_0x4bcfbe+=_0x8e3b59(0x675)[_0x8e3b59(0x67d)](_0x17cddc);else{if(_0x54ffc1['code']===0x69)_0x4bcfbe+=_0x2b4276+'\x0a',_0x4bcfbe+=_0x8e3b59(0x858);else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x6c){if(_0x8e3b59(0x1cb)!==_0x8e3b59(0x1cb)){_0x32d595+=_0x267f45;if(_0x4194c4>=_0x3bf022)_0x515b64=_0x1aeb82-0x1;this[_0x8e3b59(0x3c1)](_0x5537dd);}else _0x4bcfbe+=_0x2b4276+'\x0a',_0x4bcfbe+=_0x8e3b59(0x312)['format'](_0x54ffc1[_0x8e3b59(0x554)][0x0]);}else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x198)_0x4bcfbe+=_0x8e3b59(0x787)['format'](_0x54ffc1[_0x8e3b59(0x554)][0x0]);else{if(_0x54ffc1[_0x8e3b59(0x246)]===0x75){const _0x56f38a=$dataCommonEvents[_0x54ffc1[_0x8e3b59(0x554)][0x0]];if(_0x56f38a&&this[_0x8e3b59(0x88e)]<=0xa){this[_0x8e3b59(0x88e)]++;let _0x38a763=VisuMZ[_0x8e3b59(0x1c9)][_0x8e3b59(0x2aa)](_0x56f38a['list']);_0x38a763[_0x8e3b59(0x18d)]>0x0&&('ceZoJ'===_0x8e3b59(0x6ac)?this[_0x8e3b59(0x174)]():(_0x4bcfbe+=_0x2b4276,_0x4bcfbe+=_0x17cddc,_0x4bcfbe+=_0x8e3b59(0x66e)[_0x8e3b59(0x67d)](_0x56f38a['id'],_0x56f38a['name']),_0x4bcfbe+=_0x17cddc,_0x4bcfbe+=_0x38a763,_0x4bcfbe+=_0x17cddc,_0x4bcfbe+=_0x8e3b59(0x68f)[_0x8e3b59(0x67d)](_0x56f38a['id'],_0x56f38a[_0x8e3b59(0x864)]),_0x4bcfbe+=_0x17cddc)),this[_0x8e3b59(0x88e)]--;}}}}}}}}}}}return _0x4bcfbe[_0x8e3b59(0x18d)]>0x0&&(_0x4bcfbe+=_0x2b4276),_0x4bcfbe;},PluginManager[_0x518efc(0x9b6)](pluginData['name'],'OpenURL',_0x225c74=>{const _0x132992=_0x518efc;VisuMZ[_0x132992(0x1da)](_0x225c74,_0x225c74);const _0x206b8b=_0x225c74[_0x132992(0x47f)];VisuMZ[_0x132992(0x503)](_0x206b8b);}),PluginManager['registerCommand'](pluginData[_0x518efc(0x864)],'GoldChange',_0x472d7f=>{const _0x7a37d3=_0x518efc;VisuMZ[_0x7a37d3(0x1da)](_0x472d7f,_0x472d7f);const _0x53ad29=_0x472d7f[_0x7a37d3(0x333)]||0x0;$gameParty[_0x7a37d3(0x3a1)](_0x53ad29);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x7f4),_0x585120=>{const _0x262268=_0x518efc;if(!SceneManager[_0x262268(0x17e)]())return;VisuMZ[_0x262268(0x1da)](_0x585120,_0x585120);const _0xf920fd=_0x585120[_0x262268(0x82b)];SceneManager[_0x262268(0x18c)][_0x262268(0x1dd)](_0xf920fd);}),PluginManager['registerCommand'](pluginData[_0x518efc(0x864)],_0x518efc(0x634),_0x19306a=>{const _0x205415=_0x518efc;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x205415(0x834)]())return;VisuMZ[_0x205415(0x1da)](_0x19306a,_0x19306a);const _0x51e80b=_0x19306a[_0x205415(0x75e)]||0x1;$gameTemp[_0x205415(0x2d2)]=_0x51e80b;}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x19c),_0x18de78=>{const _0x2d6c53=_0x518efc;VisuMZ[_0x2d6c53(0x1da)](_0x18de78,_0x18de78);const _0x20035a=_0x18de78[_0x2d6c53(0x467)]||0x1,_0x282718=_0x18de78[_0x2d6c53(0x25b)]||_0x2d6c53(0x901),_0x3372a4=$gameScreen[_0x2d6c53(0x63f)](_0x20035a);_0x3372a4&&_0x3372a4[_0x2d6c53(0x8e3)](_0x282718);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],'PictureEraseAll',_0x4c12d8=>{const _0x19e44a=_0x518efc;for(let _0x27b324=0x1;_0x27b324<=0x64;_0x27b324++){$gameScreen[_0x19e44a(0x1cc)](_0x27b324);}}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],_0x518efc(0x955),_0x45a8af=>{const _0x2dc618=_0x518efc;VisuMZ[_0x2dc618(0x1da)](_0x45a8af,_0x45a8af);const _0x4e6e13=Math[_0x2dc618(0x253)](_0x45a8af[_0x2dc618(0x315)],_0x45a8af[_0x2dc618(0x35e)]),_0xfe82d8=Math['max'](_0x45a8af[_0x2dc618(0x315)],_0x45a8af[_0x2dc618(0x35e)]);for(let _0x416355=_0x4e6e13;_0x416355<=_0xfe82d8;_0x416355++){$gameScreen['erasePicture'](_0x416355);}}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],'PictureRotateBy',_0x3c6ccc=>{const _0x2e3efb=_0x518efc;VisuMZ[_0x2e3efb(0x1da)](_0x3c6ccc,_0x3c6ccc);const _0x11645a=Math[_0x2e3efb(0x38c)](_0x3c6ccc[_0x2e3efb(0x75e)])[_0x2e3efb(0x22e)](0x1,0x64),_0x3dde11=-Number(_0x3c6ccc[_0x2e3efb(0x34d)]||0x0),_0x5588ed=Math[_0x2e3efb(0x55c)](_0x3c6ccc[_0x2e3efb(0x184)]||0x0,0x0),_0x3aad5d=_0x3c6ccc[_0x2e3efb(0x25b)]||_0x2e3efb(0x901),_0x3601ad=_0x3c6ccc[_0x2e3efb(0x194)],_0x4a489d=$gameScreen[_0x2e3efb(0x63f)](_0x11645a);if(!_0x4a489d)return;_0x4a489d[_0x2e3efb(0x890)](_0x3dde11,_0x5588ed,_0x3aad5d);if(_0x3601ad){if('obEBx'!==_0x2e3efb(0xa46)){const _0x553e9c=new _0x5d1a68(_0x2c037c);this['addChild'](_0x553e9c);}else{const _0x64066a=$gameTemp[_0x2e3efb(0x3b1)]();if(_0x64066a)_0x64066a[_0x2e3efb(0x575)](_0x5588ed);}}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],'PictureRotate',_0x4b8ee7=>{const _0x53248a=_0x518efc;VisuMZ[_0x53248a(0x1da)](_0x4b8ee7,_0x4b8ee7);const _0x57a580=Math['round'](_0x4b8ee7[_0x53248a(0x75e)])[_0x53248a(0x22e)](0x1,0x64),_0x344a39=-Number(_0x4b8ee7[_0x53248a(0x56f)]||0x0),_0x4c4e51=Math[_0x53248a(0x55c)](_0x4b8ee7[_0x53248a(0x184)]||0x0,0x0),_0x4ee185=_0x4b8ee7[_0x53248a(0x25b)]||_0x53248a(0x901),_0xbcba87=_0x4b8ee7['Wait'],_0x41456c=$gameScreen['picture'](_0x57a580);if(!_0x41456c)return;_0x41456c[_0x53248a(0x80b)](_0x344a39,_0x4c4e51,_0x4ee185);if(_0xbcba87){const _0x4a6b94=$gameTemp['getLastPluginCommandInterpreter']();if(_0x4a6b94)_0x4a6b94[_0x53248a(0x575)](_0x4c4e51);}}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],_0x518efc(0x867),_0x5acf8e=>{const _0x204fc3=_0x518efc;VisuMZ[_0x204fc3(0x1da)](_0x5acf8e,_0x5acf8e);const _0x589c47=Math['round'](_0x5acf8e[_0x204fc3(0x75e)])[_0x204fc3(0x22e)](0x1,0x64),_0x3788b8=_0x5acf8e['Settings'],_0x52e01b=_0x3788b8[_0x204fc3(0x6d4)][_0x204fc3(0x22e)](0x0,0x1),_0x28536a=Math['round'](_0x3788b8[_0x204fc3(0x989)]||0x0),_0xc06f33=Math[_0x204fc3(0x38c)](_0x3788b8[_0x204fc3(0x9d0)]||0x0),_0x53a86f=Math[_0x204fc3(0x38c)](_0x3788b8[_0x204fc3(0x24b)]||0x0),_0x123611=Math['round'](_0x3788b8['ScaleY']||0x0),_0x3618f8=Math[_0x204fc3(0x38c)](_0x3788b8[_0x204fc3(0x431)])[_0x204fc3(0x22e)](0x0,0xff),_0x51163e=_0x3788b8[_0x204fc3(0x87b)],_0x3ec1c8=_0x204fc3(0x9a0),_0x330faf=_0x5acf8e[_0x204fc3(0x208)]?_0x204fc3(0x208):_0x204fc3(0x956),_0x7f7a3f=_0x3ec1c8[_0x204fc3(0x67d)](_0x5acf8e[_0x204fc3(0x4d2)],_0x330faf);$gameScreen[_0x204fc3(0x287)](_0x589c47,_0x7f7a3f,_0x52e01b,_0x28536a,_0xc06f33,_0x53a86f,_0x123611,_0x3618f8,_0x51163e);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x273),_0x306e5c=>{const _0x1c3c84=_0x518efc;VisuMZ['ConvertParams'](_0x306e5c,_0x306e5c);const _0x11d821=_0x306e5c[_0x1c3c84(0x7f2)]||_0x1c3c84(0x45f),_0x52f546=_0x306e5c[_0x1c3c84(0x1d3)][_0x1c3c84(0x22e)](0x1,0x9),_0x40b489=_0x306e5c[_0x1c3c84(0x76c)]['clamp'](0x1,0x9),_0x1cc10d=_0x306e5c[_0x1c3c84(0x184)]||0x1,_0xbb9cb7=_0x306e5c[_0x1c3c84(0x194)];$gameScreen[_0x1c3c84(0x49f)](_0x11d821),$gameScreen['startShake'](_0x52f546,_0x40b489,_0x1cc10d);if(_0xbb9cb7){const _0x5531a9=$gameTemp[_0x1c3c84(0x3b1)]();if(_0x5531a9)_0x5531a9[_0x1c3c84(0x575)](_0x1cc10d);}}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],'SwitchRandomizeOne',_0x3f4be5=>{const _0x34c5a2=_0x518efc;if($gameParty[_0x34c5a2(0x75b)]())return;VisuMZ[_0x34c5a2(0x1da)](_0x3f4be5,_0x3f4be5);const _0x4be0c5=_0x3f4be5[_0x34c5a2(0x749)],_0x1f5071=(_0x3f4be5['Chance']||0x0)/0x64;for(const _0xe79708 of _0x4be0c5){if('Eibhl'!==_0x34c5a2(0x6d5)){const _0x344838=Math[_0x34c5a2(0x45f)]()<=_0x1f5071;$gameSwitches[_0x34c5a2(0x311)](_0xe79708,_0x344838);}else _0x3cf932[_0x34c5a2(0x772)](_0x34c5a2(0x32a)),_0x576c25[_0x34c5a2(0x772)](_0x425ad5);}}),PluginManager['registerCommand'](pluginData[_0x518efc(0x864)],_0x518efc(0x703),_0x16ca74=>{const _0x266f76=_0x518efc;if($gameParty[_0x266f76(0x75b)]())return;VisuMZ['ConvertParams'](_0x16ca74,_0x16ca74);const _0x12f440=Math[_0x266f76(0x253)](_0x16ca74[_0x266f76(0x315)],_0x16ca74['EndingID']),_0x473b73=Math[_0x266f76(0x55c)](_0x16ca74['StartID'],_0x16ca74[_0x266f76(0x35e)]),_0x24bc33=(_0x16ca74[_0x266f76(0x32f)]||0x0)/0x64;for(let _0x1b2865=_0x12f440;_0x1b2865<=_0x473b73;_0x1b2865++){if('QUPWZ'===_0x266f76(0x67f)){const _0x10485f=Math[_0x266f76(0x45f)]()<=_0x24bc33;$gameSwitches['setValue'](_0x1b2865,_0x10485f);}else this[_0x266f76(0x5fd)][_0x266f76(0x8db)][_0x266f76(0x30d)](this),this[_0x266f76(0x5fd)][_0x266f76(0x5bb)][_0x266f76(0x30d)](this),this[_0x266f76(0x1d2)](this[_0x266f76(0x5fd)][_0x266f76(0x6be)][_0x266f76(0x670)](this));}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x573),_0x5912df=>{const _0x46c05a=_0x518efc;if($gameParty[_0x46c05a(0x75b)]())return;VisuMZ[_0x46c05a(0x1da)](_0x5912df,_0x5912df);const _0x91e807=_0x5912df['IDs'];for(const _0x3e10a2 of _0x91e807){const _0x1fd7b9=$gameSwitches[_0x46c05a(0x333)](_0x3e10a2);$gameSwitches[_0x46c05a(0x311)](_0x3e10a2,!_0x1fd7b9);}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x4fe),_0x4f53d3=>{const _0x299c02=_0x518efc;if($gameParty[_0x299c02(0x75b)]())return;VisuMZ[_0x299c02(0x1da)](_0x4f53d3,_0x4f53d3);const _0x5d3f78=Math[_0x299c02(0x253)](_0x4f53d3[_0x299c02(0x315)],_0x4f53d3[_0x299c02(0x35e)]),_0x4d3bee=Math[_0x299c02(0x55c)](_0x4f53d3[_0x299c02(0x315)],_0x4f53d3[_0x299c02(0x35e)]);for(let _0x2d1ce0=_0x5d3f78;_0x2d1ce0<=_0x4d3bee;_0x2d1ce0++){if(_0x299c02(0x50e)==='hpfXp')this[_0x299c02(0x6aa)]=(_0x1542a3(_0x5137a1['$1'])||0x1)['clamp'](0x1,0xa);else{const _0x5927d9=$gameSwitches[_0x299c02(0x333)](_0x2d1ce0);$gameSwitches[_0x299c02(0x311)](_0x2d1ce0,!_0x5927d9);}}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x8c1),_0x15545f=>{const _0x85d647=_0x518efc;VisuMZ[_0x85d647(0x1da)](_0x15545f,_0x15545f);const _0x5ec526=_0x15545f[_0x85d647(0x3b0)]||0x1;$gameSystem[_0x85d647(0xa20)](_0x5ec526);}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],_0x518efc(0x7ae),_0x2386c5=>{const _0x4a65f1=_0x518efc;if($gameParty[_0x4a65f1(0x75b)]())return;VisuMZ[_0x4a65f1(0x1da)](_0x2386c5,_0x2386c5);const _0x520b65=_0x2386c5[_0x4a65f1(0x3b0)];if(_0x520b65['match'](/Front/i))$gameSystem['setSideView'](![]);else _0x520b65[_0x4a65f1(0x3a8)](/Side/i)?_0x4a65f1(0x53c)!==_0x4a65f1(0x53c)?(_0x4e9a22=_0x349771['round'](_0x3ac1af),_0x5eda35=_0x3d0ed8[_0x4a65f1(0x38c)](_0xfca866),_0x810600=_0x1f8837[_0x4a65f1(0x38c)](_0x9285e6),_0x2d9070=_0x4bbae6[_0x4a65f1(0x38c)](_0x55a4f0),_0x9ec19e=_0x13545e['round'](_0x53a097),_0x5c885d=_0x2a97bd[_0x4a65f1(0x38c)](_0x5308eb),_0x2b91a0[_0x4a65f1(0x1c9)][_0x4a65f1(0x8a7)][_0x4a65f1(0x30d)](this,_0x504804,_0x1df7a7,_0x5ea93,_0x4f7185,_0x1b8ee3,_0x151f2c,_0x273e06,_0x372dbc,_0x1e989a),this[_0x4a65f1(0x889)]()):$gameSystem['setSideView'](!![]):$gameSystem[_0x4a65f1(0x2f3)](!$gameSystem[_0x4a65f1(0x49e)]());}),PluginManager[_0x518efc(0x9b6)](pluginData['name'],_0x518efc(0x29e),_0x2b86bb=>{const _0x488890=_0x518efc;if($gameParty['inBattle']())return;VisuMZ[_0x488890(0x1da)](_0x2b86bb,_0x2b86bb);const _0x387e77=[_0x488890(0x714),_0x488890(0x5b4),'me','se'];for(const _0x43ea95 of _0x387e77){const _0x45720d=_0x2b86bb[_0x43ea95],_0x520b78=_0x488890(0x696)['format'](_0x43ea95);for(const _0x190f7c of _0x45720d){_0x488890(0x3e3)===_0x488890(0x3e3)?AudioManager[_0x488890(0x58a)](_0x520b78,_0x190f7c):_0x2100c7[_0x488890(0x74b)](_0x39e2be,_0x524f90);}}}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x72b),_0x560642=>{const _0x526316=_0x518efc;if($gameParty[_0x526316(0x75b)]())return;VisuMZ[_0x526316(0x1da)](_0x560642,_0x560642);const _0x2581a0=['animations',_0x526316(0x4f6),'battlebacks2',_0x526316(0x425),_0x526316(0x2ad),_0x526316(0x262),_0x526316(0x4b2),'pictures','sv_actors',_0x526316(0x473),_0x526316(0x991),'tilesets','titles1',_0x526316(0x2ae)];for(const _0x532593 of _0x2581a0){const _0x426ecf=_0x560642[_0x532593],_0x30476c='img/%1/'[_0x526316(0x67d)](_0x532593);for(const _0x49ffa7 of _0x426ecf){if(_0x526316(0x535)==='twlkl')ImageManager['loadBitmap'](_0x30476c,_0x49ffa7);else{const _0x50dca6=['animations',_0x526316(0x4f6),_0x526316(0x7b9),'characters',_0x526316(0x2ad),_0x526316(0x262),_0x526316(0x4b2),_0x526316(0x186),'sv_actors','sv_enemies',_0x526316(0x991),_0x526316(0xa3b),'titles1',_0x526316(0x2ae)];for(const _0x4e975f of _0x50dca6){const _0x14cc7d=_0x192994['CoreEngine'][_0x526316(0x54d)]['ImgLoad'][_0x4e975f],_0x1dd6f1=_0x526316(0x30a)[_0x526316(0x67d)](_0x4e975f);for(const _0x295ec2 of _0x14cc7d){_0x3d74c9[_0x526316(0x74b)](_0x1dd6f1,_0x295ec2);}}}}}}),PluginManager['registerCommand'](pluginData[_0x518efc(0x864)],_0x518efc(0x53a),_0x19012c=>{const _0x244397=_0x518efc;if($gameParty[_0x244397(0x75b)]())return;VisuMZ['ConvertParams'](_0x19012c,_0x19012c);const _0x3df42b=_0x19012c[_0x244397(0x3b0)][_0x244397(0x1fa)]()[_0x244397(0x445)](),_0x2136f6=VisuMZ[_0x244397(0x1c9)][_0x244397(0x7c3)](_0x3df42b);$gameSystem['setBattleSystem'](_0x2136f6);}),VisuMZ['CoreEngine'][_0x518efc(0x7c3)]=function(_0x345a25){const _0x33df45=_0x518efc;_0x345a25=_0x345a25||_0x33df45(0x540),_0x345a25=String(_0x345a25)['toUpperCase']()['trim']();switch(_0x345a25){case _0x33df45(0x89d):return 0x0;case _0x33df45(0x818):Imported[_0x33df45(0xa1b)]&&(ConfigManager[_0x33df45(0x201)]=!![]);return 0x1;case'TPB\x20WAIT':Imported[_0x33df45(0xa1b)]&&(ConfigManager['atbActive']=![]);return 0x2;case _0x33df45(0x70e):if(Imported[_0x33df45(0x21a)]){if(_0x33df45(0x2c4)!=='eOBxI')this[_0x33df45(0x16d)](),_0x256704[_0x33df45(0x9b0)]();else return _0x33df45(0x70e);}break;case _0x33df45(0x484):if(Imported['VisuMZ_2_BattleSystemSTB']){if(_0x33df45(0x441)!==_0x33df45(0x269))return _0x33df45(0x484);else this[_0x33df45(0x3e5)]()[_0x33df45(0x20b)]&&(this[_0x33df45(0x722)]=this[_0x33df45(0x3e5)]()['displayX']),this[_0x33df45(0x3e5)]()[_0x33df45(0x7ac)]&&(this[_0x33df45(0x474)]=this[_0x33df45(0x3e5)]()[_0x33df45(0x6b9)]);}break;case'BTB':if(Imported['VisuMZ_2_BattleSystemBTB'])return _0x33df45(0x4fc);break;case'FTB':if(Imported[_0x33df45(0x301)])return'FTB';break;case _0x33df45(0x657):if(Imported[_0x33df45(0x40c)]){if(_0x33df45(0x80e)==='PMGVE')return _0x33df45(0x657);else _0x4b6781['CoreEngine'][_0x33df45(0x78e)][_0x33df45(0x30d)](this),this[_0x33df45(0x25a)]();}break;case'ETB':if(Imported['VisuMZ_2_BattleSystemETB'])return _0x33df45(0x198);break;case _0x33df45(0x5e4):if(Imported[_0x33df45(0x270)])return _0x33df45(0x5e4);break;}return $dataSystem[_0x33df45(0x23c)];},PluginManager['registerCommand'](pluginData['name'],_0x518efc(0x77d),_0x542694=>{const _0x3f2772=_0x518efc;VisuMZ['ConvertParams'](_0x542694,_0x542694);const _0x1e329a=_0x542694[_0x3f2772(0x3b0)]||0x1;$gameSystem[_0x3f2772(0x285)](_0x1e329a);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x8fa),_0x15ee07=>{const _0x11e95e=_0x518efc;VisuMZ[_0x11e95e(0x1da)](_0x15ee07,_0x15ee07);const _0x5825ee=_0x15ee07[_0x11e95e(0x801)]||'';$textPopup(_0x5825ee);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],'VariableEvalReference',_0x258091=>{const _0x125c27=_0x518efc;VisuMZ[_0x125c27(0x1da)](_0x258091,_0x258091);const _0xf9835f=_0x258091['id']||0x1,_0x55232c=_0x258091[_0x125c27(0x2a9)],_0x1ff03d=_0x258091['operand']||0x0;let _0x2f7ccc=$gameVariables['value'](_0xf9835f)||0x0;switch(_0x55232c){case'=':_0x2f7ccc=_0x1ff03d;break;case'+':_0x2f7ccc+=_0x1ff03d;break;case'-':_0x2f7ccc-=_0x1ff03d;break;case'*':_0x2f7ccc*=_0x1ff03d;break;case'/':_0x2f7ccc/=_0x1ff03d;break;case'%':_0x2f7ccc%=_0x1ff03d;break;}_0x2f7ccc=_0x2f7ccc||0x0,$gameVariables[_0x125c27(0x311)](_0xf9835f,_0x2f7ccc);}),PluginManager[_0x518efc(0x9b6)](pluginData[_0x518efc(0x864)],_0x518efc(0x953),_0x5f1257=>{const _0x446b47=_0x518efc;VisuMZ[_0x446b47(0x1da)](_0x5f1257,_0x5f1257);const _0x562a66=_0x5f1257['id']()||0x1,_0x3cf965=_0x5f1257[_0x446b47(0x2a9)],_0x2bb3e8=_0x5f1257[_0x446b47(0x924)]()||0x0;let _0x403ad8=$gameVariables[_0x446b47(0x333)](_0x562a66)||0x0;switch(_0x3cf965){case'=':_0x403ad8=_0x2bb3e8;break;case'+':_0x403ad8+=_0x2bb3e8;break;case'-':_0x403ad8-=_0x2bb3e8;break;case'*':_0x403ad8*=_0x2bb3e8;break;case'/':_0x403ad8/=_0x2bb3e8;break;case'%':_0x403ad8%=_0x2bb3e8;break;}_0x403ad8=_0x403ad8||0x0,$gameVariables[_0x446b47(0x311)](_0x562a66,_0x403ad8);}),VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x8ce)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x614)]=function(){const _0x68a35b=_0x518efc;VisuMZ['CoreEngine'][_0x68a35b(0x8ce)][_0x68a35b(0x30d)](this),this[_0x68a35b(0xa60)](),this[_0x68a35b(0x5f2)](),this[_0x68a35b(0x3a7)](),this[_0x68a35b(0x833)](),this[_0x68a35b(0x2bb)](),this[_0x68a35b(0x4cd)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x936)]={},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0xa60)]=function(){const _0x18d9ff=_0x518efc,_0x2b3d31=[_0x18d9ff(0x167),_0x18d9ff(0x914),_0x18d9ff(0x97b),_0x18d9ff(0x3f5),_0x18d9ff(0x7d5),_0x18d9ff(0x621),_0x18d9ff(0x909),_0x18d9ff(0x2cd)],_0x32f58f=[_0x18d9ff(0x344),_0x18d9ff(0x726),_0x18d9ff(0x3c3),_0x18d9ff(0x338),_0x18d9ff(0x6f2),_0x18d9ff(0x4ff),_0x18d9ff(0x69d),_0x18d9ff(0x63c),'MRG','TRG'],_0x32ce33=[_0x18d9ff(0x7f5),'GRD',_0x18d9ff(0x335),_0x18d9ff(0x7f3),_0x18d9ff(0x606),_0x18d9ff(0x37f),'PDR',_0x18d9ff(0x313),'FDR',_0x18d9ff(0x5df)],_0x30dcc9=[_0x2b3d31,_0x32f58f,_0x32ce33],_0x13d5e4=[_0x18d9ff(0x403),'Plus1',_0x18d9ff(0x94c),'Max','Rate',_0x18d9ff(0x527),_0x18d9ff(0x3b7),_0x18d9ff(0x460),'Flat1',_0x18d9ff(0x977)];for(const _0x4e71a6 of _0x30dcc9){if(_0x18d9ff(0x9a4)!==_0x18d9ff(0x719)){let _0x2af39d='';if(_0x4e71a6===_0x2b3d31)_0x2af39d='param';if(_0x4e71a6===_0x32f58f)_0x2af39d=_0x18d9ff(0x376);if(_0x4e71a6===_0x32ce33)_0x2af39d='sparam';for(const _0x219e1f of _0x13d5e4){let _0x34cf1b=_0x18d9ff(0x498)[_0x18d9ff(0x67d)](_0x2af39d,_0x219e1f);VisuMZ['CoreEngine'][_0x18d9ff(0x936)][_0x34cf1b]=[],VisuMZ[_0x18d9ff(0x1c9)][_0x18d9ff(0x936)][_0x34cf1b+'JS']=[];let _0xda0597='<%1\x20%2:[\x20]';if(['Plus','Flat'][_0x18d9ff(0x1f5)](_0x219e1f))_0xda0597+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x18d9ff(0x753),_0x18d9ff(0x286)][_0x18d9ff(0x1f5)](_0x219e1f))_0xda0597+='([\x5c+\x5c-]\x5cd+)([%％])>';else{if([_0x18d9ff(0x94c),_0x18d9ff(0x977)][_0x18d9ff(0x1f5)](_0x219e1f))'DhWJj'!==_0x18d9ff(0x492)?(_0x5830fe[_0x18d9ff(0x1c9)][_0x18d9ff(0x5d5)][_0x18d9ff(0x30d)](this),this['updateScrollBars']()):_0xda0597+=_0x18d9ff(0x15a);else{if(_0x219e1f===_0x18d9ff(0x6af))_0xda0597+='(\x5cd+)>';else{if(_0x219e1f==='Rate1'){if(_0x18d9ff(0x56d)==='lwjcQ')return this[_0x18d9ff(0x973)]()?_0x9ba9b8[_0x18d9ff(0x976)](_0x18d9ff(0x149)):_0x4c6d41[_0x18d9ff(0xa41)][_0x18d9ff(0x210)][_0x18d9ff(0x30d)](this);else _0xda0597+=_0x18d9ff(0x96e);}else _0x219e1f===_0x18d9ff(0x3b7)&&(_0xda0597+=_0x18d9ff(0x453));}}}}for(const _0xb5ca9c of _0x4e71a6){let _0x5f26d0=_0x219e1f['replace'](/[\d+]/g,'')[_0x18d9ff(0x1fa)]();const _0x4878a3=_0xda0597[_0x18d9ff(0x67d)](_0xb5ca9c,_0x5f26d0);VisuMZ['CoreEngine'][_0x18d9ff(0x936)][_0x34cf1b][_0x18d9ff(0x609)](new RegExp(_0x4878a3,'i'));const _0x1e6d09=_0x18d9ff(0x96b)[_0x18d9ff(0x67d)](_0xb5ca9c,_0x5f26d0);VisuMZ[_0x18d9ff(0x1c9)][_0x18d9ff(0x936)][_0x34cf1b+'JS'][_0x18d9ff(0x609)](new RegExp(_0x1e6d09,'i'));}}}else _0x34def2[_0x18d9ff(0x1c9)][_0x18d9ff(0x650)]['call'](this);}},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x5f2)]=function(){const _0x125eea=_0x518efc;if(VisuMZ[_0x125eea(0x437)])return;},Scene_Boot['prototype'][_0x518efc(0x3a7)]=function(){const _0x252e53=_0x518efc,_0x3ca1a5=VisuMZ[_0x252e53(0x1c9)][_0x252e53(0x54d)];if(_0x3ca1a5[_0x252e53(0x927)][_0x252e53(0x267)]){if(_0x252e53(0x18f)!=='iSxmI')VisuMZ[_0x252e53(0x8fb)](!![]);else return _0x3bc980['CoreEngine'][_0x252e53(0x54d)]['UI']['FadeSpeed'];}_0x3ca1a5[_0x252e53(0x927)][_0x252e53(0x1b7)]&&(Input['keyMapper'][0x23]=_0x252e53(0x8da),Input['keyMapper'][0x24]='home');if(_0x3ca1a5[_0x252e53(0x8be)]){const _0x1740df=_0x3ca1a5[_0x252e53(0x8be)];_0x1740df[_0x252e53(0x8c9)]=_0x1740df[_0x252e53(0x8c9)]||_0x252e53(0x918),_0x1740df[_0x252e53(0x44b)]=_0x1740df[_0x252e53(0x44b)]||_0x252e53(0x91e);}_0x3ca1a5[_0x252e53(0x32d)][_0x252e53(0x3fe)]&&(_0x252e53(0x959)===_0x252e53(0x195)?_0x296bba[_0x252e53(0x201)]=![]:(Input[_0x252e53(0x97e)][0x57]='up',Input[_0x252e53(0x97e)][0x41]=_0x252e53(0x42a),Input[_0x252e53(0x97e)][0x53]=_0x252e53(0x4f0),Input[_0x252e53(0x97e)][0x44]='right',Input[_0x252e53(0x97e)][0x45]=_0x252e53(0x50b))),_0x3ca1a5[_0x252e53(0x32d)][_0x252e53(0x8a0)]&&(_0x252e53(0xa4c)==='iLoxW'?this[_0x252e53(0x63d)]=_0x1d6f8d:Input[_0x252e53(0x97e)][0x52]='dashToggle'),_0x3ca1a5['Param'][_0x252e53(0x293)]=_0x3ca1a5[_0x252e53(0x224)][_0x252e53(0x293)]['map'](_0x1cba57=>_0x1cba57[_0x252e53(0x1fa)]()[_0x252e53(0x445)]()),_0x3ca1a5[_0x252e53(0x224)][_0x252e53(0x225)]=_0x3ca1a5[_0x252e53(0x224)][_0x252e53(0x225)][_0x252e53(0x52b)](_0x5e6adf=>_0x5e6adf[_0x252e53(0x1fa)]()[_0x252e53(0x445)]()),_0x3ca1a5[_0x252e53(0x927)][_0x252e53(0x9b7)]=_0x3ca1a5[_0x252e53(0x927)][_0x252e53(0x9b7)]??!![],_0x3ca1a5[_0x252e53(0x927)]['ShiftT_Toggle']=_0x3ca1a5['QoL'][_0x252e53(0x958)]??!![];},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x833)]=function(){const _0x2fdbd1=_0x518efc;this[_0x2fdbd1(0x3b6)]();},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x3b6)]=function(){const _0x5de065=_0x518efc,_0x5423d6=VisuMZ['CoreEngine'][_0x5de065(0x54d)][_0x5de065(0x79f)];for(const _0x3b9623 of _0x5423d6){const _0x3437cb=_0x3b9623[_0x5de065(0x8e2)]['replace'](/[ ]/g,''),_0x55e722=_0x3b9623[_0x5de065(0x531)];VisuMZ['CoreEngine']['createJsQuickFunction'](_0x3437cb,_0x55e722);}},VisuMZ[_0x518efc(0x1c9)]['createJsQuickFunction']=function(_0x5a3e99,_0xffae1){const _0x1ceb3f=_0x518efc;if(!!window[_0x5a3e99]){if(_0x1ceb3f(0xa0a)!==_0x1ceb3f(0xa0a))return this['_scene']&&this[_0x1ceb3f(0x18c)][_0x1ceb3f(0x60a)]===_0x38276c;else{if($gameTemp[_0x1ceb3f(0x7c5)]())console[_0x1ceb3f(0x772)](_0x1ceb3f(0x3d1)[_0x1ceb3f(0x67d)](_0x5a3e99));}}const _0x2a702d=_0x1ceb3f(0x829)[_0x1ceb3f(0x67d)](_0x5a3e99,_0xffae1);window[_0x5a3e99]=new Function(_0x2a702d);},Scene_Boot[_0x518efc(0xa41)]['process_VisuMZ_CoreEngine_CustomParameters']=function(){const _0x2341b7=_0x518efc,_0x6a4de5=VisuMZ[_0x2341b7(0x1c9)][_0x2341b7(0x54d)]['CustomParam'];if(!_0x6a4de5)return;for(const _0x126c96 of _0x6a4de5){if(_0x2341b7(0xa69)===_0x2341b7(0xa69)){if(!_0x126c96)continue;VisuMZ[_0x2341b7(0x1c9)]['createCustomParameter'](_0x126c96);}else this[_0x2341b7(0x55e)](...arguments);}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x507)]={},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x74c)]={},VisuMZ['CoreEngine'][_0x518efc(0x9cf)]={},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x506)]={},VisuMZ['CoreEngine'][_0x518efc(0x185)]=function(_0x5342fa){const _0x557a66=_0x518efc,_0xf16993=_0x5342fa[_0x557a66(0x511)],_0x1d23c0=_0x5342fa[_0x557a66(0x8f9)],_0x38c441=_0x5342fa['Icon'],_0x11b110=_0x5342fa[_0x557a66(0x7f2)],_0x127d67=new Function(_0x5342fa[_0x557a66(0x45e)]);VisuMZ['CoreEngine'][_0x557a66(0x507)][_0xf16993[_0x557a66(0x1fa)]()[_0x557a66(0x445)]()]=_0x1d23c0,VisuMZ['CoreEngine'][_0x557a66(0x74c)][_0xf16993[_0x557a66(0x1fa)]()[_0x557a66(0x445)]()]=_0x38c441,VisuMZ[_0x557a66(0x1c9)][_0x557a66(0x9cf)][_0xf16993[_0x557a66(0x1fa)]()[_0x557a66(0x445)]()]=_0x11b110,VisuMZ['CoreEngine'][_0x557a66(0x506)][_0xf16993['toUpperCase']()[_0x557a66(0x445)]()]=_0xf16993,Object[_0x557a66(0x3fc)](Game_BattlerBase[_0x557a66(0xa41)],_0xf16993,{'get'(){const _0x4cb48f=_0x557a66;if('mNoPo'!==_0x4cb48f(0x806)){const _0x1f56ca=_0x127d67[_0x4cb48f(0x30d)](this);return _0x11b110===_0x4cb48f(0x5de)?Math['round'](_0x1f56ca):_0x1f56ca;}else!_0x520d33[_0x4cb48f(0x872)]()&&!this[_0x4cb48f(0x69f)]&&!_0x2e6ee6[_0x4cb48f(0x2b3)]()&&(this['_playtestF7Looping']=!![],this[_0x4cb48f(0x4ba)](),_0x25e0a4[_0x4cb48f(0x9b0)](),this[_0x4cb48f(0x69f)]=![]);}});},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x369)]={},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x6e7)]={},Scene_Boot['prototype'][_0x518efc(0x4cd)]=function(){const _0x420bc0=_0x518efc,_0x560327=VisuMZ['CoreEngine'][_0x420bc0(0x54d)][_0x420bc0(0x369)];for(const _0x479aa8 of _0x560327){const _0x1da8d7=(_0x479aa8[_0x420bc0(0x9d9)]||'')[_0x420bc0(0x7c4)]()['trim'](),_0xcb1ae7=(_0x479aa8[_0x420bc0(0x7f7)]||'')['toLowerCase']()['trim']();VisuMZ[_0x420bc0(0x1c9)]['ControllerButtons'][_0x1da8d7]=_0x479aa8,VisuMZ[_0x420bc0(0x1c9)]['ControllerMatches'][_0xcb1ae7]=_0x1da8d7;}},VisuMZ[_0x518efc(0x437)]=function(){const _0xf90f87=_0x518efc;for(const _0x5a0268 of $dataActors){if(_0x5a0268)VisuMZ['ParseActorNotetags'](_0x5a0268);}for(const _0x304aef of $dataClasses){if(_0x304aef)VisuMZ[_0xf90f87(0xa61)](_0x304aef);}for(const _0xd12140 of $dataSkills){if(_0xd12140)VisuMZ[_0xf90f87(0x447)](_0xd12140);}for(const _0x3f9095 of $dataItems){if(_0x3f9095)VisuMZ[_0xf90f87(0x547)](_0x3f9095);}for(const _0x53f226 of $dataWeapons){if(_0x53f226)VisuMZ[_0xf90f87(0x7e2)](_0x53f226);}for(const _0x164535 of $dataArmors){if('pcWXJ'==='oGgzK')_0x57d09a[_0xf90f87(0x8ad)]=!![],_0x33b619[_0xf90f87(0x1c9)][_0xf90f87(0x5dd)][_0xf90f87(0x30d)](this,_0x5e323e,_0xf8172a),_0x19c26d[_0xf90f87(0x8ad)]=_0x55da74;else{if(_0x164535)VisuMZ[_0xf90f87(0x631)](_0x164535);}}for(const _0xce0787 of $dataEnemies){if(_0xce0787)VisuMZ[_0xf90f87(0x85f)](_0xce0787);}for(const _0x4524f3 of $dataStates){if(_0xf90f87(0x625)!==_0xf90f87(0x4de)){if(_0x4524f3)VisuMZ['ParseStateNotetags'](_0x4524f3);}else{var _0x521b97=_0x409362(_0x36f09c['$1']);_0x3cc1a8+=_0x521b97;}}for(const _0x2fff82 of $dataTilesets){if(_0x2fff82)VisuMZ['ParseTilesetNotetags'](_0x2fff82);}},VisuMZ[_0x518efc(0x76d)]=function(_0x44ff16){},VisuMZ[_0x518efc(0xa61)]=function(_0x3255a8){},VisuMZ[_0x518efc(0x447)]=function(_0x128978){},VisuMZ['ParseItemNotetags']=function(_0x400acc){},VisuMZ['ParseWeaponNotetags']=function(_0x254cb5){},VisuMZ['ParseArmorNotetags']=function(_0x5acbd9){},VisuMZ['ParseEnemyNotetags']=function(_0x5303e4){},VisuMZ[_0x518efc(0x2dd)]=function(_0x5e8666){},VisuMZ[_0x518efc(0x5c9)]=function(_0x28bc44){},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x76d)]=VisuMZ[_0x518efc(0x76d)],VisuMZ['ParseActorNotetags']=function(_0x49a95d){const _0x1b3cef=_0x518efc;VisuMZ[_0x1b3cef(0x1c9)][_0x1b3cef(0x76d)][_0x1b3cef(0x30d)](this,_0x49a95d);const _0x22b7f4=_0x49a95d['note'];if(_0x22b7f4[_0x1b3cef(0x3a8)](/<MAX LEVEL:[ ](\d+)>/i)){_0x49a95d[_0x1b3cef(0x673)]=Number(RegExp['$1']);if(_0x49a95d[_0x1b3cef(0x673)]===0x0)_0x49a95d[_0x1b3cef(0x673)]=Number['MAX_SAFE_INTEGER'];}_0x22b7f4['match'](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x49a95d['initialLevel']=Math[_0x1b3cef(0x253)](Number(RegExp['$1']),_0x49a95d[_0x1b3cef(0x673)]));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa61)]=VisuMZ[_0x518efc(0xa61)],VisuMZ['ParseClassNotetags']=function(_0x44a4f4){const _0x2c39ac=_0x518efc;VisuMZ[_0x2c39ac(0x1c9)][_0x2c39ac(0xa61)][_0x2c39ac(0x30d)](this,_0x44a4f4);if(_0x44a4f4['learnings']){if(_0x2c39ac(0x446)!==_0x2c39ac(0x160))for(const _0x4f14bb of _0x44a4f4[_0x2c39ac(0xa08)]){if(_0x4f14bb['note'][_0x2c39ac(0x3a8)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x2c39ac(0x7fe)!==_0x2c39ac(0x59e))_0x4f14bb[_0x2c39ac(0x807)]=Math['max'](Number(RegExp['$1']),0x1);else for(const _0x3f0adb of _0xd51c4c){if(_0x3f0adb&&_0x3f0adb[_0x2c39ac(0x841)]){if(this[_0x2c39ac(0x562)](_0x3f0adb))return!![];if(this[_0x2c39ac(0x2a1)](_0x3f0adb))return!![];}}}}else{const _0x583e88=_0x2c39ac(0x8ed);this[_0x2c39ac(0x81f)]=this[_0x2c39ac(0x81f)]||{};if(this[_0x2c39ac(0x81f)][_0x583e88])return this[_0x2c39ac(0x81f)][_0x583e88];const _0x164937=_0x2ffb41[_0x2c39ac(0x1c9)]['Settings']['Color'][_0x2c39ac(0x47d)];return this[_0x2c39ac(0x629)](_0x583e88,_0x164937);}}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x85f)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x518efc(0x85f)]=function(_0x2caddd){const _0x1266fb=_0x518efc;VisuMZ[_0x1266fb(0x1c9)][_0x1266fb(0x85f)]['call'](this,_0x2caddd),_0x2caddd['level']=0x1;const _0x557f4a=_0x2caddd['note'];if(_0x557f4a[_0x1266fb(0x3a8)](/<LEVEL:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x807)]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<MAXHP:[ ](\d+)>/i))_0x2caddd['params'][0x0]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<MAXMP:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x1]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<ATK:[ ](\d+)>/i))_0x2caddd['params'][0x2]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<DEF:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x3]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<MAT:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x4]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<MDF:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x5]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<AGI:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x6]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<LUK:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x46e)][0x7]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<EXP:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x47a)]=Number(RegExp['$1']);if(_0x557f4a[_0x1266fb(0x3a8)](/<GOLD:[ ](\d+)>/i))_0x2caddd[_0x1266fb(0x512)]=Number(RegExp['$1']);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x624)]=Graphics[_0x518efc(0x6a1)],Graphics[_0x518efc(0x6a1)]=function(){const _0x36abfa=_0x518efc;switch(VisuMZ['CoreEngine'][_0x36abfa(0x54d)][_0x36abfa(0x927)][_0x36abfa(0x465)]){case'stretch':return!![];case _0x36abfa(0x6b2):return![];default:return VisuMZ['CoreEngine'][_0x36abfa(0x624)][_0x36abfa(0x30d)](this);}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x3e2)]=Graphics[_0x518efc(0x5d8)],Graphics[_0x518efc(0x5d8)]=function(_0x512867,_0x3b1831,_0x5ec3a0=null){const _0x217de7=_0x518efc;VisuMZ[_0x217de7(0x1c9)][_0x217de7(0x3e2)][_0x217de7(0x30d)](this,_0x512867,_0x3b1831,_0x5ec3a0),VisuMZ['ShowDevTools'](![]);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5eb)]=Graphics[_0x518efc(0x83e)],Graphics[_0x518efc(0x83e)]=function(_0x525243){const _0x132e84=_0x518efc;VisuMZ[_0x132e84(0x1c9)][_0x132e84(0x5eb)]['call'](this,_0x525243),this[_0x132e84(0x327)](_0x525243);},Graphics['_centerElementCoreEngine']=function(_0x24a6c1){const _0x5f166a=_0x518efc;VisuMZ[_0x5f166a(0x1c9)][_0x5f166a(0x54d)][_0x5f166a(0x927)][_0x5f166a(0x88c)]&&(_0x24a6c1[_0x5f166a(0x65c)][_0x5f166a(0x65f)]='none');VisuMZ[_0x5f166a(0x1c9)][_0x5f166a(0x54d)]['QoL']['PixelateImageRendering']&&(_0x5f166a(0x7bf)===_0x5f166a(0x7bf)?_0x24a6c1['style'][_0x5f166a(0xa14)]=_0x5f166a(0x877):(this[_0x5f166a(0x463)]=_0x3ea9cb[_0x5f166a(0x3da)](this[_0x5f166a(0x5fd)][_0x5f166a(0x584)]),this[_0x5f166a(0x463)][_0x5f166a(0x82f)](this[_0x5f166a(0x560)][_0x5f166a(0x670)](this))));const _0x35bdd3=Math[_0x5f166a(0x55c)](0x0,Math[_0x5f166a(0x25f)](_0x24a6c1['width']*this['_realScale'])),_0x32f585=Math['max'](0x0,Math['floor'](_0x24a6c1[_0x5f166a(0x622)]*this[_0x5f166a(0x144)]));_0x24a6c1[_0x5f166a(0x65c)][_0x5f166a(0x217)]=_0x35bdd3+'px',_0x24a6c1[_0x5f166a(0x65c)][_0x5f166a(0x622)]=_0x32f585+'px';},VisuMZ['CoreEngine'][_0x518efc(0x8d3)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x55e)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x55e)]=function(_0x2cd7aa,_0x4d523f){const _0x1e2ef5=_0x518efc;VisuMZ[_0x1e2ef5(0x1c9)][_0x1e2ef5(0x8d3)]['call'](this,_0x2cd7aa,_0x4d523f),this[_0x1e2ef5(0x91f)]=!(VisuMZ[_0x1e2ef5(0x1c9)][_0x1e2ef5(0x54d)]['QoL'][_0x1e2ef5(0x36b)]??!![]);},Bitmap['prototype'][_0x518efc(0x889)]=function(){const _0x3d5273=_0x518efc;this[_0x3d5273(0x3a3)]=!![];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x762)]=Sprite['prototype']['destroy'],Sprite[_0x518efc(0xa41)][_0x518efc(0x605)]=function(){const _0x4e3905=_0x518efc;if(this[_0x4e3905(0x41d)])VisuMZ[_0x4e3905(0x1c9)][_0x4e3905(0x762)][_0x4e3905(0x30d)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x518efc(0xa41)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x3aab18=_0x518efc;if(!this[_0x3aab18(0x463)])return;if(!this[_0x3aab18(0x463)][_0x3aab18(0x3a3)])return;this[_0x3aab18(0x463)]['_baseTexture']&&!this['_bitmap'][_0x3aab18(0x362)][_0x3aab18(0x234)]&&this['bitmap'][_0x3aab18(0x605)]();},VisuMZ[_0x518efc(0x1c9)]['Bitmap_resize']=Bitmap[_0x518efc(0xa41)][_0x518efc(0x3bc)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x3bc)]=function(_0x3c11b4,_0x310869){const _0x437ba4=_0x518efc;VisuMZ[_0x437ba4(0x1c9)][_0x437ba4(0x35a)]['call'](this,_0x3c11b4,_0x310869),this[_0x437ba4(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x8a7)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x9a2)],Bitmap['prototype'][_0x518efc(0x9a2)]=function(_0x52b4fd,_0x104f57,_0x2a4ffb,_0x116f73,_0x56cf6e,_0x52dfbf,_0x47b85e,_0x43bf03,_0x5e7756){const _0x316cde=_0x518efc;_0x104f57=Math[_0x316cde(0x38c)](_0x104f57),_0x2a4ffb=Math[_0x316cde(0x38c)](_0x2a4ffb),_0x116f73=Math[_0x316cde(0x38c)](_0x116f73),_0x56cf6e=Math[_0x316cde(0x38c)](_0x56cf6e),_0x52dfbf=Math['round'](_0x52dfbf),_0x47b85e=Math[_0x316cde(0x38c)](_0x47b85e),VisuMZ[_0x316cde(0x1c9)][_0x316cde(0x8a7)][_0x316cde(0x30d)](this,_0x52b4fd,_0x104f57,_0x2a4ffb,_0x116f73,_0x56cf6e,_0x52dfbf,_0x47b85e,_0x43bf03,_0x5e7756),this[_0x316cde(0x889)]();},VisuMZ['CoreEngine'][_0x518efc(0x8d0)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x725)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x725)]=function(_0x324fa1,_0xbca2d2,_0x450171,_0x371e5f){const _0x55707c=_0x518efc;VisuMZ[_0x55707c(0x1c9)]['Bitmap_clearRect'][_0x55707c(0x30d)](this,_0x324fa1,_0xbca2d2,_0x450171,_0x371e5f),this[_0x55707c(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x61a)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x56b)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x56b)]=function(_0x5eca70,_0x21c968,_0x1b699,_0x355199,_0x3120a0){const _0x39c21c=_0x518efc;VisuMZ['CoreEngine'][_0x39c21c(0x61a)][_0x39c21c(0x30d)](this,_0x5eca70,_0x21c968,_0x1b699,_0x355199,_0x3120a0),this[_0x39c21c(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x74d)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x508)],Bitmap['prototype'][_0x518efc(0x508)]=function(_0x4659ea,_0x80aa17,_0x3b3287,_0x38e4a1,_0x5ef740){const _0x3f356a=_0x518efc;VisuMZ[_0x3f356a(0x1c9)][_0x3f356a(0x74d)]['call'](this,_0x4659ea,_0x80aa17,_0x3b3287,_0x38e4a1,_0x5ef740),this[_0x3f356a(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x899)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x85b)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x85b)]=function(_0x39c11c,_0x54d433,_0x20f2d9,_0x227c7e,_0x165695,_0x54cb27,_0x4e2793){const _0x1e9079=_0x518efc;VisuMZ['CoreEngine'][_0x1e9079(0x899)]['call'](this,_0x39c11c,_0x54d433,_0x20f2d9,_0x227c7e,_0x165695,_0x54cb27,_0x4e2793),this[_0x1e9079(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x87e)]=Bitmap['prototype'][_0x518efc(0x66c)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x66c)]=function(_0x16fefd,_0x57af3c,_0x312da2,_0x7536fc){const _0x53e495=_0x518efc;_0x16fefd=Math[_0x53e495(0x38c)](_0x16fefd),_0x57af3c=Math[_0x53e495(0x38c)](_0x57af3c),_0x312da2=Math[_0x53e495(0x38c)](_0x312da2),VisuMZ[_0x53e495(0x1c9)][_0x53e495(0x87e)]['call'](this,_0x16fefd,_0x57af3c,_0x312da2,_0x7536fc),this[_0x53e495(0x889)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x1ae)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x6a7)],Bitmap[_0x518efc(0xa41)]['measureTextWidth']=function(_0x1204e5){const _0x516cb1=_0x518efc;return Math[_0x516cb1(0x972)](VisuMZ['CoreEngine'][_0x516cb1(0x1ae)][_0x516cb1(0x30d)](this,_0x1204e5));},VisuMZ['CoreEngine'][_0x518efc(0x404)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x161)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x161)]=function(_0x3178a9,_0x20f8da,_0x2e691d,_0x4d6816,_0x375c96,_0x59ed6d){const _0x5a4279=_0x518efc;_0x20f8da=Math['round'](_0x20f8da),_0x2e691d=Math[_0x5a4279(0x38c)](_0x2e691d),_0x4d6816=Math['round'](_0x4d6816),_0x375c96=Math[_0x5a4279(0x38c)](_0x375c96),VisuMZ[_0x5a4279(0x1c9)]['Bitmap_drawText'][_0x5a4279(0x30d)](this,_0x3178a9,_0x20f8da,_0x2e691d,_0x4d6816,_0x375c96,_0x59ed6d),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x518efc(0x5cc)]=Bitmap[_0x518efc(0xa41)][_0x518efc(0x4ce)],Bitmap[_0x518efc(0xa41)][_0x518efc(0x4ce)]=function(_0x570eeb,_0x1a1445,_0x29ef62,_0x224769){const _0x230924=_0x518efc;VisuMZ[_0x230924(0x1c9)][_0x230924(0x54d)][_0x230924(0x927)][_0x230924(0x73f)]?this[_0x230924(0x305)](_0x570eeb,_0x1a1445,_0x29ef62,_0x224769):VisuMZ[_0x230924(0x1c9)]['Bitmap_drawTextOutline'][_0x230924(0x30d)](this,_0x570eeb,_0x1a1445,_0x29ef62,_0x224769);},Bitmap[_0x518efc(0xa41)]['_drawTextShadow']=function(_0xf8284d,_0x4aa009,_0x5ae895,_0x24ee06){const _0x1d128f=_0x518efc,_0x109926=this[_0x1d128f(0x8b6)];_0x109926[_0x1d128f(0x308)]=this['outlineColor'],_0x109926[_0x1d128f(0x7a8)](_0xf8284d,_0x4aa009+0x2,_0x5ae895+0x2,_0x24ee06);},VisuMZ['CoreEngine'][_0x518efc(0x26e)]=Input[_0x518efc(0x85c)],Input[_0x518efc(0x85c)]=function(){const _0x2db166=_0x518efc;VisuMZ[_0x2db166(0x1c9)][_0x2db166(0x26e)][_0x2db166(0x30d)](this),this[_0x2db166(0x2c7)]=undefined,this[_0x2db166(0x8f8)]=undefined,this[_0x2db166(0x849)]=Input[_0x2db166(0x323)];},VisuMZ[_0x518efc(0x1c9)]['Input_update']=Input[_0x518efc(0x4ba)],Input[_0x518efc(0x4ba)]=function(){const _0x43a721=_0x518efc;VisuMZ['CoreEngine'][_0x43a721(0x984)][_0x43a721(0x30d)](this);if(this['_gamepadWait'])this[_0x43a721(0x849)]--;},VisuMZ['CoreEngine']['Input_pollGamepads']=Input[_0x518efc(0x1c6)],Input[_0x518efc(0x1c6)]=function(){const _0x52ac05=_0x518efc;if(this[_0x52ac05(0x849)])return;VisuMZ[_0x52ac05(0x1c9)][_0x52ac05(0x4d7)][_0x52ac05(0x30d)](this);},VisuMZ[_0x518efc(0x1c9)]['Input_setupEventHandlers']=Input[_0x518efc(0x5b7)],Input['_setupEventHandlers']=function(){const _0x474c72=_0x518efc;VisuMZ[_0x474c72(0x1c9)]['Input_setupEventHandlers'][_0x474c72(0x30d)](this),document['addEventListener']('keypress',this[_0x474c72(0x32e)][_0x474c72(0x670)](this));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x202)]=Input['_onKeyDown'],Input[_0x518efc(0x21c)]=function(_0x36d845){const _0x390867=_0x518efc;this['_inputSpecialKeyCode']=_0x36d845['keyCode'],VisuMZ[_0x390867(0x1c9)][_0x390867(0x202)][_0x390867(0x30d)](this,_0x36d845),this[_0x390867(0x938)](null);},Input['_onKeyPress']=function(_0x493c40){const _0x210a6c=_0x518efc;this[_0x210a6c(0x1c5)](_0x493c40);},Input[_0x518efc(0x1c5)]=function(_0x38f0cf){const _0x5ba54b=_0x518efc;this[_0x5ba54b(0x8f8)]=_0x38f0cf[_0x5ba54b(0x8cc)];let _0x57013d=String[_0x5ba54b(0x8ba)](_0x38f0cf[_0x5ba54b(0x65e)]);if(this[_0x5ba54b(0x2c7)]===undefined){if(_0x5ba54b(0x416)!==_0x5ba54b(0x416))return this[_0x5ba54b(0x34a)]()['hit']+0.05;else this[_0x5ba54b(0x2c7)]=_0x57013d;}else this[_0x5ba54b(0x2c7)]+=_0x57013d;},VisuMZ['CoreEngine'][_0x518efc(0x485)]=Input[_0x518efc(0x398)],Input[_0x518efc(0x398)]=function(_0xbd6a90){const _0x5c7400=_0x518efc;if(_0xbd6a90===0x8)return![];return VisuMZ[_0x5c7400(0x1c9)][_0x5c7400(0x485)]['call'](this,_0xbd6a90);},Input['isSpecialCode']=function(_0x78f5c9){const _0xb58643=_0x518efc;if(_0x78f5c9[_0xb58643(0x3a8)](/backspace/i))return this[_0xb58643(0x8f8)]===0x8;if(_0x78f5c9[_0xb58643(0x3a8)](/enter/i))return this[_0xb58643(0x8f8)]===0xd;if(_0x78f5c9[_0xb58643(0x3a8)](/escape/i))return this[_0xb58643(0x8f8)]===0x1b;},Input[_0x518efc(0x1a7)]=function(){const _0x8e53ac=_0x518efc;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x8e53ac(0x2fb)](this[_0x8e53ac(0x8f8)]);},Input['isArrowPressed']=function(){const _0x4b7510=_0x518efc;return[0x25,0x26,0x27,0x28]['contains'](this[_0x4b7510(0x8f8)]);},Input[_0x518efc(0x89b)]=function(){const _0x122a7c=_0x518efc;if(navigator['getGamepads']){if(_0x122a7c(0x72a)!==_0x122a7c(0x72a)){const _0x1ef496=this[_0x122a7c(0xa59)];this[_0x122a7c(0x5ba)](0x0,0x0,_0x1ef496,this[_0x122a7c(0x669)]());const _0x1582a5=this[_0x122a7c(0x8ae)](_0x3192ef[_0x122a7c(0x34b)]())['width'];this['drawTextEx'](_0x8283a8['displayName'](),_0x5ae06c['floor']((_0x1ef496-_0x1582a5)/0x2),0x0);}else{const _0x3c2008=navigator[_0x122a7c(0x378)]();if(_0x3c2008)for(const _0x22e596 of _0x3c2008){if(_0x22e596&&_0x22e596['connected'])return!![];}}}return![];},Input['isGamepadTriggered']=function(){const _0x11ec1b=_0x518efc;if(navigator[_0x11ec1b(0x378)]){if(_0x11ec1b(0x21d)===_0x11ec1b(0x249))return!![];else{const _0xa79f1b=navigator['getGamepads']();if(_0xa79f1b){if(_0x11ec1b(0x20a)===_0x11ec1b(0x811))_0x286521['clear'](),this[_0x11ec1b(0x28d)]();else for(const _0x29ae47 of _0xa79f1b){if(_0x29ae47&&_0x29ae47[_0x11ec1b(0x841)]){if(this[_0x11ec1b(0x562)](_0x29ae47))return!![];if(this[_0x11ec1b(0x2a1)](_0x29ae47))return!![];}}}}}return![];},Input[_0x518efc(0x562)]=function(_0x1054fa){const _0x5839ba=_0x518efc,_0x43d4a9=_0x1054fa[_0x5839ba(0x526)];for(let _0x59b954=0x0;_0x59b954<_0x43d4a9[_0x5839ba(0x18d)];_0x59b954++){if(_0x43d4a9[_0x59b954][_0x5839ba(0x646)])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x3bb39b){const _0x588d20=_0x518efc,_0x140987=_0x3bb39b[_0x588d20(0x22f)],_0x4694ca=0.5;if(_0x140987[0x0]<-_0x4694ca)return!![];if(_0x140987[0x0]>_0x4694ca)return!![];if(_0x140987[0x1]<-_0x4694ca)return!![];if(_0x140987[0x1]>_0x4694ca)return!![];return![];},Input[_0x518efc(0x776)]=function(){const _0x3ff7d2=_0x518efc;return this[_0x3ff7d2(0x71a)]||null;},Input[_0x518efc(0x938)]=function(_0x3ea3fd){const _0x3fca7e=_0x518efc;this[_0x3fca7e(0x71a)]=_0x3ea3fd;},VisuMZ[_0x518efc(0x1c9)]['Input_updateGamepadState']=Input[_0x518efc(0x6ef)],Input[_0x518efc(0x6ef)]=function(_0x568e79){const _0x3348ef=_0x518efc;VisuMZ[_0x3348ef(0x1c9)][_0x3348ef(0x844)]['call'](this,_0x568e79);if(this[_0x3348ef(0x562)](_0x568e79)||this[_0x3348ef(0x2a1)](_0x568e79)){if(_0x3348ef(0x8d6)===_0x3348ef(0x8d6))this['setLastGamepadUsed'](_0x568e79);else return _0x1830ae[_0x3348ef(0x1c9)][_0x3348ef(0x54d)][_0x3348ef(0x3b3)][_0x3348ef(0x9d2)];}},Input[_0x518efc(0x22c)]=function(){const _0x499981=_0x518efc;return this[_0x499981(0x71a)]?this[_0x499981(0x71a)]['id']:'Keyboard';},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x569)]=Tilemap[_0x518efc(0xa41)][_0x518efc(0x907)],Tilemap[_0x518efc(0xa41)]['_addShadow']=function(_0x4fa23f,_0x1ce6e1,_0x43b41e,_0x2e7e3e){const _0x443f03=_0x518efc;if($gameMap&&$gameMap['areTileShadowsHidden']())return;VisuMZ[_0x443f03(0x1c9)][_0x443f03(0x569)][_0x443f03(0x30d)](this,_0x4fa23f,_0x1ce6e1,_0x43b41e,_0x2e7e3e);},Tilemap[_0x518efc(0x289)]['prototype'][_0x518efc(0x5c3)]=function(){const _0x17880d=_0x518efc;this[_0x17880d(0x5ea)]();for(let _0x157d33=0x0;_0x157d33<Tilemap[_0x17880d(0x53d)][_0x17880d(0x85d)];_0x157d33++){if(_0x17880d(0x42d)===_0x17880d(0x42d)){const _0x5f2faf=new PIXI['BaseTexture']();_0x5f2faf[_0x17880d(0x7e7)](0x800,0x800),VisuMZ['CoreEngine'][_0x17880d(0x54d)][_0x17880d(0x927)][_0x17880d(0x36b)]&&(_0x5f2faf[_0x17880d(0x8f0)]=PIXI[_0x17880d(0x5c0)]['NEAREST']),this[_0x17880d(0x2c1)][_0x17880d(0x609)](_0x5f2faf);}else _0x3af50c[_0x17880d(0x1cc)](_0x13a3dd);}},WindowLayer[_0x518efc(0xa41)]['isMaskingEnabled']=function(){const _0x42357e=_0x518efc;if(SceneManager&&SceneManager[_0x42357e(0x18c)])return SceneManager['_scene'][_0x42357e(0x6a8)]();else{if(_0x42357e(0x983)===_0x42357e(0x17d))_0x49104a[_0x42357e(0x1c9)]['Game_System_initialize'][_0x42357e(0x30d)](this),this[_0x42357e(0x187)]();else return!![];}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa6a)]=WindowLayer['prototype'][_0x518efc(0x885)],WindowLayer[_0x518efc(0xa41)][_0x518efc(0x885)]=function render(_0x2d5cf6){const _0x44b6a6=_0x518efc;this['isMaskingEnabled']()?VisuMZ['CoreEngine'][_0x44b6a6(0xa6a)][_0x44b6a6(0x30d)](this,_0x2d5cf6):this['renderNoMask'](_0x2d5cf6);},WindowLayer[_0x518efc(0xa41)][_0x518efc(0x9dc)]=function render(_0x39dad3){const _0x23c51a=_0x518efc;if(!this['visible'])return;const _0x573aea=new PIXI[(_0x23c51a(0x5f7))](),_0xaf3602=_0x39dad3['gl'],_0x4ea6ef=this[_0x23c51a(0x5e9)][_0x23c51a(0x9f8)]();_0x39dad3[_0x23c51a(0x30c)][_0x23c51a(0x72e)](),_0x573aea['transform']=this[_0x23c51a(0x7e8)],_0x39dad3[_0x23c51a(0x8e1)][_0x23c51a(0x7dd)](),_0xaf3602['enable'](_0xaf3602[_0x23c51a(0x77a)]);while(_0x4ea6ef['length']>0x0){const _0x4a93dd=_0x4ea6ef[_0x23c51a(0x91d)]();_0x4a93dd[_0x23c51a(0x189)]&&_0x4a93dd['visible']&&_0x4a93dd[_0x23c51a(0x523)]>0x0&&(_0xaf3602[_0x23c51a(0x851)](_0xaf3602[_0x23c51a(0x2ea)],0x0,~0x0),_0xaf3602[_0x23c51a(0x538)](_0xaf3602[_0x23c51a(0x2e9)],_0xaf3602[_0x23c51a(0x2e9)],_0xaf3602[_0x23c51a(0x2e9)]),_0x4a93dd[_0x23c51a(0x885)](_0x39dad3),_0x39dad3['batch'][_0x23c51a(0x7dd)](),_0x573aea['clear'](),_0xaf3602[_0x23c51a(0x851)](_0xaf3602['ALWAYS'],0x1,~0x0),_0xaf3602[_0x23c51a(0x538)](_0xaf3602[_0x23c51a(0x2cf)],_0xaf3602[_0x23c51a(0x2cf)],_0xaf3602[_0x23c51a(0x2cf)]),_0xaf3602[_0x23c51a(0x283)](_0xaf3602[_0x23c51a(0x359)],_0xaf3602[_0x23c51a(0x41a)]),_0x573aea[_0x23c51a(0x885)](_0x39dad3),_0x39dad3['batch'][_0x23c51a(0x7dd)](),_0xaf3602[_0x23c51a(0x283)](_0xaf3602[_0x23c51a(0x41a)],_0xaf3602[_0x23c51a(0x9c1)]));}_0xaf3602[_0x23c51a(0x3f8)](_0xaf3602[_0x23c51a(0x77a)]),_0xaf3602[_0x23c51a(0x85c)](_0xaf3602[_0x23c51a(0x3ce)]),_0xaf3602['clearStencil'](0x0),_0x39dad3['batch'][_0x23c51a(0x7dd)]();for(const _0x588b22 of this['children']){!_0x588b22[_0x23c51a(0x189)]&&_0x588b22['visible']&&_0x588b22['render'](_0x39dad3);}_0x39dad3[_0x23c51a(0x8e1)][_0x23c51a(0x7dd)]();},DataManager[_0x518efc(0x986)]=function(_0x6db66b){const _0xc99437=_0x518efc;return this['isItem'](_0x6db66b)&&_0x6db66b[_0xc99437(0x384)]===0x2;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x274)]=DataManager[_0x518efc(0x3d7)],DataManager[_0x518efc(0x3d7)]=function(){const _0x2a420f=_0x518efc;VisuMZ[_0x2a420f(0x1c9)][_0x2a420f(0x274)][_0x2a420f(0x30d)](this),this[_0x2a420f(0x9e3)](),this[_0x2a420f(0x379)]();},DataManager[_0x518efc(0x9e3)]=function(){const _0x853250=_0x518efc;if($gameTemp[_0x853250(0x7c5)]()){const _0x1c22a3=VisuMZ[_0x853250(0x1c9)][_0x853250(0x54d)]['QoL'][_0x853250(0x294)];if(_0x1c22a3>0x0)$gameTemp[_0x853250(0x4c0)](_0x1c22a3);}},DataManager[_0x518efc(0x379)]=function(){const _0x465093=_0x518efc,_0x13fb82=VisuMZ[_0x465093(0x1c9)][_0x465093(0x54d)][_0x465093(0x927)][_0x465093(0x5ad)]||0x0;if(_0x13fb82>0x0)$gameTemp['reserveCommonEvent'](_0x13fb82);},DataManager[_0x518efc(0x94d)]=function(_0x17029a){const _0x55f3a2=_0x518efc,_0x370d23=$dataTroops[_0x17029a];if(!_0x370d23)return'';let _0x4b8923='';_0x4b8923+=_0x370d23['name'];for(const _0x285e9b of _0x370d23[_0x55f3a2(0x66b)]){for(const _0x299fe9 of _0x285e9b[_0x55f3a2(0xa48)]){if('iDmWA'===_0x55f3a2(0x6cb))[0x6c,0x198]['includes'](_0x299fe9[_0x55f3a2(0x246)])&&(_0x4b8923+='\x0a',_0x4b8923+=_0x299fe9[_0x55f3a2(0x554)][0x0]);else return 7.5625*_0x4d4414*_0x19c111;}}return _0x4b8923;};(VisuMZ['CoreEngine'][_0x518efc(0x54d)]['QoL'][_0x518efc(0x7f9)]??!![])&&($scene=null,VisuMZ[_0x518efc(0x1c9)]['Scene_Base_create']=Scene_Base[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Base[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x5e8fc9=_0x518efc;VisuMZ[_0x5e8fc9(0x1c9)][_0x5e8fc9(0x935)]['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x57e)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x15b)],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x15b)]=function(){const _0x14f4c6=_0x518efc;VisuMZ[_0x14f4c6(0x1c9)][_0x14f4c6(0x57e)][_0x14f4c6(0x30d)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x518efc(0x551)]=Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x15b)],Scene_Battle['prototype'][_0x518efc(0x15b)]=function(){const _0x3fae60=_0x518efc;VisuMZ['CoreEngine']['Scene_Battle_createSpriteset'][_0x3fae60(0x30d)](this),$spriteset=this[_0x3fae60(0x529)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x4b4)]=Scene_Base[_0x518efc(0xa41)][_0x518efc(0x41b)],Scene_Base[_0x518efc(0xa41)]['terminate']=function(){const _0x5a453d=_0x518efc;VisuMZ[_0x5a453d(0x1c9)]['Scene_Base_terminate']['call'](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x61f)]=BattleManager[_0x518efc(0x4ba)],BattleManager[_0x518efc(0x4ba)]=function(_0x4521e4){const _0x1179c8=_0x518efc;VisuMZ[_0x1179c8(0x1c9)][_0x1179c8(0x61f)][_0x1179c8(0x30d)](this,_0x4521e4),$subject=this[_0x1179c8(0x39d)],$targets=this[_0x1179c8(0x8a5)],$target=this[_0x1179c8(0x623)]||this[_0x1179c8(0x8a5)][0x0];},$event=null,VisuMZ['CoreEngine'][_0x518efc(0x552)]=Game_Event[_0x518efc(0xa41)][_0x518efc(0x4d9)],Game_Event['prototype']['start']=function(){const _0x33d037=_0x518efc;VisuMZ['CoreEngine'][_0x33d037(0x552)][_0x33d037(0x30d)](this),$event=this;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa11)]=Scene_Map['prototype']['update'],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x4ba)]=function(){const _0x20fb84=_0x518efc;VisuMZ['CoreEngine'][_0x20fb84(0xa11)][_0x20fb84(0x30d)](this),$gameMap[_0x20fb84(0x41e)]();},Game_Map[_0x518efc(0xa41)][_0x518efc(0x41e)]=function(){const _0x2c9562=_0x518efc;!this[_0x2c9562(0x1ec)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x3f208d){const _0x13a229=_0x518efc;if($gameTemp)$gameTemp[_0x13a229(0x4c0)](_0x3f208d);},$onceParallel=function(_0x4f900,_0x209007){const _0x46bf05=_0x518efc;if(SceneManager[_0x46bf05(0x17e)]())$scene['playOnceParallelInterpreter'](_0x4f900,_0x209007);else{if(SceneManager[_0x46bf05(0x44e)]()){if(_0x46bf05(0x618)===_0x46bf05(0x8d9))this[_0x46bf05(0x82c)](),_0x43acb4[_0x46bf05(0x3d7)](),_0x48f2e2['goto'](_0x16ccac);else{if(Imported[_0x46bf05(0x6df)]){if(_0x46bf05(0x5c6)!==_0x46bf05(0x5c6)){var _0x878c27=_0x2c54b0(_0x3c24a6['$1']);_0x5e03e6+=_0x878c27;}else $scene['playOnceParallelInterpreter'](_0x4f900);}else{if($gameTemp&&$gameTemp[_0x46bf05(0x7c5)]()){if(_0x46bf05(0x884)===_0x46bf05(0x656)){if(_0x4e9935[_0x46bf05(0x75b)]())return;_0x1a1f13['ConvertParams'](_0x5660ac,_0x21f102);const _0x492286=_0x4e8dba[_0x46bf05(0x749)];for(const _0x3e182f of _0x492286){const _0x2bbfd4=_0x4b3bd3[_0x46bf05(0x333)](_0x3e182f);_0x42dd84[_0x46bf05(0x311)](_0x3e182f,!_0x2bbfd4);}}else alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}}}}else $gameTemp&&$gameTemp['isPlaytest']()&&alert(_0x46bf05(0x71d));}});;StorageManager[_0x518efc(0x513)]=function(_0x972b27){return new Promise((_0x39895f,_0x52db62)=>{const _0x3f4acf=_0x3995;if(_0x3f4acf(0x40a)!==_0x3f4acf(0x59b))try{if('FYOaw'!==_0x3f4acf(0x9a7)){const _0x275871=_0x4fa5b5[_0x3f4acf(0x1c9)]['Settings']['ScreenShake'];if(_0x275871&&_0x275871[_0x3f4acf(0x2a4)])return _0x275871[_0x3f4acf(0x2a4)][_0x3f4acf(0x30d)](this);this['x']+=_0x52ea77['round'](_0x16f08a[_0x3f4acf(0x298)]());}else{const _0x1985fa=pako['deflate'](_0x972b27,{'to':'string','level':0x1});if(_0x1985fa['length']>=0xc350){}_0x39895f(_0x1985fa);}}catch(_0x4d57e6){_0x52db62(_0x4d57e6);}else{_0x1cc920[_0x3f4acf(0x1c9)][_0x3f4acf(0x85f)][_0x3f4acf(0x30d)](this,_0x5ae660),_0x4ecb90['level']=0x1;const _0x220b24=_0x23071b['note'];if(_0x220b24['match'](/<LEVEL:[ ](\d+)>/i))_0xd3f5ae[_0x3f4acf(0x807)]=_0x815994(_0x1f8b19['$1']);if(_0x220b24[_0x3f4acf(0x3a8)](/<MAXHP:[ ](\d+)>/i))_0xb2e0d2['params'][0x0]=_0x4a507b(_0x97afd8['$1']);if(_0x220b24[_0x3f4acf(0x3a8)](/<MAXMP:[ ](\d+)>/i))_0xfe42f6[_0x3f4acf(0x46e)][0x1]=_0x3b025e(_0x33b214['$1']);if(_0x220b24['match'](/<ATK:[ ](\d+)>/i))_0x5451d5[_0x3f4acf(0x46e)][0x2]=_0x6097d2(_0x226016['$1']);if(_0x220b24['match'](/<DEF:[ ](\d+)>/i))_0x10d41a[_0x3f4acf(0x46e)][0x3]=_0x3f916c(_0x5b4111['$1']);if(_0x220b24[_0x3f4acf(0x3a8)](/<MAT:[ ](\d+)>/i))_0x54167f[_0x3f4acf(0x46e)][0x4]=_0x4e8632(_0x4d072b['$1']);if(_0x220b24['match'](/<MDF:[ ](\d+)>/i))_0x5e0ab9['params'][0x5]=_0x5d0281(_0x296cc5['$1']);if(_0x220b24[_0x3f4acf(0x3a8)](/<AGI:[ ](\d+)>/i))_0x2d4fa9['params'][0x6]=_0x1267e3(_0x2dab93['$1']);if(_0x220b24['match'](/<LUK:[ ](\d+)>/i))_0x46395d[_0x3f4acf(0x46e)][0x7]=_0x1eea38(_0x5384bb['$1']);if(_0x220b24[_0x3f4acf(0x3a8)](/<EXP:[ ](\d+)>/i))_0x4ffb62[_0x3f4acf(0x47a)]=_0x2fd747(_0xe56fc6['$1']);if(_0x220b24['match'](/<GOLD:[ ](\d+)>/i))_0x3bee3b[_0x3f4acf(0x512)]=_0x49320a(_0x343441['$1']);}});},TextManager[_0x518efc(0x89a)]=['','','',_0x518efc(0x4a9),'','','HELP','',_0x518efc(0x422),'TAB','','',_0x518efc(0x390),_0x518efc(0x943),_0x518efc(0x5c8),'',_0x518efc(0x570),_0x518efc(0x2c6),_0x518efc(0x433),_0x518efc(0x154),_0x518efc(0x745),'KANA',_0x518efc(0x26b),_0x518efc(0x970),_0x518efc(0x947),_0x518efc(0x62c),'',_0x518efc(0x5d9),_0x518efc(0x27c),_0x518efc(0x798),_0x518efc(0x37a),_0x518efc(0x7a5),_0x518efc(0x2c5),_0x518efc(0x968),'PGDN',_0x518efc(0x14d),'HOME','LEFT','UP',_0x518efc(0x43c),'DOWN',_0x518efc(0x612),_0x518efc(0x746),_0x518efc(0x38b),_0x518efc(0x1c1),_0x518efc(0x6a4),_0x518efc(0x4d6),'','0','1','2','3','4','5','6','7','8','9',_0x518efc(0x181),_0x518efc(0x1c2),'LESS_THAN',_0x518efc(0x786),_0x518efc(0x9b5),_0x518efc(0x4e3),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x518efc(0x372),'',_0x518efc(0x7e3),'','SLEEP','NUMPAD0',_0x518efc(0x1ce),_0x518efc(0x438),_0x518efc(0x9c7),_0x518efc(0x7ec),'NUMPAD5',_0x518efc(0x9ab),'NUMPAD7',_0x518efc(0x6e6),_0x518efc(0xa05),_0x518efc(0x424),_0x518efc(0x163),'SEPARATOR','SUBTRACT','DECIMAL',_0x518efc(0x626),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x518efc(0x243),_0x518efc(0x392),_0x518efc(0x775),'F13',_0x518efc(0x89c),_0x518efc(0x354),_0x518efc(0x2d8),_0x518efc(0x495),'F18','F19',_0x518efc(0x9aa),'F21','F22',_0x518efc(0x78c),'F24','','','','','','','','',_0x518efc(0x6b8),_0x518efc(0x90d),_0x518efc(0x897),_0x518efc(0x9c9),'WIN_OEM_FJ_TOUROKU','WIN_OEM_FJ_LOYA','WIN_OEM_FJ_ROYA','','','','','','','','','',_0x518efc(0x43d),_0x518efc(0x578),'DOUBLE_QUOTE','HASH',_0x518efc(0x663),_0x518efc(0x448),'AMPERSAND',_0x518efc(0x478),'OPEN_PAREN',_0x518efc(0x3e0),_0x518efc(0x3ba),_0x518efc(0x72f),_0x518efc(0x162),_0x518efc(0x75c),'OPEN_CURLY_BRACKET',_0x518efc(0x32b),_0x518efc(0x7d2),'','','','',_0x518efc(0xa56),'VOLUME_DOWN',_0x518efc(0x5e1),'','',_0x518efc(0x1c2),_0x518efc(0x786),_0x518efc(0x6f3),_0x518efc(0x845),_0x518efc(0x3ff),_0x518efc(0x229),_0x518efc(0x9a6),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x518efc(0x91c),_0x518efc(0x74e),'CLOSE_BRACKET',_0x518efc(0x1a8),'',_0x518efc(0x17f),_0x518efc(0x934),'',_0x518efc(0x75a),_0x518efc(0x8d2),'','WIN_ICO_CLEAR','','',_0x518efc(0x271),_0x518efc(0x66d),'WIN_OEM_PA1',_0x518efc(0x595),_0x518efc(0xa19),_0x518efc(0x397),_0x518efc(0x4bb),_0x518efc(0x802),_0x518efc(0x698),_0x518efc(0x542),_0x518efc(0x603),_0x518efc(0x182),_0x518efc(0x6da),_0x518efc(0x78d),_0x518efc(0x788),_0x518efc(0x292),'EREOF',_0x518efc(0x60f),_0x518efc(0x5f6),'',_0x518efc(0x664),_0x518efc(0x73a),''],TextManager[_0x518efc(0x7b7)]=VisuMZ[_0x518efc(0x1c9)]['Settings'][_0x518efc(0x8be)][_0x518efc(0x4e8)],TextManager['buttonAssistCancel']=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x8be)][_0x518efc(0x339)],TextManager[_0x518efc(0x799)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x8be)]['SwitchActorText'],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x528)]=TextManager['param'],TextManager['param']=function(_0x846355){const _0x329728=_0x518efc;return typeof _0x846355==='number'?VisuMZ[_0x329728(0x1c9)][_0x329728(0x528)]['call'](this,_0x846355):this['paramName'](_0x846355);},TextManager[_0x518efc(0x5a2)]=function(_0xa0d838){const _0x1ae8a8=_0x518efc;_0xa0d838=String(_0xa0d838||'')[_0x1ae8a8(0x1fa)]();const _0x1f7222=VisuMZ[_0x1ae8a8(0x1c9)][_0x1ae8a8(0x54d)]['Param'];if(_0xa0d838===_0x1ae8a8(0x167))return $dataSystem[_0x1ae8a8(0x1e3)]['params'][0x0];if(_0xa0d838===_0x1ae8a8(0x914))return $dataSystem[_0x1ae8a8(0x1e3)]['params'][0x1];if(_0xa0d838===_0x1ae8a8(0x97b))return $dataSystem['terms'][_0x1ae8a8(0x46e)][0x2];if(_0xa0d838===_0x1ae8a8(0x3f5))return $dataSystem[_0x1ae8a8(0x1e3)][_0x1ae8a8(0x46e)][0x3];if(_0xa0d838===_0x1ae8a8(0x7d5))return $dataSystem[_0x1ae8a8(0x1e3)][_0x1ae8a8(0x46e)][0x4];if(_0xa0d838===_0x1ae8a8(0x621))return $dataSystem[_0x1ae8a8(0x1e3)]['params'][0x5];if(_0xa0d838===_0x1ae8a8(0x909))return $dataSystem[_0x1ae8a8(0x1e3)][_0x1ae8a8(0x46e)][0x6];if(_0xa0d838===_0x1ae8a8(0x2cd))return $dataSystem[_0x1ae8a8(0x1e3)]['params'][0x7];if(_0xa0d838===_0x1ae8a8(0x344))return _0x1f7222[_0x1ae8a8(0x257)];if(_0xa0d838==='EVA')return _0x1f7222['XParamVocab1'];if(_0xa0d838==='CRI')return _0x1f7222[_0x1ae8a8(0x731)];if(_0xa0d838==='CEV')return _0x1f7222[_0x1ae8a8(0x2e1)];if(_0xa0d838===_0x1ae8a8(0x6f2))return _0x1f7222[_0x1ae8a8(0x1ba)];if(_0xa0d838==='MRF')return _0x1f7222[_0x1ae8a8(0x281)];if(_0xa0d838==='CNT')return _0x1f7222[_0x1ae8a8(0x322)];if(_0xa0d838===_0x1ae8a8(0x63c))return _0x1f7222[_0x1ae8a8(0x334)];if(_0xa0d838===_0x1ae8a8(0x8c6))return _0x1f7222[_0x1ae8a8(0x6db)];if(_0xa0d838===_0x1ae8a8(0x9a8))return _0x1f7222['XParamVocab9'];if(_0xa0d838==='TGR')return _0x1f7222['SParamVocab0'];if(_0xa0d838===_0x1ae8a8(0x5cd))return _0x1f7222[_0x1ae8a8(0x761)];if(_0xa0d838===_0x1ae8a8(0x335))return _0x1f7222['SParamVocab2'];if(_0xa0d838===_0x1ae8a8(0x7f3))return _0x1f7222[_0x1ae8a8(0x69e)];if(_0xa0d838===_0x1ae8a8(0x606))return _0x1f7222[_0x1ae8a8(0x704)];if(_0xa0d838===_0x1ae8a8(0x37f))return _0x1f7222[_0x1ae8a8(0x863)];if(_0xa0d838===_0x1ae8a8(0x999))return _0x1f7222[_0x1ae8a8(0x59c)];if(_0xa0d838===_0x1ae8a8(0x313))return _0x1f7222[_0x1ae8a8(0x727)];if(_0xa0d838===_0x1ae8a8(0x7e4))return _0x1f7222[_0x1ae8a8(0x86e)];if(_0xa0d838===_0x1ae8a8(0x5df))return _0x1f7222[_0x1ae8a8(0x601)];if(VisuMZ['CoreEngine'][_0x1ae8a8(0x507)][_0xa0d838])return VisuMZ[_0x1ae8a8(0x1c9)][_0x1ae8a8(0x507)][_0xa0d838];return'';},TextManager[_0x518efc(0x976)]=function(_0x223abd){const _0x5a8089=_0x518efc,_0x41c2d7=Input[_0x5a8089(0x22c)]();if(_0x41c2d7===_0x5a8089(0x642)){if('wurxF'==='wurxF')return this[_0x5a8089(0x881)](_0x223abd);else{if(_0x302ced[_0x5a8089(0xa49)]!==this[_0x5a8089(0xa49)]())return![];return _0x1949bb[_0x5a8089(0x1c9)][_0x5a8089(0x54d)]['Gold'][_0x5a8089(0x543)];}}else return this[_0x5a8089(0x4d8)](_0x41c2d7,_0x223abd);},TextManager[_0x518efc(0x881)]=function(_0x319827){const _0x4cc5a5=_0x518efc,_0x5b854e=VisuMZ[_0x4cc5a5(0x1c9)]['Settings']['ButtonAssist'][_0x4cc5a5(0x752)];if(!_0x5b854e){if(_0x319827===_0x4cc5a5(0xa39))_0x319827='escape';if(_0x319827===_0x4cc5a5(0x893))_0x319827=_0x4cc5a5(0x254);}let _0x56ceca=[];for(let _0x238d45 in Input['keyMapper']){_0x238d45=Number(_0x238d45);if(_0x238d45>=0x60&&_0x238d45<=0x69)continue;if([0x12,0x20][_0x4cc5a5(0x1f5)](_0x238d45))continue;_0x319827===Input[_0x4cc5a5(0x97e)][_0x238d45]&&_0x56ceca[_0x4cc5a5(0x609)](_0x238d45);}for(let _0x570023=0x0;_0x570023<_0x56ceca[_0x4cc5a5(0x18d)];_0x570023++){_0x56ceca[_0x570023]=TextManager[_0x4cc5a5(0x89a)][_0x56ceca[_0x570023]];}return this['makeInputButtonString'](_0x56ceca);},TextManager[_0x518efc(0x2b1)]=function(_0x1f18ef){const _0x5999ea=_0x518efc,_0x5d5fc0=VisuMZ[_0x5999ea(0x1c9)][_0x5999ea(0x54d)][_0x5999ea(0x8be)],_0xd463de=_0x5d5fc0[_0x5999ea(0x239)],_0x12b6c3=_0x1f18ef[_0x5999ea(0xa31)](),_0x1bfbc2=_0x5999ea(0x1d1)[_0x5999ea(0x67d)](_0x12b6c3);return _0x5d5fc0[_0x1bfbc2]?_0x5d5fc0[_0x1bfbc2]:_0xd463de['format'](_0x12b6c3);},TextManager[_0x518efc(0x933)]=function(_0x55faab,_0x4b9d9e){const _0x13c1ea=_0x518efc,_0x3e0c45=VisuMZ[_0x13c1ea(0x1c9)][_0x13c1ea(0x54d)][_0x13c1ea(0x8be)],_0x1eb325=_0x3e0c45[_0x13c1ea(0x747)],_0x592cb1=this[_0x13c1ea(0x976)](_0x55faab),_0x265d55=this['getInputButtonString'](_0x4b9d9e);return _0x1eb325[_0x13c1ea(0x67d)](_0x592cb1,_0x265d55);},TextManager[_0x518efc(0x4d8)]=function(_0x48d348,_0x371066){const _0x9235b7=_0x518efc,_0x46a896=_0x48d348[_0x9235b7(0x7c4)]()[_0x9235b7(0x445)](),_0x3f1b66=VisuMZ[_0x9235b7(0x1c9)][_0x9235b7(0x369)][_0x46a896];if(!_0x3f1b66)return this[_0x9235b7(0x391)](_0x48d348,_0x371066);return _0x3f1b66[_0x371066]||this[_0x9235b7(0x881)](_0x48d348,_0x371066);},TextManager[_0x518efc(0x391)]=function(_0x28fce4,_0x30e301){const _0x22c5cd=_0x518efc,_0x5aa04b=_0x28fce4[_0x22c5cd(0x7c4)]()[_0x22c5cd(0x445)]();for(const _0x428a09 in VisuMZ['CoreEngine'][_0x22c5cd(0x6e7)]){if(_0x5aa04b['includes'](_0x428a09)){if(_0x22c5cd(0x6ee)===_0x22c5cd(0xa09)){const _0x4ba0c8=_0x2bc3a7[_0x22c5cd(0x824)]()*_0x1eb7b8['tileWidth']();return(this['_x']-_0x4ba0c8)*_0x4f1176['zoomScale']();}else{const _0x3b4bda=VisuMZ[_0x22c5cd(0x1c9)][_0x22c5cd(0x6e7)][_0x428a09],_0x4f6ff9=VisuMZ[_0x22c5cd(0x1c9)][_0x22c5cd(0x369)][_0x3b4bda];return _0x4f6ff9[_0x30e301]||this[_0x22c5cd(0x881)](_0x30e301);}}}return this[_0x22c5cd(0x881)](_0x30e301);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x3dd)]=ColorManager[_0x518efc(0x794)],ColorManager[_0x518efc(0x794)]=function(){const _0x146ac0=_0x518efc;VisuMZ[_0x146ac0(0x1c9)][_0x146ac0(0x3dd)]['call'](this),this[_0x146ac0(0x81f)]=this[_0x146ac0(0x81f)]||{};},ColorManager[_0x518efc(0x629)]=function(_0x54ca42,_0x3e1bc4){const _0x219cd5=_0x518efc;_0x3e1bc4=String(_0x3e1bc4),this[_0x219cd5(0x81f)]=this['_colorCache']||{};if(_0x3e1bc4[_0x219cd5(0x3a8)](/#(.*)/i))this[_0x219cd5(0x81f)][_0x54ca42]='#%1'[_0x219cd5(0x67d)](String(RegExp['$1']));else{if('HhVkp'===_0x219cd5(0x582)){let _0x1c9a82=_0x313fed[_0x219cd5(0x1c9)][_0x219cd5(0x170)]['call'](this,_0x11a103);return _0x1c9a82['x']=_0x5145ff[_0x219cd5(0x38c)](_0x1c9a82['x']),_0x1c9a82['y']=_0x4ba371[_0x219cd5(0x38c)](_0x1c9a82['y']),_0x1c9a82[_0x219cd5(0x217)]=_0x378dc5[_0x219cd5(0x38c)](_0x1c9a82['width']),_0x1c9a82[_0x219cd5(0x622)]=_0x2329ba['round'](_0x1c9a82['height']),_0x1c9a82;}else this[_0x219cd5(0x81f)][_0x54ca42]=this[_0x219cd5(0x6b4)](Number(_0x3e1bc4));}return this[_0x219cd5(0x81f)][_0x54ca42];},ColorManager[_0x518efc(0x716)]=function(_0x3a1091){const _0x179aed=_0x518efc;_0x3a1091=String(_0x3a1091);if(_0x3a1091[_0x179aed(0x3a8)](/#(.*)/i))return'#%1'[_0x179aed(0x67d)](String(RegExp['$1']));else{if(_0x179aed(0x8c5)===_0x179aed(0x43f))_0x377428[_0x179aed(0x1c9)][_0x179aed(0x35a)][_0x179aed(0x30d)](this,_0x488cf3,_0x426cf5),this[_0x179aed(0x889)]();else return this['textColor'](Number(_0x3a1091));}},ColorManager[_0x518efc(0x9e8)]=function(){const _0x442f18=_0x518efc;this[_0x442f18(0x81f)]={};},ColorManager[_0x518efc(0x39a)]=function(){const _0x2c09e5=_0x518efc,_0x3d0267=_0x2c09e5(0x357);this[_0x2c09e5(0x81f)]=this[_0x2c09e5(0x81f)]||{};if(this['_colorCache'][_0x3d0267])return this[_0x2c09e5(0x81f)][_0x3d0267];const _0x36de65=VisuMZ['CoreEngine'][_0x2c09e5(0x54d)][_0x2c09e5(0x3b3)][_0x2c09e5(0x79d)];return this[_0x2c09e5(0x629)](_0x3d0267,_0x36de65);},ColorManager[_0x518efc(0x242)]=function(){const _0x5b4785=_0x518efc,_0x26a91='_stored_systemColor';this[_0x5b4785(0x81f)]=this['_colorCache']||{};if(this[_0x5b4785(0x81f)][_0x26a91])return this[_0x5b4785(0x81f)][_0x26a91];const _0x263600=VisuMZ[_0x5b4785(0x1c9)]['Settings'][_0x5b4785(0x3b3)][_0x5b4785(0x7af)];return this[_0x5b4785(0x629)](_0x26a91,_0x263600);},ColorManager[_0x518efc(0x209)]=function(){const _0x5ded67=_0x518efc,_0x2a6e06=_0x5ded67(0x386);this[_0x5ded67(0x81f)]=this[_0x5ded67(0x81f)]||{};if(this[_0x5ded67(0x81f)][_0x2a6e06])return this[_0x5ded67(0x81f)][_0x2a6e06];const _0x212c10=VisuMZ[_0x5ded67(0x1c9)]['Settings'][_0x5ded67(0x3b3)]['ColorCrisis'];return this[_0x5ded67(0x629)](_0x2a6e06,_0x212c10);},ColorManager[_0x518efc(0x400)]=function(){const _0x53d7e5=_0x518efc,_0xc93c0e=_0x53d7e5(0x7b3);this[_0x53d7e5(0x81f)]=this['_colorCache']||{};if(this[_0x53d7e5(0x81f)][_0xc93c0e])return this[_0x53d7e5(0x81f)][_0xc93c0e];const _0x1244de=VisuMZ['CoreEngine'][_0x53d7e5(0x54d)][_0x53d7e5(0x3b3)]['ColorDeath'];return this['getColorDataFromPluginParameters'](_0xc93c0e,_0x1244de);},ColorManager['gaugeBackColor']=function(){const _0x129e4e=_0x518efc,_0x41981a=_0x129e4e(0x6cc);this[_0x129e4e(0x81f)]=this['_colorCache']||{};if(this['_colorCache'][_0x41981a])return this['_colorCache'][_0x41981a];const _0x13e173=VisuMZ[_0x129e4e(0x1c9)][_0x129e4e(0x54d)][_0x129e4e(0x3b3)][_0x129e4e(0x9d3)];return this['getColorDataFromPluginParameters'](_0x41981a,_0x13e173);},ColorManager[_0x518efc(0x5f8)]=function(){const _0x3aeb23=_0x518efc,_0x5774d4=_0x3aeb23(0x764);this[_0x3aeb23(0x81f)]=this[_0x3aeb23(0x81f)]||{};if(this['_colorCache'][_0x5774d4])return this[_0x3aeb23(0x81f)][_0x5774d4];const _0x1eacb5=VisuMZ[_0x3aeb23(0x1c9)][_0x3aeb23(0x54d)][_0x3aeb23(0x3b3)][_0x3aeb23(0x411)];return this[_0x3aeb23(0x629)](_0x5774d4,_0x1eacb5);},ColorManager[_0x518efc(0x617)]=function(){const _0x35d24c=_0x518efc,_0x2e2c24=_0x35d24c(0x4a2);this[_0x35d24c(0x81f)]=this['_colorCache']||{};if(this[_0x35d24c(0x81f)][_0x2e2c24])return this[_0x35d24c(0x81f)][_0x2e2c24];const _0x11c73e=VisuMZ['CoreEngine'][_0x35d24c(0x54d)][_0x35d24c(0x3b3)][_0x35d24c(0x50a)];return this[_0x35d24c(0x629)](_0x2e2c24,_0x11c73e);},ColorManager[_0x518efc(0x2fc)]=function(){const _0x3810d2=_0x518efc,_0x5ac39e='_stored_mpGaugeColor1';this['_colorCache']=this[_0x3810d2(0x81f)]||{};if(this[_0x3810d2(0x81f)][_0x5ac39e])return this[_0x3810d2(0x81f)][_0x5ac39e];const _0xe5784e=VisuMZ['CoreEngine'][_0x3810d2(0x54d)][_0x3810d2(0x3b3)][_0x3810d2(0x47d)];return this['getColorDataFromPluginParameters'](_0x5ac39e,_0xe5784e);},ColorManager['mpGaugeColor2']=function(){const _0x5783da=_0x518efc,_0x3f231e=_0x5783da(0x8c4);this[_0x5783da(0x81f)]=this[_0x5783da(0x81f)]||{};if(this[_0x5783da(0x81f)][_0x3f231e])return this[_0x5783da(0x81f)][_0x3f231e];const _0x20dd39=VisuMZ['CoreEngine'][_0x5783da(0x54d)][_0x5783da(0x3b3)]['ColorMPGauge2'];return this[_0x5783da(0x629)](_0x3f231e,_0x20dd39);},ColorManager[_0x518efc(0x200)]=function(){const _0x560366=_0x518efc,_0x224a38=_0x560366(0x92f);this[_0x560366(0x81f)]=this['_colorCache']||{};if(this[_0x560366(0x81f)][_0x224a38])return this['_colorCache'][_0x224a38];const _0x4b049b=VisuMZ[_0x560366(0x1c9)][_0x560366(0x54d)][_0x560366(0x3b3)][_0x560366(0x81b)];return this[_0x560366(0x629)](_0x224a38,_0x4b049b);},ColorManager[_0x518efc(0x2fa)]=function(){const _0x15d2a2=_0x518efc,_0x2c7235=_0x15d2a2(0x399);this[_0x15d2a2(0x81f)]=this[_0x15d2a2(0x81f)]||{};if(this['_colorCache'][_0x2c7235])return this['_colorCache'][_0x2c7235];const _0x344758=VisuMZ[_0x15d2a2(0x1c9)][_0x15d2a2(0x54d)][_0x15d2a2(0x3b3)]['ColorPowerUp'];return this[_0x15d2a2(0x629)](_0x2c7235,_0x344758);},ColorManager[_0x518efc(0x324)]=function(){const _0x2b93bf=_0x518efc,_0xd5c16d=_0x2b93bf(0x95b);this[_0x2b93bf(0x81f)]=this[_0x2b93bf(0x81f)]||{};if(this[_0x2b93bf(0x81f)][_0xd5c16d])return this[_0x2b93bf(0x81f)][_0xd5c16d];const _0x5e5a99=VisuMZ[_0x2b93bf(0x1c9)][_0x2b93bf(0x54d)]['Color'][_0x2b93bf(0x724)];return this[_0x2b93bf(0x629)](_0xd5c16d,_0x5e5a99);},ColorManager[_0x518efc(0x3aa)]=function(){const _0x1d3cae=_0x518efc,_0x2b8708=_0x1d3cae(0x896);this[_0x1d3cae(0x81f)]=this['_colorCache']||{};if(this[_0x1d3cae(0x81f)][_0x2b8708])return this[_0x1d3cae(0x81f)][_0x2b8708];const _0x5bb10b=VisuMZ[_0x1d3cae(0x1c9)]['Settings'][_0x1d3cae(0x3b3)]['ColorCTGauge1'];return this[_0x1d3cae(0x629)](_0x2b8708,_0x5bb10b);},ColorManager['ctGaugeColor2']=function(){const _0x4b3e8c=_0x518efc,_0x1cb30d=_0x4b3e8c(0x5f3);this[_0x4b3e8c(0x81f)]=this['_colorCache']||{};if(this[_0x4b3e8c(0x81f)][_0x1cb30d])return this['_colorCache'][_0x1cb30d];const _0x2de1d6=VisuMZ[_0x4b3e8c(0x1c9)]['Settings']['Color']['ColorCTGauge2'];return this[_0x4b3e8c(0x629)](_0x1cb30d,_0x2de1d6);},ColorManager[_0x518efc(0x545)]=function(){const _0x29cf17=_0x518efc,_0x5b9f9f='_stored_tpGaugeColor1';this['_colorCache']=this[_0x29cf17(0x81f)]||{};if(this[_0x29cf17(0x81f)][_0x5b9f9f])return this['_colorCache'][_0x5b9f9f];const _0x12564c=VisuMZ[_0x29cf17(0x1c9)][_0x29cf17(0x54d)][_0x29cf17(0x3b3)][_0x29cf17(0x928)];return this[_0x29cf17(0x629)](_0x5b9f9f,_0x12564c);},ColorManager[_0x518efc(0x8cf)]=function(){const _0x1cb858=_0x518efc,_0x4970d9=_0x1cb858(0x2ed);this[_0x1cb858(0x81f)]=this[_0x1cb858(0x81f)]||{};if(this['_colorCache'][_0x4970d9])return this[_0x1cb858(0x81f)][_0x4970d9];const _0x2a06d0=VisuMZ[_0x1cb858(0x1c9)][_0x1cb858(0x54d)][_0x1cb858(0x3b3)][_0x1cb858(0x3af)];return this[_0x1cb858(0x629)](_0x4970d9,_0x2a06d0);},ColorManager[_0x518efc(0x559)]=function(){const _0x489af9=_0x518efc,_0xe33ba3=_0x489af9(0x4bc);this[_0x489af9(0x81f)]=this[_0x489af9(0x81f)]||{};if(this['_colorCache'][_0xe33ba3])return this['_colorCache'][_0xe33ba3];const _0x4ea038=VisuMZ[_0x489af9(0x1c9)][_0x489af9(0x54d)][_0x489af9(0x3b3)][_0x489af9(0x1cf)];return this[_0x489af9(0x629)](_0xe33ba3,_0x4ea038);},ColorManager[_0x518efc(0x93a)]=function(){const _0xd761fc=_0x518efc,_0x43f7e8=_0xd761fc(0x9b4);this[_0xd761fc(0x81f)]=this[_0xd761fc(0x81f)]||{};if(this[_0xd761fc(0x81f)][_0x43f7e8])return this[_0xd761fc(0x81f)][_0x43f7e8];const _0x5a52f1=VisuMZ[_0xd761fc(0x1c9)][_0xd761fc(0x54d)][_0xd761fc(0x3b3)][_0xd761fc(0x1cf)];return this[_0xd761fc(0x629)](_0x43f7e8,_0x5a52f1);},ColorManager['expGaugeColor1']=function(){const _0x3469cf=_0x518efc,_0x3bd02e=_0x3469cf(0x9ac);this[_0x3469cf(0x81f)]=this[_0x3469cf(0x81f)]||{};if(this[_0x3469cf(0x81f)][_0x3bd02e])return this[_0x3469cf(0x81f)][_0x3bd02e];const _0x2c7aaa=VisuMZ[_0x3469cf(0x1c9)]['Settings'][_0x3469cf(0x3b3)][_0x3469cf(0x97d)];return this[_0x3469cf(0x629)](_0x3bd02e,_0x2c7aaa);},ColorManager[_0x518efc(0x860)]=function(){const _0x216182=_0x518efc,_0x5867f6='_stored_expGaugeColor2';this[_0x216182(0x81f)]=this[_0x216182(0x81f)]||{};if(this['_colorCache'][_0x5867f6])return this['_colorCache'][_0x5867f6];const _0x47c579=VisuMZ['CoreEngine'][_0x216182(0x54d)][_0x216182(0x3b3)][_0x216182(0x9e2)];return this[_0x216182(0x629)](_0x5867f6,_0x47c579);},ColorManager['maxLvGaugeColor1']=function(){const _0x760432=_0x518efc,_0x2ff8d8=_0x760432(0x9fa);this[_0x760432(0x81f)]=this[_0x760432(0x81f)]||{};if(this[_0x760432(0x81f)][_0x2ff8d8])return this['_colorCache'][_0x2ff8d8];const _0x50eff1=VisuMZ[_0x760432(0x1c9)][_0x760432(0x54d)][_0x760432(0x3b3)][_0x760432(0x40b)];return this[_0x760432(0x629)](_0x2ff8d8,_0x50eff1);},ColorManager[_0x518efc(0x316)]=function(){const _0x14ae7a=_0x518efc,_0x5971bb=_0x14ae7a(0x756);this[_0x14ae7a(0x81f)]=this[_0x14ae7a(0x81f)]||{};if(this['_colorCache'][_0x5971bb])return this[_0x14ae7a(0x81f)][_0x5971bb];const _0x195be1=VisuMZ[_0x14ae7a(0x1c9)][_0x14ae7a(0x54d)][_0x14ae7a(0x3b3)][_0x14ae7a(0x141)];return this[_0x14ae7a(0x629)](_0x5971bb,_0x195be1);},ColorManager[_0x518efc(0x258)]=function(_0x5be695){const _0xd822cf=_0x518efc;return VisuMZ['CoreEngine'][_0xd822cf(0x54d)][_0xd822cf(0x3b3)][_0xd822cf(0x3a0)]['call'](this,_0x5be695);},ColorManager[_0x518efc(0x1af)]=function(_0x611110){const _0x48755f=_0x518efc;return VisuMZ[_0x48755f(0x1c9)][_0x48755f(0x54d)]['Color']['ActorMPColor']['call'](this,_0x611110);},ColorManager['tpColor']=function(_0x1d6d7e){const _0x143a06=_0x518efc;return VisuMZ[_0x143a06(0x1c9)][_0x143a06(0x54d)]['Color'][_0x143a06(0x89f)][_0x143a06(0x30d)](this,_0x1d6d7e);},ColorManager[_0x518efc(0xa10)]=function(_0x260412){const _0x4aa40a=_0x518efc;return VisuMZ[_0x4aa40a(0x1c9)][_0x4aa40a(0x54d)][_0x4aa40a(0x3b3)][_0x4aa40a(0x1bc)][_0x4aa40a(0x30d)](this,_0x260412);},ColorManager[_0x518efc(0x2be)]=function(_0x35ae1a){const _0x3693b4=_0x518efc;return VisuMZ['CoreEngine']['Settings'][_0x3693b4(0x3b3)][_0x3693b4(0x4fa)][_0x3693b4(0x30d)](this,_0x35ae1a);},ColorManager[_0x518efc(0x455)]=function(){const _0x48d77e=_0x518efc;return VisuMZ[_0x48d77e(0x1c9)][_0x48d77e(0x54d)]['Color']['OutlineColor'];},ColorManager[_0x518efc(0x8aa)]=function(){const _0x630f6a=_0x518efc;return VisuMZ[_0x630f6a(0x1c9)][_0x630f6a(0x54d)]['Color']['OutlineColorDmg']||_0x630f6a(0x9db);},ColorManager[_0x518efc(0xa26)]=function(){const _0x480bfa=_0x518efc;return VisuMZ[_0x480bfa(0x1c9)]['Settings'][_0x480bfa(0x3b3)][_0x480bfa(0x694)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0x5b6eb0=_0x518efc;return VisuMZ[_0x5b6eb0(0x1c9)][_0x5b6eb0(0x54d)]['Color'][_0x5b6eb0(0x6d8)];},ColorManager[_0x518efc(0xa45)]=function(){const _0x3e2c9d=_0x518efc;return VisuMZ[_0x3e2c9d(0x1c9)][_0x3e2c9d(0x54d)][_0x3e2c9d(0x3b3)][_0x3e2c9d(0x20c)];},ColorManager[_0x518efc(0x92c)]=function(){const _0x14bae1=_0x518efc;return VisuMZ[_0x14bae1(0x1c9)][_0x14bae1(0x54d)][_0x14bae1(0x3b3)][_0x14bae1(0x50f)];},ColorManager[_0x518efc(0x3f2)]=function(){const _0x127e36=_0x518efc;return VisuMZ[_0x127e36(0x1c9)][_0x127e36(0x54d)][_0x127e36(0x3b3)]['ItemBackColor2'];},SceneManager[_0x518efc(0x17c)]=[],SceneManager[_0x518efc(0x44e)]=function(){const _0x5c07e4=_0x518efc;return this['_scene']&&this[_0x5c07e4(0x18c)][_0x5c07e4(0x60a)]===Scene_Battle;},SceneManager[_0x518efc(0x17e)]=function(){const _0x38e66c=_0x518efc;return this['_scene']&&this[_0x38e66c(0x18c)]['constructor']===Scene_Map;},SceneManager[_0x518efc(0xa13)]=function(){const _0x386fe8=_0x518efc;return this[_0x386fe8(0x18c)]&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x78e)]=SceneManager[_0x518efc(0x55e)],SceneManager[_0x518efc(0x55e)]=function(){const _0x2cade6=_0x518efc;VisuMZ[_0x2cade6(0x1c9)][_0x2cade6(0x78e)][_0x2cade6(0x30d)](this),this[_0x2cade6(0x25a)]();},VisuMZ['CoreEngine'][_0x518efc(0x1f6)]=SceneManager['onKeyDown'],SceneManager['onKeyDown']=function(_0x1e5e15){const _0x2f2e87=_0x518efc;if($gameTemp)this[_0x2f2e87(0x216)](_0x1e5e15);VisuMZ[_0x2f2e87(0x1c9)][_0x2f2e87(0x1f6)]['call'](this,_0x1e5e15);},SceneManager[_0x518efc(0x216)]=function(_0x35c164){const _0x4da45f=_0x518efc;if(!_0x35c164['ctrlKey']&&!_0x35c164['altKey'])switch(_0x35c164[_0x4da45f(0x8cc)]){case 0x52:this[_0x4da45f(0x4e0)]();break;case 0x54:this[_0x4da45f(0x533)]();break;case 0x75:this[_0x4da45f(0x62f)]();break;case 0x76:if(Input['isPressed'](_0x4da45f(0x91d))||Input[_0x4da45f(0x177)](_0x4da45f(0x583)))return;this[_0x4da45f(0x2b2)]();break;}},SceneManager[_0x518efc(0x62f)]=function(){const _0x1d56cf=_0x518efc;if($gameTemp[_0x1d56cf(0x7c5)]()&&VisuMZ[_0x1d56cf(0x1c9)][_0x1d56cf(0x54d)]['QoL'][_0x1d56cf(0x65a)]){if(_0x1d56cf(0x83b)!==_0x1d56cf(0x8b4)){ConfigManager[_0x1d56cf(0x7c1)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x1d56cf(0x2ef)]=0x0,ConfigManager[_0x1d56cf(0x367)]=0x0,ConfigManager[_0x1d56cf(0x7c1)]=0x0):(ConfigManager[_0x1d56cf(0x363)]=0x64,ConfigManager[_0x1d56cf(0x2ef)]=0x64,ConfigManager[_0x1d56cf(0x367)]=0x64,ConfigManager[_0x1d56cf(0x7c1)]=0x64);ConfigManager[_0x1d56cf(0x911)]();if(this[_0x1d56cf(0x18c)]['constructor']===Scene_Options){if(this[_0x1d56cf(0x18c)][_0x1d56cf(0x223)])this[_0x1d56cf(0x18c)][_0x1d56cf(0x223)][_0x1d56cf(0x5b5)]();if(this['_scene'][_0x1d56cf(0x7fc)])this[_0x1d56cf(0x18c)]['_listWindow']['refresh']();}}else{const _0x570494=_0x24916d(_0x5853c4['$1']);_0x570494!==_0xdfd22d[_0x4adb19][_0x1d56cf(0x326)]&&(_0x1ef1c9(_0x1d56cf(0xa1f)[_0x1d56cf(0x67d)](_0x280c65,_0x570494)),_0x49cc6f[_0x1d56cf(0x80f)]());}}},SceneManager[_0x518efc(0x2b2)]=function(){const _0x10e43f=_0x518efc;$gameTemp[_0x10e43f(0x7c5)]()&&VisuMZ['CoreEngine'][_0x10e43f(0x54d)][_0x10e43f(0x927)]['F7key']&&($gameTemp[_0x10e43f(0x419)]=!$gameTemp[_0x10e43f(0x419)]);},SceneManager[_0x518efc(0x4e0)]=function(){const _0x1af5b3=_0x518efc;if(!VisuMZ[_0x1af5b3(0x1c9)][_0x1af5b3(0x54d)][_0x1af5b3(0x927)][_0x1af5b3(0x9b7)])return;if(!$gameTemp[_0x1af5b3(0x7c5)]())return;if(!SceneManager[_0x1af5b3(0x44e)]())return;if(!Input[_0x1af5b3(0x177)](_0x1af5b3(0x91d)))return;for(const _0x24f401 of $gameParty[_0x1af5b3(0xa6e)]()){if(!_0x24f401)continue;_0x24f401['recoverAll']();}},SceneManager[_0x518efc(0x533)]=function(){const _0x490526=_0x518efc;if(!VisuMZ['CoreEngine']['Settings'][_0x490526(0x927)][_0x490526(0x958)])return;if(!$gameTemp[_0x490526(0x7c5)]())return;if(!SceneManager[_0x490526(0x44e)]())return;if(!Input['isPressed'](_0x490526(0x91d)))return;for(const _0x123c74 of $gameParty['members']()){if(!_0x123c74)continue;_0x123c74['gainSilentTp'](_0x123c74['maxTp']());}},SceneManager[_0x518efc(0x25a)]=function(){const _0x5a938e=_0x518efc;this['_sideButtonLayout']=![],this['_hideButtons']=!VisuMZ[_0x5a938e(0x1c9)]['Settings']['UI'][_0x5a938e(0x805)];},SceneManager[_0x518efc(0x922)]=function(_0x2196ef){const _0x1efba0=_0x518efc;if(VisuMZ[_0x1efba0(0x1c9)][_0x1efba0(0x54d)]['UI'][_0x1efba0(0x7ef)]){if(_0x1efba0(0x6bf)==='XHspF')return this[_0x1efba0(0x350)]();else this[_0x1efba0(0x847)]=_0x2196ef;}},SceneManager[_0x518efc(0x3c8)]=function(){const _0x61bb09=_0x518efc;return this[_0x61bb09(0x847)];},SceneManager[_0x518efc(0x7ad)]=function(){const _0x37e0bc=_0x518efc;return this[_0x37e0bc(0x8d5)];},SceneManager[_0x518efc(0x3f6)]=function(){const _0x1a77ad=_0x518efc;return this['areButtonsHidden']()||this[_0x1a77ad(0x3c8)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x31d)]=SceneManager[_0x518efc(0x774)],SceneManager[_0x518efc(0x774)]=function(){const _0x384530=_0x518efc;if(VisuMZ[_0x384530(0x1c9)][_0x384530(0x54d)][_0x384530(0x927)][_0x384530(0x1ca)])return VisuMZ['CoreEngine'][_0x384530(0x31d)]['call'](this);else{if('dXNJz'===_0x384530(0xa54))return!![];else this[_0x384530(0x7da)]=0x2;}},SceneManager[_0x518efc(0x6d9)]=function(_0x268440){const _0x96af84=_0x518efc;if(_0x268440 instanceof Error)'bjvQP'==='JyBdO'?(_0x22cff3['CoreEngine'][_0x96af84(0x2b4)]['call'](this),this[_0x96af84(0x79c)]()):this[_0x96af84(0x8d4)](_0x268440);else _0x268440 instanceof Array&&_0x268440[0x0]==='LoadError'?this['catchLoadError'](_0x268440):_0x96af84(0x856)!=='gMEej'?this[_0x96af84(0x2d1)](_0x268440):_0x1c878b['startAnimation']&&_0x10a3ef['startAnimation']();this['stop']();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x784)]=BattleManager[_0x518efc(0x2a7)],BattleManager['processEscape']=function(){const _0x560b1c=_0x518efc;return VisuMZ['CoreEngine'][_0x560b1c(0x54d)][_0x560b1c(0x927)][_0x560b1c(0xa63)]?this[_0x560b1c(0x350)]():VisuMZ[_0x560b1c(0x1c9)]['BattleManager_processEscape'][_0x560b1c(0x30d)](this);},BattleManager[_0x518efc(0x350)]=function(){const _0x1f3755=_0x518efc;return $gameParty['performEscape'](),SoundManager['playEscape'](),this[_0x1f3755(0x83a)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x518efc(0x321)]=function(){const _0x87fc9=_0x518efc;return $gameSystem[_0x87fc9(0x7b5)]()===0x1;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x8ac)]=Game_Temp[_0x518efc(0xa41)][_0x518efc(0x55e)],Game_Temp[_0x518efc(0xa41)][_0x518efc(0x55e)]=function(){const _0x1356dc=_0x518efc;VisuMZ[_0x1356dc(0x1c9)]['Game_Temp_initialize'][_0x1356dc(0x30d)](this),this['forceOutOfPlaytest'](),this[_0x1356dc(0x682)](),this[_0x1356dc(0x320)]();},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x950)]=function(){const _0x1336b1=_0x518efc;VisuMZ[_0x1336b1(0x1c9)][_0x1336b1(0x54d)][_0x1336b1(0x927)][_0x1336b1(0x86b)]&&(this[_0x1336b1(0x479)]=![]);},Game_Temp[_0x518efc(0xa41)]['setLastPluginCommandInterpreter']=function(_0x26eea1){const _0x1e2075=_0x518efc;this[_0x1e2075(0x71b)]=_0x26eea1;},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x3b1)]=function(){const _0x20803e=_0x518efc;return this[_0x20803e(0x71b)];},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x1aa)]=function(){const _0x1c15e5=_0x518efc;this[_0x1c15e5(0x5ee)]=undefined,this['_forcedBattleSys']=undefined,this['_forcedBattleGridSystem']=undefined;},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x7a7)]=function(_0x100961){const _0x5877a9=_0x518efc;$gameMap&&$dataMap&&$dataMap[_0x5877a9(0x699)]&&this[_0x5877a9(0x8a3)]($dataMap[_0x5877a9(0x699)]);const _0x5498dc=$dataTroops[_0x100961];if(_0x5498dc){if('wzelU'!==_0x5877a9(0x7ed)){const _0x96b052=_0x2b721c[_0x5877a9(0x221)];let _0x6e2b84=_0x4ef7a6[_0x5877a9(0x9c3)];if(['','Untitled'][_0x5877a9(0x1f5)](_0x6e2b84))_0x6e2b84=_0x436d35[_0x5877a9(0x610)][_0x5877a9(0x30d)](this);const _0x34da07=_0x5be9e8[_0x5877a9(0x8a4)][_0x5877a9(0x30d)](this),_0x390062=_0x4350ff[_0x5877a9(0x49a)][_0x5877a9(0x30d)](this);this[_0x5877a9(0x1a5)](_0x6e2b84,_0x96b052,_0x34da07,_0x390062),this[_0x5877a9(0x7d4)](_0x96b052,_0x474c75['CallHandlerJS'][_0x5877a9(0x670)](this,_0x390062));}else{let _0xaca540=DataManager[_0x5877a9(0x94d)](_0x5498dc['id']);this[_0x5877a9(0x8a3)](_0xaca540);}}},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x8a3)]=function(_0x3f2fc0){const _0x4a888b=_0x518efc;if(!_0x3f2fc0)return;if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))_0x4a888b(0x35d)!==_0x4a888b(0x2e8)?this['_forcedTroopView']='FV':this[_0x4a888b(0x474)]=this['centerCameraCheckData']()[_0x4a888b(0x6b9)];else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2a6234=String(RegExp['$1']);if(_0x2a6234[_0x4a888b(0x3a8)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0x2a6234[_0x4a888b(0x3a8)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x4a888b(0x5ee)]='SV');}}}if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:DTB)>/i))_0x4a888b(0x998)===_0x4a888b(0x998)?this[_0x4a888b(0x7da)]=0x0:(this[_0x4a888b(0x6d0)]['x']=this[_0x4a888b(0x7e6)]['x'],this[_0x4a888b(0x6d0)]['y']=this[_0x4a888b(0x7e6)]['y']);else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:TPB|ATB)[ ]ACTIVE>/i))_0x4a888b(0x8f2)===_0x4a888b(0x8f2)?this[_0x4a888b(0x7da)]=0x1:this['_cancelButton']['y']=0x0;else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:TPB|ATB)[ ]WAIT>/i))_0x4a888b(0x90b)==='MhZdE'?this['isFullDocumentTitle']()?this['makeDocumentTitle']():_0x23cec5[_0x4a888b(0x1c9)][_0x4a888b(0x876)][_0x4a888b(0x30d)](this):this[_0x4a888b(0x7da)]=0x2;else{if(_0x3f2fc0['match'](/<(?:TPB|ATB)>/i))this[_0x4a888b(0x7da)]=0x2;else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x4a888b(0x7da)]=_0x4a888b(0x70e));else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:STB)>/i)){if(_0x4a888b(0x690)!==_0x4a888b(0x690)){const _0x39fd2c=_0x2342e0[_0x4a888b(0x45f)]()<=_0xf28af6;_0x120101['setValue'](_0x1355fc,_0x39fd2c);}else Imported['VisuMZ_2_BattleSystemSTB']&&(this['_forcedBattleSys']=_0x4a888b(0x484));}else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:BTB)>/i))Imported[_0x4a888b(0x541)]&&(this[_0x4a888b(0x7da)]='BTB');else{if(_0x3f2fc0['match'](/<(?:FTB)>/i))Imported[_0x4a888b(0x301)]&&('MMrvK'!=='MMrvK'?(_0x13eedc[_0x4a888b(0x1c9)][_0x4a888b(0xa11)][_0x4a888b(0x30d)](this),_0xbb7655[_0x4a888b(0x41e)]()):this[_0x4a888b(0x7da)]=_0x4a888b(0x2d5));else{if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:OTB)>/i)){if(_0x4a888b(0x961)==='CatXz')Imported[_0x4a888b(0x40c)]&&(this[_0x4a888b(0x7da)]=_0x4a888b(0x657));else{const _0x4fcb91=_0x367371[_0x4a888b(0x220)],_0x78630=_0xd46020[_0x4a888b(0x493)]||'',_0x54cea3=_0x49a40d[_0x4a888b(0x326)]||'',_0x59d0ae=_0x4267f4[_0x4a888b(0x1c9)][_0x4a888b(0x54d)][_0x4a888b(0x68b)][_0x4a888b(0x54c)][_0x4a888b(0x679)],_0x35394e=_0x59d0ae[_0x4a888b(0x67d)](_0x4fcb91,_0x78630,_0x54cea3);_0x50ae02[_0x4a888b(0x1df)]=_0x35394e;}}else{if(_0x3f2fc0['match'](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&(this[_0x4a888b(0x7da)]='ETB');else{if(_0x3f2fc0['match'](/<(?:PTB)>/i)){if('OLOPp'!==_0x4a888b(0x483))return 0x0;else Imported[_0x4a888b(0x270)]&&(this['_forcedBattleSys']=_0x4a888b(0x5e4));}else{if(_0x3f2fc0['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xea7cbc=String(RegExp['$1']);if(_0xea7cbc[_0x4a888b(0x3a8)](/DTB/i)){if(_0x4a888b(0x4c3)!==_0x4a888b(0x6ad))this[_0x4a888b(0x7da)]=0x0;else{if(_0x481fb3[_0x4a888b(0x1f5)](_0x127eeb[_0x4a888b(0x7c4)]()))return!![];}}else{if(_0xea7cbc['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x4a888b(0x7da)]=0x1;else{if(_0xea7cbc[_0x4a888b(0x3a8)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x4a888b(0x7da)]=0x2;else{if(_0xea7cbc[_0x4a888b(0x3a8)](/CTB/i))Imported[_0x4a888b(0x21a)]&&(this[_0x4a888b(0x7da)]=_0x4a888b(0x70e));else{if(_0xea7cbc[_0x4a888b(0x3a8)](/STB/i)){if(_0x4a888b(0x226)==='XMosO')Imported[_0x4a888b(0x566)]&&(this[_0x4a888b(0x7da)]='STB');else{_0x516e1c[_0x4a888b(0x1c9)][_0x4a888b(0x394)]['call'](this);if(!_0x375841[_0x4a888b(0x248)])return;const _0x469b28=this[_0x4a888b(0x529)];if(!_0x469b28)return;this['_pictureContainer']=_0x469b28[_0x4a888b(0x971)];if(!this[_0x4a888b(0x971)])return;this[_0x4a888b(0x1f4)](this[_0x4a888b(0x971)]);}}else{if(_0xea7cbc['match'](/BTB/i)){if(_0x4a888b(0x4df)===_0x4a888b(0x4df))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x4a888b(0x7da)]='BTB');else{const _0x56b461=_0x1f7754[_0x4a888b(0x30d)](this);return _0x4f292a===_0x4a888b(0x5de)?_0x2e1334[_0x4a888b(0x38c)](_0x56b461):_0x56b461;}}else{if(_0xea7cbc[_0x4a888b(0x3a8)](/FTB/i)){if(Imported[_0x4a888b(0x301)]){if(_0x4a888b(0x30b)===_0x4a888b(0x16a))return _0xe35677['CoreEngine'][_0x4a888b(0x54d)]['Color'][_0x4a888b(0x1bc)][_0x4a888b(0x30d)](this,_0x4ea984);else this[_0x4a888b(0x7da)]='FTB';}}else{if(_0xea7cbc[_0x4a888b(0x3a8)](/OTB/i)){if(_0x4a888b(0x718)!==_0x4a888b(0x51e)){if(Imported[_0x4a888b(0x40c)]){if('yRfKC'===_0x4a888b(0x458))this[_0x4a888b(0x7da)]=_0x4a888b(0x657);else return _0x34783f[_0x4a888b(0x1c9)][_0x4a888b(0x54d)][_0x4a888b(0x3b3)][_0x4a888b(0x505)]||_0x4a888b(0x9db);}}else this['_digitGrouping']=_0x7b6b0e[_0x4a888b(0x1c9)][_0x4a888b(0x54d)]['QoL'][_0x4a888b(0x913)],this[_0x4a888b(0x39b)]=_0x55d73e[_0x4a888b(0x1c9)]['Settings'][_0x4a888b(0x927)]['DigitGroupingExText'];}else{if(_0xea7cbc[_0x4a888b(0x3a8)](/ETB/i))Imported[_0x4a888b(0x3bb)]&&(_0x4a888b(0x156)===_0x4a888b(0x156)?this[_0x4a888b(0x7da)]=_0x4a888b(0x198):(_0x5c9038[_0x4a888b(0xa41)][_0x4a888b(0x4ba)][_0x4a888b(0x30d)](this),this[_0x4a888b(0x2f0)]()));else{if(_0xea7cbc[_0x4a888b(0x3a8)](/PTB/i)){if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x4a888b(0x352)!==_0x4a888b(0x4c6))this['_forcedBattleSys']=_0x4a888b(0x5e4);else return _0x4cf9bb['layoutSettings'][_0x4a888b(0x48b)][_0x4a888b(0x30d)](this);}}}}}}}}}}}}}}}}}}}}}}}if(_0x3f2fc0[_0x4a888b(0x3a8)](/<(?:|BATTLE )GRID>/i))this[_0x4a888b(0x36c)]=!![];else _0x3f2fc0['match'](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x4a888b(0x36c)]=![]);},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x682)]=function(){const _0x5beb66=_0x518efc;this[_0x5beb66(0xa35)]=[];},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x9eb)]=function(_0x4e6998,_0x14555b,_0x4e6224,_0x270249){const _0xf38dd9=_0x518efc;if(!this[_0xf38dd9(0x1b3)]())return;_0x4e6224=_0x4e6224||![],_0x270249=_0x270249||![];if($dataAnimations[_0x14555b]){const _0x549211={'targets':_0x4e6998,'animationId':_0x14555b,'mirror':_0x4e6224,'mute':_0x270249};this[_0xf38dd9(0xa35)]['push'](_0x549211);for(const _0x4becd2 of _0x4e6998){_0x4becd2[_0xf38dd9(0x7d6)]&&_0x4becd2['startAnimation']();}}},Game_Temp['prototype'][_0x518efc(0x1b3)]=function(){return!![];},Game_Temp[_0x518efc(0xa41)]['retrieveFauxAnimation']=function(){const _0x31d886=_0x518efc;return this[_0x31d886(0xa35)][_0x31d886(0x91d)]();},Game_Temp[_0x518efc(0xa41)]['createPointAnimationQueue']=function(){this['_pointAnimationQueue']=[];},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x4dc)]=function(_0x183f56,_0x150360,_0x12e09f,_0xfa873d,_0xbdf6fe){const _0x190e31=_0x518efc;if(!this[_0x190e31(0x79e)]())return;_0xfa873d=_0xfa873d||![],_0xbdf6fe=_0xbdf6fe||![];if($dataAnimations[_0x12e09f]){const _0x56c3c2={'x':_0x183f56,'y':_0x150360,'animationId':_0x12e09f,'mirror':_0xfa873d,'mute':_0xbdf6fe};this[_0x190e31(0x9ba)][_0x190e31(0x609)](_0x56c3c2);}},Game_Temp[_0x518efc(0xa41)][_0x518efc(0x79e)]=function(){return!![];},Game_Temp[_0x518efc(0xa41)][_0x518efc(0xa3e)]=function(){const _0x463aa9=_0x518efc;return this['_pointAnimationQueue'][_0x463aa9(0x91d)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x155)]=Game_System[_0x518efc(0xa41)][_0x518efc(0x55e)],Game_System[_0x518efc(0xa41)]['initialize']=function(){const _0x1ed54a=_0x518efc;VisuMZ[_0x1ed54a(0x1c9)][_0x1ed54a(0x155)][_0x1ed54a(0x30d)](this),this[_0x1ed54a(0x187)]();},Game_System[_0x518efc(0xa41)][_0x518efc(0x187)]=function(){const _0x42724d=_0x518efc;this[_0x42724d(0x2e6)]={'SideView':$dataSystem[_0x42724d(0x9bf)],'BattleSystem':this[_0x42724d(0x637)](),'FontSize':$dataSystem[_0x42724d(0xa5d)]['fontSize'],'Padding':0xc};},Game_System[_0x518efc(0xa41)][_0x518efc(0x49e)]=function(){const _0x2409b1=_0x518efc;if($gameTemp[_0x2409b1(0x5ee)]==='SV'){if(_0x2409b1(0x52a)!==_0x2409b1(0x52a)){const _0x3e8fc8=this[_0x2409b1(0xa59)]/0x5,_0x597b63=_0x35bfbb['_scene'],_0x2061c6=_0x597b63[_0x2409b1(0x948)[_0x2409b1(0x67d)](_0x4d0375)](),_0x481c48=_0x597b63[_0x2409b1(0x462)['format'](_0x4870e0)]();this[_0x2409b1(0x5fd)][_0x2409b1(0x42e)[_0x2409b1(0x67d)](_0x3fc301)]=_0x2061c6,this[_0x2409b1(0x5fd)][_0x2409b1(0xa57)[_0x2409b1(0x67d)](_0x116a42)]=_0x481c48;if(_0x2061c6==='')return;if(_0x481c48==='')return;const _0x39c00e=_0x597b63[_0x2409b1(0x1f3)[_0x2409b1(0x67d)](_0x24e82f)](),_0x8eddad=this['itemPadding'](),_0x4f175e=_0x3e8fc8*(_0x5333da-0x1)+_0x8eddad+_0x39c00e,_0x1e6ffa=_0x4e66be[_0x2409b1(0x1c9)][_0x2409b1(0x54d)][_0x2409b1(0x8be)][_0x2409b1(0x7a2)];this[_0x2409b1(0x8dd)](_0x1e6ffa[_0x2409b1(0x67d)](_0x2061c6,_0x481c48),_0x4f175e,0x0,_0x3e8fc8-_0x8eddad*0x2);}else return!![];}else{if($gameTemp[_0x2409b1(0x5ee)]==='FV')return![];}if(this[_0x2409b1(0x2e6)]===undefined)this[_0x2409b1(0x187)]();if(this[_0x2409b1(0x2e6)][_0x2409b1(0x2f6)]===undefined)this[_0x2409b1(0x187)]();return this['_CoreEngineSettings'][_0x2409b1(0x2f6)];},Game_System['prototype']['setSideView']=function(_0x364a63){const _0x310b56=_0x518efc;if(this[_0x310b56(0x2e6)]===undefined)this[_0x310b56(0x187)]();if(this[_0x310b56(0x2e6)]['SideView']===undefined)this[_0x310b56(0x187)]();this['_CoreEngineSettings'][_0x310b56(0x2f6)]=_0x364a63;},Game_System[_0x518efc(0xa41)][_0x518efc(0x1d5)]=function(){const _0x9db219=_0x518efc;if(this['_CoreEngineSettings']===undefined)this[_0x9db219(0x187)]();this[_0x9db219(0x2e6)]['BattleSystem']=this[_0x9db219(0x637)]();},Game_System[_0x518efc(0xa41)][_0x518efc(0x637)]=function(){const _0x4102eb=_0x518efc,_0x42d5cd=(VisuMZ[_0x4102eb(0x1c9)]['Settings'][_0x4102eb(0xa42)]||_0x4102eb(0x540))[_0x4102eb(0x1fa)]()[_0x4102eb(0x445)]();return VisuMZ[_0x4102eb(0x1c9)][_0x4102eb(0x7c3)](_0x42d5cd);},Game_System[_0x518efc(0xa41)]['getBattleSystem']=function(){const _0x2ff257=_0x518efc;if($gameTemp[_0x2ff257(0x7da)]!==undefined){if(_0x2ff257(0x7bd)!==_0x2ff257(0x99b))return $gameTemp['_forcedBattleSys'];else{let _0x5a45ff=0x0;for(const _0x4d909b of _0x223d3a[_0x2ff257(0x1c9)][_0x2ff257(0x54d)][_0x2ff257(0x224)][_0x2ff257(0x293)]){const _0x53fa64=this[_0x2ff257(0x280)](),_0xa5be50=this[_0x2ff257(0x658)](_0x5a45ff);this[_0x2ff257(0x64e)](_0x53fa64,_0xa5be50,_0x4d909b),_0x5a45ff++;}}}if(this[_0x2ff257(0x2e6)]===undefined)this['initCoreEngine']();if(this[_0x2ff257(0x2e6)][_0x2ff257(0xa42)]===undefined)this['resetBattleSystem']();return this['_CoreEngineSettings'][_0x2ff257(0xa42)];},Game_System['prototype'][_0x518efc(0x9ef)]=function(_0x32d9fa){const _0x59a395=_0x518efc;if(this['_CoreEngineSettings']===undefined)this[_0x59a395(0x187)]();if(this[_0x59a395(0x2e6)][_0x59a395(0xa42)]===undefined)this[_0x59a395(0x1d5)]();this['_CoreEngineSettings'][_0x59a395(0xa42)]=_0x32d9fa;},Game_System[_0x518efc(0xa41)]['mainFontSize']=function(){const _0x3ec56=_0x518efc;if(this[_0x3ec56(0x2e6)]===undefined)this[_0x3ec56(0x187)]();if(this[_0x3ec56(0x2e6)][_0x3ec56(0x766)]===undefined)this[_0x3ec56(0x187)]();return this[_0x3ec56(0x2e6)]['FontSize'];},Game_System[_0x518efc(0xa41)]['setMainFontSize']=function(_0x39b1d1){const _0x1c97b2=_0x518efc;if(this['_CoreEngineSettings']===undefined)this[_0x1c97b2(0x187)]();if(this[_0x1c97b2(0x2e6)][_0x1c97b2(0x862)]===undefined)this[_0x1c97b2(0x187)]();this[_0x1c97b2(0x2e6)][_0x1c97b2(0x766)]=_0x39b1d1;},Game_System[_0x518efc(0xa41)][_0x518efc(0x93e)]=function(){const _0x57aca4=_0x518efc;if(this['_CoreEngineSettings']===undefined)this[_0x57aca4(0x187)]();if(this[_0x57aca4(0x2e6)]['Padding']===undefined)this[_0x57aca4(0x187)]();return this['_CoreEngineSettings'][_0x57aca4(0x9d8)];},Game_System[_0x518efc(0xa41)]['setWindowPadding']=function(_0x4e828e){const _0x124f08=_0x518efc;if(this[_0x124f08(0x2e6)]===undefined)this[_0x124f08(0x187)]();if(this['_CoreEngineSettings'][_0x124f08(0x862)]===undefined)this[_0x124f08(0x187)]();this[_0x124f08(0x2e6)][_0x124f08(0x9d8)]=_0x4e828e;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa43)]=Game_Screen[_0x518efc(0xa41)][_0x518efc(0x55e)],Game_Screen[_0x518efc(0xa41)]['initialize']=function(){const _0x19e21d=_0x518efc;VisuMZ[_0x19e21d(0x1c9)][_0x19e21d(0xa43)][_0x19e21d(0x30d)](this),this[_0x19e21d(0x9a3)]();},Game_Screen[_0x518efc(0xa41)][_0x518efc(0x9a3)]=function(){const _0x3cb7d9=_0x518efc,_0x5ad479=VisuMZ[_0x3cb7d9(0x1c9)][_0x3cb7d9(0x54d)][_0x3cb7d9(0x273)];this['_coreEngineShakeStyle']=_0x5ad479?.['DefaultStyle']||'random';},Game_Screen['prototype'][_0x518efc(0x8b8)]=function(){const _0x9fc270=_0x518efc;if(this[_0x9fc270(0x3a4)]===undefined)this['initCoreEngineScreenShake']();return this[_0x9fc270(0x3a4)];},Game_Screen[_0x518efc(0xa41)][_0x518efc(0x49f)]=function(_0xf1aee5){const _0x4052d8=_0x518efc;if(this[_0x4052d8(0x3a4)]===undefined)this[_0x4052d8(0x9a3)]();this[_0x4052d8(0x3a4)]=_0xf1aee5[_0x4052d8(0x7c4)]()['trim']();},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x1f8)]=function(){const _0x2a4bcf=_0x518efc;if($gameParty[_0x2a4bcf(0x75b)]())return![];return this[_0x2a4bcf(0x632)]()&&this[_0x2a4bcf(0x632)]()[_0x2a4bcf(0x4e5)](0x0)==='!';},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x632)]=function(){const _0x1bbbd4=_0x518efc;return this[_0x1bbbd4(0x85a)][_0x1bbbd4(0x84b)]('/')[_0x1bbbd4(0xa31)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa23)]=Game_Picture['prototype']['x'],Game_Picture[_0x518efc(0xa41)]['x']=function(){const _0x1dfae8=_0x518efc;if(this['isMapScrollLinked']()){if(_0x1dfae8(0x395)!==_0x1dfae8(0x395)){if(!this[_0x1dfae8(0x5f9)])return;this['x']=this[_0x1dfae8(0x5f9)][_0x1dfae8(0x735)],this['y']=this[_0x1dfae8(0x5f9)][_0x1dfae8(0x9f4)],this[_0x1dfae8(0x8b0)]['x']=this[_0x1dfae8(0x5f9)][_0x1dfae8(0x768)],this[_0x1dfae8(0x8b0)]['y']=this[_0x1dfae8(0x5f9)][_0x1dfae8(0x264)],this[_0x1dfae8(0x8de)]=this['_coreEasing'][_0x1dfae8(0x6e4)],this[_0x1dfae8(0x5a4)]=this[_0x1dfae8(0x5f9)]['targetBackOpacity'],this[_0x1dfae8(0x34e)]=this[_0x1dfae8(0x5f9)][_0x1dfae8(0x836)],this[_0x1dfae8(0x3b2)](_0x2f9c36,_0x335587,this['x'],this['y'],this[_0x1dfae8(0x8b0)]['x'],this[_0x1dfae8(0x8b0)]['y'],this['opacity'],this[_0x1dfae8(0x5a4)],this[_0x1dfae8(0x34e)]);}else return this[_0x1dfae8(0x8a6)]();}else return VisuMZ['CoreEngine'][_0x1dfae8(0xa23)][_0x1dfae8(0x30d)](this);},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x8a6)]=function(){const _0x19c249=_0x518efc,_0x135084=$gameMap[_0x19c249(0x824)]()*$gameMap['tileWidth']();return(this['_x']-_0x135084)*$gameScreen['zoomScale']();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x3cb)]=Game_Picture[_0x518efc(0xa41)]['y'],Game_Picture['prototype']['y']=function(){const _0x1d0f48=_0x518efc;if(this[_0x1d0f48(0x1f8)]()){if('kqdvU'===_0x1d0f48(0x2e4))return this['yScrollLinkedOffset']();else{const _0x3890a4=this[_0x1d0f48(0x8b6)],_0x35b1d4=_0x3890a4[_0x1d0f48(0x6c7)];_0x51fc5d=_0x4c3758||0xffffffff;let _0xb9cbe7=_0x4e7748,_0x24e161=_0x306d12['round'](_0x3d6b0a+0x18/0x2+this[_0x1d0f48(0xa0b)]*0.35);_0x47fee5==='center'&&(_0xb9cbe7+=_0x366737/0x2),_0xb526cc===_0x1d0f48(0xa44)&&(_0xb9cbe7+=_0x4d2c12),_0x3890a4[_0x1d0f48(0x911)](),_0x3890a4[_0x1d0f48(0x737)]=this[_0x1d0f48(0x7ce)](),_0x3890a4[_0x1d0f48(0x35b)]=_0x44ae00,_0x3890a4[_0x1d0f48(0x8b3)]=_0x1d0f48(0x558),_0x3890a4[_0x1d0f48(0x6c7)]=0x1,this[_0x1d0f48(0x4ce)](_0x1d63af,_0xb9cbe7,_0x24e161,_0x5cc335),_0x3890a4[_0x1d0f48(0x6c7)]=_0x35b1d4,this['_drawTextBody'](_0x1a015a,_0xb9cbe7,_0x24e161,_0x5d54f4),_0x3890a4['restore'](),this[_0x1d0f48(0x362)][_0x1d0f48(0x4ba)]();}}else return VisuMZ[_0x1d0f48(0x1c9)][_0x1d0f48(0x3cb)]['call'](this);},Game_Picture['prototype'][_0x518efc(0x641)]=function(){const _0x5786ef=$gameMap['displayY']()*$gameMap['tileHeight']();return(this['_y']-_0x5786ef)*$gameScreen['zoomScale']();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x8fc)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x58e)],Game_Picture['prototype']['scaleX']=function(){const _0x5ed8e8=_0x518efc;let _0x342ff5=VisuMZ[_0x5ed8e8(0x1c9)]['Game_Picture_scaleX'][_0x5ed8e8(0x30d)](this);return this[_0x5ed8e8(0x1f8)]()&&(_0x342ff5*=$gameScreen[_0x5ed8e8(0x4c8)]()),_0x342ff5;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x1c4)]=Game_Picture['prototype'][_0x518efc(0x51f)],Game_Picture[_0x518efc(0xa41)]['scaleY']=function(){const _0x86826e=_0x518efc;let _0x328486=VisuMZ['CoreEngine']['Game_Picture_scaleY'][_0x86826e(0x30d)](this);return this['isMapScrollLinked']()&&(_0x328486*=$gameScreen['zoomScale']()),_0x328486;},Game_Picture['prototype'][_0x518efc(0x8e3)]=function(_0x5523e4){const _0x1c3668=_0x518efc;this[_0x1c3668(0x23b)]=_0x5523e4;},VisuMZ['CoreEngine'][_0x518efc(0x1db)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x47e)],Game_Picture['prototype'][_0x518efc(0x47e)]=function(_0x3c96a2){const _0x5a689d=_0x518efc;this[_0x5a689d(0x23b)]=this[_0x5a689d(0x23b)]||0x0;if([0x0,0x1,0x2,0x3][_0x5a689d(0x1f5)](this['_coreEasingType'])){if('lHVaU'===_0x5a689d(0x3c5))return VisuMZ[_0x5a689d(0x1c9)][_0x5a689d(0x1db)][_0x5a689d(0x30d)](this,_0x3c96a2);else{if(_0x4a7c1e)_0x14d872[_0x5a689d(0x631)](_0x8f1c9e);}}else{if(_0x5a689d(0x840)===_0x5a689d(0x840))return VisuMZ[_0x5a689d(0x3e7)](_0x3c96a2,this[_0x5a689d(0x23b)]);else _0x58a6fa=_0x296112['round'](_0xe1bb2a),_0x2e917e=_0xf38be6[_0x5a689d(0x38c)](_0x5ec19a),_0x2462a0=_0x4c0dec[_0x5a689d(0x38c)](_0x432c78),_0x431b01[_0x5a689d(0x1c9)][_0x5a689d(0x87e)]['call'](this,_0x46dd4b,_0x82c54d,_0x2fdc86,_0x8268de),this[_0x5a689d(0x889)]();}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x661)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x6b3)],Game_Picture[_0x518efc(0xa41)]['initRotation']=function(){const _0x318c1c=_0x518efc;VisuMZ[_0x318c1c(0x1c9)][_0x318c1c(0x661)][_0x318c1c(0x30d)](this),this[_0x318c1c(0x203)]();},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x203)]=function(){const _0x201a0e=_0x518efc;this[_0x201a0e(0x3bd)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':'Linear'};},VisuMZ[_0x518efc(0x1c9)]['Game_Picture_angle']=Game_Picture['prototype'][_0x518efc(0x6e1)],Game_Picture[_0x518efc(0xa41)]['angle']=function(){const _0x20b9ff=_0x518efc;let _0x4f49b0=VisuMZ[_0x20b9ff(0x1c9)]['Game_Picture_angle']['call'](this);return _0x4f49b0+=this[_0x20b9ff(0x891)](),_0x4f49b0;},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x891)]=function(){const _0x2d0f6e=_0x518efc;if(this[_0x2d0f6e(0x3bd)]===undefined)this[_0x2d0f6e(0x203)]();return this[_0x2d0f6e(0x3bd)][_0x2d0f6e(0x693)]||0x0;},Game_Picture[_0x518efc(0xa41)]['setAnglePlusData']=function(_0x144700,_0x2bb766,_0x2e0b0e){const _0x5a8b80=_0x518efc;if(this[_0x5a8b80(0x3bd)]===undefined)this['initRotationCoreEngine']();this[_0x5a8b80(0x3bd)]['target']=_0x144700||0x0,this[_0x5a8b80(0x3bd)][_0x5a8b80(0x314)]=_0x2bb766||0x0,this['_anglePlus']['wholeDuration']=_0x2bb766||0x0,this[_0x5a8b80(0x3bd)][_0x5a8b80(0x25b)]=_0x2e0b0e||_0x5a8b80(0x901);if(_0x2bb766<=0x0){if(_0x5a8b80(0x709)==='dCKXK'){if(_0x125085[_0x5a8b80(0x1c9)][_0x5a8b80(0x54d)][_0x5a8b80(0x224)][_0x5a8b80(0x88b)]===![])return;if(this[_0x5a8b80(0xa5f)]())this['drawActorExpGauge'](_0x4c39e2,_0x1c4026,_0x2ef5d7);_0x10b62f[_0x5a8b80(0x1c9)]['Window_StatusBase_drawActorLevel'][_0x5a8b80(0x30d)](this,_0x13aa98,_0x13bbb9,_0x47dcb6);}else this[_0x5a8b80(0x3bd)][_0x5a8b80(0x693)]=this['_anglePlus'][_0x5a8b80(0x143)];}},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x890)]=function(_0x3238d7,_0x1d2696,_0xa5e4a1){const _0x481cf3=_0x518efc;if(this['_anglePlus']===undefined)this[_0x481cf3(0x203)]();this['_anglePlus'][_0x481cf3(0x143)]+=_0x3238d7||0x0,this[_0x481cf3(0x3bd)][_0x481cf3(0x314)]=_0x1d2696||0x0,this['_anglePlus'][_0x481cf3(0xa22)]=_0x1d2696||0x0,this[_0x481cf3(0x3bd)][_0x481cf3(0x25b)]=_0xa5e4a1||_0x481cf3(0x901),_0x1d2696<=0x0&&(this['_anglePlus'][_0x481cf3(0x693)]=this[_0x481cf3(0x3bd)][_0x481cf3(0x143)]);},VisuMZ['CoreEngine'][_0x518efc(0x65b)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x4f7)],Game_Picture[_0x518efc(0xa41)]['updateRotation']=function(){const _0x4d74fc=_0x518efc;VisuMZ[_0x4d74fc(0x1c9)][_0x4d74fc(0x65b)][_0x4d74fc(0x30d)](this),this[_0x4d74fc(0x602)]();},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x602)]=function(){const _0x54d7a7=_0x518efc;if(this[_0x54d7a7(0x3bd)]===undefined)this['initRotationCoreEngine']();const _0x3dbf73=this[_0x54d7a7(0x3bd)];if(_0x3dbf73[_0x54d7a7(0x314)]<=0x0)return;_0x3dbf73[_0x54d7a7(0x693)]=this[_0x54d7a7(0x982)](_0x3dbf73['current'],_0x3dbf73[_0x54d7a7(0x143)]),_0x3dbf73[_0x54d7a7(0x314)]--,_0x3dbf73['duration']<=0x0&&(_0x54d7a7(0x94f)===_0x54d7a7(0x94f)?_0x3dbf73[_0x54d7a7(0x693)]=_0x3dbf73[_0x54d7a7(0x143)]:(_0x26f5f6['CoreEngine'][_0x54d7a7(0xa43)][_0x54d7a7(0x30d)](this),this[_0x54d7a7(0x9a3)]()));},Game_Picture['prototype'][_0x518efc(0x982)]=function(_0xf3e284,_0x4eba93){const _0x1162be=_0x518efc,_0x46fee0=this['_anglePlus'],_0x5c8d66=_0x46fee0[_0x1162be(0x25b)],_0x16106b=_0x46fee0['duration'],_0x1c91aa=_0x46fee0[_0x1162be(0xa22)],_0x508067=VisuMZ[_0x1162be(0x3e7)]((_0x1c91aa-_0x16106b)/_0x1c91aa,_0x5c8d66),_0x53586c=VisuMZ[_0x1162be(0x3e7)]((_0x1c91aa-_0x16106b+0x1)/_0x1c91aa,_0x5c8d66),_0x294396=(_0xf3e284-_0x4eba93*_0x508067)/(0x1-_0x508067);return _0x294396+(_0x4eba93-_0x294396)*_0x53586c;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x91b)]=Game_Action[_0x518efc(0xa41)][_0x518efc(0x82a)],Game_Action[_0x518efc(0xa41)][_0x518efc(0x82a)]=function(_0x4247a0){const _0x2254a5=_0x518efc;return VisuMZ[_0x2254a5(0x1c9)]['Settings']['QoL']['ImprovedAccuracySystem']?this['itemHitImprovedAccuracy'](_0x4247a0):VisuMZ[_0x2254a5(0x1c9)]['Game_Action_itemHit']['call'](this,_0x4247a0);},Game_Action['prototype'][_0x518efc(0x981)]=function(_0x1af9c4){const _0x4c82ed=_0x518efc,_0x2ec73d=this[_0x4c82ed(0x9cb)](_0x1af9c4),_0x1a4078=this['subjectHitRate'](_0x1af9c4),_0xf04e04=this['targetEvaRate'](_0x1af9c4);return _0x2ec73d*(_0x1a4078-_0xf04e04);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5e8)]=Game_Action['prototype'][_0x518efc(0x76a)],Game_Action[_0x518efc(0xa41)][_0x518efc(0x76a)]=function(_0x1e80aa){const _0x3b74e9=_0x518efc;if(VisuMZ['CoreEngine']['Settings'][_0x3b74e9(0x927)]['ImprovedAccuracySystem']){if('NsdrJ'!=='NsdrJ'){var _0xc7fe24=_0x5f1fc0(_0x325db8['$1'])/0x64;_0x41f2b3*=_0xc7fe24;}else return 0x0;}else return VisuMZ[_0x3b74e9(0x1c9)]['Game_Action_itemEva'][_0x3b74e9(0x30d)](this,_0x1e80aa);},Game_Action[_0x518efc(0xa41)][_0x518efc(0x9cb)]=function(_0x4fcb5){const _0x378fac=_0x518efc;return this[_0x378fac(0x748)]()[_0x378fac(0x598)]*0.01;},Game_Action[_0x518efc(0xa41)][_0x518efc(0x3d5)]=function(_0x10cef3){const _0xbd1e6f=_0x518efc;if(VisuMZ['CoreEngine'][_0xbd1e6f(0x54d)][_0xbd1e6f(0x927)][_0xbd1e6f(0x35f)]&&this['isItem']())return 0x1;if(this[_0xbd1e6f(0x826)]()){if(VisuMZ[_0xbd1e6f(0x1c9)]['Settings'][_0xbd1e6f(0x927)][_0xbd1e6f(0x35f)]&&this['subject']()['isActor']()){if(_0xbd1e6f(0x1f1)===_0xbd1e6f(0x7e1)){if(_0x1a0e25[_0xbd1e6f(0x3a8)](/backspace/i))return this[_0xbd1e6f(0x8f8)]===0x8;if(_0x2c84db[_0xbd1e6f(0x3a8)](/enter/i))return this[_0xbd1e6f(0x8f8)]===0xd;if(_0x935a40['match'](/escape/i))return this[_0xbd1e6f(0x8f8)]===0x1b;}else return this[_0xbd1e6f(0x34a)]()[_0xbd1e6f(0x966)]+0.05;}else return _0xbd1e6f(0x871)!==_0xbd1e6f(0x871)?_0x8073a8[_0xbd1e6f(0x976)]('cancel'):this[_0xbd1e6f(0x34a)]()['hit'];}else return 0x1;},Game_Action[_0x518efc(0xa41)][_0x518efc(0x72d)]=function(_0x1e39d4){const _0x2fefa2=_0x518efc;if(this[_0x2fefa2(0x34a)]()[_0x2fefa2(0x2e5)]()===_0x1e39d4[_0x2fefa2(0x2e5)]())return 0x0;if(this['isPhysical']()){if(_0x2fefa2(0x388)!==_0x2fefa2(0x388))return 0xc0;else{if(VisuMZ[_0x2fefa2(0x1c9)][_0x2fefa2(0x54d)][_0x2fefa2(0x927)]['AccuracyBoost']&&_0x1e39d4['isEnemy']())return _0x1e39d4['eva']-0.05;else{if(_0x2fefa2(0x44d)===_0x2fefa2(0x8ca)){const _0x3d77ee='_stored_hpGaugeColor2';this[_0x2fefa2(0x81f)]=this[_0x2fefa2(0x81f)]||{};if(this[_0x2fefa2(0x81f)][_0x3d77ee])return this['_colorCache'][_0x3d77ee];const _0x34838e=_0x135198[_0x2fefa2(0x1c9)][_0x2fefa2(0x54d)][_0x2fefa2(0x3b3)]['ColorHPGauge2'];return this[_0x2fefa2(0x629)](_0x3d77ee,_0x34838e);}else return _0x1e39d4[_0x2fefa2(0x3ef)];}}}else{if(this[_0x2fefa2(0x256)]()){if(_0x2fefa2(0x5a1)!==_0x2fefa2(0x5a1))_0x2955c1[_0x2fefa2(0x851)](_0x304c90[_0x2fefa2(0x2ea)],0x0,~0x0),_0x372c0a[_0x2fefa2(0x538)](_0x5d31df[_0x2fefa2(0x2e9)],_0x57b6dc[_0x2fefa2(0x2e9)],_0x4fbeb8[_0x2fefa2(0x2e9)]),_0xd45206[_0x2fefa2(0x885)](_0x2a48c4),_0x359240['batch']['flush'](),_0x51f981['clear'](),_0x5829ec[_0x2fefa2(0x851)](_0x5bd9e4[_0x2fefa2(0x822)],0x1,~0x0),_0xf116c7[_0x2fefa2(0x538)](_0x4f70a5['REPLACE'],_0x329fee[_0x2fefa2(0x2cf)],_0x519e23[_0x2fefa2(0x2cf)]),_0x2dc5ec[_0x2fefa2(0x283)](_0x5e54aa[_0x2fefa2(0x359)],_0x5a6239['ONE']),_0x1df07b[_0x2fefa2(0x885)](_0x3dedcf),_0x48bb33[_0x2fefa2(0x8e1)][_0x2fefa2(0x7dd)](),_0xfb8e76[_0x2fefa2(0x283)](_0x9aaafc['ONE'],_0x59b711[_0x2fefa2(0x9c1)]);else return _0x1e39d4['mev'];}else return 0x0;}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x59d)]=Game_Action[_0x518efc(0xa41)][_0x518efc(0x8cb)],Game_Action[_0x518efc(0xa41)]['updateLastTarget']=function(_0x363fb4){const _0x53e107=_0x518efc;VisuMZ['CoreEngine'][_0x53e107(0x59d)]['call'](this,_0x363fb4);if(VisuMZ[_0x53e107(0x1c9)]['Settings'][_0x53e107(0x927)][_0x53e107(0x31e)])return;const _0x1cd1d3=_0x363fb4['result']();_0x1cd1d3[_0x53e107(0x770)]&&(0x1-this[_0x53e107(0x76a)](_0x363fb4)>this['itemHit'](_0x363fb4)&&(_0x1cd1d3[_0x53e107(0x770)]=![],_0x1cd1d3[_0x53e107(0x205)]=!![]));},VisuMZ[_0x518efc(0x1c9)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x6ae)],Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x6ae)]=function(){const _0xa02378=_0x518efc;this['_cache']={},VisuMZ[_0xa02378(0x1c9)][_0xa02378(0x6f6)]['call'](this);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x2ec)]=Game_BattlerBase['prototype'][_0x518efc(0x5b5)],Game_BattlerBase[_0x518efc(0xa41)]['refresh']=function(){const _0x579db6=_0x518efc;this[_0x579db6(0x5ae)]={},VisuMZ[_0x579db6(0x1c9)]['Game_BattlerBase_refresh'][_0x579db6(0x30d)](this);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x946)]=function(_0x47d0f3){return this['_cache']=this['_cache']||{},this['_cache'][_0x47d0f3]!==undefined;},Game_BattlerBase[_0x518efc(0xa41)]['paramPlus']=function(_0x3cae46){const _0x88101=_0x518efc,_0x4012b9=(_0x287777,_0x26e325)=>{const _0x232221=_0x3995;if(!_0x26e325)return _0x287777;if(_0x26e325['note'][_0x232221(0x3a8)](VisuMZ[_0x232221(0x1c9)]['RegExp'][_0x232221(0x823)][_0x3cae46])){var _0x58e16e=Number(RegExp['$1']);_0x287777+=_0x58e16e;}if(_0x26e325[_0x232221(0x699)]['match'](VisuMZ[_0x232221(0x1c9)][_0x232221(0x936)]['paramPlusJS'][_0x3cae46])){if(_0x232221(0x7de)!=='xASpW')this[_0x232221(0x348)]['setBackgroundType'](_0xe9a3c7[_0x232221(0x587)][_0x232221(0x247)]);else{var _0x43ace4=String(RegExp['$1']);try{_0x287777+=eval(_0x43ace4);}catch(_0x5e5082){if(_0x232221(0x2d3)===_0x232221(0x2d3)){if($gameTemp['isPlaytest']())console[_0x232221(0x772)](_0x5e5082);}else this[_0x232221(0x55e)](...arguments);}}}return _0x287777;};return this[_0x88101(0x2f8)]()[_0x88101(0x940)](_0x4012b9,this[_0x88101(0x2bc)][_0x3cae46]);},Game_BattlerBase[_0x518efc(0xa41)]['paramMax']=function(_0x1e8a1a){const _0x28b08e=_0x518efc;var _0x15d7a1=_0x28b08e(0x4c1)+(this[_0x28b08e(0x2e5)]()?_0x28b08e(0x309):_0x28b08e(0x4ea))+_0x28b08e(0x563)+_0x1e8a1a;if(this[_0x28b08e(0x946)](_0x15d7a1))return this['_cache'][_0x15d7a1];this[_0x28b08e(0x5ae)][_0x15d7a1]=eval(VisuMZ['CoreEngine'][_0x28b08e(0x54d)][_0x28b08e(0x224)][_0x15d7a1]);const _0x1036b9=(_0x201279,_0x30b83b)=>{const _0x482985=_0x28b08e;if(!_0x30b83b)return _0x201279;if(_0x30b83b[_0x482985(0x699)][_0x482985(0x3a8)](VisuMZ[_0x482985(0x1c9)]['RegExp'][_0x482985(0x56a)][_0x1e8a1a])){if(_0x482985(0x165)===_0x482985(0x157))_0x49c69d[_0x482985(0x449)]=!_0x46383c[_0x482985(0x449)],_0x32f810[_0x482985(0x911)]();else{var _0x2aa5ae=Number(RegExp['$1']);if(_0x2aa5ae===0x0)_0x2aa5ae=Number['MAX_SAFE_INTEGER'];_0x201279=Math[_0x482985(0x55c)](_0x201279,_0x2aa5ae);}}if(_0x30b83b[_0x482985(0x699)]['match'](VisuMZ[_0x482985(0x1c9)][_0x482985(0x936)][_0x482985(0x31b)][_0x1e8a1a])){if(_0x482985(0x3d0)!==_0x482985(0x3d0))this[_0x482985(0x4a0)][_0x482985(0x19d)](_0x2a2882[_0x482985(0x587)][_0x482985(0x33e)]);else{var _0x4202f1=String(RegExp['$1']);try{_0x201279=Math[_0x482985(0x55c)](_0x201279,Number(eval(_0x4202f1)));}catch(_0x2d8683){if($gameTemp[_0x482985(0x7c5)]())console[_0x482985(0x772)](_0x2d8683);}}}return _0x201279;};if(this[_0x28b08e(0x5ae)][_0x15d7a1]===0x0)this['_cache'][_0x15d7a1]=Number[_0x28b08e(0x866)];return this['_cache'][_0x15d7a1]=this[_0x28b08e(0x2f8)]()[_0x28b08e(0x940)](_0x1036b9,this[_0x28b08e(0x5ae)][_0x15d7a1]),this[_0x28b08e(0x5ae)][_0x15d7a1];},Game_BattlerBase[_0x518efc(0xa41)]['paramRate']=function(_0x34f855){const _0x878b4f=_0x518efc,_0x2a75d7=this['traitsPi'](Game_BattlerBase['TRAIT_PARAM'],_0x34f855),_0x552f3e=(_0x4372e7,_0x20e8fc)=>{const _0x489f61=_0x3995;if(_0x489f61(0x14f)!==_0x489f61(0x304)){if(!_0x20e8fc)return _0x4372e7;if(_0x20e8fc[_0x489f61(0x699)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x489f61(0x171)][_0x34f855])){var _0x35e560=Number(RegExp['$1'])/0x64;_0x4372e7*=_0x35e560;}if(_0x20e8fc[_0x489f61(0x699)][_0x489f61(0x3a8)](VisuMZ[_0x489f61(0x1c9)][_0x489f61(0x936)][_0x489f61(0x700)][_0x34f855])){var _0x35e560=Number(RegExp['$1']);_0x4372e7*=_0x35e560;}if(_0x20e8fc[_0x489f61(0x699)][_0x489f61(0x3a8)](VisuMZ[_0x489f61(0x1c9)][_0x489f61(0x936)]['paramRateJS'][_0x34f855])){if(_0x489f61(0xa34)!=='brHov'){var _0x56fc01=String(RegExp['$1']);try{_0x4372e7*=eval(_0x56fc01);}catch(_0x241fb0){if($gameTemp[_0x489f61(0x7c5)]())console['log'](_0x241fb0);}}else _0x2ec9a5['scaleMode']=_0x17203c[_0x489f61(0x5c0)][_0x489f61(0x238)];}return _0x4372e7;}else this[_0x489f61(0xa62)]['centerY']=!![],this[_0x489f61(0xa62)][_0x489f61(0x6b9)]=_0x2af4bd[_0x489f61(0x848)]||0x0;};return this[_0x878b4f(0x2f8)]()[_0x878b4f(0x940)](_0x552f3e,_0x2a75d7);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x427)]=function(_0x1f199b){const _0x37a49b=_0x518efc,_0x29a0a4=(_0xde3999,_0x369da3)=>{const _0x453b34=_0x3995;if(_0x453b34(0x95d)===_0x453b34(0x95d)){if(!_0x369da3)return _0xde3999;if(_0x369da3[_0x453b34(0x699)][_0x453b34(0x3a8)](VisuMZ[_0x453b34(0x1c9)][_0x453b34(0x936)][_0x453b34(0x9e6)][_0x1f199b])){if(_0x453b34(0x520)===_0x453b34(0x520)){var _0x3f5b3e=Number(RegExp['$1']);_0xde3999+=_0x3f5b3e;}else return _0x2c1b77[_0x453b34(0x55c)](0x0,this['_allTextHeight']);}if(_0x369da3[_0x453b34(0x699)][_0x453b34(0x3a8)](VisuMZ[_0x453b34(0x1c9)][_0x453b34(0x936)]['paramFlatJS'][_0x1f199b])){if(_0x453b34(0x4d1)!=='PnWGJ'){var _0x133f9b=String(RegExp['$1']);try{if('gznxn'!==_0x453b34(0x4cf))_0xde3999+=eval(_0x133f9b);else{const _0x6ebcbd=_0x580c99[_0x453b34(0x1c9)][_0x453b34(0x54d)]['ScreenShake'];if(_0x6ebcbd&&_0x6ebcbd[_0x453b34(0x450)])return _0x6ebcbd[_0x453b34(0x450)][_0x453b34(0x30d)](this);const _0x4c0629=_0x25952a[_0x453b34(0x3e4)]*0.75,_0x317c1b=_0x53ed35[_0x453b34(0x4ef)]*0.6,_0x5da7fd=_0x52367e['_shakeDuration'];this['x']+=_0x3a2d20[_0x453b34(0x38c)](_0x4071d0[_0x453b34(0x4ab)](_0x4c0629)-_0x48217b[_0x453b34(0x4ab)](_0x317c1b))*(_0x3685d5[_0x453b34(0x253)](_0x5da7fd,0x1e)*0.5);}}catch(_0x123f24){if(_0x453b34(0xa0e)==='XUxHP')return _0x56d45e['CoreEngine']['Settings']['UI'][_0x453b34(0x9da)];else{if($gameTemp[_0x453b34(0x7c5)]())console[_0x453b34(0x772)](_0x123f24);}}}else{if(this[_0x453b34(0x3a4)]===_0x465887)this[_0x453b34(0x9a3)]();this[_0x453b34(0x3a4)]=_0x13d336['toLowerCase']()[_0x453b34(0x445)]();}}return _0xde3999;}else{if(!this[_0x453b34(0x463)])return;if(!this[_0x453b34(0x463)][_0x453b34(0x3a3)])return;this[_0x453b34(0x463)][_0x453b34(0x362)]&&!this[_0x453b34(0x439)]['_baseTexture'][_0x453b34(0x234)]&&this[_0x453b34(0x463)][_0x453b34(0x605)]();}};return this[_0x37a49b(0x2f8)]()[_0x37a49b(0x940)](_0x29a0a4,0x0);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x923)]=function(_0x1e92c1){const _0x2f0f92=_0x518efc;let _0x32e90e=_0x2f0f92(0x923)+_0x1e92c1+'Total';if(this[_0x2f0f92(0x946)](_0x32e90e))return this[_0x2f0f92(0x5ae)][_0x32e90e];return this[_0x2f0f92(0x5ae)][_0x32e90e]=Math['round'](VisuMZ[_0x2f0f92(0x1c9)][_0x2f0f92(0x54d)][_0x2f0f92(0x224)][_0x2f0f92(0x68a)]['call'](this,_0x1e92c1)),this[_0x2f0f92(0x5ae)][_0x32e90e];},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x255)]=function(_0x33c44c){const _0x412ec3=_0x518efc,_0x172822=(_0x171f9d,_0x3e0913)=>{const _0x1bca02=_0x3995;if(!_0x3e0913)return _0x171f9d;if(_0x3e0913['note'][_0x1bca02(0x3a8)](VisuMZ[_0x1bca02(0x1c9)][_0x1bca02(0x936)][_0x1bca02(0x20f)][_0x33c44c])){var _0x11f6c5=Number(RegExp['$1'])/0x64;_0x171f9d+=_0x11f6c5;}if(_0x3e0913[_0x1bca02(0x699)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x1bca02(0x6ce)][_0x33c44c])){if(_0x1bca02(0x638)!=='JIJYx')_0x4fd69e+=_0x1bca02(0x785);else{var _0x11f6c5=Number(RegExp['$1']);_0x171f9d+=_0x11f6c5;}}if(_0x3e0913['note'][_0x1bca02(0x3a8)](VisuMZ[_0x1bca02(0x1c9)][_0x1bca02(0x936)]['xparamPlusJS'][_0x33c44c])){if(_0x1bca02(0x374)===_0x1bca02(0x374)){var _0x3be0b1=String(RegExp['$1']);try{_0x171f9d+=eval(_0x3be0b1);}catch(_0x3d4555){if($gameTemp[_0x1bca02(0x7c5)]())console[_0x1bca02(0x772)](_0x3d4555);}}else return _0x5c4e37['CoreEngine']['Game_Picture_y'][_0x1bca02(0x30d)](this);}return _0x171f9d;};return this[_0x412ec3(0x2f8)]()[_0x412ec3(0x940)](_0x172822,0x0);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x5ac)]=function(_0x48685b){const _0x42f0e7=_0x518efc,_0x30bb34=(_0x3f2979,_0x1c11e0)=>{const _0x4b50c7=_0x3995;if('AFirW'!==_0x4b50c7(0x9d4)){if(!_0x1c11e0)return _0x3f2979;if(_0x1c11e0[_0x4b50c7(0x699)]['match'](VisuMZ[_0x4b50c7(0x1c9)]['RegExp'][_0x4b50c7(0x4f1)][_0x48685b])){var _0x162a41=Number(RegExp['$1'])/0x64;_0x3f2979*=_0x162a41;}if(_0x1c11e0['note'][_0x4b50c7(0x3a8)](VisuMZ['CoreEngine'][_0x4b50c7(0x936)][_0x4b50c7(0x62e)][_0x48685b])){var _0x162a41=Number(RegExp['$1']);_0x3f2979*=_0x162a41;}if(_0x1c11e0[_0x4b50c7(0x699)]['match'](VisuMZ[_0x4b50c7(0x1c9)][_0x4b50c7(0x936)][_0x4b50c7(0x4f3)][_0x48685b])){if(_0x4b50c7(0x14b)===_0x4b50c7(0x14b)){var _0x29689f=String(RegExp['$1']);try{_0x3f2979*=eval(_0x29689f);}catch(_0x292e07){if(_0x4b50c7(0x22b)==='johux')return this[_0x4b50c7(0x268)]();else{if($gameTemp['isPlaytest']())console['log'](_0x292e07);}}}else return 0x0;}return _0x3f2979;}else 0x1-this[_0x4b50c7(0x76a)](_0x2290b8)>this['itemHit'](_0x6cd882)&&(_0x6ddaf7[_0x4b50c7(0x770)]=![],_0x5c65b1[_0x4b50c7(0x205)]=!![]);};return this[_0x42f0e7(0x2f8)]()[_0x42f0e7(0x940)](_0x30bb34,0x1);},Game_BattlerBase[_0x518efc(0xa41)]['xparamFlatBonus']=function(_0x12f3d4){const _0x3eaf7b=_0x518efc,_0x4e8416=(_0x245f54,_0x55b54f)=>{const _0x721bd4=_0x3995;if(!_0x55b54f)return _0x245f54;if(_0x55b54f[_0x721bd4(0x699)][_0x721bd4(0x3a8)](VisuMZ[_0x721bd4(0x1c9)][_0x721bd4(0x936)][_0x721bd4(0x7c2)][_0x12f3d4])){if(_0x721bd4(0x402)==='wLaLM'){var _0x203fce=Number(RegExp['$1'])/0x64;_0x245f54+=_0x203fce;}else return _0x29a61f=_0xb22632(_0x2d1eae),_0x53dc3b[_0x721bd4(0x3a8)](/#(.*)/i)?_0x721bd4(0x7bb)[_0x721bd4(0x67d)](_0xcbf921(_0x2b16a9['$1'])):this[_0x721bd4(0x6b4)](_0x24e023(_0x461639));}if(_0x55b54f['note'][_0x721bd4(0x3a8)](VisuMZ['CoreEngine'][_0x721bd4(0x936)][_0x721bd4(0xa3f)][_0x12f3d4])){var _0x203fce=Number(RegExp['$1']);_0x245f54+=_0x203fce;}if(_0x55b54f[_0x721bd4(0x699)][_0x721bd4(0x3a8)](VisuMZ[_0x721bd4(0x1c9)][_0x721bd4(0x936)][_0x721bd4(0x47c)][_0x12f3d4])){var _0x3a9545=String(RegExp['$1']);try{_0x245f54+=eval(_0x3a9545);}catch(_0x4c15fb){if(_0x721bd4(0x375)==='rncgR'){const _0x18d969=this[_0x721bd4(0x502)]();this[_0x721bd4(0x190)](_0x141512['systemColor']());const _0x15357a=_0x1026e2[_0x721bd4(0x1c9)][_0x721bd4(0x54d)]['UI']['ParamArrow'];this[_0x721bd4(0x161)](_0x15357a,_0x1d114b,_0x2fb767,_0x18d969,_0x721bd4(0x5dc));}else{if($gameTemp[_0x721bd4(0x7c5)]())console[_0x721bd4(0x772)](_0x4c15fb);}}}return _0x245f54;};return this[_0x3eaf7b(0x2f8)]()['reduce'](_0x4e8416,0x0);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x376)]=function(_0x5100b0){const _0x3f82b9=_0x518efc;let _0x4c756a=_0x3f82b9(0x376)+_0x5100b0+_0x3f82b9(0x150);if(this['checkCacheKey'](_0x4c756a))return this['_cache'][_0x4c756a];return this[_0x3f82b9(0x5ae)][_0x4c756a]=VisuMZ[_0x3f82b9(0x1c9)][_0x3f82b9(0x54d)]['Param']['XParameterFormula']['call'](this,_0x5100b0),this[_0x3f82b9(0x5ae)][_0x4c756a];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x1a07ca){const _0x279758=_0x518efc,_0x11d800=(_0x13f4df,_0x5383c2)=>{const _0x425231=_0x3995;if(!_0x5383c2)return _0x13f4df;if(_0x5383c2[_0x425231(0x699)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x425231(0x43e)][_0x1a07ca])){if(_0x425231(0x708)!=='rVwPF'){var _0x167e14=Number(RegExp['$1'])/0x64;_0x13f4df+=_0x167e14;}else this['moveCancelButtonSideButtonLayout']();}if(_0x5383c2[_0x425231(0x699)][_0x425231(0x3a8)](VisuMZ[_0x425231(0x1c9)][_0x425231(0x936)][_0x425231(0x827)][_0x1a07ca])){var _0x167e14=Number(RegExp['$1']);_0x13f4df+=_0x167e14;}if(_0x5383c2[_0x425231(0x699)][_0x425231(0x3a8)](VisuMZ[_0x425231(0x1c9)][_0x425231(0x936)][_0x425231(0x2d6)][_0x1a07ca])){var _0x1233af=String(RegExp['$1']);try{_0x13f4df+=eval(_0x1233af);}catch(_0x128f59){if($gameTemp[_0x425231(0x7c5)]())console[_0x425231(0x772)](_0x128f59);}}return _0x13f4df;};return this[_0x279758(0x2f8)]()[_0x279758(0x940)](_0x11d800,0x0);},Game_BattlerBase['prototype'][_0x518efc(0x272)]=function(_0x35517d){const _0x2690c9=_0x518efc,_0x3115d0=(_0x1e75fc,_0x4a78ab)=>{const _0x28be75=_0x3995;if(!_0x4a78ab)return _0x1e75fc;if(_0x4a78ab['note'][_0x28be75(0x3a8)](VisuMZ[_0x28be75(0x1c9)][_0x28be75(0x936)][_0x28be75(0x490)][_0x35517d])){if(_0x28be75(0x1a6)===_0x28be75(0x1a6)){var _0x2b9e6a=Number(RegExp['$1'])/0x64;_0x1e75fc*=_0x2b9e6a;}else{if(this[_0x28be75(0x76e)]===_0x5b4345)this[_0x28be75(0x8bf)]();return this[_0x28be75(0x76e)];}}if(_0x4a78ab['note'][_0x28be75(0x3a8)](VisuMZ['CoreEngine'][_0x28be75(0x936)][_0x28be75(0x8c7)][_0x35517d])){var _0x2b9e6a=Number(RegExp['$1']);_0x1e75fc*=_0x2b9e6a;}if(_0x4a78ab[_0x28be75(0x699)][_0x28be75(0x3a8)](VisuMZ[_0x28be75(0x1c9)][_0x28be75(0x936)][_0x28be75(0x360)][_0x35517d])){var _0x2e3ed9=String(RegExp['$1']);try{_0x1e75fc*=eval(_0x2e3ed9);}catch(_0x35ba74){if($gameTemp['isPlaytest']())console[_0x28be75(0x772)](_0x35ba74);}}return _0x1e75fc;};return this[_0x2690c9(0x2f8)]()[_0x2690c9(0x940)](_0x3115d0,0x1);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x965)]=function(_0x15dd4f){const _0x12d49d=_0x518efc,_0x20cd7c=(_0x1f4b86,_0x1e00f5)=>{const _0x129ded=_0x3995;if(!_0x1e00f5)return _0x1f4b86;if(_0x1e00f5[_0x129ded(0x699)][_0x129ded(0x3a8)](VisuMZ[_0x129ded(0x1c9)][_0x129ded(0x936)][_0x129ded(0x599)][_0x15dd4f])){var _0x516745=Number(RegExp['$1'])/0x64;_0x1f4b86+=_0x516745;}if(_0x1e00f5[_0x129ded(0x699)][_0x129ded(0x3a8)](VisuMZ[_0x129ded(0x1c9)][_0x129ded(0x936)][_0x129ded(0x525)][_0x15dd4f])){if(_0x129ded(0x296)===_0x129ded(0x38f)){const _0x216bba=(_0x2e7b5a[_0x129ded(0x9d9)]||'')[_0x129ded(0x7c4)]()[_0x129ded(0x445)](),_0x3fbf7d=(_0x441a35['Match']||'')[_0x129ded(0x7c4)]()['trim']();_0x5ac4e7['CoreEngine'][_0x129ded(0x369)][_0x216bba]=_0xf6d1c9,_0x579aa6[_0x129ded(0x1c9)]['ControllerMatches'][_0x3fbf7d]=_0x216bba;}else{var _0x516745=Number(RegExp['$1']);_0x1f4b86+=_0x516745;}}if(_0x1e00f5[_0x129ded(0x699)][_0x129ded(0x3a8)](VisuMZ['CoreEngine'][_0x129ded(0x936)][_0x129ded(0x3f1)][_0x15dd4f])){var _0x440c77=String(RegExp['$1']);try{_0x1f4b86+=eval(_0x440c77);}catch(_0x322404){if(_0x129ded(0x630)===_0x129ded(0x630)){if($gameTemp[_0x129ded(0x7c5)]())console[_0x129ded(0x772)](_0x322404);}else{if(!this[_0x129ded(0x412)])return;for(const _0x2a56c4 of this[_0x129ded(0x412)]){_0x2a56c4&&_0x2a56c4[_0x129ded(0x4ba)]();}}}}return _0x1f4b86;};return this['traitObjects']()[_0x12d49d(0x940)](_0x20cd7c,0x0);},Game_BattlerBase[_0x518efc(0xa41)][_0x518efc(0x534)]=function(_0x27668a){const _0x5efc52=_0x518efc;let _0x335b55='sparam'+_0x27668a+_0x5efc52(0x150);if(this['checkCacheKey'](_0x335b55))return this[_0x5efc52(0x5ae)][_0x335b55];return this[_0x5efc52(0x5ae)][_0x335b55]=VisuMZ['CoreEngine'][_0x5efc52(0x54d)][_0x5efc52(0x224)]['SParameterFormula'][_0x5efc52(0x30d)](this,_0x27668a),this[_0x5efc52(0x5ae)][_0x335b55];},Game_BattlerBase['prototype'][_0x518efc(0x8d1)]=function(_0x2c7d28,_0x50aa87){const _0x5e7c39=_0x518efc;if(typeof paramId===_0x5e7c39(0x593))return this[_0x5e7c39(0x923)](_0x2c7d28);_0x2c7d28=String(_0x2c7d28||'')[_0x5e7c39(0x1fa)]();if(_0x2c7d28===_0x5e7c39(0x167))return this[_0x5e7c39(0x923)](0x0);if(_0x2c7d28===_0x5e7c39(0x914))return this['param'](0x1);if(_0x2c7d28===_0x5e7c39(0x97b))return this[_0x5e7c39(0x923)](0x2);if(_0x2c7d28===_0x5e7c39(0x3f5))return this[_0x5e7c39(0x923)](0x3);if(_0x2c7d28===_0x5e7c39(0x7d5))return this['param'](0x4);if(_0x2c7d28==='MDF')return this[_0x5e7c39(0x923)](0x5);if(_0x2c7d28===_0x5e7c39(0x909))return this['param'](0x6);if(_0x2c7d28==='LUK')return this[_0x5e7c39(0x923)](0x7);if(_0x2c7d28===_0x5e7c39(0x344))return _0x50aa87?String(Math['round'](this[_0x5e7c39(0x376)](0x0)*0x64))+'%':this['xparam'](0x0);if(_0x2c7d28===_0x5e7c39(0x726))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x2c7d28===_0x5e7c39(0x3c3))return _0x50aa87?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x2c7d28===_0x5e7c39(0x338))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x3)*0x64))+'%':this['xparam'](0x3);if(_0x2c7d28===_0x5e7c39(0x6f2))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x4)*0x64))+'%':this[_0x5e7c39(0x376)](0x4);if(_0x2c7d28==='MRF')return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x2c7d28===_0x5e7c39(0x69d))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this['xparam'](0x6)*0x64))+'%':this[_0x5e7c39(0x376)](0x6);if(_0x2c7d28===_0x5e7c39(0x63c))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x7)*0x64))+'%':this[_0x5e7c39(0x376)](0x7);if(_0x2c7d28===_0x5e7c39(0x8c6))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x8)*0x64))+'%':this[_0x5e7c39(0x376)](0x8);if(_0x2c7d28===_0x5e7c39(0x9a8))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x376)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x2c7d28===_0x5e7c39(0x7f5))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x534)](0x0)*0x64))+'%':this[_0x5e7c39(0x534)](0x0);if(_0x2c7d28===_0x5e7c39(0x5cd))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this['sparam'](0x1)*0x64))+'%':this[_0x5e7c39(0x534)](0x1);if(_0x2c7d28==='REC')return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this['sparam'](0x2)*0x64))+'%':this[_0x5e7c39(0x534)](0x2);if(_0x2c7d28===_0x5e7c39(0x7f3))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x534)](0x3)*0x64))+'%':this[_0x5e7c39(0x534)](0x3);if(_0x2c7d28==='MCR')return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x534)](0x4)*0x64))+'%':this[_0x5e7c39(0x534)](0x4);if(_0x2c7d28===_0x5e7c39(0x37f))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this['sparam'](0x5)*0x64))+'%':this[_0x5e7c39(0x534)](0x5);if(_0x2c7d28===_0x5e7c39(0x999))return _0x50aa87?String(Math['round'](this[_0x5e7c39(0x534)](0x6)*0x64))+'%':this[_0x5e7c39(0x534)](0x6);if(_0x2c7d28===_0x5e7c39(0x313))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x534)](0x7)*0x64))+'%':this['sparam'](0x7);if(_0x2c7d28===_0x5e7c39(0x7e4))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this[_0x5e7c39(0x534)](0x8)*0x64))+'%':this[_0x5e7c39(0x534)](0x8);if(_0x2c7d28===_0x5e7c39(0x5df))return _0x50aa87?String(Math[_0x5e7c39(0x38c)](this['sparam'](0x9)*0x64))+'%':this['sparam'](0x9);if(VisuMZ[_0x5e7c39(0x1c9)][_0x5e7c39(0x506)][_0x2c7d28]){if(_0x5e7c39(0x5aa)!==_0x5e7c39(0x5aa)){const _0x1b5885=_0x272c5f[_0x5e7c39(0x328)]();this[_0x5e7c39(0x45b)]=_0x36589d['randomInt'](_0x1b5885)+_0x578230[_0x5e7c39(0x4ab)](_0x1b5885)+this[_0x5e7c39(0x457)]();}else{const _0x14b655=VisuMZ['CoreEngine'][_0x5e7c39(0x506)][_0x2c7d28],_0x1bd885=this[_0x14b655];return VisuMZ[_0x5e7c39(0x1c9)][_0x5e7c39(0x9cf)][_0x2c7d28]===_0x5e7c39(0x5de)?_0x5e7c39(0x58c)!==_0x5e7c39(0x58c)?this[_0x5e7c39(0x9ba)]['shift']():_0x1bd885:_0x50aa87?String(Math['round'](_0x1bd885*0x64))+'%':_0x1bd885;}}return'';},Game_BattlerBase['prototype'][_0x518efc(0x1b6)]=function(){const _0x31dc06=_0x518efc;return this['isAlive']()&&this['_hp']<this[_0x31dc06(0x70a)]*VisuMZ[_0x31dc06(0x1c9)][_0x31dc06(0x54d)][_0x31dc06(0x224)]['CrisisRate'];},Game_Battler[_0x518efc(0xa41)][_0x518efc(0x600)]=function(){const _0x5848f5=_0x518efc;SoundManager['playMiss'](),this[_0x5848f5(0x164)]('evade');},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x62d)]=Game_Actor['prototype'][_0x518efc(0x574)],Game_Actor[_0x518efc(0xa41)][_0x518efc(0x574)]=function(_0x33d4e1){const _0x25c370=_0x518efc;if(this['level']>0x63)return this[_0x25c370(0x60b)](_0x33d4e1);return VisuMZ[_0x25c370(0x1c9)][_0x25c370(0x62d)][_0x25c370(0x30d)](this,_0x33d4e1);},Game_Actor[_0x518efc(0xa41)][_0x518efc(0x60b)]=function(_0x3277b5){const _0xe23f40=_0x518efc,_0x1a8f9f=this[_0xe23f40(0x7b4)]()['params'][_0x3277b5][0x63],_0x391e98=this[_0xe23f40(0x7b4)]()[_0xe23f40(0x46e)][_0x3277b5][0x62];return _0x1a8f9f+(_0x1a8f9f-_0x391e98)*(this[_0xe23f40(0x807)]-0x63);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5dd)]=Game_Actor[_0x518efc(0xa41)][_0x518efc(0x707)],Game_Actor[_0x518efc(0xa41)][_0x518efc(0x707)]=function(_0x262374,_0x389df1){const _0x393b72=_0x518efc;$gameTemp[_0x393b72(0x8ad)]=!![],VisuMZ['CoreEngine']['Game_Actor_changeClass'][_0x393b72(0x30d)](this,_0x262374,_0x389df1),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0xa0d)]=Game_Actor[_0x518efc(0xa41)][_0x518efc(0x215)],Game_Actor[_0x518efc(0xa41)][_0x518efc(0x215)]=function(){const _0x235887=_0x518efc;VisuMZ[_0x235887(0x1c9)][_0x235887(0xa0d)][_0x235887(0x30d)](this);if(!$gameTemp['_changingClass'])this['levelUpRecovery']();},Game_Actor['prototype'][_0x518efc(0x66f)]=function(){const _0x2a6e6f=_0x518efc;this[_0x2a6e6f(0x5ae)]={};if(VisuMZ[_0x2a6e6f(0x1c9)][_0x2a6e6f(0x54d)][_0x2a6e6f(0x927)][_0x2a6e6f(0x5d7)])this[_0x2a6e6f(0xa58)]=this[_0x2a6e6f(0x70a)];if(VisuMZ[_0x2a6e6f(0x1c9)][_0x2a6e6f(0x54d)][_0x2a6e6f(0x927)][_0x2a6e6f(0x36f)])this['_mp']=this[_0x2a6e6f(0x365)];},Game_Actor['prototype'][_0x518efc(0xa32)]=function(){const _0x418be2=_0x518efc;if(this[_0x418be2(0x974)]())return 0x1;const _0x299c59=this[_0x418be2(0x98f)]()-this['currentLevelExp'](),_0x2b135b=this[_0x418be2(0xa2b)]()-this[_0x418be2(0x373)]();return(_0x2b135b/_0x299c59)[_0x418be2(0x22e)](0x0,0x1);},Game_Actor[_0x518efc(0xa41)][_0x518efc(0x2f8)]=function(){const _0x569305=_0x518efc,_0x570fd9=Game_Battler[_0x569305(0xa41)][_0x569305(0x2f8)][_0x569305(0x30d)](this);for(const _0x3b894c of this[_0x569305(0x4f8)]()){_0x3b894c&&_0x570fd9[_0x569305(0x609)](_0x3b894c);}return _0x570fd9[_0x569305(0x609)](this['currentClass'](),this[_0x569305(0x454)]()),_0x570fd9;},Object[_0x518efc(0x3fc)](Game_Enemy[_0x518efc(0xa41)],'level',{'get':function(){const _0x496ea2=_0x518efc;return this[_0x496ea2(0x2c0)]();},'configurable':!![]}),Game_Enemy['prototype'][_0x518efc(0x2c0)]=function(){const _0x349789=_0x518efc;return this[_0x349789(0x9af)]()[_0x349789(0x807)];},Game_Enemy[_0x518efc(0xa41)][_0x518efc(0x409)]=function(){const _0x31c0e4=_0x518efc;if(!this['_repositioned']){this[_0x31c0e4(0x2e0)]+=Math[_0x31c0e4(0x38c)]((Graphics[_0x31c0e4(0x622)]-0x270)/0x2),this[_0x31c0e4(0x2e0)]-=Math['floor']((Graphics[_0x31c0e4(0x622)]-Graphics[_0x31c0e4(0x5bf)])/0x2);if($gameSystem[_0x31c0e4(0x49e)]()){if(_0x31c0e4(0x6f5)==='AsulN')switch(_0x222ecb[_0x31c0e4(0x1c9)]['Settings'][_0x31c0e4(0x927)]['AutoStretch']){case _0x31c0e4(0x40e):return!![];case'normal':return![];default:return _0x2db939[_0x31c0e4(0x1c9)][_0x31c0e4(0x624)][_0x31c0e4(0x30d)](this);}else this[_0x31c0e4(0x9b8)]-=Math[_0x31c0e4(0x25f)]((Graphics['width']-Graphics['boxWidth'])/0x2);}else this[_0x31c0e4(0x9b8)]+=Math[_0x31c0e4(0x38c)]((Graphics[_0x31c0e4(0x3cf)]-0x330)/0x2);}this[_0x31c0e4(0x4a1)]=!![];},Game_Party[_0x518efc(0xa41)][_0x518efc(0x594)]=function(){const _0x5093e5=_0x518efc;return VisuMZ[_0x5093e5(0x1c9)][_0x5093e5(0x54d)]['Gold'][_0x5093e5(0x37e)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x19f)]=Game_Party[_0x518efc(0xa41)]['consumeItem'],Game_Party[_0x518efc(0xa41)][_0x518efc(0x8f1)]=function(_0x2d77fb){const _0x1b9120=_0x518efc;if(VisuMZ['CoreEngine'][_0x1b9120(0x54d)][_0x1b9120(0x927)]['KeyItemProtect']&&DataManager[_0x1b9120(0x986)](_0x2d77fb))return;VisuMZ['CoreEngine'][_0x1b9120(0x19f)]['call'](this,_0x2d77fb);},Game_Party[_0x518efc(0xa41)][_0x518efc(0x8f4)]=function(){const _0x50435c=_0x518efc,_0x413154=VisuMZ[_0x50435c(0x1c9)][_0x50435c(0x54d)][_0x50435c(0x927)],_0x1f383d=_0x413154[_0x50435c(0x608)]??0x63;let _0x1d0185=[];(_0x413154[_0x50435c(0x173)]??!![])&&(_0x1d0185=_0x1d0185[_0x50435c(0x3d8)]($dataItems));(_0x413154['BTestWeapons']??!![])&&(_0x50435c(0x353)!==_0x50435c(0x6ab)?_0x1d0185=_0x1d0185[_0x50435c(0x3d8)]($dataWeapons):(_0x39cb52['CoreEngine']['Bitmap_clearRect'][_0x50435c(0x30d)](this,_0x39520d,_0x58c171,_0x57057b,_0x5ab283),this[_0x50435c(0x889)]()));(_0x413154[_0x50435c(0xa36)]??!![])&&(_0x1d0185=_0x1d0185[_0x50435c(0x3d8)]($dataArmors));for(const _0x276f54 of _0x1d0185){if(!_0x276f54)continue;if(_0x276f54[_0x50435c(0x864)][_0x50435c(0x445)]()<=0x0)continue;if(_0x276f54[_0x50435c(0x864)][_0x50435c(0x3a8)](/-----/i))continue;this[_0x50435c(0x8ee)](_0x276f54,_0x1f383d);}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop[_0x518efc(0xa41)][_0x518efc(0x500)],Game_Troop[_0x518efc(0xa41)][_0x518efc(0x500)]=function(_0x3bad0b){const _0x1fdf7a=_0x518efc;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x3bad0b),VisuMZ[_0x1fdf7a(0x1c9)][_0x1fdf7a(0x640)][_0x1fdf7a(0x30d)](this,_0x3bad0b);},VisuMZ[_0x518efc(0x1c9)]['Game_Map_setup']=Game_Map[_0x518efc(0xa41)][_0x518efc(0x500)],Game_Map[_0x518efc(0xa41)][_0x518efc(0x500)]=function(_0x2d882b){const _0x4d8629=_0x518efc;VisuMZ['CoreEngine'][_0x4d8629(0x6de)]['call'](this,_0x2d882b),this['checkCoreEngineDisplayCenter'](),this[_0x4d8629(0x8bf)](_0x2d882b);},Game_Map['prototype'][_0x518efc(0x8bf)]=function(){const _0x45d47d=_0x518efc;this[_0x45d47d(0x76e)]=VisuMZ[_0x45d47d(0x1c9)][_0x45d47d(0x54d)][_0x45d47d(0x927)]['NoTileShadows']||![];const _0x5cf0d6=VisuMZ[_0x45d47d(0x1c9)][_0x45d47d(0x54d)]['ScreenResolution'],_0x30fdce=$dataMap?$dataMap[_0x45d47d(0x699)]||'':'';if(_0x30fdce[_0x45d47d(0x3a8)](/<SHOW TILE SHADOWS>/i))this[_0x45d47d(0x76e)]=![];else _0x30fdce[_0x45d47d(0x3a8)](/<HIDE TILE SHADOWS>/i)&&(this[_0x45d47d(0x76e)]=!![]);if(_0x30fdce[_0x45d47d(0x3a8)](/<SCROLL LOCK X>/i)){if('rmsIl'===_0x45d47d(0x64d))this[_0x45d47d(0x3e5)]()[_0x45d47d(0x20b)]=!![],this[_0x45d47d(0x3e5)]()[_0x45d47d(0x824)]=_0x5cf0d6[_0x45d47d(0x2c9)];else{if(!this['needsUpdate']())return;this[_0x45d47d(0x5b5)]();}}else _0x30fdce['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x45d47d(0x3e5)]()[_0x45d47d(0x20b)]=!![],this['centerCameraCheckData']()[_0x45d47d(0x824)]=Number(RegExp['$1']));if(_0x30fdce['match'](/<SCROLL LOCK Y>/i))this[_0x45d47d(0x3e5)]()[_0x45d47d(0x7ac)]=!![],this['centerCameraCheckData']()[_0x45d47d(0x6b9)]=_0x5cf0d6[_0x45d47d(0x848)];else _0x30fdce[_0x45d47d(0x3a8)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x45d47d(0x3e5)]()[_0x45d47d(0x7ac)]=!![],this[_0x45d47d(0x3e5)]()[_0x45d47d(0x6b9)]=Number(RegExp['$1']));},Game_Map['prototype'][_0x518efc(0x648)]=function(){const _0x4d3e20=_0x518efc;if(this[_0x4d3e20(0x76e)]===undefined)this[_0x4d3e20(0x8bf)]();return this[_0x4d3e20(0x76e)];},Game_Map[_0x518efc(0xa41)]['checkCoreEngineDisplayCenter']=function(){const _0x5deaff=_0x518efc,_0x46bff1=VisuMZ[_0x5deaff(0x1c9)][_0x5deaff(0x54d)][_0x5deaff(0x4b6)];this[_0x5deaff(0xa62)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x46bff1['AutoScrollLockX']){if(_0x5deaff(0x39f)==='BvxFw'){const _0x4a425d=Graphics[_0x5deaff(0x217)]/this[_0x5deaff(0x6ba)]();if(_0x4a425d%0x1!==0x0&&Math[_0x5deaff(0x972)](_0x4a425d)===this['width']()&&!this[_0x5deaff(0x4f9)]()){if(_0x5deaff(0x389)!==_0x5deaff(0x389))return _0xbca55a['CoreEngine']['Settings'][_0x5deaff(0x90f)]['ItemPadding'];else this[_0x5deaff(0xa62)][_0x5deaff(0x20b)]=!![],this[_0x5deaff(0xa62)][_0x5deaff(0x824)]=_0x46bff1[_0x5deaff(0x2c9)]||0x0;}}else{const _0x16296b=_0x1c9f30[_0x5deaff(0x18c)];for(let _0x514bf3=0x1;_0x514bf3<=0x5;_0x514bf3++){if(this[_0x5deaff(0x5fd)][_0x5deaff(0x42e)['format'](_0x514bf3)]!==_0x16296b[_0x5deaff(0x948)['format'](_0x514bf3)]())return this[_0x5deaff(0x5b5)]();if(this[_0x5deaff(0x5fd)]['text%1'[_0x5deaff(0x67d)](_0x514bf3)]!==_0x16296b[_0x5deaff(0x462)[_0x5deaff(0x67d)](_0x514bf3)]())return this[_0x5deaff(0x5b5)]();}}}if(_0x46bff1['AutoScrollLockY']){const _0x48ed68=Graphics[_0x5deaff(0x622)]/this['tileHeight']();_0x48ed68%0x1!==0x0&&Math['ceil'](_0x48ed68)===this[_0x5deaff(0x622)]()&&!this[_0x5deaff(0x191)]()&&(this['_centerCameraCheck'][_0x5deaff(0x7ac)]=!![],this['_centerCameraCheck'][_0x5deaff(0x6b9)]=_0x46bff1[_0x5deaff(0x848)]||0x0);}$gameScreen[_0x5deaff(0x4c8)]()===0x1&&(_0x5deaff(0x886)!==_0x5deaff(0x886)?_0x2ab0d3[_0x5deaff(0x7ad)]()||this[_0x5deaff(0x401)]?this['hideButtonFromView']():_0x108cdd[_0x5deaff(0x1c9)][_0x5deaff(0x835)][_0x5deaff(0x30d)](this):(this[_0x5deaff(0x3e5)]()[_0x5deaff(0x20b)]&&(this[_0x5deaff(0x722)]=this[_0x5deaff(0x3e5)]()[_0x5deaff(0x824)]),this[_0x5deaff(0x3e5)]()[_0x5deaff(0x7ac)]&&(this[_0x5deaff(0x474)]=this[_0x5deaff(0x3e5)]()[_0x5deaff(0x6b9)])));},VisuMZ[_0x518efc(0x1c9)]['Game_Map_setDisplayPos']=Game_Map[_0x518efc(0xa41)]['setDisplayPos'],Game_Map[_0x518efc(0xa41)][_0x518efc(0x732)]=function(_0x572b39,_0x29ba59){const _0x587361=_0x518efc;VisuMZ[_0x587361(0x1c9)][_0x587361(0x6c5)][_0x587361(0x30d)](this,_0x572b39,_0x29ba59),$gameScreen['zoomScale']()===0x1&&(!this[_0x587361(0x4f9)]()&&this[_0x587361(0x3e5)]()['centerX']&&(this[_0x587361(0x722)]=this[_0x587361(0x3e5)]()[_0x587361(0x824)]),!this[_0x587361(0x191)]()&&this[_0x587361(0x3e5)]()['centerY']&&(this[_0x587361(0x474)]=this[_0x587361(0x3e5)]()[_0x587361(0x6b9)]));},Game_Map[_0x518efc(0xa41)][_0x518efc(0x3e5)]=function(){const _0x35ec0d=_0x518efc;if(this[_0x35ec0d(0xa62)]===undefined)this[_0x35ec0d(0x8f7)]();return this[_0x35ec0d(0xa62)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x29d)]=Game_Map[_0x518efc(0xa41)][_0x518efc(0x5db)],Game_Map['prototype']['scrollDown']=function(_0x5054fe){const _0x2b23a8=_0x518efc;if(this[_0x2b23a8(0x3e5)]()[_0x2b23a8(0x7ac)]&&$gameScreen[_0x2b23a8(0x4c8)]()===0x1){this[_0x2b23a8(0x474)]=this[_0x2b23a8(0x3e5)]()[_0x2b23a8(0x6b9)];return;}VisuMZ['CoreEngine']['Game_Map_scrollDown'][_0x2b23a8(0x30d)](this,_0x5054fe);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x7ff)]=Game_Map[_0x518efc(0xa41)][_0x518efc(0x738)],Game_Map['prototype'][_0x518efc(0x738)]=function(_0x486a44){const _0x39a490=_0x518efc;if(this[_0x39a490(0x3e5)]()['centerX']&&$gameScreen[_0x39a490(0x4c8)]()===0x1){this[_0x39a490(0x722)]=this[_0x39a490(0x3e5)]()[_0x39a490(0x824)];return;}VisuMZ[_0x39a490(0x1c9)][_0x39a490(0x7ff)][_0x39a490(0x30d)](this,_0x486a44);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x906)]=Game_Map[_0x518efc(0xa41)][_0x518efc(0x651)],Game_Map[_0x518efc(0xa41)][_0x518efc(0x651)]=function(_0x387f41){const _0x9f9ec0=_0x518efc;if(this[_0x9f9ec0(0x3e5)]()['centerX']&&$gameScreen[_0x9f9ec0(0x4c8)]()===0x1){this['_displayX']=this[_0x9f9ec0(0x3e5)]()[_0x9f9ec0(0x824)];return;}VisuMZ['CoreEngine'][_0x9f9ec0(0x906)][_0x9f9ec0(0x30d)](this,_0x387f41);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x9d6)]=Game_Map[_0x518efc(0xa41)]['scrollUp'],Game_Map['prototype'][_0x518efc(0x61c)]=function(_0x2308f7){const _0x2c8366=_0x518efc;if(this[_0x2c8366(0x3e5)]()[_0x2c8366(0x7ac)]&&$gameScreen[_0x2c8366(0x4c8)]()===0x1){this[_0x2c8366(0x474)]=this[_0x2c8366(0x3e5)]()[_0x2c8366(0x6b9)];return;}VisuMZ[_0x2c8366(0x1c9)][_0x2c8366(0x9d6)][_0x2c8366(0x30d)](this,_0x2308f7);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x90c)]=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x518efc(0xa41)]['processMoveCommand']=function(_0x322d16){const _0x4e2d8a=_0x518efc;try{VisuMZ[_0x4e2d8a(0x1c9)][_0x4e2d8a(0x90c)][_0x4e2d8a(0x30d)](this,_0x322d16);}catch(_0x13e0ff){if($gameTemp[_0x4e2d8a(0x7c5)]())console[_0x4e2d8a(0x772)](_0x13e0ff);}},Game_Player['prototype'][_0x518efc(0x760)]=function(){const _0x29e3e9=_0x518efc,_0x15b4e8=$gameMap[_0x29e3e9(0x328)]();this['_encounterCount']=Math[_0x29e3e9(0x4ab)](_0x15b4e8)+Math[_0x29e3e9(0x4ab)](_0x15b4e8)+this[_0x29e3e9(0x457)]();},Game_Player[_0x518efc(0xa41)][_0x518efc(0x457)]=function(){const _0x443be2=_0x518efc;return $dataMap&&$dataMap[_0x443be2(0x699)]&&$dataMap['note']['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ['CoreEngine'][_0x443be2(0x54d)][_0x443be2(0x927)]['EncounterRateMinimum'];},VisuMZ[_0x518efc(0x1c9)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x518efc(0xa41)][_0x518efc(0x46c)],Game_Event[_0x518efc(0xa41)][_0x518efc(0x46c)]=function(_0x26e6b8,_0x464b2e){const _0x57a78f=_0x518efc;return this[_0x57a78f(0x16f)]()?this['checkSmartEventCollision'](_0x26e6b8,_0x464b2e):VisuMZ[_0x57a78f(0x1c9)][_0x57a78f(0x371)][_0x57a78f(0x30d)](this,_0x26e6b8,_0x464b2e);},Game_Event[_0x518efc(0xa41)][_0x518efc(0x16f)]=function(){const _0x3a8474=_0x518efc;return VisuMZ[_0x3a8474(0x1c9)]['Settings'][_0x3a8474(0x927)][_0x3a8474(0x443)];},Game_Event[_0x518efc(0xa41)][_0x518efc(0x5d3)]=function(_0x234345,_0x4c1d35){const _0x4996c4=_0x518efc;if(!this[_0x4996c4(0x7ab)]())return![];else{const _0x350891=$gameMap[_0x4996c4(0x852)](_0x234345,_0x4c1d35)[_0x4996c4(0x1cd)](_0x3c0bcd=>_0x3c0bcd[_0x4996c4(0x7ab)]());return _0x350891[_0x4996c4(0x18d)]>0x0;}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x8b1)]=Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x40f)],Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x40f)]=function(_0x5d4750){const _0xfe09c4=_0x518efc,_0x58b343=this[_0xfe09c4(0x183)]();if(_0x58b343[_0xfe09c4(0x3a8)](/\/\/[ ]SCRIPT[ ]CALL/i)){if(_0xfe09c4(0x497)===_0xfe09c4(0x497))return this[_0xfe09c4(0x515)](_0x58b343);else _0x265298[_0xfe09c4(0x1c9)][_0xfe09c4(0x6fd)]['call'](this),this[_0xfe09c4(0x79c)]();}else return VisuMZ['CoreEngine'][_0xfe09c4(0x8b1)][_0xfe09c4(0x30d)](this,_0x5d4750);},Game_Interpreter['prototype'][_0x518efc(0x183)]=function(){const _0x36f6d4=_0x518efc;let _0x11bc59='',_0x3f74bc=this[_0x36f6d4(0x581)]+0x1;while(this[_0x36f6d4(0x37c)][_0x3f74bc]&&this[_0x36f6d4(0x37c)][_0x3f74bc]['code']===0x195){_0x11bc59+=this[_0x36f6d4(0x37c)][_0x3f74bc][_0x36f6d4(0x554)][0x0]+'\x0a',_0x3f74bc++;}return _0x11bc59;},Game_Interpreter['prototype'][_0x518efc(0x515)]=function(_0x2c1268){const _0x5da58f=_0x518efc;try{if('TQypq'!=='TQypq'){if(!this[_0x5da58f(0x36d)]())return this['helpAreaBottom']();else return this[_0x5da58f(0x2a5)]()&&this['getButtonAssistLocation']()===_0x5da58f(0x773)?_0x4c842e[_0x5da58f(0xa41)][_0x5da58f(0x669)]():0x0;}else eval(_0x2c1268);}catch(_0x4708fd){if($gameTemp[_0x5da58f(0x7c5)]()){if('YQTeh'==='YQTeh')console[_0x5da58f(0x772)](_0x5da58f(0x32a)),console[_0x5da58f(0x772)](_0x4708fd);else return this[_0x5da58f(0x5b5)]();}}return!![];},VisuMZ['CoreEngine'][_0x518efc(0x963)]=Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x5c7)],Game_Interpreter['prototype']['command111']=function(_0x28735c){const _0xb3620d=_0x518efc;try{VisuMZ[_0xb3620d(0x1c9)][_0xb3620d(0x963)][_0xb3620d(0x30d)](this,_0x28735c);}catch(_0x8703e8){if($gameTemp[_0xb3620d(0x7c5)]()){if('RJorf'!==_0xb3620d(0xa50))console['log']('Conditional\x20Branch\x20Script\x20Error'),console[_0xb3620d(0x772)](_0x8703e8);else return _0x134909[_0xb3620d(0x587)]['GoldRect']['call'](this);}this['skipBranch']();}return!![];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x499)]=Game_Interpreter[_0x518efc(0xa41)]['command122'],Game_Interpreter[_0x518efc(0xa41)]['command122']=function(_0x23e8c6){const _0x274ff1=_0x518efc;try{if(_0x274ff1(0x3d6)===_0x274ff1(0x903))return _0x1f3200[_0x274ff1(0x587)]['StatusRect'][_0x274ff1(0x30d)](this);else VisuMZ[_0x274ff1(0x1c9)][_0x274ff1(0x499)][_0x274ff1(0x30d)](this,_0x23e8c6);}catch(_0x3c48da){if(_0x274ff1(0x7d8)==='QrzoW'){if($gameTemp[_0x274ff1(0x7c5)]()){if(_0x274ff1(0x905)===_0x274ff1(0x4a6)){var _0x5b40a0=_0x2a303c(_0x1f13c6['$1'])/0x64;_0x3d7c6e+=_0x5b40a0;}else console[_0x274ff1(0x772)](_0x274ff1(0x691)),console[_0x274ff1(0x772)](_0x3c48da);}}else return this[_0x274ff1(0x16f)]()?this['checkSmartEventCollision'](_0x2353bb,_0x18fa27):_0x61388f[_0x274ff1(0x1c9)][_0x274ff1(0x371)]['call'](this,_0x3dc720,_0xd13349);}return!![];},VisuMZ[_0x518efc(0x1c9)]['Game_Interpreter_command355']=Game_Interpreter['prototype'][_0x518efc(0x69a)],Game_Interpreter[_0x518efc(0xa41)]['command355']=function(){const _0x1ef228=_0x518efc;try{VisuMZ[_0x1ef228(0x1c9)]['Game_Interpreter_command355']['call'](this);}catch(_0x2f1137){if(_0x1ef228(0x6ff)===_0x1ef228(0x6ff)){if($gameTemp[_0x1ef228(0x7c5)]()){if(_0x1ef228(0x68e)!==_0x1ef228(0x68e))return _0x49cb83((_0x3a1408*0x64)[_0x1ef228(0x3a2)](_0x5d0f1e))+'%';else console[_0x1ef228(0x772)]('Script\x20Call\x20Error'),console[_0x1ef228(0x772)](_0x2f1137);}}else return this['_lastOrigin']!==_0x4f562d['_origin']||this[_0x1ef228(0x803)]!==_0x4a0b9c['_x']||this['_lastY']!==_0x2c16c2['_y'];}return!![];},VisuMZ['CoreEngine'][_0x518efc(0x83f)]=Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x567)],Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x567)]=function(_0x46d939){const _0x2eef0c=_0x518efc;return $gameTemp[_0x2eef0c(0x846)](this),VisuMZ[_0x2eef0c(0x1c9)][_0x2eef0c(0x83f)]['call'](this,_0x46d939);},Scene_Base[_0x518efc(0xa41)]['fadeSpeed']=function(){const _0x3326aa=_0x518efc;return VisuMZ[_0x3326aa(0x1c9)][_0x3326aa(0x54d)]['UI']['FadeSpeed'];},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x36d)]=function(){const _0x5a6b07=_0x518efc;return VisuMZ[_0x5a6b07(0x1c9)][_0x5a6b07(0x54d)]['UI']['BottomHelp'];},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x2cc)]=function(){const _0x39768f=_0x518efc;return VisuMZ[_0x39768f(0x1c9)][_0x39768f(0x54d)]['UI'][_0x39768f(0x666)];},Scene_Base['prototype'][_0x518efc(0x57f)]=function(){const _0x2c75ec=_0x518efc;return VisuMZ[_0x2c75ec(0x1c9)][_0x2c75ec(0x54d)]['UI'][_0x2c75ec(0x9da)];},Scene_Base[_0x518efc(0xa41)]['mainCommandWidth']=function(){return VisuMZ['CoreEngine']['Settings']['UI']['CommandWidth'];},Scene_Base['prototype']['buttonAreaHeight']=function(){const _0x37f808=_0x518efc;return VisuMZ['CoreEngine']['Settings']['UI'][_0x37f808(0x9c0)];},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x6a8)]=function(){const _0x497828=_0x518efc;return VisuMZ[_0x497828(0x1c9)][_0x497828(0x54d)][_0x497828(0x90f)][_0x497828(0x8e6)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x86c)]=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0x518efc(0xa41)][_0x518efc(0x88d)]=function(){const _0x3f2dac=_0x518efc;VisuMZ[_0x3f2dac(0x1c9)][_0x3f2dac(0x86c)][_0x3f2dac(0x30d)](this),this[_0x3f2dac(0x8e5)](),this[_0x3f2dac(0x38a)](),this[_0x3f2dac(0x93f)]['x']=Math[_0x3f2dac(0x38c)](this['_windowLayer']['x']),this['_windowLayer']['y']=Math[_0x3f2dac(0x38c)](this[_0x3f2dac(0x93f)]['y']);},Scene_Base[_0x518efc(0xa41)]['createButtonAssistWindow']=function(){},Scene_Base['prototype'][_0x518efc(0x38a)]=function(){const _0x7eb750=_0x518efc;this[_0x7eb750(0x8a9)]=new Window_TextPopup(),this[_0x7eb750(0x1f4)](this['_textPopupWindow']);},$textPopup=function(_0x1f5320){const _0x7aca=_0x518efc,_0x5bb046=SceneManager[_0x7aca(0x18c)]['_textPopupWindow'];if(_0x5bb046){if(_0x7aca(0x7d3)!==_0x7aca(0x7d3))return _0x554a52[_0x7aca(0x1c9)][_0x7aca(0x74c)][_0x3e073a]||0x0;else _0x5bb046[_0x7aca(0x597)](_0x1f5320);}},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x868)]=function(){const _0x4df69d=_0x518efc;return TextManager[_0x4df69d(0x933)](_0x4df69d(0x277),'pagedown');},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x64a)]=function(){const _0x4bb7ab=_0x518efc;return TextManager[_0x4bb7ab(0x976)](_0x4bb7ab(0x149));},Scene_Base['prototype'][_0x518efc(0x210)]=function(){const _0xcfb3eb=_0x518efc;return TextManager[_0xcfb3eb(0x976)](_0xcfb3eb(0x91d));},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x516)]=function(){const _0x40bf01=_0x518efc;return TextManager[_0x40bf01(0x976)]('ok');},Scene_Base['prototype'][_0x518efc(0x2ce)]=function(){const _0x490da0=_0x518efc;return TextManager[_0x490da0(0x976)](_0x490da0(0xa39));},Scene_Base['prototype'][_0x518efc(0x7bc)]=function(){const _0x4ba858=_0x518efc;return this[_0x4ba858(0x4cb)]&&this[_0x4ba858(0x4cb)][_0x4ba858(0x596)]?TextManager[_0x4ba858(0x799)]:'';},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x204)]=function(){return'';},Scene_Base[_0x518efc(0xa41)]['buttonAssistText3']=function(){return'';},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x27f)]=function(){const _0x3a747a=_0x518efc;return TextManager[_0x3a747a(0x7b7)];},Scene_Base['prototype']['buttonAssistText5']=function(){const _0x2c1096=_0x518efc;return TextManager[_0x2c1096(0x3d4)];},Scene_Base['prototype']['buttonAssistOffset1']=function(){return 0x0;},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x8e0)]=function(){return 0x0;},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x975)]=function(){return 0x0;},Scene_Base['prototype'][_0x518efc(0x9fb)]=function(){return 0x0;},Scene_Base[_0x518efc(0xa41)][_0x518efc(0x219)]=function(){return 0x0;},VisuMZ[_0x518efc(0x1c9)]['Scene_Boot_loadSystemImages']=Scene_Boot['prototype']['loadSystemImages'],Scene_Boot[_0x518efc(0xa41)]['loadSystemImages']=function(){const _0x2c399b=_0x518efc;VisuMZ[_0x2c399b(0x1c9)][_0x2c399b(0x580)][_0x2c399b(0x30d)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x518efc(0xa41)]['loadGameImagesCoreEngine']=function(){const _0x35313d=_0x518efc,_0x59ae25=[_0x35313d(0x469),'battlebacks1',_0x35313d(0x7b9),_0x35313d(0x425),'enemies','faces',_0x35313d(0x4b2),_0x35313d(0x186),_0x35313d(0x817),_0x35313d(0x473),_0x35313d(0x991),'tilesets','titles1',_0x35313d(0x2ae)];for(const _0x42f872 of _0x59ae25){const _0x1f289f=VisuMZ[_0x35313d(0x1c9)][_0x35313d(0x54d)][_0x35313d(0x5ec)][_0x42f872],_0x2bc8ee=_0x35313d(0x30a)[_0x35313d(0x67d)](_0x42f872);for(const _0xa16237 of _0x1f289f){ImageManager[_0x35313d(0x74b)](_0x2bc8ee,_0xa16237);}}},VisuMZ['CoreEngine'][_0x518efc(0x539)]=Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x9a1)],Scene_Boot['prototype'][_0x518efc(0x9a1)]=function(){const _0x1c6d95=_0x518efc;if(Utils[_0x1c6d95(0x7ee)]('test')&&VisuMZ[_0x1c6d95(0x1c9)][_0x1c6d95(0x54d)]['QoL'][_0x1c6d95(0x307)])this['startAutoNewGame']();else{if(_0x1c6d95(0x410)!==_0x1c6d95(0x782))VisuMZ['CoreEngine'][_0x1c6d95(0x539)][_0x1c6d95(0x30d)](this);else return _0x3d1d84[_0x1c6d95(0x7b7)];}},Scene_Boot['prototype'][_0x518efc(0x3f3)]=function(){const _0x1c473c=_0x518efc;this[_0x1c473c(0x82c)](),DataManager[_0x1c473c(0x3d7)](),SceneManager[_0x1c473c(0x990)](Scene_Map);},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0xa29)]=function(){const _0x3a95dd=_0x518efc,_0x1ba3ff=$dataSystem['advanced'][_0x3a95dd(0x676)],_0x154d4e=$dataSystem[_0x3a95dd(0xa5d)][_0x3a95dd(0x729)],_0x34e1a1=VisuMZ[_0x3a95dd(0x1c9)][_0x3a95dd(0x54d)]['UI'][_0x3a95dd(0x888)];Graphics[_0x3a95dd(0x3cf)]=_0x1ba3ff-_0x34e1a1*0x2,Graphics[_0x3a95dd(0x5bf)]=_0x154d4e-_0x34e1a1*0x2,this[_0x3a95dd(0x859)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x876)]=Scene_Boot['prototype'][_0x518efc(0x235)],Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x235)]=function(){const _0x1a1fe0=_0x518efc;this['isFullDocumentTitle']()?this['makeDocumentTitle']():_0x1a1fe0(0x677)!=='Szvro'?VisuMZ[_0x1a1fe0(0x1c9)]['Scene_Boot_updateDocumentTitle'][_0x1a1fe0(0x30d)](this):this[_0x1a1fe0(0x159)]();},Scene_Boot[_0x518efc(0xa41)][_0x518efc(0x86d)]=function(){const _0x7bc3c2=_0x518efc;if(Scene_Title[_0x7bc3c2(0x493)]==='')return![];if(Scene_Title['subtitle']===_0x7bc3c2(0x6bd))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0x7bc3c2(0x326)]==='0.00')return![];return!![];},Scene_Boot[_0x518efc(0xa41)]['makeDocumentTitle']=function(){const _0x36a2df=_0x518efc,_0x576ed6=$dataSystem[_0x36a2df(0x220)],_0x2b6169=Scene_Title[_0x36a2df(0x493)]||'',_0x5490c0=Scene_Title['version']||'',_0x47d5ea=VisuMZ[_0x36a2df(0x1c9)][_0x36a2df(0x54d)]['MenuLayout'][_0x36a2df(0x54c)]['DocumentTitleFmt'],_0x2b3800=_0x47d5ea['format'](_0x576ed6,_0x2b6169,_0x5490c0);document['title']=_0x2b3800;},Scene_Boot['prototype'][_0x518efc(0x859)]=function(){const _0x19a625=_0x518efc;if(VisuMZ[_0x19a625(0x1c9)]['Settings']['UI'][_0x19a625(0x7ef)]){const _0x37d8e5=Graphics[_0x19a625(0x217)]-Graphics['boxWidth']-VisuMZ[_0x19a625(0x1c9)][_0x19a625(0x54d)]['UI'][_0x19a625(0x888)]*0x2,_0x5dc9fd=Sprite_Button[_0x19a625(0xa41)]['blockWidth']['call'](this)*0x4;if(_0x37d8e5>=_0x5dc9fd)SceneManager[_0x19a625(0x922)](!![]);}},Scene_Title[_0x518efc(0x493)]=VisuMZ['CoreEngine'][_0x518efc(0x54d)][_0x518efc(0x68b)][_0x518efc(0x54c)][_0x518efc(0x6bd)],Scene_Title[_0x518efc(0x326)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x54c)][_0x518efc(0x1b9)],Scene_Title[_0x518efc(0xa07)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x678)],VisuMZ['CoreEngine'][_0x518efc(0x97c)]=Scene_Title[_0x518efc(0xa41)][_0x518efc(0x96a)],Scene_Title['prototype'][_0x518efc(0x96a)]=function(){const _0x2e3a20=_0x518efc;VisuMZ[_0x2e3a20(0x1c9)][_0x2e3a20(0x54d)][_0x2e3a20(0x68b)][_0x2e3a20(0x54c)]['drawGameTitle'][_0x2e3a20(0x30d)](this);if(Scene_Title[_0x2e3a20(0x493)]!==''&&Scene_Title['subtitle']!==_0x2e3a20(0x6bd))this[_0x2e3a20(0x8e9)]();if(Scene_Title[_0x2e3a20(0x326)]!==''&&Scene_Title[_0x2e3a20(0x326)]!==_0x2e3a20(0x82d))this[_0x2e3a20(0x519)]();},Scene_Title[_0x518efc(0xa41)][_0x518efc(0x8e9)]=function(){const _0xd494cc=_0x518efc;VisuMZ[_0xd494cc(0x1c9)][_0xd494cc(0x54d)][_0xd494cc(0x68b)][_0xd494cc(0x54c)][_0xd494cc(0x8e9)][_0xd494cc(0x30d)](this);},Scene_Title[_0x518efc(0xa41)][_0x518efc(0x519)]=function(){const _0x3f3c9c=_0x518efc;VisuMZ['CoreEngine'][_0x3f3c9c(0x54d)][_0x3f3c9c(0x68b)]['Title'][_0x3f3c9c(0x519)]['call'](this);},Scene_Title[_0x518efc(0xa41)][_0x518efc(0xa5a)]=function(){const _0x7dc49=_0x518efc;this[_0x7dc49(0x501)]();const _0x61cac=$dataSystem[_0x7dc49(0x24a)][_0x7dc49(0x688)],_0x5f0cb9=this[_0x7dc49(0x329)]();this[_0x7dc49(0x318)]=new Window_TitleCommand(_0x5f0cb9),this['_commandWindow'][_0x7dc49(0x19d)](_0x61cac);const _0x1b3fa7=this[_0x7dc49(0x329)]();this[_0x7dc49(0x318)][_0x7dc49(0x6f0)](_0x1b3fa7['x'],_0x1b3fa7['y'],_0x1b3fa7[_0x7dc49(0x217)],_0x1b3fa7[_0x7dc49(0x622)]),this[_0x7dc49(0x318)][_0x7dc49(0x2d0)](),this[_0x7dc49(0x318)][_0x7dc49(0x5b5)](),this['_commandWindow'][_0x7dc49(0x4ac)](),this[_0x7dc49(0x6d2)](this[_0x7dc49(0x318)]);},Scene_Title['prototype'][_0x518efc(0x736)]=function(){const _0xb5a8c1=_0x518efc;return this[_0xb5a8c1(0x318)]?this[_0xb5a8c1(0x318)]['maxItems']():VisuMZ['CoreEngine'][_0xb5a8c1(0x54d)][_0xb5a8c1(0x17b)][_0xb5a8c1(0x18d)];},Scene_Title['prototype'][_0x518efc(0x329)]=function(){const _0x4371d9=_0x518efc;return VisuMZ[_0x4371d9(0x1c9)][_0x4371d9(0x54d)][_0x4371d9(0x68b)][_0x4371d9(0x54c)][_0x4371d9(0x48b)][_0x4371d9(0x30d)](this);},Scene_Title[_0x518efc(0xa41)][_0x518efc(0x501)]=function(){const _0x34180e=_0x518efc;for(const _0x44c914 of Scene_Title[_0x34180e(0xa07)]){const _0x1b7212=new Sprite_TitlePictureButton(_0x44c914);this[_0x34180e(0x1f4)](_0x1b7212);}},VisuMZ['CoreEngine'][_0x518efc(0x60e)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x55e)],Scene_Map['prototype'][_0x518efc(0x55e)]=function(){const _0x1f93b4=_0x518efc;VisuMZ[_0x1f93b4(0x1c9)]['Scene_Map_initialize'][_0x1f93b4(0x30d)](this),$gameTemp[_0x1f93b4(0x1aa)](),this['clearOnceParallelInterpreters']();},VisuMZ['CoreEngine'][_0x518efc(0x3a5)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x589)],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x589)]=function(){const _0x5493bb=_0x518efc;VisuMZ[_0x5493bb(0x1c9)][_0x5493bb(0x3a5)][_0x5493bb(0x30d)](this),$gameTemp[_0x5493bb(0x419)]&&!$gameMessage[_0x5493bb(0x2b3)]()&&(this[_0x5493bb(0x16d)](),SceneManager[_0x5493bb(0x9b0)]());},Scene_Map[_0x518efc(0xa41)][_0x518efc(0x41b)]=function(){const _0x48e395=_0x518efc;Scene_Message[_0x48e395(0xa41)][_0x48e395(0x41b)][_0x48e395(0x30d)](this),!SceneManager[_0x48e395(0x8af)](Scene_Battle)&&(this['_spriteset'][_0x48e395(0x4ba)](),this[_0x48e395(0x815)][_0x48e395(0x232)](),this[_0x48e395(0x93f)][_0x48e395(0x596)]=![],SceneManager[_0x48e395(0x9fc)]()),$gameScreen[_0x48e395(0x92d)](),this['clearOnceParallelInterpreters']();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x7b2)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x9b1)],Scene_Map['prototype'][_0x518efc(0x9b1)]=function(){const _0x49ff44=_0x518efc;VisuMZ[_0x49ff44(0x1c9)][_0x49ff44(0x7b2)]['call'](this),SceneManager[_0x49ff44(0x3c8)]()&&(_0x49ff44(0x28a)!=='eJeYU'?(_0x1af80c[_0x49ff44(0x9f5)]=!![],_0x16929f[_0x49ff44(0x3b4)]()):this['moveMenuButtonSideButtonLayout']());},Scene_Map[_0x518efc(0xa41)][_0x518efc(0x9ee)]=function(){const _0x25992c=_0x518efc;this[_0x25992c(0x440)]['x']=Graphics[_0x25992c(0x3cf)]+0x4;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x9e1)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x25e)],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x25e)]=function(){const _0x58b8ff=_0x518efc;VisuMZ[_0x58b8ff(0x1c9)][_0x58b8ff(0x9e1)][_0x58b8ff(0x30d)](this),this[_0x58b8ff(0xa1c)]();},Scene_Map[_0x518efc(0xa41)][_0x518efc(0xa1c)]=function(){const _0x2afb88=_0x518efc;Input[_0x2afb88(0x702)](_0x2afb88(0x451))&&(_0x2afb88(0x476)==='huzLy'?this[_0x2afb88(0x161)](_0x11adf2,_0x6c0acc,_0x264189,_0x4821f8):(ConfigManager[_0x2afb88(0x449)]=!ConfigManager['alwaysDash'],ConfigManager[_0x2afb88(0x911)]()));},VisuMZ[_0x518efc(0x1c9)]['Scene_Map_updateMain']=Scene_Map[_0x518efc(0xa41)]['updateMain'],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x16d)]=function(){const _0x347bae=_0x518efc;VisuMZ[_0x347bae(0x1c9)][_0x347bae(0x6bb)][_0x347bae(0x30d)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x518efc(0xa41)]['clearOnceParallelInterpreters']=function(){this['_onceParallelInterpreters']=[];},Scene_Map[_0x518efc(0xa41)][_0x518efc(0x9ed)]=function(){const _0x3ddaeb=_0x518efc;if(!this[_0x3ddaeb(0x412)])return;for(const _0x251473 of this[_0x3ddaeb(0x412)]){if(_0x251473){if(_0x3ddaeb(0x9f2)!==_0x3ddaeb(0x9f2))return this['buttonAssistWindowSideRect']();else _0x251473[_0x3ddaeb(0x4ba)]();}}},Scene_Map[_0x518efc(0xa41)][_0x518efc(0x1dd)]=function(_0x2c2795,_0x376d2b){const _0x2b4b32=_0x518efc,_0x53f769=$dataCommonEvents[_0x2c2795];if(!_0x53f769)return;const _0x178b4b=new Game_OnceParallelInterpreter();this[_0x2b4b32(0x193)](_0x178b4b),_0x178b4b[_0x2b4b32(0x686)](_0x2c2795),_0x178b4b[_0x2b4b32(0x514)](_0x376d2b);},Scene_Map[_0x518efc(0xa41)][_0x518efc(0x193)]=function(_0x35388f){const _0x4cacdc=_0x518efc;this[_0x4cacdc(0x412)]=this[_0x4cacdc(0x412)]||[],this[_0x4cacdc(0x412)][_0x4cacdc(0x609)](_0x35388f);},Scene_Map['prototype'][_0x518efc(0x429)]=function(_0x1f3daf){const _0xf29c77=_0x518efc;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0xf29c77(0x412)][_0xf29c77(0x3ac)](_0x1f3daf);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x518efc(0xa41)]=Object['create'](Game_Interpreter[_0x518efc(0xa41)]),Game_OnceParallelInterpreter[_0x518efc(0xa41)][_0x518efc(0x60a)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x518efc(0xa41)][_0x518efc(0x686)]=function(_0x24c044){const _0x1c3483=_0x518efc,_0x513c57=$dataCommonEvents[_0x24c044];_0x513c57?this['setup'](_0x513c57[_0x1c3483(0xa48)],0x0):this[_0x1c3483(0x41b)]();},Game_OnceParallelInterpreter[_0x518efc(0xa41)][_0x518efc(0x514)]=function(_0x154967){const _0x316826=_0x518efc;this[_0x316826(0x778)]=_0x154967||0x0;},Game_OnceParallelInterpreter['prototype'][_0x518efc(0x41b)]=function(){const _0x4f59ce=_0x518efc;if(!SceneManager['isSceneMap']())return;SceneManager[_0x4f59ce(0x18c)][_0x4f59ce(0x429)](this),Game_Interpreter[_0x4f59ce(0xa41)][_0x4f59ce(0x41b)][_0x4f59ce(0x30d)](this);},VisuMZ[_0x518efc(0x1c9)]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase['prototype']['helpAreaTop'],Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x524)]=function(){const _0x135470=_0x518efc;let _0x3c0b22=0x0;return SceneManager[_0x135470(0x3f6)]()?_0x3c0b22=this[_0x135470(0x4e4)]():_0x3c0b22=VisuMZ[_0x135470(0x1c9)][_0x135470(0x464)][_0x135470(0x30d)](this),_0x3c0b22;},Scene_MenuBase['prototype']['helpAreaTopSideButtonLayout']=function(){const _0x518d60=_0x518efc;return this[_0x518d60(0x36d)]()?this['mainAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x518efc(0x8b7)]=Scene_MenuBase['prototype']['mainAreaTop'],Scene_MenuBase['prototype'][_0x518efc(0x73b)]=function(){const _0x116531=_0x518efc;if(SceneManager[_0x116531(0x3f6)]())return this[_0x116531(0x282)]();else{if('thtYN'!=='thtYN')_0x25ab22[_0x116531(0x7df)][_0x116531(0x426)](_0x1ff6fe);else return VisuMZ['CoreEngine'][_0x116531(0x8b7)][_0x116531(0x30d)](this);}},Scene_MenuBase['prototype'][_0x518efc(0x282)]=function(){const _0x7ef8de=_0x518efc;if(!this[_0x7ef8de(0x36d)]()){if(_0x7ef8de(0x42f)!==_0x7ef8de(0x5c1))return this[_0x7ef8de(0x5ca)]();else _0x30049b[_0x7ef8de(0x99c)]&&_0x1d0272[_0x7ef8de(0x99c)]();}else return this[_0x7ef8de(0x2a5)]()&&this[_0x7ef8de(0x9f9)]()===_0x7ef8de(0x773)?'IKFCC'!==_0x7ef8de(0x2bd)?_0x3e6a02[_0x7ef8de(0x1c9)][_0x7ef8de(0x54d)][_0x7ef8de(0x68b)]['Title'][_0x7ef8de(0x48b)][_0x7ef8de(0x30d)](this):Window_ButtonAssist[_0x7ef8de(0xa41)]['lineHeight']():0x0;},VisuMZ[_0x518efc(0x1c9)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x518efc(0xa41)]['mainAreaHeight'],Scene_MenuBase['prototype'][_0x518efc(0x687)]=function(){const _0x1473eb=_0x518efc;let _0xf26f29=0x0;if(SceneManager[_0x1473eb(0x3f6)]()){if(_0x1473eb(0x7db)!=='Owhob')_0xf26f29=this[_0x1473eb(0x880)]();else return _0x1473eb(0x4fc);}else _0xf26f29=VisuMZ[_0x1473eb(0x1c9)][_0x1473eb(0x49d)][_0x1473eb(0x30d)](this);return this[_0x1473eb(0x2a5)]()&&this[_0x1473eb(0x9f9)]()!==_0x1473eb(0x740)&&('hxMSL'!==_0x1473eb(0x34c)?_0xf26f29-=Window_ButtonAssist[_0x1473eb(0xa41)][_0x1473eb(0x669)]():this[_0x1473eb(0xa15)]()?this[_0x1473eb(0x7ca)](_0x6d456d):_0x2dc7f9[_0x1473eb(0x1c9)]['Sprite_Animation_setViewport'][_0x1473eb(0x30d)](this,_0xc9ade3)),_0xf26f29;},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x880)]=function(){const _0x33fb05=_0x518efc;return Graphics['boxHeight']-this[_0x33fb05(0x781)]();},VisuMZ[_0x518efc(0x1c9)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x5f4)],Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x5f4)]=function(){const _0x518b13=_0x518efc,_0x13224d=VisuMZ[_0x518b13(0x1c9)][_0x518b13(0x54d)][_0x518b13(0x898)][_0x518b13(0x1fe)]??0x8;this[_0x518b13(0x98e)]=new PIXI[(_0x518b13(0x6dd))]['BlurFilter'](_0x13224d),this[_0x518b13(0x767)]=new Sprite(),this[_0x518b13(0x767)][_0x518b13(0x463)]=SceneManager[_0x518b13(0x2cb)](),this[_0x518b13(0x767)][_0x518b13(0x6dd)]=[this['_backgroundFilter']],this[_0x518b13(0x1f4)](this['_backgroundSprite']),this[_0x518b13(0x754)](0xc0),this[_0x518b13(0x754)](this[_0x518b13(0x351)]()),this[_0x518b13(0x555)]();},Scene_MenuBase['prototype'][_0x518efc(0x351)]=function(){const _0xe24f52=_0x518efc,_0x531738=String(this[_0xe24f52(0x60a)][_0xe24f52(0x864)]),_0x172ac1=this[_0xe24f52(0x188)](_0x531738);if(_0x172ac1)return _0x172ac1['SnapshotOpacity'];else{if(_0xe24f52(0x310)!=='JOrKf')return 0xc0;else this[_0xe24f52(0x6d1)]();}},Scene_MenuBase['prototype'][_0x518efc(0x555)]=function(){const _0x45ffd2=_0x518efc,_0x57199d=String(this[_0x45ffd2(0x60a)][_0x45ffd2(0x864)]),_0x383926=this['getCustomBackgroundSettings'](_0x57199d);_0x383926&&(_0x383926[_0x45ffd2(0x407)]!==''||_0x383926['BgFilename2']!=='')&&(_0x45ffd2(0x2a6)!=='fElDU'?(this[_0x45ffd2(0x865)]=new Sprite(ImageManager[_0x45ffd2(0x22a)](_0x383926[_0x45ffd2(0x407)])),this[_0x45ffd2(0x252)]=new Sprite(ImageManager[_0x45ffd2(0xa55)](_0x383926['BgFilename2'])),this[_0x45ffd2(0x1f4)](this['_backSprite1']),this[_0x45ffd2(0x1f4)](this['_backSprite2']),this[_0x45ffd2(0x865)][_0x45ffd2(0x463)]['addLoadListener'](this[_0x45ffd2(0x874)][_0x45ffd2(0x670)](this,this[_0x45ffd2(0x865)])),this[_0x45ffd2(0x252)][_0x45ffd2(0x463)][_0x45ffd2(0x82f)](this[_0x45ffd2(0x874)]['bind'](this,this['_backSprite2']))):(this['refresh'](),_0x4233c7[_0x45ffd2(0x962)](),this[_0x45ffd2(0x81d)]===_0x45ffd2(0x592)?this[_0x45ffd2(0x261)](0x0):this['select'](-0x1)));},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x188)]=function(_0x1307fb){const _0x46a686=_0x518efc;return VisuMZ[_0x46a686(0x1c9)][_0x46a686(0x54d)][_0x46a686(0x898)][_0x1307fb]||VisuMZ[_0x46a686(0x1c9)][_0x46a686(0x54d)][_0x46a686(0x898)][_0x46a686(0x2d9)];},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x874)]=function(_0x584fc8){this['scaleSprite'](_0x584fc8),this['centerSprite'](_0x584fc8);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5a0)]=Scene_MenuBase['prototype'][_0x518efc(0x6ed)],Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x6ed)]=function(){const _0x5dab47=_0x518efc;VisuMZ[_0x5dab47(0x1c9)][_0x5dab47(0x5a0)][_0x5dab47(0x30d)](this),SceneManager[_0x5dab47(0x3c8)]()&&(_0x5dab47(0x723)!==_0x5dab47(0x723)?(this['endBattlerActions'](this[_0x5dab47(0x39d)]),this[_0x5dab47(0x39d)]=null):this[_0x5dab47(0xa04)]());},Scene_MenuBase['prototype'][_0x518efc(0xa04)]=function(){const _0x3cddc4=_0x518efc;this[_0x3cddc4(0x949)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x518efc(0x17a)]=Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x3c0)],Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x3c0)]=function(){const _0x4a3544=_0x518efc;VisuMZ[_0x4a3544(0x1c9)][_0x4a3544(0x17a)][_0x4a3544(0x30d)](this),SceneManager['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x67a)]=function(){const _0xcc502d=_0x518efc;this[_0xcc502d(0x4cb)]['x']=-0x1*(this[_0xcc502d(0x4cb)][_0xcc502d(0x217)]+this[_0xcc502d(0x3a6)][_0xcc502d(0x217)]+0x8),this[_0xcc502d(0x3a6)]['x']=-0x1*(this[_0xcc502d(0x3a6)][_0xcc502d(0x217)]+0x4);},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x2a5)]=function(){const _0x3185ce=_0x518efc;return VisuMZ[_0x3185ce(0x1c9)][_0x3185ce(0x54d)]['ButtonAssist'][_0x3185ce(0x24f)];},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x9f9)]=function(){const _0x2c739a=_0x518efc;if(SceneManager[_0x2c739a(0x3c8)]()||SceneManager[_0x2c739a(0x7ad)]())return VisuMZ[_0x2c739a(0x1c9)][_0x2c739a(0x54d)][_0x2c739a(0x8be)][_0x2c739a(0x942)];else{if(_0x2c739a(0x260)!==_0x2c739a(0x240))return _0x2c739a(0x740);else _0x20a902['CoreEngine'][_0x2c739a(0x381)][_0x2c739a(0x30d)](this),this[_0x2c739a(0x95c)](),this[_0x2c739a(0x8b9)](!![]),this[_0x2c739a(0x8b9)](![]);}},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x8e5)]=function(){const _0x5219eb=_0x518efc;if(!this[_0x5219eb(0x2a5)]())return;const _0x1130e6=this[_0x5219eb(0x74f)]();this[_0x5219eb(0x28b)]=new Window_ButtonAssist(_0x1130e6),this[_0x5219eb(0x6d2)](this['_buttonAssistWindow']);},Scene_MenuBase['prototype'][_0x518efc(0x74f)]=function(){const _0x532295=_0x518efc;if(this[_0x532295(0x9f9)]()===_0x532295(0x740)){if('xEJUf'===_0x532295(0x7fa))return this[_0x532295(0x268)]();else _0xc28359[_0x532295(0x4ba)]();}else{if(_0x532295(0x3e1)==='RFWbP')return this[_0x532295(0x4c4)]();else{_0x494437[_0x532295(0x1da)](_0x1b0975,_0x545754);const _0x4b6844=_0x444537[_0x532295(0x47f)];_0x52e97b[_0x532295(0x503)](_0x4b6844);}}},Scene_MenuBase[_0x518efc(0xa41)][_0x518efc(0x268)]=function(){const _0x5a6c1a=_0x518efc,_0x2ea97b=ConfigManager[_0x5a6c1a(0x331)]?(Sprite_Button[_0x5a6c1a(0xa41)]['blockWidth']()+0x6)*0x2:0x0,_0xbd6985=this['buttonY'](),_0x316c9d=Graphics['boxWidth']-_0x2ea97b*0x2,_0x1fbb69=this['buttonAreaHeight']();return new Rectangle(_0x2ea97b,_0xbd6985,_0x316c9d,_0x1fbb69);},Scene_MenuBase[_0x518efc(0xa41)]['buttonAssistWindowSideRect']=function(){const _0x19b3c8=_0x518efc,_0x3a2817=Graphics['boxWidth'],_0x470cdb=Window_ButtonAssist[_0x19b3c8(0xa41)][_0x19b3c8(0x669)](),_0x1b8c3e=0x0;let _0x20e30d=0x0;return this[_0x19b3c8(0x9f9)]()===_0x19b3c8(0x773)?_0x19b3c8(0x894)==='LTShx'?_0x20e30d=0x0:_0x16ddf3[_0x19b3c8(0x177)](_0x19b3c8(0x91d))&&this[_0x19b3c8(0x13f)]()?this[_0x19b3c8(0x8e4)]():this['cursorUp'](_0x5b135d[_0x19b3c8(0x702)]('up')):_0x19b3c8(0x2e7)!==_0x19b3c8(0xa12)?_0x20e30d=Graphics[_0x19b3c8(0x5bf)]-_0x470cdb:(_0x8d3b63+=_0x1ada89(_0x18fba5['$1']),_0x5bc8c4+=_0x3a9829(_0x3409de['$2'])),new Rectangle(_0x1b8c3e,_0x20e30d,_0x3a2817,_0x470cdb);},Scene_Menu[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)]['Settings'][_0x518efc(0x68b)][_0x518efc(0x1eb)],VisuMZ[_0x518efc(0x1c9)]['Scene_Menu_create']=Scene_Menu['prototype'][_0x518efc(0x869)],Scene_Menu['prototype'][_0x518efc(0x869)]=function(){const _0x115dc3=_0x518efc;VisuMZ[_0x115dc3(0x1c9)][_0x115dc3(0x820)]['call'](this),this[_0x115dc3(0x79c)]();},Scene_Menu[_0x518efc(0xa41)][_0x518efc(0x79c)]=function(){const _0x3cc6b4=_0x518efc;this[_0x3cc6b4(0x318)]&&this[_0x3cc6b4(0x318)][_0x3cc6b4(0x19d)](Scene_Menu[_0x3cc6b4(0x587)]['CommandBgType']);if(this[_0x3cc6b4(0x825)]){if(_0x3cc6b4(0x5a3)===_0x3cc6b4(0x5a3))this[_0x3cc6b4(0x825)][_0x3cc6b4(0x19d)](Scene_Menu[_0x3cc6b4(0x587)][_0x3cc6b4(0x9ce)]);else{if(!_0xd3ce14)return;if(!_0x7bbfc1[_0x3cc6b4(0x2e5)]())return;const _0x262c69=0x80,_0x5363c7=_0x5be179[_0x3cc6b4(0xa32)]();let _0x1e4d6b=_0x57aa31[_0x3cc6b4(0x931)](),_0xd94d5b=_0x21eb48[_0x3cc6b4(0x860)]();_0x5363c7>=0x1&&(_0x1e4d6b=_0x47fcef[_0x3cc6b4(0x920)](),_0xd94d5b=_0xc9fb6c[_0x3cc6b4(0x316)]()),this[_0x3cc6b4(0x6b7)](_0x300424,_0x538131,_0x262c69,_0x5363c7,_0x1e4d6b,_0xd94d5b);}}this[_0x3cc6b4(0x40d)]&&this[_0x3cc6b4(0x40d)][_0x3cc6b4(0x19d)](Scene_Menu[_0x3cc6b4(0x587)][_0x3cc6b4(0x342)]);},Scene_Menu['prototype'][_0x518efc(0x329)]=function(){const _0x52869a=_0x518efc;return Scene_Menu[_0x52869a(0x587)]['CommandRect'][_0x52869a(0x30d)](this);},Scene_Menu[_0x518efc(0xa41)]['goldWindowRect']=function(){const _0x480255=_0x518efc;return Scene_Menu[_0x480255(0x587)][_0x480255(0x33b)][_0x480255(0x30d)](this);},Scene_Menu[_0x518efc(0xa41)][_0x518efc(0x24c)]=function(){const _0x289d92=_0x518efc;return Scene_Menu['layoutSettings'][_0x289d92(0x3f9)]['call'](this);},Scene_Item['layoutSettings']=VisuMZ[_0x518efc(0x1c9)]['Settings'][_0x518efc(0x68b)]['ItemMenu'],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x6fd)]=Scene_Item[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Item[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x433320=_0x518efc;VisuMZ[_0x433320(0x1c9)][_0x433320(0x6fd)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Item[_0x518efc(0xa41)][_0x518efc(0x79c)]=function(){const _0x52a74b=_0x518efc;if(this[_0x52a74b(0x348)]){if(_0x52a74b(0x2a0)!==_0x52a74b(0x2a0))return this[_0x52a74b(0x5b5)]();else this[_0x52a74b(0x348)][_0x52a74b(0x19d)](Scene_Item[_0x52a74b(0x587)][_0x52a74b(0x247)]);}if(this['_categoryWindow']){if(_0x52a74b(0x4e7)!==_0x52a74b(0x4e7)){const _0x255614=_0xc5013a['CoreEngine'][_0x52a74b(0x506)][_0x46043d],_0x463a72=this[_0x255614];return _0x19944f[_0x52a74b(0x1c9)][_0x52a74b(0x9cf)][_0x351fc1]===_0x52a74b(0x5de)?_0x463a72:_0x447b0b?_0x33146e(_0x221239[_0x52a74b(0x38c)](_0x463a72*0x64))+'%':_0x463a72;}else this[_0x52a74b(0x733)]['setBackgroundType'](Scene_Item[_0x52a74b(0x587)][_0x52a74b(0x99d)]);}this[_0x52a74b(0x2eb)]&&this[_0x52a74b(0x2eb)][_0x52a74b(0x19d)](Scene_Item[_0x52a74b(0x587)][_0x52a74b(0x6c8)]),this[_0x52a74b(0x77e)]&&this[_0x52a74b(0x77e)][_0x52a74b(0x19d)](Scene_Item[_0x52a74b(0x587)]['ActorBgType']);},Scene_Item[_0x518efc(0xa41)][_0x518efc(0x377)]=function(){const _0x3bfbb3=_0x518efc;return Scene_Item[_0x3bfbb3(0x587)]['HelpRect'][_0x3bfbb3(0x30d)](this);},Scene_Item[_0x518efc(0xa41)][_0x518efc(0x6ea)]=function(){const _0x31b312=_0x518efc;return Scene_Item[_0x31b312(0x587)]['CategoryRect']['call'](this);},Scene_Item[_0x518efc(0xa41)][_0x518efc(0x564)]=function(){const _0xc62ced=_0x518efc;return Scene_Item[_0xc62ced(0x587)][_0xc62ced(0x175)][_0xc62ced(0x30d)](this);},Scene_Item[_0x518efc(0xa41)][_0x518efc(0x861)]=function(){const _0x2cfc50=_0x518efc;return Scene_Item[_0x2cfc50(0x587)][_0x2cfc50(0x5ed)][_0x2cfc50(0x30d)](this);},Scene_Skill[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x814)],VisuMZ['CoreEngine'][_0x518efc(0xa6c)]=Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x2da68c=_0x518efc;VisuMZ['CoreEngine'][_0x2da68c(0xa6c)][_0x2da68c(0x30d)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x79c)]=function(){const _0x418441=_0x518efc;this[_0x418441(0x348)]&&this[_0x418441(0x348)][_0x418441(0x19d)](Scene_Skill[_0x418441(0x587)]['HelpBgType']);if(this[_0x418441(0x4cc)]){if(_0x418441(0x3c2)!==_0x418441(0x45a))this['_skillTypeWindow'][_0x418441(0x19d)](Scene_Skill[_0x418441(0x587)][_0x418441(0x93c)]);else{_0x1efaaa[_0x418441(0x962)]();if(!_0x2d4d65[_0x418441(0x834)]()){const _0x456fd1=_0x410d4b['open'](_0x113c9f,'_blank');}else{const _0x170d57=_0x3997c0[_0x418441(0x95e)]==_0x418441(0x590)?_0x418441(0x67c):_0x11f243[_0x418441(0x95e)]=='win32'?'start':_0x418441(0x3b9);_0x25ec18(_0x418441(0x166))[_0x418441(0x385)](_0x170d57+'\x20'+_0x46a2ba);}}}this[_0x418441(0x40d)]&&this['_statusWindow'][_0x418441(0x19d)](Scene_Skill[_0x418441(0x587)][_0x418441(0x342)]),this[_0x418441(0x2eb)]&&this[_0x418441(0x2eb)][_0x418441(0x19d)](Scene_Skill[_0x418441(0x587)][_0x418441(0x6c8)]),this['_actorWindow']&&this[_0x418441(0x77e)][_0x418441(0x19d)](Scene_Skill[_0x418441(0x587)][_0x418441(0x87d)]);},Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x377)]=function(){const _0x168e13=_0x518efc;return Scene_Skill[_0x168e13(0x587)][_0x168e13(0x54e)]['call'](this);},Scene_Skill['prototype'][_0x518efc(0xa17)]=function(){const _0x31ca07=_0x518efc;return Scene_Skill[_0x31ca07(0x587)]['SkillTypeRect'][_0x31ca07(0x30d)](this);},Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x24c)]=function(){const _0x37733c=_0x518efc;return Scene_Skill[_0x37733c(0x587)][_0x37733c(0x3f9)]['call'](this);},Scene_Skill[_0x518efc(0xa41)][_0x518efc(0x564)]=function(){const _0xae09f9=_0x518efc;return Scene_Skill['layoutSettings']['ItemRect'][_0xae09f9(0x30d)](this);},Scene_Skill[_0x518efc(0xa41)]['actorWindowRect']=function(){const _0x5df8df=_0x518efc;return Scene_Skill[_0x5df8df(0x587)][_0x5df8df(0x5ed)][_0x5df8df(0x30d)](this);},Scene_Equip[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x265)],VisuMZ['CoreEngine'][_0x518efc(0xa24)]=Scene_Equip['prototype'][_0x518efc(0x869)],Scene_Equip[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x55fcd4=_0x518efc;VisuMZ[_0x55fcd4(0x1c9)][_0x55fcd4(0xa24)][_0x55fcd4(0x30d)](this),this[_0x55fcd4(0x79c)]();},Scene_Equip['prototype'][_0x518efc(0x79c)]=function(){const _0x1ba21b=_0x518efc;this['_helpWindow']&&this[_0x1ba21b(0x348)][_0x1ba21b(0x19d)](Scene_Equip[_0x1ba21b(0x587)][_0x1ba21b(0x247)]);this[_0x1ba21b(0x40d)]&&this[_0x1ba21b(0x40d)][_0x1ba21b(0x19d)](Scene_Equip[_0x1ba21b(0x587)][_0x1ba21b(0x342)]);if(this['_commandWindow']){if(_0x1ba21b(0x800)!==_0x1ba21b(0x88f))this[_0x1ba21b(0x318)][_0x1ba21b(0x19d)](Scene_Equip['layoutSettings']['CommandBgType']);else return _0x3635e6[_0x1ba21b(0x1c9)][_0x1ba21b(0x54d)]['QoL'][_0x1ba21b(0x31e)]?0x0:_0xe1b38b[_0x1ba21b(0x1c9)]['Game_Action_itemEva'][_0x1ba21b(0x30d)](this,_0x2ce360);}this[_0x1ba21b(0x1f0)]&&this[_0x1ba21b(0x1f0)][_0x1ba21b(0x19d)](Scene_Equip[_0x1ba21b(0x587)][_0x1ba21b(0x67e)]);if(this[_0x1ba21b(0x2eb)]){if(_0x1ba21b(0x926)!==_0x1ba21b(0x926)){const _0x3b9ac8=_0x3a8506[_0x1ba21b(0x1c9)][_0x1ba21b(0x54d)][_0x1ba21b(0x4b6)];if(!_0x3b9ac8)return![];if(_0x1b36c3[_0x1ba21b(0x636)]>=_0x1ba21b(0x683)&&!_0x3b9ac8[_0x1ba21b(0x757)])return![];return _0x3b9ac8['RepositionEnemies'];}else this['_itemWindow']['setBackgroundType'](Scene_Equip[_0x1ba21b(0x587)][_0x1ba21b(0x6c8)]);}},Scene_Equip[_0x518efc(0xa41)][_0x518efc(0x377)]=function(){const _0x30a170=_0x518efc;return Scene_Equip[_0x30a170(0x587)]['HelpRect'][_0x30a170(0x30d)](this);},Scene_Equip[_0x518efc(0xa41)][_0x518efc(0x24c)]=function(){const _0xd1b5c1=_0x518efc;return Scene_Equip[_0xd1b5c1(0x587)][_0xd1b5c1(0x3f9)][_0xd1b5c1(0x30d)](this);},Scene_Equip[_0x518efc(0xa41)]['commandWindowRect']=function(){const _0x70cc58=_0x518efc;return Scene_Equip[_0x70cc58(0x587)][_0x70cc58(0x48b)][_0x70cc58(0x30d)](this);},Scene_Equip[_0x518efc(0xa41)]['slotWindowRect']=function(){const _0xa0633b=_0x518efc;return Scene_Equip[_0xa0633b(0x587)][_0xa0633b(0x51c)][_0xa0633b(0x30d)](this);},Scene_Equip['prototype'][_0x518efc(0x564)]=function(){const _0x57ed51=_0x518efc;return Scene_Equip[_0x57ed51(0x587)][_0x57ed51(0x175)][_0x57ed51(0x30d)](this);},Scene_Status[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x68b)][_0x518efc(0x850)],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x2b8)]=Scene_Status[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Status['prototype']['create']=function(){const _0x5f36ca=_0x518efc;VisuMZ[_0x5f36ca(0x1c9)][_0x5f36ca(0x2b8)][_0x5f36ca(0x30d)](this),this[_0x5f36ca(0x79c)]();},Scene_Status[_0x518efc(0xa41)][_0x518efc(0x79c)]=function(){const _0x166466=_0x518efc;this[_0x166466(0x4a0)]&&this[_0x166466(0x4a0)][_0x166466(0x19d)](Scene_Status['layoutSettings'][_0x166466(0x33e)]);this['_statusWindow']&&this[_0x166466(0x40d)]['setBackgroundType'](Scene_Status[_0x166466(0x587)][_0x166466(0x342)]);this[_0x166466(0x33c)]&&this[_0x166466(0x33c)][_0x166466(0x19d)](Scene_Status[_0x166466(0x587)][_0x166466(0x6c6)]);if(this[_0x166466(0x9a9)]){if('lSkdP'===_0x166466(0x284))this['_statusEquipWindow'][_0x166466(0x19d)](Scene_Status['layoutSettings'][_0x166466(0xa2a)]);else return this[_0x166466(0x2d4)];}},Scene_Status[_0x518efc(0xa41)][_0x518efc(0x643)]=function(){const _0x193db1=_0x518efc;return Scene_Status['layoutSettings'][_0x193db1(0x4aa)][_0x193db1(0x30d)](this);},Scene_Status['prototype'][_0x518efc(0x24c)]=function(){const _0x4c97aa=_0x518efc;return Scene_Status[_0x4c97aa(0x587)]['StatusRect']['call'](this);},Scene_Status['prototype'][_0x518efc(0x706)]=function(){const _0x55480c=_0x518efc;return Scene_Status[_0x55480c(0x587)][_0x55480c(0x227)]['call'](this);},Scene_Status[_0x518efc(0xa41)]['statusEquipWindowRect']=function(){const _0x4d56af=_0x518efc;return Scene_Status[_0x4d56af(0x587)][_0x4d56af(0x9e5)][_0x4d56af(0x30d)](this);},Scene_Options[_0x518efc(0x587)]=VisuMZ['CoreEngine'][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x275)],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x751)]=Scene_Options[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Options[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x2b9b21=_0x518efc;VisuMZ[_0x2b9b21(0x1c9)][_0x2b9b21(0x751)][_0x2b9b21(0x30d)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x518efc(0xa41)]['setCoreEngineUpdateWindowBg']=function(){const _0xcb3c70=_0x518efc;this[_0xcb3c70(0x223)]&&this['_optionsWindow'][_0xcb3c70(0x19d)](Scene_Options['layoutSettings'][_0xcb3c70(0x23e)]);},Scene_Options[_0x518efc(0xa41)]['optionsWindowRect']=function(){const _0x3fb3b0=_0x518efc;return Scene_Options[_0x3fb3b0(0x587)][_0x3fb3b0(0x57a)][_0x3fb3b0(0x30d)](this);},Scene_Save[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x1fb)],Scene_Save['prototype'][_0x518efc(0x869)]=function(){const _0x4aa486=_0x518efc;Scene_File[_0x4aa486(0xa41)][_0x4aa486(0x869)][_0x4aa486(0x30d)](this),this[_0x4aa486(0x79c)]();},Scene_Save[_0x518efc(0xa41)]['setCoreEngineUpdateWindowBg']=function(){const _0x617d02=_0x518efc;this[_0x617d02(0x348)]&&this[_0x617d02(0x348)][_0x617d02(0x19d)](Scene_Save[_0x617d02(0x587)][_0x617d02(0x247)]);if(this[_0x617d02(0x7fc)]){if(_0x617d02(0x692)!==_0x617d02(0x147))this[_0x617d02(0x7fc)][_0x617d02(0x19d)](Scene_Save[_0x617d02(0x587)][_0x617d02(0x821)]);else{_0x5403f0['prototype'][_0x617d02(0x4ba)][_0x617d02(0x30d)](this),this[_0x617d02(0x236)]();if(this['_actor'])this[_0x617d02(0x769)]();else this[_0x617d02(0x6fc)]!==''&&(this['_battlerName']='');}}},Scene_Save[_0x518efc(0xa41)][_0x518efc(0x377)]=function(){const _0x587e4e=_0x518efc;return Scene_Save['layoutSettings'][_0x587e4e(0x54e)][_0x587e4e(0x30d)](this);},Scene_Save[_0x518efc(0xa41)][_0x518efc(0x71e)]=function(){const _0xe42747=_0x518efc;return Scene_Save[_0xe42747(0x587)][_0xe42747(0x4b5)][_0xe42747(0x30d)](this);},Scene_Load[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)]['MenuLayout'][_0x518efc(0x3fd)],Scene_Load[_0x518efc(0xa41)][_0x518efc(0x869)]=function(){const _0x3d883e=_0x518efc;Scene_File['prototype'][_0x3d883e(0x869)]['call'](this),this[_0x3d883e(0x79c)]();},Scene_Load[_0x518efc(0xa41)]['setCoreEngineUpdateWindowBg']=function(){const _0x8cb596=_0x518efc;this[_0x8cb596(0x348)]&&this[_0x8cb596(0x348)][_0x8cb596(0x19d)](Scene_Load[_0x8cb596(0x587)][_0x8cb596(0x247)]),this['_listWindow']&&this[_0x8cb596(0x7fc)][_0x8cb596(0x19d)](Scene_Load['layoutSettings'][_0x8cb596(0x821)]);},Scene_Load[_0x518efc(0xa41)]['helpWindowRect']=function(){const _0x1b2e2c=_0x518efc;return Scene_Load[_0x1b2e2c(0x587)][_0x1b2e2c(0x54e)]['call'](this);},Scene_Load['prototype'][_0x518efc(0x71e)]=function(){const _0xc178a9=_0x518efc;return Scene_Load[_0xc178a9(0x587)][_0xc178a9(0x4b5)][_0xc178a9(0x30d)](this);},Scene_GameEnd['layoutSettings']=VisuMZ['CoreEngine']['Settings'][_0x518efc(0x68b)][_0x518efc(0x4db)],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x917)]=Scene_GameEnd[_0x518efc(0xa41)][_0x518efc(0x5f4)],Scene_GameEnd[_0x518efc(0xa41)][_0x518efc(0x5f4)]=function(){const _0x5df27c=_0x518efc;Scene_MenuBase[_0x5df27c(0xa41)][_0x5df27c(0x5f4)][_0x5df27c(0x30d)](this);},Scene_GameEnd[_0x518efc(0xa41)][_0x518efc(0xa5a)]=function(){const _0x36e9c0=_0x518efc,_0x597dcd=this[_0x36e9c0(0x329)]();this[_0x36e9c0(0x318)]=new Window_GameEnd(_0x597dcd),this[_0x36e9c0(0x318)]['setHandler'](_0x36e9c0(0xa39),this[_0x36e9c0(0x1e9)][_0x36e9c0(0x670)](this)),this[_0x36e9c0(0x6d2)](this['_commandWindow']),this[_0x36e9c0(0x318)]['setBackgroundType'](Scene_GameEnd[_0x36e9c0(0x587)][_0x36e9c0(0x944)]);},Scene_GameEnd[_0x518efc(0xa41)]['commandWindowRect']=function(){const _0x1aafcb=_0x518efc;return Scene_GameEnd[_0x1aafcb(0x587)]['CommandRect'][_0x1aafcb(0x30d)](this);},Scene_Shop['layoutSettings']=VisuMZ['CoreEngine'][_0x518efc(0x54d)][_0x518efc(0x68b)]['ShopMenu'],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x7dc)]=Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x869)],Scene_Shop['prototype'][_0x518efc(0x869)]=function(){const _0x5e2df6=_0x518efc;VisuMZ[_0x5e2df6(0x1c9)]['Scene_Shop_create'][_0x5e2df6(0x30d)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x79c)]=function(){const _0x1d3d4f=_0x518efc;this['_helpWindow']&&('nyQwq'!==_0x1d3d4f(0x8d7)?(_0x503a6d=_0x3cf20e[_0x1d3d4f(0x38c)](_0x3e849b),_0x53cdf3=_0x279cfa[_0x1d3d4f(0x38c)](_0x3b82fe),_0x34fc54[_0x1d3d4f(0x1c9)]['Window_StatusBase_drawActorSimpleStatus'][_0x1d3d4f(0x30d)](this,_0x4c12ca,_0x4263be,_0x5c0043)):this[_0x1d3d4f(0x348)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x1d3d4f(0x247)]));this[_0x1d3d4f(0x825)]&&(_0x1d3d4f(0x237)!=='qLnkt'?_0x5da404+=_0x40ccac+_0x1d3d4f(0x179)[_0x1d3d4f(0x67d)](_0x4643e3,_0xa62da0[_0x1d3d4f(0x864)]||_0x1d3d4f(0x809))+_0x564489:this[_0x1d3d4f(0x825)][_0x1d3d4f(0x19d)](Scene_Shop[_0x1d3d4f(0x587)]['GoldBgType']));this[_0x1d3d4f(0x318)]&&this[_0x1d3d4f(0x318)]['setBackgroundType'](Scene_Shop[_0x1d3d4f(0x587)][_0x1d3d4f(0x944)]);this[_0x1d3d4f(0xa1d)]&&(_0x1d3d4f(0x6f4)===_0x1d3d4f(0x839)?_0x1d299d=_0x128d27[_0x1d3d4f(0x1bd)](_0x29e5d9):this[_0x1d3d4f(0xa1d)][_0x1d3d4f(0x19d)](Scene_Shop[_0x1d3d4f(0x587)][_0x1d3d4f(0x78a)]));if(this['_numberWindow']){if(_0x1d3d4f(0x6c2)===_0x1d3d4f(0x76f)){const _0xc70937='Map%1.json'[_0x1d3d4f(0x67d)](_0xcd3d40[_0x1d3d4f(0x2ab)](0x3)),_0x118fa3=new _0x50cfa0(),_0x4b6b1e=_0x1d3d4f(0x266)+_0xc70937;_0x118fa3['open'](_0x1d3d4f(0x24e),_0x4b6b1e),_0x118fa3[_0x1d3d4f(0x34f)](_0x1d3d4f(0x20e)),_0x118fa3[_0x1d3d4f(0x2ba)]=()=>this[_0x1d3d4f(0x3ae)](_0x118fa3,_0x547516,_0xc70937,_0x4b6b1e),_0x118fa3['onerror']=()=>_0x14720e[_0x1d3d4f(0x2fd)](_0x1d3d4f(0x9c8),_0xc70937,_0x4b6b1e),_0x118fa3['send']();}else this['_numberWindow'][_0x1d3d4f(0x19d)](Scene_Shop[_0x1d3d4f(0x587)][_0x1d3d4f(0x276)]);}this['_statusWindow']&&this[_0x1d3d4f(0x40d)][_0x1d3d4f(0x19d)](Scene_Shop['layoutSettings'][_0x1d3d4f(0x342)]);if(this[_0x1d3d4f(0x48c)]){if(_0x1d3d4f(0x796)!==_0x1d3d4f(0x796)){if(_0x55b915[_0x1d3d4f(0x7c5)]())_0x4c53fd['log'](_0x214312);}else this[_0x1d3d4f(0x48c)][_0x1d3d4f(0x19d)](Scene_Shop[_0x1d3d4f(0x587)][_0x1d3d4f(0x7b1)]);}this[_0x1d3d4f(0x733)]&&this[_0x1d3d4f(0x733)][_0x1d3d4f(0x19d)](Scene_Shop[_0x1d3d4f(0x587)]['CategoryBgType']);if(this[_0x1d3d4f(0x23f)]){if(_0x1d3d4f(0x7e9)!==_0x1d3d4f(0x7e9))return _0x4e345c[_0x1d3d4f(0x1c9)][_0x1d3d4f(0x54d)][_0x1d3d4f(0x224)]['DisplayedParams']['length'];else this[_0x1d3d4f(0x23f)]['setBackgroundType'](Scene_Shop[_0x1d3d4f(0x587)]['SellBgType']);}},Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x377)]=function(){const _0x4a0222=_0x518efc;return Scene_Shop[_0x4a0222(0x587)]['HelpRect']['call'](this);},Scene_Shop[_0x518efc(0xa41)]['goldWindowRect']=function(){const _0xd9c804=_0x518efc;return Scene_Shop[_0xd9c804(0x587)][_0xd9c804(0x33b)][_0xd9c804(0x30d)](this);},Scene_Shop['prototype'][_0x518efc(0x329)]=function(){const _0x231e84=_0x518efc;return Scene_Shop['layoutSettings'][_0x231e84(0x48b)][_0x231e84(0x30d)](this);},Scene_Shop['prototype'][_0x518efc(0x1d4)]=function(){const _0x5434b0=_0x518efc;return Scene_Shop[_0x5434b0(0x587)][_0x5434b0(0x9e7)][_0x5434b0(0x30d)](this);},Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x904)]=function(){const _0x2c9a39=_0x518efc;return Scene_Shop[_0x2c9a39(0x587)]['NumberRect'][_0x2c9a39(0x30d)](this);},Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x24c)]=function(){const _0x4f99b4=_0x518efc;return Scene_Shop['layoutSettings'][_0x4f99b4(0x3f9)][_0x4f99b4(0x30d)](this);},Scene_Shop['prototype'][_0x518efc(0x2da)]=function(){const _0x2f3b29=_0x518efc;return Scene_Shop[_0x2f3b29(0x587)][_0x2f3b29(0x5d4)][_0x2f3b29(0x30d)](this);},Scene_Shop[_0x518efc(0xa41)][_0x518efc(0x6ea)]=function(){const _0x318130=_0x518efc;return Scene_Shop[_0x318130(0x587)][_0x318130(0x504)]['call'](this);},Scene_Shop['prototype'][_0x518efc(0x530)]=function(){const _0x129f44=_0x518efc;return Scene_Shop[_0x129f44(0x587)][_0x129f44(0x6b1)][_0x129f44(0x30d)](this);},Scene_Name[_0x518efc(0x587)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x68b)]['NameMenu'],VisuMZ['CoreEngine']['Scene_Name_create']=Scene_Name[_0x518efc(0xa41)]['create'],Scene_Name[_0x518efc(0xa41)]['create']=function(){const _0x299985=_0x518efc;VisuMZ[_0x299985(0x1c9)]['Scene_Name_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name['prototype'][_0x518efc(0x79c)]=function(){const _0x5897a4=_0x518efc;this[_0x5897a4(0x557)]&&this[_0x5897a4(0x557)][_0x5897a4(0x19d)](Scene_Name[_0x5897a4(0x587)][_0x5897a4(0x4fb)]);if(this[_0x5897a4(0x27d)]){if(_0x5897a4(0x689)!==_0x5897a4(0x689)){const _0x34bc7f=_0x3847b2?this[_0x5897a4(0x84f)]:this['_scrollBarVert'];if(!_0x34bc7f)return;const _0x17e061=_0x5a8910['SCROLLBAR'],_0x389e49=_0x17e061['thickness'],_0xfadefc=_0x6e83f5?this[_0x5897a4(0xa59)]-_0x389e49*0x2:_0x389e49,_0x60b9a6=_0x14c968?_0x389e49:this[_0x5897a4(0x900)]-_0x389e49*0x2;_0x34bc7f[_0x5897a4(0x463)]=new _0x4b619e(_0xfadefc,_0x60b9a6),_0x34bc7f['setFrame'](0x0,0x0,_0xfadefc,_0x60b9a6),this[_0x5897a4(0x146)](_0x5c366d);}else this[_0x5897a4(0x27d)][_0x5897a4(0x19d)](Scene_Name[_0x5897a4(0x587)][_0x5897a4(0x830)]);}},Scene_Name[_0x518efc(0xa41)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x518efc(0xa41)]['editWindowRect']=function(){const _0x4eaa22=_0x518efc;return Scene_Name[_0x4eaa22(0x587)][_0x4eaa22(0x671)]['call'](this);},Scene_Name[_0x518efc(0xa41)]['inputWindowRect']=function(){const _0x1f44a0=_0x518efc;return Scene_Name[_0x1f44a0(0x587)][_0x1f44a0(0x537)][_0x1f44a0(0x30d)](this);},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x973)]=function(){const _0x7cb337=_0x518efc;if(!this[_0x7cb337(0x27d)])return![];return VisuMZ[_0x7cb337(0x1c9)][_0x7cb337(0x54d)][_0x7cb337(0x32d)][_0x7cb337(0x973)];},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x868)]=function(){const _0x23731b=_0x518efc;if(this[_0x23731b(0x973)]()&&this[_0x23731b(0x27d)][_0x23731b(0x81d)]!==_0x23731b(0x1d8))return TextManager[_0x23731b(0x933)](_0x23731b(0x277),_0x23731b(0x50b));return Scene_MenuBase[_0x23731b(0xa41)][_0x23731b(0x868)][_0x23731b(0x30d)](this);},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x210)]=function(){const _0x2badb8=_0x518efc;return this[_0x2badb8(0x973)]()?TextManager[_0x2badb8(0x976)](_0x2badb8(0x149)):Scene_MenuBase['prototype'][_0x2badb8(0x210)][_0x2badb8(0x30d)](this);},Scene_Name[_0x518efc(0xa41)]['buttonAssistKey4']=function(){const _0x2e17f9=_0x518efc;if(this[_0x2e17f9(0x973)]()&&this['_inputWindow'][_0x2e17f9(0x81d)]===_0x2e17f9(0x1d8))return TextManager[_0x2e17f9(0x2b1)]([_0x2e17f9(0x943)]);return Scene_MenuBase[_0x2e17f9(0xa41)]['buttonAssistKey4'][_0x2e17f9(0x30d)](this);},Scene_Name['prototype']['buttonAssistKey5']=function(){const _0x83c181=_0x518efc;if(this['EnableNameInput']()&&this[_0x83c181(0x27d)][_0x83c181(0x81d)]===_0x83c181(0x1d8)){if(_0x83c181(0x5c2)===_0x83c181(0x6c1))_0x1adf2b[_0x83c181(0x97e)][0x57]='up',_0x1449ad[_0x83c181(0x97e)][0x41]=_0x83c181(0x42a),_0x55b8b0[_0x83c181(0x97e)][0x53]=_0x83c181(0x4f0),_0x1a8f3f['keyMapper'][0x44]=_0x83c181(0xa44),_0x552ee3[_0x83c181(0x97e)][0x45]='pagedown';else return TextManager[_0x83c181(0x2b1)]([_0x83c181(0x214)]);}return Scene_MenuBase['prototype'][_0x83c181(0x2ce)][_0x83c181(0x30d)](this);},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x7bc)]=function(){const _0x353e94=_0x518efc;if(this[_0x353e94(0x973)]()&&this[_0x353e94(0x27d)][_0x353e94(0x81d)]!=='keyboard'){const _0x439335=VisuMZ[_0x353e94(0x1c9)][_0x353e94(0x54d)][_0x353e94(0x32d)];return _0x439335[_0x353e94(0x6fe)]||'Page';}return Scene_MenuBase[_0x353e94(0xa41)][_0x353e94(0x7bc)]['call'](this);},Scene_Name[_0x518efc(0xa41)]['buttonAssistText3']=function(){const _0xdbc274=_0x518efc;if(this[_0xdbc274(0x973)]()){const _0x24eb47=VisuMZ[_0xdbc274(0x1c9)]['Settings']['KeyboardInput'];return this[_0xdbc274(0x27d)][_0xdbc274(0x81d)]==='keyboard'?_0x24eb47[_0xdbc274(0x642)]||_0xdbc274(0x642):_0x24eb47[_0xdbc274(0x43a)]||'Manual';}else return Scene_MenuBase['prototype']['buttonAssistText3']['call'](this);},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x27f)]=function(){const _0x5f157a=_0x518efc;if(this['EnableNameInput']()){if(_0x5f157a(0x49b)!==_0x5f157a(0x434)){const _0x593d80=VisuMZ[_0x5f157a(0x1c9)][_0x5f157a(0x54d)]['KeyboardInput'];if(this[_0x5f157a(0x27d)][_0x5f157a(0x81d)]===_0x5f157a(0x1d8))return _0x593d80[_0x5f157a(0x92b)]||_0x5f157a(0x92b);}else return'PTB';}return Scene_MenuBase[_0x5f157a(0xa41)][_0x5f157a(0x27f)]['call'](this);},VisuMZ[_0x518efc(0x1c9)]['Scene_Name_onInputOk']=Scene_Name[_0x518efc(0xa41)][_0x518efc(0x518)],Scene_Name[_0x518efc(0xa41)][_0x518efc(0x518)]=function(){const _0x3041a3=_0x518efc;if(this[_0x3041a3(0x52f)]())this[_0x3041a3(0x169)]();else{if(_0x3041a3(0x15f)==='uYsZj')VisuMZ['CoreEngine'][_0x3041a3(0x71f)]['call'](this);else{const _0x565de2=new _0x31ca1b(),_0x28ef14=this['getPointAnimationLayer']();_0x565de2['x']=_0x1e87fd['x']-_0x28ef14['x'],_0x565de2['y']=_0x710291['y']-_0x28ef14['y'],_0x565de2['z']=0x64;const _0x2f5e38=this['getPointAnimationLayer']();return _0x2f5e38[_0x3041a3(0x1f4)](_0x565de2),[_0x565de2];}}},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x52f)]=function(){const _0x4baf59=_0x518efc,_0x1692a7=VisuMZ[_0x4baf59(0x1c9)][_0x4baf59(0x54d)][_0x4baf59(0x32d)];if(!_0x1692a7)return![];const _0x1c70db=_0x1692a7[_0x4baf59(0x1c8)];if(!_0x1c70db)return![];const _0x52ad2c=this[_0x4baf59(0x557)]['name']()[_0x4baf59(0x7c4)]();for(const _0x142b68 of _0x1c70db){if(_0x4baf59(0x8c3)!==_0x4baf59(0x8c3))this[_0x4baf59(0x348)]&&this[_0x4baf59(0x348)][_0x4baf59(0x19d)](_0x35570e[_0x4baf59(0x587)][_0x4baf59(0x247)]),this[_0x4baf59(0x7fc)]&&this[_0x4baf59(0x7fc)]['setBackgroundType'](_0x4cf324['layoutSettings'][_0x4baf59(0x821)]);else{if(_0x52ad2c[_0x4baf59(0x1f5)](_0x142b68[_0x4baf59(0x7c4)]()))return!![];}}return![];},Scene_Name[_0x518efc(0xa41)][_0x518efc(0x169)]=function(){const _0x6ebb73=_0x518efc;SoundManager[_0x6ebb73(0x6f1)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x142)]=Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x4ba)],Scene_Battle[_0x518efc(0xa41)]['update']=function(){const _0x5ed0ab=_0x518efc;VisuMZ[_0x5ed0ab(0x1c9)][_0x5ed0ab(0x142)][_0x5ed0ab(0x30d)](this);if($gameTemp[_0x5ed0ab(0x419)])this[_0x5ed0ab(0x178)]();},Scene_Battle['prototype'][_0x518efc(0x178)]=function(){const _0x356735=_0x518efc;if(!BattleManager[_0x356735(0x872)]()&&!this[_0x356735(0x69f)]&&!$gameMessage['isBusy']()){if(_0x356735(0x910)===_0x356735(0x627))return _0x1bc4c7[_0x356735(0x1c9)][_0x356735(0x54d)][_0x356735(0x927)][_0x356735(0x35f)]&&_0x471e22['isEnemy']()?_0xaf9f9e[_0x356735(0x3ef)]-0.05:_0x5e42cc[_0x356735(0x3ef)];else this[_0x356735(0x69f)]=!![],this[_0x356735(0x4ba)](),SceneManager[_0x356735(0x9b0)](),this[_0x356735(0x69f)]=![];}},VisuMZ['CoreEngine'][_0x518efc(0x812)]=Scene_Battle[_0x518efc(0xa41)]['createCancelButton'],Scene_Battle['prototype'][_0x518efc(0x6ed)]=function(){const _0x3cfbdb=_0x518efc;VisuMZ['CoreEngine'][_0x3cfbdb(0x812)][_0x3cfbdb(0x30d)](this),SceneManager[_0x3cfbdb(0x3c8)]()&&this[_0x3cfbdb(0x532)]();},Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x532)]=function(){const _0x2b3671=_0x518efc;this[_0x2b3671(0x949)]['x']=Graphics[_0x2b3671(0x3cf)]+0x4,this[_0x2b3671(0x2cc)]()?this[_0x2b3671(0x949)]['y']=Graphics[_0x2b3671(0x5bf)]-this[_0x2b3671(0x72c)]():this[_0x2b3671(0x949)]['y']=0x0;},VisuMZ[_0x518efc(0x1c9)]['Sprite_Button_initialize']=Sprite_Button[_0x518efc(0xa41)][_0x518efc(0x55e)],Sprite_Button[_0x518efc(0xa41)][_0x518efc(0x55e)]=function(_0x44fb7f){const _0x415548=_0x518efc;VisuMZ[_0x415548(0x1c9)][_0x415548(0x1a1)][_0x415548(0x30d)](this,_0x44fb7f),this['initButtonHidden']();},Sprite_Button[_0x518efc(0xa41)]['initButtonHidden']=function(){const _0x1e74e3=_0x518efc,_0x239b34=VisuMZ[_0x1e74e3(0x1c9)]['Settings']['UI'];this[_0x1e74e3(0x401)]=![];switch(this[_0x1e74e3(0x2c2)]){case _0x1e74e3(0xa39):this[_0x1e74e3(0x401)]=!_0x239b34[_0x1e74e3(0x25d)];break;case _0x1e74e3(0x277):case _0x1e74e3(0x50b):this[_0x1e74e3(0x401)]=!_0x239b34[_0x1e74e3(0x4b7)];break;case _0x1e74e3(0x4f0):case'up':case _0x1e74e3(0xa00):case _0x1e74e3(0x14e):case'ok':this[_0x1e74e3(0x401)]=!_0x239b34['numberShowButton'];break;case'menu':this[_0x1e74e3(0x401)]=!_0x239b34['menuShowButton'];break;}},VisuMZ['CoreEngine']['Sprite_Button_updateOpacity']=Sprite_Button[_0x518efc(0xa41)]['updateOpacity'],Sprite_Button['prototype'][_0x518efc(0x197)]=function(){const _0x1a717a=_0x518efc;if(SceneManager[_0x1a717a(0x7ad)]()||this[_0x1a717a(0x401)]){if('kwwFL'!==_0x1a717a(0x9bd))this['hideButtonFromView']();else return _0x4564bc;}else VisuMZ[_0x1a717a(0x1c9)]['Sprite_Button_updateOpacity'][_0x1a717a(0x30d)](this);},Sprite_Button[_0x518efc(0xa41)][_0x518efc(0x652)]=function(){const _0x48cbea=_0x518efc;this[_0x48cbea(0x596)]=![],this[_0x48cbea(0x8de)]=0x0,this['x']=Graphics[_0x48cbea(0x217)]*0xa,this['y']=Graphics[_0x48cbea(0x622)]*0xa;},VisuMZ[_0x518efc(0x1c9)]['Sprite_Battler_startMove']=Sprite_Battler[_0x518efc(0xa41)][_0x518efc(0x1d0)],Sprite_Battler[_0x518efc(0xa41)][_0x518efc(0x1d0)]=function(_0x3f45b9,_0x51f780,_0x76a505){const _0x448488=_0x518efc;(this[_0x448488(0x97a)]!==_0x3f45b9||this['_targetOffsetY']!==_0x51f780)&&(_0x448488(0x4b9)===_0x448488(0x4b9)?(this[_0x448488(0xa5b)](_0x448488(0x901)),this[_0x448488(0x995)]=_0x76a505):this[_0x448488(0x77e)][_0x448488(0x19d)](_0x51eab5[_0x448488(0x587)][_0x448488(0x87d)])),VisuMZ[_0x448488(0x1c9)][_0x448488(0x8a2)][_0x448488(0x30d)](this,_0x3f45b9,_0x51f780,_0x76a505);},Sprite_Battler[_0x518efc(0xa41)][_0x518efc(0xa5b)]=function(_0x4aa0cb){const _0x3af83b=_0x518efc;this[_0x3af83b(0x63d)]=_0x4aa0cb;},Sprite_Battler[_0x518efc(0xa41)][_0x518efc(0x964)]=function(){const _0x264977=_0x518efc;if(this[_0x264977(0x148)]<=0x0)return;const _0x3f1e49=this[_0x264977(0x148)],_0x21aa6f=this[_0x264977(0x995)],_0x2dd227=this['_moveEasingType'];this['_offsetX']=this[_0x264977(0x544)](this[_0x264977(0x7a0)],this[_0x264977(0x97a)],_0x3f1e49,_0x21aa6f,_0x2dd227),this[_0x264977(0x9f7)]=this[_0x264977(0x544)](this[_0x264977(0x9f7)],this['_targetOffsetY'],_0x3f1e49,_0x21aa6f,_0x2dd227),this[_0x264977(0x148)]--;if(this[_0x264977(0x148)]<=0x0)this[_0x264977(0x88a)]();},Sprite_Battler[_0x518efc(0xa41)][_0x518efc(0x544)]=function(_0x316498,_0x4fcb11,_0x2cda3a,_0x4b755c,_0x52ec69){const _0x5b8a2d=_0x518efc,_0x33d984=VisuMZ[_0x5b8a2d(0x3e7)]((_0x4b755c-_0x2cda3a)/_0x4b755c,_0x52ec69||_0x5b8a2d(0x901)),_0x4178a7=VisuMZ[_0x5b8a2d(0x3e7)]((_0x4b755c-_0x2cda3a+0x1)/_0x4b755c,_0x52ec69||_0x5b8a2d(0x901)),_0x229f58=(_0x316498-_0x4fcb11*_0x33d984)/(0x1-_0x33d984);return _0x229f58+(_0x4fcb11-_0x229f58)*_0x4178a7;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x87c)]=Sprite_Actor['prototype'][_0x518efc(0x8bc)],Sprite_Actor[_0x518efc(0xa41)][_0x518efc(0x8bc)]=function(_0xdcbd92){const _0x26827d=_0x518efc;VisuMZ[_0x26827d(0x1c9)][_0x26827d(0x54d)]['UI'][_0x26827d(0xa47)]?this[_0x26827d(0x92a)](_0xdcbd92):VisuMZ[_0x26827d(0x1c9)][_0x26827d(0x87c)][_0x26827d(0x30d)](this,_0xdcbd92);},Sprite_Actor[_0x518efc(0xa41)][_0x518efc(0x92a)]=function(_0x51fbc5){const _0x7ad79e=_0x518efc;let _0x7b878=Math[_0x7ad79e(0x38c)](Graphics[_0x7ad79e(0x217)]/0x2+0xc0);_0x7b878-=Math[_0x7ad79e(0x25f)]((Graphics['width']-Graphics[_0x7ad79e(0x3cf)])/0x2),_0x7b878+=_0x51fbc5*0x20;let _0x1388d4=Graphics[_0x7ad79e(0x622)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x1388d4-=Math[_0x7ad79e(0x25f)]((Graphics['height']-Graphics[_0x7ad79e(0x5bf)])/0x2),_0x1388d4+=_0x51fbc5*0x30,this['setHome'](_0x7b878,_0x1388d4);},Sprite_Actor['prototype'][_0x518efc(0x52c)]=function(){const _0xefa3ab=_0x518efc;this[_0xefa3ab(0x1d0)](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0x6c113){const _0x581a8f=_0x518efc;this[_0x581a8f(0x37d)]=_0x6c113;},VisuMZ['CoreEngine']['Sprite_Animation_processSoundTimings']=Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x29b)],Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x29b)]=function(){const _0x4628cb=_0x518efc;if(this[_0x4628cb(0x37d)])return;VisuMZ[_0x4628cb(0x1c9)][_0x4628cb(0x8eb)][_0x4628cb(0x30d)](this);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x7a4)]=Sprite_Animation['prototype']['setViewport'],Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x75d)]=function(_0x122667){const _0x1260e7=_0x518efc;this['isAnimationOffsetXMirrored']()?this[_0x1260e7(0x7ca)](_0x122667):_0x1260e7(0x31f)!==_0x1260e7(0x45d)?VisuMZ[_0x1260e7(0x1c9)][_0x1260e7(0x7a4)][_0x1260e7(0x30d)](this,_0x122667):_0x4953d9[_0x1260e7(0x1c9)][_0x1260e7(0x585)]['call'](this);},Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0xa15)]=function(){const _0x176507=_0x518efc;if(!this['_animation'])return![];const _0x3742e8=this['_animation'][_0x176507(0x864)]||'';if(_0x3742e8[_0x176507(0x3a8)](/<MIRROR OFFSET X>/i))return!![];if(_0x3742e8[_0x176507(0x3a8)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x176507(0x1c9)][_0x176507(0x54d)][_0x176507(0x927)][_0x176507(0x325)];},Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x7ca)]=function(_0x160923){const _0x4e3c28=_0x518efc,_0x33e069=this['_viewportSize'],_0x17a264=this['_viewportSize'],_0x1627c4=this[_0x4e3c28(0x51a)][_0x4e3c28(0x55d)]*(this[_0x4e3c28(0x1ed)]?-0x1:0x1)-_0x33e069/0x2,_0x303012=this[_0x4e3c28(0x51a)][_0x4e3c28(0x470)]-_0x17a264/0x2,_0x285118=this[_0x4e3c28(0x5bc)](_0x160923);_0x160923['gl'][_0x4e3c28(0x3eb)](_0x1627c4+_0x285118['x'],_0x303012+_0x285118['y'],_0x33e069,_0x17a264);},Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x7cd)]=function(_0x5871a3){const _0x294bc4=_0x518efc;if(_0x5871a3[_0x294bc4(0x435)]){}const _0x411ddf=this[_0x294bc4(0x51a)]['name'];let _0x567c03=_0x5871a3[_0x294bc4(0x622)]*_0x5871a3['scale']['y'],_0x291c6f=0x0,_0x58ac0e=-_0x567c03/0x2;if(_0x411ddf[_0x294bc4(0x3a8)](/<(?:HEAD|HEADER|TOP)>/i))_0x58ac0e=-_0x567c03;if(_0x411ddf[_0x294bc4(0x3a8)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x58ac0e=0x0;if(this[_0x294bc4(0x51a)]['alignBottom'])_0x58ac0e=0x0;if(_0x411ddf[_0x294bc4(0x3a8)](/<(?:LEFT)>/i))_0x291c6f=-_0x5871a3['width']/0x2;if(_0x411ddf[_0x294bc4(0x3a8)](/<(?:RIGHT)>/i))_0x291c6f=_0x5871a3['width']/0x2;_0x411ddf['match'](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x294bc4(0x37b)!==_0x294bc4(0x37b)?_0x43c3d9[_0x294bc4(0x99c)]():_0x291c6f=Number(RegExp['$1'])*_0x5871a3[_0x294bc4(0x217)]);if(_0x411ddf['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x294bc4(0x7a6)!==_0x294bc4(0x8e8))_0x58ac0e=(0x1-Number(RegExp['$1']))*-_0x567c03;else return _0x2e0877(_0x12f482)['toLocaleString'](_0xb60e8a,_0x3bdc51)+',';}_0x411ddf[_0x294bc4(0x3a8)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x291c6f=Number(RegExp['$1'])*_0x5871a3[_0x294bc4(0x217)],_0x58ac0e=(0x1-Number(RegExp['$2']))*-_0x567c03);if(_0x411ddf[_0x294bc4(0x3a8)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x291c6f+=Number(RegExp['$1']);if(_0x411ddf[_0x294bc4(0x3a8)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x58ac0e+=Number(RegExp['$1']);_0x411ddf[_0x294bc4(0x3a8)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x294bc4(0x5ab)!=='IllMC'?this[_0x294bc4(0x3c1)]((_0x3a15aa+_0x2de465)%_0xc807e9):(_0x291c6f+=Number(RegExp['$1']),_0x58ac0e+=Number(RegExp['$2'])));const _0x41c873=new Point(_0x291c6f,_0x58ac0e);return _0x5871a3['updateTransform'](),_0x5871a3[_0x294bc4(0x64c)][_0x294bc4(0x6c0)](_0x41c873);},Sprite_AnimationMV['prototype'][_0x518efc(0x8c8)]=function(){const _0x34a981=_0x518efc;this[_0x34a981(0x6aa)]=VisuMZ[_0x34a981(0x1c9)][_0x34a981(0x54d)][_0x34a981(0x927)]['MvAnimationRate']??0x4,this[_0x34a981(0x5cf)](),this['_rate']=this[_0x34a981(0x6aa)][_0x34a981(0x22e)](0x1,0xa);},Sprite_AnimationMV['prototype'][_0x518efc(0x5cf)]=function(){const _0x4db51b=_0x518efc;if(!this[_0x4db51b(0x51a)]);const _0xb06ac2=this['_animation'][_0x4db51b(0x864)]||'';_0xb06ac2[_0x4db51b(0x3a8)](/<RATE:[ ](\d+)>/i)&&(this[_0x4db51b(0x6aa)]=(Number(RegExp['$1'])||0x1)[_0x4db51b(0x22e)](0x1,0xa));},Sprite_AnimationMV[_0x518efc(0xa41)][_0x518efc(0x9f1)]=function(_0x11be4f){this['_muteSound']=_0x11be4f;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x9b3)]=Sprite_AnimationMV[_0x518efc(0xa41)]['processTimingData'],Sprite_AnimationMV[_0x518efc(0xa41)][_0x518efc(0x2d7)]=function(_0x2970fa){const _0x437c25=_0x518efc;this[_0x437c25(0x37d)]&&(_0x437c25(0x168)===_0x437c25(0x61b)?this[_0x437c25(0x9a9)][_0x437c25(0x19d)](_0x17120e[_0x437c25(0x587)][_0x437c25(0xa2a)]):(_0x2970fa=JsonEx['makeDeepCopy'](_0x2970fa),_0x2970fa['se']&&(_0x2970fa['se']['volume']=0x0))),VisuMZ['CoreEngine'][_0x437c25(0x9b3)][_0x437c25(0x30d)](this,_0x2970fa);},VisuMZ['CoreEngine'][_0x518efc(0xa27)]=Sprite_AnimationMV['prototype'][_0x518efc(0x56e)],Sprite_AnimationMV[_0x518efc(0xa41)][_0x518efc(0x56e)]=function(){const _0x49c788=_0x518efc;VisuMZ[_0x49c788(0x1c9)][_0x49c788(0xa27)][_0x49c788(0x30d)](this);if(this[_0x49c788(0x51a)][_0x49c788(0x739)]===0x3){if(_0x49c788(0x6ec)!==_0x49c788(0x945)){if(this['x']===0x0)this['x']=Math[_0x49c788(0x38c)](Graphics[_0x49c788(0x217)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x49c788(0x622)]/0x2);}else this['_forcedTroopView']=_0x169ff1,this['_forcedBattleSys']=_0x179d84,this[_0x49c788(0x36c)]=_0x57deb2;}},Sprite_Damage[_0x518efc(0xa41)][_0x518efc(0x94a)]=function(_0x1d254e){const _0x1c64dc=_0x518efc;let _0x259017=Math['abs'](_0x1d254e)[_0x1c64dc(0x33d)]();this[_0x1c64dc(0x452)]()&&(_0x259017=VisuMZ[_0x1c64dc(0x1bd)](_0x259017));const _0x48d6e2=this['fontSize'](),_0x2d1ee9=Math[_0x1c64dc(0x25f)](_0x48d6e2*0.75);for(let _0x27dcb4=0x0;_0x27dcb4<_0x259017[_0x1c64dc(0x18d)];_0x27dcb4++){const _0x24b276=this['createChildSprite'](_0x2d1ee9,_0x48d6e2);_0x24b276['bitmap']['drawText'](_0x259017[_0x27dcb4],0x0,0x0,_0x2d1ee9,_0x48d6e2,_0x1c64dc(0x5dc)),_0x24b276['x']=(_0x27dcb4-(_0x259017[_0x1c64dc(0x18d)]-0x1)/0x2)*_0x2d1ee9,_0x24b276['dy']=-_0x27dcb4;}},Sprite_Damage[_0x518efc(0xa41)][_0x518efc(0x452)]=function(){const _0x22e9d9=_0x518efc;return VisuMZ[_0x22e9d9(0x1c9)][_0x22e9d9(0x54d)][_0x22e9d9(0x927)][_0x22e9d9(0x4d4)];},Sprite_Damage['prototype']['valueOutlineColor']=function(){const _0x1cf1f6=_0x518efc;return ColorManager[_0x1cf1f6(0x8aa)]();},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x639)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge['prototype'][_0x518efc(0x7cb)]=function(){const _0x1ad140=_0x518efc;return VisuMZ[_0x1ad140(0x1c9)][_0x1ad140(0x639)][_0x1ad140(0x30d)](this)['clamp'](0x0,0x1);},VisuMZ[_0x518efc(0x1c9)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x518efc(0x659)],Sprite_Gauge[_0x518efc(0xa41)]['currentValue']=function(){const _0x117e59=_0x518efc;let _0x826ad3=VisuMZ['CoreEngine'][_0x117e59(0x8df)][_0x117e59(0x30d)](this);return _0x826ad3;},Sprite_Gauge['prototype'][_0x518efc(0x432)]=function(){const _0x103d56=_0x518efc;let _0xd70172=this[_0x103d56(0x659)]();this[_0x103d56(0x452)]()&&(_0xd70172=VisuMZ['GroupDigits'](_0xd70172));const _0x26b334=this['bitmapWidth']()-0x1,_0x34316c=this[_0x103d56(0x2fe)]?this['textHeight']():this[_0x103d56(0x295)]();this[_0x103d56(0x7fd)](),this[_0x103d56(0x463)][_0x103d56(0x161)](_0xd70172,0x0,0x0,_0x26b334,_0x34316c,_0x103d56(0xa44));},Sprite_Gauge[_0x518efc(0xa41)][_0x518efc(0x345)]=function(){return 0x3;},Sprite_Gauge[_0x518efc(0xa41)][_0x518efc(0x452)]=function(){const _0x349de1=_0x518efc;return VisuMZ['CoreEngine'][_0x349de1(0x54d)][_0x349de1(0x927)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x518efc(0xa41)][_0x518efc(0x59a)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x518efc(0x1c9)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype']['loadBitmap'],Sprite_Picture[_0x518efc(0xa41)][_0x518efc(0x74b)]=function(){const _0x520109=_0x518efc;if(this[_0x520109(0x58d)]&&this['_pictureName'][_0x520109(0x3a8)](/VisuMZ CoreEngine PictureIcon (\d+)/i))this[_0x520109(0x477)](Number(RegExp['$1']));else{if(_0x520109(0x30e)!=='Njyna'){const _0x13e212=_0x5f250d[_0x520109(0x98d)](_0x57656d)+0x1;let _0x9bd1e4=_0x362ed7+_0x520109(0x915),_0x5a1977=_0x1b4f9f[_0x520109(0x1c9)][_0x520109(0x2aa)](_0x4677e9[_0x520109(0xa48)]);if(_0x5a1977[_0x520109(0x18d)]>0x0){if(_0x5767cb[_0x520109(0x18d)]>0x0)_0xe66d93+=_0x5af2f0+_0x520109(0x53f);else{const _0x202748=_0x5679e4[_0x5b15df][_0x520109(0x864)];_0x4e0e18+=_0x1ec547+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x520109(0x67d)](_0x5e0521,_0x202748||_0x520109(0x809))+_0x4e4fac;}_0x2d56f7+=_0x9bd1e4[_0x520109(0x67d)](_0x388a46,_0x7a62c6,_0x13e212,_0x5a1977);}}else VisuMZ[_0x520109(0x1c9)][_0x520109(0x5b2)][_0x520109(0x30d)](this);}},Sprite_Picture[_0x518efc(0xa41)][_0x518efc(0x477)]=function(_0x8253a3){const _0x5727a6=_0x518efc,_0x30cb72=ImageManager[_0x5727a6(0x2de)],_0x3fa764=ImageManager[_0x5727a6(0x1fd)],_0x586efc=this['_pictureName'][_0x5727a6(0x3a8)](/SMOOTH/i);this[_0x5727a6(0x463)]=new Bitmap(_0x30cb72,_0x3fa764);const _0x4e2fe5=ImageManager[_0x5727a6(0x336)](_0x5727a6(0x2b6)),_0x26a46b=_0x8253a3%0x10*_0x30cb72,_0x15376c=Math['floor'](_0x8253a3/0x10)*_0x3fa764;this[_0x5727a6(0x463)][_0x5727a6(0x33a)]=_0x586efc,this[_0x5727a6(0x463)][_0x5727a6(0x9a2)](_0x4e2fe5,_0x26a46b,_0x15376c,_0x30cb72,_0x3fa764,0x0,0x0,_0x30cb72,_0x3fa764);};function Sprite_TitlePictureButton(){const _0x471207=_0x518efc;this[_0x471207(0x55e)](...arguments);}Sprite_TitlePictureButton[_0x518efc(0xa41)]=Object[_0x518efc(0x869)](Sprite_Clickable[_0x518efc(0xa41)]),Sprite_TitlePictureButton[_0x518efc(0xa41)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x518efc(0xa41)]['initialize']=function(_0x2d5a37){const _0x4fe5ca=_0x518efc;Sprite_Clickable[_0x4fe5ca(0xa41)][_0x4fe5ca(0x55e)][_0x4fe5ca(0x30d)](this),this[_0x4fe5ca(0x5fd)]=_0x2d5a37,this[_0x4fe5ca(0x99f)]=null,this[_0x4fe5ca(0x500)]();},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x500)]=function(){const _0x1a2036=_0x518efc;this['x']=Graphics[_0x1a2036(0x217)],this['y']=Graphics[_0x1a2036(0x622)],this[_0x1a2036(0x596)]=![],this[_0x1a2036(0x616)]();},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x616)]=function(){const _0x1509b3=_0x518efc;this['bitmap']=ImageManager[_0x1509b3(0x3da)](this[_0x1509b3(0x5fd)][_0x1509b3(0x584)]),this['bitmap']['addLoadListener'](this[_0x1509b3(0x560)][_0x1509b3(0x670)](this));},Sprite_TitlePictureButton['prototype'][_0x518efc(0x560)]=function(){const _0x1b575b=_0x518efc;this['_data'][_0x1b575b(0x8db)][_0x1b575b(0x30d)](this),this[_0x1b575b(0x5fd)][_0x1b575b(0x5bb)]['call'](this),this[_0x1b575b(0x1d2)](this[_0x1b575b(0x5fd)]['CallHandlerJS'][_0x1b575b(0x670)](this));},Sprite_TitlePictureButton['prototype'][_0x518efc(0x4ba)]=function(){const _0x5e8203=_0x518efc;Sprite_Clickable['prototype'][_0x5e8203(0x4ba)][_0x5e8203(0x30d)](this),this['updateOpacity'](),this[_0x5e8203(0x8fd)]();},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x7f1)]=function(){const _0x3a6099=_0x518efc;return VisuMZ[_0x3a6099(0x1c9)]['Settings'][_0x3a6099(0x68b)][_0x3a6099(0x54c)][_0x3a6099(0x2ee)];},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x197)]=function(){const _0x2c7e17=_0x518efc;this[_0x2c7e17(0x4af)]||this[_0x2c7e17(0x461)]?this[_0x2c7e17(0x8de)]=0xff:(this['opacity']+=this['visible']?this[_0x2c7e17(0x7f1)]():-0x1*this[_0x2c7e17(0x7f1)](),this[_0x2c7e17(0x8de)]=Math[_0x2c7e17(0x253)](0xc0,this[_0x2c7e17(0x8de)]));},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x1d2)]=function(_0x1344c4){const _0x2acfbf=_0x518efc;this[_0x2acfbf(0x99f)]=_0x1344c4;},Sprite_TitlePictureButton[_0x518efc(0xa41)][_0x518efc(0x38d)]=function(){const _0x5b6bfc=_0x518efc;if(this[_0x5b6bfc(0x99f)]){if(_0x5b6bfc(0x9e4)===_0x5b6bfc(0x79b)){const _0x1b04c4=_0xca73bc[_0x5b6bfc(0x4e9)][_0x5b6bfc(0x864)];if([_0x5b6bfc(0x2f1),_0x5b6bfc(0x1f7),_0x5b6bfc(0x765),_0x5b6bfc(0x7d7)][_0x5b6bfc(0x1f5)](_0x1b04c4))return![];return _0x9442cf[_0x5b6bfc(0x1c9)][_0x5b6bfc(0x80d)][_0x5b6bfc(0x30d)](this);}else this[_0x5b6bfc(0x99f)]();}},VisuMZ['CoreEngine'][_0x518efc(0x988)]=Spriteset_Base[_0x518efc(0xa41)]['initialize'],Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x55e)]=function(){const _0x199cbf=_0x518efc;VisuMZ[_0x199cbf(0x1c9)][_0x199cbf(0x988)][_0x199cbf(0x30d)](this),this[_0x199cbf(0x7fb)]();},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x7fb)]=function(){const _0x161091=_0x518efc;this[_0x161091(0xa40)]=[],this[_0x161091(0xa03)]=[],this[_0x161091(0x26c)]=this[_0x161091(0x8b0)]['x'],this[_0x161091(0x96d)]=this[_0x161091(0x8b0)]['y'];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x207)]=Spriteset_Base['prototype']['destroy'],Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x605)]=function(_0x23dbcc){const _0x12f2a5=_0x518efc;this[_0x12f2a5(0x487)](),this['removeAllPointAnimations'](),VisuMZ[_0x12f2a5(0x1c9)][_0x12f2a5(0x207)][_0x12f2a5(0x30d)](this,_0x23dbcc);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5e3)]=Spriteset_Base[_0x518efc(0xa41)]['update'],Spriteset_Base[_0x518efc(0xa41)]['update']=function(){const _0x68a06d=_0x518efc;VisuMZ[_0x68a06d(0x1c9)][_0x68a06d(0x5e3)]['call'](this),this[_0x68a06d(0x4e2)](),this['updatePictureAntiZoom'](),this[_0x68a06d(0x8e7)](),this[_0x68a06d(0x251)]();},Spriteset_Base[_0x518efc(0xa41)]['updatePictureSettings']=function(){},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x9dd)]=function(){const _0x197eb0=_0x518efc;if(!VisuMZ['CoreEngine'][_0x197eb0(0x54d)][_0x197eb0(0x927)][_0x197eb0(0x1f2)])return;if(this[_0x197eb0(0x26c)]===this['scale']['x']&&this['_cacheScaleY']===this[_0x197eb0(0x8b0)]['y'])return;this[_0x197eb0(0x9f3)](),this[_0x197eb0(0x26c)]=this[_0x197eb0(0x8b0)]['x'],this[_0x197eb0(0x96d)]=this[_0x197eb0(0x8b0)]['y'];},Spriteset_Base['prototype'][_0x518efc(0x9f3)]=function(){const _0x3707de=_0x518efc;if(SceneManager[_0x3707de(0x17e)]()&&Spriteset_Map[_0x3707de(0x248)])return;else{if(SceneManager['isSceneBattle']()&&Spriteset_Battle[_0x3707de(0x248)]){if(_0x3707de(0x9d5)!=='lfljl')_0x15bc1f[_0x3707de(0x699)][_0x3707de(0x3a8)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x2b2f6e[_0x3707de(0x807)]=_0x3213ea['max'](_0x5a25b2(_0x360f86['$1']),0x1));else return;}}this[_0x3707de(0x8b0)]['x']!==0x0&&(_0x3707de(0x98c)===_0x3707de(0x5f0)?(_0x4ebd5e[_0x3707de(0x85c)](),this[_0x3707de(0x81d)]===_0x3707de(0x1d8)?this[_0x3707de(0x86f)](_0x3707de(0x592)):this['switchModes']('keyboard')):(this[_0x3707de(0x971)][_0x3707de(0x8b0)]['x']=0x1/this[_0x3707de(0x8b0)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3707de(0x8b0)]['x']))),this[_0x3707de(0x8b0)]['y']!==0x0&&(this[_0x3707de(0x971)][_0x3707de(0x8b0)]['y']=0x1/this[_0x3707de(0x8b0)]['y'],this[_0x3707de(0x971)]['y']=-(this['y']/this[_0x3707de(0x8b0)]['y']));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x939)]=Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x56e)],Spriteset_Base[_0x518efc(0xa41)]['updatePosition']=function(){const _0x2a84ba=_0x518efc;VisuMZ[_0x2a84ba(0x1c9)][_0x2a84ba(0x939)]['call'](this),this[_0x2a84ba(0x8bd)]();},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x8bd)]=function(){const _0x56f5e4=_0x518efc;if(!$gameScreen)return;if($gameScreen[_0x56f5e4(0x4a7)]<=0x0)return;this['x']-=Math[_0x56f5e4(0x38c)]($gameScreen['shake']());const _0x4c80ed=$gameScreen[_0x56f5e4(0x8b8)]();switch($gameScreen[_0x56f5e4(0x8b8)]()){case _0x56f5e4(0x33f):this[_0x56f5e4(0x987)]();break;case'horizontal':this[_0x56f5e4(0x80c)]();break;case'vertical':this[_0x56f5e4(0x5ef)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base['prototype'][_0x518efc(0x987)]=function(){const _0x5af08e=_0x518efc,_0x5d5eda=VisuMZ[_0x5af08e(0x1c9)][_0x5af08e(0x54d)][_0x5af08e(0x273)];if(_0x5d5eda&&_0x5d5eda[_0x5af08e(0x2a4)]){if('thYbl'===_0x5af08e(0x1a9))this['removeFauxAnimation'](_0x3118dd);else return _0x5d5eda[_0x5af08e(0x2a4)][_0x5af08e(0x30d)](this);}this['x']+=Math['round']($gameScreen[_0x5af08e(0x298)]());},Spriteset_Base[_0x518efc(0xa41)]['updatePositionCoreEngineShakeRand']=function(){const _0x23dace=_0x518efc,_0x47f8bd=VisuMZ[_0x23dace(0x1c9)][_0x23dace(0x54d)][_0x23dace(0x273)];if(_0x47f8bd&&_0x47f8bd[_0x23dace(0x4a4)])return _0x47f8bd[_0x23dace(0x4a4)][_0x23dace(0x30d)](this);const _0x276fc3=$gameScreen[_0x23dace(0x3e4)]*0.75,_0x5bb741=$gameScreen['_shakeSpeed']*0.6,_0x2eb1e8=$gameScreen[_0x23dace(0x4a7)];this['x']+=Math[_0x23dace(0x38c)](Math[_0x23dace(0x4ab)](_0x276fc3)-Math[_0x23dace(0x4ab)](_0x5bb741))*(Math['min'](_0x2eb1e8,0x1e)*0.5),this['y']+=Math['round'](Math['randomInt'](_0x276fc3)-Math[_0x23dace(0x4ab)](_0x5bb741))*(Math[_0x23dace(0x253)](_0x2eb1e8,0x1e)*0.5);},Spriteset_Base['prototype']['updatePositionCoreEngineShakeHorz']=function(){const _0x160138=_0x518efc,_0x578ee1=VisuMZ[_0x160138(0x1c9)][_0x160138(0x54d)]['ScreenShake'];if(_0x578ee1&&_0x578ee1[_0x160138(0x450)])return _0x578ee1['horzJS'][_0x160138(0x30d)](this);const _0x4445fd=$gameScreen['_shakePower']*0.75,_0xf69dfa=$gameScreen[_0x160138(0x4ef)]*0.6,_0x359e26=$gameScreen[_0x160138(0x4a7)];this['x']+=Math[_0x160138(0x38c)](Math['randomInt'](_0x4445fd)-Math[_0x160138(0x4ab)](_0xf69dfa))*(Math['min'](_0x359e26,0x1e)*0.5);},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x5ef)]=function(){const _0x30c3aa=_0x518efc,_0x4585c6=VisuMZ[_0x30c3aa(0x1c9)][_0x30c3aa(0x54d)]['ScreenShake'];if(_0x4585c6&&_0x4585c6['vertJS']){if(_0x30c3aa(0x7c9)!==_0x30c3aa(0x7c9))this[_0x30c3aa(0x440)]['x']=_0x5e6fc1[_0x30c3aa(0x3cf)]+0x4;else return _0x4585c6[_0x30c3aa(0x7a9)][_0x30c3aa(0x30d)](this);}const _0x1220c1=$gameScreen[_0x30c3aa(0x3e4)]*0.75,_0x1647ff=$gameScreen[_0x30c3aa(0x4ef)]*0.6,_0x1da5df=$gameScreen[_0x30c3aa(0x4a7)];this['y']+=Math[_0x30c3aa(0x38c)](Math[_0x30c3aa(0x4ab)](_0x1220c1)-Math[_0x30c3aa(0x4ab)](_0x1647ff))*(Math[_0x30c3aa(0x253)](_0x1da5df,0x1e)*0.5);},Spriteset_Base[_0x518efc(0xa41)]['updateFauxAnimations']=function(){const _0x5af8d0=_0x518efc;for(const _0x3f4870 of this[_0x5af8d0(0xa40)]){!_0x3f4870[_0x5af8d0(0x779)]()&&('jNwND'!==_0x5af8d0(0x199)?this[_0x5af8d0(0x951)](_0x3f4870):this[_0x5af8d0(0x769)]());}this[_0x5af8d0(0xa5e)]();},Spriteset_Base['prototype']['processFauxAnimationRequests']=function(){const _0x284fdf=_0x518efc;for(;;){const _0x44d0ec=$gameTemp[_0x284fdf(0x985)]();if(_0x44d0ec){if(_0x284fdf(0x36a)===_0x284fdf(0x36a))this['createFauxAnimation'](_0x44d0ec);else{const _0x19c36a=_0x1ab6dd['touchUI']?(_0x2341d5['prototype']['blockWidth']()+0x6)*0x2:0x0,_0x39701d=this[_0x284fdf(0x6f7)](),_0x49d01c=_0x511f71[_0x284fdf(0x3cf)]-_0x19c36a*0x2,_0x4bd42f=this[_0x284fdf(0x72c)]();return new _0x12f4aa(_0x19c36a,_0x39701d,_0x49d01c,_0x4bd42f);}}else{if(_0x284fdf(0x873)!==_0x284fdf(0x665))break;else return 0x0;}}},Spriteset_Base['prototype'][_0x518efc(0x3ad)]=function(_0x28c323){const _0x12bb20=_0x518efc,_0x2b15e8=$dataAnimations[_0x28c323[_0x12bb20(0x5fb)]],_0x47416b=_0x28c323[_0x12bb20(0x86a)],_0x2f9fac=_0x28c323[_0x12bb20(0x9df)],_0x2940db=_0x28c323['mute'];let _0x502b6c=this['animationBaseDelay']();const _0x29e9b7=this[_0x12bb20(0x48f)]();if(this[_0x12bb20(0x488)](_0x2b15e8)){if(_0x12bb20(0x717)===_0x12bb20(0x717))for(const _0x1052da of _0x47416b){this[_0x12bb20(0x84d)]([_0x1052da],_0x2b15e8,_0x2f9fac,_0x502b6c,_0x2940db),_0x502b6c+=_0x29e9b7;}else return _0x42c8bd['PreserveNumbers'](_0x467098,'','');}else this[_0x12bb20(0x84d)](_0x47416b,_0x2b15e8,_0x2f9fac,_0x502b6c,_0x2940db);},Spriteset_Base[_0x518efc(0xa41)]['createAnimationSprite']=function(_0x1bd188,_0xba91a9,_0x5ad415,_0x16f134){const _0x248272=_0x518efc,_0x3f025b=this[_0x248272(0x9ad)](_0xba91a9),_0x151e9e=new(_0x3f025b?Sprite_AnimationMV:Sprite_Animation)(),_0x3fb8b2=this[_0x248272(0x5fe)](_0x1bd188),_0x32ee21=this['animationBaseDelay'](),_0x518d9f=_0x16f134>_0x32ee21?this[_0x248272(0x90e)]():null;this[_0x248272(0x5da)](_0x1bd188[0x0])&&(_0x5ad415=!_0x5ad415),_0x151e9e[_0x248272(0x41f)]=_0x1bd188,_0x151e9e[_0x248272(0x500)](_0x3fb8b2,_0xba91a9,_0x5ad415,_0x16f134,_0x518d9f),this[_0x248272(0x230)](_0x151e9e),this[_0x248272(0x967)][_0x248272(0x609)](_0x151e9e);},Spriteset_Base['prototype'][_0x518efc(0x84d)]=function(_0x2c1568,_0xbe0351,_0x3c608c,_0x561389,_0x3a0757){const _0x2053ad=_0x518efc,_0x3391d2=this[_0x2053ad(0x9ad)](_0xbe0351),_0x1e5718=new(_0x3391d2?Sprite_AnimationMV:Sprite_Animation)(),_0x361a08=this[_0x2053ad(0x5fe)](_0x2c1568);this['animationShouldMirror'](_0x2c1568[0x0])&&(_0x3c608c=!_0x3c608c);_0x1e5718[_0x2053ad(0x41f)]=_0x2c1568,_0x1e5718[_0x2053ad(0x500)](_0x361a08,_0xbe0351,_0x3c608c,_0x561389),_0x1e5718[_0x2053ad(0x9f1)](_0x3a0757),this[_0x2053ad(0x230)](_0x1e5718);if(this[_0x2053ad(0x967)])this['_animationSprites'][_0x2053ad(0x3ac)](_0x1e5718);this[_0x2053ad(0xa40)][_0x2053ad(0x609)](_0x1e5718);},Spriteset_Base['prototype'][_0x518efc(0x230)]=function(_0x493982){const _0x3399a4=_0x518efc;this[_0x3399a4(0x7e5)][_0x3399a4(0x1f4)](_0x493982);},Spriteset_Base[_0x518efc(0xa41)]['removeAnimation']=function(_0x2ddc7a){const _0x1bb55a=_0x518efc;this[_0x1bb55a(0x967)][_0x1bb55a(0x3ac)](_0x2ddc7a),this[_0x1bb55a(0x1e7)](_0x2ddc7a);for(const _0x17456c of _0x2ddc7a[_0x1bb55a(0x41f)]){if(_0x1bb55a(0x2a3)===_0x1bb55a(0x2a3))_0x17456c['endAnimation']&&('QipJu'===_0x1bb55a(0x53b)?_0x17456c[_0x1bb55a(0x99c)]():(_0x1625a4[_0x1bb55a(0x1c9)]['Spriteset_Base_update'][_0x1bb55a(0x30d)](this),this[_0x1bb55a(0x4e2)](),this[_0x1bb55a(0x9dd)](),this[_0x1bb55a(0x8e7)](),this['updatePointAnimations']()));else return this[_0x1bb55a(0x18c)]&&this[_0x1bb55a(0x18c)]['constructor']===_0x36903e;}_0x2ddc7a['destroy']();},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x951)]=function(_0x3f0aa1){const _0x2aeb81=_0x518efc;this[_0x2aeb81(0xa40)][_0x2aeb81(0x3ac)](_0x3f0aa1),this[_0x2aeb81(0x1e7)](_0x3f0aa1);for(const _0x5b48c0 of _0x3f0aa1['targetObjects']){_0x2aeb81(0x472)===_0x2aeb81(0x472)?_0x5b48c0[_0x2aeb81(0x99c)]&&_0x5b48c0[_0x2aeb81(0x99c)]():this[_0x2aeb81(0x9be)]()?this[_0x2aeb81(0x159)]():_0x40196c[_0x2aeb81(0x1c9)][_0x2aeb81(0x585)][_0x2aeb81(0x30d)](this);}_0x3f0aa1[_0x2aeb81(0x605)]();},Spriteset_Base['prototype']['removeAnimationFromContainer']=function(_0x5ab8b1){const _0x2a7388=_0x518efc;this[_0x2a7388(0x7e5)]['removeChild'](_0x5ab8b1);},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x487)]=function(){const _0x5c6a96=_0x518efc;for(const _0x1fe988 of this[_0x5c6a96(0xa40)]){this[_0x5c6a96(0x951)](_0x1fe988);}},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x382)]=function(){const _0x1acc70=_0x518efc;return this[_0x1acc70(0xa40)]['length']>0x0;},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x251)]=function(){const _0xdf8ac0=_0x518efc;for(const _0x591a9a of this[_0xdf8ac0(0xa03)]){if(_0xdf8ac0(0xa66)!==_0xdf8ac0(0xa66))return _0x5957a8[_0xdf8ac0(0x976)](_0xdf8ac0(0x149));else!_0x591a9a[_0xdf8ac0(0x779)]()&&this[_0xdf8ac0(0x78b)](_0x591a9a);}this[_0xdf8ac0(0x211)]();},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x211)]=function(){const _0x59f815=_0x518efc;for(;;){const _0x79c3b3=$gameTemp[_0x59f815(0xa3e)]();if(_0x79c3b3)this['createPointAnimation'](_0x79c3b3);else break;}},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x685)]=function(_0x12282d){const _0x24f41e=_0x518efc,_0x1a9e43=$dataAnimations[_0x12282d[_0x24f41e(0x5fb)]],_0x356d75=this[_0x24f41e(0x7f6)](_0x12282d),_0x5abc28=_0x12282d[_0x24f41e(0x9df)],_0x21ce0d=_0x12282d[_0x24f41e(0x4d0)];let _0x49a2fb=this[_0x24f41e(0x58f)]();const _0x3d6cc1=this[_0x24f41e(0x48f)]();if(this[_0x24f41e(0x488)](_0x1a9e43))for(const _0x1dc7f0 of _0x356d75){this[_0x24f41e(0xa1a)]([_0x1dc7f0],_0x1a9e43,_0x5abc28,_0x49a2fb,_0x21ce0d),_0x49a2fb+=_0x3d6cc1;}else this['createPointAnimationSprite'](_0x356d75,_0x1a9e43,_0x5abc28,_0x49a2fb,_0x21ce0d);},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x7f6)]=function(_0xefff04){const _0x18400d=_0x518efc,_0xa46c22=new Sprite_Clickable(),_0x3edbfc=this[_0x18400d(0x591)]();_0xa46c22['x']=_0xefff04['x']-_0x3edbfc['x'],_0xa46c22['y']=_0xefff04['y']-_0x3edbfc['y'],_0xa46c22['z']=0x64;const _0x49a3e5=this[_0x18400d(0x591)]();return _0x49a3e5[_0x18400d(0x1f4)](_0xa46c22),[_0xa46c22];},Spriteset_Base[_0x518efc(0xa41)]['getPointAnimationLayer']=function(){return this;},Spriteset_Map[_0x518efc(0xa41)][_0x518efc(0x591)]=function(){const _0x351a72=_0x518efc;return this[_0x351a72(0x393)]||this;},Spriteset_Battle[_0x518efc(0xa41)][_0x518efc(0x591)]=function(){const _0x344817=_0x518efc;return this[_0x344817(0x480)]||this;},Spriteset_Base[_0x518efc(0xa41)]['createPointAnimationSprite']=function(_0x49aecb,_0x91f4d1,_0x3e1e6f,_0x2f1fd5,_0x51cce6){const _0x3cbab3=_0x518efc,_0x4855fd=this[_0x3cbab3(0x9ad)](_0x91f4d1),_0x39faa6=new(_0x4855fd?Sprite_AnimationMV:Sprite_Animation)();_0x39faa6[_0x3cbab3(0x41f)]=_0x49aecb,_0x39faa6[_0x3cbab3(0x500)](_0x49aecb,_0x91f4d1,_0x3e1e6f,_0x2f1fd5),_0x39faa6['setMute'](_0x51cce6),this[_0x3cbab3(0x230)](_0x39faa6),this[_0x3cbab3(0xa03)][_0x3cbab3(0x609)](_0x39faa6);},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x78b)]=function(_0x3d4431){const _0x11964a=_0x518efc;this[_0x11964a(0xa03)][_0x11964a(0x3ac)](_0x3d4431),this[_0x11964a(0x7e5)][_0x11964a(0x54a)](_0x3d4431);for(const _0x5c9fc2 of _0x3d4431[_0x11964a(0x41f)]){if(_0x11964a(0x780)!=='zruVz'){_0x5c9fc2['endAnimation']&&_0x5c9fc2['endAnimation']();const _0x595f13=this[_0x11964a(0x591)]();if(_0x595f13)_0x595f13[_0x11964a(0x54a)](_0x5c9fc2);}else{const _0x15cfe5='AllMaps';this[_0x11964a(0x771)][_0x11964a(0x3ac)](_0x23b268)[_0x11964a(0x3ac)]('')[_0x11964a(0x3ac)](null);const _0x59167a=this['_storedMapText'][_0x11964a(0x681)](_0x11964a(0x53f))['trim']();_0x27a225['CoreEngine']['ExportString'](_0x59167a,_0x15cfe5,!![]),_0x3ebfb8[_0x11964a(0x18c)]['_active']=!![];}}_0x3d4431[_0x11964a(0x605)]();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x1eddbe=_0x518efc;for(const _0x2d4b51 of this['_pointAnimationSprites']){this[_0x1eddbe(0x78b)](_0x2d4b51);}},Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x9c6)]=function(){const _0x59de87=_0x518efc;return this['_pointAnimationSprites'][_0x59de87(0x18d)]>0x0;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x1b4)]=Spriteset_Base[_0x518efc(0xa41)][_0x518efc(0x930)],Spriteset_Base[_0x518efc(0xa41)]['isAnimationPlaying']=function(){const _0x37fb5d=_0x518efc;return VisuMZ[_0x37fb5d(0x1c9)][_0x37fb5d(0x1b4)][_0x37fb5d(0x30d)](this)||this[_0x37fb5d(0x9c6)]();},Spriteset_Map[_0x518efc(0x248)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x927)][_0x518efc(0x343)]||![],VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x394)]=Scene_Map[_0x518efc(0xa41)]['createSpriteset'],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x15b)]=function(){const _0x1f3de3=_0x518efc;VisuMZ[_0x1f3de3(0x1c9)][_0x1f3de3(0x394)][_0x1f3de3(0x30d)](this);if(!Spriteset_Map[_0x1f3de3(0x248)])return;const _0x3eb0b1=this[_0x1f3de3(0x529)];if(!_0x3eb0b1)return;this[_0x1f3de3(0x971)]=_0x3eb0b1[_0x1f3de3(0x971)];if(!this[_0x1f3de3(0x971)])return;this[_0x1f3de3(0x1f4)](this['_pictureContainer']);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ['CoreEngine'][_0x518efc(0x54d)]['QoL'][_0x518efc(0x1de)]||![],VisuMZ['CoreEngine'][_0x518efc(0x853)]=Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x15b)],Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x15b)]=function(){const _0x3977ce=_0x518efc;VisuMZ['CoreEngine'][_0x3977ce(0x853)][_0x3977ce(0x30d)](this);if(!Spriteset_Battle[_0x3977ce(0x248)])return;const _0x2c0e49=this[_0x3977ce(0x529)];if(!_0x2c0e49)return;this[_0x3977ce(0x971)]=_0x2c0e49[_0x3977ce(0x971)];if(!this[_0x3977ce(0x971)])return;this[_0x3977ce(0x1f4)](this[_0x3977ce(0x971)]);},Spriteset_Battle['prototype'][_0x518efc(0x5f4)]=function(){const _0x5b797e=_0x518efc;this[_0x5b797e(0x98e)]=new PIXI[(_0x5b797e(0x6dd))][(_0x5b797e(0x423))](clamp=!![]),this[_0x5b797e(0x767)]=new Sprite(),this['_backgroundSprite'][_0x5b797e(0x463)]=SceneManager['backgroundBitmap'](),this[_0x5b797e(0x767)][_0x5b797e(0x6dd)]=[this['_backgroundFilter']],this[_0x5b797e(0x9ae)]['addChild'](this[_0x5b797e(0x767)]);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x6b5)]=Spriteset_Battle[_0x518efc(0xa41)][_0x518efc(0x9a5)],Spriteset_Battle[_0x518efc(0xa41)][_0x518efc(0x9a5)]=function(){const _0x4d0ca1=_0x518efc;this[_0x4d0ca1(0xa16)]()&&this['repositionEnemiesByResolution'](),VisuMZ[_0x4d0ca1(0x1c9)][_0x4d0ca1(0x6b5)][_0x4d0ca1(0x30d)](this);},Spriteset_Battle['prototype']['coreEngineRepositionEnemies']=function(){const _0x5546bb=_0x518efc,_0x3342d2=VisuMZ[_0x5546bb(0x1c9)][_0x5546bb(0x54d)]['ScreenResolution'];if(!_0x3342d2)return![];if(Utils[_0x5546bb(0x636)]>='1.3.0'&&!_0x3342d2[_0x5546bb(0x757)])return![];return _0x3342d2[_0x5546bb(0x655)];},Spriteset_Battle['prototype'][_0x518efc(0x548)]=function(){const _0x535dfc=_0x518efc;for(member of $gameTroop[_0x535dfc(0xa6e)]()){if(_0x535dfc(0x2c3)==='jHSAN')member[_0x535dfc(0x409)]();else return _0x5c0245[_0x535dfc(0x587)][_0x535dfc(0x48b)][_0x535dfc(0x30d)](this);}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x1c0)]=Window_Base[_0x518efc(0xa41)][_0x518efc(0x55e)],Window_Base['prototype'][_0x518efc(0x55e)]=function(_0x2dc571){const _0x5bc43b=_0x518efc;_0x2dc571['x']=Math[_0x5bc43b(0x38c)](_0x2dc571['x']),_0x2dc571['y']=Math['round'](_0x2dc571['y']),_0x2dc571[_0x5bc43b(0x217)]=Math['round'](_0x2dc571['width']),_0x2dc571[_0x5bc43b(0x622)]=Math['round'](_0x2dc571['height']),this[_0x5bc43b(0xa4e)](),VisuMZ[_0x5bc43b(0x1c9)][_0x5bc43b(0x1c0)][_0x5bc43b(0x30d)](this,_0x2dc571),this[_0x5bc43b(0x1e6)]();},Window_Base[_0x518efc(0xa41)]['initDigitGrouping']=function(){const _0xee1c9a=_0x518efc;this[_0xee1c9a(0x2d4)]=VisuMZ[_0xee1c9a(0x1c9)]['Settings'][_0xee1c9a(0x927)][_0xee1c9a(0x913)],this[_0xee1c9a(0x39b)]=VisuMZ[_0xee1c9a(0x1c9)][_0xee1c9a(0x54d)]['QoL'][_0xee1c9a(0x9bb)];},Window_Base[_0x518efc(0xa41)][_0x518efc(0x669)]=function(){const _0x5e952f=_0x518efc;return VisuMZ[_0x5e952f(0x1c9)][_0x5e952f(0x54d)][_0x5e952f(0x90f)][_0x5e952f(0x6e3)];},Window_Base[_0x518efc(0xa41)][_0x518efc(0x280)]=function(){const _0x288175=_0x518efc;return VisuMZ[_0x288175(0x1c9)][_0x288175(0x54d)]['Window'][_0x288175(0x1fc)];},Window_Base[_0x518efc(0xa41)]['updateBackOpacity']=function(){const _0x24663f=_0x518efc;$gameSystem[_0x24663f(0x997)]?this[_0x24663f(0x5a4)]=$gameSystem[_0x24663f(0x997)]():'LSMdp'==='LSMdp'?this[_0x24663f(0x5a4)]=VisuMZ[_0x24663f(0x1c9)][_0x24663f(0x54d)][_0x24663f(0x90f)]['BackOpacity']:this['_displayX']=this['centerCameraCheckData']()[_0x24663f(0x824)];},Window_Base[_0x518efc(0xa41)][_0x518efc(0x8b2)]=function(){const _0x500d8f=_0x518efc;return VisuMZ[_0x500d8f(0x1c9)][_0x500d8f(0x54d)]['Window'][_0x500d8f(0x908)];},Window_Base[_0x518efc(0xa41)][_0x518efc(0x837)]=function(){const _0x42aef0=_0x518efc;return VisuMZ['CoreEngine']['Settings'][_0x42aef0(0x90f)][_0x42aef0(0x85e)];},VisuMZ[_0x518efc(0x1c9)]['Window_Base_update']=Window_Base[_0x518efc(0xa41)][_0x518efc(0x4ba)],Window_Base[_0x518efc(0xa41)][_0x518efc(0x4ba)]=function(){const _0xb05972=_0x518efc;VisuMZ[_0xb05972(0x1c9)][_0xb05972(0x8f5)][_0xb05972(0x30d)](this),this[_0xb05972(0x3dc)]();},Window_Base[_0x518efc(0xa41)]['updateOpen']=function(){const _0x1dcb31=_0x518efc;if(this[_0x1dcb31(0x720)]){if('GVcee'===_0x1dcb31(0x70b))this[_0x1dcb31(0x86f)](_0x1dcb31(0x592));else{this['openness']+=this[_0x1dcb31(0x837)]();if(this[_0x1dcb31(0x192)]()){if(_0x1dcb31(0x4eb)!==_0x1dcb31(0x4eb)){_0x237ac1-=_0x43080c;if(_0x2a5a54<=0x0)_0x240a94=0x0;this[_0x1dcb31(0x3c1)](_0x2ea6a6);}else this[_0x1dcb31(0x720)]=![];}}}},Window_Base[_0x518efc(0xa41)][_0x518efc(0x912)]=function(){const _0x30dd81=_0x518efc;this['_closing']&&('gOqLN'!==_0x30dd81(0x3d3)?(this['openness']-=this[_0x30dd81(0x837)](),this[_0x30dd81(0x494)]()&&(this[_0x30dd81(0x9fd)]=![])):_0x430632[_0x30dd81(0x541)]&&(this[_0x30dd81(0x7da)]=_0x30dd81(0x4fc)));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x44f)]=Window_Base[_0x518efc(0xa41)][_0x518efc(0x161)],Window_Base[_0x518efc(0xa41)]['drawText']=function(_0x2c3a8e,_0x4c9286,_0x302430,_0x4dcd00,_0x490c0c){const _0x1a058b=_0x518efc;if(this[_0x1a058b(0x452)]())_0x2c3a8e=VisuMZ[_0x1a058b(0x1bd)](_0x2c3a8e);VisuMZ[_0x1a058b(0x1c9)][_0x1a058b(0x44f)][_0x1a058b(0x30d)](this,_0x2c3a8e,_0x4c9286,_0x302430,_0x4dcd00,_0x490c0c);},Window_Base[_0x518efc(0xa41)][_0x518efc(0x452)]=function(){const _0x52be91=_0x518efc;return this[_0x52be91(0x2d4)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x259)]=Window_Base['prototype']['createTextState'],Window_Base[_0x518efc(0xa41)][_0x518efc(0x58b)]=function(_0x2905be,_0x2492a8,_0x5726ae,_0x47efd8){const _0x1e2ac9=_0x518efc;var _0x2dc3ff=VisuMZ[_0x1e2ac9(0x1c9)][_0x1e2ac9(0x259)][_0x1e2ac9(0x30d)](this,_0x2905be,_0x2492a8,_0x5726ae,_0x47efd8);if(this[_0x1e2ac9(0x46f)]())_0x2dc3ff['text']=VisuMZ[_0x1e2ac9(0x1bd)](_0x2dc3ff[_0x1e2ac9(0x801)]);return _0x2dc3ff;},Window_Base[_0x518efc(0xa41)]['useDigitGroupingEx']=function(){const _0x3dd6ce=_0x518efc;return this[_0x3dd6ce(0x39b)];},Window_Base[_0x518efc(0xa41)][_0x518efc(0x7c7)]=function(_0x61b178){this['_digitGrouping']=_0x61b178;},Window_Base[_0x518efc(0xa41)]['enableDigitGroupingEx']=function(_0x3e782f){this['_digitGroupingEx']=_0x3e782f;},VisuMZ[_0x518efc(0x1c9)]['Window_Base_drawIcon']=Window_Base['prototype'][_0x518efc(0x64b)],Window_Base[_0x518efc(0xa41)][_0x518efc(0x64b)]=function(_0x2dcd10,_0x1bf2b3,_0x328343){const _0x3300b7=_0x518efc;_0x1bf2b3=Math['round'](_0x1bf2b3),_0x328343=Math[_0x3300b7(0x38c)](_0x328343),VisuMZ[_0x3300b7(0x1c9)][_0x3300b7(0x26a)][_0x3300b7(0x30d)](this,_0x2dcd10,_0x1bf2b3,_0x328343);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x75f)]=Window_Base[_0x518efc(0xa41)][_0x518efc(0x3ee)],Window_Base[_0x518efc(0xa41)][_0x518efc(0x3ee)]=function(_0x26b9f1,_0x1128f0,_0x388077,_0x4bee91,_0x2dfd38,_0xfd85dd){const _0x5b0569=_0x518efc;_0x2dfd38=_0x2dfd38||ImageManager['faceWidth'],_0xfd85dd=_0xfd85dd||ImageManager[_0x5b0569(0x9e9)],_0x388077=Math[_0x5b0569(0x38c)](_0x388077),_0x4bee91=Math[_0x5b0569(0x38c)](_0x4bee91),_0x2dfd38=Math['round'](_0x2dfd38),_0xfd85dd=Math[_0x5b0569(0x38c)](_0xfd85dd),VisuMZ[_0x5b0569(0x1c9)]['Window_Base_drawFace']['call'](this,_0x26b9f1,_0x1128f0,_0x388077,_0x4bee91,_0x2dfd38,_0xfd85dd);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x2bf)]=Window_Base[_0x518efc(0xa41)]['drawCharacter'],Window_Base[_0x518efc(0xa41)][_0x518efc(0x475)]=function(_0x5385f1,_0x3e1137,_0x20fb5b,_0x28065b){const _0x4a693c=_0x518efc;_0x20fb5b=Math[_0x4a693c(0x38c)](_0x20fb5b),_0x28065b=Math['round'](_0x28065b),VisuMZ[_0x4a693c(0x1c9)][_0x4a693c(0x2bf)][_0x4a693c(0x30d)](this,_0x5385f1,_0x3e1137,_0x20fb5b,_0x28065b);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x170)]=Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x2df)],Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x2df)]=function(_0x27dd7e){const _0x35fdbb=_0x518efc;let _0x5b5fc6=VisuMZ[_0x35fdbb(0x1c9)][_0x35fdbb(0x170)][_0x35fdbb(0x30d)](this,_0x27dd7e);return _0x5b5fc6['x']=Math['round'](_0x5b5fc6['x']),_0x5b5fc6['y']=Math[_0x35fdbb(0x38c)](_0x5b5fc6['y']),_0x5b5fc6['width']=Math['round'](_0x5b5fc6[_0x35fdbb(0x217)]),_0x5b5fc6[_0x35fdbb(0x622)]=Math['round'](_0x5b5fc6[_0x35fdbb(0x622)]),_0x5b5fc6;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x9b2)]=Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x6f8)],Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x6f8)]=function(_0x1e49e8,_0x563612,_0x29df5f){const _0x37757c=_0x518efc;_0x563612=Math[_0x37757c(0x38c)](_0x563612),_0x29df5f=Math[_0x37757c(0x38c)](_0x29df5f),VisuMZ[_0x37757c(0x1c9)]['Window_StatusBase_drawActorSimpleStatus'][_0x37757c(0x30d)](this,_0x1e49e8,_0x563612,_0x29df5f);},Window_Base[_0x518efc(0xa41)][_0x518efc(0x1e6)]=function(){const _0x39878=_0x518efc;this[_0x39878(0x5f9)]={'duration':0x0,'wholeDuration':0x0,'type':_0x39878(0xa5c),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x39878(0x8b0)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x39878(0x5a4)],'targetContentsOpacity':this[_0x39878(0x34e)]};},Window_Base[_0x518efc(0xa41)]['updateCoreEasing']=function(){const _0x243b43=_0x518efc;if(!this[_0x243b43(0x5f9)])return;if(this['_coreEasing'][_0x243b43(0x314)]<=0x0)return;this['x']=this[_0x243b43(0xa0f)](this['x'],this['_coreEasing'][_0x243b43(0x735)]),this['y']=this[_0x243b43(0xa0f)](this['y'],this['_coreEasing'][_0x243b43(0x9f4)]),this[_0x243b43(0x8b0)]['x']=this[_0x243b43(0xa0f)](this['scale']['x'],this[_0x243b43(0x5f9)][_0x243b43(0x768)]),this[_0x243b43(0x8b0)]['y']=this['applyCoreEasing'](this[_0x243b43(0x8b0)]['y'],this[_0x243b43(0x5f9)][_0x243b43(0x264)]),this['opacity']=this[_0x243b43(0xa0f)](this[_0x243b43(0x8de)],this['_coreEasing'][_0x243b43(0x6e4)]),this['backOpacity']=this[_0x243b43(0xa0f)](this['backOpacity'],this[_0x243b43(0x5f9)][_0x243b43(0x9cc)]),this['contentsOpacity']=this[_0x243b43(0xa0f)](this[_0x243b43(0x34e)],this[_0x243b43(0x5f9)]['targetContentsOpacity']),this[_0x243b43(0x5f9)]['duration']--;},Window_Base[_0x518efc(0xa41)]['applyCoreEasing']=function(_0x3e8fa0,_0x2bc24e){const _0x48f7ac=_0x518efc;if(!this['_coreEasing'])return _0x2bc24e;const _0x394693=this[_0x48f7ac(0x5f9)][_0x48f7ac(0x314)],_0x335537=this[_0x48f7ac(0x5f9)][_0x48f7ac(0xa22)],_0x167f52=this[_0x48f7ac(0x51d)]((_0x335537-_0x394693)/_0x335537),_0xd67a41=this[_0x48f7ac(0x51d)]((_0x335537-_0x394693+0x1)/_0x335537),_0x3ac495=(_0x3e8fa0-_0x2bc24e*_0x167f52)/(0x1-_0x167f52);return _0x3ac495+(_0x2bc24e-_0x3ac495)*_0xd67a41;},Window_Base[_0x518efc(0xa41)][_0x518efc(0x51d)]=function(_0x2124ed){const _0xcad9c1=_0x518efc;if(!this['_coreEasing'])return _0x2124ed;return VisuMZ['ApplyEasing'](_0x2124ed,this[_0xcad9c1(0x5f9)][_0xcad9c1(0x355)]||_0xcad9c1(0xa5c));},Window_Base[_0x518efc(0xa41)]['anchorCoreEasing']=function(_0x515b0a,_0x3e549c){const _0x590cec=_0x518efc;if(!this['_coreEasing'])return;this['x']=this[_0x590cec(0x5f9)][_0x590cec(0x735)],this['y']=this[_0x590cec(0x5f9)][_0x590cec(0x9f4)],this[_0x590cec(0x8b0)]['x']=this[_0x590cec(0x5f9)][_0x590cec(0x768)],this['scale']['y']=this['_coreEasing'][_0x590cec(0x264)],this[_0x590cec(0x8de)]=this[_0x590cec(0x5f9)]['targetOpacity'],this[_0x590cec(0x5a4)]=this[_0x590cec(0x5f9)]['targetBackOpacity'],this[_0x590cec(0x34e)]=this[_0x590cec(0x5f9)]['targetContentsOpacity'],this[_0x590cec(0x3b2)](_0x515b0a,_0x3e549c,this['x'],this['y'],this[_0x590cec(0x8b0)]['x'],this[_0x590cec(0x8b0)]['y'],this[_0x590cec(0x8de)],this[_0x590cec(0x5a4)],this[_0x590cec(0x34e)]);},Window_Base['prototype'][_0x518efc(0x3b2)]=function(_0x25587c,_0x42de05,_0x3285c9,_0x264d5f,_0x1a044c,_0x5338dd,_0x3bd6f0,_0x2f1b0c,_0x55cb89){const _0x2fb0c6=_0x518efc;this[_0x2fb0c6(0x5f9)]={'duration':_0x25587c,'wholeDuration':_0x25587c,'type':_0x42de05,'targetX':_0x3285c9,'targetY':_0x264d5f,'targetScaleX':_0x1a044c,'targetScaleY':_0x5338dd,'targetOpacity':_0x3bd6f0,'targetBackOpacity':_0x2f1b0c,'targetContentsOpacity':_0x55cb89};},Window_Base[_0x518efc(0xa41)][_0x518efc(0x47b)]=function(_0x5f027b,_0x538cea,_0xa3b80f,_0x18773b,_0x237153){const _0x17977e=_0x518efc;this['resetFontSettings'](),this[_0x17977e(0x3fb)][_0x17977e(0xa0b)]=VisuMZ[_0x17977e(0x1c9)][_0x17977e(0x54d)][_0x17977e(0x980)][_0x17977e(0x70c)];const _0x3b6000=VisuMZ[_0x17977e(0x1c9)][_0x17977e(0x54d)]['Gold']['GoldIcon'];if(_0x3b6000>0x0&&_0x538cea===TextManager[_0x17977e(0xa49)]){if('baaZu'===_0x17977e(0xa3d)){const _0x59ee37=_0x28854c[_0x187453][_0x17977e(0x864)];_0x4924b4+=_0x4f4cd3+_0x17977e(0x6c9)[_0x17977e(0x67d)](_0x3e15d6,_0x59ee37||_0x17977e(0x809))+_0x5c4507;}else{const _0x27f04d=_0x18773b+(this[_0x17977e(0x669)]()-ImageManager[_0x17977e(0x1fd)])/0x2;this[_0x17977e(0x64b)](_0x3b6000,_0xa3b80f+(_0x237153-ImageManager['iconWidth']),_0x27f04d),_0x237153-=ImageManager[_0x17977e(0x2de)]+0x4;}}else this['changeTextColor'](ColorManager[_0x17977e(0x242)]()),this['drawText'](_0x538cea,_0xa3b80f,_0x18773b,_0x237153,_0x17977e(0xa44)),_0x237153-=this[_0x17977e(0x7c6)](_0x538cea)+0x6;this['resetTextColor']();const _0x6347ef=this['textWidth'](this[_0x17977e(0x2d4)]?VisuMZ[_0x17977e(0x1bd)](_0x5f027b):_0x5f027b);_0x6347ef>_0x237153?_0x17977e(0x635)===_0x17977e(0x14a)?this[_0x17977e(0x348)]['setBackgroundType'](_0x488fd5[_0x17977e(0x587)][_0x17977e(0x247)]):this[_0x17977e(0x161)](VisuMZ[_0x17977e(0x1c9)][_0x17977e(0x54d)]['Gold'][_0x17977e(0x496)],_0xa3b80f,_0x18773b,_0x237153,_0x17977e(0xa44)):this[_0x17977e(0x161)](_0x5f027b,_0xa3b80f,_0x18773b,_0x237153,_0x17977e(0xa44)),this[_0x17977e(0x4da)]();},Window_Base[_0x518efc(0xa41)][_0x518efc(0x27e)]=function(_0x717b44,_0x5765ed,_0x24122b,_0x56d7e6,_0x1924bf){const _0x5df16f=_0x518efc,_0x33d234=ImageManager['loadSystem']('IconSet'),_0x374f5e=ImageManager[_0x5df16f(0x2de)],_0x956165=ImageManager['iconHeight'],_0x1299f9=_0x717b44%0x10*_0x374f5e,_0x469685=Math['floor'](_0x717b44/0x10)*_0x956165,_0xd61e9=_0x56d7e6,_0x1c8337=_0x56d7e6;this['contents'][_0x5df16f(0x56c)][_0x5df16f(0x832)]=_0x1924bf,this[_0x5df16f(0x3fb)][_0x5df16f(0x9a2)](_0x33d234,_0x1299f9,_0x469685,_0x374f5e,_0x956165,_0x5765ed,_0x24122b,_0xd61e9,_0x1c8337),this[_0x5df16f(0x3fb)][_0x5df16f(0x56c)][_0x5df16f(0x832)]=!![];},Window_Base[_0x518efc(0xa41)]['drawGauge']=function(_0x29691c,_0x1f723e,_0x419327,_0x12b144,_0x416bc5,_0x17c8dd){const _0x5880fc=_0x518efc,_0xb0fc30=Math['floor']((_0x419327-0x2)*_0x12b144),_0x4ef1b3=Sprite_Gauge[_0x5880fc(0xa41)]['gaugeHeight']['call'](this),_0x117354=_0x1f723e+this[_0x5880fc(0x669)]()-_0x4ef1b3-0x2;this['contents']['fillRect'](_0x29691c,_0x117354,_0x419327,_0x4ef1b3,ColorManager[_0x5880fc(0x52e)]()),this[_0x5880fc(0x3fb)]['gradientFillRect'](_0x29691c+0x1,_0x117354+0x1,_0xb0fc30,_0x4ef1b3-0x2,_0x416bc5,_0x17c8dd);},Window_Scrollable[_0x518efc(0x44c)]={'enabled':VisuMZ['CoreEngine']['Settings'][_0x518efc(0x90f)][_0x518efc(0x151)]??!![],'thickness':VisuMZ[_0x518efc(0x1c9)]['Settings'][_0x518efc(0x90f)][_0x518efc(0x8f6)]??0x2,'offset':VisuMZ['CoreEngine'][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x9c5)]??0x2,'bodyColor':VisuMZ['CoreEngine'][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x45c)]??0x0,'offColor':VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x26d)]??0x7,'offOpacity':VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x42c)]??0x80},Window_Base[_0x518efc(0xa41)][_0x518efc(0x421)]=function(){const _0x3d6969=_0x518efc;return Window_Scrollable[_0x3d6969(0x44c)][_0x3d6969(0x98a)]&&Window_Scrollable['SCROLLBAR'][_0x3d6969(0x3c9)]>0x0;},VisuMZ[_0x518efc(0x1c9)]['Window_Base_createContents']=Window_Base['prototype'][_0x518efc(0x2d0)],Window_Base[_0x518efc(0xa41)][_0x518efc(0x2d0)]=function(){const _0xb024f2=_0x518efc;VisuMZ[_0xb024f2(0x1c9)][_0xb024f2(0x381)][_0xb024f2(0x30d)](this),this[_0xb024f2(0x95c)](),this['setupScrollBarBitmap'](!![]),this[_0xb024f2(0x8b9)](![]);},Window_Base[_0x518efc(0xa41)][_0x518efc(0x95c)]=function(){const _0x5e9494=_0x518efc;if(!this['isScrollBarVisible']())return;if(this[_0x5e9494(0x84f)]||this[_0x5e9494(0x48a)])return;this[_0x5e9494(0x405)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this['_scrollBarHorz']=new Sprite(),this[_0x5e9494(0x48a)]=new Sprite(),this[_0x5e9494(0x1f4)](this['_scrollBarHorz']),this[_0x5e9494(0x1f4)](this[_0x5e9494(0x48a)]);},Window_Base[_0x518efc(0xa41)][_0x518efc(0x8b9)]=function(_0x8d1dd0){const _0x55d46d=_0x518efc,_0x4f572a=_0x8d1dd0?this['_scrollBarHorz']:this[_0x55d46d(0x48a)];if(!_0x4f572a)return;const _0x532a7b=Window_Scrollable['SCROLLBAR'],_0x27a909=_0x532a7b[_0x55d46d(0x3c9)],_0x11cad9=_0x8d1dd0?this[_0x55d46d(0xa59)]-_0x27a909*0x2:_0x27a909,_0x5b2a37=_0x8d1dd0?_0x27a909:this[_0x55d46d(0x900)]-_0x27a909*0x2;_0x4f572a[_0x55d46d(0x463)]=new Bitmap(_0x11cad9,_0x5b2a37),_0x4f572a[_0x55d46d(0x996)](0x0,0x0,_0x11cad9,_0x5b2a37),this[_0x55d46d(0x146)](_0x8d1dd0);},VisuMZ['CoreEngine'][_0x518efc(0x241)]=Window_Base['prototype']['destroyContents'],Window_Base[_0x518efc(0xa41)]['destroyContents']=function(){const _0x260420=_0x518efc;VisuMZ[_0x260420(0x1c9)][_0x260420(0x241)]['call'](this),this[_0x260420(0x2f5)]();},Window_Base[_0x518efc(0xa41)]['destroyScrollBarBitmaps']=function(){const _0xdc81d3=_0x518efc,_0x1b074e=[this[_0xdc81d3(0x84f)],this[_0xdc81d3(0x48a)]];for(const _0x595038 of _0x1b074e){if(_0xdc81d3(0x8a8)!==_0xdc81d3(0x8a8)){if(!_0x5043ca[_0xdc81d3(0x18c)])return;if(!_0x19f8e4['_scene'][_0xdc81d3(0x529)])return;_0x150c0c['ConvertParams'](_0x62fabd,_0x594dd7);const _0x2902a2=_0xed8e02[_0xdc81d3(0x38c)](_0x22ee30[_0xdc81d3(0x728)]),_0xde7819=_0x2630e9[_0xdc81d3(0x38c)](_0x3e1150[_0xdc81d3(0x561)]);_0x23b183[_0xdc81d3(0x4dc)](_0x2902a2,_0xde7819,_0x388005[_0xdc81d3(0x21e)],_0x57b6a2[_0xdc81d3(0x8dc)],_0x173279[_0xdc81d3(0x712)]);}else{if(_0x595038&&_0x595038[_0xdc81d3(0x463)])_0x595038[_0xdc81d3(0x463)][_0xdc81d3(0x605)]();}}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5d5)]=Window_Scrollable[_0x518efc(0xa41)][_0x518efc(0x4ba)],Window_Scrollable['prototype']['update']=function(){const _0x5cc13d=_0x518efc;VisuMZ['CoreEngine'][_0x5cc13d(0x5d5)][_0x5cc13d(0x30d)](this),this['updateScrollBars']();},Window_Scrollable['prototype']['updateScrollBars']=function(){const _0x1bc473=_0x518efc;this['updateScrollBarVisibility'](),this[_0x1bc473(0x297)](!![]),this[_0x1bc473(0x297)](![]),this[_0x1bc473(0x146)](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x518efc(0xa41)]['updateScrollBarVisibility']=function(){const _0x4e92a4=_0x518efc,_0x5b36ee=[this['_scrollBarHorz'],this[_0x4e92a4(0x48a)]];for(const _0x29ffc5 of _0x5b36ee){_0x29ffc5&&(_0x29ffc5[_0x4e92a4(0x596)]=this[_0x4e92a4(0x421)]()&&this[_0x4e92a4(0x192)]());}},Window_Scrollable[_0x518efc(0xa41)][_0x518efc(0x297)]=function(_0x1be4c8){const _0x8c15b4=_0x518efc;if(!this[_0x8c15b4(0x405)])return;const _0x230387=this[_0x8c15b4(0x742)](_0x1be4c8),_0x586263=this[_0x8c15b4(0x604)](_0x1be4c8),_0x4e1269=_0x1be4c8?'horz':_0x8c15b4(0x929),_0x587699=_0x1be4c8?'maxHorz':_0x8c15b4(0x2db);(this[_0x8c15b4(0x405)][_0x4e1269]!==_0x230387||this['_lastScrollBarValues'][_0x587699]!==_0x586263)&&(_0x8c15b4(0x4ae)!==_0x8c15b4(0x4ae)?(_0x581525[_0x8c15b4(0x1c9)]['Scene_Map_updateScene'][_0x8c15b4(0x30d)](this),this[_0x8c15b4(0xa1c)]()):(this[_0x8c15b4(0x405)][_0x4e1269]=_0x230387,this['_lastScrollBarValues'][_0x587699]=_0x586263,this[_0x8c15b4(0x14c)](_0x1be4c8,_0x230387,_0x586263)));},Window_Scrollable[_0x518efc(0xa41)][_0x518efc(0x742)]=function(_0x1b4bac){const _0x27a42c=_0x518efc;if(this['_allTextHeight']!==undefined){if(_0x27a42c(0x615)===_0x27a42c(0x140))this[_0x27a42c(0x3fb)][_0x27a42c(0xa0b)]<=0x60&&(this['contents'][_0x27a42c(0xa0b)]+=0x6);else return _0x1b4bac?this[_0x27a42c(0x1a3)]():this[_0x27a42c(0x6d7)]['y'];}return _0x1b4bac?this[_0x27a42c(0x1a3)]():this[_0x27a42c(0x546)]();},Window_Scrollable[_0x518efc(0xa41)][_0x518efc(0x604)]=function(_0x3451b0){const _0x4a7441=_0x518efc;if(this['_allTextHeight']!==undefined){if(_0x4a7441(0x5e0)!==_0x4a7441(0x5e0)){if(this[_0x4a7441(0x562)](_0xb7d450))return!![];if(this[_0x4a7441(0x2a1)](_0x1f9f1d))return!![];}else return _0x3451b0?this[_0x4a7441(0x556)]():Math[_0x4a7441(0x55c)](0x0,this[_0x4a7441(0x5a6)]-this[_0x4a7441(0x900)]);}return _0x3451b0?this[_0x4a7441(0x556)]():this[_0x4a7441(0x816)]();},Window_Scrollable['prototype']['scrollbarHeight']=function(){const _0x46223d=_0x518efc;if(this[_0x46223d(0x5a6)]!==undefined){if(_0x46223d(0x46a)!==_0x46223d(0x509))return Math[_0x46223d(0x55c)](0x0,this['_allTextHeight']);else this[_0x46223d(0x5a4)]=_0x4786ee[_0x46223d(0x997)]();}return this[_0x46223d(0x2a8)]();},Window_Scrollable[_0x518efc(0xa41)][_0x518efc(0x14c)]=function(_0x4bcdbf,_0x5047cc,_0x51a1b4){const _0x58d39c=_0x518efc,_0x1235c2=_0x4bcdbf?this[_0x58d39c(0x84f)]:this[_0x58d39c(0x48a)];if(!_0x1235c2)return;if(!_0x1235c2[_0x58d39c(0x463)])return;const _0x6a1e91=_0x1235c2[_0x58d39c(0x463)];_0x6a1e91[_0x58d39c(0x85c)]();if(_0x51a1b4<=0x0)return;const _0x26ae71=_0x4bcdbf?this['innerWidth']/this[_0x58d39c(0x6fb)]():this[_0x58d39c(0x900)]/this['scrollbarHeight'](),_0x39bf4b=_0x4bcdbf?Math['round'](_0x5047cc*_0x26ae71):0x0,_0x5ad535=_0x4bcdbf?0x0:Math[_0x58d39c(0x38c)](_0x5047cc*_0x26ae71),_0x4e5d08=_0x4bcdbf?Math[_0x58d39c(0x38c)](_0x6a1e91[_0x58d39c(0x217)]*_0x26ae71):_0x6a1e91[_0x58d39c(0x217)],_0x1353aa=_0x4bcdbf?_0x6a1e91[_0x58d39c(0x622)]:Math[_0x58d39c(0x38c)](_0x6a1e91[_0x58d39c(0x622)]*_0x26ae71),_0x383726=Window_Scrollable[_0x58d39c(0x44c)],_0x1d855c=ColorManager[_0x58d39c(0x716)](_0x383726[_0x58d39c(0x628)]),_0x1b5695=ColorManager['getColor'](_0x383726[_0x58d39c(0x93d)]),_0x1cea13=_0x383726[_0x58d39c(0x35c)];_0x6a1e91['paintOpacity']=_0x1cea13,_0x6a1e91['fillAll'](_0x1d855c),_0x6a1e91['paintOpacity']=0xff,_0x6a1e91['fillRect'](_0x39bf4b,_0x5ad535,_0x4e5d08,_0x1353aa,_0x1b5695);},Window_Base[_0x518efc(0xa41)]['updateScrollBarPosition']=function(_0x350e9c){const _0x6f4760=_0x518efc,_0x3bacee=_0x350e9c?this[_0x6f4760(0x84f)]:this[_0x6f4760(0x48a)];if(!_0x3bacee)return;const _0x1d9175=Window_Scrollable[_0x6f4760(0x44c)],_0x39c073=_0x1d9175['thickness'],_0x361f2c=_0x1d9175['offset'];if(!_0x3bacee['transform'])return;_0x3bacee['x']=this[_0x6f4760(0x1b8)]+(_0x350e9c?_0x39c073:this[_0x6f4760(0xa59)]+_0x361f2c),_0x3bacee['y']=this[_0x6f4760(0x1b8)]+(_0x350e9c?this[_0x6f4760(0x900)]+_0x361f2c:_0x39c073);},Window_Selectable[_0x518efc(0xa41)]['cursorDown']=function(_0x311606){const _0x5f05b0=_0x518efc;let _0x4647f1=this[_0x5f05b0(0x364)]();const _0x5e7e56=this[_0x5f05b0(0x22d)](),_0x1c70a3=this[_0x5f05b0(0x9d1)]();if(this[_0x5f05b0(0x9be)]()&&(_0x4647f1<_0x5e7e56||_0x311606&&_0x1c70a3===0x1)){_0x4647f1+=_0x1c70a3;if(_0x4647f1>=_0x5e7e56)_0x4647f1=_0x5e7e56-0x1;this[_0x5f05b0(0x3c1)](_0x4647f1);}else!this[_0x5f05b0(0x9be)]()&&((_0x4647f1<_0x5e7e56-_0x1c70a3||_0x311606&&_0x1c70a3===0x1)&&this[_0x5f05b0(0x3c1)]((_0x4647f1+_0x1c70a3)%_0x5e7e56));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x73e)]=Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x7b0)],Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x7b0)]=function(_0x1d7846){const _0x2a4fb8=_0x518efc;this[_0x2a4fb8(0x9be)]()&&_0x1d7846&&this[_0x2a4fb8(0x9d1)]()===0x1&&this['index']()===this[_0x2a4fb8(0x22d)]()-0x1?this['smoothSelect'](0x0):VisuMZ['CoreEngine'][_0x2a4fb8(0x73e)][_0x2a4fb8(0x30d)](this,_0x1d7846);},Window_Selectable[_0x518efc(0xa41)]['cursorUp']=function(_0x2f82a5){const _0x48e5dd=_0x518efc;let _0x2a68e7=Math[_0x48e5dd(0x55c)](0x0,this['index']());const _0x122e1c=this[_0x48e5dd(0x22d)](),_0x1935d0=this[_0x48e5dd(0x9d1)]();if(this[_0x48e5dd(0x9be)]()&&_0x2a68e7>0x0||_0x2f82a5&&_0x1935d0===0x1){_0x2a68e7-=_0x1935d0;if(_0x2a68e7<=0x0)_0x2a68e7=0x0;this['smoothSelect'](_0x2a68e7);}else{if(!this[_0x48e5dd(0x9be)]()){if(_0x48e5dd(0x79a)!==_0x48e5dd(0x1b0))(_0x2a68e7>=_0x1935d0||_0x2f82a5&&_0x1935d0===0x1)&&this[_0x48e5dd(0x3c1)]((_0x2a68e7-_0x1935d0+_0x122e1c)%_0x122e1c);else{this[_0x48e5dd(0x3fb)][_0x48e5dd(0x85c)]();const _0x4ef981=_0x3714b0[_0x48e5dd(0x2d2)],_0x3d93d9=_0x26e409[_0x48e5dd(0x63f)](_0x4ef981);if(!_0x3d93d9)return;this[_0x48e5dd(0x1ee)]=_0x3d93d9[_0x48e5dd(0x937)],this[_0x48e5dd(0x803)]=_0x3d93d9['_x'],this[_0x48e5dd(0x3db)]=_0x3d93d9['_y'];const _0x2836e8=_0x528ff6['itemBackColor1']();this[_0x48e5dd(0x3fb)][_0x48e5dd(0x56b)](0x0,0x0,this[_0x48e5dd(0xa59)],this[_0x48e5dd(0x900)],_0x2836e8);const _0x10766b=_0x48e5dd(0x4ca)[_0x48e5dd(0x67d)](_0x3d93d9[_0x48e5dd(0x937)]===0x0?_0x48e5dd(0x6ca):_0x48e5dd(0x319)),_0x2608a2=_0x48e5dd(0x52d)[_0x48e5dd(0x67d)](_0x3d93d9['_x']),_0x414115=_0x48e5dd(0x18e)['format'](_0x3d93d9['_y']),_0x2c2184=_0x48e5dd(0x6cd)[_0x48e5dd(0x67d)](_0x5458d5[_0x48e5dd(0x976)](_0x48e5dd(0xa39)));let _0x1c0871=_0x29edb4[_0x48e5dd(0x25f)](this[_0x48e5dd(0xa59)]/0x4);this[_0x48e5dd(0x161)](_0x10766b,_0x1c0871*0x0,0x0,_0x1c0871),this[_0x48e5dd(0x161)](_0x2608a2,_0x1c0871*0x1,0x0,_0x1c0871,_0x48e5dd(0x5dc)),this['drawText'](_0x414115,_0x1c0871*0x2,0x0,_0x1c0871,_0x48e5dd(0x5dc));const _0x559a6c=this[_0x48e5dd(0x8ae)](_0x2c2184)[_0x48e5dd(0x217)],_0x23c061=this[_0x48e5dd(0xa59)]-_0x559a6c;this[_0x48e5dd(0x8dd)](_0x2c2184,_0x23c061,0x0,_0x559a6c);}}}},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable['prototype']['cursorUp'],Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x1bb)]=function(_0x59d5d2){const _0x1c495a=_0x518efc;if(this[_0x1c495a(0x9be)]()&&_0x59d5d2&&this[_0x1c495a(0x9d1)]()===0x1&&this[_0x1c495a(0x364)]()===0x0){if('uMHmW'==='qZxKa')return _0x4c74f7[_0x1c495a(0x587)]['HelpRect'][_0x1c495a(0x30d)](this);else this[_0x1c495a(0x3c1)](this[_0x1c495a(0x22d)]()-0x1);}else VisuMZ[_0x1c495a(0x1c9)][_0x1c495a(0x644)][_0x1c495a(0x30d)](this,_0x59d5d2);},Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x9be)]=function(){const _0x5179c6=_0x518efc;return VisuMZ[_0x5179c6(0x1c9)]['Settings'][_0x5179c6(0x927)][_0x5179c6(0x1b7)];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x522)]=Window_Selectable[_0x518efc(0xa41)]['processCursorMove'],Window_Selectable['prototype'][_0x518efc(0x588)]=function(){const _0x1dfe83=_0x518efc;this[_0x1dfe83(0x9be)]()?(this['processCursorMoveModernControls'](),this[_0x1dfe83(0x347)]()):_0x1dfe83(0x6f9)===_0x1dfe83(0x6f9)?VisuMZ[_0x1dfe83(0x1c9)][_0x1dfe83(0x522)]['call'](this):this['playCursorSound']();},Window_Selectable[_0x518efc(0xa41)]['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x8c0)]=function(){const _0x3520c7=_0x518efc;if(this[_0x3520c7(0x3de)]()){const _0xafbfbb=this[_0x3520c7(0x364)]();Input[_0x3520c7(0xa52)](_0x3520c7(0x4f0))&&(Input[_0x3520c7(0x177)](_0x3520c7(0x91d))&&this[_0x3520c7(0x13f)]()?this[_0x3520c7(0x8ef)]():this[_0x3520c7(0x7b0)](Input['isTriggered'](_0x3520c7(0x4f0))));if(Input[_0x3520c7(0xa52)]('up')){if(Input[_0x3520c7(0x177)](_0x3520c7(0x91d))&&this[_0x3520c7(0x13f)]())this[_0x3520c7(0x8e4)]();else{if(_0x3520c7(0x763)==='jBcKP'){this[_0x3520c7(0x88e)]++;let _0x5528fa=_0x407146['CoreEngine']['ExtractStrFromList'](_0x1b0523[_0x3520c7(0xa48)]);_0x5528fa[_0x3520c7(0x18d)]>0x0&&(_0x462aef+=_0x1c2519,_0x49fa88+=_0x25898d,_0x30fde6+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x3520c7(0x67d)](_0x55f180['id'],_0x4ee795[_0x3520c7(0x864)]),_0xfff863+=_0x274508,_0x54038d+=_0x5528fa,_0x400dfc+=_0x48e66c,_0x4a6482+=_0x3520c7(0x68f)[_0x3520c7(0x67d)](_0x4351ab['id'],_0x21c42d[_0x3520c7(0x864)]),_0x2f555f+=_0x475b0d),this[_0x3520c7(0x88e)]--;}else this[_0x3520c7(0x1bb)](Input['isTriggered']('up'));}}Input[_0x3520c7(0xa52)](_0x3520c7(0xa44))&&this['cursorRight'](Input[_0x3520c7(0x702)](_0x3520c7(0xa44))),Input['isRepeated'](_0x3520c7(0x42a))&&this['cursorLeft'](Input[_0x3520c7(0x702)]('left')),!this[_0x3520c7(0x5c5)]('pagedown')&&Input[_0x3520c7(0xa52)](_0x3520c7(0x50b))&&('dXYsv'!==_0x3520c7(0x8cd)?this[_0x3520c7(0x161)](_0x1f0aec[_0x3520c7(0x1c9)][_0x3520c7(0x54d)]['Gold'][_0x3520c7(0x496)],_0xd96e0d,_0x37cf77,_0x18b190,_0x3520c7(0xa44)):this['cursorPagedown']()),!this[_0x3520c7(0x5c5)](_0x3520c7(0x277))&&Input[_0x3520c7(0xa52)]('pageup')&&('vbqFd'==='vbqFd'?this[_0x3520c7(0x8e4)]():(_0x340035[_0x3520c7(0x713)](),this['requestMotion'](_0x3520c7(0x6eb)))),this[_0x3520c7(0x364)]()!==_0xafbfbb&&this['playCursorSound']();}},Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x347)]=function(){const _0x36c770=_0x518efc;if(this['isCursorMovable']()){const _0x4a39b5=this[_0x36c770(0x364)]();Input[_0x36c770(0x702)](_0x36c770(0xa02))&&this[_0x36c770(0x3c1)](Math[_0x36c770(0x253)](this[_0x36c770(0x364)](),0x0));Input[_0x36c770(0x702)](_0x36c770(0x8da))&&this['smoothSelect'](Math[_0x36c770(0x55c)](this[_0x36c770(0x364)](),this[_0x36c770(0x22d)]()-0x1));if(this[_0x36c770(0x364)]()!==_0x4a39b5){if(_0x36c770(0x55f)!==_0x36c770(0x3ab))this[_0x36c770(0x883)]();else return _0x248365['layoutSettings']['SlotRect'][_0x36c770(0x30d)](this);}}},VisuMZ['CoreEngine'][_0x518efc(0x585)]=Window_Selectable['prototype'][_0x518efc(0x8fd)],Window_Selectable['prototype'][_0x518efc(0x8fd)]=function(){const _0x1a0a60=_0x518efc;this[_0x1a0a60(0x9be)]()?this[_0x1a0a60(0x159)]():VisuMZ[_0x1a0a60(0x1c9)][_0x1a0a60(0x585)][_0x1a0a60(0x30d)](this);},Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x159)]=function(){const _0x292a23=_0x518efc;VisuMZ[_0x292a23(0x1c9)]['Window_Selectable_processTouch'][_0x292a23(0x30d)](this);},Window_Selectable['prototype'][_0x518efc(0x459)]=function(){const _0x469aea=_0x518efc;return VisuMZ['CoreEngine'][_0x469aea(0x54d)][_0x469aea(0x90f)]['ColSpacing'];},Window_Selectable[_0x518efc(0xa41)]['rowSpacing']=function(){const _0x5b2440=_0x518efc;return VisuMZ[_0x5b2440(0x1c9)][_0x5b2440(0x54d)][_0x5b2440(0x90f)][_0x5b2440(0xa28)];},Window_Selectable[_0x518efc(0xa41)]['itemHeight']=function(){const _0x568ba2=_0x518efc;return Window_Scrollable[_0x568ba2(0xa41)][_0x568ba2(0x804)][_0x568ba2(0x30d)](this)+VisuMZ['CoreEngine'][_0x568ba2(0x54d)][_0x568ba2(0x90f)]['ItemHeight'];;},VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x518efc(0xa41)][_0x518efc(0x222)],Window_Selectable[_0x518efc(0xa41)]['drawBackgroundRect']=function(_0x41b2ee){const _0x8a2f00=_0x518efc,_0x33955d=VisuMZ['CoreEngine'][_0x8a2f00(0x54d)]['Window'];if(_0x33955d[_0x8a2f00(0x406)]===![])return;if(_0x33955d['DrawItemBackgroundJS'])_0x33955d[_0x8a2f00(0x549)][_0x8a2f00(0x30d)](this,_0x41b2ee);else{if(_0x8a2f00(0x8f3)!==_0x8a2f00(0x8f3)){if(this[_0x8a2f00(0x364)]()===this[_0x8a2f00(0x92e)]-0x1)return;_0x27f99c[_0x8a2f00(0x85c)](),this[_0x8a2f00(0x5b5)](),_0x32589d[_0x8a2f00(0xa2e)](),this[_0x8a2f00(0x261)](this[_0x8a2f00(0x92e)]-0x1);}else VisuMZ[_0x8a2f00(0x1c9)][_0x8a2f00(0x81a)][_0x8a2f00(0x30d)](this,_0x41b2ee);}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x521)]=Window_Gold[_0x518efc(0xa41)]['refresh'],Window_Gold[_0x518efc(0xa41)][_0x518efc(0x5b5)]=function(){const _0x483818=_0x518efc;this[_0x483818(0x572)]()?this[_0x483818(0x8ff)]():VisuMZ[_0x483818(0x1c9)][_0x483818(0x521)][_0x483818(0x30d)](this);},Window_Gold[_0x518efc(0xa41)][_0x518efc(0x572)]=function(){const _0x1f0ef3=_0x518efc;if(TextManager[_0x1f0ef3(0xa49)]!==this[_0x1f0ef3(0xa49)]())return![];return VisuMZ[_0x1f0ef3(0x1c9)]['Settings']['Gold'][_0x1f0ef3(0x543)];},Window_Gold['prototype'][_0x518efc(0x8ff)]=function(){const _0x56c2d4=_0x518efc;this[_0x56c2d4(0x4da)](),this[_0x56c2d4(0x3fb)]['clear'](),this[_0x56c2d4(0x3fb)][_0x56c2d4(0xa0b)]=VisuMZ[_0x56c2d4(0x1c9)]['Settings']['Gold'][_0x56c2d4(0x70c)];const _0x1cfbd0=VisuMZ[_0x56c2d4(0x1c9)][_0x56c2d4(0x54d)][_0x56c2d4(0x980)][_0x56c2d4(0x99a)],_0x205a88=this[_0x56c2d4(0x510)](0x0);if(_0x1cfbd0>0x0){const _0x28ec01=_0x205a88['y']+(this['lineHeight']()-ImageManager[_0x56c2d4(0x1fd)])/0x2;this[_0x56c2d4(0x64b)](_0x1cfbd0,_0x205a88['x'],_0x28ec01);const _0x523861=ImageManager[_0x56c2d4(0x2de)]+0x4;_0x205a88['x']+=_0x523861,_0x205a88[_0x56c2d4(0x217)]-=_0x523861;}this[_0x56c2d4(0x190)](ColorManager[_0x56c2d4(0x242)]()),this[_0x56c2d4(0x161)](this[_0x56c2d4(0xa49)](),_0x205a88['x'],_0x205a88['y'],_0x205a88[_0x56c2d4(0x217)],'left');const _0x3af80a=this[_0x56c2d4(0x7c6)](this[_0x56c2d4(0xa49)]())+0x6;;_0x205a88['x']+=_0x3af80a,_0x205a88[_0x56c2d4(0x217)]-=_0x3af80a,this['resetTextColor']();const _0xc56206=this[_0x56c2d4(0x333)](),_0xfa7b39=this[_0x56c2d4(0x7c6)](this[_0x56c2d4(0x2d4)]?VisuMZ[_0x56c2d4(0x1bd)](this[_0x56c2d4(0x333)]()):this[_0x56c2d4(0x333)]());_0xfa7b39>_0x205a88[_0x56c2d4(0x217)]?this[_0x56c2d4(0x161)](VisuMZ['CoreEngine'][_0x56c2d4(0x54d)][_0x56c2d4(0x980)][_0x56c2d4(0x496)],_0x205a88['x'],_0x205a88['y'],_0x205a88[_0x56c2d4(0x217)],'right'):this[_0x56c2d4(0x161)](this[_0x56c2d4(0x333)](),_0x205a88['x'],_0x205a88['y'],_0x205a88[_0x56c2d4(0x217)],_0x56c2d4(0xa44)),this[_0x56c2d4(0x4da)]();},Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x28f)]=function(_0x26cb2b,_0x9d36cd,_0x235840,_0x4dc334,_0x458de9){const _0x528391=_0x518efc;_0x4dc334=String(_0x4dc334||'')[_0x528391(0x1fa)]();if(VisuMZ['CoreEngine'][_0x528391(0x54d)][_0x528391(0x224)]['DrawIcons']){if(_0x528391(0x4a8)!==_0x528391(0x96c)){const _0x28f9a3=VisuMZ[_0x528391(0xa53)](_0x4dc334);if(_0x458de9){if(_0x528391(0x8ab)!==_0x528391(0x49c))this[_0x528391(0x27e)](_0x28f9a3,_0x26cb2b,_0x9d36cd,this[_0x528391(0x81c)]()),_0x235840-=this[_0x528391(0x81c)]()+0x2,_0x26cb2b+=this[_0x528391(0x81c)]()+0x2;else{const _0x3e2345=_0x483f25[_0x528391(0x98d)](_0x55fee9)+0x1;let _0x328d93=_0x435876+_0x528391(0x667),_0x1e389c=_0x40e99e['CoreEngine']['ExtractStrFromList'](_0x5b43ae[_0x528391(0xa48)]);_0x1e389c[_0x528391(0x18d)]>0x0&&(_0x1cc033[_0x528391(0x18d)]>0x0?_0x3df73f+=_0x334523+_0x528391(0x53f):_0x2092dd+=_0x373828+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x5509aa,_0x796fb5['name']||_0x528391(0x809))+_0x7d9688,_0x3ad968+=_0x328d93[_0x528391(0x67d)](_0x3e2345,_0x1e389c));}}else this[_0x528391(0x64b)](_0x28f9a3,_0x26cb2b+0x2,_0x9d36cd+0x2),_0x235840-=ImageManager[_0x528391(0x2de)]+0x4,_0x26cb2b+=ImageManager['iconWidth']+0x4;}else _0x22912b=_0x1d238a[_0x528391(0x38c)](_0x1fac24),_0x404e18=_0x2c9012['round'](_0x13e17a),_0x55803a[_0x528391(0x1c9)][_0x528391(0x2bf)][_0x528391(0x30d)](this,_0x472b43,_0x687933,_0x31d518,_0x5c768f);}const _0x3bd9e0=TextManager['param'](_0x4dc334);this[_0x528391(0x4da)](),this['changeTextColor'](ColorManager['systemColor']()),_0x458de9?(this['contents'][_0x528391(0xa0b)]=this[_0x528391(0x6b0)](),this['contents'][_0x528391(0x161)](_0x3bd9e0,_0x26cb2b,_0x9d36cd,_0x235840,this[_0x528391(0x81c)](),_0x528391(0x42a))):'Gcxxv'!=='BZuQJ'?this[_0x528391(0x161)](_0x3bd9e0,_0x26cb2b,_0x9d36cd,_0x235840):(this[_0x528391(0x529)][_0x528391(0x4ba)](),this[_0x528391(0x815)]['hide'](),this[_0x528391(0x93f)][_0x528391(0x596)]=![],_0x28047b[_0x528391(0x9fc)]()),this['resetFontSettings']();},Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x6b0)]=function(){const _0x22c7a2=_0x518efc;return $gameSystem[_0x22c7a2(0x1ac)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x21848a,_0xf3f3c8,_0x6fb33f,_0x14cf77){const _0x5369f7=_0x518efc;_0x14cf77=_0x14cf77||0xa8,this[_0x5369f7(0x62b)]();if(VisuMZ[_0x5369f7(0x1c9)][_0x5369f7(0x54d)]['UI'][_0x5369f7(0xa2f)])_0x5369f7(0x3f7)===_0x5369f7(0x3f7)?this[_0x5369f7(0x8dd)](_0x21848a[_0x5369f7(0x7b4)]()[_0x5369f7(0x864)],_0xf3f3c8,_0x6fb33f,_0x14cf77):this[_0x5369f7(0x37d)]=_0x1b102c;else{const _0x29d597=_0x21848a[_0x5369f7(0x7b4)]()['name'][_0x5369f7(0x180)](/\\I\[(\d+)\]/gi,'');this[_0x5369f7(0x161)](_0x29d597,_0xf3f3c8,_0x6fb33f,_0x14cf77);}},Window_StatusBase['prototype'][_0x518efc(0x680)]=function(_0x2b4563,_0x17c8f4,_0xdd8413,_0x1144a7){const _0x3b74a4=_0x518efc;_0x1144a7=_0x1144a7||0x10e,this[_0x3b74a4(0x62b)]();if(VisuMZ[_0x3b74a4(0x1c9)]['Settings']['UI'][_0x3b74a4(0x29c)])this[_0x3b74a4(0x8dd)](_0x2b4563[_0x3b74a4(0x77c)](),_0x17c8f4,_0xdd8413,_0x1144a7);else{if('SDJjx'!==_0x3b74a4(0x5b3)){const _0x2c19f4=_0x5466b0[_0x3b74a4(0x7c4)]()['trim']();for(const _0x4b5fc5 in _0x103cfa[_0x3b74a4(0x1c9)][_0x3b74a4(0x6e7)]){if(_0x2c19f4[_0x3b74a4(0x1f5)](_0x4b5fc5)){const _0x48064d=_0x145109[_0x3b74a4(0x1c9)][_0x3b74a4(0x6e7)][_0x4b5fc5],_0x557c8b=_0x1963cc['CoreEngine'][_0x3b74a4(0x369)][_0x48064d];return _0x557c8b[_0x199d3d]||this[_0x3b74a4(0x881)](_0x3f7691);}}return this['getKeyboardInputButtonString'](_0x4c653f);}else{const _0x434d43=_0x2b4563['nickname']()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x3b74a4(0x161)](_0x2b4563[_0x3b74a4(0x77c)](),_0x17c8f4,_0xdd8413,_0x1144a7);}}},VisuMZ[_0x518efc(0x1c9)]['Window_StatusBase_drawActorLevel']=Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x176)],Window_StatusBase[_0x518efc(0xa41)]['drawActorLevel']=function(_0x461da5,_0x93a7f8,_0x32d916){const _0x338f86=_0x518efc;if(VisuMZ[_0x338f86(0x1c9)][_0x338f86(0x54d)]['Param'][_0x338f86(0x88b)]===![])return;if(this[_0x338f86(0xa5f)]())this['drawActorExpGauge'](_0x461da5,_0x93a7f8,_0x32d916);VisuMZ['CoreEngine'][_0x338f86(0x7eb)]['call'](this,_0x461da5,_0x93a7f8,_0x32d916);},Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0xa5f)]=function(){const _0x46ca96=_0x518efc;return VisuMZ[_0x46ca96(0x1c9)][_0x46ca96(0x54d)]['UI'][_0x46ca96(0x1bf)];},Window_StatusBase[_0x518efc(0xa41)][_0x518efc(0x568)]=function(_0x53d295,_0x18e530,_0x25181b){const _0x192fa9=_0x518efc;if(!_0x53d295)return;if(!_0x53d295['isActor']())return;const _0x5cbda4=0x80,_0x4a219d=_0x53d295['expRate']();let _0x3c1d67=ColorManager[_0x192fa9(0x931)](),_0xddaabd=ColorManager[_0x192fa9(0x860)]();_0x4a219d>=0x1&&(_0x3c1d67=ColorManager[_0x192fa9(0x920)](),_0xddaabd=ColorManager[_0x192fa9(0x316)]()),this['drawGauge'](_0x18e530,_0x25181b,_0x5cbda4,_0x4a219d,_0x3c1d67,_0xddaabd);},Window_EquipStatus[_0x518efc(0xa41)][_0x518efc(0x486)]=function(){const _0x223521=_0x518efc;let _0x2e6855=0x0;for(const _0x11acf4 of VisuMZ['CoreEngine'][_0x223521(0x54d)][_0x223521(0x224)][_0x223521(0x293)]){const _0x49900a=this['itemPadding'](),_0x36f1d5=this[_0x223521(0x658)](_0x2e6855);this[_0x223521(0x64e)](_0x49900a,_0x36f1d5,_0x11acf4),_0x2e6855++;}},Window_EquipStatus[_0x518efc(0xa41)][_0x518efc(0x468)]=function(_0xeca389,_0x102600,_0x195d5a){const _0x3512b6=_0x518efc,_0x2f067a=this['paramX']()-this[_0x3512b6(0x280)]()*0x2;this[_0x3512b6(0x28f)](_0xeca389,_0x102600,_0x2f067a,_0x195d5a,![]);},Window_EquipStatus['prototype'][_0x518efc(0x63e)]=function(_0x2fbe33,_0x23a16a,_0x429903){const _0x53eff4=_0x518efc,_0x5e8c58=this[_0x53eff4(0x291)]();this[_0x53eff4(0x62b)](),this[_0x53eff4(0x161)](this[_0x53eff4(0x8ec)][_0x53eff4(0x8d1)](_0x429903,!![]),_0x2fbe33,_0x23a16a,_0x5e8c58,'right');},Window_EquipStatus[_0x518efc(0xa41)][_0x518efc(0x59f)]=function(_0x574d64,_0x15e003){const _0x15e506=_0x518efc,_0x28b3c3=this['rightArrowWidth']();this[_0x15e506(0x190)](ColorManager[_0x15e506(0x242)]());const _0x24636b=VisuMZ['CoreEngine'][_0x15e506(0x54d)]['UI'][_0x15e506(0x428)];this[_0x15e506(0x161)](_0x24636b,_0x574d64,_0x15e003,_0x28b3c3,_0x15e506(0x5dc));},Window_EquipStatus[_0x518efc(0xa41)][_0x518efc(0x5d6)]=function(_0x3a3b70,_0x760751,_0x174598){const _0x32f449=_0x518efc,_0x55a693=this[_0x32f449(0x291)](),_0x29a9be=this[_0x32f449(0x4f4)][_0x32f449(0x8d1)](_0x174598),_0x3d77d1=_0x29a9be-this['_actor'][_0x32f449(0x8d1)](_0x174598);this[_0x32f449(0x190)](ColorManager[_0x32f449(0xa10)](_0x3d77d1)),this['drawText'](this[_0x32f449(0x4f4)][_0x32f449(0x8d1)](_0x174598,!![]),_0x3a3b70,_0x760751,_0x55a693,_0x32f449(0xa44));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x3cd)]=Window_EquipItem[_0x518efc(0xa41)][_0x518efc(0x3ec)],Window_EquipItem[_0x518efc(0xa41)][_0x518efc(0x3ec)]=function(_0x54bdd2){const _0x443363=_0x518efc;if(_0x54bdd2&&this[_0x443363(0x8ec)])return this[_0x443363(0x8ec)][_0x443363(0x1d6)](_0x54bdd2);else{if('qQoQl'!==_0x443363(0x50d))return VisuMZ['CoreEngine']['Window_EquipItem_isEnabled'][_0x443363(0x30d)](this,_0x54bdd2);else this[_0x443363(0x84d)](_0x30cfb4,_0x2548eb,_0x5a7f75,_0x410790,_0x2642ba);}},Window_StatusParams['prototype'][_0x518efc(0x22d)]=function(){const _0x59c833=_0x518efc;return VisuMZ[_0x59c833(0x1c9)]['Settings'][_0x59c833(0x224)][_0x59c833(0x293)]['length'];},Window_StatusParams[_0x518efc(0xa41)][_0x518efc(0x64e)]=function(_0x4ddf49){const _0x3449b4=_0x518efc,_0x247458=this[_0x3449b4(0x510)](_0x4ddf49),_0x140c59=VisuMZ[_0x3449b4(0x1c9)][_0x3449b4(0x54d)][_0x3449b4(0x224)][_0x3449b4(0x293)][_0x4ddf49],_0x3e2cff=TextManager[_0x3449b4(0x923)](_0x140c59),_0x392fda=this['_actor'][_0x3449b4(0x8d1)](_0x140c59,!![]);this[_0x3449b4(0x28f)](_0x247458['x'],_0x247458['y'],0xa0,_0x140c59,![]),this['resetTextColor'](),this['drawText'](_0x392fda,_0x247458['x']+0xa0,_0x247458['y'],0x3c,_0x3449b4(0xa44));};if(VisuMZ[_0x518efc(0x1c9)]['Settings']['KeyboardInput'][_0x518efc(0x973)]){VisuMZ[_0x518efc(0x1c9)]['Settings'][_0x518efc(0x32d)][_0x518efc(0x6d6)]&&(Window_NameInput[_0x518efc(0x70f)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ['CoreEngine'][_0x518efc(0x645)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x55e)],Window_NameInput[_0x518efc(0xa41)]['initialize']=function(_0x497b17){const _0x31749f=_0x518efc;this['_mode']=this['defaultInputMode'](),VisuMZ[_0x31749f(0x1c9)][_0x31749f(0x645)]['call'](this,_0x497b17);if(this[_0x31749f(0x81d)]===_0x31749f(0x592)){if(_0x31749f(0x68d)!==_0x31749f(0x7a3))this[_0x31749f(0x261)](0x0);else{const _0x318fad=_0x31749f(0x288);this[_0x31749f(0x81f)]=this['_colorCache']||{};if(this[_0x31749f(0x81f)][_0x318fad])return this[_0x31749f(0x81f)][_0x318fad];const _0x2ccccd=_0x4e225a[_0x31749f(0x1c9)]['Settings'][_0x31749f(0x3b3)]['ColorTPGauge1'];return this[_0x31749f(0x629)](_0x318fad,_0x2ccccd);}}else Input[_0x31749f(0x85c)](),this[_0x31749f(0x1d9)]();},Window_NameInput[_0x518efc(0xa41)][_0x518efc(0xa6b)]=function(){const _0x513e41=_0x518efc;if(Input[_0x513e41(0x89b)]())return'default';return VisuMZ[_0x513e41(0x1c9)][_0x513e41(0x54d)]['KeyboardInput'][_0x513e41(0x6b6)]||'keyboard';},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x650)]=Window_NameInput[_0x518efc(0xa41)]['processHandling'],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x838)]=function(){const _0xf5e3f5=_0x518efc;if(!this[_0xf5e3f5(0x192)]())return;if(!this[_0xf5e3f5(0x46d)])return;if(this[_0xf5e3f5(0x81d)]===_0xf5e3f5(0x1d8)&&Input[_0xf5e3f5(0x9e0)]())this[_0xf5e3f5(0x86f)](_0xf5e3f5(0x592));else{if(Input[_0xf5e3f5(0x954)](_0xf5e3f5(0x5f5)))_0xf5e3f5(0x442)!==_0xf5e3f5(0x576)?(Input[_0xf5e3f5(0x85c)](),this[_0xf5e3f5(0x577)]()):!this['_originalViewport']&&(this['_originalViewport']=_0xfdc349['gl']['getParameter'](_0x3c4c95['gl'][_0xf5e3f5(0xa30)]));else{if(Input[_0xf5e3f5(0x702)](_0xf5e3f5(0x149))){Input[_0xf5e3f5(0x85c)]();if(this[_0xf5e3f5(0x81d)]===_0xf5e3f5(0x1d8))this[_0xf5e3f5(0x86f)](_0xf5e3f5(0x592));else{if(_0xf5e3f5(0x808)===_0xf5e3f5(0x808))this[_0xf5e3f5(0x86f)]('keyboard');else{let _0x533bd8=_0x1c47d1['max'](0x0,this['index']());const _0xc782f6=this[_0xf5e3f5(0x22d)](),_0x39a6c3=this[_0xf5e3f5(0x9d1)]();if(this[_0xf5e3f5(0x9be)]()&&_0x533bd8>0x0||_0x12a540&&_0x39a6c3===0x1){_0x533bd8-=_0x39a6c3;if(_0x533bd8<=0x0)_0x533bd8=0x0;this[_0xf5e3f5(0x3c1)](_0x533bd8);}else!this[_0xf5e3f5(0x9be)]()&&((_0x533bd8>=_0x39a6c3||_0x1cd5a0&&_0x39a6c3===0x1)&&this[_0xf5e3f5(0x3c1)]((_0x533bd8-_0x39a6c3+_0xc782f6)%_0xc782f6));}}}else{if(this[_0xf5e3f5(0x81d)]===_0xf5e3f5(0x1d8))this['processKeyboardHandling']();else Input[_0xf5e3f5(0x954)]('escape')?(Input[_0xf5e3f5(0x85c)](),this['switchModes'](_0xf5e3f5(0x1d8))):VisuMZ[_0xf5e3f5(0x1c9)][_0xf5e3f5(0x650)][_0xf5e3f5(0x30d)](this);}}}},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x80a)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x8fd)],Window_NameInput['prototype'][_0x518efc(0x8fd)]=function(){const _0x3aeb79=_0x518efc;if(!this[_0x3aeb79(0x1c7)]())return;if(this[_0x3aeb79(0x81d)]===_0x3aeb79(0x1d8)){if(_0x3aeb79(0x57b)!=='wCdqd')this[_0x3aeb79(0x2eb)][_0x3aeb79(0x19d)](_0x189445[_0x3aeb79(0x587)][_0x3aeb79(0x6c8)]);else{if(TouchInput['isTriggered']()&&this[_0x3aeb79(0x212)]())this['switchModes']('default');else{if(TouchInput[_0x3aeb79(0xa67)]()){if(_0x3aeb79(0xa6d)!=='QRTNH')this[_0x3aeb79(0x86f)](_0x3aeb79(0x592));else{if(this[_0x3aeb79(0x3bd)]===_0x219306)this[_0x3aeb79(0x203)]();this[_0x3aeb79(0x3bd)][_0x3aeb79(0x143)]=_0x32250e||0x0,this[_0x3aeb79(0x3bd)][_0x3aeb79(0x314)]=_0x427c69||0x0,this[_0x3aeb79(0x3bd)][_0x3aeb79(0xa22)]=_0x4cb273||0x0,this['_anglePlus'][_0x3aeb79(0x25b)]=_0xbb52cc||_0x3aeb79(0x901),_0x32f0e7<=0x0&&(this[_0x3aeb79(0x3bd)][_0x3aeb79(0x693)]=this[_0x3aeb79(0x3bd)][_0x3aeb79(0x143)]);}}}}}else VisuMZ[_0x3aeb79(0x1c9)][_0x3aeb79(0x80a)][_0x3aeb79(0x30d)](this);},Window_NameInput[_0x518efc(0xa41)]['processKeyboardHandling']=function(){const _0x540064=_0x518efc;if(Input[_0x540064(0x954)](_0x540064(0x695)))Input['clear'](),this['onNameOk']();else{if(Input[_0x540064(0x2c7)]!==undefined){let _0x2a6079=Input[_0x540064(0x2c7)],_0x547dfe=_0x2a6079[_0x540064(0x18d)];for(let _0x2c5647=0x0;_0x2c5647<_0x547dfe;++_0x2c5647){this['_editWindow']['add'](_0x2a6079[_0x2c5647])?SoundManager[_0x540064(0x962)]():SoundManager['playBuzzer']();}Input[_0x540064(0x85c)]();}}},Window_NameInput[_0x518efc(0xa41)]['switchModes']=function(_0x1d5b7a){const _0x59e07c=_0x518efc;let _0xe33a96=this[_0x59e07c(0x81d)];this['_mode']=_0x1d5b7a,_0xe33a96!==this[_0x59e07c(0x81d)]&&(_0x59e07c(0x361)!=='AvgEA'?_0x4fcf4c[_0x59e07c(0x1c9)]['Settings'][_0x59e07c(0x927)]['ForceNoPlayTest']&&(this[_0x59e07c(0x479)]=![]):(this[_0x59e07c(0x5b5)](),SoundManager[_0x59e07c(0x962)](),this[_0x59e07c(0x81d)]==='default'?this['select'](0x0):this['select'](-0x1)));},VisuMZ['CoreEngine'][_0x518efc(0x63a)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x7b0)],Window_NameInput['prototype'][_0x518efc(0x7b0)]=function(_0x1d4030){const _0x517c60=_0x518efc;if(this[_0x517c60(0x81d)]===_0x517c60(0x1d8)&&!Input['isArrowPressed']())return;if(Input[_0x517c60(0x1a7)]())return;VisuMZ[_0x517c60(0x1c9)]['Window_NameInput_cursorDown'][_0x517c60(0x30d)](this,_0x1d4030),this[_0x517c60(0x86f)](_0x517c60(0x592));},VisuMZ[_0x518efc(0x1c9)]['Window_NameInput_cursorUp']=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x1bb)],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x1bb)]=function(_0x52f459){const _0x5478a6=_0x518efc;if(this[_0x5478a6(0x81d)]===_0x5478a6(0x1d8)&&!Input[_0x5478a6(0x67b)]())return;if(Input[_0x5478a6(0x1a7)]())return;VisuMZ[_0x5478a6(0x1c9)][_0x5478a6(0x9b9)]['call'](this,_0x52f459),this[_0x5478a6(0x86f)](_0x5478a6(0x592));},VisuMZ[_0x518efc(0x1c9)]['Window_NameInput_cursorRight']=Window_NameInput[_0x518efc(0xa41)]['cursorRight'],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x649)]=function(_0x1f70c7){const _0x5ef7ea=_0x518efc;if(this[_0x5ef7ea(0x81d)]===_0x5ef7ea(0x1d8)&&!Input[_0x5ef7ea(0x67b)]())return;if(Input[_0x5ef7ea(0x1a7)]())return;VisuMZ[_0x5ef7ea(0x1c9)][_0x5ef7ea(0x74a)][_0x5ef7ea(0x30d)](this,_0x1f70c7),this[_0x5ef7ea(0x86f)]('default');},VisuMZ[_0x518efc(0x1c9)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x518efc(0xa41)]['cursorLeft'],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x16b)]=function(_0x4959e2){const _0x15fc34=_0x518efc;if(this[_0x15fc34(0x81d)]===_0x15fc34(0x1d8)&&!Input[_0x15fc34(0x67b)]())return;if(Input[_0x15fc34(0x1a7)]())return;VisuMZ[_0x15fc34(0x1c9)]['Window_NameInput_cursorLeft'][_0x15fc34(0x30d)](this,_0x4959e2),this[_0x15fc34(0x86f)]('default');},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x791)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x8ef)],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x8ef)]=function(){const _0x2f7b19=_0x518efc;if(this[_0x2f7b19(0x81d)]===_0x2f7b19(0x1d8))return;if(Input[_0x2f7b19(0x1a7)]())return;VisuMZ[_0x2f7b19(0x1c9)][_0x2f7b19(0x791)]['call'](this),this[_0x2f7b19(0x86f)](_0x2f7b19(0x592));},VisuMZ['CoreEngine'][_0x518efc(0x4ee)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x8e4)],Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x8e4)]=function(){const _0x2ee6d6=_0x518efc;if(this['_mode']===_0x2ee6d6(0x1d8))return;if(Input[_0x2ee6d6(0x1a7)]())return;VisuMZ[_0x2ee6d6(0x1c9)]['Window_NameInput_cursorPageup'][_0x2ee6d6(0x30d)](this),this[_0x2ee6d6(0x86f)]('default');},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x607)]=Window_NameInput[_0x518efc(0xa41)][_0x518efc(0x5b5)],Window_NameInput[_0x518efc(0xa41)]['refresh']=function(){const _0x2e78de=_0x518efc;if(this['_mode']===_0x2e78de(0x1d8)){if(_0x2e78de(0x843)===_0x2e78de(0x843)){this[_0x2e78de(0x3fb)][_0x2e78de(0x85c)](),this['contentsBack'][_0x2e78de(0x85c)](),this[_0x2e78de(0x62b)]();let _0x29236d=VisuMZ['CoreEngine']['Settings'][_0x2e78de(0x32d)][_0x2e78de(0x855)]['split']('\x0a'),_0x220f6a=_0x29236d[_0x2e78de(0x18d)],_0xd1aee6=(this[_0x2e78de(0x900)]-_0x220f6a*this[_0x2e78de(0x669)]())/0x2;for(let _0x3320b3=0x0;_0x3320b3<_0x220f6a;++_0x3320b3){let _0x1b93b0=_0x29236d[_0x3320b3],_0x1a5735=this[_0x2e78de(0x8ae)](_0x1b93b0)[_0x2e78de(0x217)],_0x1b3fd4=Math[_0x2e78de(0x25f)]((this[_0x2e78de(0x3fb)][_0x2e78de(0x217)]-_0x1a5735)/0x2);this['drawTextEx'](_0x1b93b0,_0x1b3fd4,_0xd1aee6),_0xd1aee6+=this[_0x2e78de(0x669)]();}}else _0xb5f9d1=_0xc52d7e(_0x2fc40f['$1'])*_0x3f6297[_0x2e78de(0x217)],_0x150c58=(0x1-_0x575ef2(_0x1677d1['$2']))*-_0x1184c5;}else _0x2e78de(0x743)!==_0x2e78de(0x1e5)?VisuMZ[_0x2e78de(0x1c9)][_0x2e78de(0x607)][_0x2e78de(0x30d)](this):_0x38a9a2+=_0x8f6639+_0x2e78de(0x53f);};};VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x73c)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell['prototype'][_0x518efc(0x3ec)]=function(_0x58b7dd){const _0x203dae=_0x518efc;return VisuMZ[_0x203dae(0x1c9)][_0x203dae(0x54d)][_0x203dae(0x927)][_0x203dae(0x3e9)]&&DataManager[_0x203dae(0x986)](_0x58b7dd)?![]:_0x203dae(0x2ff)!==_0x203dae(0x2ff)?this[_0x203dae(0x4cc)]&&this[_0x203dae(0x4cc)][_0x203dae(0x46d)]:VisuMZ[_0x203dae(0x1c9)]['Window_ShopSell_isEnabled'][_0x203dae(0x30d)](this,_0x58b7dd);},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x9be)]=function(){return![];};VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x32d)][_0x518efc(0x710)]&&(VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x1ab)]=Window_NumberInput['prototype'][_0x518efc(0x4d9)],Window_NumberInput[_0x518efc(0xa41)]['start']=function(){const _0x4060fd=_0x518efc;VisuMZ[_0x4060fd(0x1c9)]['Window_NumberInput_start'][_0x4060fd(0x30d)](this),this[_0x4060fd(0x261)](this[_0x4060fd(0x92e)]-0x1),Input['clear']();},VisuMZ['CoreEngine'][_0x518efc(0x1dc)]=Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x23d)],Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x23d)]=function(){const _0x2e3366=_0x518efc;if(!this[_0x2e3366(0x1c7)]())return;if(Input[_0x2e3366(0x1a7)]()){if(_0x2e3366(0x3fa)===_0x2e3366(0x5e2)){_0x31aa9f[_0x2e3366(0x1c9)][_0x2e3366(0x59d)]['call'](this,_0x3d430b);if(_0x4bb9c3[_0x2e3366(0x1c9)][_0x2e3366(0x54d)][_0x2e3366(0x927)][_0x2e3366(0x31e)])return;const _0x588af4=_0x2566d0[_0x2e3366(0x3a9)]();_0x588af4[_0x2e3366(0x770)]&&(0x1-this[_0x2e3366(0x76a)](_0x627d7c)>this[_0x2e3366(0x82a)](_0xcbbd2d)&&(_0x588af4[_0x2e3366(0x770)]=![],_0x588af4[_0x2e3366(0x205)]=!![]));}else this[_0x2e3366(0x1be)]();}else{if(Input['isSpecialCode']('backspace'))this[_0x2e3366(0x4bf)]();else{if(Input[_0x2e3366(0x8f8)]===0x2e)this[_0x2e3366(0x3ed)]();else{if(Input[_0x2e3366(0x8f8)]===0x24)'yKQnY'!=='hMfjG'?this[_0x2e3366(0xa2d)]():(_0x2a0208[_0x2e3366(0x1c9)]['Scene_Base_create']['call'](this),_0xec6448=this);else Input['_inputSpecialKeyCode']===0x23?this[_0x2e3366(0x482)]():VisuMZ['CoreEngine'][_0x2e3366(0x1dc)]['call'](this);}}}},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x588)]=function(){const _0x1a8d5c=_0x518efc;if(!this['isCursorMovable']())return;Input[_0x1a8d5c(0x1a7)]()?_0x1a8d5c(0x1ff)!==_0x1a8d5c(0x1ff)?(_0x53d833['CoreEngine']['Scene_Menu_create'][_0x1a8d5c(0x30d)](this),this['setCoreEngineUpdateWindowBg']()):this[_0x1a8d5c(0x1be)]():Window_Selectable[_0x1a8d5c(0xa41)]['processCursorMove'][_0x1a8d5c(0x30d)](this);},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x347)]=function(){},Window_NumberInput['prototype'][_0x518efc(0x1be)]=function(){const _0x1cfe92=_0x518efc;if(String(this['_number'])[_0x1cfe92(0x18d)]>=this['_maxDigits'])return;const _0x3afc21=Number(String(this[_0x1cfe92(0x244)])+Input['_inputString']);if(isNaN(_0x3afc21))return;this[_0x1cfe92(0x244)]=_0x3afc21;const _0x24a1be='9'[_0x1cfe92(0x70d)](this[_0x1cfe92(0x92e)]);this['_number']=this[_0x1cfe92(0x244)][_0x1cfe92(0x22e)](0x0,_0x24a1be),Input[_0x1cfe92(0x85c)](),this['refresh'](),SoundManager[_0x1cfe92(0xa2e)](),this[_0x1cfe92(0x261)](this[_0x1cfe92(0x92e)]-0x1);},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x4bf)]=function(){const _0x528bcb=_0x518efc;this['_number']=Number(String(this[_0x528bcb(0x244)])['slice'](0x0,-0x1)),this[_0x528bcb(0x244)]=Math[_0x528bcb(0x55c)](0x0,this[_0x528bcb(0x244)]),Input[_0x528bcb(0x85c)](),this[_0x528bcb(0x5b5)](),SoundManager[_0x528bcb(0xa2e)](),this[_0x528bcb(0x261)](this['_maxDigits']-0x1);},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x3ed)]=function(){const _0x3cbccc=_0x518efc;this[_0x3cbccc(0x244)]=Number(String(this[_0x3cbccc(0x244)])[_0x3cbccc(0x290)](0x1)),this['_number']=Math[_0x3cbccc(0x55c)](0x0,this[_0x3cbccc(0x244)]),Input[_0x3cbccc(0x85c)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this[_0x3cbccc(0x92e)]-0x1);},Window_NumberInput['prototype'][_0x518efc(0xa2d)]=function(){const _0x91c4eb=_0x518efc;if(this[_0x91c4eb(0x364)]()===0x0)return;Input['clear'](),this[_0x91c4eb(0x5b5)](),SoundManager[_0x91c4eb(0xa2e)](),this['select'](0x0);},Window_NumberInput[_0x518efc(0xa41)][_0x518efc(0x482)]=function(){const _0x521c64=_0x518efc;if(this[_0x521c64(0x364)]()===this['_maxDigits']-0x1)return;Input['clear'](),this[_0x521c64(0x5b5)](),SoundManager[_0x521c64(0xa2e)](),this['select'](this[_0x521c64(0x92e)]-0x1);});function _0x3995(_0x358b20,_0x2c6c60){const _0x3e861b=_0x3e86();return _0x3995=function(_0x3995e5,_0x5594d9){_0x3995e5=_0x3995e5-0x13f;let _0x21dd62=_0x3e861b[_0x3995e5];return _0x21dd62;},_0x3995(_0x358b20,_0x2c6c60);};VisuMZ[_0x518efc(0x1c9)]['Window_MapName_refresh']=Window_MapName['prototype'][_0x518efc(0x5b5)],Window_MapName['prototype'][_0x518efc(0x5b5)]=function(){const _0x42cef0=_0x518efc;VisuMZ[_0x42cef0(0x1c9)][_0x42cef0(0x54d)]['QoL'][_0x42cef0(0x828)]?this[_0x42cef0(0x55a)]():VisuMZ[_0x42cef0(0x1c9)][_0x42cef0(0x5f1)]['call'](this);},Window_MapName['prototype'][_0x518efc(0x55a)]=function(){const _0x1e0518=_0x518efc;this[_0x1e0518(0x3fb)][_0x1e0518(0x85c)]();if($gameMap[_0x1e0518(0x34b)]()){if(_0x1e0518(0x2b0)===_0x1e0518(0x9ec))this[_0x1e0518(0x8c0)](),this['processCursorHomeEndTrigger']();else{const _0xc124e7=this[_0x1e0518(0xa59)];this[_0x1e0518(0x5ba)](0x0,0x0,_0xc124e7,this[_0x1e0518(0x669)]());const _0x13643a=this[_0x1e0518(0x8ae)]($gameMap[_0x1e0518(0x34b)]())[_0x1e0518(0x217)];this[_0x1e0518(0x8dd)]($gameMap[_0x1e0518(0x34b)](),Math[_0x1e0518(0x25f)]((_0xc124e7-_0x13643a)/0x2),0x0);}}},Window_TitleCommand['_commandList']=VisuMZ['CoreEngine'][_0x518efc(0x54d)][_0x518efc(0x17b)],Window_TitleCommand[_0x518efc(0xa41)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_TitleCommand[_0x518efc(0xa41)]['makeCoreEngineCommandList']=function(){const _0x56f279=_0x518efc;for(const _0x57cacf of Window_TitleCommand[_0x56f279(0x2ac)]){if('SNMQd'==='SNMQd'){if(_0x57cacf['ShowJS'][_0x56f279(0x30d)](this)){if(_0x56f279(0x9cd)===_0x56f279(0x9cd)){const _0x9a5249=_0x57cacf['Symbol'];let _0x8b8f0d=_0x57cacf[_0x56f279(0x9c3)];if(['',_0x56f279(0x6a5)][_0x56f279(0x1f5)](_0x8b8f0d))_0x8b8f0d=_0x57cacf[_0x56f279(0x610)][_0x56f279(0x30d)](this);const _0x1b14a8=_0x57cacf[_0x56f279(0x8a4)]['call'](this),_0x238a84=_0x57cacf['ExtJS'][_0x56f279(0x30d)](this);this[_0x56f279(0x1a5)](_0x8b8f0d,_0x9a5249,_0x1b14a8,_0x238a84),this['setHandler'](_0x9a5249,_0x57cacf[_0x56f279(0x6be)][_0x56f279(0x670)](this,_0x238a84));}else{let _0x55a295=_0x37edfb[_0x56f279(0x1c9)][_0x56f279(0x8df)][_0x56f279(0x30d)](this);return _0x55a295;}}}else this[_0x56f279(0x81f)][_0x4debf0]=_0x56f279(0x7bb)['format'](_0x39bf21(_0x2b1946['$1']));}},VisuMZ['CoreEngine']['Window_TitleCommand_selectLast']=Window_TitleCommand[_0x518efc(0xa41)][_0x518efc(0x4ac)],Window_TitleCommand[_0x518efc(0xa41)][_0x518efc(0x4ac)]=function(){const _0x35e37d=_0x518efc;VisuMZ[_0x35e37d(0x1c9)][_0x35e37d(0x4b3)][_0x35e37d(0x30d)](this);if(!Window_TitleCommand[_0x35e37d(0x5b9)])return;const _0x3fa4cf=this[_0x35e37d(0x8fe)](Window_TitleCommand['_lastCommandSymbol']),_0x47db1b=Math[_0x35e37d(0x25f)](this[_0x35e37d(0x95f)]()/0x2)-0x1;this[_0x35e37d(0x3c1)](_0x3fa4cf),this[_0x35e37d(0x420)]>0x1&&(this[_0x35e37d(0x420)]=0x1,this[_0x35e37d(0x91a)]()),this[_0x35e37d(0x340)](_0x3fa4cf-_0x47db1b);},Window_GameEnd[_0x518efc(0x2ac)]=VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x68b)][_0x518efc(0x4db)][_0x518efc(0x383)],Window_GameEnd[_0x518efc(0xa41)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x518efc(0xa41)]['makeCoreEngineCommandList']=function(){const _0x58b544=_0x518efc;for(const _0x44394f of Window_GameEnd[_0x58b544(0x2ac)]){if(_0x44394f['ShowJS']['call'](this)){if(_0x58b544(0x68c)!==_0x58b544(0x60d)){const _0x3aa479=_0x44394f[_0x58b544(0x221)];let _0xbf7d63=_0x44394f[_0x58b544(0x9c3)];if(['',_0x58b544(0x6a5)][_0x58b544(0x1f5)](_0xbf7d63))_0xbf7d63=_0x44394f[_0x58b544(0x610)][_0x58b544(0x30d)](this);const _0x34dd2d=_0x44394f[_0x58b544(0x8a4)][_0x58b544(0x30d)](this),_0x468381=_0x44394f[_0x58b544(0x49a)][_0x58b544(0x30d)](this);this['addCommand'](_0xbf7d63,_0x3aa479,_0x34dd2d,_0x468381),this[_0x58b544(0x7d4)](_0x3aa479,_0x44394f[_0x58b544(0x6be)][_0x58b544(0x670)](this,_0x468381));}else this[_0x58b544(0x7da)]=0x1;}}};function Window_ButtonAssist(){const _0x53fc1e=_0x518efc;this[_0x53fc1e(0x55e)](...arguments);}Window_ButtonAssist[_0x518efc(0xa41)]=Object[_0x518efc(0x869)](Window_Base[_0x518efc(0xa41)]),Window_ButtonAssist['prototype']['constructor']=Window_ButtonAssist,Window_ButtonAssist[_0x518efc(0xa41)]['initialize']=function(_0x1eb41c){const _0x142c97=_0x518efc;this[_0x142c97(0x5fd)]={},Window_Base[_0x142c97(0xa41)][_0x142c97(0x55e)]['call'](this,_0x1eb41c),this['setBackgroundType'](VisuMZ[_0x142c97(0x1c9)][_0x142c97(0x54d)][_0x142c97(0x8be)][_0x142c97(0x65d)]||0x0),this[_0x142c97(0x5b5)]();},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x9f0)]=function(){const _0x24add5=_0x518efc;if(this[_0x24add5(0x3fb)][_0x24add5(0xa0b)]<=0x60){if(_0x24add5(0x3d2)===_0x24add5(0xa01))return _0x24add5(0x484);else this[_0x24add5(0x3fb)][_0x24add5(0xa0b)]+=0x6;}},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x7ea)]=function(){const _0x15902a=_0x518efc;this[_0x15902a(0x3fb)][_0x15902a(0xa0b)]>=0x18&&(this['contents'][_0x15902a(0xa0b)]-=0x6);},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x4ba)]=function(){const _0x5bc7d6=_0x518efc;Window_Base[_0x5bc7d6(0xa41)][_0x5bc7d6(0x4ba)][_0x5bc7d6(0x30d)](this),this[_0x5bc7d6(0x2f0)]();},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x7a1)]=function(){const _0x3db3cd=_0x518efc;this[_0x3db3cd(0x1b8)]=SceneManager[_0x3db3cd(0x18c)][_0x3db3cd(0x9f9)]()!=='button'?0x0:0x8;},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x2f0)]=function(){const _0x3d842c=_0x518efc,_0x5678f8=SceneManager[_0x3d842c(0x18c)];for(let _0x331685=0x1;_0x331685<=0x5;_0x331685++){if(this[_0x3d842c(0x5fd)][_0x3d842c(0x42e)[_0x3d842c(0x67d)](_0x331685)]!==_0x5678f8[_0x3d842c(0x948)[_0x3d842c(0x67d)](_0x331685)]()){if(_0x3d842c(0x1d7)!=='Rwaqk')return this[_0x3d842c(0x5b5)]();else this[_0x3d842c(0x557)][_0x3d842c(0x19d)](_0x3eba31[_0x3d842c(0x587)][_0x3d842c(0x4fb)]);}if(this['_data'][_0x3d842c(0xa57)[_0x3d842c(0x67d)](_0x331685)]!==_0x5678f8['buttonAssistText%1'[_0x3d842c(0x67d)](_0x331685)]())return this[_0x3d842c(0x5b5)]();}},Window_ButtonAssist[_0x518efc(0xa41)][_0x518efc(0x5b5)]=function(){const _0x400b6f=_0x518efc;this[_0x400b6f(0x3fb)][_0x400b6f(0x85c)]();for(let _0x26bdd3=0x1;_0x26bdd3<=0x5;_0x26bdd3++){this['drawSegment'](_0x26bdd3);}},Window_ButtonAssist['prototype']['drawSegment']=function(_0x917d96){const _0x8a33c6=_0x518efc,_0x54466f=this[_0x8a33c6(0xa59)]/0x5,_0x16bde1=SceneManager[_0x8a33c6(0x18c)],_0x162c7b=_0x16bde1[_0x8a33c6(0x948)[_0x8a33c6(0x67d)](_0x917d96)](),_0x438b98=_0x16bde1['buttonAssistText%1'[_0x8a33c6(0x67d)](_0x917d96)]();this[_0x8a33c6(0x5fd)][_0x8a33c6(0x42e)['format'](_0x917d96)]=_0x162c7b,this[_0x8a33c6(0x5fd)]['text%1'['format'](_0x917d96)]=_0x438b98;if(_0x162c7b==='')return;if(_0x438b98==='')return;const _0x2c3417=_0x16bde1['buttonAssistOffset%1'[_0x8a33c6(0x67d)](_0x917d96)](),_0x4a459a=this[_0x8a33c6(0x280)](),_0x4040d3=_0x54466f*(_0x917d96-0x1)+_0x4a459a+_0x2c3417,_0x533fbc=VisuMZ['CoreEngine'][_0x8a33c6(0x54d)]['ButtonAssist'][_0x8a33c6(0x7a2)];this[_0x8a33c6(0x8dd)](_0x533fbc[_0x8a33c6(0x67d)](_0x162c7b,_0x438b98),_0x4040d3,0x0,_0x54466f-_0x4a459a*0x2);},VisuMZ['CoreEngine'][_0x518efc(0x633)]=Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x701)],Game_Interpreter[_0x518efc(0xa41)][_0x518efc(0x701)]=function(){const _0x40352f=_0x518efc;if($gameTemp[_0x40352f(0x2d2)]!==undefined){if(_0x40352f(0x6d3)===_0x40352f(0x6d3))return VisuMZ[_0x40352f(0x1c9)][_0x40352f(0x38e)]();else{if(_0x446c06[_0x40352f(0x7c5)]())_0x1fd92e[_0x40352f(0x772)](_0x43a17f);}}return VisuMZ[_0x40352f(0x1c9)]['Game_Interpreter_updateWaitMode'][_0x40352f(0x30d)](this);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x38e)]=function(){const _0x5542ce=_0x518efc,_0x5b79b2=$gameTemp[_0x5542ce(0x2d2)]||0x0;(_0x5b79b2<0x0||_0x5b79b2>0x64||TouchInput[_0x5542ce(0xa67)]()||Input[_0x5542ce(0x702)](_0x5542ce(0xa39)))&&($gameTemp[_0x5542ce(0x2d2)]=undefined,Input[_0x5542ce(0x85c)](),TouchInput[_0x5542ce(0x85c)]());const _0xedca0e=$gameScreen[_0x5542ce(0x63f)](_0x5b79b2);return _0xedca0e&&(_0xedca0e['_x']=TouchInput['_x'],_0xedca0e['_y']=TouchInput['_y']),VisuMZ[_0x5542ce(0x1c9)][_0x5542ce(0x317)](),$gameTemp[_0x5542ce(0x2d2)]!==undefined;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x317)]=function(){const _0x4f1f89=_0x518efc,_0x341a9c=SceneManager['_scene'];if(!_0x341a9c)return;if(!_0x341a9c[_0x4f1f89(0x620)]){if(_0x4f1f89(0x4b1)==='QFlkX')SoundManager[_0x4f1f89(0x957)](),_0x341a9c[_0x4f1f89(0x620)]=new Window_PictureCoordinates(),_0x341a9c[_0x4f1f89(0x1f4)](_0x341a9c['_pictureCoordinatesWindow']);else return _0x3aaa52[_0x4f1f89(0x1c9)]['Settings'][_0x4f1f89(0x3b3)][_0x4f1f89(0x27a)][_0x4f1f89(0x30d)](this,_0xf09cb7);}if($gameTemp[_0x4f1f89(0x2d2)]===undefined){if(_0x4f1f89(0xa38)!==_0x4f1f89(0xa38))return'';else SoundManager[_0x4f1f89(0x5a8)](),_0x341a9c[_0x4f1f89(0x54a)](_0x341a9c['_pictureCoordinatesWindow']),_0x341a9c['_pictureCoordinatesWindow']=undefined;}};function Window_PictureCoordinates(){const _0x318564=_0x518efc;this[_0x318564(0x55e)](...arguments);}Window_PictureCoordinates[_0x518efc(0xa41)]=Object[_0x518efc(0x869)](Window_Base[_0x518efc(0xa41)]),Window_PictureCoordinates[_0x518efc(0xa41)][_0x518efc(0x60a)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x518efc(0xa41)]['initialize']=function(){const _0x45ff9e=_0x518efc;this[_0x45ff9e(0x1ee)]='nah',this[_0x45ff9e(0x803)]=_0x45ff9e(0x916),this['_lastY']=_0x45ff9e(0x916);const _0x3a462e=this[_0x45ff9e(0x4c5)]();Window_Base['prototype'][_0x45ff9e(0x55e)][_0x45ff9e(0x30d)](this,_0x3a462e),this[_0x45ff9e(0x19d)](0x2);},Window_PictureCoordinates[_0x518efc(0xa41)][_0x518efc(0x4c5)]=function(){const _0x55d51e=_0x518efc;let _0x1f6a9b=0x0,_0x38f7b4=Graphics[_0x55d51e(0x622)]-this['lineHeight'](),_0x3d19ac=Graphics[_0x55d51e(0x217)],_0x2980f9=this[_0x55d51e(0x669)]();return new Rectangle(_0x1f6a9b,_0x38f7b4,_0x3d19ac,_0x2980f9);},Window_PictureCoordinates[_0x518efc(0xa41)]['updatePadding']=function(){const _0x52abff=_0x518efc;this[_0x52abff(0x1b8)]=0x0;},Window_PictureCoordinates[_0x518efc(0xa41)][_0x518efc(0x4ba)]=function(){const _0x49b310=_0x518efc;Window_Base[_0x49b310(0xa41)][_0x49b310(0x4ba)][_0x49b310(0x30d)](this),this['updateData']();},Window_PictureCoordinates['prototype'][_0x518efc(0x3ca)]=function(){const _0x2e3cd1=_0x518efc;if(!this[_0x2e3cd1(0xa68)]())return;this[_0x2e3cd1(0x5b5)]();},Window_PictureCoordinates[_0x518efc(0xa41)][_0x518efc(0xa68)]=function(){const _0x361861=_0x518efc,_0x391629=$gameTemp[_0x361861(0x2d2)],_0x2caf71=$gameScreen[_0x361861(0x63f)](_0x391629);if(_0x2caf71)return this['_lastOrigin']!==_0x2caf71[_0x361861(0x937)]||this[_0x361861(0x803)]!==_0x2caf71['_x']||this[_0x361861(0x3db)]!==_0x2caf71['_y'];else{if(_0x361861(0x758)===_0x361861(0x3c4)){const _0x453785=_0x3addc0[_0x361861(0x217)]-_0x3d18cd[_0x361861(0x3cf)]-_0x39a8a0['CoreEngine']['Settings']['UI'][_0x361861(0x888)]*0x2,_0xf3d99d=_0x4cfffa[_0x361861(0xa41)][_0x361861(0x993)][_0x361861(0x30d)](this)*0x4;if(_0x453785>=_0xf3d99d)_0x438f2b[_0x361861(0x922)](!![]);}else return![];}},Window_PictureCoordinates['prototype'][_0x518efc(0x5b5)]=function(){const _0x3b8360=_0x518efc;this[_0x3b8360(0x3fb)]['clear']();const _0x8b71e7=$gameTemp[_0x3b8360(0x2d2)],_0x23426d=$gameScreen[_0x3b8360(0x63f)](_0x8b71e7);if(!_0x23426d)return;this[_0x3b8360(0x1ee)]=_0x23426d['_origin'],this['_lastX']=_0x23426d['_x'],this[_0x3b8360(0x3db)]=_0x23426d['_y'];const _0x4dd3d5=ColorManager['itemBackColor1']();this[_0x3b8360(0x3fb)][_0x3b8360(0x56b)](0x0,0x0,this['innerWidth'],this[_0x3b8360(0x900)],_0x4dd3d5);const _0x553330=_0x3b8360(0x4ca)[_0x3b8360(0x67d)](_0x23426d[_0x3b8360(0x937)]===0x0?_0x3b8360(0x6ca):'Center'),_0x560f50=_0x3b8360(0x52d)['format'](_0x23426d['_x']),_0x4a02a1=_0x3b8360(0x18e)['format'](_0x23426d['_y']),_0x335647=_0x3b8360(0x6cd)['format'](TextManager[_0x3b8360(0x976)](_0x3b8360(0xa39)));let _0x310f37=Math[_0x3b8360(0x25f)](this['innerWidth']/0x4);this[_0x3b8360(0x161)](_0x553330,_0x310f37*0x0,0x0,_0x310f37),this[_0x3b8360(0x161)](_0x560f50,_0x310f37*0x1,0x0,_0x310f37,_0x3b8360(0x5dc)),this[_0x3b8360(0x161)](_0x4a02a1,_0x310f37*0x2,0x0,_0x310f37,_0x3b8360(0x5dc));const _0x577112=this['textSizeEx'](_0x335647)['width'],_0x26307f=this['innerWidth']-_0x577112;this[_0x3b8360(0x8dd)](_0x335647,_0x26307f,0x0,_0x577112);};function Window_TextPopup(){const _0x18773f=_0x518efc;this[_0x18773f(0x55e)](...arguments);}Window_TextPopup['prototype']=Object[_0x518efc(0x869)](Window_Base[_0x518efc(0xa41)]),Window_TextPopup['prototype'][_0x518efc(0x60a)]=Window_TextPopup,Window_TextPopup[_0x518efc(0x994)]={'framesPerChar':VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x471)]??1.5,'framesMin':VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x90f)]['MinDuration']??0x5a,'framesMax':VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x54d)][_0x518efc(0x90f)][_0x518efc(0x51b)]??0x12c},Window_TextPopup['prototype']['initialize']=function(){const _0x544495=_0x518efc,_0x32dceb=new Rectangle(0x0,0x0,0x1,0x1);Window_Base[_0x544495(0xa41)][_0x544495(0x55e)][_0x544495(0x30d)](this,_0x32dceb),this['openness']=0x0,this['_text']='',this['_textQueue']=[],this[_0x544495(0x7d9)]=0x0;},Window_TextPopup['prototype']['isAutoColorAffected']=function(){return!![];},Window_TextPopup['prototype']['addQueue']=function(_0x15cbbc){const _0x33f70f=_0x518efc;if(this['_textQueue'][this['_textQueue']['length']-0x1]===_0x15cbbc)return;this[_0x33f70f(0xa0c)][_0x33f70f(0x609)](_0x15cbbc),SceneManager[_0x33f70f(0x18c)][_0x33f70f(0x1f4)](this);},Window_TextPopup['prototype'][_0x518efc(0x4ba)]=function(){const _0x266486=_0x518efc;Window_Base[_0x266486(0xa41)][_0x266486(0x4ba)][_0x266486(0x30d)](this),this[_0x266486(0x57d)](),this[_0x266486(0x69c)]();},Window_TextPopup[_0x518efc(0xa41)][_0x518efc(0x57d)]=function(){const _0x49990b=_0x518efc;if(this[_0x49990b(0x759)]!=='')return;if(this[_0x49990b(0xa0c)][_0x49990b(0x18d)]<=0x0)return;if(!this[_0x49990b(0x494)]())return;this[_0x49990b(0x759)]=this['_textQueue'][_0x49990b(0x91d)]();const _0x5f30f5=Window_TextPopup[_0x49990b(0x994)],_0x5954b0=Math[_0x49990b(0x972)](this[_0x49990b(0x759)][_0x49990b(0x18d)]*_0x5f30f5[_0x49990b(0x415)]);this[_0x49990b(0x7d9)]=_0x5954b0['clamp'](_0x5f30f5[_0x49990b(0x1b2)],_0x5f30f5[_0x49990b(0x4d5)]);const _0xdc3760=this[_0x49990b(0x8ae)](this[_0x49990b(0x759)]);let _0xfaa9cd=_0xdc3760[_0x49990b(0x217)]+this[_0x49990b(0x280)]()*0x2;_0xfaa9cd+=$gameSystem[_0x49990b(0x93e)]()*0x2;let _0x2ae676=Math[_0x49990b(0x55c)](_0xdc3760['height'],this['lineHeight']());_0x2ae676+=$gameSystem[_0x49990b(0x93e)]()*0x2;const _0x5e45ea=Math[_0x49990b(0x38c)]((Graphics[_0x49990b(0x217)]-_0xfaa9cd)/0x2),_0x53bc18=Math[_0x49990b(0x38c)]((Graphics[_0x49990b(0x622)]-_0x2ae676)/0x2),_0x2d1f49=new Rectangle(_0x5e45ea,_0x53bc18,_0xfaa9cd,_0x2ae676);this['move'](_0x2d1f49['x'],_0x2d1f49['y'],_0x2d1f49[_0x49990b(0x217)],_0x2d1f49[_0x49990b(0x622)]),this['createContents'](),this[_0x49990b(0x5b5)](),this[_0x49990b(0x67c)](),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x518efc(0xa41)][_0x518efc(0x5b5)]=function(){const _0x196b08=_0x518efc,_0x443a23=this[_0x196b08(0x647)]();this[_0x196b08(0x3fb)][_0x196b08(0x85c)](),this[_0x196b08(0x8dd)](this[_0x196b08(0x759)],_0x443a23['x'],_0x443a23['y'],_0x443a23[_0x196b08(0x217)]);},Window_TextPopup['prototype']['updateDuration']=function(){const _0x405dda=_0x518efc;if(this[_0x405dda(0x1ad)]()||this['isClosing']())return;if(this[_0x405dda(0x7d9)]<=0x0)return;this[_0x405dda(0x7d9)]--,this[_0x405dda(0x7d9)]<=0x0&&(this[_0x405dda(0x4fd)](),this[_0x405dda(0x759)]='');},VisuMZ[_0x518efc(0x8fb)]=function(_0x84d06d){const _0x3c7091=_0x518efc;if(Utils[_0x3c7091(0x7ee)](_0x3c7091(0x7f8))){var _0x115778=require(_0x3c7091(0x755))['Window'][_0x3c7091(0x4bd)]();SceneManager[_0x3c7091(0x3b4)]();if(_0x84d06d)setTimeout(_0x115778[_0x3c7091(0x44a)][_0x3c7091(0x670)](_0x115778),0x190);}},VisuMZ[_0x518efc(0x3e7)]=function(_0x41c454,_0x5ad98e){const _0x59b60d=_0x518efc;_0x5ad98e=_0x5ad98e['toUpperCase']();var _0x3decee=1.70158,_0x55cbb6=0.7;switch(_0x5ad98e){case _0x59b60d(0xa5c):return _0x41c454;case'INSINE':return-0x1*Math[_0x59b60d(0x7b8)](_0x41c454*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math[_0x59b60d(0x4e1)](_0x41c454*(Math['PI']/0x2));case _0x59b60d(0x77f):return-0.5*(Math[_0x59b60d(0x7b8)](Math['PI']*_0x41c454)-0x1);case _0x59b60d(0x300):return _0x41c454*_0x41c454;case _0x59b60d(0x71c):return _0x41c454*(0x2-_0x41c454);case _0x59b60d(0x6dc):return _0x41c454<0.5?0x2*_0x41c454*_0x41c454:-0x1+(0x4-0x2*_0x41c454)*_0x41c454;case _0x59b60d(0x553):return _0x41c454*_0x41c454*_0x41c454;case _0x59b60d(0x1e2):var _0x26dbe9=_0x41c454-0x1;return _0x26dbe9*_0x26dbe9*_0x26dbe9+0x1;case _0x59b60d(0x4b0):return _0x41c454<0.5?0x4*_0x41c454*_0x41c454*_0x41c454:(_0x41c454-0x1)*(0x2*_0x41c454-0x2)*(0x2*_0x41c454-0x2)+0x1;case _0x59b60d(0x82e):return _0x41c454*_0x41c454*_0x41c454*_0x41c454;case _0x59b60d(0x654):var _0x26dbe9=_0x41c454-0x1;return 0x1-_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9;case _0x59b60d(0x4f5):var _0x26dbe9=_0x41c454-0x1;return _0x41c454<0.5?0x8*_0x41c454*_0x41c454*_0x41c454*_0x41c454:0x1-0x8*_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9;case _0x59b60d(0x8a1):return _0x41c454*_0x41c454*_0x41c454*_0x41c454*_0x41c454;case _0x59b60d(0x4d3):var _0x26dbe9=_0x41c454-0x1;return 0x1+_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9;case _0x59b60d(0x3c7):var _0x26dbe9=_0x41c454-0x1;return _0x41c454<0.5?0x10*_0x41c454*_0x41c454*_0x41c454*_0x41c454*_0x41c454:0x1+0x10*_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9*_0x26dbe9;case _0x59b60d(0x7f0):if(_0x41c454===0x0){if(_0x59b60d(0x9fe)!==_0x59b60d(0x9fe))this['cursorUp'](_0x552746[_0x59b60d(0x702)]('up'));else return 0x0;}return Math['pow'](0x2,0xa*(_0x41c454-0x1));case _0x59b60d(0x902):if(_0x41c454===0x1)return 0x1;return-Math[_0x59b60d(0x77b)](0x2,-0xa*_0x41c454)+0x1;case _0x59b60d(0x55b):if(_0x41c454===0x0||_0x41c454===0x1)return _0x59b60d(0x30f)===_0x59b60d(0x30f)?_0x41c454:_0x23d016[_0x59b60d(0x587)][_0x59b60d(0x57a)][_0x59b60d(0x30d)](this);var _0x335434=_0x41c454*0x2,_0xb6c670=_0x335434-0x1;if(_0x335434<0x1){if(_0x59b60d(0x932)!==_0x59b60d(0x932)){if(typeof _0x1439de===_0x59b60d(0x593))return this[_0x59b60d(0x923)](_0x4caa44);_0x27deb5=_0x54eb81(_0x5543b4||'')[_0x59b60d(0x1fa)]();if(_0x2ba192===_0x59b60d(0x167))return this[_0x59b60d(0x923)](0x0);if(_0x9e68f8===_0x59b60d(0x914))return this[_0x59b60d(0x923)](0x1);if(_0x334b56===_0x59b60d(0x97b))return this[_0x59b60d(0x923)](0x2);if(_0x4adf56===_0x59b60d(0x3f5))return this[_0x59b60d(0x923)](0x3);if(_0x2c4669===_0x59b60d(0x7d5))return this[_0x59b60d(0x923)](0x4);if(_0x50f1fb===_0x59b60d(0x621))return this[_0x59b60d(0x923)](0x5);if(_0x138c50===_0x59b60d(0x909))return this[_0x59b60d(0x923)](0x6);if(_0x3578d8===_0x59b60d(0x2cd))return this[_0x59b60d(0x923)](0x7);if(_0x2577ed==='HIT')return _0x25649e?_0x383f6e(_0x3e62c1[_0x59b60d(0x38c)](this['xparam'](0x0)*0x64))+'%':this[_0x59b60d(0x376)](0x0);if(_0x5abafe===_0x59b60d(0x726))return _0xcc4e4e?_0x2da5fc(_0x597a08[_0x59b60d(0x38c)](this[_0x59b60d(0x376)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x20bb22===_0x59b60d(0x3c3))return _0x28b113?_0x50c551(_0x20ce8c[_0x59b60d(0x38c)](this[_0x59b60d(0x376)](0x2)*0x64))+'%':this[_0x59b60d(0x376)](0x2);if(_0x5b5b9f===_0x59b60d(0x338))return _0x3c1961?_0x10ee2c(_0x4d0d7c['round'](this[_0x59b60d(0x376)](0x3)*0x64))+'%':this[_0x59b60d(0x376)](0x3);if(_0x3214cc===_0x59b60d(0x6f2))return _0xe6102c?_0x2072d3(_0xc9ecb['round'](this[_0x59b60d(0x376)](0x4)*0x64))+'%':this[_0x59b60d(0x376)](0x4);if(_0x2a7ae2===_0x59b60d(0x4ff))return _0x1ea124?_0x4714c2(_0x2e324d[_0x59b60d(0x38c)](this[_0x59b60d(0x376)](0x5)*0x64))+'%':this[_0x59b60d(0x376)](0x5);if(_0x4f3abe===_0x59b60d(0x69d))return _0x553d6e?_0xcfda8a(_0x584be9[_0x59b60d(0x38c)](this['xparam'](0x6)*0x64))+'%':this[_0x59b60d(0x376)](0x6);if(_0x528a74===_0x59b60d(0x63c))return _0x185df7?_0x12ba68(_0x335a68['round'](this['xparam'](0x7)*0x64))+'%':this[_0x59b60d(0x376)](0x7);if(_0x111d7b===_0x59b60d(0x8c6))return _0x1ee644?_0x1310ad(_0x52beca[_0x59b60d(0x38c)](this[_0x59b60d(0x376)](0x8)*0x64))+'%':this['xparam'](0x8);if(_0x4aeba4===_0x59b60d(0x9a8))return _0x4f1a84?_0x528e47(_0x4352d7['round'](this[_0x59b60d(0x376)](0x9)*0x64))+'%':this[_0x59b60d(0x376)](0x9);if(_0x372a68===_0x59b60d(0x7f5))return _0x5724f9?_0x501903(_0x278f5c[_0x59b60d(0x38c)](this[_0x59b60d(0x534)](0x0)*0x64))+'%':this[_0x59b60d(0x534)](0x0);if(_0x3f09a5===_0x59b60d(0x5cd))return _0x4911ea?_0x49bab4(_0x4a1f6c['round'](this[_0x59b60d(0x534)](0x1)*0x64))+'%':this[_0x59b60d(0x534)](0x1);if(_0x5bf326===_0x59b60d(0x335))return _0x5b3a8e?_0x39d1cf(_0x3295b4[_0x59b60d(0x38c)](this[_0x59b60d(0x534)](0x2)*0x64))+'%':this[_0x59b60d(0x534)](0x2);if(_0x4b14c1===_0x59b60d(0x7f3))return _0x48082b?_0x3dac06(_0x126b04[_0x59b60d(0x38c)](this[_0x59b60d(0x534)](0x3)*0x64))+'%':this[_0x59b60d(0x534)](0x3);if(_0x749304===_0x59b60d(0x606))return _0x429c73?_0x567733(_0x572335['round'](this[_0x59b60d(0x534)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x250b34===_0x59b60d(0x37f))return _0x3b68bc?_0x446df3(_0xde151d['round'](this[_0x59b60d(0x534)](0x5)*0x64))+'%':this[_0x59b60d(0x534)](0x5);if(_0x57bd34===_0x59b60d(0x999))return _0x2c6a3c?_0x3d73b9(_0x4646b3[_0x59b60d(0x38c)](this['sparam'](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x5262da==='MDR')return _0x5aecd6?_0x2579b6(_0x3c6e60[_0x59b60d(0x38c)](this[_0x59b60d(0x534)](0x7)*0x64))+'%':this[_0x59b60d(0x534)](0x7);if(_0x2c6857===_0x59b60d(0x7e4))return _0x26747e?_0x3f2c09(_0x54ef76['round'](this[_0x59b60d(0x534)](0x8)*0x64))+'%':this[_0x59b60d(0x534)](0x8);if(_0xa93523===_0x59b60d(0x5df))return _0x74ebd0?_0x39bb45(_0x12c087[_0x59b60d(0x38c)](this['sparam'](0x9)*0x64))+'%':this[_0x59b60d(0x534)](0x9);if(_0x343cec[_0x59b60d(0x1c9)][_0x59b60d(0x506)][_0xef83ff]){const _0x549748=_0x289319[_0x59b60d(0x1c9)][_0x59b60d(0x506)][_0x5837f6],_0x45cdd6=this[_0x549748];return _0x1b81f3[_0x59b60d(0x1c9)][_0x59b60d(0x9cf)][_0x434754]===_0x59b60d(0x5de)?_0x45cdd6:_0x32ca69?_0x4a01cb(_0x3f5655[_0x59b60d(0x38c)](_0x45cdd6*0x64))+'%':_0x45cdd6;}return'';}else return 0.5*Math[_0x59b60d(0x77b)](0x2,0xa*_0xb6c670);}return 0.5*(-Math[_0x59b60d(0x77b)](0x2,-0xa*_0xb6c670)+0x2);case _0x59b60d(0x263):var _0x335434=_0x41c454/0x1;return-0x1*(Math[_0x59b60d(0x705)](0x1-_0x335434*_0x41c454)-0x1);case _0x59b60d(0x819):var _0x26dbe9=_0x41c454-0x1;return Math[_0x59b60d(0x705)](0x1-_0x26dbe9*_0x26dbe9);case _0x59b60d(0x6a9):var _0x335434=_0x41c454*0x2,_0xb6c670=_0x335434-0x2;if(_0x335434<0x1)return-0.5*(Math[_0x59b60d(0x705)](0x1-_0x335434*_0x335434)-0x1);return 0.5*(Math['sqrt'](0x1-_0xb6c670*_0xb6c670)+0x1);case'INBACK':return _0x41c454*_0x41c454*((_0x3decee+0x1)*_0x41c454-_0x3decee);case _0x59b60d(0x5a5):var _0x335434=_0x41c454/0x1-0x1;return _0x335434*_0x335434*((_0x3decee+0x1)*_0x335434+_0x3decee)+0x1;break;case'INOUTBACK':var _0x335434=_0x41c454*0x2,_0xa521bc=_0x335434-0x2,_0x2dd400=_0x3decee*1.525;if(_0x335434<0x1){if(_0x59b60d(0x299)!==_0x59b60d(0x491))return 0.5*_0x335434*_0x335434*((_0x2dd400+0x1)*_0x335434-_0x2dd400);else this['isUseModernControls']()&&_0x3ef187&&this[_0x59b60d(0x9d1)]()===0x1&&this['index']()===0x0?this[_0x59b60d(0x3c1)](this['maxItems']()-0x1):_0x321790[_0x59b60d(0x1c9)][_0x59b60d(0x644)][_0x59b60d(0x30d)](this,_0x33fe5b);}return 0.5*(_0xa521bc*_0xa521bc*((_0x2dd400+0x1)*_0xa521bc+_0x2dd400)+0x2);case _0x59b60d(0x15e):if(_0x41c454===0x0||_0x41c454===0x1){if('kttLh'!=='kttLh'){const _0x596d9c=this[_0x59b60d(0x329)]();this[_0x59b60d(0x318)]=new _0x782bf9(_0x596d9c),this[_0x59b60d(0x318)][_0x59b60d(0x7d4)](_0x59b60d(0xa39),this['popScene']['bind'](this)),this[_0x59b60d(0x6d2)](this[_0x59b60d(0x318)]),this['_commandWindow']['setBackgroundType'](_0xeebc71[_0x59b60d(0x587)][_0x59b60d(0x944)]);}else return _0x41c454;}var _0x335434=_0x41c454/0x1,_0xb6c670=_0x335434-0x1,_0x811d37=0x1-_0x55cbb6,_0x2dd400=_0x811d37/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math[_0x59b60d(0x77b)](0x2,0xa*_0xb6c670)*Math[_0x59b60d(0x4e1)]((_0xb6c670-_0x2dd400)*(0x2*Math['PI'])/_0x811d37));case'OUTELASTIC':var _0x811d37=0x1-_0x55cbb6,_0x335434=_0x41c454*0x2;if(_0x41c454===0x0||_0x41c454===0x1)return _0x41c454;var _0x2dd400=_0x811d37/(0x2*Math['PI'])*Math[_0x59b60d(0x306)](0x1);return Math[_0x59b60d(0x77b)](0x2,-0xa*_0x335434)*Math['sin']((_0x335434-_0x2dd400)*(0x2*Math['PI'])/_0x811d37)+0x1;case _0x59b60d(0x6c4):var _0x811d37=0x1-_0x55cbb6;if(_0x41c454===0x0||_0x41c454===0x1)return _0x41c454;var _0x335434=_0x41c454*0x2,_0xb6c670=_0x335434-0x1,_0x2dd400=_0x811d37/(0x2*Math['PI'])*Math[_0x59b60d(0x306)](0x1);if(_0x335434<0x1){if(_0x59b60d(0x7d0)!==_0x59b60d(0x481))return-0.5*(Math['pow'](0x2,0xa*_0xb6c670)*Math[_0x59b60d(0x4e1)]((_0xb6c670-_0x2dd400)*(0x2*Math['PI'])/_0x811d37));else this[_0x59b60d(0xa33)](_0x59ffad);}return Math['pow'](0x2,-0xa*_0xb6c670)*Math['sin']((_0xb6c670-_0x2dd400)*(0x2*Math['PI'])/_0x811d37)*0.5+0x1;case'OUTBOUNCE':var _0x335434=_0x41c454/0x1;if(_0x335434<0x1/2.75)return 7.5625*_0x335434*_0x335434;else{if(_0x335434<0x2/2.75){if(_0x59b60d(0x60c)===_0x59b60d(0x925))_0x4d4b09+=_0x1cd570+'\x0a',_0x1415c2+=_0x59b60d(0xa4a),_0x1e450b[_0x59b60d(0x554)][0x4]!==''&&_0x23d629[_0x59b60d(0x554)][0x4]!==_0x134d3e&&(_0x5deadb+=_0x59b60d(0x674)[_0x59b60d(0x67d)](_0x399413['parameters'][0x4]));else{var _0xa521bc=_0x335434-1.5/2.75;return 7.5625*_0xa521bc*_0xa521bc+0.75;}}else{if(_0x335434<2.5/2.75){var _0xa521bc=_0x335434-2.25/2.75;return 7.5625*_0xa521bc*_0xa521bc+0.9375;}else{var _0xa521bc=_0x335434-2.625/2.75;return 7.5625*_0xa521bc*_0xa521bc+0.984375;}}}case _0x59b60d(0x42b):var _0x244fe7=0x1-VisuMZ[_0x59b60d(0x3e7)](0x1-_0x41c454,_0x59b60d(0x5d2));return _0x244fe7;case _0x59b60d(0x921):if(_0x41c454<0.5){if('urdpT'!==_0x59b60d(0x330)){const _0x56a37e=_0x105514[_0x59b60d(0x217)]/this[_0x59b60d(0x6ba)]();_0x56a37e%0x1!==0x0&&_0x2dd25a[_0x59b60d(0x972)](_0x56a37e)===this[_0x59b60d(0x217)]()&&!this[_0x59b60d(0x4f9)]()&&(this[_0x59b60d(0xa62)][_0x59b60d(0x20b)]=!![],this[_0x59b60d(0xa62)][_0x59b60d(0x824)]=_0x50dfc3[_0x59b60d(0x2c9)]||0x0);}else var _0x244fe7=VisuMZ['ApplyEasing'](_0x41c454*0x2,_0x59b60d(0x3f4))*0.5;}else{if(_0x59b60d(0x62a)===_0x59b60d(0x62a))var _0x244fe7=VisuMZ['ApplyEasing'](_0x41c454*0x2-0x1,_0x59b60d(0x5d2))*0.5+0.5;else this[_0x59b60d(0x720)]=![];}return _0x244fe7;default:return _0x41c454;}},VisuMZ['GetParamIcon']=function(_0x1ae670){const _0x1c3894=_0x518efc;_0x1ae670=String(_0x1ae670)['toUpperCase']();const _0x390bc0=VisuMZ[_0x1c3894(0x1c9)][_0x1c3894(0x54d)][_0x1c3894(0x224)];if(_0x1ae670===_0x1c3894(0x167))return _0x390bc0['IconParam0'];if(_0x1ae670===_0x1c3894(0x914))return _0x390bc0[_0x1c3894(0x24d)];if(_0x1ae670===_0x1c3894(0x97b))return _0x390bc0[_0x1c3894(0x61d)];if(_0x1ae670==='DEF')return _0x390bc0[_0x1c3894(0x1f9)];if(_0x1ae670==='MAT')return _0x390bc0[_0x1c3894(0x18b)];if(_0x1ae670===_0x1c3894(0x621))return _0x390bc0[_0x1c3894(0x64f)];if(_0x1ae670===_0x1c3894(0x909))return _0x390bc0['IconParam6'];if(_0x1ae670===_0x1c3894(0x2cd))return _0x390bc0[_0x1c3894(0x870)];if(_0x1ae670===_0x1c3894(0x344))return _0x390bc0[_0x1c3894(0x8c2)];if(_0x1ae670===_0x1c3894(0x726))return _0x390bc0[_0x1c3894(0x536)];if(_0x1ae670===_0x1c3894(0x3c3))return _0x390bc0[_0x1c3894(0x83c)];if(_0x1ae670===_0x1c3894(0x338))return _0x390bc0[_0x1c3894(0x813)];if(_0x1ae670===_0x1c3894(0x6f2))return _0x390bc0['IconXParam4'];if(_0x1ae670==='MRF')return _0x390bc0[_0x1c3894(0x1e0)];if(_0x1ae670===_0x1c3894(0x69d))return _0x390bc0['IconXParam6'];if(_0x1ae670==='HRG')return _0x390bc0[_0x1c3894(0x152)];if(_0x1ae670===_0x1c3894(0x8c6))return _0x390bc0['IconXParam8'];if(_0x1ae670==='TRG')return _0x390bc0[_0x1c3894(0x3e8)];if(_0x1ae670===_0x1c3894(0x7f5))return _0x390bc0[_0x1c3894(0x98b)];if(_0x1ae670===_0x1c3894(0x5cd))return _0x390bc0[_0x1c3894(0xa1e)];if(_0x1ae670===_0x1c3894(0x335))return _0x390bc0[_0x1c3894(0x7c8)];if(_0x1ae670===_0x1c3894(0x7f3))return _0x390bc0[_0x1c3894(0xa3c)];if(_0x1ae670===_0x1c3894(0x606))return _0x390bc0['IconSParam4'];if(_0x1ae670===_0x1c3894(0x37f))return _0x390bc0[_0x1c3894(0x15d)];if(_0x1ae670===_0x1c3894(0x999))return _0x390bc0['IconSParam6'];if(_0x1ae670===_0x1c3894(0x313))return _0x390bc0[_0x1c3894(0x4c9)];if(_0x1ae670==='FDR')return _0x390bc0[_0x1c3894(0x992)];if(_0x1ae670===_0x1c3894(0x5df))return _0x390bc0[_0x1c3894(0x619)];if(VisuMZ[_0x1c3894(0x1c9)][_0x1c3894(0x74c)][_0x1ae670]){if(_0x1c3894(0x1a0)!==_0x1c3894(0x1a0)){let _0x217473=this[_0x1c3894(0x81d)];this[_0x1c3894(0x81d)]=_0x18dc26,_0x217473!==this[_0x1c3894(0x81d)]&&(this[_0x1c3894(0x5b5)](),_0x33fc8d['playOk'](),this[_0x1c3894(0x81d)]===_0x1c3894(0x592)?this[_0x1c3894(0x261)](0x0):this[_0x1c3894(0x261)](-0x1));}else return VisuMZ['CoreEngine'][_0x1c3894(0x74c)][_0x1ae670]||0x0;}return 0x0;},VisuMZ[_0x518efc(0xa3a)]=function(_0xd2f6e6,_0x274f68,_0x2440b2){const _0x10865f=_0x518efc;if(_0x2440b2===undefined&&_0xd2f6e6%0x1===0x0)return _0xd2f6e6;if(_0x2440b2!==undefined&&['MAXHP',_0x10865f(0x914),_0x10865f(0x97b),_0x10865f(0x3f5),_0x10865f(0x7d5),_0x10865f(0x621),'AGI',_0x10865f(0x2cd)][_0x10865f(0x1f5)](String(_0x2440b2)[_0x10865f(0x1fa)]()[_0x10865f(0x445)]()))return _0xd2f6e6;_0x274f68=_0x274f68||0x0;if(VisuMZ['CoreEngine'][_0x10865f(0x506)][_0x2440b2]){if(VisuMZ['CoreEngine'][_0x10865f(0x9cf)][_0x2440b2]==='integer'){if(_0x10865f(0x2f9)===_0x10865f(0x2f9))return _0xd2f6e6;else _0x5646b3['CoreEngine'][_0x10865f(0x54d)]['MenuLayout'][_0x10865f(0x54c)]['drawGameSubtitle'][_0x10865f(0x30d)](this);}else return String((_0xd2f6e6*0x64)[_0x10865f(0x3a2)](_0x274f68))+'%';}return String((_0xd2f6e6*0x64)[_0x10865f(0x3a2)](_0x274f68))+'%';},VisuMZ[_0x518efc(0x1bd)]=function(_0x581f5a){const _0x38b817=_0x518efc;_0x581f5a=String(_0x581f5a);if(!_0x581f5a)return _0x581f5a;if(typeof _0x581f5a!=='string')return _0x581f5a;const _0x54d7bd=VisuMZ['CoreEngine'][_0x38b817(0x54d)][_0x38b817(0x927)][_0x38b817(0x3df)]||_0x38b817(0x489),_0x56a696={'maximumFractionDigits':0x6};_0x581f5a=_0x581f5a['replace'](/\[(.*?)\]/g,(_0x2f7db7,_0x3b052c)=>{const _0x2e3f18=_0x38b817;return VisuMZ[_0x2e3f18(0x356)](_0x3b052c,'[',']');}),_0x581f5a=_0x581f5a['replace'](/<(.*?)>/g,(_0x3d2ce7,_0x233cf4)=>{const _0x38c63a=_0x38b817;if(_0x38c63a(0x579)===_0x38c63a(0x579))return VisuMZ['PreserveNumbers'](_0x233cf4,'<','>');else{const _0x100852=this[_0x38c63a(0x864)](),_0x20e7e7=this[_0x38c63a(0x4a3)](),_0x394e59=this[_0x38c63a(0x295)]();this['setupFont'](),this[_0x38c63a(0x463)]['clear'](),this[_0x38c63a(0x463)][_0x38c63a(0x4ec)](_0x100852,0x4,0x0,_0x20e7e7-0xa,_0x394e59,_0x38c63a(0x42a));}}),_0x581f5a=_0x581f5a['replace'](/\{\{(.*?)\}\}/g,(_0x118cc1,_0x2dd301)=>{const _0x5a05bd=_0x38b817;if(_0x5a05bd(0x684)!==_0x5a05bd(0x5c4))return VisuMZ['PreserveNumbers'](_0x2dd301,'','');else{const _0x313cc6='_stored_ctGaugeColor2';this[_0x5a05bd(0x81f)]=this[_0x5a05bd(0x81f)]||{};if(this['_colorCache'][_0x313cc6])return this[_0x5a05bd(0x81f)][_0x313cc6];const _0x33165f=_0x3a3e61[_0x5a05bd(0x1c9)][_0x5a05bd(0x54d)][_0x5a05bd(0x3b3)][_0x5a05bd(0x5d0)];return this[_0x5a05bd(0x629)](_0x313cc6,_0x33165f);}}),_0x581f5a=_0x581f5a[_0x38b817(0x180)](/(\d+\.?\d*)/g,(_0xb3b053,_0x4d9144)=>{const _0x2b352f=_0x38b817;let _0x2f17ac=_0x4d9144;if(_0x2f17ac[0x0]==='0')return _0x2f17ac;if(_0x2f17ac[_0x2f17ac['length']-0x1]==='.')return'ZRdkq'===_0x2b352f(0x29a)?Number(_0x2f17ac)[_0x2b352f(0x3cc)](_0x54d7bd,_0x56a696)+'.':_0x5bc4f5[_0x2b352f(0x450)][_0x2b352f(0x30d)](this);else{if(_0x2f17ac[_0x2f17ac[_0x2b352f(0x18d)]-0x1]===','){if(_0x2b352f(0x586)===_0x2b352f(0x278)){const _0x95c62f=_0x35a315[_0x2b352f(0x1c9)][_0x2b352f(0x54d)]['jsQuickFunc'];for(const _0x5537e4 of _0x95c62f){const _0x290aa9=_0x5537e4[_0x2b352f(0x8e2)][_0x2b352f(0x180)](/[ ]/g,''),_0x10dfc3=_0x5537e4[_0x2b352f(0x531)];_0x4bcf9c[_0x2b352f(0x1c9)][_0x2b352f(0x2af)](_0x290aa9,_0x10dfc3);}}else return Number(_0x2f17ac)[_0x2b352f(0x3cc)](_0x54d7bd,_0x56a696)+',';}else return _0x2b352f(0x87a)!==_0x2b352f(0x8d8)?Number(_0x2f17ac)[_0x2b352f(0x3cc)](_0x54d7bd,_0x56a696):(_0x3305de['setLastPluginCommandInterpreter'](this),_0x2952c0[_0x2b352f(0x1c9)][_0x2b352f(0x83f)][_0x2b352f(0x30d)](this,_0x3aa577));}});let _0x9c9099=0x3;while(_0x9c9099--){_0x581f5a=VisuMZ[_0x38b817(0x95a)](_0x581f5a);}return _0x581f5a;},VisuMZ[_0x518efc(0x356)]=function(_0x11bb06,_0x4f9c9b,_0x9bc3dc){const _0x16878b=_0x518efc;return _0x11bb06=_0x11bb06['replace'](/(\d)/gi,(_0x23d0dd,_0x3b8129)=>_0x16878b(0x4b8)[_0x16878b(0x67d)](Number(_0x3b8129))),'%2%1%3'[_0x16878b(0x67d)](_0x11bb06,_0x4f9c9b,_0x9bc3dc);},VisuMZ[_0x518efc(0x95a)]=function(_0x34c385){return _0x34c385=_0x34c385['replace'](/PRESERVCONVERSION\((\d+)\)/gi,(_0x20692d,_0x1ecbd6)=>Number(parseInt(_0x1ecbd6))),_0x34c385;},VisuMZ[_0x518efc(0x503)]=function(_0x3c10eb){const _0x1defa7=_0x518efc;SoundManager[_0x1defa7(0x962)]();if(!Utils['isNwjs']()){if(_0x1defa7(0x7be)==='xfEyB'){const _0x38d240=window[_0x1defa7(0x67c)](_0x3c10eb,_0x1defa7(0x3c6));}else _0x1bda34[_0x1defa7(0x97f)]=_0x1e4fff,_0x377807[_0x1defa7(0x66a)]=_0xe7e3e0[_0x1defa7(0x408)][_0x1defa7(0x711)](),_0x14099b['updateBgmParameters'](_0x467f49),_0x13ca5e[_0x1defa7(0x7c0)](_0x24b7e8,_0x334150[_0x1defa7(0x66a)]),_0x409e27['_bgmBuffer'][_0x1defa7(0x84e)](_0x373cb1[_0x1defa7(0x66a)]);}else{if(_0x1defa7(0x417)!==_0x1defa7(0x2e2)){const _0x5ed7f3=process[_0x1defa7(0x95e)]==_0x1defa7(0x590)?_0x1defa7(0x67c):process[_0x1defa7(0x95e)]==_0x1defa7(0x5b6)?'start':_0x1defa7(0x3b9);require('child_process')[_0x1defa7(0x385)](_0x5ed7f3+'\x20'+_0x3c10eb);}else this[_0x1defa7(0x261)](0x0);}},VisuMZ[_0x518efc(0x63b)]=function(_0x4c2245,_0x175e04){const _0xbfec3b=_0x518efc;if(!_0x4c2245)return'';const _0x21b43a=_0x4c2245[_0xbfec3b(0x6c3)]||_0x4c2245['id'];let _0x2d0992='';_0x4c2245[_0xbfec3b(0x387)]!==undefined&&_0x4c2245[_0xbfec3b(0x77c)]!==undefined&&(_0x2d0992=_0xbfec3b(0x750)['format'](_0x21b43a,_0x175e04));_0x4c2245[_0xbfec3b(0x5d1)]!==undefined&&_0x4c2245[_0xbfec3b(0xa08)]!==undefined&&(_0x2d0992=_0xbfec3b(0x430)[_0xbfec3b(0x67d)](_0x21b43a,_0x175e04));if(_0x4c2245[_0xbfec3b(0x5b8)]!==undefined&&_0x4c2245['requiredWtypeId1']!==undefined){if(_0xbfec3b(0x517)!=='Xetxy'){const _0x1b583e=_0x5d34c9[_0x4bbb1f];if(!_0x1b583e)return'';let _0x538c7a='';_0x538c7a+=_0x1b583e['name'];for(const _0x299b2e of _0x1b583e[_0xbfec3b(0x66b)]){for(const _0x384e47 of _0x299b2e[_0xbfec3b(0xa48)]){[0x6c,0x198][_0xbfec3b(0x1f5)](_0x384e47[_0xbfec3b(0x246)])&&(_0x538c7a+='\x0a',_0x538c7a+=_0x384e47[_0xbfec3b(0x554)][0x0]);}}return _0x538c7a;}else _0x2d0992=_0xbfec3b(0x697)['format'](_0x21b43a,_0x175e04);}_0x4c2245['itypeId']!==undefined&&_0x4c2245[_0xbfec3b(0xa64)]!==undefined&&(_0x2d0992=_0xbfec3b(0x565)[_0xbfec3b(0x67d)](_0x21b43a,_0x175e04));_0x4c2245['wtypeId']!==undefined&&_0x4c2245[_0xbfec3b(0x793)]===0x1&&('STnpU'!==_0xbfec3b(0x795)?_0x548cec+=_0x474a84:_0x2d0992='Weapon-%1-%2'[_0xbfec3b(0x67d)](_0x21b43a,_0x175e04));if(_0x4c2245['atypeId']!==undefined&&_0x4c2245[_0xbfec3b(0x793)]>0x1){if(_0xbfec3b(0x810)===_0xbfec3b(0x172)){if(this[_0xbfec3b(0x3a4)]===_0x52f869)this[_0xbfec3b(0x9a3)]();return this[_0xbfec3b(0x3a4)];}else _0x2d0992=_0xbfec3b(0x978)['format'](_0x21b43a,_0x175e04);}return _0x4c2245[_0xbfec3b(0x337)]!==undefined&&_0x4c2245[_0xbfec3b(0x4e6)]!==undefined&&(_0x2d0992=_0xbfec3b(0x7aa)[_0xbfec3b(0x67d)](_0x21b43a,_0x175e04)),_0x4c2245[_0xbfec3b(0x303)]!==undefined&&_0x4c2245[_0xbfec3b(0x21b)]!==undefined&&(_0x2d0992=_0xbfec3b(0x5cb)['format'](_0x21b43a,_0x175e04)),_0x2d0992;},Game_Picture['prototype'][_0x518efc(0x76b)]=function(){return this['_anchor'];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x5a9)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x9f6)],Game_Picture[_0x518efc(0xa41)][_0x518efc(0x9f6)]=function(){const _0x11e055=_0x518efc;VisuMZ[_0x11e055(0x1c9)][_0x11e055(0x5a9)][_0x11e055(0x30d)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x11e055(0x7e6)]={'x':0x0,'y':0x0};},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x6a2)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x964)],Game_Picture['prototype'][_0x518efc(0x964)]=function(){const _0x411047=_0x518efc;this[_0x411047(0x5fa)]();const _0x1f8413=this[_0x411047(0x4f2)];VisuMZ[_0x411047(0x1c9)][_0x411047(0x6a2)][_0x411047(0x30d)](this),_0x1f8413>0x0&&this['_duration']<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x411047(0x792)],this['_scaleX']=this['_targetScaleX'],this[_0x411047(0x1e4)]=this[_0x411047(0x43b)],this[_0x411047(0x396)]=this['_targetOpacity'],this[_0x411047(0x6d0)]&&(this[_0x411047(0x6d0)]['x']=this['_targetAnchor']['x'],this[_0x411047(0x6d0)]['y']=this[_0x411047(0x7e6)]['y']));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x2c8)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x29f)],Game_Picture[_0x518efc(0xa41)][_0x518efc(0x29f)]=function(_0x55c518,_0x4ea669,_0x4d38f0,_0x4e7dff,_0x1419b2,_0x98cfd1,_0x599b2e,_0xd4eb54){const _0x3d6c39=_0x518efc;VisuMZ['CoreEngine'][_0x3d6c39(0x2c8)][_0x3d6c39(0x30d)](this,_0x55c518,_0x4ea669,_0x4d38f0,_0x4e7dff,_0x1419b2,_0x98cfd1,_0x599b2e,_0xd4eb54),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x4ea669]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x518efc(0x969)]=Game_Picture[_0x518efc(0xa41)][_0x518efc(0x6f0)],Game_Picture[_0x518efc(0xa41)][_0x518efc(0x6f0)]=function(_0xe80cf1,_0x1a0a5e,_0x3db9c1,_0x23979d,_0xacdfc1,_0x34d223,_0x7b09e,_0x52cd61,_0x94034b){const _0x15a9f3=_0x518efc;VisuMZ[_0x15a9f3(0x1c9)][_0x15a9f3(0x969)]['call'](this,_0xe80cf1,_0x1a0a5e,_0x3db9c1,_0x23979d,_0xacdfc1,_0x34d223,_0x7b09e,_0x52cd61,_0x94034b),this['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0xe80cf1]||{'x':0x0,'y':0x0});},Game_Picture[_0x518efc(0xa41)]['updateAnchor']=function(){const _0x57cf43=_0x518efc;this[_0x57cf43(0x4f2)]>0x0&&(this[_0x57cf43(0x6d0)]['x']=this[_0x57cf43(0x544)](this['_anchor']['x'],this[_0x57cf43(0x7e6)]['x']),this[_0x57cf43(0x6d0)]['y']=this[_0x57cf43(0x544)](this['_anchor']['y'],this[_0x57cf43(0x7e6)]['y']));},Game_Picture[_0x518efc(0xa41)]['setAnchor']=function(_0x1ed453){const _0xe236eb=_0x518efc;this[_0xe236eb(0x6d0)]=_0x1ed453,this[_0xe236eb(0x7e6)]=JsonEx[_0xe236eb(0x919)](this['_anchor']);},Game_Picture[_0x518efc(0xa41)][_0x518efc(0x9d7)]=function(_0x371778){const _0x371b93=_0x518efc;this[_0x371b93(0x7e6)]=_0x371778;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x61e)]=Sprite_Picture[_0x518efc(0xa41)][_0x518efc(0x145)],Sprite_Picture[_0x518efc(0xa41)]['updateOrigin']=function(){const _0x3f0f13=_0x518efc,_0x1faa94=this[_0x3f0f13(0x63f)]();!_0x1faa94[_0x3f0f13(0x76b)]()?'OOEjn'===_0x3f0f13(0x39e)?_0x1c2bf8[_0x3f0f13(0x40c)]&&(this[_0x3f0f13(0x7da)]='OTB'):VisuMZ[_0x3f0f13(0x1c9)]['Sprite_Picture_updateOrigin'][_0x3f0f13(0x30d)](this):(this[_0x3f0f13(0x76b)]['x']=_0x1faa94[_0x3f0f13(0x76b)]()['x'],this[_0x3f0f13(0x76b)]['y']=_0x1faa94['anchor']()['y']);},Game_Action[_0x518efc(0xa41)][_0x518efc(0x571)]=function(_0x3c394f){const _0x26aade=_0x518efc;if(_0x3c394f){const _0x289a17=_0x3c394f[_0x26aade(0x358)];if(_0x289a17===0x1&&this[_0x26aade(0x34a)]()['attackSkillId']()!==0x1)this[_0x26aade(0x6e8)]();else{if(_0x289a17===0x2&&this['subject']()[_0x26aade(0x83d)]()!==0x2){if('MLMGV'===_0x26aade(0x6a3))this[_0x26aade(0x3ea)]();else{if(_0x48fa22[_0x36f55b]['pressed'])return!![];}}else this['setSkill'](_0x289a17);}}else{if(_0x26aade(0x6fa)!==_0x26aade(0x979))this[_0x26aade(0x85c)]();else return this[_0x26aade(0xa03)][_0x26aade(0x18d)]>0x0;}},Game_Actor[_0x518efc(0xa41)][_0x518efc(0x18a)]=function(){const _0x44781f=_0x518efc;return this[_0x44781f(0x99e)]()[_0x44781f(0x1cd)](_0x1eea6d=>this[_0x44781f(0x879)](_0x1eea6d)&&this['skillTypes']()['includes'](_0x1eea6d['stypeId']));},Window_Base[_0x518efc(0xa41)][_0x518efc(0x366)]=function(){const _0xd57597=_0x518efc;this['_dimmerSprite']=new Sprite(),this[_0xd57597(0x730)]['bitmap']=new Bitmap(0x0,0x0),this[_0xd57597(0x730)]['x']=0x0,this['addChildToBack'](this[_0xd57597(0x730)]);},Window_Base[_0x518efc(0xa41)]['refreshDimmerBitmap']=function(){const _0x2c73ad=_0x518efc;if(this['_dimmerSprite']){const _0x1bb185=this['_dimmerSprite'][_0x2c73ad(0x463)],_0x258c17=this[_0x2c73ad(0x217)],_0x2d015d=this[_0x2c73ad(0x622)],_0x15d64f=this['padding'],_0x365a61=ColorManager['dimColor1'](),_0x54ed20=ColorManager[_0x2c73ad(0xa45)]();_0x1bb185[_0x2c73ad(0x3bc)](_0x258c17,_0x2d015d),_0x1bb185['gradientFillRect'](0x0,0x0,_0x258c17,_0x15d64f,_0x54ed20,_0x365a61,!![]),_0x1bb185[_0x2c73ad(0x56b)](0x0,_0x15d64f,_0x258c17,_0x2d015d-_0x15d64f*0x2,_0x365a61),_0x1bb185[_0x2c73ad(0x85b)](0x0,_0x2d015d-_0x15d64f,_0x258c17,_0x15d64f,_0x365a61,_0x54ed20,!![]),this[_0x2c73ad(0x730)][_0x2c73ad(0x996)](0x0,0x0,_0x258c17,_0x2d015d);}},Game_Actor[_0x518efc(0xa41)]['makeAutoBattleActions']=function(){const _0x496d9c=_0x518efc;for(let _0x356379=0x0;_0x356379<this['numActions']();_0x356379++){if('tMFXr'!==_0x496d9c(0x952)){const _0x433cb2=this[_0x496d9c(0x4c2)]();let _0x33f39c=Number[_0x496d9c(0x5e7)];this[_0x496d9c(0x3e6)](_0x356379,_0x433cb2[0x0]);for(const _0x39191e of _0x433cb2){const _0x411069=_0x39191e[_0x496d9c(0x9ca)]();_0x411069>_0x33f39c&&(_0x33f39c=_0x411069,this[_0x496d9c(0x3e6)](_0x356379,_0x39191e));}}else return this[_0x496d9c(0x18c)]&&this[_0x496d9c(0x18c)]instanceof _0x403d10;}this[_0x496d9c(0x213)](_0x496d9c(0x1c3));},Window_BattleItem[_0x518efc(0xa41)][_0x518efc(0x3ec)]=function(_0x35da90){const _0xe6d03d=_0x518efc;return BattleManager[_0xe6d03d(0x454)]()?BattleManager['actor']()[_0xe6d03d(0x879)](_0x35da90):Window_ItemList['prototype'][_0xe6d03d(0x3ec)][_0xe6d03d(0x30d)](this,_0x35da90);},VisuMZ[_0x518efc(0x1c9)]['Scene_Map_createSpritesetFix']=Scene_Map[_0x518efc(0xa41)]['createSpriteset'],Scene_Map[_0x518efc(0xa41)][_0x518efc(0x15b)]=function(){const _0x6833b5=_0x518efc;VisuMZ['CoreEngine'][_0x6833b5(0x436)][_0x6833b5(0x30d)](this);const _0x2404a2=this[_0x6833b5(0x529)][_0x6833b5(0x158)];if(_0x2404a2)this['addChild'](_0x2404a2);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x7ba)]=Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x15b)],Scene_Battle[_0x518efc(0xa41)][_0x518efc(0x15b)]=function(){const _0xff516d=_0x518efc;VisuMZ[_0xff516d(0x1c9)][_0xff516d(0x7ba)][_0xff516d(0x30d)](this);const _0x25a7ba=this[_0xff516d(0x529)][_0xff516d(0x158)];if(_0x25a7ba)this['addChild'](_0x25a7ba);},Sprite_Actor[_0x518efc(0xa41)][_0x518efc(0x4ba)]=function(){const _0x2de2bf=_0x518efc;Sprite_Battler[_0x2de2bf(0xa41)][_0x2de2bf(0x4ba)][_0x2de2bf(0x30d)](this),this[_0x2de2bf(0x236)]();if(this[_0x2de2bf(0x8ec)])this[_0x2de2bf(0x769)]();else{if(this[_0x2de2bf(0x6fc)]!==''){if(_0x2de2bf(0x5be)===_0x2de2bf(0x3b5)){if(this['_CoreEngineSettings']===_0x331d54)this[_0x2de2bf(0x187)]();if(this['_CoreEngineSettings'][_0x2de2bf(0x862)]===_0x285b07)this[_0x2de2bf(0x187)]();this[_0x2de2bf(0x2e6)][_0x2de2bf(0x766)]=_0x3ff58f;}else this[_0x2de2bf(0x6fc)]='';}}},Window['prototype'][_0x518efc(0x668)]=function(){const _0x21a871=_0x518efc,_0x394e96=this[_0x21a871(0x895)],_0x512bac=this['_height'],_0x4aff23=0x18,_0x2019b9=_0x4aff23/0x2,_0x374dba=0x60+_0x4aff23,_0xec333d=0x0+_0x4aff23;this[_0x21a871(0xa21)][_0x21a871(0x463)]=this['_windowskin'],this[_0x21a871(0xa21)][_0x21a871(0x76b)]['x']=0.5,this[_0x21a871(0xa21)]['anchor']['y']=0.5,this[_0x21a871(0xa21)]['setFrame'](_0x374dba+_0x2019b9,_0xec333d+_0x2019b9+_0x4aff23,_0x4aff23,_0x2019b9),this['_downArrowSprite'][_0x21a871(0x6f0)](Math[_0x21a871(0x38c)](_0x394e96/0x2),Math['round'](_0x512bac-_0x2019b9)),this[_0x21a871(0x94e)][_0x21a871(0x463)]=this[_0x21a871(0x41c)],this[_0x21a871(0x94e)][_0x21a871(0x76b)]['x']=0.5,this['_upArrowSprite'][_0x21a871(0x76b)]['y']=0.5,this[_0x21a871(0x94e)][_0x21a871(0x996)](_0x374dba+_0x2019b9,_0xec333d,_0x4aff23,_0x2019b9),this[_0x21a871(0x94e)][_0x21a871(0x6f0)](Math['round'](_0x394e96/0x2),Math['round'](_0x2019b9));},Window[_0x518efc(0xa41)][_0x518efc(0x878)]=function(){const _0x4b3b23=_0x518efc,_0x5220fa=0x90,_0x55f4d3=0x60,_0xd2c2df=0x18;this[_0x4b3b23(0x48e)][_0x4b3b23(0x463)]=this[_0x4b3b23(0x41c)],this['_pauseSignSprite'][_0x4b3b23(0x76b)]['x']=0.5,this[_0x4b3b23(0x48e)]['anchor']['y']=0x1,this[_0x4b3b23(0x48e)][_0x4b3b23(0x6f0)](Math[_0x4b3b23(0x38c)](this[_0x4b3b23(0x895)]/0x2),this[_0x4b3b23(0x16e)]),this[_0x4b3b23(0x48e)][_0x4b3b23(0x996)](_0x5220fa,_0x55f4d3,_0xd2c2df,_0xd2c2df),this[_0x4b3b23(0x48e)]['alpha']=0xff;},Window[_0x518efc(0xa41)][_0x518efc(0x5ce)]=function(){const _0x4163b9=_0x518efc,_0x17a714=this[_0x4163b9(0x5b0)]['worldTransform'][_0x4163b9(0x6c0)](new Point(0x0,0x0)),_0x4345a3=this[_0x4163b9(0x5b0)][_0x4163b9(0xa37)];_0x4345a3['x']=_0x17a714['x']+this[_0x4163b9(0x6d7)]['x'],_0x4345a3['y']=_0x17a714['y']+this['origin']['y'],_0x4345a3[_0x4163b9(0x217)]=Math[_0x4163b9(0x972)](this[_0x4163b9(0xa59)]*this[_0x4163b9(0x8b0)]['x']),_0x4345a3[_0x4163b9(0x622)]=Math[_0x4163b9(0x972)](this[_0x4163b9(0x900)]*this['scale']['y']);},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x15c)]=Window[_0x518efc(0xa41)]['_refreshBack'],Window[_0x518efc(0xa41)]['_refreshBack']=function(){const _0x303d90=_0x518efc,_0x40472f=VisuMZ['CoreEngine']['Settings'][_0x303d90(0x90f)][_0x303d90(0x414)]??!![];if(!_0x40472f){if(_0x303d90(0x32c)!==_0x303d90(0x854))return VisuMZ[_0x303d90(0x1c9)]['Window_refreshBack'][_0x303d90(0x30d)](this);else{let _0x4d43ed=_0x492a30['createTroopNote'](_0x1a3baf['id']);this['parseForcedGameTroopSettingsCoreEngine'](_0x4d43ed);}}const _0x31fade=this['_margin'],_0x216ebc=Math['max'](0x0,this[_0x303d90(0x895)]-_0x31fade*0x2),_0x31b6b1=Math[_0x303d90(0x55c)](0x0,this[_0x303d90(0x16e)]-_0x31fade*0x2),_0x546577=this['_backSprite'],_0x2184dd=_0x546577[_0x303d90(0x5e9)][0x0];_0x546577[_0x303d90(0x463)]=this[_0x303d90(0x41c)],_0x546577[_0x303d90(0x996)](0x0,0x0,0x60,0x60),_0x546577[_0x303d90(0x6f0)](_0x31fade,_0x31fade),_0x546577['scale']['x']=_0x216ebc/0x60,_0x546577['scale']['y']=_0x31b6b1/0x60,_0x2184dd[_0x303d90(0x463)]=this[_0x303d90(0x41c)],_0x2184dd['setFrame'](0x0,0x60,0x60,0x60),_0x2184dd['move'](0x0,0x0,_0x216ebc,_0x31b6b1),_0x2184dd['scale']['x']=0x1/_0x546577[_0x303d90(0x8b0)]['x'],_0x2184dd['scale']['y']=0x1/_0x546577[_0x303d90(0x8b0)]['y'],_0x546577[_0x303d90(0x25c)](this[_0x303d90(0x84c)]);},Game_Temp['prototype'][_0x518efc(0x370)]=function(){const _0x51f2d3=_0x518efc;this[_0x51f2d3(0x2e3)]=[],this[_0x51f2d3(0xa35)]=[],this[_0x51f2d3(0x9ba)]=[],this[_0x51f2d3(0x1b1)]=[];},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x78f)]=Scene_Base[_0x518efc(0xa41)][_0x518efc(0x41b)],Scene_Base[_0x518efc(0xa41)][_0x518efc(0x41b)]=function(){const _0x105806=_0x518efc;if($gameTemp)$gameTemp[_0x105806(0x370)]();VisuMZ['CoreEngine'][_0x105806(0x78f)][_0x105806(0x30d)](this);},Bitmap['prototype'][_0x518efc(0x2ca)]=function(_0x26a1a7){const _0x46eed2=_0x518efc,_0x14c4b0=this[_0x46eed2(0x8b6)];_0x14c4b0[_0x46eed2(0x911)](),_0x14c4b0[_0x46eed2(0x737)]=this[_0x46eed2(0x7ce)]();const _0x2e881b=_0x14c4b0[_0x46eed2(0xa4f)](_0x26a1a7)[_0x46eed2(0x217)];return _0x14c4b0[_0x46eed2(0x960)](),_0x2e881b;},Window_Message['prototype'][_0x518efc(0x7c6)]=function(_0x5d925d){const _0x327d4a=_0x518efc;if(this[_0x327d4a(0x26f)]()){if(_0x327d4a(0x2b9)===_0x327d4a(0xa51)){_0x5a84fc[_0x327d4a(0x1c9)][_0x327d4a(0x436)]['call'](this);const _0x1b2915=this['_spriteset'][_0x327d4a(0x158)];if(_0x1b2915)this['addChild'](_0x1b2915);}else return this[_0x327d4a(0x3fb)][_0x327d4a(0x2ca)](_0x5d925d);}else return Window_Base[_0x327d4a(0xa41)][_0x327d4a(0x7c6)][_0x327d4a(0x30d)](this,_0x5d925d);},Window_Message[_0x518efc(0xa41)][_0x518efc(0x26f)]=function(){const _0x450d9d=_0x518efc;return VisuMZ[_0x450d9d(0x1c9)][_0x450d9d(0x54d)][_0x450d9d(0x927)][_0x450d9d(0xa65)]??!![];},VisuMZ[_0x518efc(0x1c9)]['Game_Action_numRepeats']=Game_Action[_0x518efc(0xa41)][_0x518efc(0x611)],Game_Action[_0x518efc(0xa41)]['numRepeats']=function(){const _0x49f5de=_0x518efc;return this[_0x49f5de(0x748)]()?VisuMZ[_0x49f5de(0x1c9)][_0x49f5de(0x6e0)][_0x49f5de(0x30d)](this):0x0;},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x777)]=Game_Action['prototype']['setAttack'],Game_Action[_0x518efc(0xa41)][_0x518efc(0x6e8)]=function(){const _0x498215=_0x518efc;if(this[_0x498215(0x34a)]()&&this[_0x498215(0x34a)]()['canAttack']())VisuMZ[_0x498215(0x1c9)][_0x498215(0x777)][_0x498215(0x30d)](this);else{if(_0x498215(0x783)!=='TkBgs')this[_0x498215(0x85c)]();else{const _0x9d2d4c=_0xafb6f8[_0x55950b['animationId']],_0x4d4893=this['createPointAnimationTargets'](_0x5b3358),_0x2df0c7=_0x54ef7b[_0x498215(0x9df)],_0x4bb6f1=_0x539bd4[_0x498215(0x4d0)];let _0x1a7907=this[_0x498215(0x58f)]();const _0x3347ad=this[_0x498215(0x48f)]();if(this[_0x498215(0x488)](_0x9d2d4c))for(const _0x795450 of _0x4d4893){this[_0x498215(0xa1a)]([_0x795450],_0x9d2d4c,_0x2df0c7,_0x1a7907,_0x4bb6f1),_0x1a7907+=_0x3347ad;}else this[_0x498215(0xa1a)](_0x4d4893,_0x9d2d4c,_0x2df0c7,_0x1a7907,_0x4bb6f1);}}},Sprite_Name[_0x518efc(0xa41)][_0x518efc(0x295)]=function(){return 0x24;},Sprite_Name[_0x518efc(0xa41)][_0x518efc(0x1ef)]=function(){const _0x890aaf=_0x518efc,_0xa0feba=this[_0x890aaf(0x864)](),_0x56c933=this['bitmapWidth'](),_0x3c9073=this[_0x890aaf(0x295)]();this[_0x890aaf(0x196)](),this[_0x890aaf(0x463)]['clear'](),this[_0x890aaf(0x463)][_0x890aaf(0x4ec)](_0xa0feba,0x4,0x0,_0x56c933-0xa,_0x3c9073,_0x890aaf(0x42a));},Bitmap[_0x518efc(0xa41)][_0x518efc(0x4ec)]=function(_0x3631bd,_0x5c23d5,_0x278987,_0x1b66b5,_0x1d8b1a,_0x1922fc){const _0x2eeb2e=_0x518efc,_0x327a11=this['context'],_0x4d64d9=_0x327a11[_0x2eeb2e(0x6c7)];_0x1b66b5=_0x1b66b5||0xffffffff;let _0x26449b=_0x5c23d5,_0x1a25ec=Math[_0x2eeb2e(0x38c)](_0x278987+0x18/0x2+this[_0x2eeb2e(0xa0b)]*0.35);_0x1922fc===_0x2eeb2e(0x5dc)&&(_0x26449b+=_0x1b66b5/0x2),_0x1922fc===_0x2eeb2e(0xa44)&&(_0x26449b+=_0x1b66b5),_0x327a11[_0x2eeb2e(0x911)](),_0x327a11[_0x2eeb2e(0x737)]=this['_makeFontNameText'](),_0x327a11[_0x2eeb2e(0x35b)]=_0x1922fc,_0x327a11[_0x2eeb2e(0x8b3)]=_0x2eeb2e(0x558),_0x327a11['globalAlpha']=0x1,this['_drawTextOutline'](_0x3631bd,_0x26449b,_0x1a25ec,_0x1b66b5),_0x327a11[_0x2eeb2e(0x6c7)]=_0x4d64d9,this[_0x2eeb2e(0x5b1)](_0x3631bd,_0x26449b,_0x1a25ec,_0x1b66b5),_0x327a11[_0x2eeb2e(0x960)](),this['_baseTexture'][_0x2eeb2e(0x4ba)]();},VisuMZ['CoreEngine']['BattleManager_checkSubstitute']=BattleManager[_0x518efc(0x349)],BattleManager[_0x518efc(0x349)]=function(_0x3c0d29){const _0x35c824=_0x518efc;if(this[_0x35c824(0x73d)][_0x35c824(0x368)]())return![];return VisuMZ['CoreEngine'][_0x35c824(0x20d)][_0x35c824(0x30d)](this,_0x3c0d29);},BattleManager[_0x518efc(0x7e0)]=function(){const _0x473be2=_0x518efc;if(this[_0x473be2(0x39d)])this[_0x473be2(0x279)][_0x473be2(0x7e0)](this[_0x473be2(0x39d)]);this['_phase']='turn',this[_0x473be2(0x39d)]&&this['_subject'][_0x473be2(0x6a6)]()===0x0&&(this[_0x473be2(0x9de)](this['_subject']),this[_0x473be2(0x39d)]=null);},Bitmap[_0x518efc(0xa41)][_0x518efc(0x53e)]=function(){const _0x8d5f42=_0x518efc;this[_0x8d5f42(0x857)]=new Image(),this[_0x8d5f42(0x857)]['onload']=this['_onLoad'][_0x8d5f42(0x670)](this),this[_0x8d5f42(0x857)]['onerror']=this[_0x8d5f42(0x5ff)][_0x8d5f42(0x670)](this),this['_destroyCanvas'](),this[_0x8d5f42(0x721)]='loading',Utils[_0x8d5f42(0x5a7)]()?this['_startDecrypting']():(this[_0x8d5f42(0x857)][_0x8d5f42(0x3bf)]=this[_0x8d5f42(0x660)],![]&&this[_0x8d5f42(0x857)][_0x8d5f42(0x217)]>0x0&&(this['_image'][_0x8d5f42(0x2ba)]=null,this[_0x8d5f42(0x28e)]()));},Scene_Skill[_0x518efc(0xa41)]['onActorChange']=function(){const _0xac5f8a=_0x518efc;Scene_MenuBase[_0xac5f8a(0xa41)][_0xac5f8a(0x6cf)]['call'](this),this[_0xac5f8a(0x2b7)](),this[_0xac5f8a(0x2eb)][_0xac5f8a(0x16c)](),this[_0xac5f8a(0x2eb)]['deselect'](),this[_0xac5f8a(0x4cc)][_0xac5f8a(0x715)]();},Scene_Skill['prototype']['arePageButtonsEnabled']=function(){const _0x4800d8=_0x518efc;return this[_0x4800d8(0x4cc)]&&this[_0x4800d8(0x4cc)][_0x4800d8(0x46d)];},Game_Map[_0x518efc(0xa41)]['checkPassage']=function(_0x7e26d7,_0x3b3847,_0x2cf0ea){const _0x53db9f=_0x518efc,_0x1d2de0=this[_0x53db9f(0x466)](),_0x111e16=this[_0x53db9f(0x1e1)](_0x7e26d7,_0x3b3847);for(const _0x39860c of _0x111e16){if(_0x53db9f(0x19a)==='ZSGya'){const _0x3f0931=_0x1d2de0[_0x39860c];if(_0x3f0931===undefined||_0x3f0931===null){if('eALgs'!==_0x53db9f(0x96f)){if($gameTemp['isPlaytest']()&&!DataManager[_0x53db9f(0x882)]()){if(_0x53db9f(0x302)!==_0x53db9f(0x9c4)){let _0x306c60=_0x53db9f(0x3b8)+'\x0a';_0x306c60+=_0x53db9f(0x6e9)+'\x0a',_0x306c60+=_0x53db9f(0x5e5),this['showIncompleteTilesetError']()?(alert(_0x306c60),SceneManager[_0x53db9f(0x80f)]()):(console[_0x53db9f(0x772)](_0x306c60),!$gameTemp['_showDevTools']&&($gameTemp[_0x53db9f(0x9f5)]=!![],SceneManager[_0x53db9f(0x3b4)]()));}else this[_0x53db9f(0x9b8)]-=_0x29c908['floor']((_0x2aece2['width']-_0xe3dd95['boxWidth'])/0x2);}}else{if(!this[_0x53db9f(0x421)]())return;if(this[_0x53db9f(0x84f)]||this[_0x53db9f(0x48a)])return;this[_0x53db9f(0x405)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x53db9f(0x84f)]=new _0x43bbda(),this[_0x53db9f(0x48a)]=new _0x16e3f3(),this[_0x53db9f(0x1f4)](this['_scrollBarHorz']),this[_0x53db9f(0x1f4)](this['_scrollBarVert']);}}if((_0x3f0931&0x10)!==0x0)continue;if((_0x3f0931&_0x2cf0ea)===0x0)return!![];if((_0x3f0931&_0x2cf0ea)===_0x2cf0ea)return _0x53db9f(0x4ad)==='qdONz'?![]:_0x210831;}else return _0x15c5f8[_0x53db9f(0x1c9)][_0x53db9f(0x8b1)][_0x53db9f(0x30d)](this,_0xa09888);}return![];},Game_Map[_0x518efc(0xa41)]['showIncompleteTilesetError']=function(){const _0x3bfd89=_0x518efc;if(Imported['VisuMZ_3_EventChainReact'])return!![];if(Imported[_0x3bfd89(0x346)])return!![];return![];},Sprite_Animation[_0x518efc(0xa41)][_0x518efc(0x23a)]=function(_0x188ea9){const _0x237616=_0x518efc;!this[_0x237616(0x8bb)]&&(this[_0x237616(0x8bb)]=_0x188ea9['gl'][_0x237616(0x6e5)](_0x188ea9['gl']['VIEWPORT']));},VisuMZ[_0x518efc(0x1c9)][_0x518efc(0x80d)]=Scene_Map[_0x518efc(0xa41)][_0x518efc(0x81e)],Scene_Map['prototype'][_0x518efc(0x81e)]=function(){const _0x4a8fe7=_0x518efc,_0x295b61=SceneManager[_0x4a8fe7(0x4e9)][_0x4a8fe7(0x864)];if([_0x4a8fe7(0x2f1),_0x4a8fe7(0x1f7),'Scene_TitleTransition',_0x4a8fe7(0x7d7)][_0x4a8fe7(0x1f5)](_0x295b61)){if('uRubu'!==_0x4a8fe7(0x741)){if(_0x24ca69)this[_0x4a8fe7(0x216)](_0x59c789);_0x19fe1b[_0x4a8fe7(0x1c9)][_0x4a8fe7(0x1f6)][_0x4a8fe7(0x30d)](this,_0x523faa);}else return![];}return VisuMZ['CoreEngine'][_0x4a8fe7(0x80d)][_0x4a8fe7(0x30d)](this);};function _0x3e86(){const _0x4198bb=['dUJZw','drawGameSubtitle','UMipP','Sprite_Animation_processSoundTimings','_actor','_stored_mpGaugeColor1','gainItem','cursorPagedown','scaleMode','consumeItem','LVwjU','ZsnLc','setupBattleTestItems','Window_Base_update','BarThickness','checkCoreEngineDisplayCenter','_inputSpecialKeyCode','ParamName','TextPopupShow','ShowDevTools','Game_Picture_scaleX','processTouch','findSymbol','drawGoldItemStyle','innerHeight','Linear','OUTEXPO','rdDtS','numberWindowRect','pRkPa','Game_Map_scrollRight','_addShadow','TranslucentOpacity','AGI','737515XlKWZL','APFXv','Game_Character_processMoveCommand','SCROLL_LOCK','lastAnimationSprite','Window','IvToL','save','updateClose','DigitGroupingStandardText','MAXMP','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','nah','Scene_GameEnd_createBackground','\x5c}❪SHIFT❫\x5c{','makeDeepCopy','updateSmoothScroll','Game_Action_itemHit','OPEN_BRACKET','shift','\x5c}❪TAB❫\x5c{','_smooth','maxLvGaugeColor1','INOUTBOUNCE','setSideButtonLayout','param','operand','CkYjN','mruUE','QoL','ColorTPGauge1','vert','setActorHomeRepositioned','Finish','itemBackColor1','clearZoom','_maxDigits','_stored_mpCostColor','isAnimationPlaying','expGaugeColor1','NVaEw','getInputMultiButtonStrings','ALTGR','Scene_Base_create','RegExp','_origin','setLastGamepadUsed','Spriteset_Base_updatePosition','pendingColor','ExportStrFromAllTroops','SkillTypeBgType','bodyColor','windowPadding','_windowLayer','reduce','quit','Location','ENTER','CommandBgType','BDLXj','checkCacheKey','FINAL','buttonAssistKey%1','_cancelButton','createDigits','ExportStrFromAllMaps','Plus2','createTroopNote','_upArrowSprite','hSyik','forceOutOfPlaytest','removeFauxAnimation','FJBkc','VariableJsBlock','isSpecialCode','PictureEraseRange','Pixelated','playLoad','ShiftT_Toggle','VnvnW','RevertPreserveNumbers','_stored_powerDownColor','createScrollBarSprites','VsGVy','platform','maxVisibleItems','restore','CatXz','playOk','Game_Interpreter_command111','updateMove','sparamFlatBonus','hit','_animationSprites','PGUP','Game_Picture_move','drawGameTitle','<JS\x20%1\x20%2:[\x20](.*)>','qgTwn','_cacheScaleY','(\x5cd+)([%％])>','UiWEi','JUNJA','_pictureContainer','ceil','EnableNameInput','isMaxLevel','buttonAssistOffset3','getInputButtonString','Flat2','Armor-%1-%2','MDVWq','_targetOffsetX','ATK','Scene_Title_drawGameTitle','ColorExpGauge1','keyMapper','pan','Gold','itemHitImprovedAccuracy','applyEasingAnglePlus','XAeuL','Input_update','retrieveFauxAnimation','isKeyItem','updatePositionCoreEngineShakeOriginal','Spriteset_Base_initialize','PositionX','enabled','IconSParam0','RmaPs','indexOf','_backgroundFilter','nextLevelExp','goto','system','IconSParam8','blockWidth','SETTINGS','_movementWholeDuration','setFrame','windowOpacity','VsgjA','PDR','GoldIcon','mwcuA','endAnimation','CategoryBgType','skills','_clickHandler','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','startNormalGame','blt','initCoreEngineScreenShake','ceLvh','createEnemies','BACK_QUOTE','FYOaw','TRG','_statusEquipWindow','F20','NUMPAD6','_stored_expGaugeColor1','isMVAnimation','_baseSprite','enemy','updateEffekseer','createMenuButton','Window_StatusBase_drawActorSimpleStatus','Sprite_AnimationMV_processTimingData','_stored_pendingColor','GREATER_THAN','registerCommand','ShiftR_Toggle','_screenX','Window_NameInput_cursorUp','_pointAnimationQueue','DigitGroupingExText','5981705VCJrlK','bYqgd','isUseModernControls','optSideView','ButtonHeight','ONE_MINUS_SRC_ALPHA','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','TextStr','dOqwT','BarOffset','isPointAnimationPlaying','NUMPAD3','$dataMap','WIN_OEM_FJ_MASSHOU','evaluate','itemSuccessRate','targetBackOpacity','cxlGi','GoldBgType','CustomParamType','PositionY','maxCols','ItemBackColor2','ColorGaugeBack','jWToh','lfljl','Game_Map_scrollUp','setTargetAnchor','Padding','Name','RightMenus','rgba(0,\x200,\x200,\x200.7)','renderNoMask','updatePictureAntiZoom','endBattlerActions','mirror','isGamepadTriggered','Scene_Map_updateScene','ColorExpGauge2','reservePlayTestNewGameCommonEvent','gzgbD','StatusEquipRect','paramFlat','DummyRect','clearCachedKeys','faceHeight','createChildSprite','requestFauxAnimation','CgRuc','updateOnceParallelInterpreters','moveMenuButtonSideButtonLayout','setBattleSystem','makeFontBigger','setMute','ByNBv','adjustPictureAntiZoom','targetY','_showDevTools','initBasic','_offsetY','clone','getButtonAssistLocation','_stored_maxLvGaugeColor1','buttonAssistOffset4','snapForBackground','_closing','xDZNz','AllTroops','down2','aSIiE','home','_pointAnimationSprites','moveCancelButtonSideButtonLayout','NUMPAD9','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','pictureButtons','learnings','RPZtU','IsHMN','fontSize','_textQueue','Game_Actor_levelUp','UaVIg','applyCoreEasing','paramchangeTextColor','Scene_Map_update','xNZJG','isInstanceOfSceneMap','image-rendering','isAnimationOffsetXMirrored','coreEngineRepositionEnemies','skillTypeWindowRect','writeFile','WIN_OEM_PA3','createPointAnimationSprite','VisuMZ_1_OptionsCore','updateDashToggle','_dummyWindow','IconSParam1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setMainFontSize','_downArrowSprite','wholeDuration','Game_Picture_x','Scene_Equip_create','responseText','outlineColorGauge','Sprite_AnimationMV_updatePosition','RowSpacing','adjustBoxSize','StatusEquipBgType','currentExp','nKvjS','processKeyboardHome','playCursor','TextCodeClassNames','VIEWPORT','pop','expRate','catchLoadError','JNWTo','_fauxAnimationQueue','BTestArmors','filterArea','mxCtr','cancel','ConvertNumberToString','tilesets','IconSParam3','elrMZ','retrievePointAnimation','xparamFlat2','_fauxAnimationSprites','prototype','BattleSystem','Game_Screen_initialize','right','dimColor2','obEBx','RepositionActors','list','currencyUnit','〘Show\x20Text〙\x0a','isClosing','QSXni','updateBgsParameters','initDigitGrouping','measureText','XNMBb','xzPHJ','isRepeated','GetParamIcon','dXNJz','loadTitle2','VOLUME_MUTE','text%1','_hp','innerWidth','createCommandWindow','setMoveEasingType','LINEAR','advanced','processFauxAnimationRequests','isExpGaugeDrawn','process_VisuMZ_CoreEngine_RegExp','ParseClassNotetags','_centerCameraCheck','EscapeAlways','consumable','FontWidthFix','qZEsa','isCancelled','needsUpdate','gDfUl','WindowLayer_render','defaultInputMode','Scene_Skill_create','WjYTv','members','allowShiftScrolling','NhyDS','ColorMaxLvGauge2','Scene_Battle_update','target','_realScale','updateOrigin','updateScrollBarPosition','rtOaW','_movementDuration','tab','vtsxq','eWeaF','refreshScrollBarBitmap','END','up2','DuyUL','Total','ShowScrollBar','IconXParam7','FUNC','PAUSE','Game_System_initialize','JWCdA','hCmBm','_timerSprite','processTouchModernControls','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','createSpriteset','Window_refreshBack','IconSParam5','INELASTIC','uYsZj','ppKsF','drawText','PIPE','ADD','requestMotion','Nuqto','child_process','MAXHP','mxgXA','onInputBannedWords','bzSpR','cursorLeft','deactivate','updateMain','_height','isSmartEventCollisionOn','Window_Selectable_itemRect','paramRate1','tXHCi','BTestItems','makeDocumentTitle','ItemRect','drawActorLevel','isPressed','updatePlayTestF7','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Scene_MenuBase_createPageButtons','TitleCommandList','_storedStack','SGoCY','isSceneMap','META','replace','COLON','WIN_OEM_ENLW','getCombinedScrollingText','Duration','createCustomParameter','pictures','initCoreEngine','getCustomBackgroundSettings','_isWindow','usableSkills','IconParam4','_scene','length','Y:\x20%1','AMwyu','changeTextColor','isLoopVertical','isOpen','addOnceParallelInterpreter','Wait','ulLbO','setupFont','updateOpacity','ETB','bVfpj','ZSGya','JIstx','PictureEasingType','setBackgroundType','pitch','Game_Party_consumeItem','XLzpj','Sprite_Button_initialize','kdqgb','scrollX','ARRAYJSON','addCommand','JkoxN','isNumpadPressed','QUOTE','QiUBm','clearForcedGameTroopSettingsCoreEngine','Window_NumberInput_start','mainFontSize','isOpening','Bitmap_measureTextWidth','mpColor','myIhT','_balloonQueue','framesMin','showFauxAnimations','Spriteset_Base_isAnimationPlaying','ExportAllTroopText','isDying','ModernControls','padding','Version','XParamVocab4','cursorUp','ParamChange','GroupDigits','processKeyboardDigitChange','LvExpGauge','Window_Base_initialize','PRINTSCREEN','SEMICOLON','waiting','Game_Picture_scaleY','_registerKeyInput','_pollGamepads','isOpenAndActive','BannedWords','CoreEngine','RequireFocus','WWOEr','erasePicture','filter','NUMPAD1','ColorTPCost','startMove','Key%1','setClickHandler','Power','dummyWindowRect','resetBattleSystem','canEquip','gkdyL','keyboard','deselect','ConvertParams','Game_Picture_calcEasing','Window_NumberInput_processDigitChange','playOnceParallelInterpreter','DetachBattlePictureContainer','title','IconXParam5','allTiles','OUTCUBIC','terms','_scaleY','YwuzR','initCoreEasing','removeAnimationFromContainer','JZwmw','popScene','SubfolderParse','MainMenu','isEventRunning','_mirror','_lastOrigin','redraw','_slotWindow','fnQkA','AntiZoomPictures','buttonAssistOffset%1','addChild','includes','SceneManager_onKeyDown','Scene_Load','isMapScrollLinked','IconParam3','toUpperCase','SaveMenu','ItemPadding','iconHeight','BlurStrength','iNWBB','mpCostColor','atbActive','Input_onKeyDown','initRotationCoreEngine','buttonAssistText2','evaded','onerror','Spriteset_Base_destroy','Smooth','crisisColor','PTGTO','centerX','DimColor2','BattleManager_checkSubstitute','application/json','xparamPlus1','buttonAssistKey3','processPointAnimationRequests','isTouchedInsideFrame','setActionState','BKSP','levelUp','onKeyDownKeysF6F7','width','fwVba','buttonAssistOffset5','VisuMZ_2_BattleSystemCTB','maxTurns','_onKeyDown','qodsw','AnimationID','6306uamVhS','gameTitle','Symbol','drawBackgroundRect','_optionsWindow','Param','ExtDisplayedParams','XMosO','StatusParamsRect','lfymV','SLASH','loadTitle1','ypIkp','getLastUsedGamepadType','maxItems','clamp','axes','addAnimationSpriteToContainer','Exported_Script_%1.txt','hide','AFRGM','destroyed','updateDocumentTitle','updateShadow','qLnkt','NEAREST','KeyUnlisted','saveViewport','_coreEasingType','battleSystem','processDigitChange','OptionsBgType','_sellWindow','mbrnJ','Window_Base_destroyContents','systemColor','F10','_number','%1〘Choice\x20%2〙\x20%3%1','code','HelpBgType','DETACH_PICTURE_CONTAINER','WNzdW','titleCommandWindow','ScaleX','statusWindowRect','IconParam1','GET','Enable','AudioChangeBgmPan','updatePointAnimations','_backSprite2','min','escape','xparamPlus','isMagical','XParamVocab0','hpColor','Window_Base_createTextState','initVisuMZCoreEngine','easingType','setColorTone','cancelShowButton','updateScene','floor','Lpmed','select','faces','INCIRC','targetScaleY','EquipMenu','data/','OpenConsole','buttonAssistWindowButtonRect','zhtUd','Window_Base_drawIcon','EISU','_cacheScaleX','OffBarColor','Input_clear','useFontWidthFix','VisuMZ_2_BattleSystemPTB','WIN_OEM_RESET','sparamRate','ScreenShake','DataManager_setupNewGame','OptionsMenu','NumberBgType','pageup','qcZfi','_logWindow','ActorMPColor','FGzrc','CONVERT','_inputWindow','drawIconBySize','buttonAssistText4','itemPadding','XParamVocab5','mainAreaTopSideButtonLayout','blendFunc','lSkdP','setWindowPadding','Flat1','showPicture','_stored_tpGaugeColor1','Renderer','eJeYU','_buttonAssistWindow','AllMaps','onNameOk','_onLoad','drawParamText','substring','paramWidth','EXSEL','DisplayedParams','NewGameCommonEvent','bitmapHeight','SdjYd','checkScrollBarBitmap','shake','RRugg','ZRdkq','processSoundTimings','TextCodeNicknames','Game_Map_scrollDown','SystemLoadAudio','show','apuXh','isGamepadAxisMoved','STRUCT','NtLDL','originalJS','isMenuButtonAssistEnabled','NBMyO','processEscape','overallHeight','operation','ExtractStrFromList','padZero','_commandList','enemies','titles2','createJsQuickFunction','iUETj','makeInputButtonString','playTestF7','isBusy','Scene_Name_create','VPlWR','IconSet','refreshActor','Scene_Status_create','jORTR','onload','process_VisuMZ_CoreEngine_CustomParameters','_paramPlus','IKFCC','damageColor','Window_Base_drawCharacter','getLevel','_internalTextures','_buttonType','jHSAN','eOBxI','SPACE','CTRL','_inputString','Game_Picture_show','DisplayLockX','measureTextWidthNoRounding','backgroundBitmap','isBottomButtonMode','LUK','buttonAssistKey5','REPLACE','createContents','catchUnknownError','_pictureCoordinatesMode','rcRXP','_digitGrouping','FTB','sparamPlusJS','processTimingData','F16','Scene_Unlisted','buyWindowRect','maxVert','ENOlo','ParseStateNotetags','iconWidth','itemRect','_screenY','XParamVocab3','JNywJ','_animationQueue','kqdvU','isActor','_CoreEngineSettings','YuUKG','FuZoi','KEEP','EQUAL','_itemWindow','Game_BattlerBase_refresh','_stored_tpGaugeColor2','ButtonFadeSpeed','bgsVolume','updateKeyText','Scene_Title','AudioChangeBgsVolume','setSideView','10157HlBqCj','destroyScrollBarBitmaps','SideView','loadMapData','traitObjects','gNycr','powerUpColor','contains','mpGaugeColor1','onXhrError','textHeight','cVuuB','INQUAD','VisuMZ_2_BattleSystemFTB','Awfvl','autoRemovalTiming','ORLiX','_drawTextShadow','asin','NewGameBoot','fillStyle','Actor','img/%1/','ADfKp','framebuffer','call','Njyna','oAEzl','vogCn','setValue','》Comment《\x0a%1\x0a','MDR','duration','StartID','maxLvGaugeColor2','updatePictureCoordinates','_commandWindow','Center','status','paramMaxJS','AnimationPoint','SceneManager_isGameActive','ImprovedAccuracySystem','gWBbP','createPointAnimationQueue','isActiveTpb','XParamVocab6','keyRepeatWait','powerDownColor','AnimationMirrorOffset','version','_centerElementCoreEngine','encounterStep','commandWindowRect','Show\x20Scrolling\x20Text\x20Script\x20Error','CLOSE_CURLY_BRACKET','fGsOB','KeyboardInput','_onKeyPress','Chance','urdpT','touchUI','mapId','value','XParamVocab7','REC','loadSystem','dropItems','CEV','CancelText','smooth','GoldRect','_statusParamsWindow','toString','ProfileBgType','original','setTopRow','_bgsBuffer','StatusBgType','DetachMapPictureContainer','HIT','valueOutlineWidth','VisuMZ_4_UniqueTileEffects','processCursorHomeEndTrigger','_helpWindow','checkSubstitute','subject','displayName','KWIZM','AdjustAngle','contentsOpacity','overrideMimeType','processAlwaysEscape','getBackgroundOpacity','evxQx','vHrnS','F15','type','PreserveNumbers','_stored_normalColor','skillId','ZERO','Bitmap_resize','textAlign','offOpacity','cmyhQ','EndingID','AccuracyBoost','sparamRateJS','AvgEA','_baseTexture','bgmVolume','index','mmp','createDimmerSprite','meVolume','isForFriend','ControllerButtons','QBmrm','PixelateImageRendering','_forcedBattleGridSystem','isBottomHelpMode','DebugConsoleLastControllerID','LevelUpFullMp','sceneTerminationClearEffects','Game_Event_isCollidedWithEvents','OS_KEY','currentLevelExp','PdIrR','OJHYq','xparam','helpWindowRect','getGamepads','reserveNewGameCommonEvent','ACCEPT','Khrvu','_list','_muteSound','GoldMax','TCR','JSON','Window_Base_createContents','isFauxAnimationPlaying','CommandList','itypeId','exec','_stored_crisisColor','initialLevel','ddkJe','dxKfs','createTextPopupWindow','EXECUTE','round','onClick','UpdatePictureCoordinates','Zzxrm','CLEAR','getControllerInputButtonMatch','F11','_tilemap','Scene_Map_createSpriteset_detach','qLkYi','_opacity','WIN_OEM_WSCTRL','_shouldPreventDefault','_stored_powerUpColor','normalColor','_digitGroupingEx','187BWYnqM','_subject','iRdKj','BvxFw','ActorHPColor','gainGold','toFixed','_customModified','_coreEngineShakeStyle','Scene_Map_updateMainMultiply','_pagedownButton','process_VisuMZ_CoreEngine_Settings','match','result','ctGaugeColor1','AMKZn','remove','createFauxAnimation','storeMapData','ColorTPGauge2','option','getLastPluginCommandInterpreter','setupCoreEasing','Color','showDevTools','ASDDA','process_VisuMZ_CoreEngine_jsQuickFunctions','Rate2','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','xdg-open','ASTERISK','VisuMZ_2_BattleSystemETB','resize','_anglePlus','AhmtI','src','createPageButtons','smoothSelect','oTnBn','CRI','CxRjo','lHVaU','_blank','INOUTQUINT','isSideButtonLayout','thickness','updateData','Game_Picture_y','toLocaleString','Window_EquipItem_isEnabled','STENCIL_BUFFER_BIT','boxWidth','gJXpM','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','woeQC','eAOog','buttonAssistCancel','subjectHitRate','GHDRi','setupNewGame','concat','stop','loadPicture','_lastY','updateCoreEasing','ColorManager_loadWindowskin','isCursorMovable','DigitGroupingLocale','CLOSE_PAREN','RFWbP','Graphics_printError','LTOjn','_shakePower','centerCameraCheckData','setAction','ApplyEasing','IconXParam9','KeyItemProtect','setGuard','viewport','isEnabled','processKeyboardDelete','drawFace','eva','ExportCurMapText','sparamFlatJS','itemBackColor2','startAutoNewGame','inbounce','DEF','areButtonsOutsideMainUI','bkfvl','disable','StatusRect','MpHFg','contents','defineProperty','LoadMenu','WASD','PERIOD','deathColor','_isButtonHidden','wLaLM','Plus','Bitmap_drawText','_lastScrollBarValues','ShowItemBackground','BgFilename1','_bgmBuffer','moveRelativeToResolutionChange','fSUnL','ColorMaxLvGauge1','VisuMZ_2_BattleSystemOTB','_statusWindow','stretch','command105','PcdBI','ColorHPGauge1','_onceParallelInterpreters','ARRAYNUM','CorrectSkinBleeding','framesPerChar','mOopM','PHfRO','Map%1.json','_playTestFastMode','ONE','terminate','_windowskin','_texture','updateCurrentEvent','targetObjects','_scrollDuration','isScrollBarVisible','BACKSPACE','BlurFilter','MULTIPLY','characters','writeText','paramFlatBonus','ParamArrow','removeOnceParallelInterpreter','left','INBOUNCE','OffBarOpacity','RhpTt','key%1','SjQnI','Class-%1-%2','Opacity','drawValue','ALT','PBdKA','_mainSprite','Scene_Map_createSpritesetFix','ParseAllNotetags','NUMPAD2','_bitmap','Manual','_targetScaleY','RIGHT','CIRCUMFLEX','sparamPlus1','FqiTt','_menuButton','AvuGk','mebtK','SmartEventCollisionPriority','ExtractStrFromMap','trim','KOUTN','ParseSkillNotetags','PERCENT','alwaysDash','focus','KeyTAB','SCROLLBAR','SJoAB','isSceneBattle','Window_Base_drawText','horzJS','dashToggle','useDigitGrouping','(\x5cd+\x5c.?\x5cd+)>','actor','outlineColor','3371204Zvcaco','encounterStepsMinimum','yRfKC','colSpacing','AjBBi','_encounterCount','BarBodyColor','DlqjI','ValueJS','random','Flat','_hovered','buttonAssistText%1','bitmap','Scene_MenuBase_helpAreaTop','AutoStretch','tilesetFlags','pictureId','drawParamName','animations','OBCVy','ARRAYSTR','isCollidedWithEvents','active','params','useDigitGroupingEx','offsetY','DurationPerChat','geZui','sv_enemies','_displayY','drawCharacter','irBqv','loadIconBitmap','UNDERSCORE','_isPlaytest','exp','drawCurrencyValue','xparamFlatJS','ColorMPGauge1','calcEasing','URL','_battleField','VwSjd','processKeyboardEnd','OLOPp','STB','Input_shouldPreventDefault','drawAllParams','removeAllFauxAnimations','isAnimationForEach','en-US','_scrollBarVert','CommandRect','_buyWindow','Troop%1','_pauseSignSprite','animationNextDelay','sparamRate1','gYYQa','DhWJj','subtitle','isClosed','F17','GoldOverlap','vqEJS','%1%2','Game_Interpreter_command122','ExtJS','XXftq','PJsFn','Scene_MenuBase_mainAreaHeight','isSideView','setCoreEngineScreenShakeStyle','_profileWindow','_repositioned','_stored_hpGaugeColor2','bitmapWidth','randomJS','exportAllTroopStrings','exrXu','_shakeDuration','KrCkE','CANCEL','ProfileRect','randomInt','selectLast','qdONz','bkhkG','_pressed','INOUTCUBIC','QFlkX','parallaxes','Window_TitleCommand_selectLast','Scene_Base_terminate','ListRect','ScreenResolution','pagedownShowButton','PRESERVCONVERSION(%1)','sXFjS','update','WIN_OEM_CUSEL','_stored_tpCostColor','get','ExportCurTroopText','processKeyboardBackspace','reserveCommonEvent','Basic','makeActionList','iHBFr','buttonAssistWindowSideRect','windowRect','sIJKG','_currentMap','zoomScale','IconSParam7','\x20Origin:\x20%1','_pageupButton','_skillTypeWindow','process_VisuMZ_CoreEngine_ControllerButtons','_drawTextOutline','jtCFg','mute','BPVrz','IconIndex','OUTQUINT','DigitGroupingDamageSprites','framesMax','DELETE','Input_pollGamepads','getControllerInputButtonString','start','resetFontSettings','GameEnd','requestPointAnimation','App','OjULn','RfkCO','playTestShiftR','sin','updatePictureSettings','QUESTION_MARK','helpAreaTopSideButtonLayout','charAt','battlerHue','aAeqS','OkText','_previousClass','Enemy','xfGyB','drawTextTopAligned','parse','Window_NameInput_cursorPageup','_shakeSpeed','down','xparamRate1','_duration','xparamRateJS','_tempActor','INOUTQUART','battlebacks1','updateRotation','equips','isLoopHorizontal','DamageColor','EditBgType','BTB','close','SwitchToggleRange','MRF','setup','createTitleButtons','rightArrowWidth','openURL','CategoryRect','OutlineColorDmg','CustomParamAbb','CustomParamNames','strokeRect','LEegY','ColorHPGauge2','pagedown','AudioChangeBgsPitch','VyLdW','lGhBo','ItemBackColor1','itemLineRect','Abbreviation','gold','jsonToZip','setEvent','runCombinedScrollingTextAsCode','buttonAssistKey4','Xetxy','onInputOk','drawGameVersion','_animation','MaxDuration','SlotRect','calcCoreEasing','XdEwh','scaleY','CQlMw','Window_Gold_refresh','Window_Selectable_processCursorMove','openness','helpAreaTop','sparamFlat2','buttons','Rate1','TextManager_param','_spriteset','gnjqf','map','retreat','X:\x20%1','gaugeBackColor','doesNameContainBannedWords','sellWindowRect','CodeJS','repositionCancelButtonSideButtonLayout','playTestShiftT','sparam','twlkl','IconXParam1','InputRect','stencilOp','Scene_Boot_startNormalGame','SystemSetBattleSystem','QipJu','ihlCo','Layer','_startLoading','\x0a\x0a\x0a\x0a\x0a','DATABASE','VisuMZ_2_BattleSystemBTB','WIN_OEM_COPY','ItemStyle','applyEasing','tpGaugeColor1','scrollY','ParseItemNotetags','repositionEnemiesByResolution','DrawItemBackgroundJS','removeChild','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','Title','Settings','HelpRect','3473181NFgoFT','exportAllMapStrings','Scene_Battle_createSpriteset','Game_Event_start','INCUBIC','parameters','createCustomBackgroundImages','maxScrollX','_editWindow','alphabetic','tpCostColor','refreshWithTextCodeSupport','INOUTEXPO','max','offsetX','initialize','reOQs','onButtonImageLoad','pointY','isGamepadButtonPressed','ParamMax','itemWindowRect','Item-%1-%2','VisuMZ_2_BattleSystemSTB','command357','drawActorExpGauge','Tilemap_addShadow','paramMax','fillRect','_context','Lvcym','updatePosition','TargetAngle','SHIFT','setEnemyAction','isItemStyle','SwitchToggleOne','paramBase','wait','avqIZ','processBack','EXCLAMATION','cgPDX','OptionsRect','wCdqd','_troopId','updateText','Scene_Map_createSpriteset','isRightInputMode','Scene_Boot_loadSystemImages','_index','HbkkP','ctrl','PictureFilename','Window_Selectable_processTouch','lKMRF','layoutSettings','processCursorMove','updateMainMultiply','createBuffer','createTextState','iMiSV','_pictureName','scaleX','animationBaseDelay','darwin','getPointAnimationLayer','default','number','maxGold','WIN_OEM_PA2','visible','addQueue','successRate','sparamFlat1','valueOutlineColor','CCHda','SParamVocab6','Game_Action_updateLastTarget','BGxGO','drawRightArrow','Scene_MenuBase_createCancelButton','xojww','paramName','wNPzQ','backOpacity','OUTBACK','_allTextHeight','hasEncryptedImages','playCancel','Game_Picture_initBasic','WTeEc','IllMC','xparamRate','NewGameCommonEventAll','_cache','3HSnjZL','_clientArea','_drawTextBody','Sprite_Picture_loadBitmap','SDJjx','bgs','refresh','win32','_setupEventHandlers','stypeId','_lastCommandSymbol','drawBackground','PositionJS','targetPosition','1.4.4','xxmgM','boxHeight','SCALE_MODES','enWyT','eSoLi','_createInternalTextures','OzsoP','isHandled','hSDYD','command111','ENTER_SPECIAL','ParseTilesetNotetags','helpAreaBottom','State-%1-%2','Bitmap_drawTextOutline','GRD','_updateFilterArea','setupCustomRateCoreEngine','ColorCTGauge2','expParams','outbounce','checkSmartEventCollision','BuyRect','Window_Scrollable_update','drawNewParam','LevelUpFullHp','printError','ESC','animationShouldMirror','scrollDown','center','Game_Actor_changeClass','integer','EXR','qONxk','VOLUME_UP','DjUsU','Spriteset_Base_update','PTB','and\x20add\x20it\x20onto\x20this\x20one.','9787504sZJTdU','MIN_SAFE_INTEGER','Game_Action_itemEva','children','_destroyInternalTextures','Graphics_centerElement','ImgLoad','ActorRect','_forcedTroopView','updatePositionCoreEngineShakeVert','ZGldA','Window_MapName_refresh','process_VisuMZ_CoreEngine_Notetags','_stored_ctGaugeColor2','createBackground','backspace','ZOOM','Graphics','hpGaugeColor1','_coreEasing','updateAnchor','animationId','RdIJX','_data','makeTargetSprites','_onError','performMiss','SParamVocab9','updateAnglePlus','WIN_OEM_AUTO','maxScrollbar','destroy','MCR','Window_NameInput_refresh','BTestAddedQuantity','push','constructor','paramBaseAboveLevel99','VitWf','BWTeL','Scene_Map_initialize','PLAY','TextJS','numRepeats','SELECT','description','onDatabaseLoaded','DJAvf','setupButtonImage','hpGaugeColor2','Yorvr','IconSParam9','Bitmap_fillRect','TBmyb','scrollUp','IconParam2','Sprite_Picture_updateOrigin','BattleManager_update','_pictureCoordinatesWindow','MDF','height','_target','Graphics_defaultStretchMode','JzrLS','DIVIDE','GShKL','offColor','getColorDataFromPluginParameters','ORSPz','resetTextColor','HANJA','Game_Actor_paramBase','xparamRate2','playTestF6','RHdFR','ParseArmorNotetags','onlyfilename','Game_Interpreter_updateWaitMode','PictureCoordinatesMode','pHgQh','RPGMAKER_VERSION','initialBattleSystem','JIJYx','Sprite_Gauge_gaugeRate','Window_NameInput_cursorDown','createKeyJS','HRG','_moveEasingType','drawCurrentParam','picture','Game_Troop_setup','yScrollLinkedOffset','Keyboard','profileWindowRect','Window_Selectable_cursorUp','Window_NameInput_initialize','pressed','baseTextRect','areTileShadowsHidden','cursorRight','buttonAssistKey2','drawIcon','worldTransform','rmsIl','drawItem','IconParam5','Window_NameInput_processHandling','scrollRight','hideButtonFromView','_currentBgs','OUTQUART','RepositionEnemies','WleVz','OTB','paramY','currentValue','F6key','Game_Picture_updateRotation','style','BgType','charCode','font-smooth','_url','Game_Picture_initRotation','2bSgYgS','DOLLAR','PA1','cjklm','BottomButtons','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','_refreshArrows','lineHeight','pos','pages','drawCircle','WIN_OEM_JUMP','〘Common\x20Event\x20%1:\x20%2〙\x20Start','levelUpRecovery','bind','EditRect','PrvoI','maxLevel','【%1】\x0a','%1〘End\x20Choice\x20Selection〙%1','uiAreaWidth','ujBug','TitlePicButtons','DocumentTitleFmt','movePageButtonSideButtonLayout','isArrowPressed','open','format','SlotBgType','QUPWZ','drawActorNickname','join','createFauxAnimationQueue','1.3.0','ICvRP','createPointAnimation','setCommonEvent','mainAreaHeight','background','ROncj','BasicParameterFormula','MenuLayout','eqxPu','deNfp','mTPUA','〘Common\x20Event\x20%1:\x20%2〙\x20End','HuHXT','Control\x20Variables\x20Script\x20Error','oBuTe','current','OutlineColorGauge','enter','%1/','Skill-%1-%2','WIN_OEM_FINISH','note','command355','lpKYT','updateDuration','CNT','SParamVocab3','_playtestF7Looping','ExportString','_defaultStretchMode','Game_Picture_updateMove','MLMGV','INSERT','Untitled','numActions','measureTextWidth','isWindowMaskingEnabled','INOUTCIRC','_rate','leRWB','xqAfJ','WeCzW','initMembers','Max','smallParamFontSize','SellRect','normal','initRotation','textColor','Spriteset_Battle_createEnemies','DefaultMode','drawGauge','NUM_LOCK','displayY','tileWidth','Scene_Map_updateMain','xwiWF','Subtitle','CallHandlerJS','nCiGM','apply','pQEne','dTgDb','baseId','INOUTELASTIC','Game_Map_setDisplayPos','StatusParamsBgType','globalAlpha','ItemBgType','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Upper\x20Left','iDmWA','_stored_gaugeBackColor','%1:\x20Exit\x20','xparamPlus2','onActorChange','_anchor','processKeyboardHandling','addWindow','erQta','Origin','EPSvc','QwertyLayout','origin','DimColor1','catchException','WIN_OEM_BACKTAB','XParamVocab8','INOUTQUAD','filters','Game_Map_setup','VisuMZ_1_BattleCore','Game_Action_numRepeats','angle','NUM','LineHeight','targetOpacity','getParameter','NUMPAD8','ControllerMatches','setAttack','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','categoryWindowRect','evade','HtHED','createCancelButton','QvsUE','_updateGamepadState','move','playBuzzer','MEV','COMMA','uUlun','NroGc','Game_BattlerBase_initMembers','buttonY','drawActorSimpleStatus','tDdOr','uCvIu','overallWidth','_battlerName','Scene_Item_create','PageChange','yqVqu','paramRate2','updateWaitMode','isTriggered','SwitchRandomizeRange','SParamVocab4','sqrt','statusParamsWindowRect','changeClass','ZNntd','mfzev','mhp','RNoww','GoldFontSize','repeat','CTB','LATIN1','EnableNumberInput','seek','Mute','playMiss','bgm','activate','getColor','RJQLl','ZFyza','Puypy','_lastGamepad','_lastPluginCommandInterpreter','OUTQUAD','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','listWindowRect','Scene_Name_onInputOk','_opening','_loadingState','_displayX','vXdYv','ColorPowerDown','clearRect','EVA','SParamVocab7','pointX','uiAreaHeight','lccLw','SystemLoadImages','buttonAreaHeight','targetEvaRate','forceStencil','PLUS','_dimmerSprite','XParamVocab2','setDisplayPos','_categoryWindow','EVAL','targetX','commandWindowRows','font','scrollLeft','position','WIN_OEM_CLEAR','mainAreaTop','Window_ShopSell_isEnabled','_action','Window_Selectable_cursorDown','FontShadows','button','uRubu','scrollbar','tpUWg','volume','CAPSLOCK','PRINT','MultiKeyFmt','item','IDs','Window_NameInput_cursorRight','loadBitmap','CustomParamIcons','Bitmap_strokeRect','BACK_SLASH','buttonAssistWindowRect','Actor-%1-%2','Scene_Options_create','SplitEscape','Plus1','setBackgroundOpacity','nw.gui','_stored_maxLvGaugeColor2','RepositionEnemies130','GUtoh','_text','WIN_ICO_HELP','inBattle','HYPHEN_MINUS','setViewport','PictureID','Window_Base_drawFace','makeEncounterCount','SParamVocab1','Sprite_destroy','hvQSt','_stored_hpGaugeColor1','Scene_TitleTransition','FontSize','_backgroundSprite','targetScaleX','updateMotion','itemEva','anchor','Speed','ParseActorNotetags','_hideTileShadows','zuOsj','missed','_storedMapText','log','top','isGameActive','F12','getLastGamepadUsed','Game_Action_setAttack','_eventId','isPlaying','STENCIL_TEST','pow','nickname','SystemSetWindowPadding','_actorWindow','INOUTSINE','NgVBm','helpAreaHeight','INjLL','twQtG','BattleManager_processEscape','([\x5c+\x5c-]\x5cd+)([%％])>','EQUALS','%1\x0a','CRSEL','playBgs','DummyBgType','removePointAnimation','F23','ATTN','SceneManager_initialize','Scene_Base_terminateAnimationClearBugFix','cqlMw','Window_NameInput_cursorPagedown','_targetY','etypeId','loadWindowskin','STnpU','lJndR','_active','NONCONVERT','buttonAssistSwitch','qlSEl','mMMKk','setCoreEngineUpdateWindowBg','ColorNormal','showPointAnimations','jsQuickFunc','_offsetX','updatePadding','TextFmt','eeJUc','Sprite_Animation_setViewport','MODECHANGE','UaicY','applyForcedGameTroopSettingsCoreEngine','fillText','vertJS','Enemy-%1-%2','isNormalPriority','centerY','areButtonsHidden','SystemSetSideView','ColorSystem','cursorDown','BuyBgType','Scene_Map_createMenuButton','_stored_deathColor','currentClass','getBattleSystem','AudioChangeBgmPitch','buttonAssistOk','cos','battlebacks2','Scene_Battle_createSpritesetFix','#%1','buttonAssistText1','FhdMV','xfEyB','vcZlh','playBgm','seVolume','xparamFlat1','CreateBattleSystemID','toLowerCase','isPlaytest','textWidth','enableDigitGrouping','IconSParam2','CDvfN','setViewportCoreEngineFix','gaugeRate','ExportAllMapText','targetSpritePosition','_makeFontNameText','BitEU','QsXAn','updateBgmParameters','TILDE','OYibN','setHandler','MAT','startAnimation','Scene_SingleLoadTransition','QrzoW','_timeDuration','_forcedBattleSys','CAMtm','Scene_Shop_create','flush','xASpW','clipboard','endAction','kqnuK','ParseWeaponNotetags','CONTEXT_MENU','FDR','_effectsContainer','_targetAnchor','setSize','transform','WkaWN','makeFontSmaller','Window_StatusBase_drawActorLevel','NUMPAD4','wzelU','isOptionValid','SideButtons','INEXPO','fadeSpeed','Type','PHA','MapOnceParallel','TGR','createPointAnimationTargets','Match','test','ShortcutScripts','xEJUf','initMembersCoreEngine','_listWindow','setupValueFont','vLias','Game_Map_scrollLeft','PVKuS','text','WIN_OEM_ATTN','_lastX','itemHeight','ShowButtons','tFlPt','level','NiUWZ','Unnamed','Window_NameInput_processTouch','setAnglePlusData','updatePositionCoreEngineShakeHorz','Scene_Map_shouldAutosave','PMGVE','exit','Cuapj','raZpQ','Scene_Battle_createCancelButton','IconXParam3','SkillMenu','_mapNameWindow','maxScrollY','sv_actors','TPB\x20ACTIVE','OUTCIRC','Window_Selectable_drawBackgroundRect','ColorMPCost','gaugeLineHeight','_mode','shouldAutosave','_colorCache','Scene_Menu_create','ListBgType','ALWAYS','paramPlus','displayX','_goldWindow','isPhysical','sparamPlus2','MapNameTextCode','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','itemHit','CommonEventID','checkPlayerLocation','0.00','INQUART','addLoadListener','InputBgType','309910jVCpgm','imageSmoothingEnabled','process_VisuMZ_CoreEngine_Functions','isNwjs','Sprite_Button_updateOpacity','targetContentsOpacity','openingSpeed','processHandling','NSLvi','onEscapeSuccess','MMKdn','IconXParam2','guardSkillId','_centerElement','Game_Interpreter_PluginCommand','ZJVUe','connected','%1〘Choice\x20Cancel〙%1','JTnYB','Input_updateGamepadState','MINUS','setLastPluginCommandInterpreter','_sideButtonLayout','DisplayLockY','_gamepadWait','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','split','_colorTone','createFauxAnimationSprite','_startPlaying','_scrollBarHorz','StatusMenu','stencilFunc','eventsXyNt','Scene_Battle_createSpriteset_detach','hMLsx','NameInputMessage','sPlpz','_image','〘Scrolling\x20Text〙\x0a','determineSideButtonLayoutValid','_name','gradientFillRect','clear','MAX_GL_TEXTURES','OpenSpeed','ParseEnemyNotetags','expGaugeColor2','actorWindowRect','TimeProgress','SParamVocab5','name','_backSprite1','MAX_SAFE_INTEGER','PictureShowIcon','buttonAssistKey1','create','targets','ForceNoPlayTest','Scene_Base_createWindowLayer','isFullDocumentTitle','SParamVocab8','switchModes','IconParam7','XbrfK','isInputting','ribWG','adjustSprite','qZSee','Scene_Boot_updateDocumentTitle','pixelated','_refreshPauseSign','canUse','LKSBu','BlendMode','Sprite_Actor_setActorHome','ActorBgType','Bitmap_drawCircle','SceneManager_exit','mainAreaHeightSideButtonLayout','getKeyboardInputButtonString','isEventTest','playCursorSound','Ueeez','render','NCROK','CHGxC','BoxMargin','markCoreEngineModified','onMoveEnd','ShowActorLevel','FontSmoothing','createWindowLayer','_commonEventLayers','qqhFa','changeAnglePlusData','anglePlus','SrFOi','menu','LTShx','_width','_stored_ctGaugeColor1','WIN_OEM_FJ_JISHO','MenuBg','Bitmap_gradientFillRect','stringKeyMap','isGamepadConnected','F14','DTB','_currentBgm','ActorTPColor','DashToggleR','INQUINT','Sprite_Battler_startMove','parseForcedGameTroopSettingsCoreEngine','EnableJS','_targets','xScrollLinkedOffset','Bitmap_blt','PUjXB','_textPopupWindow','outlineColorDmg','OAGLj','Game_Temp_initialize','_changingClass','textSizeEx','isNextScene','scale','Game_Interpreter_command105','translucentOpacity','textBaseline','YXkWX','ExtractStrFromTroop','context','Scene_MenuBase_mainAreaTop','getCoreEngineScreenShakeStyle','setupScrollBarBitmap','fromCharCode','_originalViewport','setActorHome','updatePositionCoreEngine','ButtonAssist','setupCoreEngine','processCursorMoveModernControls','SystemSetFontSize','IconXParam0','dLKec','_stored_mpGaugeColor2','xsKIT','MRG','sparamRate2','setupRate','KeySHIFT','wAnDW','updateLastTarget','keyCode','dXYsv','Scene_Boot_onDatabaseLoaded','tpGaugeColor2','Bitmap_clearRect','paramValueByName','WIN_ICO_00','Bitmap_initialize','catchNormalError','_hideButtons','RuIbN','nyQwq','pdQdT','CzoVK','end','OnLoadJS','Mirror','drawTextEx','opacity','Sprite_Gauge_currentValue','buttonAssistOffset2','batch','FunctionName','setEasingType','cursorPageup','createButtonAssistWindow','EnableMasking','updateFauxAnimations'];_0x3e86=function(){return _0x4198bb;};return _0x3e86();}