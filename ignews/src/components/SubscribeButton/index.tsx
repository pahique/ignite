import styles from './styles.module.scss';

interface SubmitButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubmitButtonProps) {
    return (
        <button
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}