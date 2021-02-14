from django.db import models

# Create your models here.
class Pokemon(models.Model):
    #id is added automatically
    name = models.CharField(max_length=50)
    abilities = models.TextField(blank=True) #allows to be left blank. Database can hold a null value
    power_level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)