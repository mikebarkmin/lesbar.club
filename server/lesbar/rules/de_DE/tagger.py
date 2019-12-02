import os
import pickle
import nltk


class RenameUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        renamed_module = module
        if module == "ClassifierBasedGermanTagger":
            renamed_module = "lesbar.rules.de_DE.ClassifierBasedGermanTagger"

        return super(RenameUnpickler, self).find_class(renamed_module, name)


script_dir = os.path.dirname(__file__)
nltk_german_pos = open(os.path.join(script_dir, "nltk_german_pos.pickle"), "rb")
tagger = RenameUnpickler(nltk_german_pos).load()

