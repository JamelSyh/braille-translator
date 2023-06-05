from braille_transcriptor.strategies import english, french, arabic
from enum import Enum


class Strategies(Enum):
    EglishStrategy = english.EnglishStrategy()
    FrenchStrategy = french.FrenchStrategy()
    ArabicStrategy = arabic.ArabicStrategy()
    """other strategies here"""
