---
title: Hidden Preferences
---

In addition to the ability to add [custom placeholders](placeholders.md#custom-placeholders) and [customize placeholder formatting](formatting.md#placeholders), there are a few hidden preferences for editor-specific syntax.

## Obsidian

A few preferences to use exported files with [Obsidian](https://obsidian.md/) are described below.

### Block IDs

Setting `extensions.mdnotes.obsidian.blocks` to true will append a block ID to all non-header text blocks of exported Zotero notes, i.e. to each highlight and annotation extracted by Zotfile.

:::info

The block ID is using a hash of the block contents, i.e. if you change your format the block won't match any more. I know this is brittle, and I'm not entirely happy with it, so I'm open to suggestions if you have a better idea to make the exported blocks reusable.

:::

### Obsidian URI

Setting `extensions.mdnotes.obsidian.attach_obsidian_uri` to true will add a link to the Obsidian notes as an attachment to their items, just like with [attach linked file](../getting-started/configuration.md#add-the-created-files-as-linked-files-to-zotero) preference.

You must specify your vault name in `extensions.mdnotes.obsidian.vault`. The Obsidian link is then `obsidian://open?vault=<vault>&file=<file name>`.

:::note
This assumes you are using `Shortest path` for your link format so all file names are unique.
:::
