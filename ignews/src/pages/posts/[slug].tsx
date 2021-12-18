import React from 'react';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';
import { Client } from '../../utils/prismicHelpers';
import Prismic from '@prismicio/client';

interface PostsProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function Posts({ post }: PostsProps) {
    return (
        <>
        <Head>
            <title>{post.title} | Ignews</title>
        </Head>
        <main>
            <article>
                <h1>{post.title}</h1>
                <time>{post.updatedAt}</time>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </article>
        </main>
        </>
    );
}

export const getServerSideProps = async({req, params}) => {
    const session = getSession({req});
    const {slug} = params;
    // if (!session) {
    // }
    const response = await Client().getByUID('post', String(slug), {});
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
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