import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';
import * as firebase from "firebase";
import Alert from '../constructors/Alert';
import settings from '../settings';
import Thickness from './Thickness';

class AddFill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vc: "",
            type: "",
            height: "",
            width: "",
            message: {
                text: '',
                flag: false,
                type: ''
            },
            dName: "",
            dType: "1",
            dList: [],
            thickness: [{value: '', price: ''}],
            providerMy: '',
            typesMy: '',
            providerList: [],
            images: [],
            typeForFill: [],
            provider: [],
            isСlean: true,
            urlImage: "",
        };
        this.config = {
            apiKey: "AIzaSyC_bgs5QmHIPmHAbekHntos4zQru5vd714",
            authDomain: "ierm-7e5fb.firebaseapp.com",
            databaseURL: "https://ierm-7e5fb.firebaseio.com",
            projectId: "ierm-7e5fb",
            storageBucket: "ierm-7e5fb.appspot.com",
            messagingSenderId: "212308994125"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(this.config);
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeProvider = this.handleChangeProvider.bind(this);
        this.handleClickProvider = this.handleClickProvider.bind(this);
        this.deleteProvider = this.deleteProvider.bind(this);
        this.handleDeleteImages = this.handleDeleteImages.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickTypes = this.handleClickTypes.bind(this);
        this.handleClickСlean = this.handleClickСlean.bind(this);
        this.handleChangeTypes = this.handleChangeTypes.bind(this);
        this.handleClickURL = this.handleClickURL.bind(this);
        this.handlePushThickness = this.handlePushThickness.bind(this);
        this.handlePushDlist = this.handlePushDlist.bind(this);

        this.onDrop = this.onDrop.bind(this);
        this.onChangeThickness = this.onChangeThickness.bind(this);

        this.connect();
    }

    handlePushDlist() {
        let tA = this.state.thickness.map(i => {
            return {"label": i.value, "price": ''}
        });
        console.log(this.state.dType);
        switch (this.state.dType) {
            case '1': {
                console.log(1);
                this.state.dList.push({label: this.state.dName, type: this.state.dType, price: ''});
                break;
            }
            case '2': {
                this.state.dList.push({
                    label: this.state.dName,
                    type: this.state.dType,
                    items: tA
                });
                break;
            }
            case '3': {
                this.state.dList.push({label: this.state.dName, type: this.state.dType, price: ''});
                break;
            }
            case '4': {
                this.state.dList.push({
                    label: this.state.dName,
                    type: this.state.dType,
                    items: [{label: "", price: ""}]
                });
                break;
            }
        }
        this.setState({dList: this.state.dList});
        console.log(this.state.dList);
    }

    renderOpt() {
        let option = (item, index) => {
            if (item.type === "1") {
                return <Thickness key={index} item={{item: {value: item.label, price: item.price}}} i={index}
                                  onChangeThickness={this.onChangeThickness}
                                  handleDeleteThickness={this.handleDeleteThickness}/>
            }
        };

        return this.state.dList.map((item, index) => option(item, index))
    }

    handleClickURL(key, files) {
        let arr = this.state[files];
        arr.push({name: "", url: this.state[key], download: 100, isLoad: false});
        this.setState({[key]: "", [files]: arr})
    };

    handleClickСlean() {
        let f = this.state.isСlean;
        f = f ? false : true
        this.setState({isСlean: f});
    }

    handlePushThickness() {
        let arr = this.state.thickness;
        arr.push({value: '', price: ''});
        this.setState({thickness: arr});
    }


    handleSubmit() {
        let obj = {
            vc: this.state.vc,
            series: this.state.series,
            thickness: this.state.thickness,
            width: this.state.width,
            length: this.state.length,
            price: this.state.price,
            grooveOt: this.state.grooveOt,
            grooveDo: this.state.grooveDo,
            material: this.state.material,
            description: this.state.description,
            catalog: this.state.catalog,
        };
        if (this.state.isPrice && this.state.length && this.state.price) {
            obj.price = parseInt(this.state.price) * parseInt(this.state.length);
        }

        if (this.state.typesMy) {
            let arr = this.state.typesList;
            arr.push(this.state.typesMy);
            this.setState({
                color: '',
                colorList: arr
            });
        }
        obj.type = this.state.typesList;

        if (this.state.color) {
            let arr = this.state.colorList;
            arr.push(this.state.color);
            this.setState({
                color: '',
                colorList: arr
            });
        }
        obj.painting = this.state.colorList;
        if (this.state.providerMy) {
            let arr = this.state.providerList;
            arr.push(this.state.providerMy);
            this.setState({
                providerMy: '',
                providerList: arr
            });
        }
        obj.provider = this.state.providerList;
        obj.images = this.state.images.map(i => i.url);
        obj.scheme = this.state.scheme.map(i => i.url);

        this.sendWS(JSON.stringify({code: 'add', collection: 'materialsProfiles', item: obj}));
        if (this.state.isСlean) {
            this.setState({
                vc: "",
                series: "",
                thickness: "",
                width: "",
                length: "",
                price: "",
                grooveOt: "",
                grooveDo: "",
                material: "",
                typesMy: "",
                providerMy: "",
                color: "",
                description: "",
                catalog: "",
                providerList: [],
                images: [],
                scheme: [],
                typesList: [],
                colorList: []
            });
        }
    }

    sendWS(obj) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(obj)
        }
    }

    connect() {
        this.ws = new WebSocket(settings.ws);

        this.ws.addEventListener('open', () => {
            this.setState({
                message: {
                    text: '',
                    flag: false,
                    type: ''
                }
            });
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'provider'}));
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'typeForFill'}));
        });

        this.ws.addEventListener('message', res => {
            if (res.data) {
                res = JSON.parse(res.data);
                if (res.label) {
                    this.setState({[res.label]: res.items})
                }
                if (res.status === 1) {
                    this.setState({
                        message: {
                            text: 'Профиль был добавлен',
                            flag: true,
                            type: 'alert-success'
                        }
                    });
                }
            }
        });

        this.ws.addEventListener('close', () => {
            this.connect()
        });
        this.ws.addEventListener('error', () => {
            this.setState({
                message: {
                    text: 'Ошибка сообщить Андрею программа не работает',
                    flag: true,
                    type: 'alert-danger'
                }
            });
        });
    }

    onDrop(files) {
        let arr = [];
        if (this.state.images.length) {
            arr = this.state.images;
        }

        files.forEach(file => {
            arr.push({name: file.name, url: file.preview, download: 0, isLoad: true});
            this.setState({images: arr});
            let storageRef = firebase.storage().ref('fill/' + file.name);
            let task = storageRef.put(file);
            let name = file.name;
            task.on('state_changed', (snapshot) => {
                    let a = this.state.images.map(i => {
                        if (i.name === name) {
                            i.download = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        }
                        return i;
                    });
                    this.setState({images: a});
                },
                (err) => console.error(err), () => {
                    storageRef.getDownloadURL().then(url => {
                        let a = this.state.images.map(i => {
                            if (i.name === name) {
                                i.url = url;
                            }
                            if (i.download === 100) {
                                i.isLoad = false;
                            }
                            return i;
                        });
                        this.setState({images: a});
                    });
                }
            )
            ;
        });

    }

    onChangeThickness(i, k, v) {
        let arr = this.state.thickness;
        arr[i][k] = v;
        this.setState({thickness: arr})
    }

    handleDeleteImages(e, name) {
        let arr = this.state.images;
        let i = this.state.images.findIndex(_i => _i.name === name);
        arr.splice(i, 1);
        arr = arr.length > 0 ? arr : [];
        this.setState({
            images: arr
        });
    }

    handleDeleteThickness = i => {
        console.log(this.state.thickness);
        this.state.thickness.splice(i, 1);
        console.log(this.state.thickness);
        this.setState({
            thickness: this.state.thickness
        });
    }


    handleChange(e, k) {
        this.setState({[k]: e.target.value});
    }

    handleChangeType(e, i) {
        let arr = this.state.types;
        arr[i].isChecked = arr[i].isChecked ? false : true
        this.setState({types: arr});
    }

    handleChangeProvider(e) {
        this.setState({providerMy: e.target.value});
    }

    handleChangeTypes(e) {
        this.setState({typesMy: e.target.value});
    }


    handleClickProvider() {
        if (this.state.providerMy) {
            let arr = this.state.providerList;
            arr.push(this.state.providerMy);
            this.setState({
                providerMy: '',
                providerList: arr
            });
        }
    }

    handleClickTypes() {
        if (this.state.typesMy) {
            let arr = this.state.typesList;
            arr.push(this.state.typesMy);
            this.setState({
                typesMy: '',
                rendertypesList: arr
            });
        }
    }


    deleteProvider(e, i) {
        this.state.providerList.splice(i, 1);
        this.setState({
            providerList: this.state.providerList
        })
    }

    deleteTypes(e, i) {
        this.state.typesList.splice(i, 1);
        this.setState({
            typesList: this.state.typesList
        })
    }

    renderProviderList() {
        if (this.state.providerList.length) {
            return (<ul className="list-unstyled">
                <li>Поставщики:
                    <ul>
                        {this.state.providerList.map((i, index) => <li key={index}>{i} <FeatherIcon
                            onClick={(e) => this.deleteProvider(e, index)} icon={"x"} size={14}/></li>)}</ul>
                </li>
            </ul>)
        }
    }

    rendertypesList() {
        if (this.state.typesList.length) {
            return (<ul className="list-unstyled">
                <li>Поставщики:
                    <ul>
                        {this.state.typesList.map((i, index) => <li key={index}>{i} <FeatherIcon
                            onClick={(e) => this.deleteTypes(e, index)} icon={"x"} size={14}/></li>)}</ul>
                </li>
            </ul>)
        }
    }

    renderImagesList(arr) {
        return arr.map(i => {
            if (i.isLoad) {
                return (<div className={"col-4 myBorder"} key={i.name}>
                    <div className="card">
                        <img className="card-img myOpacity"
                             src={i.url}/>
                        <div className="card-img-overlay">
                            <FeatherIcon className={"rot"} icon={"loader"} size={25}/>
                            <br/>
                            {i.download}%
                        </div>
                    </div>
                    {i.name}
                </div>)
            } else {
                return (<div className={"col-4 myBorder"} key={i.name}>
                    <div className="card">
                        <img className="card-img"
                             src={i.url}/>
                        <div className="card-img-overlay buttonDelete">
                            <FeatherIcon onClick={e => this.handleDeleteImages(e, i.name)}
                                         icon={"x"} size={14}/>
                        </div>
                    </div>
                    {i.name}
                </div>)
            }
        });
    }


    renderTupes() {
        return this.state.types.map((i, index) =>
            <div key={index} className="col-4">
                <div className="form-check chakedList">
                    <input className="form-check-input" type="checkbox"
                           checked={i.isChecked} onChange={(e) => this.handleChangeType(e, index)}/>
                    <label className="form-check-label">
                        {i.label}
                    </label>
                </div>
            </div>)
    }


    render() {
        return (
            <div className={'container'}>

                <div className={'row'}>
                    <div className="col-12 navMyBar">
                        <div className={"row"}>
                            <div className={"col-6"}><Link to={"/materials"}>Назад</Link></div>
                            <div className={"col-6 text-right"}>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                    </div>
                                    <div className={"col-2"}>
                                        <input id={"isСlean"}
                                               className="form-check  form-check-input chakedboxs"
                                               type="checkbox"
                                               checked={this.state.isСlean}
                                               onClick={this.handleClickСlean}/>
                                        <label className="form-check-label" for="isСlean">
                                            Очистить
                                        </label>
                                    </div>
                                    <div className={"col-2"}><a className={"text-primary"}
                                                                onClick={this.handleSubmit}>Добавить</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"><Alert text={this.state.message.text} type={this.state.message.type}
                                                   flag={this.state.message.flag}/></div>
                    <div className="col-12">
                        <div className={"row"}>
                            <div className="col-6">
                                <div className={"row"}>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Артикул</label>
                                            <input type="text" onChange={(e) => this.handleChange(e, "vc")}
                                                   className="form-control" placeholder="Артикул"
                                                   value={this.state.vc}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Тип</label>
                                            <input type="text" className="form-control" placeholder="Тип"
                                                   onChange={(e) => this.handleChange(e, "type")}
                                                   value={this.state.type}
                                                   list={"type"}/>
                                            <datalist id="type">
                                                {this.state.typeForFill.map(i => <option key={i._id}
                                                                                         value={i.name}/>)}

                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Наименование</label>
                                            <input type="text" onChange={(e) => this.handleChange(e, "name")}
                                                   className="form-control" placeholder="Наименование"
                                                   value={this.state.name}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label>Размер листа ,мм</label>
                                        <div className="row">

                                            <div className="form-group col">
                                                <input type="number" onChange={(e) => this.handleChange(e, "width")}
                                                       className="form-control" placeholder="Ширина ,мм"
                                                       value={this.state.width}/>
                                            </div>
                                            <div className="form-group col">

                                                <input type="number" onChange={(e) => this.handleChange(e, "height")}
                                                       className="form-control" placeholder="Высота ,мм"
                                                       value={this.state.height}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label>Толщина ,мм</label>
                                    </div>
                                    <div className="col-6">
                                        <label>Цена ,руб</label>
                                    </div>
                                    <div className="col-12">

                                        {this.state.thickness.map((item, index) =>
                                            <Thickness key={index} item={item} i={index}
                                                       onChangeThickness={this.onChangeThickness}
                                                       handleDeleteThickness={this.handleDeleteThickness}/>)}


                                    </div>
                                    <div className={"col-12"}>
                                        <div className="form-group">
                                            <a className="text-primary"
                                               onClick={this.handlePushThickness}>Добавить
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group row">
                                            <div className="col-12"><label>Поставщик</label>
                                                <div className="input-group mb-3">
                                                    <input type="text" className="form-control"
                                                           placeholder="Поставщик" value={this.state.providerMy}
                                                           onChange={this.handleChangeProvider} list={"provider"}
                                                    />
                                                    <datalist id="provider">
                                                        {this.state.provider.map(i => <option key={i._id}
                                                                                              value={i.name}/>)}
                                                    </datalist>
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary"
                                                                onClick={this.handleClickProvider}
                                                                type="button">Добавить
                                                        </button>
                                                    </div>
                                                </div>
                                                {this.renderProviderList()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={"col-6"}>
                                <label>Изоборажения</label>
                                <div className="input-group mb-3">

                                    <input type="text" className="form-control"
                                           placeholder="Ссылка на изображения" value={this.state.urlImage}
                                           onChange={(e) => this.handleChange(e, "urlImage")}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={e => this.handleClickURL("urlImage", "images")}>Добавить
                                        </button>
                                    </div>
                                </div>
                                <Dropzone className={"dropzoneMy text-center"} accept="image/jpeg, image/png"
                                          onDrop={this.onDrop}>
                                    <FeatherIcon icon={"download"} size={25}/>
                                    <br/>
                                    <p>Загрузить изображения</p>
                                </Dropzone>
                                <div className={"row text-center"}>
                                    {this.renderImagesList(this.state.images)}
                                </div>
                                <label>Опции</label>
                                <div className={"row"}>
                                    <div className={"col-6"}>
                                        <input type="text" className="form-control"
                                               placeholder="Наименование" value={this.state.dName}
                                               onChange={(e) => this.handleChange(e, "dName")}
                                        />
                                    </div>
                                    <div className={"col-3"}>
                                        <select className="form-control" value={this.state.dType}
                                                onChange={(e) => this.handleChange(e, "dType")}>
                                            <option value="1">м2</option>
                                            <option value="2">м2 + Т</option>
                                            <option value="3">м</option>
                                            <option value="4">м + Т</option>
                                        </select>
                                    </div>
                                    <div className={"col-3"}>
                                        <button type="button" onClick={this.handlePushDlist}
                                                className="btn btn-outline-secondary btn-block">Добавить
                                        </button>
                                    </div>
                                </div>
                                <hr/>
                                {this.renderOpt()}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AddFill;