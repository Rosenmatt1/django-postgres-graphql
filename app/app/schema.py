import graphene
import graphql_jwt
import pokemon.schema
import users.schema
import cards.schema


class Query(cards.schema.Query, users.schema.Query, pokemon.schema.Query, graphene.ObjectType):
    pass


#token_auth will give us JSON web token if credentials are correct
#veryify_token verifies web token from token auth
class Mutation(cards.schema.Mutation, users.schema.Mutation, pokemon.schema.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()   
    verify_token = graphql_jwt.Verify.Field()  
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)