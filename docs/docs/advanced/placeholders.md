---
title: Placeholders and wildcards
sidebar_position: 2
---

There are both placeholders (e.g. `{{citekey}}`) and wildcards (e.g. `%(citekey)` for all fields.

So when should you use them on your templates?

- `{{placeholders}}` are a quick way to get `- <name of field>: <field content>` and allows you to apply some formatting.
- `%(wildcards)%` are the raw contents of that field.

Another important distinction is that `{{placeholders}}` are removed from your template if the item you're exporting doesn't have them, while `%(wildcards)` will be left there, and therefore should be used sparingly for things you know all items will have, e.g. title, authors, citekey, etc.

## Placeholders

### Item placeholders

You can add a `{{placeholder}}` for any [item field](https://www.zotero.org/support/kb/item_types_and_fields) in your templates. Fields are formatted in camel case, so make sure you find the right [field](https://api.zotero.org/itemFields?pprint=1) in Zotero's API.

During export, any placeholder that is not a match for the selected item or that is blank will not be included in the markdown file.

In addition to Zotero's supported fields, Mdnotes adds a few placeholders for an item:

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

#### Adding a new placeholder

After setting up your templates, adding a new placeholder is as simple as adding the placeholder in the template you for your exports. For example, adding `{{publicationTitle}}` to your template will include the correct field for journals.

```markdown {2} title="Zotero Metadata Template.md"
{{proceedingsTitle}}
{{publicationTitle}}
{{date}}
```

The placeholder will use the [default](formatting.md#placeholder-format) formatting, unless you add a [new formatting rule](formatting.md#adding-new-formatting-rules).

### Note placeholders

Mdnotes supports the following placeholders for Zotero notes:

- `{{mdnotesFileName}}` - The filename for the [mdnotes file](../getting-started/configuration.md#file-naming-convention) according to the file naming convention.
- `{{metadataFileName}}` - The filename for a [Zotero Item export](../getting-started/configuration.md#file-naming-convention) according to the file naming convention.
- `{{noteTitle}}` - The note's title (usually the first line).
- `{{noteContent}}` - The contents of the note, translated to markdown as defined in the [preferences](./formatting.md#zotero-note-formatting)
- `{{related}}` - A list of [related items](https://www.zotero.org/support/related).
- `{{tags}}` - The list of tags for the selected note.

### Custom placeholders

Much like [adding new field placeholders](#adding-a-new-placeholder), it is possible to add custom placeholders. For this you'll need to add [new formatting rules](formatting.md#adding-new-formatting-rules). There are two main types of custom placeholders depending on their contents:

- those that get their content from a Zotero field, in which case you need to define which field to get the contents from: `zotero_field: <fieldName>`.
  :::tip
  To define an additional placeholder that formats the authors as a list, named `{{authorList}}`, you should add a preference with the following:

  **Name**:

  ```txt
  extensions.mdnotes.placeholder.authorList
  ```

  **Value**:

  ```txt
  {"content":"List of Authors:\n\t- {{field_contents}}", "zotero_field":"author", "list_separator": "\n\t- ",}
  ```

  Note that your template can use both the default field placeholder `{{author}}` and your custom placeholder `{{authorList}}`.

  :::

- those that have pre-defined contents, which need a `custom_content: <content>` definition
  :::tip
  To define a custom placeholder for `{{Earth}}`, you should add a preference with the following:

  **Name**:

  ```txt
  extensions.mdnotes.placeholder.Earth
  ```

  **Value**:

  ```txt
  {"custom_content":"Mostly harmless"}
  ```

  :::

When specifying custom placeholders, the preference name shouldn't match a Zotero field.

## Wildcards

A `%(wildcard)` uses the same logic as the placeholder, but only includes the content of a Zotero field without any formatting. Keep in mind that any fields not included in a Zotero item will not be deleted from your file.
