import React, {Component} from 'react';
import CheckBoxList from './CheckBoxList';
import NavMaterials from './NavMaterials';

class Fill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxs: [
                {
                    label: 'Тип', items:
                        [{
                            label: 'Дерево',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Стекло',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Зеркало',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Пластики',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'Панели',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'Стекловолокно',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Стеклопакет',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Ткань',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Гипсокартон',
                            isChecked: false,
                            isView: true
                        }]
                }, {
                    label: 'Толщина', items:
                        [{
                            label: '4 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '5 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '6 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '8 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '10 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '12 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '16 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '18 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '20 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '24 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '32 мм',
                            isChecked: false,
                            isView: true
                        }, {
                            label: '34 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '36 мм',
                            isChecked: false,
                            isView: false
                        }, {
                            label: '44 мм',
                            isChecked: false,
                            isView: false
                        }]
                }, {
                    label: 'Дополнение', items:
                        [{
                            label: 'Фотопечать',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'Пескоструй',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Анодировка',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Покраска по RAL',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Декор под дерево',
                            isChecked: false,
                            isView: false
                        }, {
                            label: 'Матированное стекло',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Окрашенное стекло',
                            isChecked: false,
                            isView: true
                        }, {
                            label: 'Декор под дерево',
                            isChecked: false,
                            isView: false
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
                }
            ]
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

export default Fill;