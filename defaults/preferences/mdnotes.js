pref("extensions.mdnotes.directory", "");
pref("extensions.mdnotes.citekey_title", true);
pref("extensions.mdnotes.link_style", "wiki");
pref("extensions.mdnotes.link_dates", true);
pref("extensions.mdnotes.link_type", true);
pref("extensions.mdnotes.bullet", "*");

pref("extensions.mdnotes.wildcards.title", '{"line":"# {{field}}", "format": "{{content}}", "link_style": "no-links"}');
pref("extensions.mdnotes.wildcards.abstract", '{"line":"## Abstract\\n\\n{{field}}\\n", "format": "{{content}}", "link_style": "no-links", "list_separator": ", "}');
pref("extensions.mdnotes.wildcards.authors", '{"line":"{{bullet}} Authors: {{field}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.wildcards.collections", '{"line":"{{bullet}} Topics: {{field}}", "format": "{{content}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.wildcards.related", '{"line":"{{bullet}} Related: {{field}}", "link_style": "wiki", "list_separator": ", "}');
pref("extensions.mdnotes.wildcards.notes", '{"line":"## Highlights and Annotations\\n\\n- {{field}}", "format": "{{content}}", "link_style": "wiki", "list_separator": "\\n- "}');
pref("extensions.mdnotes.wildcards.tags", '{"line":"{{bullet}} Tags: {{field}}", "format": "#{{content}}", "link_style": "no-links", "list_separator": ", ", "remove_spaces": "true"}');
pref("extensions.mdnotes.wildcards.citekey", '{"line":"{{bullet}} Cite key: {{field}}", "format": "{{content}}", "link_style": "no-links"}');
pref("extensions.mdnotes.wildcards.pdfs", '{"line":"{{bullet}} PDF Attachments\\n\\t- {{field}}", "format": "{{content}}", "list_separator": "\\n\\t- "}');
pref("extensions.mdnotes.wildcards.url", '{"line":"{{bullet}} URL: {{field}}", "format": "{{content}}"}');
pref("extensions.mdnotes.wildcards.doi", '{"line":"{{bullet}} DOI: {{field}}", "format": "{{content}}"}');


pref("extensions.mdnotes.export_type", true);
pref("extensions.mdnotes.export_authors", true);
pref("extensions.mdnotes.export_dates", true);
pref("extensions.mdnotes.export_pub_title", true);
pref("extensions.mdnotes.export_local_library", true);
pref("extensions.mdnotes.export_cloud_library", true);
pref("extensions.mdnotes.export_citekey", true);
pref("extensions.mdnotes.export_urls", true);
pref("extensions.mdnotes.export_collections", true);
pref("extensions.mdnotes.export_related", true);
pref("extensions.mdnotes.export_tags", true);
pref("extensions.mdnotes.export_pdfs", true);
pref("extensions.mdnotes.export_abstract", true);

pref("extensions.mdnotes.tag_format", "internal");
pref("extensions.mdnotes.import_tag", "[[Zotero Import]]");

pref("extensions.mdnotes.export_notes", true);
pref("extensions.mdnotes.export_notes_heading", "## Highlights and Annotations");

pref("extensions.mdnotes.file_conf", "split");
pref("extensions.mdnotes.title_suffix", "-zotero");
pref("extensions.mdnotes.notes_suffix", "");
pref("extensions.mdnotes.create_notes_file", true);
pref("extensions.mdnotes.obsidian.transclude_metadata", true);
pref("extensions.mdnotes.attach_to_zotero", true);

pref("extensions.mdnotes.html_to_md", '{"<p>": "", "</p>": "", "<strong>": "**", "</strong>": "**","<b>": "**","</b>": "**","<u>": "#### ","</u>": "","<em>": "*","</em>": "*", "<blockquote>": "> ", "</blockquote>": "", "<br><br>": "\\n\\n"}');