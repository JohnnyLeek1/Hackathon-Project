import json
from django.http import JsonResponse
from letters.models import Letter, Response


def get_letters(request):
    letters = Letter.objects.filter(is_viewed=False, has_response=False).exclude(author=request.user)

    letter_list = []
    for letter in letters:
        letter_list.append(letter.to_json())

    return JsonResponse({'letters': letter_list}, status=200)


def get_letter(request, pk):
    letter = Letter.objects.get(pk=pk)

    return JsonResponse({'letter': letter.to_json()}, status=200)


def get_responses(request):
    responses = Response.objects.filter(response_to__author=request.user)

    response_list = []
    for response in responses:
        response_list.append(response.to_json())

    return JsonResponse({'responses': response_list}, status=200)


def create_letter(request):
    data = json.loads(request.body)
    data['author'] = request.user

    Letter.objects.create(**data)
    return JsonResponse({'success': 'OK'}, status=200)


def create_response(request):
    data = json.loads(request.body)
    data['author'] = request.user
    
    letter = Letter.objects.get(pk=int(data['response_to']))
    letter.has_response = True
    letter.save()

    data['response_to'] = letter

    Response.objects.create(**data)
    return JsonResponse({'success': 'OK'}, status=200)