import React, { Component } from 'react';
import { connect } from 'dva';

class Dashboard extends Component {
    render() {
        return (
            <div>
                Hola instituto
            </div>
        );
    }
}

const mapStateToProps = ({ chart }) => {
    return {
        chart,
    };
};

export default connect(mapStateToProps)(Dashboard);
