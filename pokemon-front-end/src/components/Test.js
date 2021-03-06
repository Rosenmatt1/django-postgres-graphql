import React, { useState, useEffect } from 'react';
import '../App.css';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { UserContext } from '../Root';
// import { GET_TRACKS_QUERY } from '../../pages/App';


 

const Test = () => {
    const currentUser = useContext(UserContext);
    console.log("current User from Test", currentUser)
    // const isCurrentUser = currentUser.id === track.postedBy.id

    return (
        <div>

            {/* <Query query={GET_POKEMON_QUERY} >
                {({ data, loading, error }) => {
                    if (loading) return <div>Loading</div>
                    if (error) return <div>Error</div>
                    // console.log(data.pokemon[0].name)

                    return <div>{JSON.stringify(data)}</div>
                }}
            </Query> */}

        </div>
    )
}


const GET_POKEMON_QUERY = gql`
    {
        pokemon {
            id 
            name
            abilities 
            powerLevel
        }
    }
`

export default Test;