from houses.models import House
from rest_framework import viewsets, permissions
from .serializers import HouseSerializer

# House Viewset


class HouseViewSet(viewsets.ModelViewSet):
    queryset = House.objects.all()  # Get all houses
    permission_classes = [
        permissions.AllowAny
    ]
    # Serialize the data to be sent to the client as JSON
    serializer_class = HouseSerializer
