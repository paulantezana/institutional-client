import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

import { service }  from '@/utils/config';

import { Spin, Tag, Menu, Icon, Avatar, Tooltip, Row, Col } from 'antd';

export default class AppToggle extends PureComponent {
    render(){
        const { className } = this.props;
        const appMenu = (
            <Menu className={styles.menu}>
                <Menu.Item key="review" >
                    <a href="https://review.paulantezana.com" target="_blanck" className={styles.item}>
                        <img src={`${service.path}/static/apps/review.svg`} alt="review" width="35"/>
                        <small>Review</small>
                    </a>
                </Menu.Item>
                <Menu.Item key="certificate">
                    <a href="https://certificacion.paulantezana.com" target="_blanck" className={styles.item}>
                        <img src={`${service.path}/static/apps/certification.svg`} alt="certification" width="35"/>
                        <small>Certificate</small>
                    </a>
                </Menu.Item>
                <Menu.Item key="monitoring">
                    <a href="https://monitoring.paulantezana.com" target="_blanck" className={styles.item}>
                        <img src={`${service.path}/static/apps/monitoring.svg`} alt="monitoring" width="35"/>
                        <small>Monitoring</small>
                    </a>
                </Menu.Item>
                <Menu.Item key="librarie">
                    <a href="https://librarie.paulantezana.com" target="_blanck" className={styles.item}>
                        <img src={`${service.path}/static/apps/librarie.svg`} alt="librarie" width="35"/>
                        <small>Librarie</small>
                    </a>
                </Menu.Item>
                <Menu.Item key="admission">
                    <a href="https://monitoring.paulantezana.com" target="_blanck" className={styles.item}>
                        <img src={`${service.path}/static/apps/monitoring.svg`} alt="certification" width="35"/>
                        <small>Admission</small>
                    </a>
                </Menu.Item>
            </Menu>
        );

        return(
            <HeaderDropdown overlay={appMenu} placement="bottomRight" >
                <span className={classNames(styles.dropDown, className)}>
                    <Icon type="appstore" />
                </span>
            </HeaderDropdown>
        )
    }
  }