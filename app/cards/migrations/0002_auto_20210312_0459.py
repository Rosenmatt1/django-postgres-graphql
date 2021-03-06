# Generated by Django 3.1.7 on 2021-03-12 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userhand',
            name='card',
        ),
        migrations.RemoveField(
            model_name='userhand',
            name='user',
        ),
        migrations.AddField(
            model_name='card',
            name='active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='card',
            name='used',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='DealerDeck',
        ),
        migrations.DeleteModel(
            name='UserHand',
        ),
    ]
