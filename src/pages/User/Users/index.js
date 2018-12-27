import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Modal, Tooltip, Input, Icon, Menu, Dropdown, Button, Card, Avatar } from 'antd';
import PropTypes from 'prop-types';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

import { service } from '@/utils/config';

import FormModal from './Form';

const Search = Input.Search;

class DataList extends Component {
    state = {
        // modalVisible: false,
        // updateModalVisible: false,
        // expandForm: false,
        selectedRows: [],
        search: '',
        // formValues: {},
        // stepFormValues: {},
    };

    componentDidMount() {
        this.onQueryAll();
    }

    onQueryAll = (param = {}) => {
        const { dispatch } = this.props;

        const params = {
            ...param,
            limit: param.limit,
        };

        dispatch({
            type: 'user/all',
            payload: params,
        });
    };

    onShowModal = (modalType, currentItem = {}) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/showModal',
            payload: { currentItem, modalType },
        });
    };

    onDelete = param => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/delete',
            payload: param,
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        this.setState({
            search: e.target.value,
        });

        this.onQueryAll({
            limit: 10,
            search: this.state.search,
        });
    };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            current_page: pagination.current,
            limit: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        this.onQueryAll(params);
    };

    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;

        if (!selectedRows) return;
        switch (e.key) {
            case 'remove':
                console.log(selectedRows.map(row => row.id));
                // dispatch({
                //     type: 'user/delete',
                //     payload: {
                //         ids: selectedRows.map(row => row.key),
                //     },
                //     callback: () => {
                //         this.setState({
                //             selectedRows: [],
                //         });
                //     },
                // });
                break;
            default:
                break;
        }
    };

    render() {
        const { user, setting, loading } = this.props;
        const { data } = user;
        const { selectedRows } = this.state;

        const columns = [
            {
                title: 'Foto',
                key: 'avatar',
                width: '57px',
                render: (a, record) =>
                    a.avatar != '' ? (
                        <Avatar src={`${service.path}/${a.avatar}`} />
                    ) : (
                        <Avatar src={`${service.path}/${setting.logo}`} />
                    ),
            },
            {
                title: 'Nombre de usuario',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Perfil',
                dataIndex: 'profile',
                key: 'profile',
                // filters: [
                //     { text: 'Super Admin', value: 'sa' },
                //     { text: 'Admin', value: 'admin' },
                //     { text: 'Usuario', value: 'user' },
                // ],
                // filteredValue: filteredInfo.profile || null,
                // onFilter: (value, record) => record.profile.includes(value),
            },
            {
                title: 'Accion',
                key: 'accion',
                width: '150px',
                render: (a, record) => {
                    return (
                        <div className={styles.actions}>
                            <Tooltip title="Estado">
                                {/* <Switch
                                    size="small"
                                    checked={a.state}
                                    onChange={checked => onUpdate({ id: a.id, state: checked })}
                                /> */}
                            </Tooltip>
                            <Tooltip title="Editar">
                                <Icon
                                    type="edit"
                                    className={styles.update}
                                    onClick={() => this.onShowModal('update', a)}
                                />
                            </Tooltip>
                            <Tooltip title="Eliminar">
                                <Icon
                                    type="delete"
                                    className={styles.delete}
                                    onClick={() => {
                                        Modal.confirm({
                                            title: '¿Estás seguro de eliminar este registro?',
                                            content: a.nombre,
                                            okText: 'SI',
                                            okType: 'danger',
                                            cancelText: 'NO',
                                            onOk() {
                                                this.onDelete({ id: a.id });
                                            },
                                        });
                                    }}
                                />
                            </Tooltip>
                        </div>
                    );
                },
            },
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">
                    {' '}
                    <Icon type="delete" /> Eliminar
                </Menu.Item>
                <Menu.Item key="export">
                    {' '}
                    <Icon type="export" /> Exportar
                </Menu.Item>
            </Menu>
        );

        return (
            <PageHeaderWrapper title="Usuarios">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Search
                                placeholder="Buscar usuario"
                                value={this.state.search}
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div className={styles.tableListOperator}>
                            <Button
                                icon="plus"
                                type="primary"
                                onClick={() => this.onShowModal('create')}
                            >
                                Nuevo
                            </Button>
                            <Button icon="reload" onClick={() => this.onQueryAll()} />
                            {selectedRows.length > 0 && (
                                <span>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            Mas operaciones <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                            <FormModal />
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={columns}
                            rowKey={record => record.id}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = ({ user, global, loading }) => {
    return {
        user,
        setting: global.setting,
        loading: loading.effects['user/all'],
    };
};

export default connect(mapStateToProps)(DataList);
