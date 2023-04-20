from braille_transcriptor.strategy_factory import StrategyFactoryConcrete
from braille_transcriptor.language_strategy import Strategies

strategies = Strategies


class BrailleTranscriptor:
    def __init__(self, strategy: Strategies = Strategies.EglishStrategy, grade: int = 1):

        factory = StrategyFactoryConcrete()
        self.strategy = factory.get_strategy(strategy, grade)

    def to_braille(self, text):
        """
        Convert text to Braille
        """
        return self.strategy.to_braille(text)

    def from_braille(self, braille):
        """
        Convert Braille to text
        """
        return self.strategy.from_braille(braille)
