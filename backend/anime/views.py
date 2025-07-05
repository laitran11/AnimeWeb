from rest_framework import viewsets,filters
from .models import Anime
from .serializers import AnimeSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q


class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
    lookup_field = 'id'

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'type', 'aired', 'members', 'score']
     
    @action(detail=False, methods=['get'], pagination_class=None)
    def all(self,request):
        """
        Custom endpoint: /api/anime/all
        """
        all_anime = self.get_queryset()
        serializer = self.get_serializer(all_anime, many=True)
        return Response(serializer.data)
    
   



    
        
