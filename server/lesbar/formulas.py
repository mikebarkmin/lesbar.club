from typing import Dict
from lesbar.text import Text
import os
import math

script_dir = os.path.dirname(__file__)


def gsmog(text: Text) -> Dict[str, float]:
    # words with three syllables or more
    ms: float = 0

    for word in text.words:
        if len(word.syllables) >= 3:
            ms += 1
    gsmog = math.sqrt(ms * 30 / float(text.num_sentences))
    return {"gsmog": gsmog}


def wiener_sachtext_formel(text: Text) -> Dict[str, float]:
    # average sentence length
    sl: float = text.num_words / float(text.num_sentences)
    # percentage of words with three syllabels or more
    ms: float = 0
    # percentage of words with six or more letters
    iw: float = 0
    # percentage of words wiht one syllable
    es: float = 0

    for word in text.words:
        if len(word.content) >= 6:
            iw += 1
        if len(word.syllables) == 1:
            es += 1
        if len(word.syllables) >= 3:
            ms += 1

    ms = ms / float(text.num_words) * 100
    iw = iw / float(text.num_words) * 100
    es = es / float(text.num_words) * 100

    wstf_1 = 0.1935 * ms + 0.1672 * sl + 0.1297 * iw - 0.0327 * es - 0.875
    wstf_2 = 0.2007 * ms + 0.1682 * sl + 0.1373 * iw - 2.779
    wstf_3 = 0.2963 * ms + 0.1905 * sl - 1.1144
    wstf_4 = 0.2744 * ms + 0.2656 * sl - 1.693

    return {"wstf_1": wstf_1, "wstf_2": wstf_2, "wstf_3": wstf_3, "wstf_4": wstf_4}


def flesh_reading_ease(text: Text) -> Dict[str, float]:
    # average sentence length
    asl = text.num_words / float(text.num_sentences)
    # average syllables per word
    asw = text.num_syllables / float(text.num_words)

    # Flesch reading ease
    fre = 206.835 - (1.015 * asl) - (84.6 * asw)

    # Flesch reading ease de
    fre_de = 180 - asl - (58.5 * asw)

    # Flesch–Kincaid grade level
    fkgl = (0.39 * asl) + (11.8 * asw) - 15.59

    # number of one-syllable words per 100 words
    # nosw = 0.0
    # for word in text.words:
    #     if len(word.syllables) == 1:
    #         nosw += 1

    # nosw = nosw / 100.0

    # # new reading ease score
    # nres = 1.5999 * nosw - 1.015 * asl - 31.517

    if text.language == "de_DE":
        return {"fre_de": fre_de}

    return {"fre": fre, "fkgl": fkgl}


def gunning_fog_index(text: Text) -> Dict[str, float]:
    # number of words
    W = text.num_words
    # number of sentences
    S = text.num_sentences
    # number of words with three syllables or more
    D = 0
    for word in text.words:
        if len(word.syllables) >= 3:
            D += 1

    gfi = (W / float(S) + D) * 0.4

    return {"gfi": gfi}


def lix(text: Text) -> Dict[str, float]:
    # number of words
    a = text.num_words
    # number of periods == number of sentences
    b = text.num_sentences
    # number of long words (more than 6)
    c = 0

    for word in text.words:
        if len(word.content) > 6:
            c += 1

    lix = a / float(b) + (c * 100) / float(a)

    return {"lix": lix}


# load easy words once
# source: http://countwordsworth.com/download/DaleChallEasyWordList.txt
dale_chall_file = open(os.path.join(script_dir, "res/DaleChallEasyWordList.txt"), "r")
dale_chall_easy_words = dale_chall_file.readlines()


def dale_chall(text: Text) -> Dict[str, float]:
    easy_words = dale_chall_easy_words

    # average sentence length
    asl = text.num_words / float(text.num_sentences)
    # percentage of difficult words not on the dale-chall word list
    pdw: float = 0.0
    for word in text.words:
        if word.content.lower() not in easy_words:
            pdw += 1

    pdw = pdw / float(text.num_words) * 100

    raw_score = 0.1579 * pdw + 0.0496 * asl

    if pdw >= 5:
        raw_score += 3.6365

    return {"dale_chall": raw_score}

