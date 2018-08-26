import React, {Component} from 'react';
import moment from 'moment';
import io from 'socket.io-client';
import 'moment/locale/ru'


class ViewProcurement extends Component {

    socet = {};

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tables: [],
            saveFlag: false,
            date: '', flag: true,
            list: ['Забираем',
                'На складе готовится на покраску',
                'На складе',
                'На складе готов к отправке',
                'На покраске']
        };

        this.handleSend = this.handleSend.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        moment.locale('ru');
    }

    componentDidMount() {
        this.socet = io();
        this.socet.on('connect', () => {
            this.socet.emit('get', {id: this.props.match.params.id});
        });
        this.socet.on('state', data => {
            this.setState({show: true});
            if (data) {
                let {tables, files, date, _id, saveFlag} = data;
                if (_id === this.props.match.params.id)
                    this.setState({tables, files, date, flag: false, saveFlag});
            }
        })
    }


    handleSend() {
        let {tables, files, flag} = this.state;
        let {id} = this.props.match.params;
        this.socet.emit('state', {_id: id, tables, files, flag});
    }


    handleStatus(e, index, key) {
        let {tables} = this.state;
        tables[key].items[index]['status'] = e.target.value;

        this.setState({
            tables
        });
        this.handleSend();
    }

    renderItems(arr, k, l) {
        l = l[0];
        let p = 1;
        return arr.map((i, index) => <tr key={index} className={i.edit && 'table-warning'}>
            <th scope="col">{l + p++}</th>
            {i.values.map((_i, ind) => <th key={ind} scope="col">{_i}</th>)}
            <th><input type="text"
                       onChange={e => this.handleStatus(e, index, k)}
                       value={i.status}
                       list={"list"}/>
            </th>

        </tr>);

    }

    rendeRemoves(arr) {
        return arr.map((i, index) => <tr key={index} className={'table-danger'}>
            <th scope="col"></th>
            {i.values.map((_i, ind) => <th key={ind} scope="col">{_i}</th>)}
            <th></th>
        </tr>);
    }

    renderTabels() {
        return this.state.tables.map((i, index) =>
            <div className="col-12" key={index}>
                <h3>{i.label}</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        {i.categories.map((i, _i) => <th key={_i} scope="col">{i}</th>)}
                        <th scope="col">Cтатус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderItems(i.items, index, i.label)}
                    {this.rendeRemoves(i.removes)}
                    </tbody>
                </table>
            </div>)
    }

    render() {
        let {date, show, list} = this.state;
        if (show) {
            return (
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className="col-4 text-left"><h3>Закупка заказа - {this.props.match.params.id}</h3></div>
                        <div className={'col-2'}>
                        </div>
                        <div className="col-6 text-right">
                            <p className="lead text-muted">Сохранено в {date}</p>
                        </div>
                        <datalist id="list">
                            {list.map(i => <option key={i} value={i}/>)}
                        </datalist>
                    </div>
                    <hr/>
                    <div className={'row'}>
                        {this.renderTabels()}
                    </div>
                </div>
            )
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

export default ViewProcurement;