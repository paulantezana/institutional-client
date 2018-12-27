import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Table, Row, Col, Tabs, Icon, Divider, Avatar } from 'antd';

import styles from './index.less';
import FormModal from './Form';

import Semester from './../Semester';
import Module from './../Module';

class DataList extends Component {
    componentDidMount(){
        this.onQueryAll();
    }

    onQueryAll = (param = {}) => {
        const { dispatch } = this.props;

        const params = {
            ...param,
            limit: param.limit,
        }

        dispatch({
            type: 'program/all',
            payload: params,
        });
    }

    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'program/showModal',
            payload: { currentItem, modalType },
        });
    };

    onTabClick = (activeKey) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'program/setCurrentProgramID',
            payload: parseInt(activeKey),
        });

        dispatch({
            type: 'semester/all',
            payload: { program_id: parseInt(activeKey) },
        });
    }

    render() {
        const { program, loading } = this.props;

        const panes = program.list.map(item=>({
            title: <div>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <Icon type="edit" onClick={()=>this.onShowModal('update',item)} />
                </div>
                { item.name }
            </div>,
            content: '',
            key: item.id,
            closable: false
        })) 
       
        return (
            <div>
                <Tabs onTabClick={this.onTabClick} tabBarExtraContent={
                        <Button icon="plus" size="small" type="primary" onClick={()=>this.onShowModal('create')}></Button>
                    }>
                    {
                        panes.map(pane => 
                            <Tabs.TabPane tab={pane.title} key={pane.key} closable={pane.closable}/>
                        )
                    }
                </Tabs>
                <Semester/>
                <Module/>
                <FormModal />
            </div>
        );
    }
}


const mapStateToProps = ({ program, loading }) => {
    return {
        program,
        loading: loading.effects['program/all'],
    };
};

export default connect(mapStateToProps)(DataList);
