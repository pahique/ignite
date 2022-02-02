import React, { useEffect } from 'react';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import Link from 'next/link';
import { Client } from '../../../utils/prismicHelpers';
import styles from '../post.module.scss';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session]);

    return (
        <>
        <Head>
            <title>{post.title} | Ignews</title>
        </Head>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className={styles.continueReading}>
                    Wanna continue reading?
                    <Link href="/">
                        <a href="">Subscribe now 🤗</a>
                    </Link>
                </div>
            </article>
        </main>
        </>
    );
}

// Não tem informação de usuário logado
export const getStaticProps: GetStaticProps = async({params}) => {
    const {slug} = params;

    const response = await Client().getByUID('post', String(slug), {});
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }
    return { 
        props: {
            post
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}