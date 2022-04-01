const css = require('css');
var shajs = require('sha.js')
const Turndown = require('joplin-turndown').default

function hasStyle(node, property, value) {
  // From https://github.com/laurent22/joplin-turndown/blob/master/src/commonmark-rules.js#L150
  if (!node.nodeName =='SPAN') return false;

  const style = node.getAttribute('style');
  if (!style) return false;

  const o = css.parse('pre {' + style + '}');
  if (!o.stylesheet.rules.length) return;

  const textDecoration = o.stylesheet.rules[0].declarations.find(d => d.property.toLowerCase() === property);
  if (!textDecoration || !textDecoration.value) return false;

  const underlined = textDecoration.value.split(',').map(e => e.trim().toLowerCase()).indexOf(value) >= 0;
  return underlined;

}


function getConverter(){
  // Create a single Turndown provider which we'll use for all exporting. This
  // instance will be generated during Zotero load and will be kept in memory for
  // as long as the app is running.
  const converter = new Turndown({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: Zotero.Prefs.get('extensions.mdnotes.html2md.default.bullet', true),
    strongDelimiter: Zotero.Prefs.get('extensions.mdnotes.html2md.default.strong', true),
    emDelimiter: Zotero.Prefs.get('extensions.mdnotes.html2md.default.em', true)
  })

  converter.addRule('p', {
    filter: 'p',
    replacement: function (content) {
      return '\n\n' + content + '\n\n'
    }, 
    escapeContent: function() {
      return false;
    },
  })

  converter.addRule('emphasis', {
    filter: ['em', 'i'],

    replacement: function (content, node, options) {
     if (!content.trim()) return ''
     return options.emDelimiter + content + options.emDelimiter
    },
    escapeContent: function() {
      return false;
    },
  })

  converter.addRule('strong', {
  filter: ['strong', 'b'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.strongDelimiter + content + options.strongDelimiter
  },
  escapeContent: function() {
    return false;
  },
})

  converter.keep(['span', 'font'])

  converter.addRule('strikethrough', {
    // filter: ['del', 's', 'strike'],
    filter: function (node) {
      return hasStyle(node, 'text-decoration', 'line-through') || node.nodeName === 'S' || node.nodeName === 'DEL' || node.nodeName === 'STRIKE';
    },
    replacement: function (content) {
      let delimiter = Zotero.Prefs.get("extensions.mdnotes.html2md.default.strikethrough", true);
      return delimiter + content + delimiter;
    }
  })

  converter.addRule('underline', {
    // filter: 'u',
    filter: function (node) {
      return hasStyle(node, 'text-decoration', 'underline') || node.nodeName === 'U';
    },
    replacement: function(content) {
      let open = Zotero.Prefs.get(`extensions.mdnotes.html2md.rules.underline.open`, true);
      let close = Zotero.Prefs.get(`extensions.mdnotes.html2md.rules.underline.close`, true);
      return open + content + close;
    }
  })

  return converter;
}

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
    const converter = getConverter();
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

  /**
   * Append Obsidian-style block IDs at the end of each block
   * @param {string} md Markdown string
   */
  this.addBlockIds = function (md, citekey) {
    const lines = md.split('\n')
    let new_md = "";

    // Loop through the file
    for (let line of lines) {
      let blockId = this.generateBlockId(line, citekey);

      if (line.startsWith('#') || /^\s*$/gm.test(line)){
        new_md += `${line}\n`;
      } else {
        new_md += `${line} ^${blockId}\n`;
      }

    }

    return new_md;
  }

  this.generateBlockId = function (str, citekey) {
    let ck = citekey ? citekey + "-" : "";
    let hash = shajs('sha256').update(str).digest('hex').substr(0, 7);
    return `${ck}${hash}`
  }

}
