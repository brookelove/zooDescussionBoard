const typeDefs = `
type Auth {
    token: ID!
    user: User
}

type Animal{
    _id: ID
    name:String
    species:String
    family:String
    zooName: Zoo
    weight:Integer
    diet[String]
    reproduction:Boolean
    partner:Animal
    offspring:[Animal]
    medicalNeeds:[String]

}
type Discussion{
    _id: ID
    username: Keeper
    createdAt: Date
    media:String
    comments:[Comment]
    tags:[Tag]
}
type Keeper{
    _id: ID
    name:String
    email:String
    password:String
    friends:[Keeper]
}
type Tag{
    _id: ID
    tagName:String
    backgroundColor:String
    color:String
    createdAt:Date
}
}
type Zoo{
    _id: ID
    name: String
    location: String
    keepers: [Keepers]
    animals: [Animals]

    type Query {
        animals: [Animal!]!
        animal(name: String!): Animal
        keepers: [Keeper!]!
        keeper(username: String!): Keeper
        me: Keeper
        discussions(username: String): [Discussion!]!
        discussion(discussionId: ID!): Discussion
        tags: [Tag!]!
        tag(name: String!): Tag
        zoos: [Zoo!]!
        zoo(name: String!): Zoo
      }
      
      type Mutation {
        addAnimal(...): Animal
        updateAnimal(...): Animal
        deleteAnimal(animalId: ID!): Animal
        addKeeper(...): Keeper
        login(email: String!, password: String!): Keeper
        addDiscussion(discussionText: String!): Discussion
        addComment(discussionId: ID!, commentText: String!): Discussion
        removeDiscussion(discussionId: ID!): Discussion
        removeComment(discussionId: ID!, commentId: ID!): Discussion
        addTag(...): Tag
        addZoo(...): Zoo
        removeZoo(zooId: ID!): Zoo
      }
      
      schema {
        query: Query
        mutation: Mutation
      }
`;

export default typeDefs;
