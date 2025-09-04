
interface Props {
    message: string;
    key: number;
}

const MessageFormCampo = ({ message }: Props) => {

    return (
        <>
            <p style={{ color: "red" }}>
                {message}
            </p>
        </>
    );
}

export default MessageFormCampo;