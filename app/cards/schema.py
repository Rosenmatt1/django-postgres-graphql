import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError 

from django.db.models import Q  #allows to make more complex qeueries  
from .models import Card, CardWithUser
# , UserDeck
from users.schema import UserType


class CardType(DjangoObjectType):
    class Meta:
        model = Card

# class UserDeckType(DjangoObjectType):
#     class Meta:
#         model = UserDeck

class CardWithUserType(DjangoObjectType):
    class Meta:
        model = CardWithUser


class Query(graphene.ObjectType):
    cards = graphene.List(CardType)
    all = graphene.List(CardType)
    # deck = graphene.List(UserDeckType)

    def resolve_cards(self, info):
        return Card.objects.filter(used=False)

    def resolve_all(self, info):
        return Card.objects.all()
    
    # def resolve_deck(self, info):
    #     return UserDeck.objects.all()


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
    card2 = graphene.Field(CardType)
    card3 = graphene.Field(CardType)
    card4 = graphene.Field(CardType)
    card5 = graphene.Field(CardType)

    class Arguments:
        card1_id = graphene.Int(required=True)
        card2_id = graphene.Int(required=True)
        card3_id = graphene.Int(required=False)
        card4_id = graphene.Int(required=False)
        card5_id = graphene.Int(required=False)

    def mutate(self, info, card1_id, card2_id, card3_id=None, card4_id=None, card5_id=None):
        card1 = Card.objects.get(id=card1_id)
        card1.active = True
        card1.used = True
        card1.save()

        card2 = Card.objects.get(id=card2_id)
        card2.active = True
        card2.used = True
        card2.save()

        if card3_id:
            card3 = Card.objects.get(id=card3_id)
            card3.active = True
            card3.used = True
            card3.save()

        if card4_id:
            card4 = Card.objects.get(id=card4_id)
            card4.active = True
            card4.used = True
            card4.save()

        if card5_id:
            card5 = Card.objects.get(id=card5_id)
            card5.active = True
            card5.used = True
            card5.save()

        if card3_id and card4_id and card5_id:
            return DealHand(card1=card1, card2=card2, card3=card3, card4=card4, card5=card5)
        else: 
            return DealHand(card1=card1, card2=card2)


class ResetDeck(graphene.Mutation):
    card = graphene.Field(CardType)

    def mutate(self, info): 
        cards = Card.objects.all().update(used=False, active=False)
        return ResetDeck()


# class CreateUserDeck(graphene.Mutation):
#     user = graphene.Field(UserType)
#     card = graphene.List(CardType)

#     # class Arguments:
#     #     pokemon_id = graphene.Int(required=True)

#     def mutate(self, info):
#         user = info.context.user
       
#         card = Card.objects.get(id=4)
#         #  cards = Card.objects.all()
#         print("card", card)

#         if user.is_anonymous:
#             raise GraphQLError('Log in to play poker!')
    
#         # if not card:
#         #     raise GraphQLError('Cannot not find card)

#         UserDeck.objects.create(
#         user=user,
#         card=card
#         )

#         return CreateUserDeck(user=user, card=card)


class Mutation(graphene.ObjectType):
    create_card = CreateCard.Field()
    deal_hand = DealHand.Field()
    # create_user_deck = CreateUserDeck.Field()
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







