from django.urls import path
from .views import *

urlpatterns = [
    path('get_letters/', get_letters),
]
