import graphene
from graphene_django import DjangoObjectType

from .models import Track

class TrackType(DjangoObjectType)