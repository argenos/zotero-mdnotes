---
title: Configuration
toc: true
---

Go to `Tools > Mdnotes preferences`

{% include figure image_path="/images/mdnotes-export-preferences.png" alt="this is a placeholder image" caption="Export preferences" %}

## File naming convention

In general, I recommend using the `citekey` as title. The exported files will use the prefix and suffix for the type of file being exported, following the pattern `<prefix><title><suffix>.md`.

{% include figure image_path="/images/mdnotes-export-preferences-2.png" alt="this is a placeholder image" caption="Settings for the file naming convention" %}

## File Organization

### Multi-file Exports

{% include figure image_path="/images/multi-file-menu.png" alt="" caption="Multi-file menu" %}

Using the `Split files` option will create, as its name indicates, separate files for your metadata, Zotero notes, or your own notes. Whenever you use the `Export to markdown` menu:

- One file containing the metadata will be created if you selected a Zotero item using the [`Zotero Metadata Template`](/zotero-mdnotes/docs/templates/#zotero-metadata-template).
- If you select a Zotero note, one file will be created using the [`Zotero Note Template`](/zotero-mdnotes/docs/templates/#zotero-note-template)

Using the `Create Mdnotes file` will create a note for **your** notes using the [`Mdnotes Default Template`](/zotero-mdnotes/docs/templates/#mdnotes-default-template).

By selecting a Zotero item and using the `Batch export to markdown` menu, mdnotes will create all of the above files, i.e. one for the metadata and one for each Zotero note in that item.
If your `Mdnotes` file doesn't exist, it will be created.

**Note:** Your `Mdnotes` file will never be overwritten with the `Batch export` menu. If you wish to do so, you must use the `Create Mdnotes file` and confirm you want to overwrite it.
{: .notice--info}

### Single-file Exports

**Warning!** Single-file exports will replace your existing file **without** asking for confirmation. If you don't want this to happen, you must use [multi-file exports](#multi-file-exports).
{: .notice--danger}

{% include figure image_path="/images/single-file-menu.png" alt="" caption="Multi-file menu" %}

The `Create full export note` menu exports an item's metadata and its Zotero notes as a single file. For that it uses the `Mdnotes Default Template`, which you should edit by adding your desired metadata placeholders. Zotero notes included in this export will use the `Zotero Note Template`.

The menus for `Export to markdown` and `Create standalone note` behave in the same way as in multi-file exports, and uses their respective templates.

**Note:** The file created with the `Create full export note` menu uses the `Mdnotes Default Template` and the prefix and suffix for `Mdnotes` file.
{: .notice--info}

## Add the created files as linked files to Zotero

If you select the "Attach file links to Zotero", the markdown files will be two clicks away from inside Zotero:

{% include figure image_path="/images/attach-link-to-zotero.png" alt="this is a placeholder image" %}
