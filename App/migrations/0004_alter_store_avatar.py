# Generated by Django 3.2.8 on 2022-01-09 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0003_alter_course_total_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='avatar',
            field=models.CharField(default=0, max_length=32),
        ),
    ]
