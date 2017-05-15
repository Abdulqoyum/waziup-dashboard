import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Table, PageHeader, Panel, Well, ListGroupItem, ListGroup} from 'react-bootstrap';
import { fetchDevicesList } from '../actions/sensingDeviceActions'

class SensingDevices extends Component {
  // constructor(props) {
  //   super(props)
  //   // this.state = {
  //   //   sensingDevice: false,
  //   // }
  // }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchDevicesList())
  }

  filterSensorsSensingDevice(device) {
    const attributesToExclude = ["id", "type", "location", "dateCreated", "dateModified", "owner", "servicePath"];
    let sensors = [];
    for (var i in device) {
      if (attributesToExclude.indexOf(i) === -1 && device[i]) {
        let unit
        (device[i].metadata.unit === undefined) ?  unit = '':
        unit = "(" + device[i]['metadata']['unit'].value +")"

        sensors.push(i + unit + ': ' + device[i].value)
      }
        //sensors.push({ "sensor": i, "value": device[i].value })  + '(' +  + ')'
    }
    return sensors
  }

  tableSensingDeivces(listDevices) {
    console.log(listDevices)
    let index = 1
    let tableRows = listDevices.map((device) => {
      let latestSensorsValues = this.filterSensorsSensingDevice(device).map(
        (sensor) => {return <ListGroupItem key={sensor} bsStyle="info"> {sensor} </ListGroupItem>})
      console.log(latestSensorsValues)
      return (<tr key={device.id}>
        <td> {index++} </td>
        <td> {device.id} </td>
        <td> {device.dateCreated.value} </td> 
        <td> <Well>{device.dateModified.value}</Well> </td>
        <td> <Well><ListGroup >{latestSensorsValues}</ListGroup></Well> </td>
      </tr>);
    })

    return tableRows
  }

  render() {
    const sensingDevice = this.props.sensingDevice
    const isFetching = sensingDevice.isFetching
    const fetched = sensingDevice.fetched

    //<PageHeader>Summary of Sensing Devices Information <small> </small></PageHeader>
    return (
      <div>
        <Panel collapsible defaultExpanded header="List of Sensing Devices">
          {(isFetching === true) ? (<Well> Sensing devices are being loaded. </Well> ):
            ((fetched === true) ?<Table responsive fill>
              <thead>
                <tr><th>#</th><th>DeviceID</th><th>dateCreated</th>
                <th>dateModified</th><th>Latest Sensors Data</th></tr>
              </thead>
              <tbody>
                {this.tableSensingDeivces(sensingDevice.listDevices)}
              </tbody>
            </Table>: (<Well> Error happened during fetching sensing devices: {sensingDevice.errMsg} </Well> ))
          }
        </Panel>
      </div>
    )
  }
}

// const mapDispatchToProps = state => {
//   return { fetchDevicesList: state.sensingDevice }
// }
const mapStateToProps = state => {
  return { sensingDevice: state.sensingDevice }
}

export default connect(mapStateToProps)(SensingDevices)