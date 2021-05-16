---
title: Default Templates
sidebar_position: 1
---

Templates define how the final Markdown document will look like. Starting on [v0.1.0](/changelog#v010---2020-11-15) you can specify a templates directory in the `Tools > Mdnote preferences`.
Once a directory is specified, `Mdnotes` will look for the following files (they must be named **exactly** like this):

```txt
.
├── Mdnotes Default Template.md
├── Standalone Note Template.md
├── Zotero Metadata Template.md
└── Zotero Note Template.md

```

The files must be located at the root of the folder you chose. For now, hidden folders (those whose name starts with `.`) are not supported.
If there is no path specified or the file doesn't exist, Mdnotes will use the default templates.

The default templates can give you an idea of existing [placeholders and wildcards](../placeholders.md)

## Export to markdown

`Export to markdown` will export whatever you have selected. It uses the [zotero metadata template](#zotero-metadata-template), if you have selected an item, and the [zotero note template](#zotero-note-template) if there are notes in your selected items.

### Zotero Metadata Template

- **Which menu?**: `Export to markdown`
- **What to select?**: A Zotero item.

You can add (or remove) any [item placeholder](../placeholders.md#item-placeholders) to your template.

```markdown title="Zotero Metadata Template.md"
{{title}}

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

## Zotero links

{{localLibrary}}
{{cloudLibrary}}

{{notes}}
```

### Zotero Note Template

- **Which menu?**: `Export to markdown`
- **What to select?**: A Zotero note.

You can add (or remove) any [note placeholders](../placeholders.md#note-placeholders) to your template.

```markdown title="Zotero Note Template.md"
{{tags}}
{{related}}
{{mdnotesFileName}}

{{title}}

{{noteContent}}
```

## Creating files for your notes

### Mdnotes Default Template

This template supports any [item placeholder](../placeholders.md#item-placeholders), which you can add (or remove) from your template.
Read more about the specifics for [single-file](single-file.md) and [multi-file](multi-file.md) exports.

```markdown title="Mdnotes Default Template.md"
{{title}}

![[%(metadataFileName)#Metadata]]

Other files:
{{mdnotesFileName}}
{{metadataFileName}}

## Zotero links

{{localLibrary}}
{{cloudLibrary}}

## Notes

-
```

### Standalone Note Template

- **Which menu?**: `Create a standalone note`.
- **What to select?**: A Zotero item.

It is essentially a duplicate of the [mdnotes default template](#mdnotes-default-template).
Its purpose is to provide a secondary template that can be used to add notes with _some_ metadata and automatically adding links to Zotero.

:::info
**Note**: Standalone notes must be activated in the `Mdnotes Preferences`.
:::

```markdown title="Standalone Default Template.md"
Related to: [[%(metadataFileName)]]

## Notes

-
```
