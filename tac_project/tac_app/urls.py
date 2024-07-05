from django.urls import path
from .views import RegisterUserView, CustomAuthToken, GenerateTACView, VerifyTACView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('generate-tac/', GenerateTACView.as_view(), name='generate-tac'),
    path('verify-tac/', VerifyTACView.as_view(), name='verify-tac'),
]
