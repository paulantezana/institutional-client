import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/paulantezana',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: <Icon type="facebook" />,
          href: 'https://www.facebook.com/Paulantezana-764145183607069/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 paulantezana.com
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
