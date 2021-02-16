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


class CreatePokemon(graphene.Mutation):
    pokemon = graphene.Field(PokemonType)

    class Arguments:
        name = graphene.String()
        abilities = graphene.String()
        power_level = graphene.Int()

    def mutate(self, info, name, abilities, power_level):
        pokemon = Pokemon(name=name, abilities=abilities, power_level=power_level)
        pokemon.save()
        return CreatePokemon(pokemon=pokemon)


class Mutation(graphene.ObjectType):
    create_pokemon = CreatePokemon.Field()