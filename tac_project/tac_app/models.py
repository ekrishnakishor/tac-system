from django.db import models

class TAC(models.Model):
    user_id = models.CharField(max_length=100)
    tac_code = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_id
