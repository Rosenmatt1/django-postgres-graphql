import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError 

from django.db.models import Q  #allows to make more complex qeueries  
from .models import Card, DealHand
# from users.schema import UserType


class CardType(DjangoObjectType):
    class Meta:
        model = Card

class DealType(DjangoObjectType):
    class Meta:
        model = DealHand


class Query(graphene.ObjectType):
    cards = graphene.List(CardType)

    def resolve_cards(self, info):
        # print(data.all_cards)
        return Card.objects.all()
    
    def resolve_deal(self, info):
        # print(data.all_cards)
        return Card.objects.all()


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
    # user = graphene.Field(UserType)
    card = graphene.Field(CardType)

    class Arguments:
        cards = Card.objects.get()
        card1 = 
    
    def mutate():
        # user = info.context.user

    # Update
        card1.active = True
        card1.save()
        return Dealhand(card1=card1)


    #       # Create Pokemon
    # DealHand.objects.create(
    #     user=user,
    #     pokemon=pokemon
    #     )
    
    # # Create
    # pokemon = Pokemon(name=name, abilities=abilities, power_level=power_level, posted_by=user)
    #     pokemon.save()
    #     return CreatePokemon(pokemon=pokemon)


class Mutation(graphene.ObjectType):
    create_card = CreateCard.Field()
    deal_hand = DealHand.Field()



# class MakeDeck(graphene.Mutation):
#     card = graphene.Field(Card)

#     class Arguments:
#         name = graphene.String()
#         suit = graphene.String()
#         color = graphene.String()

#     def mutate(self, info, name, suit, color):
#         # user = info.context.user
#         # if user.is_anonymous:
#         #     raise GraphQLError('Please Log in')
#         all_cards = {
#             "AH": {
#                 "name": "Ace",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "QH": {
#                 "name": "Queen",
#                 "suit": "Hearts",
#                 "color": "red"

#             },
#              "JH": {
#                 "name": "Jack",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "10H": {
#                 "name": "10",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "9H": {
#                 "name": "9",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "8H": {
#                 "name": "8",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "7H": {
#                 "name": "7",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "6H": {
#                 "name": "6",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "5H": {
#                 "name": "5",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "4H": {
#                 "name": "4",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "3H": {
#                 "name": "3",
#                 "suit": "Hearts",
#                 "color": "red"
#             },
#             "2H": {
#                 "name": "2",
#                 "suit": "Hearts",
#                 "color": "red"
#             }
#         }
#         # for attr, value in k.__dict__.items():
#         for attr, value in all_cards.items():
#             print(value['name'])
#             card = Card(name=value['name'], suit=value['suit'], color=value['color'])
#             card.save()
#             return MakeDeck(card=card)
            

    # ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth"]

        # Pokemon.objects.create(
        # all_pokemon=all_pokemon
        # )

    #     class Query(ObjectType):
    # some_func = Field(SomeObjectType, args={'value': graphene.List(graphene.String)})

# class ArticleType(DjangoObjectType):
#     tag_list = graphene.List(graphene.String)

#     class Meta:
#          model = Article

#     def resolve_tag_list(self, info):
#          return [tag.tag for tag in self.tags.all()]

# ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth"]
# Deal removes 5 random strings from array
# Card counter - How many cards left
# Reset - Resets back to orinal array

    # class ArticleType(DjangoObjectType):
    # tag_list = graphene.List(graphene.String)

    # class Meta:
    #      model = Article

    # def resolve_tag_list(self, info):
    #      return [tag.tag for tag in self.tags.all()]

# class UpdateBattle(graphene.Mutation):
#     pokemon = graphene.Field(BattleType)
#     # pokemon_list = graphene.List(graphene.String)

#     class Arguments:
#         # track_id = graphene.Int(required=True)
#         pokemon_list = graphene.List(graphene.String)
      

#     def mutate(self, info, pokemon_list):
#         # user = info.context.user
#         pokemon = Pokemon.objects.get()

#         # if track.posted_by != user:
#         #     raise Exception('Not permitted to update this track')

#         for poke in pokemon_list
#             pokemon = poke.name
#             pokemon.save()
#         return UpdateBattle(pokemon=pokemon)
