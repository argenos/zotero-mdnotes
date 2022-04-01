pref("extensions.mdnotes.directory", "");
pref("extensions.mdnotes.citekey_title", true);
pref("extensions.mdnotes.link_style", "wiki");

pref("extensions.mdnotes.placeholder.title", '{"content":"# {{field_contents}}", "field_contents": "{{content}}", "link_style": "no-links"}');
pref("extensions.mdnotes.placeholder.abstractNote", '{"content":"## Abstract\\n\\n{{field_contents}}\\n", "field_contents": "{{content}}", "link_style": "no-links", "list_separator": ", "}');
pref("extensions.mdnotes.placeholder.author", '{"content":"{{bullet}} Authors: {{field_contents}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.placeholder.collections", '{"content":"{{bullet}} Topics: {{field_contents}}", "field_contents": "{{content}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.placeholder.related", '{"content":"{{bullet}} Related: {{field_contents}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.placeholder.notes", '{"content":"## Highlights and Annotations\\n\\n- {{field_contents}}", "field_contents": "{{content}}", "link_style": "wiki", "list_separator": "\\n- "}');
pref("extensions.mdnotes.placeholder.tags", '{"content":"{{bullet}} Tags: {{field_contents}}", "field_contents": "#{{content}}", "link_style": "no-links", "list_separator": ", ", "remove_spaces": "true"}');
pref("extensions.mdnotes.placeholder.citekey", '{"content":"{{bullet}} Cite key: {{field_contents}}", "field_contents": "{{content}}", "link_style": "no-links"}');
pref("extensions.mdnotes.placeholder.pdfAttachments", '{"content":"{{bullet}} PDF Attachments\\n\\t- {{field_contents}}", "field_contents": "{{content}}", "list_separator": "\\n\\t- "}');
pref("extensions.mdnotes.placeholder.url", '{"content":"{{bullet}} URL: {{field_contents}}", "field_contents": "{{content}}"}');
pref("extensions.mdnotes.placeholder.DOI", '{"content":"{{bullet}} DOI: {{field_contents}}", "field_contents": "{{content}}", "link_style": "no-links"}');
pref("extensions.mdnotes.placeholder.cloudLibrary", '{"content":"{{bullet}} {{field_contents}}", "field_contents": "\[Cloud library\]({{content}})"}');
pref("extensions.mdnotes.placeholder.localLibrary", '{"content":"{{bullet}} {{field_contents}}", "field_contents": "\[Local library\]({{content}})"}');
pref("extensions.mdnotes.placeholder.noteContent", '{"content":"{{field_contents}}"}');

pref("extensions.mdnotes.templates.directory", "");
pref("extensions.mdnotes.templates.include_empty_placeholders", false);

pref("extensions.mdnotes.file_conf", "split");
pref("extensions.mdnotes.standalone_menu", false)
pref("extensions.mdnotes.files.zotero.metadata.prefix", "");
pref("extensions.mdnotes.files.zotero.metadata.suffix", "-zotero");
pref("extensions.mdnotes.files.zotero.note.prefix", "");
pref("extensions.mdnotes.files.zotero.note.suffix", "");
pref("extensions.mdnotes.files.mdnotes.hub.prefix", "");
pref("extensions.mdnotes.files.mdnotes.hub.suffix", "");
pref("extensions.mdnotes.files.mdnotes.standalone.prefix", "");
pref("extensions.mdnotes.files.mdnotes.standalone.suffix", " - New Note");
pref("extensions.mdnotes.create_notes_file", true);
pref("extensions.mdnotes.attach_to_zotero", true);

pref("extensions.mdnotes.pdf_link_style", "zotero");

// Conversion of Zotero Notes from HTML to Markdown
pref("extensions.mdnotes.html2md.default.bullet", "*");
pref("extensions.mdnotes.html2md.default.strong", "**");
pref("extensions.mdnotes.html2md.default.em", "*");
pref("extensions.mdnotes.html2md.default.strikethrough", "~~");
pref("extensions.mdnotes.html2md.rules.underline.open", "\n#### ");
pref("extensions.mdnotes.html2md.rules.underline.close", "\n\n");


pref("extensions.mdnotes.obsidian.vault", "");
pref("extensions.mdnotes.obsidian.attach_obsidian_uri", false);
pref("extensions.mdnotes.obsidian.blocks", false);
pref("extensions.mdnotes.obsidian.blocks.use_citekey", false);
pref("extensions.mdnotes.obsidian.dir", "");
