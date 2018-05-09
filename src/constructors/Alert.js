import React, {Component} from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {flag: props.flag};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({flag: false});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            text: nextProps.text,
            flag: nextProps.flag
        };
    }

    change() {
        if (this.state.flag) {
            return "alert alert-success alert-dismissible show";
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