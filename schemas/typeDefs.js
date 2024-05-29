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
    parents:[Animal]
    research_projects:[Research]
    zooName: Zoo
    captivity: String
    weight: Float
    diet: [String]
    reproduction: Boolean
    partner: [Animal]
    offspring: [Animal]
    medicalNeeds: [MedicalNeeds]
    notes: [Discussion]
    tags:[Tags]
}

type Notes{
    _id: ID
    username:User
    animal:Animal
    createdAt: Date
    note: String
    comments: [String]
    tags: [Tags]
}
type Research {
    _id: ID
    name:User
    beginning_date:Date
    ending_date:Date
    authors: [User]
    note: String
    animals: [Animal]
    awards: [String]
}

type User{
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

type Tags {
    _id: ID
    tagName: String
    backgroundColor: String
    color: String
    createdAt: Date
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
        addUser(name: String!): User
        login(email: String!, password: String!): User
        addNotes(discussionText: String!): Notes
        addComment(discussionId: ID!, commentText: String!): Notes
        removeDiscussion(discussionId: ID!): Notes
        removeComment(discussionId: ID!, commentId: ID!): Notes
        addMedicalNeed(type: String!, details: String): MedicalNeeds
        updateMedicalNeed(_id: ID!, type: String!, details: String): MedicalNeeds
        deleteMedicalNeed(_id: ID!): MedicalNeeds
        addTag(name: String!): Tags
        addZoo(name: String!): Zoo
        removeZoo(zooId: ID!): Zoo
}
      
      schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
