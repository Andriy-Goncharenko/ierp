import React, {Component} from 'react';
import CheckBoxList from './CheckBoxList';
import NavMaterials from './NavMaterials';
import {Link, withRouter} from "react-router-dom";
import settings from '../settings';

class Profiles extends Component {
    constructor(props) {

        super(props);
        this.state = {
            checkBoxs: [
                {
                    label: 'Тип', items:
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
                }],
            items: []
        };


        this.onChecked = this.onChecked.bind(this);
        this.goToPath = this.goToPath.bind(this);

        this.connect = this.connect.bind(this);

        this.connect();
    }

    sendWS(obj) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(obj)
        }
    }

    connect() {
        this.ws = new WebSocket(settings.ws);

        this.ws.addEventListener('open', () => {
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'materialsProfiles'}))
        });

        this.ws.addEventListener('message', res => {
            if (res.data) {
                res = JSON.parse(res.data);
                this.setState({items: res.items});
            }
        });

        this.ws.addEventListener('close', () => {
            this.connect()
        });
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

    goToPath(path) {
        this.props.history.push(path);
    }

    renderItems() {
        let groove = (Ot, Do) => {
            if (Ot) {
                if (Do) {
                    return Ot + "-" + Do
                } else {
                    return Ot
                }
            }
        };
        let img = s => {
            if (s) {
                return <img src={s} className="img-fluid imageForTabel"/>
            } else {

            }
        };
        return this.state.items.map(i => <tr key={i._id} onClick={e => this.goToPath("/profiles/" + i._id)}>
            <th scope="col">{i.vc}</th>
            <th scope="col">{i.type[0]}</th>
            <th scope="col">{i.series}</th>
            <th scope="col">{i.thickness}/{i.width}</th>
            <th scope="col">{i.length}</th>
            <th scope="col">{groove(i.grooveOt, i.grooveDo)}</th>
            <th scope="col">{i.price}</th>
            <th scope="col">{i.provider[0]}</th>
            <th scope="col">{img(i.images[0])}</th>
        </tr>);
    }

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className="col-md-12">
                        <NavMaterials/>
                    </div>
                    <div className="col-md-12">
                        <div className={"navMyBar"}>
                            <Link to={"/add/profiles/"}>Добавить</Link>
                        </div>
                        <table className="table table-borderless table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Арт</th>
                                <th scope="col">Тип</th>
                                <th scope="col">Серия</th>
                                <th scope="col">Т/Ш ,мм</th>
                                <th scope="col">Длина ,м</th>
                                <th scope="col">Паз ,мм</th>
                                <th scope="col">Цена, руб</th>
                                <th scope="col">Поставщик</th>
                                <th scope="col">Изображения</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderItems()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(Profiles);