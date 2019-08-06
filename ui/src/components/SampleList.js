import React, { Fragment } from 'react';
import { List, Divider } from '@material-ui/core';

import SampleItem from './SampleItem';

function SampleList({ urls }) {
  return (
    <List>
      {urls.map((url, index) => (
        <Fragment key={index}>
          {index ? <Divider variant="inset" component="li" /> : null}
          <SampleItem url={url} />
        </Fragment>
      ))}
    </List>
  );
}

export default SampleList;
