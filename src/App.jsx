import { useState } from 'react'
import { Form, Table, Button, Container, Row, Col, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Confetti from 'react-confetti';
import "../node_modules/react-bootstrap";




const App = () => {
  const [shops] = useState([
    { id: 1, name: 'Migros' },
    { id: 2, name: 'Teknosa' },
    { id: 3, name: 'BİM' },
  ]);

  const [categories] = useState([
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Şarküteri' },
    { id: 3, name: 'Oyuncak' },
    { id: 4, name: 'Bakliyat' },
    { id: 5, name: 'Fırın' },
  ]);

  const [productName, setProductName] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      name: productName,
      shop: selectedShop,
      category: selectedCategory,
      isBought: false,
    };
    setProducts([...products, newProduct]);
    setProductName('');
    setSelectedShop('');
    setSelectedCategory('');

    // Form gönderildiğinde konfeti patlat
    setConfetti(true);

   
  };

  const handleBuyClick = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, isBought: true } : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleAlertClose = () => setConfetti(false);

  const isShoppingCompleted = products.every((product) => product.isBought);

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            {/* Ürün ekleme formu */}
            <Form.Group controlId="productName">
              <Form.Label>Ürün Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ürün adını girin"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="selectedShop">
              <Form.Label>Market Seçin</Form.Label>
              <Form.Control
                as="select"
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <option value="" disabled>
                  Market Seçin
                </option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.name}>
                    {shop.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="selectedCategory">
              <Form.Label>Kategori Seçin</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Kategori Seçin
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="success" type="submit" className='my-3 px-5'>
              Ekle
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            {/* Ürün tablosu */}
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Market</th>
                <th>Kategori</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.shop}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button variant="success" onClick={() => handleBuyClick(product.id)}>
                      Satın Alındı
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>
                      Sil
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert show={isShoppingCompleted} variant="success" onClose={handleAlertClose} dismissible>
            Alışveriş Tamamlandı!
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Konfeti */}
          <Confetti active={confetti} config={{ spread: 360 }} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;