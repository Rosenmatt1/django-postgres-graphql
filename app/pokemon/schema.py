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
        user = info.context.user

        if user.is_anonymous:
            raise Exception('Log in to add Pokemon')

        pokemon = Pokemon(name=name, abilities=abilities, power_level=power_level, posted_by=user)
        pokemon.save()
        return CreatePokemon(pokemon=pokemon)


class Mutation(graphene.ObjectType):
    create_pokemon = CreatePokemon.Field()