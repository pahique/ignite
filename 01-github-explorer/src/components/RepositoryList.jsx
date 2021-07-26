import { RepositoryItem } from "./RepositoryItem";

const repository = {
    name: 'repo1',
    description: 'Meu repositório',
    link: 'https://github.com/pahique/ignite'
}

export function RepositoryList() {
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>

            <ul>
                <RepositoryItem repository={repository}/>
                <RepositoryItem repository={repository}/>
                <RepositoryItem repository={repository}/>
            </ul>

        </section>
    )
}