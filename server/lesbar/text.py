from typing import List
import pyphen
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from langdetect import detect

nltk.data.path.append("/srv/nltk_data")

pyphen.language_fallback("en_GB")

languages = {"en_US": "english", "en_GB": "english", "de_DE": "german"}


class Text:
    def __init__(self, content: str, lang="en_GB"):
        self.language: str = lang
        self.content: str = content
        self.sentences: List["Sentence"] = Sentence.tokenize(
            content, lang=lang)

    @property
    def num_characters(self) -> int:
        return len(self.content)

    @property
    def num_sentences(self) -> int:
        return len(self.sentences)

    @property
    def words(self) -> List["Word"]:
        words: List["Word"] = []
        for sentence in self.sentences:
            words += sentence.words
        return words

    @property
    def num_words(self) -> int:
        return len(self.words)

    @property
    def syllables(self) -> List["Syllable"]:
        syllables: List["Syllable"] = []
        for sentence in self.sentences:
            for word in sentence.words:
                syllables += word.syllables
        return syllables

    @property
    def num_syllables(self) -> int:
        return len(self.syllables)

    @property
    def letters(self) -> List["Letter"]:
        letters: List["Letter"] = []
        for sentence in self.sentences:
            for word in sentence.words:
                for syllable in word.syllables:
                    letters += syllable.letters
        return letters

    @property
    def num_letters(self) -> int:
        return len(self.letters)

    @property
    def detected_lang(self) -> str:
        return detect(self.content)

    @property
    def language_match(self) -> bool:
        return self.detected_lang[0:2] == self.language

    def to_dict(self):
        return {
            "num_words": self.num_words,
            "num_sentences": self.num_sentences,
            "num_syllables": self.num_syllables,
            "num_letters": self.num_letters,
            "num_character": self.num_characters,
            "language": self.language,
            "detected_lang": self.detected_lang,
            "language_match": self.language_match
        }


class Sentence:
    def __init__(self, content: str, lang="en_GB"):
        self.content: str = content
        self.words: List["Word"] = Word.tokenize(content, lang=lang)

    @classmethod
    def tokenize(cls, content: str, lang="en_GB") -> List["Sentence"]:
        language = languages[lang]
        sentences = [
            Sentence(sentence_content, lang)
            for sentence_content in sent_tokenize(content, language)
        ]
        return sentences

    @property
    def syllables(self) -> List["Syllable"]:
        syllables: List["Syllable"] = []
        for word in self.words:
            syllables += word.syllables
        return syllables


class Word:
    def __init__(self, content: str, lang="en_GB"):
        self.content: str = content
        self.syllables: List["Syllable"] = Syllable.tokenize(content, lang)

    @classmethod
    def tokenize(cls, content: str, lang="en_GB") -> List["Word"]:
        language = languages[lang]
        symbols = [",", ".", ":", "?", '"', "-", "!", "(", ")", ";"]
        for symbol in symbols:
            content = content.replace(symbol, " ")
        words = [
            Word(word_content, lang)
            for word_content in word_tokenize(content, language=language)
        ]
        return words


class Syllable:
    def __init__(self, content: str):
        self.content: str = content
        self.letters: List["Letter"] = Letter.tokenize(content)

    @classmethod
    def tokenize(cls, content: str, lang="en_GB") -> List["Syllable"]:
        pythen = pyphen.Pyphen(lang=lang, filename=f"dics/hyph_{lang}.dic")
        syllables = [
            Syllable(syllable_content)
            for syllable_content in pythen.inserted(content).split("-")
        ]
        return syllables


class Letter:
    def __init__(self, content: str):
        self.content: str = content

    @classmethod
    def tokenize(cls, content: str) -> List["Letter"]:
        return [Letter(letter_content) for letter_content in content]
