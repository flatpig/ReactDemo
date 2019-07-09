import React from 'react';

class Reactform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:"React表单",
            name:'',  
            sex:'1',     
            city:'',      
            citys:[ 
                
                '北京','上海','深圳'            
            ],
            hobby:[   
                {  
                    'title':"睡觉",
                    'checked':true
                },
                {  
                    'title':"吃饭",
                    'checked':false
                },
                {  
                    'title':"敲代码",
                    'checked':true
                }
            ],
            info:'' 
        };
    }
    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handleSex=(e)=>{
        this.setState({
            sex:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        console.log(this.state.name, this.state.sex, this.state.city)
    }

    changeCity=(e)=>{
        this.setState({
            city:e.target.value
        })  
    }

    handleHobby(key){
        let hobby = this.state.hobby
        hobby[key].checked = !hobby[key].checked
        this.setState({
            hobby:hobby
        })
    }

    changeInfo=(e)=>{
        this.setState({
            info:e.target.value
        })  
    }
    render() {

        let options=this.state.citys.map(function(value,key){
            return <option key={key}>{value}</option>
        
        })

        let hobbys=this.state.hobby.map((value,key)=>{
            return (
                <span key={key}>
                    <input type="checkbox"  checked={value.checked} onChange={this.handleHobby.bind(this,key)}/> {value.title}
                </span>
            )
        })

        return (
            <div>
                <h2>{this.state.msg}</h2>

                <form onSubmit={this.handleSubmit}>
                   用户名: <input type="text" onChange={this.handleName}/><br />
                   性别: <input type="radio" value="1" checked={this.state.sex==="1"} onChange={this.handleSex} /> 男
                         <input type="radio" value="2" checked={this.state.sex==="2"} onChange={this.handleSex} /> 女                    <br />
                   居住城市:
                        <select value={this.state.city} onChange={this.changeCity}>
                            {options}
                        </select>
                    <br />
                    爱好:
                        {hobbys}
                    <br />
                    <textarea vlaue={this.state.info} onChange={this.changeInfo} />
                    <input type="submit" defaultValue="提交" />
                </form>
            </div>
        );
    }
}

export default Reactform;