import React, {Component} from 'react';
import CheckBoxList from './CheckBoxList';
import NavMaterials from './NavMaterials';
import {Link, withRouter} from "react-router-dom";

class Fill extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    checkList() {
        return this.state.checkBoxs.map((i, index) => <CheckBoxList key={index} obj={i} onChecked={this.onChecked}/>)
    }

    styleImg = {
        width: '100px'
    };

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className="col-md-12">
                        <NavMaterials/>
                    </div>
                    <div className="col-12">
                        <div className={"navMyBar"}>
                            <Link to={"/add/fill/"}>Добавить</Link>
                        </div>
                        <table className="table table-borderless table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Артикул</th>
                                <th scope="col">Тип</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размеры (ВxШ)</th>
                                <th scope="col">Толщина</th>
                                <th scope="col">Дополнение</th>
                                <th scope="col">Поставщик</th>
                                <th scope="col">Изображения</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">T-44994</th>
                                <td>Стекло</td>
                                <td>Обычное</td>
                                <td>2000x3000</td>
                                <td>4;5;6;8</td>
                                <td>Матированное</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/stekmat.png"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(Fill);