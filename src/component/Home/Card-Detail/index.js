import React from 'react';
import { useNavigate,Link,useParams } from 'react-router-dom';  
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
CardSubtitle, CardBody ,CardLink,Table} from 'reactstrap';
import { DressData } from '../../Dashbord-data';
import styles from './styles.module.scss';    
const CardDetail = () => {
  const navigate = useNavigate();
  const {ShopName} = useParams();
  const myShop = DressData.map(({ShopName,ImgSrc1})=>{
    return(ShopName)
  })
  const exactDress = myShop.indexOf(ShopName);
  const dress = DressData[exactDress];
  console.log(ShopName);
const homeClick = () => {
 navigate("/Dashboard")
}
    return (
        <div className={`{styles.card} container`}>
        <div className="md-2">
      <Card className={styles.widcard}>
        <CardBody>
          <CardTitle><h1>{dress.ShopName}</h1></CardTitle>
        </CardBody>
        <img className={styles.sizeimg} src={dress.ImgSrc1} />
        <CardBody>
          <CardText>{dress.Details}</CardText>
          <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>{dress.id}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Price</td>
            <td>{dress.Price}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Material</td>
            <td>{dress.Material}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Color</td>
            <td>{dress.Colour}</td>
          </tr>
        </tbody>
      </Table>
          <button onClick={homeClick} class="btn btn-primary">Back To Home</button>
          <h6><Link to="/Dashboard">Countinue Shoping with us</Link> </h6>
        </CardBody>
      </Card>
    </div>
    </div>
    )
}

export default CardDetail;
// {styles.cardspacing}
// <div className={styles.bttn}>