const express = require('express')
const {graphqlHTTP} = require("express-graphql")
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const { GraphQLJSONObject} = require('graphql-type-json')
const app = express()

// The recipes
const recipes = [
{
    title: "Green Eggs and Ham",
    shortDescription: "This dish is not made from fish.",
    image: "http://www.fakeurl.com",
    videoLink: "http://www.youtube.com",
    longDescription: "This dish is not made from fish. So you might like this dish if you ain't into fish.",
    ingredients: {
        flour: "1 Cup",
        eggs: "15",
        fish: "0",
        beer: "1 Can"
    },
    recipe: ["Combine all ingredients.", "Throw them in the garbage", "Order takeout"]
}
]

// Recipe Type
const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    description: 'A recipe',
    fields: () => ({
        title: { type: GraphQLNonNull(GraphQLString) },
        shortDescription: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        videoLink: { type: GraphQLNonNull(GraphQLString) },
        longDescription: { type: GraphQLNonNull(GraphQLString) },
        ingredients: { type: GraphQLNonNull(GraphQLJSONObject) },
        recipe: { type: GraphQLList(GraphQLString) },
    })
})

// Where we define all the root queries
const RootQueryType = new GraphQLObjectType({
    name: 'Query', // Name of the object
    description: "Root Query", // Description for UI
    fields: () =>({ // The fields this object returns
        // Recipes
        recipes: {
            type: new GraphQLList(RecipeType), // It returns a message that is a String
            description:'List of all recipes',
            resolve: () => recipes // What the object actually returns
        }
    })
})

// The GraphQL schema
const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5000, () => console.log('running'))