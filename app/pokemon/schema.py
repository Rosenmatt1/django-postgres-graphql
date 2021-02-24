import graphene
from graphene_django import DjangoObjectType

from .models import Pokemon, LikedPokemon
from users.schema import UserType

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


class UpdatePokemon(graphene.Mutation):
    pokemon = graphene.Field(PokemonType)

    class Arugments:
        pokemon_id = graphene.Int(required=True)
        name = graphene.String()
        abilities = graphene.String()
        power_level = graphene.Int()

    def mutate(self, info, pokemon_id, name, abilities, power_level):
        user = info.context.user
        # print("User!!!!!!", user)
        pokemon = Pokemon.objects.get(id=pokemon_id)

        if pokemon.posted_by != user:
            raise Exception('Not permitted to update Pokemon')

        pokemon.name = name
        pokemon.abilities = abilities
        pokemon.power_level = power_level
        pokemon.save()
        return UpdatePokemon(pokemon=pokemon)


class DeletePokemon(graphene.Mutation):
    pokemon_id = graphene.Int()

    class Arguments:
        pokemon_id = graphene.Int(required=True)

    def mutate(self, info, pokemon_id):
        user = info.context.user
        pokemon = Pokemon.objects.get(id=pokemon_id)

        if pokemon.posted_by != user:
            raise Exception('Not permitted to delete this track')

        pokemon.delete()
        return DeletePokemon(pokemon_id=pokemon_id)


class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    pokemon = graphene.Field(PokemonType)

    class Arguments:
        pokemon_id = graphene.Int(required=True)

    def mutate(self, info, pokemon_id):
        user = info.context.user
        pokemon = Pokemon.objects.get(id=pokemon_id)

        if user.is_anonymous:
            raise Exception('Log in to like a pokemon')
    
        if not pokemon:
            raise Exception('Cannot not find pokemon with given pokemon id')

        LikedPokemon.objects.create(
        user=user,
        pokemon=pokemon
        )

        return CreateLike(user=user, pokemon=pokemon)


class Mutation(graphene.ObjectType):
    create_pokemon = CreatePokemon.Field()
    update_pokemon = UpdatePokemon.Field()
    delete_pokemon = DeletePokemon.Field()
    create_like = CreateLike.Field()

    