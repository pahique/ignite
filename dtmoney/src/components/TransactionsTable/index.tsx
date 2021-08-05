import { useEffect } from 'react';
import { api } from '../../services/api';
import { Container } from "./styles";

export function TransactionsTable() {
    useEffect(() => {
        api.get("/transactions")
        .then(response => console.log(response.data));
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Desenvolvimento de website</td>
                        <td className="deposit">R$12.000</td>
                        <td>Desenvolvimento</td>
                        <td>01/08/2021</td>
                    </tr>
                    <tr>
                        <td>Aluguel</td>
                        <td className="withdraw">- R$1.000</td>
                        <td>Casa</td>
                        <td>05/08/2021</td>
                    </tr>
                    <tr>
                        <td>Condomínio</td>
                        <td className="withdraw">- R$300</td>
                        <td>Casa</td>
                        <td>10/08/2021</td>
                    </tr>
                    <tr>
                        <td>Empréstimo</td>
                        <td className="deposit">R$10.000</td>
                        <td>Finanças</td>
                        <td>04/08/2021</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}