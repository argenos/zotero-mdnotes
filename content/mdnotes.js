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
{{parentTitle}}

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

function day_of_the_month(d) {
  return (d.getDate() < 10 ? "0" : "") + d.getDate();
}

function get_month_mm_format(d) {
  return (d.getMonth() < 10 ? "0" : "") + d.getMonth();
}

function getDateAdded(item) {
  const date = new Date(item.getField("dateAdded"));
  var dateAddedStr = `${date.getFullYear()}-${get_month_mm_format(
    date
  )}-${day_of_the_month(date)}`;
  return dateAddedStr;
}

function getCiteKey(item) {
  if (typeof Zotero.BetterBibTeX === "object" && Zotero.BetterBibTeX !== null) {
    var bbtItem = Zotero.BetterBibTeX.KeyManager.get(item.getField("id"));
    return bbtItem.citekey;
  }

  return "undefined";
}

function getLocalZoteroLink(item) {
  let linksString = "[Local library](zotero://select/items/";
  const library_id = item.libraryID ? item.libraryID : 0;
  linksString += `${library_id}_${item.key})`;

  return linksString;
}

function getCloudZoteroLink(item) {
  return `[Cloud library](${Zotero.URI.getItemURI(item)})`;
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
  let url = item.getField("URL");
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

function htmlLinkToMarkdown(link) {
  const mdLink = `[${link.text}](${link.href})`;
  return mdLink;
}

function formatLists(list, bullet) {
  for (const element of list.childNodes) {
    element.innerHTML = `${bullet} ${element.innerHTML}`;
  }
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

function getZoteroAttachments(item) {
  let attachmentIDs = item.getAttachments();
  var linksArray = [];
  for (let id of attachmentIDs) {
    let attachment = Zotero.Items.get(id);
    if (attachment.attachmentContentType == "application/pdf") {
      var link = `[${attachment.getField(
        "title"
      )}](zotero://open-pdf/library/items/${attachment.key})`;
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
  const domParser = Components.classes[
      "@mozilla.org/xmlextras/domparser;1"
    ].createInstance(Components.interfaces.nsIDOMParser),
    mapObj = JSON.parse(getPref("html_to_md")),
    re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  var noteMD = {};
  let noteString = "";
  const fullDomNoteBody = domParser.parseFromString(noteContent, "text/html")
    .body;
  const fullDomNote = fullDomNoteBody.childNodes;

  for (let i = 0; i < fullDomNote.length; i++) {
    const para = fullDomNote[i];

    if (i === 0) {
      noteMD.title = formatNoteTitle(para.textContent);
      continue;
    }

    if (para.innerHTML) {
      for (const link of para.getElementsByTagName("a")) {
        link.outerHTML = htmlLinkToMarkdown(link);
      }

      const parsedInner = para.innerHTML.replace(re, function (matched) {
        return mapObj[matched];
      });
      para.innerHTML = parsedInner;

      if (para.innerHTML.startsWith('"#')) {
        noteString +=
          para.textContent.substring(1, para.textContent.lastIndexOf('"')) +
          "\n\n";
        continue;
      }

      if (para.innerHTML.startsWith('"')) {
        noteString += `> ${para.textContent}\n\n`;
        continue;
      }

      // Handle lists
      if (para.outerHTML.startsWith("<ul>")) {
        formatLists(para, getPref("bullet"));
      }

      if (para.outerHTML.startsWith("<ol>")) {
        formatLists(para, "1.");
      }

      noteString += para.textContent + "\n\n";
    }
  }

  noteMD.noteContent = noteString;
  noteMD.tags = getTags(item);
  noteMD.related = getRelatedItems(item);

  let parentItem = Zotero.Items.get(item.parentItemID);
  noteMD.mdnotesFileName = getMDNoteFileName(parentItem);
  noteMD.metadataFileName = getZMetadataFileName(parentItem);

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
    // TODO add checks for Windows special characters
    if (getPref("link_style") === "wiki") {
      return item.getField("title");
    } else {
      return lowerCaseDashTitle(item.getField("title"));
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
  let formattedPlaceholders = format_placeholders(metadata);
  let content = remove_invalid_placeholders(
    replace_placeholders(template, formattedPlaceholders)
  );
  content = replace_wildcards(content, metadata);
  return { content: content, name: fileName };
}

async function readTemplate(fileName) {
  let template = await Zotero.File.getContentsAsync(
    getFilePath(getPref("templates.directory"), fileName)
  );
  return template;
}

// From https://github.com/jlegewie/zotfile/blob/master/chrome/content/zotfile/utils.js#L104
function replace_wildcards(str, args) {
  return str.replace(/%\((\w+)\)/g, (match, name) => args[name]);
}

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

/**
 * @param {Object} placeholders An object that contains the item's fields as keys, and its contents as values
 * @return {string} The formatted string
 */
function format_placeholders(placeholders) {
  let formattedPlaceholders = {};
  for (const [key, value] of Object.entries(placeholders)) {

    if (skipItem(value)) {
      continue;
    }

    // Replace a potential undefined with an empty string instead of undefined
    let newValue = value ? value : "";
    let formatted_label = capitalize_field_label(key);
    let settings = getFormattingSettings(key);

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
      Zotero.debug("This key shouldn't have wiki links: " + key);
      settings.link_style = "no-links";
    }

    let formatted_content = format_field_content(newValue, settings);
    let placeholder = settings.content
      ? settings.content
      : `{{bullet}} {{field_name}}: {{field_contents}}`;
    let args = {
      field_contents: formatted_content,
      bullet: `${getPref("bullet")}`,
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
  Zotero.debug("Formatting " + str);
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
  // let settings = getFormattingSettings(fieldName);
  Zotero.debug("Links settings for arrays:" + settings.link_style);

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
  let note = noteToMarkdown(item);
  let formattedPlaceholders = format_placeholders(note);
  let fileName = getZNoteFileName(item);
  let template = await readTemplate("Zotero Note Template");
  let fileContents = remove_invalid_placeholders(
    replace_placeholders(template, formattedPlaceholders)
  );
  return { content: fileContents, name: fileName };
}

function getFilePath(path, filename) {
  return OS.Path.join(OS.Path.normalize(path), `${filename}.md`);
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

    setPref(pref_name, value) {
      Zotero.Prefs.set(`extensions.mdnotes.${pref_name}`, value, true);
    }

    async addLinkToMDNote(outputFile, parentItem) {
      let existingAttachments = parentItem.getAttachments();
      let linkExists = false;

      for (let id of existingAttachments) {
        let attachment = Zotero.Items.get(id);

        if (attachment.attachmentPath === outputFile) {
          attachment.setField(
            "dateModified",
            Zotero.Date.dateToSQL(new Date())
          );
          linkExists = true;
          break;
        }
      }

      if (!linkExists && getPref("attach_to_zotero")) {
        var attachmentFile = await Zotero.Attachments.linkFromFile({
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
        Zotero.debug("Standalone: "+ standalone);

        fp.init(window, "Save markdown note...", fp.modeSave);
        fp.appendFilter("Markdown", "*.md");

        let fileName;
        if (standalone) {
          fileName = getStandaloneFileName(item);
        } else {
          fileName  = getMDNoteFileName(item);
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
        }
      }
    }

    async getRegularItemContents(item) {
      let metadata = getItemMetadata(item);
      let template = await readTemplate("Zotero Metadata Template");
      let formattedPlaceholders = format_placeholders(metadata);
      let newContents = remove_invalid_placeholders(
        replace_placeholders(template, formattedPlaceholders)
      );
      let fileName = getZMetadataFileName(item);
      return { content: newContents, name: fileName };
    }

    /**
     * Return an object with all the exportable files from a top-level item
     * @param {Item} item A Zotero item
     */
    async getFiles(item) {
      var fileArray = [];
      let mdnotesFile = await getMDNoteFileContents(item);
      fileArray.push({
        name: mdnotesFile.name,
        content: mdnotesFile.content,
      });

      let itemFile = await this.getRegularItemContents(item);
      fileArray.push({ name: itemFile.name, content: itemFile.content });

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
      Zotero.debug(exportFile);
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
          } else {
            continue;
          }
          let outputFile = getFilePath(fp.file, `${file.name}`);
          Zotero.File.putContentsAsync(outputFile, file.content);

          // Attach note
          this.addLinkToMDNote(outputFile, item);
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
              outputFile = getFilePath(fp.file, exportFile.name);
              var fileExists = await OS.File.exists(outputFile);

              if (
                exportFile.name === `${noteFileName}` &&
                (fileExists || !getPref("create_notes_file"))
              ) {
                continue;
              }
              Zotero.File.putContentsAsync(outputFile, exportFile.content);

              // Attach new notes
              this.addLinkToMDNote(outputFile, item);
            }
          } else {
            let exportFile = await this.getSingleFileExport(item);
            outputFile = getFilePath(fp.file, exportFile.name);
            Zotero.File.putContentsAsync(outputFile, exportFile.content);

            // Attach new notes
            this.addLinkToMDNote(outputFile, item);
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
