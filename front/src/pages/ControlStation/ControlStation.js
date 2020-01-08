import React from "react";
import socketIOClient from "socket.io-client";
import {
    Row, Col,
    Card, CardBody, CardHeader,
    Input, InputGroup, InputGroupAddon,
    Button,
} from "reactstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { CustomImg } from "../../components/CustomTag";
import LightOff from "../../assets/img/photos/light_off.png";
import LightOn from "../../assets/img/photos/light_on.png";
import FantOff from "../../assets/img/photos/fan_off.png";
import WPlumOn from "../../assets/img/photos/wplum_on.jpg";
import CurtainOn from "../../assets/img/photos/curtain_on.jpg";
import Soil from "../../assets/img/photos/soil.png";
import Hum from "../../assets/img/photos/hum.png";
import Notification from "../../components/Notification";
import moment from 'moment';

const utils = require("../../utils/utils");
const config_socket = require("../../config/config").config_socket;
const api = require("./api/api");

let socket;
class Controlstation extends React.Component {
    constructor(props) {
        super(props);
        this.send = this.send.bind(this);
        this.state = {
            endpoint: config_socket.ip,
            data: {
                id: JSON.parse(localStorage.getItem("project")).sub_id,
                status: "O",
            },
            sensor1: {
                name: null,
                id: null,
                RF_signal: null,
            },
            sensor2: {
                name: null,
                id: null,
                RF_signal: null,
                battery: null,
            },
            sensor3: {
                name: null,
                id: null,
                RF_signal: null,
            },
        };
        socket = socketIOClient(this.state.endpoint);
    }

    send(name, status) {
        let data = {};
        data.id = name;
        data.status = status;
        socket.emit("controller", data);
    }

    componentDidMount() {
        const that = this;
        const { endpoint } = this.state;
        const sub_id = utils.getStationInfo().sub_id;
        const socket = socketIOClient(endpoint, {
            query: {
                token: utils.getAuthToken(),
                sub_id: sub_id,
            },
        });
        socket.on("farm_" + sub_id, function(value) {
            that.setState({
                sensor1: value.sensor_1,
                sensor2: value.sensor_2,
                sensor3: value.sensor_3,
                time: value.time,
            });
        });
        
        socket.on("controller_" + sub_id, function(value) {
            that.setState({
                RL1: value.RL1_status,
                RL2: value.RL2_status,
                GW_name: value.id,
            });
        });
        
        socket.on("error", function(err) {});
        api.getData((err, result) => {
            if (err) {
                Notification(
                    "error",
                    "Error",
                    err.data === undefined ? err : err.data._error_message,
                );
            } else {
                if(result.length > 0){
                    that.setState({
                        sensor1: result[0].sensor_1,
                        sensor2: result[0].sensor_2,
                        sensor3: result[0].sensor_3,
                        time: result[0].time,
                    });
                }
            
            }
        });
    }

    render() {
        let location = JSON.parse(localStorage.getItem("project")).sub_id;
        const { sensor1, sensor2, sensor3, RL1, RL2, GW_name, time } = this.state;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <h1 className='text-center font-weight-bold d-inline mt-4'>
                            Nhà kính {location}
                        </h1>
                        <div className='float-right d-inline '>
                            <h4 className='text-center font-weight-bold'>Thời gian cập nhập:</h4>
                            <h4 className='text-success'>
                                {moment(time).format("DD/MM/YYYY h:mm:ss a")}
                            </h4>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs='12' md='6' sm='12'>
                                <Card body outline color='primary'>
                                    <h2 className='text-center'>Máy bơm</h2>
                                    <CardBody>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='success'>
                                                    &ensp;&ensp;Tên&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold'
                                                value={sensor1.name}
                                                disabled
                                            /> */}
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='danger'>
                                                    &ensp;&ensp;ID&ensp;&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold'
                                                value={sensor1.id}
                                                disabled
                                            /> */}
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='primary'>Tín hiệu</Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold text-success'
                                                value={sensor1.RF_signal}
                                                disabled
                                            /> */}
                                        </InputGroup>

                                        <Row className='mt-5'>
                                            <Col xs='12' md='12' sm='12'>
                                                {/* <h4 className='text-center'>Máy bơm</h4> */}
                                                <center>
                                                <CustomImg
                                                    key={utils.randomString()}
                                                    src={RL2 === "11" ? WPlumOn : FantOff}
                                                    alt='button'
                                                    className='m-auto'
                                                    width="217"
                                                />
                                                </center>

                                                <div className='d-flex justify-content-center mt-3 d-inline '>
                                                    <Button
                                                        className='mr-3'
                                                        color='danger'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(location, "20");
                                                        }}>
                                                        <div className="h3 text-white">Tắt máy</div>
                                                    </Button>
                                                    <Button
                                                        className=''
                                                        color='success'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(location, "21");
                                                        }}>
                                                        <div className="h3 text-white">Bật máy</div>
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xs='12' md='6' sm='12'>
                                <Card body outline color='primary'>
                                    <h2 className='text-center'>Mái che</h2>
                                    <CardBody>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='success'>
                                                    &ensp;&ensp;Tên&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold'
                                                value={sensor1.name}
                                                disabled
                                            /> */}
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='danger'>
                                                    &ensp;&ensp;ID&ensp;&ensp;&ensp;
                                                </Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold'
                                                value={sensor1.id}
                                                disabled
                                            /> */}
                                        </InputGroup>
                                        <InputGroup className='my-4'>
                                            <InputGroupAddon addonType='prepend'>
                                                <Button color='primary'>Tín hiệu</Button>
                                            </InputGroupAddon>
                                            {/* <Input
                                                className='font-weight-bold text-success'
                                                value={sensor1.RF_signal}
                                                disabled
                                            /> */}
                                        </InputGroup>

                                        <Row className='mt-5'>
                                            <Col xs='12' md='12' sm='12'>
                                                <center>
                                                    <CustomImg
                                                        key={utils.randomString()}
                                                        src={RL1 === "01" ? CurtainOn : LightOff}
                                                        alt='button'
                                                        className='img-fluid'
                                                        width="322"
                                                    />                                                   
                                                </center> 

                                             
                                               
                                                <div className='d-flex justify-content-center mt-3 d-inline '>
                                                    <Button
                                                        className='mr-3'
                                                        color='danger'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(location, "10");
                                                        }}>
                                                        <div className="h3 text-white"> Kéo rèm</div>                                                     
                                                    </Button>
                                                    <Button
                                                        className=''
                                                        color='success'
                                                        size='md'
                                                        onClick={() => {
                                                            this.send(location, "11");
                                                        }}>
                                                        <div className="h3 text-white">Mở rèm</div>                                                        
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
    
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default Controlstation;