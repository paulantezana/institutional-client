import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, Avatar, Icon, Button, Card, List, Row, Col, Divider } from 'antd';
import styles from './index.less';

import { service } from '@/utils/config';

import FormModal from './FormModal';

class DataList extends Component {
    componentDidMount() {
        this.onQueryAll();
    }

    onQueryAll = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'subsidiary/all',
        });
    };

    render() {
        const { subsidiary, loading, dispatch, setting } = this.props;

        const onShowModal = (modalType, currentItem = {}) => {
            dispatch({
                type: 'subsidiary/showModal',
                payload: { currentItem, modalType },
            });
        };

        const onDetail = id => {
            dispatch(routerRedux.push(`/subsidiary/program/${id}`));
        };

        const onDelete = param => {
            dispatch({
                type: 'subsidiary/delete',
                payload: param,
            });
        };

        const { list } = subsidiary;

        return (
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <Avatar 
                        shape="square" 
                        className={styles.avatar} 
                        size={32} 
                        src={`${service.path}/${setting.logo}`} />
                    <Divider type="vertical"/>
                    <strong>{setting.prefix} {setting.institute}</strong>    
                </div>
                <Divider orientation="left">Filiales</Divider>
                
                <div className={styles.cardList}>
                    <List
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                        dataSource={['', ...list]}
                        renderItem={item => item ? (
                            <List.Item key={item.id}>
                                <Card
                                    hoverable
                                    className={styles.card}
                                    actions={[
                                        <Icon
                                            type="edit"
                                            onClick={() => onShowModal('update', item)}
                                        />,
                                        <Icon
                                            type="cluster"
                                            onClick={() => onDetail(item.id)}
                                        />,
                                        <Icon
                                            type="qrcode"
                                            onClick={() => onShowModal('update', item)}
                                        />,
                                        <Icon
                                            type="delete"
                                            className={styles.delete}
                                            onClick={() => {
                                                Modal.confirm({
                                                    title: '¿Estás seguro de eliminar este registro?',
                                                    content: item.name,
                                                    okText: 'SI',
                                                    okType: 'danger',
                                                    cancelText: 'NO',
                                                    onOk() {
                                                        onDelete({ id: item.id });
                                                    },
                                                });
                                            }}
                                        />,
                                    ]}
                                >
                                    <Card.Meta
                                        description={
                                            <div className={styles.content}>
                                                <div className={styles.header}>
                                                    <Avatar 
                                                        shape="square" 
                                                        className={styles.avatar} 
                                                        size={64} 
                                                        src={`${service.path}/${setting.logo}`} />
                                                    <div>
                                                        <div> Sede o Filial </div>
                                                        <h2> {item.name} </h2>
                                                    </div>
                                                </div>
                                                <ul className={styles.listS}>
                                                    <li>Pais: <span>{ item.country }</span> </li>
                                                    <li>Departamento: <span>{ item.department }</span> </li>
                                                    <li>Provincia: <span>{ item.province }</span> </li>
                                                    <li>Distrito: <span>{ item.district }</span> </li>
                                                    <li>Centro poblado: <span>{ item.town_center }</span> </li>
                                                    <li>Direccion: <span>{ item.address }</span> </li>
                                                </ul>
                                            </div>
                                        }
                                    />
                                </Card>
                            </List.Item>
                        ) : (
                            <List.Item>
                                <Button type="dashed" className={styles.newButton} onClick={()=>onShowModal('create')} >
                                    <Icon type="plus" /> Nuevo
                                </Button>
                            </List.Item>
                        )
                    }/>

                    <FormModal/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ subsidiary, global, loading }) => {
    return {
        subsidiary,
        setting: global.setting,
        loading: loading.effects['subsidiary/all'],
    };
};

export default connect(mapStateToProps)(DataList);
