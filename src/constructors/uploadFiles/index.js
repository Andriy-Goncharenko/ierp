import Dropzone from 'react-dropzone';
import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';
import * as firebase from "firebase";
import {FIREBASE} from '../../config'

class UploadFiles extends Component {

    constructor(props) {
        super(props);

        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE);
        }

        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(FILES) {
        let {files, onFiles} = this.props;
        console.log(files);
        FILES.forEach(file => {

            files.push({name: file.name, url: file.preview, download: 0});

            onFiles(files);
            let storageRef = firebase.storage().ref('documents/' + file.name);
            let task = storageRef.put(file);
            let name = file.name;
            task.on('state_changed', (snapshot) => {
                let a = files.map(i => {
                    if (i.name === name) {
                        i.download = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    }
                    return i;
                });
                onFiles(a);
            }, (error) => {
                console.error(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    let a = files.map(i => {
                        if (i.name === name) {
                            i.url = downloadURL;
                        }
                        return i;
                    });
                    onFiles(a);
                });
            });
        });
    }

    deleteFile(k) {
        let {files, onFiles} = this.props;
        files.splice(k, 1);
        onFiles(files);
    }

    render() {
        let {files} = this.props;
        return (
            <div className={'row'}>
                <div className="col-6 text-center"><Dropzone onDrop={this.onDrop} className={"zona"}>
                    <FeatherIcon icon={"download"} size={25}/>
                    <br/>
                    <p>Загрузить чертежи</p>
                </Dropzone></div>
                < div
                    className="col-6">
                    <p> Чертежи :</p>
                    <ul className="list-unstyled">
                        {files.map((f, i) => <li key={i}><a
                            href={f.url}>{f.name}{f.download === 100 ? '' : ` - ${f.download} %`}</a>
                            <FeatherIcon
                                onClick={() => this.deleteFile(i)} icon={"x"} size={12}/>
                        </li>)
                        }
                    </ul>
                </div>
            </div>)
    }
}

export default UploadFiles;