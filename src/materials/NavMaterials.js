import React, {Component} from 'react';
import {Link} from "react-router-dom";

class NavMaterials extends Component {
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/materials">Профиль</Link></li>
                    <li className="breadcrumb-item"><Link to="/materials/fill">Заполнение</Link></li>
                    <li className=" breadcrumb-item"><a>Аксессуары</a></li>
                    <li className=" breadcrumb-item"><a>Фурнитура</a></li>
                    <li className=" breadcrumb-item"><a>Поставщики</a></li>
                    <li className=" breadcrumb-item"><a>Управление</a></li>
                </ol>
            </nav>);
    }
}

export default NavMaterials;