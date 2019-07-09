import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            msg:"我是一个头部组件"
         };
    }

    
    render() {
        return (
            <div>
                <header title={this.props.title} num="aaaaa">{this.props.title}</header>
            </div>
        );
    }
}
Header.defaultProps={
    title:"我是标题"
}

Header.propTypes={
    num:PropTypes.number
}
export default Header;