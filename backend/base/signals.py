from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# everytime i change email in admin panel the username will change too
def updateUser(sender, instance, **kwargs):
    user = instance 
    if user.email != '':
        user.username = user.email

pre_save.connect(updateUser, sender=User)