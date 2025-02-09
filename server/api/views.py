from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Todo
from .serializers import TodoSerializers

from rest_framework import status


@api_view(["GET", "POST"])
def todoList(request):
    if request.method == "GET":
        todos = Todo.objects.all()
        serializers = TodoSerializers(todos, many=True)
        return Response(serializers.data)
    elif request.method == "POST":
        serializers = TodoSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST) 


@api_view(["GET", "PUT","PATCH", "DELETE"])   
def todoDetail(request, pk):
    todo = get_object_or_404(Todo, id=pk)
    if request.method == "GET":
        serializers = TodoSerializers(todo)
        return Response(serializers.data)
    elif request.method == 'PUT':
        serializers = TodoSerializers(todo, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE':
        todo.delete()
        return Response({"message": "Todo deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
