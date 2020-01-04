import React from "react";
import { Col, Card, CardBody, CardHeader, Row, Media } from "reactstrap";
import { Slack, TrendingUp, Zap } from "react-feather";
import './Db.css';
import './DomCssTable.css';
import { Droplet, Thermometer, Activity, Square, AlertTriangle } from "react-feather";
class Statistics extends React.Component {
  ConvertHum(data) {
    if (data >= this.props.info.stage.min_hum && data < this.props.info.stage.max_hum) {
      return "medium_sensor float-right d-inline";
    }
    else if (data < this.props.info.stage.min_hum) {
      return "low_sensor float-right d-inline";
    }
    else {
      return "high_sensor float-right d-inline";
    }
  }

  ConvertPH(data) {

    if (data >= this.props.info.stage.min_PH && data < this.props.info.stage.max_PH) {

      return "medium_sensor float-right";
    }
    else if (data < this.props.info.stage.min_PH) {
      return "low_sensor float-right";
    }
    else {
      return "high_sensor float-right";
    }
  }
  ConvertL(data) {
    if (data >= this.props.info.stage.min_light && data < this.props.info.stage.max_light) {

      return "medium_sensor float-right";
    }
    else if (data < this.props.info.stage.max_light) {
      return "low_sensor float-right";
    }
    else {
      return "high_sensor float-right";
    }
  }
  ConvertT(data) {

    if (data >= this.props.info.stage.min_temp && data < this.props.info.stage.max_temp) {

      return "medium_sensor float-right";
    }
    else if (data < this.props.info.stage.min_temp) {
      return "low_sensor float-right";
    }
    else {
      return "high_sensor float-right";
    }
  }
  ConvertSM(data) {

    if (data >= this.props.info.stage.min_soil_moisture && data < this.props.info.stage.max_soil_moisture) {

      return "medium_sensor float-right";
    }
    else if (data < this.props.info.stage.min_soil_moisture) {
      return "low_sensor float-right";
    }
    else {
      return "high_sensor float-right";
    }
  }

  render() {
    return (
      <div className="w-100">
        <Row>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader className=" border border-primary px-2 !important">
                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/167/167745.svg" width={50} height={50} />
                </div>
                <h4 className="card-title mb-0 font-weight-bolder text__head--item">Ánh sáng</h4>
                <div className="badge badge-warning ml-4">%</div>
              </CardHeader>
              <CardBody className=" border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color={this.props.data.L1 === undefined ? "#7c7c80" : "green"} />
                      L1
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertL(this.props.data.L1)}>{this.props.data.L1}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <TrendingUp className="feather-md text-primary mb-1 mr-1" color={this.props.data.L2 === undefined ? "#7c7c80" : "green"} />
                      L2
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertL(this.props.data.L2)} >{this.props.data.L2}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader className="border border-primary px-2 !important">

                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/1150/1150447.svg" width={50} height={50} />
                </div>
                <h4 className="card-title mb-0 font-weight-bolder text__head--item">PH </h4>
              </CardHeader>
              <CardBody className="border border-primary" >
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-1" color={this.props.data.PH1 === undefined ? "#7c7c80" : "green"} />PH1
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertPH(this.props.data.PH1)}>{this.props.data.PH1}</h4>
                  </Media>
                </Media>
                <Media>
                  <Media className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-1" color={this.props.data.PH2 === undefined ? "#7c7c80" : "green"}  />PH2
                    </h4>
                  </Media>
                  <Media body>
                    <h4 className={this.ConvertPH(this.props.data.PH2)}>{this.props.data.PH2}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          <Col sm="3">
            <Card className="flex-fill ">
              <CardHeader className="border border-primary px-2 !important">
                <div className="float-right">
                  <img src="https://www.flaticon.com/premium-icon/icons/svg/2096/2096087.svg" width={50} height={50} />
                </div>
                <h4 className="card-title mb-0 font-weight-bolder text__head--item">Nhiệt độ</h4>
                <div className="badge badge-primary text-center ml-2">℃</div>
              </CardHeader>
              <CardBody className="border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-1" color={this.props.data.T1 === undefined ? "#7c7c80" : "green"}   />
                      T1
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertT(this.props.data.T1)}>{this.props.data.T1}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-1" color={this.props.data.T2 === undefined ? "#7c7c80" : "green"} />
                      T2
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertT(this.props.data.T2)}>{this.props.data.T2}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill card--border">
              <CardHeader className="border border-primary px-2 !important">

                <div className="float-right">
                  <img src="https://image.flaticon.com/icons/svg/1779/1779817.svg " width={50} height={50} />
                </div>
                <h4 className="card-title mb-0 font-weight-bolder text__head--item">Độ ẩm</h4>
                <div className="badge badge-success ml-4">%</div>
              </CardHeader>
              <CardBody className="border border-primary">
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light 1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color={this.props.data.H1 === undefined ? "#7c7c80" : "green"} />
                      H1
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertHum(this.props.data.H2)}>{this.props.data.H1}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-1">
                    <h4 className="font-weight-light 1">
                      <Zap className="feather-md text-primary mb-1 mr-1" color={this.props.data.H2
                         === undefined ? "#7c7c80" : "green"}  />
                        H2
                    </h4>
                  </div>
                  <Media body>
                    <h4 className={this.ConvertHum(this.props.data.H2)}>{this.props.data.H2}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          
          <Col>
            <Card className="flex-fill ">
              <CardHeader className=" border border-primary px-2 !important">
                <div className="float-right">
                  <img src="http://home.bt.com/images/parrot-h2o-141827376937402601" width={50} height={50} />
                </div>
                <h4 className="card-title mb-0 font-weight-bolder text__head--item">Độ ẩm đất</h4>
                <div className="badge badge-success ml-4">%</div>
              </CardHeader>
              <CardBody className=" border border-primary">
               <Row>
                 <Col xs="6" sm="6" md="3">
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM1
                         === undefined ? "#7c7c80" : "green"}  />
                        SM1
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM1)}>{this.props.data.SM1}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM2
                         === undefined ? "#7c7c80" : "green"} />
                        SM2
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM2)}>{this.props.data.SM2}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM3
                         === undefined ? "#7c7c80" : "green"} />
                        SM3
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM3)}>{this.props.data.SM3}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM4
                         === undefined ? "#7c7c80" : "green"} />
                        SM4
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM4)}>{this.props.data.SM4}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM5
                         === undefined ? "#7c7c80" : "green"} />
                        SM5
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM5)}>{this.props.data.SM5}</h4>
                    </Media>
                  </Media>
                
                 </Col>
                 <Col xs="6" sm="6" md="3">
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM6
                         === undefined ? "#7c7c80" : "green"} />
                        SM6
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM6)}>{this.props.data.SM6}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM7
                         === undefined ? "#7c7c80" : "green"} />
                        SM7
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM7)}>{this.props.data.SM7}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM8
                         === undefined ? "#7c7c80" : "green"} />
                        SM8
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM8)}>{this.props.data.SM8}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM9
                         === undefined ? "#7c7c80" : "green"} />
                        SM9
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM9)}>{this.props.data.SM9}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM10
                         === undefined ? "#7c7c80" : "green"} />
                        SM10
                      </h4>
                    </div>
                    <Media body>
                    <h4 className={this.ConvertSM(this.props.data.SM10)}>{this.props.data.SM10}</h4>
                    </Media>
                  </Media>
                
                 </Col>
                 <Col xs="6" sm="6" md="3">
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM11
                         === undefined ? "#7c7c80" : "green"} />
                        SM11
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM11)}>{this.props.data.SM11}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM12
                         === undefined ? "#7c7c80" : "green"} />
                        SM12
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM12)}>{this.props.data.SM12}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM13
                         === undefined ? "#7c7c80" : "green"} />
                        SM13
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM13)}>{this.props.data.SM13}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM14
                         === undefined ? "#7c7c80" : "green"} />
                        SM14
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM14)}>{this.props.data.SM14}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM15
                         === undefined ? "#7c7c80" : "green"} />
                        SM15
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM15)}>{this.props.data.SM15}</h4>
                    </Media>
                  </Media>
                
                 </Col>
                 <Col xs="6" sm="6" md="3">
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM16
                         === undefined ? "#7c7c80" : "green"} />
                        SM16
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM16)}>{this.props.data.SM16}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM17
                         === undefined ? "#7c7c80" : "green"} />
                        SM17
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM17)}>{this.props.data.SM17}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM18
                         === undefined ? "#7c7c80" : "green"} />
                        SM18
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM18)}>{this.props.data.SM18}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM19
                         === undefined ? "#7c7c80" : "green"} />
                        SM19
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM19)}>{this.props.data.SM19}</h4>
                    </Media>
                  </Media>
                  <Media>
                    <div className="d-inline-block mr-1">
                      <h4 className="font-weight-light 1">
                        <Slack className="feather-md  mb-1 mr-1" color={this.props.data.SM20
                         === undefined ? "#7c7c80" : "green"} />
                        SM20
                      </h4>
                    </div>
                    <Media body>
                      <h4 className={this.ConvertSM(this.props.data.SM20)}>{this.props.data.SM20}</h4>
                    </Media>
                  </Media>
                 </Col>
               </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Statistics;
