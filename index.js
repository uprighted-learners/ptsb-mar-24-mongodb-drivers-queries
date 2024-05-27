// Imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

// Setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let client = new MongoClient("mongodb://localhost:27017/");

// Function to connect to mongo, db, and collection
async function dbConnect() {
    await client.connect();
    let db = await client.db("test");
    let collection = await db.collection("users");

    return collection;
}

// Template for running queries
async function runQuery() {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");

    // INSERT QUERY HERE
    
    await client.close();
}

app.get("/", (req, res) => {
    res.json("Found / route");
});

// GET route: Get all Documents
app.get("/getAllDocuments", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");

    let responseResults = [];
    // INSERT QUERY HERE
    const results = await collection.find({})

    for await (const doc of results) {
        responseResults.push(doc);
    }
    
    await client.close();

    res.json(responseResults);
});

// GET route: Get first document with property "item" of "planner"
app.get("/getSingleDocument", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");

    // INSERT QUERY HERE
    const result = await collection.findOne({item:"planner"})
    console.log(result)
    
    await client.close();
    res.json(result)
});

// GET route: Get documents with the property "status" of value "D"
app.get("/getByStatus", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");

    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find( { status: "D" } )
    for await (const doc of results) {
        responseResults.push(doc);
    }
    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with properties "status" = "D" and "item" = "planner"
app.get("/getByStatusAndItem", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");

    let responseResults = [];

    // INSERT QUERY HERE
    const results = collection.find( { status: "D", item: "planner" } )
    for await (const doc of results) {
        responseResults.push(doc);
    }
    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with property "item" = "planner" OR "item" = "notebook"
app.get("/getDocumentsWithOr", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find(
        { $or: [
                { item: "planner" },
                { item: "notebook" }
               ]
        }
      )
      for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with property "status" = "A" OR "item" = "notebook"
app.get("/getDocumentsWithStatusOrItem", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find(
        { $or: [
                { status: "A" },
                { item: "notebook" }
               ]
        }
      )
      for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with property "status" = "A" OR "qty" with value less than 30
app.get("/getDocumentsWithRanges", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find( { status: "A", qty: { $lt: 30 } } )
    
    for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with a property "item" with a value that falls in "journal", "notebook", "paper"
app.get("/getDocumentsWithIn", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find( { item: { $in: ["journal", "notebook", "paper"] } } )
    
    for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
})

// GET route: Get documents with "status" property = "A" and size.h = 14, size.w = 21, size.uom = "cm"
app.get("/getDocumentsNested", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find({ status: "A", size: { h: 14, w: 21, uom: "cm" } })
    
    for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with property "size.h" with value greater than 10 and less than 100
app.get("/getDocumentsNestedRangeQueries", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find({ "size.h":  { $gt: 10, $lt: 100 } }) 

    for await (const doc of results) {
        responseResults.push(doc);
    }

    
    await client.close();

    res.json(responseResults);
});

// GET route: Get documents with property "status" = "A", or "qty" with value less than 30 and "size.h" property with value greater than 10
app.get("/getDocumentsNestedRangeQueriesOr", async (req, res) => {
    await client.connect();
    const database = await client.db("test");
    const collection = await database.collection("inventory");
    let responseResults = [];

    // INSERT QUERY HERE
    const results = await collection.find( {
        status: "A",
        $or: [
               { qty: { $lt: 30 } },
               { "size.h": { $gt: 10 } }
             ]
       }
    )

    for await (const doc of results) {
        responseResults.push(doc);
    }

    await client.close();
    res.json(responseResults);
});

// GET route: Get all documents from the users collection within the test db
app.get("/userdata", async (req, res) => {
    let userColl = await dbConnect();
    let results = [];

    let userList = await userColl.find({});

    for await (const userObj of userList) {
        results.push(userObj);
    }

    res.json(results);
});

// POST route: Insert one document using information from body into the users collection within the test db
app.post("/create", async (req, res) => {
    let newUser = req.body;
    console.log(newUser)
    let userColl = await dbConnect();
    await userColl.insertOne(newUser);
    client.close();
    // Redirect to GET "/" route stated above
    res.redirect("/");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})