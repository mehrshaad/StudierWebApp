from django.db import models


# Create your models here.
class ToDoList(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return str(self.name)


class Item(models.Model):
    toDoList = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    text = models.CharField(max_length=20)
    complete = models.BooleanField()

    def __str__(self):
        return str(self.text)
