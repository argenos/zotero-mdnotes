---
title: Placeholders and wildcards
permalink: /docs/placeholders/
toc: true
---

## Placeholders

### Item placeholders

{% raw %}
You can add a `{{placeholder}}` for any [item field](https://www.zotero.org/support/kb/item_types_and_fields) in your templates. Fields are formatted in camel case, so make sure you find the right [field](https://api.zotero.org/itemFields?pprint=1) in Zotero's API.

{% endraw %}

During export, any placeholder that is not a match for the selected item or that is blank will not be included in the markdown file.

In addition to Zotero's supported fields, Mdnotes adds a few placeholders for an item:

{% raw %}

- `{{itemType}}` - The Zotero item type.
- `{{citekey}}` - The citekey (requires the Better Bibtex plugin).
- `{{collections}}` - A list of collections an item belongs to.
- `{{related}}` - A list of [related items](https://www.zotero.org/support/related).
- `{{tags}}` - The list of tags for the selected item.
- `{{pdfAttachments}}` = A list of links to any PDF attachments.
- `{{localLibrary}}` = The `zotero://` link to an item.
- `{{cloudLibrary}}` = If you use [Zotero sync](https://www.zotero.org/support/sync), the link to that item in your cloud library.
- `{{dateAdded}}` - The date the item was added to your library.
- `{{notes}}` - A list of all the titles of all the child notes.
- `{{mdnotesFileName}}` - The name of the default mdnotes file (following the naming convention).
- `{{metadataFileName}}` - The name of the Zotero metadata file (following the naming convention).

{% endraw %}

Note: The setting `extensions.mdnotes.templates.include_empty_placeholders` is *NOT* being used right now and won't have an effect.

### Note placeholders

Mdnotes supports the following placeholders for Zotero notes:

{% raw %}

- `{{mdnotesFileName}}` - The filename for the [mdnotes file](/zotero-mdnotes/docs/configuration/#file-naming-convention) according to the file naming convention.
- `{{metadataFileName}}` - The filename for a [Zotero Item export](/zotero-mdnotes/docs/configuration/#file-naming-convention) according to the file naming convention.
- `{{title}}` - The note's title (usually the first line).
- `{{noteContent}}` - The contents of the note, translated to markdown as defined in the [preferences](/zotero-mdnotes/docs/formatting/#zotero-note-formatting)
- `{{related}}` - A list of [related items](https://www.zotero.org/support/related).
- `{{tags}}` - The list of tags for the selected note.

{% endraw %}

## Wildcards

A `%(wildcard)` uses the same logic as the placeholder, but only includes the content of a Zotero item without any formatting. Keep in mind that any fields not included in a Zotero item will not be deleted from your file.
