pref("extensions.mdnotes.directory", "");
pref("extensions.mdnotes.citekey_title", true);
pref("extensions.mdnotes.link_style", "wiki");
pref("extensions.mdnotes.bullet", "*");

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
pref("extensions.mdnotes.placeholder.cloudLibrary", '{"content":"{{bullet}} {{field_contents}}"}');
pref("extensions.mdnotes.placeholder.localLibrary", '{"content":"{{bullet}} {{field_contents}}"}');
pref("extensions.mdnotes.placeholder.noteContent", '{"content":"{{field_contents}}"}');

pref("extensions.mdnotes.templates.directory", "");
pref("extensions.mdnotes.templates.include_empty_placeholders", false);

pref("extensions.mdnotes.file_conf", "split");
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

pref("extensions.mdnotes.html_to_md", '{"<p>": "", "</p>": "", "<strong>": "**", "</strong>": "**","<b>": "**","</b>": "**","<u>": "#### ","</u>": "","<em>": "*","</em>": "*", "<blockquote>": "> ", "</blockquote>": "", "<br><br>": "\\n\\n"}');