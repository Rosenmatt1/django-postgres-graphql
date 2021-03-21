import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError 

from django.db.models import Q  #allows to make more complex qeueries  
from .models import Card#, DealHand
# from users.schema import UserType


class CardType(DjangoObjectType):
    class Meta:
        model = Card

# class DealType(DjangoObjectType):
#     class Meta:
#         model = DealHand


class Query(graphene.ObjectType):
    cards = graphene.List(CardType)
    used = graphene.List(CardType)

    def resolve_cards(self, info):
        # print(data.all_cards)
        return Card.objects.all()

    def resolve_used(self, info):
        # print(data.all_cards)
        return Card.objects.filter(used=True)
    
    # def resolve_deal(self, info):
    #     # print(data.all_cards)
    #     return Card.objects.all()
    # *****The Query can be a filter***


class CreateCard(graphene.Mutation):
    card = graphene.Field(CardType)

    class Arguments:
        name = graphene.String()
        suit = graphene.String()
        color = graphene.String()

    def mutate(self, info, name, suit, color):
        card = Card(name=name, suit=suit, color=color)
        card.save()
        return CreateCard(card=card)


class DealHand(graphene.Mutation):
    card1 = graphene.Field(CardType)

    class Arguments:
        card1_id = graphene.Int(required=True)

    def mutate(self, info, card1_id):
        card1 = Card.objects.get(id=card1_id)
        card1.active = True
        card1.used = True
        card1.save()
        return Dealhand(card1=card1)


class ResetDeck(graphene.Mutation):
    card = graphene.Field(CardType)

    def mutate(self, info): 
        cards = Card.objects.all().update(used=False, active=False)
        return ResetDeck()


# If I add user functonality.  Each user will have there own deck!  Similar to the Like in the Tracks app
# class CreateLike(graphene.Mutation):
#     user = graphene.Field(UserType)
#     pokemon = graphene.Field(PokemonType)

#     class Arguments:
#         pokemon_id = graphene.Int(required=True)

#     def mutate(self, info, pokemon_id):
#         user = info.context.user
#         pokemon = Pokemon.objects.get(id=pokemon_id)

#         if user.is_anonymous:
#             raise GraphQLError('Log in to like a pokemon')
    
#         if not pokemon:
#             raise GraphQLError('Cannot not find pokemon with given pokemon id')

#         LikedPokemon.objects.create(
#         user=user,
#         pokemon=pokemon
#         )

#         return CreateLike(user=user, pokemon=pokemon)


class Mutation(graphene.ObjectType):
    create_card = CreateCard.Field()
    deal_hand = DealHand.Field()
    reset_deck = ResetDeck.Field()
    
    
    #       # Create Pokemon
    # DealHand.objects.create(
    #     user=user,
    #     pokemon=pokemon
    #     )
    
    # # Create
    # pokemon = Pokemon(name=name, abilities=abilities, power_level=power_level, posted_by=user)
    #     pokemon.save()
    #     return CreatePokemon(pokemon=pokemon)







