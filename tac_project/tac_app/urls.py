from django.urls import path
from .views import SignUpView, SignInView, DashboardView, GenerateTANView, TransferView, TransactionListView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('dashboard/<int:pk>/', DashboardView.as_view(), name='dashboard'),
    path('generate_tan/<int:pk>/', GenerateTANView.as_view(), name='generate_tan'),
    path('transfer/', TransferView.as_view(), name='transfer'),
    path('transactions/<int:pk>/', TransactionListView.as_view(), name='transactions'),
]
