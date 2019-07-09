import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username:'' };
    }

    inputChange=()=>{
        let val = this.refs.username.value;
        this.setState({
            // username:e.target.value
            username:val
        })
    }

    showInput=()=>{
        console.log(this.state.username);
    }

    inputConfirm=(e)=>{
        let keyCode = e.keyCode;

        if(keyCode===13) {
            console.log(e.target.value)
        }

    }

    render() {
        return (
            <div>

                <input ref="username" onChange={this.inputChange} onKeyUp={this.inputConfirm}/><button onClick={this.showInput}>显示input框的内容</button>


            </div>
        );
    }
}

export default List;