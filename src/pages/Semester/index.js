import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, List, Row, Col, Icon, Divider } from 'antd';

import styles from './index.less';
import FormModal from './Form';

class DataList extends Component {
    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'semester/showModal',
            payload: { currentItem, modalType },
        });
    };

    onDelete = (param) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'semester/delete',
            payload: param,
        });
    }

    render() {
        const { semester, loading, program } = this.props;
        const { currentProgramID } = program;
        return currentProgramID > 0 ? (
            <Card
                className={styles.card}
                title={
                    <div className={styles.operation}>
                        <span>Semestres</span>
                        <Button icon="plus" size="small" type="primary" onClick={()=>this.onShowModal('create')}/>
                    </div>
                }>
                <div>
                    <List
                        dataSource={semester.list}
                        size="small"
                        loading={loading}
                        renderItem={item => (
                            <List.Item>
                                <div>
                                    <Icon type="edit" onClick={() => this.onShowModal('update', item)}/>
                                    <Divider type="vertical"/>
                                    {item.name}
                                </div>
                            </List.Item>
                        )}/>
                    <FormModal />
                </div>
            </Card>
        ) : (<i></i>);
    }
}


const mapStateToProps = ({ semester, program, loading }) => {
    return {
        semester,
        program,
        loading: loading.effects['semester/all'],
    };
};

export default connect(mapStateToProps)(DataList);
