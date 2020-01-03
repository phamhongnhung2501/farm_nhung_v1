import React from "react";
import { 
    Button,
    Card, CardBody, 
    Col, 
    FormGroup,
    Input, Label, Row, 
    Modal, ModalHeader, ModalBody, ModalFooter, 
} from "reactstrap";
// import "./General.css";
import Notification from "../../components/Notification";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Moment from 'react-moment';
import logo from "../../assets/img/logo/logo.png";
const api = require("./api/api");
const utils = require("../../utils/utils");

class DateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
          selectedDay: this.props.data.started_plant,
        };
      }
    
      handleDayChange(day) {
        this.setState({ selectedDay: day });
        const data = {
            started_plant: day,

        }
        this.props.handleChangeDate(data)
      }
    
      render() {
        const { selectedDay } = this.state;        
        return (
          <div>
            {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
            {!selectedDay && <p>Thay đổi ngày bắt đầu</p>}
            <DayPickerInput value={this.props.data.started_plant} onDayChange={this.handleDayChange} />
          </div>
        );
      }
}
class General extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            full_name: "",
            data: {
                started_plant: "",
                manager: {
                },
                status: {

                },
                stage_1: {

                },
                stage_2: {

                },
                stage_3: {

                },
                stage_4: {

                }
            },
            isLoaded1: false,
            isLoaded2: false,
            modal: false,
            modalInputPass: false,
            modalCloseAll: false,
            changeName: null,
            changeDescription: null,
            changeIsPrivate: null,
            changeLogo: null,
            tempLogo: null
        };
        this.handleChange = this.handleChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleInputPass = this.toggleInputPass.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    handleChangeDate(data){
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                started_plant: data.started_plant
            }
        }))
    }

    handleChange(event) {
        let data  = Object.assign({}, this.state.data, this.state.data.stage_1, this.state.data.stage_2, this.state.data.stage_3, this.state.data.stage_4);
        let obj = event.target.name.split(".")[0]
        let key = event.target.name.split(".")[1]
        
        if(obj === 'stage_1')
            data.stage_1[key] = event.target.value;
        else if(obj === 'stage_2')
            data.stage_2[key] = event.target.value;
        else if(obj === 'stage_3')
            data.stage_3[key] = event.target.value;
        else if(obj === 'stage_4')
            data.stage_4[key] = event.target.value;
        else
            data[event.target.name] = event.target.value;
        this.setState({ data: data });
    }

    handleChangeType(type) {
        this.setState({
            changeIsPrivate: type === "private"
        });
    }

    handleSaveChange() {
        api.modifyStation(this.state.data.sub_id, this.state.data, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                localStorage.setItem('project', JSON.stringify(result));
                Notification("success", "Edit Station", "Edit station is successfully");
            }
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleInputPass() {
        this.setState({
            modalInputPass: !this.state.modalInputPass,
            modalCloseAll: false
        });
    }

    handleDelProject() {
        api.deleteStation(this.state.data.sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.status + ' ' + err.data._error_message)
            } else {
                window.location.replace('/farms')
            }
        })
    }

    componentDidMount() {
        const that = this;
        api.getInfoProject(utils.getStationInfo().sub_id, (err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
            } else {
                that.setState({
                    data: result,
                    isLoaded1: true
                })
                localStorage.setItem('project', JSON.stringify(result));
            }
        });
        api.getListSeed((err, result) => {
            if (err) {
                Notification("error", "Error", err.data === undefined ? err : err.data._error_message);
            } else {
                that.setState({ listSeed: result, isLoaded2: true });
            }
        });
    }

    render() {
        return (
            !(this.state.isLoaded1 && this.state.isLoaded2)  ? null :
            <Card className="admin__general__card">
                <CardBody>
                    <Row>
                        <Col md="8">
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="inputStationName">Tên trang trại</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Station name"
                                            autoComplete="off"
                                            defaultValue={this.state.data.name}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_manager">Quản lý</Label>
                                        <Input
                                            type="text" name="manager"
                                            placeholder="Name of manager"
                                            defaultValue={this.state.data.manager.full_name}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <Label>Giống cây trồng</Label>
                                    <Input
                                        disabled
                                        type="text" name="seed_name"
                                        placeholder="Giống cây trồng"
                                        defaultValue={
                                            this.state.data.seed_name === "tomato" ? "Cà chua" : ""||
                                            this.state.data.seed_name === "cucumber" ? "Dưa chuột" : ""||
                                            this.state.data.seed_name === "pakchoi" ? "Cải ngọt" : ""||
                                            this.state.data.seed_name === "brassica" ? "Cải chíp" : ""||
                                            this.state.data.seed_name === "cabbage" ? "Bắp cải" : ""
                                        }
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                    />
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="name_of_address">Số điện thoại</Label>
                                        <Input
                                            disabled
                                            type="text" name="phone_number"
                                            placeholder="Phone number"
                                            defaultValue={this.state.data.manager.phone_number}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="name_of_address">Địa chỉ</Label>
                                        <Input
                                            type="text" name="address"
                                            placeholder="Địa chỉ"
                                            defaultValue={this.state.data.address}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Label for="name_of_address">Gateway</Label>
                                        <Input
                                            disabled
                                            type="text" name="sub_id"
                                            placeholder="sub_id"
                                            defaultValue={this.state.data.sub_id}
                                            onChange={this.handleChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <DateTimePicker 
                                            className="ml-1"
                                            data = {this.state.data.started_plant}
                                            handleChangeDate = {this.handleChangeDate}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                            <FormGroup>
                            
                        </FormGroup>
                       
                            </Row>
                        </Col>
                        <Col md="4" className="mt-3">
                            <Row>
                            <img
                                className="mb-3 m-auto"
                                src= {logo}
                                width="200px"
                            />
                            </Row>
                            <Row className="mt-5">
                                <Col md="2"></Col>
                                <Col md="4" className="admin__button-save text-center">
                                    <Button className="mt-3 " type="button" color="primary" size="lg" onClick={this.handleSaveChange.bind(this)}>Lưu thay đổi</Button>
                                </Col>
                                <Col md="4" className="admin__button-save  text-center">
                                    <Button  className="mt-3" type="button" color="danger" size="lg" onClick={this.toggle}>Xóa vườn ươm</Button>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader>Confirm</ModalHeader>
                                        <ModalBody>Bạn có chắc chắn xóa trang trại này không?</ModalBody>
                                        <ModalFooter>
                                            <Button className="mt-1" color="secondary" size="lg" onClick={this.toggle}>Quay lại</Button>
                                            <Button className="mt-1"  color="success" size="lg" onClick={this.handleDelProject.bind(this)}>Đồng ý</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Col>
                                <Col md="2"></Col>
                            </Row>
                           
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default General;
