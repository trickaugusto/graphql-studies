import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Tweet from "../schemas/Tweet";
import MongoTweet from "../database/schemas/Tweet";

@Resolver(Tweet)
export default class TweetController {
    
    @Query(returns => [Tweet], { name: 'tweets' })
    async find() {
        const tweets = await MongoTweet.find();
        return tweets;
    }

    @Mutation(returns => Tweet, { name: 'createTweets' })
    async create(
        @Arg("author") author: string,
        @Arg("description") description: string
    ) {
        const tweets = await MongoTweet.create({ author, description, likes: 0})

        return tweets;
    }
}