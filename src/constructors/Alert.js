import React, {Component} from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {flag: props.flag, type: "alert-success"};
        if (props.type) {
            this.setState({type: props.type});
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({flag: false});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            text: nextProps.text,
            flag: nextProps.flag,
            type: nextProps.type
        };
    }

    change() {
        if (this.state.flag) {
            return "alert " + this.state.type + "  alert-dismissible show";
        }
        else {
            return "d-none";
        }
    }

    render() {
        return (<div className={this.change()} role="alert">
            {this.props.text}
            <button type="button" onClick={this.handleChange} className="close">
                <span>&times;</span>
            </button>
        </div>)
    }
}

export default Alert;