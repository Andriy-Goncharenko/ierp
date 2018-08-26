import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import io from 'socket.io-client';
import 'moment/locale/ru'


class Procurement extends Component {

    socet = {};

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            orders: [],
        };


        moment.locale('ru');
    }

    componentDidMount() {
        this.socet = io();
        this.socet.on('connect', () => {
            this.socet.emit('getProcurement');
        });
        this.socet.on('getProcurement', data => {
            this.setState({show: true});
            if (data) {
                this.setState({orders: data});
            }
        })
    }

    render() {
        let {orders, show} = this.state;
        if (show) {
            return (
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        {orders.map(order =>
                            <div className=" col-3">
                                <div className={'card'}>
                                    <div className="card-body">
                                        <h5 className="card-title">Заказ - {order._id}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{order.date}</h6>
                                        <p className="card-text">Статус: ***</p>
                                        <Link className={'nav-link'} to={"/procurement/" + order._id}>Открыть</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>)
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

export default Procurement;