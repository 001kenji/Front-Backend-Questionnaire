# Generated by Django 5.0.1 on 2024-01-28 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppFolder', '0003_user_description_alter_user_nationality'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='socialism',
            field=models.TextField(max_length=800, null=True),
        ),
    ]
