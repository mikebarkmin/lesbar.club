import os
import pickle
import nltk

script_dir = os.path.dirname(__file__)
nltk_german_classifier_file = open(
    os.path.join(script_dir, "nltk_german_classifier_data.pickle"), "rb"
)
tagger = pickle.load(nltk_german_classifier_file)

