import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';

import styles from './index.less';

const Search = Form.create()(
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
                    type: 'forgot/forgotSearch',
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
                    <p>Ingresa tu correo electrónico para buscar tu cuenta</p>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Por favor ingrese su Correo electrónico!',
                                },
                                { type: 'email', message: '¡Ingrese un correo valido!' },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Correo electrónico"
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
                            Buscar
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

export default connect(mapStateToProps)(Search);
