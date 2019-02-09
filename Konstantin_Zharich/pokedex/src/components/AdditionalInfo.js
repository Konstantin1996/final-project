import React, { Component } from 'react'

export class AdditionalInfo extends Component {
    render() {
        return (
            <React.Fragment>
                <p>ID: {this.props.id}</p>
                <p>Status: {this.props.catched ? ('Catched') : ('Not Catched')} </p>
                {this.props.showDate ? <p>Date: {this.props.catchedDate}</p>:null}
                {this.props.showTime ? <p>Time: {this.props.catchedTime}</p>:null}
            </React.Fragment>
        )
    }
}

export default AdditionalInfo