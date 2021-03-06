import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './styles.module.scss';
import { Client } from '../../utils/prismicHelpers';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Post = {
    slug: number;
    title: string;
    excerpt: string;
    updatedAt: string;
}

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>

        <main className={styles.container}>
            <div className={styles.posts}>
            {posts.map(post => (
                <Link href={`/posts/preview/${post.slug}`} key={post.slug}>
                    <a id={`${post.slug}`}>
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </a>
                </Link>
            ))}
            </div>
        </main>
        </>
    );
}

export const getStaticProps = async () => {

    const response = await Client().query([
        Prismic.predicates.at('document.type', 'post')
    ], {
        fetch: ['post.title', 'post.content'],
        pageSize: 100
    });
    console.log(JSON.stringify(response, null, 2));

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            //title: post.data.title[0].text,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            })
        }
    })
    return {
        props: {
            posts
        }
    }
}