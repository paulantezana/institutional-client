import React, { Component } from 'react';
import { Select, Modal, Form, Input, Checkbox, Divider } from 'antd';
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
                    title="Programa de estudios"
                    okText="Guardar"
                    confirmLoading={confirmLoading}
                    onCancel={onCancel}
                    onOk={onOk}
                    visible={visible}
                >
                    <Form layout="horizontal">
                        <Form.Item hasFeedback {...formItemLayout} label="Programa de estudios">
                            {getFieldDecorator('name', {
                                initialValue: data.name,
                                rules: [
                                    {
                                        required: true,
                                        message: '¡Por favor ingrese un programa de estudios!',
                                    },
                                ],
                            })(<Input placeholder="Nombre" />)}
                        </Form.Item>
                        <div className={update ? styles.hidden : styles.visible}>
                            <Divider orientation="left" >Datos del coordinador</Divider>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="DNI"
                            >
                                {getFieldDecorator('dni', {
                                    initialValue: data.dni,
                                    rules: [
                                        { required: !update, message: '¡Por favor ingrese su DNI!' },
                                        { pattern: /^[0-9]{8}$/, message: '¡Ingrese un DNI válido!' },
                                    ],
                                })(<Input placeholder="DNI" />)}
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="Jefe de area"
                            >
                                {getFieldDecorator('first_name', {
                                    initialValue: data.first_name,
                                    rules: [
                                        {
                                            required: !update,
                                            message: '¡Por favor ingrese un jefe area!',
                                        },
                                    ],
                                })(<Input placeholder="Nombre" />)}
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="Email"
                            >
                                {getFieldDecorator('email', {
                                    initialValue: data.email,
                                    rules: [
                                        { required: !update, message: 'Por favor ingrese su correo!' },
                                        { type: 'email', message: '¡Ingrese un correo valido!' },
                                    ],
                                })(<Input placeholder="Email" />)}
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="Nombre de usuario"
                            >
                                {getFieldDecorator('user_name', {
                                    rules: [
                                        {
                                            required: !update,
                                            message: '¡Por favor ingrese su nombre de usuario!',
                                        },
                                    ],
                                })(<Input placeholder="Nombre de usuario" />)}
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="Contraseña"
                            >
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: !update,
                                            message: 'Por favor ingrese su contraseña!',
                                        },
                                        {
                                            pattern: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ$@$!%*?&]{6,30}$/,
                                            message:
                                                '¡La contraseña debe contener entre 6 a 30 caracteres!',
                                        },
                                        { validator: this.validateToNextPassword },
                                    ],
                                })(<Input type="password" placeholder="Contraseña" />)}
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                {...formItemLayout}
                                label="Confirmar contraseña"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: !update,
                                            message: '¡Por favor, confirme su contraseña!',
                                        },
                                        { validator: this.compareToFirstPassword },
                                    ],
                                })(<Input type="password" placeholder="Confirmar Contraseña" />)}
                            </Form.Item>
                        </div>
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
            program: { currentItem },
        } = this.props;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            dispatch({
                type: `program/${modalType}`,
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

        const { dispatch, program, loading } = this.props;

        // Recuperando stados y datos desde el modelo program
        const { currentItem, modalType, modalVisible } = program;

        const programModal = {
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
                    type: 'program/resetProgram',
                });
                handleCancel();
            },
        };

        return (
            <AddForm {...programModal} wrappedComponentRef={formRef => (this.formRef = formRef)} />
        );
    }
}

const mapStateToProps = ({ program, loading }) => {
    return {
        program,
        loading: loading.effects['program/create'] || loading.effects['program/update'],
    };
};

export default connect(mapStateToProps)(ModalForm);
