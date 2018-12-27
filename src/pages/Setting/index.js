import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Divider, Card } from 'antd';
import SettingForm from './SettingForm';
import ProgramSetting from './ProgramSetting';
import UploadLogo from './UploadLogo';
import UploadMinistry from './UploadMinistry';
import Spacing from '@/components/Spacing';

class Setting extends Component {
    render() {
        const {
            global: { user },
        } = this.props;
        return (
            <Card bordered={false}>
                <div>
                    <Divider orientation="left">Sistema de revisión de práctica modulares</Divider>
                    <p>
                        Holisticly supply 2.0 scenarios for out-of-the-box communities. Conveniently
                        create cross-unit niche markets vis-a-vis low-risk high-yield niches.
                        Objectively whiteboard user-centric customer service before best-of-breed
                        convergence. Efficiently impact cooperative experiences without world-class
                        growth strategies. Progressively facilitate client-based testing procedures
                        and high-payoff e-services. Synergistically engineer out-of-the-box
                        relationships without magnetic e-business. Efficiently pursue equity
                        invested action items before reliable interfaces. Seamlessly integrate
                        global web services after virtual expertise. Interactively impact premium
                        synergy and e-business schemas. Uniquely synergize market-driven.
                    </p>
                </div>
                <Row gutter={24}>
                    <Col xs={24} lg={12}>
                        {/* <Divider orientation="left">Configuración general</Divider> */}
                        {user.program_id > 0 ? <ProgramSetting /> : <SettingForm />}
                    </Col>
                    {user.profile == 'sa' && (
                        <Col xs={24} lg={12}>
                            <Divider orientation="left">Logo</Divider>
                            <UploadLogo />
                        </Col>
                    )}
                </Row>
                <Spacing size="large" />
                {user.profile == 'sa' && <UploadMinistry />}
            </Card>
        );
    }
}

const mapStateToProps = ({ global }) => {
    return {
        global,
    };
};

export default connect(mapStateToProps)(Setting);
