from braille_transcriptor.strategy_factory import StrategyFactoryConcrete


class BrailleTranscriptor:
    def __init__(self, text: str = "", source: str = "en",  target: str = "1"):

        factory = StrategyFactoryConcrete()
        self.results = factory.get_strategy(text, source, target)

    def get_results(self):
        return self.results

    # def to_braille(self, text):
    #     """
    #     Convert text to Braille
    #     """
    #     return self.strategy.to_braille(text)

    # def from_braille(self, braille):
    #     """
    #     Convert Braille to text
    #     """
    #     return self.strategy.from_braille(braille)
