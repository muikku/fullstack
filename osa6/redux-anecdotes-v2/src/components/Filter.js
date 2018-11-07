import React from 'react'
import { setFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
      this.props.setFilter(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10
      }

      return(
        <div style={style}>
            filter <input onChange={this.handleChange}/>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return { filter: state.filter }
}

const ConnectedFilter = connect(mapStateToProps, { setFilter })(Filter)

export default ConnectedFilter