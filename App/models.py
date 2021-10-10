from django.db import models


class Newuser(models.Model):
    fullname = models.CharField(max_length=32)
    email = models.EmailField(unique=True, primary_key=True)
    password = models.CharField(max_length=32)