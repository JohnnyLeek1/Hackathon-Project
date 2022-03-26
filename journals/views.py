from django.http import JsonResponse
from django.views.generic.base import TemplateView
from .models import Journal
import json
import flair

class ReactView(TemplateView):
    template_name = 'base.html'

    def get_context_data(self, **kwargs):
        return super(ReactView, self).get_context_data(**kwargs)


def get_journals(request):
    journal_entries = Journal.objects.filter(author=request.user)

    journal_list = []
    for entry in journal_entries:
        journal_list.append(entry.to_json())

    return JsonResponse({'journals': journal_list}, status=200)


def create_journal(request):
    data = json.loads(request.body)
    data['author'] = request.user

    journal = Journal.objects.create(**data)
    return JsonResponse({'success': journal.to_json()}, status=200)

def analyze_journal(request):
    data = json.loads(request.body)
    flair_sentiment = flair.models.TextClassifier.load('en-sentiment')

    sentence = flair.data.Sentence(data['text'])
    flair_sentiment.predict(sentence)
    total_sentiment = sentence.labels

    return JsonResponse({'success': 'OK', 'data': { 'value': sentence.labels[-1].value, 'score': sentence.labels[-1].score }})

