import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Export to markdown',
    Svg: require('../../static/img/markdown-brands.svg').default,

    description: (
      <>
        Export Zotero metadata and notes to markdown and create files for your own notes.
      </>
    ),
  },
  {
    title: 'Customize your exports',
    Svg: require('../../static/img/code-json.svg').default,   
    description: (
      <>
        Customize the content of your exports by creating templates and adding item or note placeholders.
      </>
    ),
  },
  {
    title: 'Add custom formatting',
    Svg: require('../../static/img/round-format-shapes.svg').default,
    description: (
      <>
        Customize how each exported field should be formatted: Add any Markdown formatting and make them links, tags, lists.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
