from django.db import models

from django.contrib.auth import get_user_model

# Create your models here.
class Pokemon(models.Model):
    #id is added automatically
    name = models.CharField(max_length=50)
    abilities = models.TextField(blank=True) #allows to be left blank. Database can hold a null value
    power_level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)   #ForeignKey allows for many to one relationship.  So a user can create many pokemon
    #null=True allows for migrations to be compatible with Django version 2
    #on_delete=models.CASCADE if  User is deleted, the pokemon it created will also be deleted

class LikedPokemon(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    pokemon = models.ForeignKey('pokemon.Pokemon', related_name='likedPokemon', on_delete=models.CASCADE)  #the pokemon in pokemon.Pokemon is referring to the app