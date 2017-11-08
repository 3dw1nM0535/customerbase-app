var axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require('graphql');

/*
var customers = [
  { id: '1', name: 'Edwin Moses', email: 'gray3dw1n@gmail.com', age: 22 },
  { id: '2', name: 'Mike Tyson', email: 'workockmoses@gmail.com', age: 28 },
  { id: '3', name: 'Brenda Wangari', email: 'brenda@gmail.com', age: 30 },
  { id: '4', name: 'Nancy Mokeira', email: 'nancy@yahoo.com', age: 40 },
  { id: '5', name: 'Beverly Fartu', email: 'beverly@yahoo.com', age: 30 }
];
*/

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
        /*
        for (var i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }
        */
        return axios.get('http://localhost:3000/customers/' + args.id).then(
          res => res.data
        );
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve (parentValue, args) {
        return axios.get('http://localhost:3000/customers').then(res => res.data);
      }
    }
  }
});

//Mutations
var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve (parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        }).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
  
});
