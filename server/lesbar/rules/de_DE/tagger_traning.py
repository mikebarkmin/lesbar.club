import nltk
import random
import re
import pickle
from ClassifierBasedGermanTagger import ClassifierBasedGermanTagger


print("Read: Part A")
corpA = nltk.corpus.reader.ConllCorpusReader(
    ".",
    "part_A.conll",
    ["ignore", "words", "ignore", "ignore", "pos"],
    encoding="utf-8",
    separator="\t",
)

print("Read: Part B")
corpB = nltk.corpus.reader.ConllCorpusReader(
    ".",
    "part_B.conll",
    ["ignore", "words", "ignore", "ignore", "pos"],
    encoding="utf-8",
    separator="\t",
)

print("Combining")
tagged_sents = list(corpA.tagged_sents()) + list(corpB.tagged_sents())
random.shuffle(tagged_sents)

split_perc = 0.1
split_size = int(len(tagged_sents) * split_perc)

print("Splitting")
train_sents, test_sents = tagged_sents[split_size:], tagged_sents[:split_size]

print("Training")
tagger = ClassifierBasedGermanTagger(train=train_sents)
print("Evaluating")
accuracy = tagger.evaluate(test_sents)

print(f"Accuracy: {accuracy}")

with open("nltk_german_pos.pickle", "wb") as f:
    pickle.dump(tagger, f)
