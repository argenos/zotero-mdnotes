---
toc: true
---

Starting with **v0.1.0** it's possible to specify custom formatting and to use templates.

## Internal links

The internal link preference influences how file names and therefore how links look.

- `[[wiki links]]` can contain spaces and maintain their case
- `[Markdown links](markdown-links.md)` are all lower case and spaces are replaced with dashes.

## Zotero Note formatting

Zotero Notes are formated in HTML. The hidden preference `extensions.mdnotes.html_to_md` has a dictionary of how the HTML elements are translated into markdown.


## Placeholders

With a few exceptions, you can format any placeholder by adding (or modifying) them in the settings. You can reach the hidden preferences menu from `Edit > Preferences > Advanced > Config Editor`. You can use the search to find existing configurations:

{% include figure image_path="/images/config-editor.png" alt="A screenshot of the config editor window" caption="Config editor" %}


### Default formatting

#### Placeholder format

By default, placeholder contents are replaced with:

{% raw %}

```markdown
{{bullet}} {{field_name}}: {{field_contents}}
```

{% endraw %}

Where:

{% raw %}

- `{{bullet}}` - Defined in `extensions.mdnotes.bullet`
- `{{field_name}}` - The name of the field transformed from camel case into sentence case.
- `{{field_contents}}` - The contents of the field as described below.

{% endraw %}

#### Field format

Any placeholder that doesn't have their formatting defined in the hidden preferences has the following defaults:

- `link_style`: As defined by the preference of [Internal links](#internal-links). Valid values include `wiki`, `markdown` and `no-links`.
- `list_separator`: For fields that contain more than one value, the default is `, `.
- `change_case`: How to capitalize the contents of the field: `title`, `sentence`, `lower` or `upper` case. The default will return the field content in its original case.
- `remove_spaces`: If this is set to `true` spaces will be replaced with dashes.

### Adding new formatting rules

If you want to add custom formatting for any field not currently there, you can add the format for a placeholder with right-click and `New > String`.

### Preference name

The preference name should be `extensions.mdnotes.placeholder.<yourFieldHere>`, where `yourFieldHere` should match a [supported Zotero field](https://www.zotero.org/support/kb/item_types_and_fields). Keep in mind that Zotero fields are usually accessed using camel case, and should be (usually) formatted as `fieldName`, e.g. `seriesTitle`.

#### Preference value

{% raw %}
The value of the preference should be enclosed in braces, and defined as key/value pairs, e.g `{"key": "value"}`.

In addition to the fields described in the [default field format](#field-format), the following options can be specified:

- `content` - Formatting the placeholder's content ([default placeholder format](#placeholder-format))
- `field_contents` - Formatting the field itself, which defaults to `{{content}}`

{% endraw %}

##### Examples

{% raw %}

- Replacing the field label with custom text and changing the list separator to make a list:

    ```markdown
    {"content":"{{bullet}} PDF Attachments\n\t- {{field_contents}}", "field_contents": "{{content}}", "list_separator": "\n\t- "}
    ```

- Making the tags placeholder remove spaces and adding a hash sign before each tag:

    ```markdown
    {"content":"{{bullet}} Tags: {{field_contents}}", "field_contents": "#{{content}}", "link_style": "no-links", "list_separator": ", ", "remove_spaces": "true"}
    ```

{% endraw %}
