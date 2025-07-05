from djongo import models

class Anime(models.Model):
    _id = models.ObjectIdField()
    id = models.IntegerField()
    title = models.CharField(max_length=255)
    rank = models.CharField(max_length=10, null=True, blank=True)
    type = models.CharField(max_length=50)
    episodes = models.CharField(max_length=10, null=True, blank=True)
    aired = models.CharField(max_length=100)
    members = models.CharField(max_length=20, null=True, blank=True)
    url = models.URLField(max_length=300)
    image_url = models.URLField(max_length=512)
    score = models.FloatField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    genres = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        managed = False
        db_table = "Anime"

