import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input } from 'antd';
import styles from './BaseView.less';
import AvatarView from './avatarView';

const ProfileForm = Form.create()(
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(e) {
            e.preventDefault();
            const { data, dispatch } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'global/updateProfile',
                        payload: { ...values, id: data.id },
                    });
                }
            });
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            const { data, loading } = this.props;
            return (
                <div className={styles.baseView}>
                    <div className={styles.left}>
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <Form.Item hasFeedback label="Email">
                                {getFieldDecorator('email', {
                                    initialValue: data.email,
                                    rules: [
                                        { type: 'email', message: '¡Ingrese un correo valido!' },
                                        {
                                            required: true,
                                            message: '¡Por favor ingrese su correo!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Nombre de usuario">
                                {getFieldDecorator('user_name', {
                                    initialValue: data.user_name,
                                    rules: [
                                        { required: true, message: '¡Ingrese un nombre válido!' },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit">
                                    Guardar cambios
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={styles.right}>
                        <AvatarView />
                    </div>
                </div>
            );
        }
    }
);

const mapStateToProps = ({ global, loading }) => {
    return {
        data: global.user,
        loading: loading.effects['global/updateProfile'],
    };
};

export default connect(mapStateToProps)(ProfileForm);
