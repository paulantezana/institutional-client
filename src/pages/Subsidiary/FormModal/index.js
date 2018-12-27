import React, { Component } from 'react';
import { Select, Modal, Form, Input, Checkbox, InputNumber, DatePicker, Radio } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import moment from 'moment';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Option = Select.Option;

const AddForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            const {
                visible,
                user,
                onCancel,
                onOk,
                form,
                confirmLoading,
                data,
            } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    title="Alumno"
                    okText="Guardar"
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                    onOk={onOk}
                    visible={visible}
                >
                    <Form layout="horizontal">
                        <Form.Item hasFeedback {...formItemLayout} label="Nombre">
                            {getFieldDecorator('name', {
                                initialValue: data.name,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Nombre" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Pais">
                            {getFieldDecorator('country', {
                                initialValue: data.country,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Pais" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Departamento">
                            {getFieldDecorator('department', {
                                initialValue: data.department,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Departamento" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Provincia">
                            {getFieldDecorator('province', {
                                initialValue: data.province,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Provincia" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Distrito">
                            {getFieldDecorator('district', {
                                initialValue: data.district,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Distrito" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Centro poblado">
                            {getFieldDecorator('town_center', {
                                initialValue: data.town_center,
                                rules: [
                                    { required: true, message: '¡Por favor ingrese un nombre!' },
                                ],
                            })(<Input placeholder="Centro poblado" />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Estado">
                            {getFieldDecorator('state', {
                                valuePropName: 'checked',
                                initialValue: data.state,
                            })(<Checkbox />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleConfirm(modalType) {
        const {
            dispatch,
            subsidiary: { currentItem },
        } = this.props;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch({
                type: `subsidiary/${modalType}`,
                payload: { ...values, id: currentItem.id },
            });
            form.resetFields();
        });
    }

    handleCancel() {
        const form = this.formRef.props.form;
        form.resetFields();
    }

    render() {
        const { handleConfirm, handleCancel } = this;

        const { dispatch, subsidiary, global, loading } = this.props;

        // Recuperando stados y datos desde el modelo subsidiary
        const { currentItem, modalType, modalVisible } = subsidiary;

        const subsidiaryModal = {
            data: modalType == 'create' ? { state: true } : currentItem,
            disabled: modalType == 'detail',
            type: modalType,
            user: global.user,
            visible: modalVisible,
            confirmLoading: loading,
            onOk() {
                handleConfirm(modalType);
            },
            onCancel() {
                dispatch({
                    type: 'subsidiary/resetSubsidiary',
                });
                handleCancel();
            },
        };

        return (
            <AddForm {...subsidiaryModal} wrappedComponentRef={formRef => (this.formRef = formRef)} />
        );
    }
}

const mapStateToProps = ({ subsidiary, global, loading }) => {
    return {
        subsidiary,
        global,
        loading: loading.effects['subsidiary/create'] || loading.effects['subsidiary/update'],
    };
};

export default connect(mapStateToProps)(ModalForm);
