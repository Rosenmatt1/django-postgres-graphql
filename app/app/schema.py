import graphene
import pokemon.schema
import users.schema

class Query(users.schema.Query, pokemon.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, pokemon.schema.Mutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
