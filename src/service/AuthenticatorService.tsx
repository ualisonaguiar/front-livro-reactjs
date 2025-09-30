import api from "./api";

class AuthenticatorService {

    private TOKEN_KEY = "@airbnb-Token";

    private contexto: string = 'auth';

    async login(email: string, senha: string) {
        return api.post(`${this.contexto}/login`, {
            'email': email,
            'password': senha
        });
    }

    async fazerLogin(email: string, senha: string) {
        try {
            const response = await this.login(email, senha);
            this.setToken(response.data.access_token);
            return response;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    async profile() {
        return api.get(`${this.contexto}/profile`, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
                'Content-Type': 'application/json'
            }
        });
    }

    async logoff() {
        return api.get(`${this.contexto}/logout`, {
            headers: {
                'Authorization': 'Bearer ' + this.getToken(),
                'Content-Type': 'application/json'
            }
        });
    }

    async fazerLogoff() {
        try {
            const response = await this.logoff();
            localStorage.removeItem('token');
            return response;
        } catch (error) {
            console.error('Erro ao fazer logoff:', error);
            throw error;
        }
    }

    public setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}

export default new AuthenticatorService();