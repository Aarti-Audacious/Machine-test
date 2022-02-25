import React from 'react'
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
CardSubtitle, CardBody, Col, Row } from 'reactstrap';
import { useNavigate,Link,useParams } from 'react-router-dom';    
import styles from './styles.module.scss'  ; 
import { DressData } from '../../Dashbord-data';


const Dashboard = () => {
const navigate = useNavigate();
const {ShopName} = useParams();
  const btnClick = () => {
    navigate("/Login");
  }
  
  
  console.log(DressData);
  return (
    
    <div className={`$container mt-3 mr-5 pr-5 pl-5`}>
    <div className={styles.bttn}>
    <button onClick={btnClick} className={`${"btn btn-primary"}`}>Logout</button>
    </div>
    <CardGroup>
    <Row>
    {DressData.map(({ShopName,Details,ImgSrc})=>{
      return (
        <Col sm="4">
        <Card className={`${styles.card}`} >
        <CardImg top width="100%" src={ImgSrc} alt="Card image cap" />
        <CardBody>
          <CardTitle><h2>{ShopName}</h2></CardTitle>
          <CardText>{Details}</CardText>
        <Link to={`/carddetail/${ShopName}`}>  <Button   className="btn btn-info">Button</Button></Link>
        </CardBody>
      </Card>
      </Col>
      )
    })}
    </Row>
    </CardGroup>
  </div>
  )
}

export default Dashboard