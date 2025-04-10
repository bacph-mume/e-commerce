from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from user.models import User

# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = User

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name',
         'email', 'phone', 'address', 'city', 'state')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
         'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'first_name', 'last_name', 'phone', 'address', 'city', 'state'),
        }),
    )


admin.site.register(User, CustomUserAdmin)
