---
sidebar_position: 1
---

# Quick-Start Guide

This quick guide should get you started with `zotero-mdnotes`.

## Installation

Download and [install](getting-started/installation.md) the latest version of the requirements and of `mdnotes`:

- [Zotfile](http://zotfile.com/)
- [BetterBibtex](https://retorque.re/zotero-better-bibtex/)
- [Mdnotes](https://github.com/argenos/zotero-mdnotes/releases/latest).

:::tip
If you're using Firefox, make sure to right-click on the `xpi` file and use the `Save as` menu, otherwise Firefox will try to install the xpi as a plugin and will throw an error.
:::

## Exporting content from Zotero as Markdown

By default, `mdnotes` exports things on separate files, the rest of this guide assumes you have not customized your preferences just yet.
You can change this later from the default `Split file` file organization to `Single file` in your [preferences](getting-started/configuration.md).

### Export a Zotero metadata or notes

Right-click on the item or Zotero note (the yellow ones) you want to export, and select `Export to markdown`.

:::tip
If your item has multiple notes, you can select all of them and use the `Export to markdown` menu to create one file for each.
:::

### Create a file for your own notes

Select a Zotero item, right-click and select `Create mdnotes file` or `Create a standalone note`.

### Batch export all metadata and notes

Selecting a Zotero item, and choosing the menu `Batch export to markdown` will create the markdown files for the metadata, export all Zotero notes and create a file for your own notes.

## Customizing your exports

If exporting on multiple files is not your thing, or you want to change the way files are named, you can change some of those options in your [preferences](getting-started/configuration.md).

### Customize the content of your exports

To change how the content of the exported files looks like, read more about [templates](advanced/templates/defaults.md) and [placeholders](advanced/placeholders.md).

### Customize the formatting of your content

`Mdnotes` has some hidden preferences to add custom formatting, e.g. to only add links to collections, or export tags exactly as they look in Zotero. Check out the [formatting](advanced/formatting.md) page for more info.
