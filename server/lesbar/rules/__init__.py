from lesbar.rules import de_DE, default


def filler(word, fillers):
    if word.content.lower() in fillers:
        word.rule = "FILLER"


def long_word(word, length):
    if len(word.syllables) >= length:
        word.rule = "LONG_WORD"


def long_sentence(sentence, length):
    if len(sentence.words) > length:
        sentence.rule = "LONG_SENTENCE"


def tag(sentence, tagger):
    words = [w.content for w in sentence.words]
    tags = tagger.tag(words)
    for tag, word in zip(tags, sentence.words):
        word.tag = tag[1]


def passive(sentence, passive_indicators):
    vafin = []
    vvpp = []

    for w in sentence.words:
        if w.tag == "VAFIN" and w.content in passive_indicators:
            vafin.append(w)
        elif w.tag == "VVPP":
            vvpp.append(w)

    if len(vafin) > 0 and len(vvpp) > 0:
        for w in vafin:
            w.rule = "PASSIVE"
        for w in vvpp:
            w.rule = "PASSIVE"


def abbreviations(word, regex):
    pass


def apply_rules(text):
    rules = default
    if text.language == "de_DE":
        rules = de_DE

    for s in text.sentences:
        if rules.tagger:
            tag(s, rules.tagger)
        long_sentence(s, rules.long_sentence)
        for w in s.words:
            filler(w, rules.fillers)
            long_word(w, rules.long_word)
        passive(s, rules.passive_indicators)
    return text
