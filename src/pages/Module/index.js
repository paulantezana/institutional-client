import React from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Avatar } from 'antd';

import styles from './index.less';
import { service } from '@/utils/config';

import ModalForm from './Form';
import DataList from './List';

class Moduler extends React.Component {
    constructor(props) {
        super(props);
        this.onQueryAll = this.onQueryAll.bind(this);
    }

    // componentDidMount() {
    //     this.onQueryAll();
    // }

    onQueryAll() {
        const { dispatch } = this.props;
        dispatch({
            type: 'moduler/all',
        });
    }

    render() {
        const { loadingAll, loadingDelete, moduler, dispatch } = this.props;
        const { list } = moduler;

        const modulerListProps = {
            dataSource: list,
            loadingAll: loadingAll,
            loadingDelete: loadingDelete,
            onShowModalEdit(type, currentItem) {
                onShowModal(type, currentItem);
            },
            onDelete(param) {
                dispatch({
                    type: 'moduler/delete',
                    payload: param,
                });
            },
        };

        const onShowModal = (modalType, currentItem = {}) => {
            dispatch({
                type: 'moduler/showModal',
                payload: { currentItem, modalType },
            });
        };
        return (
            <Card>
                <div className={styles.header}>
                    <Button icon="plus" type="primary" onClick={() => onShowModal('create')}>
                        Nuevo modulo
                    </Button>
                    <Button icon="reload" onClick={() => this.onQueryAll()}>
                        Actualizar
                    </Button>
                    <ModalForm />
                </div>
                <DataList {...modulerListProps} />
            </Card>
        );
    }
}
const mapStateToProps = ({ moduler, loading }) => {
    return {
        moduler,
        loadingAll: loading.effects['moduler/all'],
        loadingDelete: loading.effects['moduler/delete'],
    };
};

export default connect(mapStateToProps)(Moduler);
