import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Tweet from "../schemas/Tweet";
import MongoTweet from "../database/schemas/Tweet";

@Resolver(Tweet)
export default class TweetController {
  @Query((returns) => [Tweet], { name: "tweets" })
  async find() {
    const tweets = await MongoTweet.find();
    return tweets;
  }

  @Query((returns) => Tweet, { name: "tweet" })
  async findById(@Arg("id") id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error("Tweet doenst exist");
    }

    return tweet;
  }

  @Mutation((returns) => Tweet, { name: "createTweets" })
  async create(
    @Arg("author") author: string,
    @Arg("description") description: string
  ) {
    const tweets = await MongoTweet.create({ author, description, likes: 0 });

    return tweets;
  }

  @Mutation((returns) => Tweet)
  async upvoteTweet(@Arg("id") id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error("Tweet doesnt exists");
    }

    tweet.set({ likes: tweet?.likes + 1 });
    await tweet.save();

    return tweet;
  }

  @Mutation((returns) => Tweet)
  async downvoteTweet(@Arg("id") id: string) {
    const tweet = await MongoTweet.findById(id);

    if (!tweet) {
      throw new Error("Tweet doesnt exists");
    }

    tweet.set({ likes: tweet?.likes - 1 });
    await tweet.save();

    return tweet;
  }

  @Mutation((returns) => Tweet)
  async updateTweet(
    @Arg("id") id: string,
    @Arg("author") author: string,
    @Arg("description") description: string
    ) {
    const tweet = await MongoTweet.findByIdAndUpdate(id, {author, description}, { new: true}); // if doesn exist, create

    return tweet;
  }
}