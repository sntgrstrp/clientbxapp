import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getToken } from './TokenService';
import { generateUrl } from './UrlService';
import './MainPage.css';

const MainPage = () => {
  const [monto, setMonto] = useState('');
  const [referencia1, setReferencia1] = useState('');
  const [referencia2, setReferencia2] = useState('');
  const [referencia3, setReferencia3] = useState('');
  const [tokenResult, setTokenResult] = useState('');
  const [urlResult, setUrlResult] = useState('');
  const [modal, setModal] = useState(false);
  const [errorResult, setErrorResult] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const generarTokenYURL = async () => {
    setTokenResult('');
    setUrlResult('');
    setErrorResult('');
    setButtonClicked(true);

    // Validar los campos
    if (!monto || !referencia1 || !username || !password) {
      setErrorResult('Por favor, complete todos los campos.');
      return;
    }

    try {
      // Paso 3 - Generar Token
      const token = await getToken(username, password);
      setTokenResult('Token generado exitosamente.');

      // Paso 4 - Invocar API para conexion con Banca Xpress
      const url = await generateUrl(token, {
        monto,
        referencia1,
        referencia2,
        referencia3,
      });
      setUrlResult(url);
      toggleModal(); // Abre el modal despues de obtener la URL
      window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        if (responseData.data && responseData.data.includes('UserNotFoundException')) {
          setErrorResult('Error: El usuario no existe.');
        } else {
          setErrorResult(`Error ${error.response.status}: ${responseData.message}`);
        }
      } else {
        setErrorResult('Error al invocar la API para conexión con Banca Xpress.');
      }
    }
  };

  return (
    <div className="container mt-5 main-container">
      <section className="d-flex justify-content-between">
        <div className="left-data mt-3 p-3" style={{ width: '100%' }}>
          <h3 className="mb-4">Aliado BX</h3>

          <Form>
            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="username">Usuario</Label>
              <Input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="monto">Monto</Label>
              <Input
                type="number"
                className="form-control"
                id="monto"
                value={monto}
                onChange={(e) => setMonto(parseInt(e.target.value, 10))}
                required
              />
            </FormGroup>

            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="referencia1">Referencia 1</Label>
              <Input
                type="text"
                className="form-control"
                id="referencia1"
                value={referencia1}
                onChange={(e) => setReferencia1(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="referencia2">Referencia 2</Label>
              <Input
                type="text"
                className="form-control"
                id="referencia2"
                value={referencia2}
                onChange={(e) => setReferencia2(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3 col-lg-6-3">
              <Label for="referencia3">Referencia 3</Label>
              <Input
                type="text"
                className="form-control"
                id="referencia3"
                value={referencia3}
                onChange={(e) => setReferencia3(e.target.value)}
              />
            </FormGroup>

            <Button type="button" color="primary" onClick={generarTokenYURL}>
              Solicitar crédito
            </Button>
          </Form>

          {/* Resultados y mensajes de error */}
          <div className="mt-4">
            {buttonClicked && (
              <>
                <h2>Resultados</h2>
                {tokenResult && <div className="alert alert-success">{tokenResult}</div>}
                {urlResult && <div className="alert alert-info">{urlResult}</div>}
                {errorResult && <div className="alert alert-danger">{errorResult}</div>}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modal para mostrar la URL */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>URL generada</ModalHeader>
        <ModalBody>
          <strong>{urlResult}</strong>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MainPage;
