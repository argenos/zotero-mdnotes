/*globals Zotero, OS, require, Components, window */

const mdnotesTemplate = `{{title}}

![[%(metadataFileName)#Metadata]]

Other files:
{{mdnotesFileName}}
{{metadataFileName}}

##  Zotero links
{{localLibrary}}
{{cloudLibrary}}

## Notes
- `;

const standaloneTemplate = `Related to: [[%(metadataFileName)]]

## Notes
- `;

const zoteroNoteTemplate = `{{tags}}
{{related}}
{{mdnotesFileName}}

{{title}}

{{noteContent}}`;

const zoteroMetadataTemplate = `{{title}}

## Metadata

{{itemType}}
{{author}}
{{proceedingsTitle}}
{{date}}
{{dateAdded}}
{{url}}
{{DOI}}
{{citekey}}
{{collections}}
{{related}}
{{tags}}, #zotero, #literature-notes, #reference
{{pdfAttachments}}

{{abstractNote}}

##  Zotero links
{{localLibrary}}
{{cloudLibrary}}

{{notes}}`;

function getPref(pref_name) {
  return Zotero.Prefs.get(`extensions.mdnotes.${pref_name}`, true);
}

const typemap = {
  artwork: "Illustration",
  audioRecording: "Recording",
  bill: "Legislation",
  blogPost: "Blog post",
  book: "Book",
  bookSection: "Chapter",
  case: "Legal case",
  computerProgram: "Data",
  conferencePaper: "Conference paper",
  email: "Letter",
  encyclopediaArticle: "Encyclopaedia article",
  film: "Film",
  forumPost: "Forum post",
  hearing: "Hearing",
  instantMessage: "Instant message",
  interview: "Interview",
  journalArticle: "Article",
  letter: "Letter",
  magazineArticle: "Magazine article",
  manuscript: "Manuscript",
  map: "Image",
  newspaperArticle: "Newspaper article",
  patent: "Patent",
  podcast: "Podcast",
  presentation: "Presentation",
  radioBroadcast: "Radio broadcast",
  report: "Report",
  statute: "Legislation",
  thesis: "Thesis",
  tvBroadcast: "TV broadcast",
  videoRecording: "Recording",
  webpage: "Webpage",
};

function getDateAdded(item) {
 const date = new Date(item.getField("dateAdded"));
 return simpleISODate(date)
}
function getCiteKey(item) {
  if (typeof Zotero.BetterBibTeX === "object" && Zotero.BetterBibTeX !== null) {
    var bbtItem = Zotero.BetterBibTeX.KeyManager.get(item.getField("id"));
    return bbtItem.citekey;
  }

  return "undefined";
}

function getLocalZoteroLink(item) {
  let linksString = "zotero://select/items/";
  const library_id = item.libraryID ? item.libraryID : 0;
  linksString += `${library_id}_${item.key}`;

  return linksString;
}

function getCloudZoteroLink(item) {
  return `${Zotero.URI.getItemURI(item)}`;
}

function getDOI(item) {
  let doi = item.getField("DOI");
  if (doi) {
    return `[${doi}](https://doi.org/${doi})`;
  } else {
    return doi;
  }
}

function getURL(item) {
  let url = item.getField("url");
  if (url) {
    return `[${url}](${url})`;
  } else {
    return url;
  }
}

function getTags(item) {
  const tagsArray = [];
  var itemTags = item.getTags();

  if (itemTags) {
    for (const tag of itemTags) {
      tagsArray.push(tag.tag);
    }
  }

  return tagsArray;
}

function getCollectionNames(item) {
  const collectionArray = [];
  var collections = item.getCollections();

  for (let collectionID of collections) {
    var collection = Zotero.Collections.get(collectionID);
    collectionArray.push(collection.name);
  }

  return collectionArray;
}

function getRelatedItems(item) {
  var relatedItemUris = item.getRelations()["dc:relation"],
    relatedItemsArray = [];

  if (relatedItemUris) {
    for (let uri of relatedItemUris) {
      var itemID = Zotero.URI.getURIItemID(uri),
        relatedItem = Zotero.Items.get(itemID);

      // Get the link content based on settings and item type
      let linkContent;
      if (!relatedItem.isNote()) {
        linkContent = getMDNoteFileName(relatedItem);
      } else if (relatedItem.isNote() && !relatedItem.isTopLevelItem()) {
        linkContent = getZNoteFileName(relatedItem);
      } else {
        linkContent = relatedItem.getField("title");
      }

      relatedItemsArray.push(linkContent);
    }
  }

  return relatedItemsArray;
}

function getCreatorArray(item, creatorType) {
  var creators = item.getCreators();
  var creatorTypeID = Zotero.CreatorTypes.getID(creatorType);
  var creatorArray = [];

  if (creators) {
    for (let creator of creators) {
      if (creator.creatorTypeID === creatorTypeID) {
        let creatorName = `${creator.firstName} ${creator.lastName}`;
        creatorArray.push(creatorName);
      }
    }
  }
  return creatorArray;
}

function getItemMetadata(item) {
  let metadata = {};
  let fields = Zotero.ItemFields.getItemTypeFields(item.getField("itemTypeID"));
  var zoteroType = Zotero.ItemTypes.getName(item.getField("itemTypeID"));
  let creatorTypes = Zotero.Utilities.getCreatorsForType(zoteroType);

  for (let creatorType of creatorTypes) {
    let creatorArray = getCreatorArray(item, creatorType);
    metadata[creatorType] = creatorArray;
  }

  for (let x of fields) {
    let field = Zotero.ItemFields.getName(x);
    let content = item.getField(field, false, true);
    if (field === "DOI") {
      content = getDOI(item);
    } else if (field === "url") {
      content = getURL(item);
    } else if (field === "dateAdded") {
      content = simpleISODate(content);
    }
    metadata[field] = content;
  }
  metadata.itemType = typemap[zoteroType];
  metadata.citekey = getCiteKey(item);
  metadata.collections = getCollectionNames(item);
  metadata.related = getRelatedItems(item);
  metadata.tags = getTags(item);
  metadata.pdfAttachments = getZoteroAttachments(item);
  metadata.localLibrary = getLocalZoteroLink(item);
  metadata.cloudLibrary = getCloudZoteroLink(item);
  metadata.dateAdded = getDateAdded(item);
  metadata.notes = getZoteroNoteTitles(item);
  metadata.mdnotesFileName = getMDNoteFileName(item);
  metadata.metadataFileName = getZMetadataFileName(item);

  return metadata;
}

function formatInternalLink(content, linkStyle) {
  linkStyle =
    typeof linkStyle !== "undefined" ? linkStyle : getPref("link_style");

  if (linkStyle === "wiki") {
    return `[[${content}]]`;
  } else if (linkStyle === "markdown") {
    return `[${content}](${lowerCaseDashTitle(content)})`;
  } else {
    return `${content}`;
  }
}

function lowerCaseDashTitle(content) {
  return content.replace(/\s+/g, "-").toLowerCase();
}

function getZoteroNotes(item) {
  var noteIDs = item.getNotes();
  var noteArray = [];

  if (noteIDs) {
    for (let noteID of noteIDs) {
      let note = Zotero.Items.get(noteID);
      noteArray.push(note);
    }
  }

  return noteArray;
}

function getZoteroPDFLink(attachment) {
  return `zotero://open-pdf/library/items/${attachment.key}`;
}

function getPDFFileLink(attachment) {
  let fileLink = Zotero.File.pathToFileURI(attachment.getFilePath());
  return fileLink;
}

function getZoteroAttachments(item) {
  const linkStylePref = getPref("pdf_link_style");
  let attachmentIDs = item.getAttachments();
  var linksArray = [];
  for (let id of attachmentIDs) {
    let attachment = Zotero.Items.get(id);
    if (attachment.attachmentContentType == "application/pdf") {
      let link;
      if (linkStylePref === "zotero") {
        link = `[${attachment.getField("title")}](${getZoteroPDFLink(attachment)})`;
      } else if (linkStylePref === "wiki") {
        link = formatInternalLink(attachment.getField("title"), "wiki");
      } else {
        link = `[${attachment.getField("title")}](${getPDFFileLink(attachment)})`;
      }
      linksArray.push(link);
    }
  }
  return linksArray;
}

// Hacky solution from https://stackoverflow.com/a/25047903
var isDate = function (date) {
  return new Date(date).toString() !== "Invalid Date" && !isNaN(new Date(date));
};

// From https://stackoverflow.com/a/29774197
// Return the date in yyyy-mm-dd format
function simpleISODate(date) {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() + offset * 60 * 1000);
  return date.toISOString().split("T")[0];
}

function formatNoteTitle(titleString) {
  var strInParenthesis = titleString.match(/\(([^\)]+)\)/g);

  if (!strInParenthesis) {
    // Just replace all slashes and colons with dashes
    return titleString.replace(/\/|:/g, "-");
  } else {
    var dateInParenthesis = strInParenthesis[0].replace(/\(|\)/g, "");

    if (isDate(dateInParenthesis)) {
      var date = new Date(dateInParenthesis);
      return titleString.replace(dateInParenthesis, simpleISODate(date));
    } else {
      return titleString;
    }
  }
}

function noteToMarkdown(item) {
  let noteContent = item.getNote();
  var noteMD = {};
  // Use the turndown provider to turn the HTML into Markdown
  noteMD.noteContent = Zotero.MarkdownUtils.html2md(noteContent);

  // The original implementation took the text contents of the first
  // paragraph and formatted it. Let's do the same with the first
  // Markdown line (= paragraph).
  const extractedTitle = Zotero.MarkdownUtils.extractTitle(noteMD.noteContent);
  noteMD.title = formatNoteTitle(extractedTitle);
  noteMD.noteTitle = noteMD.title;
  noteMD.tags = getTags(item);
  noteMD.related = getRelatedItems(item);

  let parentItem = Zotero.Items.get(item.parentItemID);
  noteMD.mdnotesFileName = getMDNoteFileName(parentItem);
  noteMD.metadataFileName = getZMetadataFileName(parentItem);
  if (getPref("obsidian.blocks")) {
    let citekey = '';
    if (citekey !== "undefined" && getPref("obsidian.blocks.use_citekey")) {
      citekey = getCiteKey(parentItem);
    }
    noteMD.noteContent = Zotero.MarkdownUtils.addBlockIds(noteMD.noteContent, citekey);
  }

  return noteMD;
}

/*
 * Get an item's base file name from setting's preferences
 */
function getFileName(item) {
  let citekeyTitle = getPref("citekey_title");

  if (citekeyTitle) {
    return getCiteKey(item);
  } else {
    if (getPref("link_style") === "wiki") {
      return sanitizeFilename(item.getField("title"));
    } else {
      return sanitizeFilename(lowerCaseDashTitle(item.getField("title")));
    }
  }
}

/**
 * Return file names for an array of notes based on the naming convention
 *
 * @param {object} item A Zotero item
 */
function getZoteroNoteTitles(item) {
  let noteTitleArray = [];
  let noteArray = getZoteroNotes(item);

  for (let note of noteArray) {
    let noteFileName = getZNoteFileName(note);
    noteTitleArray.push(noteFileName);
  }

  return noteTitleArray;
}

/**
 * Return the file name according to the naming convention
 * @param {Item|NoteExport} item A Zotero item
 * @param {string} filePrefs The substring of the preferences to get the prefix and suffix
 */
function getNCFileName(item, filePrefs) {
  let fileName;
  if (item.isNote()) {
    let parentItem = Zotero.Items.get(item.parentItemID);
    let parentTitle = getFileName(parentItem);
    let noteTitle = item.getField("title");
    fileName = `${parentTitle} - ${noteTitle}`;
  } else {
    fileName = getFileName(item);
  }
  fileName = Zotero.File.getValidFileName(fileName);
  let prefix = getPref("files." + filePrefs + ".prefix");
  let suffix = getPref("files." + filePrefs + ".suffix");
  return `${prefix}${fileName}${suffix}`;
}

function getMDNoteFileName(item) {
  return getNCFileName(item, "mdnotes.hub");
}

function getStandaloneFileName(item) {
  return getNCFileName(item, "mdnotes.standalone");
}

/**
 * Return the file name for a Zotero note based on the naming convention
 * @param {object} item A Zotero item that isNote()
 */
function getZNoteFileName(item) {
  return getNCFileName(item, "zotero.note");
}

function getZMetadataFileName(item) {
  return getNCFileName(item, "zotero.metadata");
}

/**
 * Return the contents of an Mdnotes file based on an item's placeholders and wildcards
 * @param {item} item A Zotero item
 */

async function getMDNoteFileContents(item, standalone) {
  let metadata = getItemMetadata(item);
  let template;
  let fileName;
  if (standalone) {
    template = await readTemplate("Standalone Note Template");
    fileName = getStandaloneFileName(item);
  } else {
    fileName = metadata.mdnotesFileName;
    template = await readTemplate("Mdnotes Default Template");
  }

  // Add custom placeholders
  get_placeholder_contents(template, metadata);

  let formattedPlaceholders = format_placeholders(metadata);
  let content = remove_invalid_placeholders(
    replace_placeholders(template, formattedPlaceholders)
  );
  content = replace_wildcards(content, metadata);
  return { content: content, name: fileName };
}

function getDefaultTemplate(fileName) {
  switch (fileName) {
    case "Mdnotes Default Template":
      return mdnotesTemplate;
    case "Standalone Note Template":
      return standaloneTemplate;
    case "Zotero Metadata Template":
      return zoteroMetadataTemplate;
    case "Zotero Note Template":
      return zoteroNoteTemplate;
  }
}

async function readTemplate(fileName) {
  let templateDir = getPref("templates.directory");

  if (templateDir === "") {
    return getDefaultTemplate(fileName);
  }

  let availableTemplates = await getTemplatesAtDirectory();
  let template;
  if (availableTemplates.includes(`${fileName}.md`)) {
    template = await Zotero.File.getContentsAsync(
      getFilePath(getPref("templates.directory"), fileName)
    );
    return template;
  } else {
    return getDefaultTemplate(fileName);
  }
}

async function getTemplatesAtDirectory() {
  let fileArray = [];
  await Zotero.File.iterateDirectory(
    getPref("templates.directory"),
    async function (entry) {
      if (
        entry.isDir ||
        entry.name.startsWith(".") ||
        !entry.name.endsWith(".md")
      ) {
        return;
      }
      fileArray.push(entry.name);
    }
  );

  return fileArray;
}

// From https://github.com/jlegewie/zotfile/blob/master/chrome/content/zotfile/utils.js#L104
function replace_wildcards(str, args) {
  return str.replace(/%\((\w+)\)/g, (match, name) => args[name]);
}


/**
 * 
 * @param {string} str The string to be replaced
 * @param {Object} args An array with the placeholder name as key and the (formatted) contents as values
 * @returns {string} A string with the placeholders replaced
 */
function replace_placeholders(str, args) {
  return str.replace(/{{(\w+)}}/g, (match, name) =>
    args[name] ? args[name] : "{{invalid}}"
  );
}

function remove_invalid_placeholders(str) {
  return str.replace(/{{invalid}}\n?\r?/g, (match, name) => "");
}

function skipItem(value) {
  let skip = false;
  // If we have an empty field and we DON'T want to include empty values, continue
  // If the value is an empty string, we also skip it
  if (value === "" || value === undefined) {
    skip = true;
  }

  // If it's an array and is empty
  if (typeof value === "object" && value.length === 0) {
    skip = true;
  }

  return skip && !getPref("templates.include_empty_placeholders");
}


function get_placeholder_contents(template, fields) {
  const re = /{{(\w+)}}/g;
  let placeholders = template.match(re);

  // In case a template doesn't have any placeholders
  if (!placeholders) return;

  // Loop through all the placeholders
  for (const result of placeholders) {
    let placeholder = result.substring(2, result.length - 2)

    // Check if it's a normal field, and skip it if so
    if (fields.hasOwnProperty(placeholder)) {
      continue;
    }

    // Get the settings for that particular placeholder
    let settings = getFormattingSettings(placeholder);

    if (settings.zotero_field){
      if (fields.hasOwnProperty(settings.zotero_field)) {
        let content = fields[settings.zotero_field];
        fields[placeholder] = content;
      }
    } else if (settings.custom_content) {
      fields[placeholder] = settings.custom_content;
    }
  }

}

/**
 * @param {Object} placeholders An object that contains the item's fields as keys, and its contents as values
 * @return {string} The formatted string
 */
function format_placeholders(placeholders) {
  let formattedPlaceholders = {};

  // Loop through the item metadata and replace any placeholder that matches its field
  for (const [key, value] of Object.entries(placeholders)) {
    if (skipItem(value)) {
      continue;
    }

    let settings = getFormattingSettings(key);

    // Replace a potential undefined with an empty string instead of undefined
    let newValue = value ? value : "";
    let formatted_label = capitalize_field_label(key);

    // Exceptions that already come formatted as external links
    if (
      [
        "pdfAttachments",
        "url",
        "DOI",
        "cloudLibrary",
        "localLibrary",
        "noteContent",
      ].includes(key)
    ) {
      settings.link_style = "no-links";
    }

    let formatted_content = format_field_content(newValue, settings);
    let placeholder = settings.content
      ? settings.content
      : `{{bullet}} {{field_name}}: {{field_contents}}`;
    let args = {
      field_contents: formatted_content,
      bullet: `${getPref("html2md.default.bullet")}`,
      field_name: formatted_label,
    };
    formattedPlaceholders[key] = replace_placeholders(placeholder, args);
  }

  return formattedPlaceholders;
}

function capitalize_field_label(text) {
  if (text === "url") return "URL";
  if (text === "DOI") return text;
  return Zotero.Utilities.capitalize(
    text.replace(/([A-Z])/g, " $1"),
    true
  ).replace("Pdf", "PDF");
}

function format_field_content(fieldContent, settings) {
  if (typeof fieldContent === "object") {
    return format_array(fieldContent, settings);
  }
  return format_string(fieldContent, settings);
}

function change_case(text, textCase) {
  switch (textCase) {
    case "title":
      return Zotero.Utilities.capitalizeTitle(text);
    case "sentence":
      return Zotero.Utilities.capitalize(text);
    case "lower":
      return text.toLowerCase();
    case "upper":
      return text.toUpperCase();
    default:
      return text;
  }
}

function format_string(str, settings) {
  let formattedString;
  // First format links
  formattedString = `${formatInternalLink(str, settings.link_style)}`;

  let format = settings.field_contents
    ? settings.field_contents
    : "{{content}}";

  if (settings.remove_spaces) {
    formattedString = formattedString.replace(/\s+/g, "-");
  }

  if (settings.text_case) {
    formattedString = change_case(formattedString, settings.text_case);
  }

  // Format the field
  formattedString = replace_placeholders(format, {
    content: `${formattedString}`,
  });

  return formattedString;
}

function camelToTitleCase(str) {
  let new_str = str.replace(/_/g, " ");
  return Zotero.Utilities.capitalizeTitle(
    new_str.replace(/([A-Z])/g, " $1"),
    true
  );
}

function format_array(array, settings) {
  let formattedArray = [];
  for (let item of array) {
    formattedArray.push(format_string(item, settings));
  }

  let list_separator = settings.list_separator ? settings.list_separator : ", ";

  return formattedArray.join(list_separator);
}

function getFormattingSettings(field) {
  let fieldPrefs = getPref("placeholder." + field);
  let fieldSettings = fieldPrefs ? JSON.parse(fieldPrefs) : {};
  return fieldSettings;
}

async function getZoteroNoteFileContents(item) {
  let fileName = getZNoteFileName(item);
  let template = await readTemplate("Zotero Note Template");

  let note = noteToMarkdown(item);

  // Add custom placeholders
  get_placeholder_contents(template, note);

  let formattedPlaceholders = format_placeholders(note);
  let fileContents = remove_invalid_placeholders(
    replace_placeholders(template, formattedPlaceholders)
  );
  
  fileContents = replace_wildcards(fileContents, note);
  return { content: fileContents, name: fileName };
}

function getFilePath(path, filename) {
  return OS.Path.join(OS.Path.normalize(path), `${filename}.md`);
}

function getObsidianURI(fileName) {
  let uriStart = `obsidian://open?vault=${getPref("obsidian.vault")}&file=`;

  let fileWithPath;
  if(getPref("obsidian.dir").length > 0) {
    fileWithPath = getPref("obsidian.dir") + "/" + fileName;
  }
  else{
    fileWithPath = fileName;
  }

  let encodedFileName = Zotero.File.encodeFilePath(fileWithPath);

  return `${uriStart}${encodedFileName}`;
}

function itemHasAttachment(comparableField, parentItem) {
  let existingAttachments = parentItem.getAttachments();
  let linkExists = false;

  for (let id of existingAttachments) {
    let attachment = Zotero.Items.get(id);

    if (attachment.attachmentContentType === "text/markdown") {
      if (attachment.attachmentPath === comparableField) {
        linkExists = true;
        break;
      }
    } else if (
      attachment.attachmentContentType === "x-scheme-handler/obsidian"
    ) {
      if (attachment.getField("url") === comparableField) {
        linkExists = true;
        break;
      }
    }
  }
  return linkExists;
}

function getParentItem(item) {
  let parentItem;

  if (item.isNote()) {
    parentItem = Zotero.Items.get(item.parentItemID);
  } else {
    parentItem = item;
  }

  return parentItem;
}

async function addObsidianLink(outputFile, item) {
  let fileName = OS.Path.basename(outputFile);
  fileName = fileName.split(".")[0];
  let obsidianURI = getObsidianURI(fileName);
  let parentItem = getParentItem(item);

  if (
    !itemHasAttachment(obsidianURI, parentItem) &&
    getPref("obsidian.attach_obsidian_uri")
  ) {
    await Zotero.Attachments.linkFromURL({
      url: obsidianURI,
      contentType: "x-scheme-handler/obsidian",
      title: fileName,
      parentItemID: parentItem.id,
    });
  }
}

/**
 * Sanitizes the filename using the given replacement
 *
 * @param   {string}  filename     The filename to sanitize
 * @param   {string}  replacement  The replacement character(s), default none
 *
 * @return  {string}               The sanitized filename.
 */
function sanitizeFilename(filename, replacement = '') {
  return filename.replace(/[\/\?<>\\:\*\|"]/g, replacement).trim()
}

Zotero.Mdnotes =
  Zotero.Mdnotes ||
  new (class {
    async openPreferenceWindow(paneID, action) {
      const io = {
        pane: paneID,
        action,
      };
      window.openDialog(
        "chrome://mdnotes/content/options.xul",
        "mdnotes-options",
        "chrome,titlebar,toolbar,centerscreen" +
          Zotero.Prefs.get("browser.preferences.instantApply", true)
          ? "dialog=no"
          : "modal",
        io
      );
    }

    updateMenus() {
      // Follow Zotfile's example:
      // https://github.com/jlegewie/zotfile/blob/master/chrome/content/zotfile/ui.js#L190
      let win = Services.wm.getMostRecentWindow("navigator:browser");
      let menu = win.ZoteroPane.document.getElementById("id-mdnotes-menupopup");

      // This is the order in which menuitems are added in overlay.xul
      let items = {
        mdexport: 0,
        separator: 1,
        single: 2,
        batch: 3,
        mdnotes: 4,
        standalone: 5,
      };

      let disableItems = [];

      if (getPref("file_conf") === "split") {
        disableItems.push(items.single);
      } else {
        disableItems.push(items.batch);
        disableItems.push(items.mdnotes);
      }

      if (!getPref("standalone_menu")) {
        disableItems.push(items.standalone)
      }

      // Enable all items by default and make them visible
      for (let i = 0; i < menu.childNodes.length; i++) {
        menu.childNodes[i].setAttribute("disabled", false);
        menu.childNodes[i].setAttribute("hidden", false);
      }

      // Hide and disable menus based on the single vs split files
      for (let i in disableItems) {
        menu.childNodes[disableItems[i]].setAttribute("disabled", true);
        menu.childNodes[disableItems[i]].setAttribute("hidden", true);
      }
    }

    setPref(pref_name, value) {
      Zotero.Prefs.set(`extensions.mdnotes.${pref_name}`, value, true);
    }

    async addLinkToMDNote(outputFile, item) {
      let parentItem = getParentItem(item);

      if (
        !itemHasAttachment(outputFile, parentItem) &&
        getPref("attach_to_zotero")
      ) {
        await Zotero.Attachments.linkFromFile({
          file: outputFile,
          parentItemID: parentItem.id,
        });
      }
    }

    async createNoteFileMenu(standalone) {
      var items = Zotero.getActiveZoteroPane()
        .getSelectedItems()
        .filter(
          (item) =>
            Zotero.ItemTypes.getName(item.itemTypeID) !== "attachment" &&
            Zotero.ItemTypes.getName(item.itemTypeID) !== "note"
        );
      await Zotero.Schema.schemaUpdatePromise;

      const FilePicker = require("zotero/filePicker").default;

      const fp = new FilePicker();
      var oldPath = getPref("directory")
        ? getPref("directory")
        : OS.Constants.Path.homeDir;

      if (oldPath) {
        fp.displayDirectory = oldPath;
      }
      for (const item of items) {
        Zotero.debug("Creating markdown note...");
        Zotero.debug("Standalone: " + standalone);

        fp.init(window, "Save markdown note...", fp.modeSave);
        fp.appendFilter("Markdown", "*.md");

        let fileName;
        if (standalone) {
          fileName = getStandaloneFileName(item);
        } else {
          fileName = getMDNoteFileName(item);
        }
        fp.defaultString = `${fileName}.md`;

        const rv = await fp.show();
        if (rv == fp.returnOK || rv == fp.returnReplace) {
          let outputFile = fp.file;
          if (outputFile.split(".").pop().toLowerCase() != "md") {
            outputFile += ".md";
          }
          const file = await getMDNoteFileContents(item, standalone);
          Zotero.File.putContentsAsync(outputFile, file.content);

          // Attach note
          this.addLinkToMDNote(outputFile, item);
          addObsidianLink(outputFile, item);
        }
      }
    }

    async getRegularItemContents(item) {
      let metadata = getItemMetadata(item);
      let template = await readTemplate("Zotero Metadata Template");
      
      // Add custom placeholders
      get_placeholder_contents(template, metadata);
      
      // Add formatting
      let formattedPlaceholders = format_placeholders(metadata);
      let newContents = remove_invalid_placeholders(
        replace_placeholders(template, formattedPlaceholders)
      );
      let fileName = getZMetadataFileName(item);
      return { content: newContents, name: fileName };
    }

    /**
     * Return an object with all the exportable files from a top-level item.
     * Only used for batch export.
     * @param {Item} item A Zotero item
     */
    async getFiles(item) {
      var fileArray = [];
      let mdnotesFile = await getMDNoteFileContents(item);
      fileArray.push({
        name: mdnotesFile.name,
        content: mdnotesFile.content,
      });

      // Only add the metadata file for multi-file exports
      if (getPref("file_conf") === "split") {
        let itemFile = await this.getRegularItemContents(item);
        fileArray.push({ name: itemFile.name, content: itemFile.content });
      }

      let noteIDs = item.getNotes();
      if (noteIDs) {
        for (let noteID of noteIDs) {
          let note = Zotero.Items.get(noteID);
          let zotNoteFile = await getZoteroNoteFileContents(note);
          fileArray.push({
            name: zotNoteFile.name,
            content: zotNoteFile.content,
          });
        }
      }

      return fileArray;
    }

    async getSingleFileExport(item) {
      let files = await this.getFiles(item);
      var noteFileName = getMDNoteFileName(item);
      let exportFile = { name: noteFileName };
      let content = "";
      for (let file of files) {
        content += `${file.content}\n\n`;
      }

      exportFile.content = content;
      return exportFile;
    }

    /**
     * Export Zotero items (regular items and notes) to markdown
     */
    async exportToMarkdownMenu() {
      var items = Zotero.getActiveZoteroPane()
        .getSelectedItems()
        .filter(
          (item) => Zotero.ItemTypes.getName(item.itemTypeID) !== "attachment"
        );
      await Zotero.Schema.schemaUpdatePromise;

      const FilePicker = require("zotero/filePicker").default;

      const fp = new FilePicker();
      var oldPath = getPref("directory")
        ? getPref("directory")
        : OS.Constants.Path.homeDir;

      if (oldPath) {
        fp.displayDirectory = oldPath;
      }

      fp.init(window, "Export to markdown...", fp.modeGetFolder);
      const rv = await fp.show();

      if (rv === fp.returnOK) {
        for (const item of items) {
          let file;
          if (item && !item.isNote()) {
            Zotero.debug("Exporting a regular Zotero item");
            file = await this.getRegularItemContents(item);
          } else if (item && item.isNote()) {
            Zotero.debug("Exporting a Zotero note");
            file = await getZoteroNoteFileContents(item);
            // Make sure to format the MDNote title correctly
            file.name = formatNoteTitle(file.name)
          } else {
            continue;
          }

          // Sanitize the filename
          const sanitizedFileName = sanitizeFilename(file.name)
          let outputFile = getFilePath(fp.file, `${sanitizedFileName}`);
          Zotero.debug(`Exporting file ${outputFile} ...`)
          Zotero.File.putContentsAsync(outputFile, file.content);

          // Attach note
          this.addLinkToMDNote(outputFile, item);
          addObsidianLink(outputFile, item);
        }
      }
    }

    async batchExportMenu() {
      var items = Zotero.getActiveZoteroPane()
        .getSelectedItems()
        .filter(
          (item) =>
            Zotero.ItemTypes.getName(item.itemTypeID) !== "attachment" &&
            Zotero.ItemTypes.getName(item.itemTypeID) !== "note"
        );
      await Zotero.Schema.schemaUpdatePromise;

      const FilePicker = require("zotero/filePicker").default;

      const fp = new FilePicker();
      var oldPath = getPref("directory")
        ? getPref("directory")
        : OS.Constants.Path.homeDir;

      if (oldPath) {
        fp.displayDirectory = oldPath;
      }

      fp.init(window, "Export markdown notes...", fp.modeGetFolder);
      const rv = await fp.show();

      if (rv === fp.returnOK) {
        for (const item of items) {
          let outputFile;
          if (getPref("file_conf") === "split") {
            const files = await this.getFiles(item);
            var noteFileName = getMDNoteFileName(item);
            for (let exportFile of files) {
              const sanitizedName = sanitizeFilename(exportFile.name)
              outputFile = getFilePath(fp.file, sanitizedName);
              var fileExists = await OS.File.exists(outputFile);

              if (
                sanitizedName === `${noteFileName}` &&
                (fileExists || !getPref("create_notes_file"))
              ) {
                continue;
              }
              Zotero.File.putContentsAsync(outputFile, exportFile.content);

              // Attach new notes
              this.addLinkToMDNote(outputFile, item);
              addObsidianLink(outputFile, item);
            }
          } else {
            let exportFile = await this.getSingleFileExport(item);
            const sanitizedName = sanitizeFilename(exportFile.name)
            outputFile = getFilePath(fp.file, sanitizedName);
            Zotero.File.putContentsAsync(outputFile, exportFile.content);

            // Attach new notes
            this.addLinkToMDNote(outputFile, item);
            addObsidianLink(outputFile, item);
          }
        }
      }
    }

    run(method, ...args) {
      this[method].apply(this, args).catch((err) => {
        Zotero.debug(err);
      });
    }
  })();
