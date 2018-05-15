import React, {Component} from 'react';

class Tables extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.items.map((i, index) => <div className="col-12" key={index}>
            <h3>{i.label}</h3>
            <table className="table table-striped">
                <thead>
                <tr>
                    {i.categories.map((i, _i) => <th key={_i} scope="col">{i}</th>)}
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {/* {this.renderItems(i.items, index, i.label)}*/}
                </tbody>
            </table>
            <button type="button" className="btn btn-link" onClick={this.addItem} data-key={index}>Добавить</button>
        </div>)
    }
}

export default Tables;