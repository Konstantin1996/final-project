import React, { Component } from 'react'

export class AdditionalInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <p>Catched Date: {this.props.catchedDate ? this.props.catchedDate : null}</p>
                <p>Catched Time: {this.props.catchedTime ? this.props.catchedTime : null}</p>
            </React.Fragment>
        )
    }
}

export default AdditionalInfo
