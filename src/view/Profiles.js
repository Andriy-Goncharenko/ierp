import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import settings from "../settings";

class ViewProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {obj: {}};
        this.connect();
        this.removeProfile = this.removeProfile.bind(this);
    }

    sendWS(obj) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(obj)
        }
    }

    removeProfile() {
        if (window.confirm("Вы хотите удалить профиль?")) {
            this.sendWS(JSON.stringify({
                code: 'remove',
                find: {"_id": this.props.match.params.id},
                collection: 'materialsProfiles'
            }));
        }

    }

    connect() {
        this.ws = new WebSocket(settings.ws);

        this.ws.addEventListener('open', () => {
            this.sendWS(JSON.stringify({
                code: 'get',
                find: {"_id": this.props.match.params.id},
                collection: 'materialsProfiles'
            }));
        });

        this.ws.addEventListener('message', res => {
            if (res.data) {
                res = JSON.parse(res.data);
                if (res.label && res.label === "get/materialsProfiles") {
                    if (res.item)
                        this.setState({obj: res.item});
                } else if (res.label && res.label === "remove/materialsProfiles") {
                    if (res.status === 1) {
                        this.props.history.push("/materials");
                    }
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

    render() {
        const obj = this.state.obj;
        const list = t => {
            if (t) {
                return t.map(i => <p>{i}</p>)
            }
        };
        const groove = (Ot, Do) => {
            if (Ot) {
                if (Do) {
                    return Ot + "-" + Do
                } else {
                    return Ot
                }
            }
        };
        const listImages = imgs => {
            if (imgs)
                return imgs.map(i => <div className={"col-6"}><img src={i} className={"img-fluid"}/></div>);
        };
        if (obj)
            return (
                <div className={'container'}>
                    <div className={'row'}>
                        <div className="col-12 navMyBar">
                            <div className={"row"}>
                                <div className={"col-6"}><Link to={"/materials"}>Назад</Link></div>
                                <div className={"col-6 text-right"}>
                                    <div className={"row"}>
                                        <div className={"col-8"}></div>
                                        <div className={"col-2"}><Link
                                            to={"/edit/profiles/" + this.props.match.params.id}
                                            className={"text-primary"}>Изменить </Link></div>
                                        <div className={"col-2"}><a
                                            className={"text-primary"}
                                            onClick={this.removeProfile}>Удалить</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={"row"}>
                                <div className="col-6">
                                    <dl className="row">
                                        <dt className="col-sm-3">Артикул</dt>
                                        <dd className="col-sm-9"><p>{obj.vc}</p></dd>
                                        <dt className="col-sm-3">Серия</dt>
                                        <dd className="col-sm-9">
                                            <p>{obj.series}</p>
                                        </dd>
                                        <dt className="col-sm-3">Тип</dt>
                                        <dd className="col-sm-9">{list(obj.type)}
                                        </dd>
                                        <dt className="col-sm-3">Паз</dt>
                                        <dd className="col-sm-9">{groove(obj.grooveOt, obj.grooveDo)} мм
                                        </dd>
                                        <dt className="col-sm-3">Толщина</dt>
                                        <dd className="col-sm-9">{obj.thickness} мм
                                        </dd>
                                        <dt className="col-sm-3">Ширина</dt>
                                        <dd className="col-sm-9">{obj.width} мм
                                        </dd>
                                        <dt className="col-sm-3">Длина</dt>
                                        <dd className="col-sm-9">{obj.length} м
                                        </dd>
                                        <dt className="col-sm-3">Цена за хлыст</dt>
                                        <dd className="col-sm-9">{obj.price} руб
                                        </dd>
                                        <dt className="col-sm-3">Материал</dt>
                                        <dd className="col-sm-9">{obj.material}
                                        </dd>
                                        <dt className="col-sm-3">Поставщики</dt>
                                        <dd className="col-sm-9">{list(obj.provider)}
                                        </dd>
                                        <dt className="col-sm-3">Описание</dt>
                                        <dd className="col-sm-9">{obj.description}
                                        </dd>
                                        <dt className="col-sm-3">Каталог</dt>
                                        <dd className="col-sm-9"><a href={obj.catalog}>Открыть</a>
                                        </dd>
                                    </dl>
                                </div>
                                <div className={"col-6"}>
                                    <p>Изображения</p>
                                    <div className={"row"}>
                                        {listImages(obj.images)}
                                    </div>
                                    <p>Схемы</p>
                                    <div className={"row"}>
                                        {listImages(obj.scheme)}
                                    </div>
                                    <dl className="row">
                                        <dt className="col-sm-3">Цвета</dt>
                                        <dd className="col-sm-9 text-capitalize">{list(obj.painting)}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

export default withRouter(ViewProfiles);