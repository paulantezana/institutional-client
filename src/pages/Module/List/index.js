import React, { Component } from 'react';
import { List, Icon, Modal, Button, Card, Tag } from 'antd';

import styles from './index.less';
import { service } from '@/utils/config';
import Spacing from '@/components/Spacing';

class DataList extends Component {
    render() {
        const { onShowModalEdit, onDelete, dataSource, loadingAll, loadingDelete } = this.props;
        return (
            <List
                loading={loadingAll}
                grid={{ gutter: 24, lg: 2, md: 1, sm: 1, xs: 1 }}
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <Card
                            hoverable
                            className={styles.card}
                            actions={[
                                <Icon
                                    type="edit"
                                    className={styles.update}
                                    onClick={() => onShowModalEdit('update', item)}
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
                                avatar={
                                    <img
                                        alt=""
                                        className={styles.cardAvatar}
                                        src={`${service.path}/static/logo.png`}
                                    />
                                }
                                title={item.name}
                                description={
                                    <div>
                                        <div>{item.description}</div>
                                        <Spacing />
                                        <Tag color="purple">
                                            <Icon type="clock-circle-o" /> Horas {item.hours}
                                        </Tag>
                                        <Tag color="blue">
                                            <Icon type="clock-circle-o" /> Semestres {item.semester}
                                        </Tag>
                                    </div>
                                }
                            />
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

export default DataList;
