import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Button from 'react-bootstrap/Button';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { Panel } from 'rsuite';


function GridCards({ props, gendersData, sneakersData, count }) {

    const [query, setQuery] = useState("")
    const [cart, setCart] = useState([])
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    useEffect(() => {
        localStorage.removeItem('itemsproduct');
        localStorage.setItem('itemsproduct', JSON.stringify(cart));
    });
    const Product = (param) => {
        if (cart.includes(param)){
            const filtredData = cart.filter(item => item !== param);
            setCart(filtredData)
        }else{
            setCart([...cart, param])

        }
        
    };

    

    return (
        <div className="GridCards container mb-3">
            <br />
            <br />
            <Form.Group controlId="formBasicEmail">
                <div className="input-with-icon-left">
                    <Form.Control as="input" placeholder="Buscar Sneakers" onChange={event => setQuery(event.target.value)} style={{ textAlign: 'center' }}></Form.Control>
                </div>
            </Form.Group>


            {
                gendersData.map((postg, index) => (

                    <Panel id={index} header={postg.gender} bordered>

                        <Carousel
                            swipeable={false}
                            draggable={false}
                            responsive={responsive}
                            infinite={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .2"
                            transitionDuration={100}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style">



                            {
                                sneakersData.filter(post => {
                                    if (query === '') {
                                        return post;
                                    } else if (post.marca.toLowerCase().includes(query.toLowerCase())) {
                                        return post;
                                    }
                                    else if (post.marca.toUpperCase().includes(query.toUpperCase())) {
                                        return post;
                                    }
                                }).map((post, index) => {

                                    if (postg.gender === post.genero) {
                                        return (
                                            <div className='p-2' id={index} >
                                                <Card key={post._id}>
                                                    <Card.Img variant="top" src={post.img} style={{ height: "13rem" }} />
                                                    <Card.Header><Card.Title style={{ height: "1rem" }} >{post.marca}</Card.Title></Card.Header>
                                                    <Card.Body>
                                                        <Card.Text style={{ height: "5rem" }} >
                                                            {post.descripcion}
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Precio: ${post.precio}
                                                            <br />
                                                            Talla: {post.talla}
                                                            <br />
                                                            Genero: {post.genero}
                                                        </Card.Text>
                                                        <Button variant="primary" onClick={() => Product(post._id)} >
                                                            {cart.includes(post._id)
                                                                ? <BsFillTrashFill />
                                                                : <MdOutlineAddShoppingCart />
                                                            }
                                                        </Button>
                                                    </Card.Body>
                                                    <Card.Footer className="text-muted">Existencia:{post.cantidad}</Card.Footer>
                                                </Card>


                                            </div>)

                                    }
                                })
                            }

                        </Carousel>

                    </Panel>



                ))

            }




        </div>
    );
}

export default GridCards;
