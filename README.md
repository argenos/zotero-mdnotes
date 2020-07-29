# Mdnotes

A Zotero plugin to export item metadata and notes as markdown files.

## Features

![mdnotes-menu](docs/mdnotes-menu.png)

![mdnotes-batch](docs/mdnotes-batch.gif)

* Export items' metadata to a markdown file

  ![Zotero item export](docs/zotero-item-export.png)

* Export Zotero notes to markdown

  * "Manually" written child notes

  ![dont panic note](docs/dont-panic-zotero-note.png) ![dont panic note](docs/dont-panic-md-note.png)

  * Annotations extracted with Zotfile

  ![yellow note](docs/yellow-zotero-note.png) ![yellow note](docs/yellow-md-note.png)

* Create a file for your own notes

  ![notes file](docs/notes-file.png)

* Batch export/create of all of the above

* Add the created files as linked files to Zotero

  ![attach](docs/attach-link-to-zotero.png)

## Install

Install by downloading the [latest version](https://github.com/argenos/zotero-mdnotes/releases/latest).

After installing, go to `Tools > Mdnotes preferences` and change the Notes directory to a valid path.

## Requirements

It is highly recommended that you have the following plugins installed:

* [Zotfile](http://zotfile.com/)
* [BetterBibtex](https://retorque.re/zotero-better-bibtex/)

I have not tested without them, so I can't guarantee nothing will break.

## Configuration

Go to `Tools > Mdnotes preferences`

![options](docs/options.png)

## Notes and Known Limitations

* I assume the exported metadata and Zotero note files are _replaceable_.

  * **Why?** Items in your Zotero library may need to be updated or new annotations/highlights can be made to the PDF.

  * Batch export will overwrite the metadata and Zotero note files **without asking**.

  * The only file not overwritten during batch export is the Notes file which I assume **you** modify and don't want them overwritten! You can use the `Create Notes file` menu to do so.

* The format used to export Zotero notes is somewhat hardcoded and relies on Zotfile's default format. [Let me know](https://github.com/argenos/zotero-mdnotes/issues/new) if this doesn't work for you.

* If you move or rename your markdown files, the links in Zotero will be outdated. The only solution is to manually locate them.

* So far I've been creating one or two notes at a time, as I've been needing them, i.e. I have not tested exporting large numbers of items or notes.

* I can only work on this on my spare time, so it might take me a while to fix your issue. That being said, I'll try to point you in the right direction if you [open an issue](https://github.com/argenos/zotero-mdnotes/issues/new). [Pull requests](https://github.com/argenos/zotero-mdnotes/pulls) are most definitely welcome if you can spare some time.

TL;DR: It works on my machine  
[![works badge](https://cdn.jsdelivr.net/gh/nikku/works-on-my-machine@v0.2.0/badge.svg)](https://github.com/nikku/works-on-my-machine)

## Acknowledgements

This plugin is based and was inspired by [zotero-roam-export](https://github.com/melat0nin/zotero-roam-export/).
