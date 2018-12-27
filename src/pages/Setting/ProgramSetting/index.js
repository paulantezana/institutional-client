import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, InputNumber } from 'antd';

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
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SettingForm = Form.create()(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: false,
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(e) {
            e.preventDefault();
            const { program } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type: 'global/updateProgram',
                        payload: { ...values, id: program.id },
                    });
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { program } = this.props;
            return (
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item hasFeedback {...formItemLayout} label="Programa de estudios">
                        {getFieldDecorator('name', {
                            initialValue: program.name,
                            rules: [
                                {
                                    required: true,
                                    message: '¡Por favor ingrese un programa de estudios!',
                                },
                            ],
                        })(<Input placeholder="Nombre" />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Guardar cambios
                        </Button>
                    </Form.Item>
                </Form>
            );
        }
    }
);

const mapStateToProps = ({ global }) => {
    return {
        program: global.program,
    };
};

export default connect(mapStateToProps)(SettingForm);
