from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'bio', 'portrait', 'date_joined', 'first_name', 'last_name', 'username', 'reference')
        read_only_fields = ('date_joined', 'reference')

