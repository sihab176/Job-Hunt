import { MongoClient, ServerApiVersion } from "mongodb";

let client;

export default async function dbConnect(collectionName) {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  }
  return client.db("JobHunt").collection(collectionName);
}
