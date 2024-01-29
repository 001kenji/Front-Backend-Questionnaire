# Generated by Django 5.0.1 on 2024-01-28 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppFolder', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='educationLevel',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='imagepath',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='nationality',
            field=models.TextField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='profession',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='socialism',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=100, null=True),
        ),
    ]