import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

interface HeaderProps {
    onOpenNewTransaction: () => void;
}

export function Header({ onOpenNewTransaction } : HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money"/>
                <button type="button" onClick={onOpenNewTransaction}>
                    Nova Transação
                </button>
            </Content>
        </Container>
    );
}