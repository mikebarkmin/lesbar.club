import nltk
import random
import re
import pickle
from nltk.tag.sequential import ClassifierBasedTagger
from lesbar.rules.de_DE.ClassifierBasedGermanTagger import ClassifierBasedGermanTagger


corpA = nltk.corpus.reader.ConllCorpusReader(
    ".",
    "part_A.conll",
    ["ignore", "words", "ignore", "ignore", "pos"],
    encoding="utf-8",
    separator="\t",
)

corpB = nltk.corpus.reader.ConllCorpusReader(
    ".",
    "part_B.conll",
    ["ignore", "words", "ignore", "ignore", "pos"],
    encoding="utf-8",
    separator="\t",
)

train_sents = list(corpA.tagged_sents())
test_sents = list(corpB.tagged_sents())

tagger = ClassifierBasedGermanTagger(train=train_sents)
accuracy = tagger.evaluate(test_sents)
print(accuracy)

with open("nltk_german_pos.pickle", "wb") as f:
    pickle.dump(tagger, f)
