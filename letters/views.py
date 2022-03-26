from django.http import JsonResponse
from letters.models import Letter, Response


def get_letters(request):
    letters = Letter.objects.filter(is_viewed=False, has_response=False)

    letter_list = []
    for letter in letters:
        letter_list.append(letter.to_json())

    return JsonResponse({'letters': letter_list}, status=200)


def get_responses(request):
    responses = Response.objects.filter(letter__author=request.user)

    response_list = []
    for response in responses:
        response_list.append(response.to_json())

    return JsonResponse({'responses': response_list}, status=200)