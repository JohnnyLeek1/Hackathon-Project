from django.db import models
from django.contrib.auth.models import User

class AbstractLetter(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    letter_content = models.TextField()
    is_viewed = models.BooleanField(default=False)

class Letter(AbstractLetter):
    has_response = models.BooleanField(default=False)

    def to_json(self):
        return {
            'letter_content': self.letter_content,
            'is_viewed': self.is_viewed,
            'has_response': self.has_response
        }

class Response(AbstractLetter):
    response_to = models.ForeignKey(Letter, on_delete=models.CASCADE)

    def to_json(self):
        return {
            'letter_content': self.letter_content,
            'is_viewed': self.is_viewed,
            'response_to': self.letter.to_json()
        }