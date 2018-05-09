import React, {Component} from 'react';
import CheckBoxList from './CheckBoxList';
import NavMaterials from './NavMaterials';

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxs: [
                {
                    label: 'Вид', items:
                        [{
                            label: 'П-образный',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '2-x пазовый',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Г-образный',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Z-образный',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'Ш-образный',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'T-образный',
                            isChecked: false,
                            isView: true
                        },]
                }, {
                    label: 'Материал', items:
                        [{
                            label: 'Алюминий',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Алюминий',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Дерево',
                            isChecked: false,
                            isView: true
                        },]
                }, {
                    label: 'Серия', items:
                        [{
                            label: 'Оптима',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Еврошоп',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'ALT C43',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'ALT C48',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'STATUS',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'ALBOX',
                            isChecked: false,
                            isView: true
                        }]
                }, {
                    label: 'Поставщик', items:
                        [{
                            label: 'Alutech',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Realit',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Titan',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Петралюм',
                            isChecked: false,
                            isView: true
                        }]
                }, {
                    label: 'Покраска', items:
                        [{
                            label: 'RAL',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Анодирование',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Ламинированные',
                            isChecked: false,
                            isView: true
                        }]
                }]
        };
        this.onChecked = this.onChecked.bind(this);
    }

    onChecked(e) {
        let name = e.target.getAttribute('data-label');
        let val = e.target.value;
        let index = this.state.checkBoxs.findIndex((i) => i.label === name);
        let copyArr = this.state.checkBoxs;
        copyArr[index].items.map(i => {
            if (i.label === val) {
                i.isChecked = i.isChecked ? false : true
            }
            return i;
        });
        this.setState({
            checkBoxs: copyArr
        });
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
                    <div className="col-md-2">
                        {this.checkList()}
                    </div>
                    <div className="col-md-10">
                        <table className="table table-borderless table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Артикул</th>
                                <th scope="col">Вид</th>
                                <th scope="col">Серия</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размеры (ВxШ)</th>
                                <th scope="col">Длина</th>
                                <th scope="col">Цвета</th>
                                <th scope="col">Поставщик</th>
                                <th scope="col">Изображения</th>
                                <th scope="col">Схема</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            <tr>
                                <th scope="row">T-23</th>
                                <td>2-пазовый</td>
                                <td>Оптима</td>
                                <td>Профиль 2-пазовый</td>
                                <td>45x45 мм</td>
                                <td>6 м</td>
                                <td>по RAL</td>
                                <td>Петралюм</td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                                <td><img style={this.styleImg} src="/img/Optima1 (1).png"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);
    }
}

export default Profiles;