import React, {Component} from 'react';
import {withRouter}       from 'react-router-dom';
import io                 from 'socket.io-client';
import moment             from 'moment';
import 'moment/locale/ru'

class Constructors extends Component {
    socet = {};

    constructor(props) {
        super(props);
        this.state = {
            other: [],
            show: false
        };

        moment.locale('ru');

        this.textInput = React.createRef();
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount() {
        this.socet = io();
        this.socet.on('connect', () => {
            this.socet.emit('gets', {});
        });
        this.socet.on('state', data => {
            this.setState({show: true});
            if (data) {
                this.setState({other: [...data]});
            }
        })
    }

    handelSubmit(e) {
        if (this.textInput.current.value) {
            this.props.history.push('/constructors/download/' + this.textInput.current.value);
        }
        e.preventDefault();
    }


    render() {
        let {show, other} = this.state;
        let {history} = this.props;
        if (show) {
            return (<div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <form onSubmit={this.handelSubmit} className="form-inline">
                                <div className="form-group mb-2">
                                    <input type="text" ref={this.textInput} className="form-control"
                                           placeholder="Номер заказа"/>
                                </div>
                                <button type="submit" className="btn btn-outline-success mb-2"
                                        style={{marginLeft: 16}}>Создать
                                </button>
                            </form>
                        </div>
                        <div className={'col-6'}>
                            <h3>Заказы:</h3>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Дата</th>
                                    <th scope="col">Отправлен</th>
                                </tr>
                                </thead>
                                <tbody>
                                {other.map(o =>
                                    <tr onClick={() => history.push('/constructors/download/' + o._id)}>
                                        <th scope="row">{o._id}</th>
                                        <td>{moment(o.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        <td>{o.saveFlag ? 'Да' : 'Нет'}</td>
                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={'container-fluid'}>
                    <div className="loader" id="loader-4">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>);
        }
    }
}

export default withRouter(Constructors);