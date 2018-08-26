import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import Dropzone from 'react-dropzone';
import FeatherIcon from 'feather-icons-react';
import * as firebase from "firebase";
import Alert from '../constructors/Alert';
import settings from '../settings';

class EditProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vc: "",
            type: "",
            series: "",
            thickness: "",
            width: "",
            length: "",
            price: "",
            grooveOt: "",
            grooveDo: "",
            material: "Алюминий",
            painting: [],
            description: "",
            catalog: "",
            typesList: [],
            message: {
                text: '',
                flag: false,
                type: ''
            },
            color: '',
            colorList: [],
            providerMy: '',
            typeForProfiles: [],
            typesMy: '',
            providerList: [],
            images: [],
            scheme: [],
            seriesForProfiles: [],
            provider: [],
            isPaz: false,
            isСlean: true,
            isPrice: false,
            colour: [],
            urlImage: "",
            urlScheme: "",
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
        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.deleteProvider = this.deleteProvider.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.handleDeleteImages = this.handleDeleteImages.bind(this);
        this.handleDeleteScheme = this.handleDeleteScheme.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickPaz = this.handleClickPaz.bind(this);
        this.handleClickTypes = this.handleClickTypes.bind(this);
        this.handleClickСlean = this.handleClickСlean.bind(this);
        this.handleChangeTypes = this.handleChangeTypes.bind(this);
        this.handleClickPrice = this.handleClickPrice.bind(this);
        this.handleClickURL = this.handleClickURL.bind(this);

        this.onDrop = this.onDrop.bind(this);
        this.onDropScheme = this.onDropScheme.bind(this);

        this.connect();
    }

    handleClickURL(key, files) {
        let arr = this.state[files];
        arr.push({name: "", url: this.state[key], download: 100, isLoad: false});
        this.setState({[key]: "", [files]: arr})
    };

    handleClickPaz() {
        let f = this.state.isPaz;
        f = f ? false : true
        if (f) {
            this.setState({grooveDo: ""});
        }
        this.setState({isPaz: f});
    }

    handleClickPrice() {
        let f = this.state.isPrice;
        f = f ? false : true
        this.setState({isPrice: f});
    }

    handleClickСlean() {
        let f = this.state.isСlean;
        f = f ? false : true
        this.setState({isСlean: f});
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

        this.sendWS(JSON.stringify({
            code: 'update',
            collection: 'materialsProfiles',
            id: this.props.match.params.id,
            item: {$set: obj}
        }));
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
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'seriesForProfiles'}));
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'typeForProfiles'}));
            this.sendWS(JSON.stringify({code: 'getAll', collection: 'colour'}));
            this.sendWS(JSON.stringify({
                code: 'get',
                find: {"_id": this.props.match.params.id},
                collection: 'materialsProfiles'
            }));

        });

        this.ws.addEventListener('message', res => {
                if (res.data) {
                    res = JSON.parse(res.data);
                    if (res.status === 2) {
                        console.log("/profiles/" + this.props.match.params.id);
                        this.props.history.push("/profiles/" + this.props.match.params.id);
                    }
                    if (res.label && res.label === "get/materialsProfiles") {
                        if (res.item) {
                            if (res.item.grooveDo) {
                                this.setState({isPaz: true});
                            }
                            let obj = {
                                vc: res.item.vc,
                                series: res.item.series,
                                thickness: res.item.thickness,
                                width: res.item.width,
                                length: res.item.length,
                                price: res.item.price,
                                grooveOt: res.item.grooveOt,
                                grooveDo: res.item.grooveDo,
                                material: res.item.material,
                                description: res.item.description,
                                catalog: res.item.catalog,
                                typesList: res.item.type,
                                colorList: res.item.painting,
                                images: res.item.images.map(i => {
                                    return {url: i, isLoad: false}
                                }),
                                scheme: res.item.scheme.map(i => {
                                    return {url: i, isLoad: false}
                                }),
                                providerList: res.item.provider
                            };
                            console.log(obj);
                            this.setState(obj);
                        }

                    } else if (res.label) {
                        this.setState({[res.label]: res.items})
                    }
                }
            }
        );

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
            let storageRef = firebase.storage().ref('profile/' + file.name);
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

    onDropScheme(files) {
        let arr = [];
        if (this.state.scheme.length) {
            arr = this.state.scheme;
        }
        files.forEach(file => {
            arr.push({name: file.name, url: file.preview, download: 0, isLoad: true});
            this.setState({scheme: arr});
            let storageRef = firebase.storage().ref('scheme/' + file.name);
            let task = storageRef.put(file);
            let name = file.name;
            task.on('state_changed', (snapshot) => {
                    let a = this.state.scheme.map(i => {
                        if (i.name === name) {
                            i.download = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        }
                        if (i.download === 100) {
                            i.isLoad = false;
                        }
                        return i;
                    });
                    this.setState({scheme: a});
                },
                (err) => console.error(err), () => {
                    storageRef.getDownloadURL().then(url => {
                        let a = this.state.scheme.map(i => {
                            if (i.name === name) {
                                i.url = url;
                            }
                            if (i.download === 100) {
                                i.isLoad = false;
                            }
                            return i;
                        });
                        this.setState({scheme: a});
                    });
                }
            )
            ;
        });

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

    handleDeleteScheme(e, name) {
        let arr = this.state.scheme;
        let i = this.state.scheme.findIndex(_i => _i.name === name);
        arr.splice(i, 1);
        arr = arr.length > 0 ? arr : [];
        this.setState({
            scheme: arr
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

    handleChangeColor(e) {
        this.setState({color: e.target.value});
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

    handleClickColor() {
        if (this.state.color) {
            let arr = this.state.colorList;
            arr.push(this.state.color);
            this.setState({
                color: '',
                colorList: arr
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

    deleteColor(e, i) {
        this.state.colorList.splice(i, 1);
        this.setState({
            colorList: this.state.colorList
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

    renderColorList() {
        if (this.state.colorList.length) {
            return (<ul className="list-unstyled">
                <li>Цвета:
                    <ul>
                        {this.state.colorList.map((i, index) => <li key={index}>{i} <FeatherIcon
                            onClick={(e) => this.deleteColor(e, index)} icon={"x"} size={14}/></li>)}</ul>
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

    renderSchemeList(arr) {
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
                            <FeatherIcon onClick={e => this.handleDeleteScheme(e, i.name)}
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

    renderPaz() {
        if (this.state.isPaz) {
            return (<div className="row">
                <div className="col form-group">
                    <input type="number" className="form-control" placeholder="От"
                           onChange={(e) => this.handleChange(e, "grooveOt")}
                           value={this.state.grooveOt}/>
                </div>
                <div className="col form-group">
                    <input type="number" className="form-control" placeholder="До"
                           onChange={(e) => this.handleChange(e, "grooveDo")}
                           value={this.state.grooveDo}/>
                </div>
            </div>);
        } else {
            return (<div className="row">
                <div className="col form-group">
                    <input type="number" className="form-control" placeholder="Паз"
                           onChange={(e) => this.handleChange(e, "grooveOt")}
                           value={this.state.grooveOt}/>
                </div>
            </div>);
        }
    }

    render() {
        const placeholderPrice = this.state.isPrice ? "Цена за метр" : "Цена за хлыст";
        return (
            <div className={'container'}>

                <div className={'row'}>
                    <div className="col-12 navMyBar">
                        <div className={"row"}>
                            <div className={"col-6"}><Link to={"/materials"}>Назад</Link></div>
                            <div className={"col-6 text-right"}>
                                <div className={"row"}>
                                    <div className={"col-10"}>
                                    </div>
                                    <div className={"col-2"}><a className={"text-primary"}
                                                                onClick={this.handleSubmit}>Изменить</a></div>
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
                                            <label>Серия</label>
                                            <input type="text" className="form-control" placeholder="Серия"
                                                   onChange={(e) => this.handleChange(e, "series")}
                                                   value={this.state.series}
                                                   list={"series"}/>
                                            <datalist id="series">
                                                {this.state.seriesForProfiles.map(i => <option key={i._id}
                                                                                               value={i.name}/>)}

                                            </datalist>
                                        </div>
                                    </div>
                                    <div className="col-12"><label>Тип</label>
                                        <div className="input-group mb-3">
                                            <input type="Тип" className="form-control"
                                                   placeholder="Тип" value={this.state.typesMy}
                                                   onChange={this.handleChangeTypes} list={"type"}
                                            />
                                            <datalist id="type">
                                                {this.state.typeForProfiles.map(i => <option key={i._id}
                                                                                             value={i.name}/>)}
                                            </datalist>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary"
                                                        onClick={this.handleClickTypes}
                                                        type="button">Добавить
                                                </button>
                                            </div>
                                        </div>
                                        {this.rendertypesList()}
                                    </div>
                                    <div className="col-12">
                                        <div className={"row"}>
                                            <div className={"col-2"}>
                                                <label>Паз, мм</label>
                                            </div>
                                            <div className={"col-4"}>
                                                <input className="form-check form-check-input chakedboxs"
                                                       type="checkbox"
                                                       checked={this.state.isPaz}
                                                       onClick={this.handleClickPaz}/>
                                                <label className="form-check-label">
                                                    От-До
                                                </label>
                                            </div>
                                        </div>
                                        {this.renderPaz()}
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Толщина, мм</label>
                                            <input type="number" className="form-control" placeholder="Толщина"
                                                   onChange={(e) => this.handleChange(e, "thickness")}
                                                   value={this.state.thickness}/>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Ширина, мм</label>
                                            <input type="number" className="form-control" placeholder="Ширина"
                                                   onChange={(e) => this.handleChange(e, "width")}
                                                   value={this.state.width}/>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label>Длина хлыста, м</label>
                                            <input type="number" className="form-control" placeholder="Длина хлыста"
                                                   onChange={(e) => this.handleChange(e, "length")}
                                                   value={this.state.length}/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group row">
                                            <div className={"col-5"}>
                                                <label>Цена, руб</label>
                                            </div>
                                            <div className={"col-7 row"}>
                                                <div className={"col-12"}>
                                                    <div className="form-check form-check-inline ">
                                                        <input className="form-check-input chakedboxs" type="checkbox"
                                                               checked={this.state.isPrice}
                                                               onClick={this.handleClickPrice}/>
                                                        <label className="form-check-label">За метр</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"col-12"}>
                                                <input type="number" className="form-control"
                                                       placeholder={placeholderPrice}
                                                       onChange={(e) => this.handleChange(e, "price")}
                                                       value={this.state.price}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label>Материал</label>
                                                <select className="form-control"
                                                        value={this.state.material}
                                                        onChange={(e) => this.handleChange(e, "material")}>
                                                    <option value={"Алюминий"}>Алюминий</option>
                                                    <option value={"Дерево"}>Дерево</option>
                                                </select>
                                            </div>
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
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Описание</label>
                                            <textarea rows={4} className="form-control" placeholder="Описание"
                                                      value={this.state.description}
                                                      onChange={(e) => this.handleChange(e, "description")}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Каталог, ссылка</label>
                                            <input type="text" className="form-control" placeholder="Каталог"
                                                   onChange={(e) => this.handleChange(e, "catalog")}
                                                   value={this.state.catalog}/>
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
                                <label>Схемы</label>
                                <div className="input-group mb-3">

                                    <input type="text" className="form-control"
                                           placeholder="Ссылка на схему" value={this.state.urlScheme}
                                           onChange={(e) => this.handleChange(e, "urlScheme")}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={e => this.handleClickURL("urlScheme", "scheme")}>Добавить
                                        </button>
                                    </div>
                                </div>
                                <Dropzone className={"dropzoneMy text-center"} accept="image/jpeg, image/png"
                                          onDrop={this.onDropScheme}>
                                    <FeatherIcon icon={"download"} size={25}/>
                                    <br/>
                                    <p>Загрузить схема</p>
                                </Dropzone>
                                <div className={"row text-center"}>
                                    {this.renderSchemeList(this.state.scheme)}
                                </div>
                                <div className=" text-left">
                                    <label>Покраска</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control"
                                               placeholder="Цвет" value={this.state.color}
                                               onChange={this.handleChangeColor} list={"colour"}/>
                                        <datalist id="colour">
                                            {this.state.colour.map(i => <option key={i._id}
                                                                                value={i.name}/>)}
                                        </datalist>

                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary"
                                                    type="button" onClick={this.handleClickColor}>Добавить
                                            </button>
                                        </div>
                                    </div>
                                    {this.renderColorList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(EditProfiles);