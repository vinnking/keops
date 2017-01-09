# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-07 20:16
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import keops.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
        ('base', '0002_auto_20170104_1723'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', keops.models.fields.CharField(blank=True, max_length=256, null=True, unique=True)),
                ('model', keops.models.fields.CharField(blank=True, db_index=True, max_length=128, null=True)),
                ('active', models.BooleanField(db_index=True, verbose_name='Active')),
                ('domain', keops.models.fields.TextField(blank=True, null=True, verbose_name='Domain')),
                ('group', keops.models.fields.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.Group', verbose_name='Group')),
            ],
        ),
    ]
