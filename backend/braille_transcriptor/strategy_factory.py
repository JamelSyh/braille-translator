from braille_transcriptor.language_strategy import Strategies
from braille_transcriptor.braille_alphabets import Dictionary, transcript_options

strategies_dict = {
    "en": {"strate": Strategies.EglishStrategy, 'lang': "eng", 'dictionary': Dictionary.English.value},
    "fr": {"strate": Strategies.FrenchStrategy, 'lang': "fra", 'dictionary': Dictionary.French.value},
    "ar": {"strate": Strategies.ArabicStrategy, 'lang': "ara", 'dictionary': Dictionary.Arabic.value},
    # add strategies here
}


class StrategyFactory:

    def get_strategy(self, text, source, target):
        """
        Create (initiate) a strategy
        """
        pass


class StrategyFactoryConcrete(StrategyFactory):

    def lang_exist(self, code, options):
        return any(option["code"] == code for option in options)

    def grade_exist(self, code, lang, options):
        for option in options:
            if (lang == option['code']):
                return any(grade['code'] == code for grade in option['grade'])

    def get_strategy(self, text, source, target):
        """
        Intiate and return the strategy object for the specified language and grade
        """

        if (self.lang_exist(source, transcript_options)):
            strategy = strategies_dict[source]['strate']
            if (int(target) == 1):
                return strategy.value.grade1.to_braille(text)
            elif (int(target) == 2):
                return strategy.value.grade2.to_braille(text)
            # else:
            #     raise HTTPException(
            #         status_code=403, detail="enter a valid grade (1 or 2)")
        elif (self.grade_exist(source, target, transcript_options)):
            strategy = strategies_dict[target]['strate']
            if (int(source) == 1):
                return strategy.value.grade1.from_braille(text)
            elif (int(source) == 2):
                return strategy.value.grade2.from_braille(text)
            # else:
            #     raise HTTPException(
            #         status_code=403, detail="enter a valid grade (1 or 2)")
        # else:
        #     raise HTTPException(
        #         status_code=403, detail="enter a valid language (en, ar, fr) or grade (1, 2)")
