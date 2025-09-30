import { createContext, useState, useEffect } from "react";
import AuthenticatorService from "../../service/AuthenticatorService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        AuthenticatorService.profile()
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email: string, senha: string) => {
        await AuthenticatorService.fazerLogin(email, senha);
        const profile = await AuthenticatorService.profile();
        setUser(profile.data);

        toast.success("Login realizado com sucesso!");
        navigate("/");
    };

    const logout = async () => {
        try {
            await AuthenticatorService.fazerLogoff();
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
