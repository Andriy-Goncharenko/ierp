import React, {Component} from 'react';
import FeatherIcon        from 'feather-icons-react';

import Alert       from './Alert';
import UploadFiles from './uploadFiles';
import moment      from 'moment';
import io          from 'socket.io-client';
import 'moment/locale/ru'


class Download extends Component {

    socet = {};

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            files: [],
            message: {
                text: '',
                flag: false
            },
            provider: ['Леруа',
                'OBI',
                'AvtoALL',
                '21 век',
                'Алюминий Про',
                'АлюмПластТорг (АПТ)',
                'Алютех',
                'Андрей Криворот',
                'АрхиБут (стеклопрофилит)',
                'Бестдек (ВУДШОП)',
                'Бруски и дерево',
                'Век Стекла',
                'Витраж стекло',
                'Вуд Маркет (ЛДСП)',
                'Гаммал',
                'Гельветика',
                'Дегон',
                'Деревянщик',
                'ДонАЛ',
                'Дорлок',
                'Дорхан Сервис',
                'Замки и Ручки',
                'Зет',
                'Интер Флекс',
                'ИнтерьерН(жалюзи)',
                'Итальянская фурнитура',
                'Ламинат Сервис',
                'ЛЮксполимер',
                'Малаховка',
                'Масстар',
                'Витраж комплект',
                'МДМ комплект',
                'МДФСнаб',
                'Мегла',
                'Металло-База',
                'Метизный двор',
                'МИР ДЕРЕВА',
                'Мканат',
                'Мой Замок',
                'Москреп',
                'Мфурнитура',
                'НАИЛЯ БУХГАЛТЕР',
                'Офис',
                'ООО "Фурнитура для стекла"',
                'ООО МебКомпонент',
                'Петралюм',
                'Пилкингтон Гласс (стеклопрофилит)',
                'Покраска Наяда',
                'Покраска Профокрас',
                'Раздвижные системы РФ',
                'Реалит Юг',
                'РК РТИ и АТИ',
                'рукодельницa',
                'РуссОлово',
                'Селена',
                'синдикат',
                'Содружество (ГКЛ)',
                'Стандартпласт (звукомзоляция)',
                'Стеклоинструмент',
                'Стритмат сервис',
                'Стройсталь',
                'стеклострой',
                'Окна-стар',
                'ТБМ',
                'Технолоджи Групп (автоматика)',
                'титан',
                'ткань Класстек',
                'ткань ОбивТкани',
                'Топ Фурнитура',
                'Федоров',
                'Форза',
                'Фотопечать КолорПринт24',
                'Фристайл Технолоджи',
                'Фурнитура СФ',
                'ЦНТ',
                'Штайнверк (стеклопрофилит)',
                'Экспоторг',
                'Хилти',
                'OBI (магн. краска)',
                'PRESTIGE STEKLO',
                'prip',
                'Фелиз',
                'Чайка лдсп распил',
                'АМП лазерная резка металла',
                'Пластик всем',
                'Берлингем',
                'Люкс Пласт',
                'Мек Стекло',
                'Русторг (пром-щетки)',
                'Л-конт',
                'Аверс',
                'Зенон',
                'Слайдком',
                'Замки',
                'МИК',
                'Мек Стекло',
                'премьер лазер',
                'Гфлекс',
                'Леруа',
                'Паркетный двор',
                'Ваш замок',
                'Столичная фабрика зеркал',
                'Империя', 'парапетто',
                'Студия ""BRONZA-DECOR"""',
                'ЗАМКИ МОС',
                'Вита Лайн Групп',
                'АДВ Трейд',
                'А-Солар',
                'Актив (системы безопасности)',
                'Видеогласс (Магнетик)',
                'ДОРМАКАБА',
                'Алютех-Сибирь',
                'Фурниторг',
                'ТБМ-Пятигорск',
                'Гибка профиля',
                'RUS MYDOOR',
                'ЧИП и ДИП',
                'Фосс Металл',
                'Цвет металл',
                'РФМгруп',
                'Сталь эксперт',
                'Метагор',
                'Колор1', 'Сталькон', 'Компания "Металл-44"', 'Комплект премьер', 'выкрасы',
                'Склад инструментов', 'Ультра-Ф', 'WIDE WORLD Company', 'ЭНХИТ', 'АБС стекло', 'ДПИ-Люкс', 'Технолюкс-Н', 'Фурнитура Гран', 'Галс Мастер', 'Изолюкс', 'Центр Переезд', 'Заглушка Мск', 'Универсал комплект', 'Мирапластик', 'МДМ витраж', 'Мир магнитов', 'Фишер', 'ООО "Пиломатериалы"', 'Мебакс', 'ИП Жаров', 'Алюмпроф', 'ИП Гусаков Д.Ю', 'Интерфурнитура', 'Фурнитура Германии', 'лифтфит', 'Электромонтаж', 'Сплавдор', 'Иплана', 'Гласис', 'Адекс', 'Орман', 'ООО ЗМК', 'Локхаус', 'Стройпровайдер', 'Билти', 'ООО Альфа', 'ПилотПро Алюм. профиль', 'КДС (Комплексные дверные системы)', 'ХВИНД (гибка)', 'Арабелла', 'Надир', 'Плинтус Декор', 'Новый дом', 'СДЭК', 'Бронза Золото', 'Русвитрина', 'ООО Менделеев', 'Линкос', 'Дереволидер', 'Элтис', 'Покраска Дефи-окна', 'Хафеле', 'Ледрус', 'Акетон', 'Северплит', 'Элтис', 'ПАРК ПРИНТ (ЭС ЭМ групп)', 'Русполипласт', 'Вацлав', 'Александрия', 'ИП Землянский', 'ПромСтекло', 'Студия обработки металла и нанесения декоративных покрытий', 'Маркет краксок', 'КДМ', 'ООО "Стеклоком"', 'ООО"КОЛИБРИ"', 'Bestdeck (ИП Погосян Ф.Б.)', 'Стелс', 'ООО "Кабельные Трассы"'],
            tables: [{
                label: 'Профиль',
                key: 'profile',
                categories: ['#', 'Артикул', 'Наименование', 'Длина', 'Кол-во', 'Хлысты', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }, {
                label: 'Уплотнители',
                key: 'seals',
                categories: ['#', 'Артикул', 'Наименование', 'Длина', 'Кол-во', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }, {
                label: 'Комплектующие',
                key: 'accessories',
                categories: ['#', 'Артикул', 'Наименование', 'Длина', 'Кол-во', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }, {
                label: 'Заполнение',
                key: 'filling',
                categories: ['#', 'Артикул', 'Наименование', 'Толщина', 'Высота', 'Длинна', 'Кол-во', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }, {
                label: 'Фурнитура',
                key: 'fittings',
                categories: ['#', 'Артикул', 'Наименование', 'Кол-во', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }, {
                label: 'Другое',
                key: 'consumables',
                categories: ['#', 'Артикул', 'Наименование', 'Толщина', 'Высота', 'Длинна', 'Кол-во', 'Цвет', 'Примечание'],
                items: [{values: ['', '', '', '', '', '', '', ''], edit: false, status: '', provider: ''}],
                removes: []
            }],
            saveFlag: false,
            date: '', flag: true,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.copyItem = this.copyItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onFiles = this.onFiles.bind(this);
        this.upItem = this.upItem.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleProcurement = this.handleProcurement.bind(this);
        this.changeProvider = this.changeProvider.bind(this);

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

    onFiles(files) {
        this.setState({files: [...files]});
        this.handleSend();
    };

    handleSend() {
        let {tables, files, flag} = this.state;
        let {id} = this.props.match.params;
        this.socet.emit('state', {_id: id, tables, files, flag});

    }

    handleProcurement() {
        if (!this.state.flag) {
            let {id} = this.props.match.params;
            this.socet.emit('procurement', id);
            this.setState({
                message: {
                    text: `Заказ ${id} был отправлен на закупку`,
                    flag: true
                },
                saveFlag: true
            })
        }
    }

    addItem(e, i) {
        let {tables} = this.state;
        let l = tables[i].categories.length - 1;
        let nItem = [];
        tables[i].categories.forEach(_i => nItem.push(''));
        tables[i].items.push({values: nItem.splice(0, l), edit: false, status: ''});
        this.setState({
            tables
        });
        this.handleSend();
    }

    deleteItem(e, i, k) {
        let {tables, saveFlag} = this.state;
        let arr = tables[k].items.splice(i, 1);

        if (saveFlag) {
            tables[k].removes = [...tables[k].removes, ...arr];
        }

        this.setState({
            tables
        });
        this.handleSend();
    }

    copyItem(e, i, k) {
        let {tables, saveFlag} = this.state;
        let arr = JSON.parse(JSON.stringify(tables[k].items[i]));
        if (saveFlag) {
            arr.edit = true;
        }
        tables[k].items.push(arr);
        this.setState({
            tables
        });
        this.handleSend();
    }

    upItem(e, i, k) {
        let {tables, saveFlag} = this.state;
        let arr = JSON.parse(JSON.stringify(tables[k].items[i]));
        if (saveFlag) {
            arr.edit = true;
        }
        tables[k].items.splice(i, 1);
        tables[k].items.splice(i - 1, 0, arr);
        this.setState({
            tables
        });
        this.handleSend();
    }


    changeInput(e, index, key, item) {
        let {tables, saveFlag} = this.state;
        tables[key].items[index]['values'][item] = e.target.value;
        if (saveFlag) {
            tables[key].items[index]['edit'] = true;
        }
        this.setState({
            tables
        });
        this.handleSend();
    }

    changeProvider(e, index, key) {
        let {tables, saveFlag} = this.state;
        tables[key].items[index]['provider'] = e.target.value;
        if (saveFlag) {
            tables[key].items[index]['edit'] = true;
        }
        this.setState({
            tables
        });
        this.handleSend();
    }

    renderCategories(arr) {
        return (arr);
    }

    renderItems(arr, k, l) {

        l = l[0];
        let p = 1;
        return arr.map((i, index) => <tr key={index} className={i.edit && 'table-warning'}>
            <th scope="col">{l + p++}</th>
            {i.values.map((_i, ind) => <th key={ind} scope="col"><input type="text"
                                                                        onChange={e => this.changeInput(e, index, k, ind)}
                                                                        value={_i}/></th>)}
            <th scope="col"><input type="text" onChange={e => this.changeProvider(e, index, k)}
                                   value={i.provider} list={"provider"}/>

            </th>
            <th><FeatherIcon onClick={e => this.upItem(e, index, k)}
                             icon={"arrow-up"} size={24}/></th>
            <th><FeatherIcon onClick={e => this.copyItem(e, index, k)}
                             icon={"copy"} size={24}/></th>
            <th><FeatherIcon onClick={e => this.deleteItem(e, index, k)}
                             icon={"delete"} size={24}/></th>
        </tr>);

    }

    rendeRemoves(arr) {
        return arr.map((i, index) => <tr key={index} className={'table-danger'}>
            <th scope="col"></th>
            {i.values.map((_i, ind) => <th key={ind} scope="col">{_i}</th>)}
            <th scope="col">{i.provider}</th>
            <th></th>
            <th></th>
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
                        <th scope="col">Поставщик</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderItems(i.items, index, i.label)}
                    {this.rendeRemoves(i.removes)}
                    </tbody>
                </table>
                <button type="button" className="btn btn-link"
                        onClick={event => this.addItem(event, index)}>Добавить
                </button>
            </div>)
    }

    render() {
        let {message, date, show, files, provider} = this.state;
        if (show) {
            return (
                <div className={'container-fluid'}>
                    <Alert text={this.state.message.text} flag={message.flag} type={"alert-success"}/>
                    <div className={'row'}>
                        <div className="col-2 text-left"><h3>Заказ - {this.props.match.params.id}</h3></div>
                        <div className={'col-2'}>
                            <button type="button" className="btn btn-outline-success btn-sm btn-block"
                                    onClick={this.handleProcurement}>Отправить
                            </button>
                        </div>
                        {date && (<div className="col-8 text-right">
                            <p className="lead text-muted">{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>)}

                    </div>
                    <UploadFiles files={files} onFiles={this.onFiles}/>
                    <hr/>
                    <div className={'row'}>
                        {this.renderTabels()}
                    </div>
                    <datalist id="provider">
                        {provider.map(i => <option key={i} value={i}/>)}
                    </datalist>
                </div>
            )
        } else {
            return (
                <div className={'container-fluid'}>
                    <Alert text={message.text} flag={message.flag} type={"alert-success"}/>
                    <div className="loader" id="loader-4">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>);
        }
    }
}

export default Download;