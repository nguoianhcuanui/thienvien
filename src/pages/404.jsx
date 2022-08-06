import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

const NotFoundPage = () => (
  <Page>
    <Navbar title="Not found" backLink="Back" />
    <Block strong>
      <p>Không tìm thấy trang này</p>
    </Block>
  </Page>
);

export default NotFoundPage;
