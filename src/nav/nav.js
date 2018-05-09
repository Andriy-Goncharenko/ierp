import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className={'navbar navbar-expand-lg navbar-light bg-white'}>
                <div className={'collapse navbar-collapse'} id={"nav"}>
                    <ul className={'navbar-nav mr-auto mt-2 mt-lg-0'}>
                        <li className={'nav-item'}>
                            <Link className={'nav-link'} to="/">Главная</Link>
                        </li>
                        <li className={'nav-item dropdown'}>
                            <Link className={'nav-link'} to="/materials">Материалы</Link>
                        </li>
                        <li className={'nav-item'}>
                            <Link className={'nav-link'} to="/constructors">Конструктор</Link>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}>Закупки</a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}>Бухгалтерия</a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}>Доставка</a>
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'}>Склад</a>
                        </li>
                        <li className={'nav-item'}>
                            <input className="form-control" type="text" placeholder="Поиск заказа"/>
                        </li>
                    </ul>


                    <a className="navbar-brand" href="#">
                        <img src={this.props.user.imageUrl} width="40" height="40"
                             className="d-inline-block align-top rounded-circle"
                             alt=""/>
                    </a>
                </div>
            </nav>
        );
    }
}

export default Nav;