---
title: Configuration
sidebar_position: 2
---

To access `mdnotes` preferences, go to `Tools > Mdnotes preferences`

## Export preferences

![Mdnotes export preferences](../images/mdnotes-export-preferences.png)

### Setting the starting path

In `Tools > Mdnotes preferences` you can choose the path `mdnotes` will open with any of its menus. The path you select is just the starting point, before saving your files you can navigate to any other directory.

### File Organization

You can choose to export your content as a [single file](file-organization/single-file.md) or [multiple files](file-organization/multi-file.md), and will be reflected on the right-click menu.
Which configuration to choose depends on your preferences, and on your Zotfile configuration, the figure below illustrates a few of the possibilities based on the default templates:

- [Multi-file](file-organization/multi-file.md) exports create separate files: one for your notes (blue), one with the item metadata (green) and one for each note (yellow).
- [Single-file](file-organization/single-file.md) exports add all your content on a single file.

![Example of files according to the configuration](file-organization/mdnotes-file-config.png)

### Template directory

[Templates](../advanced/templates/defaults.md) define how the final Markdown document will look like. Starting on [v0.1.0](/changelog#v010---2020-11-15) you can specify a templates directory in the `Tools > Mdnotes preferences`.

Depending on your choice of [file organization](#file-organization), you'll need to edit different templates.

### Add the created files as linked files to Zotero

If you select the "Attach file links to Zotero", the markdown files will be added as [linked files](https://www.zotero.org/support/attaching_files#stored_files_and_linked_files), meaning you can access them by double-clicking on them from inside Zotero:

![Include markdown files as linked attachments](../images/attach-link-to-zotero.png)

## File naming convention

In general, I recommend using the `citekey` as title. The exported files will use the prefix and suffix for the type of file being exported, following the pattern `<prefix><title><suffix>.md`.

![Settings for the file naming convention](../images/mdnotes-export-preferences-2.png)
