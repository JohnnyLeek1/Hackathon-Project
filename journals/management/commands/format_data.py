from django.core.management.base import BaseCommand, CommandError
import os, csv
import pandas as pd

class Command(BaseCommand):

    def handle(self, *args, **options):
        start_path = os.getcwd()

        os.chdir(start_path + "/journals/csv")
        
        data = pd.read_csv("./tweet_emotions.csv", encoding='latin-1').sample(frac=1).drop_duplicates()
        data = data[['tweet_id', 'sentiment', 'content']]
        data.rename(columns={"v1":"tweet_id", "v2":"sentiment", "v3":"content"})
        
        data['sentiment'] = '__sentiment__' + data['sentiment'].astype(str)
        data.iloc[0:int(len(data)*0.8)].to_csv('train.csv', sep='\t', index = False, header = True)
        data.iloc[int(len(data)*0.8):int(len(data)*0.9)].to_csv('test.csv', sep='\t', index = False, header = True)
        data.iloc[int(len(data)*0.9):].to_csv('dev.csv', sep='\t', index = False, header = True)