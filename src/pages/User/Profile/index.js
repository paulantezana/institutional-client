import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Icon, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import ProfileForm from './baseView';
import PasswordForm from './password';

class Profile extends Component {
    render() {
        return (
            <PageHeaderWrapper title="Perfil">
                <Card bordered={false}>
                    <Tabs defaultActiveKey="1" tabPosition="top">
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="user" />
                                    Datos
                                </span>
                            }
                            key="1"
                        >
                            <ProfileForm />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="safety" />
                                    Password
                                </span>
                            }
                            key="2"
                        >
                            <PasswordForm />
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = ({ global }) => {
    return {
        global,
    };
};

export default connect(mapStateToProps)(Profile);
