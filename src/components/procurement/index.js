import React, {Component}                  from 'react';
import moment                              from 'moment';
import io                                  from 'socket.io-client';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'moment/locale/ru';

class Procurement extends Component {

    socet = {};

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            orders: [],
            rows: [],
            select: []
        };

        this.handelSelect = this.handelSelect.bind(this);
        this.handelStatus = this.handelStatus.bind(this);

        moment.locale('ru');
    }

    componentDidMount() {
        this.socet = io();
        this.socet.on('connect', () => {
            this.socet.emit('getProcurement');
        });
        this.socet.on('getProcurement', orders => {
            this.setState({show: true});
            if (orders) {
                let rows = [];
                orders.forEach(order => {
                    order.tables.forEach(table => {
                        let p = 1;
                        table.items.forEach(({status, provider, values}) => {
                            let info = '';
                            if (status === "") {
                                status = 'Передано на закупку';
                            }
                            values.forEach(val => {
                                if (val !== "") {
                                    info += val + ';';
                                }
                            });
                            if (info !== '')
                                rows.push({id: order._id + '-' + table.label[0] + p, provider, status, info});
                            p++;
                        })
                    })
                });
                this.setState({orders, rows});
            }
        })
    }

    handelSelect(row) {
        let {select} = this.state;
        let index = select.findIndex(({id}) => id === row.id);
        if (index > -1) {
            select.splice(index, 1);
            this.setState({select});
        } else {
            this.setState({select: [...select, row]})
        }
    }

    handelStatus(status) {
        let {select, rows} = this.state;
        select.forEach(sel => {
            let i = rows.findIndex(({id}) => id === sel.id);
            if (i > -1)
                rows[i].status = status;
        });
        this.setState({select: [], rows})
    }

    render() {
        let {rows, show, select} = this.state;
        const selectRowProp = {
            mode: 'checkbox',
            bgColor: '#e2e3e5',
            selected: select.map(sel => sel.id),
            onSelect: this.handelSelect
        };

        if (show || true) {
            return (
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <button type="button" className="btn btn-outline-secondary btn-sm"
                                    style={{marginLeft: 5}} onClick={() => this.handelStatus('Жду ответ')}>Oтправить
                                поставщику
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm"
                                    style={{marginLeft: 5}} onClick={() => this.handelStatus('Жду счет')}>Жду счет
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm"
                                    style={{marginLeft: 5}} onClick={() => this.handelStatus('Жду оплату')}>Жду оплату
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm"
                                    style={{marginLeft: 5}} onClick={() => this.handelStatus('Оплачено')}>Оплачено
                            </button>
                            <br/>
                        </div>
                        <div className={'col-12'} style={{margin: '1rem 0'}}>
                            <BootstrapTable ref='table' data={rows} selectRow={selectRowProp} pagination>
                                <TableHeaderColumn dataAlign='center' width={50} dataField='id'
                                                   isKey={true}>#</TableHeaderColumn>
                                <TableHeaderColumn width={200} dataField='info'>Инфо</TableHeaderColumn>
                                <TableHeaderColumn width={100} dataField='provider'>Поставщик</TableHeaderColumn>
                                <TableHeaderColumn width={100} dataField='status'>Статус</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
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