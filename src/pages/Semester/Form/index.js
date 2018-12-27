import React, { Component } from 'react';
import { Select, Modal, Form, Input, Checkbox, Divider, InputNumber } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

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

const AddForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
            this.validateToNextPassword = this.validateToNextPassword.bind(this);
        }
        compareToFirstPassword(rule, value, callback) {
            const form = this.props.form;
            if (value && value !== form.getFieldValue('password')) {
                callback('¡Las contraseñas no noinciden!');
            } else {
                callback();
            }
        }
        validateToNextPassword(rule, value, callback) {
            const form = this.props.form;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
        render() {
            const { visible, type, onCancel, onOk, form, confirmLoading, data } = this.props;
            const { getFieldDecorator } = form;
            const update = type === 'update';
            return (
                <Modal
                    title="semestera de estudios"
                    okText="Guardar"
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                    onOk={onOk}
                    visible={visible}
                >
                    <Form layout="horizontal">
                        <Form.Item hasFeedback {...formItemLayout} label="semestera de estudios">
                            {getFieldDecorator('name', {
                                initialValue: data.name,
                                rules: [{ required: true, message: '¡Por favor ingrese un semestera de estudios!' } ],
                            })(<Input placeholder="Nombre" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Secuencia">
                            {getFieldDecorator('sequence', {
                                initialValue: data.sequence,
                                rules: [ { required: true, message: '¡Por favor la secuencia!' } ],
                            })(<InputNumber placeholder="Secuencia" />)}
                        </Form.Item>
                        <Form.Item hasFeedback {...formItemLayout} label="Año">
                            {getFieldDecorator('year', {
                                initialValue: data.year,
                                rules: [{ required: true, message: '¡Por favor ingrese el Año!' } ],
                            })(<InputNumber placeholder="Año" />)}
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
            semester: { currentItem },
        } = this.props;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch({
                type: `semester/${modalType}`,
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

        const { dispatch, semester, loading } = this.props;

        // Recuperando stados y datos desde el modelo semester
        const { currentItem, modalType, modalVisible } = semester;

        const semesterModal = {
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
                    type: 'semester/resetsemester',
                });
                handleCancel();
            },
        };

        return (
            <AddForm {...semesterModal} wrappedComponentRef={formRef => (this.formRef = formRef)} />
        );
    }
}

const mapStateToProps = ({ semester, loading }) => {
    return {
        semester,
        loading: loading.effects['semester/create'] || loading.effects['semester/update'],
    };
};

export default connect(mapStateToProps)(ModalForm);
