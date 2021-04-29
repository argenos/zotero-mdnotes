# Notes and Known Limitations

- I assume the exported metadata and Zotero note files are _replaceable_.

  - **Why?** Items in your Zotero library may need to be updated or new annotations/highlights can be made to the PDF.

  - Batch export will overwrite the metadata and Zotero note files **without asking**.

  - The only file **not** overwritten during batch export is the Notes file which I assume **you** modify and don't want them overwritten! You can use the `Create Notes file` menu to do so.

- The format used to export Zotero notes is somewhat hardcoded and relies on Zotfile's default format. [Let me know](https://github.com/argenos/zotero-mdnotes/issues/new) if this doesn't work for you.

  **v0.0.3** - Since forbidden characters for Windows file names can get quite complex, and I can't test in Windows nor invest much time in this, I've made a few assumptions about the title of your notes. If those assumptions are not met, the file with the extracted notes won't be created and batch export won't work. Check if your note:

  - uses anything other than the default Zotfile format, or if the note title contains more than one parenthesis this might fail

  - has any other special character in the first line (which is used as part of the file name), it will also fail. The only cases I'm checking are forward slashes `/` and colons `:`.

  Pull requests are welcome to handle this in a smarter way.

- Zotero note exports reformat the date in the title:

  **v0.0.3:** Zotfile-extracted annotations include characters that are invalid for Windows file names. For that reason, the date is changed to follow an ISO format and stripping time, i.e. `yyyy-mm-dd`. This might not always work correctly depending on your time zone, and it might be better to fix it directly in Zotfile (see [this issue](https://github.com/jlegewie/zotfile/issues/480)).

- If you move or rename your markdown files, the links in Zotero will be outdated. The only solution is to manually locate them.

- I can only work on this on my spare time, so it might take me a while to fix your issue. That being said, I'll try to point you in the right direction if you [open an issue](https://github.com/argenos/zotero-mdnotes/issues/new). [Pull requests](https://github.com/argenos/zotero-mdnotes/pulls) are most definitely welcome if you can spare some time.

- If you have questions, please use the Q&A category in [GitHub Discussions](https://github.com/argenos/zotero-mdnotes/discussions/new).
