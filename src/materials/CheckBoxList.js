import React from 'react'


class CheckBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        };
        this.onFlag = this.onFlag.bind(this);
    }

    onFlag() {
        this.setState({
            flag: this.state.flag ? false : true
        });
    }

    cssLabel = {
        'margin': '0'
    };

    renderList(arr) {

        return arr.map((i, index) => {
            if (i.isView || this.state.flag)
                return (<div className="form-check" key={index}>
                    <input id={i.label} type="checkbox" checked={i.isChecked} value={i.label}
                           data-label={this.props.obj.label}
                           onClick={this.props.onChecked}
                           className="form-check-input"/>
                    <label className="form-check-label" htmlFor={i.label}>{i.label}</label>
                </div>)
        });
    }

    onStr(f) {
        return !f ? 'Ещё' : 'Скрыть';
    }

    render() {
        return (
            <div>
                <p style={this.cssLabel} className="lead">{this.props.obj.label}</p>
                {this.renderList(this.props.obj.items)}
                <button type="button" onClick={this.onFlag}
                        className="btn btn-link">{this.onStr(this.state.flag)}</button>
            </div>
        );
    }
}

export default CheckBoxList;