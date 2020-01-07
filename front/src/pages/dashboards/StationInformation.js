import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardText,
    Button,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";
import { Briefcase, Home, MapPin, Bell, User } from "react-feather";
import "./Db.css";
import Map from "./Map";
class StationInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "1",
            value: null,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        const { data } = this.props;        
        return (
            <React.Fragment>
                <Tabs defaultActiveKey='info'>
                    <Tab eventKey='info' title='Thông tin vườn ươm'>
                        <Card className='flex-fill w-100' style={{ height: 484, width: "100%" }}>
                            <CardBody className='my-0'>
                                <Col className='mb-3'>
                                    <Map lat="20.905832" long="105.708198" data={data}/>
                                </Col>
                                <h3 className='text-center'>{data.name}</h3>
                                <Row>
                                    <Col className='mb-3'>
                                        <Home width={20} height={20} className='mr-1' />Gateway:{" "}
                                        <Link to='#'>{data.sub_id}</Link>
                                    </Col>
                                    <Col className='mb-3'>
                                        <Home width={20} height={20} className='mr-1' /> Hạt giống:{" "}
                                        <Link to='#'>
                                            {
                                            data.seed_name === "tomato" ? "Cà chua" : ""||
                                            data.seed_name === "cucumber" ? "Dưa chuột" : ""||
                                            data.seed_name === "pakchoi" ? "Cải ngọt" : ""||
                                            data.seed_name === "brassica" ? "Cải chíp" : ""||
                                            data.seed_name === "cabbage" ? "Bắp cải" : ""
                                            }
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='mb-3'>
                                        <Briefcase width={20} height={20} className='mr-1' />
                                            Ngày gieo hạt:{" "}
                                        <Link to='#'>
                                            <Moment format='DD/MM/YYYY'>
                                                {data.started_plant}
                                            </Moment>
                                        </Link>
                                    </Col>
                                    {/* <Col className='mb-3'>
                                        <MapPin width={20} height={20} className='mr-1' />
                                        Địa chỉ: <Link to='#'>{data.address}</Link>
                                    </Col> */}
                                    <Col className='mb-3'>
                                        <User width={20} height={20} className='mr-1' />
                                        Người quản lí: <Link to='#'>{data.manager.full_name}</Link>
                                    </Col>
                                </Row>
                                
                                <ul className='list-unstyled mb-0 mt-2'>
                                    <h3 className="text-center">Trạng thái cảm biến</h3>
                                    <Row className='mb-0 mt-3'>
                                        <Col xs='1'>
                                            <div className='warning__statistic bg-danger'></div>
                                        </Col>
                                        <Col xs='3'>
                                            <h5 className='mt-1'>
                                               Cao
                                            </h5>
                                        </Col>
                                        <Col xs='1'>
                                            <div className='warning__statistic bg-success'></div>
                                        </Col>
                                        <Col xs='3'>
                                            <h5 className='mt-1'>
                                               Trung bình
                                            </h5>
                                        </Col>
                                        <Col xs='1'>
                                            <div className='warning__statistic infomation__warning-low'></div>
                                        </Col>
                                        <Col xs='3'>
                                            <h5 className='mt-1'>
                                               Thấp
                                            </h5>
                                        </Col>
                                    </Row>
                                </ul>
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab eventKey='map' title='Trạng thái cây'>
                        <Card className='flex-fill w-100' style={{ height: 484, width: "100%" }}>
                            <CardBody className='my-0'>
                            <h4 className='text-center  text-primary '>
                                Nhấn vào webcam để theo dõi cây trồng!{" "}
                            </h4>

                            <div className='d-flex justify-content-center mt-2'>
                                <a
                                    href='http://lophocvui.ddns.net/doc/page/login.asp?_1574329102388'
                                    target='_blank'>
                                    <img
                                        className='camera__camera'
                                        src='https://www.a4tech.com/alanUpload/colorImg/img/201803/0203101147364114.jpg'
                                        alt='Card image cap'
                                        width="400px"
                                    />
                                </a>
                            </div>
                                <Row>
                                    <Col className="mt-3">
                                        <h5>
                                            <Home width={20} height={20} className='mr-1' />Giai đoạn:{" "}
                                            <Link to='#'>
                                                {   
                                                        data.stage.name === "germination stage" ? "Gieo hạt" : ""||
                                                    
                                                        data.stage.name === "development 1 stage" ? "Ra hoa" : ""||
                                                    
                                                        data.stage.name === "development 2 stage" ? "Phát triển" : ""||
                                                    
                                                        data.stage.name === "harvest stage" ? "Thu hoạch" : ""  
                                                }
                                            </Link>
                                        </h5>
                                    </Col>
                                    <Col className="mt-3">
                                        <h5>
                                            <Briefcase width={20} height={20} className='mr-1' />
                                            Nhiệt độ: <Link to='#'>{data.stage.min_temp}</Link>{" "}
                                            {" < T < "} <Link to='#'>{data.stage.max_temp}</Link>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-3">
                                        <h5>
                                            <Briefcase width={20} height={20} className='mr-1' />
                                            Ánh sáng: <Link to='#'>{data.stage.min_light}</Link>
                                            {" < L < "} <Link to='#'>{data.stage.max_light}</Link>
                                        </h5>
                                    </Col>
                                    <Col className="mt-3"> 
                                        <h5>
                                            <Briefcase width={20} height={20} className='mr-1' />
                                            PH: <Link to='#'>{data.stage.min_PH}</Link> {" < PH < "}{" "}
                                            <Link to='#'>{data.stage.max_PH}</Link>
                                        </h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-3">
                                        <h5>
                                            <Briefcase width={20} height={20} className='mr-1' />
                                                Độ ẩm đất:{" "}
                                            <Link to='#'>{data.stage.min_soil_moisture}</Link>{" "}
                                            {" < SM < "}{" "}
                                            <Link to='#'>{data.stage.max_soil_moisture}</Link>
                                        </h5> 
                                    </Col>
                                    <Col className="mt-3">
                                        <Briefcase width={20} height={20} className='mr-1' />
                                            Độ ẩm không khí: <Link to='#'>
                                                {data.stage.min_hum}
                                        </Link>{" "}
                                        {" < H < "} <Link to='#'>{data.stage.max_hum}</Link>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </React.Fragment>
        );
    }
}

export default StationInformation;
