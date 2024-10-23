from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Q
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

    url = ShortURL.objects.filter(
        Q(short_code=short_code) & ~Q(original_url=original_url)
    )

    if url:
        return JsonResponse(
            {
                "status": "fail",
                "error": "短網址已被使用",
            }
        )

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
            "status": "success",
            "short_url": url.short_code,
        }
    )


def redirect_to_url(request, short_url):
    try:
        url = ShortURL.objects.get(short_code=short_url, is_active=True)
        return redirect(url.original_url)
    except ShortURL.DoesNotExist:
        return JsonResponse({"error": "URL not found!"}, status=404)
