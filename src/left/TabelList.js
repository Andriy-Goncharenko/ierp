import React from 'react';


class TabelList extends React.Component {
    constructor(props) {
        super(props);

    }

    list(items) {
        return (items.map(i =>
            <tr>
                <th scope="row">1</th>
                <td>{i.art}</td>
                <td>{i.name}</td>
                <td>{i.size}</td>
                <td>{i.count}</td>
            </tr>));
    }

    render() {
        return (
            <table className={"table table-striped table-hover"}>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                {this.list(this.props.items)}
                </tbody>
            </table>
        );
    }
}

export default TabelList;