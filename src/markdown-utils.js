const Turndown = require('joplin-turndown').default

// Create a single Turndown provider which we'll use for all exporting. This
// instance will be generated during Zotero load and will be kept in memory for
// as long as the app is running.
const converter = new Turndown({
  headingStyle: 'atx',
  hr: '---'
})

// Attach all utility functions to the Zotero.MarkdownUtils object. Any file
// that has access to the Zotero object can then use it.
Zotero.MarkdownUtils = new function () {
  /**
   * Converts a HTML string to Markdown
   *
   * @param   {string}  html  The HTML to convert
   *
   * @return  {string}        The Markdown result
   */
  this.html2md = function (html) {
    return converter.turndown(html)
  }

  /**
   * Extracts a possible title from the given Markdown. Attempts to use a h1,
   * but falls back to simply the first non-empty line.
   *
   * @param   {string}  md  The Markdown
   *
   * @return  {string}      The extracted title
   */
  this.extractTitle = function (md) {
    const lines = md.split('\n')

    // First, attempt to extract the first heading level 1
    for (let line of lines) {
      if (/^#\s/.test(line)) {
        return line.substr(2) // Remove the "# " from the beginning
      }
    }

    // No heading level 1, so let's use the first paragraph
    for (let i = 0; i < lines.length; i++) {
      let candidate = lines[i].trim()

      if (candidate === '') {
        continue // Empty line
      }

      // We got a non-empty line. We need to strip some Markdown from it. I
      // guess right now removing bolds and italics suffices here, because the
      // main cause right now is to retrieve the
      // **Extracted Annotations (date)** - paragraph from it.
      // However, feel free to amend this to actually get to a plain text
      // version of that first paragraph.
      candidate = candidate.replace(/\*\*(.*)\*\*/g, '$1')
      candidate = candidate.replace(/\*(.*)\*/g, '$1')
      candidate = candidate.replace(/__(.*)__/g, '$1')
      candidate = candidate.replace(/_(.*)_/g, '$1')

      return candidate
    }

    // Return an empty string as fallback. TODO: Add handling in mdnotes.js!
    return ''
  }
}
