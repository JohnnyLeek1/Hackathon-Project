from django.contrib import admin

from letters.models import Letter, Response


class LetterAdmin(admin.ModelAdmin):
    fields = ('author', 'letter_content', 'is_viewed', 'has_response')

class ResponseAdmin(admin.ModelAdmin):
    fields = ('author', 'letter_content', 'is_viewed', 'response_to')


admin.site.register(Letter, LetterAdmin)
admin.site.register(Response, ResponseAdmin)