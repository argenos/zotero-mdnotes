# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

- Block references for the exported Zotero notes.
  **Important note**: The block ID is using a hash of the block contents, i.e. if you change your format the block won't match any more.
- The Zotero note export now uses [Joplin turndown](https://github.com/laurent22/joplin-turndown) instead of regexp for the html -> md translation.
  - Add custom rules to avoid escaping characters to the turndown converter.
    The custom rules prevent the escaping of Markdown exports within italics, bold, and `<p>` tags. It also leaves any `<font>` and `<span>` tags untranslated.
  - **Note**: This means you probably have to set up again some of the custom formatting you've added. Some custom rules for the translations can be configured in the hidden preferences with the `html2md` properties, but they now require you to restart Zotero. Please ping me if you need additional rules not included there.
- Custom placeholders (not yet in the documentation). 
- Added a `noteTitle` placeholder to have different formatting from an item's title.
- Added the ability to customise the text for Zotero links in hidden preferences
- A few bug fixes

## [v0.1.3](https://github.com/argenos/zotero-mdnotes/releases/tag/0.1.3) - 2021-02-17

- The `Create Standalone Note` menu is now optional and can be deactivated in the preferences.
- Add separate menu for single-file exports
  - Make the Mdnotes menu slightly context-aware. If you select the single-file option under `File organization`, the menu should now be somewhat less confusing. This release also includes better documentation on how to use the single-file config option.
- Add wiki link format for PDF attachments (#49)
- Updated documentation
  - Add instructions to update mdnotes to the documentation (#45)
  - Standalone menu is now optional
  - Add details to configuration page for single- and multi-file exports

## [v0.1.2](https://github.com/argenos/zotero-mdnotes/releases/tag/0.1.2) - 2020-11-16

- Fixed a bug where Zotero notes would not be exported (due to unsanitized file names)

## [v0.1.1](https://github.com/argenos/zotero-mdnotes/releases/tag/0.1.1) - 2020-11-16

- Fix the export of missing URL fields
- Fix the attachment as linked files when exporting Zotero notes to markdown.
- Fix broken links
- Fix formatting for placeholders

## [v0.1.0](https://github.com/argenos/zotero-mdnotes/releases/tag/0.1.0) - 2020-11-15

- Add support for templates.
  - Removes unused preferences that are replaced by placeholders.
- Add custom formatting for fields
  - Add hidden preference to customize the format of Zotero Notes
- The content of the batch export with the single-file setting is now consistent with the split-files settings.
- Remove automatic capitalization of links
- Add support for standalone markdown notes
- Zotero notes can now also include tags and related items
- Renames the "Export Zotero item" menu to "Export to markdown"
  - The menu to export a Zotero note was merged into "Export to markdown"
- Add option to use `file://` links for PDF attachments instead of using the URL scheme from Zotero (`zotero://`)
- Hidden option to attach Obsidian URI links after notes are exported.
- Other improvements and bug fixes to make things better under the hood.

## [v0.0.7](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.7) - 2020-09-06

- Move Zotero links to metadata for single files (#9)

## [v0.0.6](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.6) - 2020-08-25

- Fix create note preference

## [v0.0.5](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.5) - 2020-08-24

- Add hidden preference for links to dates and type
- Use tabs for preferences

## [v0.0.4](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.4) - 2020-08-20

- Fix note names in Item export
- Add links to PDFs in metadata
- Changes label for adding notes as linked attachments

## [v0.0.3](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.3) - 2020-08-01

- Change date format in Zotfile-extracted note titles to `yyyy-mm-dd` (compatibility with Windows)

## [v0.0.2](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.2) - 2020-07-29

- Make user's home the default path
- Add publication title only if available
- Fix missing line before annotations header
- Remove code block formatting from citekey
- Fix missing publication titles

## [v0.0.1](https://github.com/argenos/zotero-mdnotes/releases/tag/0.0.1) - 202-07-28

- Export Zotero metadata to markdown and creating a file for your own notes.
