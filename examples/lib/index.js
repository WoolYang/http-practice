import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.less'
const Component = React.Component;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    clickNormal = () => {
        fetch('http://localhost:3000/normal')
            .then(res => console.log(res))
    }

    clickNoCORS = () => {
        fetch('http://localhost:3000/nocors', {
            mode: "no-cors"
        }).then(res => console.log(res))
    }

    clickCORS = () => {
        fetch('http://localhost:3000/cors').then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        })
    }

    clickJsonp = () => {
        //！！回调函数必须挂载在全局
        window.jsonpCallback = function (data) {
            console.log(data.message)
            window.jsonpCallback = undefined; //执行完成后清除callback
        }
        //创建sript标签
        let id = "id_jsonpCallback"; //利用id识别jsonp标签,方便请求成功后删除
        let script = document.createElement('script');
        script.src = 'http://localhost:3000/jsonp?callback=jsonpCallback';
        script.id = id;

        let getHeadByElem = document.getElementsByTagName('head')[0];
        getHeadByElem.appendChild(script);

        let positionById = document.getElementById(id);
        positionById.parentNode.removeChild(positionById);
    }

    render() {

        return (
            <div className="example">
                <span className="btn" onClick={this.clickNormal} >1</span>
                <span className="btn" onClick={this.clickNoCORS} >2</span>
                <span className="btn" onClick={this.clickCORS} >3</span>
                <span className="btn" onClick={this.clickJsonp} >4</span>
            </div>
        )
    }
}


ReactDOM.render(<Main />, document.querySelector('.main'));