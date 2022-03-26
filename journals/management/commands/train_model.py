from django.core.management.base import BaseCommand, CommandError
from flair.data_fetcher import NLPTaskDataFetcher
from flair.embeddings import WordEmbeddings, FlairEmbeddings, DocumentLSTMEmbeddings
from flair.models import TextClassifier
from flair.trainers import ModelTrainer
from flair.data import Corpus
from flair.datasets import ClassificationCorpus
from pathlib import Path
import os, csv
import pandas as pd

class Command(BaseCommand):

    def handle(self, *args, **options):
        start_path = os.getcwd()

        os.chdir(start_path + "/journals/csv")
        
        corpus = ClassificationCorpus(os.getcwd(), test_file='test.csv', dev_file='dev.csv', train_file='train.csv', label_type='topic')

        #corpus = NLPTaskDataFetcher.load_classification_corpus(os.getcwd(), test_file='test.csv', dev_file='dev.csv', train_file='train.csv')
        word_embeddings = [WordEmbeddings('glove'), FlairEmbeddings('news-forward-fast'), FlairEmbeddings('news-backward-fast')]
        document_embeddings = DocumentLSTMEmbeddings(word_embeddings, hidden_size=512, reproject_words=True, reproject_words_dimension=256)

        classifier = TextClassifier(document_embeddings, label_dictionary=corpus.make_label_dictionary(), multi_label=False)
        trainer = ModelTrainer(classifier, corpus)
        trainer.train('./', max_epochs=10)