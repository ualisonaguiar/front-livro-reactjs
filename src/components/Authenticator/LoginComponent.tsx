import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, senha);
        } catch (err) {
            if (err.response?.data?.error)
                toast.error(err.response.data.error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "22rem" }}>
                <h3 className="text-center mb-3">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="seu@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <Button type="submit" variant="primary">Entrar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
