from django.http import JsonResponse
from .models import Journal

def get_journals(request):
    journal_entries = Journal.objects.filter(author=request.user)

    journal_list = []
    for entry in journal_entries:
        journal_list.append(entry.to_json())

    return JsonResponse({'journals': journal_list}, status=200)