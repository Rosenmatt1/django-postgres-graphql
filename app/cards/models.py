from django.db import models

from django.contrib.auth import get_user_model

# # Create your models here.

class Card(models.Model):
    name = models.CharField(max_length=10)
    suit = models.CharField(max_length=10)
    color = models.CharField(max_length=10)
    active = models.BooleanField(default=False)
    used = models.BooleanField(default=False)


# class DealerDeck(models.Model):
#     card = models.ForeignKey('cards.Card', related_name='DealerDeck', on_delete=models.CASCADE)
#     reset = models.BooleanField(default=False)
#     cards_left = models.IntegerField(default=52)

# # What does this field do?
# # related_name='likedPokemon',

# class UserHand(models.Model):
#     user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
#     card = models.ForeignKey('cards.Card', related_name='UserHand', on_delete=models.CASCADE)


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
