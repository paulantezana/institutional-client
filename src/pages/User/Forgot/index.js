import React from 'react';
import { connect } from 'dva';
import { Steps, Card } from 'antd';
import Link from 'umi/link';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Spacing from '@/components/Spacing';

import Search from './Search';
import Change from './Change';
import Validate from './Validate';

import styles from './index.less';

const Step = Steps.Step;

const Forgout = ({ forgot }) => (
    <div className={styles.container}>
        <Steps size="small" current={forgot.forgotStep}>
            <Step title="Buscar" />
            <Step title="Validar" />
            <Step title="Cambiar" />
        </Steps>
        <Spacing size="large" />
        <div className={styles.content}>
            {forgot.forgotStep === 0 && <Search />}
            {forgot.forgotStep === 1 && <Validate />}
            {forgot.forgotStep === 2 && <Change />}
        </div>
        <Link to="/user/login"><FormattedMessage id="app.login.login" /></Link>
    </div>
);

const mapStateToProps = ({ forgot }) => {
    return { forgot };
};

export default connect(mapStateToProps)(Forgout);
