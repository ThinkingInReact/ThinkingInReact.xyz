import React, { Component } from 'react';
import cx from 'classnames';
import TOCLinks from './TOCLinks';

class TOCLink extends Component {
  render() {
    const { sections, chapters, title, url, finished, preview } = this.props;

    return (
      <li>
        <a className={cx('TOCLink', {'TOCLink--Disabled': !finished, 'TOCLink--Finished': finished, 'TOCLink--Preview': preview})} href={url}>{title}</a>
        {sections && <TOCLinks chapters={sections} />}
      </li>
    )
  }
}

export default TOCLink;
