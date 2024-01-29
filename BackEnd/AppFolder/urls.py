from . import views
from django.urls import path,include

urlpatterns = [
    path('view/', views.ViewData, name='viewData'),
    path('write/', views.WriteData, name='writeDB')
]