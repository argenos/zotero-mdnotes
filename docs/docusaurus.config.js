/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Zotero-mdnotes',
  tagline: 'A Zotero plugin to export item metadata and notes as markdown files.',
  url: 'https://argenos.github.io/',
  baseUrl: '/zotero-mdnotes/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'argenos', // Usually your GitHub org/user name.
  projectName: 'zotero-mdnotes', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Mdnotes',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'quick-start-guide',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/changelog',
          position: 'left',
          label: 'Changelog',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right'
        },
        {
          href: 'https://github.com/argenos/zotero-mdnotes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick-Start Guide',
              to: '/docs/quick-start-guide',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/argenos/zotero-mdnotes',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} argenos. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/argenos/zotero-mdnotes/edit/develop/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
