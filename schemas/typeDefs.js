const typeDefs = `
type Auth {
    token: ID!
    keeper: Keeper
}

type Animal{
    _id: ID
    name: String
    species: String
    family: String
    zooName: Zoo
    weight: Float
    diet: [String]
    reproduction: Boolean
    partner: Animal
    offspring: [Animal]
    medicalNeeds: [MedicalNeeds]
    discussions: [Discussion]
}

type Discussion{
    _id: ID
    createdAt: String
    media: String
    comments: [String]
    tags: [Tag]
}

type Keeper{
    _id: ID
    name: String
    email: String
    password: String
    friends: [Keeper]
}

type MedicalNeeds {
    _id: ID!
    type: String!
    details: String
}

type Tag{
    _id: ID
    tagName: String
    backgroundColor: String
    color: String
    createdAt: String
}

type Zoo{
    _id: ID
    name: String
    location: String
    keepers: [Keeper]
    animals: [Animal]
}
type Query {
        animals: [Animal!]!
        animal(name: String!): Animal
        keepers: [Keeper!]!
        keeper(username: String!): Keeper
        me: Keeper
        discussions(username: String): [Discussion!]!
        discussion(discussionId: ID!): Discussion
        medicalNeeds: [MedicalNeeds!]!
        medicalNeed(_id: ID!): MedicalNeeds
        tags: [Tag!]!
        tag(name: String!): Tag
        zoos: [Zoo!]!
        zoo(name: String!): Zoo
}
      
type Mutation {
        addAnimal(name: String!): Animal
        updateAnimal(name: String!): Animal
        deleteAnimal(animalId: ID!): Animal
        addKeeper(name: String!): Keeper
        login(email: String!, password: String!): Keeper
        addDiscussion(discussionText: String!): Discussion
        addComment(discussionId: ID!, commentText: String!): Discussion
        removeDiscussion(discussionId: ID!): Discussion
        removeComment(discussionId: ID!, commentId: ID!): Discussion
        addMedicalNeed(type: String!, details: String): MedicalNeeds
        updateMedicalNeed(_id: ID!, type: String!, details: String): MedicalNeeds
        deleteMedicalNeed(_id: ID!): MedicalNeeds
        addTag(name: String!): Tag
        addZoo(name: String!): Zoo
        removeZoo(zooId: ID!): Zoo
}
      
      schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
