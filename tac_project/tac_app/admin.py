from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Transaction

class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('account_number', 'ifsc_code', 'balance', 'tans')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {'fields': ('email', 'account_number', 'ifsc_code', 'balance', 'tans')}),
    )
    list_display = ('username', 'email', 'account_number', 'ifsc_code', 'balance')
    search_fields = ('username', 'email', 'account_number')
    ordering = ('username',)

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'amount', 'timestamp')
    search_fields = ('sender__username', 'receiver__username')
    list_filter = ('timestamp',)

admin.site.register(User, UserAdmin)
admin.site.register(Transaction, TransactionAdmin)
