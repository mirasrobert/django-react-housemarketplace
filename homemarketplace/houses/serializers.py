from rest_framework import serializers
from .models import House

# House Serializer


class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = '__all__'
        # Custom Error Messages
        extra_kwargs = {
            "name": {"error_messages": {"required": "Name is required", "max_length": "Name must be less than 100 characters", "blank": "Name is required"}},
            "address": {"error_messages": {"required": "Address is required"}},
            "zipcode": {"error_messages": {"required": "Zip code is required", "invalid": "Zip code must be a number"}},
            "city": {"error_messages": {"required": "City is required"}},
            "description": {"error_messages": {"required": "Description is required"}},
            "price": {"error_messages": {"required": "Price is required", "invalid": "Price must be a number"}},
        }
