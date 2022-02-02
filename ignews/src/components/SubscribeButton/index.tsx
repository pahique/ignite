import { signin, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubmitButtonProps {
    priceId: string;
}

// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubmitButtonProps) {
    const [ session ] = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        if (!session) {
            signin('github');
            return;
        }

        if (session.activeSubscripton) {
            router.push('/posts');
            return;
        }
        // criação da checkout session (stripe)
        try {
            const response = await api.post('/subscribe');
            const { sessionId } = response.data; 
            const stripe = await getStripeJs();
            await stripe.redirectToCheckout({ sessionId });
        } catch(error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}