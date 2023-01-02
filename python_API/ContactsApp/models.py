from django.db import models

# Create your models here. 

class Contacts(models.Model):
    ContactId = models.AutoField(primary_key=True)
    ContactName = models.CharField(max_length=500)
    ContactEmail = models.CharField(max_length=500)
    ContactAddress = models.CharField(max_length=2000)
    ContactPhone1 = models.CharField(max_length=15)
    ContactPhone2 = models.CharField(max_length=15)
    ContactType = models.CharField(max_length=100)
