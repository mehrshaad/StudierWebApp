from django.db import models
from django.db.models.aggregates import Min
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.fields import TimeField


class User(models.Model):
    Email = models.EmailField(unique=True, primary_key=True)
    Username = models.CharField(max_length=32, unique=True)
    Firstname = models.CharField(max_length=32, null=True)
    Lastname = models.CharField(max_length=32, null=True)
    Password = models.CharField(max_length=32, null=True)
    Coin = models.PositiveIntegerField(default=0, null=True)
    Dob = models.DateField(null=True)

    def charttime():
        return {
            "sat": [],
            "sun": [],
            "mon": [],
            "tue": [],
            "wen": [],
            "thu": [],
            "fri": []
        }

    Chart = models.JSONField(default=charttime)


class Course(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    # study_goal = models.IntegerField()
    Total_time = models.IntegerField(default=0)
    Priority = models.PositiveSmallIntegerField()
    Name = models.CharField(max_length=32, primary_key=True, unique=True)
    # Category = models.CharField(max_length=32)


class Store(models.Model):
    user = models.OneToOneField(to=User, on_delete=CASCADE)
    Sid = models.AutoField(primary_key=True, unique=True)
    Doublecoin = models.BooleanField(default=False, null=True)
    Doublecoin_time = models.DateTimeField(null=True)
    Edit_username = models.BooleanField(default=False, null=True)
    dark_mode = models.BooleanField(default=False)
    ml = models.BooleanField(default=False)
    avatar = models.CharField(max_length=32, null=True)


class Transaction(models.Model):
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    Dot = models.DateField()
    Tid = models.AutoField(primary_key=True, unique=True)  # test konim
    Coin_amount = models.PositiveIntegerField()
    Cash_amount = models.PositiveIntegerField()


class Pom(models.Model):
    course = models.ForeignKey(to=Course, on_delete=CASCADE)
    Pid = models.AutoField(primary_key=True, unique=True)
    Date = models.DateField()
    Time = models.TimeField()
    Rating = models.IntegerField()