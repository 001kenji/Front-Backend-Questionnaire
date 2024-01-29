from django.shortcuts import render, HttpResponse
from .models import User
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .sterializer import UserSerializer
# Create your views here.
@api_view(['GET'])
def ViewData(request):
    Userdata = User.objects.all()

    dataView = UserSerializer(Userdata, many=True)

    return Response(dataView.data)

@api_view(['PUT','POST','DELETE'])
def WriteData(request):
    userdata = User.objects.all().values()
    if request.method == 'PUT':
        data = json.loads(request.body.decode("utf-8"))
        
        database = User.objects.all().values()
        for x in database:
           
            for v, y in x.items():
                if x['name'] == data['name'] and x['email'] == data['email']:
                    content = {
                        'exists' : True
                    }
                    return Response(json.dumps(content))
        content = {
                        'exists' : False
                    }
        newUser = User(name=data['name'],email=data['email'],imagepath=data['image'],gender=data['gender'],nationality=data['nationality'],profession=data['profession'],educationLevel=data['studyLevel'],socialism=data['socialGroup'],description=data['description'])
        print(newUser, 'is the new user')
        newUser.save()
        return Response(json.dumps(content))
    



