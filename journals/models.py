from django.db import models
from django.contrib.auth.models import User

class Journal(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, default="")
    letter_content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    def to_json(self):
        return {
            'title': self.title,
            'letter_content': self.letter_content,
            'date_created': self.date_created
        }

    def __str__(self):
        return self.title