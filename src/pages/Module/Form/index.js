import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

const AddForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            const { visible, onCancel, onOk, form, confirmLoading, data } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    title={data.name ? data.name : 'Modulo'}
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
                                rules: [{ required: true, message: '¡Por favor un nombre!' }],
                            })(<Input placeholder="Nombre" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Numero">
                            {getFieldDecorator('sequence', {
                                initialValue: data.sequence,
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Numero"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Creditos">
                            {getFieldDecorator('points', {
                                initialValue: data.points,
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Creditos"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Horas">
                            {getFieldDecorator('hours', {
                                initialValue: data.hours,
                            })(
                                <InputNumber
                                    min={0}
                                    placeholder="Horas"
                                    style={{ width: '100%' }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Semestres">
                            {getFieldDecorator('semester', {
                                initialValue: data.semester,
                            })(<Input placeholder="Semestres" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Descripcion">
                            {getFieldDecorator('description', {
                                initialValue: data.description,
                            })(<Input.TextArea />)}
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
            moduler: { currentItem },
        } = this.props;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch({
                type: `moduler/${modalType}`,
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

        const { dispatch, moduler, loading } = this.props;

        // Recuperando stados y datos desde el modelo moduler
        const { currentItem, modalType, modalVisible } = moduler;

        const modulerModal = {
            data: modalType == 'create' ? { state: true } : currentItem,
            disabled: modalType == 'detail',
            type: modalType,
            visible: modalVisible,
            confirmLoading: loading,
            onOk() {
                handleConfirm(modalType);
            },
            onCancel() {
                dispatch({
                    type: 'moduler/resetModule',
                });
                handleCancel();
            },
        };

        return (
            <AddForm {...modulerModal} wrappedComponentRef={formRef => (this.formRef = formRef)} />
        );
    }
}

const mapStateToProps = ({ moduler, loading }) => {
    return {
        moduler,
        loading: loading.effects['moduler/create'] || loading.effects['moduler/update'],
    };
};

export default connect(mapStateToProps)(ModalForm);
