from lesbar.rules import de, default


def filler(word, fillers):
    if word.content.lower() in fillers:
        word.rule = "FILLER"


def long_word(word, length):
    if len(word.syllables) >= length:
        word.rule = "LONG_WORD"


def long_sentence(sentence, length):
    if len(sentence.words) > length:
        sentence.rule = "LONG_SENTENCE"


def passive(word, passive_indicators):
    if word.content.lower() in passive_indicators:
        word.rule = "PASSIVE"


def abbreviations(word, regex):
    pass


def apply_rules(text):
    rules = default
    if text.language == "de_DE":
        rules = de

    for s in text.sentences:
        long_sentence(s, rules.long_sentence)
        for w in s.words:
            filler(w, rules.fillers)
            long_word(w, rules.long_word)
            passive(w, rules.passive_indicators)
    return text
