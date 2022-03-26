from django.http import JsonResponse
from letters.models import Letter


def get_letters(request):
    letters = Letter.objects.filter(is_viewed=False, has_response=False)

    letter_list = []
    for letter in letters:
        letter_list.append(letter.to_json())

    return JsonResponse({'letters': letter_list}, status=200)