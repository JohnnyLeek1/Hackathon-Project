from django.contrib import admin

from journals.models import Journal

class JournalsAdmin(admin.ModelAdmin):
    fields = ('author', 'title', 'letter_content')

admin.site.register(Journal, JournalsAdmin)