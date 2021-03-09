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


# class Battle(models.Model):
#     name = models.CharField(max_length=50)
#     # user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)


class Card(models.Model):
    name = models.CharField(max_length=10)
    suit = models.CharField(max_length=10)
    color = models.CharField(max_length=10)
    # user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)

class LikedPokemon(models.Model):
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    pokemon = models.ForeignKey('pokemon.Pokemon', related_name='likedPokemon', on_delete=models.CASCADE)  #the pokemon in pokemon.Pokemon is referring to the app






# The __str__ method just tells Django what to print when it needs to print out an instance of the any model. It is also what lets your admin panel, go from this
# class Customer(models.Model):
#     name = models.CharField(max_length=200, null=True)
#     phone = models.CharField(max_length=200, null=True)
#     email = models.CharField(max_length=200, null=True)
#     date_created = models.DateTimeField(auto_now_add=True, null=True)

#     def __str__(self):
#         return self.name
    

# class Tag(models.Model):
#     name = models.CharField(max_length=200, null=True)

#     def __str__(self):
#         return self.name


# class Product(models.Model):
#     CATEGORY = (
#         ('Indoor', 'Indoor'),
#         ('Out door', 'Out door'),
#     )
#     date_created = models.DateTimeField(auto_now_add=True, null=True)
#     name = models.CharField(max_length=200, null=True)
#     description = models.CharField(max_length=200, null=True, blank=True)
#     price = models.FloatField(max_length=200, null=True)
#     category = models.CharField(max_length=300, null=True, choices=CATEGORY)
#     tags = models.ManyToManyField(Tag)

#     def __str__(self):
#         return self.name


# class Order(models.Model):
#     STATUS = (
#         ('PENDING', 'PENDING'),
#         ('Out for delivery', 'Out for Delivery'),
#         ('Delivered', 'Delivered'),
#     )
#     date_created = models.DateTimeField(auto_now_add=True, null=True)
#     customer = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL) #the on_delete=models.SET_NULL keep order even if the customer is deleted)
#     product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL) 
#     status = models.CharField(max_length=10, null=True, choices=STATUS)   

#     def __str__(self):
#         return self.name
   




# The first element in each tuple is the actual value to be set on the model, and the second element is the human-readable name.
#     YEAR_IN_SCHOOL_CHOICES = [
#     ('FR', 'Freshman'),
#     ('SO', 'Sophomore'),
#     ('JR', 'Junior'),
#     ('SR', 'Senior'),
#     ('GR', 'Graduate'),
# ]

# class Student(models.Model):
#     FRESHMAN = 'FR'
#     SOPHOMORE = 'SO'
#     JUNIOR = 'JR'
#     SENIOR = 'SR'
#     GRADUATE = 'GR'
#     YEAR_IN_SCHOOL_CHOICES = [
#         (FRESHMAN, 'Freshman'),
#         (SOPHOMORE, 'Sophomore'),
#         (JUNIOR, 'Junior'),
#         (SENIOR, 'Senior'),
#         (GRADUATE, 'Graduate'),
#     ]
#     year_in_school = models.CharField(
#         max_length=2,
#         choices=YEAR_IN_SCHOOL_CHOICES,
#         default=FRESHMAN,
#     )

#     def is_upperclass(self):
#         return self.year_in_school in {self.JUNIOR, self.SENIOR}