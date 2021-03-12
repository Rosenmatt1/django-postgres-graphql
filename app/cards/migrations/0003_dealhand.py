# Generated by Django 3.1.7 on 2021-03-12 21:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cards', '0002_auto_20210312_0459'),
    ]

    operations = [
        migrations.CreateModel(
            name='DealHand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reset', models.BooleanField(default=False)),
                ('cards_left', models.IntegerField(default=52)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='DealHand', to='cards.card')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
