const typeDefs = `
type Auth {
    token: ID!
    user: User
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
    notes: [Notes]
    tags:[Tags]
}
type MedicalNeeds {
    _id: ID!
    type: String!
    details: String!
    needsMedication: Boolean!
    medication:[String!]
    notes :[Notes]
}
type Notes{
    _id: ID
    username:User
    animal:Animal
    createdAt: String
    note: String
    comments: [String]
    tags: [Tags]
}

type Comment {
    _id: ID
    commentText: String
    createdAt: String
    commentAuthor: String
}

type Research {
    _id: ID
    name:User
    beginning_date: String
    ending_date: String
    authors: [User]
    animals: [Animal]
    awards: [String!]
}

type User{
    _id: ID
    name: String
    personal_id: String
    photo: String
    role: String
    email: String
    phone_number: String
    zoo_name: Zoo
    research_projects:[Research]
    password: String
    friends: [User]
}

type Tags {
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
    users: [User]
    animals: [Animal]
}
type Query {
    animals: [Animal!]!
    animal(name: String!): Animal
    medicalNeeds: [MedicalNeeds!]!
    medicalNeed(_id: ID!): MedicalNeeds
    notes(username: String): [Notes!]!
    note(noteId: ID!): Notes
    researches(username: String): [Research!]!
    research(researchId: ID!): Research
    tags: [Tags!]!
    tag(name: String!): Tags
    users: [User!]!
    user(username: String!): User
    me: User
    zoos: [Zoo!]!
    zoo(name: String!): Zoo
}
      
type Mutation {
    addAnimal(
        name: String!
        species: String!
        family: String!
        zooName: String!
        weight: Float!
        diet: [String]!
        reproduction: Boolean!
        partner: ID
        offspring: [ID]
        medicalNeeds: [ID]
        notes: [ID]
    ): Animal
    updateAnimal(
        _id: ID!
        name: String
        species: String
        family: String
        zooName: String
        weight: Float
        diet: [String]
        reproduction: Boolean
        partner: ID
        offspring: [ID]
        medicalNeeds: [ID]
        notes: [ID]
    ): Animal
    removeAnimal(animalId: ID!): Animal

    addMedicalNeed(type: String!, details: String): MedicalNeeds
    updateMedicalNeed(_id: ID!, type: String!, details: String): MedicalNeeds
    removeMedicalNeed(_id: ID!): MedicalNeeds

    addNote(noteText: String!): Notes
    addComment(noteId: ID!, commentText: String!): Notes
    removeNote(noteId: ID!): Notes
    removeComment(noteId: ID!, commentId: ID!): Notes

    addResearch(title: String!, content: String!): Research
    updateResearch(_id: ID!, title: String, content: String): Research
    removeResearch(researchId: ID!): Research

    addTag(tagName: String!, backgroundColor: String, color: String): Tags

    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addZoo(name: String!, location: String!): Zoo
    updateZoo(_id: ID!, name: String, location: String): Zoo
    removeZoo(zooId: ID!): Zoo
}
      
      schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
