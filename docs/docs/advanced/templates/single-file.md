---
title: Single-File Templates
sidebar_position: 3
---

Single-file exports might require a few changes to the default configuration, depending on your needs, as described in the [single-file configuration](../../getting-started/file-organization/single-file.md).
You can read more about [item](../placeholders.md#item-placeholders) and [note](../placeholders.md#note-placeholders) placeholders in the next section.

## Templates used in single-file exports

- **Which menu?**: `Create full export note`
- **What to select?**: A Zotero item.

![Single-file menu](../../images/single-file-menu.png)

### Mdnotes Default Template

For example, you might want to update the template to include an item's metadata:

```markdown
{{title}}

## Zotero links

{{localLibrary}}
{{cloudLibrary}}

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

{{notes}}

## My notes

-
```

### Zotero Note Template

If you include the `{{notes}}` placeholder in the `Mdnotes Default Template`, `mdnotes` will loop through the Zotero Notes of the selected items and add them one by one using this template.

For single-file exports, you might want to edit your template to look like this:

```markdown
{{tags}}
{{related}}

{{noteTitle}}

{{noteContent}}
```

:::info
This template is also used by the `Export to markdown` menu when you select a Zotero note. If you ever want to export, the changes you make will affect both menus.
:::
