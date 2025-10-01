import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticatorService from "../service/AuthenticatorService";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await AuthenticatorService.profile();
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
                <Row>
                    <Col className="text-center">
                        <Spinner animation="border" role="status" className="mb-2" />
                        <div>Carregando...</div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
