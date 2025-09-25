import ButtonAdicionar from "../Buttons/ButtonAdicionar";

export default function VendaListagem() {

    return (
        <>
            <main className="container">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Listagem das Venda</h2>
                    <ButtonAdicionar url="/venda/add" />
                </header>
            </main>
        </>
    );
}