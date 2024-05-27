const { MongoClient, ObjectId } = require("mongodb");

let client = new MongoClient("mongodb://localhost:27017/");

async function seedInventoryCollection() {
    // Connect to mongo
    await client.connect();
    // Connect to database
    const database = await client.db("test");
    // Connect to collection within database
    const collection = await database.collection("inventory");

    // Query for seeding our inventory collection within our db
    await collection.insertMany([
        { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
        { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
        { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
        { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
        { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
    ]);
    
    await client.close();
}

seedInventoryCollection();