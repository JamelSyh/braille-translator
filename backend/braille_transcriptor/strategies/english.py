from braille_transcriptor.strategies.strategy import *
from braille_transcriptor.strategies.search import search_braille_patterns
from ahocorasick import Automaton
import re


class EnglishStrategy(Strategy):

    def __init__(self):
        self.name = "normal"
        self.language = Language.English
        self.dictionary = Dictionary.English.value
        self.grade1 = self.Grade1(self)
        self.grade2 = self.Grade2(self)

    class Grade1(Grade):

        def __init__(self, outer):
            self.outer = outer
            self.grade1_map = outer.dictionary.grade1_map
            self.grade1_map = outer.dictionary.grade2_map
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

                if (main.isupper()):
                    if (not previous.isupper()):
                        if (next.isupper()):
                            result += self.CAPITAL_WORD + main.lower()
                        else:
                            result += self.CAPITAL_SYMBOL + main.lower()
                    else:
                        if (not next.isupper()):
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
            result = ""
            # swap the dictionary
            swapped_numeric_dict = {v: k for k,
                                    v in self.grade1_map['numeric'].items()}
            numeric_mode = False

            for i in range(len(braille)):
                main = braille[i]
                if (main == self.NUMERIC):
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
                elif (main not in swapped_alpha_dict):
                    result += main
            #
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
                for i in range(len(word)):
                    main = word[i]

                    if (main not in swaped_dict):
                        result += main

                    else:
                        result += swaped_dict[main]
                final_braille += result + " "
            return final_braille[:-1]

    class Grade2():

        def __init__(self, outer):
            self.grade2_map = outer.dictionary.grade2_map
            self.CAPITAL_WORD = self.grade2_map['alpha']['capital_word']
            self.CAPITAL_SYMBOL = self.grade2_map['alpha']['capital_symbol']
            self.CAPITAL_TERMINATOR = self.grade2_map['alpha']['capital_terminator']
            self.ALPHA = self.grade2_map['alpha']['alpha']
            self.NUMERIC = self.grade2_map['numeric']['numeric']

        def number_encoder(self, word: str):
            word += " "
            result = ""

            for i in range(0, len(word) - 1):
                previous, main = word[i-1], word[i]

                if (main.isdigit()):
                    if (not previous.isdigit()):
                        result += self.NUMERIC

                    result += self.grade2_map['numeric'][main]

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

                if (main.isupper()):
                    if (not previous.isupper()):
                        if (next.isupper()):
                            result += self.CAPITAL_WORD + main.lower()
                        else:
                            result += self.CAPITAL_SYMBOL + main.lower()
                    else:
                        if (not next.isupper()):
                            result += main.lower() + self.CAPITAL_TERMINATOR
                        else:
                            result += main.lower()
                else:
                    result += main
            return result

        def contraction_encoder(self, word: str):

            filtered_word = ''
            word += " "
            i = 0

            # to do handle grade 1 mode
            while i < len(word) - 1:
                char = word[i]
                if (char == self.ALPHA):
                    i += 1
                elif char != self.CAPITAL_SYMBOL and char != self.CAPITAL_WORD and word[i]+word[i+1] != self.CAPITAL_TERMINATOR and word[i-1]+word[i] != self.CAPITAL_TERMINATOR:
                    filtered_word += char
                i += 1

            # stand alone word sign
            if (filtered_word in self.grade2_map['standalone']):
                filtered_word = self.grade2_map['standalone'][filtered_word]

            else:
                # group_sing
                diff = 0
                for key, value in self.grade2_map['group_sign'].items():
                    matches = list(re.finditer(key, filtered_word))
                    for match in matches:
                        if (match):
                            start_index = match.start(0)
                            end_index = match.end(0) - 1
                            key_len = len(key)
                            val_len = len(value)
                            filtered_word = filtered_word[:start_index] + \
                                re.escape(value) + filtered_word[end_index+1:]
                            diff += key_len - val_len

            return filtered_word

        def to_braille(self, text):
            words = text.split(" ")
            final_result = ""
            for word in words:

                new_word = self.number_encoder(word)
                new_word = self.capital_encoder(new_word)
                new_word = self.contraction_encoder(new_word)
                result = ""
                braille_dict = self.grade2_map['alpha'] | self.grade2_map['char']
                for i in range(len(new_word)):
                    main = new_word[i]

                    if (main in braille_dict):
                        result += braille_dict[main]
                    else:
                        result += new_word[i]

                final_result += result + " "
            return final_result[:-1]

        def number_decoder(self, braille: str):
            result = ""
            # swap the dictionary
            swapped_numeric_dict = {v: k for k,
                                    v in self.grade2_map['numeric'].items()}
            numeric_mode = False

            for i in range(len(braille)):
                main = braille[i]
                if (main == self.NUMERIC):
                    numeric_mode = True
                elif (main == self.ALPHA or main == self.CAPITAL_WORD or main == self.CAPITAL_SYMBOL or main not in swapped_numeric_dict):
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
                                  v in self.grade2_map['alpha'].items()}
            capital_mode = False

            for i in range(len(braille) - 1):
                previous, main, next = braille[i-1], braille[i], braille[i+1]
                if (main+next == self.CAPITAL_WORD or previous+main == self.CAPITAL_WORD):
                    capital_mode = True
                elif (main+next == self.CAPITAL_TERMINATOR or previous+main == self.CAPITAL_TERMINATOR):
                    capital_mode = False
                elif (main not in swapped_alpha_dict):
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

        def contraction_decoder(self, braille):
            gs_dict = self.grade2_map['group_sign']
            swaped_gs_dict = {v: k for k, v in gs_dict.items()}
            sa_dict = self.grade2_map['standalone']
            swaped_sa_dict = {v: k for k, v in sa_dict.items()}

            braille_words = braille.split(self.grade2_map['char'][" "])
            braille_dict = self.grade2_map['alpha']
            # swap the dictionary
            swaped_dict = {v: k for k, v in braille_dict.items()}

            braille = self.symbol_decoder(braille, swaped_dict)

            filtered_word = ''
            braille += " "

            for i in range(len(braille) - 1):
                char = braille[i]
                if (char == self.ALPHA and braille[i - 1] == " "):
                    return braille
                elif char != self.CAPITAL_SYMBOL and char != self.CAPITAL_WORD and braille[i]+braille[i+1] != self.CAPITAL_TERMINATOR and braille[i-1]+braille[i] != self.CAPITAL_TERMINATOR:
                    filtered_word += char

            if (filtered_word in swaped_sa_dict):
                filtered_word = swaped_sa_dict[filtered_word]

            else:
                diff = 0
                for key, value in swaped_gs_dict.items():
                    matches = list(re.finditer(key, filtered_word))
                    for match in matches:
                        if (match):
                            start_index = match.start(0)
                            end_index = match.end(0) - 1

                            key_len = end_index - start_index + 1
                            val_len = len(value)

                            filtered_word = filtered_word[:start_index] + \
                                re.escape(value) + filtered_word[end_index+1:]
                            diff += val_len - key_len

            return filtered_word

        def symbol_decoder(self, word, swaped_dict):
            search_result = search_braille_patterns(word, swaped_dict)
            diff = 0
            for item in search_result:

                start_index, end_index, value = item

                original_len = end_index - start_index + 1
                new_len = len(value)

                word = word[:start_index+diff] + \
                    value + word[end_index+1+diff:]
                # print(word, item, diff)

                diff += new_len - original_len
            return word

        def from_braille(self, braille):

            braille_words = braille.split(self.grade2_map['char'][" "])
            braille_dict = self.grade2_map['alpha'] | self.grade2_map['char']
            # swap the dictionary
            swaped_dict = {v: k for k, v in braille_dict.items()}
            result = ""
            for word in braille_words:

                new_word = self.number_decoder(word)
                new_word = self.contraction_decoder(new_word)
                new_word = self.capital_decoder(new_word)
                new_word = self.symbol_decoder(new_word, swaped_dict)

                result += new_word + " "
                # print(result)
            return result
