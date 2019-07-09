import React, { Component } from 'react';
import Header from './Header';
// import axios from 'axios';
class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {
            title:"首页组件"

        }


    }

    render() {

        return (
        <div>
        {this.props.title}
        <Header num="aaaa"/>
        </div>
        
        )
    }
}

Home.defaultProps={
    title:"我是Home标题"

}

export default Home;