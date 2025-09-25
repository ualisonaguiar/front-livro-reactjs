import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    url: string;
}

const ButtonAdicionar = ({ url }: Props) => {

    return (
        <>
            <div className="d-flex justify-content-end">
                <Link to={url}>
                    <Button type="button" variant="success">Adicionar</Button>
                </Link>
            </div>
        </>
    );
}

export default ButtonAdicionar;