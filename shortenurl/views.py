from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import ShortURL
import json


def index(request):

    return render(request, "index.html")


@require_POST
def submit_url(request):
    data = json.loads(request.body)
    original_url = data.get("url")
    short_code = data.get("short_code")
    is_active = data.get("is_active")

    url, _ = ShortURL.objects.get_or_create(
        original_url=original_url,
        defaults={
            "is_active": is_active,
            "short_code": short_code,
        },
    )

    if is_active != url.is_active:
        url.is_active = is_active
        url.save()

    if short_code:
        url.short_code = short_code
        url.save()

    return JsonResponse(
        {
            "short_url": url.short_code,
        }
    )
