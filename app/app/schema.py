import graphene
import pokemon.schema

class Query(pokemon.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
