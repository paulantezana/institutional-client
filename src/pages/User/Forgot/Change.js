import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const Change = Form.create()(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
            this.validateToNextPassword = this.validateToNextPassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
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

        handleSubmit(e) {
            e.preventDefault();
            const { dispatch, form } = this.props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: 'forgot/forgotChange',
                    payload: values,
                });
                form.resetFields();
            });
        }

        render() {
            const {
                getFieldDecorator,
                getFieldsError,
                getFieldError,
                isFieldTouched,
            } = this.props.form;
            const { loading } = this.props;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <p>Cambie su contraseña</p>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Por favor ingrese su contraseña!' },
                                {
                                    pattern: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ$@$!%*?&]{6,30}$/,
                                    message:
                                        '¡La contraseña debe contener entre 6 a 30 caracteres!',
                                },
                                { validator: this.validateToNextPassword },
                            ],
                        })(
                            <Input
                                type="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Contraseña"
                            />
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                { required: true, message: '¡Por favor, confirme su contraseña!' },
                                { validator: this.compareToFirstPassword },
                            ],
                        })(
                            <Input
                                type="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Repetir Contraseña"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.submit}
                        >
                            {' '}
                            Recuperar contraseña{' '}
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

const mapStateToProps = ({ forgot, loading }) => {
    return {
        forgot,
        loading: loading.effects['forgot/forgotChange'],
    };
};

export default connect(mapStateToProps)(Change);
