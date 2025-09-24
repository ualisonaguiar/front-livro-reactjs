import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Props {
    urlVoltar: string;
}

const ButtonVoltar = ({ urlVoltar }: Props) => {

    return (
        <>
            <div className="d-flex justify-content-end">
                <Link to={urlVoltar}>
                    <Button type="button" variant="primary">Voltar</Button>
                </Link>
            </div>
        </>
    );
}

export default ButtonVoltar;