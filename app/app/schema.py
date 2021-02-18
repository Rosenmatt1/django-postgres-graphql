import graphene
import pokemon.schema
import users.schema
import graphql_jwt

class Query(users.schema.Query, pokemon.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, pokemon.schema.Mutation):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()   #will give us JSON web token if credentials are correct
    verify_token = graphql_jwt.Verify.Field()   #verifies web token from token auth
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
