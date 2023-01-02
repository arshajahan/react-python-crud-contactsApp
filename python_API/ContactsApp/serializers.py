from rest_framework import serializers
from ContactsApp.models import Contacts

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ('ContactId', 'ContactName', 'ContactEmail', 'ContactAddress', 'ContactPhone1', 'ContactPhone2', 'ContactType') 