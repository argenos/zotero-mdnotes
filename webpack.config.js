const path = require('path')

// Defines the entry points for all additional helper classes. Each entry
// needs to be compiled and then placed into the content-subdirectory.
// For adding new files, do not forget to load the file in overlay.xul.

// TODO: Possibly integrated mdnotes.js into the full build toolchain so that
// we can have a cleaner plugin file with exactly one entry point and one
// produced JS artefact which can be shipped with the plugin file.
module.exports = {
  entry: './src/markdown-utils.js',
  output: {
    filename: 'markdown-utils.js',
    path: path.resolve(__dirname, 'content')
  },
  resolve: {
    // As npm-modules generally expect some node-stuff, we have to polyfill some
    // of these so that the expected functionality is being supported in the
    // resulting file.
    fallback: {
      // The CSS stringify component depends on fs, but we don't actually
      // need it for our own purposes, so we won't need to polyfill.
      "fs": false,
      // Path is being required by urix and CSS stringify, but we can polyfill it.
      "path": require.resolve("path-browserify")
    }
  }
}
