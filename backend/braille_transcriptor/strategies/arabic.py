from braille_transcriptor.strategies.strategy import *


class ArabicStrategy(Strategy):

    def __init__(self):
        self.name = "normal"
        self.language = Language.Arabic
        self.dictionary = Dictionary.Arabic.value
        self.grade1 = self.Grade1(self)
        self.grade2 = self.Grade2(self)

    class Grade1(Grade):

        def __init__(self, outer):
            self.outer = outer
            self.grade1_map = outer.dictionary.grade1_map
            self.ALPHA = self.grade1_map['alpha']['alpha']
            self.NUMERIC = self.grade1_map['numeric']['numeric']

        def number_encoder(self, word: str):
            word += " "
            result = ""

            for i in range(0, len(word) - 1):
                previous, main = word[i-1], word[i]

                if (main.isdigit()):
                    if (not previous.isdigit()):
                        result += self.NUMERIC

                    result += self.grade1_map['numeric'][main]

                else:
                    if (previous.isdigit()):
                        result += self.ALPHA
                    result += main

            return result

        def to_braille(self, text):
            words = text.split(" ")
            text = ""
            for word in words:

                new_word = self.number_encoder(word)
                result = ""
                braille_dict = self.grade1_map['alpha'] | self.grade1_map['char']
                for i in range(len(new_word)):
                    main = new_word[i]

                    if (main in braille_dict):
                        result += braille_dict[main]
                    else:
                        result += new_word[i]

                text += result + self.grade1_map['char'][" "]
            return text[:-1]

        def number_decoder(self, braille: str):
            result = ""
            # swap the dictionary
            swapped_numeric_dict = {v: k for k,
                                    v in self.grade1_map['numeric'].items()}
            numeric_mode = False

            for i in range(len(braille)):
                main = braille[i]
                if (main == self.NUMERIC):
                    numeric_mode = True
                elif (main == self.ALPHA):
                    numeric_mode = False
                    # result += main
                elif (numeric_mode and main in swapped_numeric_dict):
                    result += swapped_numeric_dict[main]
                else:
                    result += main
            return result

        def from_braille(self, braille):

            braille_words = braille.split(self.grade1_map['char'][" "])
            final_braille = ""
            braille_dict = self.grade1_map['alpha'] | self.grade1_map['char']
            # swap the dictionary
            swaped_dict = {v: k for k, v in braille_dict.items()}

            for word in braille_words:
                word = self.number_decoder(word)
                result = ""
                for i in range(len(word)):
                    main = word[i]

                    if (main not in swaped_dict):
                        result += main
                    else:
                        result += swaped_dict[main]
                final_braille += result + " "
            return final_braille[:-1]

    class Grade2(Grade):

        def __init__(self, outer):
            self.outer = outer

        def to_braille(self, text):
            pass

        def from_braille(self, braille):
            pass
