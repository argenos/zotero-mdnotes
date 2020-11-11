---
toc: true
---

You can specify a templates directory in the `Tools > Mdnote preferences`.
Once a directory is specified, Mdnotes will look for the following files:

```
.
├── Mdnotes Default Template.md
├── Standalone Note Template.md
├── Zotero Metadata Template.md
└── Zotero Note Template.md

```
The files must be located at the root of the folder you chose.
If there is no path specified or the file doesn't exist, Mdnotes will use the [default](#default) templates.

## Defaults

The default templates can give you an idea of existing [placeholders and wildcards](/docs/placeholders).

### Mdnotes Default Template
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

{% raw %}

```markdown
Related to: [[%(metadataFileName)]]

## Notes
-
```

{% endraw %}

### Zotero Metadata Template

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

{% raw %}

```markdown
{{tags}}
{{related}}
{{parentTitle}}

{{title}}

{{noteContent}}
```

{% endraw %}
