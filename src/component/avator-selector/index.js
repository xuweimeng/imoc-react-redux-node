import React from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatorSelector extends React.Component {

  static propTypes = {
    selectAvator: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const data = 'zhu,chanjinlu,zhizhu,yangtuo,zhangyu,qingwa,shayu,shizi,songshu,tiane,wugui,xie,xiongmao,yazi,yu'
                .split(',')
                .map( v => ({
                  icon: require(`../../images/${v}.png`),
                  text: v
                }))
    const gridHeader = this.state.elm
                      ?<div>
                        <span>已选择头像</span>
                        <img style={{width:20}} src={this.state.elm.icon} alt="" />
                      </div>
                      :<div>请选择头像</div>
    return (
      <div>
        <List renderHeader={gridHeader}>

          <Grid data={data} columnNum={5}
            onClick={ elm => {
              this.setState({elm})
              this.props.selectAvator(elm.text)
            }}        
          />
        </List>
      </div>
    )
  }
}

export default AvatorSelector;