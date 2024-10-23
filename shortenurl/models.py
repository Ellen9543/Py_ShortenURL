from django.db import models
import string, random


class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=20, unique=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.short_code:
            self.short_code = self.generate_short_code()
        super().save(*args, **kwargs)

    def generate_short_code(self):
        characters = string.ascii_letters + string.digits
        short_code = "".join(random.choices(characters, k=6))
        return short_code
