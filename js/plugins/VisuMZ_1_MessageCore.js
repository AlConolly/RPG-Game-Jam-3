//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.48;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.48] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV file that will contain all of the text used to
 * translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * ---
 * 
 * === How to Edit the Language CSV ===
 * 
 * The Language CSV is structured as a normal CSV file would be, which also
 * means it can be modified in programs like Microsoft Excel or Google Sheets.
 * We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV file in programs like notepad directly
 * due to the way certain things like commas (,) are handled and how easy it is
 * to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV file via the spreadsheet editor (Excel or Google
 * Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill to choose from. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the custom font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x38b2d5=_0x5bc2;function _0x50c5(){const _0x5075b5=['setChoiceListHelpWindow','FontChangeValue','makeSkillList','battle\x20party','_choiceCancelType','call','midleft','textSpeed','Danish','Window_EventItem_includes','TextStr','_target','mainFontFace','pagedown','createChoiceListHelpWindow','SplitJpCnCharacters','requestPictureTextRefreshAll','DMBNm','true','grey','_pictureTextWindow','faceWidth','parseChoiceText','_action','convertBackslashCharacters','textLocale','Ahoj','_itemChoiceWtypeId','Instant','yellow','oPBMg','WRAPBREAK','NameBoxWindowOffsetY','load','processAutoColorWords','_commonEventId','zSmwR','_lastGainedItemData','addMessageCoreTextSpeedCommand','kJSNY','choiceMinWidth','Cześć','gHNYI','setFaceImage','<BR>','CsvFilename','resetFontSettings','lower-left','_pictures','white','_messageWindow','itemChoiceEtypeId','update','setTextAlignment','AtLgR','fgDlt','writeFileSync','choiceDistance','startWait','brown','Scene_Boot_onDatabaseLoaded','startY','UNDEFINED!','choice','drawChoiceLocationImage','map','itemRect','_indent','Sbohem','Window_Message_newPage','zoomScale','losfh','Hello','lowerright','violet','Hejdå','KxFBk','MessageRows','CustomFonts','GET','convertVariableEscapeCharacters','ConfigManager_makeData','_moveTargetX','synchronizeNameBox','convertShowChoiceEscapeCodes','अलविदा','MeNvT','textWidth','choiceRows','processDrawPicture','convertLockColorsEscapeCharacters','mQkkh','min','setup','setPositionType','ZcDfO','COLORLOCK','nextEventCode','ว้าว','ParseAllNotetags','strokeRect','_colorLock','DCOHW','setLastPluginCommandInterpreter','upper\x20left','processPyTextCode','addChoiceDistance','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','code','setMessageWindowRows','lZBnU','Sprite_Picture_update','anchor','makeCommandListScriptCall','callCancelHandler','surprise','setHelpWindowWordWrap','randomInt','createChoiceListWindow','Window_Options_addGeneralOptions','ConvertParams','getLastGainedItemData','convertBaseEscapeCharacters','WordWrap','नमस्ते','partyMemberName','#6dcff6','_interpreter','lAJgc','<WORDWRAP>','Window_Base_initialize','Obutq','getChoiceIndent','Languages','weapon','text','_relativePosition','map\x20event','xrpmn','fontFace','stretchDimmerSprite','Good-bye','До\x20свидания','\x1bTEXTALIGNMENT','upperright','Window_ChoiceList','getInputButtonString','child_process','CreateAutoColorRegExpListEntries','_helpWindow','itemHeight','ARRAYFUNC','_refreshPauseSign','eraseAllPictureTexts','WRAPJPBREAK','changeTextColor','<LINE\x20BREAK>','updateNameBoxMove','xLeUp','convertMessageCoreEscapeReplacements','processColorLock','Bitmap_drawTextTopAligned','adjustShowChoiceCancel','makeCommandListShuffle','lowerleft','#fff799','#ffc8e0','match','LvTRx','_messageCommonEvents','makeItemList','ARRAYJSON','hasPictureText','MessageWindow','AddAutoColor','updatePictureText','canMove','fontSize','ylgRG','changeTextSpeed','autoPositionOffsetX','textCodeResult','_textMacroFound','pPqOk','prepareShowTextFollowups','setPictureText','getStartingChoiceWidth','La\x20revedere','Waouh','isColorLocked','German','isSkillTypeMatchForUse','down-center','mainFontSize','kccqb','AclBZ','SelectSkill','launchMessageCommonEvent','addExtraShowChoices','down\x20center','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Map_setupEvents','Items','SelectWeapon','NameBoxWindowDefaultColor','isVolumeSymbol','STRUCT','PxMuY','Wauw','setChoiceListMaxRows','return\x20\x27','right','<B>','filename','default','parameters','হ্যালো','ParseEnemyNotetags','upper\x20right','commandName','Undefined','_pictureTextWidth','resetWordWrap','Type','processWrapBreak','drawItemNumber','overrideMimeType','Uau','purple','_MessageCoreSettings','String_format','_moveTargetY','scale','pageup','push','Scene_Options_maxCommands','getChoiceListMaxRows','getChoiceMessageDistance','ChoiceWindowLineHeight','skill','middleleft','innerWidth','_positionType','innerHeight','Hej','isWordWrapEnabled','makeDeepCopy','\x1bBOLD[1]','setTextDelay','AuZQm','sNHBr','#c69c6d','_pictureId','_autoSizeCheck','updateOffsetPosition','setupShuffleChoices','addCommand','setupNumInput','VisuMZ_1_SkillsStatesCore','isChoiceEnabled','WeaponTypeID','clearChoiceHelpDescriptions','boxHeight','event','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20CSV\x20file?\x0a\x0a','itemChoiceAtypeId','midcenter','updateAutoPosition','YGJrh','_itemChoiceAtypeId','_pictureTextBuffer','STR','Wah','updateEvents','middlecenter','Game_Screen_erasePicture','_textDelayCount','slice','refreshDimmerBitmap','getLanguageName','getLanguageAt','_itemChoiceVariableId','follower','สวัสดี','textSizeEx','blue','height','TextCodeReplace','send','up-right','clearCommandList','English','left','loadGameFonts','QXxcX','\x1bTEXTALIGNMENT[3]','isClosing','registerSelfEvent','Wow','GffeN','fontItalic','getSkillTypes','fimIo','indexOf','\x5c%1','안녕히\x20가세요','bIkUZ','setupChoices','requestChoiceForegroundImage','WAIT','contentsBack','FastForwardKey','Window_ItemList_drawItemNumber','getLocalizedText','_wordWrap','itemPadding','moveTo','addMessageCommonEvent','ftfDX','isArmor','map\x20actor','Window_Message_processEscapeCharacter','TUGLD','<CENTER>','Armors','down-left','nkULr','system','parseLocalizedText','BOLD','#fbaf5d','levelUp','random','center','postFlushTextState','YoVFK','applyMoveEasing','_messageOffsetX','CreateAutoColorRegExpLists','orange','phiNj','isPressed','Au\x20revoir','Window_Base_processEscapeCharacter','boxWidth','tluot','contentsHeight','[0]','Window_Base_update','wtJrW','loadLocalization','DefaultLocale','test','downcenter','updateBitmap','midright','Sprite_Picture_updateBitmap','_choiceListHelpWindow','isOptionValid','wtypeId','armor','<RIGHT>','processPreviousColor','PXYGe','addChildAt','setLastGainedItemData','dosad','processTextAlignmentChange','registerActorNameAutoColorChanges','Window_Message_terminateMessage','CreateAutoColorFor','includes','makeFontSmaller','convertNewPageTextStateMacros','textSpeedStatusText','floor','messageWidth','AutoColorRegExp','isSkill','SWITCH','Вау','_itemChoiceActorId','MLpWX','quantity','messageCoreTextSpeed','maxLines','contents','_scene','ChoiceWindowMaxCols','openness','Game_Party_initialize','AddOption','KEkaM','faceName','PictureIDs','setupEvents','value','choiceTextAlign','Game_Party_gainItem','choiceAlignText','processStoredAutoColorChanges','itemRectWithPadding','Slovak','ExtraEnemyDrops','_subject','MESSAGE_CORE_PLUGIN_NAME','drawItemContents','\x1bI[%1]','#f26c4f','Game_Map_refresh','setWeaponChoice','itemChoiceActorId','onLocalizationXhrError','battle\x20actor','RelativePXPY','Greeting','_autoSizeRegexp','getColor','8oSfCxe','uppercenter','messageCoreLocalization','open\x20.\x5cdata','defaultColor','processFontChangeItalic','iMqPP','updateDimensions','CSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','Αντίο','itemChoiceWtypeId','Window_MessageLog','ConfigManager_applyData','gray','_moveTargetHeight','message','Turkish','itemChoiceActor','length','PictureTextErase','_itemChoiceItypeId','openLocalizationFolder','charAt',')))','Name','qFRNO','convertFontSettingsEscapeCharacters','outputHeight','Window_Base_textSizeEx','Japanese','parse','MdOyY','exec','\x1bi[%1]','_textAlignment','ParseWeaponNotetags','Game_Message_setChoices','Swedish','isRunning','bind','_choiceListWindow','registerResetRect','switchOutTextForLocalization','CheckCompatibility','ParseClassNotetags','Hoşça\x20kal','vFqUP','_messagePositionReset','isInputting','padding','messageRows','fontBold','isSceneMap','updateMove','makeData','easeOut','ifiOu','up-left','CENTERPICTURE','ChoiceWindowProperties','up\x20left','FontSmallerCap','isChoiceVisible','ztVFa','registerCommand','processCustomWait','WOOdA','_textDelay','choicePositionType','autoPositionOffsetY','process_VisuMZ_MessageCore_TextCodes_Action','Distance','processActorNameAutoColorChanges','CSV\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','setSkillChoice','MessageWindowProperties','_textColorStack','obtainEscapeString','some','processEscapeCharacter','Thai','startX','Scene_Boot_loadGameFonts','constructor','needsNewPage','changePaintOpacity','AutoColorBypassList','Skills','ChoiceWindowMinWidth','obtainExp','WORD_WRAP_PADDING','choices','TextManager_message','updateTransform','Localization','format','callOkHandler','Enable','irhZr','textSizeExTextAlignment','drawCustomBackgroundColor','requestPictureTextRefresh','Enemies','windowWidth','data/','\x1bWrapJpBreak[0]','lKLGT','_itemChoiceStypeId','index','clear','DataManager_loadDatabase','erasePictureTextBuffer','BWWaL','EcNPR','initTextAlignement','selectDefault','dirname','messageWindowRect','toLowerCase','colSpacing','_pictureText','<%1>','Actors','Classes','indent','Languages.csv','nthop','lower\x20left','down\x20right','CommonEvent','</CENTER>','join','clearAllPictureTexts','Window_Options_changeVolume','_choiceHelpDescriptions','Padding','isAutoColorAffected','Auf\x20Wiedersehen','clearActorNameAutoColor','Game_Map_initialize','map\x20player','Zbohom','getMessageWindowWidth','Weapons','currentCommand','getChoiceListTextAlign','\x1bTEXTALIGNMENT[2]','drawBackPicture','ceil','defeat','hegJg','setHelpWindow','Scene_Message_createChoiceListWindow','adjustShowChoiceDefault','ParseSkillNotetags','leader','gradientFillRect','applyDatabaseAutoColor','battleTargetName','2085544FfhjwY','setChoiceListLineHeight','blt','Greek','addWrapBreakAfterPunctuation','</B>','followers','round','getMessageWindowRows','processTextAlignmentX','setRelativePosition','பிரியாவிடை','processAutoSize','addMessageCoreCommands','_pictureTextRefresh','_messageOffsetY','Hallo','Width','addGeneralOptions','processAllText','down','initialize','</COLORLOCK>','$dataLocalization','process_VisuMZ_MessageCore_AutoColor','rTmXo','setChoiceListTextAlign','3145BtGYDt','13340403hgJqlI','Key','cancel','refresh','isHelpWindowWordWrap','normalColor','SkillTypeID','setWordWrap','loadCustomFontsMessageCore','_macroBypassWordWrap','Ciao','width','lower-center','getPictureTextData','windowPadding','menu','version','Farewell','findTargetSprite','systemColor','drawBackCenteredPicture','Game_System_initialize','responseText','choiceIndexArray','vITQo','clearFlags','ARRAYNUM','_choiceIndexArray','_pictureTextSprite','activate','Window_Base_processAllText','TextCodeActions','processCommonEvent','downleft','addedWidth','placeCancelButton','Window_Options_isVolumeSymbol','actorName','ParseArmorNotetags','escapeStart','PICTURE','isChoiceWindow','348642elijSj','getConfigValue','obtainItem','visible','_autoColorActorNames','gWaUj','isVisuMzLocalizationEnabled','Window_Base_processNewLine','setMessageWindowXyOffsets','application/csv','French','General','\x1bC[%1]%2\x1bPREVCOLOR[0]','clearPictureTextRefresh','TextAlign','preemptive','wDeiU','upper\x20center','ParseStateNotetags','ParseItemNotetags','centered','toUpperCase','initMessageCore','iconIndex','wevxr','ParseAddedText','#a186be','calcWindowHeight','Hola','pnExt','</RIGHT>','dimColor2','TextMacros','Hungarian','lower\x20center','updateBackground','Window_Message_needsNewPage','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','process_VisuMZ_MessageCore_TextMacros','setChoiceMessageDistance','substr','prototype','flushTextState','onerror','CKPAi','TEXTALIGNMENT','Tamil','paintOpacity','EVAL','replace','\x1bCOLORLOCK[1]','States','setPictureTextBuffer','maxShuffleChoices','Viszontlátásra','processCharacter','obtainEscapeParam','changeOutlineColor','crisis','resetTextColor','addedHeight','drawTextEx','makeFontBigger','_wholeMoveDuration','start\x20.\x5cdata','gainItem','choiceCancelType','easeInOut','_forcedPosition','Polish','messageCoreWindowX','_lastPluginCommandInterpreter','1296180MYCuEh','anyPictureTextChanges','prepareShowTextPluginCommandFollowups','_itemChoiceEtypeId','windowX','changeVisuMzTextLocale','xIbhr','getPictureTextBuffer','_showFast','xZlUq','LNYvb','StretchDimmedBg','FontBiggerCap','isBreakShowTextCommands','ANY','applyData','ffRTE','getPreservedFontSettings','getChoiceListLineHeight','addLoadListener','updateHelp','forEach','Window_Message_updatePlacement','Window_ChoiceList_callCancelHandler','Unnamed.ttf','EquipTypeID','_moveTargetWidth','_data','upper-right','sHunk','XDjFV','drawItem','aVVVa','loadPicture','</LEFT>','pink','AMYSz','getChoiceListMaxColumns','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','VHExQ','Finnish','makeCommandList','clampPlacementPosition','choiceCols','itemChoiceStypeId','onload','Selamat\x20tinggal','OffsetX','getTextAlignment','Olá','itemChoiceItypeId','\x1bWrapBreak[0]','SHOW','visuMzTextLocaleStatusText','processAutoPosition','SKURq','KdLRu','splice','down-right','ลาก่อน','updateChoiceListHelpWindowPlacement','upperleft','\x1bCOLORLOCK[0]','TSOGz','Dutch','close','description','setArmorChoice','MessageTextDelay','COMMONEVENT','convertChoiceMacros','ArMCZ','green','_dimmerSprite','upper-center','Window_Message_synchronizeNameBox','command101','getLastPluginCommandInterpreter','updateOverlappingY','ARRAYEVAL','processMessageCoreEscapeActions','kiZpb','hVGah','process_VisuMZ_MessageCore_TextCodes_Replace','remove','_maxShuffleChoices','isContinuePrepareShowTextCommands','stringify','databaseObjectName','setChoices','CIGtK','<LEFT>','VariableID','Chinese(Simplified)','changeVolume','fMWsM','_currentAutoSize','EKytO','changeChoiceBackgroundColor','filter','_list','upleft','atypeId','_targets','DefaultOutlineWidth','list','isWeapon','setColorLock','max','Game_Interpreter_setupChoices','battleActionName','Window_NameBox_refresh','Norwegian','_nameBoxWindow','convertMessageCoreEscapeActions','prepareAutoSizeEscapeCharacters','emerge','さようなら','Gpmly','PREVCOLOR','ParseLocalizationCsv','Indonesian','QfGjK','</WORDWRAP>','convertButtonAssistText','preFlushTextState','drawTextTopAligned','processPxTextCode','Hei','SortObjectByKeyLength','_choices','addMessageCoreLocalizationCommand','You\x20do\x20not\x20have\x20a\x20language\x20CSV\x20set\x20up.\x0a','getCurrentLanguage','lineHeight','addContinuousShowChoices','convertButtonAssistEscapeCharacters','addWindow','bitmap','qIgyx','MsgWindowOffsetY','choiceLineHeight','getPictureText','ChoiceWindowTextAlign','terminateMessage','yKOfB','_pictureTextHeight','VisuMZ_0_CoreEngine','_autoPosRegExp','prepareWordWrapEscapeCharacters','Hűha','resetRect','CuaIz','convertTextAlignmentEscapeCharacters','maxCols','resizePictureText','members','outLineColor','REqqm','messageWordWrap','ITALIC','hide','lowercenter','বিদায়','4980bAGpEO','obtainGold','Vau','வணக்கம்','YgavA','TextColor','setSpeakerName','drawing','convertHardcodedEscapeReplacements','Default','Salut','setChoiceListMaxColumns','Window_Base_processControlCharacter','Window_NameBox_updatePlacement','_pictureTextCache','Näkemiin','tKJOM','updateMessageCommonEvents','mQgth','Tot\x20ziens','\x1bTEXTALIGNMENT[0]','textSizeExRaw','map\x20party','AutoColor','JSON','type','ShuffleArray','path','createTextState','realPictureId','HqXRM','name','clamp','MsgWindowOffsetX','none','isSceneBattle','(((','maxChoiceWidth','rKozZ','updateRelativePosition','_resetRect','anchorPictureText','drawText','_moveDuration','shift','_eventId','onDatabaseLoaded','crisisColor','XDVZe','preConvertEscapeCharacters','setChoiceListMinChoiceWidth','item','699186JjRQhw','Window_ChoiceList_windowX','etypeId','MinWidth','false','IkPja','updatePlacement','getChoiceListMinChoiceWidth','xGNAI','add','up\x20right','MaxRows','XSqDB','changeValue','TextSpeed','returnPreservedFontSettings','Rows','isMessageWindowWordWrap','applyChoiceHelpDescriptions','newPage','drawPictureTextZone','lower-right','middleright','ALL','sPxHB','outputWidth','CSV\x20file\x20has\x20not\x20been\x20made.\x0a','exit','sort','up\x20center','setBackground','adjustShowChoiceExtension','\x1bi[%1]%2','processNewLine','easeIn','messagePositionReset','EachMessageStart','rtl','updateAutoSizePosition','Settings','DISABLE','FontFamily','textCodeCheck','EndPadding','substring','वाह','itemBackColor2','setText','_moveEasingType','status','maxCommands','setMessageWindowWordWrap','ndnhF','EachMessageEnd','split','LNNNB','processFsTextCode','MessageCore','dyNCm','\x1bTEXTALIGNMENT[1]','getMessageWindowXyOffsets','Game_Map_updateEvents','trim','Window_Base_changeTextColor','Italian','isSkillHidden','fmtez','Γειά\x20σου','ChoiceWindowDistance','SWITCHES','alGth','victory','helpWordWrap','resetPositionX','TextJS','ActorID','skills','2834153TzKjIb','down\x20left','FquoD','open','loadDatabase','eyJyz','TextColor%1','calcMoveEasing','outlineWidth','ওহে','ஆஹா','commandSymbol','convertTextMacros','requestChoiceBackgroundImage','Filename','Portuguese','battleUserName','statusText','actor','up-center','AdjustRect','#7cc576','setMessageWindowWidth','createLocalizationCsvFile','ChoiceWindowMaxRows','PictureTextRefresh','VisuMZ_1_EventsMoveCore','_centerMessageWindow','ArmorTypeID','PictureTextChange','Szia','choiceListHelpWindowRect','command357','clearPictures','fxCOT','Match','inputtingAction','Window_Message_isTriggered','drawPictureText','createPictureText','itemBackColor1','</I>','Bitmap_drawText','textSizeExWordWrap','FUNC','#acacac','updateXyOffsets','setWaitMode','SBfqp','Hindi','Window_Options_statusText','attachPictureText','Game_Interpreter_PluginCommand','Farvel','VisuMZ_3_ActSeqCamera','battle\x20enemy','_index','_autoPositionTarget','createContents','ConvertTextAutoColorRegExpFriendly','textColor','instantTextSpeed','onNewPageMessageCore','Ουάου','Chinese(Traditional)','yes'];_0x50c5=function(){return _0x5075b5;};return _0x50c5();}function _0x5bc2(_0x51c888,_0x5b724){const _0x50c5c4=_0x50c5();return _0x5bc2=function(_0x5bc235,_0x5e4fd9){_0x5bc235=_0x5bc235-0x71;let _0x1b429f=_0x50c5c4[_0x5bc235];return _0x1b429f;},_0x5bc2(_0x51c888,_0x5b724);}(function(_0x262787,_0x1ca80a){const _0xceab40=_0x5bc2,_0xfcc9d=_0x262787();while(!![]){try{const _0x29885f=-parseInt(_0xceab40(0x1a6))/0x1+parseInt(_0xceab40(0x118))/0x2+-parseInt(_0xceab40(0x27e))/0x3+parseInt(_0xceab40(0x24a))/0x4*(-parseInt(_0xceab40(0x133))/0x5)+parseInt(_0xceab40(0x15e))/0x6+-parseInt(_0xceab40(0x2cb))/0x7*(-parseInt(_0xceab40(0x79))/0x8)+parseInt(_0xceab40(0x134))/0x9;if(_0x29885f===_0x1ca80a)break;else _0xfcc9d['push'](_0xfcc9d['shift']());}catch(_0x5a4274){_0xfcc9d['push'](_0xfcc9d['shift']());}}}(_0x50c5,0xa4f5e));var label=_0x38b2d5(0x2b7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x397ed3){const _0x17da80=_0x38b2d5;return _0x397ed3[_0x17da80(0x2af)]&&_0x397ed3[_0x17da80(0x1e8)][_0x17da80(0x480)]('['+label+']');})[0x0];VisuMZ[label][_0x38b2d5(0x2a5)]=VisuMZ[label][_0x38b2d5(0x2a5)]||{},VisuMZ[_0x38b2d5(0x385)]=function(_0x4bbb15,_0x2dd6a1){const _0x1a6f32=_0x38b2d5;for(const _0x5d2bbb in _0x2dd6a1){if('Yvdcw'==='Yvdcw'){if(_0x5d2bbb['match'](/(.*):(.*)/i)){if(_0x1a6f32(0x220)!==_0x1a6f32(0x220))return _0x2f9708;else{const _0x2504ce=String(RegExp['$1']),_0xcd0389=String(RegExp['$2'])[_0x1a6f32(0x173)]()[_0x1a6f32(0x2bc)]();let _0x32f05d,_0x1ffea6,_0x420184;switch(_0xcd0389){case'NUM':_0x32f05d=_0x2dd6a1[_0x5d2bbb]!==''?Number(_0x2dd6a1[_0x5d2bbb]):0x0;break;case _0x1a6f32(0x14e):_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x425781=>Number(_0x425781));break;case _0x1a6f32(0x18e):_0x32f05d=_0x2dd6a1[_0x5d2bbb]!==''?eval(_0x2dd6a1[_0x5d2bbb]):null;break;case _0x1a6f32(0x1f5):_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x36be4e=>eval(_0x36be4e));break;case _0x1a6f32(0x262):_0x32f05d=_0x2dd6a1[_0x5d2bbb]!==''?JSON['parse'](_0x2dd6a1[_0x5d2bbb]):'';break;case _0x1a6f32(0x3b8):_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x789d3d=>JSON['parse'](_0x789d3d));break;case _0x1a6f32(0x2f7):_0x32f05d=_0x2dd6a1[_0x5d2bbb]!==''?new Function(JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb])):new Function('return\x200');break;case _0x1a6f32(0x3a4):_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x49c3cf=>new Function(JSON[_0x1a6f32(0x97)](_0x49c3cf)));break;case _0x1a6f32(0x41c):_0x32f05d=_0x2dd6a1[_0x5d2bbb]!==''?String(_0x2dd6a1[_0x5d2bbb]):'';break;case'ARRAYSTR':_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x568bd4=>String(_0x568bd4));break;case _0x1a6f32(0x3db):_0x420184=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):{},_0x4bbb15[_0x2504ce]={},VisuMZ[_0x1a6f32(0x385)](_0x4bbb15[_0x2504ce],_0x420184);continue;case'ARRAYSTRUCT':_0x1ffea6=_0x2dd6a1[_0x5d2bbb]!==''?JSON[_0x1a6f32(0x97)](_0x2dd6a1[_0x5d2bbb]):[],_0x32f05d=_0x1ffea6[_0x1a6f32(0x34e)](_0x5a2f7c=>VisuMZ[_0x1a6f32(0x385)]({},JSON['parse'](_0x5a2f7c)));break;default:continue;}_0x4bbb15[_0x2504ce]=_0x32f05d;}}}else _0x4ce884[_0x1a6f32(0x2b7)][_0x1a6f32(0x384)][_0x1a6f32(0x312)](this),this[_0x1a6f32(0x125)]();}return _0x4bbb15;},(_0x447c05=>{const _0x5e419e=_0x38b2d5,_0x2cdff7=_0x447c05[_0x5e419e(0x269)];for(const _0x30f805 of dependencies){if(!Imported[_0x30f805]){alert(_0x5e419e(0x3d5)[_0x5e419e(0xd8)](_0x2cdff7,_0x30f805)),SceneManager[_0x5e419e(0x299)]();break;}}const _0x2d0c4c=_0x447c05['description'];if(_0x2d0c4c[_0x5e419e(0x3b4)](/\[Version[ ](.*?)\]/i)){if('faaYe'===_0x5e419e(0x296))_0x3102eb=_0x438b65[_0x5e419e(0x18f)](_0x1bccb2[_0x5e419e(0x2a8)],_0x2f0e27['textCodeResult']['bind'](this)),_0x286baa=this[_0x5e419e(0x35d)](_0x45c546);else{const _0x2021f6=Number(RegExp['$1']);_0x2021f6!==VisuMZ[label][_0x5e419e(0x144)]&&(alert(_0x5e419e(0x183)[_0x5e419e(0xd8)](_0x2cdff7,_0x2021f6)),SceneManager['exit']());}}if(_0x2d0c4c['match'](/\[Tier[ ](\d+)\]/i)){if(_0x5e419e(0x7f)===_0x5e419e(0x7f)){const _0x5e7e7d=Number(RegExp['$1']);if(_0x5e7e7d<tier)alert(_0x5e419e(0x1cc)[_0x5e419e(0xd8)](_0x2cdff7,_0x5e7e7d,tier)),SceneManager[_0x5e419e(0x299)]();else{if('ldlsB'!==_0x5e419e(0x2c0))tier=Math[_0x5e419e(0x212)](_0x5e7e7d,tier);else{if(!this[_0x5e419e(0x150)])return;this[_0x5e419e(0x150)][_0x5e419e(0x37d)]['x']=this[_0x5e419e(0x37d)]['x'],this[_0x5e419e(0x150)][_0x5e419e(0x37d)]['y']=this[_0x5e419e(0x37d)]['y'];}}}else{if(_0x2d98b1){let _0x58f272=this[_0x5e419e(0x33d)][_0x5e419e(0x43c)](_0x4a80d7);this[_0x5e419e(0xde)](_0x58f272);}}}VisuMZ[_0x5e419e(0x385)](VisuMZ[label][_0x5e419e(0x2a5)],_0x447c05[_0x5e419e(0x3e4)]);})(pluginData),PluginManager[_0x38b2d5(0xb9)](pluginData['name'],_0x38b2d5(0x2c2),_0x78e02d=>{const _0x4e5a44=_0x38b2d5;VisuMZ[_0x4e5a44(0x385)](_0x78e02d,_0x78e02d);const _0x377441=Number(_0x78e02d[_0x4e5a44(0xc0)])||0x0;$gameSystem[_0x4e5a44(0x185)](_0x377441);}),PluginManager['registerCommand'](pluginData['name'],_0x38b2d5(0xb4),_0x388dcf=>{const _0x10376c=_0x38b2d5;VisuMZ['ConvertParams'](_0x388dcf,_0x388dcf);const _0xea5dde=_0x388dcf['LineHeight']||$gameSystem[_0x10376c(0x1b8)]()||0x1,_0x22e8a8=_0x388dcf[_0x10376c(0x281)]??0x60,_0x117641=_0x388dcf[_0x10376c(0x289)]||$gameSystem[_0x10376c(0x3f9)]()||0x1,_0x183c6c=_0x388dcf['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x5cf9dc=_0x388dcf[_0x10376c(0x16c)][_0x10376c(0xef)]()||_0x10376c(0x3e3);$gameSystem[_0x10376c(0x119)](_0xea5dde),$gameSystem[_0x10376c(0x27c)](_0x22e8a8),$gameSystem['setChoiceListMaxRows'](_0x117641),$gameSystem[_0x10376c(0x255)](_0x183c6c),$gameSystem[_0x10376c(0x132)](_0x5cf9dc);}),PluginManager[_0x38b2d5(0xb9)](pluginData[_0x38b2d5(0x269)],_0x38b2d5(0xc4),_0x8094fa=>{const _0x2e7465=_0x38b2d5;VisuMZ[_0x2e7465(0x385)](_0x8094fa,_0x8094fa);const _0x15ce06=_0x8094fa[_0x2e7465(0x28e)]||$gameSystem[_0x2e7465(0x120)]()||0x1,_0x306185=_0x8094fa[_0x2e7465(0x129)]||$gameSystem[_0x2e7465(0x107)]()||0x1;$gameTemp[_0x2e7465(0x2e6)]=!![];const _0x5a4f8d=_0x8094fa['WordWrap'][_0x2e7465(0xef)]();$gameSystem[_0x2e7465(0x37a)](_0x15ce06),$gameSystem[_0x2e7465(0x2e1)](_0x306185);if([_0x2e7465(0x31f),_0x2e7465(0x282)][_0x2e7465(0x480)](_0x5a4f8d)){if(_0x2e7465(0x343)!=='gTdFq')$gameSystem[_0x2e7465(0x2b1)](eval(_0x5a4f8d));else{_0x142f1c[_0x2e7465(0x2b7)]['SortObjectByKeyLength'](_0x2e7465(0x42c));for(const _0x104582 of _0x4e452f['MessageCore']['Settings'][_0x2e7465(0x42c)]){_0x104582['textCodeCheck']=new _0x581381('\x1b'+_0x104582['Match']+_0x104582[_0x2e7465(0x3ec)],'gi'),_0x104582[_0x2e7465(0x317)]!==''&&_0x104582[_0x2e7465(0x317)]!==_0x2e7465(0x3e9)?_0x104582['textCodeResult']=new _0x196870(_0x2e7465(0x3df)+_0x104582[_0x2e7465(0x317)][_0x2e7465(0x18f)](/\\/g,'\x1b')+'\x27'):_0x104582[_0x2e7465(0x3c2)]=_0x104582[_0x2e7465(0x2c8)];}}}const _0x493bba=SceneManager[_0x2e7465(0x490)][_0x2e7465(0x33f)];if(_0x493bba){if(_0x2e7465(0x3ab)===_0x2e7465(0x3ab))_0x493bba[_0x2e7465(0x3eb)](),_0x493bba[_0x2e7465(0x80)](),_0x493bba[_0x2e7465(0x305)]();else{if(!_0x57e4da[_0x2e7465(0x499)](_0x3e023a))return![];}}}),PluginManager[_0x38b2d5(0xb9)](pluginData['name'],'MessageWindowXyOffsets',_0x566b19=>{const _0x37bc34=_0x38b2d5;VisuMZ[_0x37bc34(0x385)](_0x566b19,_0x566b19),$gameSystem['setMessageWindowXyOffsets'](_0x566b19['OffsetX'],_0x566b19['OffsetY']);const _0x22e274=SceneManager[_0x37bc34(0x490)][_0x37bc34(0x33f)];_0x22e274&&(_0x22e274['resetWordWrap'](),_0x22e274[_0x37bc34(0x80)](),_0x22e274[_0x37bc34(0x305)]());}),PluginManager[_0x38b2d5(0xb9)](pluginData[_0x38b2d5(0x269)],_0x38b2d5(0x3d8),_0x4aa556=>{const _0x17627f=_0x38b2d5;VisuMZ[_0x17627f(0x385)](_0x4aa556,_0x4aa556),$gameMessage['setWeaponChoice'](_0x4aa556[_0x17627f(0x202)]||0x0,_0x4aa556[_0x17627f(0x411)]||0x0);const _0x17e50f=$gameTemp[_0x17627f(0x1f3)]();if(_0x17e50f)_0x17e50f[_0x17627f(0x2fa)]('message');}),PluginManager['registerCommand'](pluginData['name'],'SelectArmor',_0x4b8953=>{const _0x74de14=_0x38b2d5;VisuMZ[_0x74de14(0x385)](_0x4b8953,_0x4b8953),$gameMessage['setArmorChoice'](_0x4b8953[_0x74de14(0x202)]||0x0,_0x4b8953[_0x74de14(0x2e7)]||0x0,_0x4b8953[_0x74de14(0x1bf)]||0x0);const _0x700716=$gameTemp[_0x74de14(0x1f3)]();if(_0x700716)_0x700716[_0x74de14(0x2fa)]('message');}),PluginManager['registerCommand'](pluginData[_0x38b2d5(0x269)],_0x38b2d5(0x3d1),_0x275c4e=>{const _0x5957fe=_0x38b2d5;VisuMZ[_0x5957fe(0x385)](_0x275c4e,_0x275c4e),$gameMessage['setSkillChoice'](_0x275c4e['VariableID']||0x0,_0x275c4e['ActorID']||0x0,_0x275c4e[_0x5957fe(0x13a)]||0x0);const _0x2cf564=$gameTemp['getLastPluginCommandInterpreter']();if(_0x2cf564)_0x2cf564[_0x5957fe(0x2fa)]('message');}),PluginManager[_0x38b2d5(0xb9)](pluginData['name'],_0x38b2d5(0x2e8),_0x16cb6d=>{const _0x2cac09=_0x38b2d5;VisuMZ[_0x2cac09(0x385)](_0x16cb6d,_0x16cb6d);const _0x19e6ff=_0x16cb6d[_0x2cac09(0x497)]||[],_0x2c8e5e=_0x16cb6d[_0x2cac09(0x100)]||0x0,_0xc22f27=['upperleft','up',_0x2cac09(0x39d),'left','center',_0x2cac09(0x3e0),'lowerleft',_0x2cac09(0x12c),_0x2cac09(0x356)];for(const _0x231c27 of _0x19e6ff){$gameScreen[_0x2cac09(0x192)](_0x231c27,_0x2c8e5e);for(const _0x22c8f3 of _0xc22f27){if(_0x16cb6d[_0x22c8f3]===undefined)continue;$gameScreen[_0x2cac09(0x3c6)](_0x231c27,_0x16cb6d[_0x22c8f3],_0x22c8f3);}}}),PluginManager[_0x38b2d5(0xb9)](pluginData[_0x38b2d5(0x269)],_0x38b2d5(0x8c),_0xc7d223=>{const _0x2cd2f3=_0x38b2d5;VisuMZ[_0x2cd2f3(0x385)](_0xc7d223,_0xc7d223);const _0x494387=_0xc7d223[_0x2cd2f3(0x497)]||[];for(const _0x367d63 of _0x494387){$gameScreen['eraseAllPictureTexts'](_0x367d63),$gameScreen[_0x2cd2f3(0xe8)](_0x367d63);}}),PluginManager[_0x38b2d5(0xb9)](pluginData[_0x38b2d5(0x269)],_0x38b2d5(0x2e4),_0x705ea8=>{const _0x32d193=_0x38b2d5;$gameScreen[_0x32d193(0x31d)]();}),VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x349)]=Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x278)],Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x278)]=function(){const _0x497533=_0x38b2d5;VisuMZ['MessageCore'][_0x497533(0x349)][_0x497533(0x312)](this),VisuMZ[_0x497533(0x2b7)][_0x497533(0xa4)](),this[_0x497533(0xbf)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x497533(0x130)]();},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0xa4)]=function(){const _0x4a0cf1=_0x38b2d5;if(Imported['VisuMZ_4_ExtraEnemyDrops']&&VisuMZ[_0x4a0cf1(0x4a0)][_0x4a0cf1(0x144)]<1.09){let _0x449f23='';_0x449f23+=_0x4a0cf1(0x378),_0x449f23+='in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.',alert(_0x449f23),SceneManager[_0x4a0cf1(0x299)]();}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x227)]=function(_0x599437){const _0x5eb366=_0x38b2d5,_0x76ee2e=VisuMZ[_0x5eb366(0x2b7)]['Settings'][_0x599437];_0x76ee2e[_0x5eb366(0x29a)]((_0x193905,_0x58792a)=>{const _0x4f1a3d=_0x5eb366;if(!_0x193905||!_0x58792a)return-0x1;return _0x58792a[_0x4f1a3d(0x2ee)][_0x4f1a3d(0x8b)]-_0x193905[_0x4f1a3d(0x2ee)][_0x4f1a3d(0x8b)];});},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x55e46c=_0x38b2d5;VisuMZ['MessageCore'][_0x55e46c(0x227)](_0x55e46c(0x153));for(const _0x37f19d of VisuMZ[_0x55e46c(0x2b7)][_0x55e46c(0x2a5)][_0x55e46c(0x153)]){_0x37f19d[_0x55e46c(0x2ee)]=_0x37f19d[_0x55e46c(0x2ee)][_0x55e46c(0x173)](),_0x37f19d[_0x55e46c(0x2a8)]=new RegExp('\x1b'+_0x37f19d[_0x55e46c(0x2ee)],'gi'),_0x37f19d[_0x55e46c(0x3c2)]='\x1b'+_0x37f19d[_0x55e46c(0x2ee)];if(_0x37f19d[_0x55e46c(0x3ec)]==='')_0x37f19d['textCodeResult']+=_0x55e46c(0x468);}},Scene_Boot['prototype'][_0x38b2d5(0x1f9)]=function(){const _0xe7440c=_0x38b2d5;VisuMZ[_0xe7440c(0x2b7)][_0xe7440c(0x227)]('TextCodeReplace');for(const _0x4977f1 of VisuMZ['MessageCore'][_0xe7440c(0x2a5)][_0xe7440c(0x42c)]){_0x4977f1[_0xe7440c(0x2a8)]=new RegExp('\x1b'+_0x4977f1['Match']+_0x4977f1[_0xe7440c(0x3ec)],'gi'),_0x4977f1['TextStr']!==''&&_0x4977f1[_0xe7440c(0x317)]!=='Undefined'?_0x4977f1[_0xe7440c(0x3c2)]=new Function(_0xe7440c(0x3df)+_0x4977f1[_0xe7440c(0x317)]['replace'](/\\/g,'\x1b')+'\x27'):_0x4977f1['textCodeResult']=_0x4977f1[_0xe7440c(0x2c8)];}},Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x184)]=function(){const _0x187fe0=_0x38b2d5;for(const _0x1370ee of VisuMZ['MessageCore'][_0x187fe0(0x2a5)][_0x187fe0(0x17e)]){if(_0x187fe0(0x270)==='sUFHa'){const _0x21dfd2=_0x187fe0(0x29e);_0x22ca5b=_0x21dfd2[_0x187fe0(0xd8)](_0x171095['iconIndex'],_0x14e183[_0x187fe0(0x269)]);}else{_0x1370ee[_0x187fe0(0x2a8)]=new RegExp('\x5c['+_0x1370ee[_0x187fe0(0x2ee)]+'\x5c]','gi');if(_0x1370ee['TextStr']!==''&&_0x1370ee[_0x187fe0(0x317)]!==_0x187fe0(0x3e9)){if(_0x187fe0(0x3bf)===_0x187fe0(0x28a)){if(this['_MessageCoreSettings']===_0x2acc93)this[_0x187fe0(0x174)]();if(this[_0x187fe0(0x3f2)][_0x187fe0(0x245)]===_0x470607)this[_0x187fe0(0x174)]();return this[_0x187fe0(0x3f2)]['messageWordWrap'];}else{let _0x1ffc52=_0x1370ee[_0x187fe0(0x317)];_0x1ffc52=_0x1ffc52[_0x187fe0(0x18f)](/\\/g,'\x1b'),_0x1ffc52=_0x1ffc52[_0x187fe0(0x18f)]('\x27','\x5c\x27'),_0x1ffc52=_0x1ffc52['replace']('\x22','\x5c\x22'),_0x1370ee[_0x187fe0(0x3c2)]=new Function(_0x187fe0(0x3df)+_0x1ffc52+'\x27');}}else{if(_0x187fe0(0x495)===_0x187fe0(0x495))_0x1370ee[_0x187fe0(0x3c2)]=_0x1370ee[_0x187fe0(0x2c8)];else{const _0x36cbc6=_0x73e5fd[_0x187fe0(0x326)];return _0x372da0['getLanguageName'](_0x36cbc6);}}}}},Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x130)]=function(){const _0x4eabe7=_0x38b2d5,_0x24f688=VisuMZ[_0x4eabe7(0x2b7)][_0x4eabe7(0x2a5)]['AutoColor'];if(!VisuMZ[_0x4eabe7(0x370)]){if(_0x4eabe7(0x207)===_0x4eabe7(0x24e))return this['_itemChoiceWtypeId']||0x0;else VisuMZ[_0x4eabe7(0x2b7)][_0x4eabe7(0x3bb)]($dataClasses,_0x24f688[_0x4eabe7(0xf4)]),VisuMZ[_0x4eabe7(0x2b7)]['AddAutoColor']($dataSkills,_0x24f688[_0x4eabe7(0xd0)]),VisuMZ[_0x4eabe7(0x2b7)][_0x4eabe7(0x3bb)]($dataItems,_0x24f688[_0x4eabe7(0x3d7)]),VisuMZ['MessageCore'][_0x4eabe7(0x3bb)]($dataWeapons,_0x24f688[_0x4eabe7(0x108)]),VisuMZ[_0x4eabe7(0x2b7)]['AddAutoColor']($dataArmors,_0x24f688[_0x4eabe7(0x451)]),VisuMZ[_0x4eabe7(0x2b7)][_0x4eabe7(0x3bb)]($dataEnemies,_0x24f688[_0x4eabe7(0xdf)]),VisuMZ['MessageCore'][_0x4eabe7(0x3bb)]($dataStates,_0x24f688['States']);}VisuMZ[_0x4eabe7(0x2b7)][_0x4eabe7(0x45f)]();},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0xcf)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x38b2d5(0x3e1),_0x38b2d5(0x11d),'<I>',_0x38b2d5(0x2f4),_0x38b2d5(0x201),_0x38b2d5(0x1c8),_0x38b2d5(0x450),_0x38b2d5(0xfb),_0x38b2d5(0x476),_0x38b2d5(0x17c),'<COLORLOCK>',_0x38b2d5(0x12e),_0x38b2d5(0x26e),_0x38b2d5(0x90),_0x38b2d5(0x38e),_0x38b2d5(0x221),_0x38b2d5(0x339),_0x38b2d5(0x3a9),_0x38b2d5(0x15c),_0x38b2d5(0xb3),_0x38b2d5(0x1eb),_0x38b2d5(0x442),_0x38b2d5(0x1da),'HIDE','ENABLE',_0x38b2d5(0x2a6),_0x38b2d5(0x488),_0x38b2d5(0x2c3),_0x38b2d5(0x295),_0x38b2d5(0x1b4)],VisuMZ['MessageCore'][_0x38b2d5(0x3bb)]=function(_0x43ce5c,_0x485d11){const _0x3aa8b1=_0x38b2d5;if(_0x485d11<=0x0)return;const _0x3e71af=_0x43ce5c;for(const _0x1fde5f of _0x3e71af){if(_0x3aa8b1(0x337)!=='ksjQy'){if(!_0x1fde5f)continue;VisuMZ[_0x3aa8b1(0x2b7)][_0x3aa8b1(0x47f)](_0x1fde5f,_0x485d11);}else return this[_0x3aa8b1(0x1a4)]();}},VisuMZ['MessageCore']['CreateAutoColorRegExpLists']=function(){const _0x76b456=_0x38b2d5;VisuMZ[_0x76b456(0x2b7)][_0x76b456(0x486)]=[];for(let _0x106abb=0x1;_0x106abb<=0x1f;_0x106abb++){const _0x2485da=_0x76b456(0x2d1)[_0x76b456(0xd8)](_0x106abb),_0x16adfe=VisuMZ[_0x76b456(0x2b7)][_0x76b456(0x2a5)]['AutoColor'][_0x2485da];_0x16adfe[_0x76b456(0x29a)]((_0x5200cd,_0x5bfc0b)=>{const _0x136bc0=_0x76b456;if(!_0x5200cd||!_0x5bfc0b)return-0x1;return _0x5bfc0b[_0x136bc0(0x8b)]-_0x5200cd[_0x136bc0(0x8b)];}),this[_0x76b456(0x3a1)](_0x16adfe,_0x106abb);}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3a1)]=function(_0x248a17,_0x4e2bd0){const _0x161d92=_0x38b2d5;for(const _0x384192 of _0x248a17){if(_0x384192['length']<=0x0)continue;if(/^\d+$/[_0x161d92(0x46d)](_0x384192))continue;let _0x170c58=VisuMZ['MessageCore'][_0x161d92(0x306)](_0x384192);if(_0x384192['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x838f32=new RegExp(_0x170c58,'i');else var _0x838f32=new RegExp('\x5cb'+_0x170c58+'\x5cb','g');VisuMZ[_0x161d92(0x2b7)][_0x161d92(0x486)][_0x161d92(0x3f7)]([_0x838f32,_0x161d92(0x16a)[_0x161d92(0xd8)](_0x4e2bd0,_0x384192)]);}},VisuMZ[_0x38b2d5(0x2b7)]['ConvertTextAutoColorRegExpFriendly']=function(_0x5a9139){const _0x2ca11d=_0x38b2d5;return _0x5a9139=_0x5a9139[_0x2ca11d(0x18f)](/(\W)/gi,(_0x55e82a,_0x355902)=>_0x2ca11d(0x43d)[_0x2ca11d(0xd8)](_0x355902)),_0x5a9139;},VisuMZ['MessageCore']['ParseClassNotetags']=VisuMZ[_0x38b2d5(0xa5)],VisuMZ[_0x38b2d5(0xa5)]=function(_0x5948b8){const _0x2dad1a=_0x38b2d5;VisuMZ['MessageCore']['ParseClassNotetags'][_0x2dad1a(0x312)](this,_0x5948b8);const _0x4d2984=VisuMZ[_0x2dad1a(0x2b7)][_0x2dad1a(0x2a5)]['AutoColor'];VisuMZ[_0x2dad1a(0x2b7)]['CreateAutoColorFor'](_0x5948b8,_0x4d2984[_0x2dad1a(0xf4)]);},VisuMZ['MessageCore'][_0x38b2d5(0x113)]=VisuMZ[_0x38b2d5(0x113)],VisuMZ[_0x38b2d5(0x113)]=function(_0x21f4be){const _0x385998=_0x38b2d5;VisuMZ[_0x385998(0x2b7)][_0x385998(0x113)]['call'](this,_0x21f4be);const _0x1b6806=VisuMZ['MessageCore'][_0x385998(0x2a5)][_0x385998(0x261)];VisuMZ[_0x385998(0x2b7)][_0x385998(0x47f)](_0x21f4be,_0x1b6806[_0x385998(0xd0)]);},0x7,VisuMZ['MessageCore'][_0x38b2d5(0x171)]=VisuMZ[_0x38b2d5(0x171)],VisuMZ[_0x38b2d5(0x171)]=function(_0x2172a6){const _0x20afb3=_0x38b2d5;VisuMZ[_0x20afb3(0x2b7)]['ParseItemNotetags'][_0x20afb3(0x312)](this,_0x2172a6);const _0x33de73=VisuMZ['MessageCore'][_0x20afb3(0x2a5)][_0x20afb3(0x261)];VisuMZ[_0x20afb3(0x2b7)][_0x20afb3(0x47f)](_0x2172a6,_0x33de73['Items']);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x9c)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0x38b2d5(0x9c)]=function(_0x1203fd){const _0x5d8286=_0x38b2d5;VisuMZ[_0x5d8286(0x2b7)][_0x5d8286(0x9c)][_0x5d8286(0x312)](this,_0x1203fd);const _0x3688b3=VisuMZ[_0x5d8286(0x2b7)][_0x5d8286(0x2a5)][_0x5d8286(0x261)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x1203fd,_0x3688b3[_0x5d8286(0x108)]);},VisuMZ[_0x38b2d5(0x2b7)]['ParseArmorNotetags']=VisuMZ[_0x38b2d5(0x15a)],VisuMZ[_0x38b2d5(0x15a)]=function(_0x542c2f){const _0x44716b=_0x38b2d5;VisuMZ[_0x44716b(0x2b7)]['ParseArmorNotetags'][_0x44716b(0x312)](this,_0x542c2f);const _0x3cc530=VisuMZ[_0x44716b(0x2b7)]['Settings'][_0x44716b(0x261)];VisuMZ[_0x44716b(0x2b7)]['CreateAutoColorFor'](_0x542c2f,_0x3cc530['Armors']);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3e6)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x38b2d5(0x3e6)]=function(_0x303a16){const _0x3ca969=_0x38b2d5;VisuMZ[_0x3ca969(0x2b7)][_0x3ca969(0x3e6)][_0x3ca969(0x312)](this,_0x303a16);const _0x47a3ba=VisuMZ[_0x3ca969(0x2b7)]['Settings'][_0x3ca969(0x261)];VisuMZ[_0x3ca969(0x2b7)][_0x3ca969(0x47f)](_0x303a16,_0x47a3ba[_0x3ca969(0xdf)]);},VisuMZ[_0x38b2d5(0x2b7)]['ParseStateNotetags']=VisuMZ[_0x38b2d5(0x170)],VisuMZ['ParseStateNotetags']=function(_0x5c63dd){const _0xfa8767=_0x38b2d5;VisuMZ[_0xfa8767(0x2b7)]['ParseStateNotetags'][_0xfa8767(0x312)](this,_0x5c63dd);const _0x3c190d=VisuMZ[_0xfa8767(0x2b7)]['Settings']['AutoColor'];VisuMZ[_0xfa8767(0x2b7)][_0xfa8767(0x47f)](_0x5c63dd,_0x3c190d[_0xfa8767(0x191)]);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x47f)]=function(_0x96aa7a,_0x3f15ed){const _0x1cbc45=_0x38b2d5;if(_0x3f15ed<=0x0)return;const _0x50db87=VisuMZ[_0x1cbc45(0x2b7)]['Settings']['AutoColor'][_0x1cbc45(0x24f)+_0x3f15ed];let _0x26b7f4=_0x96aa7a[_0x1cbc45(0x269)][_0x1cbc45(0x2bc)]();if(/^\d+$/[_0x1cbc45(0x46d)](_0x26b7f4))return;if(VisuMZ[_0x1cbc45(0x2b7)][_0x1cbc45(0xcf)][_0x1cbc45(0x480)](_0x26b7f4[_0x1cbc45(0x173)]()))return;_0x26b7f4=_0x26b7f4[_0x1cbc45(0x18f)](/\\I\[(\d+)\]/gi,''),_0x26b7f4=_0x26b7f4[_0x1cbc45(0x18f)](/\x1bI\[(\d+)\]/gi,'');if(_0x26b7f4[_0x1cbc45(0x8b)]<=0x0)return;if(_0x26b7f4[_0x1cbc45(0x3b4)](/-----/i))return;_0x50db87[_0x1cbc45(0x3f7)](_0x26b7f4);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0xcb)]=Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x432)],Scene_Boot[_0x38b2d5(0x187)][_0x38b2d5(0x432)]=function(){const _0x1fbd16=_0x38b2d5;VisuMZ[_0x1fbd16(0x2b7)][_0x1fbd16(0xcb)][_0x1fbd16(0x312)](this),this[_0x1fbd16(0x13c)]();},Scene_Boot['prototype'][_0x38b2d5(0x13c)]=function(){const _0x1c4ea1=_0x38b2d5,_0x4b68f2=VisuMZ[_0x1c4ea1(0x2b7)]['Settings'][_0x1c4ea1(0x35b)]||[];for(const _0x475a78 of _0x4b68f2){if(_0x1c4ea1(0x453)!==_0x1c4ea1(0x453)){_0x2f7a24[_0x1c4ea1(0x2b7)]['ParseStateNotetags'][_0x1c4ea1(0x312)](this,_0x383048);const _0x180a03=_0x334fb4[_0x1c4ea1(0x2b7)][_0x1c4ea1(0x2a5)][_0x1c4ea1(0x261)];_0x114b2a[_0x1c4ea1(0x2b7)][_0x1c4ea1(0x47f)](_0x37595d,_0x180a03[_0x1c4ea1(0x191)]);}else{if(!_0x475a78)continue;const _0x3bce25=_0x475a78[_0x1c4ea1(0x2a7)];if(_0x3bce25[_0x1c4ea1(0x2bc)]()==='')continue;if(_0x3bce25[_0x1c4ea1(0xef)]()['trim']()==='unnamed')continue;const _0x5ea8b5=_0x475a78[_0x1c4ea1(0x2d9)];if(_0x5ea8b5===_0x1c4ea1(0x1be))continue;FontManager[_0x1c4ea1(0x32e)](_0x3bce25,_0x5ea8b5);}}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0xe7)]=DataManager['loadDatabase'],DataManager[_0x38b2d5(0x2cf)]=function(){const _0x6dd9c5=_0x38b2d5;VisuMZ['MessageCore']['DataManager_loadDatabase'][_0x6dd9c5(0x312)](this),this[_0x6dd9c5(0x46b)]();},DataManager[_0x38b2d5(0x46b)]=function(){const _0x488237=_0x38b2d5;if(!TextManager[_0x488237(0x164)]())return;const _0x35dd4b=VisuMZ[_0x488237(0x2b7)][_0x488237(0x2a5)]['Localization'],_0x37a1f=_0x35dd4b['CsvFilename']||'';if(!_0x37a1f)return;const _0x33d27e=_0x488237(0x12f),_0x22d723=new XMLHttpRequest(),_0x35b06d=_0x488237(0xe1)+_0x37a1f;window[_0x33d27e]=null,_0x22d723[_0x488237(0x2ce)](_0x488237(0x35c),_0x35b06d),_0x22d723[_0x488237(0x3ef)](_0x488237(0x167)),_0x22d723[_0x488237(0x1d3)]=()=>this['onLocalizationXhrLoad'](_0x22d723,_0x33d27e),_0x22d723[_0x488237(0x189)]=()=>this['onLocalizationXhrError'](),_0x22d723[_0x488237(0x42d)]();},DataManager['onLocalizationXhrLoad']=function(_0x64a29c,_0x4f132d){const _0x8ad145=_0x38b2d5;if(_0x64a29c[_0x8ad145(0x2af)]>=0x190)return;const _0x1c395b=_0x64a29c[_0x8ad145(0x14a)];window[_0x4f132d]=VisuMZ[_0x8ad145(0x2b7)][_0x8ad145(0x21e)](_0x1c395b);},VisuMZ[_0x38b2d5(0x2b7)]['ParseLocalizationCsv']=function(_0x2201d4){const _0x19ed00=_0x38b2d5,_0x591430=_0x2201d4['split']('\x0a'),_0x50a3e4=_0x591430[0x0][_0x19ed00(0x2b4)](';'),_0x1acd55={};return _0x591430[_0x19ed00(0x422)](0x1)[_0x19ed00(0x1bb)](_0x12cec9=>{const _0x17c7a5=_0x19ed00;let _0x2062e0=[],_0x27194d='',_0x1191eb=![];for(let _0x265eaa=0x0;_0x265eaa<_0x12cec9[_0x17c7a5(0x8b)];_0x265eaa++){let _0x44c94d=_0x12cec9[_0x265eaa];if(_0x44c94d==='\x22')'wtJrW'!==_0x17c7a5(0x46a)?(_0x2c40c0['push'](_0x105d66),_0x29d87e=''):_0x1191eb&&_0x12cec9[_0x265eaa+0x1]==='\x22'?(_0x27194d+=_0x44c94d,_0x265eaa++):_0x1191eb=!_0x1191eb;else _0x44c94d===';'&&!_0x1191eb?(_0x2062e0[_0x17c7a5(0x3f7)](_0x27194d),_0x27194d=''):_0x17c7a5(0x98)==='MdOyY'?_0x27194d+=_0x44c94d:this[_0x17c7a5(0x399)]();}if(_0x27194d)_0x2062e0[_0x17c7a5(0x3f7)](_0x27194d);const _0x4518b2=_0x2062e0[0x0][_0x17c7a5(0x18f)](/^"|"$/g,'')['toLowerCase']()[_0x17c7a5(0x2bc)]();_0x1acd55[_0x4518b2]=_0x50a3e4['slice'](0x1)['reduce']((_0x4fd1c3,_0x2e5d23,_0x1ca43d)=>{const _0x39c16f=_0x17c7a5;return _0x4fd1c3[_0x2e5d23]=(_0x2062e0[_0x1ca43d+0x1]||'')[_0x39c16f(0x18f)](/^"|"$/g,''),_0x4fd1c3;},{});}),_0x1acd55;},DataManager[_0x38b2d5(0x73)]=function(){const _0x1a4481=_0x38b2d5;let _0x5bd7ef='';_0x5bd7ef+=_0x1a4481(0x22a),_0x5bd7ef+=_0x1a4481(0x415);if(confirm(_0x5bd7ef))Utils[_0x1a4481(0x473)]('test')?(_0x5bd7ef=_0x1a4481(0x81),alert(_0x5bd7ef),this['createLocalizationCsvFile'](),this[_0x1a4481(0x8e)](),_0x5bd7ef=''):_0x5bd7ef=_0x1a4481(0xc2);else{if(_0x1a4481(0x231)===_0x1a4481(0x10f)){const _0x2339fb=_0x3b761b[_0x1a4481(0x1d8)]();_0x2339fb==='skill'&&_0x3c7cce[_0x1a4481(0x40f)]?this['makeSkillList']():_0x3f005c[_0x1a4481(0x187)][_0x1a4481(0x3b7)]['call'](this);}else _0x5bd7ef=_0x1a4481(0x298);}_0x5bd7ef+='Please\x20restart\x20the\x20game.',alert(_0x5bd7ef),SceneManager[_0x1a4481(0x299)]();},DataManager[_0x38b2d5(0x2e2)]=function(){const _0x213f0c=_0x38b2d5,_0x55df87=[_0x213f0c(0x135),_0x213f0c(0x430),'Bengali',_0x213f0c(0x203),_0x213f0c(0x30b),'Czech',_0x213f0c(0x315),_0x213f0c(0x1e6),_0x213f0c(0x1ce),_0x213f0c(0x168),_0x213f0c(0x3cb),_0x213f0c(0x11b),_0x213f0c(0x2fc),_0x213f0c(0x17f),_0x213f0c(0x21f),_0x213f0c(0x2be),_0x213f0c(0x96),'Korean',_0x213f0c(0x216),_0x213f0c(0x1a3),_0x213f0c(0x2da),'Romanian','Russian',_0x213f0c(0x49f),'Spanish',_0x213f0c(0x9e),_0x213f0c(0x18c),_0x213f0c(0xc9),_0x213f0c(0x89)],_0x427547=[_0x213f0c(0x76),_0x213f0c(0x355),_0x213f0c(0x3e5),'你好','你好',_0x213f0c(0x327),_0x213f0c(0x401),_0x213f0c(0x128),'Hei','Bonjour',_0x213f0c(0x128),_0x213f0c(0x2c1),_0x213f0c(0x389),_0x213f0c(0x2e9),'Halo',_0x213f0c(0x13e),'こんにちは','안녕하세요',_0x213f0c(0x226),_0x213f0c(0x336),_0x213f0c(0x1d7),_0x213f0c(0x254),'Привет',_0x213f0c(0x327),_0x213f0c(0x17a),_0x213f0c(0x401),_0x213f0c(0x24d),_0x213f0c(0x428),'Merhaba'],_0x198ea8=[_0x213f0c(0x145),_0x213f0c(0x39a),_0x213f0c(0x249),'再见','再見',_0x213f0c(0x351),_0x213f0c(0x300),_0x213f0c(0x25d),_0x213f0c(0x259),_0x213f0c(0x463),_0x213f0c(0x102),_0x213f0c(0x82),_0x213f0c(0x362),_0x213f0c(0x194),_0x213f0c(0x1d4),'Arrivederci',_0x213f0c(0x21b),_0x213f0c(0x43e),'Ha\x20det','Do\x20widzenia','Adeus',_0x213f0c(0x3c8),_0x213f0c(0x39b),_0x213f0c(0x106),'Adiós',_0x213f0c(0x358),_0x213f0c(0x123),_0x213f0c(0x1e1),_0x213f0c(0xa6)],_0x5646f0=[_0x213f0c(0x437),_0x213f0c(0x437),_0x213f0c(0x2d4),'哇','哇','Ó',_0x213f0c(0x437),_0x213f0c(0x3dd),_0x213f0c(0x24c),_0x213f0c(0x3c9),_0x213f0c(0x437),_0x213f0c(0x30a),_0x213f0c(0x2ab),_0x213f0c(0x23c),_0x213f0c(0x41d),_0x213f0c(0x437),'ワオ','와우','Oi','O',_0x213f0c(0x3f0),_0x213f0c(0x3f0),_0x213f0c(0x489),'Ó','Guau','Oj',_0x213f0c(0x2d5),_0x213f0c(0x36f),'Vay'],_0x9cb40b=[_0x55df87,_0x427547,_0x198ea8,_0x5646f0],_0x139c2c=_0x9cb40b['map'](_0x4f1221=>_0x4f1221['join'](';'))[_0x213f0c(0xfc)]('\x0a'),_0x2c6234=VisuMZ['MessageCore'][_0x213f0c(0x2a5)][_0x213f0c(0xd7)],_0x387701=_0x2c6234[_0x213f0c(0x33a)]||_0x213f0c(0xf6),_0x3111e2=require(_0x213f0c(0x265)),_0x502680=_0x3111e2[_0x213f0c(0xed)](process['mainModule'][_0x213f0c(0x3e2)]),_0x30c2dc=_0x3111e2[_0x213f0c(0xfc)](_0x502680,_0x213f0c(0xe1)),_0x5d5b1b=_0x30c2dc+_0x387701,_0x1aec81=require('fs');return _0x1aec81[_0x213f0c(0x345)](_0x5d5b1b,_0x139c2c),_0x5d5b1b;},DataManager[_0x38b2d5(0x8e)]=function(){const _0x582128=_0x38b2d5,{exec:_0x20188f}=require('child_process');_0x20188f(_0x582128(0x19e)),_0x20188f(_0x582128(0x7c));},SceneManager['isSceneBattle']=function(){const _0x44445b=_0x38b2d5;return this[_0x44445b(0x490)]&&this[_0x44445b(0x490)][_0x44445b(0xcc)]===Scene_Battle;},SceneManager[_0x38b2d5(0xad)]=function(){const _0x35162a=_0x38b2d5;return this[_0x35162a(0x490)]&&this[_0x35162a(0x490)][_0x35162a(0xcc)]===Scene_Map;},ConfigManager[_0x38b2d5(0x326)]=VisuMZ['MessageCore'][_0x38b2d5(0x2a5)][_0x38b2d5(0xd7)][_0x38b2d5(0x46c)]||_0x38b2d5(0x430),ConfigManager[_0x38b2d5(0x314)]=VisuMZ['MessageCore'][_0x38b2d5(0x2a5)]['TextSpeed']['Default'],VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x35e)]=ConfigManager[_0x38b2d5(0xaf)],ConfigManager['makeData']=function(){const _0x396cc3=_0x38b2d5,_0x5c28ba=VisuMZ[_0x396cc3(0x2b7)][_0x396cc3(0x35e)][_0x396cc3(0x312)](this);return TextManager[_0x396cc3(0x164)]()&&(_0x5c28ba['textLocale']=this['textLocale']),_0x5c28ba[_0x396cc3(0x314)]=this[_0x396cc3(0x314)],_0x5c28ba;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x85)]=ConfigManager['applyData'],ConfigManager[_0x38b2d5(0x1b5)]=function(_0x28ed74){const _0x4a9fca=_0x38b2d5;VisuMZ['MessageCore'][_0x4a9fca(0x85)][_0x4a9fca(0x312)](this,_0x28ed74);TextManager[_0x4a9fca(0x164)]()&&(_0x4a9fca(0x326)in _0x28ed74?this['textLocale']=String(_0x28ed74[_0x4a9fca(0x326)]):this[_0x4a9fca(0x326)]=VisuMZ[_0x4a9fca(0x2b7)][_0x4a9fca(0x2a5)][_0x4a9fca(0xd7)][_0x4a9fca(0x46c)]||'English');if('textSpeed'in _0x28ed74){if('jXZdD'!==_0x4a9fca(0x3b5))this[_0x4a9fca(0x314)]=Number(_0x28ed74[_0x4a9fca(0x314)])[_0x4a9fca(0x26a)](0x1,0xb);else{const _0x252f03=_0x41afd7[_0x4a9fca(0x2b7)][_0x4a9fca(0x2a5)][_0x4173ad];_0x252f03[_0x4a9fca(0x29a)]((_0x4bd0e3,_0x587698)=>{const _0x4805ac=_0x4a9fca;if(!_0x4bd0e3||!_0x587698)return-0x1;return _0x587698[_0x4805ac(0x2ee)]['length']-_0x4bd0e3[_0x4805ac(0x2ee)][_0x4805ac(0x8b)];});}}else{if('ftfDX'===_0x4a9fca(0x44b))this['textSpeed']=VisuMZ['MessageCore'][_0x4a9fca(0x2a5)][_0x4a9fca(0x28c)][_0x4a9fca(0x253)];else{const _0x458854=_0x93b2fa['MessageCore'][_0x4a9fca(0x2a5)][_0x4a9fca(0xd7)]['Languages']||[];let _0x504844=_0x458854[_0x4a9fca(0x43c)](_0x53ffe8[_0x4a9fca(0x326)]||_0x4a9fca(0x430));_0x504844+=_0x187620;const _0x2f2553=_0x458854[_0x504844]||'';return this[_0x4a9fca(0x424)](_0x2f2553);}}},TextManager[_0x38b2d5(0x7b)]=VisuMZ[_0x38b2d5(0x2b7)]['Settings'][_0x38b2d5(0xd7)]['Name'],TextManager[_0x38b2d5(0x48d)]=VisuMZ[_0x38b2d5(0x2b7)]['Settings']['TextSpeed'][_0x38b2d5(0x91)],TextManager['instantTextSpeed']=VisuMZ[_0x38b2d5(0x2b7)]['Settings'][_0x38b2d5(0x28c)][_0x38b2d5(0x329)],VisuMZ['MessageCore'][_0x38b2d5(0xd5)]=TextManager[_0x38b2d5(0x88)],TextManager[_0x38b2d5(0x88)]=function(_0x3936e6){const _0x358e0b=_0x38b2d5,_0x3e3f14=[_0x358e0b(0x458),_0x358e0b(0x21a),'preemptive',_0x358e0b(0x380),_0x358e0b(0x2c5),'defeat',_0x358e0b(0x15b),_0x358e0b(0xd2),_0x358e0b(0x24b),'obtainItem'];let _0x185d7a=VisuMZ[_0x358e0b(0x2b7)][_0x358e0b(0xd5)][_0x358e0b(0x312)](this,_0x3936e6);return _0x3e3f14[_0x358e0b(0x480)](_0x3936e6)&&(_0x358e0b(0x25c)==='mQgth'?_0x185d7a=_0x358e0b(0x221)+_0x185d7a:(_0x3735f1=_0x18f478[_0x358e0b(0x78)](_0x28eeee['$1'])[_0x358e0b(0x2bc)](),_0x18b71c=_0x178093[_0x358e0b(0x78)](_0x221b4c['$2'])['trim'](),_0x1408b6=!![])),_0x185d7a;},TextManager[_0x38b2d5(0x164)]=function(){const _0x16e290=_0x38b2d5;return VisuMZ[_0x16e290(0x2b7)]['Settings']['Localization'][_0x16e290(0xda)];},TextManager[_0x38b2d5(0x455)]=function(_0x1b0d9a){const _0x24067e=_0x38b2d5;if(!this['isVisuMzLocalizationEnabled']())return _0x1b0d9a;return _0x1b0d9a=String(_0x1b0d9a)[_0x24067e(0x18f)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x54765d,_0x57409f)=>this['getLocalizedText'](String(_0x57409f))),_0x1b0d9a=String(_0x1b0d9a)[_0x24067e(0x18f)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x306e15,_0x3bdf61)=>this[_0x24067e(0x446)](String(_0x3bdf61))),_0x1b0d9a=String(_0x1b0d9a)[_0x24067e(0x18f)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x5b6bc2,_0x5aac74)=>this[_0x24067e(0x446)](String(_0x5aac74))),_0x1b0d9a;},TextManager['getLocalizedText']=function(_0x1d7af8){const _0x1185bb=_0x38b2d5;if(!$dataLocalization)return'';const _0x3c0458=$dataLocalization[_0x1d7af8[_0x1185bb(0xef)]()[_0x1185bb(0x2bc)]()];if(!_0x3c0458)return;const _0x2481db=ConfigManager[_0x1185bb(0x326)]||_0x1185bb(0x430);let _0x22aa10=_0x3c0458[_0x2481db]||_0x1185bb(0x34b);return _0x22aa10=_0x22aa10['replace'](/\\/g,'\x1b'),_0x22aa10=_0x22aa10[_0x1185bb(0x18f)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x22aa10;},TextManager[_0x38b2d5(0x424)]=function(_0x37608d){const _0x3dd568=_0x38b2d5;return VisuMZ[_0x3dd568(0x2b7)]['Settings'][_0x3dd568(0xd7)][_0x37608d]||'';},TextManager[_0x38b2d5(0x22b)]=function(){const _0x4ce88d=_0x38b2d5,_0x1b2c7b=ConfigManager['textLocale']||_0x4ce88d(0x430);return this[_0x4ce88d(0x424)](_0x1b2c7b);},TextManager[_0x38b2d5(0x425)]=function(_0xcb76c8){const _0x80629=_0x38b2d5,_0x2b6ff7=VisuMZ[_0x80629(0x2b7)][_0x80629(0x2a5)][_0x80629(0xd7)][_0x80629(0x392)]||[];let _0x2bcb35=_0x2b6ff7[_0x80629(0x43c)](ConfigManager['textLocale']||_0x80629(0x430));_0x2bcb35+=_0xcb76c8;const _0x39f814=_0x2b6ff7[_0x2bcb35]||'';return this[_0x80629(0x424)](_0x39f814);},Game_Temp[_0x38b2d5(0x187)][_0x38b2d5(0x374)]=function(_0x2cef69){const _0x4e98a5=_0x38b2d5;this[_0x4e98a5(0x1a5)]=_0x2cef69;},Game_Temp[_0x38b2d5(0x187)]['getLastPluginCommandInterpreter']=function(){const _0x27a3e7=_0x38b2d5;return this[_0x27a3e7(0x1a5)];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x2ff)]=Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x2eb)],Game_Interpreter['prototype'][_0x38b2d5(0x2eb)]=function(_0x219f09){const _0x4265a0=_0x38b2d5;return $gameTemp[_0x4265a0(0x374)](this),VisuMZ[_0x4265a0(0x2b7)][_0x4265a0(0x2ff)][_0x4265a0(0x312)](this,_0x219f09);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x149)]=Game_System['prototype'][_0x38b2d5(0x12d)],Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x12d)]=function(){const _0x1420c4=_0x38b2d5;VisuMZ[_0x1420c4(0x2b7)][_0x1420c4(0x149)][_0x1420c4(0x312)](this),this['initMessageCore']();},Game_System['prototype'][_0x38b2d5(0x174)]=function(){const _0x1375b7=_0x38b2d5,_0x3a81fe=VisuMZ[_0x1375b7(0x2b7)][_0x1375b7(0x2a5)][_0x1375b7(0x169)],_0x423003=VisuMZ[_0x1375b7(0x2b7)][_0x1375b7(0x2a5)][_0x1375b7(0x388)];this[_0x1375b7(0x3f2)]={'messageRows':_0x3a81fe[_0x1375b7(0x35a)],'messageWidth':_0x3a81fe['MessageWidth'],'messageWordWrap':_0x423003[_0x1375b7(0x3ba)],'helpWordWrap':_0x423003['HelpWindow'],'choiceLineHeight':_0x3a81fe[_0x1375b7(0x3fb)],'choiceMinWidth':_0x3a81fe[_0x1375b7(0xd1)]??0x60,'choiceRows':_0x3a81fe[_0x1375b7(0x2e3)],'choiceCols':_0x3a81fe[_0x1375b7(0x491)],'choiceTextAlign':_0x3a81fe[_0x1375b7(0x235)],'choiceDistance':0x0},this['_messageOffsetX']===undefined&&(this[_0x1375b7(0x45e)]=_0x3a81fe[_0x1375b7(0x26b)],this['_messageOffsetY']=_0x3a81fe[_0x1375b7(0x232)]);},Game_System['prototype'][_0x38b2d5(0x120)]=function(){const _0x4843a0=_0x38b2d5;if(this[_0x4843a0(0x3f2)]===undefined)this[_0x4843a0(0x174)]();if(this[_0x4843a0(0x3f2)][_0x4843a0(0xab)]===undefined)this['initMessageCore']();return this[_0x4843a0(0x3f2)]['messageRows'];},Game_System[_0x38b2d5(0x187)]['setMessageWindowRows']=function(_0x429484){const _0x2e8e1e=_0x38b2d5;if(this[_0x2e8e1e(0x3f2)]===undefined)this['initMessageCore']();if(this[_0x2e8e1e(0x3f2)]['messageRows']===undefined)this['initMessageCore']();this['_MessageCoreSettings']['messageRows']=_0x429484||0x1;},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x107)]=function(){const _0x4d4e66=_0x38b2d5;if(this[_0x4d4e66(0x3f2)]===undefined)this['initMessageCore']();if(this[_0x4d4e66(0x3f2)][_0x4d4e66(0x485)]===undefined)this['initMessageCore']();return this[_0x4d4e66(0x3f2)]['messageWidth'];},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x2e1)]=function(_0x6dd78b){const _0x1d5e5d=_0x38b2d5;if(this['_MessageCoreSettings']===undefined)this[_0x1d5e5d(0x174)]();if(this['_MessageCoreSettings'][_0x1d5e5d(0x485)]===undefined)this['initMessageCore']();_0x6dd78b=Math['ceil'](_0x6dd78b);if(_0x6dd78b%0x2!==0x0)_0x6dd78b+=0x1;this[_0x1d5e5d(0x3f2)][_0x1d5e5d(0x485)]=_0x6dd78b||0x2;},Game_System['prototype'][_0x38b2d5(0x28f)]=function(){const _0x406d93=_0x38b2d5;if(this[_0x406d93(0x3f2)]===undefined)this[_0x406d93(0x174)]();if(this[_0x406d93(0x3f2)][_0x406d93(0x245)]===undefined)this[_0x406d93(0x174)]();return this[_0x406d93(0x3f2)][_0x406d93(0x245)];},Game_System[_0x38b2d5(0x187)]['setMessageWindowWordWrap']=function(_0x540ed5){const _0x292b0e=_0x38b2d5;if(this[_0x292b0e(0x3f2)]===undefined)this[_0x292b0e(0x174)]();if(this[_0x292b0e(0x3f2)][_0x292b0e(0x245)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x292b0e(0x245)]=_0x540ed5;},Game_System[_0x38b2d5(0x187)]['getMessageWindowXyOffsets']=function(){const _0x2acb70=_0x38b2d5;if(this['_messageOffsetX']===undefined){const _0x22e6cd=VisuMZ[_0x2acb70(0x2b7)]['Settings'][_0x2acb70(0x169)];this[_0x2acb70(0x45e)]=_0x22e6cd[_0x2acb70(0x26b)],this[_0x2acb70(0x127)]=_0x22e6cd[_0x2acb70(0x232)];}return{'x':this['_messageOffsetX']||0x0,'y':this[_0x2acb70(0x127)]||0x0};},Game_System[_0x38b2d5(0x187)]['setMessageWindowXyOffsets']=function(_0x478846,_0x2c1987){const _0x2a5484=_0x38b2d5;if(this[_0x2a5484(0x3f2)]===undefined)this[_0x2a5484(0x174)]();this['_messageOffsetX']=_0x478846,this[_0x2a5484(0x127)]=_0x2c1987;},Game_System['prototype'][_0x38b2d5(0x138)]=function(){const _0x5c52ad=_0x38b2d5;if(this[_0x5c52ad(0x3f2)]===undefined)this['initMessageCore']();if(this[_0x5c52ad(0x3f2)][_0x5c52ad(0x2c6)]===undefined)this[_0x5c52ad(0x174)]();return this['_MessageCoreSettings']['helpWordWrap'];},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x381)]=function(_0x4c8b82){const _0x45c36d=_0x38b2d5;if(this['_MessageCoreSettings']===undefined)this[_0x45c36d(0x174)]();if(this['_MessageCoreSettings']['helpWordWrap']===undefined)this[_0x45c36d(0x174)]();this[_0x45c36d(0x3f2)][_0x45c36d(0x2c6)]=_0x4c8b82;},Game_System['prototype'][_0x38b2d5(0x1b8)]=function(){const _0x121cf0=_0x38b2d5;if(this[_0x121cf0(0x3f2)]===undefined)this['initMessageCore']();if(this[_0x121cf0(0x3f2)][_0x121cf0(0x233)]===undefined)this[_0x121cf0(0x174)]();return this[_0x121cf0(0x3f2)][_0x121cf0(0x233)];},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x119)]=function(_0x352a46){const _0x2bf922=_0x38b2d5;if(this[_0x2bf922(0x3f2)]===undefined)this[_0x2bf922(0x174)]();if(this['_MessageCoreSettings'][_0x2bf922(0x233)]===undefined)this['initMessageCore']();this[_0x2bf922(0x3f2)]['choiceLineHeight']=_0x352a46||0x1;},Game_System['prototype'][_0x38b2d5(0x285)]=function(){const _0x18fc1d=_0x38b2d5;if(this[_0x18fc1d(0x3f2)]===undefined)this[_0x18fc1d(0x174)]();return this[_0x18fc1d(0x3f2)][_0x18fc1d(0x335)]??0x60;},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x27c)]=function(_0x560fad){const _0x253778=_0x38b2d5;if(this[_0x253778(0x3f2)]===undefined)this[_0x253778(0x174)]();this[_0x253778(0x3f2)][_0x253778(0x335)]=_0x560fad||0x0;},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x3f9)]=function(){const _0x48b273=_0x38b2d5;if(this[_0x48b273(0x3f2)]===undefined)this[_0x48b273(0x174)]();if(this[_0x48b273(0x3f2)][_0x48b273(0x365)]===undefined)this[_0x48b273(0x174)]();return this[_0x48b273(0x3f2)][_0x48b273(0x365)];},Game_System['prototype'][_0x38b2d5(0x3de)]=function(_0x210d20){const _0x24312a=_0x38b2d5;if(this[_0x24312a(0x3f2)]===undefined)this[_0x24312a(0x174)]();if(this['_MessageCoreSettings'][_0x24312a(0x365)]===undefined)this[_0x24312a(0x174)]();this[_0x24312a(0x3f2)][_0x24312a(0x365)]=_0x210d20||0x1;},Game_System['prototype'][_0x38b2d5(0x1cb)]=function(){const _0x2dca24=_0x38b2d5;if(this[_0x2dca24(0x3f2)]===undefined)this[_0x2dca24(0x174)]();if(this[_0x2dca24(0x3f2)][_0x2dca24(0x1d1)]===undefined)this[_0x2dca24(0x174)]();return this[_0x2dca24(0x3f2)][_0x2dca24(0x1d1)];},Game_System['prototype']['setChoiceListMaxColumns']=function(_0x366db2){const _0x3d1970=_0x38b2d5;if(this[_0x3d1970(0x3f2)]===undefined)this[_0x3d1970(0x174)]();if(this[_0x3d1970(0x3f2)][_0x3d1970(0x1d1)]===undefined)this['initMessageCore']();this[_0x3d1970(0x3f2)]['choiceCols']=_0x366db2||0x1;},Game_System['prototype'][_0x38b2d5(0x10a)]=function(){const _0x57729a=_0x38b2d5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x57729a(0x3f2)]['choiceTextAlign']===undefined)this[_0x57729a(0x174)]();return this[_0x57729a(0x3f2)]['choiceTextAlign'];},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x132)]=function(_0x18fc6f){const _0x411bea=_0x38b2d5;if(this[_0x411bea(0x3f2)]===undefined)this[_0x411bea(0x174)]();if(this[_0x411bea(0x3f2)]['choiceTextAlign']===undefined)this['initMessageCore']();this[_0x411bea(0x3f2)][_0x411bea(0x49a)]=_0x18fc6f[_0x411bea(0xef)]();},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x3fa)]=function(){const _0x4bcfbc=_0x38b2d5;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x4bcfbc(0x346)]||0x0;},Game_System[_0x38b2d5(0x187)][_0x38b2d5(0x185)]=function(_0x11ca3b){const _0x1cb873=_0x38b2d5;if(this[_0x1cb873(0x3f2)]===undefined)this[_0x1cb873(0x174)]();this['_MessageCoreSettings'][_0x1cb873(0x346)]=_0x11ca3b||0x0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x71)]=function(_0x3f3623,_0x2b2f37){const _0x4c2f95=_0x38b2d5;this[_0x4c2f95(0x426)]=_0x3f3623,this[_0x4c2f95(0x8d)]='weapon',this[_0x4c2f95(0x328)]=_0x2b2f37,this[_0x4c2f95(0x1a9)]=0x0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x83)]=function(){const _0x412fd9=_0x38b2d5;return this[_0x412fd9(0x328)]||0x0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1e9)]=function(_0xfaa9ab,_0x2e7e44,_0x20dcd4){const _0xde0cee=_0x38b2d5;this[_0xde0cee(0x426)]=_0xfaa9ab,this[_0xde0cee(0x8d)]=_0xde0cee(0x475),this[_0xde0cee(0x41a)]=_0x2e7e44,this[_0xde0cee(0x1a9)]=_0x20dcd4;},Game_Message['prototype'][_0x38b2d5(0x416)]=function(){const _0x43fdfe=_0x38b2d5;return this[_0x43fdfe(0x41a)]||0x0;},Game_Message['prototype'][_0x38b2d5(0x340)]=function(){const _0x3900c6=_0x38b2d5;return this[_0x3900c6(0x1a9)]||0x0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0xc3)]=function(_0xe378ca,_0x5642e1,_0x5d3ff0){const _0xa42cb2=_0x38b2d5;this['_itemChoiceVariableId']=_0xe378ca,this[_0xa42cb2(0x8d)]='skill',this[_0xa42cb2(0x48a)]=_0x5642e1,this[_0xa42cb2(0xe4)]=_0x5d3ff0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x72)]=function(){const _0xb0c9da=_0x38b2d5;return this[_0xb0c9da(0x48a)]||0x0;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x8a)]=function(){const _0x5e40e3=_0x38b2d5;return $gameActors[_0x5e40e3(0x2dd)](this[_0x5e40e3(0x72)]())||$gameParty[_0x5e40e3(0x114)]()||null;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1d2)]=function(){return this['_itemChoiceStypeId']||0x0;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x9d)]=Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1ff)],Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1ff)]=function(_0x45dcf2,_0x1b5a6d,_0x5b97b2){const _0x2429de=_0x38b2d5;this['_scriptCall']=!![],VisuMZ[_0x2429de(0x2b7)][_0x2429de(0x9d)][_0x2429de(0x312)](this,_0x45dcf2,_0x1b5a6d,_0x5b97b2);},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x40c)]=function(){const _0x248bfe=_0x38b2d5;this['_scriptCall']=![],this[_0x248bfe(0x14f)]=[];const _0x124326=this[_0x248bfe(0x228)][_0x248bfe(0x8b)];this['_maxShuffleChoices']=_0x124326;let _0x51df04=![];for(let _0x974f5d=0x0;_0x974f5d<_0x124326;_0x974f5d++){if(_0x248bfe(0x354)!==_0x248bfe(0x354))this[_0x248bfe(0x48f)][_0x248bfe(0x439)]=!!_0x519e3a;else{let _0x5526d1=this[_0x248bfe(0x228)][_0x974f5d];_0x5526d1[_0x248bfe(0x3b4)](/<SHUFFLE>/gi)&&(_0x51df04=!![],_0x5526d1=_0x5526d1[_0x248bfe(0x18f)](/<SHUFFLE>/gi,'')),_0x5526d1['match'](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x51df04=!![],this[_0x248bfe(0x1fb)]=Math[_0x248bfe(0x369)](Number(RegExp['$1']),this['_maxShuffleChoices']),_0x5526d1=_0x5526d1[_0x248bfe(0x18f)](/<SHUFFLE:[ ](\d+)>/gi,'')),this[_0x248bfe(0x14f)][_0x248bfe(0x3f7)](_0x974f5d),this[_0x248bfe(0x228)][_0x974f5d]=_0x5526d1;}}if(_0x51df04){this[_0x248bfe(0x14f)]=VisuMZ[_0x248bfe(0x2b7)][_0x248bfe(0x264)](this[_0x248bfe(0x14f)]);if(this[_0x248bfe(0x1a0)]()!==-0x2)this[_0x248bfe(0x311)]=-0x1;}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x264)]=function(_0x472e21){const _0x23e27b=_0x38b2d5;var _0x2a8c69,_0x4d833a,_0x4a3b0b;for(_0x4a3b0b=_0x472e21['length']-0x1;_0x4a3b0b>0x0;_0x4a3b0b--){_0x2a8c69=Math['floor'](Math[_0x23e27b(0x459)]()*(_0x4a3b0b+0x1)),_0x4d833a=_0x472e21[_0x4a3b0b],_0x472e21[_0x4a3b0b]=_0x472e21[_0x2a8c69],_0x472e21[_0x2a8c69]=_0x4d833a;}return _0x472e21;},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x14b)]=function(){const _0x5da081=_0x38b2d5;if(!this[_0x5da081(0x14f)])this['setupShuffleChoices']();return this[_0x5da081(0x14f)];},Game_Message[_0x38b2d5(0x187)][_0x38b2d5(0x193)]=function(){const _0x4b8d73=_0x38b2d5;if(this[_0x4b8d73(0x1fb)]===undefined)this[_0x4b8d73(0x40c)]();return this[_0x4b8d73(0x1fb)];},VisuMZ['MessageCore']['Game_Screen_clearPictures']=Game_Screen['prototype']['clearPictures'],Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x2ec)]=function(){const _0x5b9ad7=_0x38b2d5;VisuMZ[_0x5b9ad7(0x2b7)]['Game_Screen_clearPictures'][_0x5b9ad7(0x312)](this),this[_0x5b9ad7(0xfd)]();},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0xfd)]=function(){const _0x4ce5e1=_0x38b2d5;this[_0x4ce5e1(0xf1)]=[],this[_0x4ce5e1(0x41b)]=[],this[_0x4ce5e1(0x126)]=[];},Game_Screen['prototype'][_0x38b2d5(0x141)]=function(_0x792b5){const _0x564e37=_0x38b2d5;if(this['_pictureText']===undefined)this[_0x564e37(0xfd)]();const _0x2b754c=this['realPictureId'](_0x792b5);return this[_0x564e37(0xf1)][_0x2b754c]=this[_0x564e37(0xf1)][_0x2b754c]||{},this[_0x564e37(0xf1)][_0x2b754c];},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x234)]=function(_0x41b627,_0x4b9235){const _0x27fd63=_0x38b2d5;return _0x4b9235=_0x4b9235['toLowerCase']()[_0x27fd63(0x2bc)](),this['getPictureTextData'](_0x41b627)[_0x4b9235]||'';},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x3c6)]=function(_0x57d332,_0x42cb60,_0x51ffc7){const _0x2912a8=_0x38b2d5;_0x51ffc7=_0x51ffc7[_0x2912a8(0xef)]()['trim'](),this[_0x2912a8(0x141)](_0x57d332)[_0x51ffc7]=_0x42cb60||'',this['requestPictureTextRefresh'](_0x57d332,!![]);},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x3a6)]=function(_0x15d159){const _0x5923a7=_0x38b2d5;if(this[_0x5923a7(0xf1)]===undefined)this[_0x5923a7(0xfd)]();const _0xc9b970=this[_0x5923a7(0x267)](_0x15d159);this['_pictureText'][_0xc9b970]=null,this[_0x5923a7(0xde)](_0x15d159,!![]);},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x1ad)]=function(_0x19866b){const _0x5bbeca=_0x38b2d5;if(this[_0x5bbeca(0xf1)]===undefined)this[_0x5bbeca(0xfd)]();const _0x249c70=this['realPictureId'](_0x19866b);return this[_0x5bbeca(0x41b)][_0x249c70]||0x0;},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x192)]=function(_0x2128e4,_0x49d848){const _0x428c2d=_0x38b2d5;if(this[_0x428c2d(0xf1)]===undefined)this[_0x428c2d(0xfd)]();const _0x557bc6=this['realPictureId'](_0x2128e4);this[_0x428c2d(0x41b)][_0x557bc6]=Math[_0x428c2d(0x212)](0x0,_0x49d848);},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0xe8)]=function(_0x5574ae){const _0x239879=_0x38b2d5;if(this[_0x239879(0xf1)]===undefined)this['clearAllPictureTexts']();const _0x2d2618=this[_0x239879(0x267)](_0x5574ae);this['_pictureTextBuffer'][_0x2d2618]=undefined;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x420)]=Game_Screen[_0x38b2d5(0x187)]['erasePicture'],Game_Screen[_0x38b2d5(0x187)]['erasePicture']=function(_0x18e686){const _0x479f38=_0x38b2d5;VisuMZ[_0x479f38(0x2b7)]['Game_Screen_erasePicture']['call'](this,_0x18e686),this[_0x479f38(0x3a6)](_0x18e686),this[_0x479f38(0xe8)](_0x18e686),this['requestPictureTextRefresh'](_0x18e686,!![]);},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x31d)]=function(){const _0xa7e763=_0x38b2d5;for(const _0x13772 of this['_pictures']){if(_0xa7e763(0x1af)!==_0xa7e763(0x1af))this['setWordWrap'](_0x376ca6[_0xa7e763(0x28f)]());else{if(_0x13772){let _0x46c78b=this[_0xa7e763(0x33d)][_0xa7e763(0x43c)](_0x13772);this['requestPictureTextRefresh'](_0x46c78b);}}}},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0xde)]=function(_0x27466a,_0x549d90){const _0x50fcde=_0x38b2d5;this[_0x50fcde(0x126)]=this[_0x50fcde(0x126)]||[];if(this[_0x50fcde(0x3b9)](_0x27466a)||_0x549d90){if('bIkUZ'===_0x50fcde(0x43f))this[_0x50fcde(0x126)][_0x50fcde(0x3f7)](_0x27466a);else return _0x572ddf=this[_0x50fcde(0x2d7)](_0x11166a),_0x2375de=this['convertBackslashCharacters'](_0x128fd0),_0x46150f=this[_0x50fcde(0x35d)](_0x5cd4b6),_0x3a4199=this[_0x50fcde(0x22e)](_0x538993),_0x177223=this[_0x50fcde(0x27b)](_0x4b61cd),_0xa5a75c=this[_0x50fcde(0x361)](_0x5710c5),_0x2d173b=this[_0x50fcde(0x93)](_0x4e0331),_0x24e1c9=this[_0x50fcde(0x23f)](_0x1933ac),_0x2d5f2a=this[_0x50fcde(0x367)](_0x266865),_0xf957be=this[_0x50fcde(0x387)](_0x1f6539),_0x53c221=this[_0x50fcde(0x252)](_0x1728fb),_0x15226a=this[_0x50fcde(0x218)](_0xba20fb),_0x40ae2e=this['convertMessageCoreEscapeReplacements'](_0x4e753d),_0x26de6c=this['postConvertEscapeCharacters'](_0x27a9df),_0x5e399c=this[_0x50fcde(0x35d)](_0x3d3ca7),_0x1c0f60=this['processAutoColorWords'](_0x589c81),_0x211b5c=this[_0x50fcde(0x23b)](_0x5c44bf),_0x2d22b3;}},Game_Screen['prototype']['needsPictureTextRefresh']=function(_0xb88483){const _0xf17375=_0x38b2d5;return this[_0xf17375(0x126)]=this[_0xf17375(0x126)]||[],this[_0xf17375(0x126)][_0xf17375(0x480)](_0xb88483);},Game_Screen[_0x38b2d5(0x187)][_0x38b2d5(0x16b)]=function(_0x1f52ca){const _0x1c5860=_0x38b2d5;this[_0x1c5860(0x126)]=this[_0x1c5860(0x126)]||[],this['_pictureTextRefresh'][_0x1c5860(0x1fa)](_0x1f52ca);},Game_Screen['prototype'][_0x38b2d5(0x3b9)]=function(_0xa84409){const _0x504780=_0x38b2d5,_0xd57dc2=[_0x504780(0x1e3),'up',_0x504780(0x39d),_0x504780(0x431),_0x504780(0x45a),'right','lowerleft',_0x504780(0x12c),'lowerright'];return _0xd57dc2[_0x504780(0xc7)](_0x158bc3=>this['getPictureText'](_0xa84409,_0x158bc3)!=='');},VisuMZ[_0x38b2d5(0x2b7)]['Game_Party_initialize']=Game_Party[_0x38b2d5(0x187)]['initialize'],Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x12d)]=function(){const _0x898fe6=_0x38b2d5;VisuMZ['MessageCore'][_0x898fe6(0x493)][_0x898fe6(0x312)](this),this[_0x898fe6(0x174)]();},Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x174)]=function(){const _0x57ef87=_0x38b2d5;this[_0x57ef87(0x332)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x386)]=function(){const _0x1cbd3b=_0x38b2d5;if(this[_0x1cbd3b(0x332)]===undefined)this['initMessageCore']();return this[_0x1cbd3b(0x332)];},Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x47a)]=function(_0x2739e6,_0x240e39){const _0x2e2342=_0x38b2d5;if(this[_0x2e2342(0x332)]===undefined)this[_0x2e2342(0x174)]();if(!_0x2739e6)return;if(DataManager['isItem'](_0x2739e6))this['_lastGainedItemData']['type']=0x0;else{if(DataManager[_0x2e2342(0x210)](_0x2739e6))this[_0x2e2342(0x332)][_0x2e2342(0x263)]=0x1;else DataManager[_0x2e2342(0x44c)](_0x2739e6)&&(this['_lastGainedItemData'][_0x2e2342(0x263)]=0x2);}this[_0x2e2342(0x332)]['id']=_0x2739e6['id'],this[_0x2e2342(0x332)][_0x2e2342(0x48c)]=_0x240e39;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x49b)]=Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x19f)],Game_Party[_0x38b2d5(0x187)][_0x38b2d5(0x19f)]=function(_0x55e7a9,_0x4f5359,_0x4191b5){const _0x3ff03a=_0x38b2d5;VisuMZ[_0x3ff03a(0x2b7)][_0x3ff03a(0x49b)][_0x3ff03a(0x312)](this,_0x55e7a9,_0x4f5359,_0x4191b5);if(_0x4f5359>0x0){if(_0x3ff03a(0x44f)!==_0x3ff03a(0x44f)){const _0x557dfc=-(_0xc320db[_0x3ff03a(0x484)](_0x2f9c74[_0x3ff03a(0x13f)]-_0x5a7861[_0x3ff03a(0x465)])/0x2),_0x13157c=_0x557dfc+_0x32281d[_0x3ff03a(0x13f)]-this[_0x3ff03a(0x13f)],_0x49bdc3=-(_0x1a1a54[_0x3ff03a(0x484)](_0x318c93[_0x3ff03a(0x42b)]-_0x42b922['boxHeight'])/0x2),_0x5711b8=_0x49bdc3+_0x2dc239[_0x3ff03a(0x42b)]-this[_0x3ff03a(0x42b)];this['x']=this['x']['clamp'](_0x557dfc,_0x13157c),this['y']=this['y'][_0x3ff03a(0x26a)](_0x49bdc3,_0x5711b8);}else this['setLastGainedItemData'](_0x55e7a9,_0x4f5359);}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x104)]=Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x12d)],Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x12d)]=function(){const _0x5d1c2b=_0x38b2d5;VisuMZ['MessageCore'][_0x5d1c2b(0x104)][_0x5d1c2b(0x312)](this),this[_0x5d1c2b(0x3b6)]=[];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3d6)]=Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x498)],Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x498)]=function(){const _0x3ae236=_0x38b2d5;VisuMZ[_0x3ae236(0x2b7)][_0x3ae236(0x3d6)][_0x3ae236(0x312)](this),this[_0x3ae236(0x3b6)]=[];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x2bb)]=Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x41e)],Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x41e)]=function(){const _0x1d3ab0=_0x38b2d5;VisuMZ[_0x1d3ab0(0x2b7)][_0x1d3ab0(0x2bb)]['call'](this),this['updateMessageCommonEvents']();},Game_Map['prototype']['addMessageCommonEvent']=function(_0x3c0709){const _0x597150=_0x38b2d5;if(!$dataCommonEvents[_0x3c0709])return;this[_0x597150(0x3b6)]=this[_0x597150(0x3b6)]||[];const _0x1304e2=this[_0x597150(0x38c)][_0x597150(0x277)],_0x1f0cb7=new Game_MessageCommonEvent(_0x3c0709,_0x1304e2);this['_messageCommonEvents'][_0x597150(0x3f7)](_0x1f0cb7);},Game_Map[_0x38b2d5(0x187)][_0x38b2d5(0x25b)]=function(){const _0x38f5e8=_0x38b2d5;this[_0x38f5e8(0x3b6)]=this[_0x38f5e8(0x3b6)]||[];for(const _0x5777ee of this[_0x38f5e8(0x3b6)]){!_0x5777ee[_0x38f5e8(0x38c)]?this[_0x38f5e8(0x3b6)]['remove'](_0x5777ee):_0x5777ee[_0x38f5e8(0x341)]();}},VisuMZ[_0x38b2d5(0x2b7)]['Game_Map_refresh']=Game_Map[_0x38b2d5(0x187)]['refresh'],Game_Map['prototype']['refresh']=function(){const _0x121db1=_0x38b2d5;VisuMZ['MessageCore'][_0x121db1(0x4a6)][_0x121db1(0x312)](this),$gameScreen['requestPictureTextRefreshAll']();},Game_Interpreter[_0x38b2d5(0x4a2)]=pluginData[_0x38b2d5(0x269)],Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x1f2)]=function(_0x402dfb){const _0x30b80b=_0x38b2d5;if($gameMessage['isBusy']())return![];return this['prepareShowTextCommand'](_0x402dfb),this['addContinuousShowTextCommands'](_0x402dfb),this[_0x30b80b(0x3c5)](_0x402dfb),this[_0x30b80b(0x2fa)](_0x30b80b(0x88)),!![];},Game_Interpreter[_0x38b2d5(0x187)]['prepareShowTextCommand']=function(_0x2ee3fd){const _0x278259=_0x38b2d5;$gameMessage[_0x278259(0x338)](_0x2ee3fd[0x0],_0x2ee3fd[0x1]),$gameMessage[_0x278259(0x29c)](_0x2ee3fd[0x2]),$gameMessage['setPositionType'](_0x2ee3fd[0x3]),$gameMessage['setSpeakerName'](_0x2ee3fd[0x4]);},Game_Interpreter[_0x38b2d5(0x187)]['addContinuousShowTextCommands']=function(_0x584451){const _0xec8277=_0x38b2d5;while(this[_0xec8277(0x1fc)]()){this[_0xec8277(0x303)]++;if(this[_0xec8277(0x109)]()['code']===0x191){let _0x9a91f8=this[_0xec8277(0x109)]()[_0xec8277(0x3e4)][0x0];_0x9a91f8=VisuMZ['MessageCore'][_0xec8277(0x177)](_0x9a91f8),$gameMessage[_0xec8277(0x287)](_0x9a91f8);}if(this[_0xec8277(0x1b3)]()){if('ArMCZ'===_0xec8277(0x1ed))break;else _0x5bf619=!![];}}},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x1fc)]=function(){const _0x2673d2=_0x38b2d5;if(this[_0x2673d2(0x36e)]()===0x65&&$gameSystem[_0x2673d2(0x120)]()>0x4){if(_0x2673d2(0x368)===_0x2673d2(0x368))return!![];else{const _0x56245f=[_0x2673d2(0x398),_0x2673d2(0x3be),_0x2673d2(0xac),'fontItalic',_0x2673d2(0x307),_0x2673d2(0x243),_0x2673d2(0x2d3),_0x2673d2(0x18d)];let _0x230423={};for(const _0x5c9fd6 of _0x56245f){_0x230423[_0x5c9fd6]=this[_0x2673d2(0x48f)][_0x5c9fd6];}return _0x230423;}}else return this[_0x2673d2(0x36e)]()===0x191;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x177)]=function(_0x428a2b){const _0x485139=_0x38b2d5,_0x30ff84=VisuMZ[_0x485139(0x2b7)][_0x485139(0x2a5)][_0x485139(0x169)];return _0x428a2b=(_0x30ff84[_0x485139(0x2a2)]||'')+_0x428a2b+(_0x30ff84[_0x485139(0x2b3)]||''),_0x428a2b=_0x428a2b[_0x485139(0x18f)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x428a2b=_0x428a2b[_0x485139(0x18f)](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x8d6639,_0x3f0406)=>this['getRandomTextFromPool'](_0x3f0406)),_0x428a2b;},VisuMZ[_0x38b2d5(0x2b7)]['getRandomTextFromPool']=function(_0x5d01c9){const _0x3bbaf1=_0x38b2d5,_0x4f86c8=_0x5d01c9[_0x3bbaf1(0x2b4)]('|')[_0x3bbaf1(0x34e)](_0x526650=>_0x526650[_0x3bbaf1(0x2bc)]())[_0x3bbaf1(0x1fa)]('')[_0x3bbaf1(0x1fa)](null);return _0x4f86c8[Math[_0x3bbaf1(0x382)](_0x4f86c8[_0x3bbaf1(0x8b)])];},Game_Interpreter['prototype'][_0x38b2d5(0x1b3)]=function(){const _0x39fd18=_0x38b2d5;if(this[_0x39fd18(0x109)]()&&this['currentCommand']()[_0x39fd18(0x3e4)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage['_texts'][_0x39fd18(0x8b)]>=$gameSystem['getMessageWindowRows']()&&this[_0x39fd18(0x36e)]()!==0x191;},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x3c5)]=function(_0x5d11dd){const _0x419cfe=_0x38b2d5;switch(this['nextEventCode']()){case 0x66:this[_0x419cfe(0x303)]++,this[_0x419cfe(0x440)](this[_0x419cfe(0x109)]()[_0x419cfe(0x3e4)]);break;case 0x67:this[_0x419cfe(0x303)]++,this[_0x419cfe(0x40e)](this['currentCommand']()[_0x419cfe(0x3e4)]);break;case 0x68:this[_0x419cfe(0x303)]++,this['setupItemChoice'](this[_0x419cfe(0x109)]()['parameters']);break;case 0x165:const _0x4e6181=this['_list'][this[_0x419cfe(0x303)]+0x1],_0x3c10c9=_0x4e6181['parameters'];_0x3c10c9[0x0]===Game_Interpreter[_0x419cfe(0x4a2)]&&this[_0x419cfe(0x1a8)](_0x3c10c9);break;}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x213)]=Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x440)],Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x440)]=function(_0x1e528e){const _0x2965f6=_0x38b2d5;_0x1e528e=this[_0x2965f6(0x22d)](),VisuMZ[_0x2965f6(0x2b7)]['Game_Interpreter_setupChoices'][_0x2965f6(0x312)](this,_0x1e528e),$gameMessage[_0x2965f6(0x40c)]();},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x22d)]=function(){const _0x23c0ce=_0x38b2d5,_0x33fc18=this[_0x23c0ce(0x303)],_0x155233=[];let _0x1c25ba=0x0;this[_0x23c0ce(0x303)]++;while(this[_0x23c0ce(0x303)]<this[_0x23c0ce(0x20a)][_0x23c0ce(0x8b)]){if(_0x23c0ce(0x344)===_0x23c0ce(0x344)){if(this[_0x23c0ce(0x109)]()[_0x23c0ce(0xf5)]===this[_0x23c0ce(0x350)]){if('FquoD'===_0x23c0ce(0x2cd)){if(this['currentCommand']()['code']===0x194&&this[_0x23c0ce(0x36e)]()!==0x66){if(_0x23c0ce(0x1b0)===_0x23c0ce(0x25a))_0x29812f[_0x23c0ce(0x2b7)]['Scene_Message_createChoiceListWindow'][_0x23c0ce(0x312)](this),this['createChoiceListHelpWindow']();else break;}else{if(this[_0x23c0ce(0x109)]()['code']===0x66)'ILDqP'!==_0x23c0ce(0x21c)?(this['adjustShowChoiceExtension'](_0x1c25ba,this[_0x23c0ce(0x109)](),_0x33fc18),this[_0x23c0ce(0x303)]-=0x2):this[_0x23c0ce(0x196)](_0x3a71e8);else{if(this[_0x23c0ce(0x109)]()[_0x23c0ce(0x379)]===0x192){if(_0x23c0ce(0x331)===_0x23c0ce(0x200)){let _0x4cfe75=this[_0x23c0ce(0x33d)]['indexOf'](_0x3c5fe3);this[_0x23c0ce(0xde)](_0x4cfe75);}else this[_0x23c0ce(0x109)]()[_0x23c0ce(0x3e4)][0x0]=_0x1c25ba,_0x1c25ba++;}}}}else this[_0x23c0ce(0x38c)]=null;}this[_0x23c0ce(0x303)]++;}else return _0x1cb278=_0x3ecfaf[_0x23c0ce(0x18f)](/<LEFT>/gi,_0x23c0ce(0x2b9)),_0x35a5d6=_0x3e8815[_0x23c0ce(0x18f)](/<\/LEFT>/gi,_0x23c0ce(0x25e)),_0x4172a1=_0x125240['replace'](/<CENTER>/gi,_0x23c0ce(0x10b)),_0x185265=_0x508452['replace'](/<\/CENTER>/gi,_0x23c0ce(0x25e)),_0x4ebf4f=_0x217a0d['replace'](/<RIGHT>/gi,_0x23c0ce(0x434)),_0x2c52e6=_0x25297a[_0x23c0ce(0x18f)](/<\/RIGHT>/gi,_0x23c0ce(0x25e)),_0x579e27;}return this[_0x23c0ce(0x303)]=_0x33fc18,this['currentCommand']()[_0x23c0ce(0x3e4)];},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x29d)]=function(_0x4e0e9f,_0x244f9e,_0x2f2cd0){const _0x2beac7=_0x38b2d5;this[_0x2beac7(0x112)](_0x4e0e9f,_0x244f9e,_0x2f2cd0),this[_0x2beac7(0x3af)](_0x4e0e9f,_0x244f9e,_0x2f2cd0),this[_0x2beac7(0x3d3)](_0x244f9e,_0x2f2cd0);},Game_Interpreter['prototype'][_0x38b2d5(0x112)]=function(_0x5d54db,_0x3b5742,_0x38db7a){const _0x201b4c=_0x38b2d5;if(_0x3b5742['parameters'][0x2]<0x0)return;const _0x1fa57f=_0x3b5742[_0x201b4c(0x3e4)][0x2]+_0x5d54db;this[_0x201b4c(0x20a)][_0x38db7a][_0x201b4c(0x3e4)][0x2]=_0x1fa57f;},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x3af)]=function(_0x587d2c,_0x14bdae,_0x2bf42e){const _0x14e084=_0x38b2d5;if(_0x14bdae['parameters'][0x1]>=0x0){var _0x2a24fa=_0x14bdae[_0x14e084(0x3e4)][0x1]+_0x587d2c;this[_0x14e084(0x20a)][_0x2bf42e]['parameters'][0x1]=_0x2a24fa;}else _0x14bdae[_0x14e084(0x3e4)][0x1]===-0x2&&(this[_0x14e084(0x20a)][_0x2bf42e][_0x14e084(0x3e4)][0x1]=_0x14bdae['parameters'][0x1]);},Game_Interpreter['prototype'][_0x38b2d5(0x3d3)]=function(_0x476cb0,_0x5c68f0){const _0x4849c1=_0x38b2d5;for(const _0x5c4af4 of _0x476cb0[_0x4849c1(0x3e4)][0x0]){this[_0x4849c1(0x20a)][_0x5c68f0][_0x4849c1(0x3e4)][0x0][_0x4849c1(0x3f7)](_0x5c4af4);}this[_0x4849c1(0x20a)][_0x4849c1(0x1df)](this[_0x4849c1(0x303)]-0x1,0x2);},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x1a8)]=function(_0x24f846){const _0x3fdafb=_0x38b2d5,_0x1d18df=_0x24f846[0x1];if(_0x1d18df===_0x3fdafb(0x3d8)){if('BSRxD'!==_0x3fdafb(0xb1))this[_0x3fdafb(0x303)]++,this[_0x3fdafb(0x71)](_0x24f846);else{if(!_0x18a36b[_0x3fdafb(0x26d)]())return'';let _0x25e76c=null;return _0x25e76c=_0x11a96f[_0x3fdafb(0x4a1)],!_0x25e76c&&_0x20c6c1['isInputting']()&&(_0x25e76c=_0xb51965[_0x3fdafb(0x2dd)]()),_0x25e76c?_0x25e76c['name']():'';}}else{if(_0x1d18df==='SelectArmor')this['_index']++,this[_0x3fdafb(0x1e9)](_0x24f846);else _0x1d18df===_0x3fdafb(0x3d1)&&Imported[_0x3fdafb(0x40f)]&&(_0x3fdafb(0x43b)!=='ezCAx'?(this[_0x3fdafb(0x303)]++,this[_0x3fdafb(0xc3)](_0x24f846)):this[_0x3fdafb(0x481)]());}},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x71)]=function(_0x7c247a){const _0x32b178=_0x38b2d5,_0xfe0f04=JSON[_0x32b178(0x97)](JSON[_0x32b178(0x1fd)](_0x7c247a[0x3]));VisuMZ[_0x32b178(0x385)](_0xfe0f04,_0xfe0f04),$gameMessage[_0x32b178(0x71)](_0xfe0f04['VariableID']||0x0,_0xfe0f04[_0x32b178(0x411)]||0x0);},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0x1e9)]=function(_0x392ce1){const _0x17d913=_0x38b2d5,_0x2779c0=JSON[_0x17d913(0x97)](JSON[_0x17d913(0x1fd)](_0x392ce1[0x3]));VisuMZ[_0x17d913(0x385)](_0x2779c0,_0x2779c0),$gameMessage[_0x17d913(0x1e9)](_0x2779c0[_0x17d913(0x202)]||0x0,_0x2779c0[_0x17d913(0x2e7)]||0x0,_0x2779c0[_0x17d913(0x1bf)]||0x0);},Game_Interpreter[_0x38b2d5(0x187)][_0x38b2d5(0xc3)]=function(_0x47d0f8){const _0x550ce2=_0x38b2d5,_0x198c50=JSON[_0x550ce2(0x97)](JSON[_0x550ce2(0x1fd)](_0x47d0f8[0x3]));VisuMZ[_0x550ce2(0x385)](_0x198c50,_0x198c50),$gameMessage[_0x550ce2(0xc3)](_0x198c50[_0x550ce2(0x202)]||0x0,_0x198c50[_0x550ce2(0x2c9)]||0x0,_0x198c50[_0x550ce2(0x13a)]||0x0);};function Game_MessageCommonEvent(){const _0x513b35=_0x38b2d5;this[_0x513b35(0x12d)](...arguments);}Game_MessageCommonEvent[_0x38b2d5(0x187)]['initialize']=function(_0x42a73e,_0x5be9e9){const _0x2ac13a=_0x38b2d5;this[_0x2ac13a(0x330)]=_0x42a73e,this[_0x2ac13a(0x277)]=_0x5be9e9||0x0,this[_0x2ac13a(0x137)]();},Game_MessageCommonEvent[_0x38b2d5(0x187)]['event']=function(){const _0x1f7436=_0x38b2d5;return $dataCommonEvents[this[_0x1f7436(0x330)]];},Game_MessageCommonEvent[_0x38b2d5(0x187)][_0x38b2d5(0x20f)]=function(){const _0x48859c=_0x38b2d5;return this[_0x48859c(0x414)]()[_0x48859c(0x20f)];},Game_MessageCommonEvent['prototype']['refresh']=function(){const _0x57c420=_0x38b2d5;this[_0x57c420(0x38c)]=new Game_Interpreter(),this[_0x57c420(0x38c)][_0x57c420(0x36a)](this[_0x57c420(0x20f)](),this[_0x57c420(0x277)]);},Game_MessageCommonEvent[_0x38b2d5(0x187)][_0x38b2d5(0x341)]=function(){const _0x504c3f=_0x38b2d5;this[_0x504c3f(0x38c)]&&(this['_interpreter'][_0x504c3f(0x9f)]()?this['_interpreter']['update']():'KdqAF'===_0x504c3f(0xa7)?_0x534217['y']+=_0x55372b[_0x504c3f(0x34a)]:this[_0x504c3f(0xe6)]());},Game_MessageCommonEvent[_0x38b2d5(0x187)][_0x38b2d5(0xe6)]=function(){const _0x442cec=_0x38b2d5;this[_0x442cec(0x38c)]=null;},Scene_Message[_0x38b2d5(0x187)][_0x38b2d5(0xee)]=function(){const _0x2c4311=_0x38b2d5,_0x141aa2=Math[_0x2c4311(0x369)](Graphics[_0x2c4311(0x13f)],$gameSystem[_0x2c4311(0x107)]()),_0x5a5a8b=$gameSystem[_0x2c4311(0x120)](),_0x4ab061=this[_0x2c4311(0x179)](_0x5a5a8b,![]),_0x4ebe67=(Graphics['boxWidth']-_0x141aa2)/0x2,_0x111905=0x0;return new Rectangle(_0x4ebe67,_0x111905,_0x141aa2,_0x4ab061);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x111)]=Scene_Message[_0x38b2d5(0x187)][_0x38b2d5(0x383)],Scene_Message[_0x38b2d5(0x187)][_0x38b2d5(0x383)]=function(){const _0x55a3e6=_0x38b2d5;VisuMZ[_0x55a3e6(0x2b7)][_0x55a3e6(0x111)][_0x55a3e6(0x312)](this),this[_0x55a3e6(0x31b)]();},Scene_Message[_0x38b2d5(0x187)][_0x38b2d5(0x31b)]=function(){const _0x5f5867=_0x38b2d5,_0x3612ef=this[_0x5f5867(0x2ea)](),_0x1b4a1e=new Window_Help(_0x3612ef);_0x1b4a1e['hide'](),this[_0x5f5867(0xa1)]['setHelpWindow'](_0x1b4a1e),this[_0x5f5867(0x33f)][_0x5f5867(0x30d)](_0x1b4a1e),this['addWindow'](_0x1b4a1e),this[_0x5f5867(0x472)]=_0x1b4a1e;},Scene_Message['prototype'][_0x38b2d5(0x2ea)]=function(){const _0x9a41ea=_0x38b2d5,_0x2d6972=0x0,_0x35c666=0x0,_0x427ed4=Graphics[_0x9a41ea(0x465)],_0x440c2c=this[_0x9a41ea(0x179)](0x2,![]);return new Rectangle(_0x2d6972,_0x35c666,_0x427ed4,_0x440c2c);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x30d)]=function(_0x144cd6){const _0x481e4f=_0x38b2d5;this[_0x481e4f(0x472)]=_0x144cd6;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1e2)]=function(){const _0x2d9251=_0x38b2d5;if(!this[_0x2d9251(0x472)])return;const _0x34b4fc=this[_0x2d9251(0x472)];_0x34b4fc&&(_0x34b4fc['y']=this['y']>0x0?0x0:Graphics[_0x2d9251(0x413)]-_0x34b4fc[_0x2d9251(0x42b)]);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3f8)]=Scene_Options[_0x38b2d5(0x187)][_0x38b2d5(0x2b0)],Scene_Options['prototype'][_0x38b2d5(0x2b0)]=function(){const _0x3d4deb=_0x38b2d5;let _0x14bbc4=VisuMZ[_0x3d4deb(0x2b7)][_0x3d4deb(0x3f8)][_0x3d4deb(0x312)](this);const _0xe10f0=VisuMZ[_0x3d4deb(0x2b7)][_0x3d4deb(0x2a5)];if(_0xe10f0[_0x3d4deb(0x28c)][_0x3d4deb(0x2df)]){_0xe10f0[_0x3d4deb(0xd7)]['AddOption']&&TextManager[_0x3d4deb(0x164)]()&&_0x14bbc4++;if(_0xe10f0['TextSpeed'][_0x3d4deb(0x494)])_0x14bbc4++;}return _0x14bbc4;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x471)]=Sprite_Picture[_0x38b2d5(0x187)]['updateBitmap'],Sprite_Picture['prototype'][_0x38b2d5(0x46f)]=function(){const _0x214d42=_0x38b2d5;VisuMZ[_0x214d42(0x2b7)][_0x214d42(0x471)][_0x214d42(0x312)](this),this[_0x214d42(0x2f2)]();},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x37c)]=Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x341)],Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x341)]=function(){VisuMZ['MessageCore']['Sprite_Picture_update']['call'](this),this['updatePictureText']();},Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x3bc)]=function(){const _0x3274b6=_0x38b2d5;if(!this[_0x3274b6(0x161)])return;this[_0x3274b6(0x241)](),this[_0x3274b6(0x273)](),this[_0x3274b6(0x2f1)](),this['attachPictureText']();},Sprite_Picture['prototype'][_0x38b2d5(0x2f2)]=function(){const _0x57e33f=_0x38b2d5;if(this[_0x57e33f(0x321)])return;if(this['_pictureTextSprite'])return;const _0x422951=new Rectangle(0x0,0x0,0x0,0x0);this[_0x57e33f(0x321)]=new Window_Base(_0x422951),this['_pictureTextWindow']['padding']=0x0,this[_0x57e33f(0x150)]=new Sprite(),this[_0x57e33f(0x479)](this[_0x57e33f(0x150)],0x0),this[_0x57e33f(0x3ea)]=0x0,this[_0x57e33f(0x238)]=0x0,this[_0x57e33f(0x258)]={};},Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x241)]=function(){const _0x4f0cd9=_0x38b2d5;if(!this[_0x4f0cd9(0x321)])return;if(this[_0x4f0cd9(0x3ea)]===this['width']&&this[_0x4f0cd9(0x238)]===this[_0x4f0cd9(0x42b)])return;this[_0x4f0cd9(0x3ea)]=this[_0x4f0cd9(0x13f)],this[_0x4f0cd9(0x238)]=this['height'],this[_0x4f0cd9(0x258)]={},this[_0x4f0cd9(0x321)]['move'](0x0,0x0,this[_0x4f0cd9(0x13f)],this['height']);},Sprite_Picture['prototype'][_0x38b2d5(0x273)]=function(){const _0x38c000=_0x38b2d5;if(!this[_0x38c000(0x150)])return;this[_0x38c000(0x150)]['anchor']['x']=this['anchor']['x'],this[_0x38c000(0x150)][_0x38c000(0x37d)]['y']=this['anchor']['y'];},Sprite_Picture[_0x38b2d5(0x187)]['drawPictureText']=function(){const _0x12fd19=_0x38b2d5;if(!this[_0x12fd19(0x321)])return;if(!this['anyPictureTextChanges']())return;const _0x16a8d4=[_0x12fd19(0x1e3),'up','upperright',_0x12fd19(0x431),_0x12fd19(0x45a),'right',_0x12fd19(0x3b1),_0x12fd19(0x12c),'lowerright'];this['_pictureTextWindow'][_0x12fd19(0x305)]();for(const _0x3a85d0 of _0x16a8d4){'OsLUS'!=='OsLUS'?(_0x466cf3=_0x176bb5[_0x12fd19(0xef)]()[_0x12fd19(0x2bc)](),this[_0x12fd19(0x141)](_0x513213)[_0x2319d6]=_0x1986f3||'',this['requestPictureTextRefresh'](_0x191f7e,!![])):this[_0x12fd19(0x292)](_0x3a85d0);}},Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x1a7)]=function(){const _0x25c1a1=_0x38b2d5;if($gameScreen['needsPictureTextRefresh'](this[_0x25c1a1(0x409)]))return!![];const _0x42b53d=[_0x25c1a1(0x1e3),'up','upperright',_0x25c1a1(0x431),'center',_0x25c1a1(0x3e0),_0x25c1a1(0x3b1),'down',_0x25c1a1(0x356)];for(const _0x2d8fc7 of _0x42b53d){const _0x1ab629=$gameScreen[_0x25c1a1(0x234)](this['_pictureId'],_0x2d8fc7);if(this[_0x25c1a1(0x258)][_0x2d8fc7]===_0x1ab629)continue;return!![];}return![];},Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x292)]=function(_0x297ca3){const _0x2a67e9=_0x38b2d5;$gameScreen[_0x2a67e9(0x16b)](this[_0x2a67e9(0x409)]);const _0x9284b7=$gameScreen[_0x2a67e9(0x234)](this[_0x2a67e9(0x409)],_0x297ca3);this[_0x2a67e9(0x258)][_0x297ca3]=_0x9284b7;const _0xed61f5=this['_pictureTextWindow'][_0x2a67e9(0x429)](_0x9284b7);let _0x789bca=$gameScreen['getPictureTextBuffer'](this[_0x2a67e9(0x409)]),_0x34ec4e=_0x789bca,_0x2d51e8=_0x789bca;if(['up','center','down'][_0x2a67e9(0x480)](_0x297ca3))_0x34ec4e=Math['floor']((this['width']-_0xed61f5[_0x2a67e9(0x13f)])/0x2);else[_0x2a67e9(0x39d),'right','lowerright'][_0x2a67e9(0x480)](_0x297ca3)&&(_0x34ec4e=Math[_0x2a67e9(0x484)](this[_0x2a67e9(0x13f)]-_0xed61f5['width']-_0x789bca));if([_0x2a67e9(0x431),'center',_0x2a67e9(0x3e0)][_0x2a67e9(0x480)](_0x297ca3))_0x2d51e8=Math['floor']((this[_0x2a67e9(0x42b)]-_0xed61f5[_0x2a67e9(0x42b)])/0x2);else[_0x2a67e9(0x3b1),'down','lowerright']['includes'](_0x297ca3)&&(_0x2d51e8=Math[_0x2a67e9(0x484)](this['height']-_0xed61f5[_0x2a67e9(0x42b)]-_0x789bca));this[_0x2a67e9(0x321)][_0x2a67e9(0x19b)](_0x9284b7,_0x34ec4e,_0x2d51e8);},Sprite_Picture[_0x38b2d5(0x187)][_0x38b2d5(0x2fe)]=function(){const _0x409e65=_0x38b2d5;if(!this[_0x409e65(0x321)])return;if(!this[_0x409e65(0x150)])return;this[_0x409e65(0x150)][_0x409e65(0x230)]=this[_0x409e65(0x321)][_0x409e65(0x48f)];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x38f)]=Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x12d)],Window_Base[_0x38b2d5(0x187)]['initialize']=function(_0x37707c){const _0x4d35bc=_0x38b2d5;this['initMessageCore'](_0x37707c),VisuMZ[_0x4d35bc(0x2b7)][_0x4d35bc(0x38f)][_0x4d35bc(0x312)](this,_0x37707c);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x174)]=function(_0x1c5455){const _0x4c6c1c=_0x38b2d5;this['initTextAlignement'](),this['resetWordWrap'](),this[_0x4c6c1c(0xa2)](_0x1c5455);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xeb)]=function(){const _0x7e569=_0x38b2d5;this[_0x7e569(0x342)]('default');},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x342)]=function(_0x2c3ee5){const _0x3a1c65=_0x38b2d5;this[_0x3a1c65(0x9b)]=_0x2c3ee5;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x1d6)]=function(){const _0x507b24=_0x38b2d5;return this[_0x507b24(0x9b)];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x95)]=Window_Base['prototype']['textSizeEx'],Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x429)]=function(_0xb016ea){const _0x48c532=_0x38b2d5;return this['resetWordWrap'](),VisuMZ[_0x48c532(0x2b7)][_0x48c532(0x95)][_0x48c532(0x312)](this,_0xb016ea);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x25f)]=function(_0x49e1b6){const _0x56be5a=_0x38b2d5;return VisuMZ[_0x56be5a(0x2b7)][_0x56be5a(0x95)][_0x56be5a(0x312)](this,_0x49e1b6);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x152)]=Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x12b)],Window_Base['prototype'][_0x38b2d5(0x12b)]=function(_0x560aba){const _0x2a7a15=_0x38b2d5;VisuMZ[_0x2a7a15(0x2b7)][_0x2a7a15(0x152)][_0x2a7a15(0x312)](this,_0x560aba);if(_0x560aba['drawing'])this[_0x2a7a15(0x342)]('default');},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x3eb)]=function(){const _0x22085b=_0x38b2d5;this[_0x22085b(0x13b)](![]);},Window_Base[_0x38b2d5(0x187)]['isWordWrapEnabled']=function(){const _0x2c32ac=_0x38b2d5;return this[_0x2c32ac(0x447)];},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x13b)]=function(_0xb32e0f){const _0x163175=_0x38b2d5;return this[_0x163175(0x447)]=_0xb32e0f,'';},Window_Base['prototype'][_0x38b2d5(0xa2)]=function(_0x2d195c){const _0x424730=_0x38b2d5;this['_resetRect']=JsonEx[_0x424730(0x403)](_0x2d195c);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x33b)]=function(){const _0x5cb0b7=_0x38b2d5;this[_0x5cb0b7(0x48f)][_0x5cb0b7(0x398)]=$gameSystem[_0x5cb0b7(0x319)](),this[_0x5cb0b7(0x48f)][_0x5cb0b7(0x3be)]=$gameSystem[_0x5cb0b7(0x3ce)](),this[_0x5cb0b7(0x48f)]['fontBold']=![],this[_0x5cb0b7(0x48f)][_0x5cb0b7(0x439)]=![],this[_0x5cb0b7(0x199)]();},Window_Base[_0x38b2d5(0x187)]['resetTextColor']=function(){const _0x25acae=_0x38b2d5;this[_0x25acae(0x3a8)](ColorManager['normalColor']()),this[_0x25acae(0x197)](ColorManager['outlineColor']());const _0x1a280b=VisuMZ['MessageCore'][_0x25acae(0x2a5)]['General'];_0x1a280b[_0x25acae(0x20e)]===undefined&&(_0x1a280b[_0x25acae(0x20e)]=0x3),this[_0x25acae(0x48f)]['outlineWidth']=_0x1a280b[_0x25acae(0x20e)],this[_0x25acae(0x211)](![]);},Window_Base['prototype'][_0x38b2d5(0x211)]=function(_0x231f85){const _0x5023f3=_0x38b2d5;this[_0x5023f3(0x372)]=_0x231f85;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x3ca)]=function(){const _0x9bca32=_0x38b2d5;return this[_0x9bca32(0x372)];},Window_Base[_0x38b2d5(0x187)]['isAutoColorAffected']=function(){return![];},Window_Base['prototype']['getPreservedFontSettings']=function(){const _0x13d76d=_0x38b2d5,_0x525929=[_0x13d76d(0x398),'fontSize',_0x13d76d(0xac),_0x13d76d(0x439),'textColor','outLineColor',_0x13d76d(0x2d3),'paintOpacity'];let _0x499e0f={};for(const _0x1a19a4 of _0x525929){_0x499e0f[_0x1a19a4]=this['contents'][_0x1a19a4];}return _0x499e0f;},Window_Base['prototype']['returnPreservedFontSettings']=function(_0x53038f){for(const _0x3100b0 in _0x53038f){this['contents'][_0x3100b0]=_0x53038f[_0x3100b0];}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x469)]=Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x341)],Window_Base[_0x38b2d5(0x187)]['update']=function(){const _0x3cfbbf=_0x38b2d5;VisuMZ[_0x3cfbbf(0x2b7)][_0x3cfbbf(0x469)]['call'](this),this['updateMove']();},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x3bd)]=function(){return![];},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xae)]=function(){const _0x1f4e45=_0x38b2d5;this[_0x1f4e45(0x275)]>0x0&&(this[_0x1f4e45(0x3bd)]()&&(_0x1f4e45(0x363)===_0x1f4e45(0x363)?(this['x']=this[_0x1f4e45(0x45d)](this['x'],this['_moveTargetX']),this['y']=this[_0x1f4e45(0x45d)](this['y'],this[_0x1f4e45(0x3f4)]),this[_0x1f4e45(0x13f)]=this[_0x1f4e45(0x45d)](this[_0x1f4e45(0x13f)],this[_0x1f4e45(0x1c0)]),this['height']=this[_0x1f4e45(0x45d)](this[_0x1f4e45(0x42b)],this[_0x1f4e45(0x87)]),this['clampPlacementPosition']()):(this[_0x1f4e45(0x48f)][_0x1f4e45(0x398)]=_0xca2547[_0x1f4e45(0x319)](),this[_0x1f4e45(0x48f)][_0x1f4e45(0x3be)]=_0x5946e6[_0x1f4e45(0x3ce)](),this[_0x1f4e45(0x48f)][_0x1f4e45(0xac)]=![],this[_0x1f4e45(0x48f)][_0x1f4e45(0x439)]=![],this[_0x1f4e45(0x199)]())),this[_0x1f4e45(0x275)]--);},Window_Base[_0x38b2d5(0x187)]['clampPlacementPosition']=function(_0x528871,_0x49d5a2){const _0x3fbe37=_0x38b2d5;!_0x528871&&(this['width']=Math[_0x3fbe37(0x369)](this[_0x3fbe37(0x13f)],Graphics[_0x3fbe37(0x13f)]),this[_0x3fbe37(0x42b)]=Math['min'](this[_0x3fbe37(0x42b)],Graphics['height']));if(!_0x49d5a2){if(_0x3fbe37(0x2fb)===_0x3fbe37(0x2fb)){const _0x25ba14=-(Math[_0x3fbe37(0x484)](Graphics[_0x3fbe37(0x13f)]-Graphics[_0x3fbe37(0x465)])/0x2),_0x3dec1b=_0x25ba14+Graphics[_0x3fbe37(0x13f)]-this[_0x3fbe37(0x13f)],_0xe30787=-(Math[_0x3fbe37(0x484)](Graphics[_0x3fbe37(0x42b)]-Graphics[_0x3fbe37(0x413)])/0x2),_0x3bd161=_0xe30787+Graphics[_0x3fbe37(0x42b)]-this[_0x3fbe37(0x42b)];this['x']=this['x'][_0x3fbe37(0x26a)](_0x25ba14,_0x3dec1b),this['y']=this['y']['clamp'](_0xe30787,_0x3bd161);}else this[_0x3fbe37(0x292)](_0xd2381f);}},Window_Base[_0x38b2d5(0x187)]['applyMoveEasing']=function(_0x1fc3f7,_0x37bb73){const _0x291a6b=_0x38b2d5,_0x43290b=this[_0x291a6b(0x275)],_0xc64367=this[_0x291a6b(0x19d)],_0x2a9023=this[_0x291a6b(0x2d2)]((_0xc64367-_0x43290b)/_0xc64367),_0x118d50=this[_0x291a6b(0x2d2)]((_0xc64367-_0x43290b+0x1)/_0xc64367),_0x85e8b9=(_0x1fc3f7-_0x37bb73*_0x2a9023)/(0x1-_0x2a9023);return _0x85e8b9+(_0x37bb73-_0x85e8b9)*_0x118d50;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x2d2)]=function(_0x5baea8){const _0x109745=_0x38b2d5,_0x58770f=0x2;switch(this[_0x109745(0x2ae)]){case 0x0:return _0x5baea8;case 0x1:return this[_0x109745(0x2a0)](_0x5baea8,_0x58770f);case 0x2:return this[_0x109745(0xb0)](_0x5baea8,_0x58770f);case 0x3:return this[_0x109745(0x1a1)](_0x5baea8,_0x58770f);default:return Imported[_0x109745(0x239)]?VisuMZ[_0x109745(0x45d)](_0x5baea8,this[_0x109745(0x2ae)]):_0x5baea8;}},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x449)]=function(_0x16da60,_0x4fe35d,_0x13f070,_0x335f92,_0x2afe43,_0x127b1a){const _0x338f09=_0x38b2d5;this[_0x338f09(0x35f)]=_0x16da60,this[_0x338f09(0x3f4)]=_0x4fe35d,this[_0x338f09(0x1c0)]=_0x13f070||this[_0x338f09(0x13f)],this[_0x338f09(0x87)]=_0x335f92||this[_0x338f09(0x42b)],this[_0x338f09(0x275)]=_0x2afe43||0x1;if(this['_moveDuration']<=0x0)this[_0x338f09(0x275)]=0x1;this['_wholeMoveDuration']=this[_0x338f09(0x275)],this[_0x338f09(0x2ae)]=_0x127b1a||0x0;if(_0x2afe43<=0x0)this[_0x338f09(0xae)]();},Window_Base['prototype']['moveBy']=function(_0x2169cf,_0x4708f4,_0x8e5c06,_0x3144ae,_0x37d56b,_0xd5eba4){const _0x34254a=_0x38b2d5;this['_moveTargetX']=this['x']+_0x2169cf,this['_moveTargetY']=this['y']+_0x4708f4,this[_0x34254a(0x1c0)]=this[_0x34254a(0x13f)]+(_0x8e5c06||0x0),this[_0x34254a(0x87)]=this[_0x34254a(0x42b)]+(_0x3144ae||0x0),this[_0x34254a(0x275)]=_0x37d56b||0x1;if(this[_0x34254a(0x275)]<=0x0)this[_0x34254a(0x275)]=0x1;this[_0x34254a(0x19d)]=this[_0x34254a(0x275)],this[_0x34254a(0x2ae)]=_0xd5eba4||0x0;if(_0x37d56b<=0x0)this[_0x34254a(0xae)]();},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x23d)]=function(_0x54c9da,_0x271b61){const _0x169653=_0x38b2d5;this['moveTo'](this[_0x169653(0x272)]['x'],this['_resetRect']['y'],this[_0x169653(0x272)]['width'],this['_resetRect'][_0x169653(0x42b)],_0x54c9da,_0x271b61);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x2bd)]=Window_Base[_0x38b2d5(0x187)]['changeTextColor'],Window_Base['prototype']['changeTextColor']=function(_0x296e12){const _0x13acb2=_0x38b2d5;if(this[_0x13acb2(0x3ca)]())return;_0x296e12=_0x296e12['replace'](/\,/g,''),this['_textColorStack']=this['_textColorStack']||[],this[_0x13acb2(0xc5)]['unshift'](this[_0x13acb2(0x48f)][_0x13acb2(0x307)]),VisuMZ[_0x13acb2(0x2b7)][_0x13acb2(0x2bd)][_0x13acb2(0x312)](this,_0x296e12);},Window_Base['prototype'][_0x38b2d5(0x477)]=function(_0x3b96ec){const _0x5e4f8e=_0x38b2d5;this['obtainEscapeParam'](_0x3b96ec);if(this[_0x5e4f8e(0x3ca)]())return;_0x3b96ec[_0x5e4f8e(0x251)]&&(this[_0x5e4f8e(0xc5)]=this[_0x5e4f8e(0xc5)]||[],this[_0x5e4f8e(0x48f)]['textColor']=this[_0x5e4f8e(0xc5)][_0x5e4f8e(0x276)]()||ColorManager[_0x5e4f8e(0x139)]());},Window_Base[_0x38b2d5(0x187)]['convertEscapeCharacters']=function(_0xa09cc5){const _0x35b583=_0x38b2d5;return _0xa09cc5=this[_0x35b583(0x2d7)](_0xa09cc5),_0xa09cc5=this['convertBackslashCharacters'](_0xa09cc5),_0xa09cc5=this['convertVariableEscapeCharacters'](_0xa09cc5),_0xa09cc5=this['convertButtonAssistEscapeCharacters'](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x27b)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x361)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x93)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x23f)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x367)](_0xa09cc5),_0xa09cc5=this['convertBaseEscapeCharacters'](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x252)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x218)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x3ac)](_0xa09cc5),_0xa09cc5=this['postConvertEscapeCharacters'](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x35d)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x32f)](_0xa09cc5),_0xa09cc5=this[_0x35b583(0x23b)](_0xa09cc5),_0xa09cc5;},Window_Base[_0x38b2d5(0x187)]['convertTextMacros']=function(_0x23cd28){const _0x42de2a=_0x38b2d5;this[_0x42de2a(0x3c3)]=![];for(const _0x5eacb0 of VisuMZ[_0x42de2a(0x2b7)][_0x42de2a(0x2a5)][_0x42de2a(0x17e)]){_0x23cd28&&_0x23cd28['match'](_0x5eacb0[_0x42de2a(0x2a8)])&&(this[_0x42de2a(0x3c3)]=!![],_0x23cd28=_0x23cd28[_0x42de2a(0x18f)](_0x5eacb0[_0x42de2a(0x2a8)],_0x5eacb0['textCodeResult']['bind'](this)));}return _0x23cd28||'';},Window_Base[_0x38b2d5(0x187)]['convertBackslashCharacters']=function(_0x55f08b){return _0x55f08b=_0x55f08b['replace'](/\\/g,'\x1b'),_0x55f08b=_0x55f08b['replace'](/\x1b\x1b/g,'\x5c'),_0x55f08b;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x35d)]=function(_0x37e1db){const _0x348d17=_0x38b2d5;for(;;){if(_0x37e1db[_0x348d17(0x3b4)](/\\V\[(\d+)\]/gi))_0x37e1db=_0x37e1db['replace'](/\\V\[(\d+)\]/gi,(_0x516f9d,_0x12c49a)=>this[_0x348d17(0x325)](String($gameVariables[_0x348d17(0x499)](parseInt(_0x12c49a)))));else{if(_0x37e1db[_0x348d17(0x3b4)](/\x1bV\[(\d+)\]/gi))_0x37e1db=_0x37e1db['replace'](/\x1bV\[(\d+)\]/gi,(_0x2dc7c5,_0x574cd2)=>this[_0x348d17(0x325)](String($gameVariables[_0x348d17(0x499)](parseInt(_0x574cd2)))));else break;}}return _0x37e1db;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x22e)]=function(_0x6273e7){const _0x32ca35=_0x38b2d5;return Imported[_0x32ca35(0x239)]&&(_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<Up (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)]('up')),_0x6273e7=_0x6273e7['replace'](/<Left (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x431))),_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<Right (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x3e0))),_0x6273e7=_0x6273e7['replace'](/<Down (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x12c))),_0x6273e7=_0x6273e7['replace'](/<Ok (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)]('ok')),_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x32ca35(0x136))),_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x143))),_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<Shift (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x32ca35(0x276))),_0x6273e7=_0x6273e7['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x3f6))),_0x6273e7=_0x6273e7[_0x32ca35(0x18f)](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x32ca35(0x222)](_0x32ca35(0x31a)))),_0x6273e7;},Window_Base[_0x38b2d5(0x187)]['convertButtonAssistText']=function(_0x7278c8){const _0x24fbfb=_0x38b2d5;let _0x10d845=TextManager[_0x24fbfb(0x39f)](_0x7278c8)||'';return _0x10d845=this['convertBackslashCharacters'](_0x10d845),_0x10d845=this['convertVariableEscapeCharacters'](_0x10d845),_0x10d845[_0x24fbfb(0x2bc)]();},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x27b)]=function(_0x23d323){const _0x4a7ae8=_0x38b2d5;return _0x23d323=this[_0x4a7ae8(0xa3)](_0x23d323),this[_0x4a7ae8(0x47d)](),_0x23d323;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xa3)]=function(_0x5c20e4){const _0x512a8b=_0x38b2d5;return _0x5c20e4=TextManager[_0x512a8b(0x455)](_0x5c20e4),_0x5c20e4;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3f3)]=String[_0x38b2d5(0x187)][_0x38b2d5(0xd8)],String[_0x38b2d5(0x187)][_0x38b2d5(0xd8)]=function(){const _0x20e221=_0x38b2d5;let _0x1d9f2c=this;return _0x1d9f2c=TextManager[_0x20e221(0x455)](_0x1d9f2c),VisuMZ['MessageCore'][_0x20e221(0x3f3)]['apply'](_0x1d9f2c,arguments);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x2f5)]=Bitmap[_0x38b2d5(0x187)][_0x38b2d5(0x274)],Bitmap[_0x38b2d5(0x187)]['drawText']=function(_0x3a20c2,_0x54c039,_0x26a64f,_0xf3b177,_0xb34347,_0x43d6f9){const _0x43afb=_0x38b2d5;_0x3a20c2=TextManager['parseLocalizedText'](_0x3a20c2),VisuMZ[_0x43afb(0x2b7)]['Bitmap_drawText']['call'](this,_0x3a20c2,_0x54c039,_0x26a64f,_0xf3b177,_0xb34347,_0x43d6f9);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x3ae)]=Bitmap[_0x38b2d5(0x187)][_0x38b2d5(0x224)],Bitmap[_0x38b2d5(0x187)]['drawTextTopAligned']=function(_0x2c4ff3,_0x14c5b2,_0x5cd9e7,_0x2eddcd,_0x4de103,_0xe2423e){const _0x33280a=_0x38b2d5;_0x2c4ff3=TextManager[_0x33280a(0x455)](_0x2c4ff3),VisuMZ[_0x33280a(0x2b7)]['Bitmap_drawTextTopAligned'][_0x33280a(0x312)](this,_0x2c4ff3,_0x14c5b2,_0x5cd9e7,_0x2eddcd,_0x4de103,_0xe2423e);},Window_Base[_0x38b2d5(0x187)]['postConvertEscapeCharacters']=function(_0x528449){return _0x528449;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x361)]=function(_0x3b6734){const _0x5a8137=_0x38b2d5;return this[_0x5a8137(0x15d)]()&&(_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x3b6734=_0x3b6734['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x3b6734=_0x3b6734[_0x5a8137(0x18f)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x3b6734;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x15d)]=function(){const _0x5443dd=_0x38b2d5,_0x5f22a9=[_0x5443dd(0x39e),_0x5443dd(0x84)];return _0x5f22a9[_0x5443dd(0x480)](this[_0x5443dd(0xcc)][_0x5443dd(0x269)]);},Window_Base['prototype'][_0x38b2d5(0x93)]=function(_0x517180){const _0x4ca7d0=_0x38b2d5;return _0x517180=_0x517180[_0x4ca7d0(0x18f)](/<B>/gi,_0x4ca7d0(0x404)),_0x517180=_0x517180[_0x4ca7d0(0x18f)](/<\/B>/gi,'\x1bBOLD[0]'),_0x517180=_0x517180[_0x4ca7d0(0x18f)](/<I>/gi,'\x1bITALIC[1]'),_0x517180=_0x517180[_0x4ca7d0(0x18f)](/<\/I>/gi,'\x1bITALIC[0]'),_0x517180;},Window_Base['prototype'][_0x38b2d5(0x23f)]=function(_0x5f1b08){const _0x11a482=_0x38b2d5;return _0x5f1b08=_0x5f1b08[_0x11a482(0x18f)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x5f1b08=_0x5f1b08[_0x11a482(0x18f)](/<\/LEFT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x5f1b08=_0x5f1b08[_0x11a482(0x18f)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x5f1b08=_0x5f1b08['replace'](/<\/CENTER>/gi,_0x11a482(0x25e)),_0x5f1b08=_0x5f1b08['replace'](/<RIGHT>/gi,_0x11a482(0x434)),_0x5f1b08=_0x5f1b08[_0x11a482(0x18f)](/<\/RIGHT>/gi,'\x1bTEXTALIGNMENT[0]'),_0x5f1b08;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x367)]=function(_0x2b8f14){const _0x28aa35=_0x38b2d5;return _0x2b8f14=_0x2b8f14['replace'](/<COLORLOCK>/gi,_0x28aa35(0x190)),_0x2b8f14=_0x2b8f14[_0x28aa35(0x18f)](/<\/COLORLOCK>/gi,_0x28aa35(0x1e4)),_0x2b8f14=_0x2b8f14[_0x28aa35(0x18f)](/\(\(\(/gi,'\x1bCOLORLOCK[1]'),_0x2b8f14=_0x2b8f14[_0x28aa35(0x18f)](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x2b8f14;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x387)]=function(_0x3a25be){const _0x3dfafc=_0x38b2d5;return _0x3a25be=_0x3a25be[_0x3dfafc(0x18f)](/\x1bN\[(\d+)\]/gi,(_0x247994,_0x32f526)=>this[_0x3dfafc(0x159)](parseInt(_0x32f526))),_0x3a25be=_0x3a25be[_0x3dfafc(0x18f)](/\x1bP\[(\d+)\]/gi,(_0x46476f,_0x5229e4)=>this[_0x3dfafc(0x38a)](parseInt(_0x5229e4))),_0x3a25be=_0x3a25be['replace'](/\x1bG/gi,TextManager['currencyUnit']),_0x3a25be;},Window_Base['prototype'][_0x38b2d5(0x252)]=function(_0x11ae92){const _0x32f3fb=_0x38b2d5;return _0x11ae92=_0x11ae92[_0x32f3fb(0x18f)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0x32f3fb(0x117)]()),_0x11ae92=_0x11ae92[_0x32f3fb(0x18f)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x32f3fb(0x2db)]()),_0x11ae92=_0x11ae92['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x32f3fb(0x214)](!![])),_0x11ae92=_0x11ae92[_0x32f3fb(0x18f)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x32f3fb(0x214)](![])),_0x11ae92;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x117)]=function(){const _0x4682b4=_0x38b2d5;if(!SceneManager[_0x4682b4(0x26d)]())return'';if(BattleManager[_0x4682b4(0x318)])return BattleManager[_0x4682b4(0x318)][_0x4682b4(0x269)]();if(BattleManager[_0x4682b4(0x20d)][0x0])return BattleManager['_targets'][0x0]['name']();return'';},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x2db)]=function(){const _0x40b7a8=_0x38b2d5;if(!SceneManager[_0x40b7a8(0x26d)]())return'';let _0x41f930=null;return _0x41f930=BattleManager[_0x40b7a8(0x4a1)],!_0x41f930&&BattleManager[_0x40b7a8(0xa9)]()&&(_0x41f930=BattleManager['actor']()),_0x41f930?_0x41f930['name']():'';},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x214)]=function(_0x1b3c81){const _0x359a4f=_0x38b2d5;if(!SceneManager['isSceneBattle']())return'';let _0x4bb2b1=BattleManager[_0x359a4f(0x324)]||null;!_0x4bb2b1&&BattleManager[_0x359a4f(0xa9)]()&&(_0x359a4f(0x1c3)===_0x359a4f(0x1c3)?_0x4bb2b1=BattleManager[_0x359a4f(0x2ef)]():(this[_0x359a4f(0x284)](),this[_0x359a4f(0x157)]()));if(_0x4bb2b1&&_0x4bb2b1[_0x359a4f(0x27d)]()){if(_0x359a4f(0x1ac)==='tszKU')this['y']-=_0x4d5192;else{let _0x2a71a4='';if(_0x1b3c81)_0x2a71a4+=_0x359a4f(0x4a4)[_0x359a4f(0xd8)](_0x4bb2b1[_0x359a4f(0x27d)]()[_0x359a4f(0x175)]);return _0x2a71a4+=_0x4bb2b1[_0x359a4f(0x27d)]()['name'],_0x2a71a4;}}return'';},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x218)]=function(_0x4bf0c5){const _0xb7500b=_0x38b2d5;for(const _0x3aa79b of VisuMZ[_0xb7500b(0x2b7)]['Settings'][_0xb7500b(0x153)]){_0x4bf0c5[_0xb7500b(0x3b4)](_0x3aa79b[_0xb7500b(0x2a8)])&&(_0x4bf0c5=_0x4bf0c5[_0xb7500b(0x18f)](_0x3aa79b[_0xb7500b(0x2a8)],_0x3aa79b['textCodeResult']),_0x4bf0c5=this['convertVariableEscapeCharacters'](_0x4bf0c5));}return _0x4bf0c5;},Window_Base[_0x38b2d5(0x187)]['convertMessageCoreEscapeReplacements']=function(_0x49e64a){const _0x232877=_0x38b2d5;for(const _0x277a6d of VisuMZ[_0x232877(0x2b7)][_0x232877(0x2a5)][_0x232877(0x42c)]){_0x49e64a[_0x232877(0x3b4)](_0x277a6d[_0x232877(0x2a8)])&&(_0x232877(0x407)!==_0x232877(0x407)?this['makeCommandListShuffle']():(_0x49e64a=_0x49e64a['replace'](_0x277a6d[_0x232877(0x2a8)],_0x277a6d[_0x232877(0x3c2)][_0x232877(0xa0)](this)),_0x49e64a=this[_0x232877(0x35d)](_0x49e64a)));}return _0x49e64a;},Window_Base[_0x38b2d5(0x187)]['actorName']=function(_0x452c62){const _0x37756d=_0x38b2d5,_0x37b70c=_0x452c62>=0x1?$gameActors[_0x37756d(0x2dd)](_0x452c62):null,_0xd73b4c=_0x37b70c?_0x37b70c[_0x37756d(0x269)]():'',_0x1334d=Number(VisuMZ[_0x37756d(0x2b7)][_0x37756d(0x2a5)]['AutoColor'][_0x37756d(0xf3)]);return this[_0x37756d(0x101)]()&&_0x1334d!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x37756d(0xd8)](_0x1334d,_0xd73b4c):_0xd73b4c;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x38a)]=function(_0x3b7aad){const _0x5053b7=_0x38b2d5,_0x3e97c6=_0x3b7aad>=0x1?$gameParty['members']()[_0x3b7aad-0x1]:null,_0x4a5443=_0x3e97c6?_0x3e97c6[_0x5053b7(0x269)]():'',_0x3bf00d=Number(VisuMZ[_0x5053b7(0x2b7)][_0x5053b7(0x2a5)][_0x5053b7(0x261)][_0x5053b7(0xf3)]);return this[_0x5053b7(0x101)]()&&_0x3bf00d!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5053b7(0xd8)](_0x3bf00d,_0x4a5443):_0x4a5443;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x32f)]=function(_0x315d8c){const _0xd2b736=_0x38b2d5;return this['isAutoColorAffected']()&&(_0xd2b736(0x205)==='PTKZx'?_0x49b7f9[_0xd2b736(0x394)]=_0x428f36[_0xd2b736(0x394)][_0xd2b736(0x422)](0x0,_0x444ba4[_0xd2b736(0xe5)])+'\x0a'+_0x3943cb['text'][_0xd2b736(0x186)](_0x75e0e3['index']):(_0x315d8c=this[_0xd2b736(0x49d)](_0x315d8c),_0x315d8c=this[_0xd2b736(0xc1)](_0x315d8c))),_0x315d8c;},Window_Base['prototype']['processStoredAutoColorChanges']=function(_0x4a3bb5){const _0x3dff76=_0x38b2d5;for(autoColor of VisuMZ[_0x3dff76(0x2b7)][_0x3dff76(0x486)]){if(_0x3dff76(0x2b5)==='LNNNB')_0x4a3bb5=_0x4a3bb5[_0x3dff76(0x18f)](autoColor[0x0],autoColor[0x1]);else{if(!_0x5a930c[_0x3dff76(0x499)](_0x55789e))return!![];}}return _0x4a3bb5;},Window_Base[_0x38b2d5(0x187)]['clearActorNameAutoColor']=function(){this['_autoColorActorNames']=[];},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x47d)]=function(){const _0x316864=_0x38b2d5;this[_0x316864(0x103)]();const _0x597303=VisuMZ[_0x316864(0x2b7)][_0x316864(0x2a5)][_0x316864(0x261)],_0x3c2bfe=_0x597303['Actors'];if(_0x3c2bfe<=0x0)return;for(const _0x4f787d of $gameActors['_data']){if(!_0x4f787d)continue;const _0x2d95bd=_0x4f787d[_0x316864(0x269)]();if(_0x2d95bd['trim']()[_0x316864(0x8b)]<=0x0)continue;if(/^\d+$/[_0x316864(0x46d)](_0x2d95bd))continue;if(_0x2d95bd[_0x316864(0x3b4)](/-----/i))continue;let _0x3b6319=VisuMZ[_0x316864(0x2b7)][_0x316864(0x306)](_0x2d95bd);const _0x4d2ac2=new RegExp('\x5cb'+_0x3b6319+'\x5cb','g'),_0xb4b913=_0x316864(0x16a)['format'](_0x3c2bfe,_0x2d95bd);this['_autoColorActorNames']['push']([_0x4d2ac2,_0xb4b913]);}},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xc1)]=function(_0x311bfd){const _0x3ccf7a=_0x38b2d5;if(this[_0x3ccf7a(0x162)]===undefined){if(_0x3ccf7a(0x438)==='GffeN')this['registerActorNameAutoColorChanges']();else return this[_0x3ccf7a(0x124)](_0x540c34,![],!![]),this[_0x3ccf7a(0x1dc)](_0x3ccf7a(0x26c)),'';}for(autoColor of this[_0x3ccf7a(0x162)]){_0x311bfd=_0x311bfd[_0x3ccf7a(0x18f)](autoColor[0x0],autoColor[0x1]);}return _0x311bfd;},Window_Base['prototype'][_0x38b2d5(0x1fe)]=function(_0x59a942,_0x571a7f,_0x134dcb){const _0x2206ab=_0x38b2d5;if(!_0x59a942)return'';const _0x5a9534=_0x59a942[_0x571a7f];let _0x36ac70='';if(_0x5a9534&&_0x134dcb&&_0x5a9534[_0x2206ab(0x175)]){const _0x48d7cb=_0x2206ab(0x29e);_0x36ac70=_0x48d7cb[_0x2206ab(0xd8)](_0x5a9534[_0x2206ab(0x175)],_0x5a9534['name']);}else _0x5a9534?_0x2206ab(0x32b)===_0x2206ab(0x32b)?_0x36ac70=_0x5a9534[_0x2206ab(0x269)]:this['setWordWrap'](![]):'VkmKH'===_0x2206ab(0x45c)?this['y']=_0x327acf['round']((_0x729de8[_0x2206ab(0x413)]-this[_0x2206ab(0x42b)])/0x2):_0x36ac70='';return this[_0x2206ab(0x101)]()&&(_0x36ac70=this['applyDatabaseAutoColor'](_0x36ac70,_0x59a942)),_0x36ac70;},Window_Base['prototype']['lastGainedObjectIcon']=function(){const _0x4fbb16=_0x38b2d5,_0x5a34ca=$gameParty[_0x4fbb16(0x386)]();if(_0x5a34ca['id']<0x0)return'';let _0x445485=null;if(_0x5a34ca['type']===0x0)_0x445485=$dataItems[_0x5a34ca['id']];if(_0x5a34ca[_0x4fbb16(0x263)]===0x1)_0x445485=$dataWeapons[_0x5a34ca['id']];if(_0x5a34ca['type']===0x2)_0x445485=$dataArmors[_0x5a34ca['id']];if(!_0x445485)return'';return _0x4fbb16(0x9a)[_0x4fbb16(0xd8)](_0x445485[_0x4fbb16(0x175)]);},Window_Base[_0x38b2d5(0x187)]['lastGainedObjectName']=function(_0x4b321b){const _0x1bafda=_0x38b2d5,_0x28c304=$gameParty[_0x1bafda(0x386)]();if(_0x28c304['id']<0x0)return'';let _0x30d340=null;if(_0x28c304[_0x1bafda(0x263)]===0x0)_0x30d340=$dataItems[_0x28c304['id']];if(_0x28c304[_0x1bafda(0x263)]===0x1)_0x30d340=$dataWeapons[_0x28c304['id']];if(_0x28c304[_0x1bafda(0x263)]===0x2)_0x30d340=$dataArmors[_0x28c304['id']];if(!_0x30d340)return'';return _0x4b321b?_0x1bafda(0x29e)['format'](_0x30d340[_0x1bafda(0x175)],_0x30d340[_0x1bafda(0x269)]):_0x30d340[_0x1bafda(0x269)];},Window_Base['prototype']['lastGainedObjectQuantity']=function(){const _0x9c5b78=$gameParty['getLastGainedItemData']();if(_0x9c5b78['id']<=0x0)return'';return _0x9c5b78['quantity'];},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x116)]=function(_0x118ada,_0x2a7ac2){const _0x5d1f5b=_0x38b2d5,_0x3ce555=VisuMZ[_0x5d1f5b(0x2b7)][_0x5d1f5b(0x2a5)][_0x5d1f5b(0x261)];let _0xf35983=0x0;if(_0x2a7ac2===$dataActors)_0xf35983=_0x3ce555[_0x5d1f5b(0xf3)];if(_0x2a7ac2===$dataClasses)_0xf35983=_0x3ce555[_0x5d1f5b(0xf4)];if(_0x2a7ac2===$dataSkills)_0xf35983=_0x3ce555[_0x5d1f5b(0xd0)];if(_0x2a7ac2===$dataItems)_0xf35983=_0x3ce555[_0x5d1f5b(0x3d7)];if(_0x2a7ac2===$dataWeapons)_0xf35983=_0x3ce555[_0x5d1f5b(0x108)];if(_0x2a7ac2===$dataArmors)_0xf35983=_0x3ce555[_0x5d1f5b(0x451)];if(_0x2a7ac2===$dataEnemies)_0xf35983=_0x3ce555[_0x5d1f5b(0xdf)];if(_0x2a7ac2===$dataStates)_0xf35983=_0x3ce555[_0x5d1f5b(0x191)];return _0xf35983>0x0&&(_0x118ada=_0x5d1f5b(0x16a)['format'](_0xf35983,_0x118ada)),_0x118ada;},Window_Base['prototype']['prepareWordWrapEscapeCharacters']=function(_0x3e6f38){const _0x2528ff=_0x38b2d5;if(_0x3e6f38[_0x2528ff(0x480)]('\x1bTEXTALIGNMENT')){if(_0x2528ff(0x359)===_0x2528ff(0x3d0)){let _0x1800f4='';_0x1800f4+=_0x2528ff(0x378),_0x1800f4+='in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.',_0x34be49(_0x1800f4),_0x2672ec[_0x2528ff(0x299)]();}else return this['setWordWrap'](![]),_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x3e6f38;}_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x3a2ad1,_0x4b59ca)=>this[_0x2528ff(0x13b)](!![])),_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x5d3206,_0x1eddaf)=>this[_0x2528ff(0x13b)](![])),_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x2b9dd6,_0x18bde3)=>this['setWordWrap'](![]));if(_0x3e6f38[_0x2528ff(0x3b4)](Window_Message['_autoSizeRegexp']))this[_0x2528ff(0x13b)](![]);else _0x3e6f38[_0x2528ff(0x3b4)](Window_Message[_0x2528ff(0x23a)])&&this['setWordWrap'](![]);if(!this[_0x2528ff(0x402)]())return _0x3e6f38=_0x3e6f38['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x3e6f38;if(_0x3e6f38[_0x2528ff(0x8b)]<=0x0)return _0x3e6f38;return _0x3e6f38[_0x2528ff(0x3b4)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x2528ff(0x286)===_0x2528ff(0x286)?_0x3e6f38=VisuMZ[_0x2528ff(0x2b7)][_0x2528ff(0x31c)](_0x3e6f38)[_0x2528ff(0xfc)](''):(_0x4fcf24(_0x2528ff(0x1cc)[_0x2528ff(0xd8)](_0x495e10,_0x32dbf2,_0x30e5a8)),_0x5b1ac3['exit']())),VisuMZ[_0x2528ff(0x2b7)][_0x2528ff(0x2a5)][_0x2528ff(0x388)]['LineBreakSpace']?(_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/[\n\r]+/g,'\x20'),_0x3e6f38=_0x3e6f38['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x3e6f38=_0x3e6f38['replace'](/[\n\r]+/g,''),_0x3e6f38=_0x3e6f38['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x3e6f38=this[_0x2528ff(0x11c)](_0x3e6f38),_0x3e6f38=_0x3e6f38[_0x2528ff(0x2b4)]('\x20')[_0x2528ff(0xfc)](_0x2528ff(0x1d9)),_0x3e6f38=_0x3e6f38['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3e6f38=_0x3e6f38[_0x2528ff(0x18f)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3e6f38;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x31c)]=function(_0x330178){const _0x25a931=_0x38b2d5;let _0xc68d38=[],_0x3090cb='';while(_0x330178[_0x25a931(0x8b)]>0x0){const _0x7913ce=_0x330178[_0x25a931(0x8f)](0x0);_0x330178=_0x330178['slice'](0x1),_0x7913ce[_0x25a931(0x3b4)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?_0x25a931(0x1c4)!==_0x25a931(0x1c4)?this[_0x25a931(0xff)][_0x11294c]='':(_0x3090cb[_0x25a931(0x8b)]>0x0&&(_0x25a931(0x37b)==='lZBnU'?(_0xc68d38[_0x25a931(0x3f7)](_0x3090cb),_0x3090cb=''):(_0x88af29['x']=this[_0x25a931(0x196)](_0x214cd9),_0x43a37b[_0x25a931(0x2b7)][_0x25a931(0x2a5)][_0x25a931(0x169)][_0x25a931(0x75)]&&(_0x2acb25['x']+=_0x3f4183['startX']))),_0xc68d38['push'](_0x7913ce+_0x25a931(0xe2))):_0x3090cb+=_0x7913ce;}return _0x3090cb[_0x25a931(0x8b)]>0x0&&(_0x25a931(0x1dd)!==_0x25a931(0x1dd)?_0x95df9e['update']():(_0xc68d38[_0x25a931(0x3f7)](_0x3090cb),_0x3090cb='')),_0xc68d38;},Window_Base[_0x38b2d5(0x187)]['addWrapBreakAfterPunctuation']=function(_0x488a7d){return _0x488a7d;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x165)]=Window_Base[_0x38b2d5(0x187)]['processNewLine'],Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x29f)]=function(_0x2c57f2){const _0x1ddb25=_0x38b2d5;VisuMZ[_0x1ddb25(0x2b7)]['Window_Base_processNewLine']['call'](this,_0x2c57f2),this[_0x1ddb25(0x121)](_0x2c57f2);},VisuMZ['MessageCore'][_0x38b2d5(0x256)]=Window_Base[_0x38b2d5(0x187)]['processControlCharacter'],Window_Base['prototype']['processControlCharacter']=function(_0x5cae76,_0x58278e){const _0x5cadeb=_0x38b2d5;VisuMZ[_0x5cadeb(0x2b7)]['Window_Base_processControlCharacter']['call'](this,_0x5cae76,_0x58278e);if(_0x58278e==='\x1bWrapBreak[0]')_0x5cadeb(0xdb)===_0x5cadeb(0xdb)?this[_0x5cadeb(0x3ed)](_0x5cae76):(this[_0x5cadeb(0x29d)](_0x23233d,this[_0x5cadeb(0x109)](),_0x262068),this[_0x5cadeb(0x303)]-=0x2);else _0x58278e===_0x5cadeb(0xe2)&&this[_0x5cadeb(0x3ed)](_0x5cae76,!![]);},Window_Base[_0x38b2d5(0x187)]['obtainEscapeString']=function(_0x1bddac){const _0x4b5dec=_0x38b2d5;var _0x2a088f=/^\<(.*?)\>/[_0x4b5dec(0x99)](_0x1bddac['text'][_0x4b5dec(0x422)](_0x1bddac[_0x4b5dec(0xe5)]));if(_0x2a088f){if(_0x4b5dec(0x38d)===_0x4b5dec(0x38d))return _0x1bddac['index']+=_0x2a088f[0x0][_0x4b5dec(0x8b)],String(_0x2a088f[0x0][_0x4b5dec(0x422)](0x1,_0x2a088f[0x0]['length']-0x1));else{const _0x1ff30e=this['choiceListHelpWindowRect'](),_0x3ea338=new _0x27f943(_0x1ff30e);_0x3ea338['hide'](),this[_0x4b5dec(0xa1)][_0x4b5dec(0x110)](_0x3ea338),this['_messageWindow']['setChoiceListHelpWindow'](_0x3ea338),this[_0x4b5dec(0x22f)](_0x3ea338),this[_0x4b5dec(0x472)]=_0x3ea338;}}else return'';},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x464)]=Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xc8)],Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xc8)]=function(_0x3d7b79,_0x50064b){const _0x5e54cd=_0x38b2d5;switch(_0x3d7b79){case'C':if(_0x50064b['drawing']){if('NIrVe'!==_0x5e54cd(0xe3))VisuMZ[_0x5e54cd(0x2b7)][_0x5e54cd(0x464)][_0x5e54cd(0x312)](this,_0x3d7b79,_0x50064b);else{const _0x31d533=['Window_ChoiceList',_0x5e54cd(0x84)];return _0x31d533[_0x5e54cd(0x480)](this[_0x5e54cd(0xcc)][_0x5e54cd(0x269)]);}}else{if(_0x5e54cd(0x163)!==_0x5e54cd(0x163)){_0x41db23[_0x5e54cd(0x2b7)][_0x5e54cd(0x152)][_0x5e54cd(0x312)](this,_0x18d8bc);if(_0x1013d7['drawing'])this[_0x5e54cd(0x342)]('default');}else this[_0x5e54cd(0x196)](_0x50064b);}break;case'I':case'{':case'}':VisuMZ[_0x5e54cd(0x2b7)]['Window_Base_processEscapeCharacter']['call'](this,_0x3d7b79,_0x50064b);break;case'FS':this[_0x5e54cd(0x2b6)](_0x50064b);break;case'PX':this[_0x5e54cd(0x225)](_0x50064b);break;case'PY':this[_0x5e54cd(0x376)](_0x50064b);break;case _0x5e54cd(0x456):this['processFontChangeBold'](this[_0x5e54cd(0x196)](_0x50064b));break;case _0x5e54cd(0xb3):this['processDrawCenteredPicture'](_0x50064b);break;case _0x5e54cd(0x36d):this[_0x5e54cd(0x3ad)](_0x50064b);break;case _0x5e54cd(0x1eb):this[_0x5e54cd(0x154)](_0x50064b);break;case _0x5e54cd(0x246):this[_0x5e54cd(0x7e)](this['obtainEscapeParam'](_0x50064b));break;case _0x5e54cd(0x15c):this[_0x5e54cd(0x366)](_0x50064b);break;case _0x5e54cd(0x21d):this['processPreviousColor'](_0x50064b);break;case _0x5e54cd(0x18b):this['processTextAlignmentChange'](_0x50064b);break;case'WAIT':this[_0x5e54cd(0xba)](_0x50064b);break;case _0x5e54cd(0x32c):this[_0x5e54cd(0x3ed)](_0x50064b);break;case _0x5e54cd(0x3a7):this[_0x5e54cd(0x3ed)](_0x50064b,!![]);break;default:this['processMessageCoreEscapeActions'](_0x3d7b79,_0x50064b);}},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x1f6)]=function(_0x384ae9,_0xd8d64c){const _0x1cba4d=_0x38b2d5;for(const _0x37ef56 of VisuMZ['MessageCore'][_0x1cba4d(0x2a5)][_0x1cba4d(0x153)]){if(_0x1cba4d(0x1e5)===_0x1cba4d(0x17b)){const _0x2f9e67=_0x3bd94d[_0x1cba4d(0xfa)]||0x0;if(_0x2f9e67>0x0)this[_0x1cba4d(0x3d2)](_0x2f9e67);}else{if(_0x37ef56[_0x1cba4d(0x2ee)]===_0x384ae9){if(_0x37ef56['Type']==='')this[_0x1cba4d(0x196)](_0xd8d64c);_0x37ef56['ActionJS'][_0x1cba4d(0x312)](this,_0xd8d64c);if(this[_0x1cba4d(0xcc)]===Window_Message){if(_0x1cba4d(0x47b)!=='dosad')_0x57d940&&_0x2d3982[_0x1cba4d(0x3b4)](_0x552a54[_0x1cba4d(0x2a8)])&&(this[_0x1cba4d(0x3c3)]=!![],_0xe88e87=_0x563e64[_0x1cba4d(0x18f)](_0x2578f7['textCodeCheck'],_0x4463a8[_0x1cba4d(0x3c2)][_0x1cba4d(0xa0)](this)));else{const _0x4793db=_0x37ef56[_0x1cba4d(0xfa)]||0x0;if(_0x4793db>0x0)this['launchMessageCommonEvent'](_0x4793db);}}}}}},Window_Base[_0x38b2d5(0x187)]['makeFontBigger']=function(){const _0x1e0509=_0x38b2d5;this[_0x1e0509(0x48f)][_0x1e0509(0x3be)]+=VisuMZ['MessageCore']['Settings'][_0x1e0509(0x169)][_0x1e0509(0x30e)],this[_0x1e0509(0x48f)][_0x1e0509(0x3be)]=Math['min'](this['contents']['fontSize'],VisuMZ[_0x1e0509(0x2b7)]['Settings'][_0x1e0509(0x169)][_0x1e0509(0x1b2)]);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x481)]=function(){const _0x4ae0cb=_0x38b2d5;this[_0x4ae0cb(0x48f)][_0x4ae0cb(0x3be)]-=VisuMZ[_0x4ae0cb(0x2b7)][_0x4ae0cb(0x2a5)]['General'][_0x4ae0cb(0x30e)],this['contents'][_0x4ae0cb(0x3be)]=Math[_0x4ae0cb(0x212)](this['contents'][_0x4ae0cb(0x3be)],VisuMZ[_0x4ae0cb(0x2b7)][_0x4ae0cb(0x2a5)]['General'][_0x4ae0cb(0xb6)]);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x2b6)]=function(_0xbe30b){const _0x2beafd=_0x38b2d5,_0x27c580=this[_0x2beafd(0x196)](_0xbe30b);this['contents'][_0x2beafd(0x3be)]=_0x27c580['clamp'](VisuMZ[_0x2beafd(0x2b7)][_0x2beafd(0x2a5)]['General'][_0x2beafd(0xb6)],VisuMZ[_0x2beafd(0x2b7)]['Settings'][_0x2beafd(0x169)][_0x2beafd(0x1b2)]);},Window_Base[_0x38b2d5(0x187)]['maxFontSizeInLine']=function(_0x53ba68){const _0x4a8c72=_0x38b2d5;let _0x436586=this[_0x4a8c72(0x48f)][_0x4a8c72(0x3be)];const _0x2f52b2=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x188b25=_0x2f52b2['exec'](_0x53ba68);if(!_0x188b25)break;const _0x4aaca1=String(_0x188b25[0x1])[_0x4a8c72(0x173)]();if(_0x4aaca1==='{'){if(_0x4a8c72(0x27a)!==_0x4a8c72(0x27a)){_0x4c44f5=_0x254fc0['replace'](_0x58656f[_0x4a8c72(0x77)],''),_0x530828=_0x2671f3[_0x4a8c72(0x18f)](_0x23c3fe[_0x4a8c72(0x23a)],''),this[_0x4a8c72(0x40a)]=!![],this[_0x4a8c72(0x206)]=!![],this[_0x4a8c72(0x13b)](![]);const _0x33211e=this[_0x4a8c72(0x25f)](_0x166634);if(_0x5a86a3){let _0x589b19=_0x33211e[_0x4a8c72(0x13f)]+_0x2112e9[_0x4a8c72(0x142)]()*0x2+0x6;const _0x3d5ddb=_0x31eeb6[_0x4a8c72(0x496)]()!=='',_0x578066=_0x343113[_0x4a8c72(0x322)],_0x45b8d0=0x14;_0x589b19+=_0x3d5ddb?_0x578066+_0x45b8d0:0x4;if(_0x589b19%0x2!==0x0)_0x589b19+=0x1;_0x891290[_0x4a8c72(0x2e1)](_0x589b19);}if(_0x29d568){let _0xc2a515=_0x447068['ceil'](_0x33211e[_0x4a8c72(0x42b)]/this[_0x4a8c72(0x22c)]());_0x596ec7[_0x4a8c72(0x37a)](_0xc2a515);}this['updateAutoSizePosition'](),this[_0x4a8c72(0x3a5)](),this[_0x4a8c72(0x40a)]=![],this[_0x4a8c72(0xa8)]=!![];}else this[_0x4a8c72(0x19c)]();}else{if(_0x4aaca1==='}'){if(_0x4a8c72(0xb8)!==_0x4a8c72(0x1cd))this[_0x4a8c72(0x481)]();else{var _0x3a63cd=_0x20a1de[_0x4a8c72(0x3e4)][0x1]+_0x5c0046;this[_0x4a8c72(0x20a)][_0x4bcc38][_0x4a8c72(0x3e4)][0x1]=_0x3a63cd;}}else _0x4aaca1==='FS'&&(this[_0x4a8c72(0x48f)][_0x4a8c72(0x3be)]=parseInt(_0x188b25[0x3])[_0x4a8c72(0x26a)](VisuMZ[_0x4a8c72(0x2b7)]['Settings'][_0x4a8c72(0x169)][_0x4a8c72(0xb6)],VisuMZ[_0x4a8c72(0x2b7)][_0x4a8c72(0x2a5)][_0x4a8c72(0x169)][_0x4a8c72(0x1b2)]));}this[_0x4a8c72(0x48f)][_0x4a8c72(0x3be)]>_0x436586&&(_0x436586=this['contents'][_0x4a8c72(0x3be)]);}return _0x436586;},Window_Base[_0x38b2d5(0x187)]['processPxTextCode']=function(_0x524553){const _0x328c87=_0x38b2d5;_0x524553['x']=this[_0x328c87(0x196)](_0x524553),VisuMZ[_0x328c87(0x2b7)][_0x328c87(0x2a5)]['General'][_0x328c87(0x75)]&&('HqXRM'!==_0x328c87(0x268)?this[_0x328c87(0x20a)][_0x59de9a][_0x328c87(0x3e4)][0x0][_0x328c87(0x3f7)](_0x928a12):_0x524553['x']+=_0x524553[_0x328c87(0xca)]);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x376)]=function(_0x3c6fc7){const _0x37d45d=_0x38b2d5;_0x3c6fc7['y']=this[_0x37d45d(0x196)](_0x3c6fc7),VisuMZ[_0x37d45d(0x2b7)][_0x37d45d(0x2a5)][_0x37d45d(0x169)]['RelativePXPY']&&(_0x3c6fc7['y']+=_0x3c6fc7[_0x37d45d(0x34a)]);},Window_Base[_0x38b2d5(0x187)]['processFontChangeBold']=function(_0x2fa710){this['contents']['fontBold']=!!_0x2fa710;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x7e)]=function(_0x5a5684){this['contents']['fontItalic']=!!_0x5a5684;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x47c)]=function(_0x4f1730){const _0x3ae959=_0x38b2d5,_0x1b9f0d=this[_0x3ae959(0x196)](_0x4f1730);if(!_0x4f1730[_0x3ae959(0x251)])return;switch(_0x1b9f0d){case 0x0:this[_0x3ae959(0x342)]('default');return;case 0x1:this[_0x3ae959(0x342)]('left');break;case 0x2:this[_0x3ae959(0x342)](_0x3ae959(0x45a));break;case 0x3:this[_0x3ae959(0x342)](_0x3ae959(0x3e0));break;}this[_0x3ae959(0x121)](_0x4f1730);},Window_Base[_0x38b2d5(0x187)]['processTextAlignmentX']=function(_0x494414){const _0xb1dba4=_0x38b2d5;if(!_0x494414[_0xb1dba4(0x251)])return;if(_0x494414[_0xb1dba4(0x2a3)])return;if(this[_0xb1dba4(0x1d6)]()===_0xb1dba4(0x3e3))return;let _0x1cd477=_0x494414[_0xb1dba4(0x394)][_0xb1dba4(0x43c)](_0xb1dba4(0x39c),_0x494414['index']+0x1),_0x5927a9=_0x494414['text']['indexOf']('\x0a',_0x494414['index']+0x1);if(_0x1cd477<0x0)_0x1cd477=_0x494414['text'][_0xb1dba4(0x8b)]+0x1;if(_0x5927a9>0x0)_0x1cd477=Math[_0xb1dba4(0x369)](_0x1cd477,_0x5927a9);const _0x2b390b=_0x494414[_0xb1dba4(0x394)][_0xb1dba4(0x2aa)](_0x494414[_0xb1dba4(0xe5)],_0x1cd477),_0x1d75fb=this[_0xb1dba4(0xdc)](_0x2b390b)['width'],_0x4a39cb=_0x494414['width']||this[_0xb1dba4(0x3fe)]-0x8,_0x13a465=this[_0xb1dba4(0xcc)]===Window_Message&&$gameMessage[_0xb1dba4(0x496)]()!=='';switch(this[_0xb1dba4(0x1d6)]()){case _0xb1dba4(0x431):_0x494414['x']=_0x494414[_0xb1dba4(0xca)];break;case _0xb1dba4(0x45a):_0x494414['x']=_0x494414['startX'],_0x494414['x']+=Math['floor']((_0x4a39cb-_0x1d75fb)/0x2);_0x13a465&&(_0xb1dba4(0x1c6)===_0xb1dba4(0x1c6)?_0x494414['x']-=_0x494414['startX']/0x2:(this[_0xb1dba4(0x1ef)]['x']=_0x5ad2d2[_0xb1dba4(0x11f)](this[_0xb1dba4(0x13f)]/0x2),this['_dimmerSprite'][_0xb1dba4(0x37d)]['x']=0.5,this[_0xb1dba4(0x1ef)][_0xb1dba4(0x3f5)]['x']=_0x3ef8ca[_0xb1dba4(0x13f)]));break;case _0xb1dba4(0x3e0):_0x494414['x']=_0x4a39cb-_0x1d75fb+_0x494414['startX'];_0x13a465&&(_0x494414['x']-=_0x494414['startX']);break;}},Window_Base[_0x38b2d5(0x187)]['textSizeExTextAlignment']=function(_0x14964a){const _0x14c3cf=_0x38b2d5;_0x14964a=_0x14964a[_0x14c3cf(0x18f)](/\x1b!/g,''),_0x14964a=_0x14964a['replace'](/\x1b\|/g,''),_0x14964a=_0x14964a[_0x14c3cf(0x18f)](/\x1b\./g,'');const _0x9bb3b1=this[_0x14c3cf(0x266)](_0x14964a,0x0,0x0,0x0),_0x19a1d5=this[_0x14c3cf(0x1b7)]();return _0x9bb3b1[_0x14c3cf(0x251)]=![],this['processAllText'](_0x9bb3b1),this[_0x14c3cf(0x28d)](_0x19a1d5),{'width':_0x9bb3b1['outputWidth'],'height':_0x9bb3b1['outputHeight']};},Window_Base[_0x38b2d5(0xd3)]=VisuMZ['MessageCore']['Settings'][_0x38b2d5(0x388)][_0x38b2d5(0x2a9)]||0x0,Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x3ed)]=function(_0x500e87,_0x15a183){const _0x2f4245=_0x38b2d5,_0x42fc77=(_0x500e87[_0x2f4245(0x2a3)]?-0x1:0x1)*this[_0x2f4245(0x364)]('\x20');if(!_0x15a183)_0x500e87['x']+=_0x42fc77;if(this[_0x2f4245(0x196)](_0x500e87)>0x0&&!_0x15a183)_0x500e87['x']+=_0x42fc77;if(_0x500e87[_0x2f4245(0x2a3)])return;let _0x43581d;if(_0x15a183){if(_0x2f4245(0x31e)===_0x2f4245(0x31e))_0x43581d=_0x500e87[_0x2f4245(0x394)][_0x2f4245(0x43c)](_0x2f4245(0xe2),_0x500e87[_0x2f4245(0xe5)]+0x1);else{if(_0x1dbb0e===_0x2f4245(0x326))return!![];if(_0x5b67b2===_0x2f4245(0x314))return!![];return _0x50f3d8[_0x2f4245(0x2b7)][_0x2f4245(0x158)][_0x2f4245(0x312)](this,_0x3d10fa);}}else _0x2f4245(0x1de)==='KdLRu'?_0x43581d=_0x500e87[_0x2f4245(0x394)]['indexOf'](_0x2f4245(0x1d9),_0x500e87[_0x2f4245(0xe5)]+0x1):this[_0x2f4245(0x38c)]&&(this['_interpreter'][_0x2f4245(0x9f)]()?this[_0x2f4245(0x38c)]['update']():this[_0x2f4245(0xe6)]());let _0x27c4cd=_0x500e87[_0x2f4245(0x394)]['indexOf']('\x0a',_0x500e87['index']+0x1);if(_0x43581d<0x0)_0x43581d=_0x500e87[_0x2f4245(0x394)]['length']+0x1;if(_0x27c4cd>0x0)_0x43581d=Math['min'](_0x43581d,_0x27c4cd);const _0x41e7f1=_0x500e87[_0x2f4245(0x394)][_0x2f4245(0x2aa)](_0x500e87[_0x2f4245(0xe5)],_0x43581d),_0x557fc3=this[_0x2f4245(0x2f6)](_0x41e7f1)[_0x2f4245(0x13f)];let _0x37e7d2=_0x500e87[_0x2f4245(0x13f)]||this['innerWidth'];_0x37e7d2-=Window_Base[_0x2f4245(0xd3)];if(this['constructor']===Window_Message){const _0xd91859=$gameMessage[_0x2f4245(0x496)]()===''?0x0:ImageManager[_0x2f4245(0x322)]+0x14;_0x37e7d2-=_0xd91859,VisuMZ[_0x2f4245(0x2b7)][_0x2f4245(0x2a5)][_0x2f4245(0x388)]['TightWrap']&&(_0x37e7d2-=_0xd91859);}let _0x3cc740=![];_0x500e87['x']+_0x557fc3>_0x500e87[_0x2f4245(0xca)]+_0x37e7d2&&(_0x3cc740=!![]),_0x557fc3===0x0&&(_0x3cc740=![]),_0x3cc740&&(_0x500e87[_0x2f4245(0x394)]=_0x500e87[_0x2f4245(0x394)][_0x2f4245(0x422)](0x0,_0x500e87['index'])+'\x0a'+_0x500e87[_0x2f4245(0x394)]['substr'](_0x500e87[_0x2f4245(0xe5)]));},Window_Base['prototype']['textSizeExWordWrap']=function(_0x5c6bef){const _0x825154=_0x38b2d5,_0x423b0b=this[_0x825154(0x266)](_0x5c6bef,0x0,0x0,0x0),_0x80ba8d=this[_0x825154(0x1b7)]();return _0x423b0b['drawing']=![],this['setWordWrap'](![]),this[_0x825154(0x12b)](_0x423b0b),this[_0x825154(0x13b)](!![]),this[_0x825154(0x28d)](_0x80ba8d),{'width':_0x423b0b[_0x825154(0x297)],'height':_0x423b0b[_0x825154(0x94)]};},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x154)]=function(_0x47271f){const _0x267ce3=_0x38b2d5;return this[_0x267ce3(0x196)](_0x47271f);},Window_Base['prototype'][_0x38b2d5(0x366)]=function(_0x2ea60b){const _0x5d5f82=_0x38b2d5,_0x2bb1a6=this[_0x5d5f82(0xc6)](_0x2ea60b)['split'](',');if(!_0x2ea60b[_0x5d5f82(0x251)])return;const _0x24042f=_0x2bb1a6[0x0][_0x5d5f82(0x2bc)](),_0x455000=_0x2bb1a6[0x1]||0x0,_0x59660c=_0x2bb1a6[0x2]||0x0,_0x4c94d3=ImageManager[_0x5d5f82(0x1c7)](_0x24042f),_0x1706f7=this[_0x5d5f82(0x48f)][_0x5d5f82(0x18d)];_0x4c94d3[_0x5d5f82(0x1b9)](this['drawBackPicture'][_0x5d5f82(0xa0)](this,_0x4c94d3,_0x2ea60b['x'],_0x2ea60b['y'],_0x455000,_0x59660c,_0x1706f7));},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x10c)]=function(_0x5bb32f,_0x245d0a,_0x3bddb3,_0x54aa34,_0x25af51,_0x19d308){const _0x4e9da6=_0x38b2d5;_0x54aa34=_0x54aa34||_0x5bb32f[_0x4e9da6(0x13f)],_0x25af51=_0x25af51||_0x5bb32f[_0x4e9da6(0x42b)],this[_0x4e9da6(0x443)][_0x4e9da6(0x18d)]=_0x19d308,this['contentsBack'][_0x4e9da6(0x11a)](_0x5bb32f,0x0,0x0,_0x5bb32f[_0x4e9da6(0x13f)],_0x5bb32f[_0x4e9da6(0x42b)],_0x245d0a,_0x3bddb3,_0x54aa34,_0x25af51),this['contentsBack'][_0x4e9da6(0x18d)]=0xff;},Window_Base[_0x38b2d5(0x187)]['processDrawCenteredPicture']=function(_0x2a1125){const _0x46a0fe=_0x38b2d5,_0x55f15f=this['obtainEscapeString'](_0x2a1125)['split'](',');if(!_0x2a1125[_0x46a0fe(0x251)])return;const _0x199da7=_0x55f15f[0x0][_0x46a0fe(0x2bc)](),_0x433bce=ImageManager['loadPicture'](_0x199da7),_0x15f2f7=JsonEx[_0x46a0fe(0x403)](_0x2a1125),_0x157967=this[_0x46a0fe(0x48f)][_0x46a0fe(0x18d)];_0x433bce[_0x46a0fe(0x1b9)](this[_0x46a0fe(0x148)][_0x46a0fe(0xa0)](this,_0x433bce,_0x15f2f7,_0x157967));},Window_Base[_0x38b2d5(0x187)]['drawBackCenteredPicture']=function(_0x3bf89d,_0x55b22b,_0x33aa18){const _0x4b8303=_0x38b2d5,_0x17596c=_0x55b22b['width']||this[_0x4b8303(0x3fe)],_0x118929=this[_0x4b8303(0x303)]!==undefined?this[_0x4b8303(0x3a3)]():this[_0x4b8303(0x400)],_0x21502b=_0x17596c/_0x3bf89d[_0x4b8303(0x13f)],_0x270aeb=_0x118929/_0x3bf89d[_0x4b8303(0x42b)],_0x144266=Math[_0x4b8303(0x369)](_0x21502b,_0x270aeb,0x1),_0x396864=this[_0x4b8303(0x303)]!==undefined?(this['itemRectWithPadding'](0x0)[_0x4b8303(0x42b)]-this[_0x4b8303(0x22c)]())/0x2:0x0,_0x4ad4f2=_0x3bf89d[_0x4b8303(0x13f)]*_0x144266,_0x3bedee=_0x3bf89d[_0x4b8303(0x42b)]*_0x144266,_0x619e1a=Math[_0x4b8303(0x484)]((_0x17596c-_0x4ad4f2)/0x2)+_0x55b22b[_0x4b8303(0xca)],_0x1f9cce=Math['floor']((_0x118929-_0x3bedee)/0x2)+_0x55b22b[_0x4b8303(0x34a)]-_0x396864*0x2;this[_0x4b8303(0x443)][_0x4b8303(0x18d)]=_0x33aa18,this[_0x4b8303(0x443)][_0x4b8303(0x11a)](_0x3bf89d,0x0,0x0,_0x3bf89d['width'],_0x3bf89d[_0x4b8303(0x42b)],_0x619e1a,_0x1f9cce,_0x4ad4f2,_0x3bedee),this[_0x4b8303(0x443)][_0x4b8303(0x18d)]=0xff;},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0x3ad)]=function(_0x34f450){const _0x595791=_0x38b2d5,_0x2c49c5=this[_0x595791(0x196)](_0x34f450);if(_0x34f450[_0x595791(0x251)])this[_0x595791(0x211)](_0x2c49c5>0x0);},Window_Base[_0x38b2d5(0x187)][_0x38b2d5(0xba)]=function(_0x5c0793){const _0x24db98=_0x38b2d5,_0x253af5=this[_0x24db98(0x196)](_0x5c0793);this[_0x24db98(0xcc)]===Window_Message&&_0x5c0793[_0x24db98(0x251)]&&this[_0x24db98(0x347)](_0x253af5);},Window_Help[_0x38b2d5(0x187)][_0x38b2d5(0x3eb)]=function(){const _0x3a3f55=_0x38b2d5;this[_0x3a3f55(0x13b)]($gameSystem[_0x3a3f55(0x138)]());},Window_Help[_0x38b2d5(0x187)]['isAutoColorAffected']=function(){return!![];},VisuMZ[_0x38b2d5(0x2b7)]['Window_Help_refresh']=Window_Help[_0x38b2d5(0x187)][_0x38b2d5(0x137)],Window_Help[_0x38b2d5(0x187)]['refresh']=function(){const _0x91e5=_0x38b2d5;this[_0x91e5(0x103)](),VisuMZ[_0x91e5(0x2b7)]['Window_Help_refresh'][_0x91e5(0x312)](this),this[_0x91e5(0x3eb)]();},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x384)]=Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x12a)],Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x12a)]=function(){const _0xe4454f=_0x38b2d5;VisuMZ[_0xe4454f(0x2b7)][_0xe4454f(0x384)][_0xe4454f(0x312)](this),this[_0xe4454f(0x125)]();},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x125)]=function(){const _0x466e29=_0x38b2d5;VisuMZ[_0x466e29(0x2b7)][_0x466e29(0x2a5)][_0x466e29(0xd7)][_0x466e29(0x494)]&&TextManager[_0x466e29(0x164)]()&&this[_0x466e29(0x229)]();if(VisuMZ[_0x466e29(0x2b7)]['Settings'][_0x466e29(0x28c)]['AddOption']){if(_0x466e29(0x16e)===_0x466e29(0x16e))this[_0x466e29(0x333)]();else{_0x2f5ea8[_0x466e29(0x2b7)][_0x466e29(0x9c)][_0x466e29(0x312)](this,_0x27f608);const _0x1b0d6b=_0x55a515[_0x466e29(0x2b7)]['Settings'][_0x466e29(0x261)];_0x88d47['MessageCore'][_0x466e29(0x47f)](_0x4bac8f,_0x1b0d6b[_0x466e29(0x108)]);}}},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x229)]=function(){const _0x2ce500=_0x38b2d5,_0x214b37=TextManager['messageCoreLocalization'],_0x45b44d=_0x2ce500(0x326);this[_0x2ce500(0x40d)](_0x214b37,_0x45b44d);},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x333)]=function(){const _0x18dd31=_0x38b2d5,_0x44500d=TextManager[_0x18dd31(0x48d)],_0x77bc4a=_0x18dd31(0x314);this[_0x18dd31(0x40d)](_0x44500d,_0x77bc4a);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x2fd)]=Window_Options[_0x38b2d5(0x187)]['statusText'],Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x2dc)]=function(_0x2b7ea2){const _0x1364c9=_0x38b2d5,_0x182469=this[_0x1364c9(0x2d6)](_0x2b7ea2);if(_0x182469==='textLocale')return this['visuMzTextLocaleStatusText']();if(_0x182469===_0x1364c9(0x314))return this[_0x1364c9(0x483)]();return VisuMZ[_0x1364c9(0x2b7)][_0x1364c9(0x2fd)][_0x1364c9(0x312)](this,_0x2b7ea2);},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x1db)]=function(){const _0x57e733=_0x38b2d5,_0x3a8d53=ConfigManager['textLocale'];return TextManager[_0x57e733(0x424)](_0x3a8d53);},Window_Options['prototype'][_0x38b2d5(0x483)]=function(){const _0x26380a=_0x38b2d5,_0x20f7d8=this['getConfigValue']('textSpeed');return _0x20f7d8>0xa?TextManager[_0x26380a(0x308)]:_0x20f7d8;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x158)]=Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x3da)],Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x3da)]=function(_0x319d76){const _0x9a88be=_0x38b2d5;if(_0x319d76===_0x9a88be(0x326))return!![];if(_0x319d76==='textSpeed')return!![];return VisuMZ['MessageCore']['Window_Options_isVolumeSymbol'][_0x9a88be(0x312)](this,_0x319d76);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0xfe)]=Window_Options[_0x38b2d5(0x187)]['changeVolume'],Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x204)]=function(_0x5b382b,_0x3456e5,_0x150f71){const _0x38e50b=_0x38b2d5;if(_0x5b382b==='textLocale')return this['changeVisuMzTextLocale'](_0x3456e5,_0x150f71);if(_0x5b382b===_0x38e50b(0x314))return this[_0x38e50b(0x3c0)](_0x5b382b,_0x3456e5,_0x150f71);VisuMZ[_0x38e50b(0x2b7)]['Window_Options_changeVolume'][_0x38e50b(0x312)](this,_0x5b382b,_0x3456e5,_0x150f71);},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x1ab)]=function(_0x1cb004,_0x37f27c){const _0x140003=_0x38b2d5,_0x3a3fd0=VisuMZ[_0x140003(0x2b7)]['Settings'][_0x140003(0xd7)][_0x140003(0x392)]||[],_0x3762b8=ConfigManager[_0x140003(0x326)];let _0x55979a=_0x3a3fd0[_0x140003(0x43c)](_0x3762b8);_0x55979a+=_0x1cb004?0x1:-0x1;if(_0x55979a>=_0x3a3fd0[_0x140003(0x8b)])_0x55979a=_0x37f27c?0x0:_0x3a3fd0[_0x140003(0x8b)]-0x1;if(_0x55979a<0x0)_0x55979a=_0x37f27c?_0x3a3fd0[_0x140003(0x8b)]-0x1:0x0;this[_0x140003(0x28b)](_0x140003(0x326),_0x3a3fd0[_0x55979a]);},Window_Options[_0x38b2d5(0x187)][_0x38b2d5(0x3c0)]=function(_0x20c73e,_0x27400b,_0x36f4ed){const _0x5efeae=_0x38b2d5,_0x48b76b=this[_0x5efeae(0x15f)](_0x20c73e),_0x53c157=0x1,_0x18cef1=_0x48b76b+(_0x27400b?_0x53c157:-_0x53c157);_0x18cef1>0xb&&_0x36f4ed?'TkCSN'===_0x5efeae(0x3dc)?_0x1d8a4d['x']=this[_0x5efeae(0x13f)]+_0x50e217:this[_0x5efeae(0x28b)](_0x20c73e,0x1):this[_0x5efeae(0x28b)](_0x20c73e,_0x18cef1['clamp'](0x1,0xb));},Window_Message['prototype'][_0x38b2d5(0x467)]=function(){const _0x3ac89c=_0x38b2d5;let _0xf92bca=Window_Base[_0x3ac89c(0x187)][_0x3ac89c(0x467)][_0x3ac89c(0x312)](this);return _0xf92bca-=this[_0x3ac89c(0x19a)](),_0xf92bca;},Window_Message['prototype'][_0x38b2d5(0x423)]=function(){const _0xcdf290=_0x38b2d5;Window_Base['prototype'][_0xcdf290(0x423)][_0xcdf290(0x312)](this),VisuMZ[_0xcdf290(0x2b7)][_0xcdf290(0x2a5)][_0xcdf290(0x169)][_0xcdf290(0x1b1)]&&this[_0xcdf290(0x399)]();},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x399)]=function(){const _0x5bd2c9=_0x38b2d5;this[_0x5bd2c9(0x1ef)]['x']=Math[_0x5bd2c9(0x11f)](this[_0x5bd2c9(0x13f)]/0x2),this['_dimmerSprite'][_0x5bd2c9(0x37d)]['x']=0.5,this['_dimmerSprite'][_0x5bd2c9(0x3f5)]['x']=Graphics[_0x5bd2c9(0x13f)];},VisuMZ[_0x38b2d5(0x2b7)]['Window_Message_clearFlags']=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x14d)],Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x14d)]=function(){const _0x2e619b=_0x38b2d5;VisuMZ['MessageCore']['Window_Message_clearFlags'][_0x2e619b(0x312)](this),this[_0x2e619b(0x103)](),this['resetWordWrap'](),this[_0x2e619b(0x211)](![]),this[_0x2e619b(0x342)](_0x2e619b(0x3e3)),this['setTextDelay'](VisuMZ['MessageCore']['Settings'][_0x2e619b(0x169)][_0x2e619b(0x1ea)]);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x3eb)]=function(){const _0x5c5516=_0x38b2d5;this[_0x5c5516(0x13b)]($gameSystem[_0x5c5516(0x28f)]());},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x101)]=function(){return!![];},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x405)]=function(_0x54797){const _0x1bc02b=_0x38b2d5,_0x484941=0xb-ConfigManager[_0x1bc02b(0x314)];_0x54797=Math[_0x1bc02b(0x11f)](_0x54797*_0x484941),this['_textDelayCount']=_0x54797,this[_0x1bc02b(0xbc)]=_0x54797;},VisuMZ['MessageCore'][_0x38b2d5(0x2f0)]=Window_Message[_0x38b2d5(0x187)]['isTriggered'],Window_Message[_0x38b2d5(0x187)]['isTriggered']=function(){const _0x53bffb=_0x38b2d5;return VisuMZ[_0x53bffb(0x2b7)][_0x53bffb(0x2f0)][_0x53bffb(0x312)](this)||Input[_0x53bffb(0x462)](VisuMZ['MessageCore']['Settings']['General'][_0x53bffb(0x444)]);},VisuMZ['MessageCore'][_0x38b2d5(0x1bc)]=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x284)],Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x284)]=function(){const _0x2f6b1f=_0x38b2d5;let _0x1e8520=this['y'];this['x']=Math[_0x2f6b1f(0x11f)]((Graphics['boxWidth']-this['width'])/0x2),VisuMZ[_0x2f6b1f(0x2b7)][_0x2f6b1f(0x1bc)][_0x2f6b1f(0x312)](this);if(this[_0x2f6b1f(0x304)])this['y']=_0x1e8520;this['updateXyOffsets'](),this['updateForcedPlacement'](),this['clampPlacementPosition'](),this[_0x2f6b1f(0x1e2)]();},VisuMZ[_0x38b2d5(0x2b7)]['Window_Message_newPage']=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x291)],Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x291)]=function(_0x33ca84){const _0x945651=_0x38b2d5;this[_0x945651(0x482)](_0x33ca84),this['onNewPageMessageCore'](_0x33ca84),VisuMZ[_0x945651(0x2b7)][_0x945651(0x352)][_0x945651(0x312)](this,_0x33ca84),this[_0x945651(0x305)]();},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x482)]=function(_0x580b93){const _0x427718=_0x38b2d5;if(!_0x580b93)return;this[_0x427718(0x13d)]=![],_0x580b93[_0x427718(0x394)]=this[_0x427718(0x2d7)](_0x580b93[_0x427718(0x394)]),this[_0x427718(0x3c3)]&&(_0x580b93[_0x427718(0x394)]=this[_0x427718(0x23b)](_0x580b93['text']),this[_0x427718(0x13d)]=!![]);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x23b)]=function(_0x1d73b5){const _0x27349e=_0x38b2d5;if(this[_0x27349e(0x13d)])return _0x1d73b5;return Window_Base[_0x27349e(0x187)]['prepareWordWrapEscapeCharacters']['call'](this,_0x1d73b5);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x309)]=function(_0xc86500){const _0x4c74d2=_0x38b2d5;this['prepareForcedPositionEscapeCharacters'](_0xc86500),this['prepareAutoSizeEscapeCharacters'](_0xc86500),this[_0x4c74d2(0x80)]();},VisuMZ['MessageCore'][_0x38b2d5(0x47e)]=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x236)],Window_Message[_0x38b2d5(0x187)]['terminateMessage']=function(){const _0x1ce853=_0x38b2d5;VisuMZ[_0x1ce853(0x2b7)][_0x1ce853(0x47e)][_0x1ce853(0x312)](this),this['clearFlags']();if(this[_0x1ce853(0xa8)])this['messagePositionReset']();},Window_Message[_0x38b2d5(0x187)]['updateDimensions']=function(){const _0x2bea56=_0x38b2d5;this[_0x2bea56(0x13f)]=$gameSystem[_0x2bea56(0x107)]()+this[_0x2bea56(0x156)]();;this[_0x2bea56(0x13f)]=Math[_0x2bea56(0x369)](Graphics[_0x2bea56(0x13f)],this[_0x2bea56(0x13f)]);const _0x2d3bd1=$gameSystem['getMessageWindowRows']();this[_0x2bea56(0x42b)]=SceneManager[_0x2bea56(0x490)][_0x2bea56(0x179)](_0x2d3bd1,![])+this['addedHeight'](),this[_0x2bea56(0x42b)]=Math['min'](Graphics[_0x2bea56(0x42b)],this[_0x2bea56(0x42b)]);if($gameTemp['_centerMessageWindow'])this[_0x2bea56(0x2c7)]();},Window_Message[_0x38b2d5(0x187)]['addedWidth']=function(){return 0x0;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x19a)]=function(){return 0x0;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x2c7)]=function(){const _0x389e79=_0x38b2d5;this['x']=(Graphics['boxWidth']-this[_0x389e79(0x13f)])/0x2,$gameTemp[_0x389e79(0x2e6)]=undefined,this[_0x389e79(0x1d0)]();},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0xae)]=function(){const _0x53c65d=_0x38b2d5,_0x5d743a={'x':this['x'],'y':this['y']};Window_Base[_0x53c65d(0x187)]['updateMove'][_0x53c65d(0x312)](this),this[_0x53c65d(0x3aa)](_0x5d743a);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x3bd)]=function(){return!![];},Window_Message['prototype'][_0x38b2d5(0x3aa)]=function(_0x40e0ca){const _0x4e93c3=_0x38b2d5;this[_0x4e93c3(0x217)]&&(this[_0x4e93c3(0x217)]['x']+=this['x']-_0x40e0ca['x'],this[_0x4e93c3(0x217)]['y']+=this['y']-_0x40e0ca['y']);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x23d)]=function(_0x35b084,_0x1edb0b){const _0x3f853e=_0x38b2d5;this['moveTo'](this[_0x3f853e(0x272)]['x'],this[_0x3f853e(0x3ff)]*(Graphics[_0x3f853e(0x413)]-this[_0x3f853e(0x42b)])/0x2,this[_0x3f853e(0x272)][_0x3f853e(0x13f)],this[_0x3f853e(0x272)]['height'],_0x35b084,_0x1edb0b);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x154)]=function(_0x4e23a3){const _0x4f4691=_0x38b2d5,_0x261f35=Window_Base['prototype'][_0x4f4691(0x154)][_0x4f4691(0x312)](this,_0x4e23a3);_0x4e23a3[_0x4f4691(0x251)]&&this[_0x4f4691(0x3d2)](_0x261f35);},Window_Message['prototype'][_0x38b2d5(0x3d2)]=function(_0x30cf17){const _0xe7355a=_0x38b2d5;if($gameParty['inBattle']()){}else{if('KHsHL'===_0xe7355a(0x3c4)){let _0x300567=_0x38f3c1['MessageCore'][_0xe7355a(0x3f8)][_0xe7355a(0x312)](this);const _0x26ee56=_0x439ce4[_0xe7355a(0x2b7)][_0xe7355a(0x2a5)];if(_0x26ee56['TextSpeed'][_0xe7355a(0x2df)]){_0x26ee56[_0xe7355a(0xd7)][_0xe7355a(0x494)]&&_0x266989[_0xe7355a(0x164)]()&&_0x300567++;if(_0x26ee56[_0xe7355a(0x28c)]['AddOption'])_0x300567++;}return _0x300567;}else $gameMap[_0xe7355a(0x44a)](_0x30cf17);}},Window_Message['prototype'][_0x38b2d5(0x195)]=function(_0x58f327){const _0x636a61=_0x38b2d5;this[_0x636a61(0x421)]--,this[_0x636a61(0x421)]<=0x0&&(this['onProcessCharacter'](_0x58f327),Window_Base[_0x636a61(0x187)]['processCharacter']['call'](this,_0x58f327));},Window_Message[_0x38b2d5(0x187)]['onProcessCharacter']=function(_0x57cc7e){const _0xe8d911=_0x38b2d5;this[_0xe8d911(0x421)]=this[_0xe8d911(0xbc)];if(this[_0xe8d911(0xbc)]<=0x0)this[_0xe8d911(0x1ae)]=!![];},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x44e)]=Window_Message['prototype'][_0x38b2d5(0xc8)],Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0xc8)]=function(_0x3956eb,_0x3f3a53){const _0x5498e5=_0x38b2d5;!_0x3f3a53['drawing']?Window_Base[_0x5498e5(0x187)][_0x5498e5(0xc8)][_0x5498e5(0x312)](this,_0x3956eb,_0x3f3a53):VisuMZ[_0x5498e5(0x2b7)][_0x5498e5(0x44e)]['call'](this,_0x3956eb,_0x3f3a53);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x182)]=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0xcd)],Window_Message['prototype'][_0x38b2d5(0xcd)]=function(_0x46dc77){const _0x5eef79=_0x38b2d5;if(this[_0x5eef79(0x206)])return![];return VisuMZ[_0x5eef79(0x2b7)][_0x5eef79(0x182)][_0x5eef79(0x312)](this,_0x46dc77);},Window_Message['prototype']['prepareForcedPositionEscapeCharacters']=function(_0xc97d8e){const _0x19a63e=_0x38b2d5;let _0x5e2d36=_0xc97d8e[_0x19a63e(0x394)];this['_forcedPosition']={};if(this[_0x19a63e(0x402)]())return _0x5e2d36;_0x5e2d36=_0x5e2d36['replace'](/<POSITION:[ ]*(.*?)>/gi,(_0x42dca3,_0x36ccdd)=>{const _0x347503=_0x19a63e,_0x53cdb7=_0x36ccdd[_0x347503(0x2b4)](',')['map'](_0x2de4b4=>Number(_0x2de4b4)||0x0);if(_0x53cdb7[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x53cdb7[0x0]);if(_0x53cdb7[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x53cdb7[0x1]);if(_0x53cdb7[0x2]!==undefined)this[_0x347503(0x1a2)][_0x347503(0x13f)]=Number(_0x53cdb7[0x2]);if(_0x53cdb7[0x3]!==undefined)this[_0x347503(0x1a2)][_0x347503(0x42b)]=Number(_0x53cdb7[0x3]);return'';}),_0x5e2d36=_0x5e2d36[_0x19a63e(0x18f)](/<COORDINATES:[ ]*(.*?)>/gi,(_0x15a425,_0x512ccc)=>{const _0x2a13e7=_0x19a63e;if(_0x2a13e7(0xbb)!==_0x2a13e7(0xbb)){const _0x17bb22=_0x23ad73[_0x2a13e7(0x386)]();if(_0x17bb22['id']<0x0)return'';let _0x55d103=null;if(_0x17bb22[_0x2a13e7(0x263)]===0x0)_0x55d103=_0x4590b9[_0x17bb22['id']];if(_0x17bb22['type']===0x1)_0x55d103=_0x264ce8[_0x17bb22['id']];if(_0x17bb22[_0x2a13e7(0x263)]===0x2)_0x55d103=_0x4eff89[_0x17bb22['id']];if(!_0x55d103)return'';return _0x559f3c?_0x2a13e7(0x29e)[_0x2a13e7(0xd8)](_0x55d103['iconIndex'],_0x55d103[_0x2a13e7(0x269)]):_0x55d103[_0x2a13e7(0x269)];}else{const _0x4a8119=_0x512ccc[_0x2a13e7(0x2b4)](',')[_0x2a13e7(0x34e)](_0x330b77=>Number(_0x330b77)||0x0);if(_0x4a8119[0x0]!==undefined)this[_0x2a13e7(0x1a2)]['x']=Number(_0x4a8119[0x0]);if(_0x4a8119[0x1]!==undefined)this[_0x2a13e7(0x1a2)]['y']=Number(_0x4a8119[0x1]);return'';}}),_0x5e2d36=_0x5e2d36['replace'](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x58ae65,_0x16128f)=>{const _0x5b6e2e=_0x19a63e,_0x381982=_0x16128f[_0x5b6e2e(0x2b4)](',')[_0x5b6e2e(0x34e)](_0x5e048a=>Number(_0x5e048a)||0x0);if(_0x381982[0x0]!==undefined)this['_forcedPosition'][_0x5b6e2e(0x13f)]=Number(_0x381982[0x2]);if(_0x381982[0x1]!==undefined)this[_0x5b6e2e(0x1a2)][_0x5b6e2e(0x42b)]=Number(_0x381982[0x3]);return'';}),_0x5e2d36=_0x5e2d36['replace'](/<OFFSET:[ ]*(.*?)>/gi,(_0x25c49b,_0x313e88)=>{const _0x3a0452=_0x19a63e,_0x794e00=_0x313e88[_0x3a0452(0x2b4)](',')[_0x3a0452(0x34e)](_0x53e18b=>Number(_0x53e18b)||0x0);let _0x13d476=_0x794e00[0x0]||0x0,_0x440280=_0x794e00[0x1]||0x0;return $gameSystem[_0x3a0452(0x166)](_0x13d476,_0x440280),'';}),_0xc97d8e['text']=_0x5e2d36;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x2f9)]=function(){const _0x24d3cd=_0x38b2d5,_0x92f275=$gameSystem[_0x24d3cd(0x2ba)]();this['x']+=_0x92f275['x'],this['y']+=_0x92f275['y'];},Window_Message[_0x38b2d5(0x187)]['updateForcedPlacement']=function(){const _0x5596a5=_0x38b2d5;this['_forcedPosition']=this[_0x5596a5(0x1a2)]||{};const _0x3d53de=['x','y',_0x5596a5(0x13f),_0x5596a5(0x42b)];for(const _0x118e16 of _0x3d53de){this[_0x5596a5(0x1a2)][_0x118e16]!==undefined&&(this[_0x118e16]=Number(this['_forcedPosition'][_0x118e16]));}},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x219)]=function(_0x5a07a6){const _0x14bdd6=_0x38b2d5;this[_0x14bdd6(0x206)]=![];let _0x5eaeb0=_0x5a07a6[_0x14bdd6(0x394)];_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x58f245=_0x14bdd6;return this[_0x58f245(0x124)](_0x5eaeb0,!![],!![]),this['processAutoPosition']('none'),'';}),_0x5eaeb0=_0x5eaeb0['replace'](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x34e8c8=_0x14bdd6;return _0x34e8c8(0x2d0)===_0x34e8c8(0x48b)?0x0:(this[_0x34e8c8(0x124)](_0x5eaeb0,!![],![]),this[_0x34e8c8(0x1dc)](_0x34e8c8(0x26c)),'');}),_0x5eaeb0=_0x5eaeb0['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x1fd8b1=_0x14bdd6;if('tPQYO'==='LhnjF'){const _0x2becf0=this[_0x1fd8b1(0xc6)](_0x4e4710)['split'](',');if(!_0x49b86c[_0x1fd8b1(0x251)])return;const _0x56f770=_0x2becf0[0x0][_0x1fd8b1(0x2bc)](),_0x41b401=_0x2becf0[0x1]||0x0,_0x1cf48b=_0x2becf0[0x2]||0x0,_0x113849=_0x39e5d3[_0x1fd8b1(0x1c7)](_0x56f770),_0x53a8ba=this[_0x1fd8b1(0x48f)]['paintOpacity'];_0x113849[_0x1fd8b1(0x1b9)](this[_0x1fd8b1(0x10c)][_0x1fd8b1(0xa0)](this,_0x113849,_0x3ecd5a['x'],_0x52292f['y'],_0x41b401,_0x1cf48b,_0x53a8ba));}else return this[_0x1fd8b1(0x124)](_0x5eaeb0,![],!![]),this[_0x1fd8b1(0x1dc)](_0x1fd8b1(0x26c)),'';});if(SceneManager[_0x14bdd6(0x26d)]())_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x200617,_0x4bee16)=>{const _0x19eefe=_0x14bdd6;return this[_0x19eefe(0x124)](_0x5eaeb0,!![],!![]),this[_0x19eefe(0x1dc)](_0x19eefe(0x74),Number(_0x4bee16)||0x1),'';}),_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x24b8cd,_0xf904eb)=>{const _0x5b5cf1=_0x14bdd6;return this[_0x5b5cf1(0x124)](_0x5eaeb0,!![],!![]),this[_0x5b5cf1(0x1dc)](_0x5b5cf1(0x310),Number(_0xf904eb)||0x0),'';}),_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0xc9c23d,_0xb84f84)=>{const _0x46548e=_0x14bdd6;return this['processAutoSize'](_0x5eaeb0,!![],!![]),this['processAutoPosition'](_0x46548e(0x302),Number(_0xb84f84)||0x0),'';});else SceneManager['isSceneMap']()&&(_0x5eaeb0=_0x5eaeb0['replace'](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x3b6207,_0x3c1315)=>{const _0x1c115c=_0x14bdd6;return this['processAutoSize'](_0x5eaeb0,!![],!![]),this['processAutoPosition'](_0x1c115c(0x105),0x0),'';}),_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2d84fa,_0x221f7d)=>{const _0x5dcd5f=_0x14bdd6;return this['processAutoSize'](_0x5eaeb0,!![],!![]),this[_0x5dcd5f(0x1dc)]('map\x20actor',Number(_0x221f7d)||0x1),'';}),_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x4a554c,_0x478d68)=>{const _0x1d23d5=_0x14bdd6;return this[_0x1d23d5(0x124)](_0x5eaeb0,!![],!![]),this[_0x1d23d5(0x1dc)](_0x1d23d5(0x260),Number(_0x478d68)||0x0),'';}),_0x5eaeb0=_0x5eaeb0[_0x14bdd6(0x18f)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x2b6141,_0x2f770d)=>{const _0x4acf35=_0x14bdd6;return this[_0x4acf35(0x124)](_0x5eaeb0,!![],!![]),this['processAutoPosition']('map\x20event',Number(_0x2f770d)||0x0),'';}));_0x5a07a6['text']=_0x5eaeb0;},Window_Message['_autoSizeRegexp']=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x38b2d5(0x23a)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message['prototype'][_0x38b2d5(0x124)]=function(_0x5b5ca1,_0xd0b1d1,_0x1a6149){const _0x460a90=_0x38b2d5;_0x5b5ca1=_0x5b5ca1[_0x460a90(0x18f)](Window_Message[_0x460a90(0x77)],''),_0x5b5ca1=_0x5b5ca1[_0x460a90(0x18f)](Window_Message[_0x460a90(0x23a)],''),this[_0x460a90(0x40a)]=!![],this[_0x460a90(0x206)]=!![],this[_0x460a90(0x13b)](![]);const _0x4a23b0=this[_0x460a90(0x25f)](_0x5b5ca1);if(_0xd0b1d1){let _0x393b88=_0x4a23b0['width']+$gameSystem['windowPadding']()*0x2+0x6;const _0x327b49=$gameMessage[_0x460a90(0x496)]()!=='',_0x1d75f0=ImageManager[_0x460a90(0x322)],_0x204f4a=0x14;_0x393b88+=_0x327b49?_0x1d75f0+_0x204f4a:0x4;if(_0x393b88%0x2!==0x0)_0x393b88+=0x1;$gameSystem[_0x460a90(0x2e1)](_0x393b88);}if(_0x1a6149){let _0x344ece=Math['ceil'](_0x4a23b0[_0x460a90(0x42b)]/this['lineHeight']());$gameSystem[_0x460a90(0x37a)](_0x344ece);}this[_0x460a90(0x2a4)](),this['_refreshPauseSign'](),this[_0x460a90(0x40a)]=![],this[_0x460a90(0xa8)]=!![];},Window_Message['prototype'][_0x38b2d5(0x2a4)]=function(){const _0x314d96=_0x38b2d5;this[_0x314d96(0x80)](),this['updatePlacement'](),this['resetPositionX'](),this[_0x314d96(0xd6)](),this[_0x314d96(0x48f)]['clear'](),this[_0x314d96(0x305)]();},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x1dc)]=function(_0x34f839,_0x30fc07){const _0x4f4d2b=_0x38b2d5;switch(_0x34f839[_0x4f4d2b(0xef)]()[_0x4f4d2b(0x2bc)]()){case'battle\x20actor':this[_0x4f4d2b(0x304)]=$gameActors[_0x4f4d2b(0x2dd)](_0x30fc07);break;case _0x4f4d2b(0x310):this[_0x4f4d2b(0x304)]=$gameParty[_0x4f4d2b(0x242)]()[_0x30fc07-0x1];break;case _0x4f4d2b(0x302):this['_autoPositionTarget']=$gameTroop[_0x4f4d2b(0x242)]()[_0x30fc07-0x1];break;case'map\x20player':this[_0x4f4d2b(0x304)]=$gamePlayer;break;case _0x4f4d2b(0x44d):const _0x152834=$gameActors[_0x4f4d2b(0x2dd)](_0x30fc07)[_0x4f4d2b(0xe5)]();if(_0x152834===0x0)this[_0x4f4d2b(0x304)]=$gamePlayer;else{if(_0x4f4d2b(0x2c4)===_0x4f4d2b(0x2c4))this[_0x4f4d2b(0x304)]=$gamePlayer[_0x4f4d2b(0x11e)]()[_0x4f4d2b(0x427)](_0x152834-0x1);else{this['obtainEscapeParam'](_0x168861);if(this[_0x4f4d2b(0x3ca)]())return;_0x5e07de[_0x4f4d2b(0x251)]&&(this[_0x4f4d2b(0xc5)]=this[_0x4f4d2b(0xc5)]||[],this[_0x4f4d2b(0x48f)][_0x4f4d2b(0x307)]=this[_0x4f4d2b(0xc5)][_0x4f4d2b(0x276)]()||_0x1f93b7[_0x4f4d2b(0x139)]());}}break;case'map\x20party':if(_0x30fc07===0x1)this[_0x4f4d2b(0x304)]=$gamePlayer;else{if(_0x4f4d2b(0x433)===_0x4f4d2b(0x433))this[_0x4f4d2b(0x304)]=$gamePlayer[_0x4f4d2b(0x11e)]()[_0x4f4d2b(0x427)](_0x30fc07-0x2);else{if(this[_0x4f4d2b(0x3f2)]===_0x4805a2)this[_0x4f4d2b(0x174)]();if(this[_0x4f4d2b(0x3f2)][_0x4f4d2b(0x2c6)]===_0x7000f6)this[_0x4f4d2b(0x174)]();return this[_0x4f4d2b(0x3f2)]['helpWordWrap'];}}break;case _0x4f4d2b(0x396):this[_0x4f4d2b(0x304)]=$gameMap['event'](_0x30fc07);break;}this['_autoPositionTarget']&&this['updateAutoPosition']();},VisuMZ['MessageCore'][_0x38b2d5(0x1f1)]=Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x360)],Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x360)]=function(){const _0x2ade9c=_0x38b2d5;this[_0x2ade9c(0x418)](),VisuMZ[_0x2ade9c(0x2b7)][_0x2ade9c(0x1f1)][_0x2ade9c(0x312)](this);},Window_Message['prototype']['updateAutoPosition']=function(){const _0x1a3607=_0x38b2d5;if(!this[_0x1a3607(0x304)])return;const _0x17bb31=SceneManager['_scene'];if(!_0x17bb31)return;const _0x5a0854=_0x17bb31['_spriteset'];if(!_0x5a0854)return;const _0x4f57d0=_0x5a0854[_0x1a3607(0x146)](this[_0x1a3607(0x304)]);if(!_0x4f57d0)return;let _0x5a7f6e=_0x4f57d0['x'];if(SceneManager[_0x1a3607(0xad)]()){if(_0x1a3607(0x1ca)===_0x1a3607(0x1ca))_0x5a7f6e*=$gameScreen[_0x1a3607(0x353)]();else return _0x106cde=_0x5be8b1[_0x1a3607(0x455)](_0x4e7d1d),_0x26f879;}else{if(SceneManager[_0x1a3607(0x26d)]()&&Imported[_0x1a3607(0x301)]){let _0x533e9c=_0x4f57d0['x']-Graphics[_0x1a3607(0x465)]*_0x5a0854[_0x1a3607(0x37d)]['x'];_0x5a7f6e+=_0x533e9c*(_0x5a0854['scale']['x']-0x1);}}_0x5a7f6e-=this['width']/0x2,_0x5a7f6e-=(Graphics[_0x1a3607(0x13f)]-Graphics[_0x1a3607(0x465)])/0x2,_0x5a7f6e+=this[_0x1a3607(0x3c1)]();let _0x1b55ed=_0x4f57d0['y'];if(SceneManager[_0x1a3607(0xad)]()){if(_0x1a3607(0x2ed)!=='fxCOT'){this['_textDelayCount']=this['_textDelay'];if(this['_textDelay']<=0x0)this[_0x1a3607(0x1ae)]=!![];}else _0x1b55ed-=_0x4f57d0[_0x1a3607(0x42b)]+0x8,_0x1b55ed*=$gameScreen[_0x1a3607(0x353)](),_0x1b55ed-=this['height']*$gameScreen['zoomScale']();}else{if(SceneManager[_0x1a3607(0x26d)]()&&Imported['VisuMZ_3_ActSeqCamera']){let _0x4f05c9=_0x4f57d0[_0x1a3607(0x42b)]*_0x5a0854[_0x1a3607(0x3f5)]['y'];_0x1b55ed-=this[_0x1a3607(0x42b)]*_0x5a0854[_0x1a3607(0x3f5)]['y']+_0x4f05c9+0x8;let _0x2f9e44=_0x4f57d0['y']-Graphics[_0x1a3607(0x413)]*_0x5a0854['anchor']['y'];_0x1b55ed+=_0x2f9e44*(_0x5a0854[_0x1a3607(0x3f5)]['y']-0x1);}else _0x1b55ed-=_0x4f57d0[_0x1a3607(0x42b)]+0x8,_0x1b55ed-=this[_0x1a3607(0x42b)];}_0x1b55ed-=(Graphics['height']-Graphics[_0x1a3607(0x413)])/0x2,_0x1b55ed+=this[_0x1a3607(0xbe)]();const _0x4a2baa=$gameSystem[_0x1a3607(0x2ba)]();_0x5a7f6e+=_0x4a2baa['x'],_0x1b55ed+=_0x4a2baa['y'],this['x']=Math['round'](_0x5a7f6e),this['y']=Math['round'](_0x1b55ed),this[_0x1a3607(0x1d0)](!![],![]),this[_0x1a3607(0x1a2)]=this[_0x1a3607(0x1a2)]||{},this[_0x1a3607(0x1a2)]['x']=this['x'],this[_0x1a3607(0x1a2)]['y']=this['y'],this[_0x1a3607(0x1a2)][_0x1a3607(0x13f)]=this[_0x1a3607(0x13f)],this[_0x1a3607(0x1a2)]['height']=this[_0x1a3607(0x42b)],this[_0x1a3607(0x217)]['updatePlacement']();},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x3c1)]=function(){return 0x0;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0xbe)]=function(){return 0x0;},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x2a1)]=function(){const _0x1fba95=_0x38b2d5;this['_messagePositionReset']=![],this[_0x1fba95(0x304)]=undefined,$gameSystem[_0x1fba95(0x174)](),this[_0x1fba95(0x2a4)](),this[_0x1fba95(0x492)]=0x0;},Window_Message['prototype']['preConvertEscapeCharacters']=function(_0x29123a){const _0x38f54c=_0x38b2d5;return Window_Base[_0x38f54c(0x187)][_0x38f54c(0x27b)][_0x38f54c(0x312)](this,_0x29123a);},Window_Message[_0x38b2d5(0x187)]['postConvertEscapeCharacters']=function(_0x38ebe2){const _0x5a8efd=_0x38b2d5;return Window_Base[_0x5a8efd(0x187)]['postConvertEscapeCharacters'][_0x5a8efd(0x312)](this,_0x38ebe2);},Window_Message[_0x38b2d5(0x187)]['flushTextState']=function(_0x231cad){const _0x18a7d3=_0x38b2d5;this[_0x18a7d3(0x223)](_0x231cad),Window_Base[_0x18a7d3(0x187)][_0x18a7d3(0x188)][_0x18a7d3(0x312)](this,_0x231cad),this[_0x18a7d3(0x45b)](_0x231cad);},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x223)]=function(_0x14e4c6){},Window_Message[_0x38b2d5(0x187)][_0x38b2d5(0x45b)]=function(_0x211b87){},Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x101)]=function(){return![];},Window_NameBox[_0x38b2d5(0x187)]['resetTextColor']=function(){const _0x478b31=_0x38b2d5;Window_Base[_0x478b31(0x187)][_0x478b31(0x199)]['call'](this),this[_0x478b31(0x3a8)](this[_0x478b31(0x7d)]());},Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x7d)]=function(){const _0x387557=_0x38b2d5,_0x13e430=VisuMZ[_0x387557(0x2b7)]['Settings'][_0x387557(0x169)][_0x387557(0x3d9)];return ColorManager[_0x387557(0x307)](_0x13e430);},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x257)]=Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x284)],Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x284)]=function(){const _0xf9e32c=_0x38b2d5;VisuMZ[_0xf9e32c(0x2b7)][_0xf9e32c(0x257)][_0xf9e32c(0x312)](this),this[_0xf9e32c(0x271)](),this[_0xf9e32c(0x40b)](),this[_0xf9e32c(0x1d0)](),this[_0xf9e32c(0x1f4)]();},Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x27b)]=function(_0x53dc2c){const _0x21e621=_0x38b2d5;return _0x53dc2c=_0x53dc2c['replace'](/<LEFT>/gi,this[_0x21e621(0x122)][_0x21e621(0xa0)](this,0x0)),_0x53dc2c=_0x53dc2c[_0x21e621(0x18f)](/<CENTER>/gi,this[_0x21e621(0x122)][_0x21e621(0xa0)](this,0x5)),_0x53dc2c=_0x53dc2c[_0x21e621(0x18f)](/<RIGHT>/gi,this['setRelativePosition'][_0x21e621(0xa0)](this,0xa)),_0x53dc2c=_0x53dc2c[_0x21e621(0x18f)](/<POSITION:[ ](\d+)>/gi,(_0x456587,_0x122f57)=>this['setRelativePosition'](parseInt(_0x122f57))),_0x53dc2c=_0x53dc2c[_0x21e621(0x18f)](/<\/LEFT>/gi,''),_0x53dc2c=_0x53dc2c['replace'](/<\/CENTER>/gi,''),_0x53dc2c=_0x53dc2c[_0x21e621(0x18f)](/<\/RIGHT>/gi,''),_0x53dc2c=_0x53dc2c[_0x21e621(0x2bc)](),Window_Base[_0x21e621(0x187)][_0x21e621(0x27b)][_0x21e621(0x312)](this,_0x53dc2c);},Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x122)]=function(_0x3a97ff){const _0x5eec48=_0x38b2d5;return this[_0x5eec48(0x395)]=_0x3a97ff,'';},Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x271)]=function(){const _0x24b3cb=_0x38b2d5;if($gameMessage['isRTL']())return;this[_0x24b3cb(0x395)]=this[_0x24b3cb(0x395)]||0x0;const _0x51081d=this[_0x24b3cb(0x33f)],_0x2f0b3e=Math[_0x24b3cb(0x484)](_0x51081d[_0x24b3cb(0x13f)]*this[_0x24b3cb(0x395)]/0xa);this['x']=_0x51081d['x']+_0x2f0b3e-Math[_0x24b3cb(0x484)](this[_0x24b3cb(0x13f)]/0x2),this['x']=this['x'][_0x24b3cb(0x26a)](_0x51081d['x'],_0x51081d['x']+_0x51081d[_0x24b3cb(0x13f)]-this[_0x24b3cb(0x13f)]);},Window_NameBox[_0x38b2d5(0x187)]['updateOffsetPosition']=function(){const _0x5a7fe8=_0x38b2d5;if($gameMessage['isRTL']())return;this[_0x5a7fe8(0x395)]=this[_0x5a7fe8(0x395)]||0x0;const _0x1a2e22=VisuMZ[_0x5a7fe8(0x2b7)][_0x5a7fe8(0x2a5)][_0x5a7fe8(0x169)]['NameBoxWindowOffsetX'],_0x302bd3=VisuMZ[_0x5a7fe8(0x2b7)]['Settings'][_0x5a7fe8(0x169)][_0x5a7fe8(0x32d)],_0x1c0936=(0x5-this[_0x5a7fe8(0x395)])/0x5;this['x']+=Math[_0x5a7fe8(0x484)](_0x1a2e22*_0x1c0936),this['y']+=_0x302bd3;},Window_NameBox['prototype'][_0x38b2d5(0x1f4)]=function(){const _0x5b90d=_0x38b2d5,_0x1ae9c3=this[_0x5b90d(0x33f)],_0x4350fe=_0x1ae9c3['y'],_0x3b69f5=VisuMZ['MessageCore'][_0x5b90d(0x2a5)][_0x5b90d(0x169)][_0x5b90d(0x32d)];_0x4350fe>this['y']&&_0x4350fe<this['y']+this[_0x5b90d(0x42b)]-_0x3b69f5&&(this['y']=_0x1ae9c3['y']+_0x1ae9c3[_0x5b90d(0x42b)]);},VisuMZ[_0x38b2d5(0x2b7)]['Window_NameBox_refresh']=Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x137)],Window_NameBox[_0x38b2d5(0x187)][_0x38b2d5(0x137)]=function(){const _0x1396ec=_0x38b2d5;this[_0x1396ec(0x395)]=0x0,VisuMZ[_0x1396ec(0x2b7)][_0x1396ec(0x215)]['call'](this);},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x402)]=function(){return![];},Window_ChoiceList['prototype'][_0x38b2d5(0x101)]=function(){return!![];},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x3a3)]=function(){const _0x2fac6f=_0x38b2d5;return $gameSystem[_0x2fac6f(0x1b8)]()+0x8;},Window_ChoiceList['prototype'][_0x38b2d5(0x240)]=function(){const _0x2e8f47=_0x38b2d5;return $gameSystem[_0x2e8f47(0x1cb)]();},Window_ChoiceList[_0x38b2d5(0x187)]['start']=function(){const _0xd99b9a=_0x38b2d5;this[_0xd99b9a(0x137)](),this[_0xd99b9a(0xec)](),this[_0xd99b9a(0x2ce)](),this[_0xd99b9a(0x151)]();},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0xd9)]=function(){const _0x2f3bc6=_0x38b2d5;$gameMessage['onChoice'](this['currentExt']()),this[_0x2f3bc6(0x33f)]['terminateMessage'](),this[_0x2f3bc6(0x1e7)](),this['_helpWindow']&&(this[_0x2f3bc6(0x3a2)]['clear'](),this[_0x2f3bc6(0x3a2)]['hide']());},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x1bd)]=Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x37f)],Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x37f)]=function(){const _0x240eb8=_0x38b2d5;VisuMZ[_0x240eb8(0x2b7)][_0x240eb8(0x1bd)]['call'](this),this[_0x240eb8(0x3a2)]&&(_0x240eb8(0x397)!==_0x240eb8(0x397)?(_0x4efb5e['setFaceImage'](_0x410006[0x0],_0xba5a9e[0x1]),_0xa31b4b['setBackground'](_0x4a7f73[0x2]),_0x3dc0a4[_0x240eb8(0x36b)](_0xe1d15[0x3]),_0x2079cd[_0x240eb8(0x250)](_0x5d0deb[0x4])):(this[_0x240eb8(0x3a2)][_0x240eb8(0xe6)](),this[_0x240eb8(0x3a2)][_0x240eb8(0x247)]()));},Window_ChoiceList['prototype'][_0x38b2d5(0x137)]=function(){const _0x2ac2ba=_0x38b2d5;this['clearCommandList'](),this[_0x2ac2ba(0x1cf)](),this[_0x2ac2ba(0x33f)]&&(this['updatePlacement'](),this[_0x2ac2ba(0x157)]()),this[_0x2ac2ba(0x305)](),this[_0x2ac2ba(0x181)](),this[_0x2ac2ba(0x423)](),Window_Selectable[_0x2ac2ba(0x187)]['refresh'][_0x2ac2ba(0x312)](this);},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x1cf)]=function(){const _0x3949e9=_0x38b2d5;if($gameMessage['_scriptCall']){if(_0x3949e9(0x390)!=='HpsKB')this['makeCommandListScriptCall']();else{this[_0x3949e9(0x3c3)]=![];for(const _0x5d2426 of _0x138fe2[_0x3949e9(0x2b7)][_0x3949e9(0x2a5)][_0x3949e9(0x17e)]){_0x4994fd&&_0x584110[_0x3949e9(0x3b4)](_0x5d2426[_0x3949e9(0x2a8)])&&(this['_textMacroFound']=!![],_0x2c438f=_0x1a7639[_0x3949e9(0x18f)](_0x5d2426['textCodeCheck'],_0x5d2426['textCodeResult']['bind'](this)));}return _0x24b7c8||'';}}else this[_0x3949e9(0x3b0)]();this[_0x3949e9(0x412)](),this[_0x3949e9(0x290)]();},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x37e)]=function(){const _0x2cb2e7=_0x38b2d5,_0x3516b6=$gameMessage['choices']();let _0x5304d2=0x0;for(let _0xf5e26c of _0x3516b6){_0xf5e26c=this[_0x2cb2e7(0x1ec)](_0xf5e26c);if(this[_0x2cb2e7(0xb7)](_0xf5e26c)){const _0x2172a9=this[_0x2cb2e7(0x323)](_0xf5e26c),_0x353104=this[_0x2cb2e7(0x410)](_0xf5e26c);this[_0x2cb2e7(0x40d)](_0x2172a9,_0x2cb2e7(0x34c),_0x353104,_0x5304d2);}_0x5304d2++;}},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x3b0)]=function(){const _0x5c01c7=_0x38b2d5,_0x58279a=$gameMessage[_0x5c01c7(0xd4)](),_0x2a6079=$gameMessage[_0x5c01c7(0x14b)](),_0x33b1a1=$gameMessage[_0x5c01c7(0x193)](),_0x5c04f7=_0x58279a[_0x5c01c7(0x8b)];let _0x185839=0x0;for(let _0x59cf59=0x0;_0x59cf59<_0x5c04f7;_0x59cf59++){if(this[_0x5c01c7(0x20a)][_0x5c01c7(0x8b)]>=_0x33b1a1)break;const _0x250c52=_0x2a6079[_0x59cf59];let _0x2618e1=_0x58279a[_0x250c52];if(_0x2618e1===undefined)continue;_0x2618e1=this['convertChoiceMacros'](_0x2618e1);if(this[_0x5c01c7(0xb7)](_0x2618e1)){const _0x1da126=this[_0x5c01c7(0x323)](_0x2618e1),_0x1f7562=this['isChoiceEnabled'](_0x2618e1);this[_0x5c01c7(0x40d)](_0x1da126,_0x5c01c7(0x34c),_0x1f7562,_0x250c52);}_0x185839++;}},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x1ec)]=function(_0x50ab2e){const _0x3f6a96=_0x38b2d5;return Window_Base[_0x3f6a96(0x187)][_0x3f6a96(0x2d7)][_0x3f6a96(0x312)](this,_0x50ab2e);},Window_ChoiceList['prototype'][_0x38b2d5(0xb7)]=function(_0x1c25df){const _0x1f1077=_0x38b2d5;if(Imported[_0x1f1077(0x2e5)])$gameMessage[_0x1f1077(0x436)]();if(_0x1c25df[_0x1f1077(0x3b4)](/<HIDE>/i))return![];if(_0x1c25df['match'](/<SHOW>/i))return!![];if(_0x1c25df['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x286e81=RegExp['$1'][_0x1f1077(0x2b4)](',')[_0x1f1077(0x34e)](_0x4bd1b4=>Number(_0x4bd1b4)||0x0);for(const _0x4997d6 of _0x286e81){if(_0x1f1077(0xea)==='EcNPR'){if(!$gameSwitches[_0x1f1077(0x499)](_0x4997d6))return![];}else{for(const _0x244bd7 of _0x2a2f46[_0x1f1077(0x2b7)]['Settings'][_0x1f1077(0x153)]){_0x235025[_0x1f1077(0x3b4)](_0x244bd7[_0x1f1077(0x2a8)])&&(_0x39b032=_0x2e2ce0[_0x1f1077(0x18f)](_0x244bd7[_0x1f1077(0x2a8)],_0x244bd7['textCodeResult']),_0x1c24b3=this['convertVariableEscapeCharacters'](_0x207a0b));}return _0x506eb9;}}return!![];}if(_0x1c25df[_0x1f1077(0x3b4)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x1f1077(0x334)===_0x1f1077(0x334)){const _0x31b0c2=RegExp['$1']['split'](',')[_0x1f1077(0x34e)](_0x4052f2=>Number(_0x4052f2)||0x0);for(const _0x4e45c5 of _0x31b0c2){if(!$gameSwitches['value'](_0x4e45c5))return![];}return!![];}else{let _0x57eb23=this['y'];this['x']=_0x526553[_0x1f1077(0x11f)]((_0x508dcc[_0x1f1077(0x465)]-this['width'])/0x2),_0x366b2b[_0x1f1077(0x2b7)]['Window_Message_updatePlacement'][_0x1f1077(0x312)](this);if(this[_0x1f1077(0x304)])this['y']=_0x57eb23;this[_0x1f1077(0x2f9)](),this['updateForcedPlacement'](),this[_0x1f1077(0x1d0)](),this[_0x1f1077(0x1e2)]();}}if(_0x1c25df[_0x1f1077(0x3b4)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5a3d3e=RegExp['$1'][_0x1f1077(0x2b4)](',')[_0x1f1077(0x34e)](_0x228402=>Number(_0x228402)||0x0);for(const _0x3f1edb of _0x5a3d3e){if(_0x1f1077(0x36c)!=='cITxi'){if($gameSwitches[_0x1f1077(0x499)](_0x3f1edb))return!![];}else _0x3235e3=_0x24d777[_0x1f1077(0x18f)](/\\V\[(\d+)\]/gi,(_0x5932b3,_0x13323c)=>this[_0x1f1077(0x325)](_0x590e0a(_0x1bf184[_0x1f1077(0x499)](_0x3c7b19(_0x13323c)))));}return![];}if(_0x1c25df[_0x1f1077(0x3b4)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x190756=RegExp['$1']['split'](',')['map'](_0x466d06=>Number(_0x466d06)||0x0);for(const _0x28815f of _0x190756){if(!$gameSwitches[_0x1f1077(0x499)](_0x28815f))return!![];}return![];}if(_0x1c25df[_0x1f1077(0x3b4)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x32837d=RegExp['$1']['split'](',')['map'](_0x42ad59=>Number(_0x42ad59)||0x0);for(const _0x462b01 of _0x32837d){if(!$gameSwitches['value'](_0x462b01))return!![];}return![];}if(_0x1c25df[_0x1f1077(0x3b4)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x56ed9b=RegExp['$1'][_0x1f1077(0x2b4)](',')[_0x1f1077(0x34e)](_0x48df41=>Number(_0x48df41)||0x0);for(const _0x4dcda3 of _0x56ed9b){if($gameSwitches[_0x1f1077(0x499)](_0x4dcda3))return![];}return!![];}return!![];},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x323)]=function(_0x500ab6){const _0x224b69=_0x38b2d5;let _0x2ec568=_0x500ab6;return _0x2ec568=_0x2ec568[_0x224b69(0x18f)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x2ec568=_0x2ec568[_0x224b69(0x18f)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x2ec568;},Window_ChoiceList[_0x38b2d5(0x187)]['isChoiceEnabled']=function(_0x8ba0f8){const _0x395e76=_0x38b2d5;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x395e76(0x436)]();if(_0x8ba0f8['match'](/<DISABLE>/i))return![];if(_0x8ba0f8[_0x395e76(0x3b4)](/<ENABLE>/i))return!![];if(_0x8ba0f8[_0x395e76(0x3b4)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('ebpxG'===_0x395e76(0x237)){if(!_0x3c16f2['value'](_0xf15b8e))return![];}else{const _0x559898=RegExp['$1']['split'](',')[_0x395e76(0x34e)](_0x58320d=>Number(_0x58320d)||0x0);for(const _0x1519c9 of _0x559898){if(!$gameSwitches[_0x395e76(0x499)](_0x1519c9))return![];}return!![];}}if(_0x8ba0f8[_0x395e76(0x3b4)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x395e76(0x478)===_0x395e76(0x478)){const _0x1ac1af=RegExp['$1'][_0x395e76(0x2b4)](',')[_0x395e76(0x34e)](_0x483f51=>Number(_0x483f51)||0x0);for(const _0x21b1ca of _0x1ac1af){if(!$gameSwitches[_0x395e76(0x499)](_0x21b1ca))return![];}return!![];}else{if(this[_0x395e76(0x3f2)]===_0x4ae405)this[_0x395e76(0x174)]();if(this['_MessageCoreSettings']['messageWordWrap']===_0x280e04)this['initMessageCore']();this[_0x395e76(0x3f2)][_0x395e76(0x245)]=_0x5198e2;}}if(_0x8ba0f8[_0x395e76(0x3b4)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x12a71f=RegExp['$1'][_0x395e76(0x2b4)](',')['map'](_0x5ebf57=>Number(_0x5ebf57)||0x0);for(const _0x115d89 of _0x12a71f){if('rTmXo'!==_0x395e76(0x131))this[_0x395e76(0x42f)](),this[_0x395e76(0x1cf)](),this[_0x395e76(0x33f)]&&(this[_0x395e76(0x284)](),this[_0x395e76(0x157)]()),this[_0x395e76(0x305)](),this[_0x395e76(0x181)](),this[_0x395e76(0x423)](),_0x56fdd1[_0x395e76(0x187)][_0x395e76(0x137)][_0x395e76(0x312)](this);else{if($gameSwitches['value'](_0x115d89))return!![];}}return![];}if(_0x8ba0f8[_0x395e76(0x3b4)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x401301=RegExp['$1'][_0x395e76(0x2b4)](',')['map'](_0x54de6d=>Number(_0x54de6d)||0x0);for(const _0x5d70c0 of _0x401301){if(!$gameSwitches[_0x395e76(0x499)](_0x5d70c0))return!![];}return![];}if(_0x8ba0f8['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2706a4=RegExp['$1'][_0x395e76(0x2b4)](',')[_0x395e76(0x34e)](_0xcf0e00=>Number(_0xcf0e00)||0x0);for(const _0xb9e2d of _0x2706a4){if(_0x395e76(0x1b6)===_0x395e76(0x1b6)){if(!$gameSwitches['value'](_0xb9e2d))return!![];}else return _0x1ae965[_0x395e76(0x308)];}return![];}if(_0x8ba0f8[_0x395e76(0x3b4)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x334fbf=RegExp['$1'][_0x395e76(0x2b4)](',')[_0x395e76(0x34e)](_0x30d6b0=>Number(_0x30d6b0)||0x0);for(const _0x52dd1e of _0x334fbf){if('SbWjs'==='SbWjs'){if($gameSwitches[_0x395e76(0x499)](_0x52dd1e))return![];}else{const _0x547c3d=[_0x395e76(0x458),_0x395e76(0x21a),_0x395e76(0x16d),_0x395e76(0x380),_0x395e76(0x2c5),_0x395e76(0x10e),_0x395e76(0x15b),_0x395e76(0xd2),'obtainGold',_0x395e76(0x160)];let _0x490482=_0x4d5b58[_0x395e76(0x2b7)][_0x395e76(0xd5)][_0x395e76(0x312)](this,_0x2fd34a);return _0x547c3d[_0x395e76(0x480)](_0x2c206d)&&(_0x490482=_0x395e76(0x221)+_0x490482),_0x490482;}}return!![];}return!![];},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x412)]=function(){const _0x40d966=_0x38b2d5;this['_choiceHelpDescriptions']={},this[_0x40d966(0x3a2)]&&(this['_helpWindow'][_0x40d966(0xe6)](),this[_0x40d966(0x3a2)][_0x40d966(0x247)]());},Window_ChoiceList['prototype'][_0x38b2d5(0x290)]=function(){const _0x3e751f=_0x38b2d5,_0x49b7a9=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x5a19c4 of this['_list']){if(_0x3e751f(0x2b2)===_0x3e751f(0x2b2)){if(!_0x5a19c4)continue;const _0x50585c=this[_0x3e751f(0x20a)][_0x3e751f(0x43c)](_0x5a19c4);if(_0x5a19c4[_0x3e751f(0x269)][_0x3e751f(0x3b4)](_0x49b7a9)){const _0x1a1604=String(RegExp['$1']);this[_0x3e751f(0xff)][_0x50585c]=_0x1a1604[_0x3e751f(0x2bc)](),_0x5a19c4[_0x3e751f(0x269)]=_0x5a19c4[_0x3e751f(0x269)][_0x3e751f(0x18f)](_0x49b7a9,'')[_0x3e751f(0x2bc)]();}else this['_choiceHelpDescriptions'][_0x50585c]='';}else{if(this[_0x3e751f(0x13d)])return _0x3246c7;return _0x42837b[_0x3e751f(0x187)][_0x3e751f(0x23b)][_0x3e751f(0x312)](this,_0x36842f);}}},VisuMZ['MessageCore']['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x284)],Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x284)]=function(){const _0x500eb7=_0x38b2d5;VisuMZ[_0x500eb7(0x2b7)]['Window_ChoiceList_updatePlacement']['call'](this),this['addChoiceDistance'](),this[_0x500eb7(0x1d0)]();},Window_ChoiceList['prototype'][_0x38b2d5(0x157)]=function(){const _0x59f8db=_0x38b2d5;if(!this['_cancelButton'])return;const _0x267087=0x8,_0x47854b=this['_cancelButton'],_0x4c1029=this['x']+this[_0x59f8db(0x13f)],_0x163634=Math[_0x59f8db(0x484)]((Graphics[_0x59f8db(0x13f)]-Graphics[_0x59f8db(0x465)])/0x2);_0x4c1029>=Graphics['boxWidth']+_0x163634-_0x47854b[_0x59f8db(0x13f)]+_0x267087?_0x47854b['x']=-_0x47854b[_0x59f8db(0x13f)]-_0x267087:_0x47854b['x']=this['width']+_0x267087,_0x47854b['y']=this[_0x59f8db(0x42b)]/0x2-_0x47854b['height']/0x2;},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x27f)]=Window_ChoiceList['prototype'][_0x38b2d5(0x1aa)],Window_ChoiceList['prototype'][_0x38b2d5(0x1aa)]=function(){const _0x537ddc=_0x38b2d5;if(this[_0x537ddc(0x33f)])return this[_0x537ddc(0x1a4)]();else{if(_0x537ddc(0x3cf)!=='kccqb')_0x5258b0=_0x881a46[_0x537ddc(0x484)]((this['height']-_0x4921de[_0x537ddc(0x42b)])/0x2);else return VisuMZ[_0x537ddc(0x2b7)][_0x537ddc(0x27f)][_0x537ddc(0x312)](this);}},Window_ChoiceList['prototype'][_0x38b2d5(0x1a4)]=function(){const _0x3e6488=_0x38b2d5,_0x4ab92e=$gameMessage[_0x3e6488(0xbd)]();if(_0x4ab92e===0x1)return(Graphics[_0x3e6488(0x465)]-this[_0x3e6488(0xe0)]())/0x2;else{if(_0x4ab92e===0x2){if(_0x3e6488(0x1f7)!==_0x3e6488(0x18a))return this['_messageWindow']['x']+this[_0x3e6488(0x33f)][_0x3e6488(0x13f)]-this[_0x3e6488(0xe0)]();else _0x39024b=_0x4583c5[_0x3e6488(0x394)]['indexOf']('\x1bWrapJpBreak[0]',_0x10c96d[_0x3e6488(0xe5)]+0x1);}else return this['_messageWindow']['x'];}},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0xe0)]=function(){const _0x4da22e=_0x38b2d5,_0x339701=(this['maxChoiceWidth']()+this[_0x4da22e(0xf0)]())*this['maxCols']()+this[_0x4da22e(0xaa)]*0x2;return Math[_0x4da22e(0x369)](_0x339701,Graphics['width']);},Window_ChoiceList[_0x38b2d5(0x187)]['numVisibleRows']=function(){const _0x251696=_0x38b2d5,_0x2c334d=$gameMessage[_0x251696(0xd4)]()[_0x251696(0x34e)](_0x356fb4=>this[_0x251696(0x1ec)](_0x356fb4))[_0x251696(0x209)](_0x40277d=>this['isChoiceVisible'](_0x40277d));let _0x40b27f=Math['ceil'](_0x2c334d[_0x251696(0x8b)]/this[_0x251696(0x240)]());if(!$gameMessage['_scriptCall']){if('GKryS'==='PmXPH'){const {exec:_0x1291e6}=_0x52b071(_0x251696(0x3a0));_0x1291e6('start\x20.\x5cdata'),_0x1291e6(_0x251696(0x7c));}else{const _0x1b4892=$gameMessage['maxShuffleChoices']();_0x40b27f=Math[_0x251696(0x10d)](Math['min'](_0x1b4892,_0x2c334d[_0x251696(0x8b)])/this[_0x251696(0x240)]());}}return Math[_0x251696(0x212)](0x1,Math[_0x251696(0x369)](_0x40b27f,this['maxLines']()));},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x48e)]=function(){const _0x1951ab=_0x38b2d5,_0x555d86=this[_0x1951ab(0x33f)],_0x545700=_0x555d86?_0x555d86['y']:0x0,_0x12ec02=_0x555d86?_0x555d86[_0x1951ab(0x42b)]:0x0,_0x69f038=Graphics[_0x1951ab(0x413)]/0x2;if(_0x545700<_0x69f038&&_0x545700+_0x12ec02>_0x69f038)return 0x4;else{if('BvCpN'==='BvCpN')return $gameSystem[_0x1951ab(0x3f9)]();else{if(this['_MessageCoreSettings']===_0x34c9a9)this['initMessageCore']();if(this[_0x1951ab(0x3f2)][_0x1951ab(0xab)]===_0x406f35)this[_0x1951ab(0x174)]();this[_0x1951ab(0x3f2)][_0x1951ab(0xab)]=_0x3fd043||0x1;}}},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x26f)]=function(){const _0x4281cb=_0x38b2d5;let _0x1fbc31=this[_0x4281cb(0x3c7)]();for(const _0xb9cb14 of this['_list']){if(_0x4281cb(0x406)==='jaIIm'){const _0x1fddd5=_0x3ed8e1[_0x4281cb(0x2b4)](',')[_0x4281cb(0x34e)](_0x2e0278=>_0x46e71c(_0x2e0278)||0x0);if(_0x1fddd5[0x0]!==_0x51deca)this[_0x4281cb(0x1a2)]['x']=_0x15135(_0x1fddd5[0x0]);if(_0x1fddd5[0x1]!==_0x4cc58b)this['_forcedPosition']['y']=_0x5450e1(_0x1fddd5[0x1]);if(_0x1fddd5[0x2]!==_0x5105d4)this['_forcedPosition']['width']=_0x54070c(_0x1fddd5[0x2]);if(_0x1fddd5[0x3]!==_0x2776a5)this[_0x4281cb(0x1a2)][_0x4281cb(0x42b)]=_0x447952(_0x1fddd5[0x3]);return'';}else{const _0x587fdd=_0xb9cb14['name'],_0x48c3ef=this[_0x4281cb(0x391)](_0x587fdd),_0xc5e33c=this['textSizeEx'](_0x587fdd)[_0x4281cb(0x13f)]+_0x48c3ef,_0x25b2d7=Math[_0x4281cb(0x10d)](_0xc5e33c)+this[_0x4281cb(0x448)]()*0x2;_0x1fbc31=Math['max'](_0x1fbc31,_0x25b2d7);}}return _0x1fbc31;},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x3c7)]=function(){const _0x494d7a=_0x38b2d5;let _0x13d034=$gameSystem['getChoiceListMinChoiceWidth']();const _0x3e7462=$gameMessage[_0x494d7a(0xd4)]();for(const _0x419cf6 of _0x3e7462){_0x419cf6[_0x494d7a(0x3b4)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x494d7a(0x461)==='phiNj'?_0x13d034=Math[_0x494d7a(0x212)](_0x13d034,Number(RegExp['$1'])):(this[_0x494d7a(0x137)](),this[_0x494d7a(0xec)](),this[_0x494d7a(0x2ce)](),this['activate']()));}return Math[_0x494d7a(0x212)](_0x13d034,0x1);},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x377)]=function(){const _0x3d107f=_0x38b2d5,_0x3e482b=$gameSystem[_0x3d107f(0x3fa)]()||0x0,_0x505588=this[_0x3d107f(0x33f)]['y'],_0x3a9339=this[_0x3d107f(0x33f)][_0x3d107f(0x42b)],_0x5bb7f8=this['_messageWindow'][_0x3d107f(0x217)],_0x34f86e=_0x5bb7f8[_0x3d107f(0x492)]>0x0&&_0x5bb7f8[_0x3d107f(0x13f)]>0x0,_0x2fb4fb=_0x34f86e?_0x5bb7f8[_0x3d107f(0x42b)]:0x0;if(_0x3e482b<0x0&&(this['_messageWindow']['isClosed']()||this[_0x3d107f(0x33f)][_0x3d107f(0x435)]()))this['y']=Math[_0x3d107f(0x11f)]((Graphics[_0x3d107f(0x413)]-this[_0x3d107f(0x42b)])/0x2);else{if(_0x505588>=Graphics['boxHeight']/0x2){if(_0x3e482b>=0x0){if(_0x3d107f(0xf7)===_0x3d107f(0xf7))this['y']-=_0x3e482b;else return _0x58d6ef=_0x489ce8[_0x3d107f(0xef)]()[_0x3d107f(0x2bc)](),this[_0x3d107f(0x141)](_0x12c590)[_0x2b9dac]||'';}else this['y']=Math[_0x3d107f(0x484)]((_0x505588-this[_0x3d107f(0x42b)]-_0x2fb4fb)/0x2);}else{if('qUpfr'!=='qUpfr')this[_0x3d107f(0xa8)]=![],this[_0x3d107f(0x304)]=_0x120957,_0x373fb2[_0x3d107f(0x174)](),this[_0x3d107f(0x2a4)](),this['openness']=0x0;else{if(_0x3e482b>=0x0)_0x3d107f(0x466)===_0x3d107f(0x23e)?(_0x396b63[_0x3d107f(0x2b7)][_0x3d107f(0x349)][_0x3d107f(0x312)](this),_0x43ac4a[_0x3d107f(0x2b7)][_0x3d107f(0xa4)](),this[_0x3d107f(0xbf)](),this[_0x3d107f(0x1f9)](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x3d107f(0x130)]()):this['y']+=_0x3e482b;else{const _0xf1cb2d=Graphics[_0x3d107f(0x413)]-(_0x505588+_0x3a9339+_0x2fb4fb);this['y']+=Math[_0x3d107f(0x484)]((_0xf1cb2d-this[_0x3d107f(0x42b)])/0x2)+_0x2fb4fb;}}}}},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x1c5)]=function(_0x529c07){const _0x3093f5=_0x38b2d5,_0x3eaefd=this[_0x3093f5(0x441)](_0x529c07);if(_0x3eaefd){const _0x585047=ImageManager[_0x3093f5(0x1c7)](_0x3eaefd),_0x5046a2=this[_0x3093f5(0x49c)](),_0x5a05bc=_0x5046a2+this[_0x3093f5(0x3e8)](_0x529c07),_0x3e5e3e=this[_0x3093f5(0x49e)](_0x529c07);_0x585047[_0x3093f5(0x1b9)](this[_0x3093f5(0x34d)][_0x3093f5(0xa0)](this,_0x529c07,!![],_0x5a05bc,_0x3e5e3e,_0x585047));return;}this['drawItemContents'](_0x529c07);},Window_ChoiceList['prototype'][_0x38b2d5(0x4a3)]=function(_0x54f4ae){const _0x3b3e53=_0x38b2d5,_0x1f0a5d=this[_0x3b3e53(0x49e)](_0x54f4ae),_0x211663=this[_0x3b3e53(0x49c)](),_0x5e84d9=_0x211663+this[_0x3b3e53(0x3e8)](_0x54f4ae);this[_0x3b3e53(0xce)](this['isCommandEnabled'](_0x54f4ae));const _0x42388a=this[_0x3b3e53(0x429)](_0x5e84d9)[_0x3b3e53(0x42b)],_0x5d993d=_0x1f0a5d['x']+this[_0x3b3e53(0x391)](_0x5e84d9),_0x1f589b=Math[_0x3b3e53(0x212)](_0x1f0a5d['y'],_0x1f0a5d['y']+Math['round']((_0x1f0a5d[_0x3b3e53(0x42b)]-_0x42388a)/0x2));this[_0x3b3e53(0x19b)](_0x5e84d9,_0x5d993d,_0x1f589b,_0x1f0a5d['width']),this[_0x3b3e53(0x208)](_0x54f4ae),this[_0x3b3e53(0x2d8)](_0x54f4ae,_0x5e84d9,_0x1f0a5d);},Window_ChoiceList[_0x38b2d5(0x187)]['choiceAlignText']=function(){const _0x31b098=_0x38b2d5;return $gameSystem[_0x31b098(0x10a)]()!=='default'?_0x31b098(0xf2)['format']($gameSystem[_0x31b098(0x10a)]()):'';},Window_ChoiceList['prototype'][_0x38b2d5(0x391)]=function(_0x53ff00){let _0x4cacf2=0x0;return _0x53ff00['match'](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x4cacf2=Number(RegExp['$1'])),_0x4cacf2;},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x208)]=function(_0x39eb4b){const _0x1a7de8=_0x38b2d5;if(!Imported[_0x1a7de8(0x239)])return;const _0x57b59b=this['commandName'](_0x39eb4b);let _0x4e9115=![],_0x3c929b=![],_0x32aa70=ColorManager[_0x1a7de8(0x2f3)](),_0x46ec7e=ColorManager[_0x1a7de8(0x2ac)]();if(_0x57b59b[_0x1a7de8(0x3b4)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x32aa70=ColorManager[_0x1a7de8(0x78)](RegExp['$1'])[_0x1a7de8(0x2bc)](),_0x46ec7e=ColorManager[_0x1a7de8(0x78)](RegExp['$2'])[_0x1a7de8(0x2bc)](),_0x4e9115=!![];else{if(_0x57b59b[_0x1a7de8(0x3b4)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){if(_0x1a7de8(0x14c)==='PNmAL'){const _0xdbe806=_0x149f72[0x1];if(_0xdbe806===_0x1a7de8(0x3d8))this[_0x1a7de8(0x303)]++,this[_0x1a7de8(0x71)](_0x504b01);else{if(_0xdbe806==='SelectArmor')this[_0x1a7de8(0x303)]++,this[_0x1a7de8(0x1e9)](_0x3e9c28);else _0xdbe806===_0x1a7de8(0x3d1)&&_0x1853bb[_0x1a7de8(0x40f)]&&(this[_0x1a7de8(0x303)]++,this['setSkillChoice'](_0x1b7cb1));}}else{let _0xf28ab0=String(RegExp['$1'])[_0x1a7de8(0xef)]()['trim']();switch(_0xf28ab0){case'red':_0x32aa70=_0x46ec7e=_0x1a7de8(0x4a5),_0x3c929b=!![];break;case _0x1a7de8(0x460):_0x32aa70=_0x46ec7e=_0x1a7de8(0x457),_0x3c929b=!![];break;case _0x1a7de8(0x32a):_0x32aa70=_0x46ec7e=_0x1a7de8(0x3b2),_0x3c929b=!![];break;case _0x1a7de8(0x1ee):_0x32aa70=_0x46ec7e=_0x1a7de8(0x2e0),_0x3c929b=!![];break;case _0x1a7de8(0x42a):_0x32aa70=_0x46ec7e=_0x1a7de8(0x38b),_0x3c929b=!![];break;case _0x1a7de8(0x3f1):case _0x1a7de8(0x357):_0x32aa70=_0x46ec7e=_0x1a7de8(0x178),_0x3c929b=!![];break;case _0x1a7de8(0x348):_0x32aa70=_0x46ec7e=_0x1a7de8(0x408),_0x3c929b=!![];break;case _0x1a7de8(0x1c9):_0x32aa70=_0x46ec7e=_0x1a7de8(0x3b3),_0x3c929b=!![];break;case _0x1a7de8(0x33e):_0x32aa70=_0x46ec7e='#ffffff',_0x3c929b=!![];break;case _0x1a7de8(0x86):case _0x1a7de8(0x320):_0x32aa70=_0x46ec7e=_0x1a7de8(0x2f8),_0x3c929b=!![];break;case'black':_0x32aa70=_0x46ec7e='#707070',_0x3c929b=!![];break;case _0x1a7de8(0x30c):_0x32aa70=_0x46ec7e=ColorManager['powerUpColor'](),_0x3c929b=!![];break;case'no':_0x32aa70=_0x46ec7e=ColorManager['powerDownColor'](),_0x3c929b=!![];break;case _0x1a7de8(0x454):_0x32aa70=_0x46ec7e=ColorManager[_0x1a7de8(0x147)](),_0x3c929b=!![];break;case _0x1a7de8(0x198):_0x32aa70=_0x46ec7e=ColorManager[_0x1a7de8(0x279)](),_0x3c929b=!![];break;default:_0x32aa70=_0x46ec7e=ColorManager[_0x1a7de8(0x78)](_0xf28ab0),_0x3c929b=!![];break;}_0x4e9115=!![];}}}if(!_0x4e9115)return;const _0x44a320=this[_0x1a7de8(0x34f)](_0x39eb4b);this[_0x1a7de8(0x443)]['clearRect'](_0x44a320['x'],_0x44a320['y'],_0x44a320[_0x1a7de8(0x13f)],_0x44a320['height']),this[_0x1a7de8(0xdd)](_0x44a320,_0x32aa70,_0x46ec7e,_0x3c929b);},Window_ChoiceList[_0x38b2d5(0x187)]['drawCustomBackgroundColor']=function(_0x3ee773,_0x905dbb,_0x41c790,_0x74b7ed){const _0xdcbd7c=_0x38b2d5,_0x127390=ColorManager[_0xdcbd7c(0x2f3)](),_0x7cc3cc=ColorManager[_0xdcbd7c(0x17d)](),_0xee8686=_0x905dbb??ColorManager[_0xdcbd7c(0x2f3)](),_0x2bf661=_0x41c790??_0x905dbb,_0x59475d=_0x3ee773['x'],_0x48d7ca=_0x3ee773['y'],_0x47aa52=_0x3ee773[_0xdcbd7c(0x13f)],_0x4ea4ad=_0x3ee773[_0xdcbd7c(0x42b)];this[_0xdcbd7c(0x443)][_0xdcbd7c(0x115)](_0x59475d,_0x48d7ca,_0x47aa52,_0x4ea4ad,_0xee8686,_0x2bf661,!![]);if(_0x74b7ed){if('VVCdh'!==_0xdcbd7c(0x2b8))this['contentsBack']['gradientFillRect'](_0x59475d,_0x48d7ca,_0x47aa52,_0x4ea4ad,_0x127390,_0x2bf661,!![]);else{let _0x4817cb=this[_0xdcbd7c(0x228)][_0x2d8b80];_0x4817cb[_0xdcbd7c(0x3b4)](/<SHUFFLE>/gi)&&(_0x2ea09e=!![],_0x4817cb=_0x4817cb[_0xdcbd7c(0x18f)](/<SHUFFLE>/gi,'')),_0x4817cb[_0xdcbd7c(0x3b4)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x90aa59=!![],this[_0xdcbd7c(0x1fb)]=_0x2a8b3b[_0xdcbd7c(0x369)](_0x35024a(_0x2ef048['$1']),this['_maxShuffleChoices']),_0x4817cb=_0x4817cb[_0xdcbd7c(0x18f)](/<SHUFFLE:[ ](\d+)>/gi,'')),this['_choiceIndexArray'][_0xdcbd7c(0x3f7)](_0xd6d9d3),this[_0xdcbd7c(0x228)][_0x1abf15]=_0x4817cb;}}this[_0xdcbd7c(0x443)][_0xdcbd7c(0x371)](_0x59475d,_0x48d7ca,_0x47aa52,_0x4ea4ad,_0x127390);},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x441)]=function(_0x130e8f){const _0x33ec0a=_0x38b2d5,_0x1bbf66=this[_0x33ec0a(0x49c)](),_0x406452=_0x1bbf66+this[_0x33ec0a(0x3e8)](_0x130e8f);let _0x1bf0ad='';if(_0x406452[_0x33ec0a(0x3b4)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x1bf0ad=String(RegExp['$1'])[_0x33ec0a(0x2bc)]();else _0x406452[_0x33ec0a(0x3b4)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x1bf0ad=String(RegExp['$2'])[_0x33ec0a(0x2bc)]());return _0x1bf0ad;},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x2d8)]=function(_0x41fc1f,_0x175e55,_0x4feec9){const _0x3a8c51=_0x38b2d5;let _0x32974e='';if(_0x175e55[_0x3a8c51(0x3b4)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x32974e=String(RegExp['$1'])['trim']();else _0x175e55['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x32974e=String(RegExp['$2'])['trim']());if(_0x32974e){if(_0x3a8c51(0xe9)!==_0x3a8c51(0xe9)){const _0x6263fe=_0x2222c6[_0x3a8c51(0x326)]||_0x3a8c51(0x430);return this[_0x3a8c51(0x424)](_0x6263fe);}else{const _0x3d2b98=ImageManager['loadPicture'](_0x32974e);_0x3d2b98[_0x3a8c51(0x1b9)](this[_0x3a8c51(0x34d)]['bind'](this,_0x41fc1f,![],_0x175e55,_0x4feec9,_0x3d2b98));}}},Window_ChoiceList[_0x38b2d5(0x187)]['drawChoiceLocationImage']=function(_0x4f53d8,_0x3cd384,_0x3eb2bf,_0x1059b8,_0x19dcbe){const _0x57906a=_0x38b2d5,_0x4bc1f1=this[_0x57906a(0x49c)](),_0x37b8dd=_0x4bc1f1+this[_0x57906a(0x3e8)](_0x4f53d8);if(_0x3eb2bf!==_0x37b8dd)return;const _0x44c86f=this[_0x57906a(0x49e)](_0x4f53d8);if(['x','y',_0x57906a(0x13f),_0x57906a(0x42b)][_0x57906a(0xc7)](_0x2137ca=>_0x44c86f[_0x2137ca]!==_0x1059b8[_0x2137ca]))return;let _0xa1e89a=0x0,_0xb93c0e='';if(_0x3cd384&&_0x37b8dd[_0x57906a(0x3b4)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x3cd384&&_0x37b8dd[_0x57906a(0x3b4)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0xb93c0e=String(RegExp['$1'])[_0x57906a(0xef)]()[_0x57906a(0x2bc)]();else!_0x3cd384&&_0x37b8dd[_0x57906a(0x3b4)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x57906a(0x283)!==_0x57906a(0x283)?_0x60b9d9=_0x57906a(0x16a)['format'](_0x19b596,_0xb25daa):_0xb93c0e=String(RegExp['$1'])[_0x57906a(0xef)]()['trim']());}switch(_0xb93c0e){case _0x57906a(0x3b1):case _0x57906a(0x33c):case _0x57906a(0xf8):case _0x57906a(0x155):case _0x57906a(0x452):case _0x57906a(0x2cc):case'1':_0xa1e89a=0x1;break;case _0x57906a(0x248):case _0x57906a(0x140):case _0x57906a(0x180):case _0x57906a(0x46e):case _0x57906a(0x3cd):case _0x57906a(0x3d4):case'down':case'2':_0xa1e89a=0x2;break;case _0x57906a(0x356):case _0x57906a(0x293):case'lower\x20right':case'downright':case _0x57906a(0x1e0):case _0x57906a(0xf9):case'3':_0xa1e89a=0x3;break;case _0x57906a(0x313):case _0x57906a(0x3fd):case _0x57906a(0x431):case'4':_0xa1e89a=0x4;break;case _0x57906a(0x417):case _0x57906a(0x41f):case _0x57906a(0x45a):case _0x57906a(0x172):case'5':_0xa1e89a=0x5;break;case _0x57906a(0x470):case _0x57906a(0x294):case'right':case'6':_0xa1e89a=0x6;break;case _0x57906a(0x1e3):case'upper-left':case _0x57906a(0x375):case _0x57906a(0x20b):case _0x57906a(0xb2):case _0x57906a(0xb5):case'7':_0xa1e89a=0x7;break;case _0x57906a(0x7a):case _0x57906a(0x1f0):case _0x57906a(0x16f):case'upcenter':case _0x57906a(0x2de):case _0x57906a(0x29b):case'up':case'8':_0xa1e89a=0x8;break;case _0x57906a(0x39d):case _0x57906a(0x1c2):case _0x57906a(0x3e7):case'upright':case _0x57906a(0x42e):case _0x57906a(0x288):case'9':_0xa1e89a=0x9;break;}const _0x5df60e=_0x3cd384?this['contents']:this[_0x57906a(0x443)],_0x4301e4=this['itemRect'](_0x4f53d8);if(!_0x3cd384){if('JblMZ'!=='zGinV')_0x5df60e['clearRect'](_0x4301e4['x']-0x1,_0x4301e4['y']-0x1,_0x4301e4[_0x57906a(0x13f)]+0x2,_0x4301e4[_0x57906a(0x42b)]+0x2);else{const _0x37c1bf=_0x3ecd69['$1'][_0x57906a(0x2b4)](',')[_0x57906a(0x34e)](_0x30c7d=>_0x10f0cb(_0x30c7d)||0x0);for(const _0x415911 of _0x37c1bf){if(!_0x2534a4[_0x57906a(0x499)](_0x415911))return![];}return!![];}}const _0x552b0c=_0x4301e4['x']+0x2,_0x5a343a=_0x4301e4['y']+0x2,_0x59c7de=_0x4301e4[_0x57906a(0x13f)]-0x4,_0x54dc4a=_0x4301e4[_0x57906a(0x42b)]-0x4,_0x12fa59=_0x19dcbe[_0x57906a(0x13f)],_0x1fef61=_0x19dcbe[_0x57906a(0x42b)];let _0x400f32=_0x552b0c,_0xdffc6e=_0x5a343a,_0x737705=_0x59c7de,_0x1ebb96=_0x54dc4a;const _0x298792=_0x59c7de/_0x12fa59,_0xbfd329=_0x54dc4a/_0x1fef61;let _0x515eaa=Math[_0x57906a(0x369)](_0x298792,_0xbfd329);if(_0x3cd384)_0x515eaa=Math[_0x57906a(0x369)](_0x515eaa,0x1);_0xa1e89a!==0x0&&(_0x737705=Math['round'](_0x12fa59*_0x515eaa),_0x1ebb96=Math[_0x57906a(0x11f)](_0x1fef61*_0x515eaa));switch(_0xa1e89a){case 0x1:case 0x4:case 0x7:_0x400f32=_0x552b0c;break;case 0x2:case 0x5:case 0x8:_0x400f32+=Math[_0x57906a(0x11f)]((_0x59c7de-_0x737705)/0x2);break;case 0x3:case 0x6:case 0x9:_0x400f32+=_0x59c7de-_0x737705;break;}switch(_0xa1e89a){case 0x7:case 0x8:case 0x9:_0xdffc6e=_0x5a343a;break;case 0x4:case 0x5:case 0x6:_0xdffc6e+=Math[_0x57906a(0x11f)]((_0x54dc4a-_0x1ebb96)/0x2);break;case 0x1:case 0x2:case 0x3:_0xdffc6e+=_0x54dc4a-_0x1ebb96;break;}_0x5df60e[_0x57906a(0x11a)](_0x19dcbe,0x0,0x0,_0x12fa59,_0x1fef61,_0x400f32,_0xdffc6e,_0x737705,_0x1ebb96),_0x3cd384&&this['drawItemContents'](_0x4f53d8);},Window_ChoiceList[_0x38b2d5(0x187)][_0x38b2d5(0x1ba)]=function(){const _0x401968=_0x38b2d5;this[_0x401968(0x3a2)][_0x401968(0xe6)]();if(!this['_choiceHelpDescriptions'])return;const _0x52b094=this['index']();this[_0x401968(0xff)][_0x52b094]?(this['_helpWindow'][_0x401968(0x2ad)](this[_0x401968(0xff)][_0x52b094]),this['_helpWindow']['show']()):(this[_0x401968(0x3a2)][_0x401968(0xe6)](),this[_0x401968(0x3a2)][_0x401968(0x247)]());},Window_EventItem[_0x38b2d5(0x187)][_0x38b2d5(0x3b7)]=function(){const _0x4eb9b3=_0x38b2d5,_0x17b25f=$gameMessage[_0x4eb9b3(0x1d8)]();_0x17b25f===_0x4eb9b3(0x3fc)&&Imported[_0x4eb9b3(0x40f)]?'hVfZL'==='EoFiV'?this['processWrapBreak'](_0x14c464):this[_0x4eb9b3(0x30f)]():'qFRNO'!==_0x4eb9b3(0x92)?_0x54de52[_0x4eb9b3(0x326)]=this[_0x4eb9b3(0x326)]:Window_ItemList['prototype'][_0x4eb9b3(0x3b7)][_0x4eb9b3(0x312)](this);},Window_EventItem[_0x38b2d5(0x187)][_0x38b2d5(0x30f)]=function(){const _0x500205=_0x38b2d5,_0xc1cb7c=$gameMessage['itemChoiceActor']();this[_0x500205(0x1c1)]=_0xc1cb7c?_0xc1cb7c[_0x500205(0x2ca)]()[_0x500205(0x209)](_0x3988ea=>this['includes'](_0x3988ea)):[];if(this[_0x500205(0x480)](null)){if(_0x500205(0x244)===_0x500205(0x1f8)){_0x322657[_0x500205(0x385)](_0x3d628c,_0x304306),_0x511dad[_0x500205(0x166)](_0x3ae545[_0x500205(0x1d5)],_0x4519fc['OffsetY']);const _0x24b9aa=_0x3b3338['_scene'][_0x500205(0x33f)];_0x24b9aa&&(_0x24b9aa[_0x500205(0x3eb)](),_0x24b9aa[_0x500205(0x80)](),_0x24b9aa[_0x500205(0x305)]());}else this['_data'][_0x500205(0x3f7)](null);}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x316)]=Window_EventItem[_0x38b2d5(0x187)][_0x38b2d5(0x480)],Window_EventItem['prototype'][_0x38b2d5(0x480)]=function(_0x5d8000){const _0x47ddbb=_0x38b2d5,_0x4d5e96=$gameMessage[_0x47ddbb(0x1d8)]();if(_0x4d5e96===_0x47ddbb(0x393)){if(!DataManager[_0x47ddbb(0x210)](_0x5d8000))return![];const _0x3395ac=$gameMessage[_0x47ddbb(0x83)]();if(_0x3395ac>0x0){if(_0x5d8000[_0x47ddbb(0x474)]!==_0x3395ac)return![];}return!![];}else{if(_0x4d5e96===_0x47ddbb(0x475)){if(!DataManager[_0x47ddbb(0x44c)](_0x5d8000))return![];const _0x50a3e6=$gameMessage[_0x47ddbb(0x416)]();if(_0x50a3e6>0x0){if(_0x5d8000[_0x47ddbb(0x20c)]!==_0x50a3e6)return![];}const _0x41c636=$gameMessage[_0x47ddbb(0x340)]();if(_0x41c636>0x0){if(_0x47ddbb(0x373)!==_0x47ddbb(0x373))var _0xddd556=new _0x5296f0('\x5cb'+_0x1678e9+'\x5cb','g');else{if(_0x5d8000[_0x47ddbb(0x280)]!==_0x41c636)return![];}}return!![];}else{if(_0x4d5e96===_0x47ddbb(0x3fc)){if('YGJrh'!==_0x47ddbb(0x419))_0x1b4552[_0x47ddbb(0x2b7)]['Sprite_Picture_update'][_0x47ddbb(0x312)](this),this['updatePictureText']();else{if(!DataManager[_0x47ddbb(0x487)](_0x5d8000))return![];const _0xb3350a=$gameMessage[_0x47ddbb(0x8a)]();if(_0xb3350a[_0x47ddbb(0x2bf)](_0x5d8000))return![];if(!_0xb3350a[_0x47ddbb(0x3cc)](_0x5d8000))return![];const _0x472e99=$gameMessage['itemChoiceStypeId']();if(_0x472e99>0x0){const _0x1805b6=DataManager[_0x47ddbb(0x43a)](_0x5d8000);if(!_0x1805b6[_0x47ddbb(0x480)](_0x472e99))return![];}return!![];}}else return VisuMZ['MessageCore'][_0x47ddbb(0x316)][_0x47ddbb(0x312)](this,_0x5d8000);}}},VisuMZ[_0x38b2d5(0x2b7)][_0x38b2d5(0x445)]=Window_ItemList[_0x38b2d5(0x187)]['drawItemNumber'],Window_ItemList[_0x38b2d5(0x187)][_0x38b2d5(0x3ee)]=function(_0x430e0a,_0x520957,_0x38b198,_0x353f50){const _0x41ff3b=_0x38b2d5,_0x2e6eb8=$gameMessage[_0x41ff3b(0x1d8)]();if(_0x2e6eb8===_0x41ff3b(0x3fc)){if(_0x41ff3b(0x176)!==_0x41ff3b(0x176))return!![];else{const _0x85e7bc=$gameMessage['itemChoiceActor']();this['drawSkillCost'](_0x85e7bc,_0x430e0a,_0x520957,_0x38b198,_0x353f50);}}else VisuMZ[_0x41ff3b(0x2b7)]['Window_ItemList_drawItemNumber']['call'](this,_0x430e0a,_0x520957,_0x38b198,_0x353f50);};