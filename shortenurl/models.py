from django.db import models


class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True)
