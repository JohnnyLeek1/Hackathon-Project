from django.urls import path
from .views import *

urlpatterns = [
    path('get_letters/', get_letters),
    path('get_responses/', get_responses),
    path('create_letter/', create_letter),
]
