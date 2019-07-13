from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import TTUser

class UserAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'pk')

admin.site.register(TTUser, UserAdmin)

