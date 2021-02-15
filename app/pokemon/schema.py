import graphene
from graphene_django import DjangoObjectType

from .models import Pokemon

class PokemonType(DjangoObjectType):
    class Meta:
        model = Pokemon

class Query(graphene.ObjectType):
    pokemon = graphene.List(PokemonType)

    def resolve_pokemon(self, info):
        return Pokemon.objects.all()
