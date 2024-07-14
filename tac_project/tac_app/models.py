from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    account_number = models.CharField(max_length=10, unique=True)
    ifsc_code = models.CharField(max_length=11, default='TANBANK001')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tans = models.JSONField(default=list)

class Transaction(models.Model):
    sender = models.ForeignKey(User, related_name='sent_transactions', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
