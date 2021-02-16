import graphene
import pokemon.schema

class Query(pokemon.schema.Query, graphene.ObjectType):
    pass

class Mutation(pokemon.schema.Mutation):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
