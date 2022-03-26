from django.urls import path
from .views import *

urlpatterns = [
    path('get_letter/<int:pk>/', get_letter),
    path('get_letters/', get_letters),
    path('get_responses/', get_responses),
    path('create_letter/', create_letter),
    path('create_response/', create_response),
]
