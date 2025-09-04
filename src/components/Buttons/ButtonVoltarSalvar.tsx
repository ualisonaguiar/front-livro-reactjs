import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    urlVoltar: string;
}

const ButtonVoltarSalvar = ({ urlVoltar }: Props) => {

    return (
        <>
            <div className="d-flex justify-content-end">
                <Link to={urlVoltar}>
                    <Button type="button" variant="primary">Voltar</Button>
                </Link>
                <Button type="submit" variant="success" className="ms-2">Salvar</Button>
            </div>
        </>
    );
}

export default ButtonVoltarSalvar;