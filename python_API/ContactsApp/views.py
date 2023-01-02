from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ContactsApp.models import Contacts
from ContactsApp.serializers import ContactsSerializer

# Create your views here.

@csrf_exempt
def contactsApi(request, id=0):
    if request.method == 'GET':
        contacts = Contacts.objects.all()
        contacts_serializer = ContactsSerializer(contacts, many=True)
        return JsonResponse(contacts_serializer .data, safe=False)
    elif request.method == 'POST':
        contact_data = JSONParser().parse(request)
        contacts_serializer = ContactsSerializer(data=contact_data)
        if contacts_serializer.is_valid():
            contacts_serializer.save()
            return JsonResponse("Added Succesfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        contact_data = JSONParser().parse(request)
        contact = Contacts.objects.get(ContactId=contact_data['ContactId'])
        contacts_serializer = ContactsSerializer(contact, data=contact_data)
        if contacts_serializer.is_valid():
            contacts_serializer.save()
            return JsonResponse("Updated successfully", safe=False)
        return JsonResponse("failed to update")
    elif request.method == 'DELETE':
        contact = Contacts.objects.get(ContactId=id)
        contact.delete()
        return JsonResponse("Deleted Successfully", safe=False)


