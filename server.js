const express = require('express')
const {graphqlHTTP} = require("express-graphql")
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');
const { GraphQLJSONObject} = require('graphql-type-json')
const app = express()

// The recipes
const recipes = [
    {
        id: 1,
        title: "Green Eggs and Ham",
        shortDescription: "This dish is not made from fish.",
        image: "http://www.fakeurl.com",
        videoLink: "http://www.youtube.com",
        longDescription: "This dish is not made from fish. So you might like this dish if you ain't into fish.",
        cuisine: "American",
        ingredients: [
            "1 Cup flour",
            "15 eggs",
            "0 fish",
            "1 can motor oil"
        ],
        recipe: [
            {
                title: "Preparation",
                steps: [
                    "Combine all ingredients."
                ]
            },
            {
                title: "Cooking",
                steps: [
                    "Throw them in the garbage",
                    "Order takeout",
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Crêpes",
        shortDescription: "Sweet or savoury, these easy crêpes are sure to impress.",
        image: "http://www.chadcromwell.com/img/crepes1.jpg",
        videoLink: "http://www.youtube.com/cookingwithcromwell/crepes",
        longDescription: "Nothing beats the sweet scent of fresh crêpes in the air on a lazy Saturday morning. A lot " +
            "of people find the thought of making crêpes intimidating because they feel they don't have the right " +
            "equipment or necessary skills to make them. However, nothing could be farther from the truth! I say " +
            "Crêpes are easy and delicious. If you can make pancakes, you can definitely make crêpes. Fill these " +
            "sweet crêpes with some raspberry coulis & sweet cream cheese, Nutella, peanut butter, bananas, or " +
            "whatever you desire! This is definitely a recipe you're going to want to add into your regular rotation.",
        cuisine: "French",
        ingredients: [
            "4 eggs (room temperature)",
            "3 Tablespoons sugar",
            "2 Tablespoons melted butter (room temperature)",
            "1 1/3 Cups milk",
            "1 Tablespoon vanilla extract",
            "1/2 teaspoon salt",
            "1 Cup flour",
        ],
        recipe: [
            {
                title: "Preparation",
                steps: [
                    "Add a little butter to your skillet.",
                    "Heat your skillet on medium.",
                    "Whisk eggs and sugar in a large mixing bowl.",
                    "Whisk in butter.",
                    "Add milk, vanilla extract, and salt.",
                    "Mix well.",
                    "Lightly whisk in flour until it is just combined.",
                    ]
            },
            {
                title: "Cooking",
                steps: [
                    "Ladle just enough batter to cover the skillet. You'll want the crêpe to be about 5mm to 1cm " +
                    "thick, usually about 3 or 4 tablespoons.",
                    "Cook for about 45 seconds or until the top is wet but no longer runny.",
                    "Using a silicone spatula, gently separate the edges of the crêpe from the pan and then flip the " +
                    "crêpe. It's okay if it gets a little bunched up, you can always flatten it out once you flip " +
                    "it. If you make a hole, don't worry about it! It will likely not be noticeable once you fold " +
                    "your crêpes in the end.",
                    "Cook for another 45 seconds",
                    "Using a silicone spatula, remove the crêpe from the skillet and stack the crêpes together on a " +
                    "plate."
                ]
            },
            {
                title: "Assembling",
                steps: [
                    "Lay out one crêpe",
                    "Spread your favourite fillings across half of the crêpe",
                    "Add your favourite toppings on the filling",
                    "Fold the crêpe in half",
                    "Fold the crêpe in two thirds",
                    "Fold the crêpe in half again",
                    "You should now have a nice triangle shape",
                    "Dust with icing sugar or top with real maple syrup",
                    "Enjoy"
                ]
            }
        ]
    }
]

// Recipe Type
const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    description: 'A recipe',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        shortDescription: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        videoLink: { type: GraphQLNonNull(GraphQLString) },
        longDescription: { type: GraphQLNonNull(GraphQLString) },
        cuisine: { type: GraphQLNonNull(GraphQLString) },
        ingredients: { type: GraphQLList(GraphQLString) },
        recipe: { type: GraphQLList(GraphQLJSONObject) },
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