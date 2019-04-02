import React from 'react';

export default function ImoocForm(Comp) {
  return (
    class WrappperCom extends React.Component{
      constructor(props) {
        super(props)
        this.state ={}
        this.handleChange = this.handleChange.bind(this)
      }
      handleChange(k, val) {
        console.log(k, val)
        this.setState({
            [k]: val
        })
    }

      render() {
       return(<Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>)
      }
    }
  )
} 