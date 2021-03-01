import React, { useState, useEffect } from 'react';
import '../App.css';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const Test = () => {
    <div>
    <Query query={GET_POKEMON_QUERY} >
        {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>
            if (error) return <div>Error</div>

            return <div>{JSON.stringify(data)}</div>

        }}
    </Query>
    </div>
}


const GET_POKEMON_QUERY = gql`
    {
        pokemon {
            id 
            name
            abilities 
            power_level
        }
    }
`

export default Test;