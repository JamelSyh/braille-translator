from braille_transcriptor.braille_alphabets import BrailleAlphabet, Language, Dictionary


class Grade:

    def to_braille(self, text):
        """
        Convert text to Braille
        """
        pass

    def from_braille(self, braille):
        """
        Convert Braille to text
        """
        pass


class Strategy():
    """
    Strategy or Logic of transcription (combination of a language and a grade1/2)
    """
    name: str
    language: Language
    dictionary: BrailleAlphabet
    grade1: Grade
    grade2: Grade
