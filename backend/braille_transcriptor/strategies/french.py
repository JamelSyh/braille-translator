from braille_transcriptor.strategies.strategy import *


class FrenchStrategy(Strategy):

    def __init__(self):
        self.name = "normal"
        self.language = Language.French
        self.dictionary = Dictionary.French.value
        self.grade1 = self.Grade1(self)
        self.grade2 = self.Grade2(self)

    class Grade1(Grade):

        def __init__(self, outer):
            self.outer = outer
            self.grade1_map = outer.dictionary.grade1_map
            self.CAPITAL_WORD = self.grade1_map['alpha']['capital_word']
            self.CAPITAL_SYMBOL = self.grade1_map['alpha']['capital_symbol']
            self.CAPITAL_TERMINATOR = self.grade1_map['alpha']['capital_terminator']
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
                    if (previous.isdigit() and main.islower()):
                        result += self.ALPHA
                    result += main

            return result

        def capital_encoder(self, word: str):
            word += " "
            result = ""

            for i in range(len(word) - 1):
                previous, main, next = word[i-1], word[i], word[i+1]
                print(self.CAPITAL_SYMBOL)
                if (main.isupper()):
                    if (not previous.isupper()):
                        if (next.isupper()):
                            result += self.CAPITAL_WORD + main.lower()
                        else:
                            result += self.CAPITAL_SYMBOL + main.lower()
                    else:
                        if (not next.isupper() and next != " " and next != self.NUMERIC):
                            result += main.lower() + self.CAPITAL_TERMINATOR
                        else:
                            result += main.lower()
                else:
                    result += main
            return result

        def to_braille(self, text):
            words = text.split(" ")
            text = ""
            for word in words:

                new_word = self.number_encoder(word)
                new_word = self.capital_encoder(new_word)
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
            braille += " "
            result = ""
            # swap the dictionary
            swapped_numeric_dict = {v: k for k,
                                    v in self.grade1_map['numeric'].items()}
            numeric_mode = False

            for i in range(len(braille) - 1):
                previous, main, next = braille[i-1], braille[i], braille[i+1]
                if (previous+main == self.CAPITAL_TERMINATOR or main+next == self.CAPITAL_TERMINATOR):
                    result += main
                elif (main == self.NUMERIC):
                    numeric_mode = True
                elif (main == self.ALPHA or main == self.CAPITAL_WORD or main == self.CAPITAL_SYMBOL):
                    numeric_mode = False
                    result += main
                elif (numeric_mode and main in swapped_numeric_dict):
                    result += swapped_numeric_dict[main]
                else:
                    result += main
            return result

        def capital_decoder(self, braille: str):
            braille += " "
            result = ""
            # swap the dictionary
            swapped_alpha_dict = {v: k for k,
                                  v in self.grade1_map['alpha'].items()}
            capital_mode = False

            for i in range(len(braille) - 1):
                previous, main, next = braille[i-1], braille[i], braille[i+1]
                if (main+next == self.CAPITAL_WORD or previous+main == self.CAPITAL_WORD):
                    capital_mode = True
                elif (main+next == self.CAPITAL_TERMINATOR or previous+main == self.CAPITAL_TERMINATOR):
                    capital_mode = False
                elif (main.isdigit()):
                    capital_mode = False
                    result += main
                elif (previous == self.CAPITAL_SYMBOL):
                    result += swapped_alpha_dict[main].upper()
                elif (capital_mode):
                    result += swapped_alpha_dict[main].upper()
                elif (main == self.CAPITAL_SYMBOL or main == self.ALPHA):
                    continue
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
                word = self.capital_decoder(word)
                result = ""
                queue = []
                for i in range(len(word)):
                    main = word[i]

                    if (main not in swaped_dict):
                        result += main

                    elif (main == '\u2826'):
                        queue.append(i)
                        result += "?"

                    elif (main == '\u2834'):
                        index = queue.pop()
                        result = result[:index] + '”' + result[index+1:] + "”"

                    else:
                        result += swaped_dict[main]
                final_braille += result + " "
            return final_braille

    class Grade2(Grade):

        def __init__(self, outer):
            self.outer = outer

        def to_braille(self, text):
            pass

        def from_braille(self, braille):
            pass
