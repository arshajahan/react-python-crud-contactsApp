from django.urls import re_path as url
from ContactsApp import views


urlpatterns=[

    url(r'^contact$', views.contactsApi),
    url(r'^contact/([0-9]+)', views.contactsApi)

]