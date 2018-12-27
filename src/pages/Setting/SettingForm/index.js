import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, InputNumber } from 'antd';

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
            const { setting } = this.props;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.dispatch({
                        type: 'global/updateSetting',
                        payload: { ...values, id: setting.id },
                    });
                }
            });
        }

        render() {
            const { getFieldDecorator } = this.props.form;
            const { setting } = this.props;
            return (
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Form.Item hasFeedback label="Prefijo">
                        {getFieldDecorator('prefix', {
                            initialValue: setting.prefix,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="Prefijo Nombre Corto">
                        {getFieldDecorator('prefix_short_name', {
                            initialValue: setting.prefix_short_name,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="Nombre Instituto">
                        {getFieldDecorator('institute', {
                            initialValue: setting.institute,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="Director(@)">
                        {getFieldDecorator('director', {
                            initialValue: setting.director,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="Nivel academico Director(@)">
                        {getFieldDecorator('academic_level_director', {
                            initialValue: setting.academic_level_director,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="Nivel academico nombre corto Director(@)">
                        {getFieldDecorator('short_academic_level_director', {
                            initialValue: setting.short_academic_level_director,
                            rules: [{ required: true, message: '¡Campo obligatorio!' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item hasFeedback label="% minimo de horas de PM">
                        {getFieldDecorator('min_hours_practice_percentage', {
                            initialValue: setting.min_hours_practice_percentage,
                            rules: [
                                {
                                    pattern: /^([3-9]|[1-8][0-9]|9[0-9]|10[01])$/,
                                    message: '¡Solo se permiten valores numéricos de 3 a 101!',
                                },
                                { required: true, message: '¡Por favor ingrese un número!' },
                            ],
                        })(<InputNumber min={3} max={255} step={1} />)}
                    </Form.Item>
                    <Form.Item >
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
        setting: global.setting,
    };
};

export default connect(mapStateToProps)(SettingForm);
