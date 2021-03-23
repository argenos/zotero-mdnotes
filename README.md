# Mdnotes

A Zotero plugin to export item metadata and notes as markdown files.

## Features

Tested with Zotero v5.0.89 in Ubuntu 18.04.

Right now the menu is not context-aware, so read below to see what has to be selected for the menu to correctly create the files.

| What you want to do                                                       | What to select | Menu |
| ------------------------------------------------------------ | -------------- | --|
| [Export Zotero item metadata file](https://argenos.github.io/zotero-mdnotes/#export-a-zotero-item-or-notes-to-markdown) | Zotero Item  | `Export to markdown` |
| [Export Zotero notes to markdown](https://argenos.github.io/zotero-mdnotes/#export-a-zotero-item-or-notes-to-markdown) | Zotero Note    | `Export to markdown` |
| [Create a file for your own notes](https://argenos.github.io/zotero-mdnotes/#create-a-file-for-your-own-notes) | Zotero Item    | `Create mdnotes file` |
| [Batch export all of the above](http://argenos.github.io/zotero-mdnotes/#batch-export-all-metadata-and-notes) | Zotero Item    | `Batch export to markdown` |

Based on your configuration, any of the above actions [adds the created files as linked files to Zotero](http://argenos.github.io/zotero-mdnotes/docs/configuration/#add-the-created-files-as-linked-files-to-zotero).

With the exception of `Create mdnotes file` (for your own notes), you will be asked to choose a path. The file name(s) are automatically chosen based on the naming convention described in the section for each menu. You can read more about how to configure Mdnotes [here](https://argenos.github.io/zotero-mdnotes/)

To access the menu right-click on an item or note:  

<img src="docs/images/mdnotes-batch.gif" alt="mdnotes-batch" style="zoom:80%;" />

## Install

Install by downloading the [latest version](https://github.com/argenos/zotero-mdnotes/releases/latest).

## Requirements

It is highly recommended that you have the following plugins installed:

* [Zotfile](http://zotfile.com/)
* [BetterBibtex](https://retorque.re/zotero-better-bibtex/)

I have not tested without them, so I can't guarantee nothing will break.

## Notes and Known Limitations

* I assume the exported metadata and Zotero note files are _replaceable_.

  * **Why?** Items in your Zotero library may need to be updated or new annotations/highlights can be made to the PDF.

  * Batch export will overwrite the metadata and Zotero note files **without asking**.

  * The only file not overwritten during batch export is the Notes file which I assume **you** modify and don't want them overwritten! You can use the `Create Notes file` menu to do so.

* The format used to export Zotero notes is somewhat hardcoded and relies on Zotfile's default format. [Let me know](https://github.com/argenos/zotero-mdnotes/issues/new) if this doesn't work for you.

  **v0.0.3** - Since forbidden characters for Windows file names can get quite complex and I can't test in Windows nor invest much time in this, I've made a few assumptions about the title of your notes. If those assumptions are not met, the file with the extracted notes won't be created and batch export won't work. Check if your note

  * uses anything other than the default Zotfile format, or if the note title contains more than one parenthesis this might fail.

  * has any other special character in the first line (which is used as part of the file name), it will also fail. The only cases I'm checking are forward slashes `/` and colons `:`.

  Pull requests are welcome to handle this in a smarter way.

* Zotero note exports reformat the date in the title:

  **v0.0.3:** Zotfile-extracted annotations include characters that are invalid for Windows file names. For that reason, the date is changed to follow an ISO format and stripping time, i.e. `yyyy-mm-dd`. This might not always work correctly depending on your timezone and it might be better to fix it directly in Zotfile (see [this issue](https://github.com/jlegewie/zotfile/issues/480)). For more details about Mdnotes, see [Notes and Known Limitations](#Notes-and-known-limitations).

* If you move or rename your markdown files, the links in Zotero will be outdated. The only solution is to manually locate them.

* So far I've been creating one or two notes at a time, as I've been needing them, i.e. I have not tested exporting large numbers of items or notes.

* I can only work on this on my spare time, so it might take me a while to fix your issue. That being said, I'll try to point you in the right direction if you [open an issue](https://github.com/argenos/zotero-mdnotes/issues/new). [Pull requests](https://github.com/argenos/zotero-mdnotes/pulls) are most definitely welcome if you can spare some time.


## Acknowledgements

This plugin is based and was inspired by [zotero-roam-export](https://github.com/melat0nin/zotero-roam-export/).
