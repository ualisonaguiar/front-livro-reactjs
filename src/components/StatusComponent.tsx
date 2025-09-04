import { toast } from "react-toastify";
import api from "../service/api";

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

    start(): void {
        this.up();

        setInterval(() => this.up(), 30000)
    }

}

export default StatusComponent;