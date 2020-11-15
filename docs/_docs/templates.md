---
toc: true
---

Templates define how the final markdown document will look like. Starting on [v0.1.0](/zotero-mdnotes/v0.1.0) you can specify a templates directory in the `Tools > Mdnote preferences`.
Once a directory is specified, Mdnotes will look for the following files:

```
.
├── Mdnotes Default Template.md
├── Standalone Note Template.md
├── Zotero Metadata Template.md
└── Zotero Note Template.md

```

The files must be located at the root of the folder you chose. For now, hidden folders (those starting with `.`) are not supported.
If there is no path specified or the file doesn't exist, Mdnotes will use the [default](#default) templates.

## Defaults

The default templates can give you an idea of existing [placeholders and wildcards](/zotero-mdnotes/docs/placeholders).

### Mdnotes Default Template

This template is used when you use the menu `Create mdnotes file` or when you have the single-file setting and choose `Batch export`.
You can add (or remove) any [item placeholder](/zotero-mdnotes/docs/placeholders/#item-placeholders) to your template.
Depending on your workflow and settings, you should edit this template or leave it empty so that information is not repeated multiple times.

{% raw %}

```markdown
{{title}}

![[%(metadataFileName)#Metadata]]

Other files:
{{mdnotesFileName}}
{{metadataFileName}}

##  Zotero links
{{localLibrary}}
{{cloudLibrary}}

## Notes
-
```

{% endraw %}

### Standalone Note Template

This template is used when you use the menu `Create a standalone note`. It is essentially a duplicate of the [mdnotes default template](#mdnotes-default-template).
Its purpose is to provide a secondary template that can be used to add notes with *some* metadata and automatically adding links to Zotero.

{% raw %}

```markdown
Related to: [[%(metadataFileName)]]

## Notes
-
```

{% endraw %}

### Zotero Metadata Template

This template is used when you use the menu `Export to markdown` and you have a Zotero item selected.
You can add (or remove) any [item placeholder](/zotero-mdnotes/docs/placeholders/#item-placeholders) to your template.

{% raw %}

```markdown
{{title}}

## Metadata

{{itemType}}
{{author}}
{{proceedingsTitle}}
{{date}}
{{dateAdded}}
{{url}}
{{DOI}}
{{citekey}}
{{collections}}
{{related}}
{{tags}}, #zotero, #literature-notes, #reference
{{pdfAttachments}}

{{abstractNote}}


##  Zotero links
{{localLibrary}}
{{cloudLibrary}}

{{notes}}
```

{% endraw %}

### Zotero Note Template

This template is used when you use the menu `Export to markdown` and you have a Zotero note selected.
You can add (or remove) any [note placeholders](/zotero-mdnotes/docs/placeholders/#note-placeholders) to your template.

{% raw %}

```markdown
{{tags}}
{{related}}
{{mdnotesFileName}}

{{title}}

{{noteContent}}
```

{% endraw %}
