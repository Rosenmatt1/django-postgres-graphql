# Generated by Django 3.1.7 on 2021-04-06 07:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0009_auto_20210406_0737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdeck',
            name='card',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='UserDeck', to='cards.card', unique=True),
        ),
    ]
