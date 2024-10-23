from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/submit_url/", views.submit_url, name="submit_url"),
    path("<str:short_url>/", views.redirect_to_url, name="redirect_to_url"),
]
