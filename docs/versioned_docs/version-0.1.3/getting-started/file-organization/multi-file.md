# Multi-file Exports (Default)

![Multi-file menu](../../images/multi-file-menu.png)

Using the `Split files` option will create, as its name indicates, separate files for your metadata, Zotero notes, or your own notes. Whenever you use the `Export to markdown` menu:

- One file containing the metadata will be created if you selected a Zotero item using the [`Zotero Metadata Template`](../../advanced/templates/defaults.md#zotero-metadata-template).
- If you select a Zotero note, one file will be created using the [`Zotero Note Template`](../../advanced/templates/defaults.md#zotero-note-template)

Using the `Create Mdnotes file` will create a note for **your** notes using the [`Mdnotes Default Template`](../../advanced/templates/defaults.md#mdnotes-default-template).

By selecting a Zotero item and using the `Batch export to markdown` menu, `mdnotes` will create all the above files, i.e. one for the metadata and one for each Zotero note in that item.
If your `Mdnotes` file doesn't exist, it will be created.

:::info
Your `Mdnotes` file will never be overwritten with the `Batch export` menu. If you wish to do so, you must use the `Create Mdnotes file` and confirm you want to overwrite it.
:::
