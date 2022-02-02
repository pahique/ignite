import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'read:user'
        }),
    ],
    callbacks: {
        async session(session) {
            console.log('session.user.email:', session.user.email);
            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref", 
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user.email)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        ])
                    )
                )
                console.log('User active subscription:', userActiveSubscription);
                return {
                    ...session,
                    activeSubscription: userActiveSubscription,
                }
            } catch (err) {
                console.log('No subscription found!', err);
                return {
                    ...session,
                    activeSubscription: undefined,
                }
            }
        },
        async signIn(user, account, profile) {
            //console.log(user);
            const { email } = user;
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    email
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email }}
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email)
                            )
                        ) 
                    ),
                )
                return true;
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
})