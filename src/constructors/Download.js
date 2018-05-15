import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';
import Dropzone from 'react-dropzone'

import Alert from './Alert';

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            message: {
                text: '',
                flag: false
            },
            tables: [{
                label: 'Профиль',
                categories: ['#', 'Артикул', 'Наименование', 'Длина', 'Кол-во', 'Цвет', 'Примечание'],
                items: [['AR 3335', 'Optima 45x45', '8000', '12', 'RAL 9080', 'Ахаха']]
            }, {
                label: 'Аксессуары',
                categories: ['#', 'Артикул', 'Наименование', 'Длина', 'Кол-во', 'Цвет', 'Примечание'],
                items: [['AR 3333', 'Optima 45x45', '8000', '12', 'RAL 9080', 'Ахаха']]
            }, {
                label: 'Заполнение',
                categories: ['#', 'Артикул', 'Наименование', 'Толщина', 'Высота', 'Длинна', 'Кол-во', 'Цвет', 'Примечание'],
                items: [['AR 3333', 'Optima 45x45', '10', '10', '8000', '12', 'RAL 9080', 'Ахаха']]
            }, {
                label: 'Фурнитура',
                categories: ['#', 'Артикул', 'Наименование', 'Кол-во', 'Цвет', 'Примечание'],
                items: [['AR 3333', 'Optima 45x45', '12', 'RAL 9080', 'Ахаха']]
            }, {
                label: 'Расходники',
                categories: ['#', 'Артикул', 'Наименование', 'Кол-во', 'Примечание'],
                items: [['AR 3333', 'Optima 45x45', '12', 'Ахаха']]
            }]
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.copyItem = this.copyItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.getData = this.getData.bind(this);
    }


    getData(e, k) {
        return e.target.getAttribute(k);
    }

    addItem(e) {
        let i = this.getData(e, 'data-key');
        if (i) {
            let l = this.state.tables[i].categories.length - 1;
            let nItem = [];
            this.state.tables[i].categories.forEach(_i => nItem.push(''));
            this.state.tables[i].items.push(nItem.splice(0, l));
            this.setState({
                tables: this.state.tables
            });
        }
    }

    deleteItem(e) {
        let i = this.getData(e, 'data-index');
        let k = this.getData(e, 'data-key');
        if (k && i) {
            this.state.tables[k].items.splice(i, 1);
            this.setState({
                tables: this.state.tables
            })
        }

    }

    deleteFile(e) {
        let k = this.getData(e, 'data-key');
        if (k) {
            this.state.files.splice(k, 1);
            this.setState({
                files: this.state.files
            })
        }

    }

    copyItem(e) {
        let i = this.getData(e, 'data-index');
        let k = this.getData(e, 'data-key');
        if (k && i) {
            let arr = [];
            this.state.tables[k].items[i].forEach(_i => arr.push(_i));
            this.state.tables[k].items.push(arr);
            this.setState({
                tables: this.state.tables
            })
        }

    }

    onDrop(files) {
        this.setState({
            files: files
        })
    }

    changeInput(e) {
        let index = this.getData(e, 'data-index');
        let key = this.getData(e, 'data-key');
        let item = this.getData(e, 'data-item');
        if (index && key && item) {
            this.state.tables[key].items[index][item] = e.target.value;
            this.setState({
                tables: this.state.tables
            })
        }
    }

    renderCategories(arr) {
        return (arr);
    }

    renderItems(arr, k, l) {
        l = l[0];
        let p = 1;
        return arr.map((i, index) => <tr key={index}>
            <th scope="col">{l + p++}</th>
            {i.map((_i, ind) => <th key={ind} scope="col"><input type="text" data-index={index} data-key={k}
                                                                 data-item={ind}
                                                                 onChange={this.changeInput} value={_i}/></th>)}
            <th><FeatherIcon onClick={this.copyItem}
                             data-index={index} data-key={k}
                             icon={"arrow-up"} size={24}/></th>
            <th><FeatherIcon onClick={this.copyItem}
                             data-index={index} data-key={k}
                             icon={"copy"} size={24}/></th>
            <th><FeatherIcon onClick={this.deleteItem}
                             data-index={index} data-key={k}
                             icon={"delete"} size={24}/></th>
        </tr>);
    }

    styleDropzone = {
        "padding": "50px 0",
        "height": "200px",
        "border-width": "1px",
        "border-color": "rgb(102, 102, 102)",
        "border-style": "dashed",
        "border-radius": "5px"
    };

    handleSend(e) {
        console.log(1);
        this.setState({
            message: {text: 'Заказ отправлен на проверку!', flag: true}
        })
    }

    renderTabels() {
        return this.state.tables.map((i, index) =>
            <div className="col-12" key={index}>
                <h3>{i.label}</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {i.categories.map((i, _i) => <th key={_i} scope="col">{i}</th>)}
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderItems(i.items, index, i.label)}
                    </tbody>
                </table>
                <button type="button" className="btn btn-link" onClick={this.addItem} data-key={index}>Добавить</button>
            </div>)
    }

    render() {
        this.num = 1;
        return (
            <div className={'container-fluid'}>
                <Alert text={this.state.message.text} flag={this.state.message.flag}/>
                <div className={'row'}>
                    <div className="col-6 text-left"><h3>Заказ - {this.props.match.params.id}</h3></div>
                    <div className="col-6 text-right">
                        <button type="button" onClick={this.handleSend} className="btn btn-outline-success">Сохранить
                        </button>
                    </div>
                </div>

                <hr/>
                <div className={'row'}>
                    <div className="col-6 text-center"><Dropzone onDrop={this.onDrop} style={this.styleDropzone}>
                        <FeatherIcon icon={"download"} size={25}/>
                        <br/>
                        <p>Загрузить чертежи</p>
                    </Dropzone></div>
                    <div className="col-6">
                        <p>Чертежи:</p>
                        <ul className="list-unstyled">
                            {
                                this.state.files.map((f, i) => <li key={i}>{f.name} <FeatherIcon
                                    onClick={this.deleteFile} data-key={i} icon={"x"} size={12}/>
                                </li>)
                            }
                        </ul>
                    </div>
                    {this.renderTabels()}
                </div>
            </div>
        );
    }
}

export default Download;