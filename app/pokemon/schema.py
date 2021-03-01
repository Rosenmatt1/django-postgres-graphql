import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError 

from django.db.models import Q  #allows to make more complex qeueries  
from .models import Pokemon, LikedPokemon, Battle
from users.schema import UserType

class PokemonType(DjangoObjectType):
    class Meta:
        model = Pokemon

class LikeType(DjangoObjectType):
    class Meta:
        model = LikedPokemon

class BattleType(DjangoObjectType):
    class Meta:
        model = Battle

class Query(graphene.ObjectType):
    pokemon = graphene.List(PokemonType, search=graphene.String())
    likes = graphene.List(LikeType)
    battle = graphene.List(BattleType)

    def resolve_pokemon(self, info, search=None):
        # if search:
        #     filter = (
        #         Q(name__icontains=search) |
        #         Q(abilities__icontains=search) |
        #         Q(power_level__icontains=search) |
        #         Q(posted_by__username__icontains=search) #the __ is a way to burrow down into a object like . in JavaScript
        #     )
        #     return Pokemon.objects.filter(filter)  
            #also is starts with exact(case sensitive exact match), iexact(case insensitive exact match), gt(greater than)
            return Pokemon.objects.all()
    
    def resolve_likes(self, info):
        return LikedPokemon.objects.all()
    
    def resolve_battle(self, info):
        return Battle.objects.all()


class CreatePokemon(graphene.Mutation):
    pokemon = graphene.Field(PokemonType)

    class Arguments:
        name = graphene.String()
        abilities = graphene.String()
        power_level = graphene.Int()

    def mutate(self, info, name, abilities, power_level):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('Log in to add Pokemon')

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
            raise GraphQLError('Not permitted to update Pokemon')

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
            raise GraphQLError('Not permitted to delete this track')

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
            raise GraphQLError('Log in to like a pokemon')
    
        if not pokemon:
            raise GraphQLError('Cannot not find pokemon with given pokemon id')

        LikedPokemon.objects.create(
        user=user,
        pokemon=pokemon
        )

        return CreateLike(user=user, pokemon=pokemon)


# ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth"]
# Deal removes 5 random strings from array
# Card counter - How many cards left
# Reset - Resets back to orinal array


class Mutation(graphene.ObjectType):
    create_pokemon = CreatePokemon.Field()
    update_pokemon = UpdatePokemon.Field()
    delete_pokemon = DeletePokemon.Field()
    create_like = CreateLike.Field()

    