//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.44] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x56d65d=_0x26a9;function _0x26a9(_0x531f40,_0x4e933a){const _0x1ecee1=_0x1ece();return _0x26a9=function(_0x26a91d,_0x2eed3d){_0x26a91d=_0x26a91d-0x18d;let _0x5bb9de=_0x1ecee1[_0x26a91d];return _0x5bb9de;},_0x26a9(_0x531f40,_0x4e933a);}(function(_0x48f764,_0x13bc8){const _0x1f067a=_0x26a9,_0x5ae3bd=_0x48f764();while(!![]){try{const _0x5169e4=parseInt(_0x1f067a(0x2c2))/0x1+parseInt(_0x1f067a(0x254))/0x2+-parseInt(_0x1f067a(0x2a2))/0x3*(parseInt(_0x1f067a(0x38b))/0x4)+parseInt(_0x1f067a(0x210))/0x5+parseInt(_0x1f067a(0x3a0))/0x6*(-parseInt(_0x1f067a(0x4c5))/0x7)+-parseInt(_0x1f067a(0x434))/0x8*(-parseInt(_0x1f067a(0x1a3))/0x9)+parseInt(_0x1f067a(0x1e9))/0xa*(-parseInt(_0x1f067a(0x2ca))/0xb);if(_0x5169e4===_0x13bc8)break;else _0x5ae3bd['push'](_0x5ae3bd['shift']());}catch(_0x37a864){_0x5ae3bd['push'](_0x5ae3bd['shift']());}}}(_0x1ece,0x52a11));function _0x1ece(){const _0x2b6fbf=['isBuffOrDebuffAffected','stepsForTurn','iAKtd','SkillsStatesCore','setStypeId','cauiy','PassiveConditionJS','cizNq','Scene_Boot_onDatabaseLoaded','StackBuffMax','right','getCurrentStateOriginKey','WlANt','jvQjr','makeResistedStateCategories','BattleManager_endAction','FUNC','qXoRy','uaQSu','checkSkillConditionsSwitchNotetags','_skillIDs','TurnOffsetX','skillVisibleJS','onAddStateMakeCustomSlipValues','drawFullGauge','DataOffsetX','placeGauge','meetsPassiveStateConditionJS','constructor','ilogr','AutoAddState','onEraseDebuffGlobalJS','Sprite_Gauge_currentMaxValue','drawActorBuffRates','getColorDataFromPluginParameters','recalculateSlipDamageJS','AGDcm','_battler','applyBuffTurnManipulationEffects','SkVOM','clearStateOrigin','VHbgO','updateTurnDisplaySprite','_checkingTraitsSetSkillsStatesCore','forgetSkill','canPaySkillCost','GfvWT','onAddStateJS','DataFontSize','sSQqo','_stateData','clamp','Game_Variables_onChange','overwriteBuffTurns','Window_StatusBase_drawActorIcons','CheckVisibleBattleNotetags','meetsSkillConditionsEnableJS','Skills','cjfrC','push','%1\x20%2\x20%3','isActor','SkillSceneAdjustSkillList','value','kQjhO','qAbzI','DataOffsetY','ATK','mainCommandWidth','SkillActorPaySkillCost','aWDwh','damage','setPassiveStateSlipDamageJS','Game_BattlerBase_eraseBuff','onAddDebuffGlobalJS','iconWidth','onEraseDebuff','uiHelpPosition','Game_BattlerBase_overwriteBuffTurns','Sprite_Gauge_currentValue','refresh','max','commandName','textSizeEx','UsyQC','toUpperCase','XVwSR','ShowJS','Sprite_Gauge_redraw','DnRSk','getStateIdWithName','hpDamage','innerWidth','getColor','add','getStypeIdWithName','Scene_Skill_createItemWindow','LabelOutlineWidth','multiClass','Game_BattlerBase_recoverAll','filter','itemLineRect','auto','applyStateCategoryRemovalEffects','inBattle','textColor','NhlTy','clearStateRetainType','makeCommandName','isGroupDefeatStateAffected','convertPassiveStates','buffColor','multiclasses','onAddStateCustomJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','cPtdz','shift','28xCxKZf','onAddBuffGlobalJS','TurnEndOnMap','Scene_Skill_skillTypeWindowRect','StateTurnsActorChangeTo','TIZBl','isMaxBuffAffected','labelFontSize','contents','members','mainAreaHeight','addDebuffTurns','Game_BattlerBase_meetsSkillConditions','Parse_Notetags_State_PassiveJS','slipHp','PncfA','_stateMaxTurns','slFQG','addPassiveStates','lBjOT','statusWidth','recover\x20all','wjzqe','Game_BattlerBase_clearStates','item','mainFontSize','iconIndex','applyStateTurnManipulationEffects','QfFVp','rdanT','concat','onAddBuff','_classIDs','onAddBuffJS','isStateRestrict','ceil','isRightInputMode','gaugeColor2','ShowData','DisplayedParams','onEraseStateGlobalJS','FvJlH','CheckIncompatibleStates','Actor','lineHeight','YRmsn','TurnOffsetY','maxSlipDamage','GaugeDrawJS','janKH','vzDFy','registerCommand','drawExtendedParameter','setStateTurns','aZiVE','split','addPassiveStatesFromOtherPlugins','Game_Actor_learnSkill','shopStatusWindowRect','text','_currentTroopUniqueID','getSkillIdWithName','anySwitchOn','canUse','skillTypes','Game_BattlerBase_initMembers','loadBitmap','QqJqR','format','stateData','tBguK','_stateSteps','TextJS','changeTextColor','ScDZe','883476yBqyya','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','bmqiO','helpWindowRectSkillsStatesCore','IconStypeMagic','ParseSkillNotetags','_tempActor','Costs','createAllSkillCostText','Window_StatusBase_placeGauge','itemAt','_stypeIDs','initMembersSkillsStatesCore','NUM','isDebuffAffected','shopStatusWidth','ParseStateNotetags','clearStatesWithStateRetain','createKeyJS','ignore','yhimX','Game_BattlerBase_buffIconIndex','VisuMZ_2_ClassChangeSystem','aCtzX','AGI','stateMpSlipHealJS','FXgKT','indexOf','UTiEx','currentValueSkillsStatesCore','onEraseDebuffJS','wndfk','changeOutlineColor','createTurnDisplaySprite','ParseAllNotetags','Game_Battler_onBattleEnd','hasStateCategory','retrieveStateColor','ValueOutlineWidth','getStateOriginByKey','iRuzv','applySkillsStatesCoreEffects','nWgAz','nzcOe','bitmap','TurnFontSize','StateTurnsEnemyChangeTo','AqOoT','Game_Battler_addState','updatedLayoutStyle','EZXjk','allowCreateShopStatusWindow','isPlaytest','ValueFontMainType','LabelFontMainType','GroupDigits','xInPe','_categoryWindow','setBackgroundType','decreaseBuff','skillCostSeparator','removeBuffsAuto','fontBold','placeExactGauge','_stateTurns','usableSkills','addPassiveStatesByPluginParameters','<troop-%1>','stateMpSlipDamageJS','GaugeCurrentJS','4660YsGpFQ','_turnDisplaySprite','Game_BattlerBase_eraseState','onExpireBuff','CmdTextAlign','hdCjK','mainFontFace','LiHRu','onAddStateGlobalJS','CheckVisibleSwitchNotetags','stateCategoriesResisted','isSkillCostShown','stypeId','success','Weapon-%1-%2','fontSize','resetTextColor','rAkEQ','LkYBd','includesSkillsStatesCore','ColorDebuff','MAXHP','drawItemStyleIcon','fillRect','rgba(0,\x200,\x200,\x200)','index','innerHeight','hide','makeCommandList','drawSkillCost','hfspW','ShowTurns','Game_Battler_isStateAddable','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_checkingVisuMzPassiveStateObjects','OydjK','currentClass','AGKzH','isCommandEnabled','3315175rrIlRz','drawItemStyleIconText','buff','Sprite_StateIcon_updateFrame','Xqtek','getCurrentTroopUniqueID','updateFrame','Sprite_Gauge_gaugeRate','tlDpB','meetsSkillConditions','kVLCq','note','uiInputPosition','kmFVg','EDKFM','LayoutStyle','CanPayJS','MaxTurns','onExpireStateJS','skillMpCost','slipMp','prepareResetStateCounts','stateId','jycqe','Game_BattlerBase_skillMpCost','meetsPassiveStateConditions','Game_BattlerBase_isStateResist','getStateOrigin','groupDefeat','xILMr','callUpdateHelp','VNrAQ','convertGaugeTypeSkillsStatesCore','map','action','includes','KcBSr','ColorNeutral','buffLength','call','MraHA','helpAreaHeight','eTToi','_animationIndex','redraw','pddVS','Window_SkillList_updateHelp','useDigitGrouping','IconStypeNorm','SkillEnemyPaySkillCost','_actor','vudPI','setStateOrigin','_stored_debuffColor','AAelY','_cache_getPassiveStateConditionClassesData','addCommand','itemTextAlign','recoverAll','adjustSkillCost','Game_Switches_onChange','paramBuffRate','AqOTa','Parse_Notetags_State_SlipEffectJS','eraseState','Param','resetFontSettings','_colorCache','505432vidXXg','skillTypeWindowRectSkillsStatesCore','labelColor','removeStatesByCategory','applyItemUserEffect','skillTypeWindowRect','XarfV','_itemWindow','hasSkill','rgba(0,\x200,\x200,\x201)','uzaRA','ColorPositive','commandNameWindowDrawBackground','isPartyAllAffectedByGroupDefeatStates','buttonAssistText1','mbrIR','getClassIdWithName','urQbn','dKqbX','valueFontFace','tVnIe','_cache_getPassiveStateConditionSwitchData','StateTurnsActorChangeBy','currentDisplayedValue','ARRAYSTRUCT','isStateCategoryResisted','createItemWindow','onAddDebuff','test','VisuMZ_1_ItemsEquipsCore','Window_SkillList_includes','qsmYo','xoMgZ','drawTextEx','%1%','amVCH','gaugeLineHeight','meetsPassiveStateConditionSwitches','cFMKe','isLearnedSkill','oIFxg','commandStyleCheck','Parse_Notetags_State_Category','gSfwP','yuzUe','States','onBattleEnd','ListWindowCols','mbExx','qUEWj','Window_SkillList_drawItem','match','setupSkillsStatesCore','krwdp','totalStateCategoryAffected','frxIA','VisuMZ_0_CoreEngine','isStateAddable','addPassiveStatesTraitSets','JSON','regenerateAllSkillsStatesCore','removeStatesAuto','getSkillTypes','width','YrByf','updateCommandNameWindow','SkillID','LUK','SMAel','ztrCG','setBuffTurns','StateTurnsEnemyChangeBy','removeState','isSkillHidden','MDF','PresetLabelGaugeColor','hasState','regenerateAll','33498GxZsUu','stateTpSlipHealJS','height','buffTurns','onExpireState','windowPadding','Name','YBDaK','gainHp','drawActorStateTurns','boxWidth','checkCacheKey','BkmPP','clearStateData','helpAreaTop','IWgiu','createSkillCostText','Clxto','debuffColor','isSceneBattle','keys','sNbFP','ColorNegative','clear','njlIK','twRuJ','isStateResist','SkillSceneStatusBgType','_result','TxGoS','makeCurrentTroopUniqueID','stateAddJS','676420saqWqj','omQON','statePassiveConditionJS','uiMenuStyle','_stateDisplay','fontFace','outlineColor','actorId','11396egAcPh','removeStatesByCategoryAll','gainMp','setStateRetainType','ExqTK','Game_Action_applyItemUserEffect','\x5cI[%1]%2','isSkillTypeMatchForUse','MAT','bfRBQ','ptjGj','_stored_buffColor','actor','_passiveStateResults','Game_Battler_addDebuff','#%1','hRwtc','onAddDebuffJS','yIqlw','msuzZ','Game_BattlerBase_skillTpCost','ParseClassIDs','Game_Battler_addBuff','parameters','ALAwy','Window_SkillList_maxCols','apVBv','labelOutlineWidth','setItem','gradientFillRect','hOViP','checkSkillTypeMatch','heewN','user','convertTargetToStateOriginKey','parse','gainSilentTp','ALL','number','addBuff','totalStateCategory','frameCount','skills','process_VisuMZ_SkillsStatesCore_Notetags','StackDebuffMax','Window_SkillList_setActor','MatchLabelColor','paySkillCost','clearStateDisplay','greater','_shopStatusWindow','deadMembers','onEraseBuffJS','onEraseBuffGlobalJS','addState','buffIconIndex','CnBxZ','Actor-%1-%2','sbyJW','MoONt','drawActorStateData','bgHuc','MultiplierJS','IzICX','menuActor','changePaintOpacity','seUwV','Scene_Skill_helpWindowRect','STR','BattleHiddenSkillTypes','addDebuff','MWYLN','slxgU','qvBbF','statesByCategory','meetsPassiveStateGlobalConditionJS','commandNameWindowCenter','prototype','STRUCT','testApply','vLGFU','currentMaxValueSkillsStatesCore','sUPZK','Game_Troop_setup','_checkingPassiveStates','isBuffExpired','onAddState','reset','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createPassiveStatesCache','states','shopStatusWindowRectSkillsStatesCore','checkSkillConditionsNotetags','_states','drawExtendedSkillsStatesCoreStatus','setActor','isStateAffected','cUhuI','currentMaxValue','PdoTt','statusWindowRect','oSevh','cfNYY','Class-%1-%2','normalColor','center','CeXsJ','XTEID','exit','updateStatesActionEnd','State-%1-%2','drawActorIconsAllTurnCounters','kbZIN','Buffs','getStateReapplyRulings','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Armor-%1-%2','passiveStateObjects','PayJS','Scene_Skill_itemWindowRect','<actor-%1>','numberFontFace','ColorBuff','_endingBattle','nWOeT','ARRAYFUNC','increaseBuff','ActorIDs','TeBcL','hfpNh','hTZGy','commandStyle','labelOutlineColor','valueOutlineColor','slice','EVAL','itemWindowRect','autoRemovalTiming','afGqm','DEF','setStatusWindow','uhitw','_tempBattler','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateHelp','uybMU','FnoRg','applyDebuffTurnManipulationEffects','_hidden','equips','resetStateCounts','clearStates','anchor','gaugeColor1','skillEnableJS','MatchLabelGaugeColor','CoreEngine','pTPAy','Item-%1-%2','statusWindowRectSkillsStatesCore','onExpireStateGlobalJS','_statusWindow','_currentActor','addStateTurns','categories','onExpireBuffGlobalJS','rYSiJ','skillTpCost','buttonAssistSwitch','checkShowHideJS','helpWindowRect','EnemyIndex','traitsSet','commandNameWindowDrawText','state','createCommandNameWindow','labelFontFace','updateStateTurns','_stateRetainType','length','getPassiveStatesFromObj','Parse_Notetags_Skill_JS','isUseModernControls','Game_BattlerBase_traitsSet','floor','icon','wrvKx','uotCV','onDatabaseLoaded','replace','passiveStateIDs','toLowerCase','aRDSi','236sifpsw','_costSettings','enemyId','_skillTypeWindow','_cache_getPassiveStatesFromObj','description','JiLdI','ARRAYSTR','ZRkPY','Game_BattlerBase_refresh','getPassiveStateConditionSwitchData','hfwrg','sort','enemy','gaugeBackColor','IXprq','mpDamage','adjustItemWidthByShopStatus','Gauge','colSpacing','makeSuccess','757212ysxEpO','anySwitchOff','active','HiddenSkillTypes','qZqMe','PassiveStates','allSwitchOn','none','FzpKr','itemWindowRectSkillsStatesCore','vLiED','dkQez','getStateRetainType','_subject','redrawSkillsStatesCore','_cache','getStateDisplay','name','getStateData','removeOtherStatesOfSameCategory','skill','onExpireDebuffJS','iconHeight','log','valueOutlineWidth','getCurrentStateActiveUser','isBuffAffected','RefreshCacheVar','ReapplyRules','magicSkills','aNDCp','vHcJH','isPassiveStateStackable','Game_Actor_forgetSkill','passiveStates','isStateRemoved','uuCCE','die','priority','getPassiveStateConditionClassesData','checkShowHideNotetags','createShopStatusWindow','_buffs','isAllDead','POSITIVE','zzWke','Game_Unit_isAllDead','onExpireDebuffGlobalJS','kAEHK','addBuffTurns','meetsStateCondition','<member-%1>','StateID','fmxPM','setDebuffTurns','wtJHm','_commandNameWindow','MAXMP','Sprite_Gauge_setup','<enemy-%1>','Game_BattlerBase_increaseBuff','_buffTurns','isStateCategoryAffected','igjjv','slipTp','actions','_lastStatesActionEndFrameCount','meetsPassiveStateConditionClasses','OKgtJ','WJvNy','uuBeM','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','CalcJS','drawText','tpCost','stateHpSlipDamageJS','trim','eraseBuff','Game_BattlerBase_resetStateCounts','onExpireDebuff','status','round','stateTpSlipDamageJS','WGHzF','_stateIDs','maxItems','addChild','meetsSkillConditionsGlobalJS','mOizI','stateColor','gLtCe','Game_BattlerBase_die','nTkZj','daEUL','_scene','MwFUh','WWWef','gaugeRate','JkTPl','onChange','xWPuq','makeAdditionalSkillCostText','allSwitchOff','Game_BattlerBase_states','drawActorBuffTurns','valueFontSize','isSkillUsableForAutoBattle','GKToD','TwBXK','ZesBl','uHXDh','skillId','scrollTo','Game_Action_testApply','stateEraseJS','Game_BattlerBase_decreaseBuff','yvItW','ConvertParams','iconText','mainAreaTop','testSkillStatesCoreNotetags','alterSkillName','process_VisuMZ_SkillsStatesCore_State_Notetags','setup','Parse_Notetags_State_ApplyRemoveLeaveJS','Parse_Notetags_Skill_Cost','VisuMZ_1_ElementStatusCore','initialize','vlThU','process_VisuMZ_SkillsStatesCore_Skill_Notetags','currentValue','ZWRtJ','onEraseBuff','CmdStyle','addPassiveStatesByNotetag','stateExpireJS','traitObjects','ANY','SspVS','onEraseStateJS','ActionEndUpdate','VyrPD','drawItem','heal','paramValueByName','UOMsf','aUVpC','Settings','32bhVBHZ','stateTurns','_stypeId','CheckVisibleSkillNotetags','drawIcon','OFLLs','EnableLayout','initMembers','onRemoveState','Turns','stateHpSlipHealJS','learnSkill','_stateOrigin','isUseSkillsStatesCoreUpdatedLayout','stateMaximumTurns','ShowShopStatus','KZTJc','ipwPG','fZCGL','nTRdZ','remove','drawActorIcons','SkillConditionJS','QCwXZ','Enemy-%1-%2','Game_Actor_skillTypes','Global','jcdIY'];_0x1ece=function(){return _0x2b6fbf;};return _0x1ece();}var label=_0x56d65d(0x453),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x56d65d(0x4b4)](function(_0x57e029){const _0x2e85f7=_0x56d65d;return _0x57e029[_0x2e85f7(0x3f0)]&&_0x57e029[_0x2e85f7(0x390)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x56d65d(0x433)]=VisuMZ[label][_0x56d65d(0x433)]||{},VisuMZ['ConvertParams']=function(_0x460373,_0xd415c4){const _0x3f2115=_0x56d65d;for(const _0x24f9dc in _0xd415c4){if(_0x3f2115(0x18e)!==_0x3f2115(0x268)){if(_0x24f9dc['match'](/(.*):(.*)/i)){if(_0x3f2115(0x23a)===_0x3f2115(0x462))_0x31053a[_0x3f2115(0x48b)](_0x3ef224);else{const _0x18626a=String(RegExp['$1']),_0x1ab3e2=String(RegExp['$2'])[_0x3f2115(0x4a5)]()[_0x3f2115(0x3ec)]();let _0x5495b3,_0x3007dc,_0x5280ae;switch(_0x1ab3e2){case _0x3f2115(0x1b0):_0x5495b3=_0xd415c4[_0x24f9dc]!==''?Number(_0xd415c4[_0x24f9dc]):0x0;break;case'ARRAYNUM':_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x13042b=>Number(_0x13042b));break;case _0x3f2115(0x351):_0x5495b3=_0xd415c4[_0x24f9dc]!==''?eval(_0xd415c4[_0x24f9dc]):null;break;case'ARRAYEVAL':_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x521e23=>eval(_0x521e23));break;case _0x3f2115(0x28f):_0x5495b3=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):'';break;case'ARRAYJSON':_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON['parse'](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x1a62a7=>JSON['parse'](_0x1a62a7));break;case _0x3f2115(0x460):_0x5495b3=_0xd415c4[_0x24f9dc]!==''?new Function(JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc])):new Function('return\x200');break;case _0x3f2115(0x347):_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x52adad=>new Function(JSON['parse'](_0x52adad)));break;case _0x3f2115(0x30e):_0x5495b3=_0xd415c4[_0x24f9dc]!==''?String(_0xd415c4[_0x24f9dc]):'';break;case _0x3f2115(0x392):_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x2bb13a=>String(_0x2bb13a));break;case _0x3f2115(0x318):_0x5280ae=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):{},_0x460373[_0x18626a]={},VisuMZ[_0x3f2115(0x415)](_0x460373[_0x18626a],_0x5280ae);continue;case _0x3f2115(0x26c):_0x3007dc=_0xd415c4[_0x24f9dc]!==''?JSON[_0x3f2115(0x2ed)](_0xd415c4[_0x24f9dc]):[],_0x5495b3=_0x3007dc[_0x3f2115(0x231)](_0x137e45=>VisuMZ[_0x3f2115(0x415)]({},JSON[_0x3f2115(0x2ed)](_0x137e45)));break;default:continue;}_0x460373[_0x18626a]=_0x5495b3;}}}else return _0x3f2115(0x25d);}return _0x460373;},(_0x284b45=>{const _0x24e9dc=_0x56d65d,_0xd02c3=_0x284b45[_0x24e9dc(0x3b1)];for(const _0xe2efa6 of dependencies){if(!Imported[_0xe2efa6]){alert(_0x24e9dc(0x33d)[_0x24e9dc(0x19c)](_0xd02c3,_0xe2efa6)),SceneManager[_0x24e9dc(0x336)]();break;}}const _0x54b1bc=_0x284b45[_0x24e9dc(0x390)];if(_0x54b1bc[_0x24e9dc(0x287)](/\[Version[ ](.*?)\]/i)){const _0xdda24=Number(RegExp['$1']);_0xdda24!==VisuMZ[label]['version']&&(alert(_0x24e9dc(0x322)[_0x24e9dc(0x19c)](_0xd02c3,_0xdda24)),SceneManager[_0x24e9dc(0x336)]());}if(_0x54b1bc[_0x24e9dc(0x287)](/\[Tier[ ](\d+)\]/i)){const _0x515ce3=Number(RegExp['$1']);_0x515ce3<tier?(alert(_0x24e9dc(0x359)[_0x24e9dc(0x19c)](_0xd02c3,_0x515ce3,tier)),SceneManager[_0x24e9dc(0x336)]()):tier=Math['max'](_0x515ce3,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x24e9dc(0x433)],_0x284b45[_0x24e9dc(0x2e1)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x56d65d(0x3b1)],_0x56d65d(0x495),_0x3a2a5b=>{const _0x25a132=_0x56d65d;VisuMZ[_0x25a132(0x415)](_0x3a2a5b,_0x3a2a5b);const _0x3faf86=_0x3a2a5b['ActorIDs']||[],_0x18f402=Number(_0x3a2a5b[_0x25a132(0x296)]),_0x15f53f=$dataSkills[_0x18f402];if(!_0x15f53f)return;for(const _0x5f2f32 of _0x3faf86){const _0x363746=$gameActors[_0x25a132(0x2d6)](_0x5f2f32);if(!_0x363746)continue;_0x363746[_0x25a132(0x2f9)](_0x15f53f);}}),PluginManager[_0x56d65d(0x4f8)](pluginData[_0x56d65d(0x3b1)],_0x56d65d(0x241),_0x2bbc88=>{const _0x246ae0=_0x56d65d;VisuMZ[_0x246ae0(0x415)](_0x2bbc88,_0x2bbc88);const _0x59ed8d=_0x2bbc88[_0x246ae0(0x375)]||[],_0x4bd4cb=Number(_0x2bbc88[_0x246ae0(0x296)]),_0x2ca2fb=$dataSkills[_0x4bd4cb];if(!_0x2ca2fb)return;for(const _0x546d46 of _0x59ed8d){const _0x121578=$gameTroop[_0x246ae0(0x4ce)]()[_0x546d46];if(!_0x121578)continue;_0x121578['paySkillCost'](_0x2ca2fb);}}),PluginManager[_0x56d65d(0x4f8)](pluginData['name'],_0x56d65d(0x26a),_0x4932a3=>{const _0x29f490=_0x56d65d;VisuMZ[_0x29f490(0x415)](_0x4932a3,_0x4932a3);const _0x25eecd=_0x4932a3[_0x29f490(0x349)]||[],_0x47cd4d=Number(_0x4932a3[_0x29f490(0x3d4)]),_0x2d1dd9=Number(_0x4932a3[_0x29f490(0x43d)]),_0x29eb75=_0x4932a3[_0x29f490(0x46e)];for(const _0x1f0fbd of _0x25eecd){if('rQQCD'===_0x29f490(0x32d)){const _0x44399f=_0xe4a14d(_0x393179['$1']),_0x549840=_0x54d832[_0x29f490(0x19c)](_0x44399f,'heal',0x1,_0x29f490(0x3e0));_0x31a7f2[_0x29f490(0x453)][_0x29f490(0x2a3)][_0x5f2084['id']]=new _0x53bf06(_0x29f490(0x226),_0x549840);}else{const _0xfcb1f8=$gameActors[_0x29f490(0x2d6)](_0x1f0fbd);if(!_0xfcb1f8)continue;_0x29eb75&&!_0xfcb1f8['isStateAffected'](_0x47cd4d)?(_0xfcb1f8[_0x29f490(0x300)](_0x47cd4d),_0xfcb1f8[_0x29f490(0x18d)](_0x47cd4d,_0x2d1dd9)):_0x29f490(0x35b)===_0x29f490(0x1d5)?this['contents']['textColor']=_0xb953a4:_0xfcb1f8[_0x29f490(0x36d)](_0x47cd4d,_0x2d1dd9);}}}),PluginManager[_0x56d65d(0x4f8)](pluginData[_0x56d65d(0x3b1)],_0x56d65d(0x4c9),_0x214fcb=>{const _0x4f7479=_0x56d65d;VisuMZ[_0x4f7479(0x415)](_0x214fcb,_0x214fcb);const _0x42706d=_0x214fcb[_0x4f7479(0x349)]||[],_0x2b5de1=Number(_0x214fcb[_0x4f7479(0x3d4)]),_0xb8bab7=Math[_0x4f7479(0x4a1)](Number(_0x214fcb[_0x4f7479(0x43d)]),0x0),_0x2113c9=_0x214fcb['AutoAddState'];for(const _0x4298b5 of _0x42706d){const _0x2ed43d=$gameActors['actor'](_0x4298b5);if(!_0x2ed43d)continue;_0x2113c9&&!_0x2ed43d[_0x4f7479(0x32a)](_0x2b5de1)&&_0x2ed43d[_0x4f7479(0x300)](_0x2b5de1),_0x2ed43d[_0x4f7479(0x18d)](_0x2b5de1,_0xb8bab7);}}),PluginManager[_0x56d65d(0x4f8)](pluginData[_0x56d65d(0x3b1)],_0x56d65d(0x29b),_0x10a2c5=>{const _0x1d6b37=_0x56d65d;if(!$gameParty[_0x1d6b37(0x4b8)]())return;VisuMZ[_0x1d6b37(0x415)](_0x10a2c5,_0x10a2c5);const _0x5317d2=_0x10a2c5[_0x1d6b37(0x375)]||[],_0x3d9453=Number(_0x10a2c5[_0x1d6b37(0x3d4)]),_0x401d2a=Number(_0x10a2c5['Turns']),_0x19cb67=_0x10a2c5['AutoAddState'];for(const _0x2123e4 of _0x5317d2){if('mlBMR'!==_0x1d6b37(0x31c)){const _0x5dbb21=$gameTroop['members']()[_0x2123e4];if(!_0x5dbb21)continue;_0x19cb67&&!_0x5dbb21['isStateAffected'](_0x3d9453)?(_0x5dbb21[_0x1d6b37(0x300)](_0x3d9453),_0x5dbb21[_0x1d6b37(0x18d)](_0x3d9453,_0x401d2a)):_0x5dbb21[_0x1d6b37(0x36d)](_0x3d9453,_0x401d2a);}else{if(_0x3dc156[_0x1d6b37(0x27b)](_0x67e267))return![];}}}),PluginManager[_0x56d65d(0x4f8)](pluginData[_0x56d65d(0x3b1)],_0x56d65d(0x1d1),_0x224728=>{const _0x2a6290=_0x56d65d;if(!$gameParty[_0x2a6290(0x4b8)]())return;VisuMZ[_0x2a6290(0x415)](_0x224728,_0x224728);const _0x37a68b=_0x224728[_0x2a6290(0x375)]||[],_0x3a6703=Number(_0x224728['StateID']),_0x792398=Math[_0x2a6290(0x4a1)](Number(_0x224728[_0x2a6290(0x43d)]),0x0),_0x2f59e0=_0x224728[_0x2a6290(0x46e)];for(const _0x598b46 of _0x37a68b){if(_0x2a6290(0x2c3)!==_0x2a6290(0x2c3))this[_0x2a6290(0x253)][_0x432646]=this[_0x2a6290(0x4b9)](_0x54ac40(_0x514108));else{const _0x54261e=$gameTroop[_0x2a6290(0x4ce)]()[_0x598b46];if(!_0x54261e)continue;_0x2f59e0&&!_0x54261e['isStateAffected'](_0x3a6703)&&(_0x2a6290(0x4a4)!=='UsyQC'?this['contents'][_0x2a6290(0x3e9)](_0x1b0b98,_0x52eea5,_0x1c9d87,_0x2225fe,this['contents'][_0x2a6290(0x2a4)],_0x524958):_0x54261e[_0x2a6290(0x300)](_0x3a6703)),_0x54261e[_0x2a6290(0x18d)](_0x3a6703,_0x792398);}}}),VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x458)]=Scene_Boot[_0x56d65d(0x317)]['onDatabaseLoaded'],Scene_Boot[_0x56d65d(0x317)][_0x56d65d(0x386)]=function(){const _0x27fde2=_0x56d65d;VisuMZ[_0x27fde2(0x453)][_0x27fde2(0x458)][_0x27fde2(0x237)](this),this[_0x27fde2(0x2f5)](),VisuMZ['SkillsStatesCore'][_0x27fde2(0x4ef)]();},Scene_Boot[_0x56d65d(0x317)][_0x56d65d(0x2f5)]=function(){const _0x53ab73=_0x56d65d;if(VisuMZ[_0x53ab73(0x1c5)])return;this[_0x53ab73(0x421)](),this[_0x53ab73(0x41a)]();},Scene_Boot[_0x56d65d(0x317)][_0x56d65d(0x421)]=function(){const _0x2929db=_0x56d65d;for(const _0x285735 of $dataSkills){if(!_0x285735)continue;VisuMZ[_0x2929db(0x453)][_0x2929db(0x41d)](_0x285735),VisuMZ[_0x2929db(0x453)][_0x2929db(0x37f)](_0x285735);}},Scene_Boot[_0x56d65d(0x317)][_0x56d65d(0x41a)]=function(){const _0x3987cf=_0x56d65d;for(const _0x3d41ea of $dataStates){if(!_0x3d41ea)continue;VisuMZ[_0x3987cf(0x453)][_0x3987cf(0x27e)](_0x3d41ea),VisuMZ[_0x3987cf(0x453)][_0x3987cf(0x4d2)](_0x3d41ea),VisuMZ['SkillsStatesCore'][_0x3987cf(0x24f)](_0x3d41ea),VisuMZ[_0x3987cf(0x453)][_0x3987cf(0x41c)](_0x3d41ea);}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x1a8)]=VisuMZ[_0x56d65d(0x1a8)],VisuMZ['ParseSkillNotetags']=function(_0x524896){const _0x7e56f2=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x7e56f2(0x1a8)]['call'](this,_0x524896),VisuMZ[_0x7e56f2(0x453)][_0x7e56f2(0x41d)](_0x524896),VisuMZ[_0x7e56f2(0x453)][_0x7e56f2(0x37f)](_0x524896);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1b3)]=VisuMZ[_0x56d65d(0x1b3)],VisuMZ[_0x56d65d(0x1b3)]=function(_0x4af64f){const _0x396ba1=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x396ba1(0x1b3)]['call'](this,_0x4af64f),VisuMZ[_0x396ba1(0x453)][_0x396ba1(0x27e)](_0x4af64f),VisuMZ[_0x396ba1(0x453)][_0x396ba1(0x4d2)](_0x4af64f),VisuMZ[_0x396ba1(0x453)][_0x396ba1(0x24f)](_0x4af64f),VisuMZ[_0x396ba1(0x453)][_0x396ba1(0x41c)](_0x4af64f);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x41d)]=function(_0x35f4e8){const _0x245041=_0x56d65d,_0x4b04d7=_0x35f4e8['note'];if(_0x4b04d7[_0x245041(0x287)](/<MP COST:[ ](\d+)>/i)){if(_0x245041(0x4db)===_0x245041(0x2dc))return _0x805223[_0x245041(0x453)][_0x245041(0x433)][_0x245041(0x489)]['CmdTextAlign'];else _0x35f4e8['mpCost']=Number(RegExp['$1']);}_0x4b04d7[_0x245041(0x287)](/<TP COST:[ ](\d+)>/i)&&(_0x35f4e8[_0x245041(0x3ea)]=Number(RegExp['$1']));},VisuMZ[_0x56d65d(0x453)]['skillEnableJS']={},VisuMZ['SkillsStatesCore'][_0x56d65d(0x466)]={},VisuMZ[_0x56d65d(0x453)]['Parse_Notetags_Skill_JS']=function(_0x5657e2){const _0x10bb65=_0x56d65d,_0xf631a3=_0x5657e2[_0x10bb65(0x21b)];if(_0xf631a3[_0x10bb65(0x287)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x29f6ab=String(RegExp['$1']),_0x254af1=_0x10bb65(0x1a4)[_0x10bb65(0x19c)](_0x29f6ab);VisuMZ[_0x10bb65(0x453)]['skillEnableJS'][_0x5657e2['id']]=new Function('skill',_0x254af1);}if(_0xf631a3['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1ccc8e=String(RegExp['$1']),_0x17e914=_0x10bb65(0x4c2)[_0x10bb65(0x19c)](_0x1ccc8e);VisuMZ[_0x10bb65(0x453)][_0x10bb65(0x466)][_0x5657e2['id']]=new Function(_0x10bb65(0x3b4),_0x17e914);}},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x27e)]=function(_0x2f3f33){const _0x4d2f4d=_0x56d65d;_0x2f3f33[_0x4d2f4d(0x36e)]=[_0x4d2f4d(0x2ef),_0x4d2f4d(0x429)];const _0x3e4552=_0x2f3f33[_0x4d2f4d(0x21b)],_0x3da130=_0x3e4552[_0x4d2f4d(0x287)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3da130){if(_0x4d2f4d(0x243)===_0x4d2f4d(0x1a5))_0x441c5e['anySwitchOn']=_0x2b1e76(_0x357b83['$1'])[_0x4d2f4d(0x18f)](',')[_0x4d2f4d(0x231)](_0x4a0018=>_0x1b85fc(_0x4a0018));else for(const _0x68d63 of _0x3da130){_0x68d63[_0x4d2f4d(0x287)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x28a91b=String(RegExp['$1'])[_0x4d2f4d(0x4a5)]()[_0x4d2f4d(0x3ec)]()['split'](',');for(const _0x28432d of _0x28a91b){_0x2f3f33[_0x4d2f4d(0x36e)][_0x4d2f4d(0x48b)](_0x28432d[_0x4d2f4d(0x3ec)]());}}}if(_0x3e4552[_0x4d2f4d(0x287)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x50bd47=RegExp['$1'][_0x4d2f4d(0x18f)](/[\r\n]+/);for(const _0x315b33 of _0x50bd47){_0x2f3f33[_0x4d2f4d(0x36e)][_0x4d2f4d(0x48b)](_0x315b33[_0x4d2f4d(0x4a5)]()['trim']());}}if(_0x3e4552[_0x4d2f4d(0x287)](/<POSITIVE STATE>/i)){if(_0x4d2f4d(0x420)===_0x4d2f4d(0x420))_0x2f3f33[_0x4d2f4d(0x36e)][_0x4d2f4d(0x48b)](_0x4d2f4d(0x3cc));else{const _0xab91b2=_0xd18326[_0x4d2f4d(0x2ed)]('['+_0x41dd5d['$1'][_0x4d2f4d(0x287)](/\d+/g)+']');for(const _0x55bcf8 of _0xab91b2){if(!_0x364326[_0x4d2f4d(0x48f)](_0x55bcf8))return!![];}return![];}}_0x3e4552[_0x4d2f4d(0x287)](/<NEGATIVE STATE>/i)&&_0x2f3f33[_0x4d2f4d(0x36e)][_0x4d2f4d(0x48b)]('NEGATIVE');},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2c4)]={},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x4d2)]=function(_0x5d3bd2){const _0x1eddd8=_0x56d65d,_0x50793f=_0x5d3bd2[_0x1eddd8(0x21b)];if(_0x50793f[_0x1eddd8(0x287)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x2b48e8=String(RegExp['$1']),_0x18bf0e=_0x1eddd8(0x20a)[_0x1eddd8(0x19c)](_0x2b48e8);VisuMZ[_0x1eddd8(0x453)][_0x1eddd8(0x2c4)][_0x5d3bd2['id']]=new Function(_0x1eddd8(0x378),_0x18bf0e);}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x3eb)]={},VisuMZ['SkillsStatesCore'][_0x56d65d(0x43e)]={},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1e7)]={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ['SkillsStatesCore'][_0x56d65d(0x3f2)]={},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2a3)]={},VisuMZ['SkillsStatesCore']['Parse_Notetags_State_SlipEffectJS']=function(_0x3a9294){const _0x5b9165=_0x56d65d,_0x516007=_0x3a9294[_0x5b9165(0x21b)],_0x3654b6=_0x5b9165(0x3e7);if(_0x516007['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x3155b5=String(RegExp['$1']),_0x422066=_0x3654b6[_0x5b9165(0x19c)](_0x3155b5,_0x5b9165(0x497),-0x1,_0x5b9165(0x4d3));VisuMZ[_0x5b9165(0x453)]['stateHpSlipDamageJS'][_0x3a9294['id']]=new Function(_0x5b9165(0x226),_0x422066);}else{if(_0x516007['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if(_0x5b9165(0x44b)===_0x5b9165(0x44b)){const _0x2660ff=String(RegExp['$1']),_0x4fd033=_0x3654b6[_0x5b9165(0x19c)](_0x2660ff,_0x5b9165(0x42f),0x1,'slipHp');VisuMZ['SkillsStatesCore'][_0x5b9165(0x43e)][_0x3a9294['id']]=new Function('stateId',_0x4fd033);}else return _0x422875['SkillsStatesCore'][_0x5b9165(0x433)][_0x5b9165(0x489)]['SkillConditionJS'][_0x5b9165(0x237)](this,_0x5d5bf5);}}if(_0x516007['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x46686c=String(RegExp['$1']),_0x25ceeb=_0x3654b6['format'](_0x46686c,_0x5b9165(0x497),-0x1,'slipMp');VisuMZ[_0x5b9165(0x453)][_0x5b9165(0x1e7)][_0x3a9294['id']]=new Function(_0x5b9165(0x226),_0x25ceeb);}else{if(_0x516007['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x5b9165(0x3df)!==_0x5b9165(0x3df))this[_0x5b9165(0x3ba)](_0x3eddda)&&(_0x5ba49e+=this[_0x5b9165(0x2a5)](_0x544921),this['setBuffTurns'](_0x558b7f,_0xcb9fd7));else{const _0x4226f3=String(RegExp['$1']),_0x259b1e=_0x3654b6[_0x5b9165(0x19c)](_0x4226f3,'heal',0x1,'slipMp');VisuMZ[_0x5b9165(0x453)][_0x5b9165(0x1bc)][_0x3a9294['id']]=new Function(_0x5b9165(0x226),_0x259b1e);}}}if(_0x516007[_0x5b9165(0x287)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x13a789=String(RegExp['$1']),_0x381da8=_0x3654b6['format'](_0x13a789,_0x5b9165(0x497),-0x1,_0x5b9165(0x3e0));VisuMZ[_0x5b9165(0x453)][_0x5b9165(0x3f2)][_0x3a9294['id']]=new Function(_0x5b9165(0x226),_0x381da8);}else{if(_0x516007[_0x5b9165(0x287)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x3b7907=String(RegExp['$1']),_0x5aee83=_0x3654b6[_0x5b9165(0x19c)](_0x3b7907,_0x5b9165(0x42f),0x1,_0x5b9165(0x3e0));VisuMZ[_0x5b9165(0x453)]['stateTpSlipHealJS'][_0x3a9294['id']]=new Function(_0x5b9165(0x226),_0x5aee83);}}},VisuMZ[_0x56d65d(0x453)]['stateAddJS']={},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x412)]={},VisuMZ[_0x56d65d(0x453)]['stateExpireJS']={},VisuMZ['SkillsStatesCore'][_0x56d65d(0x41c)]=function(_0x14352c){const _0x5e1209=_0x56d65d,_0x458b4b=_0x14352c['note'],_0x447d1='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20';if(_0x458b4b[_0x5e1209(0x287)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x498dc1=String(RegExp['$1']),_0x30761f=_0x447d1[_0x5e1209(0x19c)](_0x498dc1);VisuMZ['SkillsStatesCore'][_0x5e1209(0x2c1)][_0x14352c['id']]=new Function(_0x5e1209(0x226),_0x30761f);}if(_0x458b4b[_0x5e1209(0x287)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x588295=String(RegExp['$1']),_0x199b22=_0x447d1['format'](_0x588295);VisuMZ[_0x5e1209(0x453)][_0x5e1209(0x412)][_0x14352c['id']]=new Function('stateId',_0x199b22);}if(_0x458b4b[_0x5e1209(0x287)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x490bae=String(RegExp['$1']),_0x1976e0=_0x447d1[_0x5e1209(0x19c)](_0x490bae);VisuMZ['SkillsStatesCore'][_0x5e1209(0x427)][_0x14352c['id']]=new Function(_0x5e1209(0x226),_0x1976e0);}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x4ef)]=function(){const _0x313baa=_0x56d65d;if(!VisuMZ[_0x313baa(0x453)][_0x313baa(0x433)][_0x313baa(0x281)][_0x313baa(0x42c)])return;for(const _0x4c0cfe of $dataStates){if(!_0x4c0cfe)continue;_0x4c0cfe['restriction']===0x4&&_0x4c0cfe['autoRemovalTiming']===0x1&&(_0x4c0cfe['autoRemovalTiming']=0x2);}},DataManager['getClassIdWithName']=function(_0x8a26da){const _0x470ff0=_0x56d65d;_0x8a26da=_0x8a26da[_0x470ff0(0x4a5)]()[_0x470ff0(0x3ec)](),this['_classIDs']=this[_0x470ff0(0x4e5)]||{};if(this[_0x470ff0(0x4e5)][_0x8a26da])return this[_0x470ff0(0x4e5)][_0x8a26da];for(const _0x111fb9 of $dataClasses){if(_0x470ff0(0x27f)!==_0x470ff0(0x22f)){if(!_0x111fb9)continue;let _0x17ea4c=_0x111fb9[_0x470ff0(0x3b1)];_0x17ea4c=_0x17ea4c[_0x470ff0(0x387)](/\x1I\[(\d+)\]/gi,''),_0x17ea4c=_0x17ea4c[_0x470ff0(0x387)](/\\I\[(\d+)\]/gi,''),this[_0x470ff0(0x4e5)][_0x17ea4c['toUpperCase']()[_0x470ff0(0x3ec)]()]=_0x111fb9['id'];}else{const _0x2c3e7c=this[_0x470ff0(0x27d)](_0x1e5a78);if(_0x2c3e7c===_0x470ff0(0x416))this['drawItemStyleIconText'](_0x588d45);else _0x2c3e7c===_0x470ff0(0x383)?this[_0x470ff0(0x1ff)](_0x1b6dd7):_0x154161['prototype']['drawItem'][_0x470ff0(0x237)](this,_0x18fe02);}}return this[_0x470ff0(0x4e5)][_0x8a26da]||0x0;},DataManager[_0x56d65d(0x292)]=function(_0x354778){const _0x33d7e8=_0x56d65d;this[_0x33d7e8(0x1ae)]=this['_stypeIDs']||{};if(this[_0x33d7e8(0x1ae)][_0x354778['id']])return this[_0x33d7e8(0x1ae)][_0x354778['id']];this[_0x33d7e8(0x1ae)][_0x354778['id']]=[_0x354778[_0x33d7e8(0x1f5)]];if(_0x354778['note'][_0x33d7e8(0x287)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x33d7e8(0x2b7)===_0x33d7e8(0x2b7)){const _0x31ebe3=JSON['parse']('['+RegExp['$1'][_0x33d7e8(0x287)](/\d+/g)+']');this[_0x33d7e8(0x1ae)][_0x354778['id']]=this['_stypeIDs'][_0x354778['id']][_0x33d7e8(0x4e3)](_0x31ebe3);}else{if(_0x164da3['isPlaytest']())_0x2a1acf[_0x33d7e8(0x3b7)](_0x48cc08);}}else{if(_0x354778[_0x33d7e8(0x21b)][_0x33d7e8(0x287)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2dac18=RegExp['$1'][_0x33d7e8(0x18f)](',');for(const _0x1f5c81 of _0x2dac18){if('MfZnF'===_0x33d7e8(0x2b1))return _0x400478[_0x33d7e8(0x4de)]()-0x2;else{const _0x56bb72=DataManager[_0x33d7e8(0x4af)](_0x1f5c81);if(_0x56bb72)this[_0x33d7e8(0x1ae)][_0x354778['id']][_0x33d7e8(0x48b)](_0x56bb72);}}}}return this[_0x33d7e8(0x1ae)][_0x354778['id']];},DataManager['getStypeIdWithName']=function(_0x2c07ef){const _0x1194f5=_0x56d65d;_0x2c07ef=_0x2c07ef[_0x1194f5(0x4a5)]()[_0x1194f5(0x3ec)](),this['_stypeIDs']=this[_0x1194f5(0x1ae)]||{};if(this[_0x1194f5(0x1ae)][_0x2c07ef])return this[_0x1194f5(0x1ae)][_0x2c07ef];for(let _0x4afdf4=0x1;_0x4afdf4<0x64;_0x4afdf4++){if('joDkh'!==_0x1194f5(0x479)){if(!$dataSystem['skillTypes'][_0x4afdf4])continue;let _0x55e507=$dataSystem[_0x1194f5(0x198)][_0x4afdf4][_0x1194f5(0x4a5)]()[_0x1194f5(0x3ec)]();_0x55e507=_0x55e507[_0x1194f5(0x387)](/\x1I\[(\d+)\]/gi,''),_0x55e507=_0x55e507[_0x1194f5(0x387)](/\\I\[(\d+)\]/gi,''),this[_0x1194f5(0x1ae)][_0x55e507]=_0x4afdf4;}else{if(_0x37fcca['_subject'])return _0x11ef63[_0x1194f5(0x3ad)];else{if(_0x56b865[_0x1194f5(0x36c)])return _0x55bdb7[_0x1194f5(0x36c)];}}}return this[_0x1194f5(0x1ae)][_0x2c07ef]||0x0;},DataManager[_0x56d65d(0x195)]=function(_0x1345ea){const _0x267ea5=_0x56d65d;_0x1345ea=_0x1345ea[_0x267ea5(0x4a5)]()['trim'](),this['_skillIDs']=this[_0x267ea5(0x464)]||{};if(this['_skillIDs'][_0x1345ea])return this['_skillIDs'][_0x1345ea];for(const _0x35f640 of $dataSkills){if(_0x267ea5(0x42a)===_0x267ea5(0x1c2)){const _0x3dd53a=_0xb46717(_0x139e0b['$1']),_0x25f63c=_0x267ea5(0x4c2)[_0x267ea5(0x19c)](_0x3dd53a);_0x17270b['SkillsStatesCore'][_0x267ea5(0x466)][_0x369ef0['id']]=new _0xad01fd('skill',_0x25f63c);}else{if(!_0x35f640)continue;this[_0x267ea5(0x464)][_0x35f640[_0x267ea5(0x3b1)]['toUpperCase']()[_0x267ea5(0x3ec)]()]=_0x35f640['id'];}}return this[_0x267ea5(0x464)][_0x1345ea]||0x0;},DataManager['getStateIdWithName']=function(_0x40aaf7){const _0x10d4bc=_0x56d65d;_0x40aaf7=_0x40aaf7['toUpperCase']()[_0x10d4bc(0x3ec)](),this[_0x10d4bc(0x3f4)]=this[_0x10d4bc(0x3f4)]||{};if(this[_0x10d4bc(0x3f4)][_0x40aaf7])return this['_stateIDs'][_0x40aaf7];for(const _0x42aa50 of $dataStates){if(_0x10d4bc(0x400)!==_0x10d4bc(0x400)){if(_0x1519eb[_0x10d4bc(0x25c)](_0x3fc1bc))return!![];}else{if(!_0x42aa50)continue;this[_0x10d4bc(0x3f4)][_0x42aa50['name']['toUpperCase']()[_0x10d4bc(0x3ec)]()]=_0x42aa50['id'];}}return this[_0x10d4bc(0x3f4)][_0x40aaf7]||0x0;},DataManager['stateMaximumTurns']=function(_0x1c1b6e){const _0x4f71ce=_0x56d65d;this['_stateMaxTurns']=this[_0x4f71ce(0x4d5)]||{};if(this[_0x4f71ce(0x4d5)][_0x1c1b6e])return this[_0x4f71ce(0x4d5)][_0x1c1b6e];if($dataStates[_0x1c1b6e]['note'][_0x4f71ce(0x287)](/<MAX TURNS:[ ](\d+)>/i))this['_stateMaxTurns'][_0x1c1b6e]=Number(RegExp['$1']);else{if(_0x4f71ce(0x2bb)===_0x4f71ce(0x280)){const _0x39908e=_0x1d01ae(_0x44cf37['$1']);if(_0x2f7ec5[_0x4f71ce(0x3de)](_0x39908e))return!![];}else this[_0x4f71ce(0x4d5)][_0x1c1b6e]=VisuMZ[_0x4f71ce(0x453)][_0x4f71ce(0x433)][_0x4f71ce(0x281)][_0x4f71ce(0x221)];}return this[_0x4f71ce(0x4d5)][_0x1c1b6e];},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1b5)]=function(_0x4e922d,_0x49f6fa){const _0x5f0af5=_0x56d65d;if(VisuMZ['createKeyJS'])return VisuMZ[_0x5f0af5(0x1b5)](_0x4e922d,_0x49f6fa);let _0x736ee4='';if($dataActors[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4=_0x5f0af5(0x303)[_0x5f0af5(0x19c)](_0x4e922d['id'],_0x49f6fa);if($dataClasses[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4=_0x5f0af5(0x331)['format'](_0x4e922d['id'],_0x49f6fa);if($dataSkills[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4='Skill-%1-%2'['format'](_0x4e922d['id'],_0x49f6fa);if($dataItems[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4=_0x5f0af5(0x368)['format'](_0x4e922d['id'],_0x49f6fa);if($dataWeapons['includes'](_0x4e922d))_0x736ee4=_0x5f0af5(0x1f7)[_0x5f0af5(0x19c)](_0x4e922d['id'],_0x49f6fa);if($dataArmors['includes'](_0x4e922d))_0x736ee4=_0x5f0af5(0x33e)[_0x5f0af5(0x19c)](_0x4e922d['id'],_0x49f6fa);if($dataEnemies[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4=_0x5f0af5(0x44c)['format'](_0x4e922d['id'],_0x49f6fa);if($dataStates[_0x5f0af5(0x233)](_0x4e922d))_0x736ee4=_0x5f0af5(0x338)['format'](_0x4e922d['id'],_0x49f6fa);return _0x736ee4;},ColorManager['getColorDataFromPluginParameters']=function(_0x2e4736,_0x86c3cc){const _0x595e16=_0x56d65d;_0x86c3cc=String(_0x86c3cc),this[_0x595e16(0x253)]=this['_colorCache']||{};if(_0x86c3cc[_0x595e16(0x287)](/#(.*)/i))_0x595e16(0x312)!==_0x595e16(0x25a)?this[_0x595e16(0x253)][_0x2e4736]=_0x595e16(0x2d9)[_0x595e16(0x19c)](String(RegExp['$1'])):(this[_0x595e16(0x1a1)](_0x466482['normalColor']()),this['changeOutlineColor'](_0x3c014d[_0x595e16(0x2c8)]()));else{if('BoYBs'!==_0x595e16(0x385))this[_0x595e16(0x253)][_0x2e4736]=this[_0x595e16(0x4b9)](Number(_0x86c3cc));else return _0x110249[_0x595e16(0x453)][_0x595e16(0x433)][_0x595e16(0x489)][_0x595e16(0x425)];}return this[_0x595e16(0x253)][_0x2e4736];},ColorManager['getColor']=function(_0x156850){const _0x3537ba=_0x56d65d;_0x156850=String(_0x156850);if(_0x156850['match'](/#(.*)/i)){if(_0x3537ba(0x4f6)==='janKH')return _0x3537ba(0x2d9)[_0x3537ba(0x19c)](String(RegExp['$1']));else{_0x2d5fe8[_0x3537ba(0x287)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x12c6f9=_0x20a7a8[_0x3537ba(0x1be)](_0x33cee9(_0x152fc3['$1'])[_0x3537ba(0x4a5)]()),_0x23261d=_0x3581be(_0x57dd0a['$2']);_0x12c6f9>=0x0&&(_0x1b2721['setDebuffTurns'](_0x12c6f9,_0x23261d),this[_0x3537ba(0x39f)](_0x265702));}}else return this['textColor'](Number(_0x156850));},ColorManager[_0x56d65d(0x3f9)]=function(_0x5177f8){const _0x281e19=_0x56d65d;if(typeof _0x5177f8===_0x281e19(0x2f0))_0x5177f8=$dataStates[_0x5177f8];const _0x297c83='_stored_state-%1-color'[_0x281e19(0x19c)](_0x5177f8['id']);this[_0x281e19(0x253)]=this[_0x281e19(0x253)]||{};if(this[_0x281e19(0x253)][_0x297c83])return this['_colorCache'][_0x297c83];const _0x2bf75e=this[_0x281e19(0x1c8)](_0x5177f8);return this[_0x281e19(0x472)](_0x297c83,_0x2bf75e);},ColorManager['retrieveStateColor']=function(_0x17a1ae){const _0xedfe6c=_0x56d65d,_0x40b037=_0x17a1ae['note'];if(_0x40b037['match'](/<TURN COLOR:[ ](.*)>/i)){if(_0xedfe6c(0x477)==='SkVOM')return String(RegExp['$1']);else{const _0x2c05cf=_0x2f3805[_0xedfe6c(0x442)](_0x123227);this[_0xedfe6c(0x1e3)][_0x5f2ce9]=_0x1a871d[_0xedfe6c(0x483)](0x0,_0x2c05cf);if(this[_0xedfe6c(0x1e3)][_0x26f3fa]<=0x0)this['removeState'](_0x28c10b);}}else{if(_0x40b037['match'](/<POSITIVE STATE>/i)){if(_0xedfe6c(0x246)==='AAelY')return VisuMZ[_0xedfe6c(0x453)][_0xedfe6c(0x433)][_0xedfe6c(0x281)][_0xedfe6c(0x25f)];else this[_0xedfe6c(0x4b7)](_0x454ae3),this[_0xedfe6c(0x4e0)](_0x1511ef),this[_0xedfe6c(0x476)](_0x55b95c),this[_0xedfe6c(0x35d)](_0x5a6500);}else return _0x40b037[_0xedfe6c(0x287)](/<NEGATIVE STATE>/i)?VisuMZ[_0xedfe6c(0x453)][_0xedfe6c(0x433)][_0xedfe6c(0x281)][_0xedfe6c(0x2b8)]:VisuMZ[_0xedfe6c(0x453)][_0xedfe6c(0x433)][_0xedfe6c(0x281)][_0xedfe6c(0x235)];}},ColorManager[_0x56d65d(0x4bf)]=function(){const _0x13be40=_0x56d65d,_0xc3ef27=_0x13be40(0x2d5);this[_0x13be40(0x253)]=this[_0x13be40(0x253)]||{};if(this[_0x13be40(0x253)][_0xc3ef27])return this['_colorCache'][_0xc3ef27];const _0x4b083f=VisuMZ[_0x13be40(0x453)][_0x13be40(0x433)][_0x13be40(0x33b)][_0x13be40(0x344)];return this['getColorDataFromPluginParameters'](_0xc3ef27,_0x4b083f);},ColorManager[_0x56d65d(0x2b4)]=function(){const _0x495923=_0x56d65d,_0x2ca242=_0x495923(0x245);this[_0x495923(0x253)]=this[_0x495923(0x253)]||{};if(this[_0x495923(0x253)][_0x2ca242])return this[_0x495923(0x253)][_0x2ca242];const _0x3a17ca=VisuMZ[_0x495923(0x453)][_0x495923(0x433)][_0x495923(0x33b)][_0x495923(0x1fd)];return this[_0x495923(0x472)](_0x2ca242,_0x3a17ca);},SceneManager[_0x56d65d(0x2b5)]=function(){const _0x40389d=_0x56d65d;return this[_0x40389d(0x3fe)]&&this[_0x40389d(0x3fe)][_0x40389d(0x46c)]===Scene_Battle;},VisuMZ['SkillsStatesCore'][_0x56d65d(0x45f)]=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x4c154e=_0x56d65d;this[_0x4c154e(0x337)](),VisuMZ['SkillsStatesCore'][_0x4c154e(0x45f)][_0x4c154e(0x237)](this);},BattleManager[_0x56d65d(0x337)]=function(){const _0x1ac754=_0x56d65d,_0x2b6d3a=VisuMZ[_0x1ac754(0x453)][_0x1ac754(0x433)][_0x1ac754(0x281)];if(!_0x2b6d3a)return;if(_0x2b6d3a[_0x1ac754(0x42c)]===![])return;if(!this[_0x1ac754(0x3ad)])return;this['_subject'][_0x1ac754(0x337)]();},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x337)]=function(){const _0x390aa8=_0x56d65d;if(BattleManager['_phase']!==_0x390aa8(0x232))return;if(this['_lastStatesActionEndFrameCount']===Graphics[_0x390aa8(0x2f3)])return;this[_0x390aa8(0x3e2)]=Graphics[_0x390aa8(0x2f3)];for(const _0x23957c of this['_states']){const _0x4b6a2c=$dataStates[_0x23957c];if(!_0x4b6a2c)continue;if(_0x4b6a2c[_0x390aa8(0x353)]!==0x1)continue;this[_0x390aa8(0x1e3)][_0x23957c]>0x0&&this[_0x390aa8(0x1e3)][_0x23957c]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x37b)]=function(){const _0x4adec0=_0x56d65d,_0x16bded=VisuMZ[_0x4adec0(0x453)]['Settings'][_0x4adec0(0x281)];for(const _0x4fd05a of this[_0x4adec0(0x327)]){const _0x525185=$dataStates[_0x4fd05a];if(_0x16bded&&_0x16bded[_0x4adec0(0x42c)]!==![]){if(_0x4adec0(0x455)===_0x4adec0(0x2e2))return _0x372c85-_0x54e5d2;else{if(_0x525185&&_0x525185[_0x4adec0(0x353)]===0x1)continue;}}this[_0x4adec0(0x1e3)][_0x4fd05a]>0x0&&this['_stateTurns'][_0x4fd05a]--;}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x24c)]=Game_Switches[_0x56d65d(0x317)][_0x56d65d(0x403)],Game_Switches['prototype']['onChange']=function(){const _0x152fec=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x152fec(0x24c)][_0x152fec(0x237)](this);const _0x5f151d=VisuMZ[_0x152fec(0x453)][_0x152fec(0x433)][_0x152fec(0x3a5)]['RefreshCacheSwitch']??!![];if(!_0x5f151d)return;if(SceneManager[_0x152fec(0x2b5)]())for(const _0x4472ab of BattleManager['allBattleMembers']()){if(_0x4472ab)_0x4472ab[_0x152fec(0x4a0)]();}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x484)]=Game_Variables[_0x56d65d(0x317)][_0x56d65d(0x403)],Game_Variables['prototype'][_0x56d65d(0x403)]=function(){const _0x5998c4=_0x56d65d;VisuMZ[_0x5998c4(0x453)][_0x5998c4(0x484)][_0x5998c4(0x237)](this);const _0x154935=VisuMZ[_0x5998c4(0x453)][_0x5998c4(0x433)][_0x5998c4(0x3a5)][_0x5998c4(0x3bb)]??!![];if(!_0x154935)return;if(SceneManager[_0x5998c4(0x2b5)]()){if('OplhZ'==='Vovmz')for(const _0x4a125f of _0x1a1f47){_0x4a125f[_0x5998c4(0x287)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x510733=_0x4caaa9['indexOf'](_0x48ef0d(_0x152137['$1'])[_0x5998c4(0x4a5)]()),_0x2ba953=_0x30fec4(_0x36e618['$2']);_0x510733>=0x0&&(_0xebb010[_0x5998c4(0x3d1)](_0x510733,_0x2ba953),this[_0x5998c4(0x39f)](_0x1b5342));}else for(const _0x5df443 of BattleManager['allBattleMembers']()){if(_0x5df443)_0x5df443[_0x5998c4(0x4a0)]();}}},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x2cf)]=Game_Action['prototype'][_0x56d65d(0x258)],Game_Action[_0x56d65d(0x317)][_0x56d65d(0x258)]=function(_0x1e6155){const _0x246001=_0x56d65d;VisuMZ[_0x246001(0x453)][_0x246001(0x2cf)][_0x246001(0x237)](this,_0x1e6155),this[_0x246001(0x1cc)](_0x1e6155);},Game_Action[_0x56d65d(0x317)]['applySkillsStatesCoreEffects']=function(_0x40fe2c){const _0x436edb=_0x56d65d;this[_0x436edb(0x4b7)](_0x40fe2c),this[_0x436edb(0x4e0)](_0x40fe2c),this['applyBuffTurnManipulationEffects'](_0x40fe2c),this[_0x436edb(0x35d)](_0x40fe2c);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x411)]=Game_Action[_0x56d65d(0x317)][_0x56d65d(0x319)],Game_Action[_0x56d65d(0x317)][_0x56d65d(0x319)]=function(_0x203ae2){const _0xf4fa07=_0x56d65d;if(this[_0xf4fa07(0x418)](_0x203ae2)){if(_0xf4fa07(0x1fb)!==_0xf4fa07(0x1fb))_0x397f2b['width']-=this[_0xf4fa07(0x1b2)]();else return!![];}return VisuMZ[_0xf4fa07(0x453)][_0xf4fa07(0x411)][_0xf4fa07(0x237)](this,_0x203ae2);},Game_Action[_0x56d65d(0x317)][_0x56d65d(0x418)]=function(_0x506f50){const _0x115b8b=_0x56d65d;if(!this[_0x115b8b(0x4dd)]())return;const _0x359c12=this[_0x115b8b(0x4dd)]()[_0x115b8b(0x21b)];if(_0x359c12[_0x115b8b(0x287)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x372198=String(RegExp['$1']);if(_0x506f50[_0x115b8b(0x3de)](_0x372198))return!![];}if(_0x359c12['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x1eecc8=Number(RegExp['$1']);if(_0x506f50[_0x115b8b(0x32a)](_0x1eecc8))return!![];}else{if(_0x359c12[_0x115b8b(0x287)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x2a59cb=DataManager[_0x115b8b(0x4aa)](RegExp['$1']);if(_0x506f50[_0x115b8b(0x32a)](_0x2a59cb))return!![];}}return![];},Game_Action[_0x56d65d(0x317)][_0x56d65d(0x4b7)]=function(_0x326a7a){const _0x3322d0=_0x56d65d;if(_0x326a7a[_0x3322d0(0x324)]()[_0x3322d0(0x37d)]<=0x0)return;const _0x578d5f=this[_0x3322d0(0x4dd)]()[_0x3322d0(0x21b)];{if(_0x3322d0(0x28b)===_0x3322d0(0x28b)){const _0x3577d5=_0x578d5f[_0x3322d0(0x287)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x3577d5){if(_0x3322d0(0x35c)==='FnoRg')for(const _0x66c103 of _0x3577d5){_0x66c103['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x3a210c=String(RegExp['$1']);_0x326a7a['removeStatesByCategoryAll'](_0x3a210c);}else{let _0x917c83=[this[_0x3322d0(0x398)]()];return _0x917c83[_0x3322d0(0x4e3)](this[_0x3322d0(0x2f4)]());}}}else _0x32981f[_0x3322d0(0x3a1)]=_0x41d8b1(_0xd26c8['$1'])[_0x3322d0(0x18f)](',')[_0x3322d0(0x231)](_0x273f83=>_0x2ed110(_0x273f83));}{if(_0x3322d0(0x490)!==_0x3322d0(0x490))this[_0x3322d0(0x20b)]=!![],this['_cache'][_0x3322d0(0x3c2)]=[],this[_0x3322d0(0x190)](),this[_0x3322d0(0x426)](),this['addPassiveStatesByPluginParameters'](),this[_0x3322d0(0x3af)][_0x3322d0(0x3c2)]=this['_cache']['passiveStates'][_0x3322d0(0x397)]((_0x52ae0a,_0x400b0f)=>_0x52ae0a-_0x400b0f),this[_0x3322d0(0x20b)]=_0x194058;else{const _0x384e8f=_0x578d5f[_0x3322d0(0x287)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x384e8f){if(_0x3322d0(0x481)!==_0x3322d0(0x481)){const _0x5c76d5=_0x1efe6c[_0x542d3c];if(_0x5c76d5)_0x2b47af[_0x3322d0(0x48b)](_0x5c76d5);}else for(const _0x2aca47 of _0x384e8f){_0x2aca47['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5ef8f4=String(RegExp['$1']),_0x3fe499=Number(RegExp['$2']);_0x326a7a[_0x3322d0(0x257)](_0x5ef8f4,_0x3fe499);}}}}},Game_Action['prototype'][_0x56d65d(0x4e0)]=function(_0x207dd5){const _0x1bb73a=_0x56d65d,_0xba4c47=this[_0x1bb73a(0x4dd)]()[_0x1bb73a(0x21b)],_0x37d35b=_0xba4c47[_0x1bb73a(0x287)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x37d35b)for(const _0x1878fc of _0x37d35b){if(_0x1bb73a(0x457)===_0x1bb73a(0x44f))_0x513e16+=this['stateTurns'](_0x1cce8b),this['setStateTurns'](_0x27a71d,_0x44630e);else{let _0x57ad2f=0x0,_0xe0b2c0=0x0;if(_0x1878fc[_0x1bb73a(0x287)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x1bb73a(0x33a)===_0x1bb73a(0x33a))_0x57ad2f=Number(RegExp['$1']),_0xe0b2c0=Number(RegExp['$2']);else{const _0x30df46=this['itemLineRect'](_0x5eb52d),_0x15ad8f=this[_0x1bb73a(0x4a2)](_0xe56143),_0x4ab979=this[_0x1bb73a(0x4a3)](_0x15ad8f)['width'];this[_0x1bb73a(0x30b)](this[_0x1bb73a(0x20f)](_0xb6b07a));const _0x3eb79a=this[_0x1bb73a(0x249)]();if(_0x3eb79a===_0x1bb73a(0x45a))this['drawTextEx'](_0x15ad8f,_0x30df46['x']+_0x30df46[_0x1bb73a(0x293)]-_0x4ab979,_0x30df46['y'],_0x4ab979);else{if(_0x3eb79a===_0x1bb73a(0x333)){const _0x4a8981=_0x30df46['x']+_0x10bf72[_0x1bb73a(0x382)]((_0x30df46[_0x1bb73a(0x293)]-_0x4ab979)/0x2);this[_0x1bb73a(0x275)](_0x15ad8f,_0x4a8981,_0x30df46['y'],_0x4ab979);}else this['drawTextEx'](_0x15ad8f,_0x30df46['x'],_0x30df46['y'],_0x4ab979);}}}else _0x1878fc[_0x1bb73a(0x287)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x57ad2f=DataManager[_0x1bb73a(0x4aa)](RegExp['$1']),_0xe0b2c0=Number(RegExp['$2']));_0x207dd5[_0x1bb73a(0x18d)](_0x57ad2f,_0xe0b2c0),this['makeSuccess'](_0x207dd5);}}const _0x7381f1=_0xba4c47[_0x1bb73a(0x287)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x7381f1)for(const _0x387973 of _0x7381f1){let _0x3ad9d2=0x0,_0x1bc254=0x0;if(_0x387973['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x1bb73a(0x46d)===_0x1bb73a(0x2a9))return this[_0x1bb73a(0x475)]&&this['_costSettings']?this[_0x1bb73a(0x31b)]():_0xefe185['SkillsStatesCore'][_0x1bb73a(0x470)][_0x1bb73a(0x237)](this);else _0x3ad9d2=Number(RegExp['$1']),_0x1bc254=Number(RegExp['$2']);}else _0x387973['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x3ad9d2=DataManager[_0x1bb73a(0x4aa)](RegExp['$1']),_0x1bc254=Number(RegExp['$2']));_0x207dd5[_0x1bb73a(0x36d)](_0x3ad9d2,_0x1bc254),this['makeSuccess'](_0x207dd5);}},Game_Action[_0x56d65d(0x317)]['applyBuffTurnManipulationEffects']=function(_0x1cd073){const _0x331569=_0x56d65d,_0x2ecfe4=['MAXHP','MAXMP',_0x331569(0x493),'DEF',_0x331569(0x2d2),_0x331569(0x29e),'AGI',_0x331569(0x297)],_0x356716=this[_0x331569(0x4dd)]()[_0x331569(0x21b)],_0x1d340b=_0x356716[_0x331569(0x287)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x1d340b){if(_0x331569(0x27a)!=='cFMKe')this[_0x331569(0x37c)]='';else for(const _0x2e7410 of _0x1d340b){_0x2e7410['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x4e5c37=_0x2ecfe4[_0x331569(0x1be)](String(RegExp['$1'])['toUpperCase']()),_0x2c3493=Number(RegExp['$2']);if(_0x4e5c37>=0x0){if('TJuUm'!==_0x331569(0x294))_0x1cd073['setBuffTurns'](_0x4e5c37,_0x2c3493),this['makeSuccess'](_0x1cd073);else{if(!_0x4668d6[_0x331569(0x453)][_0x331569(0x433)][_0x331569(0x33b)][_0x331569(0x4eb)])return;const _0x2e5381=_0x262f97[_0x331569(0x24d)](_0x120758),_0x1c6d37=_0xd4eab6[_0x331569(0x212)](_0x122215),_0x20fd24=_0x564f1e[_0x331569(0x49b)],_0x12e577=_0x17aa0c[_0x331569(0x3b6)]/0x2,_0x55ca26=_0x1c6d37>0x0?_0x673334[_0x331569(0x4bf)]():_0x24bca5[_0x331569(0x2b4)]();this[_0x331569(0x1a1)](_0x55ca26),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x331569(0x4cd)][_0x331569(0x1e1)]=!![],this['contents'][_0x331569(0x1f8)]=_0x5de2a9['SkillsStatesCore'][_0x331569(0x433)][_0x331569(0x33b)][_0x331569(0x480)],_0x27a1fd+=_0xfc8225[_0x331569(0x453)][_0x331569(0x433)][_0x331569(0x33b)]['DataOffsetX'],_0x312ff4+=_0x1682ce[_0x331569(0x453)][_0x331569(0x433)][_0x331569(0x33b)][_0x331569(0x492)];const _0x255e72=_0x331569(0x276)['format'](_0x186cd7[_0x331569(0x3f1)](_0x2e5381*0x64));this[_0x331569(0x3e9)](_0x255e72,_0x1fb0fe,_0x47fa35,_0x20fd24,'center'),this[_0x331569(0x4cd)][_0x331569(0x1e1)]=![],this['resetFontSettings']();}}}}const _0x35cb1c=_0x356716[_0x331569(0x287)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x35cb1c)for(const _0x4af2b9 of _0x1d340b){_0x4af2b9['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x278c35=_0x2ecfe4[_0x331569(0x1be)](String(RegExp['$1'])[_0x331569(0x4a5)]()),_0x4b481b=Number(RegExp['$2']);_0x278c35>=0x0&&(_0x331569(0x48a)===_0x331569(0x3d5)?(_0x13dbb0=_0x1ea400,_0x377483+=_0x61ef5c):(_0x1cd073[_0x331569(0x3d1)](_0x278c35,_0x4b481b),this[_0x331569(0x39f)](_0x1cd073)));}},Game_Action[_0x56d65d(0x317)][_0x56d65d(0x35d)]=function(_0x434fc3){const _0x390334=_0x56d65d,_0x398136=[_0x390334(0x1fe),_0x390334(0x3d9),_0x390334(0x493),_0x390334(0x355),_0x390334(0x2d2),_0x390334(0x29e),_0x390334(0x1bb),_0x390334(0x297)],_0x1b5742=this[_0x390334(0x4dd)]()['note'],_0x5a4e5c=_0x1b5742[_0x390334(0x287)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5a4e5c)for(const _0x44217b of _0x5a4e5c){if(_0x390334(0x2d4)===_0x390334(0x2d4)){_0x44217b[_0x390334(0x287)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x1dad7d=_0x398136[_0x390334(0x1be)](String(RegExp['$1'])['toUpperCase']()),_0x4f3679=Number(RegExp['$2']);_0x1dad7d>=0x0&&(_0x434fc3['setDebuffTurns'](_0x1dad7d,_0x4f3679),this[_0x390334(0x39f)](_0x434fc3));}else return _0x30fb0e[_0x390334(0x1ef)]();}const _0x2b2f7d=_0x1b5742[_0x390334(0x287)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2b2f7d)for(const _0x3b84e5 of _0x5a4e5c){_0x3b84e5[_0x390334(0x287)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x30f1a2=_0x398136[_0x390334(0x1be)](String(RegExp['$1'])['toUpperCase']()),_0x43923e=Number(RegExp['$2']);_0x30f1a2>=0x0&&(_0x434fc3[_0x390334(0x4d0)](_0x30f1a2,_0x43923e),this[_0x390334(0x39f)](_0x434fc3));}},VisuMZ[_0x56d65d(0x453)]['Game_BattlerBase_initMembers']=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x43b)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x43b)]=function(){const _0x85897b=_0x56d65d;this['_cache']={},this[_0x85897b(0x1af)](),VisuMZ[_0x85897b(0x453)][_0x85897b(0x199)][_0x85897b(0x237)](this);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x1af)]=function(){const _0x254737=_0x56d65d;this['_stateRetainType']='',this[_0x254737(0x482)]={},this[_0x254737(0x2c6)]={},this['_stateOrigin']={};},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x2ad)]=function(_0x1a578f){const _0x379ac9=_0x56d65d;return this[_0x379ac9(0x3af)]=this[_0x379ac9(0x3af)]||{},this['_cache'][_0x1a578f]!==undefined;},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x394)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4a0)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4a0)]=function(){const _0x193bcd=_0x56d65d;this[_0x193bcd(0x3af)]={},VisuMZ['SkillsStatesCore'][_0x193bcd(0x394)]['call'](this);},VisuMZ['SkillsStatesCore'][_0x56d65d(0x1eb)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x250)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x250)]=function(_0x2fce25){const _0x4ca786=_0x56d65d;let _0x55c581=this[_0x4ca786(0x32a)](_0x2fce25);VisuMZ['SkillsStatesCore'][_0x4ca786(0x1eb)]['call'](this,_0x2fce25);if(_0x55c581&&!this['isStateAffected'](_0x2fce25))this[_0x4ca786(0x43c)](_0x2fce25);},Game_BattlerBase[_0x56d65d(0x317)]['onRemoveState']=function(_0x2c7a37){const _0xc1689=_0x56d65d;this['clearStateData'](_0x2c7a37),this[_0xc1689(0x2fa)](_0x2c7a37);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1c6)]=Game_Battler['prototype'][_0x56d65d(0x282)],Game_Battler[_0x56d65d(0x317)]['onBattleEnd']=function(){const _0xd0924=_0x56d65d;VisuMZ[_0xd0924(0x453)][_0xd0924(0x1c6)]['call'](this),this['clearAllStateOrigins']();},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x3ee)]=Game_BattlerBase['prototype'][_0x56d65d(0x360)],Game_BattlerBase[_0x56d65d(0x317)]['resetStateCounts']=function(_0xc311af){const _0x2a3543=_0x56d65d,_0x801790=$dataStates[_0xc311af],_0x50709f=this[_0x2a3543(0x435)](_0xc311af),_0x15462d=this[_0x2a3543(0x33c)](_0x801790)['toLowerCase']()[_0x2a3543(0x3ec)]();switch(_0x15462d){case _0x2a3543(0x1b6):if(_0x50709f<=0x0)this[_0x2a3543(0x225)](_0xc311af);break;case'reset':this[_0x2a3543(0x225)](_0xc311af);break;case _0x2a3543(0x2fb):this[_0x2a3543(0x225)](_0xc311af),this[_0x2a3543(0x1e3)][_0xc311af]=Math[_0x2a3543(0x4a1)](this[_0x2a3543(0x1e3)][_0xc311af],_0x50709f);break;case _0x2a3543(0x4ae):this['prepareResetStateCounts'](_0xc311af),this['_stateTurns'][_0xc311af]+=_0x50709f;break;default:this[_0x2a3543(0x225)](_0xc311af);break;}if(this[_0x2a3543(0x32a)](_0xc311af)){if('AGKzH'!==_0x2a3543(0x20e))_0x41d48a[_0x2a3543(0x453)]['Settings'][_0x2a3543(0x281)][_0x2a3543(0x47f)]['call'](this,_0x4374ca);else{const _0x4e01c2=DataManager['stateMaximumTurns'](_0xc311af);this[_0x2a3543(0x1e3)][_0xc311af]=this[_0x2a3543(0x1e3)][_0xc311af]['clamp'](0x0,_0x4e01c2);}}},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x225)]=function(_0x38f941){const _0xb11410=_0x56d65d;VisuMZ[_0xb11410(0x453)]['Game_BattlerBase_resetStateCounts'][_0xb11410(0x237)](this,_0x38f941);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x33c)]=function(_0x18ca63){const _0x47bfe7=_0x56d65d,_0x40fef0=_0x18ca63['note'];if(_0x40fef0['match'](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x47bfe7(0x4f2)!=='YRmsn'){if(typeof _0x24d042!==_0x47bfe7(0x2f0))_0x49a82e=_0x1437ee['id'];this[_0x47bfe7(0x32a)](_0x2a9885)&&(_0x4b3fd0+=this[_0x47bfe7(0x435)](_0xbc70c3),this[_0x47bfe7(0x18d)](_0x5e27a4,_0x1272d2));}else return VisuMZ[_0x47bfe7(0x453)][_0x47bfe7(0x433)][_0x47bfe7(0x281)]['ReapplyRules'];}},VisuMZ[_0x56d65d(0x453)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x56d65d(0x317)]['overwriteBuffTurns'],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x485)]=function(_0x145080,_0x5e2765){const _0x1cefba=_0x56d65d,_0x49d266=VisuMZ['SkillsStatesCore'][_0x1cefba(0x433)]['Buffs'][_0x1cefba(0x3bc)],_0x508593=this['buffTurns'](_0x145080);switch(_0x49d266){case _0x1cefba(0x1b6):if(_0x508593<=0x0)this['_buffTurns'][_0x145080]=_0x5e2765;break;case _0x1cefba(0x321):this[_0x1cefba(0x3dd)][_0x145080]=_0x5e2765;break;case _0x1cefba(0x2fb):this[_0x1cefba(0x3dd)][_0x145080]=Math[_0x1cefba(0x4a1)](_0x508593,_0x5e2765);break;case'add':this[_0x1cefba(0x3dd)][_0x145080]+=_0x5e2765;break;default:VisuMZ['SkillsStatesCore'][_0x1cefba(0x49e)][_0x1cefba(0x237)](this,_0x145080,_0x5e2765);break;}const _0x1f12f0=VisuMZ[_0x1cefba(0x453)][_0x1cefba(0x433)][_0x1cefba(0x33b)]['MaxTurns'];this[_0x1cefba(0x3dd)][_0x145080]=this['_buffTurns'][_0x145080][_0x1cefba(0x483)](0x0,_0x1f12f0);},Game_BattlerBase['prototype'][_0x56d65d(0x4bd)]=function(){const _0x9fafba=_0x56d65d;if(this[_0x9fafba(0x3af)]['groupDefeat']!==undefined)return this[_0x9fafba(0x3af)][_0x9fafba(0x22c)];this[_0x9fafba(0x3af)]['groupDefeat']=![];const _0x196d2b=this[_0x9fafba(0x324)]();for(const _0x16e512 of _0x196d2b){if('SGwHs'!==_0x9fafba(0x3aa)){if(!_0x16e512)continue;if(_0x16e512[_0x9fafba(0x21b)]['match'](/<GROUP DEFEAT>/i)){this[_0x9fafba(0x3af)][_0x9fafba(0x22c)]=!![];break;}}else this[_0x9fafba(0x3cf)](_0x4f490c);}return this[_0x9fafba(0x3af)][_0x9fafba(0x22c)];},VisuMZ[_0x56d65d(0x453)]['Game_Unit_deadMembers']=Game_Unit['prototype'][_0x56d65d(0x2fd)],Game_Unit[_0x56d65d(0x317)]['deadMembers']=function(){const _0x3ae2b1=_0x56d65d;let _0x2816ad=VisuMZ[_0x3ae2b1(0x453)]['Game_Unit_deadMembers'][_0x3ae2b1(0x237)](this);return BattleManager[_0x3ae2b1(0x345)]&&(_0x3ae2b1(0x1cd)!==_0x3ae2b1(0x1cd)?(this['_stateSteps']=this[_0x3ae2b1(0x19f)]||{},_0xc2791f['prototype'][_0x3ae2b1(0x361)]['call'](this)):_0x2816ad=_0x2816ad['concat'](this['members']()['filter'](_0x30f08d=>_0x30f08d[_0x3ae2b1(0x4bd)]()))),_0x2816ad;},VisuMZ['SkillsStatesCore'][_0x56d65d(0x4dc)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x361)],Game_BattlerBase['prototype'][_0x56d65d(0x361)]=function(){const _0x479aab=_0x56d65d;this[_0x479aab(0x3ac)]()!==''?this[_0x479aab(0x1b4)]():(VisuMZ[_0x479aab(0x453)]['Game_BattlerBase_clearStates'][_0x479aab(0x237)](this),this[_0x479aab(0x1af)]());},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x361)]=function(){const _0x45f2bb=_0x56d65d;this[_0x45f2bb(0x19f)]=this[_0x45f2bb(0x19f)]||{},Game_Battler[_0x45f2bb(0x317)][_0x45f2bb(0x361)][_0x45f2bb(0x237)](this);},Game_BattlerBase['prototype'][_0x56d65d(0x1b4)]=function(){const _0xdeaf5b=_0x56d65d,_0x54e957=this[_0xdeaf5b(0x324)]();for(const _0x541da3 of _0x54e957){if(_0xdeaf5b(0x2da)===_0xdeaf5b(0x2da)){if(_0x541da3&&this['canClearState'](_0x541da3))this[_0xdeaf5b(0x250)](_0x541da3['id']);}else _0x5ba5e8=_0xe94068[_0xdeaf5b(0x1da)](_0x124284);}this[_0xdeaf5b(0x3af)]={};},Game_BattlerBase[_0x56d65d(0x317)]['canClearState']=function(_0x4c4bae){const _0x19e4ee=_0x56d65d,_0x39d66c=this[_0x19e4ee(0x3ac)]();if(_0x39d66c!==''){const _0x155980=_0x4c4bae[_0x19e4ee(0x21b)];if(_0x39d66c==='death'&&_0x155980[_0x19e4ee(0x287)](/<NO DEATH CLEAR>/i))return![];if(_0x39d66c===_0x19e4ee(0x4da)&&_0x155980[_0x19e4ee(0x287)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x19e4ee(0x32a)](_0x4c4bae['id']);},Game_BattlerBase[_0x56d65d(0x317)]['getStateRetainType']=function(){const _0x2ba46c=_0x56d65d;return this[_0x2ba46c(0x37c)];},Game_BattlerBase[_0x56d65d(0x317)]['setStateRetainType']=function(_0x5f58f8){const _0x54cc24=_0x56d65d;this[_0x54cc24(0x37c)]=_0x5f58f8;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4bb)]=function(){this['_stateRetainType']='';},VisuMZ['SkillsStatesCore'][_0x56d65d(0x3fb)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3c5)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3c5)]=function(){const _0x6142ce=_0x56d65d;this[_0x6142ce(0x2cd)]('death'),VisuMZ[_0x6142ce(0x453)][_0x6142ce(0x3fb)]['call'](this),this[_0x6142ce(0x4bb)]();},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x4b3)]=Game_BattlerBase['prototype'][_0x56d65d(0x24a)],Game_BattlerBase[_0x56d65d(0x317)]['recoverAll']=function(){const _0x3758a1=_0x56d65d;this[_0x3758a1(0x2cd)](_0x3758a1(0x4da)),VisuMZ[_0x3758a1(0x453)][_0x3758a1(0x4b3)]['call'](this),this[_0x3758a1(0x4bb)]();},Game_BattlerBase['prototype']['adjustSkillCost']=function(_0x4c5c21,_0x281dc3,_0x6ef3cd){return _0x281dc3;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x47d)]=function(_0x586569){const _0x165d2d=_0x56d65d;for(settings of VisuMZ['SkillsStatesCore']['Settings']['Costs']){let _0x26b575=settings[_0x165d2d(0x3e8)][_0x165d2d(0x237)](this,_0x586569);_0x26b575=this['adjustSkillCost'](_0x586569,_0x26b575,settings);if(!settings[_0x165d2d(0x220)][_0x165d2d(0x237)](this,_0x586569,_0x26b575))return![];}return!![];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x2f9)]=function(_0x1de10d){const _0x5d57c4=_0x56d65d;for(settings of VisuMZ[_0x5d57c4(0x453)][_0x5d57c4(0x433)][_0x5d57c4(0x1aa)]){let _0x31ec05=settings[_0x5d57c4(0x3e8)][_0x5d57c4(0x237)](this,_0x1de10d);_0x31ec05=this[_0x5d57c4(0x24b)](_0x1de10d,_0x31ec05,settings),settings[_0x5d57c4(0x340)][_0x5d57c4(0x237)](this,_0x1de10d,_0x31ec05);}},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x4d1)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x219)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x219)]=function(_0x47fe92){const _0x20d334=_0x56d65d;if(!_0x47fe92)return![];if(!VisuMZ[_0x20d334(0x453)]['Game_BattlerBase_meetsSkillConditions'][_0x20d334(0x237)](this,_0x47fe92))return![];if(!this['checkSkillConditionsNotetags'](_0x47fe92))return![];if(!this[_0x20d334(0x488)](_0x47fe92))return![];if(!this[_0x20d334(0x3f7)](_0x47fe92))return![];return!![];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x326)]=function(_0x11d99b){if(!this['checkSkillConditionsSwitchNotetags'](_0x11d99b))return![];return!![];},Game_BattlerBase['prototype']['checkSkillConditionsSwitchNotetags']=function(_0x6aaa9e){const _0x2bab4a=_0x56d65d,_0x39d4f5=_0x6aaa9e[_0x2bab4a(0x21b)];if(_0x39d4f5['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x42be3f=JSON[_0x2bab4a(0x2ed)]('['+RegExp['$1'][_0x2bab4a(0x287)](/\d+/g)+']');for(const _0x47f395 of _0x42be3f){if(!$gameSwitches[_0x2bab4a(0x48f)](_0x47f395))return![];}return!![];}if(_0x39d4f5[_0x2bab4a(0x287)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e2ead=JSON[_0x2bab4a(0x2ed)]('['+RegExp['$1'][_0x2bab4a(0x287)](/\d+/g)+']');for(const _0x7100df of _0x3e2ead){if(!$gameSwitches[_0x2bab4a(0x48f)](_0x7100df))return![];}return!![];}if(_0x39d4f5[_0x2bab4a(0x287)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x393e57=JSON[_0x2bab4a(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x192dc3 of _0x393e57){if(_0x2bab4a(0x266)!==_0x2bab4a(0x266)){const _0x31d3f2=this['aliveMembers']();for(const _0x4353c1 of _0x31d3f2){if(!_0x4353c1[_0x2bab4a(0x4bd)]())return![];}return!![];}else{if($gameSwitches[_0x2bab4a(0x48f)](_0x192dc3))return!![];}}return![];}if(_0x39d4f5[_0x2bab4a(0x287)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x259046=JSON[_0x2bab4a(0x2ed)]('['+RegExp['$1'][_0x2bab4a(0x287)](/\d+/g)+']');for(const _0x4147a0 of _0x259046){if(_0x2bab4a(0x414)!==_0x2bab4a(0x414))this['removeState'](_0x175cad[_0x2bab4a(0x4c4)]());else{if(!$gameSwitches['value'](_0x4147a0))return!![];}}return![];}if(_0x39d4f5[_0x2bab4a(0x287)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29700f=JSON['parse']('['+RegExp['$1'][_0x2bab4a(0x287)](/\d+/g)+']');for(const _0x4a897a of _0x29700f){if(_0x2bab4a(0x234)==='ntbwV')_0x18eb71=_0xae6ba7(_0x107934['$1']),_0x523c7f=_0x47d4bf(_0x4b4a66['$2']);else{if(!$gameSwitches[_0x2bab4a(0x48f)](_0x4a897a))return!![];}}return![];}if(_0x39d4f5['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x7de16d=JSON[_0x2bab4a(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x321de5 of _0x7de16d){if($gameSwitches['value'](_0x321de5))return![];}return!![];}return!![];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x488)]=function(_0x774d8f){const _0x476cae=_0x56d65d,_0x1736a9=_0x774d8f[_0x476cae(0x21b)],_0x72adbe=VisuMZ['SkillsStatesCore'][_0x476cae(0x364)];return _0x72adbe[_0x774d8f['id']]?_0x72adbe[_0x774d8f['id']]['call'](this,_0x774d8f):!![];},Game_BattlerBase[_0x56d65d(0x317)]['meetsSkillConditionsGlobalJS']=function(_0x5e80dc){const _0x1c2aea=_0x56d65d;return VisuMZ[_0x1c2aea(0x453)]['Settings'][_0x1c2aea(0x489)][_0x1c2aea(0x44a)][_0x1c2aea(0x237)](this,_0x5e80dc);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x228)]=Game_BattlerBase['prototype'][_0x56d65d(0x223)],Game_BattlerBase['prototype'][_0x56d65d(0x223)]=function(_0x58f0a0){const _0x20fd80=_0x56d65d;for(settings of VisuMZ[_0x20fd80(0x453)][_0x20fd80(0x433)][_0x20fd80(0x1aa)]){if(_0x20fd80(0x1db)===_0x20fd80(0x3bf))_0x232bbc[_0x20fd80(0x300)](_0x52b6d9);else{if(settings[_0x20fd80(0x2a8)][_0x20fd80(0x4a5)]()==='MP'){if(_0x20fd80(0x3fa)===_0x20fd80(0x21a)){if(!_0x4464dd[_0x20fd80(0x48f)](_0x22e157))return![];}else{let _0x1ddc93=settings[_0x20fd80(0x3e8)]['call'](this,_0x58f0a0);return _0x1ddc93=this['adjustSkillCost'](_0x58f0a0,_0x1ddc93,settings),_0x1ddc93;}}}}return VisuMZ[_0x20fd80(0x453)][_0x20fd80(0x228)][_0x20fd80(0x237)](this,_0x58f0a0);},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2de)]=Game_BattlerBase['prototype'][_0x56d65d(0x371)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x371)]=function(_0x31e030){const _0x3af433=_0x56d65d;for(settings of VisuMZ['SkillsStatesCore'][_0x3af433(0x433)][_0x3af433(0x1aa)]){if(_0x3af433(0x432)!=='UPMxG'){if(settings[_0x3af433(0x2a8)][_0x3af433(0x4a5)]()==='TP'){let _0x536d6b=settings['CalcJS'][_0x3af433(0x237)](this,_0x31e030);return _0x536d6b=this['adjustSkillCost'](_0x31e030,_0x536d6b,settings),_0x536d6b;}}else{const _0x4da5dc=_0x455e55[_0x3af433(0x2ed)]('['+_0x218e40['$1'][_0x3af433(0x287)](/\d+/g)+']');for(const _0x20223e of _0x4da5dc){if(_0x2226ee['value'](_0x20223e))return![];}return!![];}}return VisuMZ[_0x3af433(0x453)][_0x3af433(0x2de)][_0x3af433(0x237)](this,_0x31e030);},Game_BattlerBase[_0x56d65d(0x317)]['hasState']=function(_0x18b29b){const _0x154595=_0x56d65d;if(typeof _0x18b29b===_0x154595(0x2f0))_0x18b29b=$dataStates[_0x18b29b];return this['states']()[_0x154595(0x233)](_0x18b29b);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x407)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x324)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x324)]=function(){const _0x76525e=_0x56d65d;let _0x1c7bcd=VisuMZ[_0x76525e(0x453)]['Game_BattlerBase_states'][_0x76525e(0x237)](this);if($gameTemp[_0x76525e(0x31e)])return _0x1c7bcd;return $gameTemp[_0x76525e(0x31e)]=!![],this[_0x76525e(0x4d7)](_0x1c7bcd),$gameTemp['_checkingPassiveStates']=undefined,_0x1c7bcd;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4d7)]=function(_0x45c7b2){const _0x3232ff=_0x56d65d,_0x5593d0=this[_0x3232ff(0x3c2)]();for(state of _0x5593d0){if(!state)continue;if(!this[_0x3232ff(0x3c0)](state)&&_0x45c7b2[_0x3232ff(0x233)](state))continue;_0x45c7b2[_0x3232ff(0x48b)](state);}_0x5593d0['length']>0x0&&_0x45c7b2[_0x3232ff(0x397)]((_0x3af808,_0x5ec81c)=>{const _0x25525f=_0x3232ff;if(_0x25525f(0x4d4)==='PncfA'){const _0x302bf9=_0x3af808[_0x25525f(0x3c6)],_0x12ff1b=_0x5ec81c[_0x25525f(0x3c6)];if(_0x302bf9!==_0x12ff1b)return _0x12ff1b-_0x302bf9;return _0x3af808-_0x5ec81c;}else{this[_0x25525f(0x252)](),this['contents'][_0x25525f(0x2b9)]();const _0x45b2e7=this[_0x25525f(0x475)];if(!_0x45b2e7)return;const _0x40e544=_0x45b2e7['states']()[_0x25525f(0x4b4)](_0x3832f0=>_0x3832f0[_0x25525f(0x4df)]>0x0),_0x1750b9=[..._0x348866(0x8)['keys']()][_0x25525f(0x4b4)](_0x22f803=>_0x45b2e7['buff'](_0x22f803)!==0x0),_0x5ba138=this[_0x25525f(0x23b)],_0x4b4021=_0x40e544[_0x5ba138];if(_0x4b4021)_0x6de6d3[_0x25525f(0x317)]['drawActorStateTurns']['call'](this,_0x45b2e7,_0x4b4021,0x0,0x0),_0x4319f7[_0x25525f(0x317)][_0x25525f(0x306)][_0x25525f(0x237)](this,_0x45b2e7,_0x4b4021,0x0,0x0);else{const _0x4ba8f5=_0x1750b9[_0x5ba138-_0x40e544[_0x25525f(0x37d)]];if(_0x4ba8f5===_0x1a0abd)return;_0x4a78c9[_0x25525f(0x317)][_0x25525f(0x408)]['call'](this,_0x45b2e7,_0x4ba8f5,0x0,0x0),_0xf44727[_0x25525f(0x317)]['drawActorBuffRates'][_0x25525f(0x237)](this,_0x45b2e7,_0x4ba8f5,0x0,0x0);}}});},Game_BattlerBase[_0x56d65d(0x317)]['isPassiveStateStackable']=function(_0x350c72){const _0x5c8fda=_0x56d65d;return _0x350c72[_0x5c8fda(0x21b)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x381)]=Game_BattlerBase[_0x56d65d(0x317)]['traitsSet'],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x376)]=function(_0x532c1a){const _0x452c5a=_0x56d65d;this[_0x452c5a(0x47b)]=!![];let _0x41930d=VisuMZ[_0x452c5a(0x453)]['Game_BattlerBase_traitsSet'][_0x452c5a(0x237)](this,_0x532c1a);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x41930d;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4be)]=function(){const _0x4897f7=_0x56d65d;let _0x4abd6e=[];this[_0x4897f7(0x2d7)]=this[_0x4897f7(0x2d7)]||{};for(;;){_0x4abd6e=[];let _0xcbed53=!![];for(const _0x355f0f of this[_0x4897f7(0x3af)]['passiveStates']){if(_0x4897f7(0x313)!==_0x4897f7(0x313)){if(this['_tempActor']||this[_0x4897f7(0x358)])return;const _0x4829cd=_0x50dbe9[_0x4897f7(0x453)][_0x4897f7(0x2c1)];if(_0x4829cd[_0x20be5b])_0x4829cd[_0x54f91f][_0x4897f7(0x237)](this,_0x59a68c);}else{const _0xb2d52b=$dataStates[_0x355f0f];if(!_0xb2d52b)continue;let _0x3fd150=this[_0x4897f7(0x229)](_0xb2d52b);this[_0x4897f7(0x2d7)][_0x355f0f]!==_0x3fd150&&(_0xcbed53=![],this['_passiveStateResults'][_0x355f0f]=_0x3fd150);if(!_0x3fd150)continue;_0x4abd6e['push'](_0xb2d52b);}}if(_0xcbed53)break;else{if(!this['_checkingTraitsSetSkillsStatesCore'])this['refresh']();this[_0x4897f7(0x323)]();}}return _0x4abd6e;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x229)]=function(_0x2d7dc2){const _0x426c91=_0x56d65d;if(!this[_0x426c91(0x3e3)](_0x2d7dc2))return![];if(!this[_0x426c91(0x279)](_0x2d7dc2))return![];if(!this[_0x426c91(0x46b)](_0x2d7dc2))return![];if(!this[_0x426c91(0x315)](_0x2d7dc2))return![];return!![];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3e3)]=function(_0x3f1aa2){return!![];},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x3e3)]=function(_0x2652c5){const _0x365390=_0x56d65d,_0xc2fc6a=DataManager[_0x365390(0x3c7)](_0x2652c5);if(_0xc2fc6a[_0x365390(0x20d)][_0x365390(0x37d)]>0x0){const _0x22ffe8=_0xc2fc6a[_0x365390(0x20d)];if(!_0x22ffe8[_0x365390(0x233)](this[_0x365390(0x20d)]()))return![];}if(_0xc2fc6a[_0x365390(0x4b2)]['length']>0x0){if('TLEhk'!==_0x365390(0x431)){const _0x58df3f=_0xc2fc6a[_0x365390(0x4b2)];let _0x40eedd=[this[_0x365390(0x20d)]()];if(Imported[_0x365390(0x1b9)]&&this[_0x365390(0x4c0)]){if('urQbn'===_0x365390(0x265))_0x40eedd=this[_0x365390(0x4c0)]();else{if(!_0x5d6cf6[_0x365390(0x27b)](_0xb069e9))return![];}}if(_0x58df3f['filter'](_0x1f5d67=>_0x40eedd[_0x365390(0x233)](_0x1f5d67))[_0x365390(0x37d)]<=0x0)return![];}else{this[_0x365390(0x47b)]=!![];let _0x2151df=_0x2bd901[_0x365390(0x453)][_0x365390(0x381)][_0x365390(0x237)](this,_0x2d4ddd);return this[_0x365390(0x47b)]=_0x15fa13,_0x2151df;}}return Game_BattlerBase[_0x365390(0x317)][_0x365390(0x3e3)]['call'](this,_0x2652c5);},DataManager[_0x56d65d(0x3c7)]=function(_0x8775a4){const _0x59f96f=_0x56d65d,_0x32259e={'currentClass':[],'multiClass':[]};if(!_0x8775a4)return _0x32259e;this['_cache_getPassiveStateConditionClassesData']=this[_0x59f96f(0x247)]||{};if(this[_0x59f96f(0x247)][_0x8775a4['id']]!==undefined)return this[_0x59f96f(0x247)][_0x8775a4['id']];const _0x419a89=_0x8775a4[_0x59f96f(0x21b)]||'';if(_0x419a89['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x59f96f(0x42d)===_0x59f96f(0x42d)){const _0x68f996=String(RegExp['$1'])[_0x59f96f(0x18f)](',')['map'](_0x3e2309=>_0x3e2309['trim']());_0x32259e['currentClass']=VisuMZ['SkillsStatesCore'][_0x59f96f(0x2df)](_0x68f996);}else return _0x431ba4['uiInputPosition'];}if(_0x419a89['match'](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x53763b=String(RegExp['$1'])[_0x59f96f(0x18f)](',')[_0x59f96f(0x231)](_0x19ab6e=>_0x19ab6e[_0x59f96f(0x3ec)]());_0x32259e[_0x59f96f(0x4b2)]=VisuMZ['SkillsStatesCore'][_0x59f96f(0x2df)](_0x53763b);}return this[_0x59f96f(0x247)][_0x8775a4['id']]=_0x32259e,this['_cache_getPassiveStateConditionClassesData'][_0x8775a4['id']];},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2df)]=function(_0x50a8f3){const _0x37bd74=_0x56d65d,_0x1fd01a=[];for(let _0x365ae0 of _0x50a8f3){if('ZFwVx'===_0x37bd74(0x1ce))_0x57f72d=this[_0x37bd74(0x4c0)]();else{_0x365ae0=(String(_0x365ae0)||'')[_0x37bd74(0x3ec)]();const _0x3d5229=/^\d+$/[_0x37bd74(0x270)](_0x365ae0);_0x3d5229?_0x1fd01a[_0x37bd74(0x48b)](Number(_0x365ae0)):_0x1fd01a['push'](DataManager[_0x37bd74(0x264)](_0x365ae0));}}return _0x1fd01a[_0x37bd74(0x231)](_0x5b01ac=>$dataClasses[Number(_0x5b01ac)])[_0x37bd74(0x448)](null);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x279)]=function(_0x3ce6ec){const _0x364d93=_0x56d65d,_0x33aaff=DataManager[_0x364d93(0x395)](_0x3ce6ec);if(_0x33aaff[_0x364d93(0x3a6)]&&_0x33aaff[_0x364d93(0x3a6)][_0x364d93(0x37d)]>0x0){const _0x49418c=_0x33aaff['allSwitchOn'];for(const _0x4a1df7 of _0x49418c){if(_0x364d93(0x2ce)!==_0x364d93(0x40d)){if(!$gameSwitches['value'](_0x4a1df7))return![];}else{if(!_0x364de7[_0x364d93(0x271)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:_0x2a8dd5[_0x364d93(0x453)][_0x364d93(0x433)]['Skills'][_0x364d93(0x443)];}}}if(_0x33aaff['anySwitchOn']&&_0x33aaff[_0x364d93(0x196)]['length']>0x0){const _0xd3a657=_0x33aaff[_0x364d93(0x196)];let _0x4084cb=!![];for(const _0x231411 of _0xd3a657){if($gameSwitches['value'](_0x231411)){if(_0x364d93(0x311)===_0x364d93(0x214)){const _0x3da0a7=_0x3d9a18[_0x364d93(0x453)][_0x364d93(0x217)][_0x364d93(0x237)](this);return _0x3da0a7[_0x364d93(0x483)](0x0,0x1);}else{_0x4084cb=![];break;}}}if(_0x4084cb)return![];}if(_0x33aaff[_0x364d93(0x406)]&&_0x33aaff[_0x364d93(0x406)][_0x364d93(0x37d)]>0x0){const _0x354236=_0x33aaff[_0x364d93(0x406)];for(const _0x197922 of _0x354236){if($gameSwitches[_0x364d93(0x48f)](_0x197922))return![];}}if(_0x33aaff[_0x364d93(0x3a1)]&&_0x33aaff[_0x364d93(0x3a1)][_0x364d93(0x37d)]>0x0){const _0x3acb15=_0x33aaff['anySwitchOff'];let _0x26e880=!![];for(const _0x4c2be8 of _0x3acb15){if(!$gameSwitches[_0x364d93(0x48f)](_0x4c2be8)){_0x26e880=![];break;}}if(_0x26e880)return![];}return!![];},DataManager[_0x56d65d(0x395)]=function(_0x3e0566){const _0x215da6=_0x56d65d;let _0x3adb57={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x3e0566)return _0x3adb57;const _0x11a734=_0x3e0566['id'];this[_0x215da6(0x269)]=this[_0x215da6(0x269)]||{};if(this[_0x215da6(0x269)][_0x11a734]!==undefined)return this[_0x215da6(0x269)][_0x11a734];const _0x17cb8f=_0x3e0566[_0x215da6(0x21b)]||'';if(_0x17cb8f['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)){if(_0x215da6(0x238)===_0x215da6(0x238))_0x3adb57[_0x215da6(0x3a6)]=String(RegExp['$1'])[_0x215da6(0x18f)](',')['map'](_0x348eed=>Number(_0x348eed));else{let _0x437dbf=0x0,_0x4315b4=0x0;if(_0x2aadad[_0x215da6(0x287)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x437dbf=_0x2d71a8(_0x3c99ce['$1']),_0x4315b4=_0x4b640c(_0x4ef385['$2']);else _0x350584[_0x215da6(0x287)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x437dbf=_0x198b94[_0x215da6(0x4aa)](_0x2bcaf0['$1']),_0x4315b4=_0x55ceea(_0x316e69['$2']));_0x34a33f[_0x215da6(0x18d)](_0x437dbf,_0x4315b4),this[_0x215da6(0x39f)](_0x4f3b26);}}return _0x17cb8f['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)/i)&&(_0x3adb57[_0x215da6(0x196)]=String(RegExp['$1'])['split'](',')[_0x215da6(0x231)](_0x367be6=>Number(_0x367be6))),_0x17cb8f[_0x215da6(0x287)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)&&('VVCTQ'===_0x215da6(0x40c)?this[_0x215da6(0x3c9)]():_0x3adb57[_0x215da6(0x406)]=String(RegExp['$1'])[_0x215da6(0x18f)](',')[_0x215da6(0x231)](_0x526d44=>Number(_0x526d44))),_0x17cb8f[_0x215da6(0x287)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)/i)&&(_0x215da6(0x289)!==_0x215da6(0x19e)?_0x3adb57[_0x215da6(0x3a1)]=String(RegExp['$1'])[_0x215da6(0x18f)](',')[_0x215da6(0x231)](_0x57cb8d=>Number(_0x57cb8d)):(_0x3c073c[_0x215da6(0x453)]['Game_Troop_setup'][_0x215da6(0x237)](this,_0xc7234d),this[_0x215da6(0x2c0)]())),this[_0x215da6(0x269)][_0x11a734]=_0x3adb57,this['_cache_getPassiveStateConditionSwitchData'][_0x11a734];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x46b)]=function(_0x4fdee8){const _0x5e94f5=_0x56d65d,_0x53f9c4=VisuMZ[_0x5e94f5(0x453)]['statePassiveConditionJS'];if(_0x53f9c4[_0x4fdee8['id']]&&!_0x53f9c4[_0x4fdee8['id']][_0x5e94f5(0x237)](this,_0x4fdee8))return![];return!![];},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x315)]=function(_0x357673){const _0x223147=_0x56d65d;return VisuMZ[_0x223147(0x453)][_0x223147(0x433)]['PassiveStates'][_0x223147(0x456)][_0x223147(0x237)](this,_0x357673);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3c2)]=function(){const _0x447daf=_0x56d65d;if(this[_0x447daf(0x2ad)]('passiveStates'))return this['convertPassiveStates']();if(this[_0x447daf(0x20b)])return[];return this[_0x447daf(0x20b)]=!![],this[_0x447daf(0x323)](),this['_checkingVisuMzPassiveStateObjects']=undefined,this['convertPassiveStates']();},Game_BattlerBase[_0x56d65d(0x317)]['createPassiveStatesCache']=function(){const _0x422378=_0x56d65d;this[_0x422378(0x20b)]=!![],this['_cache'][_0x422378(0x3c2)]=[],this['addPassiveStatesFromOtherPlugins'](),this[_0x422378(0x426)](),this['addPassiveStatesByPluginParameters'](),this[_0x422378(0x3af)][_0x422378(0x3c2)]=this['_cache'][_0x422378(0x3c2)][_0x422378(0x397)]((_0x18e045,_0x2dbe20)=>_0x18e045-_0x2dbe20),this[_0x422378(0x20b)]=undefined;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x190)]=function(){const _0x386241=_0x56d65d;if(Imported[_0x386241(0x41e)])this[_0x386241(0x28e)]();},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x33f)]=function(){return[];},Game_BattlerBase['prototype'][_0x56d65d(0x426)]=function(){const _0x314c5d=_0x56d65d,_0x9c8a8b=this[_0x314c5d(0x3af)][_0x314c5d(0x3c2)]||[],_0x4560ce=this[_0x314c5d(0x33f)]();this['_cache'][_0x314c5d(0x3c2)]=_0x9c8a8b||[];for(const _0x1d0e83 of _0x4560ce){if(!_0x1d0e83)continue;const _0x21d587=DataManager['getPassiveStatesFromObj'](_0x1d0e83);for(const _0x5dc30d of _0x21d587){this[_0x314c5d(0x3af)][_0x314c5d(0x3c2)][_0x314c5d(0x48b)](_0x5dc30d);}}},DataManager[_0x56d65d(0x37e)]=function(_0x18795e){const _0x162744=_0x56d65d;if(!_0x18795e)return[];const _0x590ddc=VisuMZ[_0x162744(0x453)][_0x162744(0x1b5)](_0x18795e,_0x162744(0x388));this['_cache_getPassiveStatesFromObj']=this[_0x162744(0x38f)]||{};if(this[_0x162744(0x38f)][_0x590ddc]!==undefined)return this[_0x162744(0x38f)][_0x590ddc];const _0x32b9b5=[],_0x2c6e9d=_0x18795e['note']||'',_0x2c13c3=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x4a6cd9=_0x2c6e9d[_0x162744(0x287)](_0x2c13c3);if(_0x4a6cd9)for(const _0x57acc1 of _0x4a6cd9){_0x57acc1[_0x162744(0x287)](_0x2c13c3);const _0x3432b9=String(RegExp['$1'])[_0x162744(0x18f)](',')['map'](_0x2406fe=>_0x2406fe[_0x162744(0x3ec)]());for(const _0x30e3b4 of _0x3432b9){const _0x5c4006=/^\d+$/[_0x162744(0x270)](_0x30e3b4);let _0x1d8445=0x0;if(_0x5c4006){if('ELRet'===_0x162744(0x439)){const _0x321cab=_0x30d073[_0x162744(0x2ed)]('['+_0xe2b3a5['$1'][_0x162744(0x287)](/\d+/g)+']');for(const _0x59a42f of _0x321cab){if(_0x2456de[_0x162744(0x27b)](_0x59a42f))return!![];}return![];}else _0x1d8445=Number(_0x30e3b4);}else _0x1d8445=DataManager['getStateIdWithName'](_0x30e3b4);_0x1d8445&&(_0x162744(0x2ea)!=='Bsafy'?_0x32b9b5[_0x162744(0x48b)](_0x1d8445):(this['setStateOrigin'](_0x1e703e),this[_0x162744(0x3b3)](_0x1829c7),this[_0x162744(0x467)](_0x2dd50d),this[_0x162744(0x4c1)](_0x408110),this['onAddStateGlobalJS'](_0x5a4910)));}}return this[_0x162744(0x38f)][_0x590ddc]=_0x32b9b5,this[_0x162744(0x38f)][_0x590ddc];},Game_BattlerBase['prototype'][_0x56d65d(0x1e5)]=function(){const _0x40c8d6=_0x56d65d,_0x424a2a=VisuMZ[_0x40c8d6(0x453)][_0x40c8d6(0x433)][_0x40c8d6(0x3a5)][_0x40c8d6(0x44e)];this[_0x40c8d6(0x3af)][_0x40c8d6(0x3c2)]=this[_0x40c8d6(0x3af)][_0x40c8d6(0x3c2)][_0x40c8d6(0x4e3)](_0x424a2a);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x435)]=function(_0x1df67e){const _0x23ea0d=_0x56d65d;if(typeof _0x1df67e!==_0x23ea0d(0x2f0))_0x1df67e=_0x1df67e['id'];return this[_0x23ea0d(0x1e3)][_0x1df67e]||0x0;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x18d)]=function(_0x4c0c50,_0x5a45bd){const _0x21d7dd=_0x56d65d;if(typeof _0x4c0c50!==_0x21d7dd(0x2f0))_0x4c0c50=_0x4c0c50['id'];if(this[_0x21d7dd(0x32a)](_0x4c0c50)){const _0x557027=DataManager[_0x21d7dd(0x442)](_0x4c0c50);this[_0x21d7dd(0x1e3)][_0x4c0c50]=_0x5a45bd['clamp'](0x0,_0x557027);if(this[_0x21d7dd(0x1e3)][_0x4c0c50]<=0x0)this[_0x21d7dd(0x29c)](_0x4c0c50);}},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x36d)]=function(_0x29a111,_0x16fcc8){const _0x186e01=_0x56d65d;if(typeof _0x29a111!==_0x186e01(0x2f0))_0x29a111=_0x29a111['id'];this[_0x186e01(0x32a)](_0x29a111)&&(_0x16fcc8+=this[_0x186e01(0x435)](_0x29a111),this[_0x186e01(0x18d)](_0x29a111,_0x16fcc8));},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff']=Game_BattlerBase['prototype']['eraseBuff'],Game_BattlerBase[_0x56d65d(0x317)]['eraseBuff']=function(_0x2d70da){const _0x55ff09=_0x56d65d,_0x17b6cf=this[_0x55ff09(0x3ca)][_0x2d70da];VisuMZ['SkillsStatesCore'][_0x55ff09(0x499)]['call'](this,_0x2d70da);if(_0x17b6cf>0x0)this[_0x55ff09(0x424)](_0x2d70da);if(_0x17b6cf<0x0)this[_0x55ff09(0x49c)](_0x2d70da);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x3dc)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x348)],Game_BattlerBase[_0x56d65d(0x317)]['increaseBuff']=function(_0x3c0c15){const _0xb8fd31=_0x56d65d;VisuMZ[_0xb8fd31(0x453)][_0xb8fd31(0x3dc)][_0xb8fd31(0x237)](this,_0x3c0c15);if(!this[_0xb8fd31(0x450)](_0x3c0c15))this['eraseBuff'](_0x3c0c15);},VisuMZ['SkillsStatesCore'][_0x56d65d(0x413)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x1de)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x1de)]=function(_0xd1f4e4){const _0x52c3b4=_0x56d65d;VisuMZ[_0x52c3b4(0x453)][_0x52c3b4(0x413)][_0x52c3b4(0x237)](this,_0xd1f4e4);if(!this['isBuffOrDebuffAffected'](_0xd1f4e4))this[_0x52c3b4(0x3ed)](_0xd1f4e4);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x424)]=function(_0x5315a4){},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x49c)]=function(_0x3e299a){},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x4cb)]=function(_0x2541c5){const _0x454674=_0x56d65d;return this[_0x454674(0x3ca)][_0x2541c5]===VisuMZ[_0x454674(0x453)][_0x454674(0x433)][_0x454674(0x33b)][_0x454674(0x459)];},Game_BattlerBase['prototype']['isMaxDebuffAffected']=function(_0x15932e){const _0x11fa48=_0x56d65d;return this[_0x11fa48(0x3ca)][_0x15932e]===-VisuMZ['SkillsStatesCore'][_0x11fa48(0x433)]['Buffs'][_0x11fa48(0x2f6)];},VisuMZ[_0x56d65d(0x453)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x301)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x301)]=function(_0x454e79,_0xade67d){const _0x1d2f12=_0x56d65d;return _0x454e79=_0x454e79['clamp'](-0x2,0x2),VisuMZ[_0x1d2f12(0x453)][_0x1d2f12(0x1b8)][_0x1d2f12(0x237)](this,_0x454e79,_0xade67d);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x24d)]=function(_0x31bf2b){const _0x3d4e7f=_0x56d65d,_0x14df68=this[_0x3d4e7f(0x3ca)][_0x31bf2b];return VisuMZ[_0x3d4e7f(0x453)][_0x3d4e7f(0x433)][_0x3d4e7f(0x33b)][_0x3d4e7f(0x308)][_0x3d4e7f(0x237)](this,_0x31bf2b,_0x14df68);},Game_BattlerBase['prototype']['buffTurns']=function(_0x5a6436){const _0xe1d0a7=_0x56d65d;return this[_0xe1d0a7(0x3dd)][_0x5a6436]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0x2bb88f){const _0x3daeb9=_0x56d65d;return this[_0x3daeb9(0x2a5)](_0x2bb88f);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x29a)]=function(_0x4fa1fa,_0x4ea992){const _0x13fd1a=_0x56d65d;if(this[_0x13fd1a(0x3ba)](_0x4fa1fa)){const _0x30b250=VisuMZ[_0x13fd1a(0x453)][_0x13fd1a(0x433)][_0x13fd1a(0x33b)][_0x13fd1a(0x221)];this[_0x13fd1a(0x3dd)][_0x4fa1fa]=_0x4ea992[_0x13fd1a(0x483)](0x0,_0x30b250);}},Game_BattlerBase['prototype'][_0x56d65d(0x3d1)]=function(_0x1105a4,_0x1d552f){const _0x262982=_0x56d65d;if(this['isBuffAffected'](_0x1105a4)){if(_0x262982(0x3e6)==='uuBeM')_0x1d552f+=this['buffTurns'](stateId),this[_0x262982(0x29a)](_0x1105a4,_0x1d552f);else{_0x4e3ead[_0x262982(0x287)](_0x5120d9);const _0x344c41=_0x4d3478(_0x1cf779['$1'])[_0x262982(0x18f)](',')[_0x262982(0x231)](_0x29f64c=>_0xd49df(_0x29f64c)[_0x262982(0x4a5)]()[_0x262982(0x3ec)]());_0x10015d=_0x2440c4[_0x262982(0x4e3)](_0x344c41);}}},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3d6)]=function(_0x3b56b5,_0x7978e2){const _0x2460b8=_0x56d65d;if(this[_0x2460b8(0x1b1)](_0x3b56b5)){const _0x22b958=VisuMZ[_0x2460b8(0x453)][_0x2460b8(0x433)][_0x2460b8(0x33b)][_0x2460b8(0x221)];this[_0x2460b8(0x3dd)][_0x3b56b5]=_0x7978e2[_0x2460b8(0x483)](0x0,_0x22b958);}},Game_BattlerBase['prototype'][_0x56d65d(0x4d0)]=function(_0x265f33,_0x100eca){const _0x7babec=_0x56d65d;this['isDebuffAffected'](_0x265f33)&&(_0x100eca+=this['buffTurns'](stateId),this[_0x7babec(0x3d6)](_0x265f33,_0x100eca));},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x19d)]=function(_0x27a405){const _0x301690=_0x56d65d;if(typeof _0x27a405!==_0x301690(0x2f0))_0x27a405=_0x27a405['id'];return this[_0x301690(0x482)]=this['_stateData']||{},this[_0x301690(0x482)][_0x27a405]=this[_0x301690(0x482)][_0x27a405]||{},this[_0x301690(0x482)][_0x27a405];},Game_BattlerBase[_0x56d65d(0x317)]['getStateData']=function(_0x32dafe,_0x1e7e44){const _0x431f87=_0x56d65d;if(typeof _0x32dafe!==_0x431f87(0x2f0))_0x32dafe=_0x32dafe['id'];const _0x2118bb=this[_0x431f87(0x19d)](_0x32dafe);return _0x2118bb[_0x1e7e44];},Game_BattlerBase[_0x56d65d(0x317)]['setStateData']=function(_0x4a03fb,_0x2c33e3,_0x269879){if(typeof _0x4a03fb!=='number')_0x4a03fb=_0x4a03fb['id'];const _0x44a26c=this['stateData'](_0x4a03fb);_0x44a26c[_0x2c33e3]=_0x269879;},Game_BattlerBase['prototype'][_0x56d65d(0x2af)]=function(_0x4eacf3){const _0x316f0f=_0x56d65d;if(typeof _0x4eacf3!=='number')_0x4eacf3=_0x4eacf3['id'];this[_0x316f0f(0x482)]=this[_0x316f0f(0x482)]||{},this[_0x316f0f(0x482)][_0x4eacf3]={};},Game_BattlerBase[_0x56d65d(0x317)]['getStateDisplay']=function(_0x3f6f2f){const _0x6fa478=_0x56d65d;if(typeof _0x3f6f2f!==_0x6fa478(0x2f0))_0x3f6f2f=_0x3f6f2f['id'];this['_stateDisplay']=this[_0x6fa478(0x2c6)]||{};if(this[_0x6fa478(0x2c6)][_0x3f6f2f]===undefined){if('uuCCE'===_0x6fa478(0x3c4))this[_0x6fa478(0x2c6)][_0x3f6f2f]='';else{const _0x155abd=this[_0x6fa478(0x192)]();this[_0x6fa478(0x2fc)]=new _0x25d2a6(_0x155abd),this['addWindow'](this['_shopStatusWindow']),this[_0x6fa478(0x25b)][_0x6fa478(0x356)](this['_shopStatusWindow']);const _0x3c40ba=_0x30a5fe[_0x6fa478(0x453)][_0x6fa478(0x433)]['Skills'][_0x6fa478(0x2bd)];this[_0x6fa478(0x2fc)][_0x6fa478(0x1dd)](_0x3c40ba||0x0);}}return this[_0x6fa478(0x2c6)][_0x3f6f2f];},Game_BattlerBase[_0x56d65d(0x317)]['setStateDisplay']=function(_0x1ae603,_0xd08766){const _0x13fcd2=_0x56d65d;if(typeof _0x1ae603!==_0x13fcd2(0x2f0))_0x1ae603=_0x1ae603['id'];this[_0x13fcd2(0x2c6)]=this[_0x13fcd2(0x2c6)]||{},this[_0x13fcd2(0x2c6)][_0x1ae603]=_0xd08766;},Game_BattlerBase['prototype']['clearStateDisplay']=function(_0x550c55){const _0x51a889=_0x56d65d;if(typeof _0x550c55!=='number')_0x550c55=_0x550c55['id'];this[_0x51a889(0x2c6)]=this[_0x51a889(0x2c6)]||{},this[_0x51a889(0x2c6)][_0x550c55]='';},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x22b)]=function(_0x1e41a5){const _0x18eb48=_0x56d65d;if(typeof _0x1e41a5!=='number')_0x1e41a5=_0x1e41a5['id'];this[_0x18eb48(0x440)]=this[_0x18eb48(0x440)]||{},this[_0x18eb48(0x440)][_0x1e41a5]=this[_0x18eb48(0x440)][_0x1e41a5]||'user';const _0x307c7d=this[_0x18eb48(0x440)][_0x1e41a5];return this[_0x18eb48(0x1ca)](_0x307c7d);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x244)]=function(_0x2a1e9e,_0x3fa8db){const _0x543072=_0x56d65d;this[_0x543072(0x440)]=this['_stateOrigin']||{};const _0x8d69fa=_0x3fa8db?this[_0x543072(0x2ec)](_0x3fa8db):this[_0x543072(0x45b)]();this['_stateOrigin'][_0x2a1e9e]=_0x8d69fa;},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x478)]=function(_0x1f0e15){const _0x41c4a9=_0x56d65d;this[_0x41c4a9(0x440)]=this[_0x41c4a9(0x440)]||{},delete this[_0x41c4a9(0x440)][_0x1f0e15];},Game_BattlerBase[_0x56d65d(0x317)]['clearAllStateOrigins']=function(){this['_stateOrigin']={};},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x45b)]=function(){const _0x194c6a=_0x56d65d,_0xaf0b1a=this[_0x194c6a(0x3b9)]();return this['convertTargetToStateOriginKey'](_0xaf0b1a);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x3b9)]=function(){const _0x30dffd=_0x56d65d;if($gameParty[_0x30dffd(0x4b8)]()){if('rsYNw'==='rsYNw'){if(BattleManager[_0x30dffd(0x3ad)])return'HDOZn'!==_0x30dffd(0x4a6)?BattleManager[_0x30dffd(0x3ad)]:this[_0x30dffd(0x475)]&&this[_0x30dffd(0x38c)]?this[_0x30dffd(0x1c0)]():_0x54dde2[_0x30dffd(0x453)][_0x30dffd(0x49f)][_0x30dffd(0x237)](this);else{if(BattleManager[_0x30dffd(0x36c)])return BattleManager[_0x30dffd(0x36c)];}}else _0x21d8a4[_0x30dffd(0x453)][_0x30dffd(0x433)][_0x30dffd(0x281)][_0x30dffd(0x42b)]['call'](this,_0x46de0e);}else{if(_0x30dffd(0x1f0)===_0x30dffd(0x1f0)){const _0x31a0b3=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x30dffd(0x233)](_0x31a0b3[_0x30dffd(0x46c)]))return $gameParty[_0x30dffd(0x30a)]();}else _0xe641ea['SkillsStatesCore']['ParseSkillNotetags']['call'](this,_0x5bea96),_0x31ca89[_0x30dffd(0x453)][_0x30dffd(0x41d)](_0x4617d2),_0x4fb029[_0x30dffd(0x453)]['Parse_Notetags_Skill_JS'](_0x53840f);}return this;},Game_BattlerBase[_0x56d65d(0x317)]['convertTargetToStateOriginKey']=function(_0x110fb5){const _0xf08b02=_0x56d65d;if(!_0x110fb5)return'user';if(_0x110fb5['isActor']())return _0xf08b02(0x342)[_0xf08b02(0x19c)](_0x110fb5[_0xf08b02(0x2c9)]());else{const _0x13bb44=_0xf08b02(0x3db)['format'](_0x110fb5[_0xf08b02(0x38d)]()),_0x998e0=_0xf08b02(0x3d3)[_0xf08b02(0x19c)](_0x110fb5[_0xf08b02(0x202)]()),_0x1856c2=_0xf08b02(0x1e6)[_0xf08b02(0x19c)]($gameTroop[_0xf08b02(0x215)]());return _0xf08b02(0x48c)['format'](_0x13bb44,_0x998e0,_0x1856c2);}return _0xf08b02(0x2eb);},Game_BattlerBase[_0x56d65d(0x317)]['getStateOriginByKey']=function(_0x464fa8){const _0x3b97d8=_0x56d65d;if(_0x464fa8==='user'){if(_0x3b97d8(0x370)!==_0x3b97d8(0x4d6))return this;else{const _0x3c26af=_0x3da66b['boxWidth']-this[_0x3b97d8(0x1b2)](),_0x14d1a7=this[_0x3b97d8(0x4cf)]()-this[_0x3b97d8(0x36b)][_0x3b97d8(0x2a4)],_0x34cccf=this[_0x3b97d8(0x4e9)]()?_0x11f05a[_0x3b97d8(0x2ac)]-_0x3c26af:0x0,_0x273ffe=this['_statusWindow']['y']+this[_0x3b97d8(0x36b)][_0x3b97d8(0x2a4)];return new _0x592f4b(_0x34cccf,_0x273ffe,_0x3c26af,_0x14d1a7);}}else{if(_0x464fa8[_0x3b97d8(0x287)](/<actor-(\d+)>/i))return $gameActors[_0x3b97d8(0x2d6)](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x464fa8[_0x3b97d8(0x287)](/<troop-(\d+)>/i)){const _0x385e4b=Number(RegExp['$1']);if(_0x385e4b===$gameTroop[_0x3b97d8(0x215)]()){if(_0x464fa8[_0x3b97d8(0x287)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0x464fa8[_0x3b97d8(0x287)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1d3)]=Game_Battler[_0x56d65d(0x317)]['addState'],Game_Battler['prototype'][_0x56d65d(0x300)]=function(_0x47fd8b){const _0x2e175d=_0x56d65d,_0x28a454=this[_0x2e175d(0x28d)](_0x47fd8b);VisuMZ[_0x2e175d(0x453)]['Game_Battler_addState'][_0x2e175d(0x237)](this,_0x47fd8b);if(_0x28a454&&this[_0x2e175d(0x2a0)]($dataStates[_0x47fd8b])){if(_0x2e175d(0x19b)===_0x2e175d(0x447)){if(typeof _0x999efb!==_0x2e175d(0x2f0))_0x54fb52=_0x5cf15e['id'];this[_0x2e175d(0x2c6)]=this[_0x2e175d(0x2c6)]||{},this[_0x2e175d(0x2c6)][_0x263774]='';}else{this['onAddState'](_0x47fd8b);;}}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x209)]=Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x28d)],Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x28d)]=function(_0x22f9fb){const _0x4eab9a=_0x56d65d,_0x4c449d=$dataStates[_0x22f9fb];if(_0x4c449d&&_0x4c449d['note']['match'](/<NO DEATH CLEAR>/i)){if(_0x4eab9a(0x23d)===_0x4eab9a(0x446)){if(typeof _0x489501!==_0x4eab9a(0x2f0))_0x5a0a06=_0x4de793['id'];this[_0x4eab9a(0x2c6)]=this[_0x4eab9a(0x2c6)]||{},this[_0x4eab9a(0x2c6)][_0x6111a8]=_0xda885a;}else return!this['isStateResist'](_0x22f9fb)&&!this['isStateRestrict'](_0x22f9fb)&&!this[_0x4eab9a(0x2be)][_0x4eab9a(0x3c3)](_0x22f9fb);}return VisuMZ[_0x4eab9a(0x453)][_0x4eab9a(0x209)][_0x4eab9a(0x237)](this,_0x22f9fb);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x320)]=function(_0x266195){const _0x4f42ae=_0x56d65d;this[_0x4f42ae(0x244)](_0x266195),this[_0x4f42ae(0x3b3)](_0x266195),this[_0x4f42ae(0x467)](_0x266195),this['onAddStateCustomJS'](_0x266195),this[_0x4f42ae(0x1f1)](_0x266195);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x43c)]=function(_0x4be528){const _0x572b75=_0x56d65d;this['onEraseStateCustomJS'](_0x4be528),this[_0x572b75(0x4ed)](_0x4be528),Game_BattlerBase[_0x572b75(0x317)]['onRemoveState']['call'](this,_0x4be528);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x291)]=function(_0x102125){const _0x5e4e86=_0x56d65d;for(const _0x7e81ae of this[_0x5e4e86(0x324)]()){if('vlzKc'!==_0x5e4e86(0x335))this['isStateExpired'](_0x7e81ae['id'])&&_0x7e81ae[_0x5e4e86(0x353)]===_0x102125&&(this[_0x5e4e86(0x29c)](_0x7e81ae['id']),this[_0x5e4e86(0x2a6)](_0x7e81ae['id']),this[_0x5e4e86(0x36a)](_0x7e81ae['id']));else{const _0x4f39c7=_0x5e4e86(0x2d5);this[_0x5e4e86(0x253)]=this[_0x5e4e86(0x253)]||{};if(this[_0x5e4e86(0x253)][_0x4f39c7])return this[_0x5e4e86(0x253)][_0x4f39c7];const _0x539aff=_0x578537['SkillsStatesCore'][_0x5e4e86(0x433)][_0x5e4e86(0x33b)][_0x5e4e86(0x344)];return this[_0x5e4e86(0x472)](_0x4f39c7,_0x539aff);}}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x2a6)]=function(_0x5c0486){this['onExpireStateCustomJS'](_0x5c0486);},Game_Battler['prototype']['onAddStateCustomJS']=function(_0x115a17){const _0x1d7dd8=_0x56d65d;if(this[_0x1d7dd8(0x1a9)]||this[_0x1d7dd8(0x358)])return;const _0x391be4=VisuMZ[_0x1d7dd8(0x453)][_0x1d7dd8(0x2c1)];if(_0x391be4[_0x115a17])_0x391be4[_0x115a17][_0x1d7dd8(0x237)](this,_0x115a17);},Game_Battler['prototype']['onEraseStateCustomJS']=function(_0x4bc680){const _0x408cd=_0x56d65d;if(this[_0x408cd(0x1a9)]||this['_tempBattler'])return;const _0x4d6e1d=VisuMZ[_0x408cd(0x453)][_0x408cd(0x412)];if(_0x4d6e1d[_0x4bc680])_0x4d6e1d[_0x4bc680][_0x408cd(0x237)](this,_0x4bc680);},Game_Battler[_0x56d65d(0x317)]['onExpireStateCustomJS']=function(_0x5f4093){const _0xd8d887=_0x56d65d;if(this[_0xd8d887(0x1a9)]||this[_0xd8d887(0x358)])return;const _0x377800=VisuMZ[_0xd8d887(0x453)][_0xd8d887(0x427)];if(_0x377800[_0x5f4093])_0x377800[_0x5f4093][_0xd8d887(0x237)](this,_0x5f4093);},Game_Battler['prototype'][_0x56d65d(0x1f1)]=function(_0x232610){const _0x4843f8=_0x56d65d;if(this['_tempActor']||this[_0x4843f8(0x358)])return;try{VisuMZ['SkillsStatesCore']['Settings'][_0x4843f8(0x281)]['onAddStateJS'][_0x4843f8(0x237)](this,_0x232610);}catch(_0x4db541){if($gameTemp[_0x4843f8(0x1d7)]())console[_0x4843f8(0x3b7)](_0x4db541);}},Game_Battler['prototype']['onEraseStateGlobalJS']=function(_0xd32292){const _0x454b8f=_0x56d65d;if(this[_0x454b8f(0x1a9)]||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore']['Settings']['States'][_0x454b8f(0x42b)][_0x454b8f(0x237)](this,_0xd32292);}catch(_0x407008){if(_0x454b8f(0x444)===_0x454b8f(0x444)){if($gameTemp[_0x454b8f(0x1d7)]())console[_0x454b8f(0x3b7)](_0x407008);}else return _0x794fb1[_0x454b8f(0x1ef)]();}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x36a)]=function(_0x52b2d3){const _0x13abef=_0x56d65d;if(this[_0x13abef(0x1a9)]||this[_0x13abef(0x358)])return;try{VisuMZ['SkillsStatesCore'][_0x13abef(0x433)][_0x13abef(0x281)][_0x13abef(0x222)][_0x13abef(0x237)](this,_0x52b2d3);}catch(_0x2ffac1){if($gameTemp['isPlaytest']())console[_0x13abef(0x3b7)](_0x2ffac1);}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x314)]=function(_0x478edd){const _0x199cd6=_0x56d65d;return _0x478edd=_0x478edd[_0x199cd6(0x4a5)]()['trim'](),this['states']()['filter'](_0x3418da=>_0x3418da['categories'][_0x199cd6(0x233)](_0x478edd));},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x257)]=function(_0x553cb2,_0x31f0a6){const _0x592dbc=_0x56d65d;_0x553cb2=_0x553cb2[_0x592dbc(0x4a5)]()[_0x592dbc(0x3ec)](),_0x31f0a6=_0x31f0a6||0x0;const _0x42f10b=this['statesByCategory'](_0x553cb2),_0x4ceeb3=[];for(const _0x17d467 of _0x42f10b){if(!_0x17d467)continue;if(_0x31f0a6<=0x0)break;_0x4ceeb3[_0x592dbc(0x48b)](_0x17d467['id']),this[_0x592dbc(0x2be)][_0x592dbc(0x1f6)]=!![],_0x31f0a6--;}while(_0x4ceeb3[_0x592dbc(0x37d)]>0x0){this[_0x592dbc(0x29c)](_0x4ceeb3[_0x592dbc(0x4c4)]());}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x2cb)]=function(_0x2c3fbc,_0x17e80b){const _0x187a76=_0x56d65d;_0x2c3fbc=_0x2c3fbc[_0x187a76(0x4a5)]()['trim'](),_0x17e80b=_0x17e80b||[];const _0x3216ce=this['statesByCategory'](_0x2c3fbc),_0x580c6e=[];for(const _0x1f717a of _0x3216ce){if(!_0x1f717a)continue;if(_0x17e80b[_0x187a76(0x233)](_0x1f717a))continue;_0x580c6e['push'](_0x1f717a['id']),this['_result']['success']=!![];}while(_0x580c6e['length']>0x0){this['removeState'](_0x580c6e[_0x187a76(0x4c4)]());}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x3de)]=function(_0x484752){const _0x1ada49=_0x56d65d;return this[_0x1ada49(0x28a)](_0x484752)>0x0;},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x1c7)]=function(_0x1f75f1){const _0x375417=_0x56d65d;return this[_0x375417(0x2f2)](_0x1f75f1)>0x0;},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x28a)]=function(_0x4bf7a8){const _0x42db99=_0x56d65d,_0x345cd2=this[_0x42db99(0x314)](_0x4bf7a8)['filter'](_0x298206=>this['isStateAffected'](_0x298206['id']));return _0x345cd2[_0x42db99(0x37d)];},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x2f2)]=function(_0x460398){const _0x240a64=_0x56d65d,_0x553b09=this[_0x240a64(0x314)](_0x460398);return _0x553b09[_0x240a64(0x37d)];},VisuMZ['SkillsStatesCore'][_0x56d65d(0x22a)]=Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x2bc)],Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x2bc)]=function(_0x48b09c){const _0xdea0ea=_0x56d65d,_0x20c94d=$dataStates[_0x48b09c];if(_0x20c94d&&_0x20c94d['categories']['length']>0x0){if(_0xdea0ea(0x3fd)==='jByYQ')return _0x2b0a7b=_0x31391c['clamp'](-0x2,0x2),_0x203f69[_0xdea0ea(0x453)]['Game_BattlerBase_buffIconIndex'][_0xdea0ea(0x237)](this,_0x584cbb,_0x4f6f94);else for(const _0x46137b of _0x20c94d[_0xdea0ea(0x36e)]){if(this['isStateCategoryResisted'](_0x46137b))return!![];}}return VisuMZ[_0xdea0ea(0x453)][_0xdea0ea(0x22a)][_0xdea0ea(0x237)](this,_0x48b09c);},Game_BattlerBase['prototype'][_0x56d65d(0x26d)]=function(_0x4de5ba){const _0x40b5e7=_0x56d65d;let _0x277c4b=_0x40b5e7(0x1f3);if(this[_0x40b5e7(0x2ad)](_0x277c4b))return this[_0x40b5e7(0x3af)][_0x277c4b]['includes'](_0x4de5ba);return this['_cache'][_0x277c4b]=this[_0x40b5e7(0x45e)](),this['_cache'][_0x277c4b][_0x40b5e7(0x233)](_0x4de5ba);},Game_BattlerBase[_0x56d65d(0x317)][_0x56d65d(0x45e)]=function(){const _0x1463c0=_0x56d65d,_0x25cc87=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x12769c=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x53364a=[];for(const _0x271c31 of this[_0x1463c0(0x428)]()){if(_0x1463c0(0x307)!=='EcZEr'){if(!_0x271c31)continue;const _0x17ab84=_0x271c31[_0x1463c0(0x21b)],_0x11a572=_0x17ab84['match'](_0x25cc87);if(_0x11a572)for(const _0x60773d of _0x11a572){_0x60773d[_0x1463c0(0x287)](_0x25cc87);const _0x592ed8=String(RegExp['$1'])[_0x1463c0(0x18f)](',')[_0x1463c0(0x231)](_0x336314=>String(_0x336314)[_0x1463c0(0x4a5)]()['trim']());_0x53364a=_0x53364a[_0x1463c0(0x4e3)](_0x592ed8);}if(_0x17ab84[_0x1463c0(0x287)](_0x12769c)){const _0x5579fc=String(RegExp['$1'])[_0x1463c0(0x18f)](/[\r\n]+/)[_0x1463c0(0x231)](_0x93fa64=>String(_0x93fa64)[_0x1463c0(0x4a5)]()[_0x1463c0(0x3ec)]());_0x53364a=_0x53364a[_0x1463c0(0x4e3)](_0x5579fc);}}else _0x24c795['addStateTurns'](_0x140c57,_0x4aa7c7);}return _0x53364a;},Game_BattlerBase['prototype'][_0x56d65d(0x3b3)]=function(_0x35f04c){const _0x31d4dd=_0x56d65d,_0x4d254c=$dataStates[_0x35f04c];if(!_0x4d254c)return;const _0x4ff302=_0x4d254c[_0x31d4dd(0x21b)]||'',_0x4005a5=_0x4ff302[_0x31d4dd(0x287)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x4005a5){const _0x1edad7=[_0x4d254c];for(const _0x3ec460 of _0x4005a5){if('izukD'===_0x31d4dd(0x2ba)){_0x3a23de[_0x31d4dd(0x317)][_0x31d4dd(0x1e5)][_0x31d4dd(0x237)](this);const _0x517716=_0x45b65d[_0x31d4dd(0x453)][_0x31d4dd(0x433)][_0x31d4dd(0x3a5)]['Enemy'];this[_0x31d4dd(0x3af)][_0x31d4dd(0x3c2)]=this['_cache'][_0x31d4dd(0x3c2)][_0x31d4dd(0x4e3)](_0x517716);}else{_0x3ec460[_0x31d4dd(0x287)](/<REMOVE OTHER (.*) STATES>/i);const _0x100a55=String(RegExp['$1']);this[_0x31d4dd(0x2cb)](_0x100a55,_0x1edad7);}}}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2e0)]=Game_Battler['prototype'][_0x56d65d(0x2f1)],Game_Battler[_0x56d65d(0x317)]['addBuff']=function(_0x397ace,_0x398d89){const _0x4c67ca=_0x56d65d;VisuMZ[_0x4c67ca(0x453)][_0x4c67ca(0x2e0)][_0x4c67ca(0x237)](this,_0x397ace,_0x398d89);if(this[_0x4c67ca(0x3ba)](_0x397ace)){if(_0x4c67ca(0x285)===_0x4c67ca(0x285))this[_0x4c67ca(0x4e4)](_0x397ace,_0x398d89);else{if(!this[_0x4c67ca(0x463)](_0x3cf23a))return![];return!![];}}},Game_Battler[_0x56d65d(0x317)]['isBuffPrevented']=function(_0x4c23e3){},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2d8)]=Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x310)],Game_Battler[_0x56d65d(0x317)]['addDebuff']=function(_0x3ad80c,_0x51f942){const _0x14bcdd=_0x56d65d;VisuMZ[_0x14bcdd(0x453)]['Game_Battler_addDebuff'][_0x14bcdd(0x237)](this,_0x3ad80c,_0x51f942);if(this[_0x14bcdd(0x1b1)](_0x3ad80c)){if(_0x14bcdd(0x1bd)!==_0x14bcdd(0x4f7))this[_0x14bcdd(0x26f)](_0x3ad80c,_0x51f942);else{const _0x220cc5=_0x1a6ea5[_0x14bcdd(0x21b)];if(_0x220cc5['match'](/<HIDE IN BATTLE>/i)&&_0x413f68[_0x14bcdd(0x4b8)]())return![];else return _0x220cc5[_0x14bcdd(0x287)](/<HIDE OUTSIDE BATTLE>/i)&&!_0x6dea2f[_0x14bcdd(0x4b8)]()?![]:!![];}}},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x1e0)]=function(){const _0xe5b956=_0x56d65d;for(let _0x114e41=0x0;_0x114e41<this[_0xe5b956(0x236)]();_0x114e41++){if(this[_0xe5b956(0x31f)](_0x114e41)){const _0x1f863f=this[_0xe5b956(0x3ca)][_0x114e41];this['removeBuff'](_0x114e41);if(_0x1f863f>0x0)this[_0xe5b956(0x1ec)](_0x114e41);if(_0x1f863f<0x0)this[_0xe5b956(0x3ef)](_0x114e41);}}},Game_Battler['prototype'][_0x56d65d(0x4e4)]=function(_0x2de7d4,_0x800284){const _0x2575e5=_0x56d65d;this[_0x2575e5(0x4c6)](_0x2de7d4,_0x800284);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x26f)]=function(_0x5b5f85,_0x40c629){this['onAddDebuffGlobalJS'](_0x5b5f85,_0x40c629);},Game_Battler[_0x56d65d(0x317)]['onEraseBuff']=function(_0x4ba0f1){const _0x5a4022=_0x56d65d;Game_BattlerBase[_0x5a4022(0x317)][_0x5a4022(0x424)][_0x5a4022(0x237)](this,_0x4ba0f1),this[_0x5a4022(0x2ff)](_0x4ba0f1);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x49c)]=function(_0x2ee699){const _0xff3cc5=_0x56d65d;Game_BattlerBase[_0xff3cc5(0x317)][_0xff3cc5(0x49c)][_0xff3cc5(0x237)](this,_0x2ee699),this[_0xff3cc5(0x46f)](_0x2ee699);},Game_Battler['prototype'][_0x56d65d(0x1ec)]=function(_0x252b20){const _0x18b774=_0x56d65d;this[_0x18b774(0x36f)](_0x252b20);},Game_Battler[_0x56d65d(0x317)]['onExpireDebuff']=function(_0xd2dcc6){const _0x1abe7c=_0x56d65d;this[_0x1abe7c(0x3cf)](_0xd2dcc6);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x4c6)]=function(_0x1c301a,_0x551fe3){const _0x1f7d5d=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x1f7d5d(0x433)][_0x1f7d5d(0x33b)][_0x1f7d5d(0x4e6)]['call'](this,_0x1c301a,_0x551fe3);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x49a)]=function(_0x53b4d7,_0x9ecbb2){const _0x32d7a8=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x32d7a8(0x433)][_0x32d7a8(0x33b)][_0x32d7a8(0x2db)][_0x32d7a8(0x237)](this,_0x53b4d7,_0x9ecbb2);},Game_BattlerBase[_0x56d65d(0x317)]['onEraseBuffGlobalJS']=function(_0x583e53){const _0x5e13e8=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x5e13e8(0x433)][_0x5e13e8(0x33b)][_0x5e13e8(0x2fe)]['call'](this,_0x583e53);},Game_BattlerBase['prototype'][_0x56d65d(0x46f)]=function(_0x7128c8){const _0x2d4b05=_0x56d65d;VisuMZ[_0x2d4b05(0x453)][_0x2d4b05(0x433)][_0x2d4b05(0x33b)][_0x2d4b05(0x1c1)][_0x2d4b05(0x237)](this,_0x7128c8);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x36f)]=function(_0x21cdab){const _0x1fde18=_0x56d65d;VisuMZ['SkillsStatesCore'][_0x1fde18(0x433)][_0x1fde18(0x33b)]['onExpireBuffJS'][_0x1fde18(0x237)](this,_0x21cdab);},Game_Battler['prototype'][_0x56d65d(0x3cf)]=function(_0x18a15f){const _0x7d9d53=_0x56d65d;VisuMZ[_0x7d9d53(0x453)][_0x7d9d53(0x433)][_0x7d9d53(0x33b)][_0x7d9d53(0x3b5)][_0x7d9d53(0x237)](this,_0x18a15f);},Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x467)]=function(_0x546d56){const _0x544b9f=_0x56d65d,_0x5313f7=VisuMZ[_0x544b9f(0x453)],_0x1a0e0f=[_0x544b9f(0x3eb),_0x544b9f(0x43e),_0x544b9f(0x1e7),_0x544b9f(0x1bc),'stateTpSlipDamageJS',_0x544b9f(0x2a3)];for(const _0x450f3a of _0x1a0e0f){if(_0x5313f7[_0x450f3a][_0x546d56]){if(_0x544b9f(0x3ff)===_0x544b9f(0x4d8))return _0x544b9f(0x201);else _0x5313f7[_0x450f3a][_0x546d56]['call'](this,_0x546d56);}}},VisuMZ[_0x56d65d(0x453)]['Game_Battler_regenerateAll']=Game_Battler[_0x56d65d(0x317)][_0x56d65d(0x2a1)],Game_Battler[_0x56d65d(0x317)]['regenerateAll']=function(){const _0x32d09e=_0x56d65d;this[_0x32d09e(0x473)](),VisuMZ[_0x32d09e(0x453)]['Game_Battler_regenerateAll'][_0x32d09e(0x237)](this),this[_0x32d09e(0x498)](),this[_0x32d09e(0x290)]();},Game_Battler['prototype'][_0x56d65d(0x498)]=function(){const _0x3f36aa=_0x56d65d;for(const _0x84311d of this[_0x3f36aa(0x3c2)]()){if(!_0x84311d)continue;this[_0x3f36aa(0x467)](_0x84311d['id']);}},Game_Battler[_0x56d65d(0x317)]['recalculateSlipDamageJS']=function(){const _0x5d46d7=_0x56d65d;for(const _0x48503c of this[_0x5d46d7(0x324)]()){if(!_0x48503c)continue;_0x48503c['note'][_0x5d46d7(0x287)](/<JS SLIP REFRESH>/i)&&this[_0x5d46d7(0x467)](_0x48503c['id']);}},Game_Battler['prototype'][_0x56d65d(0x290)]=function(){if(!this['isAlive']())return;const _0x5aaa09=this['states']();for(const _0x483c73 of _0x5aaa09){if(!_0x483c73)continue;this['onRegenerateCustomStateDamageOverTime'](_0x483c73);}},Game_Battler[_0x56d65d(0x317)]['onRegenerateCustomStateDamageOverTime']=function(_0xf0eb76){const _0xbc1a06=_0x56d65d,_0x390e5a=this[_0xbc1a06(0x3b2)](_0xf0eb76['id'],_0xbc1a06(0x4d3))||0x0,_0xb99958=-this[_0xbc1a06(0x4f4)](),_0x5f0a0b=Math[_0xbc1a06(0x4a1)](_0x390e5a,_0xb99958);if(_0x5f0a0b!==0x0){const _0x189a5d=this[_0xbc1a06(0x2be)][_0xbc1a06(0x4ab)]||0x0;this[_0xbc1a06(0x2aa)](_0x5f0a0b),this[_0xbc1a06(0x2be)][_0xbc1a06(0x4ab)]+=_0x189a5d;}const _0x555589=this['getStateData'](_0xf0eb76['id'],_0xbc1a06(0x224))||0x0;if(_0x555589!==0x0){if(_0xbc1a06(0x357)===_0xbc1a06(0x357)){const _0x18f37a=this[_0xbc1a06(0x2be)][_0xbc1a06(0x39b)]||0x0;this[_0xbc1a06(0x2cc)](_0x555589),this[_0xbc1a06(0x2be)][_0xbc1a06(0x39b)]+=_0x18f37a;}else{let _0x1bc2d7=_0x3cff3b[_0xbc1a06(0x3e8)][_0xbc1a06(0x237)](_0x1be4b8,_0x1d0653);return _0x1bc2d7=_0x1f23fb[_0xbc1a06(0x24b)](_0x3c0678,_0x1bc2d7,_0x4d0409),_0x4a657c['ShowJS'][_0xbc1a06(0x237)](_0x4e3b2e,_0x3131c5,_0x1bc2d7,_0x24abae);}}const _0x1606ae=this['getStateData'](_0xf0eb76['id'],_0xbc1a06(0x3e0))||0x0;_0x1606ae!==0x0&&this[_0xbc1a06(0x2ee)](_0x1606ae);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x44d)]=Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x198)],Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x198)]=function(){const _0x1eefc1=_0x56d65d,_0x5c16c8=VisuMZ[_0x1eefc1(0x453)]['Game_Actor_skillTypes'][_0x1eefc1(0x237)](this),_0x2b0fcf=VisuMZ['SkillsStatesCore']['Settings'][_0x1eefc1(0x489)];let _0x308b0a=_0x2b0fcf[_0x1eefc1(0x3a3)];return $gameParty[_0x1eefc1(0x4b8)]()&&(_0x308b0a=_0x308b0a[_0x1eefc1(0x4e3)](_0x2b0fcf[_0x1eefc1(0x30f)])),_0x5c16c8['filter'](_0x2f579a=>!_0x308b0a['includes'](_0x2f579a));},Game_Actor['prototype'][_0x56d65d(0x1e4)]=function(){const _0x8876d4=_0x56d65d;return this[_0x8876d4(0x2f4)]()[_0x8876d4(0x4b4)](_0x21929a=>this[_0x8876d4(0x40a)](_0x21929a));},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x40a)]=function(_0x75bcf6){const _0x59c52f=_0x56d65d;if(!this['canUse'](_0x75bcf6))return![];if(!_0x75bcf6)return![];if(!this[_0x59c52f(0x2d1)](_0x75bcf6))return![];if(this[_0x59c52f(0x29d)](_0x75bcf6))return![];return!![];},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x2d1)]=function(_0x183ea6){const _0x55a0e8=_0x56d65d,_0xc4e138=this[_0x55a0e8(0x198)](),_0x4ef283=DataManager[_0x55a0e8(0x292)](_0x183ea6),_0x475177=_0xc4e138[_0x55a0e8(0x4b4)](_0x113e94=>_0x4ef283['includes'](_0x113e94));return _0x475177[_0x55a0e8(0x37d)]>0x0;},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x29d)]=function(_0x2aa0fa){const _0x2987c2=_0x56d65d;if(!VisuMZ[_0x2987c2(0x453)][_0x2987c2(0x487)](this,_0x2aa0fa))return!![];if(!VisuMZ[_0x2987c2(0x453)][_0x2987c2(0x1f2)](this,_0x2aa0fa))return!![];if(!VisuMZ[_0x2987c2(0x453)][_0x2987c2(0x437)](this,_0x2aa0fa))return!![];return![];},Game_Actor['prototype']['passiveStateObjects']=function(){const _0x4559ad=_0x56d65d;let _0x29bdc3=[this[_0x4559ad(0x2d6)](),this[_0x4559ad(0x20d)]()];_0x29bdc3=_0x29bdc3['concat'](this[_0x4559ad(0x35f)]()[_0x4559ad(0x4b4)](_0x4403ad=>_0x4403ad));for(const _0x177915 of this['_skills']){if(_0x4559ad(0x305)!==_0x4559ad(0x305))return _0x16ce2e(_0x494f5f['$1']);else{const _0x199b73=$dataSkills[_0x177915];if(_0x199b73)_0x29bdc3['push'](_0x199b73);}}return _0x29bdc3;},Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x1e5)]=function(){const _0x471ea9=_0x56d65d;Game_Battler[_0x471ea9(0x317)][_0x471ea9(0x1e5)]['call'](this);const _0x3a9b45=VisuMZ[_0x471ea9(0x453)][_0x471ea9(0x433)][_0x471ea9(0x3a5)][_0x471ea9(0x4f0)];this[_0x471ea9(0x3af)][_0x471ea9(0x3c2)]=this[_0x471ea9(0x3af)][_0x471ea9(0x3c2)][_0x471ea9(0x4e3)](_0x3a9b45);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x191)]=Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x43f)],Game_Actor[_0x56d65d(0x317)]['learnSkill']=function(_0x1d7ea7){const _0x3f81d3=_0x56d65d;VisuMZ[_0x3f81d3(0x453)][_0x3f81d3(0x191)][_0x3f81d3(0x237)](this,_0x1d7ea7),this[_0x3f81d3(0x3af)]={},this[_0x3f81d3(0x3c2)]();},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x3c1)]=Game_Actor[_0x56d65d(0x317)]['forgetSkill'],Game_Actor[_0x56d65d(0x317)][_0x56d65d(0x47c)]=function(_0x390ac8){const _0x3af2e7=_0x56d65d;VisuMZ[_0x3af2e7(0x453)][_0x3af2e7(0x3c1)][_0x3af2e7(0x237)](this,_0x390ac8),this['_cache']={},this[_0x3af2e7(0x3c2)]();},Game_Actor['prototype'][_0x56d65d(0x451)]=function(){const _0x3ee6a2=_0x56d65d;return VisuMZ[_0x3ee6a2(0x453)][_0x3ee6a2(0x433)][_0x3ee6a2(0x281)][_0x3ee6a2(0x4c7)]??0x14;},Game_Enemy[_0x56d65d(0x317)][_0x56d65d(0x33f)]=function(){const _0x2853d9=_0x56d65d;let _0x213767=[this['enemy']()];return _0x213767[_0x2853d9(0x4e3)](this['skills']());},Game_Enemy[_0x56d65d(0x317)][_0x56d65d(0x1e5)]=function(){const _0x4346d2=_0x56d65d;Game_Battler[_0x4346d2(0x317)][_0x4346d2(0x1e5)][_0x4346d2(0x237)](this);const _0x499431=VisuMZ[_0x4346d2(0x453)][_0x4346d2(0x433)][_0x4346d2(0x3a5)]['Enemy'];this[_0x4346d2(0x3af)][_0x4346d2(0x3c2)]=this['_cache'][_0x4346d2(0x3c2)][_0x4346d2(0x4e3)](_0x499431);},Game_Enemy[_0x56d65d(0x317)]['skills']=function(){const _0x2225b8=_0x56d65d,_0x2f78fe=[];for(const _0x3effcc of this[_0x2225b8(0x398)]()[_0x2225b8(0x3e1)]){if('YPAqG'===_0x2225b8(0x2ae))return _0x27b250;else{const _0x2c5b38=$dataSkills[_0x3effcc[_0x2225b8(0x40f)]];if(_0x2c5b38&&!_0x2f78fe[_0x2225b8(0x233)](_0x2c5b38))_0x2f78fe[_0x2225b8(0x48b)](_0x2c5b38);}}return _0x2f78fe;},Game_Enemy['prototype'][_0x56d65d(0x3d2)]=function(_0x34d4eb){const _0x3342fc=_0x56d65d;return this[_0x3342fc(0x2a0)]($dataStates[_0x34d4eb]);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x3ce)]=Game_Unit['prototype'][_0x56d65d(0x3cb)],Game_Unit['prototype'][_0x56d65d(0x3cb)]=function(){const _0x54caa0=_0x56d65d;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x54caa0(0x453)]['Game_Unit_isAllDead'][_0x54caa0(0x237)](this);},Game_Unit[_0x56d65d(0x317)][_0x56d65d(0x261)]=function(){const _0x3cd0f3=_0x56d65d,_0x32d698=this['aliveMembers']();for(const _0x53aad9 of _0x32d698){if(!_0x53aad9[_0x3cd0f3(0x4bd)]())return![];}return!![];},VisuMZ[_0x56d65d(0x453)]['Game_Troop_setup']=Game_Troop[_0x56d65d(0x317)]['setup'],Game_Troop[_0x56d65d(0x317)][_0x56d65d(0x41b)]=function(_0x3605dc){const _0x1bb5f6=_0x56d65d;VisuMZ[_0x1bb5f6(0x453)][_0x1bb5f6(0x31d)][_0x1bb5f6(0x237)](this,_0x3605dc),this[_0x1bb5f6(0x2c0)]();},Game_Troop['prototype'][_0x56d65d(0x2c0)]=function(){const _0x465dcc=_0x56d65d;this[_0x465dcc(0x194)]=Graphics['frameCount'];},Game_Troop[_0x56d65d(0x317)][_0x56d65d(0x215)]=function(){const _0x1bf688=_0x56d65d;return this['_currentTroopUniqueID']=this[_0x1bf688(0x194)]||Graphics[_0x1bf688(0x2f3)],this[_0x1bf688(0x194)];},Scene_Skill[_0x56d65d(0x317)]['isBottomHelpMode']=function(){const _0x187661=_0x56d65d;if(ConfigManager[_0x187661(0x2c5)]&&ConfigManager[_0x187661(0x49d)]!==undefined){if(_0x187661(0x39a)===_0x187661(0x277))this[_0x187661(0x475)]&&this[_0x187661(0x38c)]?(this[_0x187661(0x1cf)][_0x187661(0x2b9)](),this[_0x187661(0x3ae)]()):_0x4318f9[_0x187661(0x453)][_0x187661(0x4a8)][_0x187661(0x237)](this);else return ConfigManager[_0x187661(0x49d)];}else{if(this[_0x187661(0x441)]())return this[_0x187661(0x1d4)]()[_0x187661(0x287)](/LOWER/i);else{if(_0x187661(0x1b7)!=='yhimX'){const _0x4d00e2=_0x277c30[_0x25ce3e];if(!_0x4d00e2)return;const _0x5d0e24=_0x4d00e2[_0x187661(0x21b)]||'',_0x309591=_0x5d0e24[_0x187661(0x287)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x309591){const _0x28b085=[_0x4d00e2];for(const _0x4ac26c of _0x309591){_0x4ac26c[_0x187661(0x287)](/<REMOVE OTHER (.*) STATES>/i);const _0x42b008=_0x27f650(_0x283797['$1']);this[_0x187661(0x2cb)](_0x42b008,_0x28b085);}}}else Scene_ItemBase[_0x187661(0x317)]['isRightInputMode'][_0x187661(0x237)](this);}}},Scene_Skill[_0x56d65d(0x317)]['isRightInputMode']=function(){const _0x4702a1=_0x56d65d;if(ConfigManager[_0x4702a1(0x2c5)]&&ConfigManager[_0x4702a1(0x21c)]!==undefined)return ConfigManager[_0x4702a1(0x21c)];else{if(this[_0x4702a1(0x441)]()){if(_0x4702a1(0x34c)!==_0x4702a1(0x34c))_0x4b1cb8[_0x4702a1(0x353)]=0x2;else return this[_0x4702a1(0x1d4)]()[_0x4702a1(0x287)](/RIGHT/i);}else return Scene_ItemBase[_0x4702a1(0x317)][_0x4702a1(0x4e9)][_0x4702a1(0x237)](this);}},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x1d4)]=function(){const _0x512305=_0x56d65d;return VisuMZ[_0x512305(0x453)]['Settings'][_0x512305(0x489)][_0x512305(0x21f)];},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x380)]=function(){const _0x39c1a9=_0x56d65d;return this[_0x39c1a9(0x1dc)]&&this[_0x39c1a9(0x1dc)][_0x39c1a9(0x380)]();},Scene_Skill[_0x56d65d(0x317)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x5d2198=_0x56d65d;return VisuMZ[_0x5d2198(0x453)][_0x5d2198(0x433)]['Skills'][_0x5d2198(0x43a)];},VisuMZ['SkillsStatesCore'][_0x56d65d(0x30d)]=Scene_Skill[_0x56d65d(0x317)]['helpWindowRect'],Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x374)]=function(){const _0x5dda8d=_0x56d65d;if(this[_0x5dda8d(0x441)]()){if(_0x5dda8d(0x22d)===_0x5dda8d(0x423)){const _0x4575b6=_0x13e754[_0x5dda8d(0x2ed)]('['+_0x13c192['$1'][_0x5dda8d(0x287)](/\d+/g)+']');for(const _0x1b85fe of _0x4575b6){if(!_0x4760ef[_0x5dda8d(0x48f)](_0x1b85fe))return![];}return!![];}else return this[_0x5dda8d(0x1a6)]();}else return _0x5dda8d(0x24e)!==_0x5dda8d(0x2bf)?VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x5dda8d(0x237)](this):this[_0x5dda8d(0x441)]()?this[_0x5dda8d(0x369)]():_0x42128f[_0x5dda8d(0x453)]['Scene_Skill_statusWindowRect'][_0x5dda8d(0x237)](this);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x1a6)]=function(){const _0x25d1f7=_0x56d65d,_0x4ad454=0x0,_0x2c2dc5=this[_0x25d1f7(0x2b0)](),_0x1d2d16=Graphics[_0x25d1f7(0x2ac)],_0x26022b=this[_0x25d1f7(0x239)]();return new Rectangle(_0x4ad454,_0x2c2dc5,_0x1d2d16,_0x26022b);},VisuMZ['SkillsStatesCore'][_0x56d65d(0x4c8)]=Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x259)],Scene_Skill[_0x56d65d(0x317)]['skillTypeWindowRect']=function(){const _0x50e40e=_0x56d65d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['skillTypeWindowRectSkillsStatesCore']():VisuMZ[_0x50e40e(0x453)][_0x50e40e(0x4c8)][_0x50e40e(0x237)](this);},Scene_Skill['prototype'][_0x56d65d(0x494)]=function(){const _0x5a7ef4=_0x56d65d;return VisuMZ[_0x5a7ef4(0x453)][_0x5a7ef4(0x433)]['Skills']['CmdWidth']??Scene_MenuBase[_0x5a7ef4(0x317)]['mainCommandWidth'][_0x5a7ef4(0x237)](this);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x255)]=function(){const _0x2f14da=_0x56d65d,_0x4acaa3=this['mainCommandWidth'](),_0x416407=this['calcWindowHeight'](0x3,!![]),_0x5590ff=this[_0x2f14da(0x4e9)]()?Graphics['boxWidth']-_0x4acaa3:0x0,_0xfe760c=this[_0x2f14da(0x417)]();return new Rectangle(_0x5590ff,_0xfe760c,_0x4acaa3,_0x416407);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill['prototype'][_0x56d65d(0x32e)],Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x32e)]=function(){const _0x2db467=_0x56d65d;return this[_0x2db467(0x441)]()?this['statusWindowRectSkillsStatesCore']():VisuMZ[_0x2db467(0x453)]['Scene_Skill_statusWindowRect'][_0x2db467(0x237)](this);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x369)]=function(){const _0x475b8f=_0x56d65d,_0x681b8f=Graphics[_0x475b8f(0x2ac)]-this[_0x475b8f(0x494)](),_0x46da7a=this[_0x475b8f(0x38e)][_0x475b8f(0x2a4)],_0x2194ae=this[_0x475b8f(0x4e9)]()?0x0:Graphics[_0x475b8f(0x2ac)]-_0x681b8f,_0x5cbca7=this[_0x475b8f(0x417)]();return new Rectangle(_0x2194ae,_0x5cbca7,_0x681b8f,_0x46da7a);},VisuMZ['SkillsStatesCore'][_0x56d65d(0x4b0)]=Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x26e)],Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x26e)]=function(){const _0x2a900b=_0x56d65d;VisuMZ[_0x2a900b(0x453)]['Scene_Skill_createItemWindow'][_0x2a900b(0x237)](this);if(this[_0x2a900b(0x1d6)]()){if(_0x2a900b(0x461)===_0x2a900b(0x461))this['createShopStatusWindow']();else{const _0x2195db=_0x1d7812[_0x11341a[_0x2a900b(0x40f)]];if(_0x2195db&&!_0x2737bd[_0x2a900b(0x233)](_0x2195db))_0x1cf8f6[_0x2a900b(0x48b)](_0x2195db);}}},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x341)]=Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x352)],Scene_Skill[_0x56d65d(0x317)]['itemWindowRect']=function(){const _0x8e8449=_0x56d65d;if(this[_0x8e8449(0x441)]())return this[_0x8e8449(0x3a9)]();else{if(_0x8e8449(0x445)!=='ipwPG')return _0x474a61['members']()[_0x34bea0(_0x215ff4['$1'])];else{const _0x33fecc=VisuMZ[_0x8e8449(0x453)]['Scene_Skill_itemWindowRect'][_0x8e8449(0x237)](this);return this[_0x8e8449(0x1d6)]()&&this[_0x8e8449(0x39c)]()&&(_0x33fecc[_0x8e8449(0x293)]-=this[_0x8e8449(0x1b2)]()),_0x33fecc;}}},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x3a9)]=function(){const _0x36eb29=_0x56d65d,_0x27d5a7=Graphics[_0x36eb29(0x2ac)]-this[_0x36eb29(0x1b2)](),_0x263fd0=this[_0x36eb29(0x4cf)]()-this[_0x36eb29(0x36b)][_0x36eb29(0x2a4)],_0x1ecbe3=this[_0x36eb29(0x4e9)]()?Graphics['boxWidth']-_0x27d5a7:0x0,_0x1b3e30=this[_0x36eb29(0x36b)]['y']+this['_statusWindow'][_0x36eb29(0x2a4)];return new Rectangle(_0x1ecbe3,_0x1b3e30,_0x27d5a7,_0x263fd0);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x1d6)]=function(){const _0x102c01=_0x56d65d;if(!Imported[_0x102c01(0x271)])return![];else return this[_0x102c01(0x441)]()?!![]:VisuMZ[_0x102c01(0x453)][_0x102c01(0x433)][_0x102c01(0x489)]['ShowShopStatus'];},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x39c)]=function(){const _0x1c8670=_0x56d65d;return VisuMZ[_0x1c8670(0x453)]['Settings']['Skills'][_0x1c8670(0x48e)];},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x3c9)]=function(){const _0x13a159=_0x56d65d,_0x4f37c1=this[_0x13a159(0x192)]();this['_shopStatusWindow']=new Window_ShopStatus(_0x4f37c1),this['addWindow'](this[_0x13a159(0x2fc)]),this[_0x13a159(0x25b)]['setStatusWindow'](this[_0x13a159(0x2fc)]);const _0x29cb8d=VisuMZ[_0x13a159(0x453)]['Settings'][_0x13a159(0x489)][_0x13a159(0x2bd)];this['_shopStatusWindow']['setBackgroundType'](_0x29cb8d||0x0);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x192)]=function(){const _0x2c6677=_0x56d65d;if(this[_0x2c6677(0x441)]())return this['shopStatusWindowRectSkillsStatesCore']();else{if(_0x2c6677(0x32b)===_0x2c6677(0x32b))return VisuMZ[_0x2c6677(0x453)][_0x2c6677(0x433)][_0x2c6677(0x489)]['SkillMenuStatusRect'][_0x2c6677(0x237)](this);else this[_0x2c6677(0x37c)]='',this['_stateData']={},this[_0x2c6677(0x2c6)]={},this[_0x2c6677(0x440)]={};}},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x325)]=function(){const _0x2227d8=_0x56d65d,_0x11fb57=this[_0x2227d8(0x1b2)](),_0x3bf52a=this[_0x2227d8(0x25b)][_0x2227d8(0x2a4)],_0x52be47=this[_0x2227d8(0x4e9)]()?0x0:Graphics['boxWidth']-this[_0x2227d8(0x1b2)](),_0x3ca060=this[_0x2227d8(0x25b)]['y'];return new Rectangle(_0x52be47,_0x3ca060,_0x11fb57,_0x3bf52a);},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x1b2)]=function(){const _0x2b05ff=_0x56d65d;return Imported[_0x2b05ff(0x271)]?Scene_Shop['prototype'][_0x2b05ff(0x4d9)]():_0x2b05ff(0x302)!==_0x2b05ff(0x367)?0x0:this[_0x2b05ff(0x325)]();},Scene_Skill[_0x56d65d(0x317)][_0x56d65d(0x262)]=function(){const _0x4adac8=_0x56d65d;if(this[_0x4adac8(0x38e)]&&this[_0x4adac8(0x38e)][_0x4adac8(0x3a2)])return TextManager[_0x4adac8(0x372)];else{if('ScDZe'!==_0x4adac8(0x1a2)){if(!_0x417b57[_0x4adac8(0x27b)](_0x34e501))return!![];}else return'';}},VisuMZ[_0x56d65d(0x453)]['Sprite_Gauge_initMembers']=Sprite_Gauge[_0x56d65d(0x317)]['initMembers'],Sprite_Gauge[_0x56d65d(0x317)]['initMembers']=function(){const _0xcf019b=_0x56d65d;VisuMZ['SkillsStatesCore']['Sprite_Gauge_initMembers'][_0xcf019b(0x237)](this),this[_0xcf019b(0x38c)]=null;},VisuMZ['SkillsStatesCore'][_0x56d65d(0x3da)]=Sprite_Gauge['prototype']['setup'],Sprite_Gauge['prototype'][_0x56d65d(0x41b)]=function(_0xc374a,_0x5bda79){const _0x43d2d6=_0x56d65d;this[_0x43d2d6(0x288)](_0xc374a,_0x5bda79),_0x5bda79=_0x5bda79[_0x43d2d6(0x389)](),VisuMZ[_0x43d2d6(0x453)][_0x43d2d6(0x3da)][_0x43d2d6(0x237)](this,_0xc374a,_0x5bda79);},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x288)]=function(_0x117b25,_0x571634){const _0x3409d4=_0x56d65d,_0x59dafb=VisuMZ['SkillsStatesCore']['Settings']['Costs']['filter'](_0x619fd6=>_0x619fd6[_0x3409d4(0x2a8)]['toUpperCase']()===_0x571634[_0x3409d4(0x4a5)]());if(_0x59dafb[_0x3409d4(0x37d)]>=0x1){if(_0x3409d4(0x4e2)!==_0x3409d4(0x284))this['_costSettings']=_0x59dafb[0x0];else return!![];}else this[_0x3409d4(0x38c)]=null;},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x49f)]=Sprite_Gauge['prototype'][_0x56d65d(0x422)],Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x422)]=function(){const _0x313853=_0x56d65d;return this[_0x313853(0x475)]&&this['_costSettings']?this[_0x313853(0x1c0)]():VisuMZ[_0x313853(0x453)][_0x313853(0x49f)][_0x313853(0x237)](this);},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x1c0)]=function(){const _0x3c7afb=_0x56d65d;return this['_costSettings'][_0x3c7afb(0x1e8)]['call'](this[_0x3c7afb(0x475)]);},VisuMZ[_0x56d65d(0x453)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x32c)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x87ce5=_0x56d65d;if(this[_0x87ce5(0x475)]&&this[_0x87ce5(0x38c)]){if(_0x87ce5(0x491)===_0x87ce5(0x491))return this[_0x87ce5(0x31b)]();else{let _0x500c29=_0x87ce5(0x1f3);if(this[_0x87ce5(0x2ad)](_0x500c29))return this[_0x87ce5(0x3af)][_0x500c29][_0x87ce5(0x233)](_0x2f0391);return this['_cache'][_0x500c29]=this['makeResistedStateCategories'](),this['_cache'][_0x500c29][_0x87ce5(0x233)](_0x3414f1);}}else{if(_0x87ce5(0x3fc)!==_0x87ce5(0x4ca))return VisuMZ[_0x87ce5(0x453)][_0x87ce5(0x470)][_0x87ce5(0x237)](this);else for(const _0x2043c1 of _0x51b18a){_0x2043c1['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x5303b4=_0x224594[_0x87ce5(0x1be)](_0x3833d9(_0xa7f911['$1'])[_0x87ce5(0x4a5)]()),_0x1eaef0=_0x32b17b(_0x552289['$2']);_0x5303b4>=0x0&&(_0x2b271b[_0x87ce5(0x29a)](_0x5303b4,_0x1eaef0),this['makeSuccess'](_0xe2f009));}}},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x31b)]=function(){const _0x33b045=_0x56d65d;return this[_0x33b045(0x38c)]['GaugeMaxJS'][_0x33b045(0x237)](this[_0x33b045(0x475)]);},VisuMZ[_0x56d65d(0x453)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x401)],Sprite_Gauge['prototype'][_0x56d65d(0x401)]=function(){const _0x2aeb8a=_0x56d65d,_0x1be9cb=VisuMZ['SkillsStatesCore'][_0x2aeb8a(0x217)][_0x2aeb8a(0x237)](this);return _0x1be9cb['clamp'](0x0,0x1);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x4a8)]=Sprite_Gauge['prototype'][_0x56d65d(0x23c)],Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x23c)]=function(){const _0x53e267=_0x56d65d;if(this[_0x53e267(0x475)]&&this[_0x53e267(0x38c)]){if(_0x53e267(0x3e4)===_0x53e267(0x3e4))this[_0x53e267(0x1cf)][_0x53e267(0x2b9)](),this['redrawSkillsStatesCore']();else return _0x5e1359[_0x53e267(0x453)][_0x53e267(0x49f)][_0x53e267(0x237)](this);}else VisuMZ[_0x53e267(0x453)][_0x53e267(0x4a8)][_0x53e267(0x237)](this);},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x26b)]=function(){const _0x2eab1e=_0x56d65d;let _0x161ffd=this[_0x2eab1e(0x422)]();return Imported[_0x2eab1e(0x28c)]&&this[_0x2eab1e(0x23f)]()&&(_0x2eab1e(0x298)!==_0x2eab1e(0x3d7)?_0x161ffd=VisuMZ[_0x2eab1e(0x1da)](_0x161ffd):this[_0x2eab1e(0x36b)]&&this[_0x2eab1e(0x36b)][_0x2eab1e(0x46c)]===_0x4d34ec&&this[_0x2eab1e(0x36b)][_0x2eab1e(0x2e6)](this[_0x2eab1e(0x1ad)](0x0))),_0x161ffd;},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x3ae)]=function(){const _0x4702e4=_0x56d65d;this[_0x4702e4(0x1cf)][_0x4702e4(0x2b9)](),this['_costSettings'][_0x4702e4(0x4f5)][_0x4702e4(0x237)](this);},Sprite_Gauge['prototype'][_0x56d65d(0x468)]=function(_0x229a7f,_0x3924a5,_0x3a12cb,_0x1c807e,_0x34a620,_0x30d841){const _0x418ed7=_0x56d65d,_0x21b48d=this[_0x418ed7(0x401)](),_0x3c280d=Math['floor']((_0x34a620-0x2)*_0x21b48d),_0x30cc14=_0x30d841-0x2,_0xe08a9e=this['gaugeBackColor']();this[_0x418ed7(0x1cf)][_0x418ed7(0x200)](_0x3a12cb,_0x1c807e,_0x34a620,_0x30d841,_0xe08a9e),this[_0x418ed7(0x1cf)][_0x418ed7(0x2e7)](_0x3a12cb+0x1,_0x1c807e+0x1,_0x3c280d,_0x30cc14,_0x229a7f,_0x3924a5);},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x37a)]=function(){const _0x5652b2=_0x56d65d,_0x31e247=VisuMZ[_0x5652b2(0x453)][_0x5652b2(0x433)][_0x5652b2(0x39d)];return _0x31e247[_0x5652b2(0x1d9)]===_0x5652b2(0x2f0)?$gameSystem[_0x5652b2(0x343)]():$gameSystem[_0x5652b2(0x1ef)]();},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x4cc)]=function(){const _0x1e39cd=_0x56d65d,_0x5e0596=VisuMZ[_0x1e39cd(0x453)][_0x1e39cd(0x433)][_0x1e39cd(0x39d)];if(_0x5e0596[_0x1e39cd(0x1d9)]===_0x1e39cd(0x2f0)){if('pGMVD'===_0x1e39cd(0x47e))this[_0x1e39cd(0x440)]={};else return $gameSystem[_0x1e39cd(0x4de)]()-0x6;}else return $gameSystem[_0x1e39cd(0x4de)]()-0x2;},Sprite_Gauge['prototype'][_0x56d65d(0x267)]=function(){const _0x1788ee=_0x56d65d,_0x2ddc86=VisuMZ[_0x1788ee(0x453)]['Settings'][_0x1788ee(0x39d)];return _0x2ddc86[_0x1788ee(0x1d8)]==='number'?$gameSystem[_0x1788ee(0x343)]():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x409)]=function(){const _0x198e6a=_0x56d65d,_0x1a07bc=VisuMZ[_0x198e6a(0x453)]['Settings'][_0x198e6a(0x39d)];return _0x1a07bc[_0x198e6a(0x1d8)]===_0x198e6a(0x2f0)?$gameSystem['mainFontSize']()-0x6:'qxgGt'===_0x198e6a(0x309)?_0x32efec['prototype'][_0x198e6a(0x4e9)][_0x198e6a(0x237)](this):$gameSystem['mainFontSize']()-0x2;},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x256)]=function(){const _0x583938=_0x56d65d,_0x331c86=VisuMZ[_0x583938(0x453)][_0x583938(0x433)][_0x583938(0x39d)];if(_0x331c86[_0x583938(0x2f8)]){if('tTuwR'!==_0x583938(0x3f3)){if(_0x331c86[_0x583938(0x365)]===0x1){if(_0x583938(0x2dd)===_0x583938(0x2dd))return this[_0x583938(0x363)]();else{const _0x2bd53b=this[_0x583938(0x401)](),_0x21b796=_0x12b932[_0x583938(0x382)]((_0x5ade99-0x2)*_0x2bd53b),_0x18e269=_0x345470-0x2,_0x1938ab=this[_0x583938(0x399)]();this[_0x583938(0x1cf)][_0x583938(0x200)](_0x47dce5,_0x2dcf81,_0x4e38c4,_0x1508ea,_0x1938ab),this[_0x583938(0x1cf)]['gradientFillRect'](_0x4f2f23+0x1,_0x513386+0x1,_0x21b796,_0x18e269,_0x2e3ce2,_0x175bf8);}}else{if(_0x331c86['MatchLabelGaugeColor']===0x2)return _0x583938(0x25e)==='hNreJ'?_0x35a556['mainFontSize']()-0x6:this[_0x583938(0x4ea)]();}}else this['onAddBuffGlobalJS'](_0x2b2bc5,_0x4ea8e9);}const _0x513a70=_0x331c86[_0x583938(0x29f)];return ColorManager[_0x583938(0x4ad)](_0x513a70);},Sprite_Gauge['prototype'][_0x56d65d(0x34e)]=function(){const _0x2ddd6a=_0x56d65d,_0x495744=VisuMZ[_0x2ddd6a(0x453)]['Settings'][_0x2ddd6a(0x39d)];if(this[_0x2ddd6a(0x2e5)]()<=0x0)return _0x2ddd6a(0x201);else{if(_0x495744['LabelOutlineSolid']){if(_0x2ddd6a(0x40b)===_0x2ddd6a(0x3a8)){const _0x573af4=_0x34b24c[_0x2ddd6a(0x2ed)]('['+_0x2d54c7['$1'][_0x2ddd6a(0x287)](/\d+/g)+']');for(const _0x3be775 of _0x573af4){if(_0x3d533e[_0x2ddd6a(0x48f)](_0x3be775))return!![];}return![];}else return'rgba(0,\x200,\x200,\x201)';}else return ColorManager[_0x2ddd6a(0x2c8)]();}},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x2e5)]=function(){const _0x2a0f0d=_0x56d65d;return VisuMZ[_0x2a0f0d(0x453)][_0x2a0f0d(0x433)][_0x2a0f0d(0x39d)][_0x2a0f0d(0x4b1)]||0x0;},Sprite_Gauge[_0x56d65d(0x317)][_0x56d65d(0x34f)]=function(){const _0xee395e=_0x56d65d,_0x320ae0=VisuMZ[_0xee395e(0x453)][_0xee395e(0x433)][_0xee395e(0x39d)];if(this[_0xee395e(0x3b8)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else{if(_0x320ae0['ValueOutlineSolid'])return _0xee395e(0x3be)!==_0xee395e(0x3be)?_0x2ff4ca[_0xee395e(0x4de)]()-0x6:_0xee395e(0x25d);else{if(_0xee395e(0x2e8)!==_0xee395e(0x4ba))return ColorManager[_0xee395e(0x2c8)]();else{const _0x45d052=this[_0xee395e(0x314)](_0x7dd2d9)[_0xee395e(0x4b4)](_0x3340cb=>this[_0xee395e(0x32a)](_0x3340cb['id']));return _0x45d052[_0xee395e(0x37d)];}}}},Sprite_Gauge['prototype'][_0x56d65d(0x3b8)]=function(){const _0x2a5632=_0x56d65d;return VisuMZ[_0x2a5632(0x453)][_0x2a5632(0x433)][_0x2a5632(0x39d)][_0x2a5632(0x1c9)]||0x0;},VisuMZ[_0x56d65d(0x453)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x19a)],Sprite_StateIcon['prototype'][_0x56d65d(0x19a)]=function(){const _0x2b752e=_0x56d65d;VisuMZ[_0x2b752e(0x453)]['Sprite_StateIcon_loadBitmap'][_0x2b752e(0x237)](this),this[_0x2b752e(0x1c4)]();},Sprite_StateIcon['prototype'][_0x56d65d(0x1c4)]=function(){const _0x2e81a6=_0x56d65d,_0x4aa3e3=Window_Base[_0x2e81a6(0x317)][_0x2e81a6(0x4f1)]();this[_0x2e81a6(0x1ea)]=new Sprite(),this['_turnDisplaySprite'][_0x2e81a6(0x1cf)]=new Bitmap(ImageManager[_0x2e81a6(0x49b)],_0x4aa3e3),this[_0x2e81a6(0x1ea)][_0x2e81a6(0x362)]['x']=this['anchor']['x'],this[_0x2e81a6(0x1ea)]['anchor']['y']=this['anchor']['y'],this[_0x2e81a6(0x3f6)](this[_0x2e81a6(0x1ea)]),this[_0x2e81a6(0x4cd)]=this[_0x2e81a6(0x1ea)][_0x2e81a6(0x1cf)];},VisuMZ[_0x56d65d(0x453)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x216)],Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x216)]=function(){const _0x386a3c=_0x56d65d;VisuMZ[_0x386a3c(0x453)][_0x386a3c(0x213)][_0x386a3c(0x237)](this),this[_0x386a3c(0x47a)]();},Sprite_StateIcon['prototype'][_0x56d65d(0x3e9)]=function(_0x3977c4,_0x2cbe1,_0x4bd9bc,_0x2d2932,_0x5f1fba){const _0x221218=_0x56d65d;this[_0x221218(0x4cd)][_0x221218(0x3e9)](_0x3977c4,_0x2cbe1,_0x4bd9bc,_0x2d2932,this['contents']['height'],_0x5f1fba);},Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x47a)]=function(){const _0x1943fc=_0x56d65d;this['resetFontSettings'](),this[_0x1943fc(0x4cd)]['clear']();const _0x21f10b=this['_battler'];if(!_0x21f10b)return;const _0x3cbfb3=_0x21f10b[_0x1943fc(0x324)]()[_0x1943fc(0x4b4)](_0x1f4937=>_0x1f4937[_0x1943fc(0x4df)]>0x0),_0x3f70fb=[...Array(0x8)[_0x1943fc(0x2b6)]()][_0x1943fc(0x4b4)](_0x11434b=>_0x21f10b['buff'](_0x11434b)!==0x0),_0x4449da=this[_0x1943fc(0x23b)],_0x797f0d=_0x3cbfb3[_0x4449da];if(_0x797f0d)'HOfIU'!=='HOfIU'?this[_0x1943fc(0x194)]=_0x15a73c['frameCount']:(Window_Base[_0x1943fc(0x317)][_0x1943fc(0x2ab)][_0x1943fc(0x237)](this,_0x21f10b,_0x797f0d,0x0,0x0),Window_Base[_0x1943fc(0x317)][_0x1943fc(0x306)]['call'](this,_0x21f10b,_0x797f0d,0x0,0x0));else{if(_0x1943fc(0x227)!=='JwyKY'){const _0x55180c=_0x3f70fb[_0x4449da-_0x3cbfb3[_0x1943fc(0x37d)]];if(_0x55180c===undefined)return;Window_Base['prototype'][_0x1943fc(0x408)]['call'](this,_0x21f10b,_0x55180c,0x0,0x0),Window_Base[_0x1943fc(0x317)][_0x1943fc(0x471)]['call'](this,_0x21f10b,_0x55180c,0x0,0x0);}else{if(_0x20c376)_0xea3794['refresh']();}}},Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x252)]=function(){const _0x52e579=_0x56d65d;this[_0x52e579(0x4cd)][_0x52e579(0x2c7)]=$gameSystem[_0x52e579(0x1ef)](),this['contents'][_0x52e579(0x1f8)]=$gameSystem[_0x52e579(0x4de)](),this[_0x52e579(0x1f9)]();},Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x1f9)]=function(){const _0x20d0c2=_0x56d65d;this[_0x20d0c2(0x1a1)](ColorManager[_0x20d0c2(0x332)]()),this[_0x20d0c2(0x1c3)](ColorManager[_0x20d0c2(0x2c8)]());},Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x1a1)]=function(_0x3ba59f){const _0x1a2048=_0x56d65d;this[_0x1a2048(0x4cd)]['textColor']=_0x3ba59f;},Sprite_StateIcon[_0x56d65d(0x317)]['changeOutlineColor']=function(_0x3d4abe){const _0x483eb6=_0x56d65d;this[_0x483eb6(0x4cd)][_0x483eb6(0x2c8)]=_0x3d4abe;},Sprite_StateIcon[_0x56d65d(0x317)][_0x56d65d(0x204)]=function(){const _0x48a18b=_0x56d65d;this[_0x48a18b(0x35e)]=!![],this['updateVisibility']();},Window_Base['prototype'][_0x56d65d(0x206)]=function(_0x2e7496,_0x51ce3c,_0x5b5c08,_0x110a1a,_0x9e6054){const _0x5eb814=_0x56d65d,_0x509eb3=this[_0x5eb814(0x1ab)](_0x2e7496,_0x51ce3c),_0x12c05f=this[_0x5eb814(0x4a3)](_0x509eb3,_0x5b5c08,_0x110a1a,_0x9e6054),_0x5b367f=_0x5b5c08+_0x9e6054-_0x12c05f[_0x5eb814(0x293)];this['drawTextEx'](_0x509eb3,_0x5b367f,_0x110a1a,_0x9e6054),this['resetFontSettings']();},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x1ab)]=function(_0xa77ee3,_0x47981e){const _0x1d2c3b=_0x56d65d;let _0x940968='';for(settings of VisuMZ['SkillsStatesCore'][_0x1d2c3b(0x433)][_0x1d2c3b(0x1aa)]){if(!this['isSkillCostShown'](_0xa77ee3,_0x47981e,settings))continue;if(_0x940968[_0x1d2c3b(0x37d)]>0x0)_0x940968+=this[_0x1d2c3b(0x1df)]();_0x940968+=this['createSkillCostText'](_0xa77ee3,_0x47981e,settings);}_0x940968=this[_0x1d2c3b(0x405)](_0xa77ee3,_0x47981e,_0x940968);if(_0x47981e[_0x1d2c3b(0x21b)][_0x1d2c3b(0x287)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x940968[_0x1d2c3b(0x37d)]>0x0)_0x940968+=this[_0x1d2c3b(0x1df)]();_0x940968+=String(RegExp['$1']);}return _0x940968;},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x405)]=function(_0xbfbbd7,_0x52f774,_0x2f5aed){return _0x2f5aed;},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x1f4)]=function(_0x4e68f2,_0x1feaa8,_0x2558ac){const _0x21fad6=_0x56d65d;let _0x2077cb=_0x2558ac[_0x21fad6(0x3e8)]['call'](_0x4e68f2,_0x1feaa8);return _0x2077cb=_0x4e68f2[_0x21fad6(0x24b)](_0x1feaa8,_0x2077cb,_0x2558ac),_0x2558ac[_0x21fad6(0x4a7)]['call'](_0x4e68f2,_0x1feaa8,_0x2077cb,_0x2558ac);},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x2b2)]=function(_0x3bbbf3,_0x258d88,_0x30f3bc){const _0x54e438=_0x56d65d;let _0x11b7c2=_0x30f3bc[_0x54e438(0x3e8)][_0x54e438(0x237)](_0x3bbbf3,_0x258d88);return _0x11b7c2=_0x3bbbf3['adjustSkillCost'](_0x258d88,_0x11b7c2,_0x30f3bc),_0x30f3bc[_0x54e438(0x1a0)][_0x54e438(0x237)](_0x3bbbf3,_0x258d88,_0x11b7c2,_0x30f3bc);},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x1df)]=function(){return'\x20';},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x449)]=function(_0x5ae7a6,_0x548330,_0x1c6d0d,_0x303aa0){const _0x59258=_0x56d65d;if(!_0x5ae7a6)return;VisuMZ[_0x59258(0x453)][_0x59258(0x486)][_0x59258(0x237)](this,_0x5ae7a6,_0x548330,_0x1c6d0d,_0x303aa0),this['drawActorIconsAllTurnCounters'](_0x5ae7a6,_0x548330,_0x1c6d0d,_0x303aa0);},Window_Base['prototype'][_0x56d65d(0x339)]=function(_0x415cf7,_0x81cc8e,_0x25ea39,_0xfda625){const _0x461b83=_0x56d65d;_0xfda625=_0xfda625||0x90;const _0x4fcf8b=ImageManager['iconWidth'],_0x19c5d9=_0x415cf7['allIcons']()[_0x461b83(0x350)](0x0,Math['floor'](_0xfda625/_0x4fcf8b)),_0x1c43d6=_0x415cf7[_0x461b83(0x324)]()[_0x461b83(0x4b4)](_0x2892ba=>_0x2892ba[_0x461b83(0x4df)]>0x0),_0x184b67=[...Array(0x8)[_0x461b83(0x2b6)]()][_0x461b83(0x4b4)](_0x3aa72c=>_0x415cf7[_0x461b83(0x212)](_0x3aa72c)!==0x0),_0x6e09e5=[];let _0x3b42bf=_0x81cc8e;for(let _0x260827=0x0;_0x260827<_0x19c5d9[_0x461b83(0x37d)];_0x260827++){if(_0x461b83(0x38a)==='aRDSi'){this['resetFontSettings']();const _0x3d3df0=_0x1c43d6[_0x260827];if(_0x3d3df0)!_0x6e09e5[_0x461b83(0x233)](_0x3d3df0)&&(_0x461b83(0x4c3)===_0x461b83(0x404)?_0x514746[_0x461b83(0x48b)](_0x1652a9(_0x46e567)):this[_0x461b83(0x2ab)](_0x415cf7,_0x3d3df0,_0x3b42bf,_0x25ea39)),this['drawActorStateData'](_0x415cf7,_0x3d3df0,_0x3b42bf,_0x25ea39),_0x6e09e5['push'](_0x3d3df0);else{if(_0x461b83(0x4a9)!==_0x461b83(0x4a9))return _0x452241['_subject'];else{const _0x50e0d6=_0x184b67[_0x260827-_0x1c43d6[_0x461b83(0x37d)]];this[_0x461b83(0x408)](_0x415cf7,_0x50e0d6,_0x3b42bf,_0x25ea39),this[_0x461b83(0x471)](_0x415cf7,_0x50e0d6,_0x3b42bf,_0x25ea39);}}_0x3b42bf+=_0x4fcf8b;}else{if(typeof _0xb3dfc!==_0x461b83(0x2f0))_0x39ebfb=_0x893660['id'];this[_0x461b83(0x482)]=this['_stateData']||{},this[_0x461b83(0x482)][_0x4ea123]={};}}},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x2ab)]=function(_0x266c0a,_0x97482f,_0x254d0d,_0xfc1f21){const _0xd7bd4b=_0x56d65d;if(!VisuMZ[_0xd7bd4b(0x453)][_0xd7bd4b(0x433)][_0xd7bd4b(0x281)][_0xd7bd4b(0x208)])return;if(!_0x266c0a[_0xd7bd4b(0x32a)](_0x97482f['id']))return;if(_0x97482f[_0xd7bd4b(0x353)]===0x0)return;if(_0x97482f['note']['match'](/<HIDE STATE TURNS>/i))return;const _0x4dceeb=_0x266c0a[_0xd7bd4b(0x435)](_0x97482f['id']),_0x2fc7e3=ImageManager[_0xd7bd4b(0x49b)],_0x131099=ColorManager[_0xd7bd4b(0x3f9)](_0x97482f);this['changeTextColor'](_0x131099),this[_0xd7bd4b(0x1c3)](_0xd7bd4b(0x25d)),this[_0xd7bd4b(0x4cd)][_0xd7bd4b(0x1e1)]=!![],this[_0xd7bd4b(0x4cd)][_0xd7bd4b(0x1f8)]=VisuMZ[_0xd7bd4b(0x453)][_0xd7bd4b(0x433)][_0xd7bd4b(0x281)][_0xd7bd4b(0x1d0)],_0x254d0d+=VisuMZ[_0xd7bd4b(0x453)][_0xd7bd4b(0x433)][_0xd7bd4b(0x281)]['TurnOffsetX'],_0xfc1f21+=VisuMZ[_0xd7bd4b(0x453)][_0xd7bd4b(0x433)][_0xd7bd4b(0x281)][_0xd7bd4b(0x4f3)],this[_0xd7bd4b(0x3e9)](_0x4dceeb,_0x254d0d,_0xfc1f21,_0x2fc7e3,_0xd7bd4b(0x45a)),this[_0xd7bd4b(0x4cd)][_0xd7bd4b(0x1e1)]=![],this[_0xd7bd4b(0x252)]();},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x306)]=function(_0x2ce976,_0x180bde,_0x521842,_0x33b8c0){const _0x13c266=_0x56d65d;if(!VisuMZ['SkillsStatesCore'][_0x13c266(0x433)][_0x13c266(0x281)][_0x13c266(0x4eb)])return;const _0x2b6daf=ImageManager['iconWidth'],_0x5ca3b8=ImageManager[_0x13c266(0x3b6)]/0x2,_0x3f8551=ColorManager['normalColor']();this[_0x13c266(0x1a1)](_0x3f8551),this[_0x13c266(0x1c3)](_0x13c266(0x25d)),this['contents'][_0x13c266(0x1e1)]=!![],this[_0x13c266(0x4cd)][_0x13c266(0x1f8)]=VisuMZ[_0x13c266(0x453)][_0x13c266(0x433)]['States'][_0x13c266(0x480)],_0x521842+=VisuMZ[_0x13c266(0x453)]['Settings'][_0x13c266(0x281)][_0x13c266(0x469)],_0x33b8c0+=VisuMZ[_0x13c266(0x453)][_0x13c266(0x433)][_0x13c266(0x281)][_0x13c266(0x492)];const _0x18951d=String(_0x2ce976[_0x13c266(0x3b0)](_0x180bde['id']));this[_0x13c266(0x3e9)](_0x18951d,_0x521842,_0x33b8c0,_0x2b6daf,_0x13c266(0x333)),this[_0x13c266(0x4cd)]['fontBold']=![],this[_0x13c266(0x252)]();},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x408)]=function(_0x343469,_0x519d7d,_0x1a70db,_0x45055b){const _0x53c015=_0x56d65d;if(!VisuMZ[_0x53c015(0x453)][_0x53c015(0x433)][_0x53c015(0x33b)][_0x53c015(0x208)])return;const _0x14376d=_0x343469[_0x53c015(0x212)](_0x519d7d);if(_0x14376d===0x0)return;const _0x3e6973=_0x343469[_0x53c015(0x2a5)](_0x519d7d),_0x2ae29e=ImageManager[_0x53c015(0x49b)],_0xf3d35d=_0x14376d>0x0?ColorManager[_0x53c015(0x4bf)]():ColorManager[_0x53c015(0x2b4)]();this[_0x53c015(0x1a1)](_0xf3d35d),this[_0x53c015(0x1c3)](_0x53c015(0x25d)),this[_0x53c015(0x4cd)][_0x53c015(0x1e1)]=!![],this[_0x53c015(0x4cd)]['fontSize']=VisuMZ['SkillsStatesCore'][_0x53c015(0x433)]['Buffs']['TurnFontSize'],_0x1a70db+=VisuMZ[_0x53c015(0x453)]['Settings'][_0x53c015(0x33b)][_0x53c015(0x465)],_0x45055b+=VisuMZ[_0x53c015(0x453)][_0x53c015(0x433)][_0x53c015(0x33b)]['TurnOffsetY'],this[_0x53c015(0x3e9)](_0x3e6973,_0x1a70db,_0x45055b,_0x2ae29e,_0x53c015(0x45a)),this[_0x53c015(0x4cd)][_0x53c015(0x1e1)]=![],this['resetFontSettings']();},Window_Base[_0x56d65d(0x317)][_0x56d65d(0x471)]=function(_0x2b5491,_0x18cd09,_0x221b72,_0xce8ff1){const _0x2d79fd=_0x56d65d;if(!VisuMZ[_0x2d79fd(0x453)][_0x2d79fd(0x433)]['Buffs'][_0x2d79fd(0x4eb)])return;const _0x1da174=_0x2b5491[_0x2d79fd(0x24d)](_0x18cd09),_0x3f33cd=_0x2b5491[_0x2d79fd(0x212)](_0x18cd09),_0x34685f=ImageManager[_0x2d79fd(0x49b)],_0x6d44d9=ImageManager['iconHeight']/0x2,_0x24a0a6=_0x3f33cd>0x0?ColorManager[_0x2d79fd(0x4bf)]():ColorManager[_0x2d79fd(0x2b4)]();this[_0x2d79fd(0x1a1)](_0x24a0a6),this[_0x2d79fd(0x1c3)]('rgba(0,\x200,\x200,\x201)'),this[_0x2d79fd(0x4cd)]['fontBold']=!![],this['contents']['fontSize']=VisuMZ['SkillsStatesCore'][_0x2d79fd(0x433)][_0x2d79fd(0x33b)][_0x2d79fd(0x480)],_0x221b72+=VisuMZ['SkillsStatesCore']['Settings'][_0x2d79fd(0x33b)]['DataOffsetX'],_0xce8ff1+=VisuMZ[_0x2d79fd(0x453)]['Settings'][_0x2d79fd(0x33b)][_0x2d79fd(0x492)];const _0x538731=_0x2d79fd(0x276)[_0x2d79fd(0x19c)](Math[_0x2d79fd(0x3f1)](_0x1da174*0x64));this[_0x2d79fd(0x3e9)](_0x538731,_0x221b72,_0xce8ff1,_0x34685f,'center'),this[_0x2d79fd(0x4cd)][_0x2d79fd(0x1e1)]=![],this[_0x2d79fd(0x252)]();},VisuMZ['SkillsStatesCore'][_0x56d65d(0x1ac)]=Window_StatusBase[_0x56d65d(0x317)][_0x56d65d(0x46a)],Window_StatusBase[_0x56d65d(0x317)]['placeGauge']=function(_0x5918c2,_0x1eeef0,_0xf8b4c,_0x5eb16e){const _0x3d6333=_0x56d65d;if(_0x5918c2[_0x3d6333(0x48d)]())_0x1eeef0=this['convertGaugeTypeSkillsStatesCore'](_0x5918c2,_0x1eeef0);this[_0x3d6333(0x1e2)](_0x5918c2,_0x1eeef0,_0xf8b4c,_0x5eb16e);},Window_StatusBase['prototype'][_0x56d65d(0x1e2)]=function(_0x36519d,_0x1c8f24,_0x345d8c,_0x526b5a){const _0x3a365d=_0x56d65d;if([_0x3a365d(0x3a7),'untitled'][_0x3a365d(0x233)](_0x1c8f24[_0x3a365d(0x389)]()))return;VisuMZ[_0x3a365d(0x453)][_0x3a365d(0x1ac)][_0x3a365d(0x237)](this,_0x36519d,_0x1c8f24,_0x345d8c,_0x526b5a);},Window_StatusBase[_0x56d65d(0x317)][_0x56d65d(0x230)]=function(_0x479f15,_0x18569e){const _0x2f2015=_0x56d65d,_0xb177c9=_0x479f15[_0x2f2015(0x20d)]()[_0x2f2015(0x21b)];if(_0x18569e==='hp'&&_0xb177c9[_0x2f2015(0x287)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x18569e==='mp'&&_0xb177c9['match'](/<REPLACE MP GAUGE:[ ](.*)>/i)){if('ONHqR'!==_0x2f2015(0x1bf))return String(RegExp['$1']);else _0x1e2ba0[_0x2f2015(0x317)]['drawActorStateTurns'][_0x2f2015(0x237)](this,_0xf10c8e,_0x6e9ccf,0x0,0x0),_0x5b4253[_0x2f2015(0x317)]['drawActorStateData'][_0x2f2015(0x237)](this,_0x265b57,_0x5d178a,0x0,0x0);}else{if(_0x18569e==='tp'&&_0xb177c9['match'](/<REPLACE TP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if('KWLme'!==_0x2f2015(0x330))return _0x18569e;else{const _0x237557=_0x2f2015(0x245);this['_colorCache']=this[_0x2f2015(0x253)]||{};if(this[_0x2f2015(0x253)][_0x237557])return this[_0x2f2015(0x253)][_0x237557];const _0x1a0cf5=_0x1c4f53[_0x2f2015(0x453)][_0x2f2015(0x433)]['Buffs'][_0x2f2015(0x1fd)];return this[_0x2f2015(0x472)](_0x237557,_0x1a0cf5);}}}}},VisuMZ[_0x56d65d(0x453)]['Window_StatusBase_drawActorIcons']=Window_StatusBase['prototype'][_0x56d65d(0x449)],Window_StatusBase[_0x56d65d(0x317)][_0x56d65d(0x449)]=function(_0x72053e,_0x460822,_0x274948,_0x860864){const _0x4b057c=_0x56d65d;if(!_0x72053e)return;Window_Base['prototype']['drawActorIcons'][_0x4b057c(0x237)](this,_0x72053e,_0x460822,_0x274948,_0x860864);},VisuMZ[_0x56d65d(0x453)]['Window_SkillType_initialize']=Window_SkillType[_0x56d65d(0x317)][_0x56d65d(0x41f)],Window_SkillType['prototype'][_0x56d65d(0x41f)]=function(_0x25717e){const _0x452ed7=_0x56d65d;VisuMZ[_0x452ed7(0x453)]['Window_SkillType_initialize'][_0x452ed7(0x237)](this,_0x25717e),this[_0x452ed7(0x379)](_0x25717e);},Window_SkillType[_0x56d65d(0x317)][_0x56d65d(0x379)]=function(_0x3ca3bb){const _0x3e278c=_0x56d65d,_0x2e63ab=new Rectangle(0x0,0x0,_0x3ca3bb['width'],_0x3ca3bb[_0x3e278c(0x2a4)]);this[_0x3e278c(0x3d8)]=new Window_Base(_0x2e63ab),this[_0x3e278c(0x3d8)]['opacity']=0x0,this[_0x3e278c(0x3f6)](this[_0x3e278c(0x3d8)]),this['updateCommandNameWindow']();},Window_SkillType[_0x56d65d(0x317)]['callUpdateHelp']=function(){const _0x1bc180=_0x56d65d;Window_Command[_0x1bc180(0x317)][_0x1bc180(0x22e)][_0x1bc180(0x237)](this);if(this['_commandNameWindow'])this[_0x1bc180(0x295)]();},Window_SkillType[_0x56d65d(0x317)][_0x56d65d(0x295)]=function(){const _0x86bf6b=_0x56d65d,_0x20854f=this['_commandNameWindow'];_0x20854f[_0x86bf6b(0x4cd)][_0x86bf6b(0x2b9)]();const _0x3579c4=this[_0x86bf6b(0x27d)](this[_0x86bf6b(0x202)]());if(_0x3579c4===_0x86bf6b(0x383)&&this['maxItems']()>0x0){if(_0x86bf6b(0x3e5)!==_0x86bf6b(0x3e5)){if(!this[_0x86bf6b(0x197)](_0x1c3205))return![];if(!_0x4f8b41)return![];if(!this['isSkillTypeMatchForUse'](_0x168a4f))return![];if(this['isSkillHidden'](_0x19c0d3))return![];return!![];}else{const _0x5b9c17=this[_0x86bf6b(0x4b5)](this[_0x86bf6b(0x202)]());let _0x3899fe=this[_0x86bf6b(0x4a2)](this[_0x86bf6b(0x202)]());_0x3899fe=_0x3899fe['replace'](/\\I\[(\d+)\]/gi,''),_0x20854f[_0x86bf6b(0x252)](),this[_0x86bf6b(0x260)](_0x3899fe,_0x5b9c17),this[_0x86bf6b(0x377)](_0x3899fe,_0x5b9c17),this[_0x86bf6b(0x316)](_0x3899fe,_0x5b9c17);}}},Window_SkillType['prototype']['commandNameWindowDrawBackground']=function(_0x209fd4,_0x19f0bc){},Window_SkillType[_0x56d65d(0x317)]['commandNameWindowDrawText']=function(_0x5f1ddb,_0xbc91b8){const _0x433946=_0x56d65d,_0x3b79f3=this[_0x433946(0x3d8)];_0x3b79f3[_0x433946(0x3e9)](_0x5f1ddb,0x0,_0xbc91b8['y'],_0x3b79f3[_0x433946(0x4ac)],'center');},Window_SkillType[_0x56d65d(0x317)][_0x56d65d(0x316)]=function(_0x591473,_0x4e6c76){const _0x4134ac=_0x56d65d,_0x106319=this[_0x4134ac(0x3d8)],_0x3311c9=$gameSystem[_0x4134ac(0x2a7)](),_0x1d6f64=_0x4e6c76['x']+Math['floor'](_0x4e6c76[_0x4134ac(0x293)]/0x2)+_0x3311c9;_0x106319['x']=_0x106319[_0x4134ac(0x293)]/-0x2+_0x1d6f64,_0x106319['y']=Math[_0x4134ac(0x382)](_0x4e6c76[_0x4134ac(0x2a4)]/0x2);},Window_SkillType[_0x56d65d(0x317)]['isUseModernControls']=function(){const _0x58134d=_0x56d65d;return Imported[_0x58134d(0x28c)]&&Window_Command[_0x58134d(0x317)]['isUseModernControls']['call'](this);},Window_SkillType['prototype'][_0x56d65d(0x205)]=function(){const _0x305c4a=_0x56d65d;if(!this[_0x305c4a(0x242)])return;const _0x4e2af5=this[_0x305c4a(0x242)][_0x305c4a(0x198)]();for(const _0x6b3c0a of _0x4e2af5){const _0x156246=this[_0x305c4a(0x4bc)](_0x6b3c0a);this[_0x305c4a(0x248)](_0x156246,_0x305c4a(0x3b4),!![],_0x6b3c0a);}},Window_SkillType[_0x56d65d(0x317)][_0x56d65d(0x4bc)]=function(_0x2047d6){const _0xc26f1f=_0x56d65d;let _0x9500cd=$dataSystem[_0xc26f1f(0x198)][_0x2047d6];if(_0x9500cd['match'](/\\I\[(\d+)\]/i))return _0x9500cd;if(this['commandStyle']()===_0xc26f1f(0x193))return _0x9500cd;const _0x421809=VisuMZ[_0xc26f1f(0x453)][_0xc26f1f(0x433)][_0xc26f1f(0x489)],_0x2f1b67=$dataSystem[_0xc26f1f(0x3bd)][_0xc26f1f(0x233)](_0x2047d6),_0x1eb07c=_0x2f1b67?_0x421809[_0xc26f1f(0x1a7)]:_0x421809[_0xc26f1f(0x240)];return _0xc26f1f(0x2d0)[_0xc26f1f(0x19c)](_0x1eb07c,_0x9500cd);},Window_SkillType[_0x56d65d(0x317)]['itemTextAlign']=function(){const _0x5e1d91=_0x56d65d;return VisuMZ[_0x5e1d91(0x453)][_0x5e1d91(0x433)][_0x5e1d91(0x489)][_0x5e1d91(0x1ed)];},Window_SkillType['prototype'][_0x56d65d(0x42e)]=function(_0x2091e6){const _0x47ac55=_0x56d65d,_0x412dd1=this[_0x47ac55(0x27d)](_0x2091e6);if(_0x412dd1===_0x47ac55(0x416)){if(_0x47ac55(0x1d2)===_0x47ac55(0x1d2))this[_0x47ac55(0x211)](_0x2091e6);else{if(_0x133835[_0x47ac55(0x41e)])this[_0x47ac55(0x28e)]();}}else{if(_0x412dd1==='icon'){if('oSevh'===_0x47ac55(0x32f))this[_0x47ac55(0x1ff)](_0x2091e6);else return _0x5c56b1[_0x47ac55(0x292)](_0x2f7402)[_0x47ac55(0x233)](this[_0x47ac55(0x436)]);}else{if(_0x47ac55(0x1ba)===_0x47ac55(0x207))return this[_0x47ac55(0x28a)](_0xd29371)>0x0;else Window_Command[_0x47ac55(0x317)][_0x47ac55(0x42e)]['call'](this,_0x2091e6);}}},Window_SkillType[_0x56d65d(0x317)]['commandStyle']=function(){const _0x1c6eab=_0x56d65d;return VisuMZ[_0x1c6eab(0x453)][_0x1c6eab(0x433)][_0x1c6eab(0x489)]['CmdStyle'];},Window_SkillType[_0x56d65d(0x317)]['commandStyleCheck']=function(_0x25d65c){const _0x5b26f1=_0x56d65d;if(_0x25d65c<0x0)return'text';const _0x35c888=this[_0x5b26f1(0x34d)]();if(_0x35c888!==_0x5b26f1(0x4b6)){if(_0x5b26f1(0x354)==='eNGCT'){let _0x564b1b=this[_0x5b26f1(0x422)]();return _0x355533[_0x5b26f1(0x28c)]&&this[_0x5b26f1(0x23f)]()&&(_0x564b1b=_0x30312b[_0x5b26f1(0x1da)](_0x564b1b)),_0x564b1b;}else return _0x35c888;}else{if(this[_0x5b26f1(0x3f5)]()>0x0){if(_0x5b26f1(0x393)!==_0x5b26f1(0x30c)){const _0x54283c=this['commandName'](_0x25d65c);if(_0x54283c[_0x5b26f1(0x287)](/\\I\[(\d+)\]/i)){if(_0x5b26f1(0x346)===_0x5b26f1(0x384)){if(!_0x9df9d4[_0x5b26f1(0x453)][_0x5b26f1(0x487)](this,_0x5b9dd6))return!![];if(!_0x52267a['SkillsStatesCore']['CheckVisibleSwitchNotetags'](this,_0x15ca1d))return!![];if(!_0x248dc4['SkillsStatesCore']['CheckVisibleSkillNotetags'](this,_0xb7871c))return!![];return![];}else{const _0x10e985=this[_0x5b26f1(0x4b5)](_0x25d65c),_0x5d66a4=this[_0x5b26f1(0x4a3)](_0x54283c)[_0x5b26f1(0x293)];return _0x5d66a4<=_0x10e985['width']?_0x5b26f1(0x416):'icon';}}}else _0x3c4626[_0x5b26f1(0x397)]((_0x11f45f,_0x1ae027)=>{const _0x109139=_0x5b26f1,_0x3dcbf8=_0x11f45f[_0x109139(0x3c6)],_0x9f172d=_0x1ae027[_0x109139(0x3c6)];if(_0x3dcbf8!==_0x9f172d)return _0x9f172d-_0x3dcbf8;return _0x11f45f-_0x1ae027;});}}return _0x5b26f1(0x193);},Window_SkillType[_0x56d65d(0x317)]['drawItemStyleIconText']=function(_0x59795d){const _0x28ded7=_0x56d65d,_0x394776=this[_0x28ded7(0x4b5)](_0x59795d),_0x1cb88d=this[_0x28ded7(0x4a2)](_0x59795d),_0x1a1d1d=this['textSizeEx'](_0x1cb88d)[_0x28ded7(0x293)];this[_0x28ded7(0x30b)](this[_0x28ded7(0x20f)](_0x59795d));const _0x492db9=this['itemTextAlign']();if(_0x492db9===_0x28ded7(0x45a)){if(_0x28ded7(0x273)!=='qsmYo'){const _0x689af6=_0x424618[_0x28ded7(0x2ed)]('['+_0x58ff7d['$1']['match'](/\d+/g)+']');for(const _0xa1bc34 of _0x689af6){if(!_0x2097db[_0x28ded7(0x27b)](_0xa1bc34))return![];}return!![];}else this['drawTextEx'](_0x1cb88d,_0x394776['x']+_0x394776[_0x28ded7(0x293)]-_0x1a1d1d,_0x394776['y'],_0x1a1d1d);}else{if(_0x492db9==='center'){const _0x2f4de3=_0x394776['x']+Math[_0x28ded7(0x382)]((_0x394776[_0x28ded7(0x293)]-_0x1a1d1d)/0x2);this[_0x28ded7(0x275)](_0x1cb88d,_0x2f4de3,_0x394776['y'],_0x1a1d1d);}else{if('DeOfm'!==_0x28ded7(0x2e4))this[_0x28ded7(0x275)](_0x1cb88d,_0x394776['x'],_0x394776['y'],_0x1a1d1d);else{if(!_0x544112[_0x28ded7(0x453)][_0x28ded7(0x487)](this[_0x28ded7(0x242)],_0x579ae9))return![];if(!_0x173b09[_0x28ded7(0x453)][_0x28ded7(0x1f2)](this[_0x28ded7(0x242)],_0x4e6964))return![];if(!_0x5d9c52[_0x28ded7(0x453)][_0x28ded7(0x437)](this[_0x28ded7(0x242)],_0x3750f2))return![];return!![];}}}},Window_SkillType[_0x56d65d(0x317)]['drawItemStyleIcon']=function(_0x4278b5){const _0x4f8ea1=_0x56d65d;this[_0x4f8ea1(0x4a2)](_0x4278b5)[_0x4f8ea1(0x287)](/\\I\[(\d+)\]/i);const _0x472d43=Number(RegExp['$1'])||0x0,_0x1d5561=this['itemLineRect'](_0x4278b5),_0x44f802=_0x1d5561['x']+Math[_0x4f8ea1(0x382)]((_0x1d5561[_0x4f8ea1(0x293)]-ImageManager['iconWidth'])/0x2),_0x571fcb=_0x1d5561['y']+(_0x1d5561[_0x4f8ea1(0x2a4)]-ImageManager[_0x4f8ea1(0x3b6)])/0x2;this[_0x4f8ea1(0x438)](_0x472d43,_0x44f802,_0x571fcb);},VisuMZ[_0x56d65d(0x453)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x56d65d(0x317)]['refresh'],Window_SkillStatus[_0x56d65d(0x317)]['refresh']=function(){const _0x131b9c=_0x56d65d;VisuMZ['SkillsStatesCore']['Window_SkillStatus_refresh'][_0x131b9c(0x237)](this);if(this[_0x131b9c(0x242)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x56d65d(0x317)][_0x56d65d(0x328)]=function(){const _0x3f0200=_0x56d65d;if(!Imported[_0x3f0200(0x28c)])return;if(!Imported['VisuMZ_1_MainMenuCore'])return;const _0xca7cb3=this['gaugeLineHeight']();let _0x15fdba=this[_0x3f0200(0x39e)]()/0x2+0xb4+0xb4+0xb4,_0x1ed09b=this['innerWidth']-_0x15fdba-0x2;if(_0x1ed09b>=0x12c){if('sXFkr'!=='PeMBD'){const _0x4eaf80=VisuMZ[_0x3f0200(0x366)]['Settings'][_0x3f0200(0x251)][_0x3f0200(0x4ec)],_0x14f0bf=Math['floor'](_0x1ed09b/0x2)-0x18;let _0x5c8462=_0x15fdba,_0x2de077=Math[_0x3f0200(0x382)]((this[_0x3f0200(0x203)]-Math[_0x3f0200(0x4e8)](_0x4eaf80['length']/0x2)*_0xca7cb3)/0x2),_0x5d9c08=0x0;for(const _0x1c2eb6 of _0x4eaf80){this['drawExtendedParameter'](_0x5c8462,_0x2de077,_0x14f0bf,_0x1c2eb6),_0x5d9c08++;if(_0x5d9c08%0x2===0x0)_0x5c8462=_0x15fdba,_0x2de077+=_0xca7cb3;else{if(_0x3f0200(0x27c)!=='oIFxg'){const _0x49a27e=this[_0x3f0200(0x2be)]['mpDamage']||0x0;this[_0x3f0200(0x2cc)](_0x48f48f),this[_0x3f0200(0x2be)][_0x3f0200(0x39b)]+=_0x49a27e;}else _0x5c8462+=_0x14f0bf+0x18;}}}else _0x1b30e7['allSwitchOn']=_0x35095c(_0x52b0a0['$1'])[_0x3f0200(0x18f)](',')[_0x3f0200(0x231)](_0x5c57ca=>_0x48f40d(_0x5c57ca));}this[_0x3f0200(0x252)]();},Window_SkillStatus[_0x56d65d(0x317)][_0x56d65d(0x4f9)]=function(_0x592805,_0x36e01d,_0x1c0969,_0x29f3e7){const _0x5acec6=_0x56d65d,_0xecc76b=this[_0x5acec6(0x278)]();this[_0x5acec6(0x252)](),this['drawParamText'](_0x592805,_0x36e01d,_0x1c0969,_0x29f3e7,!![]),this[_0x5acec6(0x1f9)](),this[_0x5acec6(0x4cd)][_0x5acec6(0x1f8)]-=0x8;const _0x1ab423=this['_actor'][_0x5acec6(0x430)](_0x29f3e7,!![]);this[_0x5acec6(0x4cd)]['drawText'](_0x1ab423,_0x592805,_0x36e01d,_0x1c0969,_0xecc76b,_0x5acec6(0x45a));},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x272)]=Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x233)],Window_SkillList['prototype'][_0x56d65d(0x233)]=function(_0x282f74){const _0xa2cf96=_0x56d65d;return this[_0xa2cf96(0x1fc)](_0x282f74);},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x2e3)]=Window_SkillList[_0x56d65d(0x317)]['maxCols'],Window_SkillList['prototype']['maxCols']=function(){const _0x1684b8=_0x56d65d;if(SceneManager[_0x1684b8(0x3fe)][_0x1684b8(0x46c)]===Scene_Battle)return VisuMZ[_0x1684b8(0x453)][_0x1684b8(0x2e3)][_0x1684b8(0x237)](this);else{if(_0x1684b8(0x304)===_0x1684b8(0x304))return VisuMZ[_0x1684b8(0x453)]['Settings'][_0x1684b8(0x489)][_0x1684b8(0x283)];else this['clearStateData'](_0x17628e),this[_0x1684b8(0x2fa)](_0x15eaf4);}},VisuMZ['SkillsStatesCore'][_0x56d65d(0x2f7)]=Window_SkillList['prototype'][_0x56d65d(0x329)],Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x329)]=function(_0x4d69d8){const _0x51c1ef=_0x56d65d,_0x151b2d=this[_0x51c1ef(0x242)]!==_0x4d69d8;VisuMZ[_0x51c1ef(0x453)][_0x51c1ef(0x2f7)][_0x51c1ef(0x237)](this,_0x4d69d8);if(_0x151b2d){if(_0x51c1ef(0x474)!==_0x51c1ef(0x474)){this[_0x51c1ef(0x440)]=this[_0x51c1ef(0x440)]||{};const _0x232ff5=_0x3edafe?this[_0x51c1ef(0x2ec)](_0x1bf6b8):this[_0x51c1ef(0x45b)]();this['_stateOrigin'][_0x3314d8]=_0x232ff5;}else{if(this['_statusWindow']&&this[_0x51c1ef(0x36b)]['constructor']===Window_ShopStatus){if(_0x51c1ef(0x3a4)!==_0x51c1ef(0x3a4)){let _0x2d666e=_0x515cb7[_0x51c1ef(0x453)][_0x51c1ef(0x407)][_0x51c1ef(0x237)](this);if(_0x4718fc[_0x51c1ef(0x31e)])return _0x2d666e;return _0x2590db[_0x51c1ef(0x31e)]=!![],this[_0x51c1ef(0x4d7)](_0x2d666e),_0xc9c527[_0x51c1ef(0x31e)]=_0x142d4f,_0x2d666e;}else this['_statusWindow']['setItem'](this[_0x51c1ef(0x1ad)](0x0));}}}},Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x454)]=function(_0x4ed2a3){const _0x5e4cca=_0x56d65d;if(this[_0x5e4cca(0x436)]===_0x4ed2a3)return;this[_0x5e4cca(0x436)]=_0x4ed2a3,this[_0x5e4cca(0x4a0)](),this[_0x5e4cca(0x410)](0x0,0x0);if(this[_0x5e4cca(0x36b)]&&this[_0x5e4cca(0x36b)][_0x5e4cca(0x46c)]===Window_ShopStatus){if(_0x5e4cca(0x299)!=='CpaOm')this[_0x5e4cca(0x36b)][_0x5e4cca(0x2e6)](this[_0x5e4cca(0x1ad)](0x0));else for(const _0x271c0a of _0x1f6d45){_0x271c0a['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x3671c2=_0x1de32b(_0x495f35['$1']),_0x174ee3=_0x430732(_0x4c103d['$2']);_0x2e7fdc[_0x5e4cca(0x257)](_0x3671c2,_0x174ee3);}}},Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x1fc)]=function(_0x3b158f){const _0x236d31=_0x56d65d;if(!_0x3b158f)return VisuMZ[_0x236d31(0x453)][_0x236d31(0x272)][_0x236d31(0x237)](this,_0x3b158f);if(!this[_0x236d31(0x2e9)](_0x3b158f))return![];if(!this[_0x236d31(0x3c8)](_0x3b158f))return![];if(!this[_0x236d31(0x373)](_0x3b158f))return![];return!![];},Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x2e9)]=function(_0x2c71e5){const _0x536310=_0x56d65d;return DataManager['getSkillTypes'](_0x2c71e5)[_0x536310(0x233)](this['_stypeId']);},Window_SkillList[_0x56d65d(0x317)]['checkShowHideNotetags']=function(_0xbbb335){const _0x586545=_0x56d65d;if(!VisuMZ[_0x586545(0x453)]['CheckVisibleBattleNotetags'](this[_0x586545(0x242)],_0xbbb335))return![];if(!VisuMZ['SkillsStatesCore'][_0x586545(0x1f2)](this[_0x586545(0x242)],_0xbbb335))return![];if(!VisuMZ[_0x586545(0x453)][_0x586545(0x437)](this[_0x586545(0x242)],_0xbbb335))return![];return!![];},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x487)]=function(_0x1f857e,_0x1608b1){const _0x4869a0=_0x56d65d,_0x54ae38=_0x1608b1[_0x4869a0(0x21b)];if(_0x54ae38[_0x4869a0(0x287)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x4869a0(0x4b8)]())return![];else return _0x54ae38[_0x4869a0(0x287)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()?![]:!![];},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x1f2)]=function(_0x347a47,_0x26cdd6){const _0x356bfb=_0x56d65d,_0x372f3d=_0x26cdd6[_0x356bfb(0x21b)];if(_0x372f3d[_0x356bfb(0x287)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ce6a2=JSON[_0x356bfb(0x2ed)]('['+RegExp['$1'][_0x356bfb(0x287)](/\d+/g)+']');for(const _0x140109 of _0x5ce6a2){if(_0x356bfb(0x218)!==_0x356bfb(0x391)){if(!$gameSwitches[_0x356bfb(0x48f)](_0x140109))return![];}else{const _0x875409=_0x111d0d[_0x356bfb(0x453)],_0x5c86bd=['stateHpSlipDamageJS',_0x356bfb(0x43e),_0x356bfb(0x1e7),_0x356bfb(0x1bc),_0x356bfb(0x3f2),_0x356bfb(0x2a3)];for(const _0x2db034 of _0x5c86bd){_0x875409[_0x2db034][_0x5a844f]&&_0x875409[_0x2db034][_0xdd1a85][_0x356bfb(0x237)](this,_0x20ec3f);}}}return!![];}if(_0x372f3d[_0x356bfb(0x287)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2779a4=JSON[_0x356bfb(0x2ed)]('['+RegExp['$1'][_0x356bfb(0x287)](/\d+/g)+']');for(const _0x17f227 of _0x2779a4){if(_0x356bfb(0x334)!==_0x356bfb(0x3d0)){if(!$gameSwitches[_0x356bfb(0x48f)](_0x17f227))return![];}else{const _0x3d2f5e=this[_0x356bfb(0x3d8)],_0x19c631=_0x17eb87[_0x356bfb(0x2a7)](),_0x53ed5e=_0x175330['x']+_0x5a43e2[_0x356bfb(0x382)](_0x2debcf[_0x356bfb(0x293)]/0x2)+_0x19c631;_0x3d2f5e['x']=_0x3d2f5e[_0x356bfb(0x293)]/-0x2+_0x53ed5e,_0x3d2f5e['y']=_0x25e6ad[_0x356bfb(0x382)](_0x2eeeff[_0x356bfb(0x2a4)]/0x2);}}return!![];}if(_0x372f3d[_0x356bfb(0x287)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d776c=JSON['parse']('['+RegExp['$1'][_0x356bfb(0x287)](/\d+/g)+']');for(const _0x7fc97d of _0x3d776c){if('sBVcZ'!=='okSry'){if($gameSwitches[_0x356bfb(0x48f)](_0x7fc97d))return!![];}else{const _0x5970f3=_0x3eac7f[_0x356bfb(0x317)][_0x356bfb(0x4f1)]();this['_turnDisplaySprite']=new _0x12486c(),this[_0x356bfb(0x1ea)]['bitmap']=new _0x595333(_0x48ee60[_0x356bfb(0x49b)],_0x5970f3),this[_0x356bfb(0x1ea)][_0x356bfb(0x362)]['x']=this[_0x356bfb(0x362)]['x'],this[_0x356bfb(0x1ea)][_0x356bfb(0x362)]['y']=this[_0x356bfb(0x362)]['y'],this[_0x356bfb(0x3f6)](this[_0x356bfb(0x1ea)]),this['contents']=this[_0x356bfb(0x1ea)][_0x356bfb(0x1cf)];}}return![];}if(_0x372f3d[_0x356bfb(0x287)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3c5aa5=JSON[_0x356bfb(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3d5db2 of _0x3c5aa5){if(!$gameSwitches[_0x356bfb(0x48f)](_0x3d5db2))return!![];}return![];}if(_0x372f3d[_0x356bfb(0x287)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24416e=JSON[_0x356bfb(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4dab1a of _0x24416e){if(!$gameSwitches['value'](_0x4dab1a))return!![];}return![];}if(_0x372f3d[_0x356bfb(0x287)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x367d6a=JSON['parse']('['+RegExp['$1'][_0x356bfb(0x287)](/\d+/g)+']');for(const _0x8259d0 of _0x367d6a){if($gameSwitches[_0x356bfb(0x48f)](_0x8259d0))return![];}return!![];}return!![];},VisuMZ[_0x56d65d(0x453)]['CheckVisibleSkillNotetags']=function(_0x146cfb,_0x51f8bb){const _0x48c6c2=_0x56d65d,_0x3c9b6e=_0x51f8bb[_0x48c6c2(0x21b)];if(_0x3c9b6e['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x48c6c2(0x2b3)!==_0x48c6c2(0x2b3))this[_0x48c6c2(0x275)](_0x7b3fc9,_0x535d13['x']+_0x5e5103[_0x48c6c2(0x293)]-_0x11b8e4,_0x164dc1['y'],_0xf01de9);else{const _0x681b6c=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x2baa07 of _0x681b6c){if('XwohB'!=='twdhA'){if(!_0x146cfb[_0x48c6c2(0x27b)](_0x2baa07))return![];}else return 0x0;}return!![];}}else{if(_0x3c9b6e['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x49e350=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x4cb840 of _0x49e350){const _0x6460d0=DataManager[_0x48c6c2(0x195)](_0x4cb840);if(!_0x6460d0)continue;if(!_0x146cfb[_0x48c6c2(0x27b)](_0x6460d0))return![];}return!![];}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x320f8d=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x15695d of _0x320f8d){if(!_0x146cfb[_0x48c6c2(0x27b)](_0x15695d))return![];}return!![];}else{if(_0x3c9b6e['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x51c646=RegExp['$1']['split'](',');for(const _0x422809 of _0x51c646){const _0x3770a8=DataManager['getSkillIdWithName'](_0x422809);if(!_0x3770a8)continue;if(!_0x146cfb[_0x48c6c2(0x27b)](_0x3770a8))return![];}return!![];}}if(_0x3c9b6e['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x48c6c2(0x21e)!=='EDKFM')this['_costSettings']=_0x21a729[0x0];else{const _0x226c15=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x407b86 of _0x226c15){if(_0x146cfb[_0x48c6c2(0x27b)](_0x407b86))return!![];}return![];}}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x48c6c2(0x274)!==_0x48c6c2(0x274))return _0x38c50a[_0x48c6c2(0x2c8)]();else{const _0x872646=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x2fcd21 of _0x872646){if('QZsUH'!==_0x48c6c2(0x263)){const _0x27c88a=DataManager['getSkillIdWithName'](_0x2fcd21);if(!_0x27c88a)continue;if(_0x146cfb[_0x48c6c2(0x27b)](_0x27c88a))return!![];}else{const _0x347c8f=_0x114145[_0x48c6c2(0x2ed)]('['+_0x388b3e['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x3e7b66 of _0x347c8f){if(!_0x398c7a['isLearnedSkill'](_0x3e7b66))return!![];}return![];}}return![];}}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bc1fd=JSON['parse']('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x185f5b of _0x3bc1fd){if(!_0x146cfb['isLearnedSkill'](_0x185f5b))return!![];}return![];}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x35242a=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0xcbff8 of _0x35242a){if(_0x48c6c2(0x496)!==_0x48c6c2(0x496)){const _0x4aef08=this[_0x48c6c2(0x4bc)](_0x14dbe7);this['addCommand'](_0x4aef08,'skill',!![],_0x1625eb);}else{const _0x6b4b27=DataManager[_0x48c6c2(0x195)](_0xcbff8);if(!_0x6b4b27)continue;if(!_0x146cfb[_0x48c6c2(0x27b)](_0x6b4b27))return!![];}}return![];}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x63616d=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x566ffc of _0x63616d){if(!_0x146cfb[_0x48c6c2(0x27b)](_0x566ffc))return!![];}return![];}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xe3571a=RegExp['$1']['split'](',');for(const _0x4b019b of _0xe3571a){const _0x3874ba=DataManager[_0x48c6c2(0x195)](_0x4b019b);if(!_0x3874ba)continue;if(!_0x146cfb[_0x48c6c2(0x27b)](_0x3874ba))return!![];}return![];}}if(_0x3c9b6e['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e7e2c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5edf5a of _0x2e7e2c){if(_0x146cfb[_0x48c6c2(0x27b)](_0x5edf5a))return![];}return!![];}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('XINuW'==='XINuW'){const _0x4999f2=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x455ed5 of _0x4999f2){if('WlANt'===_0x48c6c2(0x45c)){const _0x515eaa=DataManager[_0x48c6c2(0x195)](_0x455ed5);if(!_0x515eaa)continue;if(_0x146cfb[_0x48c6c2(0x27b)](_0x515eaa))return![];}else{if(_0x31e2ff[_0x48c6c2(0x365)]===0x1)return this[_0x48c6c2(0x363)]();else{if(_0x313cd6['MatchLabelGaugeColor']===0x2)return this[_0x48c6c2(0x4ea)]();}}}return!![];}else _0x54647e[_0x48c6c2(0x317)][_0x48c6c2(0x49c)][_0x48c6c2(0x237)](this,_0x28b1bb),this[_0x48c6c2(0x46f)](_0x17747c);}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x48c6c2(0x402)!==_0x48c6c2(0x45d)){const _0x74ed44=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x218857 of _0x74ed44){if(_0x48c6c2(0x3cd)!=='zzWke'){_0x34ff9b[_0x48c6c2(0x453)][_0x48c6c2(0x484)][_0x48c6c2(0x237)](this);const _0x5aa47f=_0x1ef299[_0x48c6c2(0x453)][_0x48c6c2(0x433)][_0x48c6c2(0x3a5)]['RefreshCacheVar']??!![];if(!_0x5aa47f)return;if(_0x54021e[_0x48c6c2(0x2b5)]())for(const _0x2f0958 of _0x23b08c['allBattleMembers']()){if(_0x2f0958)_0x2f0958['refresh']();}}else{if(!_0x146cfb[_0x48c6c2(0x25c)](_0x218857))return![];}}return!![];}else{const _0x4e46db=_0x49bb26(_0x31c7cc['$1']),_0x57ad01=_0x2ac9d3[_0x48c6c2(0x19c)](_0x4e46db);_0x2398ec[_0x48c6c2(0x453)][_0x48c6c2(0x2c1)][_0x2b4ce6['id']]=new _0x7c4344(_0x48c6c2(0x226),_0x57ad01);}}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5bea99=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x5d683b of _0x5bea99){const _0x35fad1=DataManager[_0x48c6c2(0x195)](_0x5d683b);if(!_0x35fad1)continue;if(!_0x146cfb[_0x48c6c2(0x25c)](_0x35fad1))return![];}return!![];}}if(_0x3c9b6e['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x48c6c2(0x1ee)!=='hdCjK')return this['gaugeColor1']();else{const _0x505dd0=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x308ff4 of _0x505dd0){if(_0x48c6c2(0x452)!==_0x48c6c2(0x452))this['drawTextEx'](_0x53f29b,_0x285f29['x'],_0x1d790d['y'],_0x3750bf);else{if(!_0x146cfb[_0x48c6c2(0x25c)](_0x308ff4))return![];}}return!![];}}else{if(_0x3c9b6e['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('hfpNh'===_0x48c6c2(0x34b)){const _0x1b7ec4=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x113f14 of _0x1b7ec4){if('TeBcL'===_0x48c6c2(0x34a)){const _0x508284=DataManager[_0x48c6c2(0x195)](_0x113f14);if(!_0x508284)continue;if(!_0x146cfb[_0x48c6c2(0x25c)](_0x508284))return![];}else return this[_0x48c6c2(0x4b9)](_0x17886b(_0x15eda3));}return!![];}else return this['_buffs'][_0x35d97c]===-_0x45361c['SkillsStatesCore']['Settings'][_0x48c6c2(0x33b)][_0x48c6c2(0x2f6)];}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('FvJlH'===_0x48c6c2(0x4ee)){const _0xfda64=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x414105 of _0xfda64){if(_0x48c6c2(0x40e)===_0x48c6c2(0x40e)){if(_0x146cfb[_0x48c6c2(0x25c)](_0x414105))return!![];}else{const _0x14794d=_0x308589[_0x48c6c2(0x21b)];_0x14794d[_0x48c6c2(0x287)](/<MP COST:[ ](\d+)>/i)&&(_0x272921['mpCost']=_0x44661(_0x1367c0['$1'])),_0x14794d[_0x48c6c2(0x287)](/<TP COST:[ ](\d+)>/i)&&(_0x478ea8[_0x48c6c2(0x3ea)]=_0x5d3b0f(_0x186ba3['$1']));}}return![];}else return _0x30462b;}else{if(_0x3c9b6e['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x48c6c2(0x3ab)!==_0x48c6c2(0x21d)){const _0x144e4f=RegExp['$1']['split'](',');for(const _0x26ec2c of _0x144e4f){const _0x2bb88e=DataManager[_0x48c6c2(0x195)](_0x26ec2c);if(!_0x2bb88e)continue;if(_0x146cfb[_0x48c6c2(0x25c)](_0x2bb88e))return!![];}return![];}else{const _0x396c2d=_0x411436[_0x2f77ff-_0xf8df64[_0x48c6c2(0x37d)]];if(_0x396c2d===_0x3ca53a)return;_0x2c0aa6[_0x48c6c2(0x317)][_0x48c6c2(0x408)][_0x48c6c2(0x237)](this,_0x476b9b,_0x396c2d,0x0,0x0),_0x3f1a31['prototype'][_0x48c6c2(0x471)][_0x48c6c2(0x237)](this,_0x37ab35,_0x396c2d,0x0,0x0);}}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5edd26=JSON['parse']('['+RegExp['$1'][_0x48c6c2(0x287)](/\d+/g)+']');for(const _0x516431 of _0x5edd26){if(_0x48c6c2(0x20c)==='kBiTW')this[_0x48c6c2(0x36b)][_0x48c6c2(0x2e6)](this['item']());else{if(!_0x146cfb[_0x48c6c2(0x25c)](_0x516431))return!![];}}return![];}else{if(_0x3c9b6e['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x21d247=RegExp['$1']['split'](',');for(const _0x29f30e of _0x21d247){if(_0x48c6c2(0x31a)===_0x48c6c2(0x4e1)){if(this[_0x48c6c2(0x3ba)](_0x681af6)){const _0x169aeb=_0x44d4ca[_0x48c6c2(0x453)][_0x48c6c2(0x433)]['Buffs']['MaxTurns'];this[_0x48c6c2(0x3dd)][_0x13afdf]=_0x441be0['clamp'](0x0,_0x169aeb);}}else{const _0x58a32e=DataManager[_0x48c6c2(0x195)](_0x29f30e);if(!_0x58a32e)continue;if(!_0x146cfb[_0x48c6c2(0x25c)](_0x58a32e))return!![];}}return![];}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('ngjPw'==='ngjPw'){const _0x466a8e=JSON[_0x48c6c2(0x2ed)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4a8455 of _0x466a8e){if(!_0x146cfb[_0x48c6c2(0x25c)](_0x4a8455))return!![];}return![];}else return!this[_0x48c6c2(0x2bc)](_0x2b06bc)&&!this[_0x48c6c2(0x4e7)](_0x23bd96)&&!this['_result'][_0x48c6c2(0x3c3)](_0x28609b);}else{if(_0x3c9b6e['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('hfwrg'!==_0x48c6c2(0x396)){const _0x4a2670=_0x135fe6[_0x48c6c2(0x453)][_0x48c6c2(0x433)]['Gauge'];return _0x4a2670[_0x48c6c2(0x1d8)]===_0x48c6c2(0x2f0)?_0x2fe5a2[_0x48c6c2(0x4de)]()-0x6:_0x2b2f40[_0x48c6c2(0x4de)]()-0x2;}else{const _0x5be553=RegExp['$1']['split'](',');for(const _0x28cf6e of _0x5be553){const _0x1e633f=DataManager[_0x48c6c2(0x195)](_0x28cf6e);if(!_0x1e633f)continue;if(!_0x146cfb['hasSkill'](_0x1e633f))return!![];}return![];}}}if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1860f7=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5caa4e of _0x1860f7){if(_0x146cfb['hasSkill'](_0x5caa4e))return![];}return!![];}else{if(_0x3c9b6e[_0x48c6c2(0x287)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x51833e=RegExp['$1'][_0x48c6c2(0x18f)](',');for(const _0x3382ce of _0x51833e){const _0xc44f67=DataManager[_0x48c6c2(0x195)](_0x3382ce);if(!_0xc44f67)continue;if(_0x146cfb[_0x48c6c2(0x25c)](_0xc44f67))return![];}return!![];}}return!![];},Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x373)]=function(_0x12eba4){const _0x51b638=_0x56d65d,_0xe94e3e=_0x12eba4['note'],_0x4d8b73=VisuMZ['SkillsStatesCore'][_0x51b638(0x466)];return _0x4d8b73[_0x12eba4['id']]?_0x4d8b73[_0x12eba4['id']]['call'](this,_0x12eba4):!![];},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x286)]=Window_SkillList[_0x56d65d(0x317)]['drawItem'],Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x42e)]=function(_0x2abb7a){const _0x57417c=_0x56d65d,_0x338578=this['itemAt'](_0x2abb7a),_0x3ec3dc=_0x338578?_0x338578[_0x57417c(0x3b1)]:'';if(_0x338578)this[_0x57417c(0x419)](_0x338578);VisuMZ[_0x57417c(0x453)][_0x57417c(0x286)]['call'](this,_0x2abb7a);if(_0x338578)_0x338578[_0x57417c(0x3b1)]=_0x3ec3dc;},Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x419)]=function(_0x3211cf){const _0x28d71b=_0x56d65d;if(_0x3211cf&&_0x3211cf['note']['match'](/<LIST NAME:[ ](.*)>/i)){_0x3211cf[_0x28d71b(0x3b1)]=String(RegExp['$1'])[_0x28d71b(0x3ec)]();for(;;){if(_0x28d71b(0x1cb)!==_0x28d71b(0x2d3)){if(_0x3211cf[_0x28d71b(0x3b1)][_0x28d71b(0x287)](/\\V\[(\d+)\]/gi))_0x28d71b(0x3f8)!==_0x28d71b(0x3f8)?this[_0x28d71b(0x3ac)]()!==''?this[_0x28d71b(0x1b4)]():(_0x41d067['SkillsStatesCore']['Game_BattlerBase_clearStates'][_0x28d71b(0x237)](this),this[_0x28d71b(0x1af)]()):_0x3211cf[_0x28d71b(0x3b1)]=_0x3211cf[_0x28d71b(0x3b1)][_0x28d71b(0x387)](/\\V\[(\d+)\]/gi,(_0x1c394b,_0x541b73)=>$gameVariables[_0x28d71b(0x48f)](parseInt(_0x541b73)));else break;}else{if(_0x267fb1)_0x59f51a[_0x28d71b(0x4a0)]();}}}},Window_SkillList[_0x56d65d(0x317)]['drawSkillCost']=function(_0x15cc9b,_0x307e9d,_0x57c256,_0x17b20e){const _0x2d91cf=_0x56d65d;Window_Base[_0x2d91cf(0x317)][_0x2d91cf(0x206)]['call'](this,this[_0x2d91cf(0x242)],_0x15cc9b,_0x307e9d,_0x57c256,_0x17b20e);},Window_SkillList['prototype'][_0x56d65d(0x356)]=function(_0xa417fd){const _0x5314db=_0x56d65d;this[_0x5314db(0x36b)]=_0xa417fd,this[_0x5314db(0x22e)]();},VisuMZ[_0x56d65d(0x453)][_0x56d65d(0x23e)]=Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x35a)],Window_SkillList[_0x56d65d(0x317)][_0x56d65d(0x35a)]=function(){const _0x2a8906=_0x56d65d;VisuMZ[_0x2a8906(0x453)][_0x2a8906(0x23e)][_0x2a8906(0x237)](this);if(this[_0x2a8906(0x36b)]&&this['_statusWindow'][_0x2a8906(0x46c)]===Window_ShopStatus){if(_0x2a8906(0x1fa)===_0x2a8906(0x1fa))this[_0x2a8906(0x36b)]['setItem'](this[_0x2a8906(0x4dd)]());else{const _0x2d59e9=_0xdfbe87[_0x2a8906(0x366)]['Settings']['Param'][_0x2a8906(0x4ec)],_0xf7fd7a=_0x5c5015[_0x2a8906(0x382)](_0x4cdd57/0x2)-0x18;let _0x11de6a=_0x2359a2,_0x153411=_0x55096d['floor']((this['innerHeight']-_0x7b2f4f[_0x2a8906(0x4e8)](_0x2d59e9[_0x2a8906(0x37d)]/0x2)*_0x5637fc)/0x2),_0x492163=0x0;for(const _0x50cacf of _0x2d59e9){this[_0x2a8906(0x4f9)](_0x11de6a,_0x153411,_0xf7fd7a,_0x50cacf),_0x492163++,_0x492163%0x2===0x0?(_0x11de6a=_0x3294c9,_0x153411+=_0x18269d):_0x11de6a+=_0xf7fd7a+0x18;}}}};