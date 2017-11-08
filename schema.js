const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

var customers = [
  { id: '1', name: 'Edwin Moses', email: 'gray3dw1n@gmail.com', age: 22 },
  { id: '2', name: 'Mike Tyson', email: 'workockmoses@gmail.com', age: 28 },
  { id: '3', name: 'Brenda Wangari', email: 'brenda@gmail.com', age: 30 },
  { id: '4', name: 'Nancy Mokeira', email: 'nancy@yahoo.com', age: 40 },
  { id: '5', name: 'Beverly Fartu', email: 'beverly@yahoo.com', age: 30 }
];

var CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

//Root Query
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        for (var i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve (parentValue, args) {
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
