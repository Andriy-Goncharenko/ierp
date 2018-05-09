import React, {Component} from 'react';


class ListMake extends Component {
    constructor(props) {
        super(props);
        this.copyArr = props.items;
        this.state = {value: '', filteredItems: props.items};
        this.handleChange = this.handleChange.bind(this);
    }


    filterItems(find) {
        let arr;
        if (find) {
            arr = this.copyArr.filter(i => i.id.search(find) !== -1);
        } else {
            arr = this.copyArr;
        }
        arr = arr.map(i => {
            i.active = '';
            return i;
        });
        if (arr[0])
            arr[0].active = 'active';

        this.setState({value: find, filteredItems: arr, order: arr[0] ? arr[0] : {id: 'Error', items: []}});
    }

    handleClick(e) {
        let arr = this.state.filteredItems.map(i => {
                if (i.id === e) {
                    i.active = 'active'
                } else {
                    i.active = ''
                }
                return i;
            }
        );

        this.setState({filteredItems: arr, order: arr.find(i => i.active === 'active')});
    }

    handleChange(event) {
        this.filterItems(event.target.value);
    }

    list() {
        return this.state.filteredItems.map((i) =>
            <a className={'list-group-item list-group-item-action ' + i.active}
               onClick={() => this.handleClick(i.id)}>{i.id}</a>);
    }

    render() {
        return (
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-12 col-sm-12 col-md-3'}>
                        <div className={'form-control formMargin'}>
                            <label>Поиск заказа:</label>
                            <input type="text" value={this.state.value} className={'form-control'}
                                   onChange={this.handleChange}
                                   rel="findList"/>
                        </div>
                        <div className="list-group">
                        </div>
                    </div>
                    <div className={'col-12 col-sm-12 col-md-9'}>
                        <div className={'formMargin border rounded mainBlok'}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListMake;
