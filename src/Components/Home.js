import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import cart from '../cart.png'

class Home extends Component{
    state = {
        summaries:[ ] ,
     
    }
    componentDidMount = () => {
        axios.get('/orderSummary/')
            .then(res =>{
               console.log(res)
               this.setState({
                summaries:res.data
               })
            })
            
    }
    
   
    render() {
        const { summaries } =this.state;
        const summaryList = summaries.length ? (
            summaries.map(summary =>{
                return (
                                <div className="post card" key={summary.order_id} >
                                <img src={cart} alt="a cart"/>
                                <div className="card-content">
                                <Link to={'/orderSummary/' + summary.order_id}>
                                <div className="card-title">Order Id:  {summary.order_id}</div>
                                </Link>
                                <span className="card-text">Date of Purchase{summary.date_of_purchase}</span>
                                { summary.products.length?(summary.products.map(product=>{
                                        return (
                                            <div>
                                            <div className="card-text">Product name: {product.productName}</div>
                                            <br/>
                                            </div>
                                        )
                                    })) : (<div className="center">No products to show</div>)
                                }
                                { summary.orderConfirmed ?   <button className="waves-effect waves-light btn"><i className="material-icons right">done_all</i> Order Confirmed</button>
                                  :   <a className="waves-effect waves-light btn"><i className="material-icons right">do_not_disturb</i>Order not Confirmed</a>
                
                                    
                                }
                              
                                 
    
                                </div>
                         </div>
                        )
                })
        ): (
            <div className="center">No orders to show</div>
        )
        return (
            <div className="container">
             <h4 className="center">Order History</h4>
             {summaryList}
            </div>

        )          
        }

        
}

export default Home;