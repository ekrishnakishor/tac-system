from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('tac_app.urls')),
     path('', include('tac_app.urls')),
]
