import { toast } from "react-toastify";
import api from "../service/api";
import AuthenticatorService from "../service/AuthenticatorService";

class StatusComponent {

    private up(): void {
        api.get('up').then(
            reponse => {
                console.info("API on-line", reponse.data.status);
            },
            error => {
                toast.error("Error na aplicação");
                console.error(error);
            }
        )
    }

    private usuarioAutenticado(): void {
        AuthenticatorService.profile().then(
            () => {},
            () => toast.warn("Usuário não autenticado")
        );
    }

    start(): void {
        this.up();
        this.usuarioAutenticado();

        setInterval(() => this.up(), 30000)
        setInterval(() => this.usuarioAutenticado(), 300000)
    }

}

export default StatusComponent;