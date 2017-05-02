import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
// graphql = HOC
// ApolloProvider = make an instance of Apollo Client available to the component
import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';
// graphql-tools = create a mock network interface for Apollo Client

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
  networkInterface: mockNetworkInterface
});

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return (
      <p>Loading ...</p>
    )
  }

  if (error) {
    return (
      <p>{error.message}</p>
    )
  }

  return (
    <ul className="Item-list">
      { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
    </ul>
  )
};

const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
