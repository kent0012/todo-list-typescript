from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.todoList),
    path('todos/<int:pk>/', views.todoDetail),
]