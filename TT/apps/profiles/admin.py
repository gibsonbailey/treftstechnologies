from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import TTUser

admin.site.register(TTUser)

