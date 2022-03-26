from django.urls import path
from .views import *

urlpatterns = [
    path('get_journals/', get_journals),
    path('create_journal/', create_journal),
]
