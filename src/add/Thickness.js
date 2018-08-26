import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';

class Thickness extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className={"row marginTop"}>
            <div className={"col-6"}><input type="number"
                                            className="form-control"
                                            placeholder="Наименование ,мм"
                                            value={this.props.item.value}
                                            onChange={e => this.props.onChangeThickness(this.props.i, 'value', e.target.value)}/>
            </div>
            <div className={"col-6"}>
                <div className="input-group mb-3">
                    <input type="number" className="form-control" placeholder="Цена"
                           value={this.props.item.price}
                           onChange={e => this.props.onChangeThickness(this.props.i, 'price', e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary"
                                onClick={() => this.props.handleDeleteThickness(this.props.i)}
                                type="button"><FeatherIcon

                            icon={"x"} size={14}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Thickness;