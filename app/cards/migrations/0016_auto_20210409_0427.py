# Generated by Django 3.1.7 on 2021-04-09 04:27

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cards', '0015_auto_20210409_0424'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserCard',
            new_name='UserDeck',
        ),
    ]
