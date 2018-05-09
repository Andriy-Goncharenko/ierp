import React, {Component} from 'react';

class ConstructorsChild extends Component {
    constructor(props) {
        super(props);
    }

    renderTD(items) {
        return items.map(i => <td>{i}</td>)
    };

    renderTableItems(items) {
        return items.map(i => <tr>{this.renderTD(i)}</tr>);
    }

    render() {
        return (
            <div className="col-12">
                <h3>{this.props.pattern.label}</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {this.props.pattern.categories.map(i => <th scope="col">{i.name}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableItems(this.props.pattern.items)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ConstructorsChild;