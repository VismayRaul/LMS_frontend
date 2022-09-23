import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container, Button } from "react-bootstrap";


import Form from 'react-bootstrap/Form';
import axios from 'axios';


const AddBook = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(null);

    useEffect(()=>{
        refreshBooks();
    }, []);

    const refreshBooks = ()=>{
        axios.get('http://127.0.0.1:8000/books')
           .then((res)=>{
            setBooks(res.data);
           })
           .catch(console.error);
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        let book = { name, description, author};
        // console.log(item)
        axios.post('http://127.0.0.1:8000/books', book)
            .then(()=> refreshBooks())
    };

    const onDelete = (id) =>{
            // console.log(id)
        axios.delete(`http://127.0.0.1:8000/books/${id}`)
            .then(()=>refreshBooks())
    };

    const onUpdate = (id) => {
        let book = { id };
        axios.put(`http://127.0.0.1:8000/books/${id}`,book)
            .then(()=>refreshBooks())
    };

    function selectedBook(id){
        let book = books.filter((data)=>data.id === id)[0];
        setName(book.name);
        setDescription(book.description);
        setAuthor(book.author);
        setBookId(book.id);
    }
    return(
        <Container className="mx-5">
            <Row className="mt-5">
                <Col>
                    <h3>Add Book Here</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group 
                            className="mb-3" 
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Control 
                                type="text" 
                                placeholder="Book Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group 
                            className="mb-3" 
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control 
                                as="textarea" 
                                placeholder="Discription" 
                                rows={3} 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group 
                            className="mb-3" 
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Control 
                                type="number" 
                                placeholder="Author" 
                                value={author} 
                                onChange={(e) => setAuthor(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onSubmit} className="me-2">
                            Add
                        </Button>
                        <Button variant="primary" type="submit" onClick={onUpdate(bookId)}>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col xs={9} className="ms=5">
                    <Row xs={1} md={2}>
                        {books.map((data,index) => {
                                return(
                                    <Col className="my-3"> 
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{data.name}</Card.Title>
                                                <Card.Text>
                                                    {data.description}
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>onDelete(data.id)} className="me-2">
                                                    delete                                            
                                                </Button>
                                                <Button variant="primary" onClick={()=> selectedBook(data.id)}>
                                                    edit
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AddBook;