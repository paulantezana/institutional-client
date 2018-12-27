import React, { Fragment } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Upload, Button } from 'antd';
import { connect } from 'dva';
import { service } from '@/utils/config';
import styles from './avatar.less';
import Spacing from '@/components/Spacing';

class AvatarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload() {
        const { fileList } = this.state;
        this.props.dispatch({
            type: 'user/uploadAvatar',
            payload: {
                id: this.props.user.id,
                avatar: fileList[0],
            },
        });
    }

    render() {
        const { uploading } = this.state;
        const props = {
            onRemove: file => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        const { user, setting } = this.props;
        return (
            <Fragment>
                <div className={styles.avatar_title}>Avatar</div>
                <div className={styles.avatar}>
                    {user.avatar != '' ? (
                        <img src={`${service.path}/${user.avatar}`} alt="avatar" />
                    ) : (
                        <img src={`${service.path}/${setting.logo}`} alt="avatar" />
                    )}
                </div>
                <Upload {...props}>
                    <div className={styles.button_view}>
                        <Button icon="upload">
                            <FormattedMessage
                                id="app.settings.basic.avatar"
                                defaultMessage="Change avatar"
                            />
                        </Button>
                    </div>
                </Upload>
                <Spacing size="large" />
                <Button type="primary" onClick={this.handleUpload}>
                    Subir
                </Button>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ global, setting }) => {
    return {
        user: global.user,
        setting: global.setting,
    };
};

export default connect(mapStateToProps)(AvatarView);
