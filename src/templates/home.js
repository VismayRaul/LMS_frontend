import axios from "axios";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from "react-bootstrap";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState([]);

    axios.get('http://localhost:8000/books')
    .then((res)=>{
        setBooks(res.data)
    })
    .catch((error)=>{
        setError(error)
    })

    return(
        <Container>
            <Row xs={1} md={2}>
                {
                    books.map((data,index)=>{
                        return(
                            <Col className="mt-5">
                                <Card>
                                    <Card.Body>
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Text>
                                        {data.description}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default Home;