import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const Validate = Form.create()(
    class extends Component {
        constructor(props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(e) {
            e.preventDefault();
            const { dispatch, form } = this.props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                dispatch({
                    type: 'forgot/forgotValidate',
                    payload: values,
                });
                form.resetFields();
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { loading } = this.props;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <p>Código de seguridad</p>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('key', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Por favor ingrese la clave de recuperación!',
                                },
                                { pattern: /^[0-9]{7}$/, message: '¡Ingrese un nombre válido!' },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="#######"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            loading={loading}
                            htmlType="submit"
                            className={styles.submit}
                        >
                            Continuar
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
        loading: loading.effects['forgot/forgotSearch'],
    };
};

export default connect(mapStateToProps)(Validate);
