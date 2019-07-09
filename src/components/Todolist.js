import React from 'react';
import '../assets/css/App.css';
import storage from '../model/storage';

class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputValue:"请输入代办事项，按回车或添加确认",
            list:[] 
        };
    }
    
    sumbitInput=(e)=>{
        let value=e.target.value;
        let tmplist=this.state.list;
        if(e.keyCode===13){
            if(value!=="" && value!==this.state.inputValue){
                tmplist.push({value:value,checked:false});

                this.setState( 
                    {
                        list:tmplist,
                    }
                )
            }
        }

        storage.set("todolist",tmplist);
    }

    changeTask=(key)=>{

        let tmplist = this.state.list;
        let task = tmplist[key];
        task.checked=!task.checked;

        this.setState({
            list:tmplist
        })

        storage.set("todolist",tmplist);

    }

    deleteTask=(key)=>{

        let tmplist = this.state.list;
        tmplist.splice(key,1)
        this.setState({
            list:tmplist
        })

        storage.set("todolist",tmplist);
    }



    componentDidMount(){
        let list = storage.get("todolist");

        if(list) {
            this.setState({
                list:list
            })
        }
    }

    render() {
        return (
            <div>
                <header className="Title">TODOList
                <input type="text" placeholder={this.state.inputValue} onKeyUp={this.sumbitInput}/>
                &nbsp;<button onClick={this.sumbitInput}>添加</button>
                
                </header>

                <br />
                <hr />
                <h2>代办事项</h2>
                <ul>
                    {
                        this.state.list.map((value,key)=>{
                            if(!value.checked) {
                                return(
                                    <li key={key}><input type="checkbox" checked={value.checked} onChange={this.changeTask.bind(this,key)}/>{value.value}  <button onClick={this.deleteTask.bind(this,key)}>删除</button></li>
                                )
                            }
                            return "";
                        })
                    }
                </ul>
                <hr />
                <h2>完成事项</h2>
                {
                        this.state.list.map((value,key)=>{
                            if(value.checked) {
                                return(
                                    <li key={key}><input type="checkbox" checked={value.checked} onChange={this.changeTask.bind(this,key)}/>{value.value}  <button onClick={this.deleteTask.bind(this,key)}>删除</button></li>
                                )
                            }
                            return "";
                        })
                    }
                <br />
            </div>
        );
    }
}

export default Todolist;